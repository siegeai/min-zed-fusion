/**
 * Capsule generation: the site reacting to what a visitor tells it.
 *
 * The visitor describes their work in one line and the demo section rebuilds
 * itself around that, same layout, same spine, their situation. This is the
 * strongest thing the site can do, because a capsule about the relationship
 * they are actually losing sleep over argues better than any headline.
 *
 * The model never emits markup, class names, or component choices. It fills a
 * fixed set of string slots that CapsuleWorkspace already accepts, and the
 * shape is enforced twice: the tool schema on the way out of the model, and
 * validateCapsule() on the way out of the Worker. Anything malformed becomes an
 * error the client falls back from, never a broken layout.
 */
import type Anthropic from "@anthropic-ai/sdk";

/** Matches ScenarioData in src/components/landing/CapsuleWorkspace.tsx. */
export type Capsule = {
  who: "avery" | "priya";
  name: string;
  title: string;
  role: string;
  chips: string[];
  stand: Row[];
  actions: Row[];
  history: (Row & { date: string })[];
  railTitle: string;
  prompts: { q: string; a: string; primary?: boolean }[];
};

type Row = {
  text: string;
  detail: { kind: "call" | "email"; source: string; body: string };
};

const DETAIL = {
  type: "object",
  properties: {
    kind: { type: "string", enum: ["call", "email"] },
    source: { type: "string", description: 'Where it came from, e.g. "Call · Jun 8" or "Email · Jun 14"' },
    body: { type: "string", description: "One or two sentences of evidence, as if quoting the record" },
  },
  required: ["kind", "source", "body"],
} as const;

const ROW = {
  type: "object",
  properties: { text: { type: "string" }, detail: DETAIL },
  required: ["text", "detail"],
} as const;

export const CAPSULE_TOOL = {
  name: "render_capsule",
  description: "Render a min. relationship capsule for the visitor's described situation.",
  input_schema: {
    type: "object" as const,
    properties: {
      who: { type: "string", enum: ["avery", "priya"], description: "Which stock portrait to use" },
      name: { type: "string", description: 'Fictional counterpart, e.g. "Dana Song"' },
      title: { type: "string", description: 'Always "You & <name>"' },
      role: { type: "string", description: 'Their relationship to the visitor, e.g. "Your manager · Engineering"' },
      chips: {
        type: "array",
        items: { type: "string" },
        minItems: 3,
        maxItems: 3,
        description: 'Volume of contact, e.g. ["14 one on ones", "31 emails", "since Jan"]',
      },
      stand: { type: "array", items: ROW, minItems: 3, maxItems: 3 },
      actions: { type: "array", items: ROW, minItems: 2, maxItems: 3 },
      history: {
        type: "array",
        minItems: 2,
        maxItems: 3,
        items: {
          type: "object",
          properties: {
            date: { type: "string", description: 'e.g. "Jun 24"' },
            text: { type: "string" },
            detail: DETAIL,
          },
          required: ["date", "text", "detail"],
        },
      },
      railTitle: { type: "string", description: 'Always "How can I help with <first name>?"' },
      prompts: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: {
          type: "object",
          properties: {
            q: { type: "string", description: "What the visitor would ask min." },
            a: { type: "string", description: "min.'s answer, grounded only in this capsule" },
          },
          required: ["q", "a"],
        },
      },
    },
    required: ["who", "name", "title", "role", "chips", "stand", "actions", "history", "railTitle", "prompts"],
  },
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * The model has no clock, and left to itself it dates the history in whatever
 * month feels story-shaped, which came out as November and December during an
 * August test run. A capsule of things that have not happened yet is nonsense,
 * so the window gets computed here and stated explicitly.
 */
function dateWindow(now: Date): string {
  const end = `${MONTHS[now.getUTCMonth()]} ${now.getUTCFullYear()}`;
  const back = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5, 1));
  const start = `${MONTHS[back.getUTCMonth()]} ${back.getUTCFullYear()}`;
  return `Today is ${now.getUTCDate()} ${end}. Every date you write is in the PAST, between ${start} and today. Never write a date in the future, and never write a month later than ${MONTHS[now.getUTCMonth()]}.`;
}

export function buildCapsulePrompt(knowledge: string, now: Date): string {
  return `You build demo capsules for getmin.ai. A visitor has described the work they do. You invent one realistic relationship from that world and render it as a min. capsule, so they see their own job reflected back in the product rather than a stranger's.

## What a capsule is

min. distills one relationship into three parts, and you fill all three:

- **Where you stand.** Three read-outs on the state of the relationship. Not activity logs, judgements: what is at stake, what is stalled, who actually decides. Each one should make a reader think "that is the thing I would have missed."
- **Action items.** Two or three imperatives with a deadline and a reason. These are instructions, not suggestions. "Send Dana both project numbers by Friday, she asked May 12." Never "consider" or "you may want to."
- **History.** Two or three past touchpoints, most recent first, each one line.

Every row also carries a detail: the call or email it came from, and one or two sentences of evidence. That is what makes the capsule feel recalled rather than written.

## Fitting it to them

- Use their world. If they run a design agency, the counterpart is a client and the stakes are a renewal. If they are job hunting, it is a hiring manager and the stakes are an offer. If they teach, it is a department head. Take whatever they gave you and stay inside it.
- Invent one specific person with a name, a role, and a live situation with something at stake and something overdue. Specific beats general every time: a named project, a real sounding number, an actual date.
- If what they describe is not about a relationship with a person at all, pick the nearest relationship their work does involve and build there.

## Rules

1. Everything you invent is fiction. Never imply min. already knows this person or has read their mail.
2. Never invent min. capabilities. It records calls without a bot, reads email and calendar, distils relationships, drafts follow ups, books meetings, chases what is owed. Nothing else. The facts below are the limit.
3. ${dateWindow(now)} Order history most recent first.
4. No em dashes, no en dashes, no exclamation marks, no emoji, no markdown.
5. Write "min." lowercase with the period.
6. **Every row is at most 100 characters.** These render in a narrow column, and a row that wraps three times has failed. Two short sentences beats one long one. Count them: "Team demo promised Jun 11, never scheduled. The longest open loop." is 65 characters and is the right size. If a row runs long, cut the qualifier, not the point.
7. The three prompts are what this person would actually ask min. about this relationship, and the answers cite only what is in the capsule you just built. Answers are two or three sentences.
8. \`role\` uses a middle dot to separate, like "Your manager · Engineering" or "Your client · Series B fintech".
9. **One name, everywhere.** Whatever you put in \`name\` is what every row calls them. If \`name\` is "Dr. Chen" then no row says "Marcus". Pick the name first, then write.

## A finished capsule, at the right length

Every row below is under 100 characters. Match this density exactly. This is a founder and their lead investor; yours will be a different world, so take the SHAPE and not the content.

name: "Priya Raghavan", title: "You & Priya Raghavan", role: "Your lead investor · Seed"
chips: ["9 calls", "40 emails", "since February"]

Where you stand
- "She wants the Series A deck three weeks before you planned to start it." (call · Jul 22)
- "Revenue quality keeps coming up. She is testing whether growth is real." (email · Jul 9 · Aug 1)
- "She has not offered intros yet. That is the signal to watch." (call · Jun 30)

Action items
- "Send Priya the July cohort numbers by Wednesday, she asked twice." (email · Aug 1)
- "Ask her for two Series A intros on Friday's call, before the deck exists." (call · Jul 22)

History
- Jul 22 "Board call. She moved the Series A timeline up a quarter." (call · 45 min)
- Jul 9 "She asked for net revenue retention by cohort. Still unsent." (email thread)

Notice: no row wraps, each one carries a fact and a consequence, and the action items name a day. Count characters as you write, and if a row passes 100, cut a qualifier.

<FACTS>
${knowledge}
</FACTS>

Call render_capsule once. No prose.`;
}

/**
 * Never trust the model's shape. Reports WHICH field failed rather than a bare
 * null: a rejection means the visitor sees a fallback instead of their capsule,
 * and "unusable" with no reason is not something you can fix from logs.
 *
 * The length ceilings here are deliberately looser than the prompt asks for.
 * The prompt wants rows under 100 characters; this rejects at 220. Anything in
 * between is ugly but readable, and shipping a slightly long row beats throwing
 * away a good capsule over a wrapped line.
 */
export type Validated = { ok: true; value: Capsule } | { ok: false; reason: string };

export function validateCapsule(x: unknown): Validated {
  let why = "";
  const fail = (r: string) => {
    why = why || r;
    return false;
  };

  const str = (v: unknown, max: number, at: string): boolean =>
    (typeof v === "string" && v.trim().length > 0 && v.length <= max) ||
    fail(`${at} (${typeof v === "string" ? `${v.length} chars` : typeof v})`);

  const okDetail = (d: unknown, at: string): boolean => {
    if (typeof d !== "object" || d === null) return fail(`${at}.detail missing`);
    const { kind, source, body } = d as Record<string, unknown>;
    if (kind !== "call" && kind !== "email") return fail(`${at}.detail.kind`);
    return str(source, 80, `${at}.detail.source`) && str(body, 600, `${at}.detail.body`);
  };
  const okRow = (r: unknown, at: string): boolean => {
    if (typeof r !== "object" || r === null) return fail(`${at} missing`);
    const { text, detail } = r as Record<string, unknown>;
    return str(text, 220, `${at}.text`) && okDetail(detail, at);
  };
  const arr = (
    v: unknown,
    lo: number,
    hi: number,
    at: string,
    each: (i: unknown, at: string) => boolean,
  ) => {
    if (!Array.isArray(v)) return fail(`${at} not an array`);
    if (v.length < lo || v.length > hi) return fail(`${at} length ${v.length}, want ${lo}..${hi}`);
    return v.every((item, i) => each(item, `${at}[${i}]`));
  };

  if (typeof x !== "object" || x === null) return { ok: false, reason: "not an object" };
  const c = x as Record<string, unknown>;

  const ok =
    (c.who === "avery" || c.who === "priya" || fail("who")) &&
    str(c.name, 60, "name") &&
    str(c.title, 80, "title") &&
    str(c.role, 90, "role") &&
    str(c.railTitle, 80, "railTitle") &&
    arr(c.chips, 3, 3, "chips", (i, at) => str(i, 40, at)) &&
    arr(c.stand, 3, 3, "stand", okRow) &&
    arr(c.actions, 2, 3, "actions", okRow) &&
    arr(c.history, 2, 3, "history", (h, at) => {
      if (typeof h !== "object" || h === null) return fail(`${at} missing`);
      return str((h as Record<string, unknown>).date, 30, `${at}.date`) && okRow(h, at);
    }) &&
    arr(c.prompts, 3, 3, "prompts", (p, at) => {
      if (typeof p !== "object" || p === null) return fail(`${at} missing`);
      const { q, a } = p as Record<string, unknown>;
      return str(q, 120, `${at}.q`) && str(a, 700, `${at}.a`);
    });

  return ok ? { ok: true, value: x as Capsule } : { ok: false, reason: why || "unknown" };
}

/** The voice rule the chat path enforces in code, applied to every string here. */
export function scrubCapsule(c: Capsule): Capsule {
  const fix = (s: string) => s.replace(/\s*[—–]\s*/g, ", ");
  const row = <T extends Row>(r: T): T => ({
    ...r,
    text: fix(r.text),
    detail: { ...r.detail, source: r.detail.source, body: fix(r.detail.body) },
  });
  return {
    ...c,
    name: fix(c.name),
    title: fix(c.title),
    // role is the one field where a dash means "separator" rather than
    // punctuation, so it gets normalised to the middle dot the design uses
    // instead of being turned into a comma like every other string.
    role: c.role.replace(/\s+[-—–]\s+/g, " · "),
    chips: c.chips.map(fix),
    stand: c.stand.map(row),
    actions: c.actions.map(row),
    history: c.history.map(row),
    railTitle: fix(c.railTitle),
    // The first prompt drives the primary button; the model does not choose.
    prompts: c.prompts.map((p, i) => ({ q: fix(p.q), a: fix(p.a), primary: i === 0 })),
  };
}

export async function generateCapsule(
  client: Anthropic,
  knowledge: string,
  situation: string,
  now: Date,
): Promise<Validated> {
  const res = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 2_000,
    system: [
      {
        type: "text",
        text: buildCapsulePrompt(knowledge, now),
        cache_control: { type: "ephemeral" },
      },
    ],
    tools: [CAPSULE_TOOL],
    tool_choice: { type: "tool", name: CAPSULE_TOOL.name },
    messages: [{ role: "user", content: `Here is what I do: ${situation}` }],
  });

  const block = res.content.find((b) => b.type === "tool_use");
  if (!block || block.type !== "tool_use") {
    return { ok: false, reason: `no tool_use (stop_reason: ${res.stop_reason})` };
  }
  const valid = validateCapsule(block.input);
  return valid.ok ? { ok: true, value: scrubCapsule(valid.value) } : valid;
}

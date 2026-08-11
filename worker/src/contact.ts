/**
 * Hand-off to a human, for the questions the bot cannot answer.
 *
 * Two endpoints. POST /draft turns the conversation so far into a subject and
 * body the visitor can edit. POST /contact delivers it.
 *
 * Delivery is optional by design. With no sending key configured, /contact
 * answers 501 and the client falls back to opening a prefilled mailto, so the
 * feature works the day it ships and starts sending the moment a secret is
 * added, with no code change. That kept a marketing-site Worker from having to
 * hold production credentials just to exist.
 */
import type Anthropic from "@anthropic-ai/sdk";

export const CONTACT_TO = "hello@getmin.ai";

const DRAFT_TOOL = {
  name: "write_email",
  description: "Write the visitor's question up as an email to the min. team.",
  input_schema: {
    type: "object" as const,
    properties: {
      subject: { type: "string", description: "Under 60 characters, specific, no greeting" },
      body: {
        type: "string",
        description:
          "The email itself, first person as the visitor, 2 to 4 short sentences, no signature and no greeting line",
      },
    },
    required: ["subject", "body"],
  },
};

const DRAFT_PROMPT = `You turn a visitor's conversation with min.'s site assistant into a short email to the min. team.

Write as the visitor, in their voice, first person. Your job is to state their question clearly enough that a person can answer it in one reply.

- Two to four short sentences. No greeting, no sign off, no name.
- Lead with the actual question. If they gave context about their work, keep the one line of it that helps the team answer, and drop everything else.
- Use their own words where you can. Do not make them sound like a press release, and do not add enthusiasm they did not have.
- Never invent details about them, their company, their team size, or their timeline.
- No em dashes, no en dashes, no exclamation marks, no emoji, no markdown.
- If several questions went unanswered, cover the most recent one and mention the others in a final clause.

Call write_email once. No prose.`;

export type Draft = { subject: string; body: string };

export async function draftEmail(
  client: Anthropic,
  messages: { role: "user" | "assistant"; content: string }[],
): Promise<Draft | null> {
  const transcript = messages
    .map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`)
    .join("\n\n");

  const res = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 400,
    system: [{ type: "text", text: DRAFT_PROMPT, cache_control: { type: "ephemeral" } }],
    tools: [DRAFT_TOOL],
    tool_choice: { type: "tool", name: DRAFT_TOOL.name },
    messages: [{ role: "user", content: `The conversation:\n\n${transcript}` }],
  });

  const block = res.content.find((b) => b.type === "tool_use");
  if (!block || block.type !== "tool_use") return null;
  const { subject, body } = (block.input ?? {}) as Record<string, unknown>;
  if (typeof subject !== "string" || typeof body !== "string") return null;
  if (!subject.trim() || !body.trim() || subject.length > 200 || body.length > 2_000) return null;

  const fix = (s: string) => s.replace(/\s*[—–]\s*/g, ", ").trim();
  return { subject: fix(subject), body: fix(body) };
}

/** Deliberately permissive: rejecting a real address is worse than accepting a junk one. */
export function looksLikeEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/.test(v) && v.length <= 254;
}

export type SendResult = { ok: true } | { ok: false; status: number; error: string };

/**
 * Sends through Resend when RESEND_API_KEY is set. reply_to is the visitor, so
 * answering is one click in the inbox rather than a copy and paste.
 */
export async function sendContactEmail(
  env: { RESEND_API_KEY?: string; CONTACT_FROM?: string },
  msg: { email: string; subject: string; body: string },
): Promise<SendResult> {
  if (!env.RESEND_API_KEY) {
    return { ok: false, status: 501, error: "not_configured" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM ?? "min. site <onboarding@resend.dev>",
      to: [CONTACT_TO],
      reply_to: msg.email,
      subject: msg.subject,
      // Flagged as bot-originated so nobody mistakes it for a direct email, and
      // the sender address is stated rather than only living in reply_to.
      text: `${msg.body}\n\n----\nSent from the Ask min. widget on getmin.ai\nReply to: ${msg.email}`,
    }),
  });

  if (!res.ok) {
    console.error("resend failed:", res.status, await res.text().catch(() => ""));
    return { ok: false, status: 502, error: "send_failed" };
  }
  return { ok: true };
}

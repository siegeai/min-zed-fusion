/**
 * The one place the Worker's address lives.
 *
 * getmin.ai is static, so there is nowhere here to keep an API key. Everything
 * that needs the model goes through this Worker, which holds the key and owns
 * the prompts. See worker/README.md.
 */
export const ASK_ENDPOINT = "https://ask-min.ew-baa.workers.dev";

export const CONTACT_ADDRESS = "hello@getmin.ai";

export type Draft = { subject: string; body: string };

/** Writes the visitor's unanswered question up as an email they can edit. */
export async function fetchDraft(
  messages: { role: "user" | "assistant"; content: string }[],
): Promise<Draft> {
  const res = await fetch(`${ASK_ENDPOINT}/draft`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) throw new Error("draft");
  const data = (await res.json()) as { draft?: Draft };
  if (!data.draft) throw new Error("draft");
  return data.draft;
}

/**
 * Opens the visitor's own mail client with everything filled in.
 *
 * The fallback whenever the Worker cannot send: no key configured, rate
 * limited, or the send failed. They press send themselves, which also means
 * their real address becomes the reply-to without us having to hold it.
 */
export function mailtoFallback(draft: Draft): void {
  const url = `mailto:${CONTACT_ADDRESS}?subject=${encodeURIComponent(
    draft.subject,
  )}&body=${encodeURIComponent(draft.body)}`;
  window.open(url, "_blank");
}

/**
 * Delivers the drafted question. Resolves "sent" when the Worker mailed it and
 * "mailto" when it could not and the visitor's mail client was opened instead,
 * so the caller can say which actually happened rather than claiming a send
 * that did not occur.
 */
export async function sendContact(
  draft: Draft,
  email: string,
  honeypot: string,
): Promise<"sent" | "mailto"> {
  try {
    const res = await fetch(`${ASK_ENDPOINT}/contact`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...draft, email, website: honeypot }),
    });
    if (res.ok) return "sent";
  } catch {
    // network failure falls through to the mail client
  }
  mailtoFallback(draft);
  return "mailto";
}

/** Mirrors ScenarioData in components/landing/CapsuleWorkspace.tsx. */
export type GeneratedCapsule = {
  who: "avery" | "priya";
  name: string;
  title: string;
  role: string;
  chips: string[];
  stand: { text: string; detail: CapsuleDetail }[];
  actions: { text: string; detail: CapsuleDetail }[];
  history: { date: string; text: string; detail: CapsuleDetail }[];
  railTitle: string;
  prompts: { q: string; a: string; primary?: boolean }[];
};

export type CapsuleDetail = { kind: "call" | "email"; source: string; body: string };

/**
 * Builds a demo capsule from a visitor's description of their work.
 *
 * The Worker validates the shape before it ever reaches us, so a malformed
 * generation arrives as an error rather than as a half-rendered capsule. Callers
 * fall back to the shipped arenas on anything that is not a resolved capsule.
 */
export async function fetchCapsule(situation: string): Promise<GeneratedCapsule> {
  const res = await fetch(`${ASK_ENDPOINT}/capsule`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ situation }),
  });

  if (!res.ok) {
    throw new Error(
      res.status === 429
        ? "That is a few in a row. Give it a minute and try again."
        : "min. could not build that one. Try describing your work a different way.",
    );
  }
  const data = (await res.json()) as { capsule?: GeneratedCapsule };
  if (!data.capsule) throw new Error("min. could not build that one.");
  return data.capsule;
}

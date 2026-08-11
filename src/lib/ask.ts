/**
 * The one place the Worker's address lives.
 *
 * getmin.ai is static, so there is nowhere here to keep an API key. Everything
 * that needs the model goes through this Worker, which holds the key and owns
 * the prompts. See worker/README.md.
 */
export const ASK_ENDPOINT = "https://ask-min.ew-baa.workers.dev";

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

/**
 * Name suggestions for the hero.
 *
 * The backend is the only source. There is deliberately no local pool: the
 * address on the page is a promise that mail sent to it will be answered, and
 * only the backend knows which names actually exist. A page that invents
 * "fulcrum@getmin.ai" and hands it to someone who copies it onto a real
 * calendar invite has broken the single conversion action on the site, which
 * is worse than showing no name at all. So this fails honestly rather than
 * failing closed: anything other than a good response returns nothing, and the
 * hero says so.
 *
 * Contract, verified live 21 Aug 2026: GET /minions/suggest?count=&exclude=,
 * unauthenticated, access-control-allow-origin *, lowercase names, addresses
 * always name@getmin.ai.
 *
 * COUNT IS CLAMPED TO 12 SERVER SIDE. Asking for 49 or 100 returns 12, so the
 * page cannot pull the whole list in one call. It takes a batch instead and
 * tops up in the background, which gets the same feel as holding the full list
 * (one request before the first paint, then rerolls with no network wait)
 * without pretending the cap is not there.
 */

/** The server's own ceiling. Asking for more is silently truncated to this. */
export const BATCH_SIZE = 12;

export type Minion = { name: string; address: string };

const ENDPOINT = "https://api.getmin.ai/minions/suggest";
const TIMEOUT_MS = 6000;

export const displayName = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1);

function parse(body: unknown, count: number): Minion[] {
  const list = (body as { minions?: unknown })?.minions;
  if (!Array.isArray(list)) return [];
  return list
    .filter(
      (m): m is { name: string; address?: string } =>
        !!m && typeof m.name === "string" && /^[a-z0-9.\-_]{1,64}$/i.test(m.name)
    )
    .map((m) => {
      const name = m.name.toLowerCase();
      // Take the backend's address when it sends one: it owns the domain and
      // may not always be @getmin.ai.
      return {
        name,
        address:
          typeof m.address === "string" && m.address.includes("@")
            ? m.address.toLowerCase()
            : `${name}@getmin.ai`,
      };
    })
    .slice(0, count);
}

/** Returns [] when the backend cannot be reached. Never invents a name. */
export async function suggestMinions(
  count = 1,
  exclude: string[] = []
): Promise<Minion[]> {
  const params = new URLSearchParams({
    count: String(Math.min(Math.max(count, 1), 12)),
  });
  if (exclude.length) params.set("exclude", exclude.join(","));

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    const res = await fetch(`${ENDPOINT}?${params}`, {
      signal: ctrl.signal,
      headers: { accept: "application/json" },
    });
    clearTimeout(timer);
    if (!res.ok) return [];
    return parse(await res.json(), count);
  } catch {
    return [];
  }
}

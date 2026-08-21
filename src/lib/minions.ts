/**
 * Name suggestions for the hero.
 *
 * The contract is the public one: GET /minions/suggest?count=&exclude=, no auth,
 * CORS open, lowercase names with their address. Suggestions are biased away
 * from crowded names server side, which is why "try another" re-calls with
 * exclude rather than cycling a list fetched once.
 *
 * The endpoint is not deployed yet (404 on every path as of 21 Aug 2026), so
 * everything below is written to survive that and to start working the moment
 * it lands, with no client change.
 *
 * The brief's rule for the API is that it never fails closed, because a page
 * that cannot show a name has nothing to show. That binds the client harder
 * than the server: the name IS the hero, so a failed fetch must still produce
 * one. Hence the local pool, used on 404, error, timeout, or a malformed body.
 */

export type Minion = { name: string; address: string };

const ENDPOINT = "https://api.getmin.ai/minions/suggest";
const TIMEOUT_MS = 4000;

/**
 * Short, sayable, human. The test is whether it survives being said out loud
 * in an office: "ours is Juno." Nothing that reads as a product, a robot, or
 * an acronym, and nothing that collides with a common first name at work.
 */
const FALLBACK_POOL = [
  "juno", "milo", "nora", "otis", "wren", "ada",
  "kit", "rey", "sol", "ivo", "noor", "tobi",
  "pia", "arlo", "vera", "hugo", "iris", "remy",
];

export const addressFor = (name: string) => `${name}@getmin.ai`;
export const displayName = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1);

function fromPool(count: number, exclude: string[]): Minion[] {
  const taken = new Set(exclude.map((n) => n.toLowerCase()));
  const left = FALLBACK_POOL.filter((n) => !taken.has(n));
  // Everything already seen: start over rather than return nothing.
  const source = left.length ? left : FALLBACK_POOL;
  const picked: string[] = [];
  const bag = [...source];
  while (picked.length < count && bag.length) {
    picked.push(bag.splice(Math.floor(Math.random() * bag.length), 1)[0]);
  }
  return picked.map((name) => ({ name, address: addressFor(name) }));
}

function parse(body: unknown, count: number, exclude: string[]): Minion[] | null {
  const list = (body as { minions?: unknown })?.minions;
  if (!Array.isArray(list)) return null;
  const clean = list
    .filter((m): m is Minion =>
      !!m && typeof (m as Minion).name === "string" && (m as Minion).name.length > 0
    )
    .map((m) => ({
      name: m.name.toLowerCase(),
      // Trust our own address shape over whatever the payload says.
      address: addressFor(m.name.toLowerCase()),
    }));
  return clean.length ? clean.slice(0, count) : null;
}

export async function suggestMinions(
  count = 1,
  exclude: string[] = []
): Promise<Minion[]> {
  const params = new URLSearchParams({ count: String(Math.min(Math.max(count, 1), 12)) });
  if (exclude.length) params.set("exclude", exclude.join(","));

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    const res = await fetch(`${ENDPOINT}?${params}`, {
      signal: ctrl.signal,
      headers: { accept: "application/json" },
    });
    clearTimeout(timer);
    if (!res.ok) return fromPool(count, exclude);
    return parse(await res.json(), count, exclude) ?? fromPool(count, exclude);
  } catch {
    return fromPool(count, exclude);
  }
}

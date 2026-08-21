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
 * in an office: "ours is Juno." Skewed away from the most common workplace
 * first names on purpose, because a minion called Sarah on a team that already
 * has a Sarah is a bug, not a coincidence.
 */
const HUMAN_NAMES = [
  "ada", "aisha", "alba", "anouk", "arlo", "asa", "aster", "aubin",
  "aurel", "bex", "bodhi", "bram", "bruna", "caio", "calla", "cato",
  "cleo", "cora", "dara", "delphine", "devan", "dima", "eira", "elio",
  "elsa", "emeka", "enzo", "esme", "ezra", "faye", "fen", "fenna",
  "finn", "freya", "gaia", "gil", "greta", "gus", "hana", "hedy",
  "hiro", "ida", "ilse", "imre", "inez", "ines", "iona", "iris",
  "isla", "ivo", "jae", "jem", "jin", "joss", "juno", "kai",
  "kaia", "keir", "kenji", "kit", "lala", "lark", "leif", "lena",
  "lev", "lian", "lila", "lior", "lira", "livia", "lonan", "luca",
  "lucia", "lumi", "mae", "maia", "mira", "mila", "milo", "mirek",
  "nadia", "neve", "nico", "nils", "niamh", "noor", "nora", "nova",
  "oona", "orla", "oscar", "otis", "ozan", "pablo", "pax", "perrin",
  "pia", "priya", "quinn", "raf", "rana", "ravi", "reia", "remy",
  "rey", "rhea", "rina", "ronan", "rosa", "rune", "ruth", "saga",
  "sana", "sasha", "shai", "shura", "sena", "sol", "soren", "suri",
  "tadeo", "tamsin", "tao", "teo", "thea", "tilda", "tobi", "tova",
  "ula", "uma", "vala", "vera", "vida", "vidal", "wren", "yara",
  "yuki", "zain", "zara", "zev", "zola",
];

/**
 * Unmistakably not a person: tools, instruments, machine parts, materials.
 * Some teams would rather nobody ever wonder whether the minion is a colleague
 * they have not met yet, and a minion called Ratchet answers that on sight.
 */
const BOT_NAMES = [
  "abacus", "amp", "anchor", "anvil", "arc", "archive", "armature", "auger",
  "awl", "axiom", "ballast", "beacon", "bellows", "bezel", "bit", "blip",
  "bolt", "boron", "brace", "buffer", "bushing", "byte", "cadence", "caliper",
  "cargo", "carbide", "chime", "cipher", "circuit", "clamp", "cobalt", "cog",
  "compass", "conduit", "console", "cordite", "crank", "cursor", "datum", "delta",
  "dial", "digit", "dispatch", "dossier", "dowel", "drift", "dynamo", "echo",
  "ferrule", "filament", "flange", "flint", "fluke", "flux", "forge", "fulcrum",
  "gasket", "gauge", "girder", "glyph", "grid", "grommet", "gudgeon", "gyro",
  "harbor", "hasp", "helix", "hinge", "index", "ingot", "iota", "jetty",
  "joule", "keel", "kernel", "keystone", "lantern", "lathe", "lattice", "ledger",
  "lens", "lever", "linchpin", "lumen", "manifold", "marble", "mandrel", "mast",
  "meter", "micron", "module", "mortise", "motif", "newton", "nickel", "nimbus",
  "node", "nozzle", "obelisk", "octane", "onyx", "orbit", "packet", "pallet",
  "parcel", "pascal", "pendulum", "pinion", "pivot", "piston", "plinth", "plumb",
  "prism", "pulley", "quartz", "quill", "radius", "rail", "ratchet", "relay",
  "rivet", "roster", "rudder", "runic", "satchel", "scaffold", "scout", "sentry",
  "sextant", "shim", "shunt", "sigil", "signal", "sinter", "slate", "socket",
  "sonar", "spindle", "spline", "spool", "sprocket", "stanchion", "stencil", "stylus",
  "tally", "tandem", "tensor", "tessera", "thimble", "tiller", "tinder", "token",
  "torus", "trellis", "tripod", "trunnion", "turbine", "vane", "vector", "verso",
  "vessel", "vial", "vernier", "warden", "wedge", "wharf", "widget", "winch",
  "windlass", "wire", "wrench", "yoke", "zephyr", "zinc",
];

/**
 * Every name here has been checked to be a-z only and 2 to 12 characters, so it
 * is always a legal mail local-part; unique across both lists; not a reserved
 * or role address (hello@ is already the real contact address, min@ is the
 * product, and admin/support/billing and friends are role accounts no team
 * should be handed); and not the name of somebody else's assistant.
 */
const FALLBACK_POOL = [...HUMAN_NAMES, ...BOT_NAMES];

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

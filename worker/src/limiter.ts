/**
 * A rate limit that actually holds, for the one endpoint that reaches an inbox.
 *
 * Two cheaper mechanisms were tried first and both leak:
 *
 * - The in-memory Map in index.ts lives in a single isolate. Isolates are
 *   per-colo and recycled, so a four-request burst went straight through it.
 * - Cloudflare's ratelimit binding is eventually consistent. A 20-request burst
 *   against a limit of 5 returned exactly 2 rejections.
 *
 * Both are fine when the cost of leaking is tokens. Neither is fine when the
 * cost is mail sent from a production SES identity, because the failure mode is
 * not a bill, it is the sending domain getting flagged and every later email
 * landing in spam.
 *
 * A Durable Object is single-threaded per key with strongly consistent storage,
 * so the count is exact. One object per IP, addressed by idFromName.
 */

const PER_MINUTE = 5;
const PER_DAY = 20; // a slow drip is the realistic spam shape, not a burst
const MINUTE_MS = 60_000;
const DAY_MS = 24 * 60 * 60 * 1000;

export class ContactLimiter {
  constructor(private state: DurableObjectState) {}

  async fetch(): Promise<Response> {
    const now = Date.now();
    const hits = ((await this.state.storage.get<number[]>("hits")) ?? []).filter(
      (t) => now - t < DAY_MS,
    );

    const lastMinute = hits.filter((t) => now - t < MINUTE_MS).length;
    if (lastMinute >= PER_MINUTE || hits.length >= PER_DAY) {
      // Rejections are not recorded. Otherwise a script hammering the endpoint
      // keeps extending its own lockout forever, which reads as broken to a
      // real visitor who happens to share an office IP with it.
      await this.state.storage.put("hits", hits);
      return Response.json({ allowed: false });
    }

    hits.push(now);
    await this.state.storage.put("hits", hits);
    return Response.json({ allowed: true });
  }
}

/** Fails OPEN: a limiter outage must not take the contact form down with it. */
export async function contactAllowed(
  ns: DurableObjectNamespace | undefined,
  ip: string,
): Promise<boolean> {
  if (!ns) return true;
  try {
    const res = await ns.get(ns.idFromName(`contact:${ip}`)).fetch("https://limiter/");
    const { allowed } = (await res.json()) as { allowed?: boolean };
    return allowed !== false;
  } catch (err) {
    console.error("contact limiter unavailable:", err);
    return true;
  }
}

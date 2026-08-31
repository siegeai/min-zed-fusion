import { useCallback, useEffect, useRef, useState } from "react";
import MemoryField from "./MemoryField";
import {
  BATCH_SIZE,
  displayName,
  suggestMinions,
  type Minion,
} from "@/lib/minions";

/**
 * The landing page, minion brief.
 *
 * Replaces the rail-and-stage page entirely. That one sold seven capabilities
 * side by side; this one sells a person you meet. Nothing from the capsule or
 * relationship-memory era survives, and the four things that are real but off
 * message right now (scheduling, reminders, follow ups, rituals) are not on the
 * page at all, per the brief.
 *
 * The hero IS the mechanic. There is no signup form anywhere on this page: the
 * address is the call to action, and copying it onto a calendar invite is how
 * somebody becomes a customer. So the name gets the whole motion budget, and
 * almost nothing else moves.
 *
 * Three things the brief forbids that are easy to reach for by reflex, noted
 * here so they do not creep back: no scarcity or countdown of any kind (names
 * are unique per team, so urgency would be a lie a visitor can disprove by
 * refreshing), never the words available or taken (availability is not a
 * concept here), and no offer to change the name later, because there is no
 * way to.
 */

const COPY_RESET_MS = 1800;

type Status = "loading" | "ready" | "unavailable";

/**
 * Names come from the backend and nowhere else, so there are three real states
 * and the page has to be honest about all of them. Inventing a name to fill the
 * gap would put an address on screen that bounces when somebody copies it onto
 * a calendar invite, which breaks the only conversion action on the page.
 *
 * One batch is fetched before the first paint and rerolls are served from it,
 * so clicking "try another name" costs nothing and the toy stays responsive.
 * The batch tops up in the background once it runs low, because the server caps
 * a single call at BATCH_SIZE and the full list cannot be pulled at once.
 *
 * Exclude carries every name shown this session so the backend keeps handing
 * back fresh ones. When the pool is genuinely exhausted the backend returns
 * nothing new, and rather than dead-ending on a disabled button the session
 * forgets what it has seen and starts the rotation again.
 */
function useMinion() {
  const [minion, setMinion] = useState<Minion | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const queue = useRef<Minion[]>([]);
  const seen = useRef<string[]>([]);
  const inFlight = useRef(false);

  const topUp = useCallback(async (allowRecycle = true) => {
    if (inFlight.current) return 0;
    inFlight.current = true;
    try {
      // Exclude what has been SHOWN and what is already QUEUED. Checking only
      // the shown list let a background top-up enqueue a name that was still
      // waiting in the queue, so the same name came round twice in a session.
      const queued = queue.current.map((m) => m.name);
      const known = new Set([...seen.current, ...queued]);
      let batch = await suggestMinions(BATCH_SIZE, [...known]);
      let fresh = batch.filter((m) => !known.has(m.name));
      // Nothing new came back and we have been running a while: the pool is
      // exhausted, not broken. Drop the exclusions and go round again.
      if (!fresh.length && allowRecycle && seen.current.length) {
        seen.current = [];
        batch = await suggestMinions(BATCH_SIZE, queued);
        fresh = batch.filter((m) => !queued.includes(m.name));
      }
      queue.current.push(...fresh);
      return fresh.length;
    } finally {
      inFlight.current = false;
    }
  }, []);

  const take = useCallback(() => {
    const next = queue.current.shift();
    if (!next) return false;
    seen.current = [...seen.current, next.name];
    setMinion(next);
    setStatus("ready");
    if (queue.current.length <= 2) void topUp();
    return true;
  }, [topUp]);

  const reroll = useCallback(async () => {
    if (take()) return;
    await topUp();
    if (!take()) setStatus("unavailable");
  }, [take, topUp]);

  useEffect(() => {
    void (async () => {
      await topUp();
      if (!take()) setStatus("unavailable");
    })();
    // Deliberately once on mount: topUp and take are stable callbacks.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { minion, status, reroll };
}

/**
 * The picker is rendered twice, at the top and at the close, but the name is
 * hoisted to the page so both show the SAME one. Two independent pickers meant
 * a visitor could be offered Juno in the hero and Milo at the bottom, which
 * makes "this is your team's name" incoherent, and it doubled the calls.
 */
type Picker = ReturnType<typeof useMinion>;

function NameCard({ picker, compact = false }: { picker: Picker; compact?: boolean }) {
  const { minion, status, reroll } = picker;
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    if (!minion) return;
    try {
      await navigator.clipboard.writeText(minion.address);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), COPY_RESET_MS);
    } catch {
      // Clipboard blocked: the address is selectable text either way.
    }
  };

  if (status === "unavailable") {
    // The hero already says this. Repeating it in the closing block just tells
    // the visitor the site is broken twice.
    if (compact) return null;
    return (
      <div>
        <p className="max-w-[30rem] text-[17px] leading-[1.6] text-quiet [text-wrap:pretty]">
          We cannot reach the name list right now, so there is nothing to hand
          you yet. Worth another go in a moment.
        </p>
        <button
          type="button"
          onClick={() => void reroll()}
          className="mt-6 rounded-full border border-hair px-5 py-2.5 text-[14px] font-medium text-ink outline-none transition-[border-color,transform] duration-200 hover:border-quiet/50 focus-visible:ring-2 focus-visible:ring-moss active:scale-[0.98]"
        >
          Try again
        </button>
      </div>
    );
  }

  const loading = status === "loading";
  const name = minion?.name ?? "";

  return (
    <div>
      <div
        // Keyed on the name so the entry animation replays on every roll. This
        // is the toy; it should feel good.
        key={name || "loading"}
        className="motion-safe:animate-[name-in_420ms_cubic-bezier(0.22,1.4,0.36,1)]"
      >
        {loading ? (
          // Sized to the real thing so the page does not jump when it lands.
          <div aria-hidden="true" className="pt-2">
            <div className={compact ? "h-[1.6rem] w-[5rem] rounded-lg bg-hair/60" : "h-[3.4rem] w-[9rem] rounded-lg bg-hair/60 sm:h-[4.6rem] sm:w-[12rem]"} />
            <div className="mt-4 h-4 w-[11rem] rounded bg-hair/50" />
          </div>
        ) : (
          <>
            <p
              aria-live="polite"
              className={`font-display font-semibold leading-[1] tracking-[-0.045em] text-ink ${compact ? "text-[1.8rem]" : "text-[4rem] sm:text-[5.5rem]"}`}
            >
              {displayName(name)}
            </p>
            <p className={`mt-3 font-mono tracking-tight text-quiet ${compact ? "text-[13.5px]" : "text-[15px] sm:text-[17px]"}`}>
              {minion!.address}
            </p>
          </>
        )}
      </div>

      <div className={`flex flex-wrap items-center gap-3 ${compact ? "mt-5" : "mt-8"}`}>
        <button
          type="button"
          onClick={copy}
          disabled={loading}
          className="grid rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-onink outline-none transition-[background-color,transform] duration-200 hover:bg-ink/90 focus-visible:ring-2 focus-visible:ring-moss active:scale-[0.98] disabled:opacity-50"
        >
          {/* Both labels stacked so the button never resizes on the swap. */}
          <span aria-hidden="true" className="invisible col-start-1 row-start-1">
            Copy address
          </span>
          <span className="col-start-1 row-start-1 text-center">
            {copied ? "Copied" : "Copy address"}
          </span>
        </button>

        {!compact && (
          <button
            type="button"
            onClick={() => void reroll()}
            disabled={loading}
            className="rounded-full border border-hair px-5 py-2.5 text-[14px] font-medium text-ink outline-none transition-[border-color,transform] duration-200 hover:border-quiet/50 focus-visible:ring-2 focus-visible:ring-moss active:scale-[0.98] disabled:opacity-60"
          >
            Try another name
          </button>
        )}
      </div>

      <p
        className={`max-w-[30rem] text-quiet [text-wrap:pretty] ${
          compact ? "mt-5 text-[13.5px] leading-[1.6]" : "mt-6 text-[15.5px] leading-[1.7]"
        }`}
      >
        Its name is its address. Put {name ? displayName(name) : "it"} on your
        next team meeting invite. Nothing to install, no account.
      </p>
    </div>
  );
}

/**
 * The loop, and the centrepiece of the page.
 *
 * One issue, start to finish, in the order it actually happens. The order is
 * the argument: it reads the issue, says how it hits THIS codebase, proposes a
 * plan, and then waits. The wait is the row that earns the trust, so it gets
 * its own line rather than being folded into the plan above it.
 *
 * Specifics are load bearing. A file name, a named cause and a file count are
 * things a diff could disprove, which is the only kind of claim this audience
 * reads. "Understands your code" is not on the page anywhere, because nothing
 * about it can be checked.
 */
const LOOP: { label: string; accent?: boolean; body: React.ReactNode }[] = [
  {
    label: "Issue #142 · payments-api",
    body: "Webhook retries double-charge on timeout.",
  },
  {
    label: "min.",
    body: (
      <>
        Traced it to the retry handler in{" "}
        <span className="font-mono text-[12.5px] text-ink">charge_worker.ts</span>.
        The idempotency key is minted after the network call, so a timeout mints
        a second one. Two files, no migration. Want me to do it?
      </>
    ),
  },
  { label: "You", body: "Do it." },
  {
    label: "PR #143 opened",
    accent: true,
    body: "2 files changed · awaiting your review.",
  },
];

/**
 * Demoted, deliberately. This was the whole product a generation ago and is now
 * the reason the plan above is right rather than plausible: it was in the room
 * when the constraint was set. Three dates, compressed to the one thread that
 * a ticket alone cannot tell you.
 */
const STANDUP: [string, string][] = [
  ["Aug 7", "Priya: billing migration needs two weeks of double writes first."],
  ["Aug 14", "Double writes start Monday, so cutover is the 28th at the earliest."],
  ["Aug 21", "Rollback plan still owed. In-flight invoices unanswered."],
];

/**
 * Not a pricing table. The rows split on what someone is allowed to do, and the
 * last one is the one no other coding agent has an answer for: a customer can
 * ask about the product without the codebase leaking through the answer.
 */
const ACCESS: [string, string][] = [
  ["Your team", "The whole engineer. It plans, writes the code, and opens the pull request."],
  [
    "Guests",
    "Contractors and partners ask about the code and propose changes as PRs. Write access stays with membership.",
  ],
  [
    "Your customers",
    "Ask-only. It answers what the product does without revealing how the code works, and files a clean issue when the answer is a bug.",
  ],
];

const H2 =
  "font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.025em] text-ink [text-wrap:balance]";
const BODY = "text-[15.5px] leading-[1.7] text-quiet [text-wrap:pretty]";
const EYEBROW = "font-mono text-[10.5px] uppercase tracking-[0.16em] text-quiet";

export default function MinionLanding() {
  const picker = useMinion();

  return (
    <div className="relative">
      {/*
        Fixed to the viewport so the text scrolls past it and it does not move.
        It reads where the text is and thins out behind it, so the clear patches
        travel with the words as you scroll.
      */}
      <div
        aria-hidden
        className="pointer-events-none fixed right-0 top-0 z-0 h-[22rem] w-[92%] [mask-image:linear-gradient(to_right,transparent,black_45%,black_88%,transparent)] md:h-[34rem] md:w-[58%]"
      >
        <MemoryField />
      </div>

      <div className="relative z-10 mx-auto max-w-[57rem] px-6 pb-28 pt-32 md:pt-[9.5rem]">
        {/* Hero */}
        <div className="max-w-[44rem]">
          <h1 className="font-display text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.03em] text-ink [text-wrap:balance] md:text-[2.6rem]">
            Meet your eng team's newest member.
          </h1>
          <p className="mt-5 max-w-[33rem] text-[17px] leading-[1.6] text-quiet [text-wrap:pretty]">
            An AI engineer that knows your codebase, joins your standups, and
            turns issues into pull requests you review.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="https://app.getmin.ai"
              className="inline-flex items-center rounded-full bg-moss px-6 py-3 text-[14.5px] font-medium text-onink transition-opacity hover:opacity-90"
            >
              Connect your repos
            </a>
            {/* The name mechanic is still real and still the way it gets into a
                meeting. It is no longer the front door, so it is a line. */}
            <a
              href="#room"
              className="text-[14.5px] text-quiet underline decoration-hair underline-offset-4 transition-colors hover:text-ink"
            >
              Or put it on your next standup
            </a>
          </div>
        </div>

        {/* The loop. */}
        <div id="loop" className="mt-28 scroll-mt-28 md:mt-32">
          <div className="max-w-[38rem]">
            <h2 className={H2}>Hand it the issue. Review the PR.</h2>
            <p className={`mt-7 ${BODY}`}>
              It reads the issue, tells you how it lands in your code, and
              proposes a plan. Then it asks. When you say go, it writes the code
              in its own sandbox and opens a pull request.
            </p>
          </div>

          <div className="mt-9 max-w-[40rem] rounded-2xl border border-hair bg-surface/80 p-6 md:p-8">
            <div className="flex flex-col">
              {LOOP.map(({ label, body, accent }) => (
                <div
                  key={label}
                  className="border-t border-hair py-4 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <p
                    className={`font-mono text-[10.5px] uppercase tracking-[0.16em] ${
                      accent ? "text-moss" : "text-quiet"
                    }`}
                  >
                    {label}
                  </p>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-ink/85 [text-wrap:pretty]">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className={`mt-7 max-w-[38rem] ${BODY}`}>
            It asks before it acts, and what it hands back is a diff you read.
            Nothing reaches your main branch that a person did not merge.
          </p>
        </div>

        {/* Why the plan is right: it was in the room. Supporting act. */}
        <div id="room" className="mt-28 scroll-mt-28 md:mt-32">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,32rem)_auto] lg:items-start lg:gap-16">
            <div>
              <h2 className={H2}>It was in the room.</h2>
              <div className={`mt-7 flex flex-col gap-4 ${BODY}`}>
                <p>
                  It sits in your standups, design reviews and incident calls,
                  reads the Slack thread, and you add it to the spec in Google
                  Docs the way you would add a teammate. So a plan comes back
                  with the constraint someone set three weeks ago, not just the
                  text of the ticket.
                </p>
                <p>
                  Ask it in Slack why cutover slipped and it answers from all
                  three standups. Ask for the rollback plan and it opens the PR.
                </p>
              </div>

              {/* The invite mechanic: still the way it gets into a meeting. */}
              <div id="name" className="mt-9 scroll-mt-28">
                <NameCard picker={picker} compact />
              </div>
            </div>

            <div className="lg:w-[19rem]">
              <p className={EYEBROW}>Weekly standup</p>
              <div className="mt-4 flex flex-col">
                {STANDUP.map(([date, note]) => (
                  <div key={date} className="border-t border-hair py-3.5 last:border-b">
                    <p className="font-mono text-[11.5px] text-quiet">{date}</p>
                    <p className="mt-1 text-[13.5px] leading-[1.55] text-ink/80 [text-wrap:pretty]">
                      {note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scope: one teammate, not one bot per repo. */}
        <div className="mt-28 max-w-[38rem] md:mt-32">
          <h2 className={H2}>One engineer, all your repos.</h2>
          <div className={`mt-7 flex flex-col gap-4 ${BODY}`}>
            <p>
              A project is a collection of repos, and it holds them together. A
              change that crosses three services is still one conversation with
              one teammate.
            </p>
            <p>
              It runs in the cloud, so you can type the prompt and close the
              laptop. Every step is in the session, streamed while it works and
              still there when you come back.
            </p>
          </div>
        </div>

        {/* Who can ask it what. */}
        <div className="mt-28 max-w-[38rem] md:mt-32">
          <h2 className={H2}>Everyone gets the right version.</h2>
          <div className="mt-8 flex flex-col">
            {ACCESS.map(([who, what]) => (
              <div key={who} className="border-t border-hair py-4 last:border-b">
                <p className={EYEBROW}>{who}</p>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-quiet [text-wrap:pretty]">
                  {what}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Models. One line, because it is one line. */}
        <div className="mt-24 max-w-[38rem] md:mt-28">
          <p className={BODY}>
            <span className="text-ink">Your models, your keys.</span>{" "}
            <span className="font-mono text-[14px] text-ink/80">
              Claude, GPT, Kimi, DeepSeek
            </span>
            .
          </p>
        </div>

        {/* Close */}
        <div className="mt-24 max-w-[38rem] border-t border-hair pt-12">
          <p className="font-display text-[19px] font-semibold tracking-[-0.02em] text-ink">
            Hand it the issue. Review the PR.
          </p>
          <div className="mt-6">
            <a
              href="https://app.getmin.ai"
              className="inline-flex items-center rounded-full bg-moss px-6 py-3 text-[14.5px] font-medium text-onink transition-opacity hover:opacity-90"
            >
              Connect your repos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

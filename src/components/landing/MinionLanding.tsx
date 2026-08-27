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
            <div className="h-[3.4rem] w-[9rem] rounded-lg bg-hair/60 sm:h-[4.6rem] sm:w-[12rem]" />
            <div className="mt-4 h-4 w-[11rem] rounded bg-hair/50" />
          </div>
        ) : (
          <>
            <p
              aria-live="polite"
              className="font-display text-[4rem] font-semibold leading-[1] tracking-[-0.045em] text-ink sm:text-[5.5rem]"
            >
              {displayName(name)}
            </p>
            <p className="mt-3 font-mono text-[15px] tracking-tight text-quiet sm:text-[17px]">
              {minion!.address}
            </p>
          </>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
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

      {!compact && (
        <p className="mt-6 max-w-[30rem] text-[15.5px] leading-[1.7] text-quiet [text-wrap:pretty]">
          Invite {name ? displayName(name) : "them"} to your next team meeting.
          Nothing to install, no account.
        </p>
      )}
    </div>
  );
}

/**
 * Four, not five. "Recurring meetings accumulate" used to sit here, but the
 * section below argues that same point at length and with the only visual on
 * the page, so stating it twice cost a line and taught nothing.
 */
const DOES: [string, string][] = [
  [
    // Leads on ownership, not attendance: the hero already says they sit in
    // your meetings, and repeating it here spent the strongest slot on a
    // sentence the visitor read ten seconds ago.
    "Take notes that belong to the team.",
    "Not to whoever happened to hit record.",
  ],
  [
    "Add them to a doc or a spreadsheet.",
    "Same as collaborating with a teammate in Google Docs or Sheets.",
  ],
  [
    "Ask them what the team knows.",
    "In the app, or in Slack.",
  ],
  [
    "They come with you.",
    "Reachable over MCP, so your team's context follows them into any AI tool of their choosing.",
  ],
];

/**
 * One thread across three weeks, not three unrelated notes.
 *
 * The section claims a recurring meeting gets deeper rather than longer, so the
 * example has to be something a single week cannot answer. Each entry here
 * depends on the one above it: the two week window sets the constraint, the
 * Monday start turns it into a date, and the open items put that date at risk.
 * Read any one row alone and you still do not know when billing can cut over.
 */
const STANDUP: [string, string][] = [
  ["Aug 7", "Priya: billing migration needs two weeks of double writes first."],
  [
    "Aug 14",
    "Launch held a week. Double writes start Monday, so cutover is the 28th at the earliest.",
  ],
  [
    "Aug 21",
    "Sam owes the rollback plan Thursday. In-flight invoices still unanswered.",
  ],
];

export default function MinionLanding() {
  const picker = useMinion();

  return (
    <div className="relative">
      {/*
        The field is fixed to the viewport, so the text scrolls and it does not.
        Pure CSS: no scroll listener, no transform driven by scroll position,
        nothing to jank and nothing to clean up. It is the cheapest parallax
        there is and the only one that cannot fall out of sync with the page.

        Readability decides the geometry. A field sized as a percentage of the
        viewport creeps further under the text the narrower the window gets:
        measured at 1440 it put 68% of itself beneath the reading column, with
        the brightest thing on it, the moss hub, sitting directly under the
        recurring-meetings column. So it is anchored to the container edge
        instead. 50% + 24rem is just inside the 57rem measure, which keeps the
        field tied to the layout rather than floating, while everything that
        actually reads sits in the gutter beyond the text.

        50% + 28.5rem is exactly half the 57rem measure, so the field begins
        where the container ends and the overlap is zero by construction, at
        every width, rather than small and tuned. That matters more than it
        sounds: light-mode secondary text measures 4.56:1, a hair over AA, so
        even six percent of tint behind it drops it to 4.19 and under. Nothing
        is printed over the field, so nothing can be dimmed by it.

        With readability settled by geometry, the mask is free to be a plain
        fade rather than a suppressor, and the field can sit at full strength
        across the gutter.

        Hidden below md, where there is no gutter to put it in.
      */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 right-0 z-0 hidden left-[calc(50%+28.5rem)] [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.55)_28%,black_60%)] md:block"
      >
        <MemoryField />
      </div>

      <div className="relative z-10 mx-auto max-w-[57rem] px-6 pb-28 pt-32 md:pt-[9.5rem]">
        {/* Hero */}
        <div className="max-w-[44rem]">
          <h1 className="font-display text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.03em] text-ink [text-wrap:balance] md:text-[2.6rem]">
            Meet your team's newest member.
          </h1>
          <p className="mt-5 max-w-[32rem] text-[17px] leading-[1.6] text-quiet [text-wrap:pretty]">
            They sit in your meetings, docs, and only answer to your team.
          </p>

          {/* Anchored: the nav CTA and every in-page call to action scroll
              here, because copying this address is the only conversion on the
              site. */}
          <div id="name" className="mt-12 scroll-mt-28">
            <NameCard picker={picker} />
          </div>
        </div>

        {/* What they do */}
        <div id="does" className="mt-28 max-w-[38rem] scroll-mt-28 md:mt-32">
          <h2 className="font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.025em] text-ink [text-wrap:balance]">
            What they do.
          </h2>
          <div className="mt-7 flex flex-col gap-4">
            {DOES.map(([lead, rest]) => (
              <p
                key={lead}
                className="text-[15.5px] leading-[1.7] text-quiet [text-wrap:pretty]"
              >
                <span className="text-ink">{lead}</span> {rest}
              </p>
            ))}
          </div>
        </div>

        {/* The differentiator, and the one place a figure earns itself. */}
        <div id="recurring" className="mt-28 scroll-mt-28 md:mt-32">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,32rem)_auto] lg:items-start lg:gap-16">
            <div>
              <h2 className="font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.025em] text-ink [text-wrap:balance]">
                A weekly meeting should get deeper, not longer.
              </h2>
              <div className="mt-7 flex flex-col gap-4 text-[15.5px] leading-[1.7] text-quiet [text-wrap:pretty]">
                <p>
                  Most notetakers hand you a new file every week. Forty
                  standups, forty documents, and what you need is spread across
                  all of them.
                </p>
                <p>
                  Yours treats the standup as one thing. What was decided in
                  March is still there in August, attached to the meeting it
                  came from.
                </p>
              </div>
            </div>

            <div className="lg:w-[19rem]">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-quiet">
                Weekly standup
              </p>
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
              <p className="mt-4 text-[13.5px] leading-[1.6] text-quiet [text-wrap:pretty]">
                Ask when billing can cut over and they answer from all three.
              </p>
            </div>
          </div>
        </div>

        {/* Close */}
        <div className="mt-24 max-w-[38rem] border-t border-hair pt-12">
          <p className="font-display text-[19px] font-semibold tracking-[-0.02em] text-ink">
            Put them on your next invite.
          </p>
          <div className="mt-6">
            <NameCard picker={picker} compact />
          </div>
        </div>
      </div>
    </div>
  );
}

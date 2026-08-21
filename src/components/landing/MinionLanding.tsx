import { useCallback, useEffect, useRef, useState } from "react";
import MemoryField from "./MemoryField";
import { displayName, suggestMinions, type Minion } from "@/lib/minions";

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
 */
function useMinion() {
  const [minion, setMinion] = useState<Minion | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  // Every name shown this session, so "try another" never repeats itself.
  const seen = useRef<string[]>([]);

  const pull = useCallback(async () => {
    setStatus("loading");
    const [next] = await suggestMinions(1, seen.current);
    if (next) {
      seen.current = [...seen.current, next.name].slice(-24);
      setMinion(next);
      setStatus("ready");
    } else {
      setStatus("unavailable");
    }
  }, []);

  useEffect(() => {
    void pull();
  }, [pull]);

  return { minion, status, reroll: pull };
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
          Invite {name ? displayName(name) : "them"} to your next team meeting.{" "}
          {name ? displayName(name) : "They"} takes it from there.
        </p>
      )}
    </div>
  );
}

const DOES: [string, string][] = [
  [
    "They are in your team meetings.",
    "They take the notes, and the notes belong to the team, not to whoever happened to hit record.",
  ],
  [
    "Recurring meetings accumulate.",
    "A weekly standup becomes one thing that keeps getting deeper, instead of forty unrelated files.",
  ],
  [
    "Ask them what the team knows.",
    "In the app, or straight in Slack once they are in your channels.",
  ],
  [
    "Your team's context, in your other tools.",
    "They are reachable over MCP, so the same context follows you into whatever AI tool you already use.",
  ],
];

const STANDUP: [string, string][] = [
  ["Aug 7", "Priya flagged the migration risk on the billing service."],
  ["Aug 14", "Decided to hold the launch a week rather than ship it half tested."],
  ["Aug 21", "Sam still owes the comparison table before Thursday."],
];

export default function MinionLanding() {
  const picker = useMinion();

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[22rem] w-[92%] [mask-image:linear-gradient(to_right,transparent,black_45%,black_88%,transparent)] md:h-[34rem] md:w-[58%]"
      >
        <MemoryField />
      </div>

      <div className="relative mx-auto max-w-[57rem] px-6 pb-28 pt-32 md:pt-[9.5rem]">
        {/* Hero */}
        <div className="max-w-[44rem]">
          <h1 className="font-display text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.03em] text-ink [text-wrap:balance] md:text-[2.6rem]">
            Meet your team's minion.
          </h1>
          <p className="mt-5 max-w-[32rem] text-[17px] leading-[1.6] text-quiet [text-wrap:pretty]">
            You don't install software. You meet someone.
          </p>

          <div className="mt-12">
            <NameCard picker={picker} />
          </div>
        </div>

        {/* What happens next. No numbered stages: the verbs are the labels. */}
        <div className="mt-28 max-w-[38rem] md:mt-32">
          <h2 className="font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.025em] text-ink [text-wrap:balance]">
            What happens when you invite them.
          </h2>
          <div className="mt-7 flex flex-col gap-4 text-[15.5px] leading-[1.7] text-quiet [text-wrap:pretty]">
            <p>
              <span className="text-ink">You put the address on a real invite,</span>{" "}
              or you email it. Nothing to install, no account to make first.
            </p>
            <p>
              <span className="text-ink">The name becomes your team's.</span> The
              first mail creates the team and the name is yours from then on.
            </p>
            <p>
              <span className="text-ink">They write back and introduce themselves,</span>{" "}
              with a few things they can do for you.
            </p>
            <p>
              <span className="text-ink">After that they are just in your meetings.</span>{" "}
              You stop thinking about it.
            </p>
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
                  Most notetakers hand you a new file every week. Forty standups
                  is forty documents, and the thing you actually want to know is
                  spread across all of them.
                </p>
                <p>
                  A minion treats the standup as one continuous thing. What was
                  decided in March is still there in August, attached to the
                  meeting it came from.
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
                Ask what is blocking the migration and they answer from all
                three.
              </p>
            </div>
          </div>
        </div>

        {/* Against notetakers */}
        <div className="mt-28 max-w-[38rem] md:mt-32">
          <h2 className="font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.025em] text-ink [text-wrap:balance]">
            Not a notetaker with a login.
          </h2>
          <div className="mt-7 flex flex-col gap-4 text-[15.5px] leading-[1.7] text-quiet [text-wrap:pretty]">
            <p>
              Other notetakers are built for one person, or for a sales team.
              The recording is yours, the notes are yours, and your colleague
              starts from nothing.
            </p>
            <p>
              A minion belongs to the team. The context is shared because of how
              it works, not because somebody remembered to share a link, and the
              name is what makes that legible: everyone knows who they are and
              what they were in the room for.
            </p>
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

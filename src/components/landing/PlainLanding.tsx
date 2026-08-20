import { useState } from "react";
import { Users, Video } from "lucide-react";
import MemoryField from "./MemoryField";
import { getDownloadTarget } from "@/lib/download";

/**
 * The landing page, sixth pass: minimal and sleek, per Eric.
 *
 * The previous version had drifted. Seven example cards laid out flat ran the
 * page past 2800px, which is the opposite of the fifteen-second read it was
 * supposed to be. The examples themselves were right, so none of that copy
 * changed; what changed is that they no longer all shout at once.
 *
 * The band became a rail and a stage. Seven words down the left read in about
 * two seconds and carry the whole capability list on their own. One example
 * sits beside them, full size and untilted, because a single card has nothing
 * to scatter against and precision reads better than arrangement here.
 *
 * Type is Geist and Geist Mono, one super family. The site had been on Inter
 * with Space Grotesk display, which is the pairing every generated page
 * reaches for. Mono is load bearing rather than decorative: it marks the two
 * things that are literally machine addresses, the rail and the email.
 *
 * Colour is a green biased neutral ramp against one deep accent, so the greys
 * belong to the accent rather than sitting next to it.
 */

/*
 * Shape lock, two tiers and no third: every interactive control is a full
 * pill, matching the nav; every surface is rounded-xl. Inline chips are
 * rounded (4px) and anything mimicking a real client control (avatars, RSVP
 * pills) keeps that control's own shape. Nothing else invents a radius.
 */
const ADDRESS = "min@getmin.ai";

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked: the mailto links still work.
    }
  };
  return { copied, copy };
}

/** The one piece of emphasis in the cards: min. wherever it is addressed. */
function MinChip() {
  return (
    <span className="rounded bg-moss-soft px-1.5 py-0.5 font-medium text-moss">
      {ADDRESS}
    </span>
  );
}

function Avatar({ initial, isMin = false }: { initial: string; isMin?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold ${
        isMin ? "bg-ink text-white" : "bg-hair/60 text-quiet"
      }`}
    >
      {initial}
    </span>
  );
}

/** The stage card. No tilt, no label: the rail names it. */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-hair bg-white shadow-[0_1px_2px_rgba(12,18,17,0.04),0_16px_40px_-28px_rgba(12,18,17,0.22)]">
      {children}
    </div>
  );
}

function GuestAvatar({ initial, tone }: { initial: string; tone: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-semibold text-white ${tone}`}
    >
      {initial}
    </span>
  );
}

function SurfaceHeader({ app, where }: { app: string; where: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-hair/70 px-4 py-2.5">
      <span className="text-[12px] font-medium text-quiet">{app}</span>
      <span aria-hidden="true" className="text-[12px] text-hair">
        ·
      </span>
      <span className="truncate text-[12px] text-quiet">{where}</span>
    </div>
  );
}

function SquareAvatar({ initial, tone }: { initial: string; tone: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-6 w-6 shrink-0 place-items-center rounded-[5px] text-[10px] font-semibold text-white ${tone}`}
    >
      {initial}
    </span>
  );
}

function AppBadge() {
  return (
    <span className="rounded-[3px] bg-hair/60 px-1 py-px text-[9px] font-semibold uppercase tracking-wide text-quiet">
      App
    </span>
  );
}

function ScheduleCard() {
  return (
    <Frame>
      <div className="flex items-start gap-3 px-4 pt-4">
        <Avatar initial="E" />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[13.5px] font-semibold text-ink">Eric Wang</span>
            <span className="shrink-0 text-[12px] text-quiet">10:24 AM</span>
          </div>
          <p className="mt-0.5 text-[12.5px] leading-relaxed text-quiet">
            To: sarah@northwind.co
          </p>
          <p className="text-[12.5px] leading-relaxed text-quiet">
            Cc: <MinChip />
          </p>
        </div>
      </div>
      <div className="mt-3 border-t border-hair/70 px-4 py-3.5">
        <p className="text-[13.5px] font-semibold text-ink">Intro call</p>
        <p className="mt-1 text-[13.5px] leading-relaxed text-quiet">
          Sarah, great meeting you. Can we find 30 minutes next week? Putting
          min. on Cc to sort out a time.
        </p>
      </div>
    </Frame>
  );
}

function NotetakerCard() {
  return (
    <Frame>
      {/* Title block: colour chip, name, when, recurrence. */}
      <div className="flex items-start gap-2.5 px-4 pt-4">
        <span
          aria-hidden="true"
          className="mt-[6px] h-3 w-3 shrink-0 rounded-[3px] bg-indigo-400"
        />
        <div className="min-w-0">
          <p className="text-[15px] leading-tight text-ink">
            Weekly design sync
          </p>
          <p className="mt-1.5 text-[12.5px] leading-snug text-quiet">
            Thursday, August 21 · 2:00 to 2:30pm
          </p>
          <p className="text-[12.5px] leading-snug text-quiet">
            Weekly on Thursday
          </p>
        </div>
      </div>

      {/* Conferencing and guests share a row: the card is wide enough that
          stacking them only bought height. */}
      <div className="mt-4 grid gap-4 px-4 pb-4 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <Video className="mt-px h-4 w-4 shrink-0 text-quiet" strokeWidth={1.75} />
          <div className="min-w-0">
            <p className="text-[12.5px] leading-snug text-ink/75">
              Join with Google Meet
            </p>
            <p className="text-[12px] leading-snug text-quiet">
              meet.google.com/rkx-hqvn
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users className="mt-px h-4 w-4 shrink-0 text-quiet" strokeWidth={1.75} />
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] leading-snug text-ink/75">3 guests, 3 yes</p>
            <ul className="mt-2 space-y-1.5">
              <li className="flex items-center gap-2.5">
                <GuestAvatar initial="P" tone="bg-rose-400" />
                <span className="text-[12.5px] text-ink/75">
                  Priya Shah{" "}
                  <span className="text-quiet">Organizer</span>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <GuestAvatar initial="E" tone="bg-indigo-400" />
                <span className="text-[12.5px] text-ink/75">Eric Wang</span>
              </li>
              <li className="flex items-center gap-2.5">
                <GuestAvatar initial="m" tone="bg-ink" />
                <span className="text-[12.5px]">
                  <MinChip />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* RSVP bar. */}
      <div className="flex items-center gap-2 border-t border-hair/70 px-4 py-3">
        <span className="mr-0.5 text-[12.5px] text-quiet">Going?</span>
        <span className="rounded-full border border-ink/35 px-3 py-[3px] text-[11.5px] font-medium text-ink">
          Yes
        </span>
        <span className="rounded-full border border-hair px-3 py-[3px] text-[11.5px] text-quiet">
          No
        </span>
        <span className="rounded-full border border-hair px-3 py-[3px] text-[11.5px] text-quiet">
          Maybe
        </span>
      </div>
    </Frame>
  );
}

function ReminderCard() {
  return (
    <Frame>
      <div className="flex items-start gap-3 px-4 pt-4">
        <Avatar initial="E" />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[13.5px] font-semibold text-ink">Eric Wang</span>
            <span className="shrink-0 text-[12px] text-quiet">4:02 PM</span>
          </div>
          <p className="mt-0.5 text-[12.5px] leading-relaxed text-quiet">
            To: <MinChip />
          </p>
        </div>
      </div>
      <div className="mt-3 border-t border-hair/70 px-4 py-3.5">
        <p className="text-[13.5px] font-semibold text-ink">
          Fwd: Pricing proposal
        </p>
        <p className="mt-1 text-[13.5px] leading-relaxed text-quiet">
          Remind me to check in with John in 3 months.
        </p>
        {/* The quoted original. Without it the card asks you to take the
            three months on faith; with it, John is the one who set the date. */}
        <div className="mt-3 border-l-2 border-hair pl-3">
          <p className="text-[11.5px] leading-snug text-quiet">
            From: John Reyes
          </p>
          <p className="text-[11.5px] leading-snug text-quiet">
            Aug 19, 3:48 PM
          </p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-quiet">
            Thanks for putting this together. We're not budgeting for new
            tooling until Q1. Check back with me then.
          </p>
        </div>
      </div>
    </Frame>
  );
}

function FollowUpCard() {
  return (
    <Frame>
      <div className="flex items-start gap-3 px-4 pt-4">
        <Avatar initial="E" />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[13.5px] font-semibold text-ink">Eric Wang</span>
            <span className="shrink-0 text-[12px] text-quiet">9:15 AM</span>
          </div>
          <p className="mt-0.5 text-[12.5px] leading-relaxed text-quiet">
            To: <MinChip />
          </p>
        </div>
      </div>
      <div className="mt-3 border-t border-hair/70 px-4 py-3.5">
        <p className="text-[13.5px] font-semibold text-ink">
          Fwd: Contract redlines
        </p>
        <p className="mt-1 text-[13.5px] leading-relaxed text-quiet">
          Keep after Maya on this until she replies. Send it from me.
        </p>
      </div>
      <div className="border-t border-hair/70 px-4 py-2.5">
        <p className="text-[12px] leading-relaxed text-quiet">
          Nudged twice from your address. Maya replied Aug 18.
        </p>
      </div>
    </Frame>
  );
}

function ReplyCard() {
  return (
    <Frame>
      <div className="flex items-start gap-3 px-4 pt-4">
        <Avatar initial="m" isMin />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            {/* The reply is the one card where min. is the sender, so the
                address belongs on the From line the way a mail client shows
                it, not just in the body. */}
            <span className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-[13.5px] font-semibold text-ink">min.</span>
              <span className="text-[12.5px]">
                <MinChip />
              </span>
            </span>
            <span className="shrink-0 text-[12px] text-quiet">now</span>
          </div>
          <p className="mt-1 text-[12.5px] leading-relaxed text-quiet">To: you</p>
        </div>
      </div>
      <div className="mt-3 border-t border-hair/70 px-4 py-3.5">
        <p className="text-[13.5px] font-semibold text-ink">
          Re: what did we decide about the pricing page?
        </p>
        <p className="mt-1 text-[13.5px] leading-relaxed text-quiet">
          On the Aug 12 call you and Priya agreed to hold at $20 a seat and
          revisit after launch. Sam was going to redo the comparison table.
        </p>
      </div>
    </Frame>
  );
}

function AskCard() {
  return (
    <Frame>
      <SurfaceHeader app="Slack" where="#northwind-deal" />
      <div className="space-y-3.5 px-4 py-3.5">
        <div className="flex items-start gap-2.5">
          <SquareAvatar initial="E" tone="bg-indigo-400" />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-[12.5px] font-semibold text-ink">
                Eric Wang
              </span>
              <span className="text-[11.5px] text-quiet">2:41 PM</span>
            </div>
            <p className="mt-0.5 text-[13px] leading-relaxed text-quiet">
              <span className="rounded bg-moss-soft px-1 py-0.5 font-medium text-moss">
                @min
              </span>{" "}
              what did we promise Northwind on the last call?
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <SquareAvatar initial="m" tone="bg-ink" />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-[12.5px] font-semibold text-ink">
                min.
              </span>
              <AppBadge />
              <span className="text-[11.5px] text-quiet">2:41 PM</span>
            </div>
            <p className="mt-0.5 text-[13px] leading-relaxed text-quiet">
              The revised proposal by Friday, and a pilot for their west coast
              team. Sarah asked for both on Aug 14.
            </p>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function RitualCard() {
  return (
    <Frame>
      <SurfaceHeader app="Teams" where="Sales · General" />
      <div className="px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <Avatar initial="m" isMin />
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-[12.5px] font-semibold text-ink">min.</span>
            <AppBadge />
            <span className="text-[11.5px] text-quiet">Monday, 8:00 AM</span>
          </div>
        </div>
        <p className="mt-3 text-[13.5px] font-semibold text-ink">
          Monday summary
        </p>
        <ul className="mt-1.5 space-y-1">
          {[
            "Northwind moved to contract review.",
            "4 follow ups went out, 3 came back.",
            "Sam still owes the comparison table.",
          ].map((line) => (
            <li
              key={line}
              className="flex gap-2 text-[13px] leading-relaxed text-quiet"
            >
              <span aria-hidden="true" className="text-hair">
                ·
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

/* ── The rail ─────────────────────────────────────────────────────────────
 *
 * Seven words carry the product. Each one names a thing min. does and, read
 * top to bottom, they are the whole feature list without a single card open.
 * The line under each is what that thing actually is, in the reader's terms.
 */
const EXAMPLES = [
  {
    key: "schedule",
    label: "Schedule",
    line: "Put min. on Cc and it sorts out the time with them.",
    Card: ScheduleCard,
  },
  {
    key: "notetaker",
    label: "Notetaker",
    line: "Add it to the invite and it writes up the meeting.",
    Card: NotetakerCard,
  },
  {
    key: "reminder",
    label: "Reminder",
    line: "Forward a thread and it comes back when it matters.",
    Card: ReminderCard,
  },
  {
    key: "follow-up",
    label: "Follow up",
    line: "It keeps after someone until they reply, from your address.",
    Card: FollowUpCard,
  },
  {
    key: "remember",
    label: "Remember",
    line: "Ask what was decided and it tells you who said what.",
    Card: ReplyCard,
  },
  { key: "ask", label: "Ask", line: "Same answers, in Slack or Teams.", Card: AskCard },
  {
    key: "rituals",
    label: "Rituals",
    line: "Briefs and summaries that arrive without being asked.",
    Card: RitualCard,
  },
];

function Stage() {
  const [active, setActive] = useState(0);
  const current = EXAMPLES[active];
  const Card = current.Card;

  return (
    <div
      id="does"
      className="mt-20 scroll-mt-28 md:mt-24"
      onKeyDown={(e) => {
        if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
        e.preventDefault();
        const next =
          e.key === "ArrowDown"
            ? (active + 1) % EXAMPLES.length
            : (active - 1 + EXAMPLES.length) % EXAMPLES.length;
        setActive(next);
        document.getElementById(`rail-${EXAMPLES[next].key}`)?.focus();
      }}
    >
      <div className="grid gap-10 lg:grid-cols-[max-content_minmax(0,43rem)] lg:gap-16">
        {/* Rail */}
        <div role="tablist" aria-label="What min. can do" className="flex flex-col">
          {EXAMPLES.map((ex, i) => {
            const on = i === active;
            return (
              <button
                key={ex.key}
                id={`rail-${ex.key}`}
                role="tab"
                type="button"
                aria-selected={on}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="group relative -ml-3 flex items-center gap-3 rounded px-3 py-1 text-left leading-5 outline-none focus-visible:ring-1 focus-visible:ring-moss"
              >
                <span
                  aria-hidden="true"
                  className={`h-px transition-all duration-300 ease-out ${
                    on ? "w-5 bg-moss" : "w-2 bg-hair group-hover:w-3.5"
                  }`}
                />
                <span
                  className={`font-mono text-[11.5px] uppercase tracking-[0.16em] transition-colors duration-200 ${
                    on ? "text-ink" : "text-quiet group-hover:text-ink"
                  }`}
                >
                  {ex.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Stage. The min-height holds the frame steady so switching does not
            shunt the page around; the tallest card sets it. */}
        <div className="flex flex-col lg:min-h-[19rem]">
          <p
            key={`${current.key}-line`}
            className="mb-5 max-w-[26rem] text-[15px] leading-[1.6] text-quiet motion-safe:animate-[stage-in_320ms_ease-out]"
          >
            {current.line}
          </p>
          <div
            key={current.key}
            className="motion-safe:animate-[stage-in_320ms_ease-out]"
          >
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The primary call to action. It reads as a field you copy out of, which is
 * what it is, and which is also the treatment Eric asked for the address to
 * have: a highlighted line, the way a dev tool shows you a value.
 */
function AddressField() {
  const { copied, copy } = useCopy();
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-hair bg-white py-1.5 pl-5 pr-1.5 shadow-[0_1px_2px_rgba(12,18,17,0.05)]">
      <a
        href={`mailto:${ADDRESS}?subject=hi%20min.`}
        className="font-mono text-[15px] tracking-tight text-ink transition-colors duration-200 hover:text-moss sm:text-[16px]"
      >
        {ADDRESS}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${ADDRESS}`}
        className={`ml-1 grid rounded-full px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] outline-none transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-moss ${
          copied ? "bg-moss-soft text-moss" : "text-quiet hover:bg-paper hover:text-ink"
        }`}
      >
        <span aria-hidden="true" className="invisible col-start-1 row-start-1">
          copied
        </span>
        <span className="col-start-1 row-start-1 text-center">
          {copied ? "copied" : "copy"}
        </span>
      </button>
    </span>
  );
}

function AddressLine({ size = "lg" }: { size?: "lg" | "sm" }) {
  const { copied, copy } = useCopy();
  const big = size === "lg";
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <a
        href={`mailto:${ADDRESS}?subject=hi%20min.`}
        className={`group relative font-mono tracking-tight text-ink ${
          big ? "text-[19px] sm:text-[23px]" : "text-[17px]"
        }`}
      >
        {ADDRESS}
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 h-px w-full bg-hair transition-colors duration-300 group-hover:bg-moss"
        />
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${ADDRESS}`}
        className={`grid font-mono text-[10.5px] uppercase tracking-[0.16em] outline-none transition-colors duration-300 focus-visible:text-ink ${
          copied ? "text-moss" : "text-quiet hover:text-ink"
        }`}
      >
        <span aria-hidden="true" className="invisible col-start-1 row-start-1">
          copied
        </span>
        <span className="col-start-1 row-start-1 text-left">
          {copied ? "copied" : "copy"}
        </span>
      </button>
    </span>
  );
}

const TEAM = [
  ["Team notes.", "Everyone who was in the room gets them, and can ask about it later."],
  ["Team reminders.", "What was promised and who owes what, brought back when it matters."],
  ["Team rituals.", "Briefs and summaries to your inbox, Slack, or Teams, on your schedule."],
];

export default function PlainLanding() {
  return (
    <div className="relative overflow-hidden">
      {/* The graphic sits behind and to the right of the hero, bleeding off
          the edge and masked so it never competes with the headline. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[22rem] w-[92%] [mask-image:linear-gradient(to_right,transparent,black_45%,black_88%,transparent)] md:h-[36rem] md:w-[62%]"
      >
        <MemoryField />
      </div>

      <div className="relative mx-auto max-w-[57rem] px-6 pb-28 pt-32 md:pt-[9.5rem]">
        {/* Hero */}
        <div className="max-w-[44rem]">
          <h1 className="font-display text-[2.7rem] font-semibold leading-[1.04] tracking-[-0.035em] text-ink [text-wrap:balance] md:text-[3.4rem]">
            The AI teammate that does the little things right.
          </h1>
          <p className="mt-6 max-w-[31rem] text-[17px] leading-[1.6] text-quiet [text-wrap:pretty]">
            min. remembers, schedules, takes notes, and follows up. For you and
            your team.
          </p>

          <div className="mt-10">
            <div className="flex flex-wrap items-center gap-3">
              <AddressField />
              <a
                href={getDownloadTarget().href}
                className="inline-flex items-center rounded-full bg-ink px-5 py-[11px] text-[14px] font-medium text-white shadow-[0_1px_2px_rgba(12,18,17,0.10)] transition-transform duration-200 hover:bg-ink/90 active:translate-y-px motion-reduce:transition-none"
              >
                {getDownloadTarget().label}
              </a>
            </div>
            <p className="mt-4 text-[14.5px] leading-[1.7] text-quiet">
              Just shoot a hello email to min. to get started.{" "}
              <span className="text-ink">No sign up.</span> Free to use.
            </p>
          </div>
        </div>

        <Stage />

        {/* Teams */}
        <div id="team" className="mt-28 max-w-[38rem] scroll-mt-28 md:mt-36">
          <h2 className="font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.025em] text-ink">
            It works the same way for your team.
          </h2>
          <div className="mt-7 flex flex-col gap-4">
            {TEAM.map(([lead, rest]) => (
              <p
                key={lead}
                className="text-[15.5px] leading-[1.7] text-quiet [text-wrap:pretty]"
              >
                <span className="text-ink">{lead}</span> {rest}
              </p>
            ))}
          </div>
          <p className="mt-6 text-[15.5px] leading-[1.7] text-quiet [text-wrap:pretty]">
            Share your own context with your team. You are always in control.
          </p>
        </div>

        {/* Close */}
        <div className="mt-24 max-w-[38rem] border-t border-hair pt-12">
          <p className="font-display text-[19px] font-semibold tracking-[-0.02em] text-ink">
            Give it something small today.
          </p>
          <div className="mt-5">
            <AddressLine size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

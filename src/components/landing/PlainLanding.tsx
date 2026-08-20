import { useState } from "react";
import Constellation from "./Constellation";
import { getDownloadTarget } from "@/lib/download";

/**
 * The whole landing page as one typeset document.
 *
 * Design rules, per Eric: plain text does the work, decoration lives in the
 * BACKGROUND, and the page should be understood in fifteen seconds.
 *
 * Layout, fourth pass. The examples are things you would actually see in your
 * mail client, not code: real message chrome, sender rows, sans-serif bodies.
 * They are not all email either, because using min. is not all email; the
 * capture example is a calendar invite with min. on the guest list, and the
 * scheduling example is a normal note to a human with min. on Cc, which is how
 * scheduling actually works. One card is min.'s reply, so the stack shows what
 * comes back and not only what goes in.
 *
 * The band breaks out of the reading column to use the horizontal space, while
 * the prose stays at a comfortable measure.
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
    <span className="rounded bg-emerald-50 px-1.5 py-0.5 font-medium text-emerald-700">
      {ADDRESS}
    </span>
  );
}

function Avatar({ initial, isMin = false }: { initial: string; isMin?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold ${
        isMin ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500"
      }`}
    >
      {initial}
    </span>
  );
}

function Shell({
  label,
  tilt,
  dy,
  z,
  children,
}: {
  label: string;
  tilt: number;
  dy: number;
  z: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative"
      style={{
        transform: `rotate(${tilt}deg) translateY(calc(${dy}px * var(--drift, 1)))`,
        zIndex: z,
      }}
    >
      <p className="mb-2 pl-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
        {label}
      </p>
      <div className="rounded-xl border border-gray-200/90 bg-white shadow-[0_18px_50px_-24px_rgba(0,0,0,0.28)] transition-transform duration-300 ease-out hover:-translate-y-1">
        {children}
      </div>
    </div>
  );
}

/* ── Schedule: a normal note to a person, with min. on Cc ─────────────── */
function ScheduleCard() {
  return (
    <Shell label="Schedule" tilt={-0.7} dy={0} z={4}>
      <div className="flex items-start gap-3 px-4 pt-4">
        <Avatar initial="E" />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[13.5px] font-semibold text-gray-900">Eric Wang</span>
            <span className="shrink-0 text-[12px] text-gray-400">10:24 AM</span>
          </div>
          <p className="mt-0.5 text-[12.5px] leading-relaxed text-gray-500">
            To: sarah@northwind.co
          </p>
          <p className="text-[12.5px] leading-relaxed text-gray-500">
            Cc: <MinChip />
          </p>
        </div>
      </div>
      <div className="mt-3 border-t border-gray-100 px-4 py-3.5">
        <p className="text-[13.5px] font-semibold text-gray-900">Intro call</p>
        <p className="mt-1 text-[13.5px] leading-relaxed text-gray-600">
          Sarah, great meeting you. Can we find 30 minutes next week? Putting
          min. on Cc to sort out a time.
        </p>
      </div>
    </Shell>
  );
}

/* ── Capture: an actual calendar invite, min. on the guest list ────────── */
function InviteCard() {
  return (
    <Shell label="Capture" tilt={0.6} dy={26} z={3}>
      <div className="flex items-start gap-3.5 px-4 py-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-gray-200 bg-gray-50 leading-none">
          <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400">
            Aug
          </span>
          <span className="mt-0.5 font-display text-[16px] font-semibold text-gray-900">
            21
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13.5px] font-semibold text-gray-900">
            Weekly design sync
          </p>
          <p className="mt-0.5 text-[12.5px] text-gray-500">
            Thursday, 2:00 to 2:30 PM
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 border-t border-gray-100 px-4 py-3">
        <span className="text-[12px] text-gray-400">Guests</span>
        <span className="text-[12.5px] text-gray-600">Eric, Priya, Sam,</span>
        <span className="text-[12.5px]">
          <MinChip />
        </span>
      </div>
    </Shell>
  );
}

/* ── Follow up: forward a thread, one line ─────────────────────────────── */
function ForwardCard() {
  return (
    <Shell label="Follow up" tilt={0.7} dy={-16} z={2}>
      <div className="flex items-start gap-3 px-4 pt-4">
        <Avatar initial="E" />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[13.5px] font-semibold text-gray-900">Eric Wang</span>
            <span className="shrink-0 text-[12px] text-gray-400">4:02 PM</span>
          </div>
          <p className="mt-0.5 text-[12.5px] leading-relaxed text-gray-500">
            To: <MinChip />
          </p>
        </div>
      </div>
      <div className="mt-3 border-t border-gray-100 px-4 py-3.5">
        <p className="text-[13.5px] font-semibold text-gray-900">
          Fwd: Pricing proposal
        </p>
        <p className="mt-1 text-[13.5px] leading-relaxed text-gray-600">
          Remind me to follow up with John in 3 months.
        </p>
      </div>
    </Shell>
  );
}

/* ── Remember: what comes back ─────────────────────────────────────────── */
function ReplyCard() {
  return (
    <Shell label="Remember" tilt={-0.6} dy={14} z={1}>
      <div className="flex items-start gap-3 px-4 pt-4">
        <Avatar initial="m" isMin />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[13.5px] font-semibold text-gray-900">min.</span>
            <span className="shrink-0 text-[12px] text-gray-400">now</span>
          </div>
          <p className="mt-0.5 text-[12.5px] leading-relaxed text-gray-500">To: you</p>
        </div>
      </div>
      <div className="mt-3 border-t border-gray-100 px-4 py-3.5">
        <p className="text-[13.5px] font-semibold text-gray-900">
          Re: what did we decide about the pricing page?
        </p>
        <p className="mt-1 text-[13.5px] leading-relaxed text-gray-600">
          On the Aug 12 call you and Priya agreed to hold at $20 a seat and
          revisit after launch. Sam was going to redo the comparison table.
        </p>
      </div>
    </Shell>
  );
}

function AddressLine() {
  const { copied, copy } = useCopy();
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <a
        href={`mailto:${ADDRESS}?subject=hi%20min.`}
        className="group relative font-mono text-[17px] tracking-tight text-gray-900 sm:text-[19px]"
      >
        {ADDRESS}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-full bg-gray-300 transition-colors duration-300 group-hover:bg-gray-900"
        />
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${ADDRESS}`}
        className={`w-[5ch] text-left font-mono text-[10.5px] uppercase tracking-[0.16em] outline-none transition-colors duration-300 focus-visible:text-gray-900 ${
          copied ? "text-emerald-600" : "text-gray-400 hover:text-gray-900"
        }`}
      >
        {copied ? "copied" : "copy"}
      </button>
    </span>
  );
}

export default function PlainLanding() {
  return (
    <div className="relative overflow-hidden">
      {/* All decoration lives back here. */}
      <div aria-hidden className="absolute -right-48 -top-16 h-[540px] w-[760px] opacity-[0.55]">
        <Constellation />
      </div>
      <div aria-hidden className="absolute -left-56 bottom-8 h-[480px] w-[700px] opacity-[0.3]">
        <Constellation />
      </div>

      {/* One container, one left margin. Prose is held to a readable measure
          inside it; the examples use the full width and spill right. */}
      <div className="relative mx-auto max-w-[62rem] px-6 pb-28 pt-32 md:pt-40">
        <div className="max-w-[41rem]">
          <h1 className="font-display text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.025em] text-gray-900 [text-wrap:balance] md:text-[3.4rem]">
            The AI teammate that does the little things.
          </h1>
          <p className="mt-6 max-w-[34rem] text-[17.5px] leading-[1.65] text-gray-500 [text-wrap:pretty]">
            min. remembers, schedules, takes notes, and follows up. For you and
            your team.
          </p>

          <div className="mt-10">
            <AddressLine />
            <p className="mt-4 max-w-[34rem] text-[15px] leading-[1.7] text-gray-500 [text-wrap:pretty]">
              Email it. CC it on a thread that needs scheduling. Invite it to a
              meeting. That is the whole onboarding.
            </p>
            <p className="mt-1.5 text-[15px] leading-[1.7] text-gray-500">
              Or{" "}
              <a
                href={getDownloadTarget().href}
                className="text-gray-900 underline decoration-gray-300 decoration-1 underline-offset-[5px] transition-colors duration-300 hover:decoration-gray-900"
              >
                download the desktop app
              </a>
              . Free to use.
            </p>
          </div>
        </div>

        {/* ── The examples ── */}
        <div
          id="does"
          className="mt-20 scroll-mt-24 [--drift:0.3] sm:[--drift:1]"
        >
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 sm:gap-y-7">
            <ScheduleCard />
            <InviteCard />
            <ForwardCard />
            <ReplyCard />
          </div>
        </div>

        {/* ── Trust, as prose with ink-weighted clauses ── */}
        <div id="trust" className="mt-28 max-w-[34rem] scroll-mt-24">
          <h2 className="font-display text-[16.5px] font-semibold tracking-[-0.01em] text-gray-900">
            Private by default. Share deliberately.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.75] text-gray-500 [text-wrap:pretty]">
            min. remembers things privately for you{" "}
            <span className="text-gray-900">unless you share them</span>. It can
            sit in a sensitive 1:1 without making it company knowledge.{" "}
            <span className="text-gray-900">
              Seeing something is never sharing it.
            </span>{" "}
            Shared memory lives in spaces: your team is the first one.
          </p>
          <p className="mt-3.5 text-[15px] leading-[1.75] text-gray-500 [text-wrap:pretty]">
            And it{" "}
            <span className="text-gray-900">
              never coaches, scores, or manages you
            </span>
            . It quietly does the small things so the team does not have to.
          </p>
        </div>

        {/* ── Close ── */}
        <div className="mt-24 max-w-[41rem] border-t border-gray-200/90 pt-12">
          <p className="font-display text-[16.5px] font-semibold tracking-[-0.01em] text-gray-900">
            Give it something small today.
          </p>
          <div className="mt-4">
            <AddressLine />
          </div>
        </div>
      </div>
    </div>
  );
}

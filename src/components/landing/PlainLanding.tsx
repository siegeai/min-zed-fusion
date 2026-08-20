import { useState } from "react";
import Constellation from "./Constellation";
import { getDownloadTarget } from "@/lib/download";

/**
 * The whole landing page as one typeset document.
 *
 * Design rules, per Eric: plain text does the work, almost no graphic
 * elements, decoration lives in the BACKGROUND. The one visual is the email
 * itself, rendered the way a developer tool renders a request.
 *
 * Layout, third pass: the examples are a loose stack of floating emails that
 * overlap slightly, so the range of what you can send reads at a glance
 * instead of as a list. Each card carries its pillar as a label, which is why
 * there is no separate pillars section: the examples ARE the feature list,
 * demonstrated rather than described.
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

type Example = {
  label: string;
  subject?: string;
  body: string;
  /** Degrees of tilt and horizontal drift, hand-set so the stack looks tossed. */
  tilt: number;
  shift: number;
};

const EXAMPLES: Example[] = [
  {
    label: "Schedule",
    subject: "intro call with sarah",
    body: "can you find us 30 min next week? cc'd sarah.",
    tilt: -0.8,
    shift: 0,
  },
  {
    label: "Follow up",
    body: "remind me to follow up with john in 3 months",
    tilt: 0.7,
    shift: 26,
  },
  {
    label: "Capture",
    subject: "weekly design sync",
    body: "invited you to this one. send everyone the notes after.",
    tilt: -0.6,
    shift: 8,
  },
  {
    label: "Remember",
    body: "what did we decide about the pricing page?",
    tilt: 0.9,
    shift: 34,
  },
];

function EmailCard({ ex, index }: { ex: Example; index: number }) {
  return (
    <div
      className="relative"
      style={{
        transform: `rotate(${ex.tilt}deg) translateX(calc(${ex.shift}px * var(--drift, 1)))`,
        zIndex: index + 1,
        marginTop: index === 0 ? 0 : -6,
      }}
    >
      <div className="rounded-xl border border-gray-800 bg-gray-950 shadow-[0_22px_60px_-24px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out hover:-translate-y-1.5">
        <div className="border-b border-gray-800/70 px-4 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-500">
            {ex.label}
          </span>
        </div>
        <div className="px-4 pb-4 pt-3 font-mono text-[12.5px] leading-[1.75] sm:text-[13px]">
          <div>
            <span className="text-gray-500">To: </span>
            <a
              href={`mailto:${ADDRESS}${
                ex.subject ? `?subject=${encodeURIComponent(ex.subject)}` : ""
              }`}
              className="text-emerald-400 underline decoration-emerald-400/0 underline-offset-4 transition-colors duration-300 hover:decoration-emerald-400/70"
            >
              {ADDRESS}
            </a>
          </div>
          {ex.subject && (
            <div>
              <span className="text-gray-500">Subject: </span>
              <span className="text-gray-300">{ex.subject}</span>
            </div>
          )}
          <div className="mt-2 text-gray-400">{ex.body}</div>
        </div>
      </div>
    </div>
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

      <div className="relative mx-auto max-w-[41rem] px-6 pb-28 pt-32 md:pt-44">
        {/* ── What it is ── */}
        <h1 className="font-display text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.025em] text-gray-900 [text-wrap:balance] md:text-[3.4rem]">
          The AI teammate that does the little things.
        </h1>
        <p className="mt-6 max-w-[34rem] text-[17.5px] leading-[1.65] text-gray-500 [text-wrap:pretty]">
          min. remembers, schedules, takes notes, and follows up. For you and
          your team.
        </p>

        {/* ── How to start ── */}
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

        {/* ── The examples: a loose stack of emails you'd actually send ── */}
        <div
          id="does"
          className="mt-16 max-w-[33rem] scroll-mt-24 [--drift:0.35] sm:[--drift:1]"
        >
          {EXAMPLES.map((ex, i) => (
            <EmailCard key={ex.label} ex={ex} index={i} />
          ))}
        </div>

        {/* ── Trust, as prose with ink-weighted clauses ── */}
        <div id="trust" className="mt-24 max-w-[34rem] scroll-mt-24">
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
        <div className="mt-24 border-t border-gray-200/90 pt-12">
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

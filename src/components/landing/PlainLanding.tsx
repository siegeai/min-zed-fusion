import { useState } from "react";
import Constellation from "./Constellation";
import { getDownloadTarget } from "@/lib/download";

/**
 * The whole landing page as one typeset document.
 *
 * Design rules, per Eric: plain text does all the work, almost no graphic
 * elements, anything decorative lives in the BACKGROUND. No cards, no icon
 * tiles, no shadows, no pills. The email address is the interface: it is the
 * hero object, monospace, one click to send, one click to copy.
 *
 * The finesse layer, second pass: a consistent vertical rhythm, balanced
 * headline wrapping, an email treatment that feels tactile (animated
 * underline, no layout shift on copy), numbered pillars with hung numerals,
 * ink-weighted key clauses in the trust prose, and the constellation split
 * into two off-center fields so the background breathes instead of sitting
 * centered like a logo.
 */

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("min@getmin.ai");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked: the mailto link still works.
    }
  };
  return { copied, copy };
}

/**
 * The hero object: the first email you send min, rendered the way a developer
 * tool renders a request. Line numbers, one accent color, a copy affordance.
 * This is the only "graphic" on the page, and it is also the documentation.
 */
function EmailBlock() {
  const { copied, copy } = useCopy();
  const lines: { t: React.ReactNode }[] = [
    {
      t: (
        <>
          <span className="text-gray-500">To:{"      "}</span>
          <a
            href="mailto:min@getmin.ai?subject=intro%20call%20with%20sarah"
            className="text-emerald-400 underline decoration-emerald-400/0 underline-offset-4 transition-colors duration-300 hover:decoration-emerald-400/70"
          >
            min@getmin.ai
          </a>
        </>
      ),
    },
    {
      t: (
        <>
          <span className="text-gray-500">Subject:{" "}</span>
          <span className="text-gray-300">intro call with sarah</span>
        </>
      ),
    },
    { t: <span>&nbsp;</span> },
    {
      t: (
        <span className="text-gray-400">
          can you find us 30 min next week? cc&rsquo;d sarah.
        </span>
      ),
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-950">
      <div className="flex items-center justify-between border-b border-gray-800/80 px-4 py-2.5">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-gray-500">
          new message
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy min@getmin.ai"
          className={`w-[6ch] whitespace-nowrap text-right font-mono text-[10.5px] uppercase tracking-[0.16em] outline-none transition-colors duration-300 focus-visible:text-white ${
            copied ? "text-emerald-400" : "text-gray-500 hover:text-white"
          }`}
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <div className="px-4 py-4 font-mono text-[13px] leading-[1.9] sm:text-[13.5px]">
        {lines.map((l, i) => (
          <div key={i} className="grid grid-cols-[1.6rem_1fr] gap-x-3">
            <span aria-hidden="true" className="select-none text-right text-gray-700">
              {i + 1}
            </span>
            <span className="whitespace-pre-wrap">{l.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** The compact reprise for the closing block: one line, same language. */
function EmailLine() {
  const { copied, copy } = useCopy();
  return (
    <div className="inline-flex items-baseline gap-4 rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 font-mono text-[13.5px]">
      <span>
        <span className="text-gray-500">To: </span>
        <a
          href="mailto:min@getmin.ai?subject=hi%20min."
          className="text-emerald-400 underline decoration-emerald-400/0 underline-offset-4 transition-colors duration-300 hover:decoration-emerald-400/70"
        >
          min@getmin.ai
        </a>
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy min@getmin.ai"
        className={`w-[5ch] text-left font-mono text-[10.5px] uppercase tracking-[0.16em] outline-none transition-colors duration-300 focus-visible:text-white ${
          copied ? "text-emerald-400" : "text-gray-500 hover:text-white"
        }`}
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}

const PILLARS: { n: string; verb: string; items: string[] }[] = [
  {
    n: "01",
    verb: "Remember",
    items: ["reminders", "contextual memory", "“what did we decide?”", "“what am I waiting on?”"],
  },
  {
    n: "02",
    verb: "Schedule",
    items: ["coordinate meetings", "reschedule", "find availability", "send invites"],
  },
  {
    n: "03",
    verb: "Capture",
    items: ["meeting notes", "decisions", "commitments"],
  },
  {
    n: "04",
    verb: "Follow up",
    items: ["remind at the right time", "draft the follow up"],
  },
];

function Dot() {
  return (
    <span aria-hidden="true" className="mx-2.5 text-gray-300">
      ·
    </span>
  );
}

export default function PlainLanding() {
  return (
    <div className="relative overflow-hidden">
      {/* All decoration lives back here: two off-center constellation fields,
          one grazing the hero, one under the closing block. */}
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

        {/* ── How to start: the email is the interface ── */}
        <div className="mt-14">
          <EmailBlock />
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

        {/* ── The four pillars, as a typeset list with hung numerals ── */}
        <div id="does" className="mt-24 scroll-mt-24">
          {PILLARS.map((p, i) => (
            <div
              key={p.verb}
              className={`grid grid-cols-[2.4rem_1fr] items-baseline gap-x-4 py-6 sm:grid-cols-[2.8rem_8.5rem_1fr] sm:gap-x-6 ${
                i === 0 ? "border-t" : ""
              } border-b border-gray-200/90`}
            >
              <span className="font-mono text-[11px] tracking-[0.08em] text-gray-300">
                {p.n}
              </span>
              <h2 className="font-display text-[16.5px] font-semibold tracking-[-0.01em] text-gray-900">
                {p.verb}
              </h2>
              <p className="col-span-2 mt-2 flex min-w-0 flex-wrap items-baseline gap-y-1 text-[14.5px] leading-[1.75] text-gray-500 sm:col-span-1 sm:mt-0">
                {p.items.map((item, j) => (
                  <span key={item} className="whitespace-nowrap">
                    {item}
                    {j < p.items.length - 1 && <Dot />}
                  </span>
                ))}
              </p>
            </div>
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

        {/* ── Close: the interface, once more ── */}
        <div className="mt-24 border-t border-gray-200/90 pt-12">
          <p className="font-display text-[16.5px] font-semibold tracking-[-0.01em] text-gray-900">
            Give it something small today.
          </p>
          <div className="mt-4">
            <EmailLine />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import Constellation from "./Constellation";
import { getDownloadTarget } from "@/lib/download";

/**
 * The whole landing page as one typeset document.
 *
 * Design rules, per Eric: plain text does all the work, almost no graphic
 * elements, anything decorative lives in the BACKGROUND. No cards, no icon
 * tiles, no shadows, no pills. The email address is the interface: it is the
 * hero object, monospace, one click to copy, one click to send.
 */

function CopyEmail({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText("min@getmin.ai");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked: the mailto link next to it still works.
    }
  };

  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <a
        href="mailto:min@getmin.ai?subject=hi%20min."
        className="font-mono text-[19px] tracking-tight text-gray-900 underline decoration-gray-300 decoration-1 underline-offset-4 transition-colors hover:decoration-gray-900 sm:text-[21px]"
      >
        min@getmin.ai
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy min@getmin.ai"
        aria-describedby={id}
        className="font-mono text-[12px] uppercase tracking-[0.08em] text-gray-400 transition-colors hover:text-gray-900"
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}

const PILLARS: { verb: string; items: string }[] = [
  {
    verb: "Remember",
    items: "reminders · contextual memory · “what did we decide?” · “what am I waiting on?”",
  },
  {
    verb: "Schedule",
    items: "coordinate meetings · reschedule · find availability · send invites",
  },
  {
    verb: "Capture",
    items: "meeting notes · decisions · commitments",
  },
  {
    verb: "Follow up",
    items: "remind at the right time · draft the follow up",
  },
];

export default function PlainLanding() {
  return (
    <div className="relative">
      {/* All decoration lives back here. */}
      <Constellation className="opacity-[0.5]" />

      <div className="relative mx-auto max-w-2xl px-6 pb-24 pt-32 md:pt-44">
        {/* ── What it is ── */}
        <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-gray-900 md:text-[3.25rem]">
          The AI teammate you teach.
        </h1>
        <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-gray-500">
          min. does the small daily tasks of work, for you and your team. It
          remembers, schedules, captures, and follows up.
        </p>

        {/* ── How to start: the email is the interface ── */}
        <div className="mt-12">
          <CopyEmail id="start-note" />
          <p id="start-note" className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-gray-500">
            Email it. CC it on a thread that needs scheduling. Invite it to a
            meeting. That is the whole onboarding.
          </p>
          <p className="mt-2 text-[14.5px] text-gray-500">
            Or{" "}
            <a
              href={getDownloadTarget().href}
              className="text-gray-900 underline decoration-gray-300 decoration-1 underline-offset-4 transition-colors hover:decoration-gray-900"
            >
              download the desktop app
            </a>
            . Free to use.
          </p>
        </div>

        {/* ── The four pillars, as a typeset list ── */}
        <div id="does" className="mt-16 scroll-mt-24 border-t border-gray-200">
          {PILLARS.map((p) => (
            <div
              key={p.verb}
              className="grid grid-cols-1 gap-x-8 gap-y-1 border-b border-gray-200 py-5 sm:grid-cols-[9.5rem_1fr]"
            >
              <h2 className="font-display text-[16px] font-semibold text-gray-900">
                {p.verb}
              </h2>
              <p className="text-[14.5px] leading-relaxed text-gray-500">
                {p.items}
              </p>
            </div>
          ))}
        </div>

        {/* ── Trust, as prose ── */}
        <div id="trust" className="mt-16 scroll-mt-24 max-w-lg">
          <h2 className="font-display text-[16px] font-semibold text-gray-900">
            Private by default. Share deliberately.
          </h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-gray-500">
            min. remembers things privately for you unless you share them. It
            can sit in a sensitive 1:1 without making it company knowledge.
            Seeing something is never sharing it. Shared memory lives in
            spaces: your team is the first one.
          </p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-gray-500">
            And it never coaches, scores, or manages you. It quietly does the
            small things so the team does not have to.
          </p>
        </div>

        {/* ── Close: the interface, once more ── */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <p className="text-[14.5px] text-gray-500">Give it something small today.</p>
          <div className="mt-3">
            <CopyEmail id="end-note" />
          </div>
        </div>
      </div>
    </div>
  );
}

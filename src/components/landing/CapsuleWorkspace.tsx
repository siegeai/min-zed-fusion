import {
  Lock,
  Lightbulb,
  ArrowRight,
  CalendarClock,
  Send,
  Video,
  Mail,
} from "lucide-react";

/**
 * The capsule as a desktop WORKSPACE: the relationship record (insights, open
 * action items, distilled history) beside the "ask anything" rail with its
 * prep button and suggested prompts. Mirrors the product's person view. All
 * content is fictional, real-shaped demo data.
 */

const INSIGHTS = [
  "Considering a $50K angel check, pending conflict review.",
  "Demo promised Jun 11, never scheduled. The longest open loop here.",
  "Warm intro to Meridian's ops team offered Jun 8, never used.",
];

const ACTIONS = [
  "Send Jordan the cohort retention data, promised Jun 8.",
  "Get the demo on the calendar.",
  "Chase the updated cap table from the diligence call.",
];

const HISTORY = [
  {
    Icon: Video,
    date: "Jun 8, 2026",
    text: "Diligence call. Agreed $50K stays an angel check, not the whole round. Jordan to send the updated cap table.",
  },
  {
    Icon: Mail,
    date: "Jun 2, 2026",
    text: "Sent the deck. Jordan flagged retention as the one thing to prove.",
  },
];

const PROMPTS = [
  "What does Jordan care about?",
  "What have we committed to each other?",
  "Summarize our last conversation",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
      {children}
    </p>
  );
}

export default function CapsuleWorkspace() {
  return (
    <div
      data-capsule
      className="w-full overflow-hidden rounded-[22px] border border-gray-200/80 bg-white shadow-[0_16px_60px_-16px_rgba(0,0,0,0.18)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr]">
        {/* ── The record ── */}
        <div className="min-w-0 px-5 py-5 sm:px-7 sm:py-6">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex -space-x-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-900 text-[11px] font-semibold text-white">
                You
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-emerald-500 to-emerald-600 text-[12px] font-semibold text-white">
                JL
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-[17px] font-semibold text-gray-900">
                You &amp; Jordan Lee
              </h3>
              <p className="text-[12.5px] text-gray-500">Founder &amp; CEO, Aperture</p>
            </div>
            <div className="ml-auto hidden items-center gap-1.5 sm:flex">
              {["3 calls", "14 emails", "since May"].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-500"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="mt-5">
            <div className="flex items-center gap-2">
              <SectionLabel>Insights</SectionLabel>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10.5px] font-medium text-emerald-700">
                <Lock className="h-2.5 w-2.5" strokeWidth={2.2} />
                Your eyes only
              </span>
            </div>
            <ul className="mt-2.5 space-y-1.5">
              {INSIGHTS.map((line) => (
                <li key={line} className="flex gap-2 text-[13.5px] leading-snug text-gray-700">
                  <Lightbulb
                    className="mt-[3px] h-3.5 w-3.5 shrink-0 text-emerald-500"
                    strokeWidth={2}
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action items */}
          <div className="mt-5 border-t border-gray-100 pt-4">
            <SectionLabel>Action items</SectionLabel>
            <ul className="mt-2.5 space-y-1.5">
              {ACTIONS.map((a) => (
                <li key={a} className="flex gap-2 text-[13.5px] leading-snug text-gray-700">
                  <ArrowRight
                    className="mt-[3px] h-3.5 w-3.5 shrink-0 text-gray-400"
                    strokeWidth={2}
                  />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* History */}
          <div className="mt-5 border-t border-gray-100 pt-4">
            <SectionLabel>History</SectionLabel>
            <ul className="mt-2.5 space-y-3">
              {HISTORY.map((h) => (
                <li key={h.date} className="flex gap-2.5">
                  <span className="mt-[1px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500">
                    <h.Icon className="h-3 w-3" strokeWidth={1.9} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-gray-400">{h.date}</p>
                    <p className="mt-0.5 text-[13.5px] leading-relaxed text-gray-700">{h.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── The ask rail ── */}
        <div className="flex flex-col border-t border-gray-100 bg-[#FBFBFA] px-5 py-5 sm:px-6 lg:border-l lg:border-t-0">
          <h4 className="font-display text-[15px] font-semibold text-gray-900">
            Ask about Jordan
          </h4>
          <p className="mt-1 text-[12.5px] leading-relaxed text-gray-500">
            Query everything min. remembers about this relationship.
          </p>

          <button
            type="button"
            tabIndex={-1}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 py-2.5 text-[13.5px] font-medium text-emerald-700"
          >
            <CalendarClock className="h-4 w-4" strokeWidth={2} />
            Prep me for a meeting
          </button>

          <p className="mt-5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
            Try asking
          </p>
          <div className="mt-2 space-y-2">
            {PROMPTS.map((p) => (
              <div
                key={p}
                className="rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-[13px] text-gray-600"
              >
                {p}
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 lg:mt-auto">
            <span className="flex-1 truncate text-[13px] text-gray-400">Ask about Jordan…</span>
            <Send className="h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  );
}

import { Lock, Lightbulb, ArrowRight } from "lucide-react";

/**
 * The relationship capsule, hero-sized: a structured BRIEFING, not a feed.
 * Mirrors the product's engagement brief (title + what/when/why), open action
 * items, and the your-eyes-only insights strip. All content is fictional,
 * real-shaped demo data.
 */

const BRIEF = {
  title: "Aperture: $50K angel check, in diligence",
  rows: [
    {
      label: "What",
      text: "A $50K angel investment in Aperture's seed round, agreed on the Jun 8 diligence call.",
    },
    {
      label: "When",
      text: "Intro May 24 via Priya Nair. Deck sent Jun 2, diligence Jun 8, demo promised Jun 11.",
    },
    {
      label: "Why",
      text: "Jordan needs retention proven before the round closes. You are waiting on the cap table.",
    },
  ],
};

const ACTIONS = [
  "Send the cohort retention data, promised on the Jun 8 call.",
  "Get the demo on the calendar, slipped since Jun 11.",
];

const INSIGHTS = [
  "Considering a $50K angel check, pending conflict review.",
  "Demo promised Jun 11, never scheduled.",
  "Strong on product. Retention is the open question.",
];

export default function Capsule({ className = "" }: { className?: string }) {
  return (
    <div
      data-capsule
      className={[
        "w-full overflow-hidden rounded-[20px] border border-gray-200/80 bg-white",
        "shadow-[0_12px_50px_-12px_rgba(0,0,0,0.18)]",
        className,
      ].join(" ")}
    >
      {/* Person header */}
      <div className="flex items-center gap-3.5 border-b border-gray-100 px-5 py-4 sm:px-6">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-sm font-semibold text-white">
          JL
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-display text-[17px] font-semibold text-gray-900">
              Jordan Lee
            </h3>
            <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 sm:block" />
          </div>
          <p className="truncate text-[13px] text-gray-500">Founder & CEO, Aperture</p>
        </div>
        <div className="hidden shrink-0 text-right sm:block">
          <p className="text-[12px] font-medium text-gray-700">Last touch 3 days ago</p>
          <p className="text-[11.5px] text-gray-400">3 calls · 14 emails · since May</p>
        </div>
      </div>

      {/* Engagement brief: the who/what/when/why at a glance */}
      <div className="px-5 pb-4 pt-4 sm:px-6">
        <p className="font-display text-[15px] font-semibold leading-snug text-gray-900">
          {BRIEF.title}
        </p>
        <div className="mt-3 space-y-2">
          {BRIEF.rows.map((r) => (
            <div key={r.label} className="flex gap-2.5">
              <span className="w-11 shrink-0 pt-[2px] text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-600">
                {r.label}
              </span>
              <p className="text-[13px] leading-relaxed text-gray-600">{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Open action items */}
      <div className="border-t border-gray-100 px-5 py-3.5 sm:px-6">
        <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
          Action items
        </p>
        <ul className="space-y-1.5">
          {ACTIONS.map((a) => (
            <li key={a} className="flex gap-2 text-[13px] leading-snug text-gray-700">
              <ArrowRight className="mt-[3px] h-3 w-3 shrink-0 text-gray-400" strokeWidth={2} />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Insights strip, your eyes only */}
      <div className="border-t border-gray-100 bg-[#F7FAF8] px-5 py-4 sm:px-6">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">
            Insights
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10.5px] font-medium text-emerald-700">
            <Lock className="h-2.5 w-2.5" strokeWidth={2.2} />
            Your eyes only
          </span>
        </div>
        <ul className="space-y-1.5">
          {INSIGHTS.map((line) => (
            <li key={line} className="flex gap-2 text-[13px] leading-snug text-gray-700">
              <Lightbulb className="mt-[2.5px] h-3 w-3 shrink-0 text-emerald-500" strokeWidth={2} />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

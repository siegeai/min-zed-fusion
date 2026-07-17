import { ArrowLeft, Lock, Lightbulb, Linkedin, ArrowRight } from "lucide-react";
import { FlatAvatar, ApertureLogo } from "./DemoAvatars";

/**
 * The demo COMPANY capsule as swappable card CONTENT, product-style
 * navigation: clicking "Aperture" inside a capsule swaps that capsule to this
 * company view in place, and the back button returns to where you were. The
 * host capsule owns the view state; this module provides the link and the
 * content.
 */

export function CompanyLink({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer underline decoration-gray-300 decoration-dotted underline-offset-2 transition-colors hover:text-gray-900 hover:decoration-emerald-500 ${className}`}
    >
      {children}
    </button>
  );
}

const BRIEF = {
  title: "Aperture: $12K pilot, kickoff July 1",
  rows: [
    {
      label: "What",
      text: "A 30 day pilot for the ops team, agreed Jun 8. $12K annual once it sticks.",
    },
    {
      label: "Where",
      text: "Rolling out to the six person ops team first, then company wide if setup stays light.",
    },
    {
      label: "When",
      text: "Intro May 24, proposal Jun 2, walkthrough Jun 8. Kickoff July 1.",
    },
    {
      label: "Why",
      text: "Aperture is scaling ops without adding headcount. Jordan wants tooling in before Q3 planning.",
    },
  ],
};

const WHO: { who: "jordan" | "sam" | "dana"; name: string; role: string; context: string }[] = [
  {
    who: "jordan",
    name: "Jordan Lee",
    role: "Founder & CEO",
    context: "Your champion. Sold on the product, wants onboarding proven light.",
  },
  {
    who: "sam",
    name: "Sam Torres",
    role: "Ops lead",
    context: "Will run the pilot day to day. Asked for the onboarding checklist twice.",
  },
  {
    who: "dana",
    name: "Dana Whitmore",
    role: "Head of IT",
    context: "Running the security review. Owes sign off before kickoff.",
  },
];

const INSIGHTS = [
  "All three stakeholders engaged this month. Momentum is real.",
  "Dana's security sign off is the only blocker left before July 1.",
  "Sam is the daily user to win. The pilot lives or dies with the ops team.",
];

export function CompanyCapsuleContent({ onBack }: { onBack: () => void }) {
  return (
    <div className="modal-in">
      {/* Header with back navigation */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="-ml-1 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        </button>
        <ApertureLogo size={40} />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[17px] font-semibold text-gray-900">Aperture</h3>
          <p className="flex flex-wrap items-center gap-x-1.5 text-[12.5px] text-gray-500">
            aperture.co
            <Linkedin className="h-3 w-3 text-gray-400" strokeWidth={2} />
            <span className="text-gray-300">·</span> 3 people you know
            <span className="hidden text-gray-300 sm:inline">·</span>
            <span className="hidden sm:inline">last spoke 3 days ago</span>
          </p>
        </div>
      </div>

      {/* Engagement brief */}
      <div className="px-5 pb-4 pt-4 sm:px-6">
        <p className="font-display text-[15px] font-semibold leading-snug text-gray-900">
          {BRIEF.title}
        </p>
        <div className="mt-3 space-y-2">
          {BRIEF.rows.map((r) => (
            <div key={r.label} className="flex gap-2.5">
              <span className="w-12 shrink-0 pt-[2px] text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-600">
                {r.label}
              </span>
              <p className="text-[13px] leading-relaxed text-gray-600">{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHO */}
      <div className="border-t border-gray-100 px-5 py-4 sm:px-6">
        <p className="mb-2.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
          Who
        </p>
        <div className="space-y-2">
          {WHO.map((p) => (
            <div
              key={p.name}
              className="flex items-start gap-2.5 rounded-xl border border-gray-100 bg-[#FBFBFA] px-3 py-2.5"
            >
              <FlatAvatar who={p.who} size={32} label={p.name} />
              <div className="min-w-0">
                <p className="text-[13px] font-medium leading-tight text-gray-900">
                  {p.name}
                  <span className="ml-1.5 font-normal text-gray-400">{p.role}</span>
                </p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-gray-600">{p.context}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
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

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 border-t border-gray-100 px-5 py-3 sm:px-6">
        <p className="text-[12px] text-gray-400">In min., every company gets one of these.</p>
        <a
          href="https://app.getmin.ai"
          className="inline-flex shrink-0 items-center gap-1.5 text-[12.5px] font-medium text-emerald-700 hover:text-emerald-800"
        >
          Connect your calendar
          <ArrowRight className="h-3 w-3" strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}

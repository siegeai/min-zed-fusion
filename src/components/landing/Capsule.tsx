import { Lock, Lightbulb, ArrowRight } from "lucide-react";
import { ExpandableRow, type Detail } from "./Expandable";
import { FlatAvatar } from "./DemoAvatars";
import { CompanyLink } from "./CompanyCapsule";

/**
 * The relationship capsule, hero-sized: a structured BRIEFING, not a feed.
 * Mirrors the product's engagement brief (title + what/when/why), open action
 * items, and the your-eyes-only insights strip. Like the product, every
 * insight and action item is click-to-expand: the summary opens into its
 * source and the fuller context. All content is fictional, real-shaped demo
 * data.
 */

const BRIEF = {
  title: "Aperture: $12K pilot, kickoff July 1",
  rows: [
    {
      label: "What",
      text: "A 30 day pilot for Aperture's ops team, agreed on the Jun 8 walkthrough call.",
    },
    {
      label: "When",
      text: "Intro May 24 via Priya Nair. Proposal sent Jun 2, walkthrough Jun 8, team demo promised Jun 11.",
    },
    {
      label: "Why",
      text: "Jordan needs onboarding proven light before kickoff. You are waiting on his security review.",
    },
  ],
};

const ACTIONS: { text: string; detail: Detail }[] = [
  {
    text: "Send the onboarding checklist, promised on the Jun 8 call.",
    detail: {
      kind: "call",
      source: "Call · Jun 8",
      body: "You committed to a step by step checklist proving setup takes under an hour. Jordan called it the deciding factor for the pilot.",
    },
  },
  {
    text: "Get the team demo on the calendar, slipped since Jun 11.",
    detail: {
      kind: "email",
      source: "Email · Jun 14",
      body: "Jordan pushed the original slot and never proposed a new date. He has taken your last three calls on Tuesday or Thursday mornings.",
    },
  },
];

const INSIGHTS: { text: string; detail: Detail }[] = [
  {
    text: "Committed to a $12K pilot, pending security review.",
    detail: {
      kind: "call",
      source: "Call · Jun 8",
      body: "Jordan wants his IT lead to clear the security overview before kickoff. He was explicit the pilot does not wait on the annual contract.",
    },
  },
  {
    text: "Team demo promised Jun 11, never scheduled.",
    detail: {
      kind: "email",
      source: "Email · Jun 14",
      body: "Promised on the Jun 8 call for the following week. Jordan asked to push it and never proposed a new date. Three weeks open and counting.",
    },
  },
  {
    text: "Sold on the product. Onboarding time is the open question.",
    detail: {
      kind: "email",
      source: "Email · Jun 2",
      body: "After the proposal, Jordan called the product the strongest he had seen this quarter, then flagged his team's setup time as the one thing to prove before rollout.",
    },
  },
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
        <div className="flex shrink-0 -space-x-2.5">
          <FlatAvatar who="you" size={40} label="You" className="border-2 border-white" />
          <FlatAvatar who="jordan" size={40} label="Jordan Lee" className="border-2 border-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-display text-[17px] font-semibold text-gray-900">
              You &amp; Jordan Lee
            </h3>
            <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 sm:block" />
          </div>
          <p className="truncate text-[13px] text-gray-500">
            Founder & CEO, <CompanyLink>Aperture</CompanyLink>
          </p>
          <p className="truncate text-[11px] text-gray-400 sm:hidden">
            Last touch 3 days ago · 3 calls · 14 emails
          </p>
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

      {/* Open action items, click any for the full context */}
      <div className="border-t border-gray-100 px-5 py-3.5 sm:px-6">
        <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
          Action items
        </p>
        <ul className="space-y-0.5">
          {ACTIONS.map((a) => (
            <ExpandableRow
              key={a.text}
              detail={a.detail}
              leading={
                <ArrowRight className="mt-[3px] h-3 w-3 shrink-0 text-gray-400" strokeWidth={2} />
              }
            >
              <span className="text-[13px] leading-snug text-gray-700">{a.text}</span>
            </ExpandableRow>
          ))}
        </ul>
      </div>

      {/* Insights strip, your eyes only, click any for the full context */}
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
        <ul className="space-y-0.5">
          {INSIGHTS.map((i) => (
            <ExpandableRow
              key={i.text}
              detail={i.detail}
              leading={
                <Lightbulb
                  className="mt-[2.5px] h-3 w-3 shrink-0 text-emerald-500"
                  strokeWidth={2}
                />
              }
            >
              <span className="text-[13px] leading-snug text-gray-700">{i.text}</span>
            </ExpandableRow>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Lock, Lightbulb, ArrowRight, Video, Mail } from "lucide-react";
import { ExpandableRow, type Detail } from "./Expandable";
import { FlatAvatar } from "./DemoAvatars";
import { CompanyLink, CompanyCapsuleContent } from "./CompanyCapsule";

/**
 * The relationship capsule, hero-sized: a structured BRIEFING, not a feed.
 * The capsule spine is three sharp sections: where you stand, action items,
 * history. Like the product, every row is click-to-expand: the summary opens
 * into its source and the fuller context. All content is fictional,
 * real-shaped demo data.
 */

const BRIEF_TITLE = "Aperture: $12K pilot, kickoff July 1";

const STAND: { text: string; detail: Detail }[] = [
  {
    text: "Jordan is sold. Onboarding time is his last doubt.",
    detail: {
      kind: "email",
      source: "Email · Jun 2",
      body: "After the proposal, Jordan called the product the strongest he had seen this quarter, then flagged his team's setup time as the one thing to prove before rollout.",
    },
  },
  {
    text: "$12K pilot committed, pending his security review.",
    detail: {
      kind: "call",
      source: "Call · Jun 8",
      body: "Jordan wants his IT lead to clear the security overview before kickoff. He was explicit the pilot does not wait on the annual contract.",
    },
  },
  {
    text: "Price keeps coming up. You are being compared.",
    detail: {
      kind: "email",
      source: "Jun 2 · Jun 8 · Jun 14",
      body: "Jordan asked about annual pricing on Jun 2, raised per seat cost on the walkthrough, and his Jun 14 email mentions evaluating a couple of tools.",
    },
  },
];

const ACTIONS: { text: string; detail: Detail }[] = [
  {
    text: "Send the onboarding checklist by tomorrow, promised Jun 8.",
    detail: {
      kind: "call",
      source: "Call · Jun 8",
      body: "You committed to a step by step checklist proving setup takes under an hour. Jordan called it the deciding factor for the pilot.",
    },
  },
  {
    text: "Book the team demo this week, slipping since Jun 11.",
    detail: {
      kind: "email",
      source: "Email · Jun 14",
      body: "Jordan pushed the original slot and never proposed a new date. He has taken your last three calls on Tuesday or Thursday mornings.",
    },
  },
];

const HISTORY: { Icon: typeof Video; date: string; text: string; detail: Detail }[] = [
  {
    Icon: Video,
    date: "Jun 8",
    text: "Walkthrough call. Agreed the 30 day pilot, kickoff July 1.",
    detail: {
      kind: "call",
      source: "Call · 38 min",
      body: "38 minutes. Jordan confirmed $12K annual once it sticks and promised the signed agreement, and you promised the onboarding checklist.",
    },
  },
  {
    Icon: Mail,
    date: "Jun 2",
    text: "Proposal sent. Jordan flagged onboarding time.",
    detail: {
      kind: "email",
      source: "Email thread",
      body: "You sent the proposal and one pager. Jordan replied the same day and named setup time as the one thing to prove.",
    },
  },
  {
    Icon: Mail,
    date: "May 24",
    text: "Priya Nair introduced you. Jordan replied within the hour.",
    detail: {
      kind: "email",
      source: "Email · May 24",
      body: "Priya called min. \"the only tool my team actually opens\" in the intro. Jordan asked for a proposal the same afternoon.",
    },
  },
];

export default function Capsule({ className = "" }: { className?: string }) {
  // Product-style navigation: clicking the company name swaps this capsule to
  // the company view in place; back returns to the relationship.
  const [view, setView] = useState<"person" | "company">("person");
  return (
    <div
      data-capsule
      className={[
        "w-full overflow-hidden rounded-[20px] border border-gray-200/80 bg-white",
        "shadow-[0_12px_50px_-12px_rgba(0,0,0,0.18)]",
        className,
      ].join(" ")}
    >
      {view === "company" ? (
        <CompanyCapsuleContent onBack={() => setView("person")} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_210px]">
          <div className="min-w-0">
      {/* Person header */}
      <div className="flex items-center gap-3.5 border-b border-gray-100 px-5 py-4 sm:px-6">
        <div className="flex shrink-0 -space-x-2.5">
          <FlatAvatar who="you" size={40} label="You" className="border-2 border-white" />
          <FlatAvatar who="jordan" size={40} label="Jordan Lee" className="border-2 border-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-[16px] font-semibold leading-tight text-gray-900">
              You &amp; Jordan Lee
            </h3>
            <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 sm:block" />
          </div>
          <p className="text-[13px] text-gray-500">
            Founder & CEO, <CompanyLink onClick={() => setView("company")}>Aperture</CompanyLink>
          </p>
          <p className="text-[11px] text-gray-400">
            Last touch 3 days ago · 3 calls · 14 emails · since May
          </p>
        </div>
      </div>

      {/* Where you stand: the sharp TL;DR, your eyes only, every row expands into its source */}
      <div className="bg-[#F7FAF8] px-5 pb-4 pt-4 sm:px-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gray-500">
            Where you stand
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10.5px] font-medium text-emerald-700">
            <Lock className="h-2.5 w-2.5" strokeWidth={2.2} />
            Your eyes only
          </span>
        </div>
        <p className="font-display text-[15px] font-semibold leading-snug text-gray-900">
          {BRIEF_TITLE}
        </p>
        <ul className="mt-2 space-y-0.5">
          {STAND.map((i) => (
            <ExpandableRow
              key={i.text}
              detail={i.detail}
              leading={
                <Lightbulb
                  className="mt-[7px] h-3 w-3 shrink-0 text-emerald-500"
                  strokeWidth={2}
                />
              }
            >
              <span className="text-[13px] leading-snug text-gray-700">{i.text}</span>
            </ExpandableRow>
          ))}
        </ul>
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
                <ArrowRight className="mt-[7px] h-3 w-3 shrink-0 text-gray-400" strokeWidth={2} />
              }
            >
              <span className="text-[13px] leading-snug text-gray-700">{a.text}</span>
            </ExpandableRow>
          ))}
        </ul>
      </div>

      {/* History, distilled, click any for the full context */}
      <div className="border-t border-gray-100 px-5 py-3.5 sm:px-6">
        <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
          History
        </p>
        <ul className="space-y-0.5">
          {HISTORY.map((h) => (
            <ExpandableRow
              key={h.date}
              detail={h.detail}
              leading={
                <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500">
                  <h.Icon className="h-2.5 w-2.5" strokeWidth={1.9} />
                </span>
              }
            >
              <span className="text-[13px] leading-snug text-gray-700">
                <span className="font-medium text-gray-400">{h.date}</span>
                <span className="text-gray-300"> · </span>
                {h.text}
              </span>
            </ExpandableRow>
          ))}
        </ul>
      </div>

          </div>

          {/* The chat rail, peeking in and fading off the card's edge */}
          <a
            href="#capsule"
            aria-label="Try the interactive demo"
            className="relative hidden overflow-hidden border-l border-gray-100 bg-[#FBFBFA] lg:block"
          >
            <div className="w-[320px] px-4 py-4">
              <h4 className="font-display text-[13.5px] font-semibold text-gray-900">
                How can I help with Jordan?
              </h4>
              <p className="mt-1 text-[11.5px] leading-snug text-gray-500">
                Answers and actions, grounded in the whole history.
              </p>
              <span className="mt-3 block rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11.5px] font-medium text-emerald-700">
                Prep me for my meeting with Jordan
              </span>
              <span className="mt-2 block rounded-lg border border-gray-200 bg-white px-3 py-2 text-[11.5px] text-gray-600">
                Did Jordan send the pilot agreement?
              </span>
              <span className="mt-2 block rounded-lg border border-gray-200 bg-white px-3 py-2 text-[11.5px] text-gray-600">
                Book the team demo with Jordan
              </span>
              <span className="ml-auto mt-4 block w-fit max-w-full rounded-2xl rounded-br-sm bg-gray-900 px-3 py-1.5 text-[11px] text-white">
                Book the team demo with Jordan
              </span>
              <span className="mt-2 block rounded-2xl rounded-bl-sm border border-gray-100 bg-white px-3 py-2 text-[11px] leading-relaxed text-gray-600">
                Done. Invite sent for Thursday 9:30am, Jordan's usual slot, agenda attached. I will flag it if he has not accepted by tomorrow.
              </span>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}

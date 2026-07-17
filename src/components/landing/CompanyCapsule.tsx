import { useState } from "react";
import {
  ArrowLeft,
  Lock,
  Lightbulb,
  Linkedin,
  ArrowRight,
  ChevronDown,
  Video,
  Mail,
} from "lucide-react";
import { FlatAvatar, ApertureLogo } from "./DemoAvatars";
import { ExpandableRow, type Detail } from "./Expandable";

/**
 * The demo COMPANY capsule as swappable card CONTENT, product-style
 * navigation: clicking "Aperture" inside a capsule swaps that capsule to this
 * company view in place, and the back button returns to where you were. Every
 * row is click-to-expand, brief lines, WHO cards, and insights all open into
 * their source and the fuller context, mirroring the product.
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
      className={`inline-flex cursor-pointer items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-px align-baseline font-medium text-emerald-700 transition-colors hover:border-emerald-300 hover:bg-emerald-100/70 ${className}`}
    >
      {children}
    </button>
  );
}

const BRIEF_TITLE = "Aperture: $12K pilot, kickoff July 1";

const BRIEF: { label: string; text: string; detail: Detail }[] = [
  {
    label: "What",
    text: "A 30 day pilot for the ops team, agreed Jun 8. $12K annual once it sticks.",
    detail: {
      kind: "call",
      source: "Call · Jun 8",
      body: "Scoped on the walkthrough: full access for the six person ops team, $12K annual once the pilot converts. No commitment past the 30 days.",
    },
  },
  {
    label: "Where",
    text: "Rolling out to the six person ops team first, then company wide if setup stays light.",
    detail: {
      kind: "call",
      source: "Call · Jun 8",
      body: "Sam's ops team is the beachhead. Jordan wants the rest of Aperture on it only after ops proves the setup stays under an hour.",
    },
  },
  {
    label: "When",
    text: "Intro May 24, proposal Jun 2, walkthrough Jun 8. Kickoff July 1.",
    detail: {
      kind: "email",
      source: "Email thread",
      body: "Priya Nair made the intro May 24. The proposal went out Jun 2, the walkthrough ran Jun 8, and kickoff was set for July 1 on the call.",
    },
  },
  {
    label: "Why",
    text: "Aperture is scaling ops without adding headcount. Jordan wants tooling in before Q3 planning.",
    detail: {
      kind: "call",
      source: "Call · Jun 8",
      body: "Aperture doubled clients this year without growing the team. Jordan said the ops tooling decision has to land before Q3 planning locks.",
    },
  },
];

const WHO: {
  who: "jordan" | "sam" | "dana";
  name: string;
  role: string;
  context: string;
  detail: Detail;
}[] = [
  {
    who: "jordan",
    name: "Jordan Lee",
    role: "Founder & CEO",
    context: "Your champion. Sold on the product, wants onboarding proven light.",
    detail: {
      kind: "call",
      source: "3 calls · 9 emails",
      body: "Every conversation runs through Jordan. He made the $12K call on the walkthrough, owes you the signed agreement, and is waiting on your onboarding checklist.",
    },
  },
  {
    who: "sam",
    name: "Sam Torres",
    role: "Ops lead",
    context: "Will run the pilot day to day. Asked for the onboarding checklist twice.",
    detail: {
      kind: "call",
      source: "1 call · 6 emails",
      body: "Joined the Jun 8 walkthrough and drove the workflow questions. She has asked for the onboarding checklist twice and offered her ops workflow doc.",
    },
  },
  {
    who: "dana",
    name: "Dana Whitmore",
    role: "Head of IT",
    context: "Running the security review. Owes sign off before kickoff.",
    detail: {
      kind: "email",
      source: "Email · Jun 10",
      body: "Looped in by Jordan two days after the walkthrough. She has your security overview and has not raised anything, sign off is expected before kickoff.",
    },
  },
];

const INSIGHTS: { text: string; detail: Detail }[] = [
  {
    text: "All three stakeholders engaged this month. Momentum is real.",
    detail: {
      kind: "email",
      source: "4 calls · 19 emails",
      body: "Jordan, Sam, and Dana have all been active in the last two weeks, and reply times are under a day on every thread.",
    },
  },
  {
    text: "Dana's security sign off is the only blocker left before July 1.",
    detail: {
      kind: "email",
      source: "Email · Jun 10",
      body: "Jordan looped Dana in two days after the walkthrough. She has the security overview and has not raised anything, so the sign off is the last gate.",
    },
  },
  {
    text: "Sam is the daily user to win. The pilot lives or dies with the ops team.",
    detail: {
      kind: "call",
      source: "Call · Jun 8",
      body: "Sam runs the workflows the pilot has to fit. She has asked for the onboarding checklist twice and offered her ops workflow doc so you can see the setup end to end.",
    },
  },
];

/** A WHO card that expands in place: avatar + context, then the fuller story. */
function ExpandableWhoCard({ p }: { p: (typeof WHO)[number] }) {
  const [open, setOpen] = useState(false);
  const SourceIcon = p.detail.kind === "call" ? Video : Mail;
  return (
    <div className="rounded-xl border border-gray-100 bg-[#FBFBFA] transition-colors hover:border-gray-200">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-start gap-2.5 px-3 py-2.5 text-left"
      >
        <FlatAvatar who={p.who} size={32} label={p.name} />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium leading-tight text-gray-900">
            {p.name}
            <span className="ml-1.5 font-normal text-gray-400">{p.role}</span>
          </p>
          <p className="mt-0.5 text-[12.5px] leading-snug text-gray-600">{p.context}</p>
        </div>
        <ChevronDown
          className={[
            "mt-1 h-3.5 w-3.5 shrink-0 text-gray-300 transition-transform duration-200 group-hover:text-gray-400",
            open ? "rotate-180" : "",
          ].join(" ")}
          strokeWidth={2}
        />
      </button>
      <div
        className={[
          "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div className="mx-3 mb-2.5 rounded-lg border border-gray-100 bg-white px-3 py-2">
            <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-gray-400">
              <SourceIcon className="h-3 w-3" strokeWidth={2} />
              {p.detail.source}
            </span>
            <p className="mt-1 text-[12.5px] leading-relaxed text-gray-600">{p.detail.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

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

      {/* Engagement brief, every row expands into its source */}
      <div className="px-5 pb-4 pt-4 sm:px-6">
        <p className="font-display text-[15px] font-semibold leading-snug text-gray-900">
          {BRIEF_TITLE}
        </p>
        <ul className="mt-2.5 space-y-0.5">
          {BRIEF.map((r) => (
            <ExpandableRow
              key={r.label}
              detail={r.detail}
              leading={
                <span className="w-12 shrink-0 pt-[2px] text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-600">
                  {r.label}
                </span>
              }
            >
              <span className="text-[13px] leading-relaxed text-gray-600">{r.text}</span>
            </ExpandableRow>
          ))}
        </ul>
      </div>

      {/* WHO, each person expands into their thread with you */}
      <div className="border-t border-gray-100 px-5 py-4 sm:px-6">
        <p className="mb-2.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
          Who
        </p>
        <div className="space-y-2">
          {WHO.map((p) => (
            <ExpandableWhoCard key={p.name} p={p} />
          ))}
        </div>
      </div>

      {/* Insights, click any for the full context */}
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

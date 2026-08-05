import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Lock,
  Lightbulb,
  ArrowRight,
  CalendarClock,
  Link2,
  Video,
  Mail,
  Download,
  Share2,
} from "lucide-react";
import { ExpandableRow, type Detail } from "@/components/landing/Expandable";
import { FlatAvatar } from "@/components/landing/DemoAvatars";
import {
  CompanyLink,
  CompanyCapsuleContent,
} from "@/components/landing/CompanyCapsule";
import {
  AskRail,
  COMPANY_PROMPTS,
  type Prompt,
} from "@/components/landing/CapsuleWorkspace";
import { CopyLink } from "@/components/landing/CopyLink";
import { getDownloadTarget } from "@/lib/download";

/**
 * getmin.ai/c/jordan-lee — the demo capsule's actual address. This is what a
 * teammate opens when you share the link: the full capsule, app-sized, fully
 * interactive. Same fictional Aperture story as the homepage demos, with the
 * whole record in one place.
 */

const BRIEF_TITLE = "Aperture: $12K pilot, kickoff July 1";

const BRIEF: { label: string; text: string; detail: Detail }[] = [
  {
    label: "What",
    text: "A 30 day pilot for Aperture's ops team, agreed on the Jun 8 walkthrough call.",
    detail: {
      kind: "call",
      source: "Call · Jun 8",
      body: "Jordan agreed to a 30 day pilot for the ops team, $12K annual once it converts, with no commitment past the 30 days.",
    },
  },
  {
    label: "When",
    text: "Intro May 24 via Priya Nair. Proposal sent Jun 2, walkthrough Jun 8, team demo promised Jun 11.",
    detail: {
      kind: "email",
      source: "Email thread",
      body: "Priya Nair made the intro May 24. The proposal went out Jun 2, the walkthrough ran Jun 8, and Jordan promised his team a demo the week of Jun 11.",
    },
  },
  {
    label: "Why",
    text: "Jordan needs onboarding proven light before kickoff. You are waiting on his security review.",
    detail: {
      kind: "call",
      source: "Call · Jun 8",
      body: "Jordan will not roll out until setup is proven under an hour. His security review is the last gate before kickoff, and the onboarding checklist is on you.",
    },
  },
];

const ACTIONS: { text: string; detail: Detail }[] = [
  {
    text: "Send Jordan the onboarding checklist, promised on the Jun 8 call.",
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
  {
    text: "Chase the signed pilot agreement from the walkthrough call.",
    detail: {
      kind: "call",
      source: "Call · Jun 8",
      body: "Jordan owes you the countersigned pilot agreement he promised by the end of that week. It has not arrived in any thread since.",
    },
  },
];

const INSIGHTS: { text: string; detail: Detail }[] = [
  {
    text: "Price has come up in three straight conversations, earlier each time. Aperture is comparing options.",
    detail: {
      kind: "email",
      source: "Jun 2 · Jun 8 · Jun 14",
      body: "Jordan asked about annual pricing on Jun 2, Sam raised per seat cost on the walkthrough, and Jordan's Jun 14 email mentions evaluating a couple of tools. Worth reinforcing value before the team demo.",
    },
  },
  {
    text: "Team demo promised Jun 11, never scheduled. The longest open loop here.",
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

const HISTORY = [
  {
    Icon: Video,
    date: "Jun 8, 2026",
    text: "Walkthrough call. Agreed on a 30 day pilot for the ops team, kickoff July 1.",
    detail: {
      kind: "call",
      source: "Call · 38 min",
      body: "38 minutes. Sam walked through the ops workflows, Jordan confirmed $12K annual once it sticks and promised the signed agreement, and you promised the onboarding checklist.",
    } as Detail,
  },
  {
    Icon: Mail,
    date: "Jun 2, 2026",
    text: "Sent the proposal. Jordan flagged onboarding time and copied Sam in.",
    detail: {
      kind: "email",
      source: "Email thread",
      body: "You sent the proposal and one pager. Jordan replied the same day, named setup time as the one thing to prove, and copied Sam in, who asked to join the walkthrough.",
    } as Detail,
  },
  {
    Icon: Mail,
    date: "May 24, 2026",
    text: "Priya Nair introduced you two. Jordan replied within the hour.",
    detail: {
      kind: "email",
      source: "Email · May 24",
      body: "Priya called min. \"the only tool my team actually opens\" in the intro. Jordan asked for a proposal the same afternoon.",
    } as Detail,
  },
];

const PERSON_PROMPTS: Prompt[] = [
  {
    q: "Prep me for my meeting with Jordan",
    a: "You owe Jordan the onboarding checklist from the Jun 8 call, and the team demo promised for Jun 11 still is not scheduled. He owes you the signed pilot agreement. Lead with the checklist, then leave with a demo date on the calendar.",
    primary: true,
  },
  {
    q: "Did Jordan send the pilot agreement?",
    a: "No. He promised the countersigned agreement by the end of the week of Jun 8, and it has not arrived in any thread since. Worth raising when you send the checklist.",
  },
  {
    q: "What is blocking the July 1 kickoff?",
    a: "Two things. Dana's security sign off on Aperture's side, and the onboarding checklist you promised on the Jun 8 call. Clear both and the pilot starts on time.",
  },
  {
    q: "Am I competing with anyone for this pilot?",
    a: "Signs point that way. Price has come up in three straight conversations, and Jordan's Jun 14 email mentions evaluating a couple of tools. Nobody named yet, so treat the team demo as your chance to make the choice easy.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
      {children}
    </p>
  );
}

const CapsuleDemo = () => {
  const [view, setView] = useState<"person" | "company">("person");
  const dl = getDownloadTarget();

  return (
    <>
      <Helmet>
        <title>Jordan Lee · a live min. capsule</title>
        <meta
          name="description"
          content="A live, fully interactive demo capsule: the entire Jordan Lee relationship at one link. Click any insight, ask it anything."
        />
        <link rel="canonical" href="https://getmin.ai/c/jordan-lee" />
      </Helmet>

      <div className="flex min-h-screen flex-col bg-[#FAFAF9] font-sans text-gray-900 antialiased">
        {/* App chrome */}
        <header className="sticky top-0 z-40 border-b border-gray-200/70 bg-white/85 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <Link
                to="/"
                className="font-display text-xl font-semibold tracking-tight text-gray-900"
              >
                min.
              </Link>
              <span className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 sm:inline-block">
                Live demo capsule
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={dl.href}
                className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-gray-800"
              >
                {dl.label}
                <Download className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:py-12">
          <p className="mb-6 text-center text-[13.5px] text-gray-500">
            This is what a teammate opens when you share a capsule. One link,
            the whole relationship. Everything below is interactive.
          </p>

          <div
            data-capsule
            className="w-full overflow-hidden rounded-[22px] border border-gray-200/80 bg-white shadow-[0_16px_60px_-16px_rgba(0,0,0,0.18)]"
          >
            {view === "company" ? (
              <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr]">
                <div className="min-w-0">
                  <CompanyCapsuleContent
                    onBack={() => setView("person")}
                    embedded
                  />
                </div>
                <AskRail
                  prompts={COMPANY_PROMPTS}
                  title="Ask about Aperture"
                  blurb="Query everything min. remembers across Aperture, every person and thread. Try it, this one is live."
                  placeholder="Ask about Aperture…"
                  scope="one company"
                  PrimaryIcon={CalendarClock}
                  showShare={false}
                />
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex flex-wrap items-center gap-3 border-b border-gray-100 px-5 py-4 sm:px-7">
                  <div className="flex shrink-0 -space-x-2.5">
                    <FlatAvatar
                      who="you"
                      size={44}
                      label="You"
                      className="border-2 border-white"
                    />
                    <FlatAvatar
                      who="jordan"
                      size={44}
                      label="Jordan Lee"
                      className="border-2 border-white"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h1 className="truncate font-display text-[19px] font-semibold text-gray-900">
                        You &amp; Jordan Lee
                      </h1>
                      <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 sm:block" />
                    </div>
                    <p className="truncate text-[13px] text-gray-500">
                      Founder &amp; CEO,{" "}
                      <CompanyLink onClick={() => setView("company")}>
                        Aperture
                      </CompanyLink>
                    </p>
                  </div>
                  <div className="hidden shrink-0 text-right sm:block">
                    <p className="text-[12px] font-medium text-gray-700">
                      Last touch 3 days ago
                    </p>
                    <p className="text-[11.5px] text-gray-400">
                      3 calls · 14 emails · since May
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      navigator.clipboard
                        ?.writeText("https://getmin.ai/c/jordan-lee")
                        .catch(() => {})
                    }
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-1.5 text-[12.5px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
                  >
                    <Share2 className="h-3.5 w-3.5" strokeWidth={2.2} />
                    Share
                  </button>
                </div>

                {/* The capsule's address */}
                <div className="flex items-center justify-between gap-3 border-b border-gray-100 bg-gray-50/60 px-5 py-2 sm:px-7">
                  <span className="flex min-w-0 items-center gap-1.5 text-gray-400">
                    <Link2 className="h-3 w-3 shrink-0" strokeWidth={2} />
                    <span className="truncate font-mono text-[11.5px]">
                      getmin.ai/c/jordan-lee
                    </span>
                  </span>
                  <CopyLink className="text-[11.5px]" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr]">
                  {/* ── The record ── */}
                  <div className="min-w-0 px-5 py-5 sm:px-7 sm:py-6">
                    {/* Brief */}
                    <p className="font-display text-[15.5px] font-semibold leading-snug text-gray-900">
                      {BRIEF_TITLE}
                    </p>
                    <ul className="mt-2.5 space-y-0.5">
                      {BRIEF.map((r) => (
                        <ExpandableRow
                          key={r.label}
                          detail={r.detail}
                          leading={
                            <span className="w-11 shrink-0 pt-[5px] text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-600">
                              {r.label}
                            </span>
                          }
                        >
                          <span className="text-[13px] leading-relaxed text-gray-600">
                            {r.text}
                          </span>
                        </ExpandableRow>
                      ))}
                    </ul>

                    {/* Insights */}
                    <div className="mt-5 border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-2">
                        <SectionLabel>Insights</SectionLabel>
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10.5px] font-medium text-emerald-700">
                          <Lock className="h-2.5 w-2.5" strokeWidth={2.2} />
                          Your eyes only
                        </span>
                      </div>
                      <ul className="mt-2 space-y-0.5">
                        {INSIGHTS.map((i) => (
                          <ExpandableRow
                            key={i.text}
                            detail={i.detail}
                            leading={
                              <Lightbulb
                                className="mt-[4px] h-3.5 w-3.5 shrink-0 text-emerald-500"
                                strokeWidth={2}
                              />
                            }
                          >
                            <span className="text-[13.5px] leading-snug text-gray-700">
                              {i.text}
                            </span>
                          </ExpandableRow>
                        ))}
                      </ul>
                    </div>

                    {/* Action items */}
                    <div className="mt-5 border-t border-gray-100 pt-4">
                      <SectionLabel>Action items</SectionLabel>
                      <ul className="mt-2 space-y-0.5">
                        {ACTIONS.map((a) => (
                          <ExpandableRow
                            key={a.text}
                            detail={a.detail}
                            leading={
                              <ArrowRight
                                className="mt-[4px] h-3.5 w-3.5 shrink-0 text-gray-400"
                                strokeWidth={2}
                              />
                            }
                          >
                            <span className="text-[13.5px] leading-snug text-gray-700">
                              {a.text}
                            </span>
                          </ExpandableRow>
                        ))}
                      </ul>
                    </div>

                    {/* History */}
                    <div className="mt-5 border-t border-gray-100 pt-4">
                      <SectionLabel>History</SectionLabel>
                      <ul className="mt-2 space-y-1.5">
                        {HISTORY.map((h) => (
                          <ExpandableRow
                            key={h.date}
                            detail={h.detail}
                            leading={
                              <span className="mt-[1px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500">
                                <h.Icon className="h-3 w-3" strokeWidth={1.9} />
                              </span>
                            }
                          >
                            <span className="block text-[11px] font-medium text-gray-400">
                              {h.date}
                            </span>
                            <span className="mt-0.5 block text-[13.5px] leading-relaxed text-gray-700">
                              {h.text}
                            </span>
                          </ExpandableRow>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* ── The ask rail (live) ── */}
                  <AskRail
                    prompts={PERSON_PROMPTS}
                    title="Ask about Jordan"
                    blurb="Query everything min. remembers across this relationship. Try it, this one is live."
                    placeholder="Ask about Jordan…"
                    scope="one relationship"
                    PrimaryIcon={CalendarClock}
                    showShare={false}
                  />
                </div>
              </>
            )}
          </div>

          {/* Closer */}
          <div className="mx-auto mt-10 max-w-xl text-center">
            <p className="text-[15px] leading-relaxed text-gray-600">
              Every relationship you have gets one of these, built
              automatically. One capsule, one link.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={dl.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-[14.5px] font-medium text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800"
              >
                {dl.label}
                <Download className="h-4 w-4" strokeWidth={2} />
              </a>
              <Link
                to="/"
                className="rounded-full px-5 py-3 text-[14.5px] font-medium text-gray-600 transition-colors hover:bg-black/5 hover:text-gray-900"
              >
                Back to getmin.ai
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CapsuleDemo;

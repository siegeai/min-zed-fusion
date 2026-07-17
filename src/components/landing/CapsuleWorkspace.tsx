import { useEffect, useRef, useState } from "react";
import {
  Lock,
  Lightbulb,
  ArrowRight,
  CalendarClock,
  Building2,
  Send,
  Video,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { ExpandableRow, type Detail } from "./Expandable";
import { FlatAvatar } from "./DemoAvatars";
import { CompanyLink, CompanyCapsuleContent } from "./CompanyCapsule";

/**
 * The capsule as a desktop WORKSPACE, and a LIVE demo: the relationship record
 * (insights, open action items, distilled history) beside the "ask anything"
 * rail. Clicking the prep button or a suggested prompt plays the real UX, the
 * question lands as a bubble, min. thinks briefly, then streams a grounded
 * answer. All content is fictional, real-shaped demo data.
 */

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
    text: "Team demo promised Jun 11, never scheduled. The longest open loop here.",
    detail: {
      kind: "email",
      source: "Email · Jun 14",
      body: "Promised on the Jun 8 call for the following week. Jordan asked to push it and never proposed a new date. Three weeks open and counting.",
    },
  },
  {
    text: "Sam is the daily user to win. The pilot lives or dies with ops.",
    detail: {
      kind: "call",
      source: "Call · Jun 8",
      body: "Sam runs the workflows the pilot has to fit. She has asked for the onboarding checklist twice and offered her ops workflow doc so you can see the setup end to end.",
    },
  },
];

const ACTIONS: { text: string; detail: Detail }[] = [
  {
    text: "Send Jordan and Sam the onboarding checklist, promised Jun 8.",
    detail: {
      kind: "call",
      source: "Call · Jun 8",
      body: "You committed to a step by step checklist proving setup takes under an hour. Jordan called it the deciding factor for the pilot.",
    },
  },
  {
    text: "Get the team demo on the calendar.",
    detail: {
      kind: "email",
      source: "Email · Jun 14",
      body: "Jordan pushed the original Jun 11 slot and never proposed a new date. He has taken your last three calls on Tuesday or Thursday mornings.",
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

const HISTORY = [
  {
    Icon: Video,
    date: "Jun 8, 2026",
    text: "Walkthrough call, all three of you. Agreed on a 30 day pilot for the ops team, kickoff July 1.",
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
];

type Prompt = { q: string; a: string; primary?: boolean };

const GROUP_PROMPTS: Prompt[] = [
  {
    q: "Prep me for a meeting",
    a: "You owe Jordan and Sam the onboarding checklist from the Jun 8 call, and the team demo promised for Jun 11 still is not scheduled. Jordan owes you the signed pilot agreement. Lead with the checklist, Sam has asked for it twice, then leave with a demo date on the calendar.",
    primary: true,
  },
  {
    q: "What is blocking the July 1 kickoff?",
    a: "Two things. Dana's security sign off on Aperture's side, and the onboarding checklist you promised on the Jun 8 call. Clear both and the pilot starts on time.",
  },
  {
    q: "What does Sam need from me?",
    a: "The onboarding checklist, she has asked for it twice since the walkthrough. She also wants the team demo on the calendar so her ops team sees the setup before kickoff.",
  },
  {
    q: "Did Jordan send the pilot agreement?",
    a: "No. He promised the countersigned agreement by the end of the week of Jun 8, and it has not arrived in any thread since. Worth raising when you send the checklist.",
  },
];

const COMPANY_PROMPTS: Prompt[] = [
  {
    q: "Where does the Aperture pilot stand?",
    a: "A 30 day pilot for the ops team, $12K annual once it converts, kickoff July 1. Jordan is sold, Sam will run it day to day, and Dana's security sign off is the one gate left. You still owe the onboarding checklist Sam has asked for twice.",
    primary: true,
  },
  {
    q: "Who at Aperture should I focus on?",
    a: "Sam Torres. She runs the workflows the pilot has to fit and is the daily user who makes or breaks it. Jordan is your champion, but Sam is the one to win, and she is still waiting on the onboarding checklist.",
  },
  {
    q: "What is blocking the July 1 kickoff?",
    a: "Two things. Dana's security sign off on Aperture's side, and the onboarding checklist you promised on the Jun 8 call. Clear both and the pilot starts on time.",
  },
  {
    q: "Who owes what right now?",
    a: "You owe Sam and Jordan the onboarding checklist. Jordan owes you the signed pilot agreement from the walkthrough. Dana owes the security sign off. Three open loops, all movable this week.",
  },
];

type Msg = { role: "user" | "assistant"; text: string };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
      {children}
    </p>
  );
}

type RailConfig = {
  prompts: Prompt[];
  title: string;
  blurb: string;
  placeholder: string;
  scope: string; // "one group" / "one company"
  PrimaryIcon: LucideIcon;
};

function AskRail({ prompts, title, blurb, placeholder, scope, PrimaryIcon }: RailConfig) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [asked, setAsked] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  // Clear pending timers if the component unmounts mid-stream.
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  // Keep the newest message in view as answers stream in.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  });

  const ask = (p: Prompt) => {
    if (busy || asked.includes(p.q)) return;
    setBusy(true);
    setAsked((a) => [...a, p.q]);
    setMessages((m) => [...m, { role: "user", text: p.q }]);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setMessages((m) => [...m, { role: "assistant", text: p.a }]);
      setBusy(false);
      return;
    }

    // Think for a beat, then stream the answer word by word.
    timers.current.push(
      window.setTimeout(() => {
        setMessages((m) => [...m, { role: "assistant", text: "" }]);
        const words = p.a.split(" ");
        words.forEach((_, i) => {
          timers.current.push(
            window.setTimeout(() => {
              setMessages((m) => {
                const next = [...m];
                next[next.length - 1] = {
                  role: "assistant",
                  text: words.slice(0, i + 1).join(" "),
                };
                return next;
              });
              if (i === words.length - 1) setBusy(false);
            }, i * 26),
          );
        });
      }, 700),
    );
  };

  const remaining = prompts.filter((p) => !asked.includes(p.q));
  const primary = remaining.find((p) => p.primary);
  const chips = remaining.filter((p) => !p.primary);
  const done = remaining.length === 0 && !busy;
  const thinking = busy && messages[messages.length - 1]?.role === "user";

  return (
    <div className="flex flex-col border-t border-gray-100 bg-[#FBFBFA] px-5 py-5 sm:px-6 lg:border-l lg:border-t-0">
      <h4 className="font-display text-[15px] font-semibold text-gray-900">
        {title}
      </h4>
      <p className="mt-1 text-[12.5px] leading-relaxed text-gray-500">{blurb}</p>

      {/* Conversation */}
      {messages.length > 0 && (
        <div
          ref={scrollRef}
          className="mt-4 max-h-[300px] space-y-2.5 overflow-y-auto pr-0.5"
        >
          {messages.map((m, i) =>
            m.role === "user" ? (
              <div
                key={i}
                className="ml-auto w-fit max-w-[92%] rounded-2xl rounded-br-sm bg-gray-900 px-3.5 py-2 text-[12.5px] text-white"
              >
                {m.text}
              </div>
            ) : (
              <div
                key={i}
                className="w-fit max-w-[96%] rounded-2xl rounded-bl-sm border border-gray-100 bg-white px-3.5 py-2 text-[12.5px] leading-relaxed text-gray-700"
              >
                {m.text}
              </div>
            ),
          )}
          {thinking && (
            <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm border border-gray-100 bg-white px-3.5 py-2.5">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300"
                  style={{ animationDelay: `${d * 0.15}s` }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Prompts */}
      {primary && (
        <button
          type="button"
          onClick={() => ask(primary)}
          disabled={busy}
          className={[
            "mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 py-2.5 text-[13.5px] font-medium text-emerald-700 transition-colors hover:border-emerald-300 hover:bg-emerald-100/70 disabled:opacity-60",
            // Breathe until the visitor engages with anything, then go quiet.
            asked.length === 0 && !busy ? "prep-pulse" : "",
          ].join(" ")}
        >
          <PrimaryIcon className="h-4 w-4" strokeWidth={2} />
          {primary.q}
        </button>
      )}

      {chips.length > 0 && (
        <>
          <p className="mt-5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
            {asked.length ? "Ask another" : "Try asking"}
          </p>
          <div className="mt-2 space-y-2">
            {chips.map((p) => (
              <button
                key={p.q}
                type="button"
                onClick={() => ask(p)}
                disabled={busy}
                className="block w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-left text-[13px] text-gray-600 transition-colors hover:border-emerald-300 hover:text-gray-900 disabled:opacity-60"
              >
                {p.q}
              </button>
            ))}
          </div>
        </>
      )}

      {done && (
        <p className="mt-5 text-[12.5px] leading-relaxed text-gray-500">
          That is min. on {scope}.{" "}
          <a
            href="https://app.getmin.ai"
            className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
          >
            Connect your calendar
          </a>{" "}
          and ask about your own.
        </p>
      )}

      <div className="mt-5 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 lg:mt-auto">
        <span className="flex-1 truncate text-[13px] text-gray-400">{placeholder}</span>
        <Send className="h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={2} />
      </div>
    </div>
  );
}

export default function CapsuleWorkspace() {
  // Clicking "Aperture" swaps the whole workspace to the company capsule in
  // place, product-style; back returns to the group.
  const [view, setView] = useState<"group" | "company">("group");
  return (
    <div
      data-capsule
      className="w-full overflow-hidden rounded-[22px] border border-gray-200/80 bg-white shadow-[0_16px_60px_-16px_rgba(0,0,0,0.18)]"
    >
      {view === "company" ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr]">
          {/* ── The company record ── */}
          <div className="min-w-0">
            <CompanyCapsuleContent onBack={() => setView("group")} embedded />
          </div>

          {/* ── The company ask rail (live) ── */}
          <AskRail
            prompts={COMPANY_PROMPTS}
            title="Ask about Aperture"
            blurb="Query everything min. remembers across Aperture, every person and thread. Try it, this one is live."
            placeholder="Ask about Aperture…"
            scope="one company"
            PrimaryIcon={Building2}
          />
        </div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr]">
        {/* ── The record ── */}
        <div className="min-w-0 px-5 py-5 sm:px-7 sm:py-6">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex shrink-0 -space-x-2.5">
              <FlatAvatar who="you" size={40} label="You" className="border-2 border-white" />
              <FlatAvatar who="jordan" size={40} label="Jordan Lee" className="border-2 border-white" />
              <FlatAvatar who="sam" size={40} label="Sam Torres" className="border-2 border-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-[17px] font-semibold text-gray-900">
                You, Jordan &amp; Sam
              </h3>
              <p className="text-[12.5px] text-gray-500">
                The <CompanyLink onClick={() => setView("company")}>Aperture</CompanyLink> pilot · working group
              </p>
            </div>
            <div className="ml-auto hidden items-center gap-1.5 sm:flex">
              {["4 calls", "19 emails", "since May"].map((c) => (
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
            <ul className="mt-2 space-y-0.5">
              {INSIGHTS.map((i) => (
                <ExpandableRow
                  key={i.text}
                  detail={i.detail}
                  leading={
                    <Lightbulb
                      className="mt-[6px] h-3.5 w-3.5 shrink-0 text-emerald-500"
                      strokeWidth={2}
                    />
                  }
                >
                  <span className="text-[13.5px] leading-snug text-gray-700">{i.text}</span>
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
                      className="mt-[6px] h-3.5 w-3.5 shrink-0 text-gray-400"
                      strokeWidth={2}
                    />
                  }
                >
                  <span className="text-[13.5px] leading-snug text-gray-700">{a.text}</span>
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
                  <span className="block text-[11px] font-medium text-gray-400">{h.date}</span>
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
          prompts={GROUP_PROMPTS}
          title="Ask about this group"
          blurb="Query everything min. remembers across this group. Try it, this one is live."
          placeholder="Ask about this group…"
          scope="one group"
          PrimaryIcon={CalendarClock}
        />
      </div>
      )}
    </div>
  );
}

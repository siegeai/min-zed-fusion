import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Lightbulb,
  ArrowRight,
  CalendarClock,
  Building2,
  Send,
  Video,
  Zap,
  Mail,
  Handshake,
  TrendingUp,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { ExpandableRow, type Detail } from "./Expandable";
import { FlatAvatar } from "./DemoAvatars";
import { CompanyLink, CompanyCapsuleContent } from "./CompanyCapsule";
import { getDownloadTarget } from "@/lib/download";
import { fetchCapsule } from "@/lib/ask";

/**
 * The capsule as a desktop WORKSPACE, and a LIVE demo: the relationship record
 * (insights, open action items, distilled history) beside the "ask anything"
 * rail. Clicking the prep button or a suggested prompt plays the real UX, the
 * question lands as a bubble, min. thinks briefly, then streams a grounded
 * answer. All content is fictional, real-shaped demo data.
 */

const STAND: { text: string; detail: Detail }[] = [
  {
    text: "Price has come up in three straight conversations. Aperture is comparing options.",
    detail: {
      kind: "email",
      source: "Jun 2 · Jun 8 · Jun 14",
      body: "Jordan asked about annual pricing on Jun 2, Sam raised per seat cost on the walkthrough, and Jordan's Jun 14 email mentions evaluating a couple of tools. Worth reinforcing value before the team demo.",
    },
  },
  {
    text: "Team demo promised Jun 11, never scheduled. The longest open loop.",
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
    text: "Send Jordan and Sam the onboarding checklist by tomorrow, it was promised Jun 8.",
    detail: {
      kind: "call",
      source: "Call · Jun 8",
      body: "You committed to a step by step checklist proving setup takes under an hour. Jordan called it the deciding factor for the pilot.",
    },
  },
  {
    text: "Book the team demo this week, it has been open three weeks.",
    detail: {
      kind: "email",
      source: "Email · Jun 14",
      body: "Jordan pushed the original Jun 11 slot and never proposed a new date. He has taken your last three calls on Tuesday or Thursday mornings.",
    },
  },
  {
    text: "Chase the signed pilot agreement today, Jordan promised it three weeks ago.",
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

export type Prompt = { q: string; a: string; primary?: boolean; act?: boolean };

const GROUP_PROMPTS: Prompt[] = [
  {
    q: "Prep me for a meeting",
    a: "You owe Jordan and Sam the onboarding checklist from the Jun 8 call, and the team demo promised for Jun 11 still is not scheduled. Jordan owes you the signed pilot agreement. Lead with the checklist, Sam has asked for it twice, then leave with a demo date on the calendar.",
    primary: true,
  },
  {
    q: "What does Sam need from me?",
    a: "The onboarding checklist, she has asked for it twice since the walkthrough. She also wants the team demo on the calendar so her ops team sees the setup before kickoff.",
  },
  {
    q: "Am I competing with anyone for this pilot?",
    a: "Signs point that way. Price has come up in three straight conversations, and Jordan's Jun 14 email mentions evaluating a couple of tools. Nobody named yet, so treat the team demo as your chance to make the choice easy.",
  },
  {
    q: "Book the team demo with Jordan and Sam",
    a: "Done. Invite sent for Thursday 9:30am, Jordan has taken your last three calls on Tuesday or Thursday mornings. Agenda attached: onboarding walkthrough with the checklist. I will flag it if he has not accepted by tomorrow.",
    act: true,
  },
  {
    q: "Draft the follow up with the checklist",
    a: "Drafted, in your outbox for review. It recaps the Jun 8 promises, attaches the onboarding checklist Sam asked for twice, and closes by asking for the signed pilot agreement. Tone matched to your thread.",
    act: true,
  },
];

export const COMPANY_PROMPTS: Prompt[] = [
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
    q: "Who owes what right now?",
    a: "You owe Sam and Jordan the onboarding checklist. Jordan owes you the signed pilot agreement from the walkthrough. Dana owes the security sign off. Three open loops, all movable this week.",
  },
  {
    q: "Nudge Dana about the security review",
    a: "Drafted, in your outbox for review. It thanks Dana for running the review, asks if anything is missing from the security overview, and offers a quick call this week. She is the last gate before July 1.",
    act: true,
  },
];

/**
 * The two solo scenarios beside the Aperture deal: same capsule spine
 * (where you stand, action items, history) pointed at a promotion and a
 * job search. Personas match the Wins section arenas.
 */
type ScenarioData = {
  /**
   * Which stock portrait to use. Absent for generated capsules: those invent a
   * person, and the stock faces are already spoken for elsewhere on the page,
   * so reusing one puts Dana Song's photo on someone called Marcus Webb.
   */
  who?: "avery" | "priya";
  name: string;
  title: string;
  role: string;
  chips: string[];
  stand: { text: string; detail: Detail }[];
  actions: { text: string; detail: Detail }[];
  history: { Icon: LucideIcon; date: string; text: string; detail: Detail }[];
  railTitle: string;
  prompts: Prompt[];
};

const PROMOTION: ScenarioData = {
  who: "avery",
  name: "Dana Song",
  title: "You & Dana Song",
  role: "Your manager · Engineering",
  chips: ["14 one on ones", "31 emails", "since Jan"],
  stand: [
    {
      text: "Dana has raised cross team wins in three straight one on ones. That is the bar for staff.",
      detail: {
        kind: "call",
        source: "May 12 · Jun 3 · Jun 24",
        body: "Cross team impact came up in all three one on ones, unprompted. She is telling you what the promotion case needs.",
      },
    },
    {
      text: "She asked for numbers on the billing migration and the on call overhaul. Still unsent.",
      detail: {
        kind: "call",
        source: "Check in · May 12",
        body: "Dana asked for before and after figures on both projects, the two wins she plans to cite in your case.",
      },
    },
    {
      text: "Calibration is in September. Cases get written in August.",
      detail: {
        kind: "call",
        source: "One on one · Jun 24",
        body: "Packets go to the committee in early September and Dana drafts hers in August. The window to shape yours is now.",
      },
    },
  ],
  actions: [
    {
      text: "Send Dana both project numbers by Friday, she asked May 12.",
      detail: {
        kind: "call",
        source: "Check in · May 12",
        body: "Migration close time and on call page counts, before and after. She plans to cite both, and she cannot cite what she does not have.",
      },
    },
    {
      text: "Draft your promo case this month, packets are written in August.",
      detail: {
        kind: "call",
        source: "One on one · Jun 24",
        body: "Dana writes her draft in August. Hand her an evidence page before she starts and your case is written in your words, not from memory.",
      },
    },
  ],
  history: [
    {
      Icon: Video,
      date: "Jun 24",
      text: "One on one. Dana said the staff case needs cross team evidence.",
      detail: {
        kind: "call",
        source: "One on one · 30 min",
        body: "She walked through what the committee rewards and pointed at the migration and on call work as your strongest material.",
      },
    },
    {
      Icon: Video,
      date: "May 12",
      text: "Check in. She asked for numbers on the migration and on call.",
      detail: {
        kind: "call",
        source: "Check in · 25 min",
        body: "First time she named the promotion out loud. She asked for figures on both projects before planning season.",
      },
    },
    {
      Icon: Video,
      date: "Jan 9",
      text: "Goal setting. You both put staff on the plan for this year.",
      detail: {
        kind: "call",
        source: "One on one · 45 min",
        body: "You set the staff goal together and agreed cross team impact would be the theme of the year.",
      },
    },
  ],
  railTitle: "How can I help with Dana?",
  prompts: [
    {
      q: "Prep me for my 1:1 with Dana",
      a: "She asked for migration and on call numbers on May 12 and they are still unsent. Calibration packets get written in August. Lead with the numbers, then ask her directly what would make the staff case undeniable.",
      primary: true,
    },
    {
      q: "What does Dana actually care about?",
      a: "Cross team wins. She has raised them in three straight one on ones, and she plans to cite the billing migration and the on call overhaul. Give her the numbers and she has her case.",
    },
    {
      q: "Draft the update with both numbers",
      a: "Drafted, in your outbox for review. Migration: close time down 38 percent. On call: pages halved since April. Framed the way Dana talks about impact in your one on ones.",
      act: true,
    },
    {
      q: "Book 30 minutes with Dana before August",
      a: "Done. Invite sent for Tuesday 10am, her open slot after staff meeting. Agenda reads: promotion case, evidence review. I will flag it if she moves it.",
      act: true,
    },
  ],
};

const HIRED: ScenarioData = {
  who: "priya",
  name: "Rachel Moore",
  title: "You & Rachel Moore",
  role: "Head of Engineering, Northwind",
  chips: ["2 interviews", "6 emails", "since Jul"],
  stand: [
    {
      text: "Your incident postmortem is why you got the second interview. Rachel brought it up twice.",
      detail: {
        kind: "call",
        source: "Interviews · Jul 10 · Jul 18",
        body: "She found the postmortem on your blog before the screen and opened both conversations with it. To her, you are the incident person.",
      },
    },
    {
      text: "Northwind is rebuilding their incident process. Your experience is the fit.",
      detail: {
        kind: "call",
        source: "Interview · Jul 18",
        body: "Rachel described the rebuild twice and said it drives the quarter. The role is being shaped around exactly what you did last year.",
      },
    },
    {
      text: "Final round is with the CTO. Rachel decides who gets the slot.",
      detail: {
        kind: "email",
        source: "Email · Jul 21",
        body: "Two candidates go to the CTO round. Rachel picks them after the panel debrief on Friday.",
      },
    },
  ],
  actions: [
    {
      text: "Send the thank you note today, the panel debriefs Friday.",
      detail: {
        kind: "email",
        source: "Email · Jul 21",
        body: "The debrief is Friday morning. A note that lands before it keeps your name warm in the room where the decision happens.",
      },
    },
    {
      text: "Send Rachel the design doc by Thursday, she asked for it Jul 18.",
      detail: {
        kind: "call",
        source: "Interview · Jul 18",
        body: "She asked to see the systems design doc behind the postmortem. It is your proof of depth, and it is still unsent.",
      },
    },
  ],
  history: [
    {
      Icon: Video,
      date: "Jul 18",
      text: "Second interview. Deep dive on incident response.",
      detail: {
        kind: "call",
        source: "Interview · 55 min",
        body: "Rachel walked through Northwind's rebuild and asked how you would run it. She asked for the design doc at the end.",
      },
    },
    {
      Icon: Video,
      date: "Jul 10",
      text: "First screen. Rachel opened with the postmortem from your blog.",
      detail: {
        kind: "call",
        source: "Screen · 30 min",
        body: "She had read it before the call and asked what you would do differently now. You advanced the same afternoon.",
      },
    },
    {
      Icon: Mail,
      date: "Jul 2",
      text: "You applied and followed up. Rachel replied the same day.",
      detail: {
        kind: "email",
        source: "Email · Jul 2",
        body: "Your follow up mentioned the incident work. Her reply came four hours later with the screen invite.",
      },
    },
  ],
  railTitle: "How can I help with Rachel?",
  prompts: [
    {
      q: "Prep me for the final round",
      a: "The CTO cares about the incident rebuild, Rachel said it drives the quarter. Retell the postmortem with numbers, then ask how they run incidents today. You are the incident person in this process, stay the incident person.",
      primary: true,
    },
    {
      q: "What does Rachel remember about me?",
      a: "The outage postmortem. She found it before the screen and has opened both interviews with it. It is why you are in the process, and the design doc behind it is the proof she asked for.",
    },
    {
      q: "Draft the thank you note",
      a: "Drafted, in your outbox for review. It thanks Rachel for the deep dive, ties your postmortem to Northwind's rebuild, and confirms the design doc by Thursday. Short, warm, lands before Friday's debrief.",
      act: true,
    },
  ],
};

type Msg = { role: "user" | "assistant"; text: string };

/**
 * Stands in for a photo when the person is invented. Initials are honest about
 * that in a way a stock portrait is not, and they cannot collide with a face
 * used elsewhere on the page.
 */
function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .replace(/^(Dr|Mr|Mrs|Ms|Prof)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      aria-label={name}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-white bg-gray-100 text-[13px] font-semibold text-gray-500"
    >
      {initials || "?"}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
      {children}
    </p>
  );
}

export type RailConfig = {
  prompts: Prompt[];
  title: string;
  blurb: string;
  placeholder: string;
  scope: string; // "one group" / "one company"
  PrimaryIcon: LucideIcon;
};

export function AskRail({ prompts, title, blurb, placeholder, scope, PrimaryIcon }: RailConfig) {
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
  const chips = remaining.filter((p) => !p.primary && !p.act);
  const actChips = remaining.filter((p) => p.act);
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
            {asked.length ? "Try another" : "Try one"}
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

      {/* Actions: min. executes these, not just answers them */}
      {actChips.length > 0 && (
        <>
          <p className="mt-5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
            Or have min. do it
          </p>
          <div className="mt-2 space-y-2">
            {actChips.map((p) => (
              <button
                key={p.q}
                type="button"
                onClick={() => ask(p)}
                disabled={busy}
                className="flex w-full items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50/60 px-3.5 py-2.5 text-left text-[13px] font-medium text-emerald-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 disabled:opacity-60"
              >
                <Zap className="mt-[3px] h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2} />
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
            href={getDownloadTarget().href}
            className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
          >
            {getDownloadTarget().label}
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

/** A solo capsule: the same spine as the deal demo, one person deep. */
function PersonScenario({ data, note }: { data: ScenarioData; note?: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr]">
      <div className="min-w-0 px-5 py-5 sm:px-7 sm:py-6">
        {note}
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex shrink-0 -space-x-2.5">
            <FlatAvatar who="you" size={40} label="You" className="border-2 border-white" />
            {data.who ? (
              <FlatAvatar
                who={data.who}
                size={40}
                label={data.name}
                className="border-2 border-white"
              />
            ) : (
              <InitialsAvatar name={data.name} />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-[17px] font-semibold text-gray-900">
              {data.title}
            </h3>
            <p className="text-[12.5px] text-gray-500">{data.role}</p>
          </div>
          <div className="ml-auto hidden items-center gap-1.5 sm:flex">
            {data.chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-500"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Where you stand */}
        <div className="mt-5">
          <div className="flex items-center gap-2">
            <SectionLabel>Where you stand</SectionLabel>
          </div>
          <ul className="mt-2 space-y-0.5">
            {data.stand.map((i) => (
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
            {data.actions.map((a) => (
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
            {data.history.map((h) => (
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

      <AskRail
        prompts={data.prompts}
        title={data.railTitle}
        blurb="Answers and actions, grounded in everything min. remembers. Try it, this one is live."
        placeholder="Tell min. what you need…"
        scope="one relationship"
        PrimaryIcon={CalendarClock}
      />
    </div>
  );
}

const SCENARIOS = [
  { key: "deal", label: "Close the deal", Icon: Handshake },
  { key: "promotion", label: "Land that promotion", Icon: TrendingUp },
  { key: "hired", label: "Get hired", Icon: Briefcase },
] as const;

const EXAMPLE_SITUATIONS = [
  "I run a design agency and renewals sneak up on me",
  "I'm job hunting and juggling four interview loops",
  "I sell enterprise software, six stakeholders a deal",
  "I'm raising a seed round",
];

/**
 * The fourth arena: the visitor's own.
 *
 * Three fixed examples show what a capsule is. This one answers "yes, but what
 * about MY work", which is the question the other three cannot. The model fills
 * the same typed slots PersonScenario already renders and never emits markup or
 * class names, so a bad generation is a failed fetch rather than a broken
 * layout, and the shipped arenas are always one click away.
 */
function YourCapsule() {
  const [draft, setDraft] = useState("");
  const [data, setData] = useState<ScenarioData | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const build = async (situation: string) => {
    const text = situation.trim();
    if (!text || busy) return;
    setBusy(true);
    setError(null);
    try {
      const c = await fetchCapsule(text);
      setData({
        ...c,
        // The model picks none of this. Icons come from whether a row was a
        // call or an email, which is the only thing it is asked to classify.
        history: c.history.map((h) => ({
          ...h,
          Icon: h.detail.kind === "call" ? Video : Mail,
        })),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  if (data) {
    return (
      <PersonScenario
        data={data}
        note={
          // Load-bearing, not a disclaimer. The names, dates and numbers below
          // are invented, and without this line a capsule about "your" client
          // implies min. has already read your mail.
          <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-2">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-emerald-600" strokeWidth={2} />
            <p className="text-[12px] text-emerald-900">
              Built from what you told min. The person and the dates are made up; the
              shape is real.
            </p>
            <button
              type="button"
              onClick={() => {
                setData(null);
                setDraft("");
              }}
              className="ml-auto text-[11.5px] font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-900"
            >
              Try another
            </button>
          </div>
        }
      />
    );
  }

  return (
    <div className="px-5 py-10 sm:px-7 sm:py-16">
      <div className="mx-auto max-w-lg text-center">
        <h3 className="font-display text-[19px] font-semibold tracking-[-0.01em] text-gray-900">
          {busy ? "Building your capsule…" : "See it on your own work"}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-gray-500">
          {busy
            ? "One relationship from your world, in the same three sections."
            : "Tell min. what you do in a line. It builds the same capsule around a relationship from your world."}
        </p>

        {busy ? (
          <div className="mt-8 space-y-3" aria-live="polite" aria-busy="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="skeleton-line h-3 rounded-full bg-gray-100"
                style={{ animationDelay: `${i * 120}ms`, width: `${[92, 78, 85, 64, 71][i]}%` }}
              />
            ))}
          </div>
        ) : (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                build(draft);
              }}
              className="mt-6 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] transition-colors focus-within:border-emerald-300"
            >
              <Sparkles className="h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2} />
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={280}
                placeholder="I run partnerships at a fintech…"
                aria-label="Describe the work you do"
                className="min-w-0 flex-1 bg-transparent text-[13.5px] text-gray-900 outline-none placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                aria-label="Build my capsule"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-700 disabled:opacity-40"
              >
                <Send className="h-4 w-4" strokeWidth={2} />
              </button>
            </form>

            {error && (
              <p className="mt-3 text-[12.5px] leading-relaxed text-amber-700">{error}</p>
            )}

            <div className="mt-5 flex flex-wrap justify-center gap-1.5">
              {EXAMPLE_SITUATIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setDraft(s);
                    build(s);
                  }}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[12px] text-gray-600 transition-colors hover:border-emerald-300 hover:text-gray-900"
                >
                  {s}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function CapsuleWorkspace() {
  // Three arenas to pick from; within the deal, clicking "Aperture" swaps the
  // workspace to the company capsule in place, product-style.
  // "yours" is the generated arena. It is deliberately not in SCENARIOS: the
  // autoplay rotation cycles the three shipped examples, and a slot that only
  // exists once a visitor has described their work must never be rotated into.
  const [scenario, setScenario] = useState<
    (typeof SCENARIOS)[number]["key"] | "yours"
  >("deal");
  const [view, setView] = useState<"group" | "company">("group");
  // The demo cycles the three arenas on its own so a passing visitor sees all
  // three. Hovering or focusing anywhere in it pauses; clicking anything hands
  // control over for good, so nothing is yanked away mid-read.
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);

  const advance = () => {
    const i = SCENARIOS.findIndex((s) => s.key === scenario);
    setScenario(SCENARIOS[(i + 1) % SCENARIOS.length].key);
    setView("group");
  };

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onClickCapture={() => setStopped(true)}
    >
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => {
              setScenario(s.key);
              setView("group");
            }}
            className={[
              "relative overflow-hidden inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors",
              s.key === scenario
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900",
            ].join(" ")}
          >
            {s.key === scenario && !stopped && (
              <span
                key={scenario}
                aria-hidden="true"
                className="pill-countdown absolute inset-y-0 left-0 w-full bg-white/20"
                style={{ animationPlayState: paused ? "paused" : "running" }}
                onAnimationEnd={advance}
              />
            )}
            <s.Icon className="relative h-3.5 w-3.5" strokeWidth={2} />
            <span className="relative">{s.label}</span>
          </button>
        ))}

        {/* The visitor's own arena, set apart because it is the one that is not
            a canned example. */}
        <button
          type="button"
          onClick={() => {
            setScenario("yours");
            setView("group");
          }}
          className={[
            "inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors",
            scenario === "yours"
              ? "border-emerald-600 bg-emerald-600 text-white"
              : "border-dashed border-emerald-300 bg-white text-emerald-700 hover:border-emerald-500 hover:bg-emerald-50",
          ].join(" ")}
        >
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
          Your work
        </button>
      </div>

      <div
        data-capsule
        className="w-full overflow-hidden rounded-[22px] border border-gray-200/80 bg-white shadow-[0_16px_60px_-16px_rgba(0,0,0,0.18)]"
      >
      {scenario === "yours" ? (
        <YourCapsule />
      ) : scenario !== "deal" ? (
        <PersonScenario
          key={scenario}
          data={scenario === "promotion" ? PROMOTION : HIRED}
        />
      ) : view === "company" ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr]">
          {/* ── The company record ── */}
          <div className="min-w-0">
            <CompanyCapsuleContent onBack={() => setView("group")} embedded />
          </div>

          {/* ── The company ask rail (live) ── */}
          <AskRail
            prompts={COMPANY_PROMPTS}
            title="How can I help with Aperture?"
            blurb="Answers and actions, grounded in everything min. remembers. Try it, this one is live."
            placeholder="Tell min. what you need…"
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

          {/* Where you stand */}
          <div className="mt-5">
            <div className="flex items-center gap-2">
              <SectionLabel>Where you stand</SectionLabel>
            </div>
            <ul className="mt-2 space-y-0.5">
              {STAND.map((i) => (
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
          title="How can I help with this group?"
          blurb="Answers and actions, grounded in everything min. remembers. Try it, this one is live."
          placeholder="Tell min. what you need…"
          scope="one group"
          PrimaryIcon={CalendarClock}
        />
      </div>
      )}
      </div>
    </div>
  );
}

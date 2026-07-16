import { useEffect, useRef, useState } from "react";
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
 * The capsule as a desktop WORKSPACE, and a LIVE demo: the relationship record
 * (insights, open action items, distilled history) beside the "ask anything"
 * rail. Clicking the prep button or a suggested prompt plays the real UX, the
 * question lands as a bubble, min. thinks briefly, then streams a grounded
 * answer. All content is fictional, real-shaped demo data.
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

type Prompt = { q: string; a: string; primary?: boolean };

const PROMPTS: Prompt[] = [
  {
    q: "Prep me for a meeting",
    a: "You owe Jordan the cohort retention data from the Jun 8 call, and the demo promised for Jun 11 still is not scheduled. He owes you the updated cap table. Lead with retention, it is the one thing he flagged to prove, then leave with a demo date on the calendar.",
    primary: true,
  },
  {
    q: "What does Jordan care about?",
    a: "Retention, above everything. He called it the one thing to prove after seeing the deck on Jun 2, and it is what the $50K decision hangs on. He is sold on the product otherwise, the check is just waiting on his conflict review.",
  },
  {
    q: "What have we committed to each other?",
    a: "You promised the cohort retention data and a demo for Jun 11, both still open. Jordan agreed on the Jun 8 call to send the updated cap table, and offered a warm intro to Meridian's ops team that you have not used yet.",
  },
  {
    q: "Summarize our last conversation",
    a: "Jun 8, a 38 minute diligence call. You agreed the $50K stays an angel check, not the whole round. Jordan committed to the updated cap table, you committed to the retention data, and the demo was left unscheduled.",
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

function AskRail() {
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

  const remaining = PROMPTS.filter((p) => !asked.includes(p.q));
  const primary = remaining.find((p) => p.primary);
  const chips = remaining.filter((p) => !p.primary);
  const done = remaining.length === 0 && !busy;
  const thinking = busy && messages[messages.length - 1]?.role === "user";

  return (
    <div className="flex flex-col border-t border-gray-100 bg-[#FBFBFA] px-5 py-5 sm:px-6 lg:border-l lg:border-t-0">
      <h4 className="font-display text-[15px] font-semibold text-gray-900">
        Ask about Jordan
      </h4>
      <p className="mt-1 text-[12.5px] leading-relaxed text-gray-500">
        Query everything min. remembers about this relationship. Try it, this
        one is live.
      </p>

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
          <CalendarClock className="h-4 w-4" strokeWidth={2} />
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
          That is min. on one relationship.{" "}
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
        <span className="flex-1 truncate text-[13px] text-gray-400">Ask about Jordan…</span>
        <Send className="h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={2} />
      </div>
    </div>
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

        {/* ── The ask rail (live) ── */}
        <AskRail />
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send } from "lucide-react";

/**
 * "Ask min." — the site's own chat widget.
 *
 * The API key lives in the Cloudflare Worker at ASK_ENDPOINT, never here: this
 * bundle is public. The Worker owns the system prompt and the guardrails too,
 * so nothing a visitor types in this box can change what the bot is allowed to
 * say. This component only renders the conversation.
 *
 * With ASK_ENDPOINT empty the widget does not render at all, so the site is
 * safe to ship before the Worker is deployed.
 */

// The Worker in worker/. Redeploy it with `npx wrangler deploy` from there.
const ASK_ENDPOINT = "https://ask-min.ew-baa.workers.dev";

// Shaped to get the visitor talking about their own work — the answers are far
// better once min. knows what they actually do.
const OPENERS = [
  "I'm in sales. Would this help me?",
  "I keep losing track after conferences.",
  "How is this different from a notetaker?",
  "Is it really free?",
];

type Msg = { role: "user" | "assistant"; content: string };

/**
 * Conversations survive a reload and a return visit. Kept in localStorage
 * rather than on the server: it is the visitor's own browser, so there is no
 * data to transfer, retain, or delete on our side.
 *
 * Expires after a week. Someone returning a few days later is mid-evaluation
 * and wants continuity; someone returning in a month has forgotten the whole
 * exchange, and resurfacing it reads as surveillance rather than service.
 */
const STORAGE_KEY = "min.ask.v1";
const HISTORY_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_STORED = 20; // matches the Worker's history cap; anything older is dropped server-side anyway

type Stored = { savedAt: number; messages: Msg[] };

function loadHistory(): Msg[] {
  // Storage throws in Safari private mode and when cookies are blocked, and
  // the payload is user-editable, so nothing here may be trusted or assumed.
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Partial<Stored>;
    if (!parsed || !Array.isArray(parsed.messages) || typeof parsed.savedAt !== "number") {
      return [];
    }
    if (Date.now() - parsed.savedAt > HISTORY_TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    return parsed.messages
      .filter(
        (m): m is Msg =>
          !!m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0,
      )
      .slice(-MAX_STORED);
  } catch {
    return [];
  }
}

/**
 * Daily question cap. This is a qualification nudge, not a security control:
 * someone on their fifteenth question is an engaged prospect who will get more
 * out of a human than out of a FAQ bot, so hand them off rather than keep
 * answering. It lives client-side deliberately, because the point is to show a
 * warm message. Abuse is already handled server-side by the Worker's per-minute
 * limit and its origin check, so this being clearable is fine.
 */
const DAILY_LIMIT = 15;
const QUOTA_KEY = "min.ask.quota.v1";

/** Local calendar day, so the count resets at the visitor's midnight. */
function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function askedToday(): number {
  try {
    const raw = localStorage.getItem(QUOTA_KEY);
    if (!raw) return 0;
    const { date, count } = JSON.parse(raw) as { date?: string; count?: number };
    if (date !== today() || typeof count !== "number" || count < 0) return 0;
    return count;
  } catch {
    return 0;
  }
}

function recordQuestion() {
  try {
    localStorage.setItem(
      QUOTA_KEY,
      JSON.stringify({ date: today(), count: askedToday() + 1 }),
    );
  } catch {
    // Storage unavailable: the cap silently does not apply. Acceptable — the
    // Worker still rate-limits, and this was only ever a nudge.
  }
}

function saveHistory(messages: Msg[]) {
  try {
    if (messages.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    const payload: Stored = { savedAt: Date.now(), messages: messages.slice(-MAX_STORED) };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Quota or blocked storage: persistence is a nicety, never a requirement.
  }
}

export default function AskMin() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(loadHistory);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capped, setCapped] = useState(() => askedToday() >= DAILY_LIMIT);

  // How many messages came back from storage, captured once on mount, so the
  // panel can label them as belonging to an earlier visit.
  const restoredCount = useRef(messages.length);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Keep the newest text in view as it streams.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  });

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Escape closes; also drop any in-flight request when the panel goes away.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  // Persist only once a turn has settled — mid-stream state would store a
  // half-written answer, and the empty placeholder bubble is dropped by then.
  useEffect(() => {
    if (!busy) saveHistory(messages);
  }, [messages, busy]);

  function clearHistory() {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    restoredCount.current = 0;
    saveHistory([]);
    inputRef.current?.focus();
  }

  async function ask(question: string) {
    const text = question.trim();
    if (!text || busy) return;

    // Hand off to a human rather than answering a sixteenth question.
    if (askedToday() >= DAILY_LIMIT) {
      setCapped(true);
      setDraft("");
      return;
    }
    recordQuestion();
    if (askedToday() >= DAILY_LIMIT) setCapped(true);

    setError(null);
    setDraft("");
    const history: Msg[] = [...messages, { role: "user", content: text }];
    // Open the assistant bubble immediately so the reply streams into place.
    setMessages([...history, { role: "assistant", content: "" }]);
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(ASK_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error(res.status === 429 ? "rate" : "http");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      // Minimal SSE reader: frames are separated by a blank line.
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const frames = buffer.split("\n\n");
        buffer = frames.pop() ?? "";

        for (const frame of frames) {
          const evLine = frame.split("\n").find((l) => l.startsWith("event: "));
          const dataLine = frame.split("\n").find((l) => l.startsWith("data: "));
          if (!evLine || !dataLine) continue;

          const event = evLine.slice(7).trim();
          let payload: { text?: string; message?: string } = {};
          try {
            payload = JSON.parse(dataLine.slice(6));
          } catch {
            continue;
          }

          if (event === "delta" && payload.text) {
            const chunk = payload.text;
            setMessages((prev) => {
              const next = [...prev];
              const last = next[next.length - 1];
              if (last?.role === "assistant") {
                next[next.length - 1] = { role: "assistant", content: last.content + chunk };
              }
              return next;
            });
          } else if (event === "error") {
            setError(payload.message ?? "Something went wrong.");
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError(
        (err as Error).message === "rate"
          ? "Too many questions in a row. Give it a minute."
          : "I could not reach min. just now. Try again, or email hello@getmin.ai.",
      );
    } finally {
      setBusy(false);
      abortRef.current = null;
      // Drop the placeholder if nothing ever streamed into it.
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        return last?.role === "assistant" && last.content === "" ? prev.slice(0, -1) : prev;
      });
    }
  }

  if (!ASK_ENDPOINT) return null;

  const showOpeners = messages.length === 0 && !capped;

  return (
    <div className="fixed bottom-5 right-4 z-50 w-[calc(100vw-2rem)] sm:bottom-6 sm:right-6 sm:w-[384px]">
      {open && (
        <div
          role="dialog"
          aria-label="Ask min. about min."
          className="modal-in mb-2.5 overflow-hidden rounded-[22px] border border-gray-200/80 bg-white shadow-[0_16px_60px_-16px_rgba(0,0,0,0.18)]"
        >
          {/* Header mirrors the capsule rail: same title shape, same blurb weight */}
          <div className="flex items-start justify-between gap-3 border-b border-gray-100 bg-[#FBFBFA] px-5 pt-5 pb-4">
            <div className="min-w-0">
              <h4 className="font-display text-[15px] font-semibold text-gray-900">
                How can I help with min.?
              </h4>
              <p className="mt-1 text-[12.5px] leading-relaxed text-gray-500">
                Answers grounded in what min. actually does. Tell me what you
                work on and I will keep it specific.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="-mr-1.5 -mt-1 shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white hover:text-gray-700"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="max-h-[min(58vh,420px)] overflow-y-auto bg-[#FBFBFA] px-5 pb-5"
          >
            {restoredCount.current > 0 && (
              <p className="pt-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                From your last visit
              </p>
            )}

            {messages.length > 0 && (
              <div className="mt-2.5 space-y-2.5">
                {messages.map((m, i) => (
                  <div key={i}>
                    {restoredCount.current > 0 && i === restoredCount.current && (
                      <div className="mb-2.5 flex items-center gap-2 pt-1">
                        <span className="h-px flex-1 bg-gray-200/70" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400">
                          Today
                        </span>
                        <span className="h-px flex-1 bg-gray-200/70" />
                      </div>
                    )}
                    {m.role === "user" ? (
                      <div className="ml-auto w-fit max-w-[92%] rounded-2xl rounded-br-sm bg-gray-900 px-3.5 py-2 text-[12.5px] text-white">
                        {m.content}
                      </div>
                    ) : m.content ? (
                      <div className="w-fit max-w-[96%] whitespace-pre-wrap rounded-2xl rounded-bl-sm border border-gray-100 bg-white px-3.5 py-2 text-[12.5px] leading-relaxed text-gray-700">
                        {m.content}
                      </div>
                    ) : (
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
                ))}
              </div>
            )}

            {showOpeners && (
              <>
                <p className="pt-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                  Try one
                </p>
                <div className="mt-2 space-y-2">
                  {OPENERS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => ask(q)}
                      disabled={busy}
                      className="block w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-left text-[13px] text-gray-600 transition-colors hover:border-emerald-300 hover:text-gray-900 disabled:opacity-60"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </>
            )}

            {error && (
              <p className="mt-2.5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-amber-900">
                {error}
              </p>
            )}

            {capped && (
              <p className="mt-2.5 text-[12.5px] leading-relaxed text-gray-500">
                That is a lot of good questions, which usually means it is worth
                talking to someone who can go deeper than I can.{" "}
                <a
                  href="mailto:hello@getmin.ai?subject=Questions%20about%20min."
                  className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                >
                  Email the team
                </a>{" "}
                and they will pick it up. I will be here again tomorrow.
              </p>
            )}

            {messages.length > 0 && !busy && !capped && (
              <button
                type="button"
                onClick={clearHistory}
                className="mt-4 text-[11.5px] font-medium text-gray-400 transition-colors hover:text-gray-700"
              >
                Start over
              </button>
            )}
          </div>
        </div>
      )}

      {/* The launcher IS the composer: closed, it is the same pill the demo
          rails end with, so opening the panel reads as continuing a surface
          the visitor already used rather than summoning a chat widget. */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(draft);
        }}
        // Click anywhere on the pill opens the panel. Load-bearing when the
        // daily cap is reached: the input goes read-only then, and if opening
        // depended on focusing it the visitor would never see the message
        // telling them to email the team.
        onClick={() => setOpen(true)}
        className="flex cursor-text items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.18)] transition-colors focus-within:border-emerald-300"
      >
        {!open && (
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2} />
        )}
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onFocus={() => setOpen(true)}
          disabled={busy}
          // Read-only rather than disabled so the pill stays focusable and the
          // hand-off message remains reachable.
          readOnly={capped}
          placeholder={capped ? "Email hello@getmin.ai" : "Ask min. about min."}
          aria-label="Ask min. a question"
          className="min-w-0 flex-1 bg-transparent text-[13px] text-gray-900 outline-none placeholder:text-gray-400 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={busy || capped || !draft.trim()}
          aria-label="Send"
          className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-700 disabled:opacity-40"
        >
          <Send className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </form>
    </div>
  );
}

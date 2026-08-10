import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send, ArrowDown } from "lucide-react";

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

// Set this to the Worker's URL after `wrangler deploy` prints it.
const ASK_ENDPOINT = "";

// Shaped to get the visitor talking about their own work — the answers are far
// better once min. knows what they actually do.
const OPENERS = [
  "I'm in sales. Would this help me?",
  "I keep losing track after conferences.",
  "How is this different from a notetaker?",
  "Is it really free?",
];

type Msg = { role: "user" | "assistant"; content: string };

export default function AskMin() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  async function ask(question: string) {
    const text = question.trim();
    if (!text || busy) return;

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

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Ask min. a question"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-3 text-[13.5px] font-medium text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 sm:bottom-6 sm:right-6"
      >
        {open ? (
          <X className="h-4 w-4" strokeWidth={2} />
        ) : (
          <Sparkles className="h-4 w-4 text-emerald-400" strokeWidth={2} />
        )}
        {open ? "Close" : "Ask min."}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Ask min."
          className="modal-in fixed inset-x-3 bottom-20 z-50 flex max-h-[min(600px,72vh)] flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_16px_60px_-16px_rgba(0,0,0,0.28)] sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[380px]"
        >
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="font-display text-[15px] font-semibold text-gray-900">
              Ask min. anything
            </p>
            <p className="mt-0.5 text-[12px] leading-snug text-gray-500">
              Questions about the product, answered from what min. actually does.
            </p>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3">
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                  Try asking
                </p>
                {OPENERS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => ask(q)}
                    className="block w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-left text-[13px] text-gray-600 transition-colors hover:border-emerald-300 hover:text-gray-900"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-2.5">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div
                    key={i}
                    className="ml-auto w-fit max-w-[88%] rounded-2xl rounded-br-sm bg-gray-900 px-3.5 py-2 text-[13px] text-white"
                  >
                    {m.content}
                  </div>
                ) : (
                  <div
                    key={i}
                    className="w-fit max-w-[94%] whitespace-pre-wrap rounded-2xl rounded-bl-sm border border-gray-100 bg-[#FBFBFA] px-3.5 py-2 text-[13px] leading-relaxed text-gray-700"
                  >
                    {m.content || (
                      <span className="flex items-center gap-1 py-0.5">
                        {[0, 1, 2].map((d) => (
                          <span
                            key={d}
                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300"
                            style={{ animationDelay: `${d * 0.15}s` }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                ),
              )}
            </div>

            {error && (
              <p className="mt-2.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[12.5px] leading-snug text-amber-800">
                {error}
              </p>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(draft);
            }}
            className="border-t border-gray-100 p-3"
          >
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1.5 pl-4 pr-1.5 focus-within:border-emerald-300">
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                disabled={busy}
                placeholder="Ask about min."
                aria-label="Your question"
                className="min-w-0 flex-1 bg-transparent text-[13px] text-gray-900 outline-none placeholder:text-gray-400 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={busy || !draft.trim()}
                aria-label="Send"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700 disabled:opacity-30"
              >
                {busy ? (
                  <ArrowDown className="h-3.5 w-3.5 animate-pulse" strokeWidth={2.2} />
                ) : (
                  <Send className="h-3.5 w-3.5" strokeWidth={2.2} />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

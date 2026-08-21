import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send } from "lucide-react";
import {
  ASK_ENDPOINT,
  CONTACT_ADDRESS,
  fetchDraft,
  isValidEmail,
  sendContact,
  type Draft,
} from "@/lib/ask";

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

// One per thing a visitor actually arrives wondering: what it does, how it is
// not the tool they already have, the feature that surprises people, and the
// cost. Each maps to a fact in llms.txt, so none of them dead-ends.
const OPENERS = [
  "What can min. actually do?",
  "How is this different from a notetaker?",
  "Can it chase someone until they reply?",
  "Do I need to sign up to try it?",
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

/**
 * The hand-off, offered when the bot could not answer.
 *
 * A gap is the most valuable moment in the whole conversation: someone with a
 * real question, no answer, and one click from leaving. So min. writes the
 * question up rather than handing over an address and hoping. The draft is
 * always editable, and nothing is sent until they press the button.
 */
function HandOff({ messages, onDone }: { messages: Msg[]; onDone: () => void }) {
  const [stage, setStage] = useState<"offer" | "drafting" | "form" | "sent" | "opened">("offer");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  // Only complain once they have left the field. Flagging "invalid" while
  // someone is still on the first character of their own address is hostile.
  const [emailTouched, setEmailTouched] = useState(false);

  const emailOk = isValidEmail(email);
  const showEmailError = emailTouched && email.trim().length > 0 && !emailOk;

  const write = async () => {
    setStage("drafting");
    setFailed(false);
    try {
      setDraft(await fetchDraft(messages));
      setStage("form");
    } catch {
      // Drafting failed, so fall back to the question they already typed
      // rather than dropping them back to nothing.
      const lastAsked = [...messages].reverse().find((m) => m.role === "user");
      setDraft({
        subject: "Question about min.",
        body: lastAsked?.content ?? "",
      });
      setStage("form");
    }
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    // Re-checked here, not just on the button: submit also fires on Enter.
    if (!draft || busy || !emailOk) {
      setEmailTouched(true);
      return;
    }
    setBusy(true);
    try {
      const how = await sendContact(draft, email.trim(), honeypot);
      setStage(how === "sent" ? "sent" : "opened");
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  };

  if (stage === "sent" || stage === "opened") {
    return (
      <div className="mt-3 rounded-xl border border-moss/25 bg-moss-soft/70 px-3.5 py-3">
        <p className="text-[12.5px] leading-relaxed text-moss">
          {stage === "sent"
            ? "Sent. The team replies within a day, usually sooner."
            : `Your mail app should be open with it ready to go. Send it and the team picks it up from there.`}
        </p>
      </div>
    );
  }

  if (stage === "offer") {
    return (
      <div className="mt-3 rounded-xl border border-hair bg-surface px-3.5 py-3">
        <p className="text-[12.5px] leading-relaxed text-quiet">
          That one is worth a real answer. Want me to write it up for the team?
          They reply within a day.
        </p>
        <div className="mt-2.5 flex items-center gap-2">
          <button
            type="button"
            onClick={write}
            className="rounded-full bg-ink px-3.5 py-1.5 text-[12px] font-medium text-onink transition-colors hover:bg-ink/80"
          >
            Write it up
          </button>
          <button
            type="button"
            onClick={onDone}
            className="text-[11.5px] font-medium text-quiet transition-colors hover:text-ink/75"
          >
            No thanks
          </button>
        </div>
      </div>
    );
  }

  if (stage === "drafting") {
    return (
      <div className="mt-3 rounded-xl border border-hair bg-surface px-3.5 py-3" aria-busy="true">
        <p className="text-[12.5px] text-quiet">Writing it up…</p>
      </div>
    );
  }

  return (
    <form onSubmit={send} className="mt-3 rounded-xl border border-hair bg-surface px-3.5 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-quiet">
        To the team
      </p>
      <textarea
        value={draft?.body ?? ""}
        onChange={(e) => setDraft((d) => (d ? { ...d, body: e.target.value } : d))}
        rows={4}
        maxLength={2000}
        aria-label="Your message to the min. team"
        className="mt-1.5 w-full resize-none rounded-lg border border-hair bg-paper px-2.5 py-2 text-[12.5px] leading-relaxed text-ink/75 outline-none transition-colors focus:border-moss/25"
      />
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setEmailTouched(true)}
        placeholder="you@work.com"
        aria-label="Your email, so the team can reply"
        aria-invalid={showEmailError || undefined}
        aria-describedby={showEmailError ? "ask-min-email-error" : undefined}
        // The opposite of the composer above: this one genuinely IS an email
        // field, so autofill is a help rather than a nuisance and gets named
        // explicitly instead of left to guesswork.
        name="email"
        autoComplete="email"
        className={`mt-2 w-full rounded-lg border bg-surface px-2.5 py-2 text-[12.5px] text-ink outline-none transition-colors placeholder:text-quiet ${
          showEmailError
            ? "border-amber-300 focus:border-amber-400"
            : "border-hair focus:border-moss/25"
        }`}
      />
      {showEmailError && (
        <p id="ask-min-email-error" className="mt-1.5 text-[11.5px] text-amber-700">
          That does not look like an email address. The team needs somewhere to reply.
        </p>
      )}
      {/* Hidden from people, irresistible to form bots. Anything that fills it
          in gets a cheerful 200 and goes nowhere. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      {failed && (
        <p className="mt-2 text-[12px] text-amber-700">
          That did not go through. Try again, or email {CONTACT_ADDRESS} directly.
        </p>
      )}
      <div className="mt-2.5 flex items-center gap-2">
        <button
          type="submit"
          disabled={busy || !emailOk || !draft?.body.trim()}
          className="rounded-full bg-ink px-3.5 py-1.5 text-[12px] font-medium text-onink transition-colors hover:bg-ink/80 disabled:opacity-40"
        >
          {busy ? "Sending…" : "Send to the team"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="text-[11.5px] font-medium text-quiet transition-colors hover:text-ink/75"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function AskMin() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(loadHistory);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capped, setCapped] = useState(() => askedToday() >= DAILY_LIMIT);
  // Set when the Worker reports the model could not ground its answer.
  const [escalate, setEscalate] = useState(false);

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
    setEscalate(false);
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
          let payload: { text?: string; message?: string; escalate?: boolean } = {};
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
          } else if (event === "done") {
            // The Worker sets this when the model could not ground the answer.
            // A gap is the most valuable moment in the conversation: it is
            // someone with a real question and no answer, which is exactly who
            // should reach a person rather than leave.
            setEscalate(Boolean(payload.escalate));
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
    <div className="fixed bottom-5 right-4 z-50 w-[calc(100vw-2rem)] sm:bottom-6 sm:right-6 sm:w-[420px]">
      {open && (
        <div
          role="dialog"
          aria-label="Ask min. about min."
          className="modal-in mb-2.5 overflow-hidden rounded-[22px] border border-hair bg-surface shadow-[0_16px_60px_-16px_rgba(0,0,0,0.18)]"
        >
          {/* Header mirrors the capsule rail: same title shape, same blurb weight */}
          <div className="flex items-start justify-between gap-3 border-b border-hair/70 bg-paper px-5 pt-5 pb-4">
            <div className="min-w-0">
              <h4 className="font-display text-[15px] font-semibold text-ink">
                Ask about min.
              </h4>
              <p className="mt-1 text-[12.5px] leading-relaxed text-quiet">
                Answers come from what min. actually does. Features, pricing,
                or how to start.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="-mr-1.5 -mt-1 shrink-0 rounded-lg p-1.5 text-quiet transition-colors hover:bg-surface hover:text-ink/75"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="max-h-[min(58vh,420px)] overflow-y-auto bg-paper px-5 pb-5"
          >
            {restoredCount.current > 0 && (
              <p className="pt-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-quiet">
                From your last visit
              </p>
            )}

            {messages.length > 0 && (
              <div className="mt-2.5 space-y-2.5">
                {messages.map((m, i) => (
                  <div key={i}>
                    {restoredCount.current > 0 && i === restoredCount.current && (
                      <div className="mb-2.5 flex items-center gap-2 pt-1">
                        <span className="h-px flex-1 bg-hair/70" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-quiet">
                          Today
                        </span>
                        <span className="h-px flex-1 bg-hair/70" />
                      </div>
                    )}
                    {m.role === "user" ? (
                      <div className="ml-auto w-fit max-w-[92%] rounded-2xl rounded-br-sm bg-ink px-3.5 py-2 text-[12.5px] text-onink">
                        {m.content}
                      </div>
                    ) : m.content ? (
                      <div className="w-fit max-w-[96%] whitespace-pre-wrap rounded-2xl rounded-bl-sm border border-hair/70 bg-surface px-3.5 py-2 text-[12.5px] leading-relaxed text-ink/75">
                        {m.content}
                      </div>
                    ) : (
                      <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm border border-hair/70 bg-surface px-3.5 py-2.5">
                        {[0, 1, 2].map((d) => (
                          <span
                            key={d}
                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-hair"
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
                <p className="pt-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-quiet">
                  Try one
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {OPENERS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => ask(q)}
                      disabled={busy}
                      className="rounded-full border border-hair bg-surface px-3.5 py-2 text-left text-[12.5px] leading-snug text-quiet transition-colors hover:border-moss/40 hover:text-ink disabled:opacity-60"
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

            {escalate && !busy && !capped && (
              <HandOff messages={messages} onDone={() => setEscalate(false)} />
            )}

            {capped && (
              <p className="mt-2.5 text-[12.5px] leading-relaxed text-quiet">
                That is a lot of good questions, which usually means it is worth
                talking to someone who can go deeper than I can.{" "}
                <a
                  href="mailto:hello@getmin.ai?subject=Questions%20about%20min."
                  className="font-medium text-moss underline underline-offset-2 hover:text-moss"
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
                className="mt-4 text-[11.5px] font-medium text-quiet transition-colors hover:text-ink/75"
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
        // Chrome scores the whole form, not just the field, when deciding
        // whether to offer an autofill dropdown.
        autoComplete="off"
        // Sized up deliberately when closed: this is the one control on the page
        // we want people to reach for, and at the old size it read as a dismissable
        // widget. Open, it shrinks back to a composer, because by then the panel
        // above it is the thing holding attention.
        className={`flex cursor-text items-center rounded-full border border-hair bg-surface transition-all duration-200 focus-within:border-moss/25 ${
          open
            ? "gap-2 px-4 py-2.5 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.18)]"
            : "gap-2.5 px-5 py-3.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 hover:border-moss/25 hover:shadow-[0_16px_44px_-12px_rgba(16,185,129,0.28)]"
        }`}
      >
        {!open && (
          <Sparkles className="h-4 w-4 shrink-0 text-moss" strokeWidth={2} />
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
          placeholder={
            capped ? "Email hello@getmin.ai" : "Ask me or email hello@getmin.ai"
          }
          aria-label="Ask min. a question"
          // Chrome reads the placeholder, sees an address in it, and offers to
          // autofill an email over the question box. Its heuristics look at the
          // name, the type and the surrounding form as well as the placeholder,
          // so all of them have to say "this is not a contact field".
          // `autocomplete="off"` alone is routinely ignored here.
          type="text"
          name="ask-min-question"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          // Password managers run their own heuristics and ignore autocomplete.
          data-1p-ignore=""
          data-lpignore="true"
          data-bwignore=""
          data-form-type="other"
          className={`min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-quiet disabled:opacity-60 ${
            open ? "text-[13px]" : "text-[14px]"
          }`}
        />
        <button
          type="submit"
          disabled={busy || capped || !draft.trim()}
          aria-label="Send"
          className={`grid shrink-0 place-items-center rounded-full text-quiet transition-colors hover:bg-paper hover:text-ink/75 disabled:opacity-40 ${
            open ? "h-6 w-6" : "h-7 w-7"
          }`}
        >
          <Send className={open ? "h-3.5 w-3.5" : "h-4 w-4"} strokeWidth={2} />
        </button>
      </form>
    </div>
  );
}

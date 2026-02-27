import { useState, useEffect, useRef, useCallback } from "react";
import MiniMascot from "@/components/MiniMascot";

export interface PromptItem {
  text: string;
  label: string;
  response: {
    headline: string;
    rows: [string, string][];
  };
}

const FREIGHT_PROMPTS: PromptItem[] = [
  {
    text: "What did STG quote us on dry van Chicago to Atlanta?",
    label: "Rate lookup",
    response: {
      headline: "STG Logistics — $2,200",
      rows: [["Lane", "Chicago → Atlanta"], ["Equipment", "Dry Van (FTL)"], ["Quoted", "Tue Mar 5 · 11:42am"], ["Ref #", "STG-2024-8821"]],
    },
  },
  {
    text: "Send check-call requests to every carrier with a load en route today.",
    label: "Check calls",
    response: {
      headline: "✓ 8 check-call emails sent",
      rows: [["STG · Load #3371", "Sent · awaiting reply"], ["Werner · Load #3385", "Sent · awaiting reply"], ["XPO · Load #3392", "Sent · awaiting reply"], ["Schneider · Load #3401", "Sent · no update in 18hrs ⚠"]],
    },
  },
  {
    text: "Follow up with every carrier who hasn't responded to my rate request.",
    label: "Follow-ups",
    response: {
      headline: "✓ 3 follow-ups sent",
      rows: [["Schneider National", "Follow-up sent · silent 2 days"], ["Werner Enterprises", "Follow-up sent · silent 2 days"], ["J.B. Hunt", "Follow-up sent · silent 1 day"]],
    },
  },
  {
    text: "Text me if any carrier mentions a breakdown or delay overnight.",
    label: "Overnight alerts",
    response: {
      headline: "✓ Alert created",
      rows: [["Trigger", "Breakdown or delay mentioned"], ["Monitoring", "All incoming carrier emails"], ["Notify via", "SMS to (312) 555-0142"], ["Active", "Overnight · 7pm–7am"]],
    },
  },
  {
    text: "What's the pickup window on the Acme load?",
    label: "Load details",
    response: {
      headline: "Load #ACM-4412 — Confirmed",
      rows: [["Pickup window", "Thu Mar 7, 8am–12pm"], ["Origin", "Chicago, IL (Dock B)"], ["Carrier", "STG Logistics"], ["Status", "✓ Confirmed"]],
    },
  },
  {
    text: "Reach out to my west coast customers — we have a truck in LA ready tomorrow for loads to Texas.",
    label: "Customer outreach",
    response: {
      headline: "Drafting outreach to 9 customers",
      rows: [["Acme Industries", "LA — drafted & ready"], ["Pacific Freight Co", "Long Beach — drafted"], ["West Supply Inc.", "Anaheim — drafted"], ["Action", "Review & send all →"]],
    },
  },
  {
    text: "Any issues I should know about from overnight?",
    label: "Morning brief",
    response: {
      headline: "3 items need your attention",
      rows: [["XPO Logistics", "Delay on Dallas load (+4hrs)"], ["New quotes", "2 received — below market avg"], ["Follow-ups", "3 carriers haven't replied"]],
    },
  },
  {
    text: "Blast a rate request to my top 20 carriers for flatbed Seattle to LA, next Tuesday.",
    label: "Carrier blast",
    response: {
      headline: "✓ Sending to 20 carriers",
      rows: [["Lane", "Seattle → Los Angeles"], ["Equipment", "Flatbed · FTL"], ["Pickup", "Tue Mar 12"], ["Follow-up", "Auto in 2 days if no reply"]],
    },
  },
];

const BASE_SPEED = 34;
const PAUSE_AFTER_TYPING = 600;
const PAUSE_SHOWING_RESPONSE = 3800;

function naturalDelay(char: string, prev: string): number {
  if (char === " ") return BASE_SPEED + Math.random() * 30;
  if (".,?!;:".includes(char)) return BASE_SPEED + 50 + Math.random() * 60;
  if (prev === " " && /[A-Z]/.test(char)) return BASE_SPEED + 20;
  return BASE_SPEED + (Math.random() * 24 - 12);
}

const HeroChatDemo = ({
  prompts,
  mascotSeed = "hero-minion",
}: {
  prompts?: PromptItem[];
  mascotSeed?: string;
}) => {
  const items = prompts || FREIGHT_PROMPTS;
  const [promptIndex, setPromptIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showResponse, setShowResponse] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [rowsVisible, setRowsVisible] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null!);

  const current = items[promptIndex];
  const displayText = current.text.slice(0, charIndex);

  useEffect(() => {
    if (!isTyping) return;
    if (charIndex < current.text.length) {
      const delay = naturalDelay(
        current.text[charIndex],
        charIndex > 0 ? current.text[charIndex - 1] : ""
      );
      timeoutRef.current = setTimeout(() => setCharIndex((c) => c + 1), delay);
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        setShowResponse(true);
        setRowsVisible(0);
      }, PAUSE_AFTER_TYPING);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isTyping, charIndex, current.text]);

  useEffect(() => {
    if (!showResponse || rowsVisible >= current.response.rows.length) return;
    const t = setTimeout(
      () => setRowsVisible((r) => r + 1),
      rowsVisible === 0 ? 200 : 90
    );
    return () => clearTimeout(t);
  }, [showResponse, rowsVisible, current.response.rows.length]);

  useEffect(() => {
    if (!showResponse) return;
    timeoutRef.current = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        setFadingOut(false);
        setShowResponse(false);
        setCharIndex(0);
        setRowsVisible(0);
        setIsTyping(true);
        setPromptIndex((i) => (i + 1) % items.length);
      }, 500);
    }, PAUSE_SHOWING_RESPONSE);
    return () => clearTimeout(timeoutRef.current);
  }, [showResponse, items.length]);

  const jumpTo = useCallback((index: number) => {
    if (index === promptIndex && isTyping && charIndex > 0) return;
    clearTimeout(timeoutRef.current);
    setFadingOut(false);
    setShowResponse(false);
    setCharIndex(0);
    setRowsVisible(0);
    setIsTyping(true);
    setPromptIndex(index);
  }, [promptIndex, isTyping, charIndex]);

  return (
    <div style={{ maxWidth: 580, margin: "0 auto", display: "flex", flexDirection: "column" }}>
      {/* User prompt bubble */}
      <div
        style={{
          background: "#1E2630",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "18px 22px",
          marginBottom: 12,
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            width: 30, height: 30, borderRadius: "50%", background: "#00AB55",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "white", flexShrink: 0,
            letterSpacing: "-0.02em",
          }}
        >
          You
        </div>
        <p
          style={{
            color: "#F9FAFB", fontSize: 15, lineHeight: 1.55,
            margin: 0, paddingTop: 4, minHeight: 24,
          }}
        >
          {displayText}
          {isTyping && (
            <span
              style={{
                display: "inline-block", width: 2, height: "1em",
                background: "#00AB55", marginLeft: 2,
                verticalAlign: "text-bottom",
                animation: "cursor-blink 1s step-end infinite",
                borderRadius: 1,
              }}
            />
          )}
        </p>
      </div>

      {/* AI response bubble */}
      <div
        style={{
          background: "#1E2630",
          border: "1px solid rgba(0,171,85,0.18)",
          borderRadius: 16,
          padding: "18px 22px",
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          height: 240,
          overflow: "hidden",
          opacity: showResponse ? (fadingOut ? 0 : 1) : 0,
          transform: showResponse
            ? fadingOut ? "translateY(-6px)" : "translateY(0)"
            : "translateY(10px)",
          transition: fadingOut
            ? "opacity 0.45s ease, transform 0.45s ease"
            : "opacity 0.35s ease 0.08s, transform 0.35s ease 0.08s",
          pointerEvents: showResponse ? "auto" : "none",
          boxShadow: showResponse && !fadingOut
            ? "0 4px 32px rgba(0,171,85,0.08), 0 2px 12px rgba(0,0,0,0.25)"
            : "0 2px 12px rgba(0,0,0,0.15)",
        }}
      >
        <MiniMascot size={30} seed={mascotSeed} />
        <div style={{ flex: 1, overflow: "hidden" }}>
          <p
            style={{
              color: "#00AB55", fontSize: 13, fontWeight: 600,
              margin: "0 0 10px 0", paddingTop: 4,
              opacity: showResponse && !fadingOut ? 1 : 0,
              transition: "opacity 0.3s ease 0.12s",
            }}
          >
            {current.response.headline}
          </p>
          <div
            style={{
              background: "rgba(0,0,0,0.25)", borderRadius: 8,
              overflow: "hidden", border: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            {current.response.rows.map(([label, value], i) => (
              <div
                key={i}
                style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "8px 12px",
                  borderBottom: i < current.response.rows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  gap: 16,
                  opacity: i < rowsVisible ? 1 : 0,
                  transform: i < rowsVisible ? "translateY(0)" : "translateY(6px)",
                  transition: `opacity 0.22s ease ${i * 60}ms, transform 0.22s ease ${i * 60}ms`,
                }}
              >
                <span style={{ color: "#6B7280", fontSize: 13, flexShrink: 0 }}>{label}</span>
                <span style={{ color: "#E5E7EB", fontSize: 13, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clickable prompt pills */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, marginTop: 22 }}>
        {items.map((item, i) => {
          const isActive = i === promptIndex;
          return (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              style={{
                background: isActive ? "rgba(0,171,85,0.15)" : "rgba(255,255,255,0.04)",
                border: isActive ? "1px solid rgba(0,171,85,0.35)" : "1px solid rgba(255,255,255,0.07)",
                borderRadius: 99, padding: "4px 12px", fontSize: 12,
                color: isActive ? "#6EE7B7" : "#6B7280",
                cursor: "pointer", transition: "all 0.25s ease",
                fontWeight: isActive ? 500 : 400, outline: "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.color = "#9CA3AF";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.color = "#6B7280";
                }
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HeroChatDemo;

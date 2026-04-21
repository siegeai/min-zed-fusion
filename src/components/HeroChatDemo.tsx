import { useState, useEffect, useRef, useCallback } from "react";
import MiniMascot from "@/components/MiniMascot";

export interface PromptItem {
  text: string;
  label: string;
  response: {
    headline: string;
    rows: [string, string, string?][];
    highlightRow?: number;
    note?: string;
  };
}

const FREIGHT_PROMPTS: PromptItem[] = [
  {
    text: "Find me carriers that run Toronto to Miami FTL dry van.",
    label: "Capacity in your network",
    response: {
      headline: "9 carriers in your network run this lane",
      rows: [
        ["Carrier", "Last rate", "Last run"],
        ["STG Logistics", "$2,800", "14 days ago"],
        ["Werner Ent.", "$2,750", "6 days ago"],
        ["Schneider", "$2,900", "21 days ago"],
        ["Fadi Kanaan", "$2,640", "3 days ago"],
        ["J.B. Hunt", "$2,820", "11 days ago"],
      ],
      note: "Not a load board. Every one has quoted or moved freight for your team before.",
    },
  },
  {
    text: "Blast a rate request to all of them for a pickup Tuesday.",
    label: "Blast your network",
    response: {
      headline: "✓ Rate request sent to 9 carriers",
      rows: [["Lane", "Toronto → Miami"], ["Equipment", "Dry Van (FTL)"], ["Pickup", "Tue Mar 12"], ["Follow-up", "Auto in 2 days if no reply"]],
      note: "Quotes trickle back into one table as carriers respond.",
    },
  },
  {
    text: "Who's my most reliable Atlanta → Chicago dry van carrier in the last 90 days?",
    label: "Carrier ranking",
    response: {
      headline: "Werner Enterprises · 100% on-time",
      rows: [
        ["Carrier", "Loads", "On-time"],
        ["Werner Enterprises", "11", "100%"],
        ["Old Dominion", "8", "96%"],
        ["Schneider", "6", "83%"],
        ["XPO Logistics", "5", "80%"],
      ],
      note: "Ranked from every POD and check-call thread in your inbox.",
    },
  },
  {
    text: "Where's the Acme load right now? Is it going to make the delivery window?",
    label: "Live tracking",
    response: {
      headline: "Load #ACM-4412, I-40 near Amarillo, TX",
      rows: [["GPS source", "Samsara · updated 12 min ago"], ["Carrier ETA", "Thu 2:00pm"], ["Real ETA", "Thu 3:45pm (+1h45m)"], ["Weather", "Winter storm on I-40 near OKC"], ["Delivery window", "Thu 8am–5pm · will make it"]],
    },
  },
  {
    text: "Send a check-call to every carrier with a load in transit right now.",
    label: "Bulk check calls",
    response: {
      headline: "✓ Check-calls sent to 23 carriers",
      rows: [
        ["STG · Load #3371", "Sent · awaiting reply"],
        ["Werner · Load #3385", "Sent · awaiting reply"],
        ["XPO · Load #3392", "Sent · replied 2 min ago"],
        ["Schneider · Load #3401", "Sent · no update in 18hrs ⚠"],
        ["+ 19 more", "All sent in parallel"],
      ],
      note: "Replies stream back into one table. No more opening 23 tabs.",
    },
  },
  {
    text: "Flag any active load that hasn't had a check-in in the last 4 hours.",
    label: "Silent loads",
    response: {
      headline: "⚠ 3 loads silent 4+ hours · pinging carriers now",
      rows: [
        ["Load #DAL-3385", "STG · last ping 6h ago"],
        ["Load #MIA-3401", "XPO · last ping 5h ago"],
        ["Load #SEA-3412", "Werner · last ping 4h ago"],
        ["Action", "Check-in email sent to all 3"],
      ],
      note: "Silent loads surfaced before they become late loads.",
    },
  },
  {
    text: "Check in with every Acme load delivering in the next 48 hours.",
    label: "Bulk T&T",
    response: {
      headline: "✓ Track & trace sent to 6 carriers on Acme loads",
      rows: [
        ["Load #ACM-4412", "STG · delivers Thu 2pm"],
        ["Load #ACM-4418", "Werner · delivers Thu 4pm"],
        ["Load #ACM-4420", "XPO · delivers Fri 10am"],
        ["Load #ACM-4425", "Schneider · delivers Fri 3pm"],
        ["+ 2 more", "All sent"],
      ],
      note: "Responses collected per load. You'll see one summary by 3pm.",
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
    text: "Send a POD request to every carrier that delivered this week without one.",
    label: "POD chase",
    response: {
      headline: "✓ 6 POD requests sent",
      rows: [["STG · Load #3371", "Delivered Mon · no POD"], ["Werner · Load #3385", "Delivered Tue · no POD"], ["XPO · Load #3392", "Delivered Wed · no POD"], ["Auto follow-up", "24 hrs if still no POD"]],
    },
  },
  {
    text: "We have a truck in LA ready tomorrow. Which of my customers ship LA → Texas regularly?",
    label: "Reverse match",
    response: {
      headline: "4 customers with repeat LA → TX lanes",
      rows: [
        ["Customer", "Loads (90d)", "Avg rate"],
        ["Acme Industries", "7", "$2,420"],
        ["Pacific Freight", "5", "$2,380"],
        ["West Supply", "4", "$2,510"],
        ["Ridge Logistics", "3", "$2,290"],
      ],
      note: "Drafts ready. Send all 4 outreach emails at once?",
    },
  },
  {
    text: "Any issues I should know about from overnight?",
    label: "Morning brief",
    response: {
      headline: "3 items need your attention",
      rows: [["XPO Logistics", "Delay on Dallas load (+4hrs)"], ["New quotes", "2 received, below market avg"], ["Follow-ups", "3 carriers haven't replied"]],
    },
  },
];

const BASE_SPEED = 34;
const PAUSE_AFTER_TYPING = 600;
const PAUSE_SHOWING_RESPONSE = 4800;

function naturalDelay(char: string, prev: string): number {
  if (char === " ") return BASE_SPEED + Math.random() * 30;
  if (".,?!;:".includes(char)) return BASE_SPEED + 50 + Math.random() * 60;
  if (prev === " " && /[A-Z]/.test(char)) return BASE_SPEED + 20;
  return BASE_SPEED + (Math.random() * 24 - 12);
}

const HeroChatDemo = ({
  prompts,
  mascotSeed = "hero-min",
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
          minHeight: 240,
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
          {(() => {
            const { rows, highlightRow, note } = current.response;
            const isThreeCol = rows.some((r) => r[2] !== undefined);
            return (
              <>
                <div
                  style={{
                    background: "rgba(0,0,0,0.25)", borderRadius: 8,
                    overflow: "hidden", border: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  {rows.map(([col1, col2, col3], i) => {
                    const isHighlighted = highlightRow === i;
                    const isHeader = i === 0 && isThreeCol && col3 !== undefined && col1 !== "" && col2 !== "" && /^[A-Z]/.test(col1) && /^[A-Z]/.test(col2);
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: isHeader ? "5px 12px" : "7px 12px",
                          borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                          gap: 8,
                          background: isHighlighted
                            ? "rgba(0,171,85,0.08)"
                            : isHeader ? "rgba(255,255,255,0.02)" : "transparent",
                          opacity: i < rowsVisible ? 1 : 0,
                          transform: i < rowsVisible ? "translateY(0)" : "translateY(6px)",
                          transition: `opacity 0.22s ease ${i * 60}ms, transform 0.22s ease ${i * 60}ms`,
                        }}
                      >
                        <span style={{
                          color: isHeader ? "#4B5563" : isHighlighted ? "#E5E7EB" : "#6B7280",
                          fontSize: isHeader ? 11 : 13,
                          flexShrink: 0,
                          fontWeight: isHeader ? 500 : isHighlighted ? 500 : 400,
                          textTransform: isHeader ? "uppercase" : "none",
                          letterSpacing: isHeader ? "0.05em" : "normal",
                          flex: isThreeCol ? "0 0 38%" : undefined,
                          minWidth: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}>
                          {col1}
                        </span>
                        <span style={{
                          color: isHeader ? "#4B5563" : isHighlighted ? "#6EE7B7" : "#E5E7EB",
                          fontSize: isHeader ? 11 : 13,
                          fontWeight: isHeader ? 500 : isHighlighted ? 700 : 400,
                          textTransform: isHeader ? "uppercase" : "none",
                          letterSpacing: isHeader ? "0.05em" : "normal",
                          fontVariantNumeric: "tabular-nums",
                          flex: isThreeCol ? "0 0 28%" : undefined,
                          textAlign: isThreeCol ? "left" : "right",
                        }}>
                          {col2}
                        </span>
                        {isThreeCol && (
                          <span style={{
                            color: isHeader ? "#4B5563" : "#6B7280",
                            fontSize: isHeader ? 11 : 12,
                            fontWeight: isHeader ? 500 : 400,
                            textTransform: isHeader ? "uppercase" : "none",
                            letterSpacing: isHeader ? "0.05em" : "normal",
                            flex: "0 0 30%",
                            textAlign: "right",
                            whiteSpace: "nowrap",
                          }}>
                            {col3 ?? ""}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                {note && (
                  <p
                    style={{
                      color: "#6EE7B7",
                      fontSize: 11,
                      margin: "8px 0 0",
                      lineHeight: 1.5,
                      opacity: rowsVisible >= rows.length ? 1 : 0,
                      transition: "opacity 0.3s ease 0.2s",
                      paddingLeft: 2,
                    }}
                  >
                    ↳ {note}
                  </p>
                )}
              </>
            );
          })()}
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

import { useState, useEffect } from "react";
import FeaturePageLayout from "@/components/FeaturePageLayout";
import {
  SURFACE, GREEN, BORDER, TEXT, MUTED, DIM,
  ChatRow, DataTable, Section,
} from "@/components/LandingShared";

const ROTATE_WORDS = ["Rate Sheets.", "SOPs.", "Contracts.", "Carrier Packets.", "Everything."];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    // Stay visible for 2s, then fade out for 0.35s, switch word, fade in
    const timer = phase === "in"
      ? setTimeout(() => setPhase("out"), 2000)
      : setTimeout(() => {
          setIndex((i) => (i + 1) % ROTATE_WORDS.length);
          setPhase("in");
        }, 350);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <span
      style={{
        display: "inline-block",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        opacity: phase === "in" ? 1 : 0,
        transform: phase === "in" ? "translateY(0)" : "translateY(-8px)",
      }}
    >
      {ROTATE_WORDS[index]}
    </span>
  );
}

const FILE_TYPES = [
  { ext: "CSV", color: "#22c55e" },
  { ext: "Excel", color: "#16a34a" },
  { ext: "PDF", color: "#ef4444" },
  { ext: "TXT", color: "#a3a3a3" },
  { ext: "Word", color: "#3b82f6" },
  { ext: "JSON", color: "#eab308" },
];

const Files = () => (
  <FeaturePageLayout
    title="Files in Plain English"
    metaDescription="Upload CSVs, Excel spreadsheets, PDFs, or any file. Your team asks questions in plain English, no SQL, no formulas, no training required. Collaborate in group chats."
    canonicalPath="/features/files"
    eyebrow="Files in Plain English"
    headline={<>Upload <RotatingWord /><br /><span style={{ color: GREEN }}>Ask it anything.</span></>}
    subline="CSV, Excel, PDF, Word, text, you name it, min. reads it. No SQL. No formulas. No training. Just drag, drop, and ask."
    mascotSeed="feat-files"
  >
    <Section style={{ marginTop: 80, marginBottom: 80 }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>Your files, instantly queryable</h2>
          <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            Stop asking your "data person" to pull numbers from a spreadsheet. Stop learning pivot tables just to answer a simple question. Upload any file and min. reads every row, every page, every cell, then answers questions about it like a teammate who already read the whole thing.
          </p>
        </div>

        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 28, marginBottom: 48 }}>
          <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 20 }}>Supported formats</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {FILE_TYPES.map((f) => (
              <span
                key={f.ext}
                style={{
                  background: `${f.color}12`,
                  border: `1px solid ${f.color}30`,
                  color: f.color,
                  borderRadius: 8,
                  padding: "6px 16px",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
              >
                {f.ext}
              </span>
            ))}
            <span
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${BORDER}`,
                color: MUTED,
                borderRadius: 8,
                padding: "6px 16px",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              + more
            </span>
          </div>
        </div>

        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 32, letterSpacing: "-0.02em" }}>Ask like you'd ask a coworker</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Upload a spreadsheet, get instant answers</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.25)", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "8px 12px", marginBottom: 14 }}>
              <span style={{ color: "#22c55e", fontSize: 12, fontWeight: 600, background: "rgba(34,197,94,0.12)", borderRadius: 4, padding: "2px 6px" }}>CSV</span>
              <span style={{ color: MUTED, fontSize: 13 }}>q1_carrier_spend.csv</span>
              <span style={{ color: DIM, fontSize: 11, marginLeft: "auto" }}>2,400 rows</span>
            </div>
            <ChatRow role="user" style={{ marginBottom: 14 }}>
              <p style={{ color: TEXT, fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                Which carrier had the highest spend last quarter, and how does it compare to the quarter before?
              </p>
            </ChatRow>
            <ChatRow role="ai" seed="files-1">
              <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>Schneider National, $284K in Q1 (+18% vs Q4)</p>
              <DataTable
                hasHeader
                rows={[
                  ["Carrier", "Q1 spend", "Q4 spend", "Change"],
                  ["Schneider National", "$284,200", "$240,800", "+18%"],
                  ["Werner Enterprises", "$198,400", "$212,100", "−6%"],
                  ["J.B. Hunt", "$176,900", "$165,300", "+7%"],
                ]}
              />
            </ChatRow>
          </div>

          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Pull answers from PDFs without reading a single page</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.25)", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "8px 12px", marginBottom: 14 }}>
              <span style={{ color: "#ef4444", fontSize: 12, fontWeight: 600, background: "rgba(239,68,68,0.12)", borderRadius: 4, padding: "2px 6px" }}>PDF</span>
              <span style={{ color: MUTED, fontSize: 13 }}>carrier_contract_2025.pdf</span>
              <span style={{ color: DIM, fontSize: 11, marginLeft: "auto" }}>42 pages</span>
            </div>
            <ChatRow role="user" style={{ marginBottom: 14 }}>
              <p style={{ color: TEXT, fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                What's the fuel surcharge formula in this contract, and is there a cap?
              </p>
            </ChatRow>
            <ChatRow role="ai" seed="files-2">
              <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>Fuel surcharge: DOE index + 4.2% per mile, capped at $0.62/mile</p>
              <p style={{ color: MUTED, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
                Found on page 14, Section 8.3. The cap applies when the DOE National Average exceeds $4.50/gal. Reviewed annually.
              </p>
            </ChatRow>
          </div>

          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Compare data across multiple files</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.25)", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "8px 12px" }}>
                <span style={{ color: "#16a34a", fontSize: 12, fontWeight: 600, background: "rgba(22,163,74,0.12)", borderRadius: 4, padding: "2px 6px" }}>Excel</span>
                <span style={{ color: MUTED, fontSize: 13 }}>jan_invoices.xlsx</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.25)", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "8px 12px" }}>
                <span style={{ color: "#16a34a", fontSize: 12, fontWeight: 600, background: "rgba(22,163,74,0.12)", borderRadius: 4, padding: "2px 6px" }}>Excel</span>
                <span style={{ color: MUTED, fontSize: 13 }}>feb_invoices.xlsx</span>
              </div>
            </div>
            <ChatRow role="user" style={{ marginBottom: 14 }}>
              <p style={{ color: TEXT, fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                Which customers increased their order volume from January to February?
              </p>
            </ChatRow>
            <ChatRow role="ai" seed="files-3">
              <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>4 customers increased volume month-over-month</p>
              <DataTable
                hasHeader
                rows={[
                  ["Customer", "Jan orders", "Feb orders", "Change"],
                  ["Valley Parts Co", "48", "67", "+40%"],
                  ["Northside Mfg", "31", "44", "+42%"],
                  ["Midwest Supply", "22", "28", "+27%"],
                  ["Pacific Freight", "15", "19", "+27%"],
                ]}
              />
            </ChatRow>
          </div>
        </div>

        <div style={{ marginTop: 56, marginBottom: 48 }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>Group chats, your team's shared workspace</h2>
          <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, margin: "0 0 24px" }}>
            Upload a file into a group chat and everyone on the team can ask questions about it. No more emailing spreadsheets back and forth. No more "can you pull this number for me?" One shared space where anyone can get the answers they need, instantly.
          </p>

          <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.15)", borderRadius: 16, padding: 24 }}>
            <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
              Group chat, Operations team
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.25)", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "8px 12px", marginBottom: 16 }}>
              <span style={{ color: "#22c55e", fontSize: 12, fontWeight: 600, background: "rgba(34,197,94,0.12)", borderRadius: 4, padding: "2px 6px" }}>CSV</span>
              <span style={{ color: MUTED, fontSize: 13 }}>weekly_shipment_report.csv</span>
              <span style={{ color: DIM, fontSize: 11, marginLeft: "auto" }}>Shared by Sarah</span>
            </div>

            <ChatRow role="user" style={{ marginBottom: 10 }}>
              <p style={{ color: DIM, fontSize: 11, margin: "0 0 4px" }}>Sarah</p>
              <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>How many shipments were late this week?</p>
            </ChatRow>
            <ChatRow role="ai" seed="files-gc1" style={{ marginBottom: 10 }}>
              <p style={{ color: GREEN, fontSize: 13, fontWeight: 500, margin: 0 }}>12 shipments delivered late out of 340 total (3.5% late rate).</p>
            </ChatRow>
            <ChatRow role="user" style={{ marginBottom: 10 }}>
              <p style={{ color: DIM, fontSize: 11, margin: "0 0 4px" }}>Mike</p>
              <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Which lanes had the most delays?</p>
            </ChatRow>
            <ChatRow role="ai" seed="files-gc2">
              <DataTable
                hasHeader
                rows={[
                  ["Lane", "Late shipments", "Avg delay"],
                  ["Chicago → Atlanta", "4", "6.2 hrs"],
                  ["Dallas → Memphis", "3", "4.8 hrs"],
                  ["LA → Phoenix", "3", "3.1 hrs"],
                ]}
              />
            </ChatRow>
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <h3 style={{ color: TEXT, fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Why teams love it</h3>
          {[
            "Supports CSV, Excel, PDF, Word, text files, and more",
            "No SQL, no formulas, no special query language, just ask in plain English",
            "Cross-reference data across multiple uploaded files at once",
            "Group chats let your whole team ask questions about the same files",
            "Answers come back as clean tables, summaries, and numbers, not raw data",
            "Upload once, ask unlimited questions, min. remembers the file in your Collective Memory",
          ].map((point) => (
            <div key={point} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
              <span style={{ color: GREEN, flexShrink: 0, fontSize: 13 }}>✓</span>
              <span style={{ color: MUTED, fontSize: 14, lineHeight: 1.55 }}>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  </FeaturePageLayout>
);

export default Files;

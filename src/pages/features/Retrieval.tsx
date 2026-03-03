import FeaturePageLayout from "@/components/FeaturePageLayout";
import {
  SURFACE, GREEN, BORDER, TEXT, MUTED, DIM,
  ChatRow, DataTable, Section,
} from "@/components/LandingShared";

const Retrieval = () => (
  <FeaturePageLayout
    title="Perfect Recall"
    metaDescription="Ask a question, get an answer — not a list of emails. Your minion cross-references your entire email history and gives you structured answers in seconds."
    canonicalPath="/skills/recall"
    eyebrow="Perfect Recall"
    headline={<>Ask a question.<br /><span style={{ color: GREEN }}>Get an answer.</span></>}
    subline="Search gives you a list of emails. Your minion gives you the answer — synthesized from your entire email history, in seconds."
    mascotSeed="feat-retrieval"
  >
    <Section style={{ marginTop: 80, marginBottom: 80 }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>Search returns emails. Your minion returns answers.</h2>
          <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            When you search your inbox, you get a list of threads that match your keywords. Then you open them one by one, scan for the information you need, and piece together the answer yourself. Your minion skips all of that — it reads across every thread, cross-references the details, and gives you a structured answer directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ marginBottom: 48 }}>
          <div style={{ background: SURFACE, border: "1px solid rgba(239,68,68,0.12)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(239,68,68,0.04) 0%, transparent 40%)", pointerEvents: "none", borderRadius: 16 }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{ color: "#EF4444", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: 99, padding: "2px 10px", display: "inline-block", marginBottom: 16 }}>Search</span>
              <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "7px 12px", display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ color: DIM, fontSize: 13 }}>🔍</span>
                <span style={{ color: DIM, fontSize: 13 }}>STG logistics rate chicago...</span>
              </div>
              {[
                "Re: Rate Quote: FTL Dry Van",
                "FW: Lane pricing inquiry",
                "Re: Rate: Chi to ATL w/e",
                "Rate quote attached",
              ].map((subj, i) => (
                <div key={i} style={{ padding: "6px 10px", borderRadius: 6, marginBottom: 3, opacity: i > 2 ? 0.4 : 1, filter: i > 2 ? "blur(1.5px)" : "none" }}>
                  <span style={{ color: MUTED, fontSize: 12 }}>{subj}</span>
                </div>
              ))}
              <p style={{ color: "#EF4444", fontSize: 12, marginTop: 14, fontStyle: "italic", lineHeight: 1.6, opacity: 0.7 }}>
                4 results. Now open each one and look for the number.
              </p>
            </div>
          </div>

          <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.2)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,171,85,0.03) 0%, transparent 40%)", pointerEvents: "none", borderRadius: 16 }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{ color: GREEN, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "rgba(0,171,85,0.1)", border: "1px solid rgba(0,171,85,0.18)", borderRadius: 99, padding: "2px 10px", display: "inline-block", marginBottom: 16 }}>Ask</span>
              <ChatRow role="user" style={{ marginBottom: 14 }}>
                <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>What's our average rate with STG for Chicago lanes?</p>
              </ChatRow>
              <ChatRow role="ai" seed="ret-1">
                <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 6px" }}>$2,340 avg across 8 loads</p>
                <p style={{ color: MUTED, fontSize: 12, margin: 0 }}>Range: $2,100–$2,600 · Last booked: $2,200 (Mar 4)</p>
              </ChatRow>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 32, letterSpacing: "-0.02em" }}>What you can ask</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Cross-reference across threads</p>
            <ChatRow role="user" style={{ marginBottom: 14 }}>
              <p style={{ color: TEXT, fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                What's the full story on PO #8841 — customer emails, supplier replies, everything?
              </p>
            </ChatRow>
            <ChatRow role="ai" seed="ret-2">
              <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>PO #8841 — Acme Industrial</p>
              <DataTable
                rows={[
                  ["Status", "Partial — awaiting sub approval"],
                  ["Supplier", "Hartwell MFG · replied Mon"],
                  ["Waiting on", "Customer OK on SKU-2291 sub"],
                  ["Open since", "6 days"],
                ]}
              />
            </ChatRow>
          </div>

          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Aggregate across your history</p>
            <ChatRow role="user" style={{ marginBottom: 14 }}>
              <p style={{ color: TEXT, fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                How many price overrides did we approve last month, and for which customers?
              </p>
            </ChatRow>
            <ChatRow role="ai" seed="ret-3">
              <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>14 price overrides in February</p>
              <DataTable
                hasHeader
                rows={[
                  ["Customer", "Overrides", "Margin impact"],
                  ["Acme Industrial", "5", "$1,840"],
                  ["Valley Parts Co", "4", "$1,220"],
                  ["Northside Mfg", "3", "$740"],
                  ["Others", "2", "$410"],
                ]}
              />
            </ChatRow>
          </div>

          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Find commitments buried in threads</p>
            <ChatRow role="user" style={{ marginBottom: 14 }}>
              <p style={{ color: TEXT, fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                Did we ever promise Valley Parts a specific price on SKU-1140?
              </p>
            </ChatRow>
            <ChatRow role="ai" seed="ret-4">
              <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>Yes — 3 pricing commitments found</p>
              <DataTable
                hasHeader
                rows={[
                  ["Date", "Price", "Context"],
                  ["Jan 14", "$24.50/unit", "Email from Sarah · confirmed"],
                  ["Feb 3", "$24.50/unit", "Re-confirmed on reorder"],
                  ["Feb 28", "$22.80/unit", "Override approved by mgmt"],
                ]}
              />
            </ChatRow>
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <h3 style={{ color: TEXT, fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Why it's better than search</h3>
          {[
            "Search returns emails. Your minion returns the answer",
            "Cross-references multiple threads to build the full picture",
            "Aggregates data across your history — averages, counts, trends",
            "Finds commitments and context buried deep in long threads",
            "Answers in structured tables, not a wall of text",
            "Works in plain English — no keywords, no boolean operators",
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

export default Retrieval;

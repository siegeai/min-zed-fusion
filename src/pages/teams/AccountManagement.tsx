import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import HeroChatDemo from "@/components/HeroChatDemo";
import type { PromptItem } from "@/components/HeroChatDemo";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import {
  BG, SURFACE, GREEN, BORDER, TEXT, MUTED, DIM,
  ChatRow, DataTable, Section, Divider, SectionHeading,
  FinalCTA,
} from "@/components/LandingShared";

const ACCT_PROMPTS: PromptItem[] = [
  {
    text: "How's the Acme account looking? Any open issues I should know about?",
    label: "Account health",
    response: {
      headline: "Acme Industrial — 2 items need attention",
      rows: [["Open shipments", "3 in transit · 1 delayed (+4hrs)"], ["Pricing dispute", "PO #8841 · pending 6 days"], ["Last check-in", "4 days ago (you → ops@acme)"], ["Satisfaction signal", "Neutral — 2 complaints this month"]],
    },
  },
  {
    text: "Which accounts have had the most issues this quarter?",
    label: "At-risk accounts",
    response: {
      headline: "4 accounts with recurring exceptions",
      rows: [
        ["Account", "Issues", "Revenue"],
        ["Acme Industrial", "6 disputes", "$420K/yr"],
        ["Valley Parts Co", "4 delays", "$280K/yr"],
        ["Northside Mfg", "3 backorders", "$195K/yr"],
        ["Ridge Supply", "3 pricing overrides", "$160K/yr"],
      ],
      highlightRow: 1,
      note: "Acme has 2x the issue rate of your other top accounts",
    },
  },
  {
    text: "When was the last time we reached out to Valley Parts?",
    label: "Relationship pulse",
    response: {
      headline: "Valley Parts Co — relationship gap",
      rows: [["Last outbound", "18 days ago (Sarah → purchasing@)"], ["Their emails since", "3 — all unanswered"], ["Open issues", "1 backorder · 1 price dispute"], ["Risk", "High — declining response pattern"]],
    },
  },
  {
    text: "Give me a QBR summary for Pacific Foods: volume, on-time rate, cost trends, and open issues.",
    label: "QBR prep",
    response: {
      headline: "Pacific Foods — Q1 Performance",
      rows: [["Shipment volume", "28 loads (+12% vs Q4)"], ["On-time delivery", "89.3% (25/28)"], ["Avg cost/shipment", "$2,340 (–4% vs Q4)"], ["Open issues", "1 delayed shipment · 0 disputes"], ["Top carrier", "Old Dominion · 96% on-time"]],
    },
  },
  {
    text: "How much revenue is tied to accounts with unresolved escalations?",
    label: "Revenue at risk",
    response: {
      headline: "$1.06M across 4 accounts",
      rows: [["Acme Industrial", "$420K · pricing dispute (6 days)"], ["Valley Parts Co", "$280K · unanswered 18 days"], ["Northside Mfg", "$195K · backorder complaint"], ["Ridge Supply", "$160K · 3 pricing overrides this quarter"]],
    },
  },
  {
    text: "Every Friday, send me a digest: account health, escalations, stale threads, and wins.",
    label: "Weekly digest",
    response: {
      headline: "✓ Weekly digest scheduled",
      rows: [["Frequency", "Every Friday at 5:00pm"], ["Includes", "Account health, escalations, stale threads, wins"], ["Delivered to", "eric@company.com"], ["First report", "This Friday"]],
    },
  },
  {
    text: "Alert me if any customer mentions switching providers or expresses frustration.",
    label: "Churn signals",
    response: {
      headline: "✓ Alert created",
      rows: [["Trigger", "Switching, frustrated, competitor mention"], ["Monitoring", "All inbound customer emails"], ["Notify via", "SMS + email immediately"], ["Active", "24/7"]],
    },
  },
  {
    text: "Draft check-in emails for my top 5 accounts I haven't contacted in 2+ weeks.",
    label: "Proactive outreach",
    response: {
      headline: "✓ 5 check-in drafts ready",
      rows: [["Valley Parts Co", "Drafted · silent 18 days"], ["Ridge Supply", "Drafted · silent 16 days"], ["Midwest Steel", "Drafted · silent 15 days"], ["Beacon Group", "Drafted · silent 14 days"], ["Crestline Co", "Drafted · silent 12 days"]],
    },
  },
];

const maxW: React.CSSProperties = { maxWidth: 960, margin: "0 auto" };

const AccountManagement = () => (
  <>
    <Helmet>
      <title>min. for Account Management | Your account team's memory</title>
      <meta name="description" content="Every client relationship, issue history, and commitment — searchable and actionable by your whole account team." />
      <link rel="canonical" href="https://getmin.ai/teams/account-management" />
      <meta property="og:title" content="min. for Account Management | Your account team's memory" />
      <meta property="og:description" content="Every client relationship and issue history — searchable by your whole account team." />
    </Helmet>

    <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT, overflowX: "hidden" }}>
      <Header />
      <main style={{ paddingTop: 100 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

          <div className="hero-glow" style={{ paddingTop: 32, marginBottom: 80 }}>
            <div style={{ textAlign: "center", marginBottom: 56, position: "relative", zIndex: 1 }}>
              <p className="hero-stagger-1" style={{ color: GREEN, fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
                Your account team's memory
              </p>
              <h1 className="hero-stagger-2" style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", color: TEXT, margin: "0 0 20px 0" }}>
                Know every account.<br /><span style={{ color: GREEN }}>Miss nothing.</span>
              </h1>
              <p className="hero-stagger-3" style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)", color: MUTED, fontWeight: 400, marginBottom: 40, lineHeight: 1.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                Every client conversation, every issue history, every commitment your account team has ever made — instantly searchable, permanently remembered, and ready to act on.
              </p>
              <div className="hero-stagger-4" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="https://app.getmin.ai/">
                  <Button size="lg" className="cta-glow text-white font-normal text-base px-8" style={{ backgroundColor: GREEN, border: "none" }}>
                    Get early access <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a href="mailto:hello@getmin.ai?subject=Demo%20Request">
                  <Button size="lg" variant="outline" className="font-normal text-base px-8" style={{ borderColor: "rgba(255,255,255,0.15)", color: TEXT, background: "transparent" }}>
                    Book a demo
                  </Button>
                </a>
              </div>
            </div>
            <div className="hero-stagger-5" style={{ position: "relative", zIndex: 1 }}>
              <HeroChatDemo prompts={ACCT_PROMPTS} mascotSeed="acct-demo" />
            </div>
          </div>

          <Divider />

          {/* ── Section 2: Account Health ── */}
          <Section style={{ marginTop: 80, marginBottom: 80 }}>
            <div style={maxW}>
              <SectionHeading
                eyebrow="Account health at a glance"
                headline={<>Instant context on any account.<br /><span style={{ color: GREEN }}>No digging required.</span></>}
                sub="Open issues, recent escalations, shipment status, last contact — everything about the account, pulled from your email history, in one answer."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                  <ChatRow role="user" style={{ marginBottom: 14 }}>
                    <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>How's the Acme account? Any issues I need to know about before our call?</p>
                  </ChatRow>
                  <ChatRow role="ai" seed="acct-health">
                    <DataTable rows={[
                      ["Open shipments", "3 in transit · 1 delayed (+4hrs)"],
                      ["Pricing dispute", "PO #8841 · open 6 days"],
                      ["Last check-in", "4 days ago (you → ops@acme)"],
                      ["On-time rate (Q1)", "91% (32/35 shipments)"],
                      ["Revenue YTD", "$420K across 35 shipments"],
                    ]} />
                  </ChatRow>
                </div>

                <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.18)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,171,85,0.025) 0%, transparent 50%)", pointerEvents: "none", borderRadius: 16 }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, paddingBottom: 14, borderBottom: `1px solid ${BORDER}` }}>
                      <div>
                        <p style={{ color: TEXT, fontSize: 14, fontWeight: 600, margin: 0 }}>Weekly Account Digest</p>
                        <p style={{ color: DIM, fontSize: 12, margin: 0 }}>Friday · 5:00pm</p>
                      </div>
                      <span style={{ background: "rgba(0,171,85,0.1)", color: GREEN, fontSize: 11, borderRadius: 99, padding: "3px 10px", fontWeight: 500 }}>Automated</span>
                    </div>
                    {[
                      { icon: "✅", title: "Pacific Foods: on-time rate improved to 93%", kind: "success" as const },
                      { icon: "⚠️", title: "Valley Parts: no outreach in 18 days", kind: "warn" as const },
                      { icon: "🏆", title: "Midwest Steel renewed — $165K annual", kind: "success" as const },
                      { icon: "⚠️", title: "Acme pricing dispute still open (6 days)", kind: "warn" as const },
                      { icon: "📋", title: "3 QBRs due this month — prep available", kind: "default" as const },
                    ].map((item, i) => (
                      <div key={i} style={{ padding: "10px 12px", borderRadius: 8, marginBottom: 8, background: item.kind === "success" ? "rgba(0,171,85,0.06)" : item.kind === "warn" ? "rgba(234,179,8,0.05)" : "rgba(255,255,255,0.02)", border: item.kind === "success" ? "1px solid rgba(0,171,85,0.12)" : item.kind === "warn" ? "1px solid rgba(234,179,8,0.12)" : "1px solid transparent" }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
                          <p style={{ color: item.kind === "success" ? "#6EE7B7" : item.kind === "warn" ? "#FCD34D" : TEXT, fontSize: 13, fontWeight: 500, margin: 0 }}>{item.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Divider />

          {/* ── Section 3: Relationship Intelligence ── */}
          <Section style={{ marginTop: 80, marginBottom: 80 }}>
            <div style={maxW}>
              <SectionHeading
                eyebrow="Relationship intelligence"
                headline={<>Know who's going cold<br /><span style={{ color: GREEN }}>before they churn.</span></>}
                sub="Your minion tracks every thread across every account — surfacing stale relationships, unanswered emails, and churn signals before they become a problem."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                    <ChatRow role="user" style={{ marginBottom: 14 }}>
                      <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>When was the last time we reached out to Valley Parts?</p>
                    </ChatRow>
                    <ChatRow role="ai" seed="acct-stale">
                      <p style={{ color: "#EF4444", fontSize: 12, fontWeight: 600, marginBottom: 10 }}>Relationship gap detected</p>
                      <DataTable rows={[
                        ["Last outbound", "18 days ago (Sarah → purchasing@)"],
                        ["Their emails since", "3 — all unanswered"],
                        ["Open issues", "1 backorder · 1 pricing dispute"],
                        ["Risk level", "High — declining response pattern"],
                      ]} />
                    </ChatRow>
                  </div>

                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                    <ChatRow role="user" style={{ marginBottom: 14 }}>
                      <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Alert me if any customer mentions switching providers or a competitor.</p>
                    </ChatRow>
                    <ChatRow role="ai" seed="acct-churn-alert">
                      <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500 }}>
                        Alert set. I'll text you the moment any customer mentions switching, a competitor, or expresses frustration.
                      </p>
                    </ChatRow>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                    <ChatRow role="user" style={{ marginBottom: 14 }}>
                      <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>How much revenue is tied to accounts with unresolved escalations?</p>
                    </ChatRow>
                    <ChatRow role="ai" seed="acct-risk-rev">
                      <p style={{ color: "#EF4444", fontSize: 12, fontWeight: 600, marginBottom: 10 }}>$1.06M at risk across 4 accounts</p>
                      <DataTable rows={[
                        ["Acme Industrial", "$420K · pricing dispute (6d)"],
                        ["Valley Parts Co", "$280K · unanswered 18d"],
                        ["Northside Mfg", "$195K · backorder complaint"],
                        ["Ridge Supply", "$160K · 3 price overrides"],
                      ]} />
                    </ChatRow>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 4 }}>
                    {[
                      "Surfaces accounts going cold before they churn",
                      "Detects frustration, competitor mentions, and switching intent",
                      "Tracks every thread — you never miss an unanswered email",
                    ].map((point) => (
                      <div key={point} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: GREEN, flexShrink: 0, fontSize: 13 }}>✓</span>
                        <span style={{ color: MUTED, fontSize: 13, lineHeight: 1.5 }}>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Divider />

          {/* ── Section 4: QBR-Ready Reporting ── */}
          <Section style={{ marginTop: 80, marginBottom: 80 }}>
            <div style={maxW}>
              <SectionHeading
                eyebrow="QBR-ready reporting"
                headline={<>Account performance reports<br /><span style={{ color: GREEN }}>in one sentence.</span></>}
                sub="On-time rates, cost trends, carrier performance, issue history. Your minion pulls the numbers from your email history instantly — no spreadsheet assembly required."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.18)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,171,85,0.025) 0%, transparent 50%)", pointerEvents: "none", borderRadius: 16 }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, paddingBottom: 14, borderBottom: `1px solid ${BORDER}` }}>
                      <div>
                        <p style={{ color: TEXT, fontSize: 14, fontWeight: 600, margin: 0 }}>Pacific Foods — Q1 QBR</p>
                        <p style={{ color: DIM, fontSize: 12, margin: 0 }}>Generated in 3 seconds</p>
                      </div>
                      <span style={{ background: "rgba(0,171,85,0.1)", color: GREEN, fontSize: 11, borderRadius: 99, padding: "3px 10px", fontWeight: 500 }}>QBR</span>
                    </div>

                    {[
                      { label: "Shipment volume", value: "28 loads", sub: "+12% vs Q4" },
                      { label: "On-time delivery", value: "89.3%", sub: "25/28 on time" },
                      { label: "Avg cost/shipment", value: "$2,340", sub: "–4% vs Q4" },
                      { label: "Top carrier", value: "Old Dominion", sub: "96% on-time · $2,180 avg" },
                      { label: "Issues this quarter", value: "2", sub: "1 delay · 1 claim (resolved)" },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "12px 0", borderBottom: i < 4 ? `1px solid ${BORDER}` : "none" }}>
                        <div>
                          <p style={{ color: MUTED, fontSize: 12, margin: "0 0 2px" }}>{item.label}</p>
                          <p style={{ color: DIM, fontSize: 11, margin: 0 }}>{item.sub}</p>
                        </div>
                        <span style={{ color: TEXT, fontSize: 16, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.12)", borderRadius: 16, padding: 24 }}>
                    <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                        Account-level performance pulled from your actual email history — shipment counts, on-time rates, cost trends, carrier rankings, issue history. Ask for any account, any period. QBR prep that used to take hours now takes one question.
                    </p>
                  </div>

                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                    <ChatRow role="user" style={{ marginBottom: 14 }}>
                      <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Compare Acme's Q1 vs Q4 — volume, on-time, and cost per shipment.</p>
                    </ChatRow>
                    <ChatRow role="ai" seed="acct-compare">
                      <DataTable rows={[
                        ["Shipment volume", "35 vs 28 (+25%)"],
                        ["On-time rate", "91% vs 87% (+4 pts)"],
                        ["Avg cost/shipment", "$2,280 vs $2,410 (–5%)"],
                        ["Issues", "2 vs 5 (–60%)"],
                      ]} />
                    </ChatRow>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 4 }}>
                    {[
                      "On-time rates, cost trends, carrier rankings per account",
                      "Quarter-over-quarter comparisons in one sentence",
                      "QBR-ready data pulled from email, not a dashboard",
                    ].map((point) => (
                      <div key={point} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: GREEN, flexShrink: 0, fontSize: 13 }}>✓</span>
                        <span style={{ color: MUTED, fontSize: 13, lineHeight: 1.5 }}>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Divider />

          <Section style={{ marginTop: 80, marginBottom: 80, maxWidth: 720, margin: "80px auto" }}>
            <FAQ />
          </Section>

          <FinalCTA
            headline={<>Your accounts deserve continuity.<br /><span style={{ color: GREEN }}>min. makes it permanent.</span></>}
            sub="Every client relationship, issue history, and commitment — permanently remembered."
          />
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default AccountManagement;

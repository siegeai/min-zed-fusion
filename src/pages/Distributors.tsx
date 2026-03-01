import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import HeroChatDemo from "@/components/HeroChatDemo";
import type { PromptItem } from "@/components/HeroChatDemo";
import MiniMascot from "@/components/MiniMascot";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import {
  BG, SURFACE, GREEN, BORDER, TEXT, MUTED, DIM,
  ChatRow, DataTable, Section, Divider, SectionHeading,
  FinalCTA,
} from "@/components/LandingShared";

const DIST_PROMPTS: PromptItem[] = [
  {
    text: "What's the full story on PO #8841 — email trail, supplier status, everything.",
    label: "Order context",
    response: {
      headline: "PO #8841 — Acme Industrial Supply",
      rows: [["Customer", "Acme Industrial"], ["Status", "Partial — awaiting sub approval"], ["Supplier", "Hartwell MFG · replied Mon"], ["Waiting on", "Customer OK for SKU-2291 sub"], ["Open since", "6 days"]],
    },
  },
  {
    text: "Which orders are waiting on a supplier response right now?",
    label: "Stalled orders",
    response: {
      headline: "8 orders waiting on suppliers",
      rows: [
        ["Order", "Supplier", "Waiting"],
        ["PO #8841", "Hartwell MFG", "6 days"],
        ["PO #8857", "Central Dist.", "4 days"],
        ["PO #8863", "Apex Supply", "3 days"],
        ["PO #8871", "Hartwell MFG", "1 day"],
      ],
      highlightRow: 1,
      note: "PO #8841 is most urgent — customer has been following up",
    },
  },
  {
    text: "Follow up with every supplier who hasn't responded to our backorder inquiry this week.",
    label: "Supplier follow-ups",
    response: {
      headline: "✓ 7 follow-ups sent",
      rows: [["Hartwell MFG", "Follow-up sent · silent 6 days"], ["Central Dist.", "Follow-up sent · silent 4 days"], ["Apex Supply Co", "Follow-up sent · silent 3 days"], ["Midwest Parts", "Follow-up sent · silent 2 days"]],
    },
  },
  {
    text: "Alert me if any customer mentions a pricing dispute or requests an expedite.",
    label: "Exception alerts",
    response: {
      headline: "✓ Alert created",
      rows: [["Trigger", "Pricing dispute or expedite request"], ["Monitoring", "All inbound customer emails"], ["Notify via", "SMS to (312) 555-0142"], ["Active", "24/7"]],
    },
  },
  {
    text: "How many price overrides did we approve last month, and for which customers?",
    label: "Margin leakage",
    response: {
      headline: "14 price overrides in February",
      rows: [["Acme Industrial", "5 overrides · $1,840 margin impact"], ["Valley Parts Co", "4 overrides · $1,220 margin impact"], ["Northside Mfg", "3 overrides · $740 margin impact"], ["Others", "2 overrides · $410 margin impact"]],
    },
  },
  {
    text: "Compare the quotes we received from suppliers for SKU-4490.",
    label: "Supplier quotes",
    response: {
      headline: "4 quotes for SKU-4490",
      rows: [
        ["Supplier", "Unit price", "Lead time"],
        ["Central Dist.", "$18.40", "3 days"],
        ["Hartwell MFG", "$19.10", "2 days"],
        ["Apex Supply", "$21.50", "5 days"],
        ["Midwest Parts", "$22.80", "4 days"],
      ],
      highlightRow: 1,
      note: "Central is $0.70 below your avg unit cost on this SKU",
    },
  },
  {
    text: "Give me a morning briefing: open exceptions, stalled orders, and anything urgent.",
    label: "Morning brief",
    response: {
      headline: "5 items need your attention",
      rows: [["Stalled on suppliers", "8 orders · oldest 6 days"], ["Customer expedites", "2 new requests overnight"], ["Pending sub approvals", "3 customers haven't replied"], ["Price approvals needed", "2 orders awaiting sign-off"]],
    },
  },
  {
    text: "Which customers have the most order revisions this quarter?",
    label: "Revision tracking",
    response: {
      headline: "Q1 order revisions by customer",
      rows: [["Acme Industrial", "22 revisions · 18 orders"], ["Valley Parts Co", "17 revisions · 14 orders"], ["Northside Mfg", "11 revisions · 9 orders"], ["Ridge Supply", "6 revisions · 12 orders"]],
    },
  },
];

const maxW: React.CSSProperties = { maxWidth: 960, margin: "0 auto" };

const Distributors = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string })?.scrollTo;
    if (scrollTo) {
      const element = document.getElementById(scrollTo);
      if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
      navigate(".", { replace: true, state: {} });
    }
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
      }, 100);
    }
  }, [location, navigate]);

  return (
    <>
      <Helmet>
        <title>min. for Distributors | Order desk clarity without the chaos</title>
        <meta name="description" content="AI for wholesale distributors and order desk managers. Surface stalled orders, track exceptions, follow up with suppliers, and get morning briefings in plain English." />
        <meta name="keywords" content="wholesale distribution, order desk, order management, supplier follow-ups, backorder tracking, customer service, ERP, distributors" />
        <link rel="canonical" href="https://getmin.ai/distributors" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getmin.ai/distributors" />
        <meta property="og:title" content="min. for Distributors | Order desk clarity without the chaos" />
        <meta property="og:description" content="Stalled orders, supplier follow-ups, exception tracking. Ask in plain English, get real answers." />
      </Helmet>

      <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT, overflowX: "hidden" }}>
        <Header />

        <main style={{ paddingTop: 100 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

            {/* ── Hero ── */}
            <div className="hero-glow" style={{ paddingTop: 32, marginBottom: 80 }}>
              <div style={{ textAlign: "center", marginBottom: 56, position: "relative", zIndex: 1 }}>
                <p className="hero-stagger-1" style={{ color: GREEN, fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
                  For high-volume wholesale distributors
                </p>
                <h1
                  className="hero-stagger-2"
                  style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", color: TEXT, margin: "0 0 20px 0" }}
                >
                  Stop digging through<br />
                  <span style={{ color: GREEN }}>order threads.</span>
                </h1>
                <p className="hero-stagger-3" style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)", color: MUTED, fontWeight: 400, marginBottom: 40, lineHeight: 1.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                  Your minion <MiniMascot size={28} seed="dist-hero" /> has already learned your customers, your suppliers, your pricing history. Just ask.
                </p>
                <div className="hero-stagger-4">
                  <a href="https://app.getmin.ai/">
                    <Button size="lg" className="cta-glow text-white font-normal text-base px-8" style={{ backgroundColor: GREEN, border: "none" }}>
                      Try for free
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>

              <div className="hero-stagger-5" style={{ position: "relative", zIndex: 1 }}>
                <HeroChatDemo prompts={DIST_PROMPTS} mascotSeed="dist-demo" />
              </div>
            </div>

            <Divider />

            {/* ── Section 2: The Order Context Problem ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }} id="features">
              <div style={maxW}>
                <SectionHeading
                  eyebrow="The thread dig"
                  headline={<>To understand one order,<br />you open ten threads.</>}
                  sub="Customer email. Supplier reply. Internal forward. ERP note. Your minion holds it all together."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Before */}
                  <div style={{ background: SURFACE, border: "1px solid rgba(239,68,68,0.12)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(239,68,68,0.04) 0%, transparent 40%)", pointerEvents: "none", borderRadius: 16 }} />
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <span style={{ color: "#EF4444", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: 99, padding: "2px 10px", display: "inline-block", marginBottom: 16 }}>Before</span>

                      <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "7px 12px", display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <span style={{ color: DIM, fontSize: 13 }}>🔍</span>
                        <span style={{ color: DIM, fontSize: 13 }}>PO 8841 acme...</span>
                      </div>

                      {[
                        { from: "purchasing@acmeindustrial.com", subj: "Re: PO #8841 — still waiting", time: "Thu 2:18pm" },
                        { from: "sales@hartwellmfg.com", subj: "Re: Backorder — SKU-2291", time: "Mon 11:30am" },
                        { from: "janet@internal.com", subj: "FW: Acme needs update on 8841", time: "Wed 9:02am" },
                        { from: "purchasing@acmeindustrial.com", subj: "PO #8841 — original order", time: "Mar 1 4:45pm" },
                        { from: "orders@hartwellmfg.com", subj: "Order confirmation #HW-9921", time: "Mar 2 8:17am" },
                      ].map((row, i) => (
                        <div key={i} style={{ padding: "8px 10px", borderRadius: 6, marginBottom: 3, background: i === 0 ? "rgba(234,179,8,0.05)" : "transparent", border: i === 0 ? "1px solid rgba(234,179,8,0.1)" : "1px solid transparent", filter: i > 2 ? `blur(${i > 3 ? 2.5 : 1.5}px)` : "none", opacity: i > 3 ? 0.3 : 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                            <span style={{ color: i < 2 ? TEXT : MUTED, fontSize: 12, fontWeight: i < 2 ? 600 : 400 }}>{row.from}</span>
                            <span style={{ color: DIM, fontSize: 11 }}>{row.time}</span>
                          </div>
                          <span style={{ color: MUTED, fontSize: 12 }}>{row.subj}</span>
                        </div>
                      ))}
                      <p style={{ color: "#EF4444", fontSize: 12, marginTop: 16, fontStyle: "italic", lineHeight: 1.6, opacity: 0.7 }}>
                        Which thread has the supplier's latest ETA? Did Janet get a response? What did we tell the customer?
                      </p>
                    </div>
                  </div>

                  {/* After */}
                  <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.2)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,171,85,0.03) 0%, transparent 40%)", pointerEvents: "none", borderRadius: 16 }} />
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <span style={{ color: GREEN, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "rgba(0,171,85,0.1)", border: "1px solid rgba(0,171,85,0.18)", borderRadius: 99, padding: "2px 10px", display: "inline-block", marginBottom: 16 }}>After</span>

                      <ChatRow role="user" style={{ marginBottom: 16 }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
                          What's the full story on PO #8841?
                        </p>
                      </ChatRow>

                      <ChatRow role="ai" seed="dist-order">
                        <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>
                          PO #8841 — Acme Industrial Supply
                        </p>
                        <DataTable
                          hasHeader={false}
                          rows={[
                            ["Status", "Partial — awaiting sub approval"],
                            ["Supplier", "Hartwell MFG · replied Mon"],
                            ["Waiting on", "Customer OK on SKU-2291 sub"],
                            ["Customer", "Following up since Wed"],
                            ["Open since", "6 days"],
                          ]}
                        />
                      </ChatRow>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── Section 3: Perfect Recall ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Perfect Recall"
                  headline={<>Learns every commitment,<br />every pricing agreement.<br /><span style={{ color: GREEN }}>All from your inbox.</span></>}
                  sub="No setup. No training. Connect your inbox and your minion starts learning your operation — your customers' pricing history, your suppliers' lead times, your recurring exceptions. Correct it once, it never makes the same mistake twice. But it figures out most of it on its own."
                />

                <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-5" style={{ marginBottom: 48 }}>
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 22 }}>
                    <p style={{ color: DIM, fontSize: 11, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>Incoming email</p>
                    <p style={{ color: MUTED, fontSize: 12, fontWeight: 600, marginBottom: 4 }}>From: sales@hartwellmfg.com</p>
                    <p style={{ color: MUTED, fontSize: 12, marginBottom: 14 }}>Subject: Re: Backorder Notice — SKU-2291</p>
                    <p style={{ color: TEXT, fontSize: 13, lineHeight: 1.75 }}>
                      Hi, updating you on{" "}
                      <span style={{ background: "rgba(0,171,85,0.18)", borderRadius: 3, padding: "1px 5px", color: "#6EE7B7" }}>PO #8841</span>.{" "}
                      SKU-2291 is on backorder until{" "}
                      <span style={{ background: "rgba(0,171,85,0.18)", borderRadius: 3, padding: "1px 5px", color: "#6EE7B7" }}>March 22</span>.{" "}
                      We have{" "}
                      <span style={{ background: "rgba(0,171,85,0.18)", borderRadius: 3, padding: "1px 5px", color: "#6EE7B7" }}>SKU-2298 as a substitute</span>{" "}
                      available immediately at{" "}
                      <span style={{ background: "rgba(0,171,85,0.18)", borderRadius: 3, padding: "1px 5px", color: "#6EE7B7" }}>same price</span>.
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(0,171,85,0.1)", border: "1px solid rgba(0,171,85,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: GREEN, fontSize: 16 }}>→</div>
                    <span style={{ color: DIM, fontSize: 11 }}>auto</span>
                  </div>

                  <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.18)", borderRadius: 14, padding: 22 }}>
                    <p style={{ color: GREEN, fontSize: 11, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Learned from your inbox</p>
                    {[
                      ["Order", "PO #8841"],
                      ["SKU affected", "SKU-2291"],
                      ["Exception type", "Backorder"],
                      ["Backorder ETA", "March 22"],
                      ["Sub offered", "SKU-2298 · same price"],
                      ["Action needed", "Customer approval"],
                    ].map(([label, val]) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", gap: 12 }}>
                        <span style={{ color: DIM, fontSize: 12 }}>{label}</span>
                        <span style={{ color: TEXT, fontSize: 12, fontWeight: 500 }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ marginBottom: 48 }}>
                  {[
                    { stat: "30 sec", label: "to connect Gmail or Outlook" },
                    { stat: "Auto", label: "learns PO details, ETAs, pricing, and exceptions" },
                    { stat: "All", label: "inboxes — orders@, sales@, purchasing@" },
                    { stat: "Gets", label: "smarter about your customers and suppliers daily" },
                  ].map(({ stat, label }) => (
                    <div key={stat} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "20px 18px" }}>
                      <p style={{ color: GREEN, fontSize: "1.5rem", fontWeight: 700, margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>{stat}</p>
                      <p style={{ color: MUTED, fontSize: 13, margin: 0, lineHeight: 1.45 }}>{label}</p>
                    </div>
                  ))}
                </div>

                <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                  <ChatRow role="user" style={{ marginBottom: 16 }}>
                    <p style={{ color: TEXT, fontSize: 14, margin: 0 }}>Did we ever commit to a specific price for Valley Parts on SKU-1140?</p>
                  </ChatRow>
                  <ChatRow role="ai" seed="dist-commit">
                    <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>Yes — 3 pricing commitments found for Valley Parts, SKU-1140</p>
                    <DataTable
                      hasHeader
                      rows={[
                        ["Date", "Committed price", "Context"],
                        ["Jan 14", "$24.50/unit", "Email from Sarah · confirmed"],
                        ["Feb 3", "$24.50/unit", "Re-confirmed on reorder"],
                        ["Feb 28", "$22.80/unit", "Price override approved by mgmt"],
                      ]}
                    />
                  </ChatRow>
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── Section 4: Exception Surfacing ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Exception visibility"
                  headline={<>See every stalled order<br /><span style={{ color: GREEN }}>before it becomes a problem.</span></>}
                  sub="Backorders, substitutions, freight disputes, expedites — your minion tracks every exception so nothing gets buried."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                    <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 20 }}>
                      Open exceptions — today
                    </p>

                    {[
                      { order: "PO #8841", customer: "Acme Industrial", type: "Sub approval", age: "6 days", urgent: true },
                      { order: "PO #8857", customer: "Valley Parts", type: "Backorder ETA", age: "4 days", urgent: false },
                      { order: "PO #8863", customer: "Northside Mfg", type: "Freight dispute", age: "3 days", urgent: false },
                      { order: "PO #8871", customer: "Ridge Supply", type: "Price override", age: "1 day", urgent: false },
                    ].map((ex, i) => (
                      <div key={i} style={{ background: ex.urgent ? "rgba(234,179,8,0.05)" : "rgba(255,255,255,0.02)", border: ex.urgent ? "1px solid rgba(234,179,8,0.15)" : `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                          <span style={{ color: TEXT, fontSize: 13, fontWeight: 500 }}>{ex.order} — {ex.customer}</span>
                          <span style={{ color: ex.urgent ? "#FCD34D" : DIM, fontSize: 11, fontWeight: ex.urgent ? 600 : 400 }}>{ex.age}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: MUTED, fontSize: 12 }}>{ex.type}</span>
                          {ex.urgent && <span style={{ color: "#FCD34D", fontSize: 11, fontWeight: 500 }}>⚠ Needs attention</span>}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.12)", borderRadius: 16, padding: 24 }}>
                      <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                        Your minion reads every backorder notice, substitution request, and freight question as it arrives — and surfaces the ones that have been sitting too long, so you're never surprised by an angry customer call.
                      </p>
                    </div>

                    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                      <ChatRow role="user" style={{ marginBottom: 14 }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Which orders are waiting on customer approval for a substitution?</p>
                      </ChatRow>
                      <ChatRow role="ai" seed="dist-subs">
                        <p style={{ color: GREEN, fontSize: 13, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                          3 orders awaiting substitution approval. PO #8841 (6 days), PO #8879 (2 days), PO #8883 (1 day). Want me to follow up with all three customers?
                        </p>
                      </ChatRow>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 4 }}>
                      {[
                        "Tracks every exception type: backorders, subs, disputes, expedites",
                        "Surfaces what's stalled and who's waiting on whom",
                        "Prioritizes by age so you work the oldest problems first",
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

            {/* ── Section 5: Auto Follow-Ups ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Automated follow-ups"
                  headline={<>Stop chasing suppliers<br /><span style={{ color: GREEN }}>manually.</span></>}
                  sub="One prompt follows up on every stalled thread. Auto-cancels when they respond. You only deal with the replies."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                    <ChatRow role="user" style={{ marginBottom: 20 }}>
                      <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
                        Follow up with every supplier who hasn't responded to our backorder inquiry this week. Follow up again in 2 days if still nothing.
                      </p>
                    </ChatRow>
                    <ChatRow role="ai" seed="dist-followups">
                      <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 14px" }}>
                        Sending follow-ups to 7 suppliers...
                      </p>
                      <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.04)", marginBottom: 12 }}>
                        {[
                          ["Hartwell MFG", "PO #8841 · silent 6 days"],
                          ["Central Dist.", "PO #8857 · silent 4 days"],
                          ["Apex Supply", "PO #8863 · silent 3 days"],
                          ["Midwest Parts", "PO #8871 · silent 2 days"],
                        ].map(([supplier, detail], i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 12px", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                            <span style={{ color: TEXT, fontSize: 12 }}>{supplier}</span>
                            <span style={{ color: DIM, fontSize: 12 }}>{detail}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", fontSize: 12 }}>
                        <span style={{ background: "rgba(0,171,85,0.12)", color: GREEN, borderRadius: 99, padding: "3px 10px", fontWeight: 500 }}>✓ 7 sent</span>
                        <span style={{ background: "rgba(255,255,255,0.05)", color: MUTED, borderRadius: 99, padding: "3px 10px" }}>Auto follow-up: 2 days if no reply</span>
                      </div>
                    </ChatRow>
                  </div>

                  <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.15)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
                    <div>
                      <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Works for customers too</p>
                      <ChatRow role="user" style={{ marginBottom: 14 }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
                          Follow up with customers who haven't approved substitutions for more than 3 days
                        </p>
                      </ChatRow>
                      <ChatRow role="ai" seed="dist-custsubs">
                        <p style={{ color: GREEN, fontSize: 13, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                          ✓ 3 follow-ups sent to Acme Industrial, Ridge Supply, and Northside Mfg. I'll remind you when they respond.
                        </p>
                      </ChatRow>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 4 }}>
                      {[
                        "One prompt follows up on every stalled thread at once",
                        "Auto-cancels follow-up the moment they respond",
                        "Works across suppliers, customers, and internal approvals",
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

            {/* ── Section 6: Morning Briefing ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Automation"
                  headline={<>Your morning order briefing,<br /><span style={{ color: GREEN }}>before the calls start.</span></>}
                  sub="Your minion monitors every inbox overnight. You start the day knowing exactly what's on fire and what can wait."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                      <ChatRow role="user" style={{ marginBottom: 14 }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
                          Every morning at 7:30am, give me a briefing on open exceptions, stalled orders, expedites, and anything that came in overnight
                        </p>
                      </ChatRow>
                      <ChatRow role="ai" seed="dist-sched">
                        <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500 }}>
                          Scheduled. You'll get your order desk briefing at 7:30am every morning.
                        </p>
                      </ChatRow>
                    </div>

                    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                      <ChatRow role="user" style={{ marginBottom: 14 }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Alert me immediately if any customer mentions a pricing dispute</p>
                      </ChatRow>
                      <ChatRow role="ai" seed="dist-alert">
                        <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500 }}>
                          Alert set. I'll flag any pricing dispute mentions the moment they arrive, 24/7.
                        </p>
                      </ChatRow>
                    </div>
                  </div>

                  <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.18)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,171,85,0.025) 0%, transparent 50%)", pointerEvents: "none", borderRadius: 16 }} />
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, paddingBottom: 14, borderBottom: `1px solid ${BORDER}` }}>
                        <div>
                          <p style={{ color: TEXT, fontSize: 14, fontWeight: 600, margin: 0 }}>Morning Briefing</p>
                          <p style={{ color: DIM, fontSize: 12, margin: 0 }}>Today · 7:30am</p>
                        </div>
                        <span style={{ background: "rgba(0,171,85,0.1)", color: GREEN, fontSize: 11, borderRadius: 99, padding: "3px 10px", fontWeight: 500 }}>5 items</span>
                      </div>

                      {[
                        { icon: "⚠️", title: "PO #8841 — Acme Industrial, 6 days stalled", detail: "Waiting on customer sub approval for SKU-2291", kind: "warn" as const },
                        { icon: "🚨", title: "2 expedite requests overnight", detail: "Valley Parts (PO #8857) · Ridge Supply (PO #8891)", kind: "warn" as const },
                        { icon: "📋", title: "8 orders waiting on supplier responses", detail: "Oldest: 6 days — follow-ups queued", kind: "default" as const },
                        { icon: "💬", title: "3 substitution approvals still pending", detail: "Customers haven't responded · follow-ups sent", kind: "default" as const },
                        { icon: "💰", title: "2 price overrides need manager sign-off", detail: "PO #8876 · PO #8883 · total exposure $2,140", kind: "default" as const },
                      ].map((item, i) => (
                        <div key={i} style={{ padding: "10px 12px", borderRadius: 8, marginBottom: 8, background: item.kind === "warn" ? "rgba(234,179,8,0.05)" : "rgba(255,255,255,0.02)", border: item.kind === "warn" ? "1px solid rgba(234,179,8,0.12)" : "1px solid transparent" }}>
                          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                            <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
                            <div>
                              <p style={{ color: item.kind === "warn" ? "#FCD34D" : TEXT, fontSize: 13, fontWeight: 500, margin: "0 0 2px" }}>{item.title}</p>
                              <p style={{ color: DIM, fontSize: 12, margin: 0 }}>{item.detail}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── FAQ ── */}
            <Section style={{ marginTop: 80, marginBottom: 80, maxWidth: 720, margin: "80px auto" }}>
              <FAQ />
            </Section>

            {/* ── Final CTA ── */}
            <FinalCTA
              headline={<>That order thread you're digging through?<br /><span style={{ color: GREEN }}>Your minion already learned it.</span></>}
              sub="Connect your inbox in 30 seconds. Your minion starts reading every order, every exception, every thread immediately."
            />

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Distributors;

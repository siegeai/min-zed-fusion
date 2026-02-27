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
  FinalCTA, ProgressTracker, CarrierDots,
} from "@/components/LandingShared";

const TPL_PROMPTS: PromptItem[] = [
  {
    text: "Which of my clients have shipments arriving today?",
    label: "Client visibility",
    response: {
      headline: "6 deliveries across 3 clients today",
      rows: [["Acme Industries", "2 shipments · on time"], ["Pacific Foods", "3 shipments · 1 delayed (+2hrs)"], ["Midwest Mfg", "1 shipment · in transit"], ["Action needed", "Pacific Foods delay — carrier notified"]],
    },
  },
  {
    text: "Send a rate request to our carrier pool for Acme's weekly Dallas shipments — 8 pallets LTL, every Monday.",
    label: "Client RFQ",
    response: {
      headline: "✓ RFQ sent to 15 carriers",
      rows: [["Client", "Acme Industries"], ["Lane", "Chicago → Dallas · LTL"], ["Freight", "8 pallets · recurring Mon"], ["Follow-up", "Auto in 2 days if no reply"]],
    },
  },
  {
    text: "Compare carrier rates for Chicago to Atlanta across all my clients this quarter.",
    label: "Cross-client rates",
    response: {
      headline: "CHI → ATL — Q1 avg: $2,340 across 3 clients",
      rows: [["Acme Industries", "$2,200 avg · 12 loads"], ["Pacific Foods", "$2,450 avg · 8 loads"], ["Midwest Mfg", "$2,380 avg · 5 loads"]],
    },
  },
  {
    text: "Alert me if any client's shipment is delayed more than 2 hours.",
    label: "SLA alerts",
    response: {
      headline: "✓ Alert created",
      rows: [["Trigger", "Delay > 2 hours on any client shipment"], ["Monitoring", "All carrier tracking emails"], ["Notify via", "SMS to (312) 555-0142"], ["Active", "24/7"]],
    },
  },
  {
    text: "Give me a weekly performance report for Acme Industries — shipments, costs, and on-time rate.",
    label: "Client reporting",
    response: {
      headline: "Acme Industries — Week of Mar 4",
      rows: [["Shipments", "14 completed · 2 in transit"], ["Total spend", "$31,200"], ["On-time rate", "92.8% (13/14)"], ["Avg cost/shipment", "$2,229"]],
    },
  },
  {
    text: "Follow up with carriers who haven't provided PODs for last week's deliveries.",
    label: "POD collection",
    response: {
      headline: "✓ 6 POD requests sent",
      rows: [["Werner · Load #3385", "Delivered Mon · no POD"], ["XPO · Load #3392", "Delivered Tue · no POD"], ["Estes · Load #3401", "Delivered Wed · no POD"]],
    },
  },
  {
    text: "What's our on-time delivery rate for Pacific Foods this quarter?",
    label: "Client KPIs",
    response: {
      headline: "Pacific Foods — Q1 On-Time: 89.3%",
      rows: [["Total deliveries", "28"], ["On time", "25 (89.3%)"], ["Late", "3 — avg delay 4.2hrs"], ["Top carrier", "Old Dominion · 96% on-time"]],
    },
  },
  {
    text: "Morning briefing — all client shipments, exceptions, and pending tasks.",
    label: "Morning brief",
    response: {
      headline: "4 items across 3 clients",
      rows: [["In transit today", "11 shipments · 3 clients"], ["Exceptions", "1 delay (Pacific Foods +2hrs)"], ["Pending quotes", "4 RFQs awaiting response"], ["PODs missing", "6 from last week"]],
    },
  },
];

const maxW: React.CSSProperties = { maxWidth: 960, margin: "0 auto" };

const ThirdPartyLogistics = () => {
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
        <title>min. for 3PLs | AI that manages every client, carrier, and shipment</title>
        <meta name="description" content="AI for third-party logistics providers — manage multiple clients, track shipments, collect PODs, compare rates, and get performance reports in plain English." />
        <meta name="keywords" content="3PL, third party logistics, logistics provider, multi-client management, shipment tracking, carrier management, POD collection" />
        <link rel="canonical" href="https://getmin.ai/3pl" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getmin.ai/3pl" />
        <meta property="og:title" content="min. for 3PLs | AI that manages every client, carrier, and shipment" />
        <meta property="og:description" content="Multi-client visibility, carrier management, and performance reports — in plain English." />
      </Helmet>

      <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT, overflowX: "hidden" }}>
        <Header />

        <main style={{ paddingTop: 100 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

            {/* ── Hero ── */}
            <div className="hero-glow" style={{ paddingTop: 48, marginBottom: 120 }}>
              <div style={{ textAlign: "center", marginBottom: 56, position: "relative", zIndex: 1 }}>
                <p className="hero-stagger-1" style={{ color: GREEN, fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
                  For 3PLs
                </p>
                <h1
                  className="hero-stagger-2"
                  style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", color: TEXT, margin: "0 0 20px 0" }}
                >
                  10 clients. 50 carriers.<br />
                  <span style={{ color: GREEN }}>One minion.</span>
                </h1>
                <p className="hero-stagger-3" style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)", color: MUTED, fontWeight: 400, marginBottom: 40, lineHeight: 1.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                  Your minion <MiniMascot size={28} seed="3pl-hero" /> knows every client, every carrier, every shipment.
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
                <HeroChatDemo prompts={TPL_PROMPTS} mascotSeed="3pl-demo" />
              </div>
            </div>

            <Divider />

            {/* ── Section 2: Multi-Client Chaos ── */}
            <Section style={{ marginTop: 120, marginBottom: 120 }} id="features">
              <div style={maxW}>
                <SectionHeading
                  eyebrow="The multi-client juggle"
                  headline={<>Every client thinks they're<br />your only client.</>}
                  sub="You're managing 10 accounts across 50 carriers. Your minion keeps it all straight."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Before */}
                  <div style={{ background: SURFACE, border: "1px solid rgba(239,68,68,0.12)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(239,68,68,0.04) 0%, transparent 40%)", pointerEvents: "none", borderRadius: 16 }} />
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <span style={{ color: "#EF4444", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: 99, padding: "2px 10px", display: "inline-block", marginBottom: 16 }}>Before</span>

                      <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "7px 12px", display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <span style={{ color: DIM, fontSize: 13 }}>🔍</span>
                        <span style={{ color: DIM, fontSize: 13 }}>acme shipment status...</span>
                      </div>

                      {[
                        { from: "orders@acmeindustries.com", subj: "Where's our Dallas shipment?", time: "Wed 3:10pm" },
                        { from: "tracking@fedexfreight.com", subj: "Shipment Update — PRO #881204", time: "Wed 2:45pm" },
                        { from: "logistics@pacificfoods.com", subj: "Re: Weekly capacity planning", time: "Wed 1:30pm" },
                        { from: "ops@midwestmfg.com", subj: "POD needed for Load #3385", time: "Tue 4:22pm" },
                        { from: "billing@xpologistics.com", subj: "Invoice #XPO-2024-1847", time: "Tue 10:05am" },
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
                        Which client was this for? Who's the carrier? Where's the POD?
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
                          Give me a status on all shipments for Acme Industries this week.
                        </p>
                      </ChatRow>

                      <ChatRow role="ai" seed="3pl-status">
                        <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>
                          Acme Industries — 5 shipments this week
                        </p>
                        <DataTable
                          hasHeader
                          rows={[
                            ["Load", "Status", "ETA"],
                            ["#ACM-4412", "Delivered ✓", "Mon 2pm"],
                            ["#ACM-4418", "In transit", "Wed 4pm"],
                            ["#ACM-4420", "Picked up", "Thu 10am"],
                            ["#ACM-4422", "Carrier assigned", "Fri 8am"],
                            ["#ACM-4425", "Pending quote", "—"],
                          ]}
                        />
                      </ChatRow>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── Section 3: Cross-Client Intelligence ── */}
            <Section style={{ marginTop: 120, marginBottom: 120 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Cross-client intelligence"
                  headline={<>Every rate, every carrier,<br />every client.<br /><span style={{ color: GREEN }}>One memory.</span></>}
                  sub="Your minion knows the rate history for every lane across all your clients. Leverage volume for better pricing."
                />

                <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-5" style={{ marginBottom: 48 }}>
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 22 }}>
                    <p style={{ color: DIM, fontSize: 11, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>Incoming email</p>
                    <p style={{ color: MUTED, fontSize: 12, fontWeight: 600, marginBottom: 4 }}>From: quotes@wernerenterprises.com</p>
                    <p style={{ color: MUTED, fontSize: 12, marginBottom: 14 }}>Subject: Re: Rate Quote — CHI → ATL</p>
                    <p style={{ color: TEXT, fontSize: 13, lineHeight: 1.75 }}>
                      We can do{" "}
                      <span style={{ background: "rgba(0,171,85,0.18)", borderRadius: 3, padding: "1px 5px", color: "#6EE7B7" }}>$2,300</span>{" "}
                      for{" "}
                      <span style={{ background: "rgba(0,171,85,0.18)", borderRadius: 3, padding: "1px 5px", color: "#6EE7B7" }}>FTL dry van Chicago → Atlanta</span>.{" "}
                      Available{" "}
                      <span style={{ background: "rgba(0,171,85,0.18)", borderRadius: 3, padding: "1px 5px", color: "#6EE7B7" }}>next Wednesday</span>.
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(0,171,85,0.1)", border: "1px solid rgba(0,171,85,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: GREEN, fontSize: 16 }}>→</div>
                    <span style={{ color: DIM, fontSize: 11 }}>auto</span>
                  </div>

                  <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.18)", borderRadius: 14, padding: 22 }}>
                    <p style={{ color: GREEN, fontSize: 11, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Extracted & cross-referenced</p>
                    {[
                      ["Carrier", "Werner Enterprises"],
                      ["Rate", "$2,300"],
                      ["Lane", "Chicago → Atlanta"],
                      ["Your avg (all clients)", "$2,340"],
                      ["Acme's avg", "$2,200"],
                      ["Pacific Foods avg", "$2,450"],
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
                    { stat: "All clients", label: "rate history in one place" },
                    { stat: "Auto", label: "extract rates, POs, ETAs, PODs" },
                    { stat: "Every", label: "email across every client — searchable" },
                  ].map(({ stat, label }) => (
                    <div key={stat} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "20px 18px" }}>
                      <p style={{ color: GREEN, fontSize: "1.5rem", fontWeight: 700, margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>{stat}</p>
                      <p style={{ color: MUTED, fontSize: 13, margin: 0, lineHeight: 1.45 }}>{label}</p>
                    </div>
                  ))}
                </div>

                <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                  <ChatRow role="user" style={{ marginBottom: 16 }}>
                    <p style={{ color: TEXT, fontSize: 14, margin: 0 }}>Compare our carrier rates for the Chicago to Atlanta lane across all clients this quarter</p>
                  </ChatRow>
                  <ChatRow role="ai" seed="3pl-rates">
                    <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>CHI → ATL — 25 loads across 3 clients</p>
                    <DataTable
                      hasHeader
                      rows={[
                        ["Client", "Avg rate", "Loads"],
                        ["Acme Industries", "$2,200", "12"],
                        ["Pacific Foods", "$2,450", "8"],
                        ["Midwest Mfg", "$2,380", "5"],
                      ]}
                    />
                  </ChatRow>
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── Section 4: Carrier Blast ── */}
            <Section style={{ marginTop: 120, marginBottom: 120 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="One prompt → your carrier pool"
                  headline={<>RFQ your entire carrier pool<br /><span style={{ color: GREEN }}>for any client. In one sentence.</span></>}
                  sub="Rate requests, follow-ups, and POD collection — your minion handles the carrier grind across all your accounts."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                    <ChatRow role="user" style={{ marginBottom: 20 }}>
                      <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
                        Send a rate request to our carrier pool for Acme's weekly Dallas shipments — 8 pallets LTL, every Monday pickup.
                      </p>
                    </ChatRow>
                    <ChatRow role="ai" seed="3pl-blast">
                      <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 14px" }}>
                        Sending to 15 carriers from your pool...
                      </p>
                      <CarrierDots count={15} />
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", fontSize: 12 }}>
                        <span style={{ background: "rgba(0,171,85,0.12)", color: GREEN, borderRadius: 99, padding: "3px 10px", fontWeight: 500 }}>✓ 15 sent</span>
                        <span style={{ background: "rgba(255,255,255,0.05)", color: MUTED, borderRadius: 99, padding: "3px 10px" }}>Client: Acme Industries</span>
                      </div>
                    </ChatRow>
                  </div>

                  <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.15)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 20px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Live quote tracker</p>
                      <ProgressTracker total={15} label="Carrier quotes received" />
                    </div>
                    <div style={{ marginTop: 28 }}>
                      {[
                        "RFQ tagged to the right client automatically",
                        "Follow-ups auto-cancel when carriers respond",
                        "Compare quotes across your carrier pool instantly",
                      ].map((point, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                          <span style={{ color: GREEN, flexShrink: 0, marginTop: 1, fontSize: 13 }}>✓</span>
                          <span style={{ color: MUTED, fontSize: 13, lineHeight: 1.5 }}>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── Section 5: Client Reporting & SLA ── */}
            <Section style={{ marginTop: 120, marginBottom: 120 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Client reporting"
                  headline={<>Performance reports<br /><span style={{ color: GREEN }}>your clients actually want.</span></>}
                  sub="On-time rates, cost breakdowns, carrier performance — pulled from your actual data, not a dashboard you forgot to update."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.18)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,171,85,0.025) 0%, transparent 50%)", pointerEvents: "none", borderRadius: 16 }} />
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, paddingBottom: 14, borderBottom: `1px solid ${BORDER}` }}>
                        <div>
                          <p style={{ color: TEXT, fontSize: 14, fontWeight: 600, margin: 0 }}>Acme Industries — Weekly</p>
                          <p style={{ color: DIM, fontSize: 12, margin: 0 }}>Week of Mar 4, 2024</p>
                        </div>
                        <span style={{ background: "rgba(0,171,85,0.1)", color: GREEN, fontSize: 11, borderRadius: 99, padding: "3px 10px", fontWeight: 500 }}>Report</span>
                      </div>

                      {[
                        { label: "Shipments completed", value: "14", sub: "2 still in transit" },
                        { label: "On-time delivery", value: "92.8%", sub: "13/14 on time" },
                        { label: "Total freight spend", value: "$31,200", sub: "Avg $2,229/shipment" },
                        { label: "Best carrier", value: "Old Dominion", sub: "96% on-time · $2,180 avg" },
                      ].map((item, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "12px 0", borderBottom: i < 3 ? `1px solid ${BORDER}` : "none" }}>
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
                        Your minion pulls real data from your email history — shipment counts, costs, on-time rates, carrier rankings. Ask for a report on any client, any lane, any time period.
                      </p>
                    </div>

                    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                      <ChatRow role="user" style={{ marginBottom: 14 }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>What's our on-time rate for Pacific Foods this quarter?</p>
                      </ChatRow>
                      <ChatRow role="ai" seed="3pl-kpi">
                        <p style={{ color: GREEN, fontSize: 13, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                          Pacific Foods Q1: 89.3% on-time (25/28 deliveries). 3 late — avg delay 4.2hrs. Top carrier: Old Dominion at 96%.
                        </p>
                      </ChatRow>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 4 }}>
                      {[
                        "Client-level KPIs pulled from your actual email data",
                        "On-time rates, cost trends, carrier performance rankings",
                        "Ask for any time period — this week, this quarter, last year",
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
            <Section style={{ marginTop: 120, marginBottom: 120 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Automation"
                  headline={<>Your morning ops briefing,<br /><span style={{ color: GREEN }}>across every client.</span></>}
                  sub="Your minion monitors every client overnight. Start the day knowing exactly what needs attention."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                      <ChatRow role="user" style={{ marginBottom: 14 }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
                          Every morning at 7am, brief me on all client shipments, exceptions, pending quotes, and missing PODs
                        </p>
                      </ChatRow>
                      <ChatRow role="ai" seed="3pl-brief">
                        <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500 }}>
                          Scheduled. You'll get a multi-client briefing at 7am every morning.
                        </p>
                      </ChatRow>
                    </div>

                    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                      <ChatRow role="user" style={{ marginBottom: 14 }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Alert me if any client's shipment is delayed more than 2 hours</p>
                      </ChatRow>
                      <ChatRow role="ai" seed="3pl-alert">
                        <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500 }}>
                          Alert set. I'll text you if any client shipment is delayed 2+ hours.
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
                          <p style={{ color: DIM, fontSize: 12, margin: 0 }}>Today · 7:00am</p>
                        </div>
                        <span style={{ background: "rgba(0,171,85,0.1)", color: GREEN, fontSize: 11, borderRadius: 99, padding: "3px 10px", fontWeight: 500 }}>3 clients</span>
                      </div>

                      {[
                        { icon: "📦", title: "11 shipments in transit today", detail: "Acme (4) · Pacific Foods (5) · Midwest (2)", kind: "default" as const },
                        { icon: "⚠️", title: "Pacific Foods delay — XPO +2hrs", detail: "Load #PF-3392 · New ETA: Wed 6pm · Carrier notified", kind: "warn" as const },
                        { icon: "📋", title: "4 RFQs awaiting carrier responses", detail: "Acme Dallas · Pacific Seattle · Midwest x2", kind: "default" as const },
                        { icon: "📎", title: "6 PODs missing from last week", detail: "Werner (2) · XPO (2) · Estes (2) — follow-ups queued", kind: "default" as const },
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
            <Section style={{ marginTop: 120, marginBottom: 120, maxWidth: 720, margin: "120px auto" }}>
              <FAQ />
            </Section>

            {/* ── Final CTA ── */}
            <FinalCTA
              headline={<>Your clients are emailing right now.<br /><span style={{ color: GREEN }}>Your minion already replied.</span></>}
              sub="Connect your inbox in 30 seconds. Your minion starts working across all your clients immediately."
            />

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ThirdPartyLogistics;

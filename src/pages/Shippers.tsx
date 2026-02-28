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

const SHIPPER_PROMPTS: PromptItem[] = [
  {
    text: "Where is PO #4412? When is it arriving?",
    label: "Shipment tracking",
    response: {
      headline: "PO #4412: In Transit",
      rows: [["Carrier", "FedEx Freight"], ["Status", "In transit, Memphis hub"], ["ETA", "Thu Mar 7, 2:00pm"], ["Destination", "Dallas, TX (Dock 3)"]],
    },
  },
  {
    text: "Send an RFQ to our approved carriers for 10 pallets Chicago to Dallas, pickup next Monday.",
    label: "RFQ blast",
    response: {
      headline: "✓ RFQ sent to 12 carriers",
      rows: [["Lane", "Chicago → Dallas"], ["Freight", "10 pallets · LTL"], ["Pickup", "Mon Mar 11"], ["Follow-up", "Auto in 2 days if no reply"]],
    },
  },
  {
    text: "Compare the quotes we got for the Houston shipment.",
    label: "Rate comparison",
    response: {
      headline: "4 quotes for Houston shipment · 8 pallets LTL",
      rows: [
        ["Carrier", "Rate", "Transit"],
        ["Estes Express", "$1,620", "4 days · LTL"],
        ["XPO Logistics", "$1,840", "3 days · LTL"],
        ["Old Dominion", "$1,950", "2 days · Priority"],
        ["FedEx Freight", "$2,110", "2 days · Priority"],
      ],
      highlightRow: 1,
      note: "Estes is $220 below your lane avg, recommend booking",
    },
  },
  {
    text: "Alert me if any inbound shipment is delayed more than 4 hours.",
    label: "Delay alerts",
    response: {
      headline: "✓ Alert created",
      rows: [["Trigger", "Delay > 4 hours on any inbound"], ["Monitoring", "All carrier tracking emails"], ["Notify via", "SMS to (312) 555-0142"], ["Active", "24/7"]],
    },
  },
  {
    text: "What's our average shipping cost per pallet from Chicago this quarter?",
    label: "Spend analysis",
    response: {
      headline: "Q1 avg: $142/pallet from Chicago",
      rows: [["Total shipments", "47 loads"], ["Avg cost/pallet", "$142"], ["Lowest", "$98, Estes Express"], ["Highest", "$189, FedEx Priority"]],
    },
  },
  {
    text: "Follow up with vendors who haven't confirmed delivery for this week's POs.",
    label: "Follow-ups",
    response: {
      headline: "✓ 5 follow-ups sent",
      rows: [["Acme Supply Co", "PO #4401 · silent 3 days"], ["Pacific Components", "PO #4408 · silent 2 days"], ["Midwest Steel", "PO #4411 · silent 1 day"]],
    },
  },
  {
    text: "Give me a morning summary of all inbound deliveries and any issues.",
    label: "Morning brief",
    response: {
      headline: "3 items for today",
      rows: [["Arriving today", "4 shipments · 2 confirmed"], ["Delayed", "1 shipment (+6hrs), Midwest Steel"], ["Pending", "3 POs with no carrier assigned"]],
    },
  },
  {
    text: "Reach out to our top 3 carriers for a rush shipment. 2 pallets LA to Phoenix, needs to arrive by Friday.",
    label: "Rush request",
    response: {
      headline: "✓ Expedited RFQ sent to 3 carriers",
      rows: [["Lane", "Los Angeles → Phoenix"], ["Freight", "2 pallets · expedited"], ["Must arrive", "Fri Mar 8"], ["Status", "Awaiting quotes"]],
    },
  },
];

const maxW: React.CSSProperties = { maxWidth: 960, margin: "0 auto" };

const Shippers = () => {
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
        <title>min. for Shippers | AI logistics assistant for procurement teams</title>
        <meta name="description" content="AI for shipping & procurement teams. Track shipments, compare rates, send RFQs, and get morning briefings in plain English. Stop chasing updates across email threads." />
        <meta name="keywords" content="shipper, procurement, logistics assistant, RFQ, shipment tracking, rate comparison, supply chain, freight management" />
        <link rel="canonical" href="https://getmin.ai/shippers" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getmin.ai/shippers" />
        <meta property="og:title" content="min. for Shippers | AI logistics assistant for procurement teams" />
        <meta property="og:description" content="Track shipments, compare rates, send RFQs. In plain English." />
      </Helmet>

      <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT, overflowX: "hidden" }}>
        <Header />

        <main style={{ paddingTop: 100 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

            {/* ── Hero ── */}
            <div className="hero-glow" style={{ paddingTop: 48, marginBottom: 120 }}>
              <div style={{ textAlign: "center", marginBottom: 56, position: "relative", zIndex: 1 }}>
                <p className="hero-stagger-1" style={{ color: GREEN, fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
                  For shippers & procurement teams
                </p>
                <h1
                  className="hero-stagger-2"
                  style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", color: TEXT, margin: "0 0 20px 0" }}
                >
                  Stop chasing<br />
                  <span style={{ color: GREEN }}>shipment updates.</span>
                </h1>
                <p className="hero-stagger-3" style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)", color: MUTED, fontWeight: 400, marginBottom: 40, lineHeight: 1.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                  Your minion <MiniMascot size={28} seed="shipper-hero" /> already tracked them. Ready for its next task.
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
                <HeroChatDemo prompts={SHIPPER_PROMPTS} mascotSeed="shipper-demo" />
              </div>
            </div>

            <Divider />

            {/* ── Section 2: The Update Chase ── */}
            <Section style={{ marginTop: 120, marginBottom: 120 }} id="features">
              <div style={maxW}>
                <SectionHeading
                  eyebrow="The update chase"
                  headline={<>You already know the updates<br />are buried in your inbox.</>}
                  sub="You just can't find them all fast enough."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Before */}
                  <div style={{ background: SURFACE, border: "1px solid rgba(239,68,68,0.12)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(239,68,68,0.04) 0%, transparent 40%)", pointerEvents: "none", borderRadius: 16 }} />
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <span style={{ color: "#EF4444", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: 99, padding: "2px 10px", display: "inline-block", marginBottom: 16 }}>Before</span>

                      <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "7px 12px", display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <span style={{ color: DIM, fontSize: 13 }}>🔍</span>
                        <span style={{ color: DIM, fontSize: 13 }}>PO 4412 delivery status...</span>
                      </div>

                      {[
                        { from: "tracking@fedexfreight.com", subj: "Shipment Update: PRO #881204", time: "Wed 3:22pm" },
                        { from: "dispatch@acmesupply.com", subj: "Re: PO #4412, Shipping Today", time: "Wed 10:15am" },
                        { from: "logistics@olddom.com", subj: "FW: Quote for Dallas shipment", time: "Tue 4:45pm" },
                        { from: "ar@midweststeel.com", subj: "Invoice + Tracking #", time: "Tue 11:30am" },
                        { from: "shipping@pacificcomp.com", subj: "Re: Delivery confirmation needed", time: "Mon 9:08am" },
                      ].map((row, i) => (
                        <div key={i} style={{ padding: "8px 10px", borderRadius: 6, marginBottom: 3, background: i === 0 ? "rgba(0,171,85,0.05)" : "transparent", border: i === 0 ? "1px solid rgba(0,171,85,0.1)" : "1px solid transparent", filter: i > 2 ? `blur(${i > 3 ? 2.5 : 1.5}px)` : "none", opacity: i > 3 ? 0.3 : 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                            <span style={{ color: i < 2 ? TEXT : MUTED, fontSize: 12, fontWeight: i < 2 ? 600 : 400 }}>{row.from}</span>
                            <span style={{ color: DIM, fontSize: 11 }}>{row.time}</span>
                          </div>
                          <span style={{ color: MUTED, fontSize: 12 }}>{row.subj}</span>
                        </div>
                      ))}
                      <p style={{ color: "#EF4444", fontSize: 12, marginTop: 16, fontStyle: "italic", lineHeight: 1.6, opacity: 0.7 }}>
                        Which email had the tracking number? Was it the invoice one or the shipping confirmation?
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
                          What's the status on all inbound POs arriving this week?
                        </p>
                      </ChatRow>

                      <ChatRow role="ai" seed="shipper-status">
                        <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>
                          4 inbound POs this week
                        </p>
                        <DataTable
                          hasHeader
                          rows={[
                            ["PO #", "Status", "ETA"],
                            ["#4412", "In transit, Memphis", "Thu 2pm"],
                            ["#4408", "Picked up today", "Fri 10am"],
                            ["#4415", "Carrier assigned", "Fri 3pm"],
                            ["#4401", "Delayed (+6hrs)", "Thu 8pm ⚠"],
                          ]}
                        />
                      </ChatRow>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── Section 3: Auto-Extraction ── */}
            <Section style={{ marginTop: 120, marginBottom: 120 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Perfect Recall"
                  headline={<>Your minion reads every email.<br />Tracks every PO.<br /><span style={{ color: GREEN }}>Remembers every rate.</span></>}
                  sub="No more spreadsheets to track shipments. Every quote, PO, and delivery date is remembered by your minion."
                />

                <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-5" style={{ marginBottom: 48 }}>
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 22 }}>
                    <p style={{ color: DIM, fontSize: 11, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>Incoming email</p>
                    <p style={{ color: MUTED, fontSize: 12, fontWeight: 600, marginBottom: 4 }}>From: shipping@acmesupply.com</p>
                    <p style={{ color: MUTED, fontSize: 12, marginBottom: 14 }}>Subject: PO #4412, Shipped Today</p>
                    <p style={{ color: TEXT, fontSize: 13, lineHeight: 1.75 }}>
                      Your order has shipped. Carrier:{" "}
                      <span style={{ background: "rgba(0,171,85,0.18)", borderRadius: 3, padding: "1px 5px", color: "#6EE7B7" }}>FedEx Freight</span>,{" "}
                      PRO #{" "}
                      <span style={{ background: "rgba(0,171,85,0.18)", borderRadius: 3, padding: "1px 5px", color: "#6EE7B7" }}>881204</span>.{" "}
                      ETA{" "}
                      <span style={{ background: "rgba(0,171,85,0.18)", borderRadius: 3, padding: "1px 5px", color: "#6EE7B7" }}>Thursday 2:00pm</span>.{" "}
                      10 pallets, freight cost{" "}
                      <span style={{ background: "rgba(0,171,85,0.18)", borderRadius: 3, padding: "1px 5px", color: "#6EE7B7" }}>$1,420</span>.
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(0,171,85,0.1)", border: "1px solid rgba(0,171,85,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: GREEN, fontSize: 16 }}>→</div>
                    <span style={{ color: DIM, fontSize: 11 }}>auto</span>
                  </div>

                  <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.18)", borderRadius: 14, padding: 22 }}>
                    <p style={{ color: GREEN, fontSize: 11, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Extracted & remembered</p>
                    {[
                      ["PO Number", "#4412"],
                      ["Carrier", "FedEx Freight"],
                      ["PRO #", "881204"],
                      ["ETA", "Thu 2:00pm"],
                      ["Pallets", "10"],
                      ["Freight cost", "$1,420"],
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
                    { stat: "50,000+", label: "emails processed in under 20 min" },
                    { stat: "Auto", label: "extract POs, tracking #s, ETAs, costs" },
                    { stat: "Every", label: "email, invoice, and BOL, searchable" },
                  ].map(({ stat, label }) => (
                    <div key={stat} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "20px 18px" }}>
                      <p style={{ color: GREEN, fontSize: "1.5rem", fontWeight: 700, margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>{stat}</p>
                      <p style={{ color: MUTED, fontSize: 13, margin: 0, lineHeight: 1.45 }}>{label}</p>
                    </div>
                  ))}
                </div>

                <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                  <ChatRow role="user" style={{ marginBottom: 16 }}>
                    <p style={{ color: TEXT, fontSize: 14, margin: 0 }}>Compare freight rates from our last 3 Chicago to Dallas shipments</p>
                  </ChatRow>
                  <ChatRow role="ai" seed="shipper-rates">
                    <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>3 recent shipments on this lane</p>
                    <DataTable
                      hasHeader
                      rows={[
                        ["Carrier", "Rate", "Transit"],
                        ["XPO Logistics", "$1,840", "3 days"],
                        ["Estes Express", "$1,620", "4 days"],
                        ["Old Dominion", "$1,950", "2 days"],
                      ]}
                    />
                  </ChatRow>
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── Section 4: RFQ Blast ── */}
            <Section style={{ marginTop: 120, marginBottom: 120 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="One prompt → 12 carriers"
                  headline={<>Send an RFQ to<br />12 carriers.{" "}<span style={{ color: GREEN }}>In one sentence.</span></>}
                  sub="One prompt sends to all your approved carriers. Auto-tracks responses. Schedules follow-ups that cancel when they reply."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                    <ChatRow role="user" style={{ marginBottom: 20 }}>
                      <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
                        Send an RFQ to our approved carriers for 10 pallets Chicago to Dallas, pickup Monday. Follow up in 2 days if no reply.
                      </p>
                    </ChatRow>
                    <ChatRow role="ai" seed="shipper-blast">
                      <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 14px" }}>
                        Sending RFQ to 12 approved carriers...
                      </p>
                      <CarrierDots count={12} />
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", fontSize: 12 }}>
                        <span style={{ background: "rgba(0,171,85,0.12)", color: GREEN, borderRadius: 99, padding: "3px 10px", fontWeight: 500 }}>✓ 12 sent</span>
                        <span style={{ background: "rgba(255,255,255,0.05)", color: MUTED, borderRadius: 99, padding: "3px 10px" }}>Auto follow-ups: 2 days</span>
                      </div>
                    </ChatRow>
                  </div>

                  <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.15)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 20px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Live quote tracker</p>
                      <ProgressTracker total={12} label="Carrier quotes received" />
                    </div>
                    <div style={{ marginTop: 28 }}>
                      {[
                        "Quotes trickle in over 48 hours",
                        "Follow-ups auto-cancel when they respond",
                        "Compare all quotes side-by-side when ready",
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

            {/* ── Section 5: Rate Comparison & Optimization ── */}
            <Section style={{ marginTop: 120, marginBottom: 120 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Spend optimization"
                  headline={<>It compares rates while you<br /><span style={{ color: GREEN }}>handle the next PO.</span></>}
                  sub="Your minion knows every rate you've ever been quoted. Ask it to find the best deal. Grounded in your actual data."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                    <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 20 }}>
                      Quote comparison, Dallas shipment
                    </p>

                    {[
                      { carrier: "Estes Express", rate: "$1,620", transit: "4 days", tag: "Lowest rate" },
                      { carrier: "Old Dominion", rate: "$1,950", transit: "2 days", tag: "Fastest" },
                      { carrier: "XPO Logistics", rate: "$1,840", transit: "3 days", tag: "" },
                    ].map((q, i) => (
                      <div key={i} style={{ background: i === 0 ? "rgba(0,171,85,0.06)" : "rgba(255,255,255,0.02)", border: i === 0 ? "1px solid rgba(0,171,85,0.18)" : `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                          <span style={{ color: TEXT, fontSize: 13, fontWeight: 500 }}>{q.carrier}</span>
                          <span style={{ color: i === 0 ? GREEN : TEXT, fontSize: 14, fontWeight: 700 }}>{q.rate}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: DIM, fontSize: 12 }}>{q.transit} transit</span>
                          {q.tag && <span style={{ color: i === 0 ? GREEN : "#60A5FA", fontSize: 11, fontWeight: 500 }}>{q.tag}</span>}
                        </div>
                      </div>
                    ))}

                    <div style={{ background: "rgba(0,171,85,0.06)", border: "1px solid rgba(0,171,85,0.18)", borderRadius: 10, padding: "12px 14px", marginTop: 12 }}>
                      <p style={{ color: GREEN, fontSize: 11, fontWeight: 600, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Recommendation</p>
                      <p style={{ color: MUTED, fontSize: 12, margin: 0, lineHeight: 1.55 }}>
                        Estes Express is $220 below your lane average. Old Dominion is fastest if timeline is tight.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.12)", borderRadius: 16, padding: 24 }}>
                      <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                        Your minion compares every quote against your historical spend, so you always know if a rate is above or below what you usually pay. No spreadsheet needed.
                      </p>
                    </div>

                    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                      <ChatRow role="user" style={{ marginBottom: 14 }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Book Estes for the Dallas shipment and send them the PO details</p>
                      </ChatRow>
                      <ChatRow role="ai" seed="shipper-book">
                        <p style={{ color: GREEN, fontSize: 13, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                          Done. Booked with Estes Express at $1,620. PO details and pickup instructions sent. PRO # pending.
                        </p>
                      </ChatRow>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 4 }}>
                      {[
                        "Compares quotes against your historical lane data",
                        "Flags above-average rates automatically",
                        "Books and sends PO details in one command",
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
                  headline={<>Your morning logistics briefing,<br /><span style={{ color: GREEN }}>before your coffee.</span></>}
                  sub="Your minion monitors overnight so you start the day knowing exactly what needs attention."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                      <ChatRow role="user" style={{ marginBottom: 14 }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
                          Every morning at 7:30am, brief me on inbound deliveries, open POs, and anything delayed
                        </p>
                      </ChatRow>
                      <ChatRow role="ai" seed="shipper-brief">
                        <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500 }}>
                          Scheduled. You'll get a logistics briefing at 7:30am every morning.
                        </p>
                      </ChatRow>
                    </div>

                    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                      <ChatRow role="user" style={{ marginBottom: 14 }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Alert me if any shipment is delayed more than 4 hours</p>
                      </ChatRow>
                      <ChatRow role="ai" seed="shipper-alert">
                        <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500 }}>
                          Alert set. I'll text you if any inbound shipment is delayed 4+ hours.
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
                        <span style={{ background: "rgba(0,171,85,0.1)", color: GREEN, fontSize: 11, borderRadius: 99, padding: "3px 10px", fontWeight: 500 }}>4 items</span>
                      </div>

                      {[
                        { icon: "📦", title: "3 deliveries arriving today", detail: "PO #4412 (2pm) · PO #4408 (4pm) · PO #4415 (5pm)", kind: "default" as const },
                        { icon: "⚠️", title: "Midwest Steel shipment delayed +6hrs", detail: "PO #4401 · New ETA: Thu 8pm · Carrier notified", kind: "warn" as const },
                        { icon: "✅", title: "Estes Express confirmed pickup", detail: "Dallas shipment · Mon 8am · PRO #991847", kind: "success" as const },
                        { icon: "📋", title: "3 open RFQs with no quotes yet", detail: "Houston · Phoenix · Seattle lanes, follow-ups scheduled", kind: "default" as const },
                      ].map((item, i) => (
                        <div key={i} style={{ padding: "10px 12px", borderRadius: 8, marginBottom: 8, background: item.kind === "success" ? "rgba(0,171,85,0.06)" : item.kind === "warn" ? "rgba(234,179,8,0.05)" : "rgba(255,255,255,0.02)", border: item.kind === "success" ? "1px solid rgba(0,171,85,0.12)" : item.kind === "warn" ? "1px solid rgba(234,179,8,0.12)" : "1px solid transparent" }}>
                          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                            <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
                            <div>
                              <p style={{ color: item.kind === "success" ? "#6EE7B7" : item.kind === "warn" ? "#FCD34D" : TEXT, fontSize: 13, fontWeight: 500, margin: "0 0 2px" }}>{item.title}</p>
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
              headline={<>You're going to chase<br />that shipment update again tomorrow.<br /><span style={{ color: GREEN }}>Or you could just ask.</span></>}
              sub="Connect your inbox in 30 seconds. Your minion starts working immediately."
            />

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Shippers;

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

const OPS_PROMPTS: PromptItem[] = [
  {
    text: "Send a status request to every vendor with an open order.",
    label: "Status checks",
    response: {
      headline: "✓ 8 status requests sent",
      rows: [["Acme Supply · PO #4412", "Sent · awaiting reply"], ["Pacific Components · PO #4408", "Sent · awaiting reply"], ["Midwest Steel · PO #4401", "Sent · no update in 3 days ⚠"], ["GlobalTech · PO #4420", "Sent · awaiting reply"]],
    },
  },
  {
    text: "Follow up with everyone who hasn't responded to my email from last week.",
    label: "Follow-ups",
    response: {
      headline: "✓ 5 follow-ups sent",
      rows: [["Pacific Components", "Follow-up sent · silent 5 days"], ["Midwest Steel", "Follow-up sent · silent 4 days"], ["Atlas Industries", "Follow-up sent · silent 3 days"]],
    },
  },
  {
    text: "Chase the signed contracts I'm still waiting on from last Tuesday's batch.",
    label: "Document chase",
    response: {
      headline: "✓ 4 document requests sent",
      rows: [["Summit Corp", "Contract #2241 · sent reminder"], ["NorthStar Inc", "Contract #2243 · sent reminder"], ["Valley Group", "Contract #2245 · signed ✓"], ["Central Co", "Contract #2247 · sent reminder"]],
    },
  },
  {
    text: "Alert me if any supplier mentions a delay, shortage, or backorder.",
    label: "Exception alerts",
    response: {
      headline: "✓ Alert created",
      rows: [["Trigger", "Delay, shortage, or backorder mentioned"], ["Monitoring", "All incoming vendor emails"], ["Notify via", "SMS to (312) 555-0142"], ["Active", "24/7"]],
    },
  },
  {
    text: "What's the latest update on the GlobalTech order?",
    label: "Order status",
    response: {
      headline: "GlobalTech: PO #4420",
      rows: [["Status", "Shipped · in transit"], ["Tracking", "FedEx · PRO #992841"], ["ETA", "Thursday 2:00pm"], ["Last update", "Departed Memphis hub · Wed 3am"]],
    },
  },
  {
    text: "Send a confirmation to every vendor we placed orders with today.",
    label: "Order confirms",
    response: {
      headline: "✓ 4 order confirmations sent",
      rows: [["Acme Supply", "PO #4425 · $14,200 · Sent"], ["Pacific Components", "PO #4426 · $8,900 · Sent"], ["Midwest Steel", "PO #4427 · $22,100 · Sent"], ["GlobalTech", "PO #4428 · $6,400 · Sent"]],
    },
  },
  {
    text: "Any issues I should know about from overnight?",
    label: "Morning brief",
    response: {
      headline: "3 items need your attention",
      rows: [["Midwest Steel", "Delay on PO #4401 (+1 day)"], ["Missing docs", "4 unsigned contracts from last week"], ["Unanswered", "5 vendors haven't replied to status checks"]],
    },
  },
  {
    text: "Blast an availability check to our approved supplier list for 500 units of SKU-7741.",
    label: "Supplier blast",
    response: {
      headline: "✓ Sending to 12 suppliers",
      rows: [["Item", "SKU-7741 · 500 units"], ["Sent to", "12 approved suppliers"], ["Follow-up", "Auto in 2 days if no reply"], ["Responses", "Tracking in Tasks tab"]],
    },
  },
];

const maxW: React.CSSProperties = { maxWidth: 960, margin: "0 auto" };

const Operations = () => (
  <>
    <Helmet>
      <title>min. for Operations | Stop repeating the same emails every morning</title>
      <meta name="description" content="AI for ops teams. Status checks, follow-ups, document chasing, exception alerts, and morning briefings. Your minion handles the repetitive email grind." />
      <link rel="canonical" href="https://getmin.ai/teams/operations" />
      <meta property="og:title" content="min. for Operations | Stop repeating the same emails every morning" />
      <meta property="og:description" content="Status checks, follow-ups, document chasing. In plain English." />
    </Helmet>

    <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT, overflowX: "hidden" }}>
      <Header />
      <main style={{ paddingTop: 100 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

          <div className="hero-glow" style={{ paddingTop: 32, marginBottom: 80 }}>
            <div style={{ textAlign: "center", marginBottom: 56, position: "relative", zIndex: 1 }}>
              <p className="hero-stagger-1" style={{ color: GREEN, fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
                For elite ops teams
              </p>
              <h1 className="hero-stagger-2" style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", color: TEXT, margin: "0 0 20px 0" }}>
                Stop repeating the same<br /><span style={{ color: GREEN }}>emails every morning.</span>
              </h1>
              <p className="hero-stagger-3" style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)", color: MUTED, fontWeight: 400, marginBottom: 40, lineHeight: 1.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                Your minion <MiniMascot size={28} seed="ops-hero" /> remembers every thread. It handles the routine. You handle exceptions.
              </p>
              <div className="hero-stagger-4">
                <a href="https://app.getmin.ai/">
                  <Button size="lg" className="cta-glow text-white font-normal text-base px-8" style={{ backgroundColor: GREEN, border: "none" }}>
                    Try for free <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
            <div className="hero-stagger-5" style={{ position: "relative", zIndex: 1 }}>
              <HeroChatDemo prompts={OPS_PROMPTS} mascotSeed="ops-demo" />
            </div>
          </div>

          <Divider />

          {/* Before/After */}
          <Section style={{ marginTop: 80, marginBottom: 80 }}>
            <div style={maxW}>
              <SectionHeading
                eyebrow="The daily grind"
                headline={<>Status checks. Follow-ups. Document chasing.<br /><span style={{ color: GREEN }}>The same emails, every single day.</span></>}
                sub="Your minion remembers every thread and every deadline. It does the repetitive communication so you only deal with what actually needs your brain."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div style={{ background: SURFACE, border: "1px solid rgba(239,68,68,0.12)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(239,68,68,0.04) 0%, transparent 40%)", pointerEvents: "none", borderRadius: 16 }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <span style={{ color: "#EF4444", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: 99, padding: "2px 10px", display: "inline-block", marginBottom: 16 }}>Your morning</span>
                    {[
                      { task: "Send 8 status check emails", time: "25 min" },
                      { task: "Chase 4 unsigned documents", time: "15 min" },
                      { task: "Follow up on 5 unanswered emails", time: "20 min" },
                      { task: "Update tracking spreadsheet", time: "30 min" },
                      { task: "Reply to vendor updates", time: "20 min" },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 4 ? `1px solid ${BORDER}` : "none" }}>
                        <span style={{ color: MUTED, fontSize: 13 }}>{item.task}</span>
                        <span style={{ color: "#EF4444", fontSize: 12, fontWeight: 500, opacity: 0.7 }}>{item.time}</span>
                      </div>
                    ))}
                    <p style={{ color: "#EF4444", fontSize: 13, marginTop: 16, fontWeight: 600 }}>
                      ~2 hours before you touch anything strategic
                    </p>
                  </div>
                </div>

                <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.2)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,171,85,0.03) 0%, transparent 40%)", pointerEvents: "none", borderRadius: 16 }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <span style={{ color: GREEN, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "rgba(0,171,85,0.1)", border: "1px solid rgba(0,171,85,0.18)", borderRadius: 99, padding: "2px 10px", display: "inline-block", marginBottom: 16 }}>With your minion</span>
                    <ChatRow role="user" style={{ marginBottom: 14 }}>
                      <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>Send status checks to every vendor with an open order, chase unsigned contracts from last week, and follow up on all unanswered emails.</p>
                    </ChatRow>
                    <ChatRow role="ai" seed="ops-all">
                      <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500, lineHeight: 1.6 }}>
                        ✓ 8 status checks sent<br />
                        ✓ 4 document reminders sent<br />
                        ✓ 5 follow-ups sent<br />
                        All tasks tracked. I'll notify you when replies come in.
                      </p>
                    </ChatRow>
                    <p style={{ color: GREEN, fontSize: 13, marginTop: 16, fontWeight: 600 }}>
                      Done in 30 seconds. Now handle the exceptions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Divider />

          {/* Bulk Communication */}
          <Section style={{ marginTop: 80, marginBottom: 80 }}>
            <div style={maxW}>
              <SectionHeading
                eyebrow="Bulk communication"
                headline={<>8 status checks, 4 document chasers,<br />5 follow-ups. <span style={{ color: GREEN }}>One sentence.</span></>}
                sub="Your minion sends, tracks, and auto-follows-up. You only step in when something goes wrong."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                  <ChatRow role="user" style={{ marginBottom: 20 }}>
                    <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
                      Send a status request to every vendor with an open order. Follow up tomorrow if no reply.
                    </p>
                  </ChatRow>
                  <ChatRow role="ai" seed="ops-check">
                    <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 14px" }}>Sending to 18 vendors...</p>
                    <CarrierDots count={18} />
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", fontSize: 12 }}>
                      <span style={{ background: "rgba(0,171,85,0.12)", color: GREEN, borderRadius: 99, padding: "3px 10px", fontWeight: 500 }}>✓ 18 sent</span>
                      <span style={{ background: "rgba(255,255,255,0.05)", color: MUTED, borderRadius: 99, padding: "3px 10px" }}>Auto follow-up: tomorrow</span>
                    </div>
                  </ChatRow>
                </div>
                <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.15)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 20px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Response tracker</p>
                    <ProgressTracker total={18} label="Vendor responses" />
                  </div>
                  <div style={{ marginTop: 28 }}>
                    {[
                      "Follow-ups auto-cancel when they reply",
                      "Delays and exceptions flagged immediately",
                      "You only see what needs your attention",
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

          {/* Exception Management */}
          <Section style={{ marginTop: 80, marginBottom: 80 }}>
            <div style={maxW}>
              <SectionHeading
                eyebrow="Exception management"
                headline={<>Your minion handles the routine.<br /><span style={{ color: GREEN }}>You handle the fires.</span></>}
                sub="Set alerts in plain English. Get texted when something actually needs you: delays, missed deadlines, escalations."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                    <ChatRow role="user" style={{ marginBottom: 14 }}>
                      <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>Alert me if any supplier mentions a delay, shortage, or backorder.</p>
                    </ChatRow>
                    <ChatRow role="ai" seed="ops-alert">
                      <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500 }}>✓ Alert set. I'll text you immediately when any of those are mentioned.</p>
                    </ChatRow>
                  </div>
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                    <ChatRow role="user" style={{ marginBottom: 14 }}>
                      <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Every morning at 7am, brief me on overnight issues, open orders, and anything that needs my attention.</p>
                    </ChatRow>
                    <ChatRow role="ai" seed="ops-brief">
                      <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500 }}>Scheduled. You'll get your ops briefing at 7am every morning.</p>
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
                      <span style={{ background: "rgba(0,171,85,0.1)", color: GREEN, fontSize: 11, borderRadius: 99, padding: "3px 10px", fontWeight: 500 }}>5 items</span>
                    </div>
                    {[
                      { icon: "📦", title: "8 open orders awaiting updates", detail: "6 on track · 2 no response in 3 days", kind: "default" as const },
                      { icon: "⚠️", title: "Midwest Steel: delay on PO #4401", detail: "Pushed 1 day · new ETA: Friday", kind: "warn" as const },
                      { icon: "📎", title: "4 unsigned contracts outstanding", detail: "Reminders sent, 1 signed overnight", kind: "default" as const },
                      { icon: "✅", title: "GlobalTech confirmed shipment", detail: "PO #4420 · ETA Thursday 2pm", kind: "success" as const },
                      { icon: "📋", title: "5 emails unanswered from last week", detail: "Follow-ups queued for this morning", kind: "default" as const },
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

          <Section style={{ marginTop: 80, marginBottom: 80, maxWidth: 720, margin: "120px auto" }}>
            <FAQ />
          </Section>

          <FinalCTA
            headline={<>You're going to send those<br />same emails again tomorrow.<br /><span style={{ color: GREEN }}>Or your minion could.</span></>}
              sub="Connect your inbox in 30 seconds. Your minion reads everything, never forgets, and starts working immediately."
          />
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default Operations;

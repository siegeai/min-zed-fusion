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

const SALES_PROMPTS: PromptItem[] = [
  {
    text: "Draft a follow-up to every prospect who went silent in the last 14 days.",
    label: "Re-engagement",
    response: {
      headline: "✓ 9 follow-ups drafted",
      rows: [["Apex Corp · $48K pipeline", "Personalized follow-up drafted"], ["Meridian Inc · $32K pipeline", "Personalized follow-up drafted"], ["Summit Group · $65K pipeline", "Personalized follow-up drafted"], ["…and 6 more", "Ready to review & send"]],
    },
  },
  {
    text: "What's happened with the Apex Corp account in the last 30 days?",
    label: "Account intel",
    response: {
      headline: "Apex Corp: 30 day summary",
      rows: [["Last contact", "Feb 12, they asked for updated pricing"], ["Open proposal", "$48K · sent Jan 28 · no response"], ["Sentiment", "Warm, asked questions, hasn't said no"], ["Key contact", "Sarah Chen · VP Procurement"]],
    },
  },
  {
    text: "Send a personalized intro email to these 20 leads from the conference list.",
    label: "Outreach blast",
    response: {
      headline: "✓ 20 personalized intros drafted",
      rows: [["Template", "Conference intro, customized per company"], ["Personalization", "Company name, role, talking points"], ["Status", "20 of 20 ready to send"], ["Follow-up", "Auto in 3 days if no reply"]],
    },
  },
  {
    text: "Which deals in my pipeline haven't had activity in 2+ weeks?",
    label: "Pipeline hygiene",
    response: {
      headline: "5 stale deals found",
      rows: [["Apex Corp", "$48K · silent 16 days"], ["Valley Industries", "$28K · silent 21 days"], ["NorthStar Inc", "$52K · silent 14 days"], ["Beacon Group", "$19K · silent 18 days"], ["Crestline Co", "$35K · silent 22 days"]],
    },
  },
  {
    text: "Summarize my biggest open opportunities and what each needs to close.",
    label: "Deal status",
    response: {
      headline: "Top 4 deals: $197K total",
      rows: [["Summit Group · $65K", "Waiting on legal review of contract"], ["NorthStar Inc · $52K", "Need to schedule exec alignment call"], ["Apex Corp · $48K", "Send updated pricing per their request"], ["Meridian Inc · $32K", "Follow up, champion went quiet"]],
    },
  },
  {
    text: "Draft a proposal response for the Meridian RFP. Use our standard pricing and their requirements from the email thread.",
    label: "RFP response",
    response: {
      headline: "✓ Proposal drafted",
      rows: [["Client", "Meridian Inc · RFP-2024-087"], ["Pricing", "Standard tier + volume discount"], ["Requirements", "Pulled from email thread · 12 items"], ["Status", "Draft ready for your review"]],
    },
  },
  {
    text: "What's my win rate this quarter vs. last quarter?",
    label: "Performance",
    response: {
      headline: "Win rate comparison",
      rows: [["This quarter", "34% (17 of 50 opportunities)"], ["Last quarter", "28% (14 of 50 opportunities)"], ["Improvement", "+6 points · trending up"], ["Avg deal size", "$38K vs $31K last quarter"]],
    },
  },
  {
    text: "Find every email where a prospect mentioned a competitor by name.",
    label: "Competitive intel",
    response: {
      headline: "7 competitor mentions found",
      rows: [["Apex Corp", "Mentioned evaluating Vendor X · Feb 8"], ["Summit Group", "Said Vendor Y quoted 15% lower · Jan 22"], ["Beacon Group", "Currently using Vendor Z · Jan 15"], ["Valley Industries", "Comparing us vs Vendor X · Feb 1"]],
    },
  },
];

const maxW: React.CSSProperties = { maxWidth: 960, margin: "0 auto" };

const Sales = () => (
  <>
    <Helmet>
      <title>min. for Sales | Your inbox knows more than your CRM</title>
      <meta name="description" content="Your inbox has every conversation, objection, and buying signal. Your CRM has what someone logged. Your minion reads your email and gives you account intel, competitive intel, and pipeline visibility, instantly." />
      <link rel="canonical" href="https://getmin.ai/teams/sales" />
      <meta property="og:title" content="min. for Sales | Your inbox knows more than your CRM" />
      <meta property="og:description" content="Every objection, competitor mention, and buying signal is in your email. Your minion reads it all." />
    </Helmet>

    <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT, overflowX: "hidden" }}>
      <Header />
      <main style={{ paddingTop: 100 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

          <div className="hero-glow" style={{ paddingTop: 48, marginBottom: 120 }}>
            <div style={{ textAlign: "center", marginBottom: 56, position: "relative", zIndex: 1 }}>
              <p className="hero-stagger-1" style={{ color: GREEN, fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
                For sales teams
              </p>
              <h1 className="hero-stagger-2" style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", color: TEXT, margin: "0 0 20px 0" }}>
                Your inbox knows more<br />than <span style={{ color: GREEN }}>your CRM ever will.</span>
              </h1>
              <p className="hero-stagger-3" style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)", color: MUTED, fontWeight: 400, marginBottom: 40, lineHeight: 1.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                Your minion <MiniMascot size={28} seed="sales-hero" /> remembers every conversation, every deal, every objection. Just ask.
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
              <HeroChatDemo prompts={SALES_PROMPTS} mascotSeed="sales-demo" />
            </div>
          </div>

          <Divider />

          {/* Inbox vs CRM */}
          <Section style={{ marginTop: 120, marginBottom: 120 }}>
            <div style={maxW}>
              <SectionHeading
                eyebrow="The truth about your data"
                headline={<>Your CRM has what reps logged.<br /><span style={{ color: GREEN }}>Your inbox has what actually happened.</span></>}
                sub="Every objection, every competitor mention, every buying signal, every promise. It's all in your email. Your CRM only knows what someone bothered to type in."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div style={{ background: SURFACE, border: "1px solid rgba(239,68,68,0.12)", borderRadius: 16, padding: 28, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(239,68,68,0.04) 0%, transparent 40%)", pointerEvents: "none", borderRadius: 16 }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <span style={{ color: "#EF4444", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: 99, padding: "2px 10px", display: "inline-block", marginBottom: 20 }}>Your CRM</span>
                    {[
                      `Last activity: "Call, left voicemail"`,
                      "Notes: (empty)",
                      `Stage: "Proposal" (hasn't been updated in 3 weeks)`,
                      "Competitor: (not tracked)",
                      "Sentiment: (not tracked)",
                      "Buying signals: (not tracked)",
                    ].map((line, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                        <span style={{ color: "#EF4444", flexShrink: 0, marginTop: 1, fontSize: 13 }}>✗</span>
                        <span style={{ color: MUTED, fontSize: 13, lineHeight: 1.5 }}>{line}</span>
                      </div>
                    ))}
                    <p style={{ color: "#EF4444", fontSize: 13, marginTop: 20, fontWeight: 600 }}>
                      Only as good as whoever last updated it.
                    </p>
                  </div>
                </div>

                <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.2)", borderRadius: 16, padding: 28, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,171,85,0.03) 0%, transparent 40%)", pointerEvents: "none", borderRadius: 16 }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <span style={{ color: GREEN, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "rgba(0,171,85,0.1)", border: "1px solid rgba(0,171,85,0.18)", borderRadius: 99, padding: "2px 10px", display: "inline-block", marginBottom: 20 }}>Your inbox (via your minion)</span>
                    {[
                      "142 emails exchanged, full conversation history",
                      "They asked for updated pricing on Feb 12",
                      "Mentioned evaluating Vendor X on Feb 8",
                      "Sentiment: warm, asking questions, hasn't said no",
                      "Budget approved in Dec, referenced in thread",
                      "Champion went on PTO, back next Monday",
                    ].map((line, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                        <span style={{ color: GREEN, flexShrink: 0, marginTop: 1, fontSize: 13 }}>✓</span>
                        <span style={{ color: MUTED, fontSize: 13, lineHeight: 1.5 }}>{line}</span>
                      </div>
                    ))}
                    <p style={{ color: GREEN, fontSize: 13, marginTop: 20, fontWeight: 600 }}>
                      Always complete. Always current. Zero data entry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Divider />

          {/* Account Intelligence */}
          <Section style={{ marginTop: 120, marginBottom: 120 }}>
            <div style={maxW}>
              <SectionHeading
                eyebrow="Account intelligence"
                headline={<>Ask anything about any account.<br /><span style={{ color: GREEN }}>Your minion read every thread.</span></>}
                sub="Competitor mentions, sentiment, buying signals, key contacts. All extracted from your actual conversations, not a stale CRM record."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                  <ChatRow role="user" style={{ marginBottom: 14 }}>
                    <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>What's happened with the Apex Corp account in the last 30 days?</p>
                  </ChatRow>
                  <ChatRow role="ai" seed="sales-acct">
                    <DataTable rows={[
                      ["Last contact", "Feb 12, asked for updated pricing"],
                      ["Open proposal", "$48K · sent Jan 28 · no response"],
                      ["Sentiment", "Warm, asking questions, hasn't said no"],
                      ["Competitor", "Mentioned evaluating Vendor X on Feb 8"],
                      ["Key contact", "Sarah Chen · VP Procurement"],
                    ]} />
                  </ChatRow>
                </div>
                <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                  <ChatRow role="user" style={{ marginBottom: 14 }}>
                    <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>Find every email where a prospect mentioned a competitor by name.</p>
                  </ChatRow>
                  <ChatRow role="ai" seed="sales-comp">
                    <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, marginBottom: 10 }}>7 competitor mentions found</p>
                    <DataTable rows={[
                      ["Apex Corp", "Evaluating Vendor X · Feb 8"],
                      ["Summit Group", "Vendor Y quoted 15% lower · Jan 22"],
                      ["Beacon Group", "Currently using Vendor Z"],
                      ["Valley Industries", "Comparing us vs Vendor X · Feb 1"],
                    ]} />
                  </ChatRow>
                </div>
              </div>
            </div>
          </Section>

          <Divider />

          {/* Re-engagement & Outreach */}
          <Section style={{ marginTop: 120, marginBottom: 120 }}>
            <div style={maxW}>
              <SectionHeading
                eyebrow="Outreach & re-engagement"
                headline={<>Cold prospects. Stale deals.<br /><span style={{ color: GREEN }}>Warm them up in one sentence.</span></>}
                sub="Personalized follow-ups, conference outreach, and win-back campaigns, each customized by your minion."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div style={{ background: SURFACE, border: "1px solid rgba(239,68,68,0.12)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(239,68,68,0.04) 0%, transparent 40%)", pointerEvents: "none", borderRadius: 16 }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <span style={{ color: "#EF4444", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: 99, padding: "2px 10px", display: "inline-block", marginBottom: 16 }}>The reality</span>
                    {[
                      { item: "9 prospects went silent in the last 2 weeks", kind: "bad" },
                      { item: "5 deals stale with no activity for 14+ days", kind: "bad" },
                      { item: "20 conference leads still haven't been contacted", kind: "bad" },
                      { item: "3 accounts evaluating competitors, no response", kind: "bad" },
                    ].map((row, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                        <span style={{ color: "#EF4444", flexShrink: 0, marginTop: 1, fontSize: 13 }}>✗</span>
                        <span style={{ color: MUTED, fontSize: 13, lineHeight: 1.5 }}>{row.item}</span>
                      </div>
                    ))}
                    <p style={{ color: "#EF4444", fontSize: 13, marginTop: 16, fontWeight: 600 }}>
                      Every day you wait, deals go colder.
                    </p>
                  </div>
                </div>

                <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.2)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,171,85,0.03) 0%, transparent 40%)", pointerEvents: "none", borderRadius: 16 }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <span style={{ color: GREEN, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "rgba(0,171,85,0.1)", border: "1px solid rgba(0,171,85,0.18)", borderRadius: 99, padding: "2px 10px", display: "inline-block", marginBottom: 16 }}>With your minion</span>
                    <ChatRow role="user" style={{ marginBottom: 14 }}>
                      <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Follow up with every prospect that went quiet. Personalize each one based on our last conversation.</p>
                    </ChatRow>
                    <ChatRow role="ai" seed="sales-reengage">
                      <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500, lineHeight: 1.6 }}>
                        ✓ 9 personalized follow-ups drafted<br />
                        Each references your last conversation topic.<br />
                        Ready to review & send.
                      </p>
                    </ChatRow>
                    <p style={{ color: GREEN, fontSize: 13, marginTop: 16, fontWeight: 600 }}>
                      One sentence. Nine conversations re-opened.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Divider />

          {/* Pipeline & Proposals */}
          <Section style={{ marginTop: 120, marginBottom: 120 }}>
            <div style={maxW}>
              <SectionHeading
                eyebrow="Pipeline & proposals"
                headline={<>Know where every deal stands.<br /><span style={{ color: GREEN }}>From what actually happened, not what got logged.</span></>}
                sub="Your minion builds pipeline context from real conversations: stale deals, next steps, blockers. Not CRM fields nobody updates."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                    <ChatRow role="user" style={{ marginBottom: 14 }}>
                      <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Summarize my biggest open opportunities and what each needs to close.</p>
                    </ChatRow>
                    <ChatRow role="ai" seed="sales-pipe">
                      <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, marginBottom: 10 }}>Top 4 deals: $197K total</p>
                      <DataTable rows={[
                        ["Summit Group · $65K", "Waiting on legal review"],
                        ["NorthStar · $52K", "Need exec alignment call"],
                        ["Apex Corp · $48K", "Send updated pricing"],
                        ["Meridian · $32K", "Champion went quiet"],
                      ]} />
                    </ChatRow>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                    <ChatRow role="user" style={{ marginBottom: 14 }}>
                      <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Draft a proposal response for the Meridian RFP using our standard pricing and their requirements from the email thread.</p>
                    </ChatRow>
                    <ChatRow role="ai" seed="sales-rfp">
                      <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500, lineHeight: 1.6 }}>
                        ✓ Proposal drafted<br />
                        Pulled 12 requirements from email thread.<br />
                        Standard pricing + volume discount applied.<br />
                        Ready for your review.
                      </p>
                    </ChatRow>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Divider />

          <Section style={{ marginTop: 120, marginBottom: 120, maxWidth: 720, margin: "120px auto" }}>
            <FAQ />
          </Section>

          <FinalCTA
            headline={<>Your best sales data isn't in your CRM.<br /><span style={{ color: GREEN }}>It's in your inbox. Start using it.</span></>}
            sub="Connect your inbox in 30 seconds. Your minion reads everything and starts working immediately."
          />
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default Sales;

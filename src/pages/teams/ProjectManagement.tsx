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

const MGMT_PROMPTS: PromptItem[] = [
  {
    text: "Give me a morning briefing: revenue, open issues, and anything that needs my attention.",
    label: "Morning brief",
    response: {
      headline: "Morning briefing, Feb 25",
      rows: [["Revenue MTD", "$842K (89% of target)"], ["Open issues", "3 escalations pending response"], ["Won this week", "Summit Group · $65K"], ["Needs you", "2 proposals awaiting exec approval"]],
    },
  },
  {
    text: "How's the team performing this quarter vs. last quarter?",
    label: "Team performance",
    response: {
      headline: "Q1 vs. Q4 comparison",
      rows: [["Revenue", "$2.4M vs $2.1M (+14%)"], ["Win rate", "34% vs 28% (+6 pts)"], ["Avg deal size", "$38K vs $31K (+23%)"], ["Response time", "2.1 hrs vs 3.8 hrs (–45%)"]],
    },
  },
  {
    text: "Which accounts have the most email activity but no closed deal?",
    label: "Pipeline risk",
    response: {
      headline: "5 high-activity, no-close accounts",
      rows: [["Apex Corp", "142 emails · $48K pipeline · 90 days"], ["Valley Industries", "98 emails · $28K pipeline · 75 days"], ["NorthStar Inc", "87 emails · $52K pipeline · 60 days"], ["Beacon Group", "76 emails · $19K pipeline · 45 days"]],
    },
  },
  {
    text: "Send me a weekly digest every Friday at 5pm: wins, losses, pipeline changes, and team metrics.",
    label: "Weekly digest",
    response: {
      headline: "✓ Weekly digest scheduled",
      rows: [["Frequency", "Every Friday at 5:00pm"], ["Includes", "Wins, losses, pipeline delta, team metrics"], ["Delivered to", "eric@company.com"], ["First report", "This Friday"]],
    },
  },
  {
    text: "What are our top 10 accounts by revenue this year?",
    label: "Top accounts",
    response: {
      headline: "Top 10 accounts, 2025 revenue",
      rows: [["#1 Summit Group", "$312K (4 deals)"], ["#2 NorthStar Inc", "$248K (3 deals)"], ["#3 Apex Corp", "$195K (2 deals)"], ["#4 Meridian Inc", "$167K (3 deals)"]],
    },
  },
  {
    text: "How much revenue is at risk from deals stale for more than 2 weeks?",
    label: "At-risk revenue",
    response: {
      headline: "$182K at risk: 5 stale deals",
      rows: [["Apex Corp", "$48K · silent 16 days"], ["Valley Industries", "$28K · silent 21 days"], ["NorthStar Inc", "$52K · silent 14 days"], ["Crestline Co", "$35K · silent 22 days"], ["Beacon Group", "$19K · silent 18 days"]],
    },
  },
  {
    text: "Compare January vs February: revenue, new deals, churn.",
    label: "Month-over-month",
    response: {
      headline: "Jan vs Feb comparison",
      rows: [["Revenue", "$380K vs $462K (+22%)"], ["New deals", "8 vs 12 (+50%)"], ["Churn", "2 accounts vs 1 account"], ["Net expansion", "+$82K MoM"]],
    },
  },
  {
    text: "Alert me if any deal over $50K hasn't had activity in a week.",
    label: "Deal alerts",
    response: {
      headline: "✓ Alert created",
      rows: [["Trigger", "No email activity for 7 days"], ["Filter", "Deals > $50K"], ["Notify via", "Email + SMS"], ["Active", "Continuous monitoring"]],
    },
  },
];

const maxW: React.CSSProperties = { maxWidth: 960, margin: "0 auto" };

const ProjectManagement = () => (
  <>
    <Helmet>
      <title>min. for Project Management | Visibility without the dashboards</title>
      <meta name="description" content="AI for project managers. Morning briefings, pipeline visibility, team performance, and revenue tracking. Ask anything about your business in plain English." />
      <link rel="canonical" href="https://getmin.ai/teams/project-management" />
      <meta property="og:title" content="min. for Project Management | Visibility without the dashboards" />
      <meta property="og:description" content="Revenue, performance, pipeline. Ask in plain English, get real answers." />
    </Helmet>

    <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT, overflowX: "hidden" }}>
      <Header />
      <main style={{ paddingTop: 100 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

          <div className="hero-glow" style={{ paddingTop: 32, marginBottom: 80 }}>
            <div style={{ textAlign: "center", marginBottom: 56, position: "relative", zIndex: 1 }}>
              <p className="hero-stagger-1" style={{ color: GREEN, fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
                For data-driven team leads
              </p>
              <h1 className="hero-stagger-2" style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", color: TEXT, margin: "0 0 20px 0" }}>
                Visibility without<br /><span style={{ color: GREEN }}>the dashboards.</span>
              </h1>
              <p className="hero-stagger-3" style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)", color: MUTED, fontWeight: 400, marginBottom: 40, lineHeight: 1.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                Your minion <MiniMascot size={28} seed="mgmt-hero" /> has already learned your team's performance, pipeline, and numbers. Just ask.
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
              <HeroChatDemo prompts={MGMT_PROMPTS} mascotSeed="mgmt-demo" />
            </div>
          </div>

          <Divider />

          {/* Morning Briefing */}
          <Section style={{ marginTop: 80, marginBottom: 80 }}>
            <div style={maxW}>
              <SectionHeading
                eyebrow="Executive briefing"
                headline={<>Your morning briefing.<br /><span style={{ color: GREEN }}>Before you even open Slack.</span></>}
                sub="Revenue, issues, wins, and what needs your attention. Delivered on your schedule. No dashboards, no digging."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                  <ChatRow role="user" style={{ marginBottom: 14 }}>
                    <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>Give me a morning briefing: revenue, open issues, and anything that needs my attention today.</p>
                  </ChatRow>
                  <ChatRow role="ai" seed="mgmt-brief">
                    <DataTable rows={[
                      ["Revenue MTD", "$842K (89% of target)"],
                      ["Open issues", "3 escalations pending response"],
                      ["Won this week", "Summit Group · $65K"],
                      ["Needs you", "2 proposals awaiting exec approval"],
                      ["Stale deals", "5 deals ($182K) silent 14+ days"],
                    ]} />
                  </ChatRow>
                </div>

                <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.18)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,171,85,0.025) 0%, transparent 50%)", pointerEvents: "none", borderRadius: 16 }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, paddingBottom: 14, borderBottom: `1px solid ${BORDER}` }}>
                      <div>
                        <p style={{ color: TEXT, fontSize: 14, fontWeight: 600, margin: 0 }}>Weekly Digest</p>
                        <p style={{ color: DIM, fontSize: 12, margin: 0 }}>Friday · 5:00pm</p>
                      </div>
                      <span style={{ background: "rgba(0,171,85,0.1)", color: GREEN, fontSize: 11, borderRadius: 99, padding: "3px 10px", fontWeight: 500 }}>Automated</span>
                    </div>
                    {[
                      { icon: "💰", title: "Revenue: $462K (+22% vs Jan)", kind: "success" as const },
                      { icon: "🏆", title: "3 deals won: $145K total", kind: "success" as const },
                      { icon: "📉", title: "1 deal lost: Beacon Group ($19K)", kind: "warn" as const },
                      { icon: "📊", title: "Pipeline grew by $120K net", kind: "success" as const },
                      { icon: "⚡", title: "Team response time improved 45%", kind: "success" as const },
                    ].map((item, i) => (
                      <div key={i} style={{ padding: "10px 12px", borderRadius: 8, marginBottom: 8, background: item.kind === "success" ? "rgba(0,171,85,0.06)" : "rgba(234,179,8,0.05)", border: item.kind === "success" ? "1px solid rgba(0,171,85,0.12)" : "1px solid rgba(234,179,8,0.12)" }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
                          <p style={{ color: item.kind === "success" ? "#6EE7B7" : "#FCD34D", fontSize: 13, fontWeight: 500, margin: 0 }}>{item.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Divider />

          {/* Pipeline Visibility */}
          <Section style={{ marginTop: 80, marginBottom: 80 }}>
            <div style={maxW}>
              <SectionHeading
                eyebrow="Pipeline visibility"
                headline={<>Know where every dollar stands.<br /><span style={{ color: GREEN }}>No exports. No CRM digging.</span></>}
                sub="At-risk revenue, stale deals, top accounts. Your minion learns your business's patterns over time — surfacing the things that matter before you have to go looking for them."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                    <ChatRow role="user" style={{ marginBottom: 14 }}>
                      <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>How much revenue is at risk from deals stale for more than 2 weeks?</p>
                    </ChatRow>
                    <ChatRow role="ai" seed="mgmt-risk">
                      <p style={{ color: "#EF4444", fontSize: 12, fontWeight: 600, marginBottom: 10 }}>$182K at risk: 5 stale deals</p>
                      <DataTable rows={[
                        ["Apex Corp", "$48K · silent 16 days"],
                        ["NorthStar Inc", "$52K · silent 14 days"],
                        ["Crestline Co", "$35K · silent 22 days"],
                        ["Valley Industries", "$28K · silent 21 days"],
                        ["Beacon Group", "$19K · silent 18 days"],
                      ]} />
                    </ChatRow>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                    <ChatRow role="user" style={{ marginBottom: 14 }}>
                      <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Which accounts have the most email activity but no closed deal?</p>
                    </ChatRow>
                    <ChatRow role="ai" seed="mgmt-activity">
                      <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, marginBottom: 10 }}>High-activity, no-close accounts</p>
                      <DataTable rows={[
                        ["Apex Corp", "142 emails · $48K · 90 days"],
                        ["Valley Industries", "98 emails · $28K · 75 days"],
                        ["NorthStar Inc", "87 emails · $52K · 60 days"],
                        ["Beacon Group", "76 emails · $19K · 45 days"],
                      ]} />
                    </ChatRow>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Divider />

          {/* Comparisons & Trends */}
          <Section style={{ marginTop: 80, marginBottom: 80 }}>
            <div style={maxW}>
              <SectionHeading
                eyebrow="Comparisons & trends"
                headline={<>Ask any business question.<br /><span style={{ color: GREEN }}>In plain English.</span></>}
                sub="Quarter-over-quarter, month-over-month, team-by-team. Your minion turns email data into answers."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                  <ChatRow role="user" style={{ marginBottom: 14 }}>
                    <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>How's the team performing this quarter vs. last quarter?</p>
                  </ChatRow>
                  <ChatRow role="ai" seed="mgmt-qoq">
                    <DataTable rows={[
                      ["Revenue", "$2.4M vs $2.1M (+14%)"],
                      ["Win rate", "34% vs 28% (+6 pts)"],
                      ["Avg deal size", "$38K vs $31K (+23%)"],
                      ["Response time", "2.1 hrs vs 3.8 hrs (–45%)"],
                    ]} />
                  </ChatRow>
                </div>
                <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                  <ChatRow role="user" style={{ marginBottom: 14 }}>
                    <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Compare January vs February: revenue, new deals, churn.</p>
                  </ChatRow>
                  <ChatRow role="ai" seed="mgmt-mom">
                    <DataTable rows={[
                      ["Revenue", "$380K vs $462K (+22%)"],
                      ["New deals", "8 vs 12 (+50%)"],
                      ["Churn", "2 accounts vs 1 account"],
                      ["Net expansion", "+$82K MoM"],
                    ]} />
                  </ChatRow>
                </div>
              </div>
            </div>
          </Section>

          <Divider />

          <Section style={{ marginTop: 80, marginBottom: 80, maxWidth: 720, margin: "120px auto" }}>
            <FAQ />
          </Section>

          <FinalCTA
              headline={<>The numbers are in your email.<br /><span style={{ color: GREEN }}>Your minion never forgets them.</span></>}
              sub="Connect your inbox in 30 seconds. Total recall of every email, ready when you need it."
          />
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default ProjectManagement;

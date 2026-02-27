import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import MiniMascot from "@/components/MiniMascot";
import Footer from "@/components/Footer";
import {
  BG, SURFACE, GREEN, BORDER, TEXT, MUTED,
  Section, Divider, SectionHeading, FinalCTA,
} from "@/components/LandingShared";

const ALL_FEATURES = [
  {
    title: "Automatic Follow-Ups",
    desc: "Tell your minion to follow up on any email thread, on any cadence. Auto-cancels when the recipient replies or you jump in. Pending follow-ups visible in the Task tab.",
    to: "/features/follow-ups",
    seed: "feat-followup",
  },
  {
    title: "Alerts in Plain English",
    desc: "Set conditions in plain English — \"text me if any carrier mentions a delay overnight\" — and your minion texts you when it triggers. Real-time monitoring of your inbox.",
    to: "/features/alerts",
    seed: "feat-alerts",
  },
  {
    title: "Smart Contact Classification",
    desc: "Your minion auto-classifies every contact as customer, carrier, vendor, or noise based on conversation history. No manual tagging required.",
    to: "/features/contacts",
    seed: "feat-contacts",
  },
  {
    title: "Task Tracking",
    desc: "When you ask your minion to do something — like an email blast — it auto-creates a task to track progress. Each task runs in its own dedicated chat window.",
    to: "/features/tasks",
    seed: "feat-tasks",
  },
  {
    title: "Email Attachments & Rich Formatting",
    desc: "Your minion can attach files directly to outgoing emails, auto-size tables to content, and embed images or GIFs inline. Professional emails, effortlessly.",
    to: "/features/email",
    seed: "feat-email",
  },
  {
    title: "Custom Minion Instructions",
    desc: "Each minion can have its own standing rules — \"always be concise\", \"answer in formal tone\", \"reply in rhymes\". Personalize how your minion communicates.",
    to: "/features/instructions",
    seed: "feat-instructions",
  },
];

const Features = () => (
  <>
    <Helmet>
      <title>Features | min.</title>
      <meta name="description" content="Explore all min. features — automatic follow-ups, plain English alerts, smart contact classification, task tracking, email power, and custom instructions." />
      <link rel="canonical" href="https://getmin.ai/features" />
    </Helmet>

    <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT, overflowX: "hidden" }}>
      <Header />

      <main style={{ paddingTop: 100 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

          <div className="hero-glow" style={{ paddingTop: 48, marginBottom: 80 }}>
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <p className="hero-stagger-1" style={{ color: GREEN, fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
                Features
              </p>
              <h1
                className="hero-stagger-2"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.03em", color: TEXT, margin: "0 0 20px 0" }}
              >
                Everything your minion<br />
                <span style={{ color: GREEN }}>can do for you.</span>
              </h1>
              <p className="hero-stagger-3" style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: MUTED, fontWeight: 400, marginBottom: 0, lineHeight: 1.5 }}>
                Built for people who live in email. Every feature works in plain English.
              </p>
            </div>
          </div>

          <Divider />

          <Section style={{ marginTop: 80, marginBottom: 120 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ maxWidth: 1000, margin: "0 auto" }}>
              {ALL_FEATURES.map((f) => (
                <Link key={f.to} to={f.to} style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      background: SURFACE,
                      border: `1px solid ${BORDER}`,
                      borderRadius: 20,
                      padding: 28,
                      height: "100%",
                      transition: "border-color 0.3s ease, transform 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,171,85,0.3)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = BORDER;
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div style={{ marginBottom: 16 }}>
                      <MiniMascot size={40} seed={f.seed} />
                    </div>
                    <h3 style={{ color: TEXT, fontSize: 17, fontWeight: 600, marginBottom: 10, lineHeight: 1.3 }}>
                      {f.title}
                    </h3>
                    <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6, margin: "0 0 16px" }}>
                      {f.desc}
                    </p>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: GREEN, fontSize: 14, fontWeight: 500 }}>
                      Learn more <ArrowRight style={{ width: 14, height: 14 }} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Section>

          <Divider />

          <SectionHeading
            eyebrow="See it in action"
            headline={<>Built for logistics teams<br /><span style={{ color: GREEN }}>who live in email.</span></>}
            sub="Whether you're a broker, shipper, or 3PL — your minion speaks your language."
          />

          <Section style={{ marginBottom: 120 }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ maxWidth: 960, margin: "0 auto" }}>
              {[
                { label: "For Brokers", to: "/brokers", seed: "nav-freight" },
                { label: "For Shippers", to: "/shippers", seed: "nav-shipper" },
                { label: "For 3PLs", to: "/3pl", seed: "nav-3pl" },
              ].map((a) => (
                <Link key={a.to} to={a.to} style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      background: SURFACE,
                      border: `1px solid ${BORDER}`,
                      borderRadius: 16,
                      padding: "28px 24px",
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      transition: "border-color 0.3s ease, transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,171,85,0.3)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = BORDER;
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <MiniMascot size={40} seed={a.seed} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ color: TEXT, fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{a.label}</h3>
                      <span style={{ color: GREEN, fontSize: 13 }}>See use cases →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Section>

          <FinalCTA
            headline={<>Ready to put your minion<br /><span style={{ color: GREEN }}>to work?</span></>}
            sub="Connect your inbox in 30 seconds. Your minion starts working immediately."
          />
        </div>
      </main>

      <Footer />
    </div>
  </>
);

export default Features;

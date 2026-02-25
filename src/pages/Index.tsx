import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import HeroChatDemo from "@/components/HeroChatDemo";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

// ─── Scroll-reveal hook ────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null!);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Shared style tokens ──────────────────────────────────────────────────
const BG = "#161C24";
const SURFACE = "#1E2630";
const GREEN = "#00AB55";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#F9FAFB";
const MUTED = "#9CA3AF";
const DIM = "#6B7280";

// ─── Mock chat message row ──────────────────────────────────────────────
const ChatRow = ({
  role,
  children,
  style,
}: {
  role: "user" | "ai";
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      ...style,
    }}
  >
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: role === "user" ? GREEN : "rgba(0,171,85,0.12)",
        border: role === "ai" ? "1px solid rgba(0,171,85,0.28)" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 700,
        color: role === "user" ? "white" : GREEN,
        flexShrink: 0,
        letterSpacing: "-0.01em",
      }}
    >
      {role === "user" ? "You" : "m"}
    </div>
    <div style={{ flex: 1, paddingTop: 3 }}>{children}</div>
  </div>
);

// ─── Mock data table with optional header ─────────────────────────────
const DataTable = ({
  rows,
  hasHeader = false,
}: {
  rows: [string, string, string?][];
  hasHeader?: boolean;
}) => (
  <div
    style={{
      background: "rgba(0,0,0,0.25)",
      borderRadius: 8,
      border: "1px solid rgba(255,255,255,0.05)",
      overflow: "hidden",
      marginTop: 10,
    }}
  >
    {rows.map(([col1, col2, col3], i) => {
      const isHeader = hasHeader && i === 0;
      return (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: col3 ? "1fr 1fr 1fr" : "1fr 1fr",
            padding: isHeader ? "6px 12px" : "7px 12px",
            borderBottom:
              i < rows.length - 1
                ? "1px solid rgba(255,255,255,0.05)"
                : "none",
            gap: 8,
            background: isHeader ? "rgba(255,255,255,0.03)" : "transparent",
          }}
        >
          <span style={{ color: isHeader ? MUTED : DIM, fontSize: isHeader ? 11 : 12, fontWeight: isHeader ? 600 : 400, textTransform: isHeader ? "uppercase" : "none", letterSpacing: isHeader ? "0.04em" : "normal" }}>
            {col1}
          </span>
          <span style={{ color: isHeader ? MUTED : "#E5E7EB", fontSize: isHeader ? 11 : 12, fontWeight: isHeader ? 600 : 400, textTransform: isHeader ? "uppercase" : "none", letterSpacing: isHeader ? "0.04em" : "normal" }}>
            {col2}
          </span>
          {col3 && (
            <span style={{ color: isHeader ? MUTED : GREEN, fontSize: isHeader ? 11 : 12, textAlign: "right", fontWeight: isHeader ? 600 : 400, textTransform: isHeader ? "uppercase" : "none", letterSpacing: isHeader ? "0.04em" : "normal" }}>
              {col3}
            </span>
          )}
        </div>
      );
    })}
  </div>
);

// ─── Section wrapper (scroll-reveal) ───────────────────────────────────
const Section = ({
  children,
  style,
  className,
  id,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
}) => {
  const { ref, visible } = useScrollReveal();
  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
        ...style,
      }}
    >
      {children}
    </section>
  );
};

// ─── Gradient section divider ─────────────────────────────────────────
const Divider = () => <div className="section-divider" style={{ marginTop: 0, marginBottom: 0 }} />;

// ─── Progress bar component ────────────────────────────────────────────
const ProgressTracker = () => {
  const { ref, visible } = useScrollReveal(0.3);
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (!visible) return;
    const steps = [3, 6, 8, 11, 12, 15, 16, 18];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < steps.length) setCount(steps[i]);
      else clearInterval(interval);
    }, 500);
    return () => clearInterval(interval);
  }, [visible]);

  const pct = Math.round((count / 36) * 100);

  return (
    <div ref={ref} style={{ marginTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ color: MUTED, fontSize: 13 }}>Carrier responses</span>
        <span style={{ color: TEXT, fontSize: 22, fontWeight: 700, fontVariantNumeric: "tabular-nums", transition: "all 0.35s ease" }}>
          {count}
          <span style={{ color: DIM, fontSize: 16, fontWeight: 400 }}> / 36</span>
        </span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 6, overflow: "hidden" }}>
        <div style={{ height: "100%", background: `linear-gradient(90deg, ${GREEN}, #34D399)`, borderRadius: 99, width: `${pct}%`, transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <span style={{ color: DIM, fontSize: 12 }}>
          Auto follow-ups pending: {Math.max(0, 36 - count)}
        </span>
        {count >= 18 && (
          <span style={{ color: GREEN, fontSize: 12, animation: "slide-up-fade 0.4s ease forwards" }}>
            ✓ Done while you slept
          </span>
        )}
      </div>
    </div>
  );
};

// ─── Animated carrier dot grid ────────────────────────────────────────
const CarrierDots = () => {
  const { ref, visible } = useScrollReveal(0.3);
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i <= 36) setFilled(i);
      else clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <div
      ref={ref}
      style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 6, marginBottom: 16 }}
    >
      {Array.from({ length: 36 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: "100%",
            aspectRatio: "1",
            borderRadius: "50%",
            background: i < filled
              ? i < 18
                ? GREEN
                : "rgba(0,171,85,0.35)"
              : "rgba(255,255,255,0.06)",
            border: i < filled && i < 18 ? "none" : "1px solid rgba(255,255,255,0.06)",
            transition: "background 0.25s ease, border 0.25s ease",
            boxShadow: i < filled && i < 18 ? `0 0 6px rgba(0,171,85,0.25)` : "none",
          }}
        />
      ))}
    </div>
  );
};

// ─── Section heading helper ───────────────────────────────────────────
const SectionHeading = ({
  eyebrow,
  headline,
  sub,
}: {
  eyebrow: string;
  headline: React.ReactNode;
  sub: string;
}) => (
  <>
    <p style={{ color: GREEN, fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center", marginBottom: 16 }}>
      {eyebrow}
    </p>
    <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", fontWeight: 700, letterSpacing: "-0.025em", textAlign: "center", marginBottom: 14, lineHeight: 1.2 }}>
      {headline}
    </h2>
    <p style={{ color: MUTED, textAlign: "center", fontSize: "1.05rem", marginBottom: 52, lineHeight: 1.6, maxWidth: 560, margin: "0 auto 52px" }}>
      {sub}
    </p>
  </>
);

// ─── Main page ─────────────────────────────────────────────────────────
const Index = () => {
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

  const structuredData = {
    "@context": "https://schema.org", "@type": "WebPage",
    name: "min. - Your rate assistant with perfect recall",
    description: "A quoting assistant with perfect recall for freight brokers. All your quotes, centralized. Quote more, win more—delegate carrier blasts, rate lookups, and track-and-trace to your minion.",
    url: "https://getmin.ai",
    mainEntity: {
      "@type": "SoftwareApplication", name: "min.", applicationCategory: "BusinessApplication", operatingSystem: "Web",
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "127" },
      featureList: [
        "Quote lookup and perfect recall from your inbox",
        "Carrier outreach and quote requests in plain English",
        "Load tracking and ETA updates",
        "Ops digests and team collaboration",
        "One shared agent and carrier network",
      ],
    },
  };

  const organizationData = {
    "@context": "https://schema.org", "@type": "Organization",
    name: "min.", url: "https://getmin.ai",
    logo: "https://app.getmin.ai/lovable-uploads/7a37e7bc-ff2e-4686-ab5e-b539c538ad30.png",
    sameAs: ["https://twitter.com/getminai", "https://linkedin.com/company/getmin"],
    contactPoint: { "@type": "ContactPoint", contactType: "Customer Support", email: "support@getmin.ai" },
  };

  const faqData = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does min. work?", acceptedAnswer: { "@type": "Answer", text: "Connect your inbox to your minion. You tell it what you need in plain English—carrier blasts, rate lookups, track and trace. It pulls quotes and context from your emails and handles the grunt work so you can focus on winning loads." } },
      { "@type": "Question", name: "What can I ask my minion to do?", acceptedAnswer: { "@type": "Answer", text: "Ask for carriers that run a lane, average booked and quoted rates, email blasts to your carrier list, status updates on active loads, load confirmations, and ops digests." } },
      { "@type": "Question", name: "Does it work with my email?", acceptedAnswer: { "@type": "Answer", text: "Yes. min. connects to Gmail or Outlook and works with your existing inbox. Your minion can send and organize on your behalf." } },
      { "@type": "Question", name: "What about privacy and security?", acceptedAnswer: { "@type": "Answer", text: "We're Google CASA Tier 1 compliant. Your emails and quotes are encrypted. We never train models on your inbox or share your information with third parties." } },
    ],
  };

  const maxW: React.CSSProperties = { maxWidth: 960, margin: "0 auto" };

  return (
    <>
      <Helmet>
        <title>min. | Stop re-reading your emails</title>
        <meta name="description" content="A quoting assistant with perfect recall for freight brokers. Ask in plain English — rates, carriers, load status, overnight briefings. Your minion reads every email so you don't have to." />
        <meta name="keywords" content="freight broker, quoting assistant, rate capture, carrier outreach, load tracking, freight quoting, logistics assistant, minion" />
        <link rel="canonical" href="https://getmin.ai" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getmin.ai/" />
        <meta property="og:title" content="min. | Stop re-reading your emails" />
        <meta property="og:description" content="Ask your minion. It already read them." />
        <meta property="og:site_name" content="min." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="min. | Stop re-reading your emails" />
        <meta name="twitter:description" content="Ask your minion. It already read them." />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(organizationData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqData)}</script>
      </Helmet>

      <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT, overflowX: "hidden" }}>
        <Header />

        <main style={{ paddingTop: 100 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

            {/* ═══════════════════════════════════════════════════════════════
                Section 1: Hero
            ═══════════════════════════════════════════════════════════════ */}
            <div className="hero-glow" style={{ paddingTop: 48, marginBottom: 120 }}>
              <div style={{ textAlign: "center", marginBottom: 56, position: "relative", zIndex: 1 }}>
                <p className="hero-stagger-1" style={{ color: GREEN, fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
                  Freight AI that actually does things for you
                </p>
                <h1
                  className="hero-stagger-2"
                  style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", color: TEXT, margin: "0 0 20px 0" }}
                >
                  Stop re-reading<br />
                  <span style={{ color: GREEN }}>your emails.</span>
                </h1>
                <p className="hero-stagger-3" style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)", color: MUTED, fontWeight: 400, marginBottom: 40, lineHeight: 1.5 }}>
                  Your minion already read them.
                </p>
                <div className="hero-stagger-4">
                  <a href="https://app.getmin.ai/">
                    <Button
                      size="lg"
                      className="cta-glow text-white font-normal text-base px-8"
                      style={{ backgroundColor: GREEN, border: "none" }}
                    >
                      Try for free
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>

              <div className="hero-stagger-5" style={{ position: "relative", zIndex: 1 }}>
                <HeroChatDemo />
              </div>

              <div
                className="hero-stagger-5"
                style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 32, position: "relative", zIndex: 1 }}
              >
                {["Rate lookups", "Carrier blasts", "Track & trace", "Overnight alerts", "Customer outreach", "Morning briefings"].map((label) => (
                  <span
                    key={label}
                    style={{ color: DIM, fontSize: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 99, padding: "5px 14px" }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <Divider />

            {/* ═══════════════════════════════════════════════════════════════
                Section 2: The Re-Read Loop
            ═══════════════════════════════════════════════════════════════ */}
            <Section style={{ marginTop: 120, marginBottom: 120 }} id="features">
              <div style={maxW}>
                <SectionHeading
                  eyebrow="The re-read loop"
                  headline={<>You already know the answer<br />is in your inbox.</>}
                  sub="You just can't find it fast enough."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Before */}
                  <div
                    style={{
                      background: SURFACE,
                      border: "1px solid rgba(239,68,68,0.12)",
                      borderRadius: 16,
                      padding: 24,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Red gradient overlay for pain */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(239,68,68,0.04) 0%, transparent 40%)", pointerEvents: "none", borderRadius: 16 }} />

                    <div style={{ position: "relative", zIndex: 1 }}>
                      <span style={{ color: "#EF4444", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: 99, padding: "2px 10px", display: "inline-block", marginBottom: 16 }}>
                        Before
                      </span>

                      <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "7px 12px", display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <span style={{ color: DIM, fontSize: 13 }}>🔍</span>
                        <span style={{ color: DIM, fontSize: 13 }}>chicago to atlanta rate...</span>
                      </div>

                      {[
                        { from: "carriers@xpo.com", subj: "Re: Rate Request — FTL Dry Van", time: "Tue 2:14pm" },
                        { from: "ops@stglogistics.com", subj: "Rate Quote — Chicago/Atlanta", time: "Tue 11:42am" },
                        { from: "quotes@werner.com", subj: "FW: Lane pricing inquiry", time: "Mon 4:01pm" },
                        { from: "dispatch@jbhunt.com", subj: "Re: Rate — Chi to ATL w/e", time: "Mon 9:17am" },
                        { from: "info@schneider.com", subj: "Rate quote attached", time: "Fri 3:55pm" },
                      ].map((row, i) => (
                        <div
                          key={i}
                          style={{
                            padding: "8px 10px", borderRadius: 6, marginBottom: 3,
                            background: i === 1 ? "rgba(0,171,85,0.05)" : "transparent",
                            border: i === 1 ? "1px solid rgba(0,171,85,0.1)" : "1px solid transparent",
                            filter: i > 2 ? `blur(${i > 3 ? 2.5 : 1.5}px)` : "none",
                            opacity: i > 3 ? 0.3 : 1,
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                            <span style={{ color: i < 2 ? TEXT : MUTED, fontSize: 12, fontWeight: i < 2 ? 600 : 400 }}>{row.from}</span>
                            <span style={{ color: DIM, fontSize: 11 }}>{row.time}</span>
                          </div>
                          <span style={{ color: MUTED, fontSize: 12 }}>{row.subj}</span>
                        </div>
                      ))}

                      <p style={{ color: "#EF4444", fontSize: 12, marginTop: 16, fontStyle: "italic", lineHeight: 1.6, opacity: 0.7 }}>
                        Ctrl+F... scroll... not this one... scroll... which one had the rate?
                      </p>
                    </div>
                  </div>

                  {/* After */}
                  <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.2)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,171,85,0.03) 0%, transparent 40%)", pointerEvents: "none", borderRadius: 16 }} />

                    <div style={{ position: "relative", zIndex: 1 }}>
                      <span style={{ color: GREEN, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "rgba(0,171,85,0.1)", border: "1px solid rgba(0,171,85,0.18)", borderRadius: 99, padding: "2px 10px", display: "inline-block", marginBottom: 16 }}>
                        After
                      </span>

                      <ChatRow role="user" style={{ marginBottom: 16 }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
                          What was our average booked rate for FTL reefer Toronto to Ohio in the last 30 days?
                        </p>
                      </ChatRow>

                      <ChatRow role="ai">
                        <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>
                          Average booked rate: $3,840 across 7 loads
                        </p>
                        <DataTable
                          hasHeader
                          rows={[
                            ["Carrier", "Rate", "vs avg"],
                            ["STG Logistics", "$3,620", "↓ below"],
                            ["Schneider", "$3,900", "↑ above"],
                            ["Werner Ent.", "$3,840", "= avg"],
                            ["XPO Logistics", "$4,010", "↑ above"],
                          ]}
                        />
                      </ChatRow>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Divider />

            {/* ═══════════════════════════════════════════════════════════════
                Section 3: Extracts Everything
            ═══════════════════════════════════════════════════════════════ */}
            <Section style={{ marginTop: 120, marginBottom: 120 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="The extraction ritual"
                  headline={<>It reads every email.<br />Extracts every number.<br /><span style={{ color: GREEN }}>Remembers everything.</span></>}
                  sub="No more copy-pasting rates into spreadsheets. Every quote that arrives is automatically parsed, structured, and ready to query."
                />

                {/* Email → Extracted fields */}
                <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-5" style={{ marginBottom: 48 }}>
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 22 }}>
                    <p style={{ color: DIM, fontSize: 11, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>Incoming email</p>
                    <p style={{ color: MUTED, fontSize: 12, fontWeight: 600, marginBottom: 4 }}>From: dispatch@stglogistics.com</p>
                    <p style={{ color: MUTED, fontSize: 12, marginBottom: 14 }}>Subject: Re: Rate Quote — FTL Dry Van</p>
                    <p style={{ color: TEXT, fontSize: 13, lineHeight: 1.75 }}>
                      Hi, following up on your request. We can do{" "}
                      <span style={{ background: "rgba(0,171,85,0.18)", borderRadius: 3, padding: "1px 5px", color: "#6EE7B7" }}>$2,200</span>{" "}
                      for{" "}
                      <span style={{ background: "rgba(0,171,85,0.18)", borderRadius: 3, padding: "1px 5px", color: "#6EE7B7" }}>FTL dry van Chicago → Atlanta</span>,{" "}
                      pickup{" "}
                      <span style={{ background: "rgba(0,171,85,0.18)", borderRadius: 3, padding: "1px 5px", color: "#6EE7B7" }}>Thursday 8am–12pm</span>.{" "}
                      Let me know if you want to proceed.
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(0,171,85,0.1)", border: "1px solid rgba(0,171,85,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: GREEN, fontSize: 16 }}>→</div>
                    <span style={{ color: DIM, fontSize: 11 }}>auto</span>
                  </div>

                  <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.18)", borderRadius: 14, padding: 22 }}>
                    <p style={{ color: GREEN, fontSize: 11, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Extracted & stored</p>
                    {[
                      ["Carrier", "STG Logistics"],
                      ["Rate", "$2,200"],
                      ["Lane", "Chicago → Atlanta"],
                      ["Equipment", "Dry Van (FTL)"],
                      ["Pickup window", "Thu 8am–12pm"],
                      ["Source", "dispatch@stglogistics.com"],
                    ].map(([label, val]) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", gap: 12 }}>
                        <span style={{ color: DIM, fontSize: 12 }}>{label}</span>
                        <span style={{ color: TEXT, fontSize: 12, fontWeight: 500 }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ marginBottom: 48 }}>
                  {[
                    { stat: "30 sec", label: "to connect Gmail or Outlook" },
                    { stat: "50,000+", label: "emails processed in under 20 min" },
                    { stat: "Auto", label: "extract rates, lanes, carriers, ETAs" },
                    { stat: "Every", label: "email, attachment, and PDF — searchable" },
                  ].map(({ stat, label }) => (
                    <div key={stat} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "20px 18px" }}>
                      <p style={{ color: GREEN, fontSize: "1.5rem", fontWeight: 700, margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>{stat}</p>
                      <p style={{ color: MUTED, fontSize: 13, margin: 0, lineHeight: 1.45 }}>{label}</p>
                    </div>
                  ))}
                </div>

                {/* Anchor prompt */}
                <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                  <ChatRow role="user" style={{ marginBottom: 16 }}>
                    <p style={{ color: TEXT, fontSize: 14, margin: 0 }}>Give me a list of carriers that run FTL dry van from LA to Miami</p>
                  </ChatRow>
                  <ChatRow role="ai">
                    <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>Found 6 carriers with recent quotes on this lane</p>
                    <DataTable
                      hasHeader
                      rows={[
                        ["Carrier", "Last rate", "Equipment"],
                        ["STG Logistics", "$2,900", "Dry Van ✓"],
                        ["XPO Logistics", "$3,100", "Dry Van ✓"],
                        ["Werner Ent.", "$2,750", "Dry Van ✓"],
                        ["Schneider", "$3,050", "Dry Van ✓"],
                        ["J.B. Hunt", "$2,800", "Dry Van ✓"],
                      ]}
                    />
                  </ChatRow>
                </div>
              </div>
            </Section>

            <Divider />

            {/* ═══════════════════════════════════════════════════════════════
                Section 4: Send to 36 Carriers
            ═══════════════════════════════════════════════════════════════ */}
            <Section style={{ marginTop: 120, marginBottom: 120 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="One prompt → 36 carriers"
                  headline={<>Send a rate request<br />to 36 carriers.{" "}<span style={{ color: GREEN }}>In one sentence.</span></>}
                  sub="One prompt sends to dozens of carriers. Auto-tracks responses. Schedules follow-ups that cancel when they reply."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                    <ChatRow role="user" style={{ marginBottom: 20 }}>
                      <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
                        Send a rate request to my top carriers for FTL dry van LA to Miami, follow up in 2 days if they don't respond
                      </p>
                    </ChatRow>
                    <ChatRow role="ai">
                      <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 14px" }}>
                        Sending to 36 carriers from your list...
                      </p>
                      <CarrierDots />
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", fontSize: 12 }}>
                        <span style={{ background: "rgba(0,171,85,0.12)", color: GREEN, borderRadius: 99, padding: "3px 10px", fontWeight: 500 }}>✓ 36 sent</span>
                        <span style={{ background: "rgba(255,255,255,0.05)", color: MUTED, borderRadius: 99, padding: "3px 10px" }}>Auto follow-ups: 2 days</span>
                      </div>
                    </ChatRow>
                  </div>

                  <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.15)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 20px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        Live response tracker
                      </p>
                      <ProgressTracker />
                    </div>
                    <div style={{ marginTop: 28 }}>
                      {[
                        "Replies trickle in for 48 hours",
                        "Follow-ups auto-cancel when they respond",
                        '"3/36 replied" becomes "18/36 replied" while you sleep',
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

            {/* ═══════════════════════════════════════════════════════════════
                Section 5: Negotiation
            ═══════════════════════════════════════════════════════════════ */}
            <Section style={{ marginTop: 120, marginBottom: 120 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Negotiation"
                  headline={<>It negotiates while you<br /><span style={{ color: GREEN }}>work on the next load.</span></>}
                  sub="Your minion searches your historical rates before suggesting counters. Not hallucinated — grounded in your actual data."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  {/* Negotiation timeline */}
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                    <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 20 }}>
                      Negotiation thread — Norfolk route
                    </p>

                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "8px 14px", maxWidth: "85%" }}>
                        <span style={{ color: DIM, fontSize: 12, fontWeight: 500 }}>STG Logistics:</span>
                        <span style={{ color: TEXT, fontSize: 13 }}>$2,800 for the Norfolk lane</span>
                      </div>
                      <p style={{ color: DIM, fontSize: 11, marginTop: 4, paddingLeft: 2 }}>Mon 10:14am</p>
                    </div>

                    <div style={{ marginBottom: 16, textAlign: "right" }}>
                      <ChatRow role="user" style={{ justifyContent: "flex-end", flexDirection: "row-reverse" }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.5, textAlign: "right" }}>
                          Counter at $2,400, we've been seeing $2,200–$2,500 on this lane
                        </p>
                      </ChatRow>
                    </div>

                    <div style={{ background: "rgba(0,171,85,0.06)", border: "1px solid rgba(0,171,85,0.18)", borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
                      <p style={{ color: GREEN, fontSize: 11, fontWeight: 600, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        ✓ Counter-offer drafted & sent
                      </p>
                      <p style={{ color: MUTED, fontSize: 12, margin: 0, fontStyle: "italic", lineHeight: 1.55 }}>
                        "...based on recent market data for this corridor, we'd like to counter at $2,400. Happy to book immediately at that rate."
                      </p>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "8px 14px", maxWidth: "85%" }}>
                        <span style={{ color: DIM, fontSize: 12, fontWeight: 500 }}>STG Logistics:</span>
                        <span style={{ color: TEXT, fontSize: 13 }}>Best we can do is $2,600</span>
                      </div>
                    </div>

                    <ChatRow role="user">
                      <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Accept</p>
                    </ChatRow>
                    <div style={{ paddingLeft: 40, marginTop: 10 }}>
                      <span style={{ background: "rgba(0,171,85,0.1)", color: GREEN, fontSize: 12, borderRadius: 99, padding: "3px 12px", fontWeight: 500 }}>
                        ✓ Acceptance + load confirmation sent
                      </span>
                    </div>
                  </div>

                  {/* Right side */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.12)", borderRadius: 16, padding: 24 }}>
                      <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                        Your minion checks your rate history before every counter — so you're never guessing what the lane should move for. Negotiation anchored in real data, from your own inbox.
                      </p>
                    </div>

                    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                      <ChatRow role="user" style={{ marginBottom: 14 }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>
                          Accept STG bid for Norfolk route and send the load confirmation
                        </p>
                      </ChatRow>
                      <ChatRow role="ai">
                        <p style={{ color: GREEN, fontSize: 13, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                          Done. Accepted at $2,600. Load confirmation sent to STG Logistics. Reference #NRF-2024-0312.
                        </p>
                      </ChatRow>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 4 }}>
                      {[
                        "Negotiates in multi-round email threads",
                        "References your historical rates, not guesses",
                        "Sends acceptance + load confirmation in one command",
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

            {/* ═══════════════════════════════════════════════════════════════
                Section 6: Morning Briefing
            ═══════════════════════════════════════════════════════════════ */}
            <Section style={{ marginTop: 120, marginBottom: 120 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Automation"
                  headline={<>Your morning briefing,<br /><span style={{ color: GREEN }}>before your coffee.</span></>}
                  sub="Your minion works the overnight shift so you don't have to."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                      <ChatRow role="user" style={{ marginBottom: 14 }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
                          Every morning at 7:15am, give me a briefing on new messages, pending quotes, and anything that needs attention
                        </p>
                      </ChatRow>
                      <ChatRow role="ai">
                        <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500 }}>
                          Scheduled. You'll get a briefing at 7:15am every morning.
                        </p>
                      </ChatRow>
                    </div>

                    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                      <ChatRow role="user" style={{ marginBottom: 14 }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>
                          Alert me if any carrier mentions a delay or breakdown
                        </p>
                      </ChatRow>
                      <ChatRow role="ai">
                        <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500 }}>
                          Alert set. I'll flag any delay or breakdown mentions as they arrive.
                        </p>
                      </ChatRow>
                    </div>
                  </div>

                  {/* Morning briefing card */}
                  <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.18)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,171,85,0.025) 0%, transparent 50%)", pointerEvents: "none", borderRadius: 16 }} />

                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, paddingBottom: 14, borderBottom: `1px solid ${BORDER}` }}>
                        <div>
                          <p style={{ color: TEXT, fontSize: 14, fontWeight: 600, margin: 0 }}>Morning Briefing</p>
                          <p style={{ color: DIM, fontSize: 12, margin: 0 }}>Today · 7:15am</p>
                        </div>
                        <span style={{ background: "rgba(0,171,85,0.1)", color: GREEN, fontSize: 11, borderRadius: 99, padding: "3px 10px", fontWeight: 500 }}>4 items</span>
                      </div>

                      {[
                        { icon: "📬", title: "4 new rate quotes overnight", detail: "2 below market avg · 1 above · 1 needs review", kind: "default" as const },
                        { icon: "✅", title: "STG accepted your counter", detail: "Norfolk lane · $2,400 · Load confirmation sent", kind: "success" as const },
                        { icon: "⚠️", title: "3 loads with no check-call in 24hrs", detail: "Chicago → Dallas · Toronto → Columbus · LA → Miami", kind: "warn" as const },
                        { icon: "📋", title: "Acme Industries availability request", detail: "Asking about next week capacity", kind: "default" as const },
                      ].map((item, i) => (
                        <div
                          key={i}
                          style={{
                            padding: "10px 12px", borderRadius: 8, marginBottom: 8,
                            background: item.kind === "success" ? "rgba(0,171,85,0.06)" : item.kind === "warn" ? "rgba(234,179,8,0.05)" : "rgba(255,255,255,0.02)",
                            border: item.kind === "success" ? "1px solid rgba(0,171,85,0.12)" : item.kind === "warn" ? "1px solid rgba(234,179,8,0.12)" : "1px solid transparent",
                          }}
                        >
                          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                            <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
                            <div>
                              <p style={{ color: item.kind === "success" ? "#6EE7B7" : item.kind === "warn" ? "#FCD34D" : TEXT, fontSize: 13, fontWeight: 500, margin: "0 0 2px" }}>
                                {item.title}
                              </p>
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

            {/* ═══════════════════════════════════════════════════════════════
                FAQ
            ═══════════════════════════════════════════════════════════════ */}
            <Section style={{ marginTop: 120, marginBottom: 120, maxWidth: 720, margin: "120px auto" }}>
              <FAQ />
            </Section>

            {/* ═══════════════════════════════════════════════════════════════
                Section 7: Final CTA
            ═══════════════════════════════════════════════════════════════ */}
            <Section style={{ marginBottom: 80 }}>
              <div
                style={{
                  textAlign: "center",
                  background: `linear-gradient(135deg, rgba(0,171,85,0.1) 0%, rgba(0,171,85,0.03) 100%)`,
                  border: "1px solid rgba(0,171,85,0.18)",
                  borderRadius: 24,
                  padding: "72px 40px",
                  maxWidth: 860,
                  margin: "0 auto",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: `linear-gradient(rgba(0,171,85,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,171,85,0.8) 1px, transparent 1px)`, backgroundSize: "40px 40px", borderRadius: 24 }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 16, lineHeight: 1.25 }}>
                    You're going to re-read<br />that email again tomorrow.<br /><span style={{ color: GREEN }}>Or you could just ask.</span>
                  </h2>
                  <p style={{ color: MUTED, fontSize: "1.05rem", marginBottom: 36, lineHeight: 1.6 }}>
                    Connect your inbox in 30 seconds. Your minion starts reading immediately.
                  </p>
                  <a href="https://app.getmin.ai/">
                    <Button size="lg" className="cta-glow text-white font-normal text-base px-10" style={{ backgroundColor: GREEN, border: "none" }}>
                      Try for free
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  <p style={{ color: DIM, fontSize: 13, marginTop: 16 }}>
                    No credit card required · Gmail & Outlook
                  </p>
                </div>
              </div>
            </Section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;

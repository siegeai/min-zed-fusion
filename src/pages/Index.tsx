import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  BG, SURFACE, GREEN, BORDER, TEXT, MUTED, DIM,
  Section, Divider,
} from "@/components/LandingShared";

const PROOF_ASKS = [
  {
    ask: "Where's that invoice from last October?",
    result: "Found in 3 seconds instead of 30 minutes.",
  },
  {
    ask: "What did we agree to with that vendor?",
    result: "Answered without opening a single email.",
  },
  {
    ask: "Pull up everything related to this client.",
    result: "Done, clean, all in one view.",
  },
  {
    ask: "Prep me for my 2pm call with Acme.",
    result: "Full context — history, commitments, open items — ready before you are.",
  },
  {
    ask: "Flag anything without an update in the last four hours.",
    result: "Caught before you had to ask.",
  },
];

const MOAT_ROWS = [
  { them: "Waits for you to search", us: "Watches everything, surfaces what matters" },
  { them: "Sees one inbox at a time", us: "Sees your entire company's history" },
  { them: "Answers questions you ask", us: "Catches what you never thought to ask" },
  { them: "Loses context when someone leaves", us: "Keeps every relationship, permanently" },
  { them: "Connects to systems", us: "Connects to people — what they knew, what they promised, what they learned" },
];

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "min. | Your team's collective memory",
    description: "Every client email, every shared file, every business relationship your team has ever had — instantly recalled, permanently remembered, and ready to act on.",
    url: "https://getmin.ai",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "min.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
    },
  };

  return (
    <>
      <Helmet>
        <title>min. | Your team's collective memory</title>
        <meta name="description" content="Every client email, every shared file, every business relationship your team has ever had — instantly recalled, permanently remembered, and ready to act on." />
        <link rel="canonical" href="https://getmin.ai" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getmin.ai/" />
        <meta property="og:title" content="min. | Your team's collective memory" />
        <meta property="og:description" content="Every client email, every shared file, every business relationship your team has ever had — instantly recalled, permanently remembered, and ready to act on." />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT, overflowX: "hidden" }}>
        <Header />

        <main style={{ paddingTop: 100 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

            {/* ── 1. Hero ── */}
            <div className="hero-glow" style={{ paddingTop: 48, marginBottom: 80 }}>
              <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                <h1
                  className="hero-stagger-1"
                  style={{ fontSize: "clamp(2.6rem, 6vw, 4.8rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", color: TEXT, margin: "0 0 24px 0" }}
                >
                  Your team's<br />
                  <span style={{ color: GREEN }}>collective memory.</span>
                </h1>
                <p className="hero-stagger-2" style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)", color: MUTED, fontWeight: 400, marginBottom: 48, lineHeight: 1.6, maxWidth: 640, margin: "0 auto 48px" }}>
                  Every client email, every shared file, every business relationship your team has ever had — instantly recalled, permanently remembered, and ready to act on.
                </p>
                <div className="hero-stagger-3" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href="https://app.getmin.ai/">
                    <Button size="lg" className="cta-glow text-white font-normal text-base px-8" style={{ backgroundColor: GREEN, border: "none" }}>
                      Get early access
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            <Divider />

            {/* ── 2. The Problem ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={{ maxWidth: 800, margin: "0 auto" }}>
                <div style={{ marginBottom: 40 }}>
                  <p style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.02em", color: TEXT, marginBottom: 12 }}>
                    Every employee carries their own memory.
                  </p>
                  <p style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.02em", color: TEXT, marginBottom: 12 }}>
                    It's invisible to everyone else.
                  </p>
                  <p style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.02em", color: TEXT }}>
                    Gone when they leave.
                  </p>
                </div>
                <p style={{ color: MUTED, fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 620 }}>
                  You're running your business out of your inbox, spreadsheets, and your head. That works until it doesn't. Client relationships. Deal history. Pricing. Commitments. All of it siloed, scattered, and one resignation away from disappearing forever.
                </p>
              </div>
            </Section>

            <Divider />

            {/* ── 3. The Insight ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
                <p style={{ fontSize: "clamp(1.4rem, 3.2vw, 2rem)", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.02em", color: TEXT, marginBottom: 24 }}>
                  You already have the information.{" "}
                  <span style={{ color: GREEN }}>You just can't get to it fast enough.</span>
                </p>
                <p style={{ color: MUTED, fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
                  CRMs capture outcomes. Systems of record capture data. Your emails and files capture the <em>why</em> — the negotiation, the commitment, the context, the relationship. min. doesn't add new information. It makes the information you already have usable.
                </p>
              </div>
            </Section>

            <Divider />

            {/* ── 4. What min. Does ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", marginBottom: 48 }}>
                <p style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.02em", color: TEXT }}>
                  Stop digging.{" "}
                  <span style={{ color: GREEN }}>Start asking.</span>
                </p>
              </div>
              <div style={{ maxWidth: 960, margin: "0 auto" }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Find",
                      desc: "Ask anything about your business in plain language. Your entire company's emails, files, and history — not just your inbox, everyone's.",
                      example: "\"Find every contact who's ever quoted us on this lane.\"",
                    },
                    {
                      title: "Act",
                      desc: "Send outreach, request updates, flag issues — without leaving the conversation.",
                      example: "\"Send a status request to every active carrier.\"",
                    },
                    {
                      title: "Compound",
                      desc: "Every email and file adds to the memory. No data entry. No maintenance. The longer you use min., the smarter it gets.",
                      example: "\"When a rep leaves, their knowledge stays.\"",
                    },
                  ].map((col) => (
                    <div
                      key={col.title}
                      style={{
                        background: SURFACE,
                        border: `1px solid ${BORDER}`,
                        borderRadius: 20,
                        padding: 32,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,171,85,0.025) 0%, transparent 50%)", pointerEvents: "none", borderRadius: 20 }} />
                      <div style={{ position: "relative", zIndex: 1 }}>
                        <h3 style={{ color: GREEN, fontSize: "1.3rem", fontWeight: 700, marginBottom: 14, letterSpacing: "-0.01em" }}>
                          {col.title}
                        </h3>
                        <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.65, marginBottom: 20 }}>
                          {col.desc}
                        </p>
                        <p style={{ color: DIM, fontSize: 13, fontStyle: "italic", lineHeight: 1.5 }}>
                          {col.example}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── 5. Who It's For ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
                <p style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.02em", color: TEXT, marginBottom: 40 }}>
                  min. is built for relationship-driven businesses{" "}
                  <span style={{ color: GREEN }}>where the work happens in email.</span>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    "A new hire who needs three years of context on day one",
                    "An owner whose best rep just gave notice",
                    "A team spending hours pulling info before every client call",
                  ].map((scenario) => (
                    <div
                      key={scenario}
                      style={{
                        background: SURFACE,
                        border: `1px solid ${BORDER}`,
                        borderRadius: 16,
                        padding: "28px 24px",
                      }}
                    >
                      <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>
                        {scenario}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── 6. The Proof ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={{ maxWidth: 700, margin: "0 auto" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {PROOF_ASKS.map((item) => (
                    <div
                      key={item.ask}
                      style={{
                        background: SURFACE,
                        border: `1px solid ${BORDER}`,
                        borderRadius: 14,
                        padding: "20px 24px",
                      }}
                    >
                      <p style={{ color: TEXT, fontSize: 16, lineHeight: 1.55, margin: 0, fontWeight: 500, marginBottom: 6 }}>
                        "{item.ask}"
                      </p>
                      <p style={{ color: GREEN, fontSize: 14, lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
                        {item.result}
                      </p>
                    </div>
                  ))}
                </div>
                <p style={{ color: DIM, fontSize: 14, textAlign: "center", marginTop: 28, lineHeight: 1.6, fontStyle: "italic" }}>
                  It's like hiring someone who read every email you've ever sent and never forgets.
                </p>
              </div>
            </Section>

            <Divider />

            {/* ── 7. The Moat ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={{ maxWidth: 860, margin: "0 auto" }}>
                <div style={{ overflow: "hidden", borderRadius: 16, border: `1px solid ${BORDER}` }}>
                  {/* Header row */}
                  <div
                    className="grid grid-cols-2"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      borderBottom: `1px solid ${BORDER}`,
                      padding: "14px 24px",
                    }}
                  >
                    <span style={{ color: DIM, fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      What everyone else does
                    </span>
                    <span style={{ color: GREEN, fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      What min. does
                    </span>
                  </div>
                  {/* Body rows */}
                  {MOAT_ROWS.map((row, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-2"
                      style={{
                        padding: "16px 24px",
                        borderBottom: i < MOAT_ROWS.length - 1 ? `1px solid ${BORDER}` : "none",
                        background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                      }}
                    >
                      <span style={{ color: MUTED, fontSize: 15, lineHeight: 1.55, paddingRight: 16 }}>
                        {row.them}
                      </span>
                      <span style={{ color: TEXT, fontSize: 15, lineHeight: 1.55, fontWeight: 500 }}>
                        {row.us}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── 8. The Closer ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
                <p style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 600, lineHeight: 1.4, letterSpacing: "-0.02em", color: TEXT, marginBottom: 12 }}>
                  Every company compounds financial capital.
                </p>
                <p style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 600, lineHeight: 1.4, letterSpacing: "-0.02em", color: TEXT, marginBottom: 12 }}>
                  Almost none compound operational knowledge.
                </p>
                <p style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 600, lineHeight: 1.4, letterSpacing: "-0.02em", color: GREEN }}>
                  min. changes that.
                </p>
              </div>
            </Section>

            <Divider />

            {/* ── 9. Final CTA ── */}
            <Section style={{ marginBottom: 56 }}>
              <div
                style={{
                  textAlign: "center",
                  background: "linear-gradient(135deg, rgba(0,171,85,0.1) 0%, rgba(0,171,85,0.03) 100%)",
                  border: "1px solid rgba(0,171,85,0.18)",
                  borderRadius: 24,
                  padding: "72px 40px",
                  maxWidth: 860,
                  margin: "0 auto",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "linear-gradient(rgba(0,171,85,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,171,85,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px", borderRadius: 24 }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.02em", color: TEXT, marginBottom: 8 }}>
                    Teams experience attrition.
                  </p>
                  <p style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.02em", color: GREEN, marginBottom: 36 }}>
                    min. compounds.
                  </p>
                  <a href="https://app.getmin.ai/">
                    <Button size="lg" className="cta-glow text-white font-normal text-base px-10" style={{ backgroundColor: GREEN, border: "none" }}>
                      Get early access
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  <p style={{ color: DIM, fontSize: 13, marginTop: 16 }}>
                    Your emails, files, and meetings — organized and ready to answer your questions.
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

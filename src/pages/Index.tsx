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
    ask: "Who runs Toronto to Miami FTL Dry Van?",
    result: "Every carrier who has ever emailed anyone in your office about that lane. Not just the ones you remember.",
  },
  {
    ask: "What shipments deliver in the next 48 hours?",
    result: "Every load in motion, every carrier, every last known status, in one table.",
  },
  {
    ask: "Show me every lead I've quoted but haven't heard back from.",
    result: "Pulled straight from your team's sent folder. Drafted follow-ups ready to go.",
  },
  {
    ask: "What did we agree to with that vendor?",
    result: "Answered from the actual email thread, without you opening it.",
  },
  {
    ask: "Send a POD request to every carrier that delivered this week.",
    result: "Done. Every missing POD chased. Responses come back to one place.",
  },
];

const MOAT_ROWS = [
  { them: "Waits for you to type it in", us: "Reads every email, load sheet, and PDF automatically" },
  { them: "Sees one inbox at a time", us: "Reads every inbox in your company and builds one shared memory" },
  { them: "Answers the questions you ask", us: "Knows what you never thought to ask, because it already read it" },
  { them: "Loses context when someone leaves", us: "Keeps every relationship, rate, and commitment, permanently" },
  { them: "A phone book your team has to maintain", us: "A shared brain that maintains itself" },
];

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "min. | Your company's shared brain",
    description: "Your company doesn't have a memory. min. gives it one. min. turns every email, load sheet, and document into a Joint Memory your whole team can search, act on, and build on.",
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
        <title>min. | Your company's shared brain</title>
        <meta name="description" content="Your company doesn't have a memory. min. gives it one. min. turns every email, load sheet, and document into a Joint Memory your whole team can search, act on, and build on." />
        <link rel="canonical" href="https://getmin.ai" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getmin.ai/" />
        <meta property="og:title" content="min. | Your company's shared brain" />
        <meta property="og:description" content="min. turns every email, load sheet, and document into a Joint Memory your whole team can search, act on, and build on. Zero data entry." />
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
                <p className="hero-stagger-1" style={{ color: GREEN, fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
                  Joint Memory
                </p>
                <h1
                  className="hero-stagger-1"
                  style={{ fontSize: "clamp(2.6rem, 6vw, 4.8rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", color: TEXT, margin: "0 0 24px 0" }}
                >
                  Your company doesn't have a memory.{" "}
                  <span style={{ color: GREEN }}>min. gives it one.</span>
                </h1>
                <p className="hero-stagger-2" style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)", color: MUTED, fontWeight: 400, marginBottom: 48, lineHeight: 1.6, maxWidth: 760, margin: "0 auto 48px" }}>
                  min. turns every email, load sheet, quote, and document into a Joint Memory your whole team can query in plain English and act on in one sentence. Zero data entry. Always up to date.
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
                    Your business isn't missing data.
                  </p>
                  <p style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.02em", color: TEXT, marginBottom: 12 }}>
                    It's missing a shared place
                  </p>
                  <p style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.02em", color: TEXT }}>
                    for that data to live.
                  </p>
                </div>
                <p style={{ color: MUTED, fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 640 }}>
                  The real business runs in inboxes, threads, and people's heads. Client history. Pricing exceptions. Lane rates. Vendor lead times. Carrier performance. The promises made on a Tuesday afternoon that nobody logged. All of it siloed across a dozen inboxes, one resignation away from disappearing forever.
                </p>
              </div>
            </Section>

            <Divider />

            {/* ── 3. The Insight ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
                <p style={{ fontSize: "clamp(1.4rem, 3.2vw, 2rem)", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.02em", color: TEXT, marginBottom: 24 }}>
                  Bring your emails to life.{" "}
                  <span style={{ color: GREEN }}>Your company's shared brain.</span>
                </p>
                <p style={{ color: MUTED, fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 680, margin: "0 auto" }}>
                  min. connects to every inbox, every sent folder, every thread, and digests the documents where your data is actually trapped. Emails, rate tables, load sheets, quotes, rate confirmations, BOLs, PODs, spreadsheets, PDFs. Everything unstructured becomes structured memory your whole team can query and act on.
                </p>
              </div>
            </Section>

            <Divider />

            {/* ── 4. Three Pillars: Memory, Search, Action ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", marginBottom: 48 }}>
                <p style={{ color: GREEN, fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>
                  How min. works
                </p>
                <p style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.02em", color: TEXT }}>
                  Memory. Search.{" "}
                  <span style={{ color: GREEN }}>Action.</span>
                </p>
              </div>
              <div style={{ maxWidth: 960, margin: "0 auto" }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Joint Memory",
                      desc: "min. reads every email, attachment, and document your team sends or receives. It doesn't just scan text, it digests load sheets, rate tables, PDFs, and spreadsheets, turning unstructured chaos into structured memory.",
                      example: "\"If a carrier quotes a lane once, min. remembers the lane, the rate, and the equipment.\"",
                    },
                    {
                      title: "Intelligent Search",
                      desc: "Ask a logistics expert's question in plain English. min. pulls the exact answer from your entire company's email history in seconds, not a list of links to dig through.",
                      example: "\"Who runs Toronto to Miami FTL Dry Van?\"",
                    },
                    {
                      title: "Action",
                      desc: "If it lives in email, min. can do it. Draft, send, chase, confirm, follow up. The repetitive outreach that fills your team's day happens on one sentence.",
                      example: "\"Send a POD request to every carrier that delivered this week without one.\"",
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
                  Built for relationship-driven businesses{" "}
                  <span style={{ color: GREEN }}>where the real work happens in email.</span>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    "A new hire who can query the same Joint Memory as your most experienced rep on day one",
                    "An owner whose top rep just gave notice, and whose carrier network, rates, and relationships stay with the company",
                    "A team that stops opening 12 Outlook tabs to chase statuses, quotes, and PODs, and asks in one sentence instead",
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
              <div style={{ maxWidth: 720, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 40 }}>
                  <p style={{ color: GREEN, fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>
                    Ask anything
                  </p>
                  <p style={{ fontSize: "clamp(1.4rem, 3.2vw, 2rem)", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.02em", color: TEXT }}>
                    In plain English.{" "}
                    <span style={{ color: GREEN }}>min. already read it.</span>
                  </p>
                </div>
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
                  min. is a teammate who read every email your company ever sent, and who never forgets a single one.
                </p>
              </div>
            </Section>

            <Divider />

            {/* ── 7. The Moat ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={{ maxWidth: 860, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 36 }}>
                  <p style={{ color: GREEN, fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>
                    Why min. is different
                  </p>
                  <p style={{ fontSize: "clamp(1.4rem, 3.2vw, 2rem)", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.02em", color: TEXT }}>
                    Your CRM tracks outcomes.{" "}
                    <span style={{ color: GREEN }}>min. captures everything else.</span>
                  </p>
                </div>
                <div style={{ overflow: "hidden", borderRadius: 16, border: `1px solid ${BORDER}` }}>
                  <div
                    className="grid grid-cols-2"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      borderBottom: `1px solid ${BORDER}`,
                      padding: "14px 24px",
                    }}
                  >
                    <span style={{ color: DIM, fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      Typical tool in your stack
                    </span>
                    <span style={{ color: GREEN, fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      min.
                    </span>
                  </div>
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
              <div style={{ maxWidth: 740, margin: "0 auto", textAlign: "center" }}>
                <p style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 600, lineHeight: 1.4, letterSpacing: "-0.02em", color: TEXT, marginBottom: 12 }}>
                  Every company compounds financial capital.
                </p>
                <p style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 600, lineHeight: 1.4, letterSpacing: "-0.02em", color: TEXT, marginBottom: 12 }}>
                  Almost none compound what their people know.
                </p>
                <p style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 600, lineHeight: 1.4, letterSpacing: "-0.02em", color: GREEN, marginBottom: 24 }}>
                  min. builds the memory that finally does.
                </p>
                <p style={{ color: MUTED, fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
                  Not a static database you query once a quarter. A living Joint Memory, built one email at a time, owned by your company, not by whichever rep happens to still be sitting at their desk.
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
                    Turn your inbox into
                  </p>
                  <p style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.02em", color: GREEN, marginBottom: 36 }}>
                    your company's shared brain.
                  </p>
                  <a href="https://app.getmin.ai/">
                    <Button size="lg" className="cta-glow text-white font-normal text-base px-10" style={{ backgroundColor: GREEN, border: "none" }}>
                      Get early access
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  <p style={{ color: DIM, fontSize: 13, marginTop: 16 }}>
                    One email at a time. Zero data entry. Nothing your team learns ever gets lost again.
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

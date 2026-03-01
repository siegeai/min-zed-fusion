import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import MiniMascot from "@/components/MiniMascot";
import Footer from "@/components/Footer";
import {
  BG, SURFACE, GREEN, BORDER, TEXT, MUTED, DIM,
  Section, Divider, SectionHeading, FinalCTA,
} from "@/components/LandingShared";

const FEATURES = [
  {
    title: "Automatic Follow-Ups",
    desc: "Tell your minion to follow up on any thread, on any cadence. Auto-cancels when they reply or you jump in.",
    to: "/features/follow-ups",
    seed: "feat-followup",
  },
  {
    title: "Alerts in Plain English",
    desc: "\"Text me if any carrier mentions a delay overnight.\" Set conditions in plain English. Get notified via SMS.",
    to: "/features/alerts",
    seed: "feat-alerts",
  },
  {
    title: "Smart Contact Classification",
    desc: "Your minion auto-classifies every contact as customer, carrier, vendor, or noise. No manual tagging.",
    to: "/features/contacts",
    seed: "feat-contacts",
  },
  {
    title: "Task Tracking",
    desc: "Ask your minion to do something and it creates a task to track progress. Each task runs in its own dedicated window.",
    to: "/features/tasks",
    seed: "feat-tasks",
  },
  {
    title: "Email Attachments & Rich Formatting",
    desc: "Send attachments, embed images and GIFs, auto-size tables. Your minion handles email like a pro.",
    to: "/features/email",
    seed: "feat-email",
  },
  {
    title: "Custom Minion Instructions",
    desc: "Each minion can have its own standing rules: \"always be concise\", \"reply in formal tone\", or anything you want.",
    to: "/features/instructions",
    seed: "feat-instructions",
  },
];

const TEAMS = [
  {
    tag: "Operations",
    headline: "Stop repeating the same emails every morning",
    desc: "Status checks, follow-ups, document chasing. Your minion handles the repetitive grind so you only touch what needs your brain.",
    to: "/teams/operations",
    seed: "team-ops",
    examples: ["Status updates", "Follow-ups", "Document collection", "Exception alerts"],
  },
  {
    tag: "Business Development",
    headline: "Your inbox knows more than your CRM.",
    desc: "Every objection, competitor mention, and buying signal is in your email. Your minion learns it all so you don't fly blind.",
    to: "/teams/business-development",
    seed: "team-bd",
    examples: ["Outreach", "Account intel", "Quoting", "Win-back"],
  },
  {
    tag: "Account Management",
    headline: "Know every account. Miss nothing.",
    desc: "Instant account health, QBR prep, churn signals, and relationship intelligence — all learned from your inbox. Never get caught off-guard on an account again.",
    to: "/teams/account-management",
    seed: "team-acct",
    examples: ["Account health", "QBR prep", "Churn signals", "Relationship pulse"],
  },
];

const INDUSTRIES = [
  {
    tag: "Brokers",
    headline: "Rate lookups, carrier blasts, and negotiation",
    desc: "Your minion learns your lanes, your carriers, and your rates from your inbox — then acts on them in one sentence.",
    to: "/brokers",
    seed: "audience-freight",
    examples: ["Rate lookups", "Carrier blasts", "Negotiation", "Load tracking"],
  },
  {
    tag: "Shippers",
    headline: "Shipment tracking, RFQs, and spend analysis",
    desc: "Track every PO, compare rates across carriers, and send RFQs to your approved list.",
    to: "/shippers",
    seed: "audience-shipper",
    examples: ["PO tracking", "RFQ management", "Rate comparison", "Delay alerts"],
  },
  {
    tag: "3PLs",
    headline: "Multi-client ops and performance reports",
    desc: "Manage every client, carrier, and shipment from one place. Cross-client intelligence and SLA monitoring.",
    to: "/3pl",
    seed: "audience-3pl",
    examples: ["Client visibility", "Cross-client rates", "POD collection", "Client KPIs"],
  },
  {
    tag: "Distributors",
    headline: "Order desk clarity without the chaos",
    desc: "Surface stalled orders, track every exception, and follow up with suppliers automatically. Your ERP tracks order lines. Your minion tracks reality.",
    to: "/distributors",
    seed: "audience-dist",
    examples: ["Order context", "Exception tracking", "Supplier follow-ups", "Margin visibility"],
  },
];

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "min. | AI that reads your emails and does what you tell it",
    description: "An AI assistant for logistics teams. Rate lookups, carrier blasts, shipment tracking, follow-ups, and morning briefings, in plain English.",
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
        <title>min. | AI that reads your emails and does what you tell it</title>
        <meta name="description" content="An AI assistant for logistics teams. Your minion learns your lanes, your carriers, and your operation from your inbox — automatically. Rate lookups, carrier blasts, follow-ups, and morning briefings in plain English." />
        <link rel="canonical" href="https://getmin.ai" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getmin.ai/" />
        <meta property="og:title" content="min. | AI that reads your emails and does what you tell it" />
        <meta property="og:description" content="Your minion learns your business from your inbox. Ask it anything, in plain English." />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT, overflowX: "hidden" }}>
        <Header />

        <main style={{ paddingTop: 100 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

            {/* ── Hero ── */}
            <div className="hero-glow" style={{ paddingTop: 32, marginBottom: 80 }}>
              <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                <p className="hero-stagger-1" style={{ color: GREEN, fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
                  AI that actually does things for you
                </p>
                <h1
                  className="hero-stagger-2"
                  style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", color: TEXT, margin: "0 0 20px 0" }}
                >
                  Stop re-reading<br />
                  <span style={{ color: GREEN }}>your emails.</span>
                </h1>
                <p className="hero-stagger-3" style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)", color: MUTED, fontWeight: 400, marginBottom: 48, lineHeight: 1.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                  Your minion <MiniMascot size={28} seed="home-hero" /> already learned everything in your inbox. Ask it anything. Tell it what to do next.
                </p>
                <div className="hero-stagger-4" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href="https://app.getmin.ai/">
                    <Button size="lg" className="cta-glow text-white font-normal text-base px-8" style={{ backgroundColor: GREEN, border: "none" }}>
                      Try for free
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            <Divider />

            {/* ── Teams ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={{ maxWidth: 960, margin: "0 auto" }}>
                <SectionHeading
                  eyebrow="By team"
                  headline={<>One AI assistant.<br /><span style={{ color: GREEN }}>Tailored for your role.</span></>}
                  sub="Ops drowns in follow-ups. BD loses deals in their inbox. Leaders fly blind. Your minion remembers everything, so none of that has to happen."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TEAMS.map((a) => (
                    <Link key={a.to} to={a.to} style={{ textDecoration: "none" }}>
                      <div
                        style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: 32, position: "relative", overflow: "hidden", transition: "border-color 0.3s ease, transform 0.3s ease", cursor: "pointer", height: "100%" }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,171,85,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}
                      >
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,171,85,0.025) 0%, transparent 50%)", pointerEvents: "none", borderRadius: 20 }} />
                        <div style={{ position: "relative", zIndex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                            <MiniMascot size={36} seed={a.seed} />
                            <span style={{ color: GREEN, fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{a.tag}</span>
                          </div>
                          <h3 style={{ color: TEXT, fontSize: "1.15rem", fontWeight: 700, marginBottom: 10, lineHeight: 1.3, letterSpacing: "-0.015em" }}>{a.headline}</h3>
                          <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>{a.desc}</p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {a.examples.map((ex) => (
                              <span key={ex} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: 99, padding: "3px 12px", fontSize: 12, color: DIM }}>{ex}</span>
                            ))}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 20, color: GREEN, fontSize: 14, fontWeight: 500 }}>
                            See how it works <ArrowRight style={{ width: 14, height: 14 }} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── Industries ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={{ maxWidth: 960, margin: "0 auto" }}>
                <SectionHeading
                  eyebrow="By industry"
                  headline={<>Built for logistics.<br /><span style={{ color: GREEN }}>Your industry, your workflows.</span></>}
                  sub="Same powerful minion, with use cases specific to how your industry works."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {INDUSTRIES.map((a) => (
                    <Link key={a.to} to={a.to} style={{ textDecoration: "none" }}>
                      <div
                        style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: 32, position: "relative", overflow: "hidden", transition: "border-color 0.3s ease, transform 0.3s ease", cursor: "pointer", height: "100%" }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,171,85,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}
                      >
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,171,85,0.025) 0%, transparent 50%)", pointerEvents: "none", borderRadius: 20 }} />
                        <div style={{ position: "relative", zIndex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                            <MiniMascot size={36} seed={a.seed} />
                            <span style={{ color: GREEN, fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{a.tag}</span>
                          </div>
                          <h3 style={{ color: TEXT, fontSize: "1.15rem", fontWeight: 700, marginBottom: 10, lineHeight: 1.3, letterSpacing: "-0.015em" }}>{a.headline}</h3>
                          <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>{a.desc}</p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {a.examples.map((ex) => (
                              <span key={ex} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: 99, padding: "3px 12px", fontSize: 12, color: DIM }}>{ex}</span>
                            ))}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 20, color: GREEN, fontSize: 14, fontWeight: 500 }}>
                            See use cases <ArrowRight style={{ width: 14, height: 14 }} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── Features preview ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={{ maxWidth: 960, margin: "0 auto" }}>
                <SectionHeading
                  eyebrow="Core features"
                  headline={<>Everything your minion<br /><span style={{ color: GREEN }}>can do for you.</span></>}
                  sub="Photographic memory for your inbox. Every feature works in plain English."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {FEATURES.map((f) => (
                    <Link key={f.to} to={f.to} style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          background: SURFACE,
                          border: `1px solid ${BORDER}`,
                          borderRadius: 16,
                          padding: 24,
                          height: "100%",
                          transition: "border-color 0.3s ease, transform 0.3s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "rgba(0,171,85,0.25)";
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = BORDER;
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <div style={{ marginBottom: 14 }}>
                          <MiniMascot size={32} seed={f.seed} />
                        </div>
                        <h3 style={{ color: TEXT, fontSize: 15, fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>
                          {f.title}
                        </h3>
                        <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.55, margin: 0 }}>
                          {f.desc}
                        </p>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 14, color: GREEN, fontSize: 13, fontWeight: 500 }}>
                          Learn more <ArrowRight style={{ width: 12, height: 12 }} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div style={{ textAlign: "center", marginTop: 32 }}>
                  <Link to="/features">
                    <Button variant="ghost" className="text-sm font-normal" style={{ color: GREEN }}>
                      View all features <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── Stats ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ maxWidth: 960, margin: "0 auto" }}>
                {[
                  { stat: "30 sec", label: "to connect Gmail or Outlook" },
                  { stat: "Total recall", label: "every email, every attachment, searchable" },
                  { stat: "Plain English", label: "no training, no complex onboarding" },
                  { stat: "24/7", label: "always on, never needs to be caught up" },
                ].map(({ stat, label }) => (
                  <div key={stat} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "20px 18px" }}>
                    <p style={{ color: GREEN, fontSize: "1.5rem", fontWeight: 700, margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>{stat}</p>
                    <p style={{ color: MUTED, fontSize: 13, margin: 0, lineHeight: 1.45 }}>{label}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Divider />

            {/* ── Final CTA ── */}
            <FinalCTA
              headline={<>You're going to re-read<br />that email again tomorrow.<br /><span style={{ color: GREEN }}>Or you could just ask.</span></>}
              sub="Connect your inbox in 30 seconds. Your minion reads everything, remembers everything, and starts working immediately."
            />

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;

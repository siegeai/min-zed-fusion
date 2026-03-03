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

const SKILLS = [
  {
    title: "Perfect Recall",
    desc: "Ask a question, get an answer — not a list of emails. Your minion cross-references your entire email history and responds with structured data.",
    to: "/skills/recall",
    seed: "feat-retrieval",
  },
  {
    title: "Tracking",
    desc: "Real GPS location, real ETA. Your minion reads tracking links, factors in weather and traffic, and raises exceptions before the carrier tells you.",
    to: "/skills/tracking",
    seed: "feat-tracking",
  },
  {
    title: "Follow-Ups",
    desc: "Tell your minion to follow up on any thread, on any cadence. Auto-cancels when they reply or you jump in.",
    to: "/skills/follow-ups",
    seed: "feat-followup",
  },
  {
    title: "Alerts",
    desc: "\"Text me if any carrier mentions a delay overnight.\" Set conditions in plain English. Get notified via SMS.",
    to: "/skills/alerts",
    seed: "feat-alerts",
  },
  {
    title: "Smart Contact Classification",
    desc: "Your minion auto-classifies every contact as customer, carrier, vendor, or noise. No manual tagging.",
    to: "/skills/contacts",
    seed: "feat-contacts",
  },
  {
    title: "Tasks",
    desc: "Ask your minion to do something and it creates a task to track progress. Each task runs in its own dedicated window.",
    to: "/skills/tasks",
    seed: "feat-tasks",
  },
  {
    title: "Attachments",
    desc: "Send attachments, embed images and GIFs, auto-size tables. Your minion handles email like a pro.",
    to: "/skills/email",
    seed: "feat-email",
  },
  {
    title: "Instructions",
    desc: "Each minion can have its own standing rules: \"always be concise\", \"reply in formal tone\", or anything you want.",
    to: "/skills/instructions",
    seed: "feat-instructions",
  },
  {
    title: "Files",
    desc: "Upload any file — CSV, Excel, PDF, text — and ask questions in plain English. Your whole team can collaborate in group chats.",
    to: "/skills/files",
    seed: "feat-files",
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
    desc: "Every objection, competitor mention, and buying signal is already in your email. Your minion makes it all searchable and actionable.",
    to: "/teams/business-development",
    seed: "team-bd",
    examples: ["Outreach", "Account intel", "Quoting", "Win-back"],
  },
  {
    tag: "Account Management",
    headline: "Know every account. Miss nothing.",
    desc: "Instant account health, QBR prep, churn signals, and relationship intelligence — pulled from your email history. Never get caught off-guard on an account again.",
    to: "/teams/account-management",
    seed: "team-acct",
    examples: ["Account health", "QBR prep", "Churn signals", "Relationship pulse"],
  },
];

const INDUSTRIES = [
  {
    tag: "Brokers",
    headline: "Rate lookups, carrier blasts, and negotiation",
    desc: "Your minion knows your lanes, your carriers, and your rates - then acts on them in one sentence.",
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
    name: "min. | The email assistant that actually does things",
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
        <title>min. | The email assistant that actually does things</title>
        <meta name="description" content="An AI email assistant for logistics teams. Search your entire email history, send bulk outreach, and automate follow-ups — in plain English." />
        <link rel="canonical" href="https://getmin.ai" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getmin.ai/" />
        <meta property="og:title" content="min. | The email assistant that actually does things" />
        <meta property="og:description" content="Search your entire email history, send bulk outreach, and automate follow-ups — in plain English." />
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
                  <span style={{ color: GREEN }}>your emails & files.</span>
                </h1>
                <p className="hero-stagger-3" style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)", color: MUTED, fontWeight: 400, marginBottom: 48, lineHeight: 1.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                  Search gives you snippets. Your minion <MiniMascot size={28} seed="home-hero" /> gives you answers, and does what you tell it next.
                </p>
                <div className="hero-stagger-4" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href="https://app.getmin.ai/">
                    <Button size="lg" className="cta-glow text-white font-normal text-base px-6" style={{ backgroundColor: GREEN, border: "none" }}>
                      Try for free
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  <a href="mailto:hello@getmin.ai?subject=Demo%20Request">
                    <Button size="lg" variant="outline" className="font-normal text-base px-6" style={{ borderColor: "rgba(255,255,255,0.15)", color: TEXT, background: "transparent" }}>
                      Book a demo
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
                  sub="Ops drowns in follow-ups. BD loses deals in threads. Leaders fly blind. Your minion remembers everything, so none of that has to happen."
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

            {/* ── Skills preview ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={{ maxWidth: 960, margin: "0 auto" }}>
                <SectionHeading
                  eyebrow="Core skills"
                  headline={<>Everything your minion<br /><span style={{ color: GREEN }}>can do for you.</span></>}
                  sub="Total recall across your entire inbox. Every skill works in plain English."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {SKILLS.map((f) => (
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
                  <Link to="/skills">
                    <Button variant="ghost" className="text-sm font-normal" style={{ color: GREEN }}>
                      View all skills <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
                  { stat: "30 sec", label: "to sign in with Gmail or Outlook" },
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
              sub="Sign in with Gmail or Outlook. Your minion starts working in 30 seconds."
            />

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;

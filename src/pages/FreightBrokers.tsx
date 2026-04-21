import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import HeroChatDemo from "@/components/HeroChatDemo";
import Footer from "@/components/Footer";
import {
  BG, SURFACE, GREEN, BORDER, TEXT, MUTED, DIM,
  ChatRow, DataTable, Section, Divider, SectionHeading,
  FinalCTA, ProgressTracker, CarrierDots,
} from "@/components/LandingShared";

const maxW: React.CSSProperties = { maxWidth: 960, margin: "0 auto" };

const FreightBrokers = () => {
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
        <title>min. | Joint Memory for freight brokers</title>
        <meta name="description" content="Your brokerage doesn't have a memory. min. gives it one. min. turns every rate con, check call, and POD into a Joint Carrier Memory your whole team can search and act on." />
        <meta name="keywords" content="freight broker, joint memory, carrier intelligence, rate con, check call, POD, claim, private carrier network" />
        <link rel="canonical" href="https://getmin.ai/brokers" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getmin.ai/brokers" />
        <meta property="og:title" content="min. | Joint Memory for freight brokers" />
        <meta property="og:description" content="Your brokerage doesn't have a memory. min. gives it one. Every rate, every lane, every carrier, permanently searchable." />
      </Helmet>

      <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT, overflowX: "hidden" }}>
        <Header />

        <main style={{ paddingTop: 100 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

            {/* ── Hero ── */}
            <div className="hero-glow" style={{ paddingTop: 32, marginBottom: 80 }}>
              <div style={{ textAlign: "center", marginBottom: 56, position: "relative", zIndex: 1 }}>
                <p className="hero-stagger-1" style={{ color: GREEN, fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
                  Joint Carrier Memory
                </p>
                <h1
                  className="hero-stagger-2"
                  style={{ fontSize: "clamp(2.1rem, 5.2vw, 3.75rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", color: TEXT, margin: "0 0 20px 0", maxWidth: 920, marginLeft: "auto", marginRight: "auto" }}
                >
                  Your brokerage doesn't have a memory.{" "}
                  <span style={{ color: GREEN }}>min. gives it one.</span>
                </h1>
                <p className="hero-stagger-3" style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)", color: MUTED, fontWeight: 400, marginBottom: 40, lineHeight: 1.55, maxWidth: 740, marginLeft: "auto", marginRight: "auto" }}>
                  min. turns every email, load sheet, and quote into a Joint Memory that automatically maps your carriers by the lanes they run, the trucks they have, and the rates they quote. Search your history in plain English. Take action in one sentence.
                </p>
                <div className="hero-stagger-4" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href="https://app.getmin.ai/">
                    <Button size="lg" className="cta-glow text-white font-normal text-base px-8" style={{ backgroundColor: GREEN, border: "none" }}>
                      See it on your inbox
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  <a href="mailto:hello@getmin.ai?subject=Demo%20Request">
                    <Button size="lg" variant="outline" className="font-normal text-base px-8" style={{ borderColor: "rgba(255,255,255,0.15)", color: TEXT, background: "transparent" }}>
                      Watch 90-sec demo
                    </Button>
                  </a>
                </div>
                <p className="hero-stagger-4" style={{ color: DIM, fontSize: 12, marginTop: 14, fontStyle: "italic" }}>
                  Gmail or Outlook. 5-minute setup.
                </p>
              </div>

              <div className="hero-stagger-5" style={{ position: "relative", zIndex: 1 }}>
                <HeroChatDemo mascotSeed="freight-demo" />
              </div>
            </div>

            <Divider />

            {/* ── The Joint Memory concept ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Joint Memory"
                  headline={<>Your brokerage's shared brain.<br /><span style={{ color: GREEN }}>Finally outside someone's head.</span></>}
                  sub="min. connects to every broker's inbox and builds a single, shared intelligence layer from all of it. Not a static database. A living memory that updates with every email."
                />
                <div style={{ maxWidth: 720, margin: "0 auto", color: MUTED, fontSize: "1.02rem", lineHeight: 1.75 }}>
                  <p style={{ margin: "0 0 1.1em" }}>
                    min. doesn't just read text. It digests the documents where your data is actually trapped, emails, rate tables, load sheets, carrier quote replies, rate confirmations, BOLs, PODs, Excel docs, PDFs. Everything unstructured becomes structured memory.
                  </p>
                  <p style={{ margin: "0 0 1.1em" }}>
                    If a carrier quotes a lane once, min. remembers they run that lane, what equipment they have, and what rate they gave. Every rate con, every check call, every POD, every claim feeds the same memory.
                  </p>
                  <p style={{ margin: "0 0 1.1em" }}>
                    Over time, your brokerage ends up with something no competitor has: a living Joint Memory that knows who runs what lane, who covers on time, who pushes back on rates, who no-shows, and who your team should call first.
                  </p>
                  <p style={{ margin: 0, color: TEXT, fontWeight: 600 }}>
                    No data entry. min. grows smarter with every email your team sends and receives.
                  </p>
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── Six verbs ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }} id="skills">
              <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 8px" }}>
                <SectionHeading
                  eyebrow="What min. does"
                  headline={<>Search. Act. <span style={{ color: GREEN }}>Learn.</span></>}
                  sub="min. doesn't just store what your team knows. It lets your brokerage query it, act on it, and build on it, in plain language."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      emoji: "🧠",
                      title: "Unifying",
                      body: "Reading every broker's inbox across your shop. Merging carriers, lanes, rates, and reliability into one Joint Memory.",
                      example: "Your top rep has Fadi's best rates in her sent folder. Your newest hire doesn't know Fadi exists. After min., they both do.",
                    },
                    {
                      emoji: "🎯",
                      title: "Ranking",
                      body: "Scoring every carrier by lane fit, past performance, response speed, and current capacity signals.",
                      example: "Ask for flatbed carriers Vancouver → Kamloops, 12 carriers, ranked by last rate and response time, in 3 seconds.",
                    },
                    {
                      emoji: "📣",
                      title: "Blasting",
                      body: "Sending targeted rate requests in your voice, the second a load comes in.",
                      example: "Customer emails a Winnipeg → Vancouver 35k FTL reefer. min. drafts and sends 14 personalized rate requests to the right carriers in one click.",
                    },
                    {
                      emoji: "📝",
                      title: "Covering",
                      body: "Drafting rate cons, BOLs, and tender sheets as carriers confirm.",
                      example: "Carrier replies 'yes, $2,300 all-in.' min. drafts the rate con, sends it, and logs the load, before you finish reading the reply.",
                    },
                    {
                      emoji: "📡",
                      title: "Tracking",
                      body: "Watching every check call, appointment, and POD thread. Surfacing exceptions before they become claims.",
                      example: "No check-in from carrier in 6 hours? min. pings the driver. Appointment unconfirmed by EOD? min. chases. POD missing 24 hours after delivery? min. asks.",
                    },
                    {
                      emoji: "🧩",
                      title: "Learning",
                      body: "Updating Joint Memory with every outcome. On-time, late, claim, refused, renegotiated, no-show.",
                      example: "A carrier ghosts twice on Friday pickups. min. deprioritizes them for future Friday loads and flags it to you.",
                    },
                  ].map((v) => (
                    <div key={v.title} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "20px 20px 22px" }}>
                      <p style={{ margin: "0 0 10px", fontSize: 15, fontWeight: 600, color: TEXT }}>
                        {v.emoji} {v.title}
                      </p>
                      <p style={{ margin: "0 0 12px", fontSize: 14, color: MUTED, lineHeight: 1.55 }}>{v.body}</p>
                      <p style={{ margin: 0, fontSize: 12.5, color: DIM, lineHeight: 1.55, fontStyle: "italic", borderTop: `1px solid ${BORDER}`, paddingTop: 10 }}>
                        {v.example}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── What min. learns from ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <SectionHeading
                  eyebrow="Automatic lane mapping"
                  headline={<>Every carrier email teaches<br /><span style={{ color: GREEN }}>Joint Memory something.</span></>}
                  sub="Every one of those events is an email in your team's inbox. min. reads every one, per carrier, per lane, per load."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    {
                      title: "From rate requests & cons",
                      items: ["Which carriers reply first", "Who quotes under the lane average", "Who pushes back, who takes first offer", "Who ghosts and who commits"],
                    },
                    {
                      title: "From dispatch & transit",
                      items: ["Who shows up on time for pickup", "Who check-calls without being chased", "Who re-routes late, who delivers early", "Who handles accessorials without drama"],
                    },
                    {
                      title: "From delivery & aftermath",
                      items: ["Who sends PODs within 24 hours", "Who logs detention fairly vs pads time", "Who files claims vs absorbs costs", "Who repeat-books and who disappears"],
                    },
                  ].map((col) => (
                    <div key={col.title} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "22px 22px 20px" }}>
                      <p style={{ color: TEXT, fontSize: 15, fontWeight: 600, margin: "0 0 14px" }}>{col.title}</p>
                      <ul style={{ margin: 0, paddingLeft: 18, color: MUTED, fontSize: 14, lineHeight: 1.6 }}>
                        {col.items.map((item) => (
                          <li key={item} style={{ marginBottom: 8 }}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── Section 3: Extracts Everything ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Inbox → Joint Memory"
                  headline={<>Your lanes, your carriers,<br />your rates.<br /><span style={{ color: GREEN }}>Already in carrier email.</span></>}
                  sub="Sign in with Gmail or Outlook. min. reads every rate con thread, tender reply, and check-call update already sitting in history, carriers, lanes, booked rates, refusals, so your Joint Memory updates with every new message."
                />

                <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-5" style={{ marginBottom: 48 }}>
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 22 }}>
                    <p style={{ color: DIM, fontSize: 11, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>Incoming email</p>
                    <p style={{ color: MUTED, fontSize: 12, fontWeight: 600, marginBottom: 4 }}>From: dispatch@stglogistics.com</p>
                    <p style={{ color: MUTED, fontSize: 12, marginBottom: 14 }}>Subject: Re: Rate Quote: FTL Dry Van</p>
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
                    <p style={{ color: GREEN, fontSize: 11, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Automatically indexed</p>
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ marginBottom: 48 }}>
                  {[
                    { stat: "30 sec", label: "to connect and let min. start reading" },
                    { stat: "50,000+", label: "carrier threads indexed in under 20 min" },
                    { stat: "Zero", label: "data entry. Lanes map themselves." },
                    { stat: "Always", label: "updates when the next POD or claim hits" },
                  ].map(({ stat, label }) => (
                    <div key={stat} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "20px 18px" }}>
                      <p style={{ color: GREEN, fontSize: "1.5rem", fontWeight: 700, margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>{stat}</p>
                      <p style={{ color: MUTED, fontSize: 13, margin: 0, lineHeight: 1.45 }}>{label}</p>
                    </div>
                  ))}
                </div>

                <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                  <ChatRow role="user" style={{ marginBottom: 16 }}>
                    <p style={{ color: TEXT, fontSize: 14, margin: 0 }}>Give me a list of carriers that run FTL dry van from LA to Miami</p>
                  </ChatRow>
                  <ChatRow role="ai" seed="extraction-carriers">
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

            {/* ── Section 4: Live Shipment Tracking ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Check calls & GPS"
                  headline={<>Real GPS. Real weather.<br /><span style={{ color: GREEN }}>Real ETA.</span></>}
                  sub="min. chases tracking links in carrier email, pings Samsara and FourKites for the real truck, then revises delivery windows before the check-call thread goes cold."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                    <ChatRow role="user" style={{ marginBottom: 14 }}>
                      <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
                        Where's the Dallas load right now? Is it going to make the delivery window?
                      </p>
                    </ChatRow>
                    <ChatRow role="ai" seed="trk-broker">
                      <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>Load #DAL-3385, I-30 near Texarkana, TX</p>
                      <DataTable
                        rows={[
                          ["GPS source", "Samsara · updated 8 min ago"],
                          ["Carrier ETA", "Thu 2:00pm"],
                          ["Real ETA", "Thu 3:30pm (+1h30m)"],
                          ["Weather", "Rain on I-30 east of Dallas"],
                          ["Delivery window", "Thu 7am–5pm · will make it"],
                        ]}
                      />
                    </ChatRow>
                  </div>

                  <div style={{ background: SURFACE, border: "1px solid rgba(234,179,8,0.15)", borderRadius: 16, padding: 24 }}>
                    <p style={{ color: "#FCD34D", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14, fontWeight: 600 }}>Automatic exception</p>
                    <ChatRow role="ai" seed="trk-broker-exc">
                      <p style={{ color: "#FCD34D", fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>⚠ Load #MIA-3401, stationary 3 hours</p>
                      <DataTable
                        rows={[
                          ["Location", "I-10 near Houston, TX"],
                          ["GPS source", "FourKites · last ping 3h ago"],
                          ["Original ETA", "Wed 4:00pm"],
                          ["Revised ETA", "Thu 10:00am (+18hrs)"],
                          ["Issue", "Truck stationary · possible breakdown"],
                        ]}
                      />
                      <p style={{ color: MUTED, fontSize: 12, margin: "8px 0 0" }}>Carrier notified. You'll get a text when they respond.</p>
                    </ChatRow>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 4, marginTop: 24 }}>
                  {[
                    "Pulls tracking links out of carrier email, Samsara, FourKites, project44, MacroPoint, and more",
                    "Re-ranks ETA with live weather and traffic instead of yesterday's MacroPoint ping",
                    "Surfaces detention risk and missed delivery windows before the POD fight starts",
                  ].map((point) => (
                    <div key={point} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: GREEN, flexShrink: 0, fontSize: 13 }}>✓</span>
                      <span style={{ color: MUTED, fontSize: 13, lineHeight: 1.5 }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── Section 5: Carrier Blast ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Blast & chase"
                  headline={<>Send a rate request<br />to 36 carriers.{" "}<span style={{ color: GREEN }}>In one sentence.</span></>}
                  sub="One prompt blasts FTL dry van or reefer tenders to your lane list, logs every quote, and schedules follow-ups that cancel the second a carrier replies."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                    <ChatRow role="user" style={{ marginBottom: 20 }}>
                      <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
                        Send a rate request to my top carriers for FTL dry van LA to Miami, follow up in 2 days if they don't respond
                      </p>
                    </ChatRow>
                    <ChatRow role="ai" seed="blast-carriers">
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
                      <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 20px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Live response tracker</p>
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

            {/* ── Section 6: Negotiation ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Quote → book"
                  headline={<>min. renegotiates while you<br /><span style={{ color: GREEN }}>cover the next tender.</span></>}
                  sub="min. pulls booked rate cons and refused offers from your Joint Memory before drafting counters. Grounded in your lane history, not a generic model guess."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                    <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 20 }}>
                      Negotiation thread, Norfolk route
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
                      <p style={{ color: GREEN, fontSize: 11, fontWeight: 600, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>✓ Counter-offer drafted & sent</p>
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

                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.12)", borderRadius: 16, padding: 24 }}>
                      <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                        min. pulls past rate cons and tender threads from your Joint Memory before countering, so you're not guessing what the lane should move for on today's dry van or reefer cover.
                      </p>
                    </div>

                    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
                      <ChatRow role="user" style={{ marginBottom: 14 }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Accept STG bid for Norfolk route and send the load confirmation</p>
                      </ChatRow>
                      <ChatRow role="ai" seed="negotiate-accept">
                        <p style={{ color: GREEN, fontSize: 13, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                          Done. Accepted at $2,600. Load confirmation sent to STG Logistics. Reference #NRF-2024-0312.
                        </p>
                      </ChatRow>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 4 }}>
                      {[
                        "Renegotiates across multi-round carrier email threads",
                        "Anchors counters in your booked rates, weather, and lane trends, not vibes",
                        "Sends acceptance, rate con draft, and load confirmation in one command",
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

            {/* ── Section 7: Morning Briefing ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Ops digest"
                  headline={<>Your morning briefing,<br /><span style={{ color: GREEN }}>before your coffee.</span></>}
                  sub="min. chases overnight rate replies, flags loads missing check calls, and lines up claims or detention threads before the day even starts."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                      <ChatRow role="user" style={{ marginBottom: 14 }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
                          Every morning at 7:15am, give me a briefing on new messages, pending quotes, and anything that needs attention
                        </p>
                      </ChatRow>
                      <ChatRow role="ai" seed="briefing-schedule">
                        <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500 }}>
                          Scheduled. You'll get a briefing at 7:15am every morning.
                        </p>
                      </ChatRow>
                    </div>

                    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 }}>
                      <ChatRow role="user" style={{ marginBottom: 14 }}>
                        <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Alert me if any carrier mentions a delay or breakdown</p>
                      </ChatRow>
                      <ChatRow role="ai" seed="alert-delay">
                        <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500 }}>
                          Alert set. I'll flag any delay or breakdown mentions as they arrive.
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

            {/* ── Insecurity hook: trapped intel ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Institutional asset"
                  headline={<>The carrier intelligence you've earned<br />is trapped in <span style={{ color: GREEN }}>10 inboxes.</span></>}
                  sub="Worth millions. Unsearchable. Walks out the door every time a rep quits."
                />
                <div style={{ maxWidth: 720, margin: "0 auto", color: MUTED, fontSize: "1.02rem", lineHeight: 1.75 }}>
                  <p style={{ margin: "0 0 1.1em" }}>
                    You've spent 8 years figuring out who's reliable, who's cheap but flaky, who runs reefer through the Rockies in January, who blows off small loads, and who runs Texas dray like clockwork.
                  </p>
                  <p style={{ margin: "0 0 1.1em" }}>
                    That knowledge is real. It's worth millions. It's yours.
                  </p>
                  <p style={{ margin: "0 0 1.1em" }}>
                    And it's invisible, scattered across every broker's inbox, dying a little every time someone quits, forgotten every time you need to cover a lane no one's run in six months.
                  </p>
                  <p style={{ margin: "0 0 1.4em" }}>
                    min. captures it, one email at a time. When a broker goes on vacation or leaves the firm, their carrier relationships, lane history, and rate intelligence <strong style={{ color: TEXT }}>stay inside your business</strong>, not somewhere a person walks out the door with.
                  </p>
                  <p style={{ margin: 0, padding: "18px 22px", background: "rgba(0,171,85,0.06)", border: "1px solid rgba(0,171,85,0.18)", borderRadius: 12, color: TEXT, fontWeight: 600, textAlign: "center", fontSize: "1.05rem" }}>
                    TQL has 10,000 people doing this manually.<br />
                    You don't need 10,000 people. You need <span style={{ color: GREEN }}>min.</span>.
                  </p>
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── TMS objection ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Inbox, not your TMS"
                  headline={<>Your TMS has your carrier list.<br />min. builds your <span style={{ color: GREEN }}>carrier intelligence.</span></>}
                  sub="Your TMS stays exactly as it is. min. never connects to it, never writes to it, never touches it. It lives in your inbox, not your system of record."
                />
                <div style={{ maxWidth: 720, margin: "0 auto", color: MUTED, fontSize: "1.02rem", lineHeight: 1.75, marginBottom: 32 }}>
                  <p style={{ margin: "0 0 1.1em" }}>
                    Your TMS stores MC numbers, contact emails, and insurance certs. That's a phone book.
                  </p>
                  <p style={{ margin: 0 }}>
                    min. builds the rest, the rate history, on-time record, response speed, lane coverage, accessorial capability, and reliability data that actually covers loads. All of it extracted from emails your TMS can't read.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginTop: 8 }}>
                  <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "22px 22px 20px" }}>
                    <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, margin: "0 0 14px" }}>
                      Your TMS knows
                    </p>
                    <p style={{ color: TEXT, fontSize: 14, fontWeight: 600, margin: "0 0 6px" }}>Fadi Kanaan Trucking</p>
                    <ul style={{ margin: 0, paddingLeft: 16, color: MUTED, fontSize: 13, lineHeight: 1.7 }}>
                      <li>MC# 12345</li>
                      <li>Ontario</li>
                      <li>Dry van</li>
                      <li>Status: Active</li>
                    </ul>
                  </div>

                  <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.22)", borderRadius: 14, padding: "22px 22px 20px" }}>
                    <p style={{ color: GREEN, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, margin: "0 0 14px" }}>
                      Joint Memory knows
                    </p>
                    <p style={{ color: TEXT, fontSize: 14, fontWeight: 600, margin: "0 0 6px" }}>Fadi Kanaan Trucking</p>
                    <ul style={{ margin: 0, paddingLeft: 16, color: MUTED, fontSize: 13, lineHeight: 1.7 }}>
                      <li>Runs Toronto → Montreal weekly</li>
                      <li>Averaged <span style={{ color: TEXT }}>$2,340</span> last 90 days</li>
                      <li>Replies in 8 minutes</li>
                      <li>14 loads covered · 100% on-time</li>
                      <li>Pushes back $200 on Friday loads</li>
                      <li>Strongest team rel: <span style={{ color: TEXT }}>Alex</span></li>
                    </ul>
                  </div>
                </div>

                <p style={{ textAlign: "center", marginTop: 22, color: DIM, fontSize: 13, fontStyle: "italic" }}>
                  Keep whatever TMS you use. min. never touches it.
                </p>
              </div>
            </Section>

            <Divider />

            {/* ── How It Works ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Setup"
                  headline={<>5 minutes to connect.<br /><span style={{ color: GREEN }}>24 hours to see your real network.</span></>}
                  sub="No TMS to connect. No migration. No IT project."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      step: "1",
                      title: "Connect every broker's inbox.",
                      body: "Gmail or Outlook. About 5 minutes per broker. No IT project, no migration.",
                    },
                    {
                      step: "2",
                      title: "min. gets to work.",
                      body: "Within 24 hours, your brokerage has one unified Joint Memory, every carrier your team has ever emailed, indexed by lane, rate, equipment, and reliability.",
                    },
                    {
                      step: "3",
                      title: "Work loads from your own network.",
                      body: "Ask for carriers. Blast for rates. Cover loads. Track threads. min. handles the grunt work. Brokers broker.",
                    },
                  ].map((s) => (
                    <div key={s.step} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "22px 22px 20px" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 999, background: "rgba(0,171,85,0.12)", color: GREEN, fontSize: 13, fontWeight: 700, marginBottom: 14 }}>
                        {s.step}
                      </div>
                      <p style={{ margin: "0 0 8px", color: TEXT, fontSize: 15, fontWeight: 600 }}>{s.title}</p>
                      <p style={{ margin: 0, color: MUTED, fontSize: 14, lineHeight: 1.6 }}>{s.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── Customers ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Customers"
                  headline={<>Brokers running on <span style={{ color: GREEN }}>min.</span></>}
                  sub="Real brokers. Real loads. Real inboxes."
                />

                <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.18)", borderRadius: 16, padding: "22px 24px", marginBottom: 28 }}>
                  <p style={{ color: GREEN, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, margin: "0 0 10px" }}>
                    From 35 minutes to 4
                  </p>
                  <p style={{ color: TEXT, fontSize: 15, lineHeight: 1.6, margin: "0 0 10px", fontStyle: "italic" }}>
                    "Used to take me 35 minutes to cover a Savannah dray load. With min., 4 minutes. I covered three more loads today than I would have yesterday."
                  </p>
                  <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>
                    <strong style={{ color: TEXT }}>Andy Bergstrom</strong> · Owner, Portage Logistics
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Andy Bergstrom",
                      title: "Owner, Portage Logistics",
                      quote: "min. found a Savannah → Suwanee carrier in 3 seconds from a thread I forgot I had. Covered the load from my own network at $200 under DAT spot. That's my whole week of min. right there.",
                    },
                    {
                      name: "Fotis Ramosz",
                      title: "Broker, Matrix",
                      quote: "I used to open 12 Outlook tabs to get PO statuses. Now I just ask. min. reads every carrier reply and gives me one table. Saved me two hours a day.",
                    },
                    {
                      name: "Round Table Logistics",
                      title: "Owner",
                      quote: "Every strawberry load from Jake Larson gets picked up, tracked, and confirmed without me touching my inbox. min. knows the format and handles it.",
                    },
                  ].map((c) => (
                    <div key={c.name} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "22px 22px 20px", display: "flex", flexDirection: "column" }}>
                      <p style={{ color: MUTED, fontSize: 13.5, lineHeight: 1.6, margin: "0 0 14px", fontStyle: "italic", flex: 1 }}>
                        "{c.quote}"
                      </p>
                      <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>
                        <p style={{ color: TEXT, fontSize: 13, fontWeight: 600, margin: 0 }}>{c.name}</p>
                        <p style={{ color: DIM, fontSize: 12, margin: "2px 0 0" }}>{c.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── Pricing ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }} id="pricing">
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Pricing"
                  headline={<>One seat per broker.<br /><span style={{ color: GREEN }}>Every seat feeds the same Joint Memory.</span></>}
                  sub="Month-to-month. Cancel anytime."
                />

                <div style={{ maxWidth: 520, margin: "0 auto", background: SURFACE, border: "1px solid rgba(0,171,85,0.22)", borderRadius: 16, padding: "28px 28px 24px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 18 }}>
                    <p style={{ color: TEXT, fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>min.</p>
                    <p style={{ color: DIM, fontSize: 13, margin: 0 }}>per broker · per month</p>
                  </div>

                  <ul style={{ margin: "0 0 20px", padding: 0, listStyle: "none", color: MUTED, fontSize: 14, lineHeight: 1.8 }}>
                    {[
                      "Every broker connects their inbox",
                      "One unified Joint Memory across your whole team",
                      "Unlimited email processing",
                      "Gmail or Outlook",
                      "Month-to-month, cancel anytime",
                      "White-glove setup included",
                    ].map((line) => (
                      <li key={line} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: GREEN, flexShrink: 0 }}>✓</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <a href="https://app.getmin.ai/" style={{ flex: 1, minWidth: 180 }}>
                      <Button size="lg" className="cta-glow text-white font-normal text-base w-full" style={{ backgroundColor: GREEN, border: "none" }}>
                        Start free 14-day trial
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                    <a href="mailto:hello@getmin.ai?subject=Demo%20Request" style={{ flex: 1, minWidth: 180 }}>
                      <Button size="lg" variant="outline" className="font-normal text-base w-full" style={{ borderColor: "rgba(255,255,255,0.15)", color: TEXT, background: "transparent" }}>
                        Book a demo instead
                      </Button>
                    </a>
                  </div>
                </div>

                <p style={{ textAlign: "center", marginTop: 22, color: DIM, fontSize: 13, fontStyle: "italic", maxWidth: 600, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
                  A carrier sales rep costs $80–120k/year. A min. seat is rounding error. And min. never takes PTO, never misses a rate con, and never walks out the door with your carrier list.
                </p>
              </div>
            </Section>

            <Divider />

            {/* ── Security & Trust ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={maxW}>
                <SectionHeading
                  eyebrow="Security"
                  headline={<>Your inboxes stay <span style={{ color: GREEN }}>yours.</span></>}
                  sub="Read-only by default. No training on your data. Your brokerage's carrier intel is an asset, not a data-broker product."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Read-only by default",
                      body: "min. reads your email. It only sends when you approve the draft.",
                    },
                    {
                      title: "SOC 2 Type II",
                      body: "In progress, Q2 2026. Google CASA Tier 2 compliant today.",
                    },
                    {
                      title: "No training on your data",
                      body: "Your emails never train shared models. Your Joint Memory is yours, not part of someone else's dataset.",
                    },
                    {
                      title: "Your data, your control",
                      body: "Export or delete at any time. Personal folders, internal threads, or anything tagged private can be excluded from day one.",
                    },
                  ].map((s) => (
                    <div key={s.title} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "20px 22px" }}>
                      <p style={{ margin: "0 0 6px", color: TEXT, fontSize: 14.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ color: GREEN }}>✓</span> {s.title}
                      </p>
                      <p style={{ margin: 0, color: MUTED, fontSize: 13.5, lineHeight: 1.6 }}>{s.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Divider />

            {/* ── Broker-specific FAQ ── */}
            <Section style={{ marginTop: 80, marginBottom: 80 }}>
              <div style={{ maxWidth: 780, margin: "0 auto" }}>
                <SectionHeading
                  eyebrow="FAQ"
                  headline={<>Questions owners ask<br /><span style={{ color: GREEN }}>before the demo.</span></>}
                  sub="TMS, team replacement, setup time, security, answered straight."
                />

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    {
                      q: "I already have a TMS. Do I need min.?",
                      a: "Yes, because your TMS only knows what your team typed in. min. reads what your inbox is actually saying. They do different jobs, and min. never touches your TMS. Whatever TMS you run today stays exactly as it is.",
                    },
                    {
                      q: "Will this replace my carrier sales team?",
                      a: "No. Brokers broker. min. handles the rest, the searching, the blasting, the drafting, the chasing, so your team can focus on the relationship work only a human can do.",
                    },
                    {
                      q: "What if my best rep quits?",
                      a: "Their carrier relationships, pricing history, and lane intelligence stay inside your Joint Memory. The knowledge finally belongs to the company, not the person.",
                    },
                    {
                      q: "How fast is this to set up?",
                      a: "About 5 minutes to connect one broker's inbox. 24 hours for min. to finish indexing the email history. Add more brokers one at a time. No migration, no IT project.",
                    },
                    {
                      q: "What about carrier email I don't want indexed?",
                      a: "You choose which folders to expose. Personal email, internal team threads, and anything tagged private can be excluded.",
                    },
                    {
                      q: "Is my data secure?",
                      a: "Read-only by default. SOC 2 Type II in progress. Your emails never train shared models. Your data is yours, exportable or deletable at any time.",
                    },
                    {
                      q: "Can I try it without committing?",
                      a: "14-day free trial on one seat. No credit card. Keep it or delete it, your call.",
                    },
                  ].map((item) => (
                    <details key={item.q} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "14px 18px" }}>
                      <summary style={{ color: TEXT, fontSize: 14.5, fontWeight: 500, cursor: "pointer", listStyle: "none" }}>
                        {item.q}
                      </summary>
                      <p style={{ margin: "10px 0 0", color: MUTED, fontSize: 13.5, lineHeight: 1.7 }}>
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>

                <div style={{ textAlign: "center", marginTop: 28 }}>
                  <p style={{ color: DIM, fontSize: 13, margin: "0 0 6px" }}>Still have questions?</p>
                  <a href="mailto:eric@getmin.ai" style={{ color: GREEN, fontSize: 13, textDecoration: "underline" }}>
                    eric@getmin.ai
                  </a>
                </div>
              </div>
            </Section>

            {/* ── Final CTA ── */}
            <FinalCTA
              headline={<>Stop digging through Outlook.<br /><span style={{ color: GREEN }}>Start searching your Joint Memory.</span></>}
              sub="5 minutes to connect. See your brokerage's real carrier network by Friday. If it lives in email, min. can do it."
            />

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FreightBrokers;

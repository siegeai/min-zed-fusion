import FeaturePageLayout from "@/components/FeaturePageLayout";
import {
  SURFACE, GREEN, BORDER, TEXT, MUTED, DIM,
  ChatRow, Section,
} from "@/components/LandingShared";

const Email = () => (
  <FeaturePageLayout
    title="Email Attachments & Rich Formatting"
    metaDescription="Your minion sends professional emails with attachments, auto-sized tables, embedded images, and GIFs. No more copy-paste formatting."
    canonicalPath="/features/email"
    eyebrow="Feature"
    headline={<>Professional emails,<br /><span style={{ color: GREEN }}>effortlessly.</span></>}
    subline="Attach files, embed images, auto-size tables. Your minion handles email formatting like a pro."
    mascotSeed="feat-email"
  >
    <Section style={{ marginTop: 80, marginBottom: 80 }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 32, letterSpacing: "-0.02em" }}>Examples</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <ChatRow role="user" style={{ marginBottom: 14 }}>
              <p style={{ color: TEXT, fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                Send the rate sheet to STG Logistics — attach the PDF from yesterday's email.
              </p>
            </ChatRow>
            <ChatRow role="ai" seed="email-1">
              <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500, marginBottom: 12 }}>✓ Email sent with attachment</p>
              <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 8, padding: 14, border: "1px solid rgba(255,255,255,0.04)" }}>
                <p style={{ color: TEXT, fontSize: 13, margin: "0 0 8px", fontWeight: 500 }}>To: dispatch@stglogistics.com</p>
                <p style={{ color: MUTED, fontSize: 12, margin: "0 0 12px" }}>Subject: Rate Sheet — Chicago to Atlanta Lanes</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "8px 12px" }}>
                  <span style={{ fontSize: 14 }}>📎</span>
                  <span style={{ color: TEXT, fontSize: 12 }}>rate_sheet_march_2024.pdf</span>
                  <span style={{ color: DIM, fontSize: 11, marginLeft: "auto" }}>248 KB</span>
                </div>
              </div>
            </ChatRow>
          </div>

          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <ChatRow role="user" style={{ marginBottom: 14 }}>
              <p style={{ color: TEXT, fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                Send Acme Industries a summary of their last 5 shipments with costs in a table.
              </p>
            </ChatRow>
            <ChatRow role="ai" seed="email-2">
              <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500, marginBottom: 12 }}>✓ Email drafted with auto-formatted table</p>
              <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.04)" }}>
                {[
                  ["PO #", "Route", "Carrier", "Cost"],
                  ["#4412", "CHI → DAL", "FedEx Freight", "$1,420"],
                  ["#4408", "LA → PHX", "Estes Express", "$980"],
                  ["#4401", "CHI → ATL", "Old Dominion", "$1,640"],
                  ["#4395", "SEA → LA", "XPO Logistics", "$2,100"],
                  ["#4388", "DAL → HOU", "Estes Express", "$720"],
                ].map((row, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1.3fr 0.8fr", padding: "7px 12px", borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.05)" : "none", background: i === 0 ? "rgba(255,255,255,0.03)" : "transparent" }}>
                    {row.map((cell, j) => (
                      <span key={j} style={{ color: i === 0 ? MUTED : j === 3 ? GREEN : TEXT, fontSize: i === 0 ? 11 : 12, fontWeight: i === 0 ? 600 : 400, textTransform: i === 0 ? "uppercase" : "none", letterSpacing: i === 0 ? "0.04em" : "normal" }}>
                        {cell}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </ChatRow>
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <h3 style={{ color: TEXT, fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Capabilities</h3>
          {[
            "Attach files from your inbox or mentions to outgoing emails",
            "Auto-size tables to fit content — no manual column resizing",
            "Embed images and GIFs inline in email body",
            "Professional formatting without HTML editing",
          ].map((point) => (
            <div key={point} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
              <span style={{ color: GREEN, flexShrink: 0, fontSize: 13 }}>✓</span>
              <span style={{ color: MUTED, fontSize: 14, lineHeight: 1.55 }}>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  </FeaturePageLayout>
);

export default Email;

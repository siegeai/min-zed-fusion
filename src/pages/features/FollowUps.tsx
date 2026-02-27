import FeaturePageLayout from "@/components/FeaturePageLayout";
import {
  SURFACE, GREEN, BORDER, TEXT, MUTED, DIM,
  ChatRow, Section,
} from "@/components/LandingShared";

const FollowUps = () => (
  <FeaturePageLayout
    title="Automatic Follow-Ups"
    metaDescription="Tell your minion to follow up on any email thread, on any cadence. Auto-cancels when the recipient replies. Never let a thread go cold again."
    canonicalPath="/features/follow-ups"
    eyebrow="Feature"
    headline={<>Automatic follow-ups<br />that <span style={{ color: GREEN }}>cancel themselves.</span></>}
    subline="Tell your minion to follow up on any thread, on any cadence. It auto-cancels when the recipient replies or you jump in."
    mascotSeed="feat-followup"
  >
    <Section style={{ marginTop: 80, marginBottom: 80 }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 32, letterSpacing: "-0.02em" }}>How it works</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <ChatRow role="user" style={{ marginBottom: 14 }}>
              <p style={{ color: TEXT, fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                Follow up with every carrier who hasn't responded to my rate request. Check every 2 days.
              </p>
            </ChatRow>
            <ChatRow role="ai" seed="fu-1">
              <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500, lineHeight: 1.6 }}>
                ✓ 3 follow-ups scheduled. I'll check every 2 days and auto-cancel each one when they reply.
              </p>
            </ChatRow>
          </div>

          <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.15)", borderRadius: 16, padding: 24 }}>
            <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
              Follow-up tracker — 48 hours later
            </p>
            {[
              { carrier: "Schneider National", status: "Replied with quote", state: "done" as const },
              { carrier: "Werner Enterprises", status: "Follow-up #1 sent", state: "pending" as const },
              { carrier: "J.B. Hunt", status: "Follow-up #1 sent", state: "pending" as const },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? `1px solid ${BORDER}` : "none" }}>
                <span style={{ color: TEXT, fontSize: 13 }}>{row.carrier}</span>
                <span style={{ color: row.state === "done" ? GREEN : MUTED, fontSize: 12, fontWeight: 500 }}>
                  {row.state === "done" ? "✓ " : "⏳ "}{row.status}
                </span>
              </div>
            ))}
          </div>

          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <ChatRow role="user" style={{ marginBottom: 14 }}>
              <p style={{ color: TEXT, fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                Follow up with Acme Industries about next week's capacity — remind them Tuesday if no reply.
              </p>
            </ChatRow>
            <ChatRow role="ai" seed="fu-2">
              <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500, lineHeight: 1.6 }}>
                ✓ Follow-up scheduled for Tuesday. I'll cancel automatically if they reply before then.
              </p>
            </ChatRow>
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <h3 style={{ color: TEXT, fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Key details</h3>
          {[
            "Works on any email thread — rate requests, capacity checks, invoices",
            "Set any cadence — every day, every 2 days, weekly",
            "Auto-cancels when they reply or you manually respond",
            "All pending follow-ups visible in your Task tab",
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

export default FollowUps;

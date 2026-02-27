import FeaturePageLayout from "@/components/FeaturePageLayout";
import {
  SURFACE, GREEN, BORDER, TEXT, MUTED, DIM,
  ChatRow, Section,
} from "@/components/LandingShared";

const Alerts = () => (
  <FeaturePageLayout
    title="Alerts in Plain English"
    metaDescription="Set alert conditions in plain English — your minion monitors your inbox and texts you when something happens. No dashboards, no rules engine."
    canonicalPath="/features/alerts"
    eyebrow="Feature"
    headline={<>Alerts that speak<br /><span style={{ color: GREEN }}>plain English.</span></>}
    subline={`"Text me if any carrier mentions a delay overnight." Set conditions in your own words — get notified via SMS when they trigger.`}
    mascotSeed="feat-alerts"
  >
    <Section style={{ marginTop: 80, marginBottom: 80 }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 32, letterSpacing: "-0.02em" }}>Examples</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <ChatRow role="user" style={{ marginBottom: 14 }}>
              <p style={{ color: TEXT, fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                Text me if any carrier mentions a breakdown or delay overnight.
              </p>
            </ChatRow>
            <ChatRow role="ai" seed="alert-1">
              <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500, marginBottom: 12 }}>✓ Alert created</p>
              <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 8, padding: "10px 12px", border: "1px solid rgba(255,255,255,0.04)" }}>
                {[
                  ["Trigger", "Breakdown or delay mentioned"],
                  ["Monitoring", "All incoming carrier emails"],
                  ["Notify via", "SMS to (312) 555-0142"],
                  ["Active", "Overnight · 7pm–7am"],
                ].map(([k, v], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <span style={{ color: DIM, fontSize: 12 }}>{k}</span>
                    <span style={{ color: TEXT, fontSize: 12 }}>{v}</span>
                  </div>
                ))}
              </div>
            </ChatRow>
          </div>

          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <ChatRow role="user" style={{ marginBottom: 14 }}>
              <p style={{ color: TEXT, fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                Alert me if any inbound shipment is delayed more than 4 hours.
              </p>
            </ChatRow>
            <ChatRow role="ai" seed="alert-2">
              <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500 }}>
                ✓ Alert set. I'll text you if any inbound shipment is delayed 4+ hours.
              </p>
            </ChatRow>
          </div>

          <div style={{ background: SURFACE, border: "1px solid rgba(234,179,8,0.15)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(234,179,8,0.03) 0%, transparent 50%)", pointerEvents: "none", borderRadius: 16 }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ color: "#FCD34D", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
                Alert triggered · 2:47am
              </p>
              <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 12, padding: 16, border: "1px solid rgba(234,179,8,0.12)" }}>
                <p style={{ color: TEXT, fontSize: 14, margin: "0 0 8px", fontWeight: 500 }}>
                  ⚠️ Delay detected — XPO Logistics
                </p>
                <p style={{ color: MUTED, fontSize: 13, margin: "0 0 6px", lineHeight: 1.55 }}>
                  XPO emailed at 2:41am: "Mechanical issue in Memphis. ETA pushed to Friday 2pm. Apologies for the inconvenience."
                </p>
                <p style={{ color: DIM, fontSize: 12, margin: 0 }}>
                  Load #3392 · Dallas → Chicago · Original ETA: Thu 10am
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <h3 style={{ color: TEXT, fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Key details</h3>
          {[
            "Set any condition in plain English — no rules engine or forms",
            "Get notified via SMS to your phone",
            "Monitors your inbox 24/7 in real-time",
            "Works for delays, rate thresholds, specific keywords, or any custom trigger",
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

export default Alerts;

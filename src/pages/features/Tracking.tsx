import FeaturePageLayout from "@/components/FeaturePageLayout";
import {
  SURFACE, GREEN, BORDER, TEXT, MUTED, DIM,
  ChatRow, DataTable, Section,
} from "@/components/LandingShared";

const PROVIDERS = [
  "Samsara", "FourKites", "project44", "MacroPoint",
  "Trucker Tools", "FedEx", "UPS Freight", "XPO",
  "Old Dominion", "Estes", "Descartes",
];

const Tracking = () => (
  <FeaturePageLayout
    title="Live Load Tracking"
    metaDescription="Real-time shipment tracking powered by GPS, weather, and traffic data. min. reads tracking links from your email, checks the actual truck location, and gives you a real ETA, not the carrier's stale one."
    canonicalPath="/skills/tracking"
    eyebrow="Live Load Tracking"
    headline={<>Real location.<br />Real ETA.<br /><span style={{ color: GREEN }}>Not the carrier's stale update.</span></>}
    subline="min. reads tracking links from your email, checks the actual truck position via GPS, factors in weather and traffic, and gives you an ETA you can trust."
    mascotSeed="feat-tracking"
  >
    <Section style={{ marginTop: 80, marginBottom: 80 }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>How it works</h2>
          <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            Carriers send tracking links in their emails. min. follows those links automatically, pulls the real GPS position of the truck, and cross-references it with live weather and traffic data to compute an actual ETA. When the math doesn't add up, a storm on the route, a truck that hasn't moved in 3 hours, it raises an exception before the carrier tells you.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48 }}>
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Real-time location + smart ETA</p>
            <ChatRow role="user" style={{ marginBottom: 14 }}>
              <p style={{ color: TEXT, fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                Where's the Acme load right now? Is it going to make the delivery window?
              </p>
            </ChatRow>
            <ChatRow role="ai" seed="trk-1">
              <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>Load #ACM-4412, In Transit</p>
              <DataTable
                rows={[
                  ["Current location", "I-40 near Amarillo, TX"],
                  ["GPS source", "Samsara · updated 12 min ago"],
                  ["Carrier ETA", "Thu 2:00pm"],
                  ["Real ETA", "Thu 3:45pm (+1h45m)"],
                  ["Reason", "Winter storm warning on I-40 near OKC"],
                  ["Delivery window", "Thu 8am–5pm · will make it"],
                ]}
              />
            </ChatRow>
          </div>

          <div style={{ background: SURFACE, border: "1px solid rgba(234,179,8,0.15)", borderRadius: 16, padding: 24 }}>
            <p style={{ color: "#FCD34D", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14, fontWeight: 600 }}>Automatic exception</p>
            <ChatRow role="ai" seed="trk-exc">
              <p style={{ color: "#FCD34D", fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>⚠ Delay risk, Load #PF-3392 (Pacific Foods)</p>
              <DataTable
                rows={[
                  ["Current location", "I-10 near Houston, TX, stationary 3hrs"],
                  ["GPS source", "FourKites · last ping 3h ago"],
                  ["Original ETA", "Wed 4:00pm"],
                  ["Revised ETA", "Thu 10:00am (+18hrs)"],
                  ["Issue", "Truck stationary · possible breakdown"],
                  ["Action", "Carrier notified · awaiting response"],
                ]}
              />
            </ChatRow>
          </div>

          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Fleet-wide visibility</p>
            <ChatRow role="user" style={{ marginBottom: 14 }}>
              <p style={{ color: TEXT, fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                Show me all shipments in transit right now with their real ETAs.
              </p>
            </ChatRow>
            <ChatRow role="ai" seed="trk-fleet">
              <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>8 shipments in transit</p>
              <DataTable
                hasHeader
                rows={[
                  ["Load", "Location", "Real ETA", "Status"],
                  ["#ACM-4412", "Amarillo, TX", "Thu 3:45pm", "On time"],
                  ["#PF-3392", "Houston, TX", "Thu 10:00am", "⚠ Delayed"],
                  ["#MW-2201", "Memphis, TN", "Wed 6:00pm", "On time"],
                  ["#ACM-4418", "Denver, CO", "Fri 11:00am", "On time"],
                ]}
              />
            </ChatRow>
          </div>

          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Weather + traffic intelligence</p>
            <ChatRow role="user" style={{ marginBottom: 14 }}>
              <p style={{ color: TEXT, fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                Any weather risks on my loads arriving this week?
              </p>
            </ChatRow>
            <ChatRow role="ai" seed="trk-wx">
              <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>2 loads with weather exposure</p>
              <DataTable
                rows={[
                  ["#ACM-4412", "Winter storm on I-40 near OKC · +1h45m"],
                  ["#RS-1108", "Ice advisory on I-70 in Kansas · +2h est"],
                ]}
              />
              <p style={{ color: MUTED, fontSize: 12, margin: "8px 0 0", lineHeight: 1.5 }}>
                Remaining 6 loads have clear routes. No traffic delays above 30 min.
              </p>
            </ChatRow>
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h3 style={{ color: TEXT, fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Supported tracking platforms</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {PROVIDERS.map((p) => (
              <span key={p} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 99, padding: "5px 14px", fontSize: 13, color: MUTED }}>{p}</span>
            ))}
            <span style={{ background: "rgba(0,171,85,0.08)", border: "1px solid rgba(0,171,85,0.18)", borderRadius: 99, padding: "5px 14px", fontSize: 13, color: GREEN }}>+ any link in your email</span>
          </div>
        </div>

        <div>
          <h3 style={{ color: TEXT, fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Key details</h3>
          {[
            "Reads tracking links directly from carrier emails, no manual input",
            "Real GPS location from Samsara, FourKites, project44, MacroPoint, and more",
            "Adjusts ETA using live weather data and real-time traffic conditions",
            "Raises exceptions automatically when a truck is late, stationary, or off-route",
            "Alerts you via SMS before the carrier does",
            "Ask about any load in plain English, \"where's my truck?\"",
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

export default Tracking;

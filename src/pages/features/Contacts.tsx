import FeaturePageLayout from "@/components/FeaturePageLayout";
import {
  SURFACE, GREEN, BORDER, TEXT, MUTED, DIM,
  Section,
} from "@/components/LandingShared";

const Contacts = () => (
  <FeaturePageLayout
    title="Smart Contact Classification"
    metaDescription="Your minion auto-classifies every contact (customer, carrier, vendor, or noise) from conversation history. No manual tagging needed."
    canonicalPath="/features/contacts"
    eyebrow="Feature"
    headline={<>Your minion knows who's who<br /><span style={{ color: GREEN }}>without you telling it.</span></>}
    subline="Auto-classifies every contact as customer, carrier, vendor, or noise based on your actual conversation history. Zero manual tagging."
    mascotSeed="feat-contacts"
  >
    <Section style={{ marginTop: 80, marginBottom: 80 }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 32, letterSpacing: "-0.02em" }}>How it works</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.15)", borderRadius: 16, padding: 24 }}>
            <p style={{ color: GREEN, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 20 }}>
              Auto-classified from your inbox
            </p>
            {[
              { name: "STG Logistics", email: "dispatch@stglogistics.com", type: "Carrier", color: "#60A5FA" },
              { name: "Acme Industries", email: "orders@acmeindustries.com", type: "Customer", color: GREEN },
              { name: "Pacific Components", email: "purchasing@pacificcomp.com", type: "Customer", color: GREEN },
              { name: "J.B. Hunt", email: "quotes@jbhunt.com", type: "Carrier", color: "#60A5FA" },
              { name: "Office Supply Co", email: "promo@officesupply.com", type: "Noise", color: "#EF4444" },
              { name: "Midwest Steel", email: "shipping@midweststeel.com", type: "Vendor", color: "#A78BFA" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 5 ? `1px solid ${BORDER}` : "none" }}>
                <div>
                  <p style={{ color: TEXT, fontSize: 13, fontWeight: 500, margin: "0 0 2px" }}>{c.name}</p>
                  <p style={{ color: DIM, fontSize: 12, margin: 0 }}>{c.email}</p>
                </div>
                <span style={{ background: `${c.color}15`, color: c.color, fontSize: 11, fontWeight: 600, borderRadius: 99, padding: "3px 10px", border: `1px solid ${c.color}30` }}>
                  {c.type}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
              <p style={{ color: "#EF4444", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Before</p>
              <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.6 }}>
                Manually tagging contacts in a CRM. Forgetting to update categories. New carriers slip through unclassified.
              </p>
            </div>
            <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.15)", borderRadius: 16, padding: 24 }}>
              <p style={{ color: GREEN, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>After</p>
              <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.6 }}>
                Your minion reads conversation context and auto-classifies everyone. New contacts are categorized the moment they email you.
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <h3 style={{ color: TEXT, fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Key details</h3>
          {[
            "Classifies based on actual email conversations, not guesses",
            "Categories: Customer, Carrier, Vendor, Noise (promotional/spam)",
            "New contacts auto-classified as soon as they email you",
            "Ask your minion to list all carriers, customers, or vendors anytime",
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

export default Contacts;

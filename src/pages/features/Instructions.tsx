import FeaturePageLayout from "@/components/FeaturePageLayout";
import {
  SURFACE, GREEN, BORDER, TEXT, MUTED, DIM,
  ChatRow, Section,
} from "@/components/LandingShared";

const Instructions = () => (
  <FeaturePageLayout
    title="Custom Instructions"
    metaDescription="Give min. standing rules: tone, style, or domain-specific instructions. Personalize how min. communicates on your behalf."
    canonicalPath="/skills/instructions"
    eyebrow="Custom Instructions"
    headline={<>min.,<br /><span style={{ color: GREEN }}>your rules.</span></>}
    subline="Set standing instructions: communication style, domain rules, or anything you want min. to always remember across every task."
    mascotSeed="feat-instructions"
  >
    <Section style={{ marginTop: 80, marginBottom: 80 }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 32, letterSpacing: "-0.02em" }}>Examples</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.15)", borderRadius: 16, padding: 24 }}>
            <p style={{ color: GREEN, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 20 }}>
              Example instructions
            </p>
            {[
              { instruction: "Always be concise. Bullet points over paragraphs", icon: "📝" },
              { instruction: "Reply to carriers in a professional but friendly tone", icon: "🤝" },
              { instruction: "When drafting emails, always include our company phone number in the signature", icon: "📞" },
              { instruction: "Never quote below $1,800 on the Chicago to Atlanta lane", icon: "💰" },
              { instruction: "When I say 'the usual carriers', I mean STG, Werner, and Schneider", icon: "🚚" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < 4 ? `1px solid ${BORDER}` : "none", alignItems: "flex-start" }}>
                <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                <span style={{ color: TEXT, fontSize: 13, lineHeight: 1.55 }}>{item.instruction}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
              <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Without instructions</p>
              <ChatRow role="user" style={{ marginBottom: 14 }}>
                <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Draft a follow-up to Werner</p>
              </ChatRow>
              <ChatRow role="ai" seed="instr-1">
                <p style={{ color: MUTED, fontSize: 13, margin: 0, lineHeight: 1.55, fontStyle: "italic" }}>
                  "Dear Werner Enterprises, I am writing to follow up on our previous correspondence regarding the rate quote. We would appreciate an update at your earliest convenience. Best regards..."
                </p>
              </ChatRow>
            </div>

            <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.15)", borderRadius: 16, padding: 24 }}>
              <p style={{ color: GREEN, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>With "be concise + friendly" instruction</p>
              <ChatRow role="user" style={{ marginBottom: 14 }}>
                <p style={{ color: TEXT, fontSize: 13, margin: 0 }}>Draft a follow-up to Werner</p>
              </ChatRow>
              <ChatRow role="ai" seed="instr-2">
                <p style={{ color: MUTED, fontSize: 13, margin: 0, lineHeight: 1.55, fontStyle: "italic" }}>
                  "Hey team, just checking in on the rate quote for CHI → ATL. Still good? Let me know!"
                </p>
              </ChatRow>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <h3 style={{ color: TEXT, fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Key details</h3>
          {[
            "Set as many standing rules as your team needs",
            "Instructions apply to all conversations and tasks",
            "Set communication tone, domain rules, or shorthand definitions",
            "Update anytime. Changes apply immediately to future interactions",
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

export default Instructions;

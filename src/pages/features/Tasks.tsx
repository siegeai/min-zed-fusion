import FeaturePageLayout from "@/components/FeaturePageLayout";
import {
  SURFACE, GREEN, BORDER, TEXT, MUTED, DIM,
  ChatRow, Section,
} from "@/components/LandingShared";

const Tasks = () => (
  <FeaturePageLayout
    title="Task Tracking"
    metaDescription="When you ask your minion to do something, it auto-creates a task to track progress. Each task runs in its own dedicated chat window."
    canonicalPath="/features/tasks"
    eyebrow="Feature"
    headline={<>Every action becomes<br /><span style={{ color: GREEN }}>a tracked task.</span></>}
    subline="Ask your minion to do something — it creates a task automatically. Each task runs in its own chat window so nothing gets lost."
    mascotSeed="feat-tasks"
  >
    <Section style={{ marginTop: 80, marginBottom: 80 }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 32, letterSpacing: "-0.02em" }}>How it works</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <ChatRow role="user" style={{ marginBottom: 14 }}>
              <p style={{ color: TEXT, fontSize: 14, margin: 0, lineHeight: 1.55 }}>
                Blast a rate request to my top 20 carriers for flatbed Seattle to LA, next Tuesday.
              </p>
            </ChatRow>
            <ChatRow role="ai" seed="task-1">
              <p style={{ color: GREEN, fontSize: 13, margin: 0, fontWeight: 500, lineHeight: 1.6 }}>
                ✓ Sending to 20 carriers. Task created — you can track progress in the Tasks tab.
              </p>
            </ChatRow>
          </div>

          <div style={{ background: SURFACE, border: "1px solid rgba(0,171,85,0.15)", borderRadius: 16, padding: 24 }}>
            <p style={{ color: GREEN, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
              Tasks tab
            </p>
            {[
              { name: "Rate blast — Flatbed SEA→LA", status: "In progress", detail: "12/20 sent · 3 replied", color: GREEN },
              { name: "Follow up — Schneider, Werner, JB Hunt", status: "Scheduled", detail: "Triggers in 2 days", color: "#FCD34D" },
              { name: "Morning briefing", status: "Recurring", detail: "Every day · 7:15am", color: "#60A5FA" },
              { name: "Alert — delay mentions", status: "Active", detail: "Monitoring 24/7", color: "#60A5FA" },
            ].map((task, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ color: TEXT, fontSize: 13, fontWeight: 500 }}>{task.name}</span>
                  <span style={{ color: task.color, fontSize: 11, fontWeight: 600 }}>{task.status}</span>
                </div>
                <p style={{ color: DIM, fontSize: 12, margin: 0 }}>{task.detail}</p>
              </div>
            ))}
          </div>

          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
            <p style={{ color: DIM, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
              Dedicated task window — Rate blast
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { time: "10:00am", text: "Started sending to 20 carriers..." },
                { time: "10:02am", text: "12/20 emails sent. 8 remaining." },
                { time: "10:04am", text: "All 20 sent. 3 replies so far." },
                { time: "2:30pm", text: "8 replies total. Best rate: Werner @ $2,750." },
              ].map((log, i) => (
                <div key={i} style={{ display: "flex", gap: 10 }}>
                  <span style={{ color: DIM, fontSize: 11, fontVariantNumeric: "tabular-nums", flexShrink: 0, paddingTop: 2 }}>{log.time}</span>
                  <span style={{ color: MUTED, fontSize: 13, lineHeight: 1.5 }}>{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <h3 style={{ color: TEXT, fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Key details</h3>
          {[
            "Tasks auto-created when you ask your minion to do something",
            "Each task runs in its own dedicated chat window",
            "Edit task names and delete tasks you no longer need",
            "Track email blasts, follow-ups, alerts, and scheduled actions in one place",
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

export default Tasks;

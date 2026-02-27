import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MiniMascot from "@/components/MiniMascot";

// ─── Style tokens ───────────────────────────────────────────────────────
export const BG = "#161C24";
export const SURFACE = "#1E2630";
export const GREEN = "#00AB55";
export const BORDER = "rgba(255,255,255,0.07)";
export const TEXT = "#F9FAFB";
export const MUTED = "#9CA3AF";
export const DIM = "#6B7280";

// ─── Scroll-reveal hook ────────────────────────────────────────────────
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null!);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Chat message row ──────────────────────────────────────────────────
export const ChatRow = ({
  role,
  children,
  style,
  seed,
}: {
  role: "user" | "ai";
  children: React.ReactNode;
  style?: React.CSSProperties;
  seed?: string;
}) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, ...style }}>
    {role === "ai" ? (
      <MiniMascot size={28} seed={seed} />
    ) : (
      <div
        style={{
          width: 28, height: 28, borderRadius: "50%", background: GREEN,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 700, color: "white", flexShrink: 0,
          letterSpacing: "-0.01em",
        }}
      >
        You
      </div>
    )}
    <div style={{ flex: 1, paddingTop: 3 }}>{children}</div>
  </div>
);

// ─── Data table ────────────────────────────────────────────────────────
export const DataTable = ({
  rows,
  hasHeader = false,
}: {
  rows: [string, string, string?][];
  hasHeader?: boolean;
}) => (
  <div
    style={{
      background: "rgba(0,0,0,0.25)", borderRadius: 8,
      border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden", marginTop: 10,
    }}
  >
    {rows.map(([col1, col2, col3], i) => {
      const isHeader = hasHeader && i === 0;
      return (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: col3 ? "1fr 1fr 1fr" : "1fr 1fr",
            padding: isHeader ? "6px 12px" : "7px 12px",
            borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            gap: 8,
            background: isHeader ? "rgba(255,255,255,0.03)" : "transparent",
          }}
        >
          <span style={{ color: isHeader ? MUTED : DIM, fontSize: isHeader ? 11 : 12, fontWeight: isHeader ? 600 : 400, textTransform: isHeader ? "uppercase" : "none", letterSpacing: isHeader ? "0.04em" : "normal" }}>
            {col1}
          </span>
          <span style={{ color: isHeader ? MUTED : "#E5E7EB", fontSize: isHeader ? 11 : 12, fontWeight: isHeader ? 600 : 400, textTransform: isHeader ? "uppercase" : "none", letterSpacing: isHeader ? "0.04em" : "normal" }}>
            {col2}
          </span>
          {col3 && (
            <span style={{ color: isHeader ? MUTED : GREEN, fontSize: isHeader ? 11 : 12, textAlign: "right", fontWeight: isHeader ? 600 : 400, textTransform: isHeader ? "uppercase" : "none", letterSpacing: isHeader ? "0.04em" : "normal" }}>
              {col3}
            </span>
          )}
        </div>
      );
    })}
  </div>
);

// ─── Section wrapper (scroll-reveal) ───────────────────────────────────
export const Section = ({
  children,
  style,
  className,
  id,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
}) => {
  const { ref, visible } = useScrollReveal();
  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
        ...style,
      }}
    >
      {children}
    </section>
  );
};

// ─── Divider ───────────────────────────────────────────────────────────
export const Divider = () => (
  <div className="section-divider" style={{ marginTop: 0, marginBottom: 0 }} />
);

// ─── Section heading ───────────────────────────────────────────────────
export const SectionHeading = ({
  eyebrow,
  headline,
  sub,
}: {
  eyebrow: string;
  headline: React.ReactNode;
  sub: string;
}) => (
  <>
    <p style={{ color: GREEN, fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center", marginBottom: 16 }}>
      {eyebrow}
    </p>
    <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", fontWeight: 700, letterSpacing: "-0.025em", textAlign: "center", marginBottom: 14, lineHeight: 1.2 }}>
      {headline}
    </h2>
    <p style={{ color: MUTED, textAlign: "center", fontSize: "1.05rem", marginBottom: 52, lineHeight: 1.6, maxWidth: 560, margin: "0 auto 52px" }}>
      {sub}
    </p>
  </>
);

// ─── Final CTA block ───────────────────────────────────────────────────
export const FinalCTA = ({
  headline,
  sub,
  buttonText = "Try for free",
}: {
  headline: React.ReactNode;
  sub: string;
  buttonText?: string;
}) => (
  <Section style={{ marginBottom: 80 }}>
    <div
      style={{
        textAlign: "center",
        background: "linear-gradient(135deg, rgba(0,171,85,0.1) 0%, rgba(0,171,85,0.03) 100%)",
        border: "1px solid rgba(0,171,85,0.18)",
        borderRadius: 24,
        padding: "72px 40px",
        maxWidth: 860,
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "linear-gradient(rgba(0,171,85,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,171,85,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px", borderRadius: 24 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 16, lineHeight: 1.25 }}>
          {headline}
        </h2>
        <p style={{ color: MUTED, fontSize: "1.05rem", marginBottom: 36, lineHeight: 1.6 }}>
          {sub}
        </p>
        <a href="https://app.getmin.ai/">
          <Button size="lg" className="cta-glow text-white font-normal text-base px-10" style={{ backgroundColor: GREEN, border: "none" }}>
            {buttonText}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </a>
        <p style={{ color: DIM, fontSize: 13, marginTop: 16 }}>
          No credit card required · Gmail & Outlook
        </p>
      </div>
    </div>
  </Section>
);

// ─── Progress bar component ────────────────────────────────────────────
export const ProgressTracker = ({ total = 36, label = "Carrier responses" }: { total?: number; label?: string }) => {
  const { ref, visible } = useScrollReveal(0.3);
  const steps = [3, 6, 8, 11, 12, 15, 16, 18];
  const [count, setCount] = useState(steps[0]);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < steps.length) setCount(steps[i]);
      else clearInterval(interval);
    }, 500);
    return () => clearInterval(interval);
  }, [visible]);

  const pct = Math.round((count / total) * 100);

  return (
    <div ref={ref} style={{ marginTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ color: MUTED, fontSize: 13 }}>{label}</span>
        <span style={{ color: TEXT, fontSize: 22, fontWeight: 700, fontVariantNumeric: "tabular-nums", transition: "all 0.35s ease" }}>
          {count}
          <span style={{ color: DIM, fontSize: 16, fontWeight: 400 }}> / {total}</span>
        </span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 6, overflow: "hidden" }}>
        <div style={{ height: "100%", background: `linear-gradient(90deg, ${GREEN}, #34D399)`, borderRadius: 99, width: `${pct}%`, transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <span style={{ color: DIM, fontSize: 12 }}>
          Auto follow-ups pending: {Math.max(0, total - count)}
        </span>
        {count >= 18 && (
          <span style={{ color: GREEN, fontSize: 12, animation: "slide-up-fade 0.4s ease forwards" }}>
            ✓ Done while you slept
          </span>
        )}
      </div>
    </div>
  );
};

// ─── Animated dot grid ────────────────────────────────────────────────
export const CarrierDots = ({ count = 36 }: { count?: number }) => {
  const { ref, visible } = useScrollReveal(0.3);
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i <= count) setFilled(i);
      else clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [visible, count]);

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(9, count)}, 1fr)`, gap: 6, marginBottom: 16 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: "100%", aspectRatio: "1", borderRadius: "50%",
            background: i < filled ? (i < Math.floor(count / 2) ? GREEN : "rgba(0,171,85,0.35)") : "rgba(255,255,255,0.06)",
            border: i < filled && i < Math.floor(count / 2) ? "none" : "1px solid rgba(255,255,255,0.06)",
            transition: "background 0.25s ease, border 0.25s ease",
            boxShadow: i < filled && i < Math.floor(count / 2) ? "0 0 6px rgba(0,171,85,0.25)" : "none",
          }}
        />
      ))}
    </div>
  );
};

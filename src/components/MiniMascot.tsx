import { useMemo } from "react";

/* ─── Seeded PRNG (Mulberry32) ───────────────────────────────────────── */
function mulberry32(a: number) {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStr(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h >>> 0;
}

function hslHex(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * c).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/* ─── Trait pools ────────────────────────────────────────────────────── */
const ACCESSORIES: ("none" | "sprout" | "crown" | "halo" | "antenna" | "bow")[] =
  ["sprout", "crown", "halo", "antenna", "bow", "none", "sprout"];

const SHAPES = [
  "48% 52% 52% 48% / 50% 46% 54% 50%",
  "50% 50% 45% 55% / 55% 45% 50% 50%",
  "52% 48% 48% 52% / 48% 52% 50% 50%",
  "45% 55% 50% 50% / 50% 50% 55% 45%",
  "47% 53% 53% 47% / 53% 47% 47% 53%",
];

interface Traits {
  c1: string; c2: string; c3: string;
  shadow: string; darkPupil: string;
  bodyShape: string; accessory: string;
  eyeScale: number; cheekOpacity: number;
  animDelay: string;
}

function getTraits(seed: string): Traits {
  const rng = mulberry32(hashStr(seed));
  const hue = Math.floor(rng() * 360);
  return {
    c1: hslHex(hue, 70, 72),
    c2: hslHex(hue, 75, 60),
    c3: hslHex(hue, 72, 48),
    shadow: `hsla(${hue}, 70%, 55%, 0.35)`,
    darkPupil: hslHex(hue, 40, 12),
    bodyShape: SHAPES[Math.floor(rng() * SHAPES.length)],
    accessory: ACCESSORIES[Math.floor(rng() * ACCESSORIES.length)],
    eyeScale: 0.9 + rng() * 0.2,
    cheekOpacity: 0.25 + rng() * 0.2,
    animDelay: `-${(rng() * 2.5).toFixed(2)}s`,
  };
}

/* ─── Default traits (the blue mascot) ──────────────────────────────── */
const DEFAULT: Traits = {
  c1: "#6C9FFF", c2: "#4F7BF7", c3: "#3B5EE6",
  shadow: "rgba(79,123,247,0.35)", darkPupil: "#1a1a2e",
  bodyShape: "48% 52% 52% 48% / 50% 46% 54% 50%",
  accessory: "sprout", eyeScale: 1, cheekOpacity: 0.3,
  animDelay: "0s",
};

/* ─── Accessory renderers ───────────────────────────────────────────── */
function Accessory({ type, b, c1 }: { type: string; b: (v: number) => number; c1: string }) {
  switch (type) {
    case "sprout":
      return (
        <div style={{ position: "absolute", top: b(-0.14), left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2 }}>
          <div style={{ width: b(0.12), height: b(0.14), background: "#4ADE80", borderRadius: "50% 0 50% 0", transform: "rotate(-20deg)" }} />
          <div style={{ width: Math.max(1, b(0.03)), height: b(0.06), background: "#6EE7B7", borderRadius: 1, marginTop: -1 }} />
        </div>
      );
    case "crown":
      return (
        <div style={{ position: "absolute", top: b(-0.08), left: "50%", transform: "translateX(-50%)", display: "flex", gap: Math.max(1, b(0.015)), zIndex: 2 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: 0, height: 0, borderLeft: `${Math.max(2, b(0.05))}px solid transparent`, borderRight: `${Math.max(2, b(0.05))}px solid transparent`, borderBottom: `${Math.max(3, b(0.09))}px solid #FFD700` }} />
          ))}
        </div>
      );
    case "halo":
      return (
        <div style={{ position: "absolute", top: b(-0.1), left: "50%", transform: "translateX(-50%)", width: b(0.55), height: b(0.15), border: `${Math.max(2, b(0.025))}px solid #FFD700`, borderRadius: "50%", zIndex: 2, opacity: 0.85 }} />
      );
    case "antenna":
      return (
        <div style={{ position: "absolute", top: b(-0.18), left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2 }}>
          <div style={{ width: b(0.08), height: b(0.08), background: c1, borderRadius: "50%", border: `${Math.max(1, b(0.015))}px solid rgba(255,255,255,0.7)`, boxShadow: `0 0 ${b(0.03)}px ${c1}` }} />
          <div style={{ width: Math.max(1, b(0.02)), height: b(0.1), background: "rgba(255,255,255,0.6)", borderRadius: 1, marginTop: -1 }} />
        </div>
      );
    case "bow":
      return (
        <div style={{ position: "absolute", top: b(-0.04), left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", alignItems: "center" }}>
          <div style={{ width: b(0.1), height: b(0.08), background: "#FF69B4", borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", transform: "rotate(-15deg)" }} />
          <div style={{ width: b(0.04), height: b(0.04), background: "#FF1493", borderRadius: "50%", margin: `0 ${Math.max(1, b(0.005))}px` }} />
          <div style={{ width: b(0.1), height: b(0.08), background: "#FF69B4", borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", transform: "rotate(15deg)" }} />
        </div>
      );
    default:
      return null;
  }
}

/* ─── Component ─────────────────────────────────────────────────────── */
const MiniMascot = ({ size = 30, seed }: { size?: number; seed?: string }) => {
  const t = useMemo(() => (seed ? getTraits(seed) : DEFAULT), [seed]);
  const b = (v: number) => Math.round(size * v);
  const es = t.eyeScale;

  return (
    <div style={{ width: size, height: size, position: "relative", flexShrink: 0 }}>
      <Accessory type={t.accessory} b={b} c1={t.c1} />

      {/* Body */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: t.bodyShape,
          background: `linear-gradient(145deg, ${t.c1} 0%, ${t.c2} 50%, ${t.c3} 100%)`,
          position: "relative",
          boxShadow: `0 3px 10px ${t.shadow}`,
          animation: "mascot-idle 2.5s ease-in-out infinite",
          animationDelay: t.animDelay,
          zIndex: 1,
        }}
      >
        {/* Highlight */}
        <div style={{ position: "absolute", top: b(0.08), left: b(0.15), width: b(0.35), height: b(0.18), background: "rgba(255,255,255,0.18)", borderRadius: "50%", transform: "rotate(-15deg)" }} />

        {/* Eyes */}
        {(["left", "right"] as const).map(side => (
          <div
            key={side}
            style={{
              position: "absolute",
              top: b(0.22),
              [side === "left" ? "left" : "right"]: b(0.14),
              width: b(0.24 * es),
              height: b(0.26 * es),
              background: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 3,
            }}
          >
            <div style={{ width: b(0.13), height: b(0.13), background: t.darkPupil, borderRadius: "50%", position: "relative", animation: "mascot-look 4s ease-in-out infinite", animationDelay: t.animDelay }}>
              <div style={{ position: "absolute", top: Math.max(1, b(0.02)), right: Math.max(1, b(0.02)), width: Math.max(1, b(0.045)), height: Math.max(1, b(0.045)), background: "white", borderRadius: "50%" }} />
            </div>
          </div>
        ))}

        {/* Mouth */}
        <div style={{ position: "absolute", bottom: b(0.18), left: "50%", transform: "translateX(-50%)", width: b(0.22), height: b(0.12), background: t.darkPupil, borderRadius: "0 0 50% 50%", overflow: "hidden", zIndex: 3 }}>
          <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: b(0.11), height: b(0.06), background: "#FF7EB3", borderRadius: "50% 50% 0 0" }} />
        </div>

        {/* Cheeks */}
        {(["left", "right"] as const).map(side => (
          <div key={side} style={{ position: "absolute", top: b(0.5), [side === "left" ? "left" : "right"]: b(0.04), width: b(0.16), height: b(0.09), background: `rgba(255,130,170,${t.cheekOpacity})`, borderRadius: "50%", zIndex: 2 }} />
        ))}
      </div>
    </div>
  );
};

export default MiniMascot;

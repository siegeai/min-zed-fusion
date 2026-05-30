import { Helmet } from "react-helmet-async";
import {
  Search,
  Sparkles,
  Mail,
  FileText,
  FileSpreadsheet,
  Zap,
  Database,
  Network,
  Brain,
  Truck,
  ArrowRight,
  Users,
  Bell,
  Activity,
  Circle,
  CheckCircle2,
  Building2,
  ArrowDown,
  HelpCircle,
  MessageSquare,
  Calendar,
  BookOpen,
  HardDrive,
  Mic,
  Plug,
  Cpu,
  Layers,
  Headphones,
  TrendingUp,
  Briefcase,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

/* ───────── Design Primitives ───────── */

type Tint = "blue" | "amber" | "slate";
type Size = "sm" | "md" | "lg" | "xl";

const TINT_BG: Record<Tint, string> = {
  blue: "bg-gradient-to-b from-blue-500/[0.18] to-blue-500/[0.04]",
  amber: "bg-gradient-to-b from-amber-400/[0.20] to-amber-500/[0.04]",
  slate: "bg-gradient-to-b from-white/[0.07] to-white/[0.01]",
};
const TINT_BORDER: Record<Tint, string> = {
  blue: "border-blue-400/25",
  amber: "border-amber-400/30",
  slate: "border-white/[0.08]",
};
const TINT_ICON: Record<Tint, string> = {
  blue: "text-blue-300",
  amber: "text-amber-400",
  slate: "text-slate-200",
};
const TINT_GLOW: Record<Tint, string> = {
  blue: "rgba(96,140,255,0.45)",
  amber: "rgba(251,191,36,0.40)",
  slate: "rgba(255,255,255,0.18)",
};
const SIZE_BOX: Record<Size, string> = {
  sm: "w-9 h-9 rounded-lg",
  md: "w-11 h-11 rounded-xl",
  lg: "w-14 h-14 rounded-2xl",
  xl: "w-16 h-16 rounded-2xl",
};
const SIZE_ICON: Record<Size, string> = {
  sm: "w-[15px] h-[15px]",
  md: "w-[18px] h-[18px]",
  lg: "w-6 h-6",
  xl: "w-7 h-7",
};

function IconTile({
  Icon,
  size = "md",
  tint = "blue",
  glow = "soft",
  filled = false,
  className = "",
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number; fill?: string }>;
  size?: Size;
  tint?: Tint;
  glow?: "none" | "soft" | "strong";
  filled?: boolean;
  className?: string;
}) {
  const glowSpread = glow === "strong" ? "-inset-4 blur-xl" : "-inset-2 blur-md";
  return (
    <span
      className={[
        "relative inline-flex items-center justify-center border",
        SIZE_BOX[size],
        TINT_BG[tint],
        TINT_BORDER[tint],
        className,
      ].join(" ")}
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.25)",
      }}
    >
      {glow !== "none" && (
        <span
          aria-hidden
          className={`pointer-events-none absolute ${glowSpread} rounded-[inherit] -z-10`}
          style={{
            background: `radial-gradient(circle, ${TINT_GLOW[tint]}, transparent 70%)`,
          }}
        />
      )}
      <Icon
        className={`relative ${SIZE_ICON[size]} ${TINT_ICON[tint]}`}
        strokeWidth={1.75}
        {...(filled ? { fill: "currentColor" } : {})}
      />
    </span>
  );
}

const CARD_SURFACE =
  "rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-sm";
const CARD_SURFACE_LG =
  "rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.01] backdrop-blur-sm";
const CARD_INNER_HIGHLIGHT = {
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.01)",
} as const;
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>min. | Serious memory for work. Your tools don't know you. We'll fix that.</title>
        <meta
          name="description"
          content="Serious memory for work. min. pools sales, support, success, and ops into one shared memory — and every AI on the team (Claude, Cursor, ChatGPT) can recall across all of it, instantly."
        />
        <link rel="canonical" href="https://getmin.ai" />
      </Helmet>

      <div className="min-h-screen bg-black text-slate-200 font-sans antialiased overflow-x-hidden">
        <PillNav />

        <main>
          <Hero />
          <CollectiveMemorySection />
          <IntelligentSearchSection />
          <TakeActionSection />
          <SharedBrainSection />
          <CallToActionSection />
          <FAQSection />
        </main>

        <MinFooter />
      </div>
    </>
  );
};

export default Index;

/* ───────── HERO ───────── */

function Hero() {
  return (
    <section
      id="platform"
      className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden scroll-mt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 30%, rgba(80,120,255,0.18) 0%, rgba(80,120,255,0.05) 35%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 35%, black 30%, transparent 80%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <p className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-slate-400 mb-7">
          Serious memory for work
        </p>
        <h1 className="text-white font-semibold tracking-[-0.025em] leading-[1.04] text-[44px] sm:text-6xl md:text-7xl">
          Your tools don't know you.
          <br />
          <span className="text-blue-300">We'll fix that.</span>
        </h1>
        <p className="mt-7 text-slate-400 text-lg md:text-xl leading-snug max-w-2xl mx-auto">
          Pool sales, support, success, and ops into one shared memory.{" "}
          <span className="text-slate-200">
            Every AI on the team can recall across all of it, instantly.
          </span>
        </p>

        <div className="mt-9 flex flex-col items-center gap-3">
          <a
            href="https://app.getmin.ai/find"
            className="inline-flex items-center gap-2 rounded-full bg-slate-50 text-black text-sm md:text-base font-semibold px-6 py-3 hover:bg-slate-200 transition-colors"
            style={{ boxShadow: "0 0 30px -6px rgba(255,255,255,0.35)" }}
          >
            Try it for free
            <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
          </a>
          <p className="text-xs text-slate-500 tracking-wide">
            no credit card, no sign up
          </p>
        </div>

        <div className="mt-14 md:mt-16">
          <HeroSourceChips />
        </div>

        <div className="mt-10">
          <PillarTShape />
        </div>
      </div>
    </section>
  );
}

function HeroSourceChips() {
  const sources = [
    { Icon: Mail, label: "Email" },
    { Icon: MessageSquare, label: "Slack" },
    { Icon: Calendar, label: "Calendar" },
    { Icon: BookOpen, label: "Notion" },
    { Icon: HardDrive, label: "Drive" },
    { Icon: Mic, label: "Calls" },
  ];
  return (
    <div className="flex justify-center gap-2.5 sm:gap-3">
      {sources.map(({ Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.01] backdrop-blur-sm px-3.5 sm:px-4 py-2"
          style={{
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <Icon className="w-4 h-4 text-slate-300" strokeWidth={1.75} />
          <span className="text-xs sm:text-sm text-slate-200 font-medium tracking-tight">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function HeroConnector({ paths }: { paths: string[] }) {
  return (
    <div className="relative h-10 mx-auto max-w-md">
      <svg
        aria-hidden
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="line-down" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(180,210,255,0.35)" />
            <stop offset="100%" stopColor="rgba(80,120,255,0)" />
          </linearGradient>
          <linearGradient id="line-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(96,140,255,0.6)" />
            <stop offset="100%" stopColor="rgba(96,140,255,0)" />
          </linearGradient>
        </defs>
        {paths.map((d, i) => (
          <g key={i}>
            <path
              d={d}
              stroke="url(#line-glow)"
              strokeWidth="3"
              fill="none"
              opacity="0.35"
              style={{ filter: "blur(2px)" }}
            />
            <path
              d={d}
              stroke="url(#line-down)"
              strokeWidth="1"
              fill="none"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

function PillarTShape() {
  return (
    <div className="max-w-2xl mx-auto">
      <HeroConnector
        paths={[
          "M80 0 Q200 8 200 60",
          "M200 0 L200 60",
          "M320 0 Q200 8 200 60",
        ]}
      />

      {/* Top: Memory graphic — featured entity card with depth-of-context bars,
           plus a roster of other entities in your memory */}
      <CarrierNetworkGraphic />
      <p className="text-center text-[11px] tracking-[0.18em] uppercase text-slate-500 mt-4 font-medium">
        Compounds with every conversation
      </p>

      {/* Connectors to bottom row */}
      <HeroConnector
        paths={["M200 0 Q120 30 80 60", "M200 0 Q280 30 320 60"]}
      />

      {/* Bottom: Recall + Plug Into Every AI */}
      <div className="grid grid-cols-2 gap-4 mx-auto max-w-md">
        <SmallPillarCard
          Icon={Search}
          tint="blue"
          title="Instant Recall"
          desc="Surface the right context in any AI, in milliseconds."
        />
        <SmallPillarCard
          Icon={Plug}
          tint="amber"
          filled
          title="Plug into every AI"
          desc="Claude, Cursor, ChatGPT, Granola — all instantly yours."
        />
      </div>
    </div>
  );
}

/* ───────── Memory graphic (hero centerpiece) ───────── */

const ROSTER = [
  { initials: "ST", name: "Stripe", tier: "A" as const, ovr: 92 },
  { initials: "DD", name: "Datadog", tier: "A" as const, ovr: 88 },
  { initials: "LN", name: "Linear", tier: "B" as const, ovr: 76 },
];

function CarrierNetworkGraphic() {
  return (
    <div className="relative mx-auto w-[320px] sm:w-[360px]">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 rounded-[44px] blur-2xl -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(96,140,255,0.45), transparent 70%)",
        }}
      />

      {/* Network status header — names what we're looking at */}
      <div className="flex items-center justify-between mb-3 px-1.5">
        <div className="flex items-center gap-1.5">
          <span
            className="block w-1.5 h-1.5 rounded-full bg-emerald-400"
            style={{ boxShadow: "0 0 6px rgba(52,211,153,0.8)" }}
          />
          <span className="text-[9px] tracking-[0.22em] uppercase text-slate-300 font-mono font-semibold">
            Your Memory
          </span>
        </div>
        <span className="text-[9px] text-slate-400 font-mono tabular-nums tracking-[0.14em]">
          12.8K MEMORIES
        </span>
      </div>

      {/* Featured carrier card — minimal chrome, attributes shown as a radar polygon */}
      <div
        className="relative rounded-2xl border border-blue-400/35 bg-gradient-to-b from-blue-500/[0.08] to-white/[0.01] backdrop-blur-sm overflow-hidden"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.10), 0 14px 36px -18px rgba(96,140,255,0.5)",
        }}
      >
        <div className="relative px-3.5 pt-3.5 pb-3">
          {/* Carrier header */}
          <div className="flex items-center gap-2.5 mb-1">
            <span
              className="grid place-items-center w-9 h-9 rounded-md bg-gradient-to-b from-blue-500/[0.25] to-blue-500/[0.05] border border-blue-400/40 text-[10px] font-mono font-semibold text-blue-100"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)" }}
            >
              AC
            </span>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-white text-[13px] font-semibold leading-tight truncate">
                Acme Corp
              </p>
              <p className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.14em] mt-0.5">
                Enterprise · $280K ARR
              </p>
            </div>
            <TierBadge tier="S" />
          </div>

          {/* Radar / stat polygon */}
          <RadarChart
            stats={[
              { label: "Engagement", value: 92 },
              { label: "Recency", value: 97 },
              { label: "Sentiment", value: 86 },
              { label: "Risk", value: 28 },
              { label: "Expansion", value: 81 },
              { label: "Depth", value: 95 },
            ]}
          />

          {/* Bottom meta */}
          <div className="flex items-center gap-1.5 mt-1 pt-2.5 border-t border-white/[0.06]">
            <span
              className="rounded-md border border-emerald-400/30 bg-emerald-400/[0.10] px-1.5 py-0.5 text-[9px] font-mono text-emerald-300"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
            >
              DEAL OPEN
            </span>
            <span
              className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] font-mono text-slate-300"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
            >
              +12 THREADS
            </span>
            <span className="ml-auto text-[9px] text-slate-400 font-mono tracking-wide tabular-nums">
              47 MEETINGS
              <span className="text-slate-600 mx-1">|</span>
              312 EMAILS
            </span>
          </div>
        </div>
      </div>

      {/* Roster — clearly labeled list of OTHER carriers in the network */}
      <div
        className="mt-2 rounded-xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm p-2"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
      >
        <div className="flex items-center justify-between px-1 mb-1.5">
          <span className="text-[8px] tracking-[0.22em] uppercase text-slate-500 font-mono">
            Other accounts in memory
          </span>
          <span className="text-[8px] tracking-[0.18em] uppercase text-slate-500 font-mono">
            Tier · Depth
          </span>
        </div>
        <div className="space-y-0.5">
          {ROSTER.map((c) => (
            <RosterRow key={c.initials} {...c} />
          ))}
        </div>
        <div className="flex items-center justify-center mt-1.5 pt-1.5 border-t border-white/[0.05]">
          <span className="text-[9px] text-slate-400 font-mono tabular-nums tracking-wide">
            + 412 more accounts · 1,847 people
          </span>
        </div>
      </div>
    </div>
  );
}

/** Game-style radar / stat polygon for a carrier's tracked attributes. */
function RadarChart({
  stats,
}: {
  stats: { label: string; value: number }[];
}) {
  const cx = 110;
  const cy = 75;
  const radius = 42;
  const n = stats.length;

  // Vertex angles — start at the top, walk clockwise.
  const angles = Array.from(
    { length: n },
    (_, i) => -Math.PI / 2 + i * ((2 * Math.PI) / n)
  );

  const vertexPos = angles.map((a) => ({
    x: cx + radius * Math.cos(a),
    y: cy + radius * Math.sin(a),
  }));
  const valuePoints = stats.map((s, i) => {
    const r = (radius * Math.max(0, Math.min(100, s.value))) / 100;
    return { x: cx + r * Math.cos(angles[i]), y: cy + r * Math.sin(angles[i]) };
  });
  const polyPath =
    `M ${valuePoints[0].x.toFixed(2)} ${valuePoints[0].y.toFixed(2)} ` +
    valuePoints
      .slice(1)
      .map((p) => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
      .join(" ") +
    " Z";

  const ringScales = [0.33, 0.66, 1];
  const ringPaths = ringScales.map((rs) => {
    const pts = angles.map((a) => ({
      x: cx + radius * rs * Math.cos(a),
      y: cy + radius * rs * Math.sin(a),
    }));
    return (
      `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)} ` +
      pts
        .slice(1)
        .map((p) => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
        .join(" ") +
      " Z"
    );
  });

  return (
    <svg
      viewBox="0 0 220 154"
      className="w-full h-auto block"
      aria-hidden
    >
      <defs>
        <radialGradient id="radar-fill" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(120,170,255,0.55)" />
          <stop offset="100%" stopColor="rgba(96,140,255,0.16)" />
        </radialGradient>
      </defs>

      {/* Concentric grid rings */}
      {ringPaths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="rgba(180,210,255,0.12)"
          strokeWidth="0.5"
        />
      ))}

      {/* Axis spokes */}
      {vertexPos.map((p, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          stroke="rgba(180,210,255,0.10)"
          strokeWidth="0.5"
        />
      ))}

      {/* Value polygon — glowing fill + outline */}
      <path
        d={polyPath}
        fill="url(#radar-fill)"
        stroke="rgb(140,180,255)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 6px rgba(96,140,255,0.7))" }}
      />

      {/* Vertex dots at each value point */}
      {valuePoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="1.6"
          fill="#dde8ff"
          style={{ filter: "drop-shadow(0 0 3px rgba(96,140,255,0.95))" }}
        />
      ))}

      {/* Vertex labels (placed just outside each spoke) */}
      {angles.map((a, i) => {
        const lx = cx + (radius + 12) * Math.cos(a);
        const ly = cy + (radius + 12) * Math.sin(a);
        return (
          <text
            key={i}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="7"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
            letterSpacing="0.04em"
            fontWeight={600}
            fill="rgba(180,200,230,0.9)"
          >
            {stats[i].label}
          </text>
        );
      })}
    </svg>
  );
}

function TierBadge({ tier }: { tier: "S" | "A" | "B" | "C" }) {
  const palette: Record<string, string> = {
    S: "from-amber-300/40 to-amber-500/10 border-amber-400/60 text-amber-200",
    A: "from-blue-400/40 to-blue-500/10 border-blue-400/60 text-blue-200",
    B: "from-slate-300/30 to-slate-500/10 border-slate-300/40 text-slate-200",
    C: "from-slate-400/20 to-slate-600/10 border-slate-400/30 text-slate-300",
  };
  const glow: Record<string, string> = {
    S: "0 0 10px rgba(251,191,36,0.45)",
    A: "0 0 8px rgba(96,140,255,0.40)",
    B: "none",
    C: "none",
  };
  return (
    <span
      className={`grid place-items-center w-5 h-5 rounded-md border bg-gradient-to-b ${palette[tier]} text-[10px] font-mono font-bold leading-none`}
      style={{
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.10), ${glow[tier]}`,
      }}
    >
      {tier}
    </span>
  );
}

function RosterRow({
  initials,
  name,
  tier,
  ovr,
}: {
  initials: string;
  name: string;
  tier: "A" | "B" | "C";
  ovr: number;
}) {
  return (
    <div className="flex items-center gap-2 px-1 py-1 rounded-md hover:bg-white/[0.03] transition-colors">
      <span
        className="grid place-items-center w-6 h-6 rounded bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 text-[9px] font-mono font-semibold text-slate-200 tracking-wider"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
      >
        {initials}
      </span>
      <span className="flex-1 min-w-0 text-[11px] text-slate-200 font-medium leading-tight truncate">
        {name}
      </span>
      <TierBadge tier={tier} />
      <span className="text-[10px] text-slate-300 font-mono font-semibold tabular-nums w-[20px] text-right">
        {ovr}
      </span>
    </div>
  );
}

function StatBar({ label, value }: { label: string; value: number }) {
  const segments = 10;
  const lit = Math.round(value / 10);
  return (
    <div className="flex items-center gap-2">
      <span className="text-[9px] tracking-[0.16em] uppercase text-slate-400 font-mono font-medium w-[40px] text-left">
        {label}
      </span>
      <div className="flex-1 flex gap-[2px]">
        {Array.from({ length: segments }).map((_, i) => {
          const on = i < lit;
          return (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-[1px] ${
                on ? "bg-blue-400" : "bg-white/[0.06]"
              }`}
              style={
                on
                  ? {
                      boxShadow:
                        "0 0 4px rgba(96,140,255,0.55), inset 0 1px 0 rgba(255,255,255,0.18)",
                    }
                  : undefined
              }
            />
          );
        })}
      </div>
      <span
        className="text-[10px] text-blue-200 font-mono font-semibold tabular-nums w-[20px] text-right leading-none"
        style={{ textShadow: "0 0 6px rgba(96,140,255,0.4)" }}
      >
        {value}
      </span>
    </div>
  );
}

function SmallPillarCard({
  Icon,
  title,
  desc,
  tint = "slate",
  filled = false,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number; fill?: string }>;
  title: string;
  desc: string;
  tint?: Tint;
  filled?: boolean;
}) {
  return (
    <div
      className={`${CARD_SURFACE} p-5 text-center`}
      style={CARD_INNER_HIGHLIGHT}
    >
      <div className="mb-3 flex justify-center">
        <IconTile Icon={Icon} size="md" tint={tint} filled={filled} />
      </div>
      <h3 className="text-white text-sm font-semibold tracking-[-0.01em] mb-1">
        {title}
      </h3>
      <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

/* ───────── THE COLLECTIVE MEMORY ───────── */

function CollectiveMemorySection() {
  return (
    <section id="memory" className="relative py-24 md:py-32 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          Icon={Brain}
          title="Your memory. Your moat."
          desc="Every email, every meeting, every customer interaction compounds into YOUR private memory. The more you work, the smarter every AI you use gets."
        />

        {/* 2-up top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <BigFeatureCard
            Icon={Brain}
            title="Memory Compounds With Every Conversation"
            body="Every email sent, every meeting taken, every customer touchpoint adds a new edge to your memory. The people you know, the deals you've worked, the decisions you've made — all instantly recallable."
            visual={<EmailRowsMock />}
          />
          <BigFeatureCard
            Icon={Database}
            title="What Feeds Your Memory"
            body="Email, Slack, Calendar, Notion, Drive, calls, tickets, CRM. Every signal across your workflow becomes structured, searchable context."
            visual={<FileTilesMock />}
          />
        </div>

        {/* 3-up bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard
            Icon={Layers}
            title="Auto-Organized Entities"
            body="People, companies, deals, projects, decisions. min. extracts them automatically and links them across every source. No tagging. No CRM hygiene."
            visual={<LaneSliderMock from="Acme" to="Renewal" />}
          />
          <FeatureCard
            Icon={Sparkles}
            title="Zero Data Entry"
            body="Your memory grows automatically with every email, meeting, and message. No CRM. No notes app. No data-hygiene chores."
            visual={<NotificationIconsMock />}
          />
          <FeatureCard
            Icon={Users}
            title="Memory Stays With The Team"
            body="When someone leaves, their customer relationships and institutional knowledge stay inside the team. Memory is your company's greatest asset."
            visual={<HandoffIconsMock />}
          />
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  Icon,
  title,
  desc,
  align = "center",
  tint = "blue",
  filled = false,
  eyebrow,
}: {
  Icon?: React.ComponentType<{ className?: string; strokeWidth?: number; fill?: string }>;
  title: string;
  desc?: React.ReactNode;
  align?: "center" | "left";
  tint?: Tint;
  filled?: boolean;
  eyebrow?: string;
}) {
  const wrap =
    align === "center"
      ? "text-center max-w-3xl mx-auto mb-14"
      : "max-w-2xl mb-12";
  const eyebrowColor =
    tint === "amber" ? "text-amber-300/90" : "text-blue-300/90";
  return (
    <div className={wrap}>
      {Icon && (
        <div className={`mb-7 ${align === "center" ? "flex justify-center" : ""}`}>
          <IconTile Icon={Icon} size="xl" tint={tint} glow="strong" filled={filled} />
        </div>
      )}
      {eyebrow && (
        <p
          className={`text-[11px] tracking-[0.22em] uppercase font-semibold mb-4 ${eyebrowColor}`}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="text-white font-semibold tracking-[-0.025em] text-4xl md:text-5xl mb-5">
        {title}
      </h2>
      {desc && (
        <p className="text-slate-400 text-base md:text-lg leading-relaxed">
          {desc}
        </p>
      )}
    </div>
  );
}

function BigFeatureCard({
  Icon,
  title,
  body,
  visual,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  body: string;
  visual?: React.ReactNode;
}) {
  return (
    <div
      className={`${CARD_SURFACE_LG} p-6 md:p-8 flex flex-col`}
      style={CARD_INNER_HIGHLIGHT}
    >
      <div className="mb-5">
        <IconTile Icon={Icon} size="md" tint="blue" />
      </div>
      <h3 className="text-white text-xl font-semibold tracking-[-0.01em] mb-3">
        {title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-6">{body}</p>
      <div className="mt-auto">{visual}</div>
    </div>
  );
}

function FeatureCard({
  Icon,
  title,
  body,
  visual,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  body: string;
  visual?: React.ReactNode;
}) {
  return (
    <div
      className={`${CARD_SURFACE} p-6 flex flex-col`}
      style={CARD_INNER_HIGHLIGHT}
    >
      <div className="mb-4">
        <IconTile Icon={Icon} size="sm" tint="blue" />
      </div>
      <h3 className="text-white text-base font-semibold tracking-[-0.01em] mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-5">{body}</p>
      <div className="mt-auto">{visual}</div>
    </div>
  );
}

/* ───────── Visual Mocks ───────── */

function MockSurface({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/[0.08] bg-black/50 ${className}`}
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.3)",
      }}
    >
      {children}
    </div>
  );
}

function EmailRowsMock() {
  const rows = [
    { name: "Acme Corp · renewal thread", w: "w-[78%]", active: false },
    { name: "Stripe · weekly sync notes", w: "w-[62%]", active: false },
    { name: "Datadog · churn-risk signal", w: "w-[88%]", active: true },
  ];
  return (
    <MockSurface className="p-3.5">
      <div className="space-y-2.5">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center gap-2.5">
            {r.active ? (
              <Sparkles className="w-3.5 h-3.5 text-blue-300 shrink-0" />
            ) : (
              <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" strokeWidth={1.75} />
            )}
            <div className="flex-1 min-w-0 space-y-1.5">
              <p
                className={[
                  "text-[11px] font-medium leading-none truncate",
                  r.active ? "text-blue-100" : "text-slate-200",
                ].join(" ")}
              >
                {r.name}
              </p>
              <div
                className={`h-1 ${r.w} rounded-full`}
                style={{
                  background: r.active
                    ? "linear-gradient(90deg, rgba(96,140,255,0.75), rgba(96,140,255,0.15))"
                    : "linear-gradient(90deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 -bottom-px h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(96,140,255,0.6), transparent)",
        }}
      />
    </MockSurface>
  );
}

function FileTilesMock() {
  const tiles = [
    { Icon: Mail, label: "Email" },
    { Icon: MessageSquare, label: "Slack" },
    { Icon: Calendar, label: "Calendar" },
    { Icon: Mic, label: "Calls" },
  ];
  return (
    <div className="grid grid-cols-2 gap-2">
      {tiles.map((t) => (
        <div
          key={t.label}
          className="relative h-14 rounded-lg border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] flex items-center gap-3 px-3"
          style={{
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <span className="grid place-items-center w-8 h-8 rounded-md bg-white/[0.04] border border-white/10 shrink-0">
            <t.Icon className="w-4 h-4 text-slate-300" strokeWidth={1.75} />
          </span>
          <span className="text-[11px] font-medium text-slate-200 truncate">
            {t.label}
          </span>
          <span
            aria-hidden
            className="ml-auto block w-1.5 h-1.5 rounded-full bg-emerald-400/70 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.7)]"
          />
        </div>
      ))}
    </div>
  );
}

function LaneSliderMock({ from, to }: { from: string; to: string }) {
  return (
    <MockSurface className="px-4 py-5">
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono tracking-[0.18em] text-slate-400">
          {from}
        </span>
        <div className="relative flex-1 h-px bg-white/[0.08]">
          <div
            className="absolute top-0 left-0 h-px"
            style={{
              width: "58%",
              background:
                "linear-gradient(90deg, rgba(96,140,255,0.85), rgba(96,140,255,0.15))",
            }}
          />
          <span
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
            style={{
              left: "58%",
              background:
                "radial-gradient(circle, rgba(180,210,255,1) 0%, rgba(96,140,255,1) 60%, rgba(96,140,255,0) 100%)",
              boxShadow:
                "0 0 0 2px rgba(96,140,255,0.18), 0 0 16px rgba(96,140,255,0.7)",
            }}
          />
        </div>
        <span className="text-[10px] font-mono tracking-[0.18em] text-slate-400">
          {to}
        </span>
      </div>
      <p className="mt-3 text-[10px] tracking-[0.14em] uppercase text-slate-500">
        Linked entities <span className="text-slate-300">14</span>
      </p>
    </MockSurface>
  );
}

function NotificationIconsMock() {
  const items = [
    { Icon: Mail, label: "Email indexed", meta: "2m" },
    { Icon: Mic, label: "Meeting logged", meta: "5m" },
    { Icon: Activity, label: "Entity updated", meta: "now" },
  ];
  return (
    <MockSurface className="p-2 space-y-1.5">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-2.5 px-2 py-1.5">
          <span className="grid place-items-center w-6 h-6 rounded-md bg-white/[0.04] border border-white/10 shrink-0">
            <it.Icon className="w-3.5 h-3.5 text-slate-300" strokeWidth={1.75} />
          </span>
          <span className="text-[11px] text-slate-300 flex-1 truncate">
            {it.label}
          </span>
          <span className="text-[10px] font-mono text-slate-500">{it.meta}</span>
        </div>
      ))}
    </MockSurface>
  );
}

function HandoffIconsMock() {
  return (
    <MockSurface className="px-4 py-6">
      <div className="flex items-center justify-between gap-3">
        {/* Reps — relationships flow inward */}
        <div className="flex flex-col gap-3">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="grid place-items-center w-9 h-9 rounded-full bg-white/[0.04] border border-white/10"
            >
              <Users className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
            </span>
          ))}
        </div>

        {/* Connectors converging on the company */}
        <div className="flex-1 relative h-[52px]">
          <div
            className="absolute left-0 right-1 top-[22%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(251,191,36,0.55), rgba(251,191,36,0.55))",
            }}
          />
          <div
            className="absolute left-0 right-1 bottom-[22%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(251,191,36,0.55), rgba(251,191,36,0.55))",
            }}
          />
          <ArrowRight className="absolute top-1/2 -translate-y-1/2 right-0 w-3.5 h-3.5 text-amber-300" />
        </div>

        {/* The company — keeps the network */}
        <span
          className="grid place-items-center w-12 h-12 rounded-xl bg-amber-500/[0.12] border border-amber-400/30 shrink-0"
          style={{ boxShadow: "0 0 18px rgba(251,191,36,0.3)" }}
        >
          <Building2 className="w-5 h-5 text-amber-300" strokeWidth={1.75} />
        </span>
      </div>
    </MockSurface>
  );
}

/* ───────── INTELLIGENT SEARCH ───────── */

function IntelligentSearchSection() {
  return (
    <section id="recall" className="relative py-24 md:py-32 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          Icon={Search}
          eyebrow="Instant Recall"
          title="Recall anything, instantly."
          desc="Ask in any AI — Claude, Cursor, ChatGPT. min. returns the exact context: the deal history, the last conversation, the customer's prior tickets, the doc you wrote two months ago. Without you ever opening a search bar."
        />

        <div className="max-w-2xl mx-auto">
          <CapacityFlowDemo />
        </div>
      </div>
    </section>
  );
}

/* ─── Capacity flow: incoming request → match → send → ranked quotes ─── */

function CapacityFlowDemo() {
  return (
    <div className="space-y-2">
      <FlowStage step="1" label="Query from any AI" tint="slate">
        <LoadRequestCard />
      </FlowStage>

      <FlowConnector label="MEMORY RECALLED" />

      <FlowStage
        step="2"
        label="Ranked from your private memory · 8 hits"
        tint="blue"
      >
        <MatchedCarriersList />
        <SendRequestButton count={8} />
      </FlowStage>
    </div>
  );
}

const STEP_TINTS = {
  slate: {
    border: "border-white/[0.10]",
    bg: "bg-gradient-to-b from-white/[0.04] to-white/[0.01]",
    chip: "text-slate-300 border-white/15 bg-white/[0.05]",
    label: "text-slate-400",
  },
  blue: {
    border: "border-blue-400/30",
    bg: "bg-gradient-to-b from-blue-500/[0.06] to-white/[0.01]",
    chip: "text-blue-200 border-blue-400/40 bg-blue-500/[0.12]",
    label: "text-blue-300",
  },
  emerald: {
    border: "border-emerald-400/30",
    bg: "bg-gradient-to-b from-emerald-500/[0.06] to-white/[0.01]",
    chip: "text-emerald-200 border-emerald-400/40 bg-emerald-500/[0.12]",
    label: "text-emerald-300",
  },
} as const;

function FlowStage({
  step,
  label,
  tint = "slate",
  children,
}: {
  step: string;
  label: string;
  tint?: keyof typeof STEP_TINTS;
  children: React.ReactNode;
}) {
  const t = STEP_TINTS[tint];
  return (
    <div
      className={`relative rounded-2xl border ${t.border} ${t.bg} backdrop-blur-sm p-4 md:p-5`}
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <span
          className={`grid place-items-center w-6 h-6 rounded-md text-[11px] font-mono font-semibold tabular-nums border ${t.chip}`}
          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)" }}
        >
          {step}
        </span>
        <span
          className={`text-[10px] tracking-[0.20em] uppercase font-mono font-semibold ${t.label}`}
        >
          {label}
        </span>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function FlowConnector({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-1">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent max-w-[80px]" />
      <ArrowDown className="w-3 h-3 text-slate-500" strokeWidth={2} />
      <span className="text-[9px] tracking-[0.22em] uppercase text-slate-500 font-mono font-medium">
        {label}
      </span>
      <ArrowDown className="w-3 h-3 text-slate-500" strokeWidth={2} />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent max-w-[80px]" />
    </div>
  );
}

function LoadRequestCard() {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3.5">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <span className="grid place-items-center w-5 h-5 rounded-md bg-gradient-to-b from-amber-400/[0.25] to-amber-500/[0.05] border border-amber-400/40">
            <Sparkles
              className="w-3 h-3 text-amber-300"
              strokeWidth={2.25}
              fill="currentColor"
            />
          </span>
          <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-slate-400">
            Claude Desktop · live
          </span>
        </div>
        <span className="text-[9px] font-mono text-slate-500 tabular-nums tracking-wide">
          0.18s
        </span>
      </div>
      <p
        className="text-slate-100 text-[13.5px] leading-snug font-medium"
        style={{ fontFeatureSettings: '"ss01"' }}
      >
        "What's the latest on Acme Corp's renewal? Anyone on my team talked
        to them this week?"
      </p>
      <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center gap-2 flex-wrap">
        <span className="text-[9px] tracking-[0.16em] uppercase text-slate-500 font-mono">
          Needs:
        </span>
        {[
          { Icon: Briefcase, label: "Account" },
          { Icon: TrendingUp, label: "Deal" },
          { Icon: Calendar, label: "Last meeting" },
          { Icon: Mail, label: "Recent emails" },
        ].map(({ Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-mono text-slate-300"
          >
            <Icon className="w-2.5 h-2.5 text-slate-400" strokeWidth={2} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function MatchedCarriersList() {
  const privateMatches = [
    { initials: "AC", name: "Acme Corp · renewal thread (12 emails)", tier: "S" as const, ovr: 98, best: true },
    { initials: "MT", name: "Meeting · May 19 · Q3 expansion notes", tier: "A" as const, ovr: 94 },
    { initials: "DL", name: "Deal record · $280K · Stage 4", tier: "A" as const, ovr: 91 },
  ];
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
      {/* Private memory section */}
      <div className="px-3.5 py-1.5 bg-white/[0.025] text-[9px] tracking-[0.2em] uppercase text-slate-400 font-mono font-semibold">
        From your private memory
      </div>
      <ul className="divide-y divide-white/[0.05]">
        {privateMatches.map((m) => (
          <li
            key={m.initials}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 ${
              m.best ? "bg-blue-500/[0.06]" : ""
            }`}
          >
            <span
              className={`grid place-items-center w-8 h-8 rounded-md border text-[10px] font-mono font-semibold tracking-wider ${
                m.best
                  ? "bg-gradient-to-b from-blue-500/[0.22] to-blue-500/[0.05] border-blue-400/40 text-blue-100"
                  : "bg-gradient-to-b from-white/[0.06] to-white/[0.01] border-white/10 text-slate-300"
              }`}
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
            >
              {m.initials}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[12px] font-medium leading-tight truncate">
                {m.name}
              </p>
              {m.best && (
                <p
                  className="text-[9px] tracking-[0.16em] uppercase text-blue-300 font-mono font-semibold mt-0.5"
                  style={{ textShadow: "0 0 8px rgba(96,140,255,0.5)" }}
                >
                  ★ Best match
                </p>
              )}
            </div>
            <TierBadge tier={m.tier} />
            <span className="text-[11px] text-slate-200 font-mono font-semibold tabular-nums w-[26px] text-right">
              {m.ovr}
            </span>
          </li>
        ))}
      </ul>
      <div className="px-3.5 py-1.5 border-t border-white/[0.05] text-[9px] tracking-[0.18em] uppercase text-slate-600 font-mono text-center">
        + 5 more related memories
      </div>
    </div>
  );
}

function SendRequestButton({ count }: { count: number }) {
  return (
    <button
      className="group w-full flex items-center justify-center gap-2 rounded-xl border border-amber-400/40 bg-gradient-to-b from-amber-400/[0.18] to-amber-500/[0.04] px-4 py-2.5 text-amber-100 hover:from-amber-400/[0.25] hover:to-amber-500/[0.08] transition-all"
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.10), 0 0 16px -4px rgba(251,191,36,0.35)",
      }}
    >
      <Zap className="w-3.5 h-3.5 text-amber-300" strokeWidth={2} fill="currentColor" />
      <span className="text-[11px] tracking-[0.16em] uppercase font-mono font-semibold">
        Load top {count} into Claude
      </span>
      <ArrowRight className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
    </button>
  );
}

function LoadboardComparison({
  networkBest,
  loadboardAvg,
}: {
  networkBest: number;
  loadboardAvg: number;
}) {
  const savings = loadboardAvg - networkBest;
  const pct = Math.round((savings / loadboardAvg) * 100);
  const fmt = (n: number) =>
    `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  return (
    <div
      className="rounded-xl border border-emerald-400/30 bg-gradient-to-b from-emerald-500/[0.10] to-emerald-500/[0.02] backdrop-blur-sm overflow-hidden"
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 18px -8px rgba(52,211,153,0.35)",
      }}
    >
      <div className="px-3.5 py-2 border-b border-emerald-400/15 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-emerald-300" strokeWidth={2} />
          <span className="text-[9px] tracking-[0.22em] uppercase text-emerald-300 font-mono font-semibold">
            vs Public Loadboard
          </span>
        </div>
        <span className="text-[9px] tracking-[0.16em] uppercase text-slate-500 font-mono">
          DAT spot · today
        </span>
      </div>
      <div className="px-3.5 py-3 flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2.5">
          <div className="text-left">
            <p className="text-[9px] tracking-[0.16em] uppercase text-slate-500 font-mono mb-0.5">
              Loadboard avg
            </p>
            <p className="text-[14px] font-mono text-slate-400 line-through tabular-nums leading-none">
              {fmt(loadboardAvg)}
            </p>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" strokeWidth={2} />
          <div className="text-left">
            <p className="text-[9px] tracking-[0.16em] uppercase text-emerald-300/80 font-mono mb-0.5">
              Your network
            </p>
            <p
              className="text-[14px] font-mono font-semibold text-emerald-300 tabular-nums leading-none"
              style={{ textShadow: "0 0 10px rgba(52,211,153,0.45)" }}
            >
              {fmt(networkBest)}
            </p>
          </div>
        </div>
        <div
          className="rounded-lg border border-emerald-400/40 bg-emerald-400/[0.12] px-2.5 py-1.5 text-center"
          style={{
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
          }}
        >
          <p className="text-[8px] tracking-[0.18em] uppercase text-emerald-300 font-mono leading-none">
            Save
          </p>
          <p
            className="text-emerald-200 text-base font-mono font-bold tabular-nums leading-none mt-0.5"
            style={{ textShadow: "0 0 10px rgba(52,211,153,0.5)" }}
          >
            {pct}%
          </p>
        </div>
      </div>
    </div>
  );
}

function RankedQuotesList() {
  const quotes = [
    {
      rank: 1,
      initials: "AL",
      name: "Apex Logistics",
      price: "$3,400",
      tier: "S" as const,
      rel: 95,
      best: true,
    },
    {
      rank: 2,
      initials: "PB",
      name: "Polar Bear Transit",
      price: "$3,550",
      tier: "A" as const,
      rel: 89,
    },
    {
      rank: 3,
      initials: "NF",
      name: "Northern Freight",
      price: "$3,800",
      tier: "A" as const,
      rel: 84,
    },
  ];
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
      <ul className="divide-y divide-white/[0.05]">
        {quotes.map((q) => (
          <li
            key={q.initials}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 ${
              q.best ? "bg-emerald-500/[0.05]" : ""
            }`}
          >
            <span
              className={`grid place-items-center w-6 h-6 rounded-md text-[10px] font-mono font-bold tabular-nums ${
                q.best
                  ? "bg-emerald-400/15 border border-emerald-400/40 text-emerald-200"
                  : "bg-white/[0.04] border border-white/10 text-slate-400"
              }`}
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
            >
              #{q.rank}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[12px] font-medium leading-tight truncate">
                {q.name}
              </p>
              <p className="text-[9px] text-slate-500 font-mono tracking-wide tabular-nums">
                REL {q.rel}
              </p>
            </div>
            <span
              className={`text-[12px] font-mono font-semibold tabular-nums w-[42px] text-right ${
                q.best ? "text-emerald-300" : "text-slate-200"
              }`}
              style={
                q.best
                  ? { textShadow: "0 0 10px rgba(52,211,153,0.4)" }
                  : undefined
              }
            >
              {q.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SubCard({
  Icon,
  title,
  children,
  tint = "blue",
  filled = false,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number; fill?: string }>;
  title: string;
  children: React.ReactNode;
  tint?: Tint;
  filled?: boolean;
}) {
  return (
    <div className={`${CARD_SURFACE} p-5`} style={CARD_INNER_HIGHLIGHT}>
      <div className="mb-3">
        <IconTile Icon={Icon} size="sm" tint={tint} filled={filled} />
      </div>
      <h3 className="text-white text-sm font-semibold tracking-[-0.01em] mb-1.5">
        {title}
      </h3>
      <p className="text-xs text-slate-400 leading-relaxed">{children}</p>
    </div>
  );
}

/* ───────── TAKE ACTION ───────── */

function TakeActionSection() {
  return (
    <section id="plug-in" className="relative py-24 md:py-32 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          Icon={Plug}
          tint="amber"
          filled
          eyebrow="Already in every app you open"
          title="Open the AI. We're already there."
          desc="Claude. Cursor. ChatGPT. Whatever you open next. min. is already sitting there, handing each one everything you've ever told the others. No copy-pasting. No starting over. No 'let me give you some context first.'"
        />

        <div className="max-w-2xl mx-auto">
          <AIIntegrationGrid />
        </div>
      </div>
    </section>
  );
}

/* AI integration grid — shows target AI tools as plug-in destinations */
const AI_INTEGRATIONS: { name: string; meta: string; status: "live" | "live" }[] = [
  { name: "Claude Desktop", meta: "Native · live", status: "live" },
  { name: "Claude Code", meta: "Native · live", status: "live" },
  { name: "Cursor", meta: "Native · live", status: "live" },
  { name: "ChatGPT", meta: "Plugin · live", status: "live" },
  { name: "Granola", meta: "Live", status: "live" },
  { name: "Linear", meta: "Live", status: "live" },
  { name: "Your custom AI", meta: "Open SDK", status: "live" },
  { name: "Whatever's next", meta: "Coming soon-ish", status: "live" },
];

function AIIntegrationGrid() {
  return (
    <div
      className="relative rounded-2xl border border-amber-400/30 bg-gradient-to-b from-amber-500/[0.06] to-white/[0.01] backdrop-blur-sm p-4 md:p-5"
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.05), 0 0 30px -10px rgba(251,191,36,0.25)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2.5 mb-4">
        <div className="flex items-center gap-2">
          <span
            className="block w-1.5 h-1.5 rounded-full bg-emerald-400"
            style={{ boxShadow: "0 0 6px rgba(52,211,153,0.8)" }}
          />
          <span className="text-[10px] tracking-[0.20em] uppercase font-mono font-semibold text-amber-300">
            Memory loaded into
          </span>
        </div>
        <span className="text-[9px] tracking-[0.16em] uppercase font-mono text-slate-500 tabular-nums">
          8 connected
        </span>
      </div>

      {/* Integration tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {AI_INTEGRATIONS.map((tool) => (
          <div
            key={tool.name}
            className="relative rounded-lg border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-3"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
          >
            <div className="flex items-start justify-between gap-1 mb-2.5">
              <span className="grid place-items-center w-7 h-7 rounded-md bg-gradient-to-b from-amber-500/[0.18] to-amber-500/[0.04] border border-amber-400/30">
                <Cpu
                  className="w-3.5 h-3.5 text-amber-300"
                  strokeWidth={1.75}
                />
              </span>
              <span
                aria-hidden
                className="block w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"
                style={{ boxShadow: "0 0 8px rgba(52,211,153,0.7)" }}
              />
            </div>
            <p className="text-white text-[11.5px] font-semibold leading-tight">
              {tool.name}
            </p>
            <p className="text-[9px] tracking-[0.12em] uppercase text-slate-500 font-mono mt-1 leading-tight">
              {tool.meta}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2 text-[10px] font-mono tracking-wide">
        <span className="text-slate-500 uppercase">
          One memory · Every app
        </span>
        <span
          className="inline-flex items-center gap-1.5 text-amber-200"
          style={{ textShadow: "0 0 8px rgba(251,191,36,0.4)" }}
        >
          <Zap
            className="w-3 h-3 text-amber-300"
            strokeWidth={2}
            fill="currentColor"
          />
          INSTANT
        </span>
      </div>
    </div>
  );
}

function LoadDetailsCard() {
  const rows = [
    ["Pickup", "Miami, FL"],
    ["Dropoff", "Toronto, ON"],
    ["Equipment", "FTL Reefer"],
    ["Commodity", "35,000 lbs oranges"],
    ["Schedule", "Ready for Monday, Deliver by Friday"],
  ];
  return (
    <div
      className="rounded-xl border border-white/[0.08] bg-gradient-to-b from-[#0a0d12] to-black overflow-hidden"
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 24px -8px rgba(0,0,0,0.6)",
      }}
    >
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent">
        <span
          className="block w-2.5 h-2.5 rounded-full bg-red-500"
          style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.25)" }}
        />
        <span
          className="block w-2.5 h-2.5 rounded-full bg-amber-400"
          style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.25)" }}
        />
        <span
          className="block w-2.5 h-2.5 rounded-full bg-emerald-500"
          style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.25)" }}
        />
        <span className="ml-2.5 text-[11px] text-slate-400 font-medium tracking-tight">
          Load Details
        </span>
      </div>
      <dl className="px-4 py-4 grid grid-cols-[110px_1fr] gap-y-2.5 text-[13px] font-mono">
        {rows.map(([k, v]) => (
          <FragmentRow key={k} k={k} v={v} highlight={k === "Schedule"} />
        ))}
      </dl>
    </div>
  );
}

function FragmentRow({
  k,
  v,
  highlight,
}: {
  k: string;
  v: string;
  highlight?: boolean;
}) {
  return (
    <>
      <dt className="text-slate-500">{k}:</dt>
      <dd className={highlight ? "text-amber-300" : "text-slate-200"}>{v}</dd>
    </>
  );
}

function IncomingQuotesCard() {
  const quotes = [
    {
      name: "Apex Logistics",
      time: "Just now",
      price: "$3,400",
      note: "Can pick up Wednesday but deliver on Tuesday.",
    },
    {
      name: "Polar Bear Transit",
      time: "2 mins ago",
      price: "$3,550",
      note: "Can deliver and have sent their carrier package.",
    },
    {
      name: "Northern Freight",
      time: "5 mins ago",
      price: "$3,800",
      note: null as string | null,
    },
  ];
  return (
    <div
      className={`${CARD_SURFACE} overflow-hidden`}
      style={CARD_INNER_HIGHLIGHT}
    >
      <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-2">
        <span
          className="block w-1.5 h-1.5 rounded-full bg-emerald-400"
          style={{ boxShadow: "0 0 8px rgba(52,211,153,0.7)" }}
        />
        <p className="text-[10px] tracking-[0.18em] uppercase text-slate-400 font-medium">
          Incoming Quotes
        </p>
      </div>
      <ul className="divide-y divide-white/[0.05]">
        {quotes.map((q) => (
          <li key={q.name} className="px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="grid place-items-center w-8 h-8 rounded-md bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 text-[10px] font-mono tracking-wider text-slate-400 shrink-0">
                  {q.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {q.name}
                  </p>
                  <p className="text-[11px] text-slate-500">{q.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] px-2.5 py-1 text-[10px] tracking-[0.12em] uppercase text-slate-300 hover:text-white hover:border-white/15 transition-colors"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
                >
                  <Mail className="w-3 h-3" strokeWidth={2} />
                  Open Email
                </button>
                <p
                  className="text-emerald-400 text-sm font-semibold tabular-nums"
                  style={{ textShadow: "0 0 12px rgba(52,211,153,0.35)" }}
                >
                  {q.price}
                </p>
              </div>
            </div>
            {q.note && (
              <div className="mt-2.5 rounded-md border border-white/[0.05] bg-black/40 px-3 py-1.5 text-[11px] text-slate-400 inline-flex items-baseline gap-2">
                <span className="text-[9px] tracking-[0.14em] uppercase text-slate-500 font-mono">
                  Note
                </span>
                <span>{q.note}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── SHARED BRAIN BOTTOM ───────── */

function SharedBrainSection() {
  const flow = [
    {
      Icon: Database,
      tint: "blue" as const,
      title: "Capture",
      desc: "Every email, call, meeting, doc, and ticket flows in automatically. No CRM hygiene. No second system to update.",
    },
    {
      Icon: Layers,
      tint: "blue" as const,
      title: "Organize",
      desc: "min. auto-extracts people, accounts, deals, and decisions — then links them across every source into one living memory graph.",
    },
    {
      Icon: Plug,
      tint: "amber" as const,
      title: "Recall, pooled",
      desc: "Any AI, any seat, one query — recalls across sales, support, success, and ops at once. The whole company's memory, in the app you'd open anyway.",
    },
  ];

  return (
    <section id="teams" className="relative py-24 md:py-32 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Pooled Team Memory"
          title="One pool. Recalled by every AI on the team."
          desc="Sales sees what support resolved. Support sees what success promised. Success sees what sales pitched. Ops sees the whole picture. Any AI, any seat — one query, all of it. Onboarding is days, not months. Knowledge doesn't walk out the door."
        />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-y-8 max-w-5xl mx-auto">
          <FlowCell {...flow[0]} />
          <FlowArrow />
          <FlowCell {...flow[1]} />
          <FlowArrow />
          <FlowCell {...flow[2]} />
        </div>

        {/* Audience callouts */}
        <p className="text-center text-[11px] tracking-[0.22em] uppercase text-slate-500 font-mono mt-16 mb-5">
          Four teams · One pool · Every AI knows what the others know
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          <AudienceCard
            Icon={TrendingUp}
            label="Sales"
            line="Walk into every call already caught up. Pipeline notes, prior touches, decision-makers — loaded."
          />
          <AudienceCard
            Icon={Headphones}
            label="Support"
            line="Every ticket the customer ever filed, every workaround you ever shipped — recallable in a sentence."
          />
          <AudienceCard
            Icon={Sparkles}
            label="Customer Success"
            line="Renewal signals, expansion threads, sentiment shifts — surface before they become surprises."
          />
          <AudienceCard
            Icon={Briefcase}
            label="Operators"
            line="See the full picture across every team. Decisions backed by every prior conversation, decision, and outcome."
          />
        </div>

        <p className="text-center text-slate-500 text-xs mt-12 max-w-xl mx-auto">
          Day 0: a sea of messy threads across ten tools.
          Day 1: one living memory that every AI you use can read.
        </p>
      </div>
    </section>
  );
}

function FlowCell({
  Icon,
  tint,
  title,
  desc,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number; fill?: string }>;
  tint: "blue" | "amber";
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center text-center px-2">
      <div className="mb-5">
        <IconTile
          Icon={Icon}
          size="xl"
          tint={tint}
          glow="strong"
          filled={tint === "amber"}
        />
      </div>
      <h3 className="text-white text-xl font-semibold tracking-[-0.015em] mb-3">
        {title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed max-w-[260px]">
        {desc}
      </p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden md:flex items-center justify-center pt-8">
      <div className="relative w-24 lg:w-32 flex items-center">
        <div className="flex-1 h-px bg-gradient-to-r from-white/0 via-white/15 to-white/15" />
        <ArrowRight className="w-4 h-4 text-slate-500 -ml-2" />
      </div>
    </div>
  );
}

function AudienceCard({
  Icon,
  label,
  line,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  line: string;
}) {
  return (
    <div
      className="rounded-xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-4 md:p-5 text-left"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <span className="grid place-items-center w-7 h-7 rounded-md bg-gradient-to-b from-blue-500/[0.18] to-blue-500/[0.04] border border-blue-400/25">
          <Icon className="w-3.5 h-3.5 text-blue-300" strokeWidth={1.75} />
        </span>
        <span className="text-[10px] tracking-[0.20em] uppercase text-blue-200 font-mono font-semibold">
          For {label}
        </span>
      </div>
      <p className="text-slate-300 text-[13px] leading-relaxed">{line}</p>
    </div>
  );
}

/* ───────── FAQ ───────── */

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "How does this actually work?",
    a: (
      <>
        Connect Gmail or Outlook in one click. From that moment, min. quietly
        reads every email, calendar event, meeting transcript, and doc you
        give it permission to see, and builds a private memory of the people
        you talk to, the deals you're working, the decisions you've made, and
        every thread that touches them. Then every AI you open — Claude,
        Cursor, ChatGPT — picks it up automatically. Most accounts are fully
        indexed in a few hours. No training, no setup calls, no notes app to
        keep tidy.
      </>
    ),
  },
  {
    q: "Which AI tools can plug into my memory?",
    a: (
      <>
        Anything that speaks MCP. Today that's{" "}
        <span className="text-slate-200">
          Claude Desktop, Claude Code, Cursor, ChatGPT, Granola, Linear
        </span>
        , and any custom agent your team builds with the MCP SDK. New tools
        added weekly. One memory, every tool, instantly.
      </>
    ),
  },
  {
    q: "How is this different from a vector DB or a notes app?",
    a: (
      <>
        Vector DBs and notes apps store text. min. stores{" "}
        <span className="text-slate-200">structured memory</span> — people,
        companies, deals, calls, decisions — and updates them automatically as
        your work evolves. It's not a destination you visit; it's the layer
        underneath every AI tool you already use. LLMs without memory are
        dumb. min. plugs you in.
      </>
    ),
  },
  {
    q: "Does this work for individuals, or only teams?",
    a: (
      <>
        Built for teams, also great for individuals. Solo users get a private
        memory that follows them across every AI they open. Teams get all of
        that{" "}
        <span className="text-slate-200">plus pooled memory</span> across
        sales, support, success, and ops — any AI, any seat, one query pulls
        from all of it. Onboarding is days, not months.
      </>
    ),
  },
  {
    q: "How does pooled memory work across teams?",
    a: (
      <>
        One pool, segmented by permission. Sales reps can see what support
        resolved, support sees what success promised, success sees what sales
        pitched, ops sees the whole picture — anything you grant access to.
        Sensitive items can stay private to a person, a function, or a deal.
        Every AI a teammate opens recalls{" "}
        <span className="text-slate-200">across whatever they're allowed to see</span>,
        in one query.
      </>
    ),
  },
  {
    q: "What happens to memory when a teammate leaves?",
    a: (
      <>
        It stays with the team. Customer relationships, deal history,
        institutional context, and prior decisions live in the shared memory,
        not in someone's head or personal inbox. New hires inherit it from day
        one. Memory doesn't walk out the door.
      </>
    ),
  },
  {
    q: "Is my data safe? Do you train on it?",
    a: (
      <>
        Your memory is yours. We{" "}
        <span className="text-slate-200">never sell it</span>, never broker
        it, never train models on it — ours or any provider's. Every
        connected AI tool only sees what you authorize. Encrypted in transit
        with TLS 1.3, hosted on SOC 2 Type II infrastructure, end-to-end
        encrypted at rest.{" "}
        <Link
          to="/security"
          className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
        >
          Read the full security page →
        </Link>
      </>
    ),
  },
  {
    q: "How does it stay updated?",
    a: (
      <>
        Continuously. Every new email, message, meeting, transcript, or doc
        gets indexed in real-time. Your memory is never stale, never
        re-indexing. The longer you work, the smarter every AI you use gets.
      </>
    ),
  },
  {
    q: "Can I export my memory?",
    a: (
      <>
        Always. JSON or Markdown, your choice. min. is built on open MCP — no
        lock-in. Your memory is yours to take anywhere.
      </>
    ),
  },
];

/* ───────── CTA ───────── */

function CallToActionSection() {
  return (
    <section className="relative py-20 md:py-28 scroll-mt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(80,120,255,0.14) 0%, rgba(80,120,255,0.04) 35%, transparent 70%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-white font-semibold tracking-[-0.025em] leading-[1.05] text-3xl md:text-5xl">
          Let's fix that.
        </h2>
        <p className="mt-5 text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          Plug into the apps you already open. Your whole team's
          memory, in every AI — today.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3">
          <a
            href="https://app.getmin.ai/find"
            className="inline-flex items-center gap-2 rounded-full bg-slate-50 text-black text-sm md:text-base font-semibold px-6 py-3 hover:bg-slate-200 transition-colors"
            style={{ boxShadow: "0 0 30px -6px rgba(255,255,255,0.35)" }}
          >
            Try it for free
            <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
          </a>
          <p className="text-xs text-slate-500 tracking-wide">
            no credit card, no sign up
          </p>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="relative py-24 md:py-32 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeader
          Icon={HelpCircle}
          eyebrow="FAQ"
          title="Questions, answered."
          desc="Everything teams ask us before getting started."
        />

        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-3"
        >
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className={`${CARD_SURFACE} border-b-0 px-5 md:px-6 transition-colors hover:border-white/[0.12]`}
              style={CARD_INNER_HIGHLIGHT}
            >
              <AccordionTrigger
                className="text-left text-white text-[15px] md:text-base font-medium tracking-[-0.005em] py-5 hover:no-underline [&>svg]:text-slate-400 [&>svg]:h-4 [&>svg]:w-4"
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 pt-0 text-sm text-slate-400 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 mb-2">Still have questions?</p>
          <a
            href="mailto:hello@getmin.ai"
            className="text-blue-300 hover:text-blue-200 text-sm font-medium underline underline-offset-4 transition-colors"
          >
            hello@getmin.ai
          </a>
        </div>
      </div>
    </section>
  );
}

/* unused import shim */
void Bell; void Circle; void Activity;

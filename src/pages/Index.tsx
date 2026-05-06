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
  User,
  TrendingUp,
  Fuel,
  Cloud,
  ArrowDown,
} from "lucide-react";

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
        <title>min. | Quote faster. Find coverage. Build a carrier network that grows itself.</title>
        <meta
          name="description"
          content="min. is the quoting and capacity engine for freight brokers. Source carriers from your private network in seconds, blast RFQs in one sentence, and watch your network compound with every booking."
        />
        <link rel="canonical" href="https://getmin.ai" />
      </Helmet>

      <div className="min-h-screen bg-black text-slate-200 font-sans antialiased overflow-x-hidden">
        <PillNav />

        <main>
          <Hero />
          <CollectiveMemorySection />
          <TakeActionSection />
          <IntelligentSearchSection />
          <SharedBrainSection />
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
          The Quoting & Capacity Engine for Freight Brokers
        </p>
        <h1 className="text-white font-semibold tracking-[-0.025em] leading-[1.04] text-[44px] sm:text-6xl md:text-7xl">
          Quote faster. Find coverage.
          <br />
          Build a carrier network
          <br />
          that <span className="text-blue-300">grows itself</span>.
        </h1>
        <p className="mt-7 text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          min. consolidates live market demand, your team's historical pricing,
          and real-time fuel and weather signals into one quoting engine.
          Source coverage in seconds, get rates from matching carriers in one
          click, and watch your carrier pool grow with every booking.
        </p>

        <div className="mt-16 md:mt-20">
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
    { Icon: Mail, label: "Emails" },
    { Icon: FileText, label: "PDFs & PODs" },
    { Icon: FileSpreadsheet, label: "Excel Docs" },
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

      {/* Top: Carrier Network graphic — featured carrier card with RPG-style attribute bars,
           surrounded by satellite carrier nodes connected by network lines */}
      <CarrierNetworkGraphic />
      <p className="text-center text-[11px] tracking-[0.18em] uppercase text-slate-500 mt-4 font-medium">
        Compounds with every booking
      </p>

      {/* Connectors to bottom row */}
      <HeroConnector
        paths={["M200 0 Q120 30 80 60", "M200 0 Q280 30 320 60"]}
      />

      {/* Bottom: Find Capacity + Quote in Seconds */}
      <div className="grid grid-cols-2 gap-4 mx-auto max-w-md">
        <SmallPillarCard
          Icon={Search}
          tint="blue"
          title="Find Coverage"
          desc="Source carriers from your network in seconds."
        />
        <SmallPillarCard
          Icon={Zap}
          tint="amber"
          filled
          title="Quote in Seconds"
          desc="Blast RFQs and collect responses in one place."
        />
      </div>
    </div>
  );
}

/* ───────── Carrier Network graphic (hero centerpiece) ───────── */

const ROSTER = [
  { initials: "PB", name: "Polar Bear Transit", tier: "A" as const, ovr: 82 },
  { initials: "NF", name: "Northern Freight", tier: "A" as const, ovr: 79 },
  { initials: "HL", name: "Heartland Lines", tier: "B" as const, ovr: 71 },
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
            Your Carrier Network
          </span>
        </div>
        <span className="text-[9px] text-slate-400 font-mono tabular-nums tracking-[0.14em]">
          872 CARRIERS
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
              AL
            </span>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-white text-[13px] font-semibold leading-tight truncate">
                Apex Logistics
              </p>
              <p className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.14em] mt-0.5">
                FTL · Reefer
              </p>
            </div>
            <TierBadge tier="S" />
          </div>

          {/* Radar / stat polygon */}
          <RadarChart
            stats={[
              { label: "Response", value: 92 },
              { label: "On-Time", value: 97 },
              { label: "Pricing", value: 86 },
              { label: "Capacity", value: 73 },
              { label: "Coverage", value: 81 },
              { label: "Reliability", value: 95 },
            ]}
          />

          {/* Bottom meta */}
          <div className="flex items-center gap-1.5 mt-1 pt-2.5 border-t border-white/[0.06]">
            <span
              className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] font-mono text-slate-200"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
            >
              ORD→MIA
            </span>
            <span
              className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] font-mono text-slate-300"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
            >
              +12 LANES
            </span>
            <span className="ml-auto text-[9px] text-slate-400 font-mono tracking-wide tabular-nums">
              45 BOOKINGS
              <span className="text-slate-600 mx-1">|</span>
              86 QUOTES
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
            Also in your network
          </span>
          <span className="text-[8px] tracking-[0.18em] uppercase text-slate-500 font-mono">
            File · OVR
          </span>
        </div>
        <div className="space-y-0.5">
          {ROSTER.map((c) => (
            <RosterRow key={c.initials} {...c} />
          ))}
        </div>
        <div className="flex items-center justify-center mt-1.5 pt-1.5 border-t border-white/[0.05]">
          <span className="text-[9px] text-slate-400 font-mono tabular-nums tracking-wide">
            + 869 more
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
    <section id="network" className="relative py-24 md:py-32 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          Icon={Network}
          title="Your Carrier Network"
          desc="Every email, every quote, every booking compounds into a private capacity network. The more your team works, the stronger your liquidity gets."
        />

        {/* 2-up top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <BigFeatureCard
            Icon={Network}
            title="Network Compounds With Every Booking"
            body="Every quote, every cover, every POD adds a new edge to your carrier graph. The carriers your team has worked with, the lanes they run, how fast they respond, and the rates they hit. All permanent, all compounding."
            visual={<EmailRowsMock />}
          />
          <BigFeatureCard
            Icon={Database}
            title="What Feeds the Network"
            body="Emails, Load Sheets, Excel Rate Tables, Carrier Quotes, Rate Confirmations, BOLs, PODs. Every interaction becomes capacity intelligence."
            visual={<FileTilesMock />}
          />
        </div>

        {/* 3-up bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard
            Icon={Truck}
            title="Automatic Lane Mapping"
            body="If a carrier quotes a lane once, min. remembers they run that lane, their equipment, and the rate given. Liquidity for next time."
            visual={<LaneSliderMock from="ORD" to="DFW" />}
          />
          <FeatureCard
            Icon={Sparkles}
            title="Zero Data Entry"
            body="No CRM. No carrier sheet. Your network grows automatically with every email your team sends and receives."
            visual={<NotificationIconsMock />}
          />
          <FeatureCard
            Icon={Users}
            title="The Network Stays With You"
            body="When a rep leaves, their carrier relationships, lane history, and rate cards stay inside the company. The network is the brokerage's greatest asset."
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
  desc?: string;
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
    { name: "Apex Logistics", w: "w-[78%]", active: false },
    { name: "Polar Bear Transit", w: "w-[62%]", active: false },
    { name: "Northern Freight", w: "w-[88%]", active: true },
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
    { Icon: FileText, label: "PDF" },
    { Icon: FileSpreadsheet, label: "Excel" },
    { Icon: FileText, label: "Proof of Delivery" },
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
        Carrier coverage <span className="text-slate-300">58%</span>
      </p>
    </MockSurface>
  );
}

function NotificationIconsMock() {
  const items = [
    { Icon: Mail, label: "Quote received", meta: "2m" },
    { Icon: Truck, label: "POD attached", meta: "5m" },
    { Icon: Activity, label: "Lane indexed", meta: "now" },
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
    <MockSurface className="px-4 py-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-1.5">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-white/[0.04] border border-white/10">
            <User className="w-4 h-4 text-slate-300" strokeWidth={1.75} />
          </span>
          <span className="text-[9px] tracking-[0.14em] uppercase text-slate-500">
            Rep
          </span>
        </div>
        <div className="flex-1 mx-3 relative h-px">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(96,140,255,0.5), transparent)",
            }}
          />
          <ArrowRight className="absolute -top-2 right-0 w-3.5 h-3.5 text-blue-300" />
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <span
            className="grid place-items-center w-9 h-9 rounded-full bg-blue-500/12 border border-blue-400/30"
            style={{ boxShadow: "0 0 16px rgba(96,140,255,0.25)" }}
          >
            <Building2 className="w-4 h-4 text-blue-300" strokeWidth={1.75} />
          </span>
          <span className="text-[9px] tracking-[0.14em] uppercase text-blue-300">
            Company
          </span>
        </div>
      </div>
    </MockSurface>
  );
}

/* ───────── INTELLIGENT SEARCH ───────── */

function IntelligentSearchSection() {
  return (
    <section id="capacity" className="relative py-24 md:py-32 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          Icon={Search}
          title="Find coverage instantly."
          desc="Every shipper rate request is matched against every carrier in your private network and our extended, comprehensive network of over 50,000 carriers. Network quotes consistently beat public loadboard spot rates."
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
      <FlowStage step="1" label="Incoming rate request" tint="slate">
        <LoadRequestCard />
      </FlowStage>

      <FlowConnector label="MATCHED" />

      <FlowStage
        step="2"
        label="Ranked against your network · 8 carriers"
        tint="blue"
      >
        <MatchedCarriersList />
        <SendRequestButton count={8} />
      </FlowStage>

      <FlowConnector label="QUOTES IN" />

      <FlowStage
        step="3"
        label="Ranked by price + reliability"
        tint="emerald"
      >
        <RankedQuotesList />
        <LoadboardComparison
          networkBest={3400}
          loadboardAvg={4150}
        />
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
  const fields = [
    ["From", "Acme Foods"],
    ["Pickup", "Toronto, ON"],
    ["Dropoff", "Miami, FL"],
    ["Equipment", "FTL Reefer"],
    ["Commodity", "35,000 lbs oranges"],
  ];
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3.5">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[10px] font-mono font-semibold text-slate-300 tracking-wider">
          LOAD #2419
        </span>
        <span className="text-[9px] font-mono text-slate-500 tabular-nums">
          MON → FRI
        </span>
      </div>
      <dl className="grid grid-cols-[80px_1fr] gap-y-1.5 text-[12px] font-mono">
        {fields.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-slate-500">{k}:</dt>
            <dd className="text-slate-200">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function MatchedCarriersList() {
  const matches = [
    { initials: "AL", name: "Apex Logistics", tier: "S" as const, ovr: 87, best: true },
    { initials: "PB", name: "Polar Bear Transit", tier: "A" as const, ovr: 82 },
    { initials: "NF", name: "Northern Freight", tier: "A" as const, ovr: 79 },
  ];
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
      <ul className="divide-y divide-white/[0.05]">
        {matches.map((m) => (
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
      <div className="px-3.5 py-2 border-t border-white/[0.05] text-[9px] tracking-[0.18em] uppercase text-slate-500 font-mono text-center">
        + 5 more matches in your network
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
        Send rate request to all {count}
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
            <span
              className="grid place-items-center w-7 h-7 rounded-md bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 text-[10px] font-mono font-semibold text-slate-300"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
            >
              {q.initials}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[12px] font-medium leading-tight truncate">
                {q.name}
              </p>
              <p className="text-[9px] text-slate-500 font-mono tracking-wide tabular-nums">
                REL {q.rel}
              </p>
            </div>
            <TierBadge tier={q.tier} />
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
    <section id="quoting" className="relative py-24 md:py-32 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          Icon={Zap}
          tint="amber"
          filled
          eyebrow="Unified Quoting Agent"
          title="Quote in seconds."
          desc="One engine that fuses live market demand, your team's historical pricing, and real-time fuel and weather data into a single recommended rate. Get the right number before you reply to the shipper."
        />

        <div className="max-w-md mx-auto">
          <QuoteSignals />
        </div>
      </div>
    </section>
  );
}

function QuoteSignals() {
  const signals = [
    { Icon: TrendingUp, label: "Market Demand", meta: "DAT · live" },
    { Icon: Database, label: "Your History", meta: "12 mo" },
    { Icon: Fuel, label: "Fuel", meta: "EIA · today" },
    { Icon: Cloud, label: "Weather", meta: "Route" },
  ];
  return (
    <MockSurface className="p-3.5">
      <p className="text-[10px] tracking-[0.18em] uppercase text-slate-500 mb-2.5 font-medium">
        Signals consolidated
      </p>
      <div className="grid grid-cols-2 gap-2">
        {signals.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01]"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
          >
            <span className="grid place-items-center w-7 h-7 rounded-md border border-blue-400/25 bg-gradient-to-b from-blue-500/[0.15] to-blue-500/[0.03] shrink-0">
              <s.Icon
                className="w-[14px] h-[14px] text-blue-300"
                strokeWidth={1.75}
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-white font-medium leading-tight truncate">
                {s.label}
              </p>
              <p className="text-[9px] tracking-[0.12em] uppercase text-slate-500 leading-tight font-mono mt-0.5">
                {s.meta}
              </p>
            </div>
            <span
              className="block w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
              style={{ boxShadow: "0 0 8px rgba(52,211,153,0.7)" }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex items-center justify-center">
        <ArrowDown className="w-3.5 h-3.5 text-slate-500" strokeWidth={2} />
      </div>
      <div
        className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border border-amber-400/30 bg-gradient-to-b from-amber-500/[0.12] to-amber-500/[0.02]"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-2">
          <Zap
            className="w-3.5 h-3.5 text-amber-400"
            strokeWidth={2}
            fill="currentColor"
          />
          <p className="text-[11px] tracking-[0.12em] uppercase text-amber-200 font-medium">
            Suggested rate
          </p>
        </div>
        <p
          className="text-amber-100 text-sm font-semibold tabular-nums"
          style={{ textShadow: "0 0 12px rgba(251,191,36,0.4)" }}
        >
          $3,420
        </p>
      </div>
    </MockSurface>
  );
}

function LoadDetailsCard() {
  const rows = [
    ["Pickup", "Toronto, ON"],
    ["Dropoff", "Miami, FL"],
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
      Icon: Zap,
      tint: "amber" as const,
      title: "Quote",
      desc: "Give shippers a price in seconds. min. fuses live market demand, your history, fuel, and weather into one recommended rate.",
    },
    {
      Icon: Search,
      tint: "blue" as const,
      title: "Capacity",
      desc: "Match every shipper request against your carrier network, then blast the RFQ to the top carriers in one click.",
    },
    {
      Icon: Network,
      tint: "blue" as const,
      title: "Network",
      desc: "Every quote and booking compounds your carrier graph. Your liquidity gets stronger every day.",
    },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          title="A network that compounds with every booking."
          desc="Quote, cover, repeat. Every load your team works adds carriers, lanes, and rates to your private network, so the next quote is faster and the next cover is easier."
        />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-y-8 max-w-5xl mx-auto">
          <FlowCell {...flow[0]} />
          <FlowArrow />
          <FlowCell {...flow[1]} />
          <FlowArrow />
          <FlowCell {...flow[2]} />
        </div>

        <p className="text-center text-slate-500 text-xs mt-12 max-w-xl mx-auto">
          Day 0: thousands of messy contacts in your inbox.
          Day 1: searchable private capacity network that money can't buy.
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

/* unused import shim */
void Bell; void Circle; void Activity;

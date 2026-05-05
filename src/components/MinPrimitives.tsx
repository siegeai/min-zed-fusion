/**
 * Shared design primitives used across the dark-themed marketing pages
 * (Index, About, Careers, Contact, Security).
 *
 * Inline equivalents existed in Index.tsx and About.tsx — keeping a single
 * source of truth here so pages stay visually consistent.
 */

export type Tint = "blue" | "amber" | "slate";
export type IconTileSize = "sm" | "md" | "lg" | "xl";

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
const SIZE_BOX: Record<IconTileSize, string> = {
  sm: "w-9 h-9 rounded-lg",
  md: "w-11 h-11 rounded-xl",
  lg: "w-14 h-14 rounded-2xl",
  xl: "w-16 h-16 rounded-2xl",
};
const SIZE_ICON: Record<IconTileSize, string> = {
  sm: "w-[15px] h-[15px]",
  md: "w-[18px] h-[18px]",
  lg: "w-6 h-6",
  xl: "w-7 h-7",
};

export function IconTile({
  Icon,
  size = "md",
  tint = "blue",
  glow = "soft",
  filled = false,
  className = "",
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number; fill?: string }>;
  size?: IconTileSize;
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

export const CARD_SURFACE =
  "rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-sm";
export const CARD_SURFACE_LG =
  "rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.01] backdrop-blur-sm";
export const CARD_INNER_HIGHLIGHT = {
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.01)",
} as const;

/** Hero radial blue glow (positioned absolutely behind the hero text). */
export function HeroAmbientGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 50% 35% at 50% 25%, rgba(96,140,255,0.15) 0%, transparent 70%)",
      }}
    />
  );
}

/** Pill-shaped CTA button — uses bg-slate-50 to dodge the global html.dark bg-white override. */
export function PillButton({
  href,
  children,
  variant = "white",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "white" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full text-sm font-medium px-5 py-2.5 transition-colors";
  const variants = {
    white: "bg-slate-50 text-black hover:bg-slate-200",
    outline:
      "border border-white/15 text-slate-200 hover:text-white hover:border-white/25",
  };
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}

/**
 * Shared design primitives used across the light-themed marketing pages
 * (Index, About, Careers, Contact, Security, Pricing, Privacy, Terms).
 *
 * Single source of truth so pages stay visually consistent with the
 * minimalist "collective memory" vision.
 */

export type Tint = "blue" | "amber" | "slate";
export type IconTileSize = "sm" | "md" | "lg" | "xl";

const TINT_BG: Record<Tint, string> = {
  blue: "bg-blue-50 border-blue-100",
  amber: "bg-amber-50 border-amber-100",
  slate: "bg-gray-50 border-gray-100",
};
const TINT_ICON: Record<Tint, string> = {
  blue: "text-blue-600",
  amber: "text-amber-500",
  slate: "text-gray-700",
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
  tint = "slate",
  glow = "none",
  filled = false,
  className = "",
}: {
  Icon: React.ElementType;
  size?: IconTileSize;
  tint?: Tint;
  glow?: "none" | "soft" | "strong";
  filled?: boolean;
  className?: string;
}) {
  return (
    <span
      className={[
        "relative inline-flex items-center justify-center border shadow-sm",
        SIZE_BOX[size],
        TINT_BG[tint],
        className,
      ].join(" ")}
    >
      <Icon
        className={`relative ${SIZE_ICON[size]} ${TINT_ICON[tint]}`}
        strokeWidth={1.75}
        {...(filled ? { fill: "currentColor" } : {})}
      />
    </span>
  );
}

export const CARD_SURFACE =
  "rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]";
export const CARD_SURFACE_LG =
  "rounded-3xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]";
export const CARD_INNER_HIGHLIGHT = {} as const;

/** Hero radial glow (positioned absolutely behind the hero text). Subtle on light. */
export function HeroAmbientGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 50% 35% at 50% 20%, rgba(59,130,246,0.06) 0%, transparent 70%)",
      }}
    />
  );
}

/** Pill-shaped CTA button. */
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
    white: "bg-black text-white hover:bg-gray-800",
    outline:
      "border border-gray-200 text-gray-700 hover:text-black hover:border-gray-300",
  };
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}

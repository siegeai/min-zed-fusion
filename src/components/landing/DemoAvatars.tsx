import { useId } from "react";
import { Aperture } from "lucide-react";

/**
 * Illustrated avatars + logomarks for the demo capsules. The people are
 * fictional, so instead of stock photos of real humans (or flaky external
 * avatar services) these are self-contained flat-vector portraits in the same
 * illustration language as the About page. One parametric face, four presets.
 */

type Look = {
  bg: string;
  skin: string;
  hair: string;
  shirt: string;
  style: "short" | "bun" | "locks";
};

const LOOKS: Record<string, Look> = {
  jordan: { bg: "#A7E9C9", skin: "#E2AC7F", hair: "#3B2B20", shirt: "#0B7A55", style: "short" },
  you: { bg: "#D7DBE0", skin: "#F0C29B", hair: "#17181B", shirt: "#1F2937", style: "short" },
  avery: { bg: "#BFD8FE", skin: "#8D5A3B", hair: "#120D0A", shirt: "#2563EB", style: "bun" },
  priya: { bg: "#FBE3A2", skin: "#C98850", hair: "#241812", shirt: "#B45309", style: "locks" },
};

export function FlatAvatar({
  who,
  size = 40,
  label,
  className = "",
}: {
  who: keyof typeof LOOKS;
  size?: number;
  label: string;
  className?: string;
}) {
  const id = useId();
  const l = LOOKS[who];
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      role="img"
      aria-label={label}
      className={`shrink-0 rounded-full ${className}`}
    >
      <clipPath id={id}>
        <circle cx="24" cy="24" r="24" />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <circle cx="24" cy="24" r="24" fill={l.bg} />

        {/* Shoulders */}
        <path d="M7 48 Q7 33.5 24 33.5 Q41 48 41 48 Q41 33.5 24 33.5 Q7 33.5 7 48 Z" fill={l.shirt} />
        <path d="M7 48 Q7 33.5 24 33.5 Q41 33.5 41 48 Z" fill={l.shirt} />

        {/* Neck */}
        <rect x="20.5" y="25" width="7" height="6.5" rx="2.5" fill={l.skin} />

        {/* Hair mass behind the head */}
        <circle cx="24" cy="16.5" r="9.2" fill={l.hair} />
        {l.style === "bun" && <circle cx="24" cy="6.8" r="3.4" fill={l.hair} />}
        {l.style === "locks" && (
          <>
            <rect x="12.6" y="14" width="5" height="14.5" rx="2.5" fill={l.hair} />
            <rect x="30.4" y="14" width="5" height="14.5" rx="2.5" fill={l.hair} />
          </>
        )}

        {/* Face */}
        <circle cx="24" cy="19.5" r="7.8" fill={l.skin} />
        {/* Hairline cap over the forehead */}
        <path d="M16.3 18.2 a7.8 7.8 0 0 1 15.4 0 q-2.4 -3.4 -7.7 -3.4 q-5.3 0 -7.7 3.4 Z" fill={l.hair} />

        {/* Eyes + smile */}
        <circle cx="21.2" cy="20.3" r="0.95" fill="#1F2937" opacity="0.85" />
        <circle cx="26.8" cy="20.3" r="0.95" fill="#1F2937" opacity="0.85" />
        <path
          d="M21.7 23.6 Q24 25.4 26.3 23.6"
          stroke="#7C4A2A"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />
      </g>
    </svg>
  );
}

/** Aperture's logomark: an indigo tile with a camera-aperture iris. */
export function ApertureLogo({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label="Aperture logo"
      className={`flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 ${className}`}
      style={{ width: size, height: size }}
    >
      <Aperture className="text-white" style={{ width: size * 0.58, height: size * 0.58 }} strokeWidth={2} />
    </span>
  );
}

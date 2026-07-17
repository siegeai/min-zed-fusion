import { Aperture } from "lucide-react";

/**
 * Portrait photos + logomarks for the demo capsules. The people are fictional
 * personas cast from free-license portrait photography (Unsplash-sourced),
 * self-hosted in /public/avatars so the hero visual never depends on an
 * external image service.
 */

const PHOTOS: Record<string, string> = {
  jordan: "/avatars/jordan.jpg",
  you: "/avatars/you.jpg",
  avery: "/avatars/avery.jpg",
  priya: "/avatars/priya.jpg",
};

export function FlatAvatar({
  who,
  size = 40,
  label,
  className = "",
}: {
  who: keyof typeof PHOTOS;
  size?: number;
  label: string;
  className?: string;
}) {
  return (
    <img
      src={PHOTOS[who]}
      alt={label}
      width={size}
      height={size}
      className={`shrink-0 rounded-full object-cover ${className}`}
      style={{ width: size, height: size }}
    />
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

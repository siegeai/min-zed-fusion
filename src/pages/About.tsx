import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Linkedin, X, BookOpen, Zap, Search, Network } from "lucide-react";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const CARD_SURFACE =
  "rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-sm";
const CARD_INNER_HIGHLIGHT = {
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.01)",
} as const;

type Tint = "blue" | "amber";

function IconTile({
  Icon,
  tint = "blue",
  filled = false,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number; fill?: string }>;
  tint?: Tint;
  filled?: boolean;
}) {
  const bg =
    tint === "amber"
      ? "bg-gradient-to-b from-amber-400/[0.20] to-amber-500/[0.04] border-amber-400/30"
      : "bg-gradient-to-b from-blue-500/[0.18] to-blue-500/[0.04] border-blue-400/25";
  const iconColor = tint === "amber" ? "text-amber-400" : "text-blue-300";
  const glowColor =
    tint === "amber" ? "rgba(251,191,36,0.40)" : "rgba(96,140,255,0.45)";
  return (
    <span
      className={`relative inline-flex items-center justify-center w-11 h-11 rounded-xl border ${bg}`}
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.25)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-2 rounded-[inherit] blur-md -z-10"
        style={{
          background: `radial-gradient(circle, ${glowColor}, transparent 70%)`,
        }}
      />
      <Icon
        className={`relative w-[18px] h-[18px] ${iconColor}`}
        strokeWidth={1.75}
        {...(filled ? { fill: "currentColor" } : {})}
      />
    </span>
  );
}

const BELIEFS = [
  {
    Icon: Zap,
    tint: "amber" as const,
    filled: true,
    title: "Quoting is the work",
    body: "Brokers don't lose deals on strategy. They lose them on speed. We make quoting a one-sentence action.",
  },
  {
    Icon: Search,
    tint: "blue" as const,
    title: "Capacity should be findable",
    body: "Every carrier your team has ever talked to should surface in seconds. Not just the ones the broker on the load remembers.",
  },
  {
    Icon: Network,
    tint: "blue" as const,
    title: "Networks should compound",
    body: "Every quote, cover, and POD should add a permanent edge to your carrier graph. Your liquidity should get stronger every booking.",
  },
];

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About min.",
    description:
      "min. is the quoting and capacity engine for freight brokers. Source coverage from your private network in seconds, blast RFQs in one sentence, and watch your network compound with every booking.",
    url: "https://getmin.ai/about",
    mainEntity: {
      "@type": "Organization",
      name: "min.",
      founder: {
        "@type": "Person",
        name: "Eric Wang",
        jobTitle: "CEO & Co-Founder",
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>About min. | The quoting & capacity engine for freight brokers</title>
        <meta
          name="description"
          content="min. is the quoting and capacity engine for freight brokers. Source coverage from your private network in seconds, blast RFQs in one sentence, and watch your network compound with every booking."
        />
        <link rel="canonical" href="https://getmin.ai/about" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-black text-slate-200 font-sans antialiased overflow-x-hidden">
        <PillNav />

        <main>
          {/* Hero */}
          <section className="relative pt-36 md:pt-44 pb-20 overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 50% 35% at 50% 25%, rgba(96,140,255,0.15) 0%, transparent 70%)",
              }}
            />
            <div className="relative max-w-4xl mx-auto px-6 text-center">
              <p className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-slate-400 mb-6">
                About min.
              </p>
              <h1 className="text-white font-semibold tracking-[-0.025em] leading-[1.08] text-4xl md:text-6xl">
                We're building the quoting and
                <br className="hidden sm:block" />{" "}
                capacity engine for{" "}
                <span className="text-blue-300">freight brokers</span>.
              </h1>
              <p className="mt-7 text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Brokerages don't need another CRM. They need a private carrier
                network that grows with every email, so quoting takes one
                sentence and capacity is always one search away.
              </p>
            </div>
          </section>

          {/* What we believe */}
          <section className="py-16 md:py-20">
            <div className="max-w-5xl mx-auto px-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-slate-500 mb-3 text-center">
                What we believe
              </p>
              <h2 className="text-white text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-center mb-12">
                Three things, anchored.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {BELIEFS.map((b) => (
                  <div
                    key={b.title}
                    className={`${CARD_SURFACE} p-6`}
                    style={CARD_INNER_HIGHLIGHT}
                  >
                    <div className="mb-4">
                      <IconTile Icon={b.Icon} tint={b.tint} filled={b.filled} />
                    </div>
                    <h3 className="text-white text-base font-semibold tracking-[-0.01em] mb-2">
                      {b.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {b.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Story */}
          <section className="py-16 md:py-20">
            <div className="max-w-2xl mx-auto px-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-slate-500 mb-3">
                Origin
              </p>
              <h2 className="text-white text-3xl md:text-4xl font-semibold tracking-[-0.02em] mb-8">
                We built this for ourselves first.
              </h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  We watched brokers re-paste the same load into ten emails,
                  hunt through Outlook for "the carrier who ran this last
                  spring," and lose deals because a quote took two hours
                  instead of two minutes.
                </p>
                <p>
                  The data was already there, sitting in the inbox. It just
                  wasn't organized into a network anyone could query.
                </p>
                <p>
                  So we built min. The quoting and capacity engine that turns
                  every email into a carrier you can find, and every booking
                  into a network that's worth more tomorrow than it was today.
                </p>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="py-16 md:py-20">
            <div className="max-w-5xl mx-auto px-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-slate-500 mb-6 text-center">
                Team
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TeamCard
                  name="Eric Wang"
                  title="CEO"
                  bio="Previously shipped product at Coursera, Bbot, and DoorDash. Now building the network that compounds for every brokerage."
                  avatar={
                    <Avatar className="w-16 h-16 shrink-0 border border-white/10">
                      <AvatarImage
                        src="/lovable-uploads/a08e6a56-3aaf-4f91-b83a-909a4d24b497.png"
                        alt="Eric Wang"
                      />
                      <AvatarFallback className="bg-white/5 text-slate-300">
                        EW
                      </AvatarFallback>
                    </Avatar>
                  }
                  socials={[
                    {
                      Icon: Linkedin,
                      href: "https://www.linkedin.com/in/zizhouwang/",
                      label: "Eric Wang on LinkedIn",
                    },
                    {
                      Icon: X,
                      href: "https://x.com/ericzizhouwangx",
                      label: "Eric Wang on X",
                    },
                    {
                      Icon: BookOpen,
                      href: "https://ericzizhouw.substack.com/",
                      label: "Eric Wang on Substack",
                    },
                  ]}
                />
                <TeamCard
                  name="Fadi Kanaan"
                  title="Head of Operations"
                  bio="Built partner channels at ClickLearn, Librestream, and ExpandIT. Started in freight covering carriers at Titanium Transportation. Now connecting min. to the brokerages that need it most."
                  avatar={<FadiAvatar />}
                  socials={[
                    {
                      Icon: Linkedin,
                      href: "https://www.linkedin.com/in/fadi-kanaan-268574155/",
                      label: "Fadi Kanaan on LinkedIn",
                    },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* CTA */}
          <section id="cta" className="pb-24 pt-8">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h3 className="text-white text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-4">
                Ready to see your carrier network compound?
              </h3>
              <p className="text-slate-400 mb-7 max-w-xl mx-auto">
                Quote faster, find capacity instantly, and watch every booking
                make the next one easier.
              </p>
              <a
                href="mailto:hello@getmin.ai?subject=Demo%20Request"
                className="inline-block rounded-full bg-slate-50 text-black text-sm font-medium px-5 py-2.5 hover:bg-slate-200 transition-colors"
              >
                Book Demo
              </a>
            </div>
          </section>
        </main>

        <MinFooter />
      </div>
    </>
  );
}

/* ───────── Team helpers ───────── */

function TeamCard({
  name,
  title,
  bio,
  avatar,
  socials = [],
}: {
  name: string;
  title: string;
  bio: string;
  avatar: React.ReactNode;
  socials?: { Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; href: string; label: string }[];
}) {
  return (
    <div
      className={`${CARD_SURFACE} p-6 md:p-7`}
      style={CARD_INNER_HIGHLIGHT}
    >
      <div className="flex items-start gap-5">
        {avatar}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h3 className="text-white text-lg font-semibold tracking-[-0.01em]">
              {name}
            </h3>
            {socials.length > 0 && (
              <div className="flex items-center gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                    aria-label={s.label}
                  >
                    <s.Icon className="w-4 h-4" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            )}
          </div>
          <p className="text-blue-300 text-xs font-medium tracking-wide mb-3">
            {title}
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">{bio}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Stylized portrait for Fadi Kanaan, modelled on his LinkedIn photo:
 * olive skin, close-cropped buzzcut, full short beard with mustache,
 * translucent rectangular glasses, small hoop earrings, blue polo.
 * Same flat-illustration vocabulary as Eric's avatar (sky-blue circle bg,
 * head proportions, eyes/eyebrows/highlight treatment) so they read as a set.
 */
function FadiAvatar() {
  return (
    <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden border border-white/10 bg-white">
      <svg
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
        aria-label="Fadi Kanaan portrait"
      >
        <defs>
          {/* Background — same vibrant sky-blue as Eric */}
          <radialGradient id="fk-bg" cx="0.5" cy="0.42" r="0.62">
            <stop offset="0%" stopColor="#6dcdf0" />
            <stop offset="100%" stopColor="#33a4cf" />
          </radialGradient>

          {/* Skin — warm olive with subtle vertical falloff */}
          <linearGradient id="fk-skin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dfa985" />
            <stop offset="60%" stopColor="#c89570" />
            <stop offset="100%" stopColor="#a87555" />
          </linearGradient>

          {/* Beard — warm-black with brown undertone */}
          <linearGradient id="fk-beard" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a1a10" />
            <stop offset="100%" stopColor="#0e0804" />
          </linearGradient>

          {/* Hair — slightly cooler than beard so they read as separate */}
          <linearGradient id="fk-hair" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c130b" />
            <stop offset="100%" stopColor="#0c0703" />
          </linearGradient>

          {/* Polo — denim/slate blue */}
          <linearGradient id="fk-polo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6383a4" />
            <stop offset="100%" stopColor="#385876" />
          </linearGradient>

          {/* Glasses lens — very subtle cool tint with sheen */}
          <linearGradient id="fk-lens" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <clipPath id="fk-clip">
            <circle cx="40" cy="40" r="40" />
          </clipPath>
        </defs>

        <rect width="80" height="80" fill="#ffffff" />

        <g clipPath="url(#fk-clip)">
          {/* Sky-blue brand circle */}
          <circle cx="40" cy="40" r="40" fill="url(#fk-bg)" />
          {/* Subtle vignette so the face pops */}
          <radialGradient id="fk-vignette" cx="0.5" cy="0.5" r="0.5">
            <stop offset="65%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
          </radialGradient>
          <circle cx="40" cy="40" r="40" fill="url(#fk-vignette)" />

          {/* ─────────── Polo shirt ─────────── */}
          {/* Body (extends past viewport) */}
          <path
            d="M -4 84 L -4 70 Q -4 60 16 55 L 33 60 L 40 64 L 47 60 L 64 55 Q 84 60 84 70 L 84 84 Z"
            fill="url(#fk-polo)"
          />
          {/* Subtle shoulder shadow inside polo */}
          <path
            d="M -4 84 L -4 76 Q 10 70 24 70 L 24 84 Z"
            fill="#26405c"
            opacity="0.35"
          />
          <path
            d="M 84 84 L 84 76 Q 70 70 56 70 L 56 84 Z"
            fill="#26405c"
            opacity="0.35"
          />
          {/* Collar — proper turn-down shape, with deeper inner panel for depth */}
          <path
            d="M 33 60 L 36 55 L 40 60 L 36 64 Z"
            fill="#2f4d6a"
          />
          <path
            d="M 47 60 L 44 55 L 40 60 L 44 64 Z"
            fill="#2f4d6a"
          />
          {/* Collar top-stitch highlight */}
          <path d="M 36 55 L 33 60" stroke="#7c9bbb" strokeWidth="0.35" opacity="0.7" />
          <path d="M 44 55 L 47 60" stroke="#7c9bbb" strokeWidth="0.35" opacity="0.7" />
          {/* Inner collar shadow under chin */}
          <path
            d="M 36 64 L 40 60 L 44 64 L 40 67 Z"
            fill="#1a3048"
            opacity="0.55"
          />
          {/* Button placket */}
          <line x1="40" y1="60" x2="40" y2="68" stroke="#1a3048" strokeWidth="0.45" strokeLinecap="round" />
          <circle cx="40" cy="62" r="0.45" fill="#1a3048" />
          <circle cx="40.05" cy="61.85" r="0.18" fill="#7c9bbb" opacity="0.6" />
          <circle cx="40" cy="64.5" r="0.45" fill="#1a3048" />
          <circle cx="40.05" cy="64.35" r="0.18" fill="#7c9bbb" opacity="0.6" />

          {/* ─────────── Neck ─────────── */}
          <path
            d="M 33 50 Q 33 56 32 59 L 48 59 Q 47 56 47 50 Z"
            fill="url(#fk-skin)"
          />
          {/* Neck shadow under chin (cast by jaw/beard) */}
          <path
            d="M 30 56 Q 40 62 50 56 L 50 60 Q 40 64 30 60 Z"
            fill="#8a5d3a"
            opacity="0.45"
          />

          {/* ─────────── Ears ─────────── */}
          <ellipse cx="22.5" cy="39" rx="2.7" ry="4.2" fill="#c89570" />
          <ellipse cx="22.4" cy="39.4" rx="1.3" ry="2.6" fill="#8a5d3a" opacity="0.6" />
          <ellipse cx="57.5" cy="39" rx="2.7" ry="4.2" fill="#c89570" />
          <ellipse cx="57.6" cy="39.4" rx="1.3" ry="2.6" fill="#8a5d3a" opacity="0.6" />
          {/* Hoop earrings — silver with highlight */}
          <ellipse cx="22.2" cy="43" rx="1.4" ry="0.7" fill="none" stroke="#dfe5ee" strokeWidth="0.55" />
          <ellipse cx="22.2" cy="43" rx="1.4" ry="0.7" fill="none" stroke="#ffffff" strokeWidth="0.25" opacity="0.7" strokeDasharray="0.6 2" />
          <ellipse cx="57.8" cy="43" rx="1.4" ry="0.7" fill="none" stroke="#dfe5ee" strokeWidth="0.55" />
          <ellipse cx="57.8" cy="43" rx="1.4" ry="0.7" fill="none" stroke="#ffffff" strokeWidth="0.25" opacity="0.7" strokeDasharray="0.6 2" />

          {/* ─────────── Head ─────────── */}
          <ellipse cx="40" cy="37" rx="17.5" ry="21" fill="url(#fk-skin)" />

          {/* Form lighting: highlight upper-left, shadow lower-right */}
          <ellipse cx="32" cy="32" rx="6" ry="8" fill="#f0c89a" opacity="0.32" />
          <ellipse cx="49" cy="44" rx="7.5" ry="8" fill="#8e5a32" opacity="0.18" />
          {/* Forehead highlight */}
          <ellipse cx="38" cy="26" rx="6" ry="3" fill="#f0c89a" opacity="0.35" />
          {/* Nose-bridge highlight */}
          <ellipse cx="40" cy="39" rx="1" ry="3.5" fill="#f0c89a" opacity="0.35" />

          {/* ─────────── Beard (cheek + jaw + chin + mustache) ─────────── */}
          {/* Main mass with sculpted upper edge that hugs the cheekbones */}
          <path
            d="M 23 39
               Q 23 50 26 55
               Q 31 60 40 60.5
               Q 49 60 54 55
               Q 57 50 57 39
               Q 56.5 41.5 54 42.5
               Q 51.5 43.5 49.5 43.8
               L 49.5 47
               Q 47 47.5 40 47.5
               Q 33 47.5 30.5 47
               L 30.5 43.8
               Q 28.5 43.5 26 42.5
               Q 23.5 41.5 23 39 Z"
            fill="url(#fk-beard)"
          />
          {/* Mustache strip — slightly thicker than the cheek beard band */}
          <path
            d="M 30 47.2
               Q 33 46.3 36 46.4
               Q 38 46.6 40 46.6
               Q 42 46.6 44 46.4
               Q 47 46.3 50 47.2
               L 50 49.4
               Q 46 48.9 40 48.9
               Q 34 48.9 30 49.4 Z"
            fill="url(#fk-beard)"
          />
          {/* Beard highlight wash on top edge — gives the mass dimension */}
          <path
            d="M 24 40
               Q 27 43 30.5 43.8
               L 30.5 45
               Q 27 44.2 24 41.5 Z"
            fill="#3a2418"
            opacity="0.5"
          />
          <path
            d="M 56 40
               Q 53 43 49.5 43.8
               L 49.5 45
               Q 53 44.2 56 41.5 Z"
            fill="#3a2418"
            opacity="0.5"
          />
          {/* Beard texture — short hair strokes following face contour */}
          <g stroke="#5a3a22" strokeWidth="0.35" strokeLinecap="round" opacity="0.55" fill="none">
            <path d="M 28 50 L 28.5 52" />
            <path d="M 30 52 L 30.4 54" />
            <path d="M 32 54 L 32.4 56" />
            <path d="M 34 55.5 L 34.3 57.5" />
            <path d="M 36 57 L 36.2 58.8" />
            <path d="M 40 58 L 40 59.6" />
            <path d="M 44 57 L 43.8 58.8" />
            <path d="M 46 55.5 L 45.7 57.5" />
            <path d="M 48 54 L 47.6 56" />
            <path d="M 50 52 L 49.6 54" />
            <path d="M 52 50 L 51.5 52" />
          </g>
          {/* Sparse stubble dots for grain */}
          <g fill="#5a3a22" opacity="0.5">
            <circle cx="29" cy="51" r="0.22" />
            <circle cx="33" cy="56" r="0.22" />
            <circle cx="37" cy="58" r="0.22" />
            <circle cx="40" cy="59" r="0.22" />
            <circle cx="43" cy="58" r="0.22" />
            <circle cx="47" cy="56" r="0.22" />
            <circle cx="51" cy="51" r="0.22" />
          </g>

          {/* Lower lip peeking through beard */}
          <path
            d="M 36.5 51 Q 40 52.4 43.5 51"
            stroke="#5a2a18"
            strokeWidth="0.7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 37.5 51.4 Q 40 52.2 42.5 51.4"
            stroke="#c8745a"
            strokeWidth="0.55"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* Subtle nose form */}
          <path
            d="M 40 41 Q 38.4 44 37.2 45.5"
            stroke="#8a5d3a"
            strokeWidth="0.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          />
          <ellipse cx="38.4" cy="45.6" rx="0.7" ry="0.35" fill="#8a5d3a" opacity="0.5" />
          <ellipse cx="41.6" cy="45.6" rx="0.7" ry="0.35" fill="#8a5d3a" opacity="0.5" />

          {/* ─────────── Buzzcut hair ─────────── */}
          {/* Cap shape that follows the head silhouette closely */}
          <path
            d="M 24 28
               Q 24.4 16 40 14.8
               Q 55.6 16 56 28
               Q 56 31 54 31.4
               L 26 31.4
               Q 24 31 24 28 Z"
            fill="url(#fk-hair)"
          />
          {/* Sideburns coming down past temples */}
          <path d="M 24 28 L 24 36.5 Q 24 38.5 25.7 38.5 L 26.5 38.5 L 26.5 28 Z" fill="url(#fk-hair)" />
          <path d="M 56 28 L 56 36.5 Q 56 38.5 54.3 38.5 L 53.5 38.5 L 53.5 28 Z" fill="url(#fk-hair)" />
          {/* Hairline shadow on forehead */}
          <path
            d="M 25 31 Q 40 30.5 55 31 L 55 32.2 Q 40 31.7 25 32.2 Z"
            fill="#000000"
            opacity="0.18"
          />
          {/* Buzzcut stubble texture across scalp — fine dots */}
          <g fill="#3a2418" opacity="0.4">
            <circle cx="29" cy="22" r="0.3" />
            <circle cx="33" cy="20" r="0.3" />
            <circle cx="37" cy="18.5" r="0.3" />
            <circle cx="40" cy="17.8" r="0.3" />
            <circle cx="43" cy="18.5" r="0.3" />
            <circle cx="47" cy="20" r="0.3" />
            <circle cx="51" cy="22" r="0.3" />
            <circle cx="31" cy="25" r="0.28" />
            <circle cx="35" cy="23" r="0.28" />
            <circle cx="45" cy="23" r="0.28" />
            <circle cx="49" cy="25" r="0.28" />
            <circle cx="34" cy="27" r="0.26" />
            <circle cx="40" cy="20.5" r="0.26" />
            <circle cx="46" cy="27" r="0.26" />
          </g>
          {/* Highlight along the top of the buzzcut */}
          <path
            d="M 28 18 Q 40 14 52 18"
            stroke="#3d2a1c"
            strokeWidth="0.6"
            fill="none"
            opacity="0.7"
          />

          {/* ─────────── Eyebrows ─────────── */}
          <path
            d="M 27.5 32.5 Q 31.5 31 36 32.5"
            stroke="#1c130b"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 44 32.5 Q 48.5 31 52.5 32.5"
            stroke="#1c130b"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Brow texture (a few finer hairs on top) */}
          <g stroke="#3a2418" strokeWidth="0.3" strokeLinecap="round" opacity="0.6">
            <path d="M 28.5 32 L 30 31.4" />
            <path d="M 31 31.5 L 32.5 31" />
            <path d="M 34 31.5 L 35.5 32" />
            <path d="M 44.5 32 L 46 31.4" />
            <path d="M 47 31.5 L 48.5 31" />
            <path d="M 50.5 31.5 L 52 32" />
          </g>

          {/* ─────────── Glasses (translucent rectangular) ─────────── */}
          {/* Subtle frame shadow on cheeks */}
          <ellipse cx="31.5" cy="44.4" rx="5.5" ry="0.7" fill="#000000" opacity="0.08" />
          <ellipse cx="48.5" cy="44.4" rx="5.5" ry="0.7" fill="#000000" opacity="0.08" />
          {/* Temples */}
          <line x1="25.7" y1="36.7" x2="22" y2="37.4" stroke="#a89074" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="54.3" y1="36.7" x2="58" y2="37.4" stroke="#a89074" strokeWidth="1.1" strokeLinecap="round" />
          {/* Bridge */}
          <line x1="36.7" y1="37.6" x2="43.3" y2="37.6" stroke="#a89074" strokeWidth="1.4" strokeLinecap="round" />
          {/* Lens fills (subtle cool sheen, then frame) */}
          <rect x="25.6" y="33.4" width="11.2" height="9.2" rx="2.2" fill="url(#fk-lens)" />
          <rect x="43.2" y="33.4" width="11.2" height="9.2" rx="2.2" fill="url(#fk-lens)" />
          <rect x="25.6" y="33.4" width="11.2" height="9.2" rx="2.2" fill="none" stroke="#a89074" strokeWidth="1.4" />
          <rect x="43.2" y="33.4" width="11.2" height="9.2" rx="2.2" fill="none" stroke="#a89074" strokeWidth="1.4" />
          {/* Crisp diagonal sheen on each lens */}
          <path d="M 27.4 35 L 31.4 39" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" opacity="0.55" />
          <path d="M 29 34.4 L 30.6 36" stroke="#ffffff" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
          <path d="M 45 35 L 49 39" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" opacity="0.55" />
          <path d="M 46.6 34.4 L 48.2 36" stroke="#ffffff" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />

          {/* ─────────── Eyes (warm dark brown, almond) ─────────── */}
          {/* Eye whites for definition */}
          <ellipse cx="31" cy="39" rx="2.1" ry="1.3" fill="#fbf3ea" />
          <ellipse cx="49" cy="39" rx="2.1" ry="1.3" fill="#fbf3ea" />
          {/* Iris */}
          <circle cx="31" cy="39" r="1.15" fill="#3a1f10" />
          <circle cx="49" cy="39" r="1.15" fill="#3a1f10" />
          {/* Pupil */}
          <circle cx="31" cy="39" r="0.5" fill="#0c0703" />
          <circle cx="49" cy="39" r="0.5" fill="#0c0703" />
          {/* Catchlight */}
          <circle cx="30.7" cy="38.7" r="0.4" fill="#ffffff" opacity="0.95" />
          <circle cx="48.7" cy="38.7" r="0.4" fill="#ffffff" opacity="0.95" />
          {/* Lower lash line subtle */}
          <path d="M 29.2 39.7 Q 31 40.1 32.8 39.7" stroke="#1c130b" strokeWidth="0.35" fill="none" opacity="0.7" />
          <path d="M 47.2 39.7 Q 49 40.1 50.8 39.7" stroke="#1c130b" strokeWidth="0.35" fill="none" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

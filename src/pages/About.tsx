import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Linkedin, X, BookOpen } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  PageFrame,
  PageHero,
  Section,
  Prose,
  CloseBlock,
  PillLink,
  CONTACT_LABEL,
  contactHref,
} from "@/components/page/Kit";

/**
 * About is the founding story, told by the founder, and nothing else.
 *
 * It used to open on category positioning ("an engineer, not an autocomplete")
 * and a beliefs list, which is the marketing site's job and the marketing site
 * does it better. What only THIS page can say is why min. exists: Eric was the
 * only one who could code, so Eric was the queue. The beliefs section went;
 * anything it said that mattered is one clause in the story now.
 *
 * Voice: the rest of the site speaks as min. This page deliberately does not.
 * A founding story told by the product about its own founders would be absurd,
 * so the "I" here is Eric.
 *
 * The two team portraits stay, including Fadi's hand drawn one. They are the
 * only real artwork on the site, and a person with a face and links is
 * genuinely a discrete object.
 */

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About min.",
    description:
      "Why min. exists: our founder was the only engineer on the team, so every bug and feature waited on him. min. is the AI engineer that lets everyone start the work, while engineers review and merge.",
    url: "https://getmin.ai/about",
    mainEntity: {
      "@type": "Organization",
      name: "min.",
      founder: { "@type": "Person", name: "Eric Wang", jobTitle: "CEO & Co-Founder" },
    },
  };

  return (
    <>
      <Helmet>
        <title>About min. | I was the bottleneck</title>
        <meta
          name="description"
          content="I was the only one who could code, so every bug and feature waited on me. We built min. so anyone on the team can start the work. We ship twice as fast now."
        />
        <link rel="canonical" href="https://getmin.ai/about/" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <PageFrame>
        <PageHero
          title="I was the bottleneck."
          lede="min. exists because of a problem we kept running into building our own products. Here is the whole story."
        />

        <Section title="The story.">
          <Prose>
            <p>
              I was the only one on the team who could code. So every bug,
              every feature request, every "can we just" ended in my queue. My
              teammates could see exactly what needed fixing, and all they
              could do was wait for me.
            </p>
            <p>
              So we built min.: an AI engineer anyone on the team can hand
              work to. Support files the bug, product describes the feature,
              min. writes the code, and I review the PR.
            </p>
            <p>
              The results were immediate. We ship twice as fast, and the
              product is built by the whole team instead of being the burden
              of whoever can code. The technical people architect and conduct
              now. min. does the grunt work.
            </p>
          </Prose>
        </Section>

        <Section title="Who builds it." wide>
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            <Person
              name="Eric Wang"
              role="CEO"
              bio="Previously shipped product at Coursera, Bbot, and DoorDash. Now building min., so the agent writing your code actually knows the codebase it is writing in."
              avatar={
                <Avatar className="h-14 w-14 shrink-0 border border-hair">
                  <AvatarImage
                    src="/lovable-uploads/a08e6a56-3aaf-4f91-b83a-909a4d24b497.png"
                    alt="Eric Wang"
                  />
                  <AvatarFallback className="bg-surface text-quiet">EW</AvatarFallback>
                </Avatar>
              }
              socials={[
                { Icon: Linkedin, href: "https://www.linkedin.com/in/zizhouwang/", label: "Eric Wang on LinkedIn" },
                { Icon: X, href: "https://x.com/ericzizhouwangx", label: "Eric Wang on X" },
                { Icon: BookOpen, href: "https://ericzizhouw.substack.com/", label: "Eric Wang on Substack" },
              ]}
            />
            <Person
              name="Fadi Kanaan"
              role="Head of Operations"
              bio="Built partner channels at ClickLearn, Librestream, and ExpandIT. Now getting min. into the hands of the engineering teams who would rather review a pull request than open one."
              avatar={<FadiAvatar />}
              socials={[
                { Icon: Linkedin, href: "https://www.linkedin.com/in/fadi-kanaan-268574155/", label: "Fadi Kanaan on LinkedIn" },
              ]}
            />
          </div>
        </Section>

        <CloseBlock title="Stop being the bottleneck.">
          <div className="flex flex-wrap items-center gap-3">
            <PillLink href="https://app.getmin.ai">Put me to work</PillLink>
            <PillLink href={contactHref("Hello")} tone="quiet">
              {CONTACT_LABEL}
            </PillLink>
          </div>
        </CloseBlock>
      </PageFrame>
    </>
  );
}

function Person({
  name,
  role,
  bio,
  avatar,
  socials = [],
}: {
  name: string;
  role: string;
  bio: string;
  avatar: React.ReactNode;
  socials?: { Icon: React.ElementType; href: string; label: string }[];
}) {
  return (
    <div className="flex items-start gap-4">
      {avatar}
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-[15.5px] font-semibold tracking-[-0.01em] text-ink">
            {name}
          </h3>
          <span className="text-[12.5px] text-quiet">{role}</span>
          <span className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-quiet transition-colors hover:text-ink"
              >
                <s.Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              </a>
            ))}
          </span>
        </div>
        <p className="mt-2 text-[14.5px] leading-[1.7] text-quiet [text-wrap:pretty]">
          {bio}
        </p>
      </div>
    </div>
  );
}

function FadiAvatar() {
  return (
    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-hair bg-surface">
      <svg
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
        aria-label="Fadi Kanaan portrait"
      >
        <defs>
          {/* Background: same vibrant sky-blue as Eric */}
          <radialGradient id="fk-bg" cx="0.5" cy="0.42" r="0.62">
            <stop offset="0%" stopColor="#6dcdf0" />
            <stop offset="100%" stopColor="#33a4cf" />
          </radialGradient>

          {/* Skin: warm olive with subtle vertical falloff */}
          <linearGradient id="fk-skin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dfa985" />
            <stop offset="60%" stopColor="#c89570" />
            <stop offset="100%" stopColor="#a87555" />
          </linearGradient>

          {/* Beard: warm-black with brown undertone */}
          <linearGradient id="fk-beard" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a1a10" />
            <stop offset="100%" stopColor="#0e0804" />
          </linearGradient>

          {/* Hair: slightly cooler than beard so they read as separate */}
          <linearGradient id="fk-hair" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c130b" />
            <stop offset="100%" stopColor="#0c0703" />
          </linearGradient>

          {/* Polo: denim/slate blue */}
          <linearGradient id="fk-polo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6383a4" />
            <stop offset="100%" stopColor="#385876" />
          </linearGradient>

          {/* Glasses lens: very subtle cool tint with sheen */}
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
          {/* Collar: proper turn-down shape, with deeper inner panel for depth */}
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
          {/* Hoop earrings: silver with highlight */}
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
          {/* Mustache strip: slightly thicker than the cheek beard band */}
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
          {/* Beard highlight wash on top edge: gives the mass dimension */}
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
          {/* Beard texture: short hair strokes following face contour */}
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
          {/* Buzzcut stubble texture across scalp: fine dots */}
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

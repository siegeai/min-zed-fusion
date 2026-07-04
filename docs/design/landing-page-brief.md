# min. Landing Page: Full Build Guide

> Positioning pivot (2026-07): min. is **relationship memory** for small teams
> that don't need a CRM. The **relationship capsule** is the artifact the whole
> page orbits. Note: the founder chose to keep the marketing site's existing
> **light** aesthetic rather than the dark UI this brief originally specified.
> All other rules below still apply.

## 1. Positioning (the one thing to get right)

**min. is RELATIONSHIP MEMORY for small teams that don't need a CRM, and the RELATIONSHIP CAPSULE is the artifact.** CRMs are built for sales teams running pipelines. min. is built for small teams whose work is building relationships. Every person you work with gets a capsule: a live memory of every call and email between you, built with zero manual work, that you can merge and share with your teammates. The whole page orbits the capsule the way a docs product orbits the document.

- Position AGAINST the CRM explicitly. Naming "CRM" as the thing we are not is encouraged. Forbidden is describing min. itself in CRM vocabulary (pipeline, leads, deals, stages, contacts, tags).
- The unit is the RELATIONSHIP: a living, two-sided artifact between you and a person or company.
- Email and meetings are incidental data sources. MEMORY is the product; the capsule is where you hold it.

## 2. Audience

Small teams whose work IS relationships, not pipelines: founders and founding teams, agencies and consultancies, boutique firms (recruiting, ventures, biz dev). Explicitly NOT sales orgs with a revenue stack.

## 3. Voice and copy rules (hard rules)

- Never describe min. in CRM vocabulary (contacts, leads, pipeline, deals, stages, tags). Say: relationship, capsule, your network, memory. Naming "CRM" as the category we replace is encouraged.
- **No em dashes or en dashes** in user-facing copy. Commas or periods.
- Concrete beats abstract. Real-shaped examples over "actionable insights".
- Plain, confident, terse. No exclamation marks. Banned words: supercharge, unlock, seamless, revolutionize, 10x, game-changing, AI-powered as a headline.
- Brand is lowercase "min." with the period, always.
- Pre-auth visitors don't know what "your network" means. Any mention must spell out that min. builds it automatically from the email and meetings they already have.

## 4. Design system (light variant, as shipped)

- Background `#FAFAF9`; white raised cards; subtle gray-100 borders.
- Text `text-gray-900` primary, `text-gray-500/600` secondary. Body line height ~1.6.
- Accent: one green (emerald) used sparingly for the "your eyes only" badge, status dots, privacy. Primary CTA = black pill (site convention). No decorative gradients, no purple.
- Type: Inter body, Space Grotesk display. H1 56-64px desktop, tight tracking.
- Shape: rounded 12-16px cards, pill buttons and chips.
- Motion: fade-and-rise on scroll (once). Constellation may drift slowly. Nothing bounces.

## 5. Page structure

Nav, Hero, Problem strip, The capsule up close (centerpiece), How it works, Merge and share, The rest of the surface (Feed / Constellation / Prep), Privacy, Final CTA, Footer. See section-by-section copy in the source brief.

## 6. What NOT to build

No pricing section, no testimonials/logos we don't have, no fake scarcity, no pipeline dashboards or quota language, no integration wall beyond email + meetings, don't pitch the meeting bot as the product.

## 7. Assets

All demo data. Never real names, companies, or dollar figures. Priority visuals: (1) person capsule with History + your-eyes-only Insights, (2) Share Memory dialog, (3) Feed, (4) constellation, (5) a prep-style chat answer.

## 8. Tech

One static page (this Vite/React marketing site). CTAs link to `https://app.getmin.ai`. Budget: keep JS lean, lazy-load below-fold, self-host/`swap` fonts. Responsive: single column under 768px; capsule legible at 375px (crop to History + Insights). Meta title `min. | Relationship memory for small teams`.

## 9. QA checklist

- [ ] Zero em/en dashes in visible copy.
- [ ] Zero banned words (contacts, leads, pipeline, deals, supercharge, unlock, seamless, 10x); CRM allowed only in we-are-not-a-CRM lines.
- [ ] Every visual is demo data.
- [ ] "min." lowercase with the period everywhere.
- [ ] Capsule is above the fold and the largest visual on the page.
- [ ] CTA lands on the real sign-in flow.
- [ ] Reads at 375px, 768px, 1440px; contrast passes AA.

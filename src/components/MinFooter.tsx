import { Link } from "react-router-dom";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "How min. works", to: "/#loop" },
      { label: "All your repos", to: "/#repos" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "About Us", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Security", to: "/security" },
    ],
  },
];

export default function MinFooter() {
  return (
    <footer className="border-t border-hair bg-surface mt-auto">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 md:gap-8">
          <div>
            <Link
              to="/"
              className="inline-block font-display text-xl font-semibold tracking-tight text-ink mb-4"
            >
              min.
            </Link>
            <p className="text-quiet text-sm leading-relaxed max-w-xs">
                An AI engineer that knows your codebase and turns a request
                  into a pull request your team reviews. Available to everyone,
                  not just whoever has the editor open.
              </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-ink text-sm font-semibold mb-4">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-quiet text-sm hover:text-ink transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-hair flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-quiet/70 text-xs">
            2026. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://x.com/getminai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-quiet/70 hover:text-ink text-xs transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/company/min-box"
              target="_blank"
              rel="noopener noreferrer"
              className="text-quiet/70 hover:text-ink text-xs transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

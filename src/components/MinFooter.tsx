import { Link } from "react-router-dom";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "The capsule", to: "/#capsule" },
      { label: "How it works", to: "/#how" },
      { label: "Merge and share", to: "/#share" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
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
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 md:gap-8">
          <div>
            <Link
              to="/"
              className="inline-block font-display text-xl font-semibold tracking-tight text-gray-900 mb-4"
            >
              min.
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Your relationship assistant with perfect recall. min. remembers
              every person, company, and group you work with, so you show up for
              people the way you always meant to.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-gray-900 text-sm font-semibold mb-4">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-gray-500 text-sm hover:text-black transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} min., Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://x.com/getminai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-black text-xs transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/company/min-box"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-black text-xs transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

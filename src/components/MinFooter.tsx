import { Link } from "react-router-dom";

const COLUMNS = [
  {
    heading: "Platform",
    links: [
      { label: "Quoting", to: "/#quoting" },
      { label: "Capacity Sourcing", to: "/#capacity" },
      { label: "Carrier Network", to: "/#network" },
      { label: "Email Ingestion", to: "/#network" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
      { label: "Blog", to: "/" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Security Details", to: "/security" },
    ],
  },
];

export default function MinFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] pt-20 pb-10 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 md:gap-8">
          <div>
            <Link
              to="/"
              className="inline-block text-white text-xl font-semibold tracking-tight mb-4"
            >
              min.
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              The quoting and capacity engine for freight brokers. Source coverage from your private network in seconds, blast RFQs in one sentence, and watch your network compound with every booking.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-white text-sm font-medium mb-4">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-slate-400 text-sm hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © 2026 min. Logistics AI, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://x.com/getminai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="min. on X"
              className="text-slate-400 hover:text-white text-xs"
            >
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/company/min-box"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="min. on LinkedIn"
              className="text-slate-400 hover:text-white text-xs"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

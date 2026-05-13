import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Platform", to: "/#platform" },
  { label: "Pricing", to: "/pricing" },
  { label: "Security", to: "/security" },
  { label: "Company", to: "/about" },
  { label: "Careers", to: "/careers" },
];

export default function PillNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav
        className={[
          "fixed top-4 md:top-6 left-1/2 -translate-x-1/2",
          "w-[calc(100%-2rem)] max-w-6xl z-50",
          "rounded-full transition-all duration-300",
          scrolled
            ? "bg-black/60 backdrop-blur-xl border border-white/10 py-3 px-5"
            : "bg-transparent border border-transparent py-4 px-6",
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-6">
          <Link
            to="/"
            className="text-white text-lg font-semibold tracking-tight"
            aria-label="min. home"
          >
            min.
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-[13px] font-medium text-slate-300 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://app.getmin.ai"
              className="text-[13px] font-medium text-slate-300 hover:text-white transition-colors"
            >
              Log in
            </a>
            <a
              href="mailto:hello@getmin.ai?subject=Demo%20Request"
              className="rounded-full bg-slate-50 text-black text-[13px] font-medium px-4 py-2 hover:bg-slate-200 transition-colors"
            >
              Book Demo
            </a>
          </div>

          <button
            className="md:hidden text-white p-1"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 top-[68px] z-40 md:hidden bg-black/95 backdrop-blur-xl px-6 pt-8 pb-12">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-slate-200 border-b border-white/5"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <a
              href="https://app.getmin.ai"
              className="rounded-full border border-white/15 text-slate-200 text-sm font-medium py-3 text-center"
            >
              Log in
            </a>
            <a
              href="mailto:hello@getmin.ai?subject=Demo%20Request"
              className="rounded-full bg-slate-50 text-black text-sm font-medium py-3 text-center"
            >
              Book Demo
            </a>
          </div>
        </div>
      )}
    </>
  );
}

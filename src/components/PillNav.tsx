import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { getDownloadTarget } from "@/lib/download";

const NAV_LINKS = [
  { label: "Living capsule", to: "/#capsule" },
  { label: "Wins", to: "/#win" },
  { label: "How it works", to: "/#how" },
  { label: "Pricing", to: "/pricing" },
  { label: "Security", to: "/security" },
];

export default function PillNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none"
      >
        <div className="bg-white/80 backdrop-blur-md border border-gray-200/60 rounded-full pl-5 pr-3 py-2.5 flex items-center justify-between w-full max-w-5xl shadow-sm pointer-events-auto">
          <Link
            to="/"
            className="font-display font-semibold text-xl tracking-tight text-gray-900"
            aria-label="min. home"
          >
            min.
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-gray-500">
            {NAV_LINKS.map((l) => (
              <Link key={l.label} to={l.to} className="whitespace-nowrap hover:text-black transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <a
              href="https://app.getmin.ai"
              className="whitespace-nowrap text-sm font-medium text-gray-500 hover:text-black transition-colors px-3 py-2"
            >
              Sign in
            </a>
            <a
              href={getDownloadTarget().href}
              className="whitespace-nowrap bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              {getDownloadTarget().label}
            </a>
          </div>

          <button
            className="lg:hidden text-gray-900 p-1"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {open && (
        <div className="fixed inset-0 top-[72px] z-40 lg:hidden bg-[#FAFAF9]/97 backdrop-blur-xl px-6 pt-8 pb-12">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-gray-700 border-b border-gray-200/70"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <a
              href="https://app.getmin.ai"
              className="rounded-full border border-gray-200 text-gray-700 text-sm font-medium py-3 text-center"
            >
              Sign in
            </a>
            <a
              href={getDownloadTarget().href}
              className="rounded-full bg-black text-white text-sm font-medium py-3 text-center"
            >
              {getDownloadTarget().label}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

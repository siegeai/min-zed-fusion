import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const NAV_LINK_STYLE: React.CSSProperties = { color: "#6B7280" };
const NAV_LINK_HOVER = "#F9FAFB";

const FEATURES_ITEMS = [
  { label: "All Features", to: "/features" },
  { label: "Automatic Follow-Ups", to: "/features/follow-ups" },
  { label: "Alerts", to: "/features/alerts" },
  { label: "Smart Contacts", to: "/features/contacts" },
  { label: "Task Tracking", to: "/features/tasks" },
  { label: "Email Power", to: "/features/email" },
  { label: "Custom Instructions", to: "/features/instructions" },
];

const SOLUTIONS_ITEMS = [
  { label: "Brokers", to: "/brokers" },
  { label: "Shippers", to: "/shippers" },
  { label: "3PLs", to: "/3pl" },
];

function Dropdown({
  label,
  items,
  separateFirst = false,
}: {
  label: string;
  items: { label: string; to: string }[];
  separateFirst?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-sm font-normal transition-colors duration-200 flex items-center gap-1"
        style={{ ...NAV_LINK_STYLE, background: "none", border: "none", cursor: "pointer", padding: 0 }}
        onMouseEnter={(e) => (e.currentTarget.style.color = NAV_LINK_HOVER)}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.color = "#6B7280"; }}
      >
        {label}
        <ChevronDown style={{ width: 14, height: 14, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }} />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(30,38,48,0.98)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: "8px 0",
            minWidth: 200,
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            zIndex: 200,
          }}
        >
          {items.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block text-sm transition-colors duration-150"
              style={{
                padding: "8px 16px",
                color: separateFirst && i === 0 ? "#F9FAFB" : "#9CA3AF",
                fontWeight: separateFirst && i === 0 ? 500 : 400,
                textDecoration: "none",
                borderBottom: separateFirst && i === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#F9FAFB";
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = separateFirst && i === 0 ? "#F9FAFB" : "#9CA3AF";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const Header = () => {
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "rgba(22,28,36,0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
      className="w-full px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="font-semibold text-xl transition-colors duration-200"
            style={{ color: "#F9FAFB" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00AB55")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#F9FAFB")}
            onClick={handleLogoClick}
          >
            min.
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Dropdown label="Solutions" items={SOLUTIONS_ITEMS} />
            <Dropdown label="Features" items={FEATURES_ITEMS} separateFirst />
            <Link
              to="/contact"
              className="text-sm font-normal transition-colors duration-200"
              style={NAV_LINK_STYLE}
              onMouseEnter={(e) => (e.currentTarget.style.color = NAV_LINK_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >
              Contact Us
            </Link>
            <Link
              to="/careers"
              className="text-sm font-normal transition-colors duration-200"
              style={NAV_LINK_STYLE}
              onMouseEnter={(e) => (e.currentTarget.style.color = NAV_LINK_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >
              Careers
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            className="font-normal text-sm transition-colors duration-200"
            style={{ color: "#9CA3AF" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F9FAFB")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
            asChild
          >
            <a href="https://app.getmin.ai">Log in</a>
          </Button>
          <a href="https://app.getmin.ai/">
            <Button
              className="cta-glow font-normal text-sm text-white rounded-lg"
              style={{
                backgroundColor: "#00AB55",
                border: "none",
                padding: "8px 18px",
              }}
            >
              Try for free
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

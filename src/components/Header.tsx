import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

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

const TEAMS_ITEMS = [
  { label: "Operations", to: "/teams/operations" },
  { label: "Sales", to: "/teams/sales" },
  { label: "Project Management", to: "/teams/project-management" },
];

const INDUSTRIES_ITEMS = [
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

const MOBILE_SECTIONS = [
  { heading: "Industries", items: INDUSTRIES_ITEMS },
  { heading: "Teams", items: TEAMS_ITEMS },
  { heading: "Features", items: FEATURES_ITEMS },
];

const MOBILE_LINKS = [
  { label: "Contact Us", to: "/contact" },
  { label: "Careers", to: "/careers" },
];

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
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
              <Dropdown label="Teams" items={TEAMS_ITEMS} />
              <Dropdown label="Industries" items={INDUSTRIES_ITEMS} />
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
              className="hidden md:inline-flex font-normal text-sm transition-colors duration-200"
              style={{ color: "#9CA3AF" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F9FAFB")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
              asChild
            >
              <a href="https://app.getmin.ai">Log in</a>
            </Button>
            <a href="https://app.getmin.ai/" className="hidden md:inline-flex">
              <Button
                className="cta-glow font-normal text-sm text-white rounded-lg"
                style={{ backgroundColor: "#00AB55", border: "none", padding: "8px 18px" }}
              >
                Try for free
              </Button>
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center"
              onClick={() => setMobileOpen((o) => !o)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#9CA3AF", padding: 4,
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 65,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99,
            backgroundColor: "rgba(22,28,36,0.98)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            overflowY: "auto",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ padding: "24px 24px 40px" }}>
            {MOBILE_SECTIONS.map((section) => (
              <div key={section.heading} style={{ marginBottom: 28 }}>
                <p style={{
                  color: "#4B5563", fontSize: 11, fontWeight: 600,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  marginBottom: 10,
                }}>
                  {section.heading}
                </p>
                {section.items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    style={{
                      display: "block", color: "#D1D5DB", fontSize: 16,
                      fontWeight: 400, textDecoration: "none",
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}

            <div style={{ marginBottom: 32 }}>
              {MOBILE_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    display: "block", color: "#D1D5DB", fontSize: 16,
                    fontWeight: 400, textDecoration: "none",
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="https://app.getmin.ai/" style={{ display: "block" }}>
                <Button
                  className="cta-glow font-normal text-white w-full"
                  style={{ backgroundColor: "#00AB55", border: "none", fontSize: 15, padding: "12px 0" }}
                >
                  Try for free
                </Button>
              </a>
              <a href="https://app.getmin.ai" style={{ display: "block" }}>
                <Button
                  variant="ghost"
                  className="font-normal w-full"
                  style={{ color: "#9CA3AF", fontSize: 15, padding: "12px 0" }}
                >
                  Log in
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

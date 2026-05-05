import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_LINK_STYLE: React.CSSProperties = { color: "#6B7280" };
const NAV_LINK_HOVER = "#F9FAFB";

const MOBILE_LINKS = [
  { label: "Platform", to: "/" },
  { label: "Security", to: "/security" },
  { label: "Company", to: "/about" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
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
              <Link
                to="/security"
                className="text-sm font-normal transition-colors duration-200"
                style={NAV_LINK_STYLE}
                onMouseEnter={(e) => (e.currentTarget.style.color = NAV_LINK_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
              >
                Security
              </Link>
              <Link
                to="/about"
                className="text-sm font-normal transition-colors duration-200"
                style={NAV_LINK_STYLE}
                onMouseEnter={(e) => (e.currentTarget.style.color = NAV_LINK_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
              >
                Company
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
              <Link
                to="/contact"
                className="text-sm font-normal transition-colors duration-200"
                style={NAV_LINK_STYLE}
                onMouseEnter={(e) => (e.currentTarget.style.color = NAV_LINK_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <a href="mailto:hello@getmin.ai?subject=Demo%20Request" className="hidden md:inline-flex">
              <Button
                variant="outline"
                className="font-normal text-sm rounded-lg"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "#D1D5DB", background: "transparent", padding: "6px 14px" }}
              >
                Book a demo
              </Button>
            </a>
            <a href="https://app.getmin.ai/" className="hidden md:inline-flex">
              <Button
                className="cta-glow font-normal text-sm text-white rounded-lg"
                style={{ backgroundColor: "#00AB55", border: "none", padding: "6px 14px" }}
              >
                Get early access
              </Button>
            </a>
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
                  Get early access
                </Button>
              </a>
              <a href="mailto:hello@getmin.ai?subject=Demo%20Request" style={{ display: "block" }}>
                <Button
                  variant="outline"
                  className="font-normal w-full"
                  style={{ borderColor: "rgba(255,255,255,0.15)", color: "#D1D5DB", background: "transparent", fontSize: 15, padding: "12px 0" }}
                >
                  Book a demo
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

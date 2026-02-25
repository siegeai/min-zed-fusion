import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

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
            <Link
              to="/contact"
              className="text-sm font-normal transition-colors duration-200"
              style={{ color: "#6B7280" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F9FAFB")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >
              Contact Us
            </Link>
            <Link
              to="/careers"
              className="text-sm font-normal transition-colors duration-200"
              style={{ color: "#6B7280" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F9FAFB")}
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
              Get started free
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

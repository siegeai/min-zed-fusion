import { Link } from "react-router-dom";
import { DIM, BORDER } from "@/components/LandingShared";

const TrustBadges = () => (
  <div
    style={{
      position: "fixed",
      bottom: 16,
      right: 16,
      zIndex: 40,
      display: "flex",
      alignItems: "center",
      gap: 14,
      background: "rgba(22,28,36,0.85)",
      backdropFilter: "blur(8px)",
      border: `1px solid ${BORDER}`,
      borderRadius: 8,
      padding: "6px 12px",
      opacity: 0.6,
      transition: "opacity 0.3s",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
    onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.6"; }}
  >
    <Link
      to="/security"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        textDecoration: "none",
      }}
    >
      <svg width="13" height="13" viewBox="0 0 23 23" fill="none">
        <rect x="1" y="1" width="10" height="10" fill="#f25022" />
        <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
        <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
        <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
      </svg>
      <span style={{ color: DIM, fontSize: 10, fontWeight: 500 }}>Microsoft Partner</span>
    </Link>

    <span style={{ width: 1, height: 12, background: BORDER }} />

    <Link
      to="/security"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        textDecoration: "none",
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09A6.97 6.97 0 0 1 5.47 12c0-.72.13-1.43.37-2.09V7.07H2.18A11.96 11.96 0 0 0 .95 12c0 1.94.46 3.77 1.23 5.07l3.66-2.98z" fill="#FBBC05" />
        <path d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.07l3.66 2.84c.87-2.6 3.3-4.16 6.16-4.16z" fill="#EA4335" />
      </svg>
      <span style={{ color: DIM, fontSize: 10, fontWeight: 500 }}>Google CASA Tier 2</span>
    </Link>
  </div>
);

export default TrustBadges;

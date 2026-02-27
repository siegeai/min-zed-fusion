import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import MiniMascot from "@/components/MiniMascot";
import Footer from "@/components/Footer";
import {
  BG, GREEN, TEXT, MUTED, DIM,
  Section, FinalCTA,
} from "@/components/LandingShared";

interface FeaturePageLayoutProps {
  title: string;
  metaDescription: string;
  canonicalPath: string;
  eyebrow: string;
  headline: React.ReactNode;
  subline: string;
  mascotSeed: string;
  children: React.ReactNode;
}

const FeaturePageLayout = ({
  title,
  metaDescription,
  canonicalPath,
  eyebrow,
  headline,
  subline,
  mascotSeed,
  children,
}: FeaturePageLayoutProps) => (
  <>
    <Helmet>
      <title>{title} | min.</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={`https://getmin.ai${canonicalPath}`} />
      <meta property="og:title" content={`${title} | min.`} />
      <meta property="og:description" content={metaDescription} />
    </Helmet>

    <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT, overflowX: "hidden" }}>
      <Header />

      <main style={{ paddingTop: 100 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

          <div style={{ paddingTop: 48, marginBottom: 80 }}>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              <Link to="/features" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: DIM, fontSize: 13, textDecoration: "none", marginBottom: 32, transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = TEXT)} onMouseLeave={(e) => (e.currentTarget.style.color = DIM)}>
                <ArrowLeft style={{ width: 14, height: 14 }} /> All features
              </Link>

              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <MiniMascot size={48} seed={mascotSeed} />
                <p style={{ color: GREEN, fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>
                  {eyebrow}
                </p>
              </div>

              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.025em", marginBottom: 16 }}>
                {headline}
              </h1>
              <p style={{ color: MUTED, fontSize: "1.1rem", lineHeight: 1.6, marginBottom: 40, maxWidth: 560 }}>
                {subline}
              </p>
              <a href="https://app.getmin.ai/">
                <Button size="lg" className="cta-glow text-white font-normal text-base px-8" style={{ backgroundColor: GREEN, border: "none" }}>
                  Try it free <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>

          {children}

          <Section style={{ marginTop: 80 }}>
            <FinalCTA
              headline={<>Ready to put your minion<br /><span style={{ color: GREEN }}>to work?</span></>}
              sub="Connect your inbox in 30 seconds. Your minion starts working immediately."
            />
          </Section>

        </div>
      </main>

      <Footer />
    </div>
  </>
);

export default FeaturePageLayout;

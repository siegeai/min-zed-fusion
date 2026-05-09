import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";

const CARD =
  "rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-sm";
const CARD_INNER = {
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.01)",
} as const;

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${CARD} p-6 md:p-8 mb-4`}
      style={CARD_INNER}
      aria-labelledby={`${id}-h`}
    >
      <h2
        id={`${id}-h`}
        className="text-white text-xl md:text-2xl font-semibold tracking-[-0.015em] mb-4"
      >
        {title}
      </h2>
      <div className="text-slate-400 text-[15px] leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms of Service | min.</title>
        <link rel="canonical" href="https://getmin.ai/terms" />
      </Helmet>

      <div className="min-h-screen bg-black text-slate-200 font-sans antialiased overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-500 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          tabIndex={1}
        >
          Skip to main content
        </a>

        <PillNav />

        <main
          id="main-content"
          className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden"
          role="main"
          aria-labelledby="terms-title"
        >
          {/* ambient background layers — match Hero */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(80,120,255,0.14) 0%, rgba(80,120,255,0.04) 35%, transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%)",
            }}
          />

          <div className="relative max-w-4xl mx-auto px-6">
            <header className="text-center mb-12 md:mb-16">
              <p className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-slate-400 mb-5">
                Legal
              </p>
              <h1
                id="terms-title"
                className="text-white font-semibold tracking-[-0.025em] leading-[1.05] text-4xl md:text-5xl lg:text-6xl"
              >
                Terms of Service
              </h1>
              <p className="mt-6 text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Clear, fair terms built by experienced founders who understand
                what teams need.
              </p>
              <p className="mt-5 text-xs text-slate-500 font-mono tracking-wide">
                Last updated: January 2026
              </p>
            </header>

            <div role="article" aria-label="Terms of Service Content">
              <Section
                id="acceptance-terms"
                title="1. Acceptance of Terms"
              >
                <p>
                  By accessing or using min's AI communication platform, you
                  agree to be bound by these Terms of Service. Our platform is
                  designed by seasoned veterans who understand the needs of
                  fast-moving teams and the importance of reliable, secure
                  communication tools.
                </p>
              </Section>

              <Section
                id="service-description"
                title="2. Service Description"
              >
                <p>
                  min. provides an AI-powered external communication platform
                  that enables teams to:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-slate-600">
                  <li>Automate email tasks through intelligent AI agents</li>
                  <li>
                    Manage external communications in a unified interface
                  </li>
                  <li>Collaborate efficiently on communication workflows</li>
                  <li>
                    Access industry-leading security and reliability features
                  </li>
                </ul>
              </Section>

              <Section
                id="user-responsibilities"
                title="3. User Responsibilities"
              >
                <p>You agree to:</p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-slate-600">
                  <li>Provide accurate and complete information</li>
                  <li>
                    Use the service in compliance with all applicable laws
                  </li>
                  <li>Not attempt to breach our security measures</li>
                  <li>
                    Not use the service for spam, harassment, or illegal
                    activities
                  </li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </Section>

              <Section
                id="ai-standards"
                title="4. AI Service Standards"
              >
                <p>
                  As experienced practitioners in AI and communication
                  technology, we maintain high standards:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-slate-600">
                  <li>99.9% uptime SLA with transparent status reporting</li>
                  <li>
                    Enterprise-grade security following industry best practices
                  </li>
                  <li>Continuous AI model improvements and updates</li>
                  <li>24/7 monitoring and incident response</li>
                  <li>
                    Regular security audits and compliance certifications
                  </li>
                </ul>
              </Section>

              <Section
                id="data-ownership"
                title="5. Data Ownership and AI Processing"
              >
                <p>
                  Your data remains yours. We process it solely to provide our
                  services with strict limitations:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-slate-600">
                  <li>
                    You retain full ownership of your communications and data
                  </li>
                  <li>
                    <strong className="text-slate-200">
                      We only store email metadata (headers, timestamps, thread
                      IDs) — no email content is permanently stored
                    </strong>
                  </li>
                  <li>
                    <strong className="text-slate-200">
                      All email content is fetched dynamically from Email
                      Provider's (Gmail, Outlook, etc.) APIs and processed in
                      real-time only
                    </strong>
                  </li>
                  <li>
                    <strong className="text-slate-200">
                      We do not use your data to train our own AI models or any
                      third-party models
                    </strong>
                  </li>
                  <li>
                    Our AI agents process data only for service functionality
                    and do not retain content
                  </li>
                  <li>Data processing is transparent and auditable</li>
                  <li>
                    You can export or delete your data at any time with
                    immediate effect
                  </li>
                </ul>
              </Section>

              <Section
                id="security-compliance"
                title="6. Security and Compliance"
              >
                <p>
                  We take security very seriously and follow industry best
                  practices with certified vendors:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-slate-600">
                  <li>
                    <strong className="text-slate-200">
                      All our vendors are SOC 2 Type II certified and GDPR
                      compliant
                    </strong>
                  </li>
                  <li>
                    GDPR and CCPA compliant data handling with full user rights
                  </li>
                  <li>
                    End-to-end encryption for all communications and data
                    transmission
                  </li>
                  <li>
                    Regular penetration testing and security audits by
                    third-party firms
                  </li>
                  <li>
                    Multi-factor authentication and role-based access controls
                  </li>
                  <li>
                    Compliance with Google API Services User Data Policy
                  </li>
                  <li>
                    Compliance with Microsoft / Outlook API and data policies
                  </li>
                </ul>
              </Section>

              <Section
                id="user-data-rights"
                title="7. User Data Rights and Deletion"
              >
                <p>You have complete control over your data:</p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-slate-600">
                  <li>
                    <strong className="text-slate-200">
                      You can delete your data at any time with immediate effect
                    </strong>
                  </li>
                  <li>
                    Data deletion includes all stored metadata and processing
                    logs
                  </li>
                  <li>
                    No data retention beyond what is necessary for service
                    functionality
                  </li>
                  <li>
                    Right to data portability — export your data in standard
                    formats
                  </li>
                  <li>
                    Right to restrict processing of your personal data
                  </li>
                  <li>
                    Transparent data processing with clear purpose limitation
                  </li>
                </ul>
              </Section>

              <Section
                id="google-api-compliance"
                title="8. Google API Compliance"
              >
                <p>
                  We strictly comply with Google's API Services User Data
                  Policy:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-slate-600">
                  <li>
                    We only access email data necessary for our service
                    functionality
                  </li>
                  <li>
                    We do not transfer email data to third parties except as
                    required for service operation
                  </li>
                  <li>
                    We do not use email data for advertising or marketing
                    purposes
                  </li>
                  <li>
                    We provide clear disclosure of our data use practices
                  </li>
                  <li>
                    We maintain appropriate security measures for email data
                  </li>
                  <li>
                    We comply with all Google API Terms of Service and policies
                  </li>
                </ul>
              </Section>

              <Section
                id="microsoft-api-compliance"
                title="9. Microsoft / Outlook API Compliance"
              >
                <p>
                  We strictly comply with Microsoft's API and data policies for
                  Outlook and Microsoft 365:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-slate-600">
                  <li>
                    We only access email data necessary for our service
                    functionality
                  </li>
                  <li>
                    We do not transfer email data to third parties except as
                    required for service operation
                  </li>
                  <li>
                    We do not use email data for advertising or marketing
                    purposes
                  </li>
                  <li>
                    We provide clear disclosure of our data use practices
                  </li>
                  <li>
                    We maintain appropriate security measures for email data
                  </li>
                  <li>
                    We comply with all Microsoft API Terms of Service, the
                    Microsoft Graph Terms of Use, and applicable Microsoft
                    policies
                  </li>
                </ul>
              </Section>

              <Section
                id="service-availability"
                title="10. Service Availability"
              >
                <p>
                  We strive to provide uninterrupted service but cannot
                  guarantee 100% uptime. We provide advance notice of planned
                  maintenance and work quickly to resolve any service
                  interruptions.
                </p>
              </Section>

              <Section
                id="limitation-liability"
                title="11. Limitation of Liability"
              >
                <p>
                  To the maximum extent permitted by law, min. shall not be
                  liable for any indirect, incidental, special, consequential,
                  or punitive damages, or any loss of profits or revenues.
                </p>
              </Section>

              <Section id="termination" title="12. Termination">
                <p>
                  When you delete your account, all data related to your
                  account is removed immediately from our databases.
                </p>
              </Section>

              <Section
                id="contact-information"
                title="Contact Information"
              >
                <p>Questions about these Terms? Contact us at:</p>
                <p className="font-mono text-sm">
                  Email:{" "}
                  <a
                    href="mailto:hello@getmin.ai"
                    className="text-blue-300 hover:text-blue-200 underline-offset-2 hover:underline"
                  >
                    hello@getmin.ai
                  </a>
                </p>
              </Section>
            </div>
          </div>
        </main>

        <MinFooter />
      </div>
    </>
  );
};

export default TermsOfService;

import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";

const CARD =
  "rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]";

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
      aria-labelledby={`${id}-h`}
    >
      <h2
        id={`${id}-h`}
        className="text-gray-900 text-xl md:text-2xl font-semibold tracking-[-0.015em] mb-4"
      >
        {title}
      </h2>
      <div className="text-gray-600 text-[15px] leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Privacy Policy | min.</title>
        <link rel="canonical" href="https://getmin.ai/privacy" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-gray-900 font-sans antialiased overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gray-900 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
          tabIndex={1}
        >
          Skip to main content
        </a>

        <PillNav />

        <main
          id="main-content"
          className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden"
          role="main"
          aria-labelledby="privacy-policy-title"
        >
          {/* ambient background layers (match Hero) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(80,120,255,0.06) 0%, rgba(80,120,255,0.02) 35%, transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%)",
            }}
          />

          <div className="relative max-w-4xl mx-auto px-6">
            <header className="text-center mb-12 md:mb-16">
              <p className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-gray-400 mb-5">
                Legal
              </p>
              <h1
                id="privacy-policy-title"
                className="font-display text-gray-900 font-semibold tracking-[-0.025em] leading-[1.05] text-4xl md:text-5xl lg:text-6xl"
              >
                Privacy Policy
              </h1>
              <p className="mt-6 text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Your relationship memory deserves real protection. We safeguard
                your data with industry-leading security practices.
              </p>
              <p className="mt-5 text-xs text-gray-500 font-mono tracking-wide">
                Last updated: January 2026
              </p>
            </header>

            <div role="article" aria-label="Privacy Policy Content">
              <Section id="info-collection" title="1. Information We Collect">
                <p>
                  We collect information you provide directly to us, such as
                  when you create an account, use our AI communication platform,
                  or contact us for support. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-gray-400">
                  <li>Account information (name, email address, password)</li>
                  <li>
                    <strong className="text-gray-900">
                      Email metadata only (headers, timestamps, thread IDs).
                      No email content is permanently stored
                    </strong>
                  </li>
                  <li>Usage data and analytics to improve our service</li>
                  <li>
                    Payment information (processed securely through third-party
                    providers)
                  </li>
                </ul>
                <p>
                  <strong className="text-gray-900">Important:</strong> We do
                  not store email content. All email content is fetched
                  dynamically from your email provider's APIs and processed in
                  real-time only.
                </p>
              </Section>

              <Section id="how-we-use" title="2. How We Use Your Information">
                <p>
                  As seasoned veterans in the industry, we understand the
                  critical importance of data handling. We use your information
                  to:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-gray-400">
                  <li>Provide and improve our AI communication services</li>
                  <li>
                    Process and manage your communications through our AI
                    agents
                  </li>
                  <li>Send important updates about our service</li>
                  <li>Ensure platform security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </Section>

              <Section
                id="data-security"
                title="3. Data Security & Industry Standards"
              >
                <p>
                  We take security very seriously and follow industry best
                  practices to protect your data:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-gray-400">
                  <li>
                    <strong className="text-gray-900">
                      All our vendors are SOC 2 Type II certified and GDPR
                      compliant
                    </strong>
                  </li>
                  <li>
                    End-to-end encryption for all communications and data
                    transmission
                  </li>
                  <li>
                    Multi-factor authentication and role-based access controls
                  </li>
                  <li>
                    Data minimization principles. We only collect what we need
                  </li>
                  <li>
                    Regular penetration testing and vulnerability assessments
                    by third-party firms
                  </li>
                  <li>GDPR and CCPA compliance with full user rights</li>
                  <li>
                    Compliance with Google API Services User Data Policy
                  </li>
                </ul>
              </Section>

              <Section
                id="ai-processing"
                title="4. AI Data Processing & Third-Party Services"
              >
                <p>
                  Our AI agents process your communications to provide
                  intelligent automation. We ensure:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-gray-400">
                  <li>
                    <strong className="text-gray-900">
                      We do not use your data to train our own AI models or any
                      third-party models
                    </strong>
                  </li>
                  <li>
                    Data is processed only for service functionality and not
                    retained
                  </li>
                  <li>Automatic data retention limits and secure deletion</li>
                  <li>Transparent AI decision-making processes</li>
                </ul>
                <p>
                  <strong className="text-gray-900">
                    OpenAI Integration:
                  </strong>{" "}
                  We use OpenAI's API to process messages. OpenAI does not use
                  data submitted through their API for training or improving
                  their models unless explicitly opted in. OpenAI retains API
                  data for 30 days for abuse and misuse monitoring purposes,
                  after which it is deleted unless legally required to retain
                  it longer.
                </p>
              </Section>

              <Section
                id="data-sharing"
                title="5. Data Sharing & Google API Compliance"
              >
                <p>
                  We do not sell, trade, or rent your personal information. We
                  may share data only in these limited circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-gray-400">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements</li>
                  <li>
                    With trusted service providers under strict confidentiality
                    agreements
                  </li>
                  <li>To protect our rights and prevent fraud</li>
                </ul>
                <p>
                  <strong className="text-gray-900">
                    Google API Compliance:
                  </strong>{" "}
                  We comply with Google's API Services User Data Policy. We do
                  not transfer email data to third parties except as required
                  for service operation, and we do not use email data for
                  advertising or marketing purposes.
                </p>
              </Section>

              <Section
                id="your-rights"
                title="6. Your Rights & Data Deletion"
              >
                <p>You have comprehensive rights over your data:</p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-gray-400">
                  <li>
                    <strong className="text-gray-900">
                      Immediate deletion: When you delete your account, all
                      data is removed immediately from our databases
                    </strong>
                  </li>
                  <li>
                    Right to access, update, delete, or port your data
                  </li>
                  <li>
                    Right to restrict processing of your personal data
                  </li>
                  <li>Right to data portability in standard formats</li>
                  <li>
                    Transparent data processing with clear purpose limitation
                  </li>
                </ul>
                <p>
                  Contact us at{" "}
                  <a
                    href="mailto:hello@getmin.ai"
                    className="text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline"
                  >
                    hello@getmin.ai
                  </a>{" "}
                  to exercise these rights.
                </p>
              </Section>

              <Section id="contact-us" title="Contact Us">
                <p>
                  If you have questions about this Privacy Policy, please
                  contact us at:
                </p>
                <p className="font-mono text-sm">
                  Email:{" "}
                  <a
                    href="mailto:hello@getmin.ai"
                    className="text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline"
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

export default PrivacyPolicy;

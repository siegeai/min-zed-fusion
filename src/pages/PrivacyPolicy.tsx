
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-white to-green-50/20"></div>
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 leading-tight">
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                Your privacy is our priority. We're committed to protecting your data with industry-leading security practices.
              </p>
              <p className="text-sm text-gray-500 mt-4">Last updated: December 2024</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">1. Information We Collect</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We collect information you provide directly to us, such as when you create an account, use our AI communication platform, or contact us for support. This includes:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Account information (name, email address, password)</li>
                  <li><strong>Email metadata only (headers, timestamps, thread IDs) - no email content is permanently stored</strong></li>
                  <li>Usage data and analytics to improve our service</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  <strong>Important:</strong> We do not store email content. All email content is fetched dynamically from your email provider's APIs and processed in real-time only.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  As seasoned veterans in the industry, we understand the critical importance of data handling. We use your information to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Provide and improve our AI communication services</li>
                  <li>Process and manage your communications through our AI agents</li>
                  <li>Send important updates about our service</li>
                  <li>Ensure platform security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">3. Data Security & Industry Standards</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We take security very seriously and follow industry best practices to protect your data:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>All our vendors are SOC 2 Type II certified and GDPR compliant</strong></li>
                  <li>End-to-end encryption for all communications and data transmission</li>
                  <li>Multi-factor authentication and role-based access controls</li>
                  <li>Data minimization principles - we only collect what we need</li>
                  <li>Regular penetration testing and vulnerability assessments by third-party firms</li>
                  <li>GDPR and CCPA compliance with full user rights</li>
                  <li>Compliance with Google API Services User Data Policy</li>
                </ul>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">4. AI Data Processing & Third-Party Services</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our AI agents process your communications to provide intelligent automation. We ensure:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>We do not use your data to train our own AI models or any third-party models</strong></li>
                  <li>Data is processed only for service functionality and not retained</li>
                  <li>Automatic data retention limits and secure deletion</li>
                  <li>Transparent AI decision-making processes</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  <strong>OpenAI Integration:</strong> We use OpenAI's API to process messages. OpenAI does not use data submitted through their API for training or improving their models unless explicitly opted in. OpenAI retains API data for 30 days for abuse and misuse monitoring purposes, after which it is deleted unless legally required to retain it longer.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">5. Data Sharing & Google API Compliance</h2>
                <p className="text-gray-600 leading-relaxed">
                  We do not sell, trade, or rent your personal information. We may share data only in these limited circumstances:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements</li>
                  <li>With trusted service providers under strict confidentiality agreements</li>
                  <li>To protect our rights and prevent fraud</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  <strong>Google API Compliance:</strong> We comply with Google's API Services User Data Policy. We do not transfer email data to third parties except as required for service operation, and we do not use email data for advertising or marketing purposes.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">6. Your Rights & Data Deletion</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You have comprehensive rights over your data:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Immediate deletion: When you delete your account, all data is removed immediately from our databases</strong></li>
                  <li>Right to access, update, delete, or port your data</li>
                  <li>Right to restrict processing of your personal data</li>
                  <li>Right to data portability in standard formats</li>
                  <li>Transparent data processing with clear purpose limitation</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Contact us at hello@getmin.ai to exercise these rights.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600 leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at:
                  <br />
                  Email: hello@getmin.ai
                  <br />
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicy;

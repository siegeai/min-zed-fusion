
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
                  <li>Communication data processed through our AI agents</li>
                  <li>Usage data and analytics to improve our service</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>
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
                  <li>End-to-end encryption for all communications</li>
                  <li>SOC 2 Type II compliance and regular security audits</li>
                  <li>Multi-factor authentication and role-based access controls</li>
                  <li>Data minimization principles - we only collect what we need</li>
                  <li>Regular penetration testing and vulnerability assessments</li>
                  <li>GDPR and CCPA compliance</li>
                </ul>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">4. AI Data Processing</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our AI agents process your communications to provide intelligent automation. We ensure:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Data is processed only for service functionality</li>
                  <li>No training on your private data without explicit consent</li>
                  <li>Automatic data retention limits and secure deletion</li>
                  <li>Transparent AI decision-making processes</li>
                </ul>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">5. Data Sharing</h2>
                <p className="text-gray-600 leading-relaxed">
                  We do not sell, trade, or rent your personal information. We may share data only in these limited circumstances:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements</li>
                  <li>With trusted service providers under strict confidentiality agreements</li>
                  <li>To protect our rights and prevent fraud</li>
                </ul>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">6. Your Rights</h2>
                <p className="text-gray-600 leading-relaxed">
                  You have the right to access, update, delete, or port your data. Contact us at privacy@min.com to exercise these rights.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600 leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at:
                  <br />
                  Email: privacy@min.com
                  <br />
                  Address: [Your Company Address]
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

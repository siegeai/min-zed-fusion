
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const TermsOfService = () => {
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
                Terms of Service
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                Clear, fair terms built by experienced founders who understand what teams need.
              </p>
              <p className="text-sm text-gray-500 mt-4">Last updated: December 2024</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing or using min.'s AI communication platform, you agree to be bound by these Terms of Service. 
                  Our platform is designed by seasoned veterans who understand the needs of fast-moving teams and the importance 
                  of reliable, secure communication tools.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">2. Service Description</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  min. provides an AI-powered external communication platform that enables teams to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Automate email tasks through intelligent AI agents</li>
                  <li>Manage external communications in a unified interface</li>
                  <li>Collaborate efficiently on communication workflows</li>
                  <li>Access industry-leading security and reliability features</li>
                </ul>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">3. User Responsibilities</h2>
                <p className="text-gray-600 leading-relaxed mb-4">You agree to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Use the service in compliance with all applicable laws</li>
                  <li>Not attempt to breach our security measures</li>
                  <li>Not use the service for spam, harassment, or illegal activities</li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">4. AI Service Standards</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  As experienced practitioners in AI and communication technology, we maintain high standards:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>99.9% uptime SLA with transparent status reporting</li>
                  <li>Enterprise-grade security following industry best practices</li>
                  <li>Continuous AI model improvements and updates</li>
                  <li>24/7 monitoring and incident response</li>
                  <li>Regular security audits and compliance certifications</li>
                </ul>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">5. Data Ownership and AI Processing</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Your data remains yours. We process it solely to provide our services:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>You retain full ownership of your communications and data</li>
                  <li>Our AI agents process data only for service functionality</li>
                  <li>We do not use your data to train models for other customers</li>
                  <li>Data processing is transparent and auditable</li>
                  <li>You can export or delete your data at any time</li>
                </ul>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">6. Security and Compliance</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We take security very seriously and follow industry best practices:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>SOC 2 Type II certified infrastructure</li>
                  <li>GDPR and CCPA compliant data handling</li>
                  <li>End-to-end encryption for all communications</li>
                  <li>Regular penetration testing and security audits</li>
                  <li>Multi-factor authentication and access controls</li>
                </ul>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">7. Service Availability</h2>
                <p className="text-gray-600 leading-relaxed">
                  We strive to provide uninterrupted service but cannot guarantee 100% uptime. We provide advance notice 
                  of planned maintenance and work quickly to resolve any service interruptions.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed">
                  To the maximum extent permitted by law, min. shall not be liable for any indirect, incidental, special, 
                  consequential, or punitive damages, or any loss of profits or revenues.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">9. Termination</h2>
                <p className="text-gray-600 leading-relaxed">
                  Either party may terminate the service with 30 days' notice. Upon termination, you may export your data 
                  for 90 days before it is securely deleted.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-600 leading-relaxed">
                  Questions about these Terms? Contact us at:
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

export default TermsOfService;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { Shield, ShieldCheck, Lock, Eye, Server, FileText, Users, CheckCircle, Award, Star, Mail } from "lucide-react";
const Security = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const securityFeatures = [{
    icon: Award,
    title: "9.7 ESOF Security Score",
    description: "Achieved an exceptional 9.7/10 security score from the Enterprise Security Operations Framework (ESOF), placing us in the top tier of enterprise security standards."
  }, {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All data in transit is protected with industry-standard TLS 1.3 encryption, ensuring your communications remain private and secure."
  }, {
    icon: ShieldCheck,
    title: "SOC 2 Type II Infrastructure",
    description: "Our infrastructure providers undergo rigorous SOC 2 Type II audits, ensuring your data is hosted on the most secure platforms available."
  }, {
    icon: FileText,
    title: "Privacy-First Architecture",
    description: "While we're still in the process of obtaining GDPR certification, we work only with compliant providers and follow industry best practices to protect data and align with these regulations."
  }, {
    icon: Eye,
    title: "Never Sold. Never Brokered. Never Trained On.",
    description: "Your data is never sold, never brokered, and never used to train AI models — for us or anyone else. Each client's data remains completely isolated and private."
  }, {
    icon: Server,
    title: "Enterprise-Grade Infrastructure",
    description: "Built on battle-tested cloud infrastructure with 99.9% uptime SLA, multi-region redundancy, and automated failover systems."
  }, {
    icon: Users,
    title: "Access Controls",
    description: "Multi-factor authentication, role-based permissions, and principle of least privilege ensure only authorized access to your data."
  }];
  const infrastructureCertifications = [
    "SOC 2 Type II",
    "Google CASA Tier 2",
    "GDPR compliant",
    "CCPA compliant",
    "ISO 27001",
    "PCI DSS Level 1",
    "HIPAA ready",
  ];
  return <div className="min-h-screen bg-white relative overflow-hidden">
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
          <div className="max-w-6xl mx-auto px-6">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 leading-tight">
                Enterprise-Grade Security
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">Built by veterans with 20+ years of combined experience developing enterprise-grade software. Security isn't an afterthought. It's our foundation.</p>
            </div>

            {/* Security Score Highlight */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-sm p-8 mb-16 text-white">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Enterprise Security Excellence
                </h2>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="text-6xl font-bold">9.7</div>
                  <div className="text-left">
                    <div className="text-2xl font-semibold">ESOF Score</div>
                    <div className="text-green-100">Enterprise Security Operations Framework</div>
                  </div>
                </div>
                <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
                  Recognized by industry experts for exceptional security practices, placing us in the top tier of enterprise security standards.
                </p>
                <div className="flex items-center justify-center mt-6 space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-300 fill-current" />
                  ))}
                  <span className="ml-2 text-green-100 font-medium">Top 1% Security Rating</span>
                </div>
              </div>
            </div>

            {/* Trust Statement */}
            <div className="bg-gradient-to-r from-green-50 to-green-100/50 rounded-sm border border-green-200/60 p-8 mb-16">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <ShieldCheck className="w-8 h-8 text-green-600 mt-1" />
                </div>
                <div>
                  <h2 className="text-2xl font-medium text-gray-900 mb-4">
                    Security-First Architecture
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Our team has spent decades building secure systems for companies like DoorDash, Coursera, Sunnybrook Research Hospital. 
                    We understand that trust is earned through transparency, rigorous security practices, and unwavering 
                    commitment to protecting your data. Every line of code is written with security as the primary consideration.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {securityFeatures.map((feature, index) => <div key={index} className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-sm flex items-center justify-center mr-3">
                      <feature.icon className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>)}
            </div>

            {/* Data Pledge */}
            <div className="bg-gray-900 rounded-sm p-8 mb-16 text-white">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  Our Data Pledge
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Plain English, no legal gymnastics.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  { title: "We never sell your data", detail: "Not to advertisers, not to data brokers, not to anyone. Your data is not our product." },
                  { title: "We never broker your data", detail: "We don't share, license, or provide access to your data to any third party — ever." },
                  { title: "We never train on your data", detail: "Your emails are never used to train AI models — not ours, not our providers'. Your data stays yours." },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-green-500/20 rounded-full mb-4">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Protection Detail */}
            <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-16">
              <h2 className="text-2xl font-medium text-gray-900 mb-6 text-center">
                Your Data, Your Control
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Data Isolation</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Your data never leaves our dedicated, encrypted environment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Each account is fully isolated — no cross-customer data access</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Complete data portability and deletion rights</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">AI Model Security</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>All AI providers maintain SOC 2 Type II certification</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Models process data in secure, audited environments</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>No persistent storage of prompts or responses by AI providers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Infrastructure certifications */}
            <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-16">
              <h2 className="text-2xl font-medium text-gray-900 mb-2 text-center">
                Infrastructure & compliance
              </h2>
              <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto text-sm">
                We use providers that hold the certifications that matter for your data.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {infrastructureCertifications.map((cert, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-sm bg-gray-100 text-gray-700 text-sm font-medium"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Trusted Partnerships */}
            <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-16">
              <h2 className="text-2xl font-medium text-gray-900 mb-2 text-center">
                Trusted Partnerships
              </h2>
              <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto text-sm">
                Recognized by industry leaders for our commitment to security and compliance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {/* Microsoft Partner */}
                <div className="flex flex-col items-center text-center p-6 rounded-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 mr-3" viewBox="0 0 23 23" fill="none">
                      <rect x="1" y="1" width="10" height="10" fill="#f25022" />
                      <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
                      <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
                      <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
                    </svg>
                    <span className="text-xl font-semibold text-gray-900">Microsoft Partner</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Verified Microsoft Partner with access to enterprise-grade Microsoft technologies, ensuring seamless and secure integration with Microsoft 365 and Azure services.
                  </p>
                </div>
                {/* Google CASA */}
                <div className="flex flex-col items-center text-center p-6 rounded-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 mr-3" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09A6.97 6.97 0 0 1 5.47 12c0-.72.13-1.43.37-2.09V7.07H2.18A11.96 11.96 0 0 0 .95 12c0 1.94.46 3.77 1.23 5.07l3.66-2.98z" fill="#FBBC05" />
                      <path d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.07l3.66 2.84c.87-2.6 3.3-4.16 6.16-4.16z" fill="#EA4335" />
                    </svg>
                    <span className="text-xl font-semibold text-gray-900">Google CASA Tier 2</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Passed the Google Cloud Application Security Assessment (CASA) at Tier 2 level, validated by an independent assessor for secure handling of Google user data.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Practices */}
            <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-16">
              <h2 className="text-2xl font-medium text-gray-900 mb-6">
                Our Security Practices
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Infrastructure Security</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 24/7 security monitoring and incident response</li>
                    <li>• Regular penetration testing by third-party experts</li>
                    <li>• Automated vulnerability scanning and patching</li>
                    <li>• Multi-region data replication with encrypted backups</li>
                    <li>• Network segmentation and firewall protection</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Operational Security</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Background-checked security-cleared personnel</li>
                    <li>• Regular security training and awareness programs</li>
                    <li>• Incident response procedures with 15-minute SLA</li>
                    <li>• Comprehensive audit logging and monitoring</li>
                    <li>• Annual third-party security assessments</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-16 pt-12 border-t border-gray-200 text-center">
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                Security questions?
              </h2>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto text-sm">
                We can share documentation or walk through compliance. Reach out anytime.
              </p>
              <a 
                href="mailto:hello@getmin.ai?subject=Security Questions&body=Hello, I have questions about your security practices and would like to learn more."
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@getmin.ai
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>;
};
export default Security;
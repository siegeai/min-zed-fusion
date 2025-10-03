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
    title: "Zero Data Cross-Training",
    description: "Your data is never used to train models for other customers. Each client's data remains completely isolated and private."
  }, {
    icon: Server,
    title: "Enterprise-Grade Infrastructure",
    description: "Built on battle-tested cloud infrastructure with 99.9% uptime SLA, multi-region redundancy, and automated failover systems."
  }, {
    icon: Users,
    title: "Access Controls",
    description: "Multi-factor authentication, role-based permissions, and principle of least privilege ensure only authorized access to your data."
  }];
  const infrastructureCertifications = ["SOC 2 Type II Providers", "Google CASA Tier 2 Certified", "GDPR Compliant Partners", "CCPA Compliant Partners", "ISO 27001 Certified Providers", "PCI DSS Level 1 Infrastructure", "HIPAA Ready Infrastructure"];
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
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">Built by veterans with 20+ years of combined experience developing enterprise-grade software. Security isn't an afterthought—it's our foundation.</p>
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

            {/* Data Protection Guarantee */}
            <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-16">
              <h2 className="text-2xl font-medium text-gray-900 mb-6 text-center">
                Your Data, Your Control
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Data Isolation Promise</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Your data never leaves our dedicated, encrypted environment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Zero cross-customer data sharing or model training</span>
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
                      <span>No persistent storage of prompts or responses</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Infrastructure Security & Compliance */}
            <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8 mb-16">
              <h2 className="text-2xl font-medium text-gray-900 mb-6 text-center">
                Certified Infrastructure Partners
              </h2>
              <p className="text-gray-600 mb-6 text-center max-w-3xl mx-auto">
                We partner exclusively with industry-leading infrastructure providers that maintain the highest security certifications and compliance standards.
              </p>
              
              {/* Highlight Google CASA Tier 2 */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-sm border border-blue-200/60 p-6 mb-8">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900">Google CASA Tier 2 Certified</h3>
                    <p className="text-gray-600">Google Cloud Architecture Security Assessment - Tier 2</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {infrastructureCertifications.map((cert, index) => {
                  const isGoogleCASA = cert === "Google CASA Tier 2 Certified";
                  return (
                    <div key={index} className={`flex items-center justify-center p-4 rounded-sm border ${
                      isGoogleCASA 
                        ? "bg-blue-50 border-blue-200/60 ring-2 ring-blue-100" 
                        : "bg-green-50 border-green-200/60"
                    }`}>
                      <span className={`text-sm font-medium text-center ${
                        isGoogleCASA ? "text-blue-800" : "text-gray-700"
                      }`}>
                        {cert}
                      </span>
                    </div>
                  );
                })}
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
            <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-sm border border-gray-200/60 p-8 text-center">
              <h2 className="text-2xl font-medium text-gray-900 mb-4">
                Questions About Our Security?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our team is available to discuss our security practices, provide detailed security documentation, 
                or answer any compliance questions you may have.
              </p>
              <a 
                href="mailto:hello@getmin.ai?subject=Security Questions&body=Hello, I have questions about your security practices and would like to learn more."
                className="inline-flex items-center justify-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-sm transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>;
};
export default Security;
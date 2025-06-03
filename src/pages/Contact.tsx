
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MessageCircle, Phone, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8 text-green-600" />,
      title: "General Inquiries",
      description: "Questions, feedback, or just want to say hi?",
      email: "hello@getmin.ai",
      cta: "Drop us a line",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-blue-600" />,
      title: "Support & Help",
      description: "Need help getting the most out of min.?",
      email: "support@getmin.ai",
      cta: "Get expert help",
      bgColor: "bg-gradient-to-br from-blue-50 to-sky-50"
    },
    {
      icon: <Phone className="w-8 h-8 text-purple-600" />,
      title: "Sales & Partnerships",
      description: "Ready to transform your workflow?",
      email: "sales@getmin.ai",
      cta: "Let's talk business",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-50"
    }
  ];

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.log('Failed to copy email:', err);
    }
  };

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
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-medium text-gray-900 mb-6 leading-tight">
                Let's <span className="text-green-600/90">connect</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                We love hearing from our users. Whether you have a question, need support, or want to explore partnerships — we're just an email away.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <div 
                  key={index} 
                  className={`${method.bgColor} p-8 rounded-xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      {method.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{method.title}</h3>
                    <p className="text-gray-600 text-sm font-light mb-6 leading-relaxed">{method.description}</p>
                    
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/40">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 font-medium text-lg">{method.email}</span>
                        <button
                          onClick={() => handleCopyEmail(method.email)}
                          className="p-2 hover:bg-white/50 rounded-md transition-colors"
                          title="Copy email"
                        >
                          {copiedEmail === method.email ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleEmailClick(method.email)}
                      className="w-full bg-white/80 hover:bg-white text-gray-900 font-medium shadow-sm border border-white/40 hover:shadow-md transition-all"
                    >
                      {method.cta}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-green-50/50 to-blue-50/50 rounded-2xl p-8 border border-green-100/40">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Not sure which email to use?
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  When in doubt, just email <span className="font-semibold text-green-600">hello@getmin.ai</span> — we'll make sure your message gets to the right person.
                </p>
                <Button 
                  onClick={() => handleEmailClick('hello@getmin.ai')}
                  size="lg"
                  className="bg-green-600/90 hover:bg-green-700/90 text-white font-medium"
                >
                  Email us now
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;

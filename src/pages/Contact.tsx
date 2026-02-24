import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Copy, Check, Zap, MessageCircle, Users, BarChart3, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const email = "hello@getmin.ai";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.log('Failed to copy email:', err);
    }
  };

  const supportedInquiries = [{
    icon: <MessageCircle className="w-5 h-5 text-green-600" />,
    title: "General Inquiries",
    description: "Questions, feedback, or just want to say hi?"
  }, {
    icon: <Users className="w-5 h-5 text-blue-600" />,
    title: "Support & Help",
    description: "Need help getting the most out of min.?"
  }, {
    icon: <BarChart3 className="w-5 h-5 text-purple-600" />,
    title: "Sales & Partnerships",
    description: "Ready to transform your workflow?"
  }, {
    icon: <Zap className="w-5 h-5 text-orange-600" />,
    title: "Investors & Press",
    description: "Media inquiries and investment opportunities"
  }];

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
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-medium text-gray-900 mb-6 leading-tight">
                One inbox for <span className="text-green-600/90">everything</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light mb-8">We practice what we preach. Just like our customers, we use min. to manage all our external communications through a shared inbox.</p>
              
              {/* Dogfooding highlight */}
              <div className="bg-gradient-to-r from-green-50/80 to-blue-50/80 rounded-2xl p-6 border border-green-100/60 mb-12 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Zap className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">Powered by min.</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">This single email address handles support tickets, sales inquiries, investor relations, press requests, recruiting, and general feedback - all done using our own product.</p>
              </div>
            </div>

            {/* Main email contact card */}
            <div className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 p-12 rounded-2xl border border-green-100/60 shadow-lg mb-16 text-center">
              <div className="flex justify-center mb-6">
                <Mail className="w-12 h-12 text-green-600" />
              </div>
              
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Reach us here 24/7/365</h2>
              
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 border border-emerald-500/30">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-200 font-medium text-sm">Avg response time: under 2 hours</span>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/60 max-w-md mx-auto">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-medium text-2xl">{email}</span>
                  <button onClick={handleCopyEmail} className="p-3 hover:bg-gray-100/50 rounded-lg transition-colors" title="Copy email">
                    {copiedEmail ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
              </div>
              
              <Button onClick={handleEmailClick} size="lg" className="bg-green-600/90 hover:bg-green-700/90 text-white font-medium px-8">
                Send us an email
              </Button>
            </div>

            {/* What we handle */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
                What can you reach us about?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportedInquiries.map((inquiry, index) => <div key={index} className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-gray-100/60 hover:bg-white/80 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      {inquiry.icon}
                      <h4 className="text-lg font-medium text-gray-900">{inquiry.title}</h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{inquiry.description}</p>
                  </div>)}
              </div>
            </div>            
          </div>
        </main>

        <Footer />
      </div>
    </div>;
};

export default Contact;

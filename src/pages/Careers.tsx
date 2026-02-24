
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Copy, Check, Zap, Heart, Code, Palette, Users, Lightbulb, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Careers = () => {
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

  const benefits = [
    "Competitive salary and equity",
    "Comprehensive health, dental, and vision insurance",
    "Flexible PTO and parental leave",
    "Remote-first culture with optional office access",
    "Learning and development budget",
    "Latest equipment and tools"
  ];

  const whatWeWant = [
    {
      icon: <Code className="w-6 h-6 text-green-600" />,
      title: "Builders",
      description: "People who love creating things that actually solve problems"
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-yellow-600" />,
      title: "Thinkers",
      description: "Creative minds who see solutions where others see challenges"
    },
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Dreamers",
      description: "Passionate individuals who believe technology can make work better"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Collaborators",
      description: "Team players who thrive in transparent, supportive environments"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background layers - dark */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-slate-950 to-slate-900/50" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(52, 211, 153, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(52, 211, 153, 0.4) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="pt-32 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-medium text-slate-100 mb-6 leading-tight">
                Join the <span className="text-emerald-400">min.</span> revolution
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                We're building the future of communication. No traditional job postings, no lengthy applications. 
                Just passionate people doing amazing work.
              </p>
            </div>

            {/* Main email recruitment section */}
            <div className="bg-slate-900/80 backdrop-blur-sm p-12 rounded-2xl border border-slate-700/60 shadow-xl mb-16 text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Mail className="w-12 h-12 text-emerald-400" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-pulse" />
                </div>
              </div>
              
              <h2 className="text-3xl font-semibold text-slate-100 mb-4">Ready to build something amazing?</h2>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                Skip the traditional hiring dance. Just email us your resume, showcase your best work, 
                and tell us about projects that make you proud. We'll know if you're a fit! ✨
              </p>
              
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-slate-600/50 max-w-md mx-auto">
                <div className="flex items-center justify-between">
                  <span className="text-slate-100 font-medium text-2xl">{email}</span>
                  <button 
                    onClick={handleCopyEmail} 
                    className="p-3 hover:bg-slate-700/50 rounded-lg transition-colors" 
                    title="Copy email"
                  >
                    {copiedEmail ? (
                      <Check className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Copy className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <Button 
                onClick={handleEmailClick} 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-8 mb-6"
              >
                <Coffee className="w-4 h-4 mr-2" />
                Let's chat about your future
              </Button>

              <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-600/50 max-w-2xl mx-auto">
                <p className="text-sm text-emerald-200 font-medium mb-2">📧 What to include in your email:</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your resume, links to projects you're proud of, a brief note about what excites you about min., 
                  and anything else that shows who you are as a creator!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-normal text-slate-100 mb-8">Who we're looking for</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {whatWeWant.map((trait, index) => (
                    <div key={index} className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/60 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        {trait.icon}
                        <h3 className="text-lg font-normal text-slate-100">{trait.title}</h3>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed font-light">
                        {trait.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/60 mt-8">
                  <h3 className="text-xl font-normal text-slate-100 mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-violet-400" />
                    Any role, any experience level
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-light mb-4">
                    Whether you're a seasoned engineer, a design wizard, a growth hacker, a customer success ninja, 
                    or something completely different – if you're passionate about making communication better, we want to hear from you.
                  </p>
                  <p className="text-violet-300 text-sm font-medium">
                    From interns to senior roles, remote to in-person – let's figure out what works! 🚀
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-normal text-slate-100 mb-8">Why min.?</h2>
                <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/60 shadow-sm">
                  <h3 className="text-lg font-normal text-slate-100 mb-4">Benefits & Perks</h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="text-slate-400 text-sm font-light flex items-start">
                        <span className="text-emerald-400 mr-2">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/60 shadow-sm mt-6">
                  <h3 className="text-lg font-normal text-slate-100 mb-4">Our Vibe</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">
                    We're building something that matters, but we're not taking ourselves too seriously. 
                    We ship fast, learn faster, and actually have fun doing it. Plus, we use our own product daily! 🎯
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-600/90 rounded-2xl p-8 text-center text-white border border-emerald-500/30">
              <h2 className="text-2xl font-normal mb-4 flex items-center justify-center gap-2">
                <Zap className="w-6 h-6" />
                Ready to join the team?
              </h2>
              <p className="text-emerald-100/90 mb-6 font-light max-w-2xl mx-auto">
                Don't overthink it. If you're excited about what we're building and think you can contribute, 
                just hit send on that email. The worst thing that can happen is we have a great conversation! 
              </p>
              <Button 
                variant="secondary" 
                className="bg-white/95 text-emerald-800 hover:bg-white font-normal"
                onClick={handleEmailClick}
              >
                <Heart className="w-4 h-4 mr-2" />
                Start the conversation
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Careers;

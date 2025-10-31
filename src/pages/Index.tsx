
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import VideoDemo from "@/components/VideoDemo";
import Features from "@/components/Features";
import FeatureDeepDive from "@/components/FeatureDeepDive";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Handle scrolling from location.state (internal navigation)
    const scrollTo = (location.state as { scrollTo?: string })?.scrollTo;
    if (scrollTo) {
      const element = document.getElementById(scrollTo);
      if (element) {
        const headerHeight = 80;
        const top = element.offsetTop - headerHeight;
        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      }

      // Clear state so it doesn't scroll again on refresh
      navigate('.', {
        replace: true,
        state: {}
      });
    }
    
    // Handle scrolling from URL hash (direct links like #pricing)
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          const headerHeight = 80;
          const top = element.offsetTop - headerHeight;
          window.scrollTo({
            top,
            behavior: 'smooth'
          });
        }
      }, 100); // Small delay to ensure page is fully rendered
    }
  }, [location, navigate]);

  const scrollToPricing = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('pricing');
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "min. - AI-Powered Shared Inbox for Lean Teams",
    "description": "AI-powered shared inbox for startups and small teams. Auto-triage emails, manage customer relationships, and scale communication without hiring. Built for founders and lean teams.",
    "url": "https://getmin.ai",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "min.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "29",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "127"
      },
      "applicationSubCategory": "Team Communication Software",
      "featureList": [
        "AI-powered shared inbox",
        "Automatic email triage",
        "Customer communication management",
        "AI agent collaboration",
        "Relationship tracking",
        "Email automation for teams",
        "Scale support without hiring"
      ]
    }
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "min.",
    "url": "https://getmin.ai",
    "logo": "https://app.getmin.ai/lovable-uploads/7a37e7bc-ff2e-4686-ab5e-b539c538ad30.png",
    "sameAs": [
      "https://twitter.com/getminai",
      "https://linkedin.com/company/getmin"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "support@getmin.ai"
    }
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is an AI-powered shared inbox?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An AI-powered shared inbox is a collaborative email platform where multiple team members can manage customer communication with AI assistance. min. auto-triages emails, drafts responses, and tracks relationships so lean teams can scale without hiring more staff."
        }
      },
      {
        "@type": "Question",
        "name": "How does min. help startups scale customer communication?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "min. helps startups scale by automatically triaging emails, managing customer relationships, and deploying AI agents that work alongside your team. This eliminates the need to hire additional support staff as email volume grows."
        }
      },
      {
        "@type": "Question",
        "name": "Is min. a CRM or helpdesk?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "min. is neither a traditional CRM nor a helpdesk. It's an AI-powered shared inbox focused on relationships rather than deals. Built for founders and small teams who want to manage all external communication in one place without complex software."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>min. | AI-Powered Shared Inbox for Startups & Small Teams</title>
        <meta name="description" content="AI-powered shared inbox for lean teams. Auto-triage emails, manage customer relationships, and scale communication without hiring. Built for startups, dev shops, and small businesses." />
        <meta name="keywords" content="AI shared inbox, team inbox software, collaborative email management, startup email tool, customer communication platform, AI email triage, shared team inbox, email automation for teams, small business inbox, startup CRM alternative, AI agents for email, scale customer support, lean team tools" />
        <link rel="canonical" href="https://getmin.ai" />
        
        {/* Enhanced Open Graph tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getmin.ai/" />
        <meta property="og:title" content="min. | AI-Powered Team Inbox for Lean Teams & AI Agents" />
        <meta property="og:description" content="Auto-triage emails, manage relationships, and scale communication without hiring more staff. Built for the Age of Intelligence." />
        <meta property="og:image" content="https://getmin.ai/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="min. - AI-powered team inbox for lean teams and AI agents. Auto-triage emails and scale without hiring." />
        <meta property="og:site_name" content="min." />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://getmin.ai/" />
        <meta name="twitter:title" content="min. | AI-Powered Team Inbox for Lean Teams & AI Agents" />
        <meta name="twitter:description" content="Auto-triage emails, manage relationships, and scale communication without hiring more staff. 2-min setup. Zero extra headcount." />
        <meta name="twitter:image" content="https://getmin.ai/og-image.png" />
        <meta name="twitter:image:alt" content="min. - AI-powered team inbox for lean teams and AI agents" />
        <meta name="twitter:creator" content="@getminai" />
        <meta name="twitter:site" content="@getminai" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqData)}
        </script>
      </Helmet>

      <div className="min-h-0 bg-white relative overflow-x-hidden overflow-y-hidden">
        {/* Multiple layered backgrounds */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          {/* Base gradient layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/50 to-white"></div>
          
          {/* Ultra-subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px'
          }}></div>
          
          {/* Subtle dot pattern */}
          <div className="absolute inset-0 opacity-[0.01]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.1) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}></div>
          
          {/* Minimal organic shapes */}
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-green-50/20 rounded-full blur-3xl transform -translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-green-50/15 rounded-full blur-3xl transform translate-x-1/4"></div>
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-green-50/20 rounded-full blur-3xl transform translate-y-1/4"></div>
        </div>
        
        <div className="relative" style={{ zIndex: 2 }}>
          <div className="opacity-0 animate-fade-in" style={{
            animationDelay: '0ms',
            zIndex: 50,
            position: 'relative'
          }}>
            <Header />
          </div>
          
          {/* Hero Section */}
          <main className="pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16 py-12 opacity-0 animate-fade-in-up" style={{
                animationDelay: '100ms'
              }}>
                <div className="space-y-6 mb-12">
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-gray-900 leading-[1.1] tracking-tight text-balance">
                    AI-Powered Team Inbox
                  </h1>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-600 leading-relaxed">
                    for <span className="text-green-600 font-normal">Lean Teams & Agents</span>
                  </p>
                  <div className="pt-4">
                    <p className="text-xs md:text-sm text-gray-400 font-light tracking-[0.2em] uppercase">
                      Designed for the <span className="text-green-600/80">Age of Intelligence</span>
                    </p>
                  </div>
                </div>
                <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                  Your inbox, with a brain. Deliver fan-level responses at scale—without the chaos.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Button size="lg" className="bg-black hover:bg-gray-900 text-white px-10 py-6 text-base font-normal rounded-full shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                    <a href="#pricing" onClick={scrollToPricing}>
                      Start free trial
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="px-10 py-6 text-base font-normal border border-gray-200 hover:bg-gray-50 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-300" asChild>
                    <a href="https://app.getmin.ai/demo" target="_blank" rel="noopener noreferrer">
                      Demo Playground
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
                
                <p className="text-gray-400 text-sm flex items-center justify-center gap-2 font-light">
                  <span>🚀</span>
                  Built for teams that automate, not staff up
                </p>
              </div>

              {/* Features above video */}
              <div className="max-w-6xl mx-auto mb-16 opacity-0 animate-fade-in-up" style={{
                animationDelay: '200ms'
              }}>
                <Features />
              </div>

              {/* Video Demo Section */}
              <div className="max-w-6xl mx-auto mb-16 opacity-0 animate-fade-in-up" style={{
                animationDelay: '300ms'
              }}>
                <VideoDemo />
              </div>

              {/* Stats section - positioned below video */}
              <div className="max-w-5xl mx-auto opacity-0 animate-fade-in-up" style={{
                animationDelay: '400ms'
              }}>
                <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-sm border border-gray-100/80 p-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div>
                      <div className="text-5xl font-light text-gray-900 mb-3">80%</div>
                      <div className="text-gray-500 text-sm font-light tracking-wide">Less time on email triage</div>
                    </div>
                    <div>
                      <div className="text-5xl font-light text-gray-900 mb-3">2 min</div>
                      <div className="text-gray-500 text-sm font-light tracking-wide">Average setup time</div>
                    </div>
                    <div>
                      <div className="text-5xl font-light text-gray-900 mb-3">Zero</div>
                      <div className="text-gray-500 text-sm font-light tracking-wide">Extra headcount needed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Feature Deep Dive Section */}
          <div id="features" className="opacity-0 animate-fade-in-up" style={{
            animationDelay: '500ms'
          }}>
            <FeatureDeepDive />
          </div>

          {/* Testimonials Section */}
          <div id="testimonials" className="opacity-0 animate-fade-in-up" style={{
            animationDelay: '600ms'
          }}>
            <Testimonials />
          </div>

          {/* Pricing Section */}
          <div id="pricing" className="opacity-0 animate-fade-in-up" style={{
            animationDelay: '700ms'
          }}>
            <Pricing />
          </div>

          {/* CTA Section */}
          <div className="py-24 bg-black relative overflow-hidden opacity-0 animate-fade-in-up" style={{
            animationDelay: '800ms'
          }}>
            {/* CTA background layers */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
              <div className="absolute top-0 left-0 w-full h-full opacity-5">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-600 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-green-500 rounded-full blur-3xl"></div>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">Scale Your Team's Communication with AI</h2>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">Join hundreds of startups and small teams using min. to manage customer, vendor, and partner emails without hiring more staff.</p>
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 font-normal px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                <a href="#pricing" onClick={scrollToPricing}>
                  Start your free trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>

          <div className="opacity-0 animate-fade-in" style={{
            animationDelay: '900ms'
          }}>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

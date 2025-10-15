
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import VideoDemo from "@/components/VideoDemo";
import Features from "@/components/Features";
import FeatureDeepDive from "@/components/FeatureDeepDive";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { ArrowRight, Download } from "lucide-react";
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
    "name": "min. - Shared Inbox for Teams and AI Agents",
    "description": "Collaborative inbox built for humans and AI agents. Shared team inbox that auto-triages emails, manages customer communication, and helps lean teams scale without hiring more staff.",
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
        "Shared team inbox",
        "AI-powered email triage",
        "Collaborative email management",
        "AI agent integration",
        "Team collaboration tools",
        "External communication management",
        "Customer relationship tracking"
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
        "name": "What is a shared inbox?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A shared inbox is a collaborative email management system where multiple team members can access, manage, and respond to emails from a single email address. min. provides a shared team inbox with AI-powered features for better collaboration."
        }
      },
      {
        "@type": "Question",
        "name": "How does min. help with team collaboration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "min. provides a collaborative inbox where teams can work together on email management with AI agents that auto-triage messages, draft replies, and help track customer relationships without the complexity of traditional CRM systems."
        }
      },
      {
        "@type": "Question",
        "name": "What makes min. different from other team inbox tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "min. is built for both humans and AI agents, providing seamless integration of AI-powered automation within your shared inbox workflow. It's an anti-CRM approach focused on relationships rather than sales pipelines."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>min. | Shared Team Inbox for Humans and AI Agents</title>
        <meta name="description" content="Collaborative inbox built for teams and AI agents. Shared team inbox that auto-triages emails, manages customer communication, and helps lean teams scale. The anti-CRM for relationship-focused founders." />
        <meta name="keywords" content="shared inbox, collaborative inbox, team inbox, shared team inbox, AI email management, team email collaboration, customer communication, external communication, email automation, AI agents, team collaboration tools, anti-CRM, relationship management, startup email tools, customer inbox" />
        <link rel="canonical" href="https://getmin.ai" />
        
        {/* Enhanced Open Graph tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getmin.ai/" />
        <meta property="og:title" content="min. | Shared Team Inbox for Humans and AI Agents" />
        <meta property="og:description" content="Collaborative inbox built for teams and AI agents. Shared team inbox that manages customer communication and helps lean teams scale." />
        <meta property="og:site_name" content="min." />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="min. | Shared Team Inbox for Humans and AI Agents" />
        <meta name="twitter:description" content="Collaborative inbox for teams and AI agents. Manage customer communication without the complexity of traditional CRMs." />
        
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
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-white to-green-50/20"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
          
          {/* Subtle dot pattern */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 197, 94, 0.4) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
          
          {/* Organic shapes */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-100/10 rounded-full blur-3xl transform -translate-x-48 -translate-y-48"></div>
          <div className="absolute top-1/3 right-0 w-80 h-80 bg-green-200/8 rounded-full blur-3xl transform translate-x-40"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-green-100/12 rounded-full blur-3xl transform translate-y-36"></div>
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
          <main className="pt-40">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12 py-[40px] opacity-0 animate-fade-in" style={{
                animationDelay: '100ms'
              }}>
                <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 leading-tight">
                  The inbox for what's{" "}
                  <span className="text-green-600/90">next</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed font-light">min. is where lean teams and agents get sh*t done - together.</p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                  <Button size="lg" className="bg-green-600/90 hover:bg-green-700/90 text-white px-8 py-3 text-base font-normal" asChild>
                    <a href="#pricing" onClick={scrollToPricing}>
                      <Download className="w-4 h-4 mr-2" />
                      Start free trial
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="px-8 py-3 text-base font-normal border-green-200/50 hover:bg-green-50/50" asChild>
                    <a href="https://app.getmin.ai/demo" target="_blank" rel="noopener noreferrer">
                      Demo Playground
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
                
                <p className="text-gray-500 text-sm flex items-center justify-center gap-2 font-light">
                  <span>🚀</span>
                  Built for teams that automate, not staff up
                </p>
              </div>

              {/* Features above video */}
              <div className="max-w-5xl mx-auto mb-6 opacity-0 animate-fade-in" style={{
                animationDelay: '200ms'
              }}>
                <Features />
              </div>

              {/* Video Demo Section */}
              <div className="max-w-5xl mx-auto mb-6 opacity-0 animate-fade-in" style={{
                animationDelay: '300ms'
              }}>
                <VideoDemo />
              </div>

              {/* Stats section - positioned below video */}
              <div className="max-w-5xl mx-auto opacity-0 animate-fade-in" style={{
                animationDelay: '400ms'
              }}>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100/50 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="text-xl font-medium text-gray-900 mb-1">10x</div>
                      <div className="text-gray-600 text-sm font-light">Faster email processing</div>
                    </div>
                    <div>
                      <div className="text-xl font-medium text-gray-900 mb-1">95%</div>
                      <div className="text-gray-600 text-sm font-light">Accuracy with AI agents</div>
                    </div>
                    <div>
                      <div className="text-xl font-medium text-gray-900 mb-1">50+</div>
                      <div className="text-gray-600 text-sm font-light">Integrations available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Feature Deep Dive Section */}
          <div id="features" className="opacity-0 animate-fade-in" style={{
            animationDelay: '500ms'
          }}>
            <FeatureDeepDive />
          </div>

          {/* Testimonials Section */}
          <div id="testimonials" className="opacity-0 animate-fade-in" style={{
            animationDelay: '600ms'
          }}>
            <Testimonials />
          </div>

          {/* Pricing Section */}
          <div id="pricing" className="opacity-0 animate-fade-in" style={{
            animationDelay: '700ms'
          }}>
            <Pricing />
          </div>

          {/* CTA Section */}
          <div className="py-16 bg-green-600/90 relative overflow-hidden opacity-0 animate-fade-in" style={{
            animationDelay: '800ms'
          }}>
            {/* CTA background layers */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/95 to-green-700/85"></div>
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-white rounded-full blur-xl"></div>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
              <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">Ready to transform your external communication?</h2>
              <p className="text-lg text-green-100/90 mb-8 max-w-2xl mx-auto font-light">Join the min. community to streamline customer, vendor, partner communication.</p>
              <Button size="lg" variant="secondary" className="bg-white/95 text-green-700 hover:bg-white font-normal" asChild>
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

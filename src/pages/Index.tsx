import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import VideoDemo from "@/components/VideoDemo";
import Features from "@/components/Features";
import FeatureDeepDive from "@/components/FeatureDeepDive";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { ArrowRight, Download } from "lucide-react";
const Index = () => {
  return <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Multiple layered backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
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
      
      <div className="relative z-10">
        <div className="opacity-0 animate-fade-in" style={{
        animationDelay: '0ms'
      }}>
          <Header />
        </div>
        
        {/* Hero Section */}
        <main className="pt-40 pb-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12 py-[40px] opacity-0 animate-fade-in" style={{
            animationDelay: '100ms'
          }}>
              <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 leading-tight">
                The inbox for what's{" "}
                <span className="text-green-600/90">next</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed font-light">min is where lean teams and agents get things done - together.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Button size="lg" className="bg-green-600/90 hover:bg-green-700/90 text-white px-8 py-3 text-base font-normal">
                  <Download className="w-4 h-4 mr-2" />
                  Start free trial
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3 text-base font-normal border-green-200/50 hover:bg-green-50/50">
                  View demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <p className="text-gray-500 text-sm flex items-center justify-center gap-2 font-light">
                <span>🚀</span>
                Available for all team sizes, enterprise-ready security
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
        <div className="opacity-0 animate-fade-in" style={{
        animationDelay: '500ms'
      }}>
          <FeatureDeepDive />
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="pb-10 py-[20px] opacity-0 animate-fade-in" style={{
        animationDelay: '600ms'
      }}>
          <Testimonials />
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="pb-20 py-[20px] opacity-0 animate-fade-in" style={{
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
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">
              Ready to transform your team communication?
            </h2>
            <p className="text-lg text-green-100/90 mb-8 max-w-2xl mx-auto font-light">
              Join thousands of teams already using min to streamline their external communication workflow.
            </p>
            <Button size="lg" variant="secondary" className="bg-white/95 text-green-700 hover:bg-white font-normal">
              Start your free trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="opacity-0 animate-fade-in" style={{
        animationDelay: '900ms'
      }}>
          <Footer />
        </div>
      </div>
    </div>;
};
export default Index;

import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import VideoDemo from "@/components/VideoDemo";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { ArrowRight, Download } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <div className="relative z-10">
        <Header />
        
        {/* Hero Section */}
        <main className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 leading-tight">
                The platform for what's{" "}
                <span className="text-green-600">next</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed font-light">
                min is a unified external communication platform that makes it easy for teams to collaborate, 
                offload email tasks to AI agents, and manage communication in a super simple user interface.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base font-normal">
                  <Download className="w-4 h-4 mr-2" />
                  Start free trial
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3 text-base font-normal">
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
            <div className="max-w-5xl mx-auto mb-8">
              <Features />
            </div>

            {/* Video Demo Section */}
            <div className="max-w-5xl mx-auto mb-8">
              <VideoDemo />
            </div>

            {/* Stats section - positioned below video */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
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

        {/* Testimonials Section */}
        <div className="pt-24">
          <Testimonials />
        </div>

        {/* Pricing Section */}
        <div className="pt-24">
          <Pricing />
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-green-600">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">
              Ready to transform your team communication?
            </h2>
            <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto font-light">
              Join thousands of teams already using min to streamline their external communication workflow.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-50 px-8 py-3 text-base font-normal">
              Start your free trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Index;

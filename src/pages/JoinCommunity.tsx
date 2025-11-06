import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Zap, HeadphonesIcon, TrendingUp, AlertCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const JoinCommunity = () => {
  const [searchParams] = useSearchParams();
  const stripeContainerRef = useRef<HTMLDivElement>(null);
  
  const buyButtonId = searchParams.get('buyButtonId');
  const publishableKey = searchParams.get('publishableKey');
  const plan = searchParams.get('plan');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Create the Stripe button on mount
    if (stripeContainerRef.current && buyButtonId && publishableKey) {
      // Clear any existing content
      stripeContainerRef.current.innerHTML = '';
      
      // Create the Stripe button element
      const stripeButton = document.createElement('stripe-buy-button');
      stripeButton.setAttribute('buy-button-id', buyButtonId);
      stripeButton.setAttribute('publishable-key', publishableKey);
      stripeContainerRef.current.appendChild(stripeButton);

      // Wait for button to render and style it
      const checkAndStyle = setInterval(() => {
        const shadowRoot = (stripeButton as any).shadowRoot;
        if (shadowRoot) {
          const button = shadowRoot.querySelector('button');
          if (button) {
            // Apply green styling directly to the button
            button.style.backgroundColor = 'rgb(22, 163, 74)';
            button.style.color = 'white';
            button.style.padding = '1.5rem 2rem';
            button.style.fontSize = '1.125rem';
            button.style.fontWeight = '500';
            button.style.borderRadius = '0.5rem';
            button.style.border = 'none';
            button.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
            button.style.cursor = 'pointer';
            button.style.transition = 'background-color 0.2s';
            
            // Add hover effect
            button.addEventListener('mouseenter', () => {
              button.style.backgroundColor = 'rgb(21, 128, 61)';
            });
            button.addEventListener('mouseleave', () => {
              button.style.backgroundColor = 'rgb(22, 163, 74)';
            });
            
            clearInterval(checkAndStyle);
          }
        }
      }, 100);

      // Clean up interval after 5 seconds
      setTimeout(() => clearInterval(checkAndStyle), 5000);
    }
  }, [buyButtonId, publishableKey]);

  const discordBenefits = [
    {
      icon: <MessageCircle className="w-6 h-6 text-green-600" />,
      title: "Answers Within Minutes",
      description: "Skip the email back-and-forth. Get instant help from our team and community members."
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6 text-blue-600" />,
      title: "Direct Team Support",
      description: "Chat directly with our founders and engineering team for personalized guidance."
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-600" />,
      title: "Early Access",
      description: "Be the first to test new features and shape the future of min. with your feedback."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />,
      title: "Product Updates",
      description: "Stay informed about the latest releases, improvements, and roadmap changes."
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-red-600" />,
      title: "Instant Bug Reports",
      description: "Report issues directly and get real-time updates on fixes as they happen."
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      title: "Feature Requests",
      description: "Share your ideas and vote on features you want to see built next."
    }
  ];


  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Helmet>
        <title>Join the min. Community | Get Started - free</title>
        <meta name="description" content="Join our Discord community for instant support, early access to features, and direct communication with the team." />
        <script async src="https://js.stripe.com/v3/buy-button.js"></script>
      </Helmet>

      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-white to-blue-50/20"></div>
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
          <div className="max-w-5xl mx-auto px-6">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="flex justify-center mb-8">
                <div className="font-medium text-6xl md:text-7xl text-gray-900">
                  min.
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 leading-tight">
                Before you start your trial...
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light mb-4">
                Join our <a href="https://discord.gg/2prAr9qAwG" target="_blank" rel="noopener noreferrer" className="text-green-600/90 font-medium hover:text-green-700 underline decoration-green-600/30 hover:decoration-green-700 transition-colors">Discord community</a> to get the most out of min.
              </p>
              
              <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
                Trusted by founders and teams who value instant support and direct access to the team building their tools.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {discordBenefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-gray-100/60 hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 p-10 rounded-2xl border border-green-100/60 shadow-lg mb-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  You're one click away from joining
                </h2>
                <p className="text-gray-600 leading-relaxed max-w-xl mx-auto">
                  Our community is where min. comes to life. Get instant answers, shape the product, and connect with other lean teams.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
                <Button 
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium shadow-lg h-auto rounded-lg flex items-center justify-center"
                  style={{ padding: '1px 2rem', fontSize: '0.98rem', fontWeight: '400', height: '45px' }}
                  asChild
                >
                  <a href="https://discord.gg/2prAr9qAwG" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Join Discord Community
                  </a>
                </Button>
                
                <div ref={stripeContainerRef} className="stripe-trial-button flex items-center"></div>
              </div>
            </div>

          </div>
        </main>

        <Footer />
      </div>

      <style>{`
        .stripe-trial-button {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        
        /* Override Stripe button styles using ::part if available, otherwise deep selectors */
        stripe-buy-button {
          --button-background: rgb(22, 163, 74) !important;
          --button-hover-background: rgb(21, 128, 61) !important;
          --button-text-color: white !important;
          --button-border-radius: 0.5rem !important;
          --button-font-size: 1.125rem !important;
          --button-font-weight: 500 !important;
          --button-padding: 1.5rem 2rem !important;
        }
      `}</style>
    </div>
  );
};

export default JoinCommunity;


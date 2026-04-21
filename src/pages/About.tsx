import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Target, Lightbulb, Linkedin, X, BookOpen } from "lucide-react";
import { useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About min. - Meet the Founder and Our Mission",
    "description": "Learn about min.'s founder Eric Wang, and our mission to give every company a shared brain built from the emails their people already send.",
    "url": "https://getmin.ai/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "min.",
      "description": "Your company's shared brain",
      "founder": [
        {
          "@type": "Person",
          "name": "Eric Wang",
          "jobTitle": "CEO & Co-Founder"
        },

      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>About min. | The Team Giving Your Company a Shared Brain</title>
        <meta name="description" content="Learn about min.'s founder Eric Wang, and our mission to give every company a Collective Memory built from the emails their people already send." />
        <meta name="keywords" content="min. founder, Eric Wang, AI communication startup, collective memory, email automation team" />
        <link rel="canonical" href="https://getmin.ai/about" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* ... keep existing code (background layers) */}
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
                <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 leading-tight">
                  About <span className="text-green-600/90">min.</span> by Siege AI
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                  Your company doesn't have a memory. min. gives it one. One email at a time.
                </p>
              </div>

              {/* Founders Section */}
              <div className="mb-16">
                <h2 className="text-2xl font-normal text-gray-900 mb-8 text-center">Meet the Founder</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="bg-white/90 backdrop-blur-sm border border-green-100/60 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src="/lovable-uploads/a08e6a56-3aaf-4f91-b83a-909a4d24b497.png" alt="Eric Wang, CEO & Co-Founder of min." />
                          <AvatarFallback>EW</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-medium text-gray-900">Eric Wang</h3>
                            <div className="flex items-center gap-1">
                              <a href="https://www.linkedin.com/in/zizhouwang/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Eric Wang's LinkedIn profile">
                                <Linkedin className="w-4 h-4 text-blue-600" />
                              </a>
                              <a href="https://x.com/ericzizhouwangx" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Eric Wang's Twitter profile">
                                <X className="w-4 h-4 text-blue-600" />
                              </a>
                              <a href="https://ericzizhouw.substack.com/?r=3nhquu&utm_campaign=pub-share-checklist" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Eric Wang's Substack">
                                <BookOpen className="w-4 h-4 text-orange-600" />
                              </a>
                            </div>
                          </div>
                          <p className="text-sm text-green-600 font-medium">CEO & Co-Founder</p>
                          <p className="text-xs text-gray-500">University of Toronto</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">⚙️ Builder. Product thinker. AI optimist. Eric has spent the last decade launching and scaling products at Coursera, Bbot, and DoorDash itself. From 0→1 startups to high-growth platforms, he's all about solving messy, real-world problems with simple, scalable solutions. At min., he's focused on giving every company a shared brain built from the emails their people already send. Loves fast prototypes, clean UX.</p>
                    </CardContent>
                  </Card>

                </div>
              </div>

              {/* ... keep existing code (mission, team, vision sections and story section) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-sm border border-green-100/60 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-normal text-gray-900">Our Mission</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">
                    Turn the real business running in your team's inboxes into a Collective Memory the whole company can search, act on, and build on. Nothing your team learns should ever get lost again.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-sm border border-green-100/60 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-normal text-gray-900">Our Team</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">
                    Scrappy founders who've lived in the inbox. We know the pain of every commitment, rate, and follow-up living in someone's head, until min. finally logs it.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-sm border border-green-100/60 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-normal text-gray-900">Our Vision</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">Every company compounds financial capital. Almost none compound what their people know. min. builds the Collective Memory that finally does. No bloat, no CRM hygiene tax, just the intelligence your team already earned.</p>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8">
                <h2 className="text-2xl font-normal text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed font-light">
                  <p className="font-medium text-gray-900">We promised 30-minute replies. Then our inbox exploded.</p>
                  <p>We're serial founders. We got sick of the shared inbox: real customer emails lost in newsletters, support spam, and random signups. So we promised every user a reply within 30 minutes during business hours.</p>
                  <p className="font-medium text-gray-900">Customers loved it. Our inbox did not.</p>
                  <p>We took shifts and glued together scripts. We still nearly missed important messages. So we built a tool for ourselves: it watched the inbox, read every thread, drafted the reply, and pinged us only when a real customer wrote in.</p>
                  <p className="font-medium text-gray-900">That tool became min.</p>
                  <p>Now every company we work with uses min. to turn their inbox into a Collective Memory, one that the whole team can search, act on, and build on. Nothing they learn ever gets lost again.</p>
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default About;

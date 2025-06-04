import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Target, Lightbulb, Linkedin, X } from "lucide-react";
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
    "name": "About min. - Meet the Founders and Our Mission",
    "description": "Learn about min.'s founders Eric Wang and Sebastian Ferguson, and our mission to give fast-moving teams superpowers through AI-powered communication tools.",
    "url": "https://getmin.ai/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "min.",
      "description": "Inbox for humans and agents",
      "founder": [
        {
          "@type": "Person",
          "name": "Eric Wang",
          "jobTitle": "CEO & Co-Founder"
        },
        {
          "@type": "Person", 
          "name": "Sebastian Ferguson",
          "jobTitle": "CTO & Co-Founder"
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>About min. | Meet the Founders Building the Future of Communication</title>
        <meta name="description" content="Learn about min.'s founders Eric Wang and Sebastian Ferguson, and our mission to give fast-moving teams superpowers through AI-powered communication tools." />
        <meta name="keywords" content="min founders, Eric Wang, Sebastian Ferguson, AI communication startup, email automation team" />
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
                  Built by founders, for founders. We're solving the communication chaos that slows down fast-moving teams.
                </p>
              </div>

              {/* Founders Section */}
              <div className="mb-16">
                <h2 className="text-2xl font-normal text-gray-900 mb-8 text-center">Meet the Founders</h2>
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
                            </div>
                          </div>
                          <p className="text-sm text-green-600 font-medium">CEO & Co-Founder</p>
                          <p className="text-xs text-gray-500">University of Toronto</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">⚙️ Builder. Product thinker. AI optimist. Eric has spent the last decade launching and scaling products at Coursera, Bbot, and DoorDash itself. From 0→1 startups to high-growth platforms, he's all about solving messy, real-world problems with simple, scalable solutions. At min., he's focused on giving superpowers to other founders just like him — without overhyping the buzzwords. Loves fast prototypes, clean UX.</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 backdrop-blur-sm border border-green-100/60 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src="/lovable-uploads/64a4e6b8-c742-42a4-9227-12da884d2dbc.png" alt="Sebastian Ferguson, CTO & Co-Founder of min." />
                          <AvatarFallback>SF</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-medium text-gray-900">Sebastian Ferguson</h3>
                            <a href="https://www.linkedin.com/in/snferguson/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Sebastian Ferguson's LinkedIn profile">
                              <Linkedin className="w-4 h-4 text-blue-600" />
                            </a>
                          </div>
                          <p className="text-sm text-green-600 font-medium">CTO & Co-Founder</p>
                          <p className="text-xs text-gray-500">University of Waterloo</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">🧠 Code whisperer. Math nerd. AI realist.
Seb brings 10+ years of engineering firepower to the team, with hands-on experience from DoorDash, Bbot, and healthcare R&D at Sunnybrook. Whether he's diving deep into C++ or designing secure, high-performance systems, he's focused on building software that scales, lasts, and just makes sense. Big fan of clean APIs, clear documentation, and the occasional well-earned beer.</p>
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
                    Give fast-moving teams superpowers. Automate the chaos of external communication so founders can focus on building.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-sm border border-green-100/60 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-normal text-gray-900">Our Team</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">
                    Scrappy founders who've been there. We know the pain of juggling communication while trying to ship products.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-sm border border-green-100/60 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-normal text-gray-900">Our Vision</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">Every lean team has a team of email agents right in their inbox. No bloat, no complexity—just the essentials that work.</p>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8">
                <h2 className="text-2xl font-normal text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed font-light">
                  <p>We've been there. As serial founders building startups, we lived the same frustrations every day: drowning in communication chaos while trying to ship products that matter.</p>
                  <p>
                    <strong>What to say. Who to say it to. When to follow up. How to follow up.</strong> The endless mental overhead of managing external communication was killing our momentum.
                  </p>
                  <p>We tried everything—bloated CRMs, hard to use helpdesks, complex automation tools, hiring more people. Nothing felt right. Everything was either too complicated or missed the mark entirely.</p>
                  <p>
                    So we built min. For founders like us who need something that just works. No bloat. No complexity. Just the communication superpowers that lean teams actually need.
                  </p>
                  <p>
                    Today, lean startup teams use min. to cut through the noise and focus on what matters: building great products. We love it.
                  </p>
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

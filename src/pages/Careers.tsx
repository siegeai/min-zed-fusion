import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openings = [
    {
      title: "Senior Frontend Engineer",
      location: "Remote",
      type: "Full-time",
      description: "Help us build the future of communication interfaces with React, TypeScript, and modern web technologies."
    },
    {
      title: "AI/ML Engineer",
      location: "San Francisco, CA",
      type: "Full-time", 
      description: "Develop and optimize AI agents that understand context and automate communication workflows."
    },
    {
      title: "Product Designer",
      location: "Remote",
      type: "Full-time",
      description: "Design intuitive experiences that make complex communication workflows feel simple and natural."
    },
    {
      title: "Customer Success Manager",
      location: "New York, NY",
      type: "Full-time",
      description: "Help our customers succeed with min. and drive product improvements based on real-world feedback."
    }
  ];

  const benefits = [
    "Competitive salary and equity",
    "Comprehensive health, dental, and vision insurance",
    "Flexible PTO and parental leave",
    "Remote-first culture with optional office access",
    "Learning and development budget",
    "Latest equipment and tools"
  ];

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
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 leading-tight">
                Join the <span className="text-green-600/90">min.</span> team
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                Help us build the future of communication for lean teams that want to automate, not staff up.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-normal text-gray-900 mb-8">Open Positions</h2>
                <div className="space-y-6">
                  {openings.map((job, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-sm border border-green-100/60 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h3 className="text-lg font-normal text-gray-900 mb-2 sm:mb-0">{job.title}</h3>
                        <Button variant="outline" className="border-green-200/50 hover:bg-green-50/50 font-normal self-start sm:self-auto">
                          Apply
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed font-light">
                        {job.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-normal text-gray-900 mb-8">Why min.?</h2>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-sm border border-green-100/60 shadow-sm">
                  <h3 className="text-lg font-normal text-gray-900 mb-4">Benefits & Perks</h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="text-gray-600 text-sm font-light flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-sm border border-green-100/60 shadow-sm mt-6">
                  <h3 className="text-lg font-normal text-gray-900 mb-4">Our Culture</h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">
                    We're a tight-knit team that values transparency, continuous learning, and building products that actually solve real problems. We believe the best work happens when people feel empowered to do their best work.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-600/90 rounded-sm p-8 text-center text-white">
              <h2 className="text-2xl font-normal mb-4">Don't see a role that fits?</h2>
              <p className="text-green-100/90 mb-6 font-light">
                We're always looking for talented people who share our vision. Send us your resume and tell us how you'd like to contribute.
              </p>
              <Button variant="secondary" className="bg-white/95 text-green-700 hover:bg-white font-normal">
                Get in touch
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

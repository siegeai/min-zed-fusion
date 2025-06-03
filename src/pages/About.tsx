
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Target, Lightbulb } from "lucide-react";

const About = () => {
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
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 leading-tight">
                About <span className="text-green-600/90">min.</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                We're building the future of external communication for lean teams that want to automate, not staff up.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-sm border border-green-100/60 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-normal text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed font-light">
                  To eliminate the chaos of external communication by creating the first truly AI-native platform that helps teams collaborate seamlessly.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-sm border border-green-100/60 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-normal text-gray-900">Our Team</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed font-light">
                  A passionate group of engineers, designers, and communication experts who believe in the power of simple, effective tools.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-sm border border-green-100/60 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-normal text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed font-light">
                  A world where every team can focus on what matters most, while AI handles the routine communication tasks that slow them down.
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border border-green-100/60 p-8">
              <h2 className="text-2xl font-normal text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed font-light">
                <p>
                  min. was born from a simple observation: teams spend too much time managing communication instead of building great products. We watched talented teams get bogged down in email threads, lose context switching between tools, and struggle to maintain consistent external communication.
                </p>
                <p>
                  We knew there had to be a better way. That's why we built min. - the first platform designed from the ground up for AI-human collaboration in external communication.
                </p>
                <p>
                  Today, hundreds of teams use min. to streamline their customer, vendor, and partner communications, freeing them to focus on what they do best.
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default About;

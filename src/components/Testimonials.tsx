
import { useState } from "react";
import TestimonialAvatarGenerator from "./TestimonialAvatarGenerator";

const Testimonials = () => {
  const [showGenerator, setShowGenerator] = useState(false);
  const [avatarImages, setAvatarImages] = useState<{ [key: number]: string }>({});

  const testimonials = [{
    quote: "min. transformed how our team handles external communication. What used to take hours now happens automatically with their AI agents.",
    author: "Sarah Chen",
    role: "Head of Operations",
    company: "TechFlow Inc"
  }, {
    quote: "The unified interface is a game-changer. No more juggling between different tools - everything we need is in one place.",
    author: "Marcus Rodriguez",
    role: "Co-founder",
    company: "StartupLabs"
  }, {
    quote: "Our team productivity increased by 40% after implementing min. The AI handles routine emails perfectly.",
    author: "Emily Watson",
    role: "Project Manager",
    company: "Digital Ventures"
  }];

  const handleAvatarGenerated = (imageUrl: string, testimonialIndex: number) => {
    setAvatarImages(prev => ({
      ...prev,
      [testimonialIndex]: imageUrl
    }));
  };

  return <div id="testimonials" className="py-16 bg-white relative">
      {/* Subtle background layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/20 via-white to-green-50/10"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
            Trusted by teams worldwide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            See how teams are transforming their communication workflows with min.
          </p>
          
          <button
            onClick={() => setShowGenerator(!showGenerator)}
            className="mt-4 text-sm text-green-600 hover:text-green-700 underline"
          >
            {showGenerator ? 'Hide' : 'Show'} Avatar Generator
          </button>
        </div>

        {showGenerator && (
          <TestimonialAvatarGenerator onImageGenerated={handleAvatarGenerated} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <div key={index} className="bg-green-100/17 backdrop-blur-sm p-8 border-2 border-grey-100/40 rounded-none">
              <blockquote className="text-gray-700 mb-6 leading-relaxed font-light">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100/40 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  {avatarImages[index] ? (
                    <img 
                      src={avatarImages[index]} 
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-green-600/80 font-medium text-lg">
                      {testimonial.author.split(" ").map(n => n[0]).join("")}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-600 text-sm font-light">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};

export default Testimonials;

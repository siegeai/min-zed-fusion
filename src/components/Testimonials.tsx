
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Testimonials = () => {
  const testimonials = [{
    quote: "min. really elevated how our team handles comms. What used to take hours now happens automatically with a mix of humans and AI agents.",
    author: "Sarah Chen",
    role: "Head of Product",
    company: "TechFlow Inc",
    avatar: "/lovable-uploads/586a429a-b9f9-4ebf-ae6f-b5b1462ced42.png"
  }, {
    quote: "Everything in one place is a game-changer. No more juggling between different tools/tabs/spreadsheets - everything we need is right there.",
    author: "Marcus Rodriguez",
    role: "Co-founder",
    company: "StartupLabs",
    avatar: "/lovable-uploads/e00d3919-3cc6-491f-b466-df6e3f49951f.png"
  }, {
    quote: "We really love our Lanes! We further divide them into sub-lanes which then gets an owner, what a useful concept!",
    author: "Emily Watson",
    role: "Project Manager",
    company: "Digital Ventures",
    avatar: "/lovable-uploads/7881779d-f863-4f54-8cf0-9e132b8ae3ca.png"
  }];

  return <div id="testimonials" className="py-16 bg-white relative">
      {/* Subtle background layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/20 via-white to-green-50/10"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
            Trusted by founding teams
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            See how teams are transforming their communication workflows with min.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <div key={index} className="bg-green-100/17 backdrop-blur-sm p-8 border-2 border-grey-100/40 rounded-none">
              <blockquote className="text-gray-700 mb-6 leading-relaxed font-light">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                {testimonial.avatar ? (
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    <AvatarFallback className="bg-green-100/40 text-green-600/80 font-medium text-lg">
                      {testimonial.author.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-12 h-12 bg-green-100/40 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600/80 font-medium text-lg">
                      {testimonial.author.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                )}
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

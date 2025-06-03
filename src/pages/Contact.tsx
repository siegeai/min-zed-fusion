
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-green-600" />,
      title: "Email Us",
      description: "Get in touch for general inquiries",
      contact: "hello@getmin.ai",
      action: "Send email"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-green-600" />,
      title: "Support",
      description: "Need help with your account?",
      contact: "support@getmin.ai",
      action: "Get support"
    },
    {
      icon: <Phone className="w-6 h-6 text-green-600" />,
      title: "Sales",
      description: "Ready to get started?",
      contact: "sales@getmin.ai",
      action: "Contact sales"
    }
  ];

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const company = formData.get('company') as string;
    const message = formData.get('message') as string;
    
    const subject = `Message from ${name}${company ? ` (${company})` : ''}`;
    const body = `Name: ${name}\nEmail: ${email}${company ? `\nCompany: ${company}` : ''}\n\nMessage:\n${message}`;
    
    const mailtoLink = `mailto:hello@getmin.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

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
                Get in <span className="text-green-600/90">touch</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                Have questions about min.? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-sm border border-green-100/60 shadow-sm">
                <h2 className="text-2xl font-normal text-gray-900 mb-6">Send us a message</h2>
                <form className="space-y-6" onSubmit={handleSendMessage}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-normal text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-green-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-normal text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-green-500 transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-normal text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-green-500 transition-colors"
                      placeholder="Company Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-normal text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-green-500 transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full bg-green-600/90 hover:bg-green-700/90 text-white font-normal">
                    Send message
                  </Button>
                </form>
              </div>

              {/* Contact Methods */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-normal text-gray-900 mb-6">Other ways to reach us</h2>
                  <div className="space-y-6">
                    {contactMethods.map((method, index) => (
                      <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-sm border border-green-100/60 shadow-sm">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            {method.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-normal text-gray-900 mb-1">{method.title}</h3>
                            <p className="text-gray-600 text-sm font-light mb-2">{method.description}</p>
                            <p className="text-gray-900 text-sm mb-3">{method.contact}</p>
                            <Button variant="outline" size="sm" className="border-green-200/50 hover:bg-green-50/50 font-normal">
                              {method.action}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;

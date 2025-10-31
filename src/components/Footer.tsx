
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: targetId } });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <footer className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <span className="font-light text-2xl tracking-tight">min.</span>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed font-light">The AI-powered inbox for humans and agents, helping teams auto-triage emails, draft replies, and scale without hiring more staff.</p>
          </div>

          <div>
            <h3 className="font-light mb-6 text-sm tracking-wide uppercase">Product</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a 
                  href="#features" 
                  className="hover:text-white transition-colors font-light text-sm"
                  onClick={(e) => handleNavClick(e, 'features')}
                  aria-label="View min. features"
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#pricing" 
                  className="hover:text-white transition-colors font-light text-sm"
                  onClick={(e) => handleNavClick(e, 'pricing')}
                  aria-label="View min. pricing"
                >
                  Pricing
                </a>
              </li>
              <li><Link to="/security" className="hover:text-white transition-colors font-light text-sm">Security</Link></li>
              <li><a href="https://app.getmin.ai/demo" className="hover:text-white transition-colors font-light text-sm">Demo</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-light mb-6 text-sm tracking-wide uppercase">Company</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors font-light text-sm">Siege AI</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors font-light text-sm">Blog</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors font-light text-sm">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors font-light text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-light mb-6 text-sm tracking-wide uppercase">Community</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a 
                  href="https://discord.gg/2prAr9qAwG" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-light text-sm"
                >
                  Discord
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com/getminai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-light text-sm"
                >
                  X
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/min-box" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-light text-sm"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/getmin.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-light text-sm"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm font-light">© 2025 min. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm font-light">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm font-light">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

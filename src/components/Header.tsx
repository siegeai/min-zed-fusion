
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      // If already on home page, scroll to top instead of navigating
      e.preventDefault();
      console.log("Logo clicked - scrolling to top");
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    // If not on home page, let the Link component handle navigation to "/"
  };

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
    <header 
      className="w-full px-8 py-5 bg-white/80 backdrop-blur-xl border-b border-gray-100/60" 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 100 
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <div className="flex items-center space-x-2">
            <Link 
              to="/" 
              className="font-light text-2xl text-gray-900 hover:text-gray-700 transition-colors tracking-tight"
              onClick={handleLogoClick}
            >
              min.
            </Link>
          </div>
          
          
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              className="text-gray-500 hover:text-gray-900 text-sm font-light transition-colors"
              onClick={(e) => handleNavClick(e, 'features')}
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className="text-gray-500 hover:text-gray-900 text-sm font-light transition-colors"
              onClick={(e) => handleNavClick(e, 'testimonials')}
            >
              Testimonials
            </a>
            <a 
              href="#pricing" 
              className="text-gray-500 hover:text-gray-900 text-sm font-light transition-colors"
              onClick={(e) => handleNavClick(e, 'pricing')}
            >
              Pricing
            </a>
            <Link to="/blog" className="text-gray-500 hover:text-gray-900 text-sm font-light transition-colors">
              Blog
            </Link>
            <Link to="/careers" className="text-gray-500 hover:text-gray-900 text-sm font-light transition-colors">
              Careers
            </Link>
            <Link to="/contact" className="text-gray-500 hover:text-gray-900 text-sm font-light transition-colors">
              Contact
            </Link>
            <a href="https://app.getmin.ai/demo" className="text-gray-500 hover:text-gray-900 text-sm font-light transition-colors">
              Demo
            </a>
          </nav>
        </div>

        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-500 hover:text-gray-900 font-light" asChild>
            <a href="https://app.getmin.ai">Log in</a>
          </Button>
          <Button className="bg-black hover:bg-gray-900 text-white font-light rounded-full px-6 transition-all duration-300" asChild>
            <a 
              href="#pricing" 
              onClick={(e) => handleNavClick(e, 'pricing')}
              className="w-full h-full flex items-center justify-center"
            >
              Get Started
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

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
      className="w-full px-6 py-4 bg-white/95 backdrop-blur-md border-b border-green-100/40 shadow-sm" 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 100 
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Link 
              to="/" 
              className="font-medium text-xl text-gray-900 hover:text-green-600 transition-colors"
              onClick={handleLogoClick}
            >
              min:
            </Link>
          </div>
          
          
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#features" 
              className="text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors"
              onClick={(e) => handleNavClick(e, 'features')}
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className="text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors"
              onClick={(e) => handleNavClick(e, 'testimonials')}
            >
              Testimonials
            </a>
            <a 
              href="#pricing" 
              className="text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors"
              onClick={(e) => handleNavClick(e, 'pricing')}
            >
              Pricing
            </a>
            <a href="/demo" className="text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors">
              Demo
            </a>
          </nav>
        </div>

        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-normal">
            Log in
          </Button>
          <Button className="bg-green-600/90 hover:bg-green-700/90 text-white font-normal">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

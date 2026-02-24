import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";


const Header = () => {
  const location = useLocation();

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
              min.
            </Link>
          </div>
          
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors">
              Contact
            </Link>
            <Link to="/careers" className="text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors">
              Careers
            </Link>
          </nav>
        </div>

        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-normal" asChild>
            <a href="https://app.getmin.ai">Log in</a>
          </Button>
          <Button className="bg-green-600/90 hover:bg-green-700/90 text-white font-normal">
            <a 
              href="https://app.getmin.ai/" 
              className="w-full h-full flex items-center justify-center"
            >
              Get started free
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

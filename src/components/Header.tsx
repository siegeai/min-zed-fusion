
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full px-6 py-4 bg-white/90 backdrop-blur-md border-b border-green-100/40 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-xl text-gray-900">min.</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors">
              Testimonials
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors">
              Pricing
            </a>
            <a href="#docs" className="text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors">
              Docs
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

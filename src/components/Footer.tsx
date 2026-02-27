
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#111820", borderTop: "1px solid rgba(255,255,255,0.06)" }} className="text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="">
              <span className="font-semibold text-xl">min.</span>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed">
              AI that reads your emails and does what you tell it. Rate lookups, carrier blasts, shipment tracking, follow-ups, and morning briefings. In plain English.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Teams</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/teams/operations" className="hover:text-white transition-colors">Operations</Link></li>
              <li><Link to="/teams/sales" className="hover:text-white transition-colors">Sales</Link></li>
              <li><Link to="/teams/management" className="hover:text-white transition-colors">Management</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Industries</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/brokers" className="hover:text-white transition-colors">Brokers</Link></li>
              <li><Link to="/shippers" className="hover:text-white transition-colors">Shippers</Link></li>
              <li><Link to="/3pl" className="hover:text-white transition-colors">3PLs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a 
                  href="https://discord.gg/2prAr9qAwG" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com/getminai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  X
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/min-box" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/getmin.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2026 min. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

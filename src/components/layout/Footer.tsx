import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tractor, MapPin, Mail, Phone } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-green-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Logo size="md" showText={true} textColor="white" />
            </div>
            <p className="text-neutral-400 mb-4">
              Connecting farmers with transport providers for efficient agricultural logistics.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-green-200">
                <MapPin className="h-4 w-4 text-green-400" />
                <span>123 AgriTech Street, Marrakech, Morocco</span>
              </div>
              <div className="flex items-center space-x-2 text-green-200">
                <Mail className="h-4 w-4 text-green-400" />
                <a href="mailto:info@agrimove.com" className="hover:text-green-400">
                  info@agrimove.com
                </a>
              </div>
              <div className="flex items-center space-x-2 text-green-200">
                <Phone className="h-4 w-4 text-green-400" />
                <a href="tel:+212612345678" className="hover:text-green-400">
                  +212 612 345 678
                </a>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-primary-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-primary-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-400 hover:text-primary-400">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-primary-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-neutral-400 hover:text-primary-400">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* For Farmers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Farmers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/how-it-works-farmers" className="text-neutral-400 hover:text-primary-400">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-neutral-400 hover:text-primary-400">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/request-transport" className="text-neutral-400 hover:text-primary-400">
                  Request Transport
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-neutral-400 hover:text-primary-400">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>
          
          {/* For Transporters */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Transporters</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/how-it-works-transporters" className="text-neutral-400 hover:text-primary-400">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/requirements" className="text-neutral-400 hover:text-primary-400">
                  Requirements
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-neutral-400 hover:text-primary-400">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/transporter-benefits" className="text-neutral-400 hover:text-primary-400">
                  Benefits
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom footer */}
        <div className="border-t border-neutral-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} AgriMove. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-neutral-400 hover:text-primary-400 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-neutral-400 hover:text-primary-400 text-sm">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-neutral-400 hover:text-primary-400 text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
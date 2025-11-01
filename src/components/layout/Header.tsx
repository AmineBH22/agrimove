import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Bell, Globe, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';
import Logo from '../ui/Logo';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' },
  { code: 'ber', name: 'ⵜⴰⵎⴰⵣⵉⵖⵜ' },
];

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleLanguageMenu = () => setIsLanguageMenuOpen(!isLanguageMenuOpen);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLanguageMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg border-b border-agri-light/30">
      <div className="max-w-7xl mx-auto px-container">
        <div className="flex justify-between items-center h-20">
          {/* Logo and site name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo size="md" showText={true} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/services" className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
              Services
            </Link>
            <Link to="/marketplace" className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
              Marketplace
            </Link>
            <Link to="/demo-info" className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
              Demo Data
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                  {t('common.dashboard')}
                </Link>
                
                {user?.role === 'farmer' && (
                  <>
                    <Link to="/request-transport" className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                      {t('farmer.requestTransport')}
                    </Link>
                    <Link to="/track-shipment" className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                      {t('farmer.trackShipment')}
                    </Link>
                  </>
                )}
                
                {user?.role === 'transporter' && (
                  <>
                    <Link to="/available-requests" className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                      {t('transporter.availableRequests')}
                    </Link>
                    <Link to="/my-vehicles" className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                      {t('transporter.myVehicles')}
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link to="/login" className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                  {t('common.login')}
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    {t('common.register')}
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Right side elements: notifications, language, user menu */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && (
              <button 
                className="p-2 rounded-full text-neutral-700 hover:bg-neutral-100"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </button>
            )}
            
            {/* Language selector */}
            <div className="relative">
              <button 
                className="p-2 rounded-full text-neutral-700 hover:bg-neutral-100 flex items-center"
                onClick={toggleLanguageMenu}
                aria-label="Language selector"
              >
                <Globe className="h-5 w-5" />
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === lang.code ? 'bg-primary-50 text-primary-600' : 'text-neutral-700 hover:bg-neutral-50'}`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* User menu */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-neutral-100"
                  onClick={toggleUserMenu}
                >
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-neutral-900">{user?.name}</p>
                      <p className="text-xs text-neutral-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {t('common.profile')}
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {t('common.settings')}
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-error-DEFAULT hover:bg-neutral-50"
                      onClick={handleLogout}
                    >
                      <div className="flex items-center space-x-2">
                        <LogOut className="h-4 w-4" />
                        <span>{t('common.logout')}</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="p-2 rounded-md text-neutral-700 hover:bg-neutral-100"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Common navigation for all users */}
            <Link
              to="/services"
              className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/marketplace"
              className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              to="/demo-info"
              className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Demo Data
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.dashboard')}
                </Link>
                
                {user?.role === 'farmer' && (
                  <>
                    <Link
                      to="/request-transport"
                      className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('farmer.requestTransport')}
                    </Link>
                    <Link
                      to="/track-shipment"
                      className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('farmer.trackShipment')}
                    </Link>
                  </>
                )}
                
                {user?.role === 'transporter' && (
                  <>
                    <Link
                      to="/available-requests"
                      className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('transporter.availableRequests')}
                    </Link>
                    <Link
                      to="/my-vehicles"
                      className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('transporter.myVehicles')}
                    </Link>
                  </>
                )}
                
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.profile')}
                </Link>
                
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-error-DEFAULT hover:bg-error-light/10 transition-all duration-200"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <LogOut className="h-4 w-4" />
                    <span>{t('common.logout')}</span>
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.login')}
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary-500 text-white hover:bg-primary-600 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.register')}
                </Link>
              </>
            )}
            
            {/* Language options */}
            <div className="px-3 py-2 border-t border-neutral-200">
              <p className="text-sm font-medium text-neutral-500 mb-2">{t('common.language')}</p>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setIsMenuOpen(false);
                    }}
                    className={`px-2 py-1 text-sm rounded ${i18n.language === lang.code ? 'bg-primary-50 text-primary-600' : 'text-neutral-700 hover:bg-neutral-50'}`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
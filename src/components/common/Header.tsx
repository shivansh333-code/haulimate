import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Truck, Globe, Menu, X, User, LogOut, ShieldCheck, ChevronRight, Phone, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { authService } from '../../services/authService';

export const Header: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentUser = authService.getCurrentUser();

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/for-drivers', label: t('nav.forDrivers') },
    { to: '/for-transporters', label: t('nav.forTransporters') },
    { to: '/how-it-works', label: t('nav.howItWorks') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const getDashboardPath = (role: string) => {
    switch (role) {
      case 'driver': return '/driver';
      case 'owner': return '/owner';
      case 'admin': return '/admin';
      default: return '/';
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF6EC]/95 backdrop-blur-sm border-b border-[#1B3A6B]/15 shadow-xs">
      {/* Top Highway Support Strip */}
      <div className="bg-[#1B3A6B] text-white text-xs py-1.5 px-4 sm:px-6 border-b border-[#F5C400]/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-white/90 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-[#F5C400]">यूनिफ़ॉर्मड व वेरीफाइड ड्राइवर्स:</span>
            <span className="hidden sm:inline">24x7 हाईवे हेल्पलाइन व त्वरित रिप्लेसमेंट</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold ml-auto">
            <a 
              href="https://wa.me/917018709616" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: 7018709616</span>
            </a>

            <span className="text-white/30 hidden xs:inline">|</span>

            <a 
              href="tel:+918527977238" 
              className="flex items-center gap-1.5 text-[#F5C400] hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: 8527977238</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Slogan */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-12 h-12 rounded-xl bg-[#1B3A6B] flex items-center justify-center text-[#F5C400] shadow-md border border-[#F4741F]/40 group-hover:scale-105 transition-transform">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold font-baloo tracking-tight text-[#1B3A6B]">
                  Hauli<span className="text-[#F4741F]">Mate</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#F5C400]/30 text-[#1B3A6B] border border-[#F5C400]">
                  INDIA
                </span>
              </div>
              <p className="text-xs font-semibold text-[#1B3A6B]/80 tracking-wide font-mukta -mt-1 hidden sm:block">
                {t('common.northStar')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-md text-base font-semibold transition-colors ${
                    isActive
                      ? 'text-[#F4741F] bg-[#F4741F]/10'
                      : 'text-[#1B3A6B] hover:text-[#F4741F] hover:bg-[#1B3A6B]/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#1B3A6B]/30 bg-white/80 hover:bg-white text-[#1B3A6B] text-sm font-bold shadow-2xs cursor-pointer active:scale-95 transition-all"
              title="हिंदी / English"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4 text-[#F4741F]" />
              <span className={language === 'hi' ? 'font-bold text-[#F4741F]' : 'text-[#1B3A6B]/60'}>हिंदी</span>
              <span className="text-gray-300">|</span>
              <span className={language === 'en' ? 'font-bold text-[#1B3A6B]' : 'text-[#1B3A6B]/60'}>EN</span>
            </button>

            {/* Auth Buttons */}
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to={getDashboardPath(currentUser.role)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#1B3A6B] text-white font-baloo font-bold text-sm shadow-sm hover:bg-[#12284C] transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-[#F5C400]" />
                  <span>{currentUser.name.split(' ')[0]} ({currentUser.role})</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-[#1B3A6B] hover:text-[#C8322B] hover:bg-red-50 rounded-md transition-colors"
                  title={t('common.logout')}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="signboard-btn-outline px-4 py-2 text-sm"
                >
                  {t('common.login')}
                </Link>
                <Link
                  to="/register"
                  className="signboard-btn-primary px-4 py-2 text-sm"
                >
                  {t('common.register')}
                </Link>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg text-[#1B3A6B] hover:bg-[#1B3A6B]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F4741F]"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown / Bottom Sheet */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-[#FBF6EC] border-b-2 border-[#1B3A6B] shadow-xl z-50 animate-in slide-in-from-top duration-200">
          <div className="px-5 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-lg font-bold ${
                  location.pathname === link.to
                    ? 'bg-[#1B3A6B] text-white'
                    : 'text-[#1B3A6B] hover:bg-[#1B3A6B]/10'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-[#1B3A6B]/20 flex flex-col gap-3">
              {currentUser ? (
                <>
                  <Link
                    to={getDashboardPath(currentUser.role)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3.5 bg-[#1B3A6B] text-white rounded-lg font-bold font-baloo"
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-[#F5C400]" />
                      <span>{currentUser.name} ({currentUser.role.toUpperCase()})</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#F5C400]" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 p-3 text-[#C8322B] bg-red-50 rounded-lg font-bold"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>{t('common.logout')}</span>
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="signboard-btn-outline py-3 text-center text-base"
                  >
                    {t('common.login')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="signboard-btn-primary py-3 text-center text-base"
                  >
                    {t('common.register')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

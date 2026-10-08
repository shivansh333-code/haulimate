import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Phone, MessageSquare, Shield, HeartHandshake, MapPin } from 'lucide-react';
import { TruckArtBorder } from './TruckArtBorder';
import { useLanguage } from '../../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1B3A6B] text-white relative">
      {/* 1 of 3 allowed Truck-art border placements */}
      <TruckArtBorder height={20} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & North Star */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#F4741F] flex items-center justify-center text-white">
                <Truck className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold font-baloo text-white">
                Hauli<span className="text-[#F5C400]">Mate</span>
              </span>
            </div>
            <p className="text-[#F5C400] font-baloo text-lg font-bold tracking-wide mb-3">
              "Driver nahi, Professional."
            </p>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              {t('hero.subhead')}
            </p>
            <div className="flex items-center gap-3 text-xs text-white/70">
              <span className="px-2 py-1 rounded bg-white/10 border border-white/20">
                🇮🇳 {t('common.hornOkPlease')}
              </span>
              <span className="px-2 py-1 rounded bg-[#F4741F]/20 text-[#F5C400] border border-[#F4741F]/40">
                100% Verified
              </span>
            </div>
          </div>

          {/* For Drivers */}
          <div>
            <h4 className="text-lg font-baloo font-bold text-[#F5C400] mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {t('nav.forDrivers')}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link to="/for-drivers" className="hover:text-[#F5C400] transition-colors">
                  {t('twoLanes.driverP1')}
                </Link>
              </li>
              <li>
                <Link to="/for-drivers" className="hover:text-[#F5C400] transition-colors">
                  {t('twoLanes.driverP2')}
                </Link>
              </li>
              <li>
                <Link to="/for-drivers" className="hover:text-[#F5C400] transition-colors">
                  {t('twoLanes.driverP3')}
                </Link>
              </li>
              <li>
                <Link to="/register" className="inline-block mt-2 text-[#F4741F] font-bold hover:underline">
                  {t('common.chaloRegister')} →
                </Link>
              </li>
            </ul>
          </div>

          {/* For Transporters */}
          <div>
            <h4 className="text-lg font-baloo font-bold text-[#F5C400] mb-4 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5" />
              {t('nav.forTransporters')}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link to="/for-transporters" className="hover:text-[#F5C400] transition-colors">
                  {t('twoLanes.transporterP1')}
                </Link>
              </li>
              <li>
                <Link to="/for-transporters" className="hover:text-[#F5C400] transition-colors">
                  {t('twoLanes.transporterP2')}
                </Link>
              </li>
              <li>
                <Link to="/for-transporters" className="hover:text-[#F5C400] transition-colors">
                  {t('twoLanes.transporterP4')}
                </Link>
              </li>
              <li>
                <Link to="/for-transporters" className="inline-block mt-2 text-[#F4741F] font-bold hover:underline">
                  {t('hero.ctaTransporter')} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Support */}
          <div>
            <h4 className="text-lg font-baloo font-bold text-[#F5C400] mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              {t('common.helpline')}
            </h4>
            <div className="space-y-3 text-sm">
              <a 
                href="https://wa.me/917018709616"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-[#1E7F4F]/30 hover:bg-[#1E7F4F]/50 border border-[#1E7F4F] text-white font-bold transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-[#25D366]" />
                <div>
                  <div className="text-xs text-green-200">WhatsApp Support (24x7)</div>
                  <div className="text-sm">+91 70187 09616</div>
                </div>
              </a>

              <a 
                href="tel:+918527977238"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold transition-colors"
              >
                <Phone className="w-5 h-5 text-[#F5C400]" />
                <div>
                  <div className="text-xs text-white/70">Call Support & Helpline</div>
                  <div className="text-sm">+91 85279 77238</div>
                </div>
              </a>

              <div className="flex items-start gap-2 text-xs text-white/70 pt-2">
                <MapPin className="w-4 h-4 text-[#F4741F] shrink-0 mt-0.5" />
                <span>GT Road Transport Hub, Sector 18, Gurugram / Ludhiana Bypass</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links & Legal */}
        <div className="pt-8 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            <Link to="/for-drivers" className="hover:text-white transition-colors">{t('nav.forDrivers')}</Link>
            <Link to="/for-transporters" className="hover:text-white transition-colors">{t('nav.forTransporters')}</Link>
            <Link to="/how-it-works" className="hover:text-white transition-colors">{t('nav.howItWorks')}</Link>
            <Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link>
            <Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
          <div className="text-center md:text-right">
            © {new Date().getFullYear()} HauliMate Technologies Pvt. Ltd. All rights reserved.
          </div>
        </div>

        {/* Mandatory Compliance Statement */}
        <div className="mt-6 p-3 rounded-md bg-black/25 border border-white/10 text-[12px] text-white/60 leading-relaxed text-center">
          <strong>Notice:</strong> {t('common.disclaimer')}
        </div>
      </div>
    </footer>
  );
};

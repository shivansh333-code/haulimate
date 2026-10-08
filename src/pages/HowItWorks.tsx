import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, CheckCircle2, Award, Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const HowItWorks: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="w-full pb-16">
      {/* Header */}
      <section className="bg-[#1B3A6B] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-[#F4741F]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F5C400] text-[#14171C] text-xs font-bold uppercase tracking-wider mb-3">
            Simple Highway Process
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-baloo text-white mb-4">
            यह कैसे काम करता है (How It Works)
          </h1>
          <p className="text-base sm:text-xl text-white/85 max-w-2xl mx-auto font-mukta">
            A comprehensive, transparent bridge connecting professional drivers with fleet operators across India.
          </p>
        </div>
      </section>

      {/* Deep-Dive Dual Tracks */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* DRIVER DEEP DIVE */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8 border-b-2 border-[#F4741F] pb-3">
            <div className="w-12 h-12 rounded-xl bg-[#F4741F] text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-baloo text-[#1B3A6B]">
                ड्राइवर के लिए 5 आसान कदम (For Drivers)
              </h2>
              <p className="text-xs sm:text-sm text-[#14171C]/70">
                From initial application to verified placement and monthly benefits
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { num: '01', title: 'रजिस्ट्रेशन व कागज़ात (Registration)', desc: 'Submit your commercial HMV licence, Aadhaar card, and phone number on our website or visit any of our hub offices in Ludhiana, Panipat, Agra, or Jaipur.' },
              { num: '02', title: 'सत्यापन व ड्राइविंग टेस्ट (Verification & Assessment)', desc: 'Our certified testing team checks RTO licence history, conducts a highway simulator or road assessment, and verifies police background records.' },
              { num: '03', title: 'सुरक्षा व आचरण ट्रेनिंग (Professional Training)', desc: '3-day orientation covering highway defensive driving, fatigue management, GPS logging, customer communication, and basic vehicle preventative maintenance.' },
              { num: '04', title: 'वर्दी, जूते व स्मार्ट ID (Kit Issuance)', desc: 'Receive your complete HauliMate professional kit: 2x shirts, heavy-duty trousers, safety boots, high-vis jacket, and RFID lanyard ID card.' },
              { num: '05', title: 'फ्लीट में तैनाती व पक्की सैलरी (Placement & Benefits)', desc: 'Placed with a trusted transport partner with guaranteed bank salary by 5th of each month, accident insurance, and dedicated grievance support.' },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start gap-4 p-6 rounded-2xl bg-white border border-[#1B3A6B]/15 shadow-sm">
                <span className="text-2xl font-black font-baloo text-[#F4741F] bg-[#F4741F]/10 px-4 py-2 rounded-xl shrink-0">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-baloo text-[#1B3A6B]">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#14171C]/80 mt-1 font-mukta leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TRANSPORTER DEEP DIVE */}
        <div>
          <div className="flex items-center gap-3 mb-8 border-b-2 border-[#1B3A6B] pb-3">
            <div className="w-12 h-12 rounded-xl bg-[#1B3A6B] text-[#F5C400] flex items-center justify-center font-bold">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-baloo text-[#1B3A6B]">
                ट्रांसपोर्टर के लिए 5 आसान कदम (For Transporters)
              </h2>
              <p className="text-xs sm:text-sm text-[#14171C]/70">
                Seamless fleet staffing without the operational headaches of driver sourcing
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { num: '01', title: 'ज़रूरत दर्ज करें (Requirement Consultation)', desc: 'Specify your vehicle types (12-wheeler, trailer, tanker, etc.), monthly routes, start dates, and driver headcount.' },
              { num: '02', title: 'वेरिफाइड प्रोफाइल्स की समीक्षा (Candidate Review)', desc: 'We match your fleet requirements against our pre-verified driver roster with route experience matching your corridors.' },
              { num: '03', title: 'सरल अनुबंध (Clear SLA Agreement)', desc: 'Sign a transparent service agreement specifying the one-time onboarding fee, monthly management fee, and 24-hr replacement guarantee.' },
              { num: '04', title: 'ड्राइवर की रवानगी (On-Time Deployment)', desc: 'Drivers report on time at your yard in full uniform with smart ID card and required vehicle handling clearances.' },
              { num: '05', title: 'दैनिक मॉनिटरिंग व बैकअप (Ongoing Support & Replacement)', desc: 'Track daily attendance via GPS check-in. In case of illness or emergency, request an immediate replacement driver within 24 hours.' },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start gap-4 p-6 rounded-2xl bg-[#FBF6EC] border border-[#1B3A6B]/20 shadow-sm">
                <span className="text-2xl font-black font-baloo text-[#1B3A6B] bg-[#1B3A6B]/10 px-4 py-2 rounded-xl shrink-0">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-baloo text-[#1B3A6B]">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#14171C]/80 mt-1 font-mukta leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready Action */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 bg-[#1B3A6B] text-white rounded-2xl border-4 border-[#F5C400]">
          <h3 className="text-2xl sm:text-3xl font-bold font-baloo text-[#F5C400] mb-3">
            शुरू करने के लिए तैयार हैं?
          </h3>
          <p className="text-sm sm:text-base text-white/80 max-w-md mx-auto mb-6">
            Join the movement bringing structure, dignity, and reliability to Indian highways.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/register" className="signboard-btn-primary px-8 py-3 text-base">
              {t('common.chaloRegister')} →
            </Link>
            <Link to="/contact" className="signboard-btn-outline border-white text-white px-6 py-3 text-base">
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Heart, Shield, Award, Users, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full pb-16">
      {/* Banner */}
      <section className="bg-[#1B3A6B] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-[#F5C400]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F4741F] text-white text-xs font-bold uppercase tracking-wider mb-3">
            Our Mission & Roots
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-baloo text-white mb-4">
            HauliMate: भारतीय हाइवे की नई पहचान
          </h1>
          <p className="text-base sm:text-xl text-white/85 max-w-2xl mx-auto font-mukta">
            "Driver nahi, Professional." — Building dignity, formal employment, and fleet reliability for India’s backbone.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#1B3A6B]/20 shadow-md mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-baloo text-[#1B3A6B] mb-4">
            हमारी कहानी (Our Story)
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-[#14171C]/85 font-mukta leading-relaxed">
            <p>
              भारत की अर्थव्यवस्था को चलाने वाले 80 लाख से अधिक कमर्शियल ट्रक चालक दिन-रात ग्रैंड ट्रंक रोड (GT Road), नेशनल हाईवे 44 और एक्सप्रेसवे पर चलते हैं। फिर भी, यह क्षेत्र दशकों से असंगठित बिचौलियों, अनिश्चित भुगतानों और बुनियादी सामाजिक सुरक्षा की कमी से जूझ रहा था।
            </p>
            <p>
              दूसरी तरफ़, भारी निवेश करने वाले फ्लीट मालिकों और ट्रांसपोर्टरों को समय पर भरोसेमंद, सत्यापित और ज़िम्मेदार चालकों के न मिलने से भारी नुक़सान उठाना पड़ता था।
            </p>
            <p className="font-semibold text-[#1B3A6B] text-base sm:text-lg border-l-4 border-[#F4741F] pl-4 py-1 italic bg-[#FBF6EC]">
              HauliMate केवल कोई जॉब बोर्ड या ऐप नहीं है — HauliMate वह संस्थागत पुल है जो ड्राइवरों को वर्दी, कंपनी पहचान और सुरक्षा देता है, और ट्रांसपोर्टरों को 100% भरोसेमंद फ्लीट ऑपरेशन्स।
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#FBF6EC] p-6 rounded-xl border-2 border-[#1B3A6B]/20 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#1B3A6B] text-[#F5C400] flex items-center justify-center mb-3">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold font-baloo text-[#1B3A6B]">इज़्ज़त और सम्मान (Dignity)</h3>
            <p className="text-xs sm:text-sm text-[#14171C]/75 font-mukta mt-1">
              Every driver is an essential frontline professional deserving of respect, safety gear, and dignity.
            </p>
          </div>

          <div className="bg-[#FBF6EC] p-6 rounded-xl border-2 border-[#F4741F]/30 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#F4741F] text-white flex items-center justify-center mb-3">
              <Shield className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold font-baloo text-[#1B3A6B]">सत्यापन व सुरक्षा (Integrity)</h3>
            <p className="text-xs sm:text-sm text-[#14171C]/75 font-mukta mt-1">
              Zero tolerance for forged credentials. Thorough background verification protecting cargo and lives.
            </p>
          </div>

          <div className="bg-[#FBF6EC] p-6 rounded-xl border-2 border-[#1E7F4F]/30 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#1E7F4F] text-white flex items-center justify-center mb-3">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold font-baloo text-[#1B3A6B]">जिम्मेदार सेवा (Accountability)</h3>
            <p className="text-xs sm:text-sm text-[#14171C]/75 font-mukta mt-1">
              A clear replacement SLA, single point of contact, and continuous monitoring on every deployment.
            </p>
          </div>
        </div>
      </section>

      {/* Hub Locations */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#1B3A6B]/20">
          <h3 className="text-xl font-bold font-baloo text-[#1B3A6B] mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#F4741F]" />
            सक्रिय हब शहर (Active Regional Operations)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm font-semibold text-[#14171C]">
            <div className="p-3 bg-[#FBF6EC] rounded-lg border border-gray-200">📍 Ludhiana, Punjab</div>
            <div className="p-3 bg-[#FBF6EC] rounded-lg border border-gray-200">📍 Panipat, Haryana</div>
            <div className="p-3 bg-[#FBF6EC] rounded-lg border border-gray-200">📍 Agra, Uttar Pradesh</div>
            <div className="p-3 bg-[#FBF6EC] rounded-lg border border-gray-200">📍 Jaipur, Rajasthan</div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
            <span className="text-[#1B3A6B]">हाईवे कंट्रोल रूम व फ्लीट पूछताछ:</span>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/917018709616" target="_blank" rel="noreferrer" className="text-[#1E7F4F] hover:underline">
                WhatsApp: +91 70187 09616
              </a>
              <span className="text-gray-300">|</span>
              <a href="tel:+918527977238" className="text-[#1B3A6B] hover:underline">
                Call Support: +91 85279 77238
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

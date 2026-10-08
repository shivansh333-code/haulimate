import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, CheckCircle2, FileText, ChevronDown, ChevronUp, 
  MessageSquare, UserCheck, HeartHandshake, Award, HelpCircle, Phone 
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const ForDrivers: React.FC = () => {
  const { t, language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const eligibilityCriteria = [
    { titleHi: 'वैध कमर्शियल लाइसेंस', titleEn: 'Valid Commercial DL', desc: 'Valid HMV / HGV / Trailer licence with minimum 2 years validity.' },
    { titleHi: 'न्यूनतम 2 साल का अनुभव', titleEn: 'Minimum 2 Years Experience', desc: 'Prior highway driving experience on 10/12/14-wheelers or trailers.' },
    { titleHi: 'उम्र 21 से 55 वर्ष', titleEn: 'Age 21 to 55 Years', desc: 'Physically fit with healthy eyesight and medical clearance.' },
    { titleHi: 'आधार कार्ड व बैकग्राउंड', titleEn: 'Aadhaar & Clean Background', desc: 'Valid Aadhaar linked with mobile and no pending criminal record.' },
  ];

  const documentsNeeded = [
    { name: 'Commercial Heavy Driving Licence (HMV/HGV)', mandatory: true },
    { name: 'Original Aadhaar Card with Mobile Linking', mandatory: true },
    { name: 'Bank Passbook or Cancelled Cheque (Direct salary)', mandatory: true },
    { name: 'Recent Passport Size Photos (4 copies)', mandatory: true },
    { name: 'Previous Transporter Experience Letter / Reference', mandatory: false },
    { name: 'Police Verification Clearance Certificate', mandatory: false },
  ];

  const faqs = [
    {
      qHi: 'क्या HauliMate में जुड़ने के लिए कोई फ़ीस देनी होती है?',
      qEn: 'Do drivers need to pay any registration or joining fee?',
      aHi: 'नहीं! HauliMate ड्राइवरों से कोई रजिस्ट्रेशन या ट्रेनिंग फ़ीस नहीं लेता। हमारी सेवा ड्राइवरों के लिए बिल्कुल मुफ़्त है। वर्दी और ID कार्ड भी कंपनी की तरफ़ से दिया जाता है।',
      aEn: 'No! HauliMate never charges any registration or training fee from drivers. Our onboarding and placement are 100% free. Company uniform kit and ID card are provided by HauliMate.',
    },
    {
      qHi: 'मेरी सैलरी कब और कैसे मिलेगी?',
      qEn: 'When and how will my monthly salary be paid?',
      aHi: 'आपकी तय सैलरी हर महीने की 1 से 5 तारीख़ के बीच सीधे आपके बैंक खाते में ट्रांसफर की जाती है। साथ में सैलरी स्लिप भी मिलती है जिसमें हर ट्रिप का पूरा हिसाब रहता है।',
      aEn: 'Your fixed salary is credited directly to your bank account between the 1st and 5th of every month, accompanied by a detailed digital pay slip.',
    },
    {
      qHi: 'हाइवे पर गाड़ी ख़राब होने या बीमारी में क्या मदद मिलती है?',
      qEn: 'What support is provided during vehicle breakdown or medical emergency?',
      aHi: 'HauliMate का 24x7 इमरजेंसी कंट्रोल रूम है। गाड़ी ख़राब होने पर पास के वर्कशॉप और ट्रांसपोर्टर से तुरंत तालमेल बिठाया जाता है। बीमारी या दुर्घटना की स्थिति में इंश्योरेंस कवर लागू होता है।',
      aEn: 'HauliMate maintains a 24x7 highway helpline. In case of breakdown, we coordinate immediate workshop dispatch. Medical trauma and accident insurance apply as per policy.',
    },
    {
      qHi: 'छुट्टी का क्या नियम है?',
      qEn: 'What is the leave policy?',
      aHi: 'लंबी दूरी की ट्रिप पूरी होने के बाद आराम के लिए निर्धारित छुट्टियाँ मिलती हैं। पारिवारिक ज़रूरत पर आप ऐप से पहले से छुट्टी की अर्ज़ी दे सकते हैं।',
      aEn: 'Guaranteed rest days are provided upon completion of long hauls. You can easily request planned leave through the driver app.',
    }
  ];

  return (
    <div className="w-full pb-16">
      {/* Banner */}
      <section className="bg-[#1B3A6B] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-[#F5C400]">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F4741F] text-white text-xs font-bold uppercase tracking-wider mb-3">
            {t('common.northStar')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-baloo text-white mb-4">
            ड्राइवरों के लिए: पक्की नौकरी, इज़्ज़त और सुरक्षा
          </h1>
          <p className="text-base sm:text-xl text-white/85 max-w-2xl mx-auto font-mukta">
            बिना बिचौलियों के, सीधे सम्मानजनक काम। समय पर बैंक सैलरी, वर्दी, इंश्योरेंस और 24x7 हेल्पलाइन का साथ।
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/register" className="signboard-btn-primary px-8 py-3.5 text-base">
              {t('common.chaloRegister')} →
            </Link>
            <a
              href="https://wa.me/917018709616"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-lg bg-[#1E7F4F] hover:bg-[#1E7F4F]/90 text-white font-bold text-base flex items-center gap-2 shadow-md"
            >
              <MessageSquare className="w-5 h-5 text-[#25D366]" />
              <span>WhatsApp: 7018709616</span>
            </a>
            <a
              href="tel:+918527977238"
              className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-base flex items-center gap-2"
            >
              <Phone className="w-5 h-5 text-[#F5C400]" />
              <span>हेल्पलाइन: 8527977238</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: ShieldCheck, title: 'पक्की बैंक सैलरी', desc: 'हर महीने 1-5 तारीख़ को सीधे खाते में पैसा, कोई कटौतियां नहीं।' },
            { icon: UserCheck, title: 'वर्दी व स्मार्ट ID', desc: 'कंपनी किट, स्टील-टो बूट और डिजिटल RFID पहचान पत्र।' },
            { icon: HeartHandshake, title: 'इंश्योरेंस व सुरक्षा', desc: 'लागू नियम अनुसार दुर्घटना कवर और मेडिकल इमरजेंसी सहायता।' },
            { icon: Award, title: 'सम्मान व करियर ग्रोथ', desc: 'सीनियर ड्राइवर प्रमोशन और नियमित ट्रेनिंग सर्टिफिकेट्स।' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 border-2 border-[#1B3A6B]/20 shadow-md">
              <div className="w-12 h-12 rounded-lg bg-[#F4741F]/15 text-[#F4741F] flex items-center justify-center mb-3">
                <item.icon className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold font-baloo text-[#1B3A6B]">{item.title}</h2>
              <p className="text-xs sm:text-sm text-[#14171C]/75 font-mukta mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Eligibility Requirements */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-[#FBF6EC] rounded-2xl p-6 sm:p-8 border-2 border-[#1B3A6B]/30 shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-baloo text-[#1B3A6B]">
              शामिल होने की पात्रता (Eligibility Criteria)
            </h2>
            <p className="text-sm text-[#14171C]/75">
              HauliMate में शामिल होने के लिए ये बुनियादी शर्तें पूरी होनी चाहिए
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {eligibilityCriteria.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#1B3A6B]/15">
                <CheckCircle2 className="w-6 h-6 text-[#1E7F4F] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-base font-baloo text-[#1B3A6B]">
                    {language === 'hi' ? item.titleHi : item.titleEn}
                  </h3>
                  <p className="text-xs text-[#14171C]/75 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Needed Checklist */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#1B3A6B]/20 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-7 h-7 text-[#F4741F]" />
            <div>
              <h2 className="text-2xl font-bold font-baloo text-[#1B3A6B]">
                ज़रूरी कागज़ात (Documents Needed)
              </h2>
              <p className="text-xs sm:text-sm text-[#14171C]/75">
                रजिस्ट्रेशन के समय इन दस्तावेज़ों की साफ़ फ़ोटो तैयार रखें
              </p>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {documentsNeeded.map((doc, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1B3A6B]/10 text-[#1B3A6B] flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-[#14171C]">
                    {doc.name}
                  </span>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                  doc.mandatory 
                    ? 'bg-red-50 text-[#C8322B] border border-red-200' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {doc.mandatory ? 'जरूरी (Mandatory)' : 'ऐच्छिक (Optional)'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="text-center mb-8">
          <HelpCircle className="w-8 h-8 text-[#F4741F] mx-auto mb-2" />
          <h2 className="text-2xl sm:text-3xl font-bold font-baloo text-[#1B3A6B]">
            अक्सर पूछे जाने वाले सवाल (Driver FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-white rounded-xl border border-[#1B3A6B]/20 shadow-xs overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4.5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FBF6EC]/50 transition-colors"
                >
                  <span className="font-bold font-baloo text-base sm:text-lg text-[#1B3A6B]">
                    {language === 'hi' ? faq.qHi : faq.qEn}
                  </span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-[#F4741F]" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                {isOpen && (
                  <div className="p-4.5 pt-0 text-sm sm:text-base text-[#14171C]/85 font-mukta border-t border-gray-100 leading-relaxed bg-[#FBF6EC]/30">
                    <p className="mb-2">{faq.aHi}</p>
                    <p className="text-xs text-[#14171C]/65 border-t border-gray-100 pt-1.5">{faq.aEn}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Floating Sticky CTA on Mobile */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 p-3 bg-white border-t border-[#1B3A6B]/20 z-30 shadow-lg">
        <Link to="/register" className="signboard-btn-primary block py-3.5 text-center text-base">
          {t('common.chaloRegister')} →
        </Link>
      </div>
    </div>
  );
};

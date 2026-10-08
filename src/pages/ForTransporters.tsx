import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, ShieldAlert, CheckCircle2, RefreshCw, PhoneCall, 
  HelpCircle, ChevronDown, ChevronUp, ArrowRight, DollarSign, Clock 
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const ForTransporters: React.FC = () => {
  const { t, language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const problemVsSolution = [
    {
      problem: 'ड्राइवर बिना बताए गाड़ी छोड़कर भाग जाते हैं (Sudden Abandonment)',
      solution: 'अनुबंध के तहत जिम्मेदार ड्राइवर + 24 घंटे में रिप्लेसमेंट की लिखित गारंटी।',
    },
    {
      problem: 'बिना पुलिस वेरिफिकेशन के अनजान चालकों से चोरी और माल सुरक्षा का ख़तरा',
      solution: 'आधार, DL, RTO हिस्ट्री और पुलिस बैकग्राउंड क्लीयरेंस के बाद ही ड्राइवर ऑनबोर्ड।',
    },
    {
      problem: 'ड्राइविंग में लापरवाही से डीज़ल की बर्बादी और एक्सिडेंट का जोखिम',
      solution: 'हाइवे सुरक्षा व फ्यूल एफिशिएंसी में ट्रेंड और वर्दी वाले ड्राइवर।',
    },
    {
      problem: 'हर बार नया ड्राइवर ढूँढने में समय और गाड़ियों के खड़े रहने का नुकसान',
      solution: 'सिर्फ़ एक फ़ोन कॉल — HauliMate का स्टैंडबाय बेंच तुरंत ड्राइवर तैयार रखता है।',
    }
  ];

  const whatsIncluded = [
    'RTO Verified Commercial Licence & Clean Driving History Check',
    'Aadhaar KYC & Local Police Verification Report',
    'Pre-vetted Highway Driving & Fuel Efficiency Training',
    'HauliMate Uniform Kit & Smart RFID Digital Employee ID Card',
    'Daily GPS-geofenced Attendance Monitoring & Reporting',
    'Guaranteed Driver Replacement SLA (< 24 Hours on Emergency)',
    'Single Dedicated Account Manager for Your Fleet Operations',
    'Digital Billing & Transparent Monthly Management Invoices',
  ];

  const faqs = [
    {
      qHi: 'HauliMate का चार्जिंग और प्राइसिंग मॉडल क्या है?',
      qEn: 'What is HauliMate’s pricing and charging model?',
      aHi: 'हमारी प्राइसिंग दो हिस्सों में होती है: एक बार की ड्राइवर प्लेसमेंट फ़ीस + मासिक मैनेजमेंट फ़ीस। आपके वाहनों के प्रकार, फ्लीट साइज़ और रूट कॉरिडोर के आधार पर आपकी कॉल के बाद पारदर्शी कोटेशन दिया जाता है। कोई छुपे हुए चार्ज नहीं हैं।',
      aEn: 'Our transparent model comprises: a one-time placement onboarding fee + a monthly management fee. Quotes depend on your vehicle types, fleet size, and route corridor after our requirement discovery call. No hidden costs.',
    },
    {
      qHi: 'यदि कोई ड्राइवर ड्यूटी पर नहीं आता, तो रिप्लेसमेंट कैसे मिलता है?',
      qEn: 'How does the driver replacement guarantee work?',
      aHi: 'यदि कोई ड्राइवर अस्वस्थ होता है या अनुपस्थित रहता है, तो आप अपने ओनर डैशबोर्ड या 24x7 हेल्पलाइन पर रिप्लेसमेंट रिक्वेस्ट दर्ज कर सकते हैं। हमारी स्टैंडबाय बेंच से 24 घंटे के अंदर नया वेरिफाइड ड्राइवर तैनात कर दिया जाता है।',
      aEn: 'If a driver is sick or unavailable, simply trigger a replacement on your owner portal or call our hotline. Our standby bench deploys a verified replacement driver within 24 hours.',
    },
    {
      qHi: 'हाइवे पर किसी विवाद या समस्या में किसे संपर्क करना होगा?',
      qEn: 'Whom do we contact during transit delays or disputes?',
      aHi: 'आपको ड्राइवरों से सीधे विवाद करने की आवश्यकता नहीं है। आपकी फ्लीट के लिए एक समर्पित HauliMate अकाउंट मैनेजर होता है। सारी रिपोर्टिंग, शिकायतें और समाधान हमारी टीम संभालती है।',
      aEn: 'You never have to manage driver disputes directly. You receive a dedicated HauliMate Fleet Account Manager who coordinates resolution, attendance, and dispatch 24x7.',
    }
  ];

  return (
    <div className="w-full pb-16">
      {/* Hero Banner */}
      <section className="bg-[#1B3A6B] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-[#F5C400]">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F5C400] text-[#14171C] text-xs font-bold uppercase tracking-wider mb-3">
            Fleet Reliability Partner
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-baloo text-white mb-4">
            ट्रांसपोर्टरों के लिए: वेरिफाइड, ट्रेंड और वर्दी वाले ड्राइवर
          </h1>
          <p className="text-base sm:text-xl text-white/85 max-w-2xl mx-auto font-mukta">
            गाड़ियाँ खड़ी रहने का डर ख़त्म। 100% पुलिस व RTO वेरिफाइड ड्राइवर, समय पर हाज़िरी और 24 घंटे में रिप्लेसमेंट सहायता।
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/register" className="signboard-btn-primary px-8 py-3.5 text-base">
              ड्राइवर की ज़रूरत बताएँ (Post Requirement) →
            </Link>
            <a
              href="https://wa.me/917018709616"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-lg bg-[#1E7F4F] hover:bg-[#1E7F4F]/90 text-white font-bold text-base flex items-center gap-2 shadow-md"
            >
              <span>WhatsApp: 7018709616</span>
            </a>
            <a
              href="tel:+918527977238"
              className="signboard-btn-outline border-white text-white px-6 py-3.5 text-base flex items-center gap-2"
            >
              <span>हेल्पलाइन: 8527977238</span>
            </a>
          </div>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-baloo text-[#1B3A6B]">
            पुराने तरीक़े बनाम HauliMate समाधान
          </h2>
          <p className="text-sm sm:text-base text-[#14171C]/75 font-mukta mt-1">
            How HauliMate turns highway driver uncertainty into structured reliability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problemVsSolution.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-[#1B3A6B]/20 shadow-md flex flex-col justify-between">
              <div className="mb-4">
                <div className="flex items-center gap-2 text-[#C8322B] text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>पुरानी समस्या (The Risk)</span>
                </div>
                <p className="text-base font-semibold text-[#14171C] font-mukta">
                  {item.problem}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 bg-[#1E7F4F]/5 -mx-6 -mb-6 p-6 rounded-b-2xl border-t-[#1E7F4F]/20">
                <div className="flex items-center gap-2 text-[#1E7F4F] text-xs font-bold uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>HauliMate समाधान (Our Solution)</span>
                </div>
                <p className="text-sm sm:text-base font-medium text-[#14171C] font-mukta">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transparent Pricing Model */}
      <section className="bg-[#1B3A6B]/5 py-14 px-4 sm:px-6 lg:px-8 border-y border-[#1B3A6B]/15">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F4741F] bg-[#F4741F]/10 px-3 py-1 rounded-md">
              Transparent & Value-Driven
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-baloo text-[#1B3A6B] mt-2">
              प्राइसिंग व अनुबंध (Pricing & Contract Structure)
            </h2>
            <p className="text-sm sm:text-base text-[#14171C]/75 font-mukta mt-1">
              No arbitrary broker commissions. Clear, structured agreements tailored to your fleet size.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#1B3A6B] shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#1B3A6B] text-[#F5C400] flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold font-baloo text-[#1B3A6B] mb-2">
                One-Time Placement Fee
              </h3>
              <p className="text-sm text-[#14171C]/80 leading-relaxed mb-4">
                Covers comprehensive background verification (police & Aadhaar), commercial licence audit, highway driving test, and initial uniform kit issuance.
              </p>
              <div className="text-xs font-semibold text-[#1E7F4F] bg-green-50 p-2.5 rounded-lg border border-green-200">
                ✓ 30-day initial driver trial warranty included
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#F4741F] shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#F4741F] text-white flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold font-baloo text-[#1B3A6B] mb-2">
                Monthly Management Fee
              </h3>
              <p className="text-sm text-[#14171C]/80 leading-relaxed mb-4">
                Covers daily digital attendance monitoring, driver grievance handling, payroll compliance documentation, and emergency replacement SLA coverage.
              </p>
              <div className="text-xs font-semibold text-[#1B3A6B] bg-blue-50 p-2.5 rounded-lg border border-blue-200">
                ✓ Full standby bench access & 24-hr replacement guarantee
              </div>
            </div>
          </div>

          <div className="mt-8 text-center bg-white p-4 rounded-xl border border-gray-200 max-w-2xl mx-auto text-xs text-[#14171C]/75">
            <strong>Note:</strong> Final commercial proposal is provided after reviewing your vehicle types, typical monthly run mileage, and corridor requirements during our fleet consultation.
          </div>
        </div>
      </section>

      {/* What's Included Checklist */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#1B3A6B]/20 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <Truck className="w-8 h-8 text-[#F4741F]" />
            <div>
              <h2 className="text-2xl font-bold font-baloo text-[#1B3A6B]">
                हर प्लेसमेंट में क्या शामिल है (What's Included)
              </h2>
              <p className="text-xs sm:text-sm text-[#14171C]/75">
                Standard deliverables with every HauliMate deployed driver
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {whatsIncluded.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FBF6EC] border border-[#1B3A6B]/10">
                <CheckCircle2 className="w-5 h-5 text-[#1E7F4F] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#14171C]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <HelpCircle className="w-8 h-8 text-[#1B3A6B] mx-auto mb-2" />
          <h2 className="text-2xl sm:text-3xl font-bold font-baloo text-[#1B3A6B]">
            ट्रांसपोर्टर सवाल-जवाब (Transporter FAQ)
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

      {/* CTA Box */}
      <section className="max-w-5xl mx-auto px-4 mt-16">
        <div className="bg-[#1B3A6B] text-white rounded-2xl p-8 text-center border-4 border-[#F5C400] shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-bold font-baloo text-[#F5C400] mb-3">
            अपनी फ्लीट के लिए भरोसेमंद साथी चुनें
          </h3>
          <p className="text-sm sm:text-base text-white/85 max-w-xl mx-auto mb-6">
            Post your requirement in 2 minutes. Our fleet coordinator will share pre-verified driver profiles within 24 hours.
          </p>
          <Link to="/register" className="signboard-btn-primary px-8 py-3.5 text-base inline-block">
            Post Requirement Now →
          </Link>
        </div>
      </section>
    </div>
  );
};

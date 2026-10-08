import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, Shield, ShieldCheck, Users, Award, Clock, ArrowRight, CheckCircle2, 
  MessageSquare, Phone, ChevronRight, MapPin, Sparkles 
} from 'lucide-react';
import { TruckArtBorder } from '../components/common/TruckArtBorder';
import { MilestoneCounter } from '../components/common/MilestoneCounter';
import { BeforeAfterSlider } from '../components/common/BeforeAfterSlider';
import { useLanguage } from '../i18n/LanguageContext';

export const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const [truckAnimated, setTruckAnimated] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setTruckAnimated(true);
      return;
    }

    const timer = setTimeout(() => {
      setTruckAnimated(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const driverStories = [
    {
      name: 'Gurpreet Singh',
      city: 'Ludhiana, Punjab',
      quoteHi: '“पहले हर ट्रिप के बाद भाड़ा और पैसे के लिए मिन्नतें करनी पड़ती थीं। HauliMate में जुड़ने के बाद हर महीने की 2 तारीख़ को खाते में पक्की सैलरी आती है और वर्दी पहनने से हाईवे पर पुलिस व आरटीओ पूरी इज़्ज़त देते हैं।”',
      quoteEn: '“Earlier, getting paid after each long trip was unpredictable. With HauliMate, my fixed salary arrives in my bank account by the 2nd of every month, and wearing the uniform earns real respect on the highway.”',
      img: '/assets/images/driver_sikh.jpg',
      exp: '9 Years Exp • 14-Wheeler Heavy',
    },
    {
      name: 'Ramesh Yadav',
      city: 'Kanpur, Uttar Pradesh',
      quoteHi: '“रास्ते में गाड़ी ख़राब होने या कोई इमरजेंसी होने पर अब मुझे अकेला महसूस नहीं होता। HauliMate की 24x7 हेल्पलाइन (8527977238) हमेशा साथ खड़ी रहती है।”',
      quoteEn: '“Whenever there is a breakdown or highway emergency, I never feel stranded. HauliMate’s 24x7 control helpline (+91 85279 77238) is always on call to support me.”',
      img: '/assets/images/driver_uniformed.jpg',
      exp: '7 Years Exp • Container Expert',
    },
    {
      name: 'Mohammad Irfan',
      city: 'Panipat, Haryana',
      quoteHi: '“मेरे परिवार को सबसे बड़ी राहत इंश्योरेंस और फ़िक्स छुट्टियों से मिली है। अब बच्चे भी गर्व से कहते हैं कि पापा HauliMate के यूनिफ़ॉर्मड कैप्टन हैं।”',
      quoteEn: '“The biggest relief for my family has been medical insurance and guaranteed monthly leave. My kids proudly tell their friends that their father is a certified, uniformed heavy vehicle captain.”',
      img: '/assets/images/driver_young.jpg',
      exp: '11 Years Exp • Multi-Axle Trailer',
    },
  ];

  const transporterLogos = [
    'Sharma Roadways Logistics',
    'Punjab Bulk Carriers',
    'GT Road Express Cargo',
    'Yamuna Freight Lines',
    'Shekhawati Carrier Co.',
    'Malwa Heavy Transport',
    'Karnal Golden Freight',
  ];

  return (
    <div className="w-full">
      {/* 1 OF 3 ALLOWED TRUCK-ART BORDER PLACEMENTS - TOP OF HERO */}
      <TruckArtBorder height={22} />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-[#1B3A6B] to-[#12284C] text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle highway line ornament in background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-full border-b border-dashed border-[#F5C400] scale-y-150 transform -rotate-1" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          
          {/* Animated SVG Truck Hero Moment (Runs 1.8s, then remains still) */}
          <div className="relative w-full max-w-xl mx-auto h-24 mb-6 overflow-hidden flex items-end justify-center">
            {/* Highway Road Line */}
            <div className="absolute bottom-2 left-0 right-0 h-1 bg-[#F5C400]/40 flex items-center justify-around">
              <div className="w-8 h-0.5 bg-[#F5C400]" />
              <div className="w-8 h-0.5 bg-[#F5C400]" />
              <div className="w-8 h-0.5 bg-[#F5C400]" />
              <div className="w-8 h-0.5 bg-[#F5C400]" />
            </div>

            {/* Flat SVG Truck */}
            <div 
              className={`transform transition-all duration-1000 ease-out ${
                truckAnimated ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-60'
              }`}
            >
              <svg width="180" height="70" viewBox="0 0 180 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Truck Cabin */}
                <path d="M125 15 H160 L175 42 H180 V60 H125 V15 Z" fill="#F4741F" />
                <rect x="145" y="22" width="22" height="15" rx="2" fill="#FBF6EC" />
                
                {/* Headlight beam */}
                <polygon points="175,48 240,30 240,65 175,55" fill="#F5C400" fillOpacity="0.25" />

                {/* Cargo Container Body */}
                <rect x="5" y="10" width="118" height="50" rx="3" fill="#1B3A6B" stroke="#F5C400" strokeWidth="2" />
                
                {/* Truck art details on cargo body */}
                <text x="64" y="38" fill="#F5C400" fontSize="11" fontWeight="bold" fontFamily="Baloo 2" textAnchor="middle">
                  HAULIMATE
                </text>
                <text x="64" y="50" fill="#ffffff" fontSize="8" fontFamily="Mukta" textAnchor="middle">
                  HORN OK PLEASE
                </text>

                {/* Wheels */}
                <circle cx="30" cy="60" r="9" fill="#14171C" stroke="#8E8E93" strokeWidth="3" />
                <circle cx="55" cy="60" r="9" fill="#14171C" stroke="#8E8E93" strokeWidth="3" />
                <circle cx="95" cy="60" r="9" fill="#14171C" stroke="#8E8E93" strokeWidth="3" />
                <circle cx="155" cy="60" r="9" fill="#14171C" stroke="#8E8E93" strokeWidth="3" />
              </svg>
            </div>
          </div>

          {/* North Star Headline */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#F5C400]/20 border border-[#F5C400]/50 text-[#F5C400] text-sm font-bold uppercase tracking-widest mb-4">
            {t('common.hornOkPlease')} • {t('common.appName')}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-baloo tracking-tight leading-tight text-white mb-6">
            Driver nahi, <span className="text-[#F4741F] underline decoration-[#F5C400] decoration-wavy decoration-2">Professional.</span>
          </h1>

          <p className="text-lg sm:text-2xl text-white/90 font-mukta max-w-3xl mx-auto leading-relaxed mb-10">
            {t('hero.subhead')}
          </p>

          {/* Twin Prominent CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              to="/for-transporters"
              className="w-full sm:w-auto signboard-btn-neel text-lg px-8 py-4 text-center flex items-center justify-center gap-2 border border-[#F5C400]"
            >
              <span>{t('hero.ctaTransporter')}</span>
              <ArrowRight className="w-5 h-5 text-[#F5C400]" />
            </Link>

            <Link
              to="/for-drivers"
              className="w-full sm:w-auto signboard-btn-primary text-lg px-8 py-4 text-center flex items-center justify-center gap-2"
            >
              <span>{t('hero.ctaDriver')}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Quick Demo Credentials Reminder */}
          <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/70 max-w-lg mx-auto">
            <span className="font-bold text-[#F5C400]">Demo Accounts:</span> Driver: <code className="bg-black/30 px-1 py-0.5 rounded">9876500001</code> / Transporter: <code className="bg-black/30 px-1 py-0.5 rounded">9876500002</code> (OTP: <code className="bg-black/30 px-1 py-0.5 rounded">1234</code>)
          </div>
        </div>
      </section>

      {/* TRUST STRIP: 4 MILESTONE KM-STONES */}
      <section className="relative -mt-10 max-w-6xl mx-auto px-4 z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <MilestoneCounter
            label={t('stats.driversVerified')}
            value={120}
            suffix="+"
            routeCode="NH-44"
            subtext="Police & RTO Cleared"
          />
          <MilestoneCounter
            label={t('stats.transportersServed')}
            value={18}
            suffix="+"
            routeCode="GT ROAD"
            subtext="Fleets Across 4 States"
          />
          <MilestoneCounter
            label={t('stats.cities')}
            value={4}
            routeCode="HUBS"
            subtext="Ludhiana • Panipat • Agra • Jaipur"
          />
          <MilestoneCounter
            label={t('stats.replacementTime')}
            value={t('stats.replacementValue')}
            routeCode="SLA GUARANTEE"
            subtext="Dedicated Standby Bench"
          />
        </div>
      </section>

      {/* TWO-LANE PAINTED SIGNBOARDS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-baloo text-[#1B3A6B]">
            दो रास्ते, एक मंज़िल — पक्का भरोसा
          </h2>
          <p className="text-base sm:text-lg text-[#14171C]/75 font-mukta mt-2">
            Clear commitments designed specifically for Indian highway transport
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* LANE 1: FOR TRANSPORTERS */}
          <div className="bg-[#1B3A6B] text-white rounded-2xl p-6 sm:p-8 border-4 border-[#F5C400] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#F5C400] text-[#14171C] font-baloo font-bold text-xs uppercase px-4 py-1.5 rounded-bl-xl tracking-wider">
              Highway Signboard
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-[#F4741F] flex items-center justify-center text-white shadow-md">
                <Truck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-baloo text-[#F5C400]">
                  {t('twoLanes.transporterLaneTitle')}
                </h3>
                <p className="text-xs text-white/80 font-mukta">
                  No driver shortage, no breakdown panic
                </p>
              </div>
            </div>

            <ul className="space-y-4 text-sm sm:text-base mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5C400] shrink-0 mt-0.5" />
                <span>{t('twoLanes.transporterP1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5C400] shrink-0 mt-0.5" />
                <span>{t('twoLanes.transporterP2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5C400] shrink-0 mt-0.5" />
                <span>{t('twoLanes.transporterP3')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5C400] shrink-0 mt-0.5" />
                <span>{t('twoLanes.transporterP4')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5C400] shrink-0 mt-0.5" />
                <span>{t('twoLanes.transporterP5')}</span>
              </li>
            </ul>

            <Link
              to="/for-transporters"
              className="w-full signboard-btn-primary block py-3.5 text-center text-base"
            >
              {t('hero.ctaTransporter')} →
            </Link>
          </div>

          {/* LANE 2: FOR DRIVERS */}
          <div className="bg-[#FBF6EC] text-[#14171C] rounded-2xl p-6 sm:p-8 border-4 border-[#1B3A6B] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#F4741F] text-white font-baloo font-bold text-xs uppercase px-4 py-1.5 rounded-bl-xl tracking-wider">
              Dignity & Security
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-[#1B3A6B] flex items-center justify-center text-[#F5C400] shadow-md">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-baloo text-[#1B3A6B]">
                  {t('twoLanes.driverLaneTitle')}
                </h3>
                <p className="text-xs text-[#14171C]/75 font-mukta">
                  Pillar of respect and timely bank salary
                </p>
              </div>
            </div>

            <ul className="space-y-4 text-sm sm:text-base mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1E7F4F] shrink-0 mt-0.5" />
                <span>{t('twoLanes.driverP1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1E7F4F] shrink-0 mt-0.5" />
                <span>{t('twoLanes.driverP2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1E7F4F] shrink-0 mt-0.5" />
                <span>{t('twoLanes.driverP3')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1E7F4F] shrink-0 mt-0.5" />
                <span>{t('twoLanes.driverP4')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1E7F4F] shrink-0 mt-0.5" />
                <span>{t('twoLanes.driverP5')}</span>
              </li>
            </ul>

            <Link
              to="/for-drivers"
              className="w-full signboard-btn-neel block py-3.5 text-center text-base"
            >
              {t('common.chaloRegister')} →
            </Link>
          </div>
        </div>
      </section>

      {/* BEFORE -> AFTER TRANSFORMATION SLIDER */}
      <section className="py-12 bg-white/60 border-y border-[#1B3A6B]/15">
        <BeforeAfterSlider />
      </section>

      {/* CORE FEATURE SPOTLIGHT: UNIFORMED TRUCK DRIVERS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-linear-to-br from-[#1B3A6B] to-[#12284C] rounded-3xl p-6 sm:p-10 lg:p-12 text-white border-4 border-[#F5C400] shadow-2xl relative overflow-hidden">
          {/* Decorative Background Accent */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#F4741F]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#F5C400] text-[#1B3A6B] shadow-sm mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>विशिष्ट पहचान • Flagship Feature</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-baloo text-[#F5C400]">
              यूनिफ़ॉर्मड ट्रक ड्राइवर्स — भरोसा, इज़्ज़त और तेज़ परिचालन
            </h2>
            <p className="text-sm sm:text-base text-white/90 font-mukta mt-3 leading-relaxed">
              HauliMate में हर ड्राइवर सिर्फ एक वाहन चालक नहीं, बल्कि प्रमाणित <strong>"लॉजिस्टिक्स कैप्टन"</strong> है। वर्दी और डिजिटल आईडी कार्ड केवल परिधान नहीं, बल्कि विश्वसनीयता की सरकारी व व्यावसायिक गारंटी हैं।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* CARD 1: TRANSPORTER ADVANTAGE */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#F4741F] flex items-center justify-center text-white font-bold text-xl shadow-md">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-baloo text-[#F5C400]">
                      ट्रांसपोर्ट और फ्लीट मालिकों के लिए (Transporter Advantage)
                    </h3>
                    <p className="text-xs text-white/80 font-mukta">
                      वेयरहाउस और गेट पर 0% देरी, कॉर्पोरेट ग्राहकों का 100% भरोसा
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 text-sm sm:text-base text-white/95 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F5C400] shrink-0 mt-0.5" />
                    <span><strong>त्वरित वेयरहाउस व पोर्ट एंट्री:</strong> स्मार्ट क्यूआर आईडी और यूनिफॉर्म देखकर वेयरहाउस सिक्योरिटी और चेकपोस्ट बिना पूछताछ तुरंत गेट पास जारी करते हैं।</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F5C400] shrink-0 mt-0.5" />
                    <span><strong>कॉर्पोरेट क्लाइंट्स का भरोसा:</strong> जब ₹50 लाख का माल ले जाने वाला ड्राइवर अनुशासित और यूनिफॉर्म में पहुंचता है, तो आपकी ट्रांसपोर्ट कंपनी का सम्मान बढ़ता है।</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F5C400] shrink-0 mt-0.5" />
                    <span><strong>100% नशामुक्त व सुरक्षित:</strong> ड्यूटी पर आने से पहले दैनिक ब्रेथलाइजर व जीपीएस मोबाइल चेक-इन अनिवार्य है।</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F5C400] shrink-0 mt-0.5" />
                    <span><strong>24 घंटे में स्टैंडबाय रिप्लेसमेंट:</strong> आकस्मिक अनुपस्थिति पर उसी श्रेणी का दूसरा यूनिफ़ॉर्मड कैप्टन तुरंत हाजिर।</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/80">
                <span className="font-semibold text-[#F5C400]">✓ आरटीओ व पुलिस बैकग्राउंड क्लियर</span>
                <Link to="/for-transporters" className="font-bold text-[#F4741F] hover:text-[#F5C400] flex items-center gap-1">
                  <span>ड्राइवर ऑर्डर करें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* CARD 2: DRIVER DIGNITY */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#1E7F4F] flex items-center justify-center text-white font-bold text-xl shadow-md">
                    <Shield className="w-6 h-6 text-[#F5C400]" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-baloo text-[#F5C400]">
                      ड्राइवर भाइयों के लिए (Driver Dignity & Security)
                    </h3>
                    <p className="text-xs text-white/80 font-mukta">
                      "वर्दी से इज़्ज़त" — हाईवे पर पुलिस और जनता से पूरा मान-सम्मान
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 text-sm sm:text-base text-white/95 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1E7F4F] shrink-0 mt-0.5" />
                    <span><strong>हाईवे पर पुलिस व आरटीओ से सम्मान:</strong> HauliMate की आधिकारिक वर्दी और सरकारी सत्यापित आईडी देखकर हाईवे पर अकारण उत्पीड़न बंद होता है।</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1E7F4F] shrink-0 mt-0.5" />
                    <span><strong>मुफ़्त यूनिफॉर्म और सेफ्टी किट:</strong> 2 सेट भारी ड्यूटी वर्दी, स्टील-टो सेफ्टी जूते, रात के लिए हाई-विजिबिलिटी रिफ्लेक्टिव जैकेट और लैनयार्ड आईडी।</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1E7F4F] shrink-0 mt-0.5" />
                    <span><strong>पक्की 1-5 तारीख को बैंक सैलरी:</strong> किसी बिचौलिए के चक्कर नहीं, मेहनत की कमाई सीधे बैंक खाते में एसएमएस के साथ।</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1E7F4F] shrink-0 mt-0.5" />
                    <span><strong>₹5 लाख बीमा और पीएफ सुरक्षा:</strong> दुर्घटना या बीमारी की स्थिति में परिवार के लिए आर्थिक संबल।</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/80">
                <span className="font-semibold text-emerald-300">✓ 2 सेट मुफ़्त वर्दी व जूते</span>
                <Link to="/for-drivers" className="font-bold text-[#F4741F] hover:text-[#F5C400] flex items-center gap-1">
                  <span>ड्राइवर रजिस्टर करें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - TWO ROADWAY TRACKS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#F4741F] bg-[#F4741F]/10 px-3 py-1 rounded-md">
            Simple Highway Roadmap
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-baloo text-[#1B3A6B] mt-2">
            यह कैसे काम करता है / How It Works
          </h2>
        </div>

        {/* DRIVER ROAD TRACK */}
        <div className="mb-14 bg-white rounded-2xl p-6 sm:p-8 border border-[#1B3A6B]/20 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-[#F4741F] text-white flex items-center justify-center font-bold text-sm">
              1
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-baloo text-[#1B3A6B]">
              ड्राइवर सफ़र (Driver Roadmap)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {[
              { step: '01', title: 'Register', titleHi: 'रजिस्ट्रेशन', desc: 'Mobile number, DL details, and Aadhaar upload.' },
              { step: '02', title: 'Verification', titleHi: 'जाँच व सत्यापन', desc: 'RTO records, driving test, and background police verification.' },
              { step: '03', title: 'Training', titleHi: 'सुरक्षा ट्रेनिंग', desc: 'Highway defensive driving, etiquette, and fatigue safety.' },
              { step: '04', title: 'Uniform & ID', titleHi: 'वर्दी व स्मार्ट ID', desc: 'Company uniform kit, safety boots, and digital RFID ID card.' },
              { step: '05', title: 'Placement', titleHi: 'पक्की नौकरी', desc: 'Assigned with a verified transporter with timely bank payroll.' },
            ].map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#FBF6EC] border-2 border-[#1B3A6B]/20 relative">
                <div className="text-xs font-extrabold text-[#F4741F] font-baloo">MILESTONE {s.step}</div>
                <div className="text-lg font-bold font-baloo text-[#1B3A6B] mt-1">{language === 'hi' ? s.titleHi : s.title}</div>
                <div className="text-xs text-[#14171C]/80 mt-1">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TRANSPORTER ROAD TRACK */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#1B3A6B]/20 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-[#1B3A6B] text-[#F5C400] flex items-center justify-center font-bold text-sm">
              2
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-baloo text-[#1B3A6B]">
              ट्रांसपोर्टर प्रक्रिया (Transporter Process)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Requirement', titleHi: 'ज़रूरत बताएँ', desc: 'Post vehicle type, corridor route, and required count.' },
              { step: '02', title: 'Shortlist', titleHi: 'वेरिफाइड प्रोफ़ाइल', desc: 'Review pre-vetted drivers matching your fleet.' },
              { step: '03', title: 'Contract', titleHi: 'सरल एग्रीमेंट', desc: 'Transparent fee structure and replacement terms.' },
              { step: '04', title: 'Deployment', titleHi: 'ड्राइवर ऑन-ड्यूटी', desc: 'Driver reports on time in full uniform with smart ID.' },
              { step: '05', title: 'Support & SLA', titleHi: 'लगातार सहायता', desc: 'Daily attendance monitoring and 24-hr replacement guarantee.' },
            ].map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#1B3A6B]/5 border-2 border-[#1B3A6B]/20 relative">
                <div className="text-xs font-extrabold text-[#1B3A6B] font-baloo">STEP {s.step}</div>
                <div className="text-lg font-bold font-baloo text-[#1B3A6B] mt-1">{language === 'hi' ? s.titleHi : s.title}</div>
                <div className="text-xs text-[#14171C]/80 mt-1">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DRIVER STORIES */}
      <section className="py-16 bg-[#1B3A6B]/5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-baloo text-[#1B3A6B]">
              हाइवे के सच्चे साथी (Driver Stories)
            </h2>
            <p className="text-sm sm:text-base text-[#14171C]/75 font-mukta mt-1">
              Real experiences from drivers deployed across North India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {driverStories.map((story, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-[#F4741F] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={story.img} 
                      alt={story.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#F4741F]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="font-bold text-lg font-baloo text-[#1B3A6B]">{story.name}</h3>
                      <div className="text-xs text-[#14171C]/70 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#F4741F]" />
                        <span>{story.city}</span>
                      </div>
                      <div className="text-[11px] font-semibold text-[#1E7F4F] mt-0.5">{story.exp}</div>
                    </div>
                  </div>

                  <p className="text-sm font-mukta leading-relaxed text-[#14171C]/90 mb-3 italic">
                    {story.quoteHi}
                  </p>
                  <p className="text-xs font-mukta text-[#14171C]/65 border-t border-gray-100 pt-2">
                    {story.quoteEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPORTER LOGOS STRIP (TEXT-BASED FICTIONAL BRANDS) */}
      <section className="py-10 bg-white border-y border-[#1B3A6B]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-[#1B3A6B]/60 mb-6">
            Trusted By Established Transport Fleets Across Northern Corridors
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {transporterLogos.map((name, i) => (
              <div 
                key={i} 
                className="px-4 py-2 rounded-lg bg-[#FBF6EC] border border-[#1B3A6B]/20 text-[#1B3A6B] font-baloo font-bold text-sm sm:text-base tracking-wide shadow-2xs hover:border-[#F4741F] transition-colors"
              >
                🚚 {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL ACTION BAND */}
      <section className="py-16 bg-[#1B3A6B] text-white px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block p-2 rounded-xl bg-[#F4741F]/30 text-[#F5C400] mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-baloo mb-4 text-[#F5C400]">
            आज ही HauliMate परिवार से जुड़ें
          </h2>
          <p className="text-base sm:text-lg text-white/85 mb-8 leading-relaxed">
            चाहे आपको अपनी फ्लीट के लिए भरोसेमंद ड्राइवर चाहिए या फिर एक सम्मानजनक, सुरक्षित नौकरी — बस एक कदम उठाएँ।
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/917018709616"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#1E7F4F] hover:bg-[#1E7F4F]/90 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageSquare className="w-5 h-5 text-[#25D366]" />
              <span>WhatsApp: 7018709616</span>
            </a>

            <a
              href="tel:+918527977238"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-base flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-5 h-5 text-[#F5C400]" />
              <span>Call Support: 8527977238</span>
            </a>

            <Link
              to="/register"
              className="w-full sm:w-auto signboard-btn-primary px-8 py-3.5 text-base text-center"
            >
              {t('common.chaloRegister')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

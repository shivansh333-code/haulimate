import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Truck, Shield, ArrowRight, ArrowLeft, Check, CheckCircle2, 
  Upload, FileText, Smartphone, User, Sparkles, Building2,
  Mic, Phone, MessageSquare, Bot, Wand2
} from 'lucide-react';
import { authService } from '../../services/authService';
import { aiService } from '../../services/aiService';
import { MarigoldBurst } from '../../components/common/MarigoldBurst';
import { useLanguage } from '../../i18n/LanguageContext';

export const Register: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Role choice
  const [selectedRole, setSelectedRole] = useState<'driver' | 'owner' | null>(null);
  
  // Driver flow step (1 to 6)
  const [driverStep, setDriverStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [showMarigold, setShowMarigold] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  // Driver Form State
  const [driverForm, setDriverForm] = useState({
    phone: '',
    otp: '',
    name: '',
    fatherName: '',
    dob: '1992-07-10',
    city: 'Ludhiana',
    state: 'Punjab',
    languages: ['Hindi', 'Punjabi'],
    dlNumber: '',
    dlClass: 'HMV' as 'HMV' | 'HGV' | 'LMV' | 'Trailer Special',
    dlIssueDate: '2016-05-12',
    dlExpiryDate: '2029-05-12',
    experienceYears: 6,
    vehicleTypes: ['12-Wheeler', 'Trailer'],
    routes: ['Delhi–Mumbai', 'Punjab–Gujarat'],
    aadhaarFile: '',
    dlFile: '',
    photoFile: '',
    emergencyName: '',
    emergencyRelation: 'Spouse',
    emergencyPhone: '',
    bankAccount: '',
    ifsc: '',
    bankName: 'State Bank of India',
  });

  // Owner Form State
  const [ownerForm, setOwnerForm] = useState({
    phone: '',
    otp: '',
    contactName: '',
    company: '',
    gst: '',
    city: 'Delhi',
    fleetSize: 15,
    vehicleTypes: ['12-Wheeler', 'Container'],
    routes: ['Delhi–Mumbai'],
  });

  // AI Auto-Fill State for Laymen
  const [aiText, setAiText] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiStatus, setAiStatus] = useState<string | null>(null);

  const handleAiAutoFill = async (customInput?: string) => {
    const textToProcess = (customInput || aiText).trim();
    if (!textToProcess) return;

    setIsAiProcessing(true);
    setAiStatus('सारथी AI जानकारी निकाल रहा है...');

    try {
      const data = await aiService.autoFillRegistrationWithAI(
        textToProcess,
        selectedRole === 'owner' ? 'owner' : 'driver'
      );

      if (selectedRole === 'owner') {
        setOwnerForm(prev => ({
          ...prev,
          contactName: data.name || prev.contactName,
          phone: data.phone || prev.phone,
          company: data.companyName || prev.company,
          fleetSize: data.fleetSize || prev.fleetSize,
        }));
      } else {
        setDriverForm(prev => ({
          ...prev,
          name: data.name || prev.name,
          phone: data.phone || prev.phone,
          experienceYears: data.experienceYears || prev.experienceYears,
          vehicleTypes: data.vehicleType ? [data.vehicleType] : prev.vehicleTypes,
          routes: data.preferredRoutes ? [data.preferredRoutes] : prev.routes,
        }));
        // If phone found, proceed to step 2 or preview
        if (data.phone) setOtpSent(true);
      }

      setAiStatus(`✓ जानकारी सफलतापूर्वक भरी गई: ${data.name || 'नाम दर्ज'}, ${data.phone ? 'फोन ' + data.phone : ''}`);
      setTimeout(() => setAiStatus(null), 6000);
    } catch {
      setAiStatus('कृपया विवरण मैन्युअल रूप से जांचें।');
    } finally {
      setIsAiProcessing(false);
    }
  };

  const availableVehicleTypes = ['10-Wheeler', '12-Wheeler', '14-Wheeler', 'Trailer', 'Tanker', 'Container', 'Tipper', 'LCV'];
  const availableRoutes = ['Delhi–Mumbai', 'Delhi–Kolkata', 'Punjab–Gujarat', 'Ludhiana–Kandla', 'Delhi–Jaipur', 'Ambala–Kanpur'];

  const toggleArrayItem = (list: string[], item: string) => {
    return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
  };

  const handleFileUpload = (field: 'aadhaarFile' | 'dlFile' | 'photoFile', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDriverForm(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDriverSubmit = () => {
    setShowMarigold(true);
    authService.registerDriver({
      name: driverForm.name || 'New Professional Driver',
      phone: driverForm.phone || '7018709616',
      fatherName: driverForm.fatherName,
      dob: driverForm.dob,
      city: driverForm.city,
      state: driverForm.state,
      languages: driverForm.languages,
      experienceYears: Number(driverForm.experienceYears),
      vehicleTypes: driverForm.vehicleTypes,
      routes: driverForm.routes,
      avatarUrl: driverForm.photoFile || '/assets/images/driver_uniformed.jpg',
      licence: {
        number: driverForm.dlNumber || 'DL-PB-2016008899',
        licenceClass: driverForm.dlClass,
        issueDate: driverForm.dlIssueDate,
        expiryDate: driverForm.dlExpiryDate,
      },
      documents: [
        {
          id: `doc-${Date.now()}-dl`,
          type: 'licence',
          title: 'Commercial Heavy Vehicle Driving Licence',
          fileUrl: driverForm.dlFile || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
          uploadedAt: new Date().toISOString().split('T')[0],
          verified: false,
        },
        {
          id: `doc-${Date.now()}-aadhaar`,
          type: 'aadhaar',
          title: 'Aadhaar Card (UIDAI)',
          fileUrl: driverForm.aadhaarFile || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
          uploadedAt: new Date().toISOString().split('T')[0],
          verified: false,
        }
      ],
      bank: {
        accountName: driverForm.name || 'Driver Partner',
        accountNumberMasked: driverForm.bankAccount ? `XXXX-XXXX-${driverForm.bankAccount.slice(-4)}` : 'XXXX-XXXX-8921',
        ifscCode: driverForm.ifsc || 'SBIN0001234',
        bankName: driverForm.bankName,
      },
      emergencyContact: {
        name: driverForm.emergencyName || 'Family Member',
        relation: driverForm.emergencyRelation,
        phone: driverForm.emergencyPhone || driverForm.phone,
      }
    });

    setRegistrationComplete(true);
  };

  const handleOwnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authService.registerOwner({
      company: ownerForm.company || 'Fast Logistics',
      contactName: ownerForm.contactName || 'Transporter Partner',
      phone: ownerForm.phone || '9876500088',
      gst: ownerForm.gst,
      city: ownerForm.city,
      fleetSize: Number(ownerForm.fleetSize),
      vehicleTypes: ownerForm.vehicleTypes,
      routes: ownerForm.routes,
    });
    navigate('/owner');
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Marigold Petals Burst */}
      <MarigoldBurst active={showMarigold} />

      {/* REGISTRATION COMPLETE SCREEN */}
      {registrationComplete && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-4 border-[#F5C400] shadow-2xl text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-[#1E7F4F]/10 text-[#1E7F4F] flex items-center justify-center mx-auto mb-5">
            <Sparkles className="w-12 h-12 text-[#F4741F]" />
          </div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F5C400]/20 text-[#1B3A6B] font-bold text-sm uppercase tracking-wider mb-3">
            आवेदन स्वीकार हुआ • Application Received
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-baloo text-[#1B3A6B] mb-3">
            स्वागत है! Welcome to HauliMate
          </h2>
          <p className="text-base sm:text-lg text-[#14171C]/80 font-mukta max-w-lg mx-auto leading-relaxed mb-6">
            आपका रजिस्ट्रेशन सफलतापूर्वक जमा हो गया है। हमारी सत्यापन टीम <strong>3 कार्य दिवसों (3 Working Days)</strong> के भीतर RTO और पुलिस रिकॉर्ड्स की पुष्टि करेगी।
          </p>

          <div className="bg-[#FBF6EC] p-4 rounded-xl border border-gray-200 max-w-md mx-auto text-xs text-[#14171C]/75 mb-8">
            📌 आपका अस्थायी ID: <strong>HM-PENDING-2026</strong>. आप अभी अपने ड्राइवर डैशबोर्ड पर जाकर प्रोफाइल देख सकते हैं।
          </div>

          <button
            onClick={() => navigate('/driver')}
            className="signboard-btn-primary px-8 py-3.5 text-lg cursor-pointer"
          >
            डैशबोर्ड खोलें (Open Driver Dashboard) →
          </button>
        </div>
      )}

      {/* STEP 0: CHOOSE ROLE */}
      {!registrationComplete && selectedRole === null && (
        <div>
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-5xl font-extrabold font-baloo text-[#1B3A6B]">
              HauliMate में शामिल हों
            </h1>
            <p className="text-base text-[#14171C]/75 font-mukta mt-2">
              कृपया अपनी भूमिका चुनें / Please select your role
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* TILE 1: DRIVER */}
            <button
              onClick={() => setSelectedRole('driver')}
              className="bg-white rounded-2xl p-8 border-3 border-[#F4741F] hover:bg-[#FBF6EC] text-left transition-all shadow-lg hover:-translate-y-1 cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#F4741F] text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform">
                <Shield className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-bold font-baloo text-[#1B3A6B] mb-1">
                मैं ड्राइवर हूँ
              </h2>
              <div className="text-sm font-bold text-[#F4741F] uppercase tracking-wider mb-3">
                I am a Professional Driver
              </div>
              <p className="text-xs sm:text-sm text-[#14171C]/75 leading-relaxed font-mukta">
                पक्की बैंक सैलरी, वर्दी, इंश्योरेंस, सम्मान और फ्लीट में डायरेक्ट प्लेसमेंट के लिए रजिस्टर करें।
              </p>
            </button>

            {/* TILE 2: TRANSPORTER */}
            <button
              onClick={() => setSelectedRole('owner')}
              className="bg-white rounded-2xl p-8 border-3 border-[#1B3A6B] hover:bg-[#1B3A6B]/5 text-left transition-all shadow-lg hover:-translate-y-1 cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#1B3A6B] text-[#F5C400] flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform">
                <Building2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-bold font-baloo text-[#1B3A6B] mb-1">
                मैं ट्रांसपोर्टर हूँ
              </h2>
              <div className="text-sm font-bold text-[#1B3A6B] uppercase tracking-wider mb-3">
                I am a Transporter / Fleet Owner
              </div>
              <p className="text-xs sm:text-sm text-[#14171C]/75 leading-relaxed font-mukta">
                अपनी गाड़ियों के लिए 100% वेरिफाइड, ट्रेंड चालक और 24-घंटे रिप्लेसमेंट सपोर्ट पाएँ।
              </p>
            </button>
          </div>
        </div>
      )}

      {/* DRIVER ONBOARDING MULTI-STEP FLOW */}
      {!registrationComplete && selectedRole === 'driver' && (
        <div className="bg-white rounded-2xl shadow-xl border border-[#1B3A6B]/20 p-6 sm:p-10">
          
          {/* Milestone Road Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-bold text-[#1B3A6B] mb-2 font-baloo">
              <span>चरण {driverStep} / 6 (Milestone {driverStep})</span>
              <span>{['मोबाइल सत्यापन', 'बुनियादी विवरण', 'लाइसेंस व अनुभव', 'कागज़ात अपलोड', 'बैंक व इमरजेंसी', 'अंतिम समीक्षा'][driverStep - 1]}</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex">
              {[1, 2, 3, 4, 5, 6].map((st) => (
                <div
                  key={st}
                  className={`flex-1 h-full border-r border-white transition-all ${
                    st <= driverStep ? 'bg-[#F4741F]' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* AI LAYMAN AUTO-FILL ASSISTANT BOX */}
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-linear-to-r from-[#1B3A6B]/10 via-[#F5C400]/20 to-[#F4741F]/10 border-2 border-[#F5C400] shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#F4741F] text-white flex items-center justify-center">
                <Wand2 className="w-4 h-4 text-[#F5C400]" />
              </div>
              <div>
                <h4 className="font-extrabold font-baloo text-[#1B3A6B] text-base leading-none">
                  आसान AI रजिस्ट्रेशन (One-Line Voice / Text Registration)
                </h4>
                <p className="text-xs text-[#14171C]/80 font-mukta mt-0.5">
                  लिखने में परेशानी? बस बोलकर या 1 लाइन में बताइए — AI अपने आप फॉर्म भर देगा!
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-3">
              <input
                type="text"
                value={aiText}
                onChange={(e) => setAiText(e.target.value)}
                placeholder="उदा. मेरा नाम रमेश कुमार, मोबाइल 7018709616, 10 साल से ट्रेलर चलाता हूँ"
                className="flex-1 bg-white px-3.5 py-2.5 rounded-xl border border-[#1B3A6B]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#F4741F]"
              />
              <button
                type="button"
                onClick={() => handleAiAutoFill()}
                disabled={isAiProcessing || !aiText.trim()}
                className="px-5 py-2.5 rounded-xl bg-[#F4741F] hover:bg-[#E05F0C] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-[#F5C400]" />
                <span>{isAiProcessing ? 'भर रहा है...' : 'AI से भरें'}</span>
              </button>
            </div>

            {/* Quick Sample Presets */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs text-[#14171C]/75">
              <span className="font-bold text-[#1B3A6B]">नमूना चुनें:</span>
              <button
                type="button"
                onClick={() => handleAiAutoFill('मेरा नाम गुरप्रीत सिंह, फोन 7018709616, 12 साल अनुभव, 14-चक्का ट्रेलर, दिल्ली-मुंबई रूट')}
                className="px-2 py-0.5 rounded-md bg-white border border-gray-300 hover:border-[#F4741F] text-[11px] font-medium transition-colors cursor-pointer"
              >
                🚚 ट्रेलर कैप्टन (Gurpreet Singh)
              </button>
              <button
                type="button"
                onClick={() => handleAiAutoFill('मेरा नाम रमेश यादव, फोन 8527977238, 8 साल अनुभव, कंटेनर स्पेशलिस्ट, लुधियाना-कांडला')}
                className="px-2 py-0.5 rounded-md bg-white border border-gray-300 hover:border-[#F4741F] text-[11px] font-medium transition-colors cursor-pointer"
              >
                🚛 कंटेनर ड्राइवर (Ramesh Yadav)
              </button>
            </div>

            {aiStatus && (
              <div className="mt-2 p-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-300 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{aiStatus}</span>
              </div>
            )}

            <div className="mt-2 text-[11px] text-[#14171C]/70 flex items-center gap-2 pt-1 border-t border-gray-200/60">
              <span>📞 फोन पर मदद चाहिए? कॉल करें: <a href="tel:+918527977238" className="font-bold text-[#1B3A6B] underline">8527977238</a></span>
              <span>•</span>
              <span>💬 व्हाट्सएप: <a href="https://wa.me/917018709616" target="_blank" rel="noreferrer" className="font-bold text-[#1E7F4F] underline">7018709616</a></span>
            </div>
          </div>

          {/* STEP 1: MOBILE & OTP */}
          {driverStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-baloo text-[#1B3A6B]">
                चरण 1: मोबाइल नंबर व OTP सत्यापन
              </h3>
              <div>
                <label className="block text-xs font-bold text-[#14171C] mb-1">
                  मोबाइल नंबर (10 Digit Mobile Number) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500 font-bold text-sm">+91</span>
                  <input
                    type="tel"
                    value={driverForm.phone}
                    onChange={(e) => setDriverForm({ ...driverForm, phone: e.target.value })}
                    placeholder="98765 00001"
                    className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4741F] text-base font-bold"
                  />
                </div>
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={() => setOtpSent(true)}
                  className="signboard-btn-primary w-full py-3 text-base cursor-pointer"
                >
                  OTP भेजें (Send OTP)
                </button>
              ) : (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-[#14171C] mb-1">
                      OTP कोड (Demo OTP: 1234) *
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={driverForm.otp}
                      onChange={(e) => setDriverForm({ ...driverForm, otp: e.target.value })}
                      placeholder="1234"
                      className="w-full text-center text-xl font-black py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F4741F]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (driverForm.otp === '1234' || driverForm.otp.length > 0) {
                        setDriverStep(2);
                      }
                    }}
                    className="signboard-btn-primary w-full py-3 text-base cursor-pointer"
                  >
                    सत्यापित करें और आगे बढ़ें (Next) →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: BASIC DETAILS */}
          {driverStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-baloo text-[#1B3A6B]">
                चरण 2: व्यक्तिगत विवरण (Basic Details)
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#14171C] mb-1">पूरा नाम (Full Name) *</label>
                  <input
                    type="text"
                    value={driverForm.name}
                    onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })}
                    placeholder="उदा. Gurpreet Singh"
                    className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#14171C] mb-1">पिता का नाम (Father's Name) *</label>
                  <input
                    type="text"
                    value={driverForm.fatherName}
                    onChange={(e) => setDriverForm({ ...driverForm, fatherName: e.target.value })}
                    placeholder="उदा. Shri Sukhdev Singh"
                    className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#14171C] mb-1">जन्म तिथि (DOB) *</label>
                  <input
                    type="date"
                    value={driverForm.dob}
                    onChange={(e) => setDriverForm({ ...driverForm, dob: e.target.value })}
                    className="w-full p-2 rounded-lg border border-gray-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#14171C] mb-1">गृह शहर (Home City) *</label>
                  <input
                    type="text"
                    value={driverForm.city}
                    onChange={(e) => setDriverForm({ ...driverForm, city: e.target.value })}
                    placeholder="उदा. Ludhiana"
                    className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#14171C] mb-1">राज्य (State) *</label>
                  <select
                    value={driverForm.state}
                    onChange={(e) => setDriverForm({ ...driverForm, state: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button type="button" onClick={() => setDriverStep(1)} className="signboard-btn-outline px-6 py-2.5 text-sm">← {t('common.back')}</button>
                <button type="button" onClick={() => setDriverStep(3)} className="signboard-btn-primary px-6 py-2.5 text-sm">{t('common.next')} →</button>
              </div>
            </div>
          )}

          {/* STEP 3: LICENCE & EXPERIENCE */}
          {driverStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-baloo text-[#1B3A6B]">
                चरण 3: ड्राइविंग लाइसेंस व हाइवे अनुभव
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#14171C] mb-1">DL नंबर (Licence Number) *</label>
                  <input
                    type="text"
                    value={driverForm.dlNumber}
                    onChange={(e) => setDriverForm({ ...driverForm, dlNumber: e.target.value })}
                    placeholder="DL-0420180012345"
                    className="w-full p-2.5 rounded-lg border border-gray-300 text-sm uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#14171C] mb-1">लाइसेंस श्रेणी (DL Class) *</label>
                  <select
                    value={driverForm.dlClass}
                    onChange={(e) => setDriverForm({ ...driverForm, dlClass: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
                  >
                    <option value="HMV">HMV (Heavy Motor Vehicle)</option>
                    <option value="HGV">HGV (Heavy Goods Vehicle)</option>
                    <option value="Trailer Special">Trailer Special / Multi-Axle</option>
                    <option value="LMV">LMV Commercial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14171C] mb-1">कुल ड्राइविंग अनुभव (Years of Experience) *</label>
                <input
                  type="number"
                  min={2}
                  max={40}
                  value={driverForm.experienceYears}
                  onChange={(e) => setDriverForm({ ...driverForm, experienceYears: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14171C] mb-1">चलाए गए वाहन (Select Vehicles Driven)</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {availableVehicleTypes.map((v) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => setDriverForm({ ...driverForm, vehicleTypes: toggleArrayItem(driverForm.vehicleTypes, v) })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        driverForm.vehicleTypes.includes(v)
                          ? 'bg-[#1B3A6B] text-white border-[#1B3A6B]'
                          : 'bg-gray-50 text-gray-700 border-gray-300'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14171C] mb-1">परिचित हाइवे रूट (Known Corridors)</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {availableRoutes.map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setDriverForm({ ...driverForm, routes: toggleArrayItem(driverForm.routes, r) })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        driverForm.routes.includes(r)
                          ? 'bg-[#F4741F] text-white border-[#F4741F]'
                          : 'bg-gray-50 text-gray-700 border-gray-300'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button type="button" onClick={() => setDriverStep(2)} className="signboard-btn-outline px-6 py-2.5 text-sm">← {t('common.back')}</button>
                <button type="button" onClick={() => setDriverStep(4)} className="signboard-btn-primary px-6 py-2.5 text-sm">{t('common.next')} →</button>
              </div>
            </div>
          )}

          {/* STEP 4: DOCUMENTS UPLOAD */}
          {driverStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-baloo text-[#1B3A6B]">
                चरण 4: कागज़ात अपलोड (Documents Upload)
              </h3>
              <p className="text-xs text-[#14171C]/70">
                फ़ोटो साफ़ होनी चाहिए ताकि RTO रिकॉर्ड की पुष्टि हो सके। (Mock preview supported)
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* DL Upload */}
                <div className="border-2 border-dashed border-[#1B3A6B]/30 rounded-xl p-4 text-center">
                  <FileText className="w-8 h-8 text-[#F4741F] mx-auto mb-2" />
                  <div className="text-xs font-bold text-[#1B3A6B]">ड्राइविंग लाइसेंस (DL) *</div>
                  <label className="mt-3 block px-3 py-2 bg-[#1B3A6B] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#12284C]">
                    <Upload className="w-3.5 h-3.5 inline mr-1" />
                    फ़ोटो चुनें
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload('dlFile', e)} />
                  </label>
                  {driverForm.dlFile && <div className="text-[11px] text-[#1E7F4F] font-bold mt-2">✓ अपलोड हुआ</div>}
                </div>

                {/* Aadhaar Upload */}
                <div className="border-2 border-dashed border-[#1B3A6B]/30 rounded-xl p-4 text-center">
                  <Shield className="w-8 h-8 text-[#1B3A6B] mx-auto mb-2" />
                  <div className="text-xs font-bold text-[#1B3A6B]">आधार कार्ड (Aadhaar) *</div>
                  <label className="mt-3 block px-3 py-2 bg-[#1B3A6B] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#12284C]">
                    <Upload className="w-3.5 h-3.5 inline mr-1" />
                    फ़ोटो चुनें
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload('aadhaarFile', e)} />
                  </label>
                  {driverForm.aadhaarFile && <div className="text-[11px] text-[#1E7F4F] font-bold mt-2">✓ अपलोड हुआ</div>}
                </div>

                {/* Photo Upload */}
                <div className="border-2 border-dashed border-[#1B3A6B]/30 rounded-xl p-4 text-center">
                  <User className="w-8 h-8 text-[#1E7F4F] mx-auto mb-2" />
                  <div className="text-xs font-bold text-[#1B3A6B]">पासपोर्ट साइज़ फ़ोटो *</div>
                  <label className="mt-3 block px-3 py-2 bg-[#1B3A6B] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#12284C]">
                    <Upload className="w-3.5 h-3.5 inline mr-1" />
                    फ़ोटो चुनें
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload('photoFile', e)} />
                  </label>
                  {driverForm.photoFile && <div className="text-[11px] text-[#1E7F4F] font-bold mt-2">✓ अपलोड हुआ</div>}
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button type="button" onClick={() => setDriverStep(3)} className="signboard-btn-outline px-6 py-2.5 text-sm">← {t('common.back')}</button>
                <button type="button" onClick={() => setDriverStep(5)} className="signboard-btn-primary px-6 py-2.5 text-sm">{t('common.next')} →</button>
              </div>
            </div>
          )}

          {/* STEP 5: EMERGENCY CONTACT & BANK */}
          {driverStep === 5 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-baloo text-[#1B3A6B]">
                चरण 5: इमरजेंसी संपर्क व बैंक खाता
              </h3>

              <div className="p-4 rounded-xl bg-red-50/70 border border-red-200">
                <div className="text-xs font-bold text-[#C8322B] uppercase tracking-wider mb-2">
                  आपातकालीन संपर्क (Emergency Contact)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#14171C]">नाम (Name)</label>
                    <input
                      type="text"
                      value={driverForm.emergencyName}
                      onChange={(e) => setDriverForm({ ...driverForm, emergencyName: e.target.value })}
                      placeholder="उदा. Smt. Manpreet Kaur"
                      className="w-full p-2 bg-white rounded border border-gray-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#14171C]">रिश्ता (Relation)</label>
                    <select
                      value={driverForm.emergencyRelation}
                      onChange={(e) => setDriverForm({ ...driverForm, emergencyRelation: e.target.value })}
                      className="w-full p-2 bg-white rounded border border-gray-300 text-xs"
                    >
                      <option value="Spouse">पत्नी / Spouse</option>
                      <option value="Parent">माता/पिता / Parent</option>
                      <option value="Sibling">भाई/बहन / Sibling</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#14171C]">फ़ोन (Phone)</label>
                    <input
                      type="tel"
                      value={driverForm.emergencyPhone}
                      onChange={(e) => setDriverForm({ ...driverForm, emergencyPhone: e.target.value })}
                      placeholder="98123 45678"
                      className="w-full p-2 bg-white rounded border border-gray-300 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FBF6EC] border border-[#1B3A6B]/20">
                <div className="text-xs font-bold text-[#1B3A6B] uppercase tracking-wider mb-2">
                  सीधे सैलरी के लिए बैंक खाता (Direct Bank Account)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#14171C]">खाता संख्या (Account No)</label>
                    <input
                      type="text"
                      value={driverForm.bankAccount}
                      onChange={(e) => setDriverForm({ ...driverForm, bankAccount: e.target.value })}
                      placeholder="123456789012"
                      className="w-full p-2 bg-white rounded border border-gray-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#14171C]">IFSC कोड</label>
                    <input
                      type="text"
                      value={driverForm.ifsc}
                      onChange={(e) => setDriverForm({ ...driverForm, ifsc: e.target.value })}
                      placeholder="SBIN0001234"
                      className="w-full p-2 bg-white rounded border border-gray-300 text-xs uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#14171C]">बैंक का नाम</label>
                    <input
                      type="text"
                      value={driverForm.bankName}
                      onChange={(e) => setDriverForm({ ...driverForm, bankName: e.target.value })}
                      placeholder="State Bank of India"
                      className="w-full p-2 bg-white rounded border border-gray-300 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button type="button" onClick={() => setDriverStep(4)} className="signboard-btn-outline px-6 py-2.5 text-sm">← {t('common.back')}</button>
                <button type="button" onClick={() => setDriverStep(6)} className="signboard-btn-primary px-6 py-2.5 text-sm">{t('common.next')} →</button>
              </div>
            </div>
          )}

          {/* STEP 6: REVIEW & SUBMIT */}
          {driverStep === 6 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-baloo text-[#1B3A6B]">
                चरण 6: समीक्षा व आवेदन जमा करें (Review & Submit)
              </h3>

              <div className="bg-[#FBF6EC] p-4 rounded-xl border border-gray-200 text-xs space-y-2">
                <div><strong>नाम:</strong> {driverForm.name || 'Gurpreet Singh'} | <strong>मोबाइल:</strong> +91 {driverForm.phone || '9876500001'}</div>
                <div><strong>शहर/राज्य:</strong> {driverForm.city}, {driverForm.state} | <strong>अनुभव:</strong> {driverForm.experienceYears} वर्ष</div>
                <div><strong>DL श्रेणी:</strong> {driverForm.dlClass} ({driverForm.dlNumber || 'DL-PENDING'})</div>
                <div><strong>वाहन:</strong> {driverForm.vehicleTypes.join(', ')}</div>
                <div><strong>रूट:</strong> {driverForm.routes.join(', ')}</div>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-[#14171C]/80 leading-relaxed">
                ⚖️ <strong>शर्तें:</strong> {t('common.disclaimer')}
              </div>

              <div className="flex justify-between pt-4">
                <button type="button" onClick={() => setDriverStep(5)} className="signboard-btn-outline px-6 py-2.5 text-sm">← {t('common.back')}</button>
                <button
                  type="button"
                  onClick={handleDriverSubmit}
                  className="signboard-btn-primary px-8 py-3 text-base flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Sparkles className="w-5 h-5 text-[#F5C400]" />
                  <span>आवेदन जमा करें (Submit Application)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TRANSPORTER ONBOARDING FLOW */}
      {!registrationComplete && selectedRole === 'owner' && (
        <div className="bg-white rounded-2xl shadow-xl border border-[#1B3A6B]/20 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-8 h-8 text-[#1B3A6B]" />
            <div>
              <h2 className="text-2xl font-bold font-baloo text-[#1B3A6B]">
                ट्रांसपोर्टर रजिस्ट्रेशन (Transporter Onboarding)
              </h2>
              <p className="text-xs text-[#14171C]/70">
                Tell us about your fleet to access verified uniformed drivers
              </p>
            </div>
          </div>

          {/* AI AUTO-FILL FOR TRANSPORTERS */}
          <div className="mb-6 p-4 rounded-xl bg-[#1B3A6B]/5 border-2 border-[#1B3A6B]/20">
            <div className="flex items-center gap-2 mb-1.5">
              <Wand2 className="w-4 h-4 text-[#F4741F]" />
              <span className="text-xs font-bold font-baloo text-[#1B3A6B]">
                AI त्वरित फ्लीट विवरण (One-Line Auto-Fill)
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={aiText}
                onChange={(e) => setAiText(e.target.value)}
                placeholder="उदा. शर्मा लॉजिस्टिक्स, 15 गाड़ियां, फोन 7018709616, दिल्ली-मुंबई रूट"
                className="flex-1 bg-white px-3 py-2 rounded-lg border border-gray-300 text-xs"
              />
              <button
                type="button"
                onClick={() => handleAiAutoFill()}
                disabled={isAiProcessing || !aiText.trim()}
                className="px-4 py-2 bg-[#1B3A6B] hover:bg-[#12284C] text-[#F5C400] font-bold text-xs rounded-lg transition-all cursor-pointer shadow-xs"
              >
                {isAiProcessing ? 'भर रहा है...' : 'AI से भरें'}
              </button>
            </div>
            {aiStatus && (
              <div className="mt-2 text-xs text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{aiStatus}</span>
              </div>
            )}
          </div>

          <form onSubmit={handleOwnerSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#14171C] mb-1">ट्रांसपोर्ट कंपनी का नाम (Company Name) *</label>
                <input
                  type="text"
                  required
                  value={ownerForm.company}
                  onChange={(e) => setOwnerForm({ ...ownerForm, company: e.target.value })}
                  placeholder="उदा. Sharma Roadways Logistics"
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14171C] mb-1">संपर्क व्यक्ति (Contact Person Name) *</label>
                <input
                  type="text"
                  required
                  value={ownerForm.contactName}
                  onChange={(e) => setOwnerForm({ ...ownerForm, contactName: e.target.value })}
                  placeholder="उदा. Ramesh Sharma"
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#14171C] mb-1">मोबाइल नंबर (Mobile) *</label>
                <input
                  type="tel"
                  required
                  value={ownerForm.phone}
                  onChange={(e) => setOwnerForm({ ...ownerForm, phone: e.target.value })}
                  placeholder="98765 00002"
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14171C] mb-1">शहर (City) *</label>
                <input
                  type="text"
                  required
                  value={ownerForm.city}
                  onChange={(e) => setOwnerForm({ ...ownerForm, city: e.target.value })}
                  placeholder="उदा. Ludhiana / Delhi"
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14171C] mb-1">कुल फ्लीट साइज़ (Fleet Size) *</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={ownerForm.fleetSize}
                  onChange={(e) => setOwnerForm({ ...ownerForm, fleetSize: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14171C] mb-1">GST नंबर (Optional)</label>
              <input
                type="text"
                value={ownerForm.gst}
                onChange={(e) => setOwnerForm({ ...ownerForm, gst: e.target.value })}
                placeholder="07AAAAA0000A1Z5"
                className="w-full p-2.5 rounded-lg border border-gray-300 text-sm uppercase"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="signboard-btn-outline px-6 py-2.5 text-sm"
              >
                ← भूमिका बदलें (Change Role)
              </button>
              <button
                type="submit"
                className="signboard-btn-neel px-8 py-2.5 text-base cursor-pointer"
              >
                रजिस्टर करें व डैशबोर्ड खोलें →
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

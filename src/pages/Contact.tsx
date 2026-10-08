import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, MapPin, CheckCircle2, Send } from 'lucide-react';
import { store } from '../services/store';
import { useLanguage } from '../i18n/LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    role: 'driver',
    city: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    store.logAction(
      'CONTACT_INQUIRY',
      formData.name,
      `Inquiry from [${formData.role.toUpperCase()}] in ${formData.city || 'North India'}: ${formData.message}`
    );

    setSubmitted(true);
  };

  return (
    <div className="w-full pb-16">
      {/* Banner */}
      <section className="bg-[#1B3A6B] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-[#F5C400]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F4741F] text-white text-xs font-bold uppercase tracking-wider mb-3">
            24x7 Support Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-baloo text-white mb-4">
            संपर्क करें (Contact HauliMate)
          </h1>
          <p className="text-base sm:text-xl text-white/85 max-w-2xl mx-auto font-mukta">
            We are always on call for drivers, transporters, and highway logistics queries.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Direct Channels */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-baloo text-[#1B3A6B] mb-6">
              हमसे सीधे बात करें
            </h2>

            <div className="space-y-4 mb-8">
              <a
                href="https://wa.me/917018709616"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-[#1E7F4F] text-white shadow-md hover:bg-[#1E7F4F]/90 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs text-green-100 font-bold uppercase tracking-wider">Instant Chat (24x7)</div>
                  <div className="text-lg font-bold font-baloo">WhatsApp: +91 70187 09616</div>
                  <div className="text-xs text-green-100">Direct response from fleet officer within 5 mins</div>
                </div>
              </a>

              <a
                href="tel:+918527977238"
                className="flex items-center gap-4 p-5 rounded-2xl bg-[#1B3A6B] text-white shadow-md hover:bg-[#12284C] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#F5C400]" />
                </div>
                <div>
                  <div className="text-xs text-white/70 font-bold uppercase tracking-wider">Call Support & Helpline</div>
                  <div className="text-lg font-bold font-baloo">+91 85279 77238</div>
                  <div className="text-xs text-white/70">24x7 control room for highway assistance & immediate placement</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-[#1B3A6B]/20 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-[#F4741F]/15 flex items-center justify-center shrink-0 text-[#F4741F]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#14171C]/60 font-bold uppercase tracking-wider">Email Inquiry</div>
                  <div className="text-base font-bold font-baloo text-[#1B3A6B]">contact@haulimate.in</div>
                  <div className="text-xs text-[#14171C]/70">For transporter fleet quotes & vendor tie-ups</div>
                </div>
              </div>
            </div>

            {/* Regional Hubs */}
            <div className="bg-[#FBF6EC] p-6 rounded-2xl border-2 border-[#1B3A6B]/20">
              <h3 className="font-bold font-baloo text-lg text-[#1B3A6B] mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#F4741F]" />
                मुख्य कार्यालय व भर्ती केंद्र
              </h3>
              <div className="space-y-2 text-xs sm:text-sm text-[#14171C]/80 font-mukta">
                <div><strong>HQ Gurugram:</strong> Tower B, Logistics Tech Park, Sector 34, Gurugram, Haryana 122004</div>
                <div><strong>Ludhiana Hub:</strong> GT Road Transport Nagar, Near Cheema Chowk, Ludhiana, Punjab 141003</div>
                <div><strong>Panipat Hub:</strong> Industrial Area Phase 2, National Highway 44, Panipat, Haryana 132103</div>
              </div>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#1B3A6B]/20 shadow-md">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#1E7F4F]/10 text-[#1E7F4F] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-baloo text-[#1B3A6B] mb-2">
                  धन्यवाद! आपका संदेश मिल गया है
                </h3>
                <p className="text-sm text-[#14171C]/75 font-mukta max-w-sm mx-auto mb-6">
                  Our coordinator will reach out to you on <strong>{formData.phone}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', role: 'driver', city: '', message: '' });
                  }}
                  className="signboard-btn-outline px-6 py-2.5 text-sm"
                >
                  नया संदेश भेजें
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-baloo text-[#1B3A6B] mb-1">
                    संदेश भेजें (Send a Message)
                  </h3>
                  <p className="text-xs text-[#14171C]/70 mb-4">
                    Leave your details and our team will call you back within 2 business hours.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#14171C] mb-1">
                    आप कौन हैं? (I am a...)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, role: 'driver' })}
                      className={`py-2.5 px-3 rounded-lg text-sm font-bold border-2 transition-all cursor-pointer ${
                        formData.role === 'driver'
                          ? 'bg-[#F4741F] text-white border-[#F4741F]'
                          : 'bg-gray-50 text-[#14171C] border-gray-200'
                      }`}
                    >
                      ड्राइवर (Driver)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, role: 'owner' })}
                      className={`py-2.5 px-3 rounded-lg text-sm font-bold border-2 transition-all cursor-pointer ${
                        formData.role === 'owner'
                          ? 'bg-[#1B3A6B] text-white border-[#1B3A6B]'
                          : 'bg-gray-50 text-[#14171C] border-gray-200'
                      }`}
                    >
                      ट्रांसपोर्टर (Transporter)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14171C] mb-1">
                    पूरा नाम (Full Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="उदा. Gurpreet Singh / Ramesh Sharma"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4741F] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14171C] mb-1">
                    फ़ोन नंबर (Mobile Number) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="98765 00000"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4741F] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14171C] mb-1">
                    शहर / राज्य (City / State)
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="उदा. Ludhiana, Panipat, Jaipur"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4741F] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14171C] mb-1">
                    संदेश या प्रश्न (Message)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="आपकी ज़रूरत या सवाल यहाँ लिखें..."
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4741F] text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full signboard-btn-primary py-3 text-base flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('common.submit')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

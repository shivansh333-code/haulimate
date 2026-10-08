import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Truck, Shield, Lock, Phone, ArrowRight, UserCheck, KeyRound, Sparkles } from 'lucide-react';
import { authService } from '../../services/authService';
import { UserRole } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

export const Login: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('driver');
  const [phone, setPhone] = useState('9876500001');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('admin@haulimate.in');
  const [password, setPassword] = useState('admin123');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setError('');
    setOtpSent(false);
    if (newRole === 'driver') {
      setPhone('9876500001');
    } else if (newRole === 'owner') {
      setPhone('9876500002');
    } else {
      setEmail('admin@haulimate.in');
      setPassword('admin123');
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError('कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें / Enter a valid 10-digit mobile number');
      return;
    }
    setOtpSent(true);
    setError('');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const res = authService.loginWithOtp(phone, otp, role);
    if (res.success) {
      navigate(role === 'driver' ? '/driver' : '/owner');
    } else {
      setError(res.error || 'गलत OTP / Invalid OTP');
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const res = authService.loginAdmin(email, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error || 'Login failed');
    }
  };

  const handleQuickDemo = (demoRole: UserRole) => {
    authService.demoLogin(demoRole);
    if (demoRole === 'driver') navigate('/driver');
    else if (demoRole === 'owner') navigate('/owner');
    else navigate('/admin');
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1B3A6B] text-[#F5C400] flex items-center justify-center shadow-lg border border-[#F4741F]">
            <Truck className="w-8 h-8" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-3xl font-extrabold font-baloo text-[#1B3A6B]">
          HauliMate पोर्टल लॉगिन
        </h2>
        <p className="mt-1 text-center text-xs sm:text-sm text-[#14171C]/75 font-mukta">
          "Driver nahi, Professional." • सुरक्षित लॉगिन
        </p>
      </div>

      {/* QUICK 1-CLICK DEMO TESTER BOX */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#F5C400]/20 border-2 border-dashed border-[#14171C] rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#14171C] mb-2 font-baloo">
            <Sparkles className="w-4 h-4 text-[#F4741F]" />
            <span>Instant Demo Switcher (एक क्लिक में टेस्ट करें)</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickDemo('driver')}
              className="py-2 px-1 text-center rounded-lg bg-[#F4741F] text-white text-xs font-bold hover:brightness-110 cursor-pointer shadow-xs"
            >
              🚚 Driver (Gurpreet)
            </button>
            <button
              onClick={() => handleQuickDemo('owner')}
              className="py-2 px-1 text-center rounded-lg bg-[#1B3A6B] text-white text-xs font-bold hover:brightness-110 cursor-pointer shadow-xs"
            >
              🏢 Transporter (Sharma)
            </button>
            <button
              onClick={() => handleQuickDemo('admin')}
              className="py-2 px-1 text-center rounded-lg bg-[#14171C] text-white text-xs font-bold hover:brightness-110 cursor-pointer shadow-xs"
            >
              ⚙️ Admin / HR Panel
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border-2 border-[#1B3A6B]/20">
          
          {/* Role Switcher Tabs */}
          <div className="flex rounded-xl bg-[#FBF6EC] p-1 border border-gray-200 mb-6">
            <button
              onClick={() => handleRoleChange('driver')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                role === 'driver' ? 'bg-[#F4741F] text-white shadow-xs' : 'text-[#14171C]/70 hover:text-[#14171C]'
              }`}
            >
              ड्राइवर (Driver)
            </button>
            <button
              onClick={() => handleRoleChange('owner')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                role === 'owner' ? 'bg-[#1B3A6B] text-white shadow-xs' : 'text-[#14171C]/70 hover:text-[#14171C]'
              }`}
            >
              ट्रांसपोर्टर (Owner)
            </button>
            <button
              onClick={() => handleRoleChange('admin')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                role === 'admin' ? 'bg-[#14171C] text-white shadow-xs' : 'text-[#14171C]/70 hover:text-[#14171C]'
              }`}
            >
              एडमिन (Admin)
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs sm:text-sm font-medium text-[#C8322B]">
              {error}
            </div>
          )}

          {/* DRIVER & OWNER LOGIN FORM (MOBILE + OTP) */}
          {role !== 'admin' ? (
            !otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#14171C] mb-1">
                    {t('common.phone')} (10 Digit Mobile)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500 font-bold text-sm">+91</span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 00001"
                      className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4741F] text-base font-bold text-[#14171C]"
                    />
                  </div>
                </div>

                <div className="text-xs text-[#14171C]/70 bg-[#FBF6EC] p-2.5 rounded-lg border border-gray-200">
                  💡 <strong>Demo Mobile:</strong> {role === 'driver' ? '9876500001' : '9876500002'}
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 text-base flex items-center justify-center gap-2 cursor-pointer ${
                    role === 'driver' ? 'signboard-btn-primary' : 'signboard-btn-neel'
                  }`}
                >
                  <span>OTP कोड भेजें (Send OTP)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 bg-blue-50 text-[#1B3A6B] rounded-lg text-xs flex items-center justify-between">
                  <span>OTP sent to +91 {phone}</span>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-[#F4741F] font-bold hover:underline"
                  >
                    बदलें (Change)
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14171C] mb-1">
                    {t('common.otp')} (Demo OTP: 1234)
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="1234"
                    autoFocus
                    className="w-full text-center tracking-widest text-2xl font-black py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4741F]"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 text-base flex items-center justify-center gap-2 cursor-pointer ${
                    role === 'driver' ? 'signboard-btn-primary' : 'signboard-btn-neel'
                  }`}
                >
                  <span>सत्यापित करें व लॉगिन करें (Verify & Login)</span>
                </button>
              </form>
            )
          ) : (
            /* ADMIN LOGIN (EMAIL + PASSWORD) */
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#14171C] mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@haulimate.in"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#14171C] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14171C] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin123"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#14171C] text-sm"
                />
              </div>

              <div className="text-xs text-gray-500 bg-gray-50 p-2.5 rounded-lg">
                🔐 <strong>Demo Admin:</strong> <code>admin@haulimate.in</code> / <code>admin123</code>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#14171C] text-white font-baloo font-bold text-base rounded-lg hover:bg-black transition-all cursor-pointer"
              >
                Access Admin Central
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-xs text-[#14171C]/75 pt-4 border-t border-gray-200 space-y-2">
            <div>
              नया खाता खोलना चाहते हैं?{' '}
              <Link to="/register" className="font-bold text-[#F4741F] hover:underline">
                {t('common.chaloRegister')}
              </Link>
            </div>
            <div className="text-[11px] text-gray-500">
              लॉगिन सहायता: Call <a href="tel:+918527977238" className="font-bold text-[#1B3A6B] underline">8527977238</a> | WhatsApp <a href="https://wa.me/917018709616" target="_blank" rel="noreferrer" className="font-bold text-[#1E7F4F] underline">7018709616</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

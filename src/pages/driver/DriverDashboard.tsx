import React, { useState } from 'react';
import { 
  Shield, Truck, CheckCircle2, Clock, Calendar, Download, 
  MapPin, AlertOctagon, Phone, UserCheck, Award, FileText, 
  Sparkles, Check, ChevronRight, AlertCircle, RefreshCw 
} from 'lucide-react';
import { authService } from '../../services/authService';
import { driverService } from '../../services/driverService';
import { store } from '../../services/store';
import { useLanguage } from '../../i18n/LanguageContext';
import { Driver, Attendance, PaySlip, Placement } from '../../types';

export const DriverDashboard: React.FC = () => {
  const { t } = useLanguage();
  const currentUser = authService.getCurrentUser();
  const initialDriver = driverService.getCurrentDriver(currentUser?.id || 'user-driver-1');

  const [driver, setDriver] = useState<Driver | undefined>(initialDriver);
  const [activeTab, setActiveTab] = useState<'overview' | 'idcard' | 'shifts' | 'payslips' | 'training' | 'leave'>('overview');
  const [flipIdCard, setFlipIdCard] = useState(false);
  const [shiftActionMsg, setShiftActionMsg] = useState('');
  const [showPaySlipModal, setShowPaySlipModal] = useState<PaySlip | null>(null);

  // Leave form
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [leaveEndDate, setLeaveEndDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  // SOS Emergency
  const [showSosConfirm, setShowSosConfirm] = useState(false);
  const [sosSent, setSosSent] = useState(false);

  if (!driver) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold font-baloo text-[#1B3A6B]">ड्राइवर डेटा लोड हो रहा है...</h2>
      </div>
    );
  }

  const currentPlacement = driverService.getCurrentPlacement(driver.id);
  const owner = currentPlacement ? store.getOwners().find(o => o.id === currentPlacement.ownerId) : null;
  const attendanceLogs = driverService.getAttendanceHistory(driver.id);
  const payslips = driverService.getPaySlips(driver.id);

  const handleShiftCheckIn = () => {
    const res = driverService.markAttendance(driver.id);
    if (res.success) {
      setShiftActionMsg(`✓ हाज़िरी व GPS टाइमस्टैम्प दर्ज हुआ: ${res.attendance.checkIn} (${res.attendance.location})`);
      setDriver(driverService.getDriverById(driver.id));
      setTimeout(() => setShiftActionMsg(''), 5000);
    }
  };

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveStartDate || !leaveEndDate) return;

    store.logAction(
      'LEAVE_REQUEST',
      driver.name,
      `Requested leave from ${leaveStartDate} to ${leaveEndDate}: ${leaveReason || 'Planned family leave'}`,
      driver.id
    );

    setLeaveSubmitted(true);
  };

  const handleTriggerSos = () => {
    store.logAction(
      'EMERGENCY_SOS',
      driver.name,
      `🚨 EMERGENCY SOS TRIGGERED by Driver ${driver.name} (Phone: ${driver.emergencyContact.phone}) on Route ${currentPlacement?.route || 'NH-44'} (Vehicle: ${currentPlacement?.vehicleNo || 'Fleet Truck'})`,
      driver.id
    );
    setSosSent(true);
    setShowSosConfirm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* SOS MODAL */}
      {showSosConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border-4 border-[#C8322B] text-center shadow-2xl">
            <AlertOctagon className="w-16 h-16 text-[#C8322B] mx-auto mb-3 animate-pulse" />
            <h3 className="text-2xl font-bold font-baloo text-[#14171C]">
              इमरजेंसी अलर्ट (Highway SOS)
            </h3>
            <p className="text-sm text-[#14171C]/80 mt-2 font-mukta">
              क्या आप तुरंत HauliMate 24x7 कंट्रोल रूम और फ्लीट मैनेजर को आपातकालीन संदेश और अपनी लोकेशन भेजना चाहते हैं?
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowSosConfirm(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-300 font-bold text-sm cursor-pointer"
              >
                रद्द करें (Cancel)
              </button>
              <button
                onClick={handleTriggerSos}
                className="flex-1 py-2.5 rounded-lg bg-[#C8322B] text-white font-bold text-sm hover:bg-red-700 cursor-pointer shadow-md"
              >
                हाँ, SOS भेजें!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SOS SENT NOTIFICATION */}
      {sosSent && (
        <div className="mb-6 p-4 rounded-xl bg-red-600 text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <AlertOctagon className="w-6 h-6 animate-bounce" />
            <div>
              <div className="font-bold text-base font-baloo">🚨 आपातकालीन अलर्ट भेज दिया गया है!</div>
              <div className="text-xs text-red-100">24x7 कंट्रोल रूम आपके नंबर पर 2 मिनट में संपर्क कर रहा है। हेल्पलाइन: 1800-200-8899</div>
            </div>
          </div>
          <button
            onClick={() => setSosSent(false)}
            className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg font-bold cursor-pointer"
          >
            खारिज करें
          </button>
        </div>
      )}

      {/* DRIVER IDENTITY HEADER CARD */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#1B3A6B]/20 shadow-md mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={driver.avatarUrl}
                alt={driver.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-3 border-[#F4741F] shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-2 -right-2 bg-[#F5C400] text-[#14171C] p-1.5 rounded-full shadow-sm border border-white" title="HauliMate Verified Professional">
                <CheckCircle2 className="w-5 h-5 text-[#1B3A6B]" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-baloo text-[#1B3A6B]">
                  {driver.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1E7F4F]/10 text-[#1E7F4F] text-xs font-bold border border-[#1E7F4F]/30 uppercase">
                  ✓ {driver.verification.status}
                </span>
              </div>
              <div className="text-xs text-[#14171C]/75 font-semibold mt-0.5">
                Employee ID: <span className="font-mono text-[#1B3A6B] font-bold">{driver.employeeId || 'HM-PB-4821'}</span> • {driver.experienceYears} Years Exp • {driver.licence.licenceClass}
              </div>
              <div className="text-xs text-[#14171C]/60 flex items-center gap-2 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#F4741F]" />
                <span>{driver.city}, {driver.state}</span>
                <span>•</span>
                <span>{driver.vehicleTypes.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Status Pill */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Employment Status Pill */}
            <div className="flex items-center gap-2 bg-[#FBF6EC] px-3 py-2 rounded-xl border border-gray-300">
              <span className="text-xs font-bold text-[#14171C]/70">Status:</span>
              <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                driver.employment.status === 'deployed'
                  ? 'bg-[#1E7F4F] text-white'
                  : 'bg-[#F5C400] text-[#14171C]'
              }`}>
                {driver.employment.status}
              </span>
            </div>

            {/* Check-In Attendance Button */}
            <button
              onClick={handleShiftCheckIn}
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-sm transition-all bg-[#1E7F4F] hover:bg-green-800 text-white"
            >
              <Clock className="w-4 h-4" />
              <span>Shift Check-In</span>
            </button>

            {/* Highway SOS Button */}
            <button
              onClick={() => setShowSosConfirm(true)}
              className="px-3.5 py-2.5 rounded-xl bg-[#C8322B] hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <AlertOctagon className="w-4 h-4" />
              <span>SOS Emergency</span>
            </button>
          </div>
        </div>

        {shiftActionMsg && (
          <div className="mt-4 p-3 bg-green-50 text-[#1E7F4F] border border-green-200 rounded-lg text-xs font-bold animate-in fade-in">
            {shiftActionMsg}
          </div>
        )}
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex border-b border-gray-200 overflow-x-auto space-x-2 sm:space-x-4 mb-8">
        {[
          { key: 'overview', label: 'फ्लीट तैनाती (Current Fleet)' },
          { key: 'idcard', label: 'डिजिटल स्मार्ट ID (Smart ID Card)' },
          { key: 'shifts', label: 'सफ़र व हाज़िरी (Attendance)' },
          { key: 'payslips', label: 'सैलरी व पे-स्लिप (Payroll)' },
          { key: 'training', label: 'ट्रेनिंग व वर्दी (Kit & Badges)' },
          { key: 'leave', label: 'छुट्टी अर्ज़ी (Leave Request)' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
              activeTab === tab.key
                ? 'border-[#F4741F] text-[#F4741F]'
                : 'border-transparent text-gray-500 hover:text-[#1B3A6B]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {currentPlacement ? (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#1B3A6B] shadow-lg">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#1B3A6B] text-[#F5C400] flex items-center justify-center font-bold">
                    <Truck className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F4741F]">
                      Active Fleet Deployment
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold font-baloo text-[#1B3A6B]">
                      {owner?.company || 'Sharma Roadways Logistics'}
                    </h2>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-100 text-[#1E7F4F] text-xs font-bold uppercase tracking-wider">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-[#FBF6EC] rounded-xl border border-[#1B3A6B]/15">
                  <div className="text-xs text-gray-500 font-bold uppercase">आवंटित वाहन (Vehicle)</div>
                  <div className="text-base font-extrabold font-mono text-[#1B3A6B] mt-1">
                    {currentPlacement.vehicleNo}
                  </div>
                  <div className="text-[11px] text-gray-600">Heavy Commercial Goods Vehicle</div>
                </div>

                <div className="p-4 bg-[#FBF6EC] rounded-xl border border-[#1B3A6B]/15">
                  <div className="text-xs text-gray-500 font-bold uppercase">हाइवे रूट (Corridor)</div>
                  <div className="text-base font-bold text-[#14171C] mt-1">
                    {currentPlacement.route}
                  </div>
                  <div className="text-[11px] text-gray-600">Western Dedicated Corridor</div>
                </div>

                <div className="p-4 bg-[#FBF6EC] rounded-xl border border-[#1B3A6B]/15">
                  <div className="text-xs text-gray-500 font-bold uppercase">मासिक सैलरी (Monthly Salary)</div>
                  <div className="text-base font-extrabold text-[#1E7F4F] mt-1">
                    ₹28,000 / माह
                  </div>
                  <div className="text-[11px] text-gray-600">Direct Bank Deposit by 5th</div>
                </div>

                <div className="p-4 bg-[#FBF6EC] rounded-xl border border-[#1B3A6B]/15">
                  <div className="text-xs text-gray-500 font-bold uppercase">तैनाती तिथि (Start Date)</div>
                  <div className="text-base font-bold text-[#14171C] mt-1">
                    {currentPlacement.startDate}
                  </div>
                  <div className="text-[11px] text-gray-600">HauliMate SLA Active</div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#1B3A6B]" />
                  <span className="text-xs sm:text-sm font-semibold text-[#1B3A6B]">
                    फ्लीट कोऑर्डिनेटर हेल्पलाइन: <strong>+91 85279 77238</strong> | WhatsApp: <strong>7018709616</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://wa.me/917018709616"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-md bg-[#1E7F4F] text-white text-xs font-bold hover:bg-[#1E7F4F]/90"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="tel:+918527977238"
                    className="signboard-btn-outline px-4 py-1.5 text-xs whitespace-nowrap"
                  >
                    कंट्रोल रूम कॉल करें
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white rounded-2xl border border-gray-200 text-center">
              <Truck className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold font-baloo text-[#1B3A6B]">सत्यापित स्टैंडबाय पूल (Standby Bench)</h3>
              <p className="text-xs text-[#14171C]/75 mt-1">
                You are currently on our verified standby bench ready for fleet deployment.
              </p>
            </div>
          )}

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
              <div className="text-xs text-gray-500 font-bold uppercase">कुल पूरे किए गए सफ़र</div>
              <div className="text-3xl font-extrabold font-baloo text-[#1B3A6B] mt-1">
                {driver.tripsCompleted} ट्रिप्स
              </div>
              <div className="text-xs text-[#1E7F4F] font-semibold mt-1">✓ 100% ऑन-टाइम डिलीवरी रिकॉर्ड</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
              <div className="text-xs text-gray-500 font-bold uppercase">सुरक्षा व आचरण रेटिंग</div>
              <div className="text-3xl font-extrabold font-baloo text-[#F4741F] mt-1">
                {driver.rating} / 5.0 ⭐
              </div>
              <div className="text-xs text-gray-600 mt-1">Top Rated Highway Professional</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
              <div className="text-xs text-gray-500 font-bold uppercase">इंश्योरेंस स्थिति</div>
              <div className="text-xl font-bold font-baloo text-[#1E7F4F] mt-2">Active Policy</div>
              <div className="text-xs text-gray-600 mt-1">Accidental Cover: ₹5,00,000</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SMART ID CARD */}
      {activeTab === 'idcard' && (
        <div className="space-y-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold font-baloo text-[#1B3A6B]">
              स्मार्ट डिजिटल पहचान पत्र (HauliMate Professional ID)
            </h3>
            <p className="text-xs text-gray-600">
              Tap card to flip between Front and Back • Police & RTO Verified
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div
              onClick={() => setFlipIdCard(!flipIdCard)}
              className="w-full max-w-md h-72 cursor-pointer perspective-1000 group"
            >
              {!flipIdCard ? (
                /* FRONT OF CARD */
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#1B3A6B] via-[#163058] to-[#0E1F38] text-white p-6 border-3 border-[#F5C400] shadow-2xl relative flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#F4741F] via-[#F5C400] to-[#1E7F4F]" />

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="w-6 h-6 text-[#F5C400]" />
                        <span className="font-extrabold font-baloo text-base tracking-wider text-[#F5C400]">
                          HAULIMATE
                        </span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-[#F4741F] px-2 py-0.5 rounded text-white">
                        PROFESSIONAL DRIVER
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <img
                        src={driver.avatarUrl}
                        alt={driver.name}
                        className="w-18 h-18 rounded-xl object-cover border-2 border-[#F5C400]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-xl font-extrabold font-baloo text-white">
                          {driver.name}
                        </div>
                        <div className="text-xs text-white/80 font-mukta">
                          पिता: {driver.fatherName}
                        </div>
                        <div className="text-xs font-mono text-[#F5C400] font-bold mt-1">
                          ID: {driver.employeeId || 'HM-PB-4821'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[11px] text-white/80">
                    <div>
                      <div>DOB: {driver.dob}</div>
                      <div>{driver.licence.licenceClass} Heavy Verified</div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-0.5 rounded bg-green-900/60 text-green-300 font-bold border border-green-500/40">
                        POLICE CLEARED
                      </span>
                      <div className="text-[9px] text-gray-300 mt-0.5">Click to flip ↻</div>
                    </div>
                  </div>
                </div>
              ) : (
                /* BACK OF CARD */
                <div className="w-full h-full rounded-2xl bg-[#FBF6EC] text-[#14171C] p-6 border-3 border-[#1B3A6B] shadow-2xl relative flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-[#1B3A6B]" />

                  <div>
                    <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                      <div className="text-xs font-bold text-[#1B3A6B] uppercase tracking-wider">
                        Official Credential Back
                      </div>
                      <div className="text-[11px] font-bold text-[#C8322B]">
                        Blood Group: O+
                      </div>
                    </div>

                    <div className="mt-3 space-y-1.5 text-xs text-[#14171C]/85">
                      <div><strong>DL Number:</strong> <span className="font-mono font-bold">{driver.licence.number}</span></div>
                      <div><strong>DL Expiry:</strong> {driver.licence.expiryDate} ({driver.licence.licenceClass})</div>
                      <div><strong>Emergency:</strong> {driver.emergencyContact.name} ({driver.emergencyContact.phone})</div>
                      <div><strong>RTO Authority:</strong> PB-10 Ludhiana Transport Authority</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-300 flex items-center justify-between">
                    <div className="w-12 h-12 bg-white border border-gray-300 rounded p-1 flex items-center justify-center font-mono text-[8px] text-center font-bold">
                      QR VERIFY
                    </div>
                    <div className="text-right text-[11px]">
                      <div className="font-bold text-[#1B3A6B]">24x7 Highway Hotline</div>
                      <div className="text-[#C8322B] font-bold">1800-200-8899</div>
                      <div className="text-[9px] text-gray-500">Click to flip ↻</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setFlipIdCard(!flipIdCard)}
                className="signboard-btn-outline px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>कार्ड पलटें (Flip Card)</span>
              </button>

              <button
                onClick={() => window.print()}
                className="signboard-btn-primary px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>स्मार्ट ID प्रिंट करें</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SHIFTS / ATTENDANCE */}
      {activeTab === 'shifts' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold font-baloo text-[#1B3A6B]">
                सफ़र व हाज़िरी इतिहास (Shift Attendance Logs)
              </h3>
              <p className="text-xs text-gray-500">
                Automatic GPS check-in and highway timestamp records
              </p>
            </div>
            <button
              onClick={handleShiftCheckIn}
              className="signboard-btn-primary px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Clock className="w-4 h-4" />
              <span>Shift Check-In</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FBF6EC] border-b border-gray-200 text-[#1B3A6B] font-baloo font-bold">
                  <tr>
                    <th className="p-3.5">तारीख़ (Date)</th>
                    <th className="p-3.5">गाड़ी संख्या (Vehicle)</th>
                    <th className="p-3.5">चेक-इन समय (Time)</th>
                    <th className="p-3.5">स्थान (Location)</th>
                    <th className="p-3.5 text-right">स्थिति (Status)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {attendanceLogs.map((att) => (
                    <tr key={att.id} className="hover:bg-gray-50">
                      <td className="p-3.5 font-medium text-[#14171C]">{att.date}</td>
                      <td className="p-3.5 font-mono font-bold text-[#1B3A6B]">{att.vehicleNo || 'Fleet Vehicle'}</td>
                      <td className="p-3.5 text-gray-700">{att.checkIn || '08:00 AM'}</td>
                      <td className="p-3.5 text-gray-600">{att.location || 'GT Road Corridor'}</td>
                      <td className="p-3.5 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-green-100 text-[#1E7F4F]">
                          {att.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PAYSLIPS */}
      {activeTab === 'payslips' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold font-baloo text-[#1B3A6B]">
              सैलरी विवरण व पे-स्लिप (Payroll & Earnings)
            </h3>
            <p className="text-xs text-gray-500">
              Direct monthly bank credits with zero hidden cuts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {payslips.map((pay) => (
              <div key={pay.id} className="bg-white rounded-2xl p-5 border-2 border-[#1B3A6B]/20 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                    <span className="font-bold font-baloo text-base text-[#1B3A6B]">{pay.month}</span>
                    <span className="px-2 py-0.5 rounded bg-green-100 text-[#1E7F4F] text-[10px] font-bold uppercase">
                      {pay.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#14171C]/80">
                    <div className="flex justify-between">
                      <span>Basic Salary:</span>
                      <span className="font-bold">₹{pay.basicSalary.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-[#1E7F4F]">
                      <span>Trip Allowances:</span>
                      <span className="font-bold">+₹{pay.tripAllowances.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-blue-600">
                      <span>Performance Bonus:</span>
                      <span className="font-bold">+₹{pay.bonus.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-extrabold text-[#1B3A6B]">
                      <span>Net Payout:</span>
                      <span>₹{pay.netPay.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-gray-500 mt-3 pt-2 border-t border-gray-100">
                    Direct Credit: {driver.bank.accountNumberMasked} ({driver.bank.bankName})
                  </div>
                </div>

                <button
                  onClick={() => setShowPaySlipModal(pay)}
                  className="mt-4 w-full signboard-btn-outline py-2 text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>पे-स्लिप देखें (View Slip)</span>
                </button>
              </div>
            ))}
          </div>

          {showPaySlipModal && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full border-4 border-[#1B3A6B] shadow-2xl">
                <div className="flex justify-between items-start border-b-2 border-[#1B3A6B] pb-4 mb-4">
                  <div>
                    <h4 className="text-xl font-extrabold font-baloo text-[#1B3A6B]">HAULIMATE PAY SLIP</h4>
                    <div className="text-xs text-gray-600">HauliMate Logistics Services Pvt. Ltd.</div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-[#FBF6EC] px-2.5 py-1 rounded border border-gray-300">
                    {showPaySlipModal.month}
                  </span>
                </div>

                <div className="text-xs space-y-2 mb-4">
                  <div><strong>Driver Name:</strong> {driver.name} (ID: {driver.employeeId})</div>
                  <div><strong>Transporter Fleet:</strong> Sharma Roadways Logistics</div>
                  <div><strong>Bank Account:</strong> {driver.bank.accountNumberMasked} ({driver.bank.bankName})</div>
                  <div><strong>Payment Date:</strong> {showPaySlipModal.paymentDate || '2026-03-02'}</div>
                </div>

                <div className="bg-[#FBF6EC] p-3 rounded-lg text-xs space-y-1.5 mb-4 border border-gray-200">
                  <div className="flex justify-between"><span>Basic Salary:</span><span>₹{showPaySlipModal.basicSalary}</span></div>
                  <div className="flex justify-between"><span>Trip Allowances:</span><span>₹{showPaySlipModal.tripAllowances}</span></div>
                  <div className="flex justify-between"><span>Performance Bonus:</span><span>₹{showPaySlipModal.bonus}</span></div>
                  <div className="flex justify-between font-bold text-sm border-t border-gray-300 pt-1 text-[#1B3A6B]">
                    <span>Net Credited Amount:</span><span>₹{showPaySlipModal.netPay}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPaySlipModal(null)}
                    className="flex-1 signboard-btn-outline py-2 text-xs"
                  >
                    बंद करें (Close)
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex-1 signboard-btn-primary py-2 text-xs"
                  >
                    प्रिंट करें (Print)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: TRAINING & UNIFORM */}
      {activeTab === 'training' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold font-baloo text-[#1B3A6B]">
              ट्रेनिंग सर्टिफिकेशन व वर्दी किट
            </h3>
            <p className="text-xs text-gray-500">
              Professional credentials issued by HauliMate Academy
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {driver.training.map((tRec) => (
              <div key={tRec.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-[#1E7F4F] flex items-center justify-center font-bold">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base font-baloo text-[#1B3A6B]">{tRec.title}</h4>
                    <span className="text-xs text-[#1E7F4F] font-bold">✓ {tRec.status} (Score: {tRec.score}%)</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 font-mukta">
                  Certificate No: <strong>{tRec.certificateNumber}</strong> • Completed: {tRec.completedDate}
                </div>
              </div>
            ))}
          </div>

          {/* Uniform Kit Box */}
          <div className="bg-[#FBF6EC] p-6 rounded-2xl border-2 border-[#1B3A6B]/20">
            <h4 className="font-bold text-base font-baloo text-[#1B3A6B] mb-3 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#F4741F]" />
              जारी की गई आधिकारिक वर्दी किट (Issued Uniform Kit)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-[#14171C]">
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center gap-2">
                <Check className="w-4 h-4 text-[#1E7F4F]" />
                <span>2x Professional Shirts (Navy)</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center gap-2">
                <Check className="w-4 h-4 text-[#1E7F4F]" />
                <span>Heavy Duty Work Trousers</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center gap-2">
                <Check className="w-4 h-4 text-[#1E7F4F]" />
                <span>ISI Steel-Toe Safety Boots</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center gap-2">
                <Check className="w-4 h-4 text-[#1E7F4F]" />
                <span>RFID Digital Lanyard ID</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: LEAVE REQUEST */}
      {activeTab === 'leave' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#1B3A6B]/20 shadow-md">
            <h3 className="text-xl font-bold font-baloo text-[#1B3A6B] mb-1">
              छुट्टी की अर्ज़ी (Request Planned Leave)
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Advance leave requests help HauliMate dispatch standby drivers seamlessly without vehicle stoppage.
            </p>

            {leaveSubmitted ? (
              <div className="p-6 text-center bg-green-50 rounded-xl border border-green-200">
                <CheckCircle2 className="w-12 h-12 text-[#1E7F4F] mx-auto mb-2" />
                <h4 className="font-bold font-baloo text-lg text-[#1B3A6B]">अर्ज़ी सफलतापूर्वक जमा हुई!</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Your leave request from {leaveStartDate} to {leaveEndDate} has been forwarded to the fleet coordinator.
                </p>
                <button
                  onClick={() => setLeaveSubmitted(false)}
                  className="mt-4 signboard-btn-outline px-4 py-1.5 text-xs"
                >
                  नई अर्ज़ी दें
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeaveSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#14171C] mb-1">प्रारंभ तिथि (Start Date) *</label>
                    <input
                      type="date"
                      required
                      value={leaveStartDate}
                      onChange={(e) => setLeaveStartDate(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#14171C] mb-1">अंतिम तिथि (End Date) *</label>
                    <input
                      type="date"
                      required
                      value={leaveEndDate}
                      onChange={(e) => setLeaveEndDate(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14171C] mb-1">अवकाश का कारण (Reason for Leave)</label>
                  <textarea
                    rows={3}
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    placeholder="उदा. पारिवारिक समारोह / गांव में जरूरी कार्य"
                    className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="signboard-btn-primary w-full py-3 text-sm cursor-pointer"
                >
                  छुट्टी की अर्ज़ी जमा करें (Submit Leave)
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

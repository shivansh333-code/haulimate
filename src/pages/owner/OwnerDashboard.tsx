import React, { useState } from 'react';
import { 
  Truck, Users, PlusCircle, AlertTriangle, CheckCircle2, 
  Clock, FileText, Phone, RefreshCw, ChevronRight, X, Sparkles, Check 
} from 'lucide-react';
import { authService } from '../../services/authService';
import { ownerService } from '../../services/ownerService';
import { store } from '../../services/store';
import { Owner, Requirement, Placement, Driver } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

export const OwnerDashboard: React.FC = () => {
  const { t } = useLanguage();
  const currentUser = authService.getCurrentUser();
  const initialOwner = ownerService.getCurrentOwner(currentUser?.id || 'user-owner-1');
  
  const [owner, setOwner] = useState<Owner | undefined>(initialOwner);
  const [showPostReqModal, setShowPostReqModal] = useState(false);
  const [showReplaceModal, setShowReplaceModal] = useState<{ 
    placementId: string;
    driverId: string; 
    driverName: string; 
    vehicleNo: string 
  } | null>(null);

  const [replaceReason, setReplaceReason] = useState('Unexcused absence');
  const [replaceNotes, setReplaceNotes] = useState('');
  const [replacementDispatchedMsg, setReplacementDispatchedMsg] = useState('');

  // Requirement Form State
  const [reqForm, setReqForm] = useState({
    vehicleType: '14-Wheeler Heavy',
    count: 2,
    route: 'Delhi–Mumbai Express Corridor',
    startDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    salaryOffer: 28000,
    notes: 'Experienced in night multi-axle driving',
  });

  if (!owner) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold font-baloo text-[#1B3A6B]">ट्रांसपोर्टर प्रोफाइल लोड हो रहा है...</h2>
      </div>
    );
  }

  const deployed = ownerService.getDeployedDrivers(owner.id);
  const requirements = ownerService.getRequirements(owner.id);
  const invoices = ownerService.getInvoices(owner.id);
  const replacements = ownerService.getReplacements(owner.id);

  const handleCreateRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    ownerService.postRequirement({
      ownerId: owner.id,
      companyName: owner.company,
      vehicleType: reqForm.vehicleType,
      route: reqForm.route,
      city: owner.city,
      startDate: reqForm.startDate,
      durationMonths: 12,
      salaryOffer: Number(reqForm.salaryOffer),
      count: Number(reqForm.count),
      notes: reqForm.notes,
    });

    setShowPostReqModal(false);
    setOwner(ownerService.getOwnerById(owner.id));
  };

  const handleTriggerReplacement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showReplaceModal) return;

    ownerService.requestReplacement(
      owner.id,
      owner.company,
      showReplaceModal.placementId,
      showReplaceModal.driverId,
      showReplaceModal.driverName,
      `${replaceReason}: ${replaceNotes}`,
      'urgent'
    );

    setReplacementDispatchedMsg(
      `🚨 Replacement dispatched for ${showReplaceModal.driverName}! Standby driver allocated within 24-hr SLA.`
    );
    setShowReplaceModal(null);
    setReplaceNotes('');
    setOwner(ownerService.getOwnerById(owner.id));
    setTimeout(() => setReplacementDispatchedMsg(''), 6000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* HEADER WITH POST REQUIREMENT CTA */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#1B3A6B]/20 shadow-md mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F4741F]">
              <Truck className="w-4 h-4" />
              <span>Fleet Operations Central</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-baloo text-[#1B3A6B] mt-1">
              {owner.company}
            </h1>
            <div className="text-xs text-[#14171C]/75 font-semibold mt-0.5">
              Contact: {owner.contactName} • Base Hub: {owner.city} • Fleet Capacity: {owner.fleetSize} Trucks
            </div>
          </div>

          <button
            onClick={() => setShowPostReqModal(true)}
            className="signboard-btn-neel px-6 py-3 text-sm flex items-center gap-2 cursor-pointer shadow-md"
          >
            <PlusCircle className="w-4 h-4 text-[#F5C400]" />
            <span>नई ड्राइवर ज़रूरत दर्ज करें (Post Requirement)</span>
          </button>
        </div>

        {/* 24x7 Dedicated Transporter Support Desk */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-[#1B3A6B]">Dedicated Fleet Desk:</span>
            <span>24-Hour Driver Replacement & Emergency Dispatch</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/917018709616"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-[#1E7F4F] hover:underline flex items-center gap-1"
            >
              <span>WhatsApp: 7018709616</span>
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="tel:+918527977238"
              className="font-bold text-[#1B3A6B] hover:underline flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#F4741F]" />
              <span>Call Helpline: 8527977238</span>
            </a>
          </div>
        </div>
      </div>

      {replacementDispatchedMsg && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border-2 border-[#1E7F4F] text-[#1E7F4F] font-bold text-sm flex items-center justify-between shadow-sm animate-in fade-in">
          <span>{replacementDispatchedMsg}</span>
          <button onClick={() => setReplacementDispatchedMsg('')} className="text-xs underline cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* 4 CORE FLEET STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="text-xs text-gray-500 font-bold uppercase">Active Deployed Drivers</div>
          <div className="text-3xl font-extrabold font-baloo text-[#1B3A6B] mt-1">
            {deployed.length} Drivers
          </div>
          <div className="text-xs text-[#1E7F4F] font-semibold mt-1">✓ 100% Uniform & Verified</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="text-xs text-gray-500 font-bold uppercase">Open Staffing Demands</div>
          <div className="text-3xl font-extrabold font-baloo text-[#F4741F] mt-1">
            {requirements.filter(r => r.status === 'open').length} Requests
          </div>
          <div className="text-xs text-gray-600 mt-1">Bench matching active</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="text-xs text-gray-500 font-bold uppercase">Active SLA Replacements</div>
          <div className="text-3xl font-extrabold font-baloo text-[#14171C] mt-1">
            {replacements.filter(r => r.status === 'requested').length} Pending
          </div>
          <div className="text-xs text-gray-500 mt-1">&lt; 24-hr guarantee bench</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="text-xs text-gray-500 font-bold uppercase">Standby SLA Guarantee</div>
          <div className="text-xl font-bold font-baloo text-[#1E7F4F] mt-2">&lt; 24 Hours SLA</div>
          <div className="text-xs text-gray-600 mt-1">Guaranteed replacement bench</div>
        </div>
      </div>

      {/* PLACED DRIVERS FLEET TABLE */}
      <div className="bg-white rounded-2xl border-2 border-[#1B3A6B]/20 shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-baloo text-[#1B3A6B]">
              तैनात चालक (Active Deployed Fleet)
            </h2>
            <p className="text-xs text-gray-500">
              Verified drivers currently handling your long-haul cargo routes
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FBF6EC] border-b border-gray-200 text-[#1B3A6B] font-baloo font-bold">
              <tr>
                <th className="p-3.5">ड्राइवर (Driver)</th>
                <th className="p-3.5">गाड़ी संख्या (Truck)</th>
                <th className="p-3.5">रूट (Route)</th>
                <th className="p-3.5">अनुभव (Exp)</th>
                <th className="p-3.5">सैलरी (Salary)</th>
                <th className="p-3.5 text-right">कार्रवाई (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {deployed.map(({ placement, driver }) => (
                <tr key={placement.id} className="hover:bg-gray-50">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={driver.avatarUrl}
                        alt={driver.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#F4741F]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-bold font-baloo text-[#1B3A6B]">{driver.name}</div>
                        <div className="text-[11px] text-gray-500 font-mono">{driver.employeeId || 'HM-DL-9011'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-[#14171C]">
                    {placement.vehicleNo}
                  </td>
                  <td className="p-3.5 text-gray-700">
                    {placement.route}
                  </td>
                  <td className="p-3.5 text-gray-600">
                    {driver.experienceYears} Years ({driver.licence.licenceClass})
                  </td>
                  <td className="p-3.5 font-bold text-[#1E7F4F]">
                    ₹28,000 / mo
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => setShowReplaceModal({
                        placementId: placement.id,
                        driverId: driver.id,
                        driverName: driver.name,
                        vehicleNo: placement.vehicleNo,
                      })}
                      className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold cursor-pointer transition-colors"
                    >
                      रिप्लेसमेंट माँगें
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* OPEN REQUIREMENTS LIST */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold font-baloo text-[#1B3A6B]">
            आपकी ड्राइवर ज़रूरतें (Open Staffing Requirements)
          </h3>
          <button
            onClick={() => setShowPostReqModal(true)}
            className="text-xs font-bold text-[#F4741F] hover:underline cursor-pointer"
          >
            + Add Another
          </button>
        </div>

        <div className="space-y-3">
          {requirements.map((req) => (
            <div key={req.id} className="p-4 rounded-xl bg-[#FBF6EC] border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#1B3A6B]">{req.vehicleType}</span>
                  <span className="text-xs bg-[#1B3A6B] text-white px-2 py-0.5 rounded-full font-bold">
                    Qty: {req.count} Drivers
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                    {req.status}
                  </span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Corridor: <strong>{req.route}</strong> • Salary Offer: ₹{req.salaryOffer}/mo • Required by: {req.startDate}
                </div>
                {req.notes && <div className="text-[11px] text-gray-500 italic mt-0.5">Note: {req.notes}</div>}
              </div>

              <div className="text-right">
                <span className="text-xs text-[#1E7F4F] font-bold">
                  ✓ Pre-screening bench active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MONTHLY MANAGEMENT INVOICE SUMMARY */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold font-baloo text-[#1B3A6B] mb-2">
          मासिक बिलिंग व इनवॉइस (Fleet Billing & Invoices)
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Transparent consolidated management fee covering verified drivers and backup SLA
        </p>

        <div className="space-y-3">
          {invoices.map((inv) => (
            <div key={inv.id} className="p-4 rounded-xl bg-[#FBF6EC] border border-gray-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-[#1B3A6B]">{inv.month} Management Statement</div>
                <div className="text-xs text-gray-600">{inv.driverCount} Drivers Active • 24x7 SLA Coverage Included</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-sm text-[#14171C]">₹{inv.totalAmount.toLocaleString('en-IN')}</div>
                <span className="text-[10px] bg-green-100 text-[#1E7F4F] font-bold px-2 py-0.5 rounded uppercase">
                  {inv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: POST REQUIREMENT */}
      {showPostReqModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full border-4 border-[#1B3A6B] shadow-2xl relative">
            <button
              onClick={() => setShowPostReqModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-baloo text-[#1B3A6B] mb-2">
              नई ड्राइवर ज़रूरत दर्ज करें (Post Driver Requirement)
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Our fleet team will review and allocate verified drivers within 24 hours.
            </p>

            <form onSubmit={handleCreateRequirement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#14171C] mb-1">गाड़ी का प्रकार (Vehicle Type) *</label>
                <select
                  value={reqForm.vehicleType}
                  onChange={(e) => setReqForm({ ...reqForm, vehicleType: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-sm font-semibold"
                >
                  <option value="12-Wheeler Heavy">12-Wheeler Heavy</option>
                  <option value="14-Wheeler Heavy">14-Wheeler Heavy</option>
                  <option value="Multi-Axle Trailer">Multi-Axle Trailer (40ft/Trailer)</option>
                  <option value="Tanker / Chemical">Tanker / Liquid Freight</option>
                  <option value="Container Chassis">Container High-Cube Chassis</option>
                  <option value="Tipper / Mining">Tipper / Mining Bulk</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#14171C] mb-1">आवश्यक ड्राइवर (Count) *</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={reqForm.count}
                    onChange={(e) => setReqForm({ ...reqForm, count: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg border border-gray-300 text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14171C] mb-1">तारीख़ से आवश्यकता (Start Date) *</label>
                  <input
                    type="date"
                    value={reqForm.startDate}
                    onChange={(e) => setReqForm({ ...reqForm, startDate: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#14171C] mb-1">मुख्य रूट / कॉरिडोर (Route Corridor) *</label>
                  <input
                    type="text"
                    value={reqForm.route}
                    onChange={(e) => setReqForm({ ...reqForm, route: e.target.value })}
                    placeholder="उदा. Delhi–Mumbai"
                    className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14171C] mb-1">मासिक वेतन ऑफर (₹/Month) *</label>
                  <input
                    type="number"
                    value={reqForm.salaryOffer}
                    onChange={(e) => setReqForm({ ...reqForm, salaryOffer: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg border border-gray-300 text-sm font-bold text-[#1E7F4F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14171C] mb-1">विशेष निर्देश (Specific Requirements)</label>
                <textarea
                  rows={2}
                  value={reqForm.notes}
                  onChange={(e) => setReqForm({ ...reqForm, notes: e.target.value })}
                  placeholder="उदा. Fastag अनुभव, हिल ड्राइविंग अनुभव आवश्यक"
                  className="w-full p-2 rounded-lg border border-gray-300 text-xs"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostReqModal(false)}
                  className="flex-1 signboard-btn-outline py-2.5 text-xs"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="flex-1 signboard-btn-neel py-2.5 text-xs font-bold cursor-pointer"
                >
                  ज़रूरत जमा करें (Post Requirement)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REQUEST REPLACEMENT (24-HR SLA) */}
      {showReplaceModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full border-4 border-[#C8322B] shadow-2xl">
            <div className="flex items-center gap-3 text-[#C8322B] mb-3">
              <AlertTriangle className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-bold font-baloo text-[#14171C]">
                  ड्राइवर रिप्लेसमेंट अनुरोध (24h SLA)
                </h3>
                <span className="text-xs text-gray-500 font-mono">Truck: {showReplaceModal.vehicleNo}</span>
              </div>
            </div>

            <p className="text-xs text-[#14171C]/75 mb-4">
              चालक <strong>{showReplaceModal.driverName}</strong> के लिए रिप्लेसमेंट अनुरोध दर्ज किया जा रहा है। हमारी स्टैंडबाय बेंच से 24 घंटे के अंदर नया सत्यापित चालक आवंटित किया जाएगा।
            </p>

            <form onSubmit={handleTriggerReplacement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#14171C] mb-1">रिप्लेसमेंट का कारण (Reason) *</label>
                <select
                  value={replaceReason}
                  onChange={(e) => setReplaceReason(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-sm font-semibold"
                >
                  <option value="Unexcused absence">बिना बताए अनुपस्थिति (Unexcused Absence)</option>
                  <option value="Medical emergency">चिकित्सा आपातकाल (Medical Emergency)</option>
                  <option value="Rash driving / Route delay">लापरवाह ड्राइविंग / विलंब (Performance)</option>
                  <option value="Transporter route change">गाड़ी रूट परिवर्तन (Route Change)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14171C] mb-1">अतिरिक्त टिप्पणी (Notes)</label>
                <textarea
                  rows={3}
                  value={replaceNotes}
                  onChange={(e) => setReplaceNotes(e.target.value)}
                  placeholder="विस्तार से बताएं..."
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-xs"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReplaceModal(null)}
                  className="flex-1 signboard-btn-outline py-2.5 text-xs"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-[#C8322B] hover:bg-red-700 text-white font-bold text-xs cursor-pointer shadow-md"
                >
                  रिप्लेसमेंट शुरू करें (Trigger SLA)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

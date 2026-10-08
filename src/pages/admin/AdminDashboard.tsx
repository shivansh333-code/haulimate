import React, { useState } from 'react';
import { 
  Shield, Truck, CheckCircle2, AlertTriangle, Users, 
  FileCheck, Award, Clock, ArrowRight, Check, X, RefreshCw, AlertCircle 
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { store } from '../../services/store';
import { Driver, Requirement, Owner, ReplacementRequest, Complaint, AuditLog } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'verification' | 'placements' | 'bench' | 'replacements' | 'logs'>('verification');
  
  const [kpis, setKpis] = useState(adminService.getKPIs());
  const [drivers, setDrivers] = useState<Driver[]>(adminService.getAllDrivers());
  const [requirements, setRequirements] = useState<Requirement[]>(adminService.getAllRequirements());
  const [owners, setOwners] = useState<Owner[]>(adminService.getAllOwners());
  const [replacements, setReplacements] = useState<ReplacementRequest[]>(adminService.getAllReplacements());
  const [logs, setLogs] = useState<AuditLog[]>(adminService.getAllAuditLogs());
  const [actionMsg, setActionMsg] = useState('');

  // Placement modal state
  const [allocatingReq, setAllocatingReq] = useState<Requirement | null>(null);
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [truckNumber, setTruckNumber] = useState('HR-55-AB-7744');

  // Replacement fulfill modal state
  const [fulfillingRep, setFulfillingRep] = useState<ReplacementRequest | null>(null);
  const [benchDriverForRep, setBenchDriverForRep] = useState('');

  const refreshAll = () => {
    setKpis(adminService.getKPIs());
    setDrivers(adminService.getAllDrivers());
    setRequirements(adminService.getAllRequirements());
    setOwners(adminService.getAllOwners());
    setReplacements(adminService.getAllReplacements());
    setLogs(adminService.getAllAuditLogs());
  };

  const handleApproveDriver = (driver: Driver) => {
    adminService.updateDriverVerification(
      driver.id,
      {
        aadhaarVerified: true,
        licenceVerified: true,
        experienceVerified: true,
        backgroundCheckDone: true,
        interviewPassed: true,
      },
      'verified',
      'All police and RTO records verified by Admin Operations.'
    );

    setActionMsg(`✓ Driver ${driver.name} verified and allocated to Standby Bench!`);
    refreshAll();
    setTimeout(() => setActionMsg(''), 4000);
  };

  const handleCreatePlacement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allocatingReq || !selectedDriverId) return;

    adminService.assignDriverToRequirement(
      selectedDriverId,
      allocatingReq.ownerId,
      allocatingReq.id,
      truckNumber,
      allocatingReq.route
    );

    setActionMsg(`✓ Driver deployed to ${allocatingReq.companyName} on vehicle ${truckNumber}!`);
    setAllocatingReq(null);
    setSelectedDriverId('');
    refreshAll();
    setTimeout(() => setActionMsg(''), 5000);
  };

  const handleFulfillReplacement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fulfillingRep || !benchDriverForRep) return;

    adminService.resolveReplacement(fulfillingRep.id, benchDriverForRep);
    setActionMsg(`✓ SLA fulfilled! Standby driver deployed to ${fulfillingRep.ownerCompany} within 24h.`);
    setFulfillingRep(null);
    setBenchDriverForRep('');
    refreshAll();
    setTimeout(() => setActionMsg(''), 5000);
  };

  const availableBenchDrivers = drivers.filter(d => d.employment.status === 'on_bench' || (d.verification.status === 'verified' && d.employment.status !== 'deployed'));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* HEADER */}
      <div className="bg-[#14171C] text-white rounded-2xl p-6 sm:p-8 border-3 border-[#F5C400] shadow-xl mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F5C400]">
              <Shield className="w-4 h-4" />
              <span>Operations Control Room</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-baloo text-white mt-1">
              HauliMate Admin Central
            </h1>
            <p className="text-xs text-white/70 font-mukta">
              Verification queue, fleet placements, 24-hr replacement SLA bench, and system audit logs
            </p>
          </div>

          <button
            onClick={refreshAll}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-white/20"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh State</span>
          </button>
        </div>
      </div>

      {actionMsg && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-[#1E7F4F] font-bold text-sm shadow-sm animate-in fade-in">
          {actionMsg}
        </div>
      )}

      {/* METRICS STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="text-xs text-gray-500 font-bold uppercase">Total Drivers</div>
          <div className="text-3xl font-extrabold font-baloo text-[#1B3A6B] mt-1">{kpis.totalDrivers}</div>
          <div className="text-xs text-[#1E7F4F] font-semibold mt-1">
            {kpis.verifiedDrivers} Verified • {kpis.pendingVerifications} Pending
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="text-xs text-gray-500 font-bold uppercase">Active Placements</div>
          <div className="text-3xl font-extrabold font-baloo text-[#1E7F4F] mt-1">
            {kpis.activePlacements} Fleet Trucks
          </div>
          <div className="text-xs text-gray-600 mt-1">100% on-duty compliance</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="text-xs text-gray-500 font-bold uppercase">Standby Bench Available</div>
          <div className="text-3xl font-extrabold font-baloo text-[#F4741F] mt-1">{availableBenchDrivers.length}</div>
          <div className="text-xs text-gray-600 mt-1">Avg SLA: {kpis.avgReplacementHours} hrs</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="text-xs text-gray-500 font-bold uppercase">Open Demands & SLA</div>
          <div className="text-3xl font-extrabold font-baloo text-[#14171C] mt-1">
            {kpis.openRequirements + kpis.openReplacements}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {kpis.openReplacements} Replacement SLA Requests
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-gray-200 overflow-x-auto space-x-4 mb-8">
        {[
          { key: 'verification', label: 'सत्यापन कतार (Verification Queue)' },
          { key: 'placements', label: 'तैनाती प्रबंधक (Placements & Demand)' },
          { key: 'bench', label: 'स्टैंडबाय बेंच (Standby Bench)' },
          { key: 'replacements', label: 'रिप्लेसमेंट SLA (24h SLA Desk)' },
          { key: 'logs', label: 'सिस्टम ऑडिट लॉग (Activity Stream)' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
              activeTab === tab.key
                ? 'border-[#1B3A6B] text-[#1B3A6B]'
                : 'border-transparent text-gray-500 hover:text-[#14171C]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: VERIFICATION QUEUE */}
      {activeTab === 'verification' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-baloo text-[#1B3A6B]">
              ड्राइवर सत्यापन कतार (Driver Clearance Queue)
            </h3>
            <span className="text-xs text-gray-500 font-mono">
              Pending review: {drivers.filter(d => d.verification.status === 'pending').length} drivers
            </span>
          </div>

          <div className="space-y-4">
            {drivers.map((driver) => (
              <div
                key={driver.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={driver.avatarUrl}
                    alt={driver.name}
                    className="w-14 h-14 rounded-xl object-cover border-2 border-gray-300"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-lg font-baloo text-[#1B3A6B]">{driver.name}</h4>
                      <span className="text-xs font-mono text-gray-500 font-bold">({driver.employeeId || 'HM-DL-NEW'})</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        driver.verification.status === 'verified' ? 'bg-green-100 text-[#1E7F4F]' : 'bg-amber-100 text-[#F4741F]'
                      }`}>
                        {driver.verification.status}
                      </span>
                    </div>

                    <div className="text-xs text-gray-600 mt-1">
                      City: {driver.city}, {driver.state} • Exp: {driver.experienceYears} Years • {driver.vehicleTypes.join(', ')}
                    </div>

                    <div className="text-xs text-[#14171C] font-semibold mt-1">
                      DL: <span className="font-mono">{driver.licence.number}</span> ({driver.licence.licenceClass}) • Expiry: {driver.licence.expiryDate}
                    </div>

                    {/* Checklist pills */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${
                        driver.verification.checklist.licenceVerified ? 'bg-green-50 text-[#1E7F4F] border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'
                      }`}>
                        RTO DL: {driver.verification.checklist.licenceVerified ? '✓ Clear' : 'Pending'}
                      </span>

                      <span className={`text-[10px] px-2 py-0.5 rounded border ${
                        driver.verification.checklist.backgroundCheckDone ? 'bg-green-50 text-[#1E7F4F] border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'
                      }`}>
                        Police Check: {driver.verification.checklist.backgroundCheckDone ? '✓ Clear' : 'Pending'}
                      </span>

                      <span className={`text-[10px] px-2 py-0.5 rounded border ${
                        driver.verification.checklist.experienceVerified ? 'bg-green-50 text-[#1E7F4F] border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'
                      }`}>
                        Fleet Reference: {driver.verification.checklist.experienceVerified ? '✓ Verified' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-end">
                  {driver.verification.status !== 'verified' ? (
                    <button
                      onClick={() => handleApproveDriver(driver)}
                      className="px-4 py-2 rounded-lg bg-[#1E7F4F] text-white font-bold text-xs hover:bg-green-800 cursor-pointer shadow-sm"
                    >
                      पूर्ण सत्यापन दें (Approve Driver)
                    </button>
                  ) : (
                    <span className="text-xs text-[#1E7F4F] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      सत्यापित व एक्टिव (Verified & Ready)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PLACEMENTS & DEMAND */}
      {activeTab === 'placements' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold font-baloo text-[#1B3A6B]">
            ट्रांसपोर्टर मांग व ड्राइवर आवंटन (Staffing & Placements)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requirements.map((req) => (
              <div key={req.id} className="bg-white rounded-2xl p-6 border-2 border-[#1B3A6B]/20 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-bold text-[#F4741F] uppercase">{req.companyName}</span>
                      <h4 className="text-lg font-bold font-baloo text-[#1B3A6B]">{req.vehicleType}</h4>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-700">
                      {req.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-gray-700 font-mukta mt-3">
                    <div><strong>Count Required:</strong> {req.count} Drivers</div>
                    <div><strong>Corridor Route:</strong> {req.route}</div>
                    <div><strong>Salary Offer:</strong> ₹{req.salaryOffer} / month</div>
                    <div><strong>Required By Date:</strong> {req.startDate}</div>
                    {req.notes && <div><strong>Notes:</strong> {req.notes}</div>}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Standby available: {availableBenchDrivers.length}
                  </span>
                  <button
                    onClick={() => {
                      setAllocatingReq(req);
                      if (availableBenchDrivers.length > 0) {
                        setSelectedDriverId(availableBenchDrivers[0].id);
                      }
                    }}
                    className="signboard-btn-primary px-4 py-2 text-xs cursor-pointer"
                  >
                    Allocate Driver →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STANDBY BENCH */}
      {activeTab === 'bench' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold font-baloo text-[#1B3A6B]">
                सत्यापित स्टैंडबाय बेंच (Available Standby Bench)
              </h3>
              <p className="text-xs text-gray-500">
                Drivers ready for emergency 24-hr replacement SLA or immediate new placement
              </p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-[#1E7F4F] font-bold text-xs rounded-full">
              {availableBenchDrivers.length} Ready for Dispatch
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableBenchDrivers.map((driver) => (
              <div key={driver.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={driver.avatarUrl}
                    alt={driver.name}
                    className="w-12 h-12 rounded-xl object-cover border border-[#F4741F]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-base font-baloo text-[#1B3A6B]">{driver.name}</h4>
                    <div className="text-xs text-gray-500 font-mono">{driver.employeeId || 'HM-PB-4821'}</div>
                    <div className="text-[11px] text-[#1E7F4F] font-bold">✓ Cleared & Ready</div>
                  </div>
                </div>

                <div className="text-xs text-gray-700 space-y-1">
                  <div><strong>Base City:</strong> {driver.city}, {driver.state}</div>
                  <div><strong>Experience:</strong> {driver.experienceYears} Years ({driver.licence.licenceClass})</div>
                  <div><strong>Vehicles:</strong> {driver.vehicleTypes.join(', ')}</div>
                  <div><strong>Corridors:</strong> {driver.routes.join(', ')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: REPLACEMENTS SLA */}
      {activeTab === 'replacements' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold font-baloo text-[#1B3A6B]">
                24-घंटे रिप्लेसमेंट डेस्क (Emergency SLA Desk)
              </h3>
              <p className="text-xs text-gray-500">
                Transporters request replacements with strict 24-hour guarantee
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {replacements.map((rep) => (
              <div key={rep.id} className="bg-white p-6 rounded-2xl border-2 border-red-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#C8322B] uppercase font-mono">[{rep.urgency} SLA: {rep.slaHours}h]</span>
                    <span className="font-bold text-base text-[#1B3A6B]">{rep.ownerCompany}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      rep.status === 'replaced' ? 'bg-green-100 text-[#1E7F4F]' : 'bg-red-100 text-red-700'
                    }`}>
                      {rep.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-700 mt-1">
                    Current Driver: <strong>{rep.driverName}</strong> • Reason: {rep.reason}
                  </div>
                  {rep.replacementDriverName && (
                    <div className="text-xs text-[#1E7F4F] font-bold mt-1">
                      ✓ Replaced with: {rep.replacementDriverName}
                    </div>
                  )}
                </div>

                {rep.status !== 'replaced' && (
                  <button
                    onClick={() => {
                      setFulfillingRep(rep);
                      if (availableBenchDrivers.length > 0) {
                        setBenchDriverForRep(availableBenchDrivers[0].id);
                      }
                    }}
                    className="px-4 py-2 bg-[#C8322B] hover:bg-red-700 text-white font-bold text-xs rounded-lg cursor-pointer shadow-md"
                  >
                    Fulfill 24h SLA →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: AUDIT LOGS */}
      {activeTab === 'logs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-baloo text-[#1B3A6B]">
              सिस्टम ऑडिट व ऑपरेशनल एक्टिविटी (Audit Activity Stream)
            </h3>
            <span className="text-xs text-gray-500">Stored in MockStore / LocalStorage</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
            <div className="divide-y divide-gray-100">
              {logs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-gray-50 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#F4741F] mt-2 shrink-0" />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1B3A6B] font-mono">[{log.action}]</span>
                      <span className="text-gray-400 text-[11px]">{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="text-[#14171C] font-semibold mt-0.5">{log.performedBy}</div>
                    <div className="text-gray-600 mt-0.5">{log.details}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ALLOCATE DRIVER TO REQUIREMENT */}
      {allocatingReq && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full border-4 border-[#1B3A6B] shadow-2xl">
            <h3 className="text-xl font-bold font-baloo text-[#1B3A6B] mb-2">
              ड्राइवर तैनात करें (Deploy Driver)
            </h3>
            <div className="text-xs text-gray-600 mb-4 bg-[#FBF6EC] p-3 rounded-lg">
              <div><strong>Transporter:</strong> {allocatingReq.companyName}</div>
              <div><strong>Requirement:</strong> {allocatingReq.vehicleType} • {allocatingReq.route}</div>
            </div>

            <form onSubmit={handleCreatePlacement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#14171C] mb-1">उपलब्ध स्टैंडबाय ड्राइवर चुनें</label>
                <select
                  value={selectedDriverId}
                  onChange={(e) => setSelectedDriverId(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-sm font-semibold"
                >
                  {availableBenchDrivers.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.employeeId || 'HM-DL'}) - {d.experienceYears} yrs exp - {d.city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14171C] mb-1">गाड़ी नंबर (Assigned Vehicle No.)</label>
                <input
                  type="text"
                  value={truckNumber}
                  onChange={(e) => setTruckNumber(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-sm font-mono uppercase"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAllocatingReq(null)}
                  className="flex-1 signboard-btn-outline py-2.5 text-xs"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="flex-1 signboard-btn-primary py-2.5 text-xs cursor-pointer"
                >
                  तैनाती पक्की करें (Confirm Placement)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: FULFILL REPLACEMENT SLA */}
      {fulfillingRep && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full border-4 border-[#C8322B] shadow-2xl">
            <h3 className="text-xl font-bold font-baloo text-[#14171C] mb-2">
              24-घंटे SLA रिप्लेसमेंट पूरा करें
            </h3>
            <div className="text-xs text-gray-600 mb-4 bg-red-50 p-3 rounded-lg border border-red-200">
              <div><strong>Transporter:</strong> {fulfillingRep.ownerCompany}</div>
              <div><strong>Current Driver:</strong> {fulfillingRep.driverName}</div>
              <div><strong>Reason:</strong> {fulfillingRep.reason}</div>
            </div>

            <form onSubmit={handleFulfillReplacement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#14171C] mb-1">नया स्टैंडबाय ड्राइवर चुनें</label>
                <select
                  value={benchDriverForRep}
                  onChange={(e) => setBenchDriverForRep(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-sm font-semibold"
                >
                  {availableBenchDrivers.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.employeeId || 'HM-DL'}) - {d.experienceYears} yrs exp - {d.city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setFulfillingRep(null)}
                  className="flex-1 signboard-btn-outline py-2.5 text-xs"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-[#C8322B] hover:bg-red-700 text-white font-bold text-xs cursor-pointer shadow-md"
                >
                  स्टैंडबाय ड्राइवर भेजें (Dispatch)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

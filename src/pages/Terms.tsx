import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Draft banner */}
      <div className="bg-[#haldi]/30 border-2 border-[#14171C] p-4 rounded-xl mb-8 flex items-center gap-3 bg-[#F5C400]/20">
        <AlertTriangle className="w-6 h-6 text-[#F4741F] shrink-0" />
        <div>
          <div className="font-bold font-baloo text-base text-[#1B3A6B]">
            Draft Document — Pending Formal Legal Review
          </div>
          <div className="text-xs text-[#14171C]/80">
            This document outlines preliminary operating policies and is subject to formal confirmation in bilateral transporter/driver service agreements.
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold font-baloo text-[#1B3A6B] mb-6">Terms of Service</h1>

      <div className="space-y-6 text-sm text-[#14171C]/85 font-mukta leading-relaxed bg-white p-8 rounded-2xl border border-gray-200">
        <section>
          <h2 className="text-lg font-bold font-baloo text-[#1B3A6B] mb-2">1. Overview and Scope</h2>
          <p>
            HauliMate Technologies Pvt. Ltd. operates an intermediary platform matching pre-screened heavy commercial vehicle operators with verified fleet transporters across India. HauliMate is an early-stage service. PF/ESI, insurance, and employment terms apply strictly as per applicable law and company policy and will be confirmed in your specific bilateral agreement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold font-baloo text-[#1B3A6B] mb-2">2. Driver Verification & Credentials</h2>
          <p>
            All registered drivers warrant that the commercial driving licence (HMV/HGV), Aadhaar card, and references provided are authentic and valid under the Motor Vehicles Act. Any discovery of forged documentation will result in immediate termination, blacklisting, and reporting to relevant regional transport authorities.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold font-baloo text-[#1B3A6B] mb-2">3. Transporter Obligations</h2>
          <p>
            Transporters agree to maintain commercial vehicles in roadworthy, compliant condition with valid fitness, national permits, and commercial insurance. Transporters agree not to solicit or employ HauliMate drivers directly outside of platform contractual arrangements.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold font-baloo text-[#1B3A6B] mb-2">4. Replacement SLA</h2>
          <p>
            HauliMate provides a targeted 24-hour driver replacement SLA for unexcused driver absences on active deployments, subject to regional corridor availability and immediate notification by the transporter.
          </p>
        </section>
      </div>
    </div>
  );
};

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Draft banner */}
      <div className="bg-[#F5C400]/20 border-2 border-[#14171C] p-4 rounded-xl mb-8 flex items-center gap-3">
        <AlertTriangle className="w-6 h-6 text-[#F4741F] shrink-0" />
        <div>
          <div className="font-bold font-baloo text-base text-[#1B3A6B]">
            Draft Document — Pending Formal Legal Review
          </div>
          <div className="text-xs text-[#14171C]/80">
            This document outlines privacy and data handling practices under the Digital Personal Data Protection (DPDP) Act 2023.
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold font-baloo text-[#1B3A6B] mb-6">Privacy Policy</h1>

      <div className="space-y-6 text-sm text-[#14171C]/85 font-mukta leading-relaxed bg-white p-8 rounded-2xl border border-gray-200">
        <section>
          <h2 className="text-lg font-bold font-baloo text-[#1B3A6B] mb-2">1. Information Collection</h2>
          <p>
            We collect personal information necessary for identity verification and highway employment, including full name, father's name, permanent address, driving licence details, Aadhaar number, emergency contacts, bank account details (for direct payroll disbursement), and GPS location data during active trip shifts.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold font-baloo text-[#1B3A6B] mb-2">2. Phone Number Masking Policy</h2>
          <p>
            To prevent unsolicited solicitation, harassment, and informal bypass, driver phone numbers are masked from transporters. All communications, trip dispatch confirmations, and grievance resolutions are conducted through HauliMate's secure dispatch switchboard.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold font-baloo text-[#1B3A6B] mb-2">3. Data Security & Access Controls</h2>
          <p>
            Driver identity documents (Aadhaar, DL scans) are stored in encrypted form. Access by administrative personnel is strictly role-gated, and every document viewing action is permanently recorded in our compliance audit log.
          </p>
        </section>
      </div>
    </div>
  );
};

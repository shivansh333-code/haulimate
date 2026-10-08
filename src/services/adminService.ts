import { store } from './store';
import { 
  Driver, Owner, Requirement, ReplacementRequest, Complaint, 
  Placement, PaySlip, VerificationChecklist, AuditLog 
} from '../types';

export const adminService = {
  getKPIs() {
    const drivers = store.getDrivers();
    const owners = store.getOwners();
    const reqs = store.getRequirements();
    const placements = store.getPlacements();
    const replacements = store.getReplacements();
    const complaints = store.getComplaints();

    const pendingVerifications = drivers.filter(d => d.verification.status === 'pending').length;
    const verifiedDrivers = drivers.filter(d => d.verification.status === 'verified').length;
    const activePlacements = placements.filter(p => p.status === 'active').length;
    const openRequirements = reqs.filter(r => r.status === 'open').length;
    const openReplacements = replacements.filter(r => r.status === 'requested' || r.status === 'shortlisted').length;
    const openComplaints = complaints.filter(c => c.status === 'open' || c.status === 'investigating').length;

    // Check expiring docs in 30 days
    const now = new Date();
    const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const expiringDocsCount = drivers.filter(d => {
      const expDate = new Date(d.licence.expiryDate);
      return expDate > now && expDate <= in30Days;
    }).length;

    return {
      totalDrivers: drivers.length,
      verifiedDrivers,
      pendingVerifications,
      totalTransporters: owners.length,
      activePlacements,
      openRequirements,
      openReplacements,
      openComplaints,
      expiringDocsCount,
      avgReplacementHours: 18.5,
    };
  },

  getAllDrivers(): Driver[] {
    return store.getDrivers();
  },

  getAllOwners(): Owner[] {
    return store.getOwners();
  },

  getAllRequirements(): Requirement[] {
    return store.getRequirements();
  },

  getAllPlacements(): Placement[] {
    return store.getPlacements();
  },

  getAllReplacements(): ReplacementRequest[] {
    return store.getReplacements();
  },

  getAllComplaints(): Complaint[] {
    return store.getComplaints();
  },

  getAllAuditLogs(): AuditLog[] {
    return store.getAuditLogs();
  },

  updateDriverVerification(
    driverId: string,
    checklist: VerificationChecklist,
    status: 'verified' | 'rejected' | 'more_info_needed',
    notes?: string
  ): Driver | null {
    const isApproved = status === 'verified';
    const driver = store.updateDriver(driverId, {
      verification: {
        status,
        checklist,
        notes,
        verifiedAt: isApproved ? new Date().toISOString() : undefined,
        verifiedBy: isApproved ? 'Admin Central HR' : undefined,
      },
      employment: {
        status: isApproved ? 'verified' : 'applicant',
      }
    });

    if (driver) {
      store.logAction(
        isApproved ? 'DRIVER_VERIFIED' : 'DRIVER_REJECTED',
        'Admin Central',
        `Verification updated for ${driver.name} (Status: ${status})`,
        driverId
      );
    }
    return driver;
  },

  assignDriverToRequirement(
    driverId: string,
    ownerId: string,
    requirementId: string,
    vehicleNo: string,
    route: string
  ): Placement {
    const placement: Placement = {
      id: `placement-${Date.now()}`,
      driverId,
      ownerId,
      requirementId,
      vehicleNo,
      route,
      startDate: new Date().toISOString().split('T')[0],
      status: 'active',
    };

    store.addPlacement(placement);

    // Update driver employment status
    store.updateDriver(driverId, {
      employment: {
        status: 'deployed',
        currentPlacementId: placement.id,
      }
    });

    const driver = store.getDrivers().find(d => d.id === driverId);
    const owner = store.getOwners().find(o => o.id === ownerId);

    store.logAction(
      'DRIVER_DEPLOYED',
      'Admin Operations',
      `Assigned ${driver?.name} to ${owner?.company} on route ${route} (${vehicleNo})`,
      driverId
    );

    return placement;
  },

  resolveReplacement(
    replacementId: string,
    replacementDriverId: string
  ): ReplacementRequest | null {
    const reps = store.getReplacements();
    const repIndex = reps.findIndex(r => r.id === replacementId);
    if (repIndex === -1) return null;

    const rep = reps[repIndex];
    const replacementDriver = store.getDrivers().find(d => d.id === replacementDriverId);

    reps[repIndex] = {
      ...rep,
      status: 'replaced',
      replacementDriverId,
      replacementDriverName: replacementDriver?.name || 'Bench Driver',
    };

    store.setReplacements(reps);

    // Update old driver placement
    const placements = store.getPlacements();
    const pIndex = placements.findIndex(p => p.id === rep.placementId);
    if (pIndex >= 0) {
      placements[pIndex].driverId = replacementDriverId;
      store.setPlacements(placements);
    }

    store.logAction(
      'REPLACEMENT_FULFILLED',
      'Admin Operations',
      `Replacement fulfilled for ${rep.ownerCompany}. New driver: ${replacementDriver?.name}`,
      rep.id
    );

    return reps[repIndex];
  },

  resolveComplaint(complaintId: string, resolution: string): Complaint | null {
    const comps = store.getComplaints();
    const index = comps.findIndex(c => c.id === complaintId);
    if (index === -1) return null;

    comps[index] = {
      ...comps[index],
      status: 'resolved',
      resolution,
      resolvedAt: new Date().toISOString(),
    };

    store.setComplaints(comps);
    store.logAction('COMPLAINT_RESOLVED', 'Admin Desk', `Resolved ticket: ${complaintId}`, complaintId);
    return comps[index];
  },

  generatePaySlip(
    driverId: string,
    month: string,
    basicSalary: number,
    tripAllowances: number,
    pfDeductionApplicable: number,
    esiDeductionApplicable: number,
    bonus: number
  ): PaySlip {
    const netPay = basicSalary + tripAllowances + bonus - pfDeductionApplicable - esiDeductionApplicable;
    const paySlip: PaySlip = {
      id: `pay-${Date.now()}`,
      driverId,
      month,
      basicSalary,
      tripAllowances,
      pfDeductionApplicable,
      esiDeductionApplicable,
      bonus,
      netPay,
      status: 'paid',
      paymentDate: new Date().toISOString().split('T')[0],
    };

    const slips = store.getPaySlips();
    slips.unshift(paySlip);
    store.setPaySlips(slips);

    const driver = store.getDrivers().find(d => d.id === driverId);
    store.logAction('PAYROLL_GENERATED', 'Finance Central', `Generated payslip for ${driver?.name} (Net: ₹${netPay})`, driverId);
    return paySlip;
  },

  logDocumentAccess(driverId: string, docName: string, officer: string): void {
    store.logAction(
      'RESTRICTED_DOC_ACCESSED',
      officer,
      `Audited restricted employee document: ${docName}`,
      driverId
    );
  }
};

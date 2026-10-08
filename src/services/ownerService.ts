import { store } from './store';
import { Owner, Requirement, Placement, ReplacementRequest, Invoice, Driver, Complaint } from '../types';

export const ownerService = {
  getCurrentOwner(userId: string): Owner | undefined {
    const owners = store.getOwners();
    return owners.find(o => o.userId === userId) || owners[0]; // fallback to demo primary
  },

  getOwnerById(ownerId: string): Owner | undefined {
    return store.getOwners().find(o => o.id === ownerId);
  },

  getRequirements(ownerId: string): Requirement[] {
    return store.getRequirements().filter(r => r.ownerId === ownerId);
  },

  postRequirement(data: Omit<Requirement, 'id' | 'createdAt' | 'status'>): Requirement {
    const req: Requirement = {
      ...data,
      id: `req-${Date.now()}`,
      status: 'open',
      createdAt: new Date().toISOString().split('T')[0],
    };
    store.addRequirement(req);
    store.logAction('REQUIREMENT_POSTED', data.companyName, `Posted requirement for ${data.vehicleType} on ${data.route}`);
    return req;
  },

  getDeployedPlacements(ownerId: string): Placement[] {
    return store.getPlacements().filter(p => p.ownerId === ownerId && p.status === 'active');
  },

  getDeployedDrivers(ownerId: string): { placement: Placement; driver: Driver }[] {
    const placements = this.getDeployedPlacements(ownerId);
    const drivers = store.getDrivers();
    const result: { placement: Placement; driver: Driver }[] = [];

    placements.forEach(p => {
      const d = drivers.find(drv => drv.id === p.driverId);
      if (d) {
        result.push({ placement: p, driver: d });
      }
    });

    return result;
  },

  requestReplacement(
    ownerId: string,
    ownerCompany: string,
    placementId: string,
    driverId: string,
    driverName: string,
    reason: string,
    urgency: 'low' | 'medium' | 'urgent'
  ): ReplacementRequest {
    const rep: ReplacementRequest = {
      id: `rep-${Date.now()}`,
      ownerId,
      ownerCompany,
      placementId,
      driverId,
      driverName,
      reason,
      urgency,
      slaHours: urgency === 'urgent' ? 24 : 48,
      status: 'requested',
      createdAt: new Date().toISOString(),
    };

    store.addReplacement(rep);
    store.logAction('REPLACEMENT_REQUESTED', ownerCompany, `Requested replacement for driver ${driverName}. Urgency: ${urgency}`);
    return rep;
  },

  getReplacements(ownerId: string): ReplacementRequest[] {
    return store.getReplacements().filter(r => r.ownerId === ownerId);
  },

  getInvoices(ownerId: string): Invoice[] {
    return store.getInvoices().filter(i => i.ownerId === ownerId);
  },

  searchVerifiedDrivers(filters: {
    vehicleType?: string;
    route?: string;
    city?: string;
    minExp?: number;
  }): Driver[] {
    const drivers = store.getDrivers();
    return drivers.filter(d => {
      if (d.verification.status !== 'verified') return false;
      if (filters.vehicleType && !d.vehicleTypes.some(v => v.toLowerCase().includes(filters.vehicleType!.toLowerCase()))) return false;
      if (filters.route && !d.routes.some(r => r.toLowerCase().includes(filters.route!.toLowerCase()))) return false;
      if (filters.city && d.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      if (filters.minExp && d.experienceYears < filters.minExp) return false;
      return true;
    });
  },

  submitComplaint(ownerId: string, companyName: string, category: any, description: string): Complaint {
    const comp: Complaint = {
      id: `comp-${Date.now()}`,
      raisedByUserId: ownerId,
      raisedByName: companyName,
      role: 'owner',
      category,
      description,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    store.addComplaint(comp);
    store.logAction('OWNER_COMPLAINT_FILED', companyName, `Complaint on [${category}]`);
    return comp;
  }
};

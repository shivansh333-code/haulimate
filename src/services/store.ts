import {
  User, Driver, Owner, Requirement, Application, Placement,
  Attendance, PaySlip, Complaint, ReplacementRequest, Invoice, AuditLog
} from '../types';
import {
  INITIAL_USERS, INITIAL_TRANSPORTERS, INITIAL_DRIVERS,
  INITIAL_REQUIREMENTS, INITIAL_APPLICATIONS, INITIAL_PLACEMENTS,
  INITIAL_ATTENDANCE, INITIAL_PAYSLIPS, INITIAL_COMPLAINTS,
  INITIAL_REPLACEMENTS, INITIAL_INVOICES, INITIAL_AUDIT_LOGS
} from './mockData';

class MockStore {
  private getStorage<T>(key: string, defaultData: T): T {
    try {
      const data = localStorage.getItem(`haulimate_${key}`);
      return data ? JSON.parse(data) : defaultData;
    } catch (e) {
      console.error(`Error reading ${key} from localStorage`, e);
      return defaultData;
    }
  }

  private setStorage<T>(key: string, data: T): void {
    try {
      localStorage.setItem(`haulimate_${key}`, JSON.stringify(data));
    } catch (e) {
      console.error(`Error writing ${key} to localStorage`, e);
    }
  }

  // Users
  getUsers(): User[] {
    return this.getStorage('users', INITIAL_USERS);
  }
  setUsers(users: User[]): void {
    this.setStorage('users', users);
  }

  // Current User Session
  getCurrentUser(): User | null {
    return this.getStorage('current_user', null);
  }
  setCurrentUser(user: User | null): void {
    this.setStorage('current_user', user);
  }

  // Drivers
  getDrivers(): Driver[] {
    return this.getStorage('drivers', INITIAL_DRIVERS);
  }
  setDrivers(drivers: Driver[]): void {
    this.setStorage('drivers', drivers);
  }
  updateDriver(id: string, updates: Partial<Driver>): Driver | null {
    const drivers = this.getDrivers();
    const index = drivers.findIndex(d => d.id === id);
    if (index === -1) return null;
    drivers[index] = { ...drivers[index], ...updates };
    this.setDrivers(drivers);
    return drivers[index];
  }

  // Transporters / Owners
  getOwners(): Owner[] {
    return this.getStorage('owners', INITIAL_TRANSPORTERS);
  }
  setOwners(owners: Owner[]): void {
    this.setStorage('owners', owners);
  }

  // Requirements
  getRequirements(): Requirement[] {
    return this.getStorage('requirements', INITIAL_REQUIREMENTS);
  }
  setRequirements(reqs: Requirement[]): void {
    this.setStorage('requirements', reqs);
  }
  addRequirement(req: Requirement): void {
    const list = this.getRequirements();
    list.unshift(req);
    this.setRequirements(list);
  }

  // Applications
  getApplications(): Application[] {
    return this.getStorage('applications', INITIAL_APPLICATIONS);
  }
  setApplications(apps: Application[]): void {
    this.setStorage('applications', apps);
  }
  addApplication(app: Application): void {
    const list = this.getApplications();
    list.unshift(app);
    this.setApplications(list);
  }

  // Placements
  getPlacements(): Placement[] {
    return this.getStorage('placements', INITIAL_PLACEMENTS);
  }
  setPlacements(placements: Placement[]): void {
    this.setStorage('placements', placements);
  }
  addPlacement(placement: Placement): void {
    const list = this.getPlacements();
    list.unshift(placement);
    this.setPlacements(list);
  }

  // Attendance
  getAttendance(): Attendance[] {
    return this.getStorage('attendance', INITIAL_ATTENDANCE);
  }
  setAttendance(att: Attendance[]): void {
    this.setStorage('attendance', att);
  }
  markAttendance(entry: Attendance): void {
    const list = this.getAttendance();
    const existingIndex = list.findIndex(a => a.driverId === entry.driverId && a.date === entry.date);
    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...entry };
    } else {
      list.unshift(entry);
    }
    this.setAttendance(list);
  }

  // Pay Slips
  getPaySlips(): PaySlip[] {
    return this.getStorage('payslips', INITIAL_PAYSLIPS);
  }
  setPaySlips(slips: PaySlip[]): void {
    this.setStorage('payslips', slips);
  }

  // Complaints
  getComplaints(): Complaint[] {
    return this.getStorage('complaints', INITIAL_COMPLAINTS);
  }
  setComplaints(complaints: Complaint[]): void {
    this.setStorage('complaints', complaints);
  }
  addComplaint(complaint: Complaint): void {
    const list = this.getComplaints();
    list.unshift(complaint);
    this.setComplaints(list);
  }

  // Replacements
  getReplacements(): ReplacementRequest[] {
    return this.getStorage('replacements', INITIAL_REPLACEMENTS);
  }
  setReplacements(reps: ReplacementRequest[]): void {
    this.setStorage('replacements', reps);
  }
  addReplacement(rep: ReplacementRequest): void {
    const list = this.getReplacements();
    list.unshift(rep);
    this.setReplacements(list);
  }

  // Invoices
  getInvoices(): Invoice[] {
    return this.getStorage('invoices', INITIAL_INVOICES);
  }
  setInvoices(invs: Invoice[]): void {
    this.setStorage('invoices', invs);
  }

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return this.getStorage('audit_logs', INITIAL_AUDIT_LOGS);
  }
  logAction(action: string, performedBy: string, details: string, targetId?: string): void {
    const logs = this.getAuditLogs();
    logs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action,
      performedBy,
      details,
      targetId,
    });
    this.setStorage('audit_logs', logs);
  }

  // Reset demo store
  resetStore(): void {
    localStorage.removeItem('haulimate_users');
    localStorage.removeItem('haulimate_current_user');
    localStorage.removeItem('haulimate_drivers');
    localStorage.removeItem('haulimate_owners');
    localStorage.removeItem('haulimate_requirements');
    localStorage.removeItem('haulimate_applications');
    localStorage.removeItem('haulimate_placements');
    localStorage.removeItem('haulimate_attendance');
    localStorage.removeItem('haulimate_payslips');
    localStorage.removeItem('haulimate_complaints');
    localStorage.removeItem('haulimate_replacements');
    localStorage.removeItem('haulimate_invoices');
    localStorage.removeItem('haulimate_audit_logs');
  }
}

export const store = new MockStore();

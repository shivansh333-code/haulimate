import { store } from './store';
import { Driver, Attendance, Application, Complaint, PaySlip, LeaveRequest, Placement } from '../types';

export const driverService = {
  getCurrentDriver(userId: string): Driver | undefined {
    const drivers = store.getDrivers();
    return drivers.find(d => d.userId === userId) || drivers[0]; // fallback to demo primary
  },

  getDriverById(driverId: string): Driver | undefined {
    return store.getDrivers().find(d => d.id === driverId);
  },

  updateProfile(driverId: string, updates: Partial<Driver>): Driver | null {
    const updated = store.updateDriver(driverId, updates);
    if (updated) {
      store.logAction('DRIVER_PROFILE_UPDATED', updated.name, 'Updated contact / preferences', driverId);
    }
    return updated;
  },

  markAttendance(driverId: string, locationStr?: string): { success: boolean; attendance: Attendance } {
    const today = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    
    const driver = this.getDriverById(driverId);
    const placement = store.getPlacements().find(p => p.driverId === driverId && p.status === 'active');

    const entry: Attendance = {
      id: `att-${driverId}-${today}`,
      driverId,
      placementId: placement?.id,
      date: today,
      status: 'present',
      checkIn: timeStr,
      location: locationStr || 'GT Road Toll Plaza (GPS Geofence Verified)',
      vehicleNo: placement?.vehicleNo || 'Assigned Commercial Fleet',
    };

    store.markAttendance(entry);
    store.logAction('ATTENDANCE_MARKED', driver?.name || 'Driver', `Checked in at ${timeStr} (${entry.location})`, driverId);
    return { success: true, attendance: entry };
  },

  getAttendanceHistory(driverId: string): Attendance[] {
    return store.getAttendance().filter(a => a.driverId === driverId);
  },

  getPaySlips(driverId: string): PaySlip[] {
    return store.getPaySlips().filter(p => p.driverId === driverId);
  },

  getCurrentPlacement(driverId: string): Placement | undefined {
    return store.getPlacements().find(p => p.driverId === driverId && p.status === 'active');
  },

  applyForJob(driverId: string, requirementId: string): { success: boolean; message: string } {
    const existing = store.getApplications().find(a => a.driverId === driverId && a.requirementId === requirementId);
    if (existing) {
      return { success: false, message: 'आप इस नौकरी के लिए पहले ही अप्लाई कर चुके हैं / Already applied.' };
    }

    const application: Application = {
      id: `app-${Date.now()}`,
      requirementId,
      driverId,
      status: 'applied',
      appliedAt: new Date().toISOString().split('T')[0],
    };

    store.addApplication(application);
    const driver = this.getDriverById(driverId);
    store.logAction('JOB_APPLIED', driver?.name || 'Driver', `Applied to requirement ${requirementId}`, driverId);
    return { success: true, message: 'सफलतापूर्वक अप्लाई किया गया! / Application submitted successfully!' };
  },

  getApplications(driverId: string): Application[] {
    return store.getApplications().filter(a => a.driverId === driverId);
  },

  submitGrievance(driverId: string, driverName: string, category: any, description: string): Complaint {
    const complaint: Complaint = {
      id: `comp-${Date.now()}`,
      raisedByUserId: driverId,
      raisedByName: driverName,
      role: 'driver',
      category,
      description,
      status: 'open',
      createdAt: new Date().toISOString(),
    };

    store.addComplaint(complaint);
    store.logAction('COMPLAINT_RAISED', driverName, `Raised grievance under [${category}]`, driverId);
    return complaint;
  }
};

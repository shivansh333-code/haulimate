import { store } from './store';
import { User, UserRole, Driver, Owner } from '../types';

export const authService = {
  getCurrentUser(): User | null {
    return store.getCurrentUser();
  },

  demoLogin(role: UserRole): User {
    const users = store.getUsers();
    let user = users.find(u => u.role === role);
    if (!user) {
      user = {
        id: `user-${role}-demo`,
        role,
        phone: role === 'driver' ? '9876500001' : role === 'owner' ? '9876500002' : '9876500003',
        name: role === 'driver' ? 'Gurpreet Singh' : role === 'owner' ? 'Ramesh Sharma (Sharma Roadways)' : 'Admin Desk',
        email: role === 'admin' ? 'admin@haulimate.in' : undefined,
        language: 'hi',
        createdAt: new Date().toISOString(),
      };
    }
    store.setCurrentUser(user);
    store.logAction('USER_LOGIN', user.name, `Logged in via Demo quick-switcher as ${role}`);
    return user;
  },

  loginWithOtp(phone: string, otp: string, role: UserRole): { success: boolean; user?: User; error?: string } {
    if (otp !== '1234') {
      return { success: false, error: 'गलत OTP / Invalid OTP. कृपया 1234 दर्ज करें (Demo OTP is 1234).' };
    }

    const users = store.getUsers();
    let user = users.find(u => u.phone === phone && u.role === role);

    if (!user) {
      // Find default or create one
      user = {
        id: `user-${Date.now()}`,
        role,
        phone,
        name: role === 'driver' ? 'New Driver Partner' : 'New Transporter Partner',
        language: 'hi',
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      store.setUsers(users);
    }

    store.setCurrentUser(user);
    store.logAction('USER_LOGIN', user.name, `Logged in with OTP (${phone})`);
    return { success: true, user };
  },

  loginAdmin(email: string, pass: string): { success: boolean; user?: User; error?: string } {
    if (email === 'admin@haulimate.in' && pass === 'admin123') {
      const user: User = {
        id: 'user-admin-1',
        role: 'admin',
        phone: '9876500003',
        email,
        name: 'HauliMate Admin Central',
        language: 'en',
        createdAt: '2026-01-01',
      };
      store.setCurrentUser(user);
      store.logAction('ADMIN_LOGIN', 'Admin Central', 'Admin logged in');
      return { success: true, user };
    }
    return { success: false, error: 'गलत ईमेल या पासवर्ड / Invalid credentials. Use admin@haulimate.in / admin123' };
  },

  registerDriver(data: Partial<Driver> & { phone: string; name: string }): { user: User; driver: Driver } {
    const userId = `user-driver-${Date.now()}`;
    const user: User = {
      id: userId,
      role: 'driver',
      phone: data.phone,
      name: data.name,
      language: 'hi',
      createdAt: new Date().toISOString(),
    };

    const users = store.getUsers();
    users.push(user);
    store.setUsers(users);

    const driverId = `driver-${Date.now()}`;
    const newDriver: Driver = {
      id: driverId,
      userId,
      employeeId: `HM-${(data.city || 'DL').substring(0, 2).toUpperCase()}-${Math.floor(4000 + Math.random() * 5000)}`,
      name: data.name,
      fatherName: data.fatherName || 'Shri Sukhdev Singh',
      dob: data.dob || '1990-06-15',
      city: data.city || 'Ludhiana',
      state: data.state || 'Punjab',
      languages: data.languages || ['Hindi', 'Punjabi'],
      avatarUrl: data.avatarUrl || '/assets/images/driver_uniformed.jpg',
      licence: data.licence || {
        number: `DL-PB-201600${Math.floor(1000 + Math.random() * 9000)}`,
        licenceClass: 'HMV',
        issueDate: '2016-04-10',
        expiryDate: '2029-04-10',
      },
      experienceYears: data.experienceYears || 5,
      vehicleTypes: data.vehicleTypes || ['12-Wheeler', 'Trailer'],
      routes: data.routes || ['Delhi–Mumbai', 'Punjab–Gujarat'],
      documents: data.documents || [
        {
          id: `doc-${Date.now()}-dl`,
          type: 'licence',
          title: 'Driving Licence (HMV Commercial)',
          fileUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
          uploadedAt: new Date().toISOString().split('T')[0],
          verified: false,
        },
        {
          id: `doc-${Date.now()}-aadhaar`,
          type: 'aadhaar',
          title: 'Aadhaar Card (Front & Back)',
          fileUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
          uploadedAt: new Date().toISOString().split('T')[0],
          verified: false,
        }
      ],
      verification: {
        status: 'pending',
        checklist: {
          aadhaarVerified: false,
          licenceVerified: false,
          experienceVerified: false,
          backgroundCheckDone: false,
          interviewPassed: false,
        },
        notes: 'New registration submitted. Physical document & RTO verification in progress.',
      },
      employment: {
        status: 'applicant',
      },
      training: [],
      bank: data.bank || {
        accountName: data.name,
        accountNumberMasked: 'XXXX-XXXX-9901',
        ifscCode: 'PUNB0123456',
        bankName: 'Punjab National Bank',
      },
      emergencyContact: data.emergencyContact || {
        name: 'Family Emergency',
        relation: 'Spouse',
        phone: data.phone,
      },
      rating: 5.0,
      tripsCompleted: 0,
    };

    const drivers = store.getDrivers();
    drivers.unshift(newDriver);
    store.setDrivers(drivers);

    store.setCurrentUser(user);
    store.logAction('DRIVER_REGISTERED', user.name, `New driver application registered from ${newDriver.city}`);

    return { user, driver: newDriver };
  },

  registerOwner(data: Partial<Owner> & { phone: string; contactName: string; company: string }): { user: User; owner: Owner } {
    const userId = `user-owner-${Date.now()}`;
    const user: User = {
      id: userId,
      role: 'owner',
      phone: data.phone,
      name: `${data.contactName} (${data.company})`,
      language: 'en',
      createdAt: new Date().toISOString(),
    };

    const users = store.getUsers();
    users.push(user);
    store.setUsers(users);

    const ownerId = `owner-${Date.now()}`;
    const newOwner: Owner = {
      id: ownerId,
      userId,
      company: data.company,
      contactName: data.contactName,
      gst: data.gst || '07TESTG1234A1Z0',
      city: data.city || 'Delhi',
      fleetSize: data.fleetSize || 10,
      vehicleTypes: data.vehicleTypes || ['12-Wheeler', 'Container'],
      routes: data.routes || ['Delhi–Mumbai'],
      activeDriversCount: 0,
      verified: true,
    };

    const owners = store.getOwners();
    owners.unshift(newOwner);
    store.setOwners(owners);

    store.setCurrentUser(user);
    store.logAction('OWNER_REGISTERED', user.name, `New transporter registered: ${data.company}`);

    return { user, owner: newOwner };
  },

  logout(): void {
    const currentUser = store.getCurrentUser();
    if (currentUser) {
      store.logAction('USER_LOGOUT', currentUser.name, 'Logged out');
    }
    store.setCurrentUser(null);
  }
};

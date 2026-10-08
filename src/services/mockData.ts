import { 
  Driver, Owner, Requirement, Application, Placement, 
  Attendance, PaySlip, Complaint, ReplacementRequest, Invoice, AuditLog, User 
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-driver-1',
    role: 'driver',
    phone: '9876500001',
    name: 'Gurpreet Singh',
    language: 'hi',
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'user-owner-1',
    role: 'owner',
    phone: '9876500002',
    name: 'Ramesh Sharma (Sharma Roadways)',
    language: 'en',
    createdAt: '2026-01-12T11:00:00Z',
  },
  {
    id: 'user-admin-1',
    role: 'admin',
    phone: '9876500003',
    email: 'admin@haulimate.in',
    name: 'Admin Desk HauliMate',
    language: 'en',
    // Simple hash placeholder
    passwordHash: 'admin123',
    createdAt: '2026-01-01T09:00:00Z',
  }
];

export const INITIAL_TRANSPORTERS: Owner[] = [
  {
    id: 'owner-1',
    userId: 'user-owner-1',
    company: 'Sharma Roadways Logistics',
    contactName: 'Ramesh Sharma',
    gst: '07AAAAA0000A1Z5',
    city: 'Ludhiana',
    fleetSize: 45,
    vehicleTypes: ['14-Wheeler', 'Trailer', 'Container'],
    routes: ['Delhi–Mumbai', 'Ludhiana–Kandla', 'Punjab–Gujarat'],
    activeDriversCount: 8,
    verified: true,
  },
  {
    id: 'owner-2',
    userId: 'user-owner-2',
    company: 'Punjab Bulk Carriers',
    contactName: 'Harpreet Singh Dhillon',
    gst: '03BBBBB1111B2Z6',
    city: 'Ambala',
    fleetSize: 60,
    vehicleTypes: ['Tanker', '12-Wheeler'],
    routes: ['Delhi–Kolkata', 'Ambala–Kanpur'],
    activeDriversCount: 12,
    verified: true,
  },
  {
    id: 'owner-3',
    userId: 'user-owner-3',
    company: 'GT Road Express Cargo',
    contactName: 'Virender Yadav',
    gst: '06CCCCC2222C3Z7',
    city: 'Panipat',
    fleetSize: 30,
    vehicleTypes: ['Container', '10-Wheeler'],
    routes: ['Delhi–Mumbai', 'Panipat–Surat'],
    activeDriversCount: 5,
    verified: true,
  },
  {
    id: 'owner-4',
    userId: 'user-owner-4',
    company: 'Yamuna Freight Lines',
    contactName: 'Mukesh Agrawal',
    gst: '09DDDDD3333D4Z8',
    city: 'Agra',
    fleetSize: 25,
    vehicleTypes: ['12-Wheeler', 'Trailer'],
    routes: ['Delhi–Kolkata', 'Agra–Mumbai'],
    activeDriversCount: 4,
    verified: true,
  },
  {
    id: 'owner-5',
    userId: 'user-owner-5',
    company: 'Shekhawati Carrier Co.',
    contactName: 'Kailash Choudhary',
    city: 'Jaipur',
    fleetSize: 35,
    vehicleTypes: ['Trailer', 'Tipper'],
    routes: ['Jaipur–Kandla', 'Delhi–Mumbai'],
    activeDriversCount: 6,
    verified: true,
  },
  {
    id: 'owner-6',
    userId: 'user-owner-6',
    company: 'Malwa Heavy Transport',
    contactName: 'Jaswinder Sandhu',
    city: 'Bathinda',
    fleetSize: 20,
    vehicleTypes: ['14-Wheeler', 'Tanker'],
    routes: ['Punjab–Gujarat', 'Bathinda–Delhi'],
    activeDriversCount: 3,
    verified: true,
  },
  {
    id: 'owner-7',
    userId: 'user-owner-7',
    company: 'Karnal Golden Freight',
    contactName: 'Rajesh Mann',
    city: 'Karnal',
    fleetSize: 18,
    vehicleTypes: ['Container', '12-Wheeler'],
    routes: ['Delhi–Mumbai', 'Karnal–Indore'],
    activeDriversCount: 3,
    verified: true,
  },
  {
    id: 'owner-8',
    userId: 'user-owner-8',
    company: 'Awadh Surface Movers',
    contactName: 'Sanjay Awasthi',
    city: 'Kanpur',
    fleetSize: 40,
    vehicleTypes: ['12-Wheeler', '14-Wheeler'],
    routes: ['Kanpur–Kolkata', 'Delhi–Kolkata'],
    activeDriversCount: 5,
    verified: true,
  },
  {
    id: 'owner-9',
    userId: 'user-owner-9',
    company: 'Marwar Logistics Corp',
    contactName: 'Hanuman Singh',
    city: 'Jodhpur',
    fleetSize: 22,
    vehicleTypes: ['Trailer', '12-Wheeler'],
    routes: ['Rajasthan–Gujarat', 'Jodhpur–Delhi'],
    activeDriversCount: 2,
    verified: true,
  },
  {
    id: 'owner-10',
    userId: 'user-owner-10',
    company: 'Northern Fleetlines',
    contactName: 'Satish Bhasin',
    city: 'Delhi',
    fleetSize: 85,
    vehicleTypes: ['Container', '16-Wheeler Multi-Axle'],
    routes: ['Delhi–Mumbai', 'Delhi–Kolkata', 'Delhi–Chennai'],
    activeDriversCount: 15,
    verified: true,
  },
  {
    id: 'owner-11',
    userId: 'user-owner-11',
    company: 'Doon Valley Cargo Movers',
    contactName: 'Sunil Rawat',
    city: 'Ambala',
    fleetSize: 15,
    vehicleTypes: ['10-Wheeler', 'Container'],
    routes: ['Delhi–Dehradun', 'Ambala–Delhi'],
    activeDriversCount: 2,
    verified: true,
  },
  {
    id: 'owner-12',
    userId: 'user-owner-12',
    company: 'Doaba Bulk Carriers',
    contactName: 'Baldev Singh Gill',
    city: 'Ludhiana',
    fleetSize: 50,
    vehicleTypes: ['Tanker', 'Trailer'],
    routes: ['Punjab–Maharashtra', 'Ludhiana–Mundra'],
    activeDriversCount: 7,
    verified: true,
  }
];

const FIRST_NAMES = [
  'Gurpreet', 'Ramesh', 'Mohammad', 'Sukhwinder', 'Balwinder', 'Rajesh', 'Kuldeep', 'Manjit',
  'Satnam', 'Jasbir', 'Sanjay', 'Naresh', 'Dharmendra', 'Harpreet', 'Sunil', 'Vikram',
  'Amrik', 'Surinder', 'Joginder', 'Manoj', 'Ashok', 'Pardeep', 'Subhash', 'Irfan',
  'Tarsem', 'Gurcharan', 'Devinder', 'Ravinder', 'Balkar', 'Davinder', 'Karamjit', 'Jagjit',
  'Kamalpreet', 'Anil', 'Mukesh', 'Deepak', 'Arvinder', 'Gurmeet', 'Satpal', 'Baljit'
];

const LAST_NAMES = [
  'Singh', 'Yadav', 'Irfan', 'Sandhu', 'Gill', 'Kumar', 'Sharma', 'Dhillon',
  'Chauhan', 'Verma', 'Khan', 'Gujjar', 'Rathore', 'Pal', 'Kaur', 'Saini'
];

const CITIES = ['Ludhiana', 'Panipat', 'Kanpur', 'Jaipur', 'Ambala', 'Agra', 'Bathinda', 'Karnal'];
const VEHICLES = ['12-Wheeler', '14-Wheeler', 'Trailer', 'Tanker', 'Container', 'Tipper', 'Multi-Axle'];
const ROUTES = ['Delhi–Mumbai', 'Delhi–Kolkata', 'Punjab–Gujarat', 'Ludhiana–Kandla', 'Delhi–Jaipur', 'Ambala–Kanpur'];

const INDIAN_DRIVER_AVATARS = [
  '/assets/images/driver_sikh.jpg',
  '/assets/images/driver_uniformed.jpg',
  '/assets/images/driver_young.jpg',
  '/assets/images/owner_sharma.jpg',
];

export const INITIAL_DRIVERS: Driver[] = FIRST_NAMES.map((firstName, index) => {
  const lastName = LAST_NAMES[index % LAST_NAMES.length];
  const city = CITIES[index % CITIES.length];
  const isPrimary = index === 0; // Gurpreet Singh (Demo account)
  const isDeployed = index < 10;
  const isApplicant = index > 32;
  const isPending = index >= 28 && index <= 32;

  const id = `driver-${index + 1}`;
  const userId = isPrimary ? 'user-driver-1' : `user-driver-${index + 1}`;
  const employeeId = isApplicant ? undefined : `HM-${city.substring(0, 2).toUpperCase()}-${4000 + index}`;

  return {
    id,
    userId,
    employeeId,
    name: `${firstName} ${lastName}`,
    fatherName: `Shri ${LAST_NAMES[(index + 3) % LAST_NAMES.length]} ${lastName}`,
    dob: '1988-05-14',
    city,
    state: index % 2 === 0 ? 'Punjab' : 'Haryana',
    languages: ['Hindi', 'Punjabi'],
    avatarUrl: INDIAN_DRIVER_AVATARS[index % INDIAN_DRIVER_AVATARS.length],
    licence: {
      number: `DL-${city.substring(0, 2).toUpperCase()}-201200${1000 + index}`,
      licenceClass: index % 4 === 0 ? 'Trailer Special' : 'HMV',
      issueDate: '2014-03-10',
      expiryDate: index === 3 ? '2026-09-25' : '2029-03-10', // One expiring soon for warning test
    },
    experienceYears: 6 + (index % 12),
    vehicleTypes: [VEHICLES[index % VEHICLES.length], VEHICLES[(index + 1) % VEHICLES.length]],
    routes: [ROUTES[index % ROUTES.length], ROUTES[(index + 2) % ROUTES.length]],
    documents: [
      {
        id: `doc-${index}-dl`,
        type: 'licence',
        title: 'Commercial Heavy Vehicle Driving Licence',
        fileUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
        uploadedAt: '2026-01-15',
        expiryDate: index === 3 ? '2026-09-25' : '2029-03-10',
        verified: !isPending && !isApplicant,
      },
      {
        id: `doc-${index}-aadhaar`,
        type: 'aadhaar',
        title: 'Aadhaar Card (UIDAI Verified)',
        fileUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
        uploadedAt: '2026-01-15',
        verified: !isPending && !isApplicant,
      },
      {
        id: `doc-${index}-photo`,
        type: 'photo',
        title: 'Passport Size Photo (HauliMate Uniform)',
        fileUrl: INDIAN_DRIVER_AVATARS[index % INDIAN_DRIVER_AVATARS.length],
        uploadedAt: '2026-01-15',
        verified: true,
      }
    ],
    verification: {
      status: isApplicant ? 'pending' : isPending ? 'pending' : 'verified',
      checklist: {
        aadhaarVerified: !isPending && !isApplicant,
        licenceVerified: !isPending && !isApplicant,
        experienceVerified: !isPending && !isApplicant,
        backgroundCheckDone: !isPending && !isApplicant,
        interviewPassed: !isPending && !isApplicant,
      },
      verifiedAt: isApplicant || isPending ? undefined : '2026-01-20',
      verifiedBy: isApplicant || isPending ? undefined : 'Senior Verification Officer Karnal',
    },
    employment: {
      status: isApplicant ? 'applicant' : isDeployed ? 'deployed' : 'on_bench',
      joiningDate: isApplicant ? undefined : '2026-01-22',
      currentPlacementId: isDeployed ? `placement-${index + 1}` : undefined,
    },
    uniform: isApplicant ? undefined : {
      id: `uniform-${index}`,
      kitNumber: `KIT-HM-${200 + index}`,
      issueDate: '2026-01-23',
      shirtSize: index % 2 === 0 ? 'L' : 'XL',
      items: ['2x Navy Blue HauliMate Shirts', '2x Heavy Duty Trousers', '1x Steel-Toe Safety Boots', '1x High-Vis Safety Vest', '1x Lanyard with RFID ID Card'],
      status: 'issued',
    },
    insurance: isApplicant ? [] : [
      {
        id: `ins-${index}-1`,
        policyType: 'Accidental Cover',
        policyNumber: `HM-ACC-8899${index}`,
        provider: 'National Insurance (HauliMate Corporate Plan)',
        sumInsured: '₹5,00,000',
        validUntil: '2027-01-21',
        status: 'active',
        notes: '24x7 Road accident & disability coverage',
      },
      {
        id: `ins-${index}-2`,
        policyType: 'Health Cover',
        policyNumber: `HM-HLT-4455${index}`,
        provider: 'Care Health (Group Float)',
        sumInsured: '₹2,00,000',
        validUntil: '2027-01-21',
        status: 'active',
        notes: 'Hospitalization and emergency trauma cover',
      }
    ],
    training: [
      {
        id: `train-${index}-1`,
        title: 'Highway Defensive Driving & Safety Protocols',
        titleHi: 'हाइवे सुरक्षा व बचाव ड्राइविंग ट्रेनिंग',
        completedDate: '2026-01-21',
        status: 'completed',
        certificateNumber: `CERT-SAF-${8000 + index}`,
        score: 92,
      },
      {
        id: `train-${index}-2`,
        title: 'Fatigue Management & Night Driving Rules',
        titleHi: 'थकान प्रबंधन और रात की ड्राइविंग के नियम',
        completedDate: '2026-01-22',
        status: 'completed',
        certificateNumber: `CERT-FAT-${8000 + index}`,
        score: 88,
      },
      {
        id: `train-${index}-3`,
        title: 'Customer Etiquette & Transporter Communication',
        titleHi: 'ग्राहक व ट्रांसपोर्टर के साथ सही बातचीत का तरीका',
        completedDate: '2026-01-23',
        status: 'completed',
        certificateNumber: `CERT-ETQ-${8000 + index}`,
        score: 95,
      }
    ],
    bank: {
      accountName: `${firstName} ${lastName}`,
      accountNumberMasked: `XXXX-XXXX-${4000 + index}`,
      ifscCode: 'PUNB0123400',
      bankName: 'Punjab National Bank',
    },
    emergencyContact: {
      name: `Smt. Manpreet Kaur`,
      relation: 'Wife',
      phone: '+91 98123 45678',
    },
    rating: 4.6 + ((index % 5) * 0.08),
    tripsCompleted: 14 + (index * 4),
  };
});

export const INITIAL_REQUIREMENTS: Requirement[] = [
  {
    id: 'req-1',
    ownerId: 'owner-1',
    companyName: 'Sharma Roadways Logistics',
    vehicleType: '14-Wheeler',
    route: 'Delhi–Mumbai',
    city: 'Ludhiana',
    startDate: '2026-09-15',
    durationMonths: 6,
    salaryOffer: 32000,
    count: 3,
    status: 'open',
    notes: 'Urgent need for express parcel cargo route. Clean driving record required.',
    createdAt: '2026-09-01',
  },
  {
    id: 'req-2',
    ownerId: 'owner-1',
    companyName: 'Sharma Roadways Logistics',
    vehicleType: 'Trailer',
    route: 'Ludhiana–Kandla',
    city: 'Ludhiana',
    startDate: '2026-09-20',
    durationMonths: 12,
    salaryOffer: 36000,
    count: 2,
    status: 'open',
    notes: 'Port container delivery. Experience with heavy container chassis preferred.',
    createdAt: '2026-09-02',
  },
  {
    id: 'req-3',
    ownerId: 'owner-2',
    companyName: 'Punjab Bulk Carriers',
    vehicleType: 'Tanker',
    route: 'Delhi–Kolkata',
    city: 'Ambala',
    startDate: '2026-09-18',
    durationMonths: 6,
    salaryOffer: 38000,
    count: 4,
    status: 'open',
    notes: 'Hazardous chemical handling endorsement required on driving licence.',
    createdAt: '2026-09-04',
  },
  {
    id: 'req-4',
    ownerId: 'owner-3',
    companyName: 'GT Road Express Cargo',
    vehicleType: 'Container',
    route: 'Delhi–Mumbai',
    city: 'Panipat',
    startDate: '2026-09-12',
    durationMonths: 6,
    salaryOffer: 30000,
    count: 2,
    status: 'fulfilling',
    notes: 'Textile roll transport Panipat to Bhiwandi.',
    createdAt: '2026-09-05',
  },
  {
    id: 'req-5',
    ownerId: 'owner-4',
    companyName: 'Yamuna Freight Lines',
    vehicleType: '12-Wheeler',
    route: 'Delhi–Kolkata',
    city: 'Agra',
    startDate: '2026-09-25',
    durationMonths: 3,
    salaryOffer: 28000,
    count: 1,
    status: 'open',
    createdAt: '2026-09-06',
  },
  {
    id: 'req-6',
    ownerId: 'owner-5',
    companyName: 'Shekhawati Carrier Co.',
    vehicleType: 'Trailer',
    route: 'Jaipur–Kandla',
    city: 'Jaipur',
    startDate: '2026-09-14',
    durationMonths: 12,
    salaryOffer: 35000,
    count: 3,
    status: 'open',
    createdAt: '2026-09-07',
  },
  {
    id: 'req-7',
    ownerId: 'owner-6',
    companyName: 'Malwa Heavy Transport',
    vehicleType: '14-Wheeler',
    route: 'Punjab–Gujarat',
    city: 'Bathinda',
    startDate: '2026-09-16',
    durationMonths: 6,
    salaryOffer: 33000,
    count: 2,
    status: 'open',
    createdAt: '2026-09-08',
  },
  {
    id: 'req-8',
    ownerId: 'owner-7',
    companyName: 'Karnal Golden Freight',
    vehicleType: 'Container',
    route: 'Delhi–Mumbai',
    city: 'Karnal',
    startDate: '2026-09-19',
    durationMonths: 6,
    salaryOffer: 31000,
    count: 2,
    status: 'open',
    createdAt: '2026-09-09',
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  { id: 'app-1', requirementId: 'req-1', driverId: 'driver-11', status: 'shortlisted', appliedAt: '2026-09-02' },
  { id: 'app-2', requirementId: 'req-1', driverId: 'driver-12', status: 'applied', appliedAt: '2026-09-03' },
  { id: 'app-3', requirementId: 'req-2', driverId: 'driver-13', status: 'applied', appliedAt: '2026-09-04' },
  { id: 'app-4', requirementId: 'req-3', driverId: 'driver-14', status: 'shortlisted', appliedAt: '2026-09-05' },
  { id: 'app-5', requirementId: 'req-4', driverId: 'driver-15', status: 'accepted', appliedAt: '2026-09-06' },
  { id: 'app-6', requirementId: 'req-1', driverId: 'driver-1', status: 'applied', appliedAt: '2026-09-07' },
];

export const INITIAL_PLACEMENTS: Placement[] = [
  {
    id: 'placement-1',
    driverId: 'driver-1', // Gurpreet Singh deployed with Sharma Roadways
    ownerId: 'owner-1',
    requirementId: 'req-1',
    vehicleNo: 'PB-10-AZ-1842 (14-Wheeler Tata Signa)',
    route: 'Delhi–Mumbai Express Corridor',
    startDate: '2026-06-01',
    status: 'active',
  },
  {
    id: 'placement-2',
    driverId: 'driver-2',
    ownerId: 'owner-1',
    requirementId: 'req-1',
    vehicleNo: 'PB-10-BX-9941 (14-Wheeler Ashok Leyland)',
    route: 'Ludhiana–Kandla Port',
    startDate: '2026-06-05',
    status: 'active',
  },
  {
    id: 'placement-3',
    driverId: 'driver-3',
    ownerId: 'owner-2',
    requirementId: 'req-3',
    vehicleNo: 'HR-08-BK-4921 (Tanker BharatBenz)',
    route: 'Delhi–Kolkata Highway',
    startDate: '2026-07-01',
    status: 'active',
  },
  {
    id: 'placement-4',
    driverId: 'driver-4',
    ownerId: 'owner-3',
    requirementId: 'req-4',
    vehicleNo: 'UP-78-CT-9014 (Container 12-Wheeler)',
    route: 'Panipat–Bhiwandi',
    startDate: '2026-07-10',
    status: 'active',
  },
  {
    id: 'placement-5',
    driverId: 'driver-5',
    ownerId: 'owner-4',
    requirementId: 'req-5',
    vehicleNo: 'RJ-14-GH-3399 (Trailer)',
    route: 'Jaipur–Mundra Port',
    startDate: '2026-08-01',
    status: 'active',
  }
];

// Seed 30 days of attendance for primary driver
export const INITIAL_ATTENDANCE: Attendance[] = Array.from({ length: 30 }).map((_, i) => {
  const day = 30 - i;
  const dateStr = `2026-08-${day < 10 ? '0' + day : day}`;
  const isWeekend = day % 7 === 0;
  const isAbsent = day === 14;

  return {
    id: `att-1-${day}`,
    driverId: 'driver-1',
    placementId: 'placement-1',
    date: dateStr,
    status: isAbsent ? 'leave' : isWeekend ? 'leave' : 'on_trip',
    checkIn: isAbsent ? undefined : '06:30 AM',
    checkOut: isAbsent ? undefined : '08:45 PM',
    location: 'Kotputli Highway Toll Plaza (NH-48)',
    vehicleNo: 'PB-10-AZ-1842',
  };
});

export const INITIAL_PAYSLIPS: PaySlip[] = [
  {
    id: 'pay-1',
    driverId: 'driver-1',
    month: '2026-08',
    basicSalary: 28000,
    tripAllowances: 4500,
    pfDeductionApplicable: 1800,
    esiDeductionApplicable: 450,
    bonus: 1000,
    netPay: 31250,
    status: 'paid',
    paymentDate: '2026-09-02',
  },
  {
    id: 'pay-2',
    driverId: 'driver-1',
    month: '2026-07',
    basicSalary: 28000,
    tripAllowances: 4200,
    pfDeductionApplicable: 1800,
    esiDeductionApplicable: 450,
    bonus: 0,
    netPay: 29950,
    status: 'paid',
    paymentDate: '2026-08-03',
  },
  {
    id: 'pay-3',
    driverId: 'driver-1',
    month: '2026-06',
    basicSalary: 28000,
    tripAllowances: 3900,
    pfDeductionApplicable: 1800,
    esiDeductionApplicable: 450,
    bonus: 500,
    netPay: 30150,
    status: 'paid',
    paymentDate: '2026-07-04',
  }
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'comp-1',
    raisedByUserId: 'user-driver-1',
    raisedByName: 'Gurpreet Singh',
    role: 'driver',
    category: 'vehicle_condition',
    description: 'Brake booster air leakage noticed near Surat toll on truck PB-10-AZ-1842. Informed transporter workshop.',
    status: 'investigating',
    createdAt: '2026-09-08T14:30:00Z',
  },
  {
    id: 'comp-2',
    raisedByUserId: 'user-owner-1',
    raisedByName: 'Ramesh Sharma',
    role: 'owner',
    category: 'route_issue',
    description: 'Driver Balwinder reached delivery point 4 hours late due to unplanned stop near Vadodara.',
    status: 'resolved',
    resolution: 'Spoke with driver; delay was due to heavy waterlogging near Bharuch detour. Validated with toll logs.',
    createdAt: '2026-09-05T11:00:00Z',
    resolvedAt: '2026-09-06T10:00:00Z',
  }
];

export const INITIAL_REPLACEMENTS: ReplacementRequest[] = [
  {
    id: 'rep-1',
    ownerId: 'owner-1',
    ownerCompany: 'Sharma Roadways Logistics',
    placementId: 'placement-2',
    driverId: 'driver-2',
    driverName: 'Ramesh Yadav',
    reason: 'Driver admitted to hospital due to sudden viral fever; urgent trip to Kandla tomorrow morning.',
    urgency: 'urgent',
    slaHours: 24,
    status: 'shortlisted',
    replacementDriverId: 'driver-15',
    replacementDriverName: 'Sunil Gujjar',
    createdAt: '2026-09-10T16:00:00Z',
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-101',
    ownerId: 'owner-1',
    month: '2026-08',
    placementFee: 15000,
    monthlyManagementFee: 16000,
    driverCount: 8,
    totalAmount: 31000,
    dueDate: '2026-09-15',
    status: 'pending',
  },
  {
    id: 'inv-100',
    ownerId: 'owner-1',
    month: '2026-07',
    placementFee: 0,
    monthlyManagementFee: 16000,
    driverCount: 8,
    totalAmount: 16000,
    dueDate: '2026-08-15',
    status: 'paid',
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-09-10T16:05:00Z',
    action: 'REPLACEMENT_REQUESTED',
    performedBy: 'Sharma Roadways (Owner)',
    targetId: 'driver-2',
    details: 'Urgent replacement requested for vehicle PB-10-BX-9941. SLA: 24 hrs.',
  },
  {
    id: 'log-2',
    timestamp: '2026-09-09T11:20:00Z',
    action: 'DRIVER_VERIFIED',
    performedBy: 'Admin Desk Karnal',
    targetId: 'driver-27',
    details: 'Aadhaar, Commercial HMV DL and police verification cleared.',
  },
  {
    id: 'log-3',
    timestamp: '2026-09-08T09:00:00Z',
    action: 'DOCUMENTS_ACCESSED',
    performedBy: 'HR Verification Officer',
    targetId: 'driver-1',
    details: 'Driver Gurpreet Singh Aadhaar & DL records viewed for compliance audit.',
  }
];

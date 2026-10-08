export type UserRole = 'driver' | 'owner' | 'admin';

export type Language = 'hi' | 'en';

export interface User {
  id: string;
  role: UserRole;
  phone: string;
  email?: string;
  passwordHash?: string;
  name: string;
  language: Language;
  createdAt: string;
}

export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'more_info_needed';
export type EmploymentStatus = 'applicant' | 'verified' | 'trained' | 'deployed' | 'on_bench' | 'exited';

export interface VerificationChecklist {
  aadhaarVerified: boolean;
  licenceVerified: boolean;
  experienceVerified: boolean;
  backgroundCheckDone: boolean;
  interviewPassed: boolean;
}

export interface DriverLicence {
  number: string;
  licenceClass: 'HMV' | 'HGV' | 'LMV' | 'Trailer Special';
  issueDate: string;
  expiryDate: string;
}

export interface DocumentItem {
  id: string;
  type: 'aadhaar' | 'licence' | 'photo' | 'experience_letter' | 'police_clearance' | 'medical';
  title: string;
  fileUrl: string;
  uploadedAt: string;
  expiryDate?: string;
  verified: boolean;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export interface BankDetails {
  accountName: string;
  accountNumberMasked: string;
  ifscCode: string;
  bankName: string;
}

export interface UniformIssue {
  id: string;
  kitNumber: string;
  issueDate: string;
  shirtSize: 'M' | 'L' | 'XL' | 'XXL';
  items: string[];
  status: 'issued' | 'replacement_requested';
  notes?: string;
}

export interface InsurancePolicy {
  id: string;
  policyType: 'Accidental Cover' | 'Health Cover' | 'Term Life';
  policyNumber: string;
  provider: string;
  sumInsured: string;
  validUntil: string;
  status: 'active' | 'renewal_due' | 'pending_enrolment';
  notes: string;
}

export interface TrainingRecord {
  id: string;
  title: string;
  titleHi: string;
  completedDate?: string;
  status: 'completed' | 'in_progress' | 'scheduled';
  certificateNumber?: string;
  validUntil?: string;
  score?: number;
}

export interface Driver {
  id: string;
  userId: string;
  employeeId?: string;
  name: string;
  fatherName: string;
  dob: string;
  city: string;
  state: string;
  languages: string[];
  avatarUrl: string;
  licence: DriverLicence;
  experienceYears: number;
  vehicleTypes: string[];
  routes: string[];
  documents: DocumentItem[];
  verification: {
    status: VerificationStatus;
    checklist: VerificationChecklist;
    rejectionReason?: string;
    notes?: string;
    verifiedAt?: string;
    verifiedBy?: string;
  };
  employment: {
    status: EmploymentStatus;
    joiningDate?: string;
    currentPlacementId?: string;
  };
  uniform?: UniformIssue;
  insurance?: InsurancePolicy[];
  training: TrainingRecord[];
  bank: BankDetails;
  emergencyContact: EmergencyContact;
  rating: number;
  tripsCompleted: number;
}

export interface Owner {
  id: string;
  userId: string;
  company: string;
  contactName: string;
  gst?: string;
  city: string;
  fleetSize: number;
  vehicleTypes: string[];
  routes: string[];
  activeDriversCount: number;
  verified: boolean;
}

export type RequirementStatus = 'open' | 'fulfilling' | 'fulfilled' | 'closed';

export interface Requirement {
  id: string;
  ownerId: string;
  companyName: string;
  vehicleType: string;
  route: string;
  city: string;
  startDate: string;
  durationMonths: number;
  salaryOffer: number;
  count: number;
  status: RequirementStatus;
  notes?: string;
  createdAt: string;
}

export type ApplicationStatus = 'applied' | 'shortlisted' | 'accepted' | 'rejected';

export interface Application {
  id: string;
  requirementId: string;
  driverId: string;
  status: ApplicationStatus;
  appliedAt: string;
}

export type PlacementStatus = 'active' | 'completed' | 'terminated';

export interface Placement {
  id: string;
  driverId: string;
  ownerId: string;
  requirementId: string;
  vehicleNo: string;
  route: string;
  startDate: string;
  endDate?: string;
  status: PlacementStatus;
}

export type AttendanceStatus = 'present' | 'absent' | 'leave' | 'on_trip';

export interface Attendance {
  id: string;
  driverId: string;
  placementId?: string;
  date: string;
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
  location?: string;
  vehicleNo?: string;
}

export interface LeaveRequest {
  id: string;
  driverId: string;
  type: 'casual' | 'sick' | 'emergency';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
}

export interface PaySlip {
  id: string;
  driverId: string;
  month: string; // e.g. "2026-08"
  basicSalary: number;
  tripAllowances: number;
  pfDeductionApplicable: number;
  esiDeductionApplicable: number;
  bonus: number;
  netPay: number;
  status: 'paid' | 'processing';
  paymentDate?: string;
}

export interface Complaint {
  id: string;
  raisedByUserId: string;
  raisedByName: string;
  role: UserRole;
  category: 'payment' | 'vehicle_condition' | 'behaviour' | 'route_issue' | 'emergency' | 'other';
  description: string;
  status: 'open' | 'investigating' | 'resolved';
  resolution?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface ReplacementRequest {
  id: string;
  ownerId: string;
  ownerCompany: string;
  placementId: string;
  driverId: string;
  driverName: string;
  reason: string;
  urgency: 'low' | 'medium' | 'urgent';
  slaHours: number;
  status: 'requested' | 'shortlisted' | 'replaced' | 'cancelled';
  replacementDriverId?: string;
  replacementDriverName?: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  ownerId: string;
  month: string;
  placementFee: number;
  monthlyManagementFee: number;
  driverCount: number;
  totalAmount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  targetId?: string;
  details: string;
}

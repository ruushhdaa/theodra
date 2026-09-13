/**
 * MOCK / DEMO DATA FOR THEODRA B2B SAAS FRONTEND
 * 
 * Note: In production, this data is retrieved from an authenticated API with
 * strict role-based access control and statutory separation of duties.
 */

export type UserRole = "Employee" | "IC Member" | "HR Admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  department: string;
}

export const DEMO_USERS: Record<UserRole, AuthUser> = {
  "Employee": {
    id: "usr_emp_101",
    name: "Anonymous Employee",
    email: "employee@organization.com",
    role: "Employee",
    title: "Product Associate",
    department: "Engineering",
  },
  "IC Member": {
    id: "usr_ic_202",
    name: "Dr. Sunita Rao",
    email: "sunita.rao@organization.com",
    role: "IC Member",
    title: "Presiding Officer, Internal Committee",
    department: "Legal Affairs",
  },
  "HR Admin": {
    id: "usr_adm_303",
    name: "Rajesh Menon",
    email: "rajesh.menon@organization.com",
    role: "HR Admin",
    title: "VP Human Resources & Compliance",
    department: "People Operations",
  },
};

export interface TrendPoint {
  week: string;
  volume: number;
  afterHoursRatio: number;
  baseline: number;
}

export interface PatternCohort {
  id: string;
  department: string;
  rolePairing: string;
  severity: "Elevated" | "Moderate" | "Watch";
  duration: string;
  cohortSize: number; // Must be >= 5 by privacy design rule
  dynamicsDescription: string;
  escalationStatus: "Pending Initial IC Review" | "1 of 2 Members Confirmed" | "Authorized for Inquiry";
  escalatedByFirstMember: boolean;
  firstMemberName?: string;
  trendData: TrendPoint[];
}

export const MOCK_PATTERN_COHORTS: PatternCohort[] = [
  {
    id: "PAT-8821",
    department: "Core Platform Engineering",
    rolePairing: "Senior Lead → Associate",
    severity: "Elevated",
    duration: "Trailing 4 weeks",
    cohortSize: 7,
    dynamicsDescription: "84% of direct communication occurs after 9:30 PM. 22x response delay imbalance with persistent shift from public team channels to private direct messaging.",
    escalationStatus: "1 of 2 Members Confirmed",
    escalatedByFirstMember: true,
    firstMemberName: "Adv. Shalini Sen (External Member)",
    trendData: [
      { week: "Week 1", volume: 14, afterHoursRatio: 22, baseline: 12 },
      { week: "Week 2", volume: 24, afterHoursRatio: 45, baseline: 13 },
      { week: "Week 3", volume: 46, afterHoursRatio: 68, baseline: 12 },
      { week: "Week 4", volume: 72, afterHoursRatio: 84, baseline: 14 },
    ],
  },
  {
    id: "PAT-4402",
    department: "Cloud Infrastructure & DevOps",
    rolePairing: "Engineering Manager → Junior Developer",
    severity: "Elevated",
    duration: "Trailing 3 weeks",
    cohortSize: 5,
    dynamicsDescription: "Pronounced hierarchy gap with repeated weekend message clustering and sustained single-thread exclusivity.",
    escalationStatus: "Pending Initial IC Review",
    escalatedByFirstMember: false,
    trendData: [
      { week: "Week 1", volume: 10, afterHoursRatio: 18, baseline: 15 },
      { week: "Week 2", volume: 28, afterHoursRatio: 52, baseline: 14 },
      { week: "Week 3", volume: 58, afterHoursRatio: 79, baseline: 15 },
    ],
  },
  {
    id: "PAT-6614",
    department: "Talent Operations & Recruitment",
    rolePairing: "Senior Manager → Intern",
    severity: "Moderate",
    duration: "Trailing 6 weeks",
    cohortSize: 8,
    dynamicsDescription: "68% non-business hour messaging ratio. Repeated high-frequency conversational bursts over late evening periods.",
    escalationStatus: "Pending Initial IC Review",
    escalatedByFirstMember: false,
    trendData: [
      { week: "Week 1", volume: 8, afterHoursRatio: 15, baseline: 10 },
      { week: "Week 2", volume: 14, afterHoursRatio: 28, baseline: 11 },
      { week: "Week 3", volume: 22, afterHoursRatio: 44, baseline: 10 },
      { week: "Week 4", volume: 30, afterHoursRatio: 55, baseline: 12 },
      { week: "Week 5", volume: 38, afterHoursRatio: 62, baseline: 11 },
      { week: "Week 6", volume: 44, afterHoursRatio: 68, baseline: 10 },
    ],
  },
  {
    id: "PAT-3301",
    department: "Enterprise Customer Success",
    rolePairing: "Team Lead → Associate",
    severity: "Moderate",
    duration: "Trailing 2 weeks",
    cohortSize: 6,
    dynamicsDescription: "Frequency escalation slope 1.9x departmental average with sudden decline in peer-visible group channel interactions.",
    escalationStatus: "Pending Initial IC Review",
    escalatedByFirstMember: false,
    trendData: [
      { week: "Week 1", volume: 16, afterHoursRatio: 20, baseline: 18 },
      { week: "Week 2", volume: 36, afterHoursRatio: 51, baseline: 19 },
    ],
  },
  {
    id: "PAT-2290",
    department: "Product Design Systems",
    rolePairing: "Director → Associate Designer",
    severity: "Watch",
    duration: "Trailing 5 weeks",
    cohortSize: 9,
    dynamicsDescription: "Mild response delay differential with occasional weekend communication; within acceptable threshold boundary.",
    escalationStatus: "Pending Initial IC Review",
    escalatedByFirstMember: false,
    trendData: [
      { week: "Week 1", volume: 12, afterHoursRatio: 12, baseline: 14 },
      { week: "Week 2", volume: 15, afterHoursRatio: 18, baseline: 13 },
      { week: "Week 3", volume: 18, afterHoursRatio: 22, baseline: 15 },
      { week: "Week 4", volume: 20, afterHoursRatio: 25, baseline: 14 },
      { week: "Week 5", volume: 22, afterHoursRatio: 26, baseline: 15 },
    ],
  },
];

export interface CommitteeMember {
  id: string;
  name: string;
  roleInCommittee: "Presiding Officer" | "Internal Member" | "External Member";
  corporateTitle: string;
  termStartDate: string;
  termEndDate: string;
  statutoryCategory: string;
  trainingCertified: boolean;
}

export const MOCK_IC_ROSTER: CommitteeMember[] = [
  {
    id: "ic_01",
    name: "Dr. Sunita Rao",
    roleInCommittee: "Presiding Officer",
    corporateTitle: "Senior Director, Legal Affairs",
    termStartDate: "15 Oct 2024",
    termEndDate: "14 Oct 2027",
    statutoryCategory: "Senior Woman Employee (POSH Act §4(2)(a))",
    trainingCertified: true,
  },
  {
    id: "ic_02",
    name: "Vikram Malhotra",
    roleInCommittee: "Internal Member",
    corporateTitle: "Head of Learning & Development",
    termStartDate: "10 Jan 2025",
    termEndDate: "09 Jan 2028",
    statutoryCategory: "Employee Representative (POSH Act §4(2)(b))",
    trainingCertified: true,
  },
  {
    id: "ic_03",
    name: "Anita Deshmukh",
    roleInCommittee: "Internal Member",
    corporateTitle: "Principal Systems Architect",
    termStartDate: "01 Nov 2024",
    termEndDate: "31 Oct 2027",
    statutoryCategory: "Employee Representative (Technical Staff)",
    trainingCertified: true,
  },
  {
    id: "ic_04",
    name: "Adv. Shalini Sen",
    roleInCommittee: "External Member",
    corporateTitle: "Executive Director, Stree Chetna Foundation",
    termStartDate: "01 Sep 2024",
    termEndDate: "31 Aug 2027",
    statutoryCategory: "Independent NGO / Legal Specialist (POSH Act §4(2)(c))",
    trainingCertified: true,
  },
];

export interface ComplianceMetrics {
  annualReportDeadline: string;
  daysRemainingForFiling: number;
  sensitizationCompletionRate: number;
  totalEmployeesSensitized: number;
  totalWorkforceHeadcount: number;
  quarterlyMeetingsConvened: number;
  requiredQuarterlyMeetings: number;
  statutoryComplaintsDisposedWithin90Days: string;
  systemIntegrityStatus: "Operational" | "Maintenance";
}

export const MOCK_COMPLIANCE_METRICS: ComplianceMetrics = {
  annualReportDeadline: "31 January 2027",
  daysRemainingForFiling: 139,
  sensitizationCompletionRate: 94.2,
  totalEmployeesSensitized: 1420,
  totalWorkforceHeadcount: 1507,
  quarterlyMeetingsConvened: 4,
  requiredQuarterlyMeetings: 4,
  statutoryComplaintsDisposedWithin90Days: "100% (No pending cases)",
  systemIntegrityStatus: "Operational",
};

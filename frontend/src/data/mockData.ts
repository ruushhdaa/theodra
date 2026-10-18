/**
 * MOCK / DEMO DATA FOR THEODRA B2B SAAS FRONTEND
 * Centralized, fully typed TypeScript mock data repository
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

export const DEMO_USERS: Record<string, AuthUser> = {
  "ic@theodra.demo": {
    id: "usr_ic_202",
    name: "Dr. Sunita Rao",
    email: "ic@theodra.demo",
    role: "IC Member",
    title: "Presiding Officer, Internal Committee",
    department: "Legal Affairs",
  },
  "hr@theodra.demo": {
    id: "usr_adm_303",
    name: "Rajesh Menon",
    email: "hr@theodra.demo",
    role: "HR Admin",
    title: "VP Human Resources & Compliance",
    department: "People Operations",
  },
  "IC Member": {
    id: "usr_ic_202",
    name: "Dr. Sunita Rao",
    email: "ic@theodra.demo",
    role: "IC Member",
    title: "Presiding Officer, Internal Committee",
    department: "Legal Affairs",
  },
  "HR Admin": {
    id: "usr_adm_303",
    name: "Rajesh Menon",
    email: "hr@theodra.demo",
    role: "HR Admin",
    title: "VP Human Resources & Compliance",
    department: "People Operations",
  },
  "Employee": {
    id: "usr_emp_001",
    name: "Anonymous Employee",
    email: "employee@theodra.demo",
    role: "Employee",
    title: "Associate",
    department: "Engineering",
  },
};

// ==========================================
// 1. PATTERN DETECTION & COHORTS (IC Only)
// ==========================================

export interface TrendPoint {
  week: string;
  volume: number; // Communication frequency index
  afterHoursRatio: number; // % late-night / weekend
  exclusivityScore: number; // Exclusivity / channel isolation score
}

export type SeverityTier = "Watch" | "Elevated" | "Flagged";

export interface PatternCohort {
  id: string;
  department: string;
  rolePairing: string;
  severity: SeverityTier;
  duration: string;
  cohortSize: number; // Must be >= 5 by k-anonymity privacy design
  firstDetected: string;
  lastUpdated: string;
  dynamicsDescription: string;
  escalationStatus: "Pending Initial IC Review" | "1 of 2 Votes Received" | "Escalated";
  votesCount: number; // 0, 1, or 2
  votedMembers: string[];
  pairReviewRequested: boolean;
  pairReviewCaseRef?: string;
  assessmentNote?: string;
  disposition?: "No action required" | "Monitor" | "Escalate";
  trendData: TrendPoint[];
}

export const MOCK_PATTERN_COHORTS: PatternCohort[] = [
  {
    id: "PAT-8821",
    department: "Core Platform Engineering",
    rolePairing: "Senior Lead → Associate",
    severity: "Elevated",
    duration: "4 weeks",
    cohortSize: 7,
    firstDetected: "20 Jan 2026",
    lastUpdated: "14 Feb 2026",
    dynamicsDescription: "84% of direct communication occurs after 9:30 PM. 22x response delay imbalance with persistent shift from public team channels to private direct messaging.",
    escalationStatus: "1 of 2 Votes Received",
    votesCount: 1,
    votedMembers: ["Adv. Shalini Sen (External Member)"],
    pairReviewRequested: false,
    assessmentNote: "Noted significant off-hours messaging spike. Monitoring communication channels before inquiry.",
    disposition: "Monitor",
    trendData: [
      { week: "Wk 1", volume: 18, afterHoursRatio: 24, exclusivityScore: 32 },
      { week: "Wk 2", volume: 34, afterHoursRatio: 48, exclusivityScore: 49 },
      { week: "Wk 3", volume: 56, afterHoursRatio: 72, exclusivityScore: 78 },
      { week: "Wk 4", volume: 78, afterHoursRatio: 84, exclusivityScore: 91 },
    ],
  },
  {
    id: "PAT-4402",
    department: "Cloud Infrastructure & DevOps",
    rolePairing: "Engineering Manager → Junior Developer",
    severity: "Flagged",
    duration: "3 weeks",
    cohortSize: 5,
    firstDetected: "01 Feb 2026",
    lastUpdated: "17 Feb 2026",
    dynamicsDescription: "Pronounced hierarchy gap with repeated weekend message clustering, single-thread exclusivity, and urgent demands for personal off-platform communication.",
    escalationStatus: "Pending Initial IC Review",
    votesCount: 0,
    votedMembers: [],
    pairReviewRequested: false,
    trendData: [
      { week: "Wk 1", volume: 15, afterHoursRatio: 30, exclusivityScore: 40 },
      { week: "Wk 2", volume: 42, afterHoursRatio: 65, exclusivityScore: 68 },
      { week: "Wk 3", volume: 88, afterHoursRatio: 92, exclusivityScore: 89 },
    ],
  },
  {
    id: "PAT-6614",
    department: "Talent Operations & Recruitment",
    rolePairing: "Senior Manager → Intern",
    severity: "Elevated",
    duration: "6 weeks",
    cohortSize: 8,
    firstDetected: "05 Jan 2026",
    lastUpdated: "12 Feb 2026",
    dynamicsDescription: "68% non-business hour messaging ratio. Repeated high-frequency conversational bursts over late evening periods with non-work topical drift.",
    escalationStatus: "Pending Initial IC Review",
    votesCount: 0,
    votedMembers: [],
    pairReviewRequested: false,
    trendData: [
      { week: "Wk 1", volume: 12, afterHoursRatio: 18, exclusivityScore: 25 },
      { week: "Wk 2", volume: 20, afterHoursRatio: 32, exclusivityScore: 38 },
      { week: "Wk 3", volume: 35, afterHoursRatio: 52, exclusivityScore: 50 },
      { week: "Wk 4", volume: 46, afterHoursRatio: 60, exclusivityScore: 65 },
      { week: "Wk 5", volume: 52, afterHoursRatio: 64, exclusivityScore: 70 },
      { week: "Wk 6", volume: 61, afterHoursRatio: 68, exclusivityScore: 74 },
    ],
  },
  {
    id: "PAT-3301",
    department: "Enterprise Customer Success",
    rolePairing: "Team Lead → Associate",
    severity: "Watch",
    duration: "2 weeks",
    cohortSize: 6,
    firstDetected: "04 Feb 2026",
    lastUpdated: "16 Feb 2026",
    dynamicsDescription: "Frequency escalation slope 1.9x departmental average with sudden decline in peer-visible group channel interactions.",
    escalationStatus: "Pending Initial IC Review",
    votesCount: 0,
    votedMembers: [],
    pairReviewRequested: false,
    trendData: [
      { week: "Wk 1", volume: 22, afterHoursRatio: 28, exclusivityScore: 30 },
      { week: "Wk 2", volume: 45, afterHoursRatio: 46, exclusivityScore: 48 },
    ],
  },
  {
    id: "PAT-2290",
    department: "Product Design Systems",
    rolePairing: "Director → Associate Designer",
    severity: "Watch",
    duration: "5 weeks",
    cohortSize: 9,
    firstDetected: "10 Jan 2026",
    lastUpdated: "11 Feb 2026",
    dynamicsDescription: "Mild response delay differential with occasional weekend communication; stable within safe tolerance thresholds.",
    escalationStatus: "Pending Initial IC Review",
    votesCount: 0,
    votedMembers: [],
    pairReviewRequested: false,
    trendData: [
      { week: "Wk 1", volume: 14, afterHoursRatio: 15, exclusivityScore: 18 },
      { week: "Wk 2", volume: 16, afterHoursRatio: 19, exclusivityScore: 22 },
      { week: "Wk 3", volume: 21, afterHoursRatio: 23, exclusivityScore: 25 },
      { week: "Wk 4", volume: 23, afterHoursRatio: 24, exclusivityScore: 28 },
      { week: "Wk 5", volume: 24, afterHoursRatio: 26, exclusivityScore: 29 },
    ],
  },
  {
    id: "PAT-5519",
    department: "Sales & Commercial Accounts",
    rolePairing: "Regional VP → Account Executive",
    severity: "Flagged",
    duration: "8 weeks",
    cohortSize: 5,
    firstDetected: "15 Dec 2025",
    lastUpdated: "15 Feb 2026",
    dynamicsDescription: "Sustained after-hours calls (10:00 PM – 1:30 AM), 94% exclusivity in direct communication, severe power differential with travel-adjacent message volume.",
    escalationStatus: "1 of 2 Votes Received",
    votesCount: 1,
    votedMembers: ["Dr. Sunita Rao (Presiding Officer)"],
    pairReviewRequested: true,
    pairReviewCaseRef: "CASE-2026-09",
    assessmentNote: "High severity correlation with anonymous complaint REP-8901. Second vote requested immediately.",
    disposition: "Escalate",
    trendData: [
      { week: "Wk 1", volume: 20, afterHoursRatio: 35, exclusivityScore: 45 },
      { week: "Wk 2", volume: 38, afterHoursRatio: 55, exclusivityScore: 60 },
      { week: "Wk 3", volume: 55, afterHoursRatio: 70, exclusivityScore: 78 },
      { week: "Wk 4", volume: 72, afterHoursRatio: 82, exclusivityScore: 88 },
      { week: "Wk 5", volume: 85, afterHoursRatio: 89, exclusivityScore: 92 },
      { week: "Wk 6", volume: 92, afterHoursRatio: 94, exclusivityScore: 95 },
      { week: "Wk 7", volume: 95, afterHoursRatio: 95, exclusivityScore: 97 },
      { week: "Wk 8", volume: 99, afterHoursRatio: 96, exclusivityScore: 98 },
    ],
  },
  {
    id: "PAT-7742",
    department: "Corporate Finance & Treasury",
    rolePairing: "Finance Controller → Analyst",
    severity: "Elevated",
    duration: "4 weeks",
    cohortSize: 6,
    firstDetected: "18 Jan 2026",
    lastUpdated: "13 Feb 2026",
    dynamicsDescription: "Unusual late night audit communication surges paired with isolation of associate from peer reviews. Unidirectional ping velocity.",
    escalationStatus: "Pending Initial IC Review",
    votesCount: 0,
    votedMembers: [],
    pairReviewRequested: false,
    trendData: [
      { week: "Wk 1", volume: 15, afterHoursRatio: 22, exclusivityScore: 30 },
      { week: "Wk 2", volume: 30, afterHoursRatio: 45, exclusivityScore: 55 },
      { week: "Wk 3", volume: 62, afterHoursRatio: 71, exclusivityScore: 75 },
      { week: "Wk 4", volume: 80, afterHoursRatio: 83, exclusivityScore: 84 },
    ],
  },
  {
    id: "PAT-9103",
    department: "Operations & Logistics",
    rolePairing: "Senior Director → Shift Supervisor",
    severity: "Watch",
    duration: "12 weeks",
    cohortSize: 11,
    firstDetected: "20 Nov 2025",
    lastUpdated: "10 Feb 2026",
    dynamicsDescription: "Periodic seasonal message surge aligning with fiscal quarterly close; baseline return observed in alternating fortnights.",
    escalationStatus: "Pending Initial IC Review",
    votesCount: 0,
    votedMembers: [],
    pairReviewRequested: false,
    trendData: [
      { week: "Wk 1", volume: 20, afterHoursRatio: 25, exclusivityScore: 28 },
      { week: "Wk 2", volume: 35, afterHoursRatio: 40, exclusivityScore: 35 },
      { week: "Wk 3", volume: 22, afterHoursRatio: 26, exclusivityScore: 29 },
      { week: "Wk 4", volume: 45, afterHoursRatio: 44, exclusivityScore: 40 },
    ],
  },
];

// ==========================================
// 2. CASE MANAGEMENT (IC Only)
// ==========================================

export type CaseStage = "Open" | "Conciliation" | "Inquiry" | "Closed";

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  actor: string;
}

export interface EvidenceItem {
  id: string;
  fileType: "PDF" | "DOCX" | "PNG" | "MP4" | "AUDIO";
  fileName: string;
  dateReceived: string;
  notes: string;
}

export interface ICNote {
  id: string;
  date: string;
  author: string;
  content: string;
}

export interface WitnessEntry {
  id: string;
  codeName: string; // e.g. "Witness A"
  scheduledDate: string;
  status: "Scheduled" | "Completed" | "Pending";
  method: "In-Person Confidential" | "Secure Video Link";
}

export interface KanbanCase {
  id: string;
  title: string;
  department: string;
  stage: CaseStage;
  severity: SeverityTier;
  dateOpened: string;
  dateClosed?: string;
  assignedMember: string;
  respondentRole: string;
  complainantDesignation: string;
  timeline: TimelineEvent[];
  evidence: EvidenceItem[];
  notes: ICNote[];
  interimRelief: {
    ordered: boolean;
    measures: string[];
    details: string;
  };
  witnesses: WitnessEntry[];
  disposition?: {
    outcome: string;
    reasoning: string;
    finalizedDate: string;
  };
  retaliationFlagged: boolean;
  retaliationNotes?: string;
}

export const MOCK_KANBAN_CASES: KanbanCase[] = [
  {
    id: "CASE-2026-09",
    title: "Off-site client travel conduct concern",
    department: "Enterprise Sales",
    stage: "Conciliation",
    severity: "Elevated",
    dateOpened: "12 Feb 2026",
    assignedMember: "Adv. Shalini Sen",
    respondentRole: "Regional VP, Commercial Accounts",
    complainantDesignation: "Account Executive",
    timeline: [
      {
        id: "tl-1",
        date: "12 Feb 2026",
        title: "Complaint Received",
        description: "Anonymous submission converted to formal complaint following complainant consent.",
        actor: "Adv. Shalini Sen",
      },
      {
        id: "tl-2",
        date: "14 Feb 2026",
        title: "Notice Issued to Respondent",
        description: "Formal statutory notice delivered pursuant to Section 11 of POSH Act.",
        actor: "Dr. Sunita Rao",
      },
      {
        id: "tl-3",
        date: "16 Feb 2026",
        title: "Conciliation Requested",
        description: "Complainant requested conciliation exploration under Section 10.",
        actor: "Complainant",
      },
    ],
    evidence: [
      {
        id: "ev-1",
        fileType: "PNG",
        fileName: "travel_schedule_late_text.png",
        dateReceived: "12 Feb 2026",
        notes: "Screenshot of messaging metadata across hotel stay dates.",
      },
      {
        id: "ev-2",
        fileType: "PDF",
        fileName: "flight_itinerary_rebooking.pdf",
        dateReceived: "13 Feb 2026",
        notes: "Unauthorized room assignment modification documents.",
      },
    ],
    notes: [
      {
        id: "nt-1",
        date: "14 Feb 2026, 11:30 AM",
        author: "Adv. Shalini Sen",
        content: "Both parties agreed to explore conciliation. Made strictly clear that no monetary settlement is permissible under POSH Section 10(1).",
      },
    ],
    interimRelief: {
      ordered: true,
      measures: ["Immediate supervisor reassignment", "Restraining order from direct 1:1 contact"],
      details: "Complainant reassigned to report directly to National Accounts Director pending closure.",
    },
    witnesses: [
      {
        id: "w-1",
        codeName: "Witness A",
        scheduledDate: "20 Feb 2026",
        status: "Completed",
        method: "Secure Video Link",
      },
      {
        id: "w-2",
        codeName: "Witness B",
        scheduledDate: "24 Feb 2026",
        status: "Scheduled",
        method: "In-Person Confidential",
      },
    ],
    retaliationFlagged: false,
  },
  {
    id: "CASE-2026-08",
    title: "Persistent unwanted late-night personal communication",
    department: "Platform Engineering",
    stage: "Inquiry",
    severity: "Flagged",
    dateOpened: "28 Jan 2026",
    assignedMember: "Dr. Sunita Rao",
    respondentRole: "Senior Engineering Lead",
    complainantDesignation: "Software Engineer",
    timeline: [
      {
        id: "tl-4",
        date: "28 Jan 2026",
        title: "Inquiry Initiated",
        description: "Formal inquiry instituted after failure of conciliation avenue.",
        actor: "Dr. Sunita Rao",
      },
      {
        id: "tl-5",
        date: "04 Feb 2026",
        title: "Interim Relief Granted",
        description: "Project team transfer granted to complainant without detriment to seniority.",
        actor: "Internal Committee",
      },
      {
        id: "tl-6",
        date: "11 Feb 2026",
        title: "Complainant Deposition Recorded",
        description: "Detailed deposition signed and acknowledged under confidentiality seal.",
        actor: "Anita Deshmukh",
      },
    ],
    evidence: [
      {
        id: "ev-3",
        fileType: "PDF",
        fileName: "slack_archive_export_anon.pdf",
        dateReceived: "28 Jan 2026",
        notes: "Anonymized conversation timestamps and channel movement audit.",
      },
      {
        id: "ev-4",
        fileType: "PNG",
        fileName: "call_logs_redacted.png",
        dateReceived: "02 Feb 2026",
        notes: "Cellular off-hours direct calls exceeding 40 occurrences.",
      },
    ],
    notes: [
      {
        id: "nt-2",
        date: "05 Feb 2026, 04:15 PM",
        author: "Dr. Sunita Rao",
        content: "Statutory 90-day inquiry clock running. Target completion date is 28 April 2026. Deposition cross-examination scheduled for next Tuesday.",
      },
    ],
    interimRelief: {
      ordered: true,
      measures: ["Paid leave of absence for 14 days", "Team reassignment"],
      details: "Relief granted pursuant to Section 12(1) of the Act.",
    },
    witnesses: [
      {
        id: "w-3",
        codeName: "Witness C",
        scheduledDate: "15 Feb 2026",
        status: "Completed",
        method: "In-Person Confidential",
      },
      {
        id: "w-4",
        codeName: "Witness D",
        scheduledDate: "18 Feb 2026",
        status: "Completed",
        method: "Secure Video Link",
      },
    ],
    retaliationFlagged: true,
    retaliationNotes: "Performance review ratings for complainant suddenly marked down by respondent during active inquiry window. Retaliation shield triggered alert to HR Admin.",
  },
  {
    id: "CASE-2026-07",
    title: "Hostile team environment and systemic exclusion",
    department: "Operations & Logistics",
    stage: "Open",
    severity: "Watch",
    dateOpened: "14 Feb 2026",
    assignedMember: "Vikram Malhotra",
    respondentRole: "Operations Lead",
    complainantDesignation: "Logistics Coordinator",
    timeline: [
      {
        id: "tl-7",
        date: "14 Feb 2026",
        title: "Complaint Lodged",
        description: "Formal grievance submitted regarding systematic exclusion and gender-based remarks in team standups.",
        actor: "Vikram Malhotra",
      },
    ],
    evidence: [
      {
        id: "ev-5",
        fileType: "DOCX",
        fileName: "incident_chronology_log.docx",
        dateReceived: "14 Feb 2026",
        notes: "Six-month contemporaneous notes maintained by complainant.",
      },
    ],
    notes: [
      {
        id: "nt-3",
        date: "15 Feb 2026, 10:00 AM",
        author: "Vikram Malhotra",
        content: "Preliminary evaluation underway. Verifying if conduct falls strictly under POSH definition vs general workplace grievance.",
      },
    ],
    interimRelief: {
      ordered: false,
      measures: [],
      details: "Under assessment by Presiding Officer.",
    },
    witnesses: [],
    retaliationFlagged: false,
  },
  {
    id: "CASE-2026-06",
    title: "Verbal misconduct during performance evaluation",
    department: "Corporate Finance",
    stage: "Inquiry",
    severity: "Elevated",
    dateOpened: "04 Jan 2026",
    assignedMember: "Anita Deshmukh",
    respondentRole: "Finance Controller",
    complainantDesignation: "Senior Financial Analyst",
    timeline: [
      {
        id: "tl-8",
        date: "04 Jan 2026",
        title: "Complaint Formally Registered",
        description: "Complaint filed alleging sexually suggestive remarks tied to appraisal outcomes.",
        actor: "Anita Deshmukh",
      },
      {
        id: "tl-9",
        date: "15 Jan 2026",
        title: "Respondent Written Statement Received",
        description: "Respondent submitted 14-page reply denying all allegations.",
        actor: "Respondent",
      },
      {
        id: "tl-10",
        date: "02 Feb 2026",
        title: "Witness Examinations Commenced",
        description: "Heard testimonies of two colleagues present during evaluation session.",
        actor: "Dr. Sunita Rao",
      },
    ],
    evidence: [
      {
        id: "ev-6",
        fileType: "PDF",
        fileName: "appraisal_meeting_recording_transcript.pdf",
        dateReceived: "08 Jan 2026",
        notes: "Transcript of meeting notes and contemporaneous Slack records.",
      },
    ],
    notes: [
      {
        id: "nt-4",
        date: "03 Feb 2026, 05:00 PM",
        author: "Anita Deshmukh",
        content: "Drafting inquiry findings report. Statutory 90 days expires on 04 April 2026. On track for early disposition within 60 days.",
      },
    ],
    interimRelief: {
      ordered: true,
      measures: ["Appraisal freeze and neutral peer committee review", "Direct reporting separation"],
      details: "Appraisal transferred to Chief Financial Officer for neutral benchmarking.",
    },
    witnesses: [
      {
        id: "w-5",
        codeName: "Witness E",
        scheduledDate: "02 Feb 2026",
        status: "Completed",
        method: "In-Person Confidential",
      },
    ],
    retaliationFlagged: false,
  },
  {
    id: "CASE-2025-05",
    title: "Unsolicited graphic messaging via private channels",
    department: "Customer Support",
    stage: "Closed",
    severity: "Elevated",
    dateOpened: "15 Nov 2025",
    dateClosed: "22 Jan 2026",
    assignedMember: "Dr. Sunita Rao",
    respondentRole: "Senior Team Manager",
    complainantDesignation: "Support Specialist",
    timeline: [
      {
        id: "tl-11",
        date: "15 Nov 2025",
        title: "Complaint Received",
        description: "Formal inquiry instituted under POSH Rules.",
        actor: "Dr. Sunita Rao",
      },
      {
        id: "tl-12",
        date: "18 Dec 2025",
        title: "Inquiry Report Concluded",
        description: "IC unanimously established violation of Code of Conduct and POSH Act.",
        actor: "Full Internal Committee",
      },
      {
        id: "tl-13",
        date: "22 Jan 2026",
        title: "Employer Action Implemented",
        description: "Disciplinary termination effected with monetary withholding under Section 13(3).",
        actor: "HR & Board",
      },
    ],
    evidence: [
      {
        id: "ev-7",
        fileType: "PNG",
        fileName: "forensic_export_verified.png",
        dateReceived: "16 Nov 2025",
        notes: "Digital forensics verification report confirming sender identity and unedited timestamps.",
      },
    ],
    notes: [
      {
        id: "nt-5",
        date: "22 Jan 2026, 02:00 PM",
        author: "Dr. Sunita Rao",
        content: "Case closed within statutory 68 days. Employer action report logged in Response Ledger.",
      },
    ],
    interimRelief: {
      ordered: true,
      measures: ["Suspension of respondent pending inquiry"],
      details: "Respondent placed on mandatory administrative leave.",
    },
    witnesses: [
      {
        id: "w-6",
        codeName: "Witness F",
        scheduledDate: "01 Dec 2025",
        status: "Completed",
        method: "In-Person Confidential",
      },
    ],
    disposition: {
      outcome: "Allegations Substantiated — Disciplinary Termination",
      reasoning: "Forensic evidence confirmed repeated unsolicited graphic messages sent outside working hours despite explicit objections.",
      finalizedDate: "22 Jan 2026",
    },
    retaliationFlagged: false,
  },
];

// ==========================================
// 3. ANONYMOUS REPORTS INBOX (IC Only)
// ==========================================

export interface ReportMessage {
  id: string;
  sender: "Reporter" | "IC Member";
  timestamp: string;
  text: string;
}

export interface AnonymousReport {
  id: string;
  referenceCode: string; // e.g. TR-K8X2M9PQ
  submissionWeek: string;
  submissionDate: string;
  concernTags: string[];
  communicationChannel: string;
  approximateTimeframe: string;
  description: string;
  status: "New" | "Under Review" | "Responded" | "Closed";
  evidenceItems: { fileName: string; fileType: string; size: string }[];
  messages: ReportMessage[];
  linkedCaseId?: string;
}

export const MOCK_ANONYMOUS_REPORTS: AnonymousReport[] = [
  {
    id: "REP-8901",
    referenceCode: "TR-K8X2M9PQ",
    submissionWeek: "Week 7, Feb 2026",
    submissionDate: "13 Feb 2026",
    concernTags: ["Inappropriate messages", "Abuse of authority"],
    communicationChannel: "Slack/Teams & Phone call",
    approximateTimeframe: "January 2026 – Present",
    description: "The reporting individual states that a senior department head has repeatedly initiated non-work personal phone calls after 11 PM and hinted that future bonus allocations depend on personal closeness. The individual felt unable to refuse calls without jeopardizing their role.",
    status: "Under Review",
    evidenceItems: [
      { fileName: "call_history_screenshot.png", fileType: "PNG", size: "2.4 MB" },
      { fileName: "slack_dm_excerpt.pdf", fileType: "PDF", size: "1.1 MB" },
    ],
    messages: [
      {
        id: "msg-1",
        sender: "IC Member",
        timestamp: "14 Feb 2026, 10:30 AM",
        text: "Thank you for your report. We have received your submission. An IC member has been assigned to assess the metadata. You may track this report anytime using your reference code TR-K8X2M9PQ. All communications here are strictly confidential.",
      },
      {
        id: "msg-2",
        sender: "Reporter",
        timestamp: "15 Feb 2026, 09:12 AM",
        text: "Thank you. Is there any way to ensure I will not be put on client travel with this individual next month?",
      },
      {
        id: "msg-3",
        sender: "IC Member",
        timestamp: "15 Feb 2026, 02:40 PM",
        text: "Yes, interim protective relief can be arranged immediately without disclosing your name to the individual. Our presiding officer is coordinating a schedule adjustment.",
      },
    ],
    linkedCaseId: "CASE-2026-09",
  },
  {
    id: "REP-7822",
    referenceCode: "TR-P4Y9W1KL",
    submissionWeek: "Week 6, Feb 2026",
    submissionDate: "09 Feb 2026",
    concernTags: ["Verbal harassment", "Exclusion"],
    communicationChannel: "In-person",
    approximateTimeframe: "December 2025 – January 2026",
    description: "During engineering sprint reviews and informal team coffee gatherings, repeated derogatory remarks regarding gender competency were made in presence of team peers. When protested, the reporting individual was quietly omitted from critical architecture architecture syncs.",
    status: "Responded",
    evidenceItems: [
      { fileName: "calendar_invitation_omissions.pdf", fileType: "PDF", size: "850 KB" },
    ],
    messages: [
      {
        id: "msg-4",
        sender: "IC Member",
        timestamp: "10 Feb 2026, 11:00 AM",
        text: "Thank you for contacting the Internal Committee. Your concern is under active evaluation. Would you be comfortable scheduling a confidential video or phone dialogue with an external member?",
      },
    ],
  },
  {
    id: "REP-6544",
    referenceCode: "TR-R7B3X8ZZ",
    submissionWeek: "Week 6, Feb 2026",
    submissionDate: "07 Feb 2026",
    concernTags: ["Unwanted contact", "Intimidation"],
    communicationChannel: "In-person",
    approximateTimeframe: "November 2025",
    description: "The reporting individual experienced persistent physical proximity in the office pantry and repeated suggestions to attend private dinners after company town hall meetings, despite polite demurs.",
    status: "New",
    evidenceItems: [],
    messages: [
      {
        id: "msg-5",
        sender: "IC Member",
        timestamp: "08 Feb 2026, 09:00 AM",
        text: "Your report has been logged. An IC reviewer has been assigned. Please retain your reference code for status updates.",
      },
    ],
  },
  {
    id: "REP-5411",
    referenceCode: "TR-M2N5V7PQ",
    submissionWeek: "Week 5, Feb 2026",
    submissionDate: "01 Feb 2026",
    concernTags: ["Inappropriate messages"],
    communicationChannel: "Slack/Teams",
    approximateTimeframe: "January 2026",
    description: "Late-night direct messages commenting on personal appearance in video conference meetings, accompanied by inappropriate emojis and requests to switch to private WhatsApp communication.",
    status: "Responded",
    evidenceItems: [
      { fileName: "teams_chat_redacted.png", fileType: "PNG", size: "3.2 MB" },
    ],
    messages: [
      {
        id: "msg-6",
        sender: "IC Member",
        timestamp: "02 Feb 2026, 01:15 PM",
        text: "The IC has reviewed the uploaded documentation. We have verified the timestamps against communication logs. We have initiated a formal inquiry track.",
      },
    ],
    linkedCaseId: "CASE-2026-08",
  },
  {
    id: "REP-4309",
    referenceCode: "TR-D9F4K2JH",
    submissionWeek: "Week 4, Jan 2026",
    submissionDate: "24 Jan 2026",
    concernTags: ["Abuse of authority", "Intimidation"],
    communicationChannel: "Email",
    approximateTimeframe: "October 2025 – Present",
    description: "Implicit threats made that refusing social invitations outside business hours would negatively influence probationary confirmation and annual rating reviews.",
    status: "Under Review",
    evidenceItems: [
      { fileName: "email_threads_forwarded.pdf", fileType: "PDF", size: "1.4 MB" },
    ],
    messages: [
      {
        id: "msg-7",
        sender: "IC Member",
        timestamp: "25 Jan 2026, 10:00 AM",
        text: "We take this matter with high seriousness. Please be assured that Section 12 protections against retaliation are immediately enforceable.",
      },
    ],
  },
  {
    id: "REP-3210",
    referenceCode: "TR-Q1W8E5RT",
    submissionWeek: "Week 2, Jan 2026",
    submissionDate: "12 Jan 2026",
    concernTags: ["Verbal harassment"],
    communicationChannel: "In-person",
    approximateTimeframe: "December 2025",
    description: "Inappropriate sexualized jokes and commentary directed at female employees during team celebration dinners.",
    status: "Closed",
    evidenceItems: [],
    messages: [
      {
        id: "msg-8",
        sender: "IC Member",
        timestamp: "13 Jan 2026, 11:30 AM",
        text: "Report received. IC initiated sensitisation and departmental warning session.",
      },
      {
        id: "msg-9",
        sender: "IC Member",
        timestamp: "28 Jan 2026, 04:00 PM",
        text: "Department wide POSH mandatory refresher completed. Team lead issued written admonition. Matter closed in Response Ledger.",
      },
    ],
  },
];

// ==========================================
// 4. RESPONSE LEDGER (IC Only)
// ==========================================

export interface ResponseLedgerEntry {
  id: string;
  sourceType: "Cohort Pattern" | "Anonymous Report" | "Escalation Vote" | "Interim Relief";
  referenceId: string;
  dateReviewed: string;
  icMember: string;
  disposition: "No action required" | "Monitor" | "Escalate" | "Inquiry Instituted" | "Relief Ordered" | "Closed";
  reasoning: string;
  timestamp: string;
  tamperSealHash: string;
}

export const MOCK_RESPONSE_LEDGER: ResponseLedgerEntry[] = [
  {
    id: "LED-001",
    sourceType: "Anonymous Report",
    referenceId: "REP-8901",
    dateReviewed: "14 Feb 2026",
    icMember: "Adv. Shalini Sen",
    disposition: "Inquiry Instituted",
    reasoning: "Corroborated by high after-hours metadata pattern PAT-5519. Sufficient prima facie material under POSH Act Section 11.",
    timestamp: "2026-02-14T10:45:12Z",
    tamperSealHash: "SHA256:8f4c2e1b...90d3a",
  },
  {
    id: "LED-002",
    sourceType: "Cohort Pattern",
    referenceId: "PAT-8821",
    dateReviewed: "14 Feb 2026",
    icMember: "Adv. Shalini Sen",
    disposition: "Escalate",
    reasoning: "First vote cast to escalate cohort PAT-8821. 84% late night ping frequency exceeds departmental threshold.",
    timestamp: "2026-02-14T11:15:00Z",
    tamperSealHash: "SHA256:7a9d3e8f...12c4b",
  },
  {
    id: "LED-003",
    sourceType: "Interim Relief",
    referenceId: "CASE-2026-08",
    dateReviewed: "04 Feb 2026",
    icMember: "Dr. Sunita Rao",
    disposition: "Relief Ordered",
    reasoning: "Immediate project team transfer granted to prevent intimidation during active inquiry proceedings.",
    timestamp: "2026-02-04T16:20:30Z",
    tamperSealHash: "SHA256:3b6a9c8f...44d1e",
  },
  {
    id: "LED-004",
    sourceType: "Cohort Pattern",
    referenceId: "PAT-2290",
    dateReviewed: "11 Feb 2026",
    icMember: "Vikram Malhotra",
    disposition: "Monitor",
    reasoning: "After-hours communication within acceptable threshold for design sprint deadline. Marked for watch list.",
    timestamp: "2026-02-11T09:30:15Z",
    tamperSealHash: "SHA256:1e2f3a4b...55c6d",
  },
  {
    id: "LED-005",
    sourceType: "Anonymous Report",
    referenceId: "REP-3210",
    dateReviewed: "28 Jan 2026",
    icMember: "Anita Deshmukh",
    disposition: "Closed",
    reasoning: "Department wide mandatory sensitization completed. Written reprimand issued to team lead.",
    timestamp: "2026-02-04T14:10:00Z",
    tamperSealHash: "SHA256:9c8b7a6d...00f1a",
  },
];

// ==========================================
// 5. STATUTORY COMPLIANCE CLOCK (IC Only)
// ==========================================

export interface StatutoryClockItem {
  caseId: string;
  caseTitle: string;
  department: string;
  openedDate: string;
  inquiryDeadline: {
    targetDays: number; // 90 days statutory
    daysElapsed: number;
    daysRemaining: number;
    isOverdue: boolean;
  };
  reportDeadline: {
    targetDays: number; // 10 days post inquiry
    daysElapsed: number;
    daysRemaining: number;
    isOverdue: boolean;
  };
  actionDeadline: {
    targetDays: number; // 60 days post report
    daysElapsed: number;
    daysRemaining: number;
    isOverdue: boolean;
  };
}

export const MOCK_STATUTORY_CLOCKS: StatutoryClockItem[] = [
  {
    caseId: "CASE-2026-08",
    caseTitle: "Persistent unwanted late-night personal communication",
    department: "Platform Engineering",
    openedDate: "28 Jan 2026",
    inquiryDeadline: {
      targetDays: 90,
      daysElapsed: 21,
      daysRemaining: 69,
      isOverdue: false,
    },
    reportDeadline: {
      targetDays: 10,
      daysElapsed: 0,
      daysRemaining: 10,
      isOverdue: false,
    },
    actionDeadline: {
      targetDays: 60,
      daysElapsed: 0,
      daysRemaining: 60,
      isOverdue: false,
    },
  },
  {
    caseId: "CASE-2026-06",
    caseTitle: "Verbal misconduct during performance evaluation",
    department: "Corporate Finance",
    openedDate: "04 Jan 2026",
    inquiryDeadline: {
      targetDays: 90,
      daysElapsed: 45,
      daysRemaining: 45,
      isOverdue: false,
    },
    reportDeadline: {
      targetDays: 10,
      daysElapsed: 0,
      daysRemaining: 10,
      isOverdue: false,
    },
    actionDeadline: {
      targetDays: 60,
      daysElapsed: 0,
      daysRemaining: 60,
      isOverdue: false,
    },
  },
  {
    caseId: "CASE-2025-02",
    caseTitle: "Complex multi-witness inquiry into field office conduct",
    department: "Field Operations",
    openedDate: "15 Oct 2025",
    inquiryDeadline: {
      targetDays: 90,
      daysElapsed: 96,
      daysRemaining: -6,
      isOverdue: true, // OVERDUE statutory breach
    },
    reportDeadline: {
      targetDays: 10,
      daysElapsed: 14,
      daysRemaining: -4,
      isOverdue: true, // OVERDUE
    },
    actionDeadline: {
      targetDays: 60,
      daysElapsed: 5,
      daysRemaining: 55,
      isOverdue: false,
    },
  },
  {
    caseId: "CASE-2026-09",
    caseTitle: "Off-site client travel conduct concern",
    department: "Enterprise Sales",
    openedDate: "12 Feb 2026",
    inquiryDeadline: {
      targetDays: 90,
      daysElapsed: 6,
      daysRemaining: 84,
      isOverdue: false,
    },
    reportDeadline: {
      targetDays: 10,
      daysElapsed: 0,
      daysRemaining: 10,
      isOverdue: false,
    },
    actionDeadline: {
      targetDays: 60,
      daysElapsed: 0,
      daysRemaining: 60,
      isOverdue: false,
    },
  },
];

// ==========================================
// 6. TRAINING TRACKER (IC & HR)
// ==========================================

export interface ICTrainingRecord {
  id: string;
  memberName: string;
  role: string;
  trainingModule: string;
  status: "Completed" | "In Progress" | "Overdue";
  completionDate?: string;
  certificateId?: string;
  expiryDate: string;
  daysUntilExpiry: number;
}

export const MOCK_IC_TRAINING: ICTrainingRecord[] = [
  {
    id: "trn-1",
    memberName: "Dr. Sunita Rao",
    role: "Presiding Officer",
    trainingModule: "POSH Act 2013 Inquiry Jurisprudence & Principles of Natural Justice",
    status: "Completed",
    completionDate: "12 Nov 2025",
    certificateId: "CERT-POSH-2025-089",
    expiryDate: "11 Nov 2026",
    daysUntilExpiry: 266,
  },
  {
    id: "trn-2",
    memberName: "Adv. Shalini Sen",
    role: "External Member",
    trainingModule: "Trauma-Informed Witness Deposition & Evidence Appraisal",
    status: "Completed",
    completionDate: "05 Dec 2025",
    certificateId: "CERT-POSH-2025-104",
    expiryDate: "04 Dec 2026",
    daysUntilExpiry: 289,
  },
  {
    id: "trn-3",
    memberName: "Anita Deshmukh",
    role: "Internal Member",
    trainingModule: "Digital Forensics & Electronic Evidence Verification in Inquiries",
    status: "Completed",
    completionDate: "20 Jan 2026",
    certificateId: "CERT-POSH-2026-012",
    expiryDate: "19 Jan 2027",
    daysUntilExpiry: 335,
  },
  {
    id: "trn-4",
    memberName: "Vikram Malhotra",
    role: "Internal Member",
    trainingModule: "Conciliation Procedures, Neutrality & Mandatory Settlement Limits",
    status: "In Progress",
    expiryDate: "28 Feb 2026",
    daysUntilExpiry: 10,
  },
  {
    id: "trn-5",
    memberName: "Rohan Kapoor",
    role: "Internal Member (Alternate)",
    trainingModule: "Annual Statutory Compliance, BRSR & Employer Disclosure Mandates",
    status: "Overdue",
    expiryDate: "01 Feb 2026",
    daysUntilExpiry: -17,
  },
  {
    id: "trn-6",
    memberName: "Meera Nair",
    role: "Internal Member",
    trainingModule: "Anti-Retaliation Safeguards and Workplace Support Architecture",
    status: "Completed",
    completionDate: "15 Jan 2026",
    certificateId: "CERT-POSH-2026-033",
    expiryDate: "14 Jan 2027",
    daysUntilExpiry: 330,
  },
];

// ==========================================
// 7. MEETING MINUTES BUILDER (IC Only)
// ==========================================

export interface MeetingMinutesRecord {
  id: string;
  date: string;
  title: string;
  attendees: string[];
  agendaItems: { topic: string; discussion: string }[];
  decisions: string[];
  actionItems: { task: string; owner: string; deadline: string; status: "Pending" | "Done" }[];
  nextMeetingDate: string;
}

export const MOCK_MEETING_MINUTES: MeetingMinutesRecord[] = [
  {
    id: "MIN-2026-02",
    date: "14 Feb 2026",
    title: "Quarterly Statutory Review & Active Case Evaluation",
    attendees: ["Dr. Sunita Rao", "Adv. Shalini Sen", "Anita Deshmukh", "Vikram Malhotra"],
    agendaItems: [
      {
        topic: "Evaluation of anonymous reports REP-8901 and REP-7822",
        discussion: "Reviewed incoming evidence screenshots. Corroborated with automated telemetry pattern PAT-5519.",
      },
      {
        topic: "Statutory 90-day countdown for Case CASE-2026-08",
        discussion: "Cross-examination dates finalized. Legal counsel confirmed witness deposition scheduling.",
      },
      {
        topic: "Overdue inquiry CASE-2025-02 mitigation",
        discussion: "Noted 6-day delay due to witness medical leave. Formal extension note drafted for board records.",
      },
    ],
    decisions: [
      "Unanimously approved interim relief for CASE-2026-09 complainant.",
      "Voted 1/2 to escalate PAT-8821 cohort for supervisory observation.",
    ],
    actionItems: [
      { task: "File interim relief notification with HR Operations", owner: "Adv. Shalini Sen", deadline: "16 Feb 2026", status: "Done" },
      { task: "Complete witness C & D depositions for CASE-2026-08", owner: "Dr. Sunita Rao", deadline: "22 Feb 2026", status: "Pending" },
    ],
    nextMeetingDate: "28 Feb 2026",
  },
  {
    id: "MIN-2026-01",
    date: "10 Jan 2026",
    title: "Annual Orientation & Q4 2025 Case Dispositions",
    attendees: ["Dr. Sunita Rao", "Adv. Shalini Sen", "Anita Deshmukh", "Vikram Malhotra", "Meera Nair"],
    agendaItems: [
      {
        topic: "Closure of CASE-2025-05",
        discussion: "Reviewed employer implementation report. Verified that termination and compensation withholding were executed.",
      },
    ],
    decisions: [
      "Confirmed formal closure of CASE-2025-05 in Response Ledger.",
      "Approved annual training calendar for internal members.",
    ],
    actionItems: [
      { task: "Reconcile annual case tallies with HR Admin", owner: "Anita Deshmukh", deadline: "20 Jan 2026", status: "Done" },
    ],
    nextMeetingDate: "14 Feb 2026",
  },
];

// ==========================================
// 8. NOTIFICATIONS (IC & HR)
// ==========================================

export interface NotificationItem {
  id: string;
  type: "report" | "pattern" | "vote" | "deadline" | "training" | "message" | "retaliation" | "compliance";
  title: string;
  message: string;
  timestamp: string;
  link: string;
  read: boolean;
}

export const MOCK_IC_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    type: "report",
    title: "New Anonymous Report Received",
    message: "Report REP-8901 submitted under 'Inappropriate messages' & 'Abuse of authority'.",
    timestamp: "10 mins ago",
    link: "/ic/reports/REP-8901",
    read: false,
  },
  {
    id: "notif-2",
    type: "vote",
    title: "Second Vote Required on Cohort Escalation",
    message: "Adv. Shalini Sen voted to escalate PAT-8821 (Core Platform Engineering). Second vote pending.",
    timestamp: "2 hours ago",
    link: "/ic/patterns/PAT-8821",
    read: false,
  },
  {
    id: "notif-3",
    type: "deadline",
    title: "Statutory Deadline Overdue Alert",
    message: "Inquiry on CASE-2025-02 has exceeded the statutory 90-day period by 6 days.",
    timestamp: "5 hours ago",
    link: "/ic/clock",
    read: false,
  },
  {
    id: "notif-4",
    type: "pattern",
    title: "New Flagged Cohort Detected",
    message: "PAT-4402 (Cloud Infrastructure) crossed critical after-hours threshold (92% late pings).",
    timestamp: "1 day ago",
    link: "/ic/patterns/PAT-4402",
    read: true,
  },
  {
    id: "notif-5",
    type: "message",
    title: "Reporter Replied to Inquiry Message",
    message: "Anonymous reply received on report TR-K8X2M9PQ (REP-8901).",
    timestamp: "1 day ago",
    link: "/ic/reports/REP-8901",
    read: true,
  },
  {
    id: "notif-6",
    type: "training",
    title: "Member Training Expiry Warning",
    message: "Vikram Malhotra's conciliation training certificate expires in 10 days.",
    timestamp: "2 days ago",
    link: "/ic/training",
    read: true,
  },
];

export const MOCK_HR_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "hr-notif-1",
    type: "retaliation",
    title: "Retaliation Shield Triggered",
    message: "Unexplained performance downgrade recorded for monitored employee EMP-884-CONF during active inquiry.",
    timestamp: "1 hour ago",
    link: "/hr/retaliation",
    read: false,
  },
  {
    id: "hr-notif-2",
    type: "compliance",
    title: "Statutory Disclosure Mismatch Detected",
    message: "1 case pending beyond 90 days in IC records does not match filed BRSR return figures.",
    timestamp: "4 hours ago",
    link: "/hr/disclosure",
    read: false,
  },
  {
    id: "hr-notif-3",
    type: "deadline",
    title: "Annual POSH Report Filing Window",
    message: "Financial Year 2025-26 statutory district officer report generation is ready for board review.",
    timestamp: "1 day ago",
    link: "/hr/report-generator",
    read: true,
  },
  {
    id: "hr-notif-4",
    type: "training",
    title: "IC Member Certification Overdue",
    message: "Rohan Kapoor has exceeded the refresher training grace period.",
    timestamp: "3 days ago",
    link: "/hr/roster",
    read: true,
  },
];

// ==========================================
// 9. HR ADMIN CONSOLE (AGGREGATES ONLY — ZERO CASE/REPORT CONTENT)
// ==========================================

export interface CommitteeMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  role: "Presiding Officer" | "Internal Member" | "External Member";
  joinDate: string;
  termExpiry: string;
  trainingStatus: "Certified" | "Expiring Soon" | "Overdue";
  statutoryCategory: string;
}

export const MOCK_IC_ROSTER: CommitteeMember[] = [
  {
    id: "ic-mem-1",
    name: "Dr. Sunita Rao",
    designation: "Senior Director, Legal Affairs",
    department: "Legal Affairs",
    role: "Presiding Officer",
    joinDate: "15 Oct 2024",
    termExpiry: "14 Oct 2027",
    trainingStatus: "Certified",
    statutoryCategory: "Senior Woman Employee (POSH Act §4(2)(a))",
  },
  {
    id: "ic-mem-2",
    name: "Adv. Shalini Sen",
    designation: "Executive Director, Stree Chetna NGO",
    department: "Independent External",
    role: "External Member",
    joinDate: "01 Sep 2024",
    termExpiry: "31 Aug 2027",
    trainingStatus: "Certified",
    statutoryCategory: "External Member / Legal Specialist (POSH Act §4(2)(c))",
  },
  {
    id: "ic-mem-3",
    name: "Anita Deshmukh",
    designation: "Principal Systems Architect",
    department: "Engineering",
    role: "Internal Member",
    joinDate: "01 Nov 2024",
    termExpiry: "31 Oct 2027",
    trainingStatus: "Certified",
    statutoryCategory: "Employee Representative (Technical Staff)",
  },
  {
    id: "ic-mem-4",
    name: "Vikram Malhotra",
    designation: "Head of Learning & Development",
    department: "People Operations",
    role: "Internal Member",
    joinDate: "10 Jan 2025",
    termExpiry: "09 Jan 2028",
    trainingStatus: "Expiring Soon",
    statutoryCategory: "Employee Representative (POSH Act §4(2)(b))",
  },
  {
    id: "ic-mem-5",
    name: "Meera Nair",
    designation: "Director of Product Management",
    department: "Product",
    role: "Internal Member",
    joinDate: "15 Mar 2025",
    termExpiry: "14 Mar 2028",
    trainingStatus: "Certified",
    statutoryCategory: "Employee Representative (POSH Act §4(2)(b))",
  },
  {
    id: "ic-mem-6",
    name: "Rohan Kapoor",
    designation: "Director of Enterprise Sales",
    department: "Commercial Accounts",
    role: "Internal Member",
    joinDate: "01 Feb 2024",
    termExpiry: "31 Jan 2027",
    trainingStatus: "Overdue",
    statutoryCategory: "Employee Representative (Commercial)",
  },
];

export interface OrgHealthScoreData {
  overallScore: number; // 67 / 100
  subScores: {
    name: string;
    score: number;
    trend: string;
    interpretation: string;
  }[];
  history: { quarter: string; score: number }[];
}

export const MOCK_ORG_HEALTH_SCORE: OrgHealthScoreData = {
  overallScore: 67,
  subScores: [
    {
      name: "Reporting Rate",
      score: 45,
      trend: "-2%",
      interpretation: "Low volume suggests persistent under-reporting fear or silence norms.",
    },
    {
      name: "IC Response Time",
      score: 72,
      trend: "+5%",
      interpretation: "First response average is 4.2 days, well inside the 7-day target.",
    },
    {
      name: "Training Completion",
      score: 80,
      trend: "+3%",
      interpretation: "General employee sensitization stands at 94.2% across engineering.",
    },
    {
      name: "Resolution Rate",
      score: 65,
      trend: "+1%",
      interpretation: "Two active cases nearing closure, one case running beyond 90 days.",
    },
    {
      name: "Policy Currency",
      score: 73,
      trend: "0%",
      interpretation: "ICC Charter renewed in October; anti-retaliation guidelines updated.",
    },
  ],
  history: [
    { quarter: "Q1 2025", score: 58 },
    { quarter: "Q2 2025", score: 61 },
    { quarter: "Q3 2025", score: 64 },
    { quarter: "Q4 2025", score: 67 },
  ],
};

export interface PeerBenchmarkItem {
  metric: string;
  theodraOrg: number;
  industryAvg: number;
  topQuartile: number;
  unit: string;
  tooltip: string;
}

export const MOCK_PEER_BENCHMARKS: PeerBenchmarkItem[] = [
  {
    metric: "Reports per 1000 Employees",
    theodraOrg: 4.1,
    industryAvg: 2.8,
    topQuartile: 5.6,
    unit: "per 1k",
    tooltip: "Higher initial reporting rates reflect psychological safety and trust in reporting channels rather than higher incident rates.",
  },
  {
    metric: "Average Resolution Days",
    theodraOrg: 58,
    industryAvg: 78,
    topQuartile: 45,
    unit: "days",
    tooltip: "Statutory POSH ceiling is 90 days. Top organizations resolve inquiries thoroughly within 45 to 60 days.",
  },
  {
    metric: "IC Training Completion Rate",
    theodraOrg: 83.3,
    industryAvg: 68.0,
    topQuartile: 95.0,
    unit: "%",
    tooltip: "Percentage of Internal Committee members with up-to-date statutory jurisprudence certification.",
  },
  {
    metric: "Policy Update Frequency",
    theodraOrg: 11,
    industryAvg: 24,
    topQuartile: 12,
    unit: "months",
    tooltip: "Frequency in months between comprehensive legal and procedural reviews of the POSH charter.",
  },
  {
    metric: "Annual Report Filing On-Time Rate",
    theodraOrg: 100,
    industryAvg: 88,
    topQuartile: 100,
    unit: "%",
    tooltip: "Mandatory statutory compliance metric for filing Form A to the District Officer under Section 21.",
  },
];

export interface DepartmentHeatmapItem {
  id: string;
  name: string;
  score: number; // 0 - 100
  respondents: number;
  trend: string; // e.g. "+4%" or "-6%"
  level: "Healthy" | "Stable" | "Attention" | "Critical";
  miniHistory: number[];
}

export const MOCK_DEPARTMENT_HEATMAP: DepartmentHeatmapItem[] = [
  {
    id: "dep-1",
    name: "Platform Engineering",
    score: 54,
    respondents: 48,
    trend: "-6%",
    level: "Attention",
    miniHistory: [68, 62, 59, 54],
  },
  {
    id: "dep-2",
    name: "Enterprise Sales",
    score: 46,
    respondents: 34,
    trend: "-8%",
    level: "Critical",
    miniHistory: [60, 55, 50, 46],
  },
  {
    id: "dep-3",
    name: "Product Design Systems",
    score: 82,
    respondents: 22,
    trend: "+2%",
    level: "Healthy",
    miniHistory: [78, 80, 81, 82],
  },
  {
    id: "dep-4",
    name: "Corporate Finance & Treasury",
    score: 63,
    respondents: 19,
    trend: "-3%",
    level: "Attention",
    miniHistory: [70, 68, 65, 63],
  },
  {
    id: "dep-5",
    name: "Legal & Regulatory",
    score: 89,
    respondents: 14,
    trend: "+1%",
    level: "Healthy",
    miniHistory: [86, 87, 88, 89],
  },
  {
    id: "dep-6",
    name: "Cloud Infrastructure & DevOps",
    score: 58,
    respondents: 27,
    trend: "-4%",
    level: "Attention",
    miniHistory: [66, 64, 61, 58],
  },
  {
    id: "dep-7",
    name: "Talent Operations & HR",
    score: 76,
    respondents: 25,
    trend: "+3%",
    level: "Stable",
    miniHistory: [72, 73, 75, 76],
  },
  {
    id: "dep-8",
    name: "Customer Support & Success",
    score: 79,
    respondents: 52,
    trend: "+5%",
    level: "Stable",
    miniHistory: [71, 74, 76, 79],
  },
];

export interface RetaliationEvent {
  id: string;
  eventType: "Performance Review" | "Transfer" | "Termination" | "Role Change";
  date: string;
  loggedBy: string;
  justification: string;
  hasMissingJustification: boolean;
}

export interface RetaliationShieldCase {
  employeeId: string; // Anonymized, e.g. EMP-884-CONF
  caseReference: string; // CASE-2026-08
  monitoringStartDate: string;
  eventsLogged: number;
  status: "Active Monitoring" | "Alert Triggered";
  events: RetaliationEvent[];
}

export const MOCK_RETALIATION_SHIELD: RetaliationShieldCase[] = [
  {
    employeeId: "EMP-884-CONF",
    caseReference: "CASE-2026-08",
    monitoringStartDate: "28 Jan 2026",
    eventsLogged: 3,
    status: "Alert Triggered",
    events: [
      {
        id: "ret-ev-1",
        eventType: "Performance Review",
        date: "14 Feb 2026",
        loggedBy: "Engineering Dept Head",
        justification: "Pending",
        hasMissingJustification: true,
      },
      {
        id: "ret-ev-2",
        eventType: "Role Change",
        date: "05 Feb 2026",
        loggedBy: "HR Talent Lead",
        justification: "Statutory interim relief transfer ordered by Presiding Officer under Section 12.",
        hasMissingJustification: false,
      },
      {
        id: "ret-ev-3",
        eventType: "Transfer",
        date: "04 Feb 2026",
        loggedBy: "Internal Committee",
        justification: "Temporary relocation to Core Infrastructure group without loss of seniority.",
        hasMissingJustification: false,
      },
    ],
  },
  {
    employeeId: "EMP-312-CONF",
    caseReference: "CASE-2026-09",
    monitoringStartDate: "12 Feb 2026",
    eventsLogged: 1,
    status: "Active Monitoring",
    events: [
      {
        id: "ret-ev-4",
        eventType: "Role Change",
        date: "13 Feb 2026",
        loggedBy: "VP Commercial Accounts",
        justification: "Reassigned travel schedule as agreed in preliminary conciliation protocol.",
        hasMissingJustification: false,
      },
    ],
  },
];

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: "IC Member" | "HR Admin" | "System Worker";
  action: string;
  resource: string;
  ipMasked: string;
  status: "Success" | "Verified";
}

export const MOCK_AUDIT_LOG: AuditLogEntry[] = [
  {
    id: "aud-01",
    timestamp: "18 Feb 2026, 17:42:10",
    user: "Dr. Sunita Rao",
    role: "IC Member",
    action: "Viewed Pattern Detail",
    resource: "Cohort PAT-8821",
    ipMasked: "192.168.1.XXX",
    status: "Success",
  },
  {
    id: "aud-02",
    timestamp: "18 Feb 2026, 16:15:02",
    user: "Rajesh Menon",
    role: "HR Admin",
    action: "Generated Annual Report Preview",
    resource: "Annual Report FY25-26",
    ipMasked: "10.0.4.XXX",
    status: "Success",
  },
  {
    id: "aud-03",
    timestamp: "18 Feb 2026, 15:30:44",
    user: "Adv. Shalini Sen",
    role: "IC Member",
    action: "Cast Escalation Vote",
    resource: "Cohort PAT-8821",
    ipMasked: "172.16.0.XXX",
    status: "Success",
  },
  {
    id: "aud-04",
    timestamp: "18 Feb 2026, 14:02:18",
    user: "System Worker",
    role: "System Worker",
    action: "k-Anonymity Threshold Check",
    resource: "Telemetry Engine (k>=5)",
    ipMasked: "127.0.0.XXX",
    status: "Verified",
  },
  {
    id: "aud-05",
    timestamp: "17 Feb 2026, 18:22:50",
    user: "Rajesh Menon",
    role: "HR Admin",
    action: "Updated IC Roster Training Flag",
    resource: "Member Vikram Malhotra",
    ipMasked: "10.0.4.XXX",
    status: "Success",
  },
  {
    id: "aud-06",
    timestamp: "17 Feb 2026, 11:10:19",
    user: "Anita Deshmukh",
    role: "IC Member",
    action: "Recorded Meeting Minutes",
    resource: "Minutes MIN-2026-02",
    ipMasked: "192.168.2.XXX",
    status: "Success",
  },
  {
    id: "aud-07",
    timestamp: "16 Feb 2026, 19:40:05",
    user: "Vikram Malhotra",
    role: "IC Member",
    action: "Logged Response Ledger Disposition",
    resource: "Ledger LED-004",
    ipMasked: "10.0.8.XXX",
    status: "Success",
  },
  {
    id: "aud-08",
    timestamp: "16 Feb 2026, 14:55:12",
    user: "System Worker",
    role: "System Worker",
    action: "Retaliation Shield Watch Check",
    resource: "Employee EMP-884-CONF",
    ipMasked: "127.0.0.XXX",
    status: "Verified",
  },
  {
    id: "aud-09",
    timestamp: "15 Feb 2026, 16:20:30",
    user: "Dr. Sunita Rao",
    role: "IC Member",
    action: "Sent Anonymous Reply",
    resource: "Report REP-8901 Thread",
    ipMasked: "192.168.1.XXX",
    status: "Success",
  },
  {
    id: "aud-10",
    timestamp: "15 Feb 2026, 10:12:00",
    user: "Rajesh Menon",
    role: "HR Admin",
    action: "Viewed Department Heatmap",
    resource: "Heatmap Aggregate Summary",
    ipMasked: "10.0.4.XXX",
    status: "Success",
  },
  {
    id: "aud-11",
    timestamp: "14 Feb 2026, 17:05:40",
    user: "Adv. Shalini Sen",
    role: "IC Member",
    action: "Updated Case Kanban Stage",
    resource: "Case CASE-2026-09 → Conciliation",
    ipMasked: "172.16.0.XXX",
    status: "Success",
  },
  {
    id: "aud-12",
    timestamp: "14 Feb 2026, 12:45:10",
    user: "Dr. Sunita Rao",
    role: "IC Member",
    action: "Ordered Statutory Interim Relief",
    resource: "Case CASE-2026-08",
    ipMasked: "192.168.1.XXX",
    status: "Success",
  },
  {
    id: "aud-13",
    timestamp: "13 Feb 2026, 09:30:25",
    user: "System Worker",
    role: "System Worker",
    action: "Generated Reference Code TR-K8X2M9PQ",
    resource: "Anonymous Ingestion Gateway",
    ipMasked: "127.0.0.XXX",
    status: "Verified",
  },
  {
    id: "aud-14",
    timestamp: "12 Feb 2026, 18:00:15",
    user: "Rajesh Menon",
    role: "HR Admin",
    action: "Viewed Peer Benchmarks",
    resource: "Benchmark Index IT/SaaS",
    ipMasked: "10.0.4.XXX",
    status: "Success",
  },
  {
    id: "aud-15",
    timestamp: "11 Feb 2026, 15:10:00",
    user: "Anita Deshmukh",
    role: "IC Member",
    action: "Reviewed Evidence Metadata",
    resource: "Case CASE-2026-06",
    ipMasked: "192.168.2.XXX",
    status: "Success",
  },
];

export interface PolicyVaultDocument {
  id: string;
  name: string;
  version: string;
  category: "Statutory Policy" | "Operating Procedures" | "Charter" | "Training Material";
  uploadDate: string;
  uploadedBy: string;
  isActive: boolean;
  fileSize: string;
  versionHistory: { version: string; date: string; changeSummary: string; author: string }[];
}

export const MOCK_POLICY_VAULT: PolicyVaultDocument[] = [
  {
    id: "pol-1",
    name: "Corporate Prevention of Sexual Harassment (POSH) Policy 2025",
    version: "v4.2",
    category: "Statutory Policy",
    uploadDate: "15 Oct 2025",
    uploadedBy: "Rajesh Menon (VP HR)",
    isActive: true,
    fileSize: "2.4 MB",
    versionHistory: [
      { version: "v4.2", date: "15 Oct 2025", changeSummary: "Aligned with DPDP Act 2023 metadata handling rules", author: "Rajesh Menon" },
      { version: "v4.1", date: "10 Oct 2024", changeSummary: "Updated external member term appointments", author: "Dr. Sunita Rao" },
      { version: "v4.0", date: "01 Sep 2023", changeSummary: "Added hybrid remote work communication provisions", author: "Rajesh Menon" },
    ],
  },
  {
    id: "pol-2",
    name: "Zero-Tolerance Anti-Retaliation Safeguards Charter",
    version: "v2.0",
    category: "Charter",
    uploadDate: "10 Jan 2026",
    uploadedBy: "Dr. Sunita Rao",
    isActive: true,
    fileSize: "1.1 MB",
    versionHistory: [
      { version: "v2.0", date: "10 Jan 2026", changeSummary: "Integration with automated Retaliation Shield telemetry", author: "Dr. Sunita Rao" },
      { version: "v1.0", date: "15 Jan 2024", changeSummary: "Initial charter release", author: "Rajesh Menon" },
    ],
  },
  {
    id: "pol-3",
    name: "Internal Committee Operating Procedures & Inquiry Manual",
    version: "v3.1",
    category: "Operating Procedures",
    uploadDate: "05 Nov 2025",
    uploadedBy: "Adv. Shalini Sen",
    isActive: true,
    fileSize: "3.8 MB",
    versionHistory: [
      { version: "v3.1", date: "05 Nov 2025", changeSummary: "Added trauma-informed virtual deposition standards", author: "Adv. Shalini Sen" },
      { version: "v3.0", date: "12 Dec 2024", changeSummary: "Section 10 conciliation protocol formalisation", author: "Dr. Sunita Rao" },
    ],
  },
  {
    id: "pol-4",
    name: "Employee Sensitization Training Deck & Handout 2026",
    version: "v1.5",
    category: "Training Material",
    uploadDate: "02 Jan 2026",
    uploadedBy: "Vikram Malhotra",
    isActive: true,
    fileSize: "8.2 MB",
    versionHistory: [
      { version: "v1.5", date: "02 Jan 2026", changeSummary: "Updated case law examples and bystander intervention modules", author: "Vikram Malhotra" },
    ],
  },
];

export interface AnnualReportData {
  organizationName: string;
  registrationNumber: string;
  financialYear: string;
  presidingOfficer: string;
  externalMember: string;
  totalComplaintsReceived: number;
  complaintsDisposedDuringYear: number;
  casesPendingMoreThan90Days: number;
  workshopsSensitizationSessions: number;
  employeesTrainedCount: number;
  actionTakenByEmployer: string;
}

export const MOCK_ANNUAL_REPORT_DATA: AnnualReportData = {
  organizationName: "Meridian Technologies Pvt. Ltd.",
  registrationNumber: "CIN: U72200KA2018PTC112345",
  financialYear: "2025-2026",
  presidingOfficer: "Dr. Sunita Rao (Senior Director, Legal Affairs)",
  externalMember: "Adv. Shalini Sen (Executive Director, Stree Chetna NGO)",
  totalComplaintsReceived: 6,
  complaintsDisposedDuringYear: 4,
  casesPendingMoreThan90Days: 1,
  workshopsSensitizationSessions: 8,
  employeesTrainedCount: 1420,
  actionTakenByEmployer: "Written reprimand and disciplinary counseling in 1 case; termination with monetary deduction under Section 13(3) in 1 case; conciliation settlement agreed in 1 case; department-wide workshop mandate in 1 case.",
};

export interface DisclosureReconciliationItem {
  metric: string;
  internalRecords: string;
  boardReport: string;
  brsrReturn: string;
  isMismatch: boolean;
  notes: string;
}

export const MOCK_DISCLOSURE_RECONCILIATION: DisclosureReconciliationItem[] = [
  {
    metric: "Complaints received during the financial year",
    internalRecords: "6",
    boardReport: "6",
    brsrReturn: "6",
    isMismatch: false,
    notes: "Perfect concordance across all filing records.",
  },
  {
    metric: "Complaints disposed during the financial year",
    internalRecords: "4",
    boardReport: "4",
    brsrReturn: "4",
    isMismatch: false,
    notes: "Dispositions corroborated by IC meeting minutes.",
  },
  {
    metric: "Complaints pending beyond ninety days",
    internalRecords: "1 (CASE-2025-02)",
    boardReport: "0",
    brsrReturn: "0",
    isMismatch: true, // MISMATCH
    notes: "Internal records flag CASE-2025-02 at 96 days due to witness delay. Draft Board Report currently lists 0. Requires statutory reconciliation note.",
  },
  {
    metric: "Workshops / awareness programmes conducted",
    internalRecords: "8 sessions",
    boardReport: "8 sessions",
    brsrReturn: "8 sessions",
    isMismatch: false,
    notes: "Attendance register signed by L&D lead.",
  },
  {
    metric: "Mandatory training coverage percentage",
    internalRecords: "94.2% (1,420 / 1,507)",
    boardReport: "94%",
    brsrReturn: "90%",
    isMismatch: true, // MISMATCH
    notes: "BRSR return drafted prior to Q4 vendor contractor batch completion. Must be updated to 94.2% before SEBI submission.",
  },
];

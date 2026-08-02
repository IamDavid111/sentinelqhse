import type { RoleId } from "./rbac";

export const SITES = [
  "Bonga Offshore Terminal",
  "Flow Station A",
  "Pump Station B",
  "Tank Farm Delta",
  "Escravos Gas Plant",
  "Warri Refinery Yard",
];

export const DEPARTMENTS = [
  "Operations",
  "Drilling",
  "Maintenance",
  "HSE",
  "Logistics",
  "Process Engineering",
  "Security",
];

export const INCIDENT_CATEGORIES = [
  "Near Miss",
  "Unsafe Act",
  "Unsafe Condition",
  "Environmental Incident",
  "Property Damage",
  "Fire",
  "Explosion",
  "Oil Spill",
  "Gas Leak",
  "Equipment Failure",
  "Vehicle Incident",
  "Medical Emergency",
  "Security Incident",
  "Lost Time Injury",
  "First Aid Case",
  "Fatality",
];

export const SEVERITIES = ["Low", "Medium", "High", "Critical"] as const;
export type Severity = (typeof SEVERITIES)[number];

export const INCIDENT_STATUSES = [
  "Open",
  "Assigned",
  "Under Investigation",
  "Corrective Action",
  "Pending Verification",
  "Closed",
  "Archived",
] as const;
export type IncidentStatus = (typeof INCIDENT_STATUSES)[number];

export const INSPECTION_TYPES = [
  "Workplace Safety Inspection",
  "PPE Inspection",
  "Equipment Inspection",
  "Fire Safety Inspection",
  "Vehicle Inspection",
  "Housekeeping Inspection",
  "Environmental Inspection",
  "Pipeline Inspection",
  "Tank Farm Inspection",
  "Electrical Safety Inspection",
  "Confined Space Inspection",
  "Working at Height Inspection",
  "Hot Work Inspection",
  "Lifting Equipment Inspection",
  "Emergency Preparedness Inspection",
];

export const AUDIT_TYPES = [
  "Internal Audit",
  "External Audit",
  "Regulatory Audit",
  "Contractor Audit",
  "Environmental Audit",
  "Process Safety Audit",
];

export type Incident = {
  id: string;
  ref: string;
  title: string;
  category: string;
  severity: Severity;
  status: IncidentStatus;
  site: string;
  department: string;
  reporter: string;
  assignee: string;
  contractor?: string;
  date: string;
  description: string;
};

export const INCIDENTS: Incident[] = [
  {
    id: "1",
    ref: "INC-2026-0418",
    title: "Hydrocarbon vapour release at separator inlet",
    category: "Gas Leak",
    severity: "Critical",
    status: "Under Investigation",
    site: "Flow Station A",
    department: "Operations",
    reporter: "Musa Bello",
    assignee: "Adaeze Okonkwo",
    date: "2026-07-29",
    description:
      "Gas detector triggered at the separator inlet during a routine changeover. Area was evacuated and isolated within four minutes.",
  },
  {
    id: "2",
    ref: "INC-2026-0417",
    title: "Slip on stairway near pump skid 3",
    category: "First Aid Case",
    severity: "Medium",
    status: "Corrective Action",
    site: "Pump Station B",
    department: "Maintenance",
    reporter: "Grace Ijeoma",
    assignee: "Tunde Alabi",
    date: "2026-07-28",
    description: "Technician slipped on oil-contaminated grating. Minor bruising, treated on site.",
  },
  {
    id: "3",
    ref: "INC-2026-0416",
    title: "Crane load swung outside barricaded zone",
    category: "Near Miss",
    severity: "High",
    status: "Assigned",
    site: "Tank Farm Delta",
    department: "Logistics",
    reporter: "Peter Nwosu",
    assignee: "Adaeze Okonkwo",
    contractor: "Delta Lift Services",
    date: "2026-07-27",
    description: "Suspended load drifted over a walkway during a lift. No injuries or property damage.",
  },
  {
    id: "4",
    ref: "INC-2026-0415",
    title: "Minor crude spill at manifold flange",
    category: "Oil Spill",
    severity: "High",
    status: "Pending Verification",
    site: "Escravos Gas Plant",
    department: "Process Engineering",
    reporter: "Chinedu Eze",
    assignee: "Ruth Adeyemi",
    date: "2026-07-25",
    description: "Approximately 40 litres released from a weeping flange. Contained with spill kit.",
  },
  {
    id: "5",
    ref: "INC-2026-0414",
    title: "Worker observed without fall arrest at height",
    category: "Unsafe Act",
    severity: "Medium",
    status: "Closed",
    site: "Warri Refinery Yard",
    department: "Maintenance",
    reporter: "Ibrahim Sani",
    assignee: "Tunde Alabi",
    contractor: "Northgate Mechanical",
    date: "2026-07-22",
    description: "Scaffolder disconnected harness while transitioning between levels. Stopped and retrained.",
  },
  {
    id: "6",
    ref: "INC-2026-0413",
    title: "Light vehicle reversed into bollard",
    category: "Vehicle Incident",
    severity: "Low",
    status: "Closed",
    site: "Bonga Offshore Terminal",
    department: "Logistics",
    reporter: "Fatima Yusuf",
    assignee: "Ruth Adeyemi",
    date: "2026-07-20",
    description: "No injuries. Minor damage to rear bumper. Reversing assistant not used.",
  },
  {
    id: "7",
    ref: "INC-2026-0412",
    title: "Damaged walkway grating identified",
    category: "Unsafe Condition",
    severity: "Medium",
    status: "Open",
    site: "Pump Station B",
    department: "Operations",
    reporter: "Grace Ijeoma",
    assignee: "Unassigned",
    date: "2026-07-19",
    description: "Corroded grating panel flexes underfoot near the eastern access route.",
  },
  {
    id: "8",
    ref: "INC-2026-0411",
    title: "Compressor trip due to bearing failure",
    category: "Equipment Failure",
    severity: "High",
    status: "Under Investigation",
    site: "Escravos Gas Plant",
    department: "Maintenance",
    reporter: "Chinedu Eze",
    assignee: "Samuel Oduya",
    date: "2026-07-18",
    description: "Unplanned shutdown of train 2 compressor. Vibration alarms preceded the trip by 20 minutes.",
  },
];

export type AppUser = {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  role: RoleId;
  department: string;
  jobTitle: string;
  site: string;
  supervisor: string;
  employmentType: "Full-time" | "Contract" | "Consultant";
  status: "Active" | "Suspended" | "Deactivated" | "Invited";
  lastActive: string;
  certification: "Valid" | "Expiring" | "Expired";
};

export const USERS: AppUser[] = [
  {
    id: "u1",
    employeeId: "EMP-1001",
    name: "Adaeze Okonkwo",
    email: "adaeze.okonkwo@northgateenergy.com",
    phone: "+234 802 114 9922",
    role: "qhse_manager",
    department: "HSE",
    jobTitle: "Group QHSE Manager",
    site: "Flow Station A",
    supervisor: "Emeka Duru",
    employmentType: "Full-time",
    status: "Active",
    lastActive: "2 minutes ago",
    certification: "Valid",
  },
  {
    id: "u2",
    employeeId: "EMP-1002",
    name: "Emeka Duru",
    email: "emeka.duru@northgateenergy.com",
    phone: "+234 803 552 1180",
    role: "super_admin",
    department: "HSE",
    jobTitle: "Director, Operational Safety",
    site: "Bonga Offshore Terminal",
    supervisor: "—",
    employmentType: "Full-time",
    status: "Active",
    lastActive: "Today, 08:12",
    certification: "Valid",
  },
  {
    id: "u3",
    employeeId: "EMP-1043",
    name: "Tunde Alabi",
    email: "tunde.alabi@northgateenergy.com",
    phone: "+234 806 221 7734",
    role: "site_supervisor",
    department: "Maintenance",
    jobTitle: "Site Supervisor",
    site: "Pump Station B",
    supervisor: "Adaeze Okonkwo",
    employmentType: "Full-time",
    status: "Active",
    lastActive: "Yesterday",
    certification: "Expiring",
  },
  {
    id: "u4",
    employeeId: "EMP-1077",
    name: "Ruth Adeyemi",
    email: "ruth.adeyemi@northgateenergy.com",
    phone: "+234 810 449 0021",
    role: "safety_officer",
    department: "HSE",
    jobTitle: "HSE Officer",
    site: "Escravos Gas Plant",
    supervisor: "Adaeze Okonkwo",
    employmentType: "Full-time",
    status: "Active",
    lastActive: "3 hours ago",
    certification: "Valid",
  },
  {
    id: "u5",
    employeeId: "EMP-1120",
    name: "Samuel Oduya",
    email: "samuel.oduya@northgateenergy.com",
    phone: "+234 807 330 5512",
    role: "maintenance_engineer",
    department: "Maintenance",
    jobTitle: "Rotating Equipment Engineer",
    site: "Escravos Gas Plant",
    supervisor: "Tunde Alabi",
    employmentType: "Full-time",
    status: "Active",
    lastActive: "5 hours ago",
    certification: "Valid",
  },
  {
    id: "u6",
    employeeId: "CTR-2210",
    name: "Peter Nwosu",
    email: "p.nwosu@deltalift.com",
    phone: "+234 809 771 2210",
    role: "contractor",
    department: "Logistics",
    jobTitle: "Lifting Supervisor",
    site: "Tank Farm Delta",
    supervisor: "Tunde Alabi",
    employmentType: "Contract",
    status: "Active",
    lastActive: "Yesterday",
    certification: "Expiring",
  },
  {
    id: "u7",
    employeeId: "EMP-1188",
    name: "Grace Ijeoma",
    email: "grace.ijeoma@northgateenergy.com",
    phone: "+234 802 990 3311",
    role: "field_worker",
    department: "Operations",
    jobTitle: "Process Technician",
    site: "Pump Station B",
    supervisor: "Tunde Alabi",
    employmentType: "Full-time",
    status: "Active",
    lastActive: "1 hour ago",
    certification: "Valid",
  },
  {
    id: "u8",
    employeeId: "EMP-1201",
    name: "Ibrahim Sani",
    email: "ibrahim.sani@northgateenergy.com",
    phone: "+234 803 110 8876",
    role: "auditor",
    department: "HSE",
    jobTitle: "Lead Auditor",
    site: "Warri Refinery Yard",
    supervisor: "Emeka Duru",
    employmentType: "Full-time",
    status: "Suspended",
    lastActive: "12 days ago",
    certification: "Expired",
  },
  {
    id: "u9",
    employeeId: "EMP-1002",
    name: "Fatima Yusuf",
    email: "fatima.yusuf@northgateenergy.com",
    phone: "+234 805 118 4409",
    role: "executive",
    department: "Operations",
    jobTitle: "VP Operations",
    site: "Bonga Offshore Terminal",
    supervisor: "—",
    employmentType: "Full-time",
    status: "Active",
    lastActive: "Today, 07:40",
    certification: "Valid",
  },
  {
    id: "u10",
    employeeId: "EMP-1250",
    name: "Musa Bello",
    email: "musa.bello@northgateenergy.com",
    phone: "+234 808 221 6650",
    role: "field_worker",
    department: "Operations",
    jobTitle: "Field Operator",
    site: "Flow Station A",
    supervisor: "Tunde Alabi",
    employmentType: "Full-time",
    status: "Invited",
    lastActive: "Never",
    certification: "Valid",
  },
];

export type CorrectiveAction = {
  id: string;
  title: string;
  source: string;
  assignee: string;
  department: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  due: string;
  status: "Open" | "Assigned" | "In Progress" | "Awaiting Verification" | "Completed" | "Closed";
  overdue: boolean;
};

export const CORRECTIVE_ACTIONS: CorrectiveAction[] = [
  {
    id: "CA-2026-0212",
    title: "Replace corroded walkway grating, east access",
    source: "INC-2026-0412",
    assignee: "Samuel Oduya",
    department: "Maintenance",
    priority: "High",
    due: "2026-08-04",
    status: "In Progress",
    overdue: false,
  },
  {
    id: "CA-2026-0209",
    title: "Re-certify lifting crew and revise lift plan",
    source: "INC-2026-0416",
    assignee: "Peter Nwosu",
    department: "Logistics",
    priority: "Critical",
    due: "2026-07-30",
    status: "Awaiting Verification",
    overdue: true,
  },
  {
    id: "CA-2026-0205",
    title: "Install anti-slip coating on pump skid stairways",
    source: "INSP-0341",
    assignee: "Tunde Alabi",
    department: "Maintenance",
    priority: "Medium",
    due: "2026-08-12",
    status: "Assigned",
    overdue: false,
  },
  {
    id: "CA-2026-0198",
    title: "Replace weeping flange gasket at manifold 4",
    source: "INC-2026-0415",
    assignee: "Samuel Oduya",
    department: "Process Engineering",
    priority: "High",
    due: "2026-07-26",
    status: "Completed",
    overdue: true,
  },
  {
    id: "CA-2026-0191",
    title: "Toolbox talk on harness discipline for scaffolders",
    source: "INC-2026-0414",
    assignee: "Ruth Adeyemi",
    department: "HSE",
    priority: "Medium",
    due: "2026-08-02",
    status: "Closed",
    overdue: false,
  },
];

export type Inspection = {
  id: string;
  title: string;
  type: string;
  site: string;
  inspector: string;
  date: string;
  score: number;
  status: "Scheduled" | "In Progress" | "Submitted" | "Approved";
  findings: number;
};

export const INSPECTIONS: Inspection[] = [
  {
    id: "INSP-0348",
    title: "Weekly PPE compliance walkthrough",
    type: "PPE Inspection",
    site: "Flow Station A",
    inspector: "Ruth Adeyemi",
    date: "2026-07-30",
    score: 92,
    status: "Submitted",
    findings: 2,
  },
  {
    id: "INSP-0347",
    title: "Hot work permit area verification",
    type: "Hot Work Inspection",
    site: "Warri Refinery Yard",
    inspector: "Tunde Alabi",
    date: "2026-07-29",
    score: 78,
    status: "In Progress",
    findings: 5,
  },
  {
    id: "INSP-0344",
    title: "Tank farm bund integrity check",
    type: "Tank Farm Inspection",
    site: "Tank Farm Delta",
    inspector: "Ibrahim Sani",
    date: "2026-07-27",
    score: 88,
    status: "Approved",
    findings: 3,
  },
  {
    id: "INSP-0341",
    title: "Housekeeping and access routes",
    type: "Housekeeping Inspection",
    site: "Pump Station B",
    inspector: "Grace Ijeoma",
    date: "2026-07-24",
    score: 66,
    status: "Approved",
    findings: 7,
  },
  {
    id: "INSP-0339",
    title: "Emergency muster and alarm test",
    type: "Emergency Preparedness Inspection",
    site: "Bonga Offshore Terminal",
    inspector: "Ruth Adeyemi",
    date: "2026-08-06",
    score: 0,
    status: "Scheduled",
    findings: 0,
  },
];

export type Audit = {
  id: string;
  type: string;
  site: string;
  auditor: string;
  date: string;
  scope: string;
  nonConformities: number;
  risk: Severity;
  status: "Planned" | "In Progress" | "Completed" | "Overdue";
};

export const AUDITS: Audit[] = [
  {
    id: "AUD-2026-021",
    type: "Process Safety Audit",
    site: "Escravos Gas Plant",
    auditor: "Ibrahim Sani",
    date: "2026-08-11",
    scope: "Mechanical integrity & alarm management",
    nonConformities: 0,
    risk: "High",
    status: "Planned",
  },
  {
    id: "AUD-2026-019",
    type: "Contractor Audit",
    site: "Tank Farm Delta",
    auditor: "Ruth Adeyemi",
    date: "2026-07-28",
    scope: "Delta Lift Services HSE management system",
    nonConformities: 6,
    risk: "High",
    status: "In Progress",
  },
  {
    id: "AUD-2026-016",
    type: "Regulatory Audit",
    site: "Warri Refinery Yard",
    auditor: "External — NUPRC",
    date: "2026-07-14",
    scope: "Environmental discharge compliance",
    nonConformities: 3,
    risk: "Medium",
    status: "Completed",
  },
  {
    id: "AUD-2026-012",
    type: "Internal Audit",
    site: "Pump Station B",
    auditor: "Ibrahim Sani",
    date: "2026-06-30",
    scope: "Permit to work system",
    nonConformities: 9,
    risk: "Critical",
    status: "Overdue",
  },
];

export const MONTHLY_TREND = [
  { month: "Feb", incidents: 21, nearMisses: 34, ltis: 2 },
  { month: "Mar", incidents: 18, nearMisses: 41, ltis: 1 },
  { month: "Apr", incidents: 24, nearMisses: 38, ltis: 3 },
  { month: "May", incidents: 16, nearMisses: 52, ltis: 1 },
  { month: "Jun", incidents: 13, nearMisses: 61, ltis: 0 },
  { month: "Jul", incidents: 11, nearMisses: 68, ltis: 1 },
];

export const SEVERITY_SPLIT = [
  { name: "Low", value: 46 },
  { name: "Medium", value: 32 },
  { name: "High", value: 17 },
  { name: "Critical", value: 5 },
];

export const TYPE_SPLIT = [
  { name: "Near Miss", value: 68 },
  { name: "Unsafe Condition", value: 41 },
  { name: "Equipment Failure", value: 22 },
  { name: "Oil Spill", value: 9 },
  { name: "Vehicle", value: 14 },
  { name: "Injury", value: 7 },
];

export const DEPARTMENT_COMPARISON = DEPARTMENTS.slice(0, 6).map((d, i) => ({
  department: d,
  incidents: [17, 12, 21, 6, 14, 9][i] ?? 8,
  actions: [9, 7, 15, 4, 8, 5][i] ?? 5,
}));

export const SITE_STATUS: {
  site: string;
  status: "Normal" | "Warning" | "Critical";
  openIncidents: number;
  safetyScore: number;
  lastEvent: string;
}[] = [
  { site: "Bonga Offshore Terminal", status: "Normal", openIncidents: 2, safetyScore: 94, lastEvent: "12 days ago" },
  { site: "Flow Station A", status: "Critical", openIncidents: 7, safetyScore: 68, lastEvent: "Today" },
  { site: "Pump Station B", status: "Warning", openIncidents: 4, safetyScore: 79, lastEvent: "3 days ago" },
  { site: "Tank Farm Delta", status: "Warning", openIncidents: 3, safetyScore: 82, lastEvent: "4 days ago" },
  { site: "Escravos Gas Plant", status: "Normal", openIncidents: 1, safetyScore: 91, lastEvent: "6 days ago" },
  { site: "Warri Refinery Yard", status: "Normal", openIncidents: 2, safetyScore: 88, lastEvent: "9 days ago" },
];

export const RISK_PREDICTIONS = [
  {
    site: "Flow Station A",
    risks: [
      { label: "Heat Stress Risk", value: 82, drivers: "Ambient 38°C, 12h shifts, 3 prior heat events" },
      { label: "Slip Risk", value: 71, drivers: "Oil residue reports, wet season onset" },
      { label: "Permit Violation Risk", value: 63, drivers: "4 late permit closures in 30 days" },
      { label: "Equipment Failure Risk", value: 58, drivers: "Vibration trend on compressor train 2" },
    ],
  },
  {
    site: "Tank Farm Delta",
    risks: [
      { label: "Lifting Incident Risk", value: 74, drivers: "Contractor crew turnover, 2 near misses" },
      { label: "Spill Risk", value: 52, drivers: "Aging flange population, bund findings" },
      { label: "Night Shift Risk", value: 47, drivers: "Reduced supervision after 22:00" },
    ],
  },
];

export const AI_INSIGHTS = [
  {
    title: "Lifting operations are the dominant emerging risk",
    body: "Three of the last eight events involve contractor lifting crews at Tank Farm Delta. Recommend a stand-down and re-verification of lift plans before the August campaign.",
    tag: "Emerging risk",
  },
  {
    title: "Night shift incident rate is 2.4x day shift",
    body: "Events between 22:00 and 04:00 account for 41% of reports with 17% of exposure hours. Increase supervisory coverage on the night roster.",
    tag: "Pattern",
  },
  {
    title: "Near-miss reporting quality is improving",
    body: "Near-miss volume is up 41% while recordable incidents fell 48% over six months — a healthy leading-indicator signal.",
    tag: "Positive",
  },
];

export const ACTIVITY_LOG = [
  {
    time: "2026-08-02 09:41",
    user: "Adaeze Okonkwo",
    activity: "Assigned investigation for INC-2026-0418",
    ip: "102.89.34.12",
    location: "Lagos, NG",
  },
  {
    time: "2026-08-02 09:12",
    user: "Grace Ijeoma",
    activity: "Submitted inspection INSP-0348",
    ip: "102.89.77.9",
    location: "Port Harcourt, NG",
  },
  { time: "2026-08-02 08:55", user: "Emeka Duru", activity: "User logged in", ip: "41.203.11.88", location: "Abuja, NG" },
  {
    time: "2026-08-01 18:22",
    user: "Ruth Adeyemi",
    activity: "Downloaded monthly HSE report (PDF)",
    ip: "102.89.34.51",
    location: "Warri, NG",
  },
  {
    time: "2026-08-01 16:04",
    user: "Tunde Alabi",
    activity: "Password changed",
    ip: "197.210.5.31",
    location: "Port Harcourt, NG",
  },
  {
    time: "2026-08-01 14:37",
    user: "Musa Bello",
    activity: "Created incident INC-2026-0418",
    ip: "197.210.5.114",
    location: "Flow Station A",
  },
  {
    time: "2026-08-01 11:20",
    user: "Emeka Duru",
    activity: "Changed organization notification settings",
    ip: "41.203.11.88",
    location: "Abuja, NG",
  },
];

export const NOTIFICATIONS = [
  { title: "Critical gas leak reported at Flow Station A", meta: "INC-2026-0418 · 8 min ago", tone: "danger" as const },
  { title: "Corrective action CA-2026-0209 is overdue", meta: "Assigned to Peter Nwosu · 2 days", tone: "warning" as const },
  { title: "Contractor audit AUD-2026-019 fieldwork today", meta: "Tank Farm Delta · 09:00", tone: "info" as const },
  { title: "Emergency preparedness inspection due", meta: "Bonga Offshore Terminal · Aug 6", tone: "info" as const },
  { title: "Hot work permit expiring in 2 hours", meta: "Warri Refinery Yard · Permit PTW-8841", tone: "warning" as const },
];

export const KPIS = [
  { label: "Total Incidents", value: 128, delta: -12, tone: "primary" as const, to: "/app/incidents" },
  { label: "Open Incidents", value: 19, delta: 3, tone: "warning" as const, to: "/app/incidents" },
  { label: "Resolved Incidents", value: 109, delta: 8, tone: "primary" as const, to: "/app/incidents" },
  { label: "High Risk Incidents", value: 6, delta: -2, tone: "danger" as const, to: "/app/incidents" },
  { label: "Near Misses", value: 68, delta: 41, tone: "info" as const, to: "/app/incidents" },
  { label: "Open Corrective Actions", value: 23, delta: -5, tone: "accent" as const, to: "/app/corrective-actions" },
  { label: "Overdue Actions", value: 4, delta: 1, tone: "danger" as const, to: "/app/corrective-actions" },
  { label: "Inspections Completed", value: 87, delta: 14, tone: "primary" as const, to: "/app/inspections" },
  { label: "Pending Audits", value: 3, delta: 0, tone: "warning" as const, to: "/app/audits" },
  { label: "Safety Score", value: 86, delta: 4, tone: "primary" as const, suffix: "/100", to: "/app/ai-intelligence" },
];

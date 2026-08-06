// Mock data powering the AI Safety Intelligence, Audit Management and
// Procurement modules. Values are illustrative for demonstration purposes.

/* ---------------------------------- AI ---------------------------------- */

export const AI_SAFETY_CARDS = [
  { label: "AI risk level", value: "High", sub: "Composite score 78/100 · up 6 pts", tone: "danger" as const },
  { label: "High-risk incidents", value: "14", sub: "Last 90 days · 4 open", tone: "warning" as const },
  { label: "Near-miss trend", value: "+18%", sub: "Reporting up month-on-month", tone: "info" as const },
  { label: "Most common hazard", value: "Slips & trips", sub: "23% of all reported events", tone: "warning" as const },
  { label: "Highest risk facility", value: "Flow Station B", sub: "9 events · 3 overdue actions", tone: "danger" as const },
  { label: "Avg resolution time", value: "2.3 days", sub: "Down from 3.1 days in Q2", tone: "success" as const },
];

export const AI_SUMMARY_TEMPLATES = [
  {
    id: "spill",
    title: "Diesel spill during routine maintenance",
    summary:
      "The incident involved a minor diesel spill during routine maintenance. No injuries were recorded. Immediate containment measures were implemented. Recommend improving spill response preparedness and equipment inspection.",
  },
  {
    id: "slip",
    title: "Slip on wet walkway, Flow Station B",
    summary:
      "A technician slipped on an unmarked wet walkway during the night shift, resulting in a minor contusion. Housekeeping controls were not in place at the time. Recommend reinstating wet-floor signage, improving walkway drainage and reinforcing housekeeping checks at shift handover.",
  },
  {
    id: "ptw",
    title: "Permit-to-work breach at Compressor Station B",
    summary:
      "A contractor crew commenced hot work before the permit was authorised. No injury or asset damage occurred. Work was stopped immediately by the area supervisor. Recommend refresher training for permit issuers and additional supervisory verification before hot work begins.",
  },
];

export const NEAR_MISS_SUMMARY = {
  total: 186,
  monthChange: "+18%",
  topCategory: "Slips, trips & falls",
  openReviews: 12,
};

export const NEAR_MISS_TREND = [
  { month: "Feb", nearMisses: 18, incidents: 9 },
  { month: "Mar", nearMisses: 22, incidents: 8 },
  { month: "Apr", nearMisses: 26, incidents: 7 },
  { month: "May", nearMisses: 29, incidents: 7 },
  { month: "Jun", nearMisses: 33, incidents: 6 },
  { month: "Jul", nearMisses: 39, incidents: 5 },
];

export const NEAR_MISS_CATEGORIES = [
  { category: "Slips, trips & falls", count: 43 },
  { category: "Dropped objects", count: 31 },
  { category: "Permit violations", count: 27 },
  { category: "Vehicle & lifting", count: 22 },
  { category: "Hazardous release", count: 16 },
];

export const NEAR_MISS_LOCATIONS = [
  { location: "Flow Station B", count: 38, note: "Night shift concentration" },
  { location: "Compressor Station B", count: 29, note: "Permit-related events" },
  { location: "Tank Farm East", count: 24, note: "Walkway and access issues" },
];

export const NEAR_MISS_RECOMMENDATIONS = [
  "Improve lighting on the Flow Station B external walkways before the next night shift.",
  "Replace damaged grating and walkway sections identified in the Tank Farm East inspection.",
  "Conduct targeted toolbox talks on dropped-object prevention with lifting crews.",
  "Increase supervision during night shifts at Compressor Station B for the next 14 days.",
];

export type RiskPrediction = {
  facility: string;
  risk: "High" | "Medium" | "Low";
  confidence: number;
  drivers: string;
  actions: string[];
};

export const AI_RISK_PREDICTIONS: RiskPrediction[] = [
  {
    facility: "Flow Station A",
    risk: "High",
    confidence: 82,
    drivers: "Rising near misses, 3 overdue actions, contractor surge",
    actions: [
      "Conduct immediate inspection",
      "Increase supervisor presence",
      "Review permit activities",
      "Schedule toolbox talk",
    ],
  },
  {
    facility: "Compressor Station B",
    risk: "Medium",
    confidence: 64,
    drivers: "Permit violations trending up during night shift",
    actions: ["Re-verify permit issuers", "Audit hot work controls", "Brief night shift supervisors"],
  },
  {
    facility: "Tank Farm East",
    risk: "Low",
    confidence: 31,
    drivers: "Stable performance, all actions closed on time",
    actions: ["Maintain routine inspection cadence", "Continue monthly housekeeping audit"],
  },
];

export const EXEC_AI_INSIGHTS = [
  { tag: "Contractors", text: "Most incidents occurred during contractor maintenance windows." },
  { tag: "Shift pattern", text: "Night shift incidents increased by 18% over the last quarter." },
  { tag: "Compliance", text: "Permit violations remain highest at Compressor Station B." },
  { tag: "Behaviour", text: "Unsafe acts account for 42% of all reported events." },
  { tag: "Response", text: "Average corrective action closure improved to 2.3 days from 3.1 days." },
  { tag: "Reporting", text: "Near-miss reporting is up 18%, an early indicator of a maturing safety culture." },
];

/* -------------------------------- Audits -------------------------------- */

export const AUDIT_KPIS = [
  { label: "Upcoming audits", value: "6" },
  { label: "Completed audits", value: "18" },
  { label: "Overdue audits", value: "2" },
  { label: "Open findings", value: "23" },
  { label: "Closed findings", value: "141" },
  { label: "Avg compliance score", value: "91%" },
];

export const AUDIT_TYPE_OPTIONS = [
  "Internal Audit",
  "Safety Audit",
  "Compliance Audit",
  "Environmental Audit",
  "Contractor Audit",
] as const;

export const AUDIT_CHECKLIST_ITEMS = [
  { id: "ppe", label: "PPE Compliance", guidance: "Correct PPE issued, worn and within inspection date." },
  { id: "fire", label: "Fire Safety", guidance: "Extinguishers serviced, access routes clear, alarms tested." },
  { id: "house", label: "Housekeeping", guidance: "Walkways clear, waste segregated, no standing spills." },
  { id: "ptw", label: "Permit-to-Work", guidance: "Permits authorised, displayed and matched to the task." },
  { id: "emerg", label: "Emergency Equipment", guidance: "Eye wash, showers and muster points serviceable." },
  { id: "hazid", label: "Hazard Identification", guidance: "JSAs completed and hazards communicated at toolbox talk." },
  { id: "sign", label: "Signage", guidance: "Mandatory, warning and egress signage legible and correct." },
  { id: "waste", label: "Waste Management", guidance: "Waste streams segregated, manifests complete." },
];

export type AuditFinding = {
  id: string;
  item: string;
  description: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  owner: string;
  due: string;
  status: "Open" | "In Progress" | "Closed";
};

export const AUDIT_FINDINGS: AuditFinding[] = [
  {
    id: "AF-2026-071",
    item: "Permit-to-Work",
    description: "Hot work permit not displayed at the worksite during contractor welding activity.",
    severity: "High",
    owner: "Emeka Obi",
    due: "2026-08-12",
    status: "In Progress",
  },
  {
    id: "AF-2026-070",
    item: "Fire Safety",
    description: "Two extinguishers at Flow Station B past their annual service date.",
    severity: "Medium",
    owner: "Aisha Bello",
    due: "2026-08-09",
    status: "Open",
  },
  {
    id: "AF-2026-069",
    item: "Housekeeping",
    description: "Hydrocarbon staining and loose scaffolding boards on the east walkway.",
    severity: "Medium",
    owner: "Tunde Alabi",
    due: "2026-08-15",
    status: "Open",
  },
  {
    id: "AF-2026-066",
    item: "PPE Compliance",
    description: "Three contractors observed without cut-resistant gloves during pipe handling.",
    severity: "Low",
    owner: "Grace Nwosu",
    due: "2026-07-30",
    status: "Closed",
  },
  {
    id: "AF-2026-064",
    item: "Waste Management",
    description: "Oily rag waste stored in general waste skip at the workshop.",
    severity: "High",
    owner: "Samuel Ade",
    due: "2026-08-06",
    status: "Closed",
  },
];

export type AuditCorrectiveAction = {
  id: string;
  finding: string;
  action: string;
  owner: string;
  target: string;
  status: "Not started" | "In progress" | "Completed";
  evidence: string;
  notes: string;
};

export const AUDIT_CORRECTIVE_ACTIONS: AuditCorrectiveAction[] = [
  {
    id: "CA-2026-118",
    finding: "AF-2026-071",
    action: "Retrain permit issuers and add supervisor verification before hot work starts.",
    owner: "Emeka Obi",
    target: "2026-08-12",
    status: "In progress",
    evidence: "ptw-refresher-attendance.pdf",
    notes: "Session scheduled for both shifts on 9 August.",
  },
  {
    id: "CA-2026-117",
    finding: "AF-2026-070",
    action: "Service and re-tag all extinguishers at Flow Station B.",
    owner: "Aisha Bello",
    target: "2026-08-09",
    status: "Not started",
    evidence: "—",
    notes: "Vendor quote requested through the HSE marketplace.",
  },
  {
    id: "CA-2026-112",
    finding: "AF-2026-064",
    action: "Install dedicated oily-waste bins and brief workshop crew on segregation.",
    owner: "Samuel Ade",
    target: "2026-08-06",
    status: "Completed",
    evidence: "waste-segregation-photos.zip",
    notes: "Verified closed by environmental lead.",
  },
];

export const AUDIT_COMPLIANCE_TREND = [
  { month: "Feb", score: 84 },
  { month: "Mar", score: 86 },
  { month: "Apr", score: 88 },
  { month: "May", score: 87 },
  { month: "Jun", score: 90 },
  { month: "Jul", score: 91 },
];

export const AUDIT_MONTHLY_ACTIVITY = [
  { month: "Feb", planned: 4, completed: 3 },
  { month: "Mar", planned: 5, completed: 5 },
  { month: "Apr", planned: 4, completed: 4 },
  { month: "May", planned: 6, completed: 5 },
  { month: "Jun", planned: 5, completed: 5 },
  { month: "Jul", planned: 6, completed: 4 },
];

export const AUDIT_FINDINGS_BY_SEVERITY = [
  { severity: "Critical", count: 2 },
  { severity: "High", count: 7 },
  { severity: "Medium", count: 9 },
  { severity: "Low", count: 5 },
];

export const AUDIT_DEPARTMENT_PERFORMANCE = [
  { department: "Operations", score: 93 },
  { department: "Maintenance", score: 87 },
  { department: "Drilling", score: 82 },
  { department: "Logistics", score: 90 },
  { department: "Contractors", score: 78 },
];

export const AUDIT_REPORT = {
  id: "AUD-2026-024",
  title: "Q3 Contractor Safety Audit — Flow Station B",
  type: "Contractor Audit",
  facility: "Flow Station B",
  department: "Maintenance",
  auditor: "Aisha Bello (Lead Auditor)",
  date: "2026-07-28",
  priority: "High",
  score: 88,
  findings: 5,
  closed: 2,
  recommendations: [
    "Reinstate supervisor verification of hot work permits before work commences.",
    "Complete extinguisher servicing programme across all Flow Station B units.",
    "Introduce weekly housekeeping walkdowns with the contractor site lead.",
    "Add waste segregation to the daily toolbox talk agenda for the workshop crew.",
  ],
};

/* ------------------------------ Procurement ------------------------------ */

export type ProcurementRequest = {
  id: string;
  product: string;
  quantity: number;
  location: string;
  requiredBy: string;
  status: "Pending" | "Approved" | "Ordered" | "Delivered";
  notes: string;
};

export const PROCUREMENT_REQUESTS: ProcurementRequest[] = [
  {
    id: "PR-2026-0412",
    product: "Cut-Resistant Impact Gloves",
    quantity: 500,
    location: "Flow Station B",
    requiredBy: "2026-08-14",
    status: "Pending",
    notes: "Raised from inspection INS-2026-0311 (PPE non-compliance).",
  },
  {
    id: "PR-2026-0409",
    product: "9kg DCP Fire Extinguisher",
    quantity: 24,
    location: "Flow Station B",
    requiredBy: "2026-08-09",
    status: "Approved",
    notes: "Replaces units past annual service date (finding AF-2026-070).",
  },
  {
    id: "PR-2026-0403",
    product: "Hydrocarbon Spill Response Kit (240L)",
    quantity: 6,
    location: "Tank Farm East",
    requiredBy: "2026-08-20",
    status: "Ordered",
    notes: "Raised from incident INC-2026-0418 diesel spill recommendation.",
  },
  {
    id: "PR-2026-0396",
    product: "Class 3 Reflective Jacket",
    quantity: 240,
    location: "Compressor Station B",
    requiredBy: "2026-07-25",
    status: "Delivered",
    notes: "Night shift visibility improvement programme.",
  },
];

export const PROCUREMENT_KPIS = [
  { label: "Open requests", value: "7" },
  { label: "Orders in progress", value: "4" },
  { label: "Approved suppliers", value: "8" },
  { label: "Recent purchases (30d)", value: "₦21.4m" },
  { label: "Avg approval time", value: "1.8 days" },
];

export const MOST_REQUESTED = [
  { item: "Impact gloves", requests: 34 },
  { item: "FR coveralls", requests: 28 },
  { item: "Safety boots", requests: 24 },
  { item: "Gas detectors", requests: 15 },
  { item: "Spill kits", requests: 11 },
];

export const DELIVERY_LOCATIONS = [
  "Flow Station A",
  "Flow Station B",
  "Compressor Station B",
  "Tank Farm East",
  "Warri Logistics Base",
  "Head Office, Lagos",
];

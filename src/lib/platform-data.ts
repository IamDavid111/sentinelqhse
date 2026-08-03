// ---------- Notification centre ----------

export type NotificationChannel = "inApp" | "email" | "sms" | "push";

export const NOTIFICATION_EVENTS: {
  event: string;
  description: string;
  defaults: Record<NotificationChannel, boolean>;
}[] = [
  { event: "Incident Assigned", description: "A user is assigned ownership of an incident record.", defaults: { inApp: true, email: true, sms: false, push: true } },
  { event: "Corrective Action Assigned", description: "A corrective action is allocated to an action owner.", defaults: { inApp: true, email: true, sms: false, push: true } },
  { event: "Audit Scheduled", description: "A new audit is added to the audit programme.", defaults: { inApp: true, email: true, sms: false, push: false } },
  { event: "Audit Overdue", description: "Audit fieldwork or closure passes its due date.", defaults: { inApp: true, email: true, sms: true, push: true } },
  { event: "Inspection Due", description: "A scheduled inspection falls due within 48 hours.", defaults: { inApp: true, email: true, sms: false, push: true } },
  { event: "High-Risk Incident Created", description: "An incident is logged with High or Critical severity.", defaults: { inApp: true, email: true, sms: true, push: true } },
  { event: "Incident Closed", description: "An incident is verified and formally closed out.", defaults: { inApp: true, email: false, sms: false, push: false } },
  { event: "AI Risk Alert Generated", description: "Predictive engine raises a facility risk alert.", defaults: { inApp: true, email: true, sms: false, push: true } },
];

export type FeedItem = {
  id: string;
  event: string;
  title: string;
  body: string;
  meta: string;
  tone: "danger" | "warning" | "info" | "primary";
  unread: boolean;
  channels: NotificationChannel[];
};

export const NOTIFICATION_FEED: FeedItem[] = [
  { id: "N-4412", event: "High-Risk Incident Created", title: "Critical gas leak reported at Flow Station A", body: "INC-2026-0418 logged as Critical by Musa Bello. Emergency response team dispatched.", meta: "8 minutes ago · Flow Station A", tone: "danger", unread: true, channels: ["inApp", "email", "sms", "push"] },
  { id: "N-4411", event: "AI Risk Alert Generated", title: "Heat stress risk index reached 82% at Flow Station A", body: "Ambient 38°C combined with 12-hour shifts and three prior heat events this quarter.", meta: "45 minutes ago · Predictive engine", tone: "warning", unread: true, channels: ["inApp", "email", "push"] },
  { id: "N-4410", event: "Corrective Action Assigned", title: "CA-2026-0209 is overdue by 2 days", body: "Bund wall repair at Tank Farm Delta assigned to Peter Nwosu.", meta: "2 hours ago · Tank Farm Delta", tone: "warning", unread: true, channels: ["inApp", "email"] },
  { id: "N-4409", event: "Audit Scheduled", title: "Contractor audit AUD-2026-019 fieldwork today", body: "Lead auditor Ruth Adeyemi. Opening meeting at 09:00 in the terminal briefing room.", meta: "5 hours ago · Tank Farm Delta", tone: "info", unread: false, channels: ["inApp", "email"] },
  { id: "N-4408", event: "Inspection Due", title: "Emergency preparedness inspection due Aug 6", body: "Bonga Offshore Terminal quarterly emergency equipment inspection.", meta: "Yesterday · Bonga Offshore Terminal", tone: "info", unread: false, channels: ["inApp", "push"] },
  { id: "N-4407", event: "Incident Assigned", title: "INC-2026-0414 assigned to you for investigation", body: "Dropped object near miss during lifting operations. RCA due within 5 working days.", meta: "Yesterday · Tank Farm Delta", tone: "info", unread: false, channels: ["inApp", "email", "push"] },
  { id: "N-4406", event: "Incident Closed", title: "INC-2026-0402 closed and verified", body: "Vehicle reversing incident closed after verification of driver re-training.", meta: "2 days ago · Warri Refinery Yard", tone: "primary", unread: false, channels: ["inApp"] },
  { id: "N-4405", event: "Audit Overdue", title: "AUD-2026-014 closure report is overdue", body: "Environmental audit closure report outstanding for 6 days.", meta: "3 days ago · Escravos Gas Plant", tone: "danger", unread: false, channels: ["inApp", "email", "sms"] },
];

// ---------- Reports centre ----------

export const REPORT_CATALOGUE = [
  { name: "Incident Report", description: "Full incident register with severity, status, owner and closure evidence.", group: "Operational" },
  { name: "Audit Report", description: "Audit programme status, non-conformities and compliance scoring.", group: "Assurance" },
  { name: "Inspection Report", description: "Completed inspections by type, site and pass rate with open findings.", group: "Operational" },
  { name: "Corrective Action Report", description: "Open, overdue, completed and verified actions by owner and due date.", group: "Operational" },
  { name: "Near Miss Report", description: "Near-miss reporting volume, quality and hazard classification trends.", group: "Leading indicators" },
  { name: "Safety KPI Report", description: "LTIFR, TRIR, severity rate and leading indicator pack for the period.", group: "Performance" },
  { name: "Executive Dashboard Report", description: "Board-ready summary of safety score, risk posture and improvement plan.", group: "Executive" },
];

export const RECENT_EXPORTS = [
  { name: "Monthly HSE Performance — July 2026", format: "PDF", by: "Ruth Adeyemi", at: "2026-08-01 18:22", size: "2.4 MB" },
  { name: "Incident Register — Q2 2026", format: "Excel", by: "Adaeze Okonkwo", at: "2026-07-30 11:05", size: "884 KB" },
  { name: "Corrective Action Status — All sites", format: "CSV", by: "Emeka Duru", at: "2026-07-28 09:47", size: "142 KB" },
  { name: "Contractor HSE Scorecard — H1 2026", format: "PDF", by: "Adaeze Okonkwo", at: "2026-07-21 16:33", size: "1.8 MB" },
];

// ---------- Audit trail ----------

export const AUDIT_TRAIL = [
  { time: "2026-08-02 09:41:12", user: "Adaeze Okonkwo", action: "Record update", detail: "Assigned investigation for INC-2026-0418", device: "Chrome 128 · Windows 11", ip: "102.89.34.12" },
  { time: "2026-08-02 09:12:04", user: "Grace Ijeoma", action: "Record creation", detail: "Submitted inspection INSP-0348", device: "SentinelQHSE Mobile · Android 15", ip: "102.89.77.9" },
  { time: "2026-08-02 08:55:41", user: "Emeka Duru", action: "User login", detail: "Successful sign-in with MFA (TOTP)", device: "Safari 18 · macOS 15", ip: "41.203.11.88" },
  { time: "2026-08-01 18:22:58", user: "Ruth Adeyemi", action: "Report download", detail: "Monthly HSE Performance Report (PDF)", device: "Edge 128 · Windows 11", ip: "102.89.34.51" },
  { time: "2026-08-01 17:10:33", user: "Emeka Duru", action: "Role change", detail: "Tunde Alabi: Site Supervisor → HSE Officer", device: "Safari 18 · macOS 15", ip: "41.203.11.88" },
  { time: "2026-08-01 16:04:19", user: "Tunde Alabi", action: "Settings change", detail: "Password changed after policy rotation prompt", device: "Chrome 128 · Windows 11", ip: "197.210.5.31" },
  { time: "2026-08-01 14:37:02", user: "Musa Bello", action: "Record creation", detail: "Created incident INC-2026-0418", device: "SentinelQHSE Mobile · iOS 19", ip: "197.210.5.114" },
  { time: "2026-08-01 12:18:47", user: "Adaeze Okonkwo", action: "Record deletion", detail: "Soft-deleted duplicate inspection INSP-0341 (recoverable 30 days)", device: "Chrome 128 · Windows 11", ip: "102.89.34.12" },
  { time: "2026-08-01 11:20:09", user: "Emeka Duru", action: "Settings change", detail: "Enabled SMS channel for High-Risk Incident Created", device: "Safari 18 · macOS 15", ip: "41.203.11.88" },
  { time: "2026-07-31 22:41:55", user: "System", action: "User login", detail: "Failed sign-in attempt blocked (unrecognised country: DE)", device: "Unknown", ip: "45.118.132.7" },
];

export const AUDIT_ACTIONS = [
  "User login",
  "Record creation",
  "Record update",
  "Record deletion",
  "Report download",
  "Role change",
  "Settings change",
] as const;

// ---------- Help centre ----------

export const HELP_GUIDES = [
  { title: "Getting started with SentinelQHSE", body: "Set up your organization, invite users, assign roles and configure your first site in under 30 minutes.", minutes: 6 },
  { title: "Reporting an incident from the field", body: "Use the mobile-first, glove-friendly reporting flow — including offline capture and photo evidence.", minutes: 4 },
  { title: "Running an investigation and RCA", body: "Assign investigators, apply 5-Why or Fishbone analysis and convert findings into corrective actions.", minutes: 9 },
  { title: "Managing the audit programme", body: "Schedule audits, record non-conformities, track closure and generate the regulatory submission pack.", minutes: 7 },
  { title: "Understanding safety KPIs", body: "How LTIFR, TRIR, severity rate and leading indicators are calculated inside the platform.", minutes: 5 },
  { title: "Roles and permissions reference", body: "Complete matrix of the ten enterprise roles from Super Admin through to Contractor.", minutes: 8 },
];

export const FAQS = [
  { q: "How is our organization's data isolated from other tenants?", a: "Every record is scoped to your organization code. Users can only ever query data belonging to the tenant they were invited into, and role permissions apply on top of that boundary." },
  { q: "Can field users report incidents without network coverage?", a: "Yes. The reporting flow captures offline and queues submissions locally, syncing automatically once connectivity returns. Queued items are visible in the reporting screen." },
  { q: "What happens when a record is deleted?", a: "Nothing is hard-deleted. Records are soft-deleted, remain recoverable for 30 days by an administrator, and every deletion is written to the audit trail." },
  { q: "How do we add a new site or department?", a: "Administrators manage sites, departments, incident categories and templates from Platform Settings. Changes apply immediately across reporting and analytics." },
  { q: "Which report formats are supported?", a: "Every report in the Reports Centre exports to PDF, Excel and CSV. Executive reports additionally export in a presentation-ready layout." },
  { q: "Is multi-factor authentication mandatory?", a: "MFA is enforced by organization policy. Administrators can require it for all users or for privileged roles only under Settings → Security." },
];

export const PRODUCT_UPDATES = [
  { version: "v2.4", date: "August 2026", items: ["Executive Intelligence Centre with AI narrative insights", "Marketplace supplier portal and quote workflow", "Audit trail device and IP capture"] },
  { version: "v2.3", date: "July 2026", items: ["Predictive risk outlook by facility", "Offline field incident capture", "Corrective action escalation rules"] },
  { version: "v2.2", date: "June 2026", items: ["Audit programme calendar", "Inspection template builder", "Contractor safety scorecards"] },
];

// ---------- Integrations (coming soon) ----------

export const INTEGRATIONS = [
  { name: "SAP", category: "ERP", description: "Sync assets, work orders and cost centres with your ERP." },
  { name: "Oracle Fusion", category: "ERP", description: "Bi-directional master data and procurement alignment." },
  { name: "Microsoft Power BI", category: "Analytics", description: "Stream QHSE datasets into enterprise BI models." },
  { name: "SCADA Systems", category: "Operations", description: "Pull process alarms and trips into incident context." },
  { name: "IoT Sensors", category: "Operations", description: "Gas, temperature and vibration telemetry for predictive risk." },
  { name: "Wearable Safety Devices", category: "Workforce", description: "Man-down, gas exposure and fatigue signals per worker." },
  { name: "Fleet Management", category: "Logistics", description: "Journey management, driver behaviour and vehicle incidents." },
  { name: "Document Management", category: "Documents", description: "Link procedures and permits from SharePoint or OpenText." },
  { name: "Microsoft Teams", category: "Collaboration", description: "Route alerts and approvals into safety channels." },
  { name: "Email Platforms", category: "Collaboration", description: "Enterprise SMTP and Microsoft 365 mail routing." },
  { name: "Regulatory Portals", category: "Compliance", description: "Direct submission to NUPRC and state regulator portals." },
];

export const ROADMAP = [
  { phase: "Near term", items: ["Digital Permit-to-Work", "Multi-language support (FR, PT, AR)", "Regulatory reporting integration"] },
  { phase: "Mid term", items: ["IoT sensor integration", "Wearable safety devices", "Mobile native applications (iOS & Android)"] },
  { phase: "Long term", items: ["Drone-assisted inspections", "Computer vision for PPE compliance", "AI predictive maintenance", "ESG reporting"] },
];

// ---------- Executive intelligence ----------

export const EXEC_KPIS = [
  { label: "LTIFR", value: "0.41", target: "< 0.50", delta: -18, good: true, note: "per million hours worked" },
  { label: "TRIR", value: "1.12", target: "< 1.30", delta: -9, good: true, note: "per 200,000 hours" },
  { label: "Near Miss Frequency", value: "68", target: "> 50 / month", delta: 41, good: true, note: "reports this month" },
  { label: "Avg. Resolution Time", value: "6.4 d", target: "< 7 days", delta: -12, good: true, note: "incident open to closed" },
  { label: "Corrective Action Completion", value: "88%", target: "> 90%", delta: 5, good: false, note: "closed within due date" },
  { label: "Audit Completion Rate", value: "94%", target: "> 95%", delta: 2, good: false, note: "against annual plan" },
  { label: "Inspection Compliance", value: "91%", target: "> 90%", delta: 6, good: true, note: "scheduled vs completed" },
  { label: "Training Completion", value: "—", target: "Coming soon", delta: 0, good: true, note: "competency module in roadmap" },
  { label: "Contractor Safety Score", value: "79", target: "> 85", delta: -4, good: false, note: "weighted across 12 contractors" },
];

export const EXEC_NARRATIVES = [
  { tone: "positive", text: "Safety performance improved by 11% this month, driven primarily by a 34% reduction in equipment-related incidents following the compressor overhaul at Escravos." },
  { tone: "negative", text: "Contractor incidents increased by 14% at the Eastern Production Facility. Three of the five events involve crews mobilised in the last 60 days — induction quality is the likely driver." },
  { tone: "neutral", text: "Most overdue corrective actions relate to housekeeping deficiencies. Nine of twenty-three open actions sit with facilities teams at Tank Farm Delta." },
  { tone: "negative", text: "Night shift remains disproportionately risky: 41% of reports arise from 17% of exposure hours. Additional supervisory coverage after 22:00 is the single highest-yield intervention." },
];

export type HeatSite = {
  site: string;
  level: "Low" | "Moderate" | "High" | "Critical";
  riskScore: number;
  openIncidents: number;
  openActions: number;
  lastAudit: string;
  auditScore: number;
  recommendation: string;
};

export const HEAT_MAP: HeatSite[] = [
  { site: "Flow Station A", level: "Critical", riskScore: 82, openIncidents: 7, openActions: 9, lastAudit: "2026-06-18", auditScore: 68, recommendation: "Stand down non-critical hot work during peak ambient hours and re-verify permit closure discipline." },
  { site: "Tank Farm Delta", level: "High", riskScore: 71, openIncidents: 3, openActions: 6, lastAudit: "2026-07-04", auditScore: 78, recommendation: "Re-baseline contractor lifting competency before the August campaign and repair bund wall deficiencies." },
  { site: "Pump Station B", level: "Moderate", riskScore: 54, openIncidents: 4, openActions: 4, lastAudit: "2026-05-29", auditScore: 82, recommendation: "Increase housekeeping inspection frequency to weekly and improve lighting near the transfer skid." },
  { site: "Warri Refinery Yard", level: "Moderate", riskScore: 48, openIncidents: 2, openActions: 3, lastAudit: "2026-06-11", auditScore: 85, recommendation: "Reinforce reversing controls and banksman coverage in the loading bay." },
  { site: "Escravos Gas Plant", level: "Low", riskScore: 27, openIncidents: 1, openActions: 1, lastAudit: "2026-07-16", auditScore: 91, recommendation: "Maintain current programme; use as benchmark site for permit-to-work practice." },
  { site: "Bonga Offshore Terminal", level: "Low", riskScore: 22, openIncidents: 2, openActions: 2, lastAudit: "2026-07-21", auditScore: 94, recommendation: "Sustain emergency preparedness drill cadence; complete the due equipment inspection by Aug 6." },
];

export const RECURRING_HAZARDS = [
  { hazard: "Slips, trips and housekeeping", count: 34, trend: 8 },
  { hazard: "Dropped objects during lifting", count: 21, trend: 14 },
  { hazard: "Hydrocarbon leaks from flanges", count: 17, trend: -6 },
  { hazard: "Heat stress and dehydration", count: 15, trend: 22 },
  { hazard: "Vehicle reversing incidents", count: 12, trend: -11 },
  { hazard: "Inadequate isolation / LOTO", count: 9, trend: 3 },
];

export const ROOT_CAUSES = [
  { cause: "Inadequate supervision", value: 24 },
  { cause: "Procedure not followed", value: 21 },
  { cause: "Deficient maintenance", value: 18 },
  { cause: "Insufficient training", value: 15 },
  { cause: "Poor housekeeping", value: 13 },
  { cause: "Design / ergonomics", value: 9 },
];

export const CONTRACTOR_PERFORMANCE = [
  { contractor: "Meridian EPC Services", score: 88, incidents: 4, manHours: "182k", trend: 3 },
  { contractor: "Coastal Drilling Ltd", score: 74, incidents: 9, manHours: "241k", trend: -8 },
  { contractor: "Riverline Logistics", score: 81, incidents: 5, manHours: "96k", trend: 2 },
  { contractor: "Apex Mechanical", score: 69, incidents: 11, manHours: "154k", trend: -14 },
  { contractor: "Delta Scaffold Co.", score: 92, incidents: 1, manHours: "63k", trend: 6 },
];

export const PREDICTIVE_OUTLOOK = [
  { month: "Aug", forecast: 12, upper: 17, lower: 8 },
  { month: "Sep", forecast: 11, upper: 16, lower: 7 },
  { month: "Oct", forecast: 13, upper: 19, lower: 8 },
  { month: "Nov", forecast: 10, upper: 15, lower: 6 },
];

export const EXEC_REPORTS = [
  { name: "CEO Safety Report", description: "One-page strategic briefing with safety score, top risks and required decisions." },
  { name: "Monthly Executive Summary", description: "Performance against KPI targets with narrative commentary and exceptions." },
  { name: "Board Safety Report", description: "Governance pack covering assurance, compliance posture and material risk." },
  { name: "Annual Safety Performance Review", description: "Twelve-month trend analysis, benchmarking and next-year improvement plan." },
];

// ---------- Emergency response ----------

export const ACTIVE_EMERGENCIES = [
  { id: "EMG-2026-004", type: "Gas Release", site: "Flow Station A", level: "Tier 2", status: "Response in progress", started: "08:42", commander: "Emeka Duru", personnel: 18 },
  { id: "EMG-2026-003", type: "Severe Weather Watch", site: "Bonga Offshore Terminal", level: "Tier 1", status: "Monitoring", started: "06:15", commander: "Adaeze Okonkwo", personnel: 6 },
];

export const EMERGENCY_TIMELINE = [
  { time: "08:42", entry: "Gas detection alarm triggered at compressor train 2 (LEL 22%)." },
  { time: "08:44", entry: "Area evacuated to Muster Point 3; headcount initiated." },
  { time: "08:51", entry: "Emergency shutdown ESD-2 executed; isolation confirmed." },
  { time: "08:58", entry: "Fire team deployed with gas monitors; perimeter established at 50m." },
  { time: "09:06", entry: "Headcount complete — 118 of 118 personnel accounted for." },
  { time: "09:20", entry: "LEL falling to 4%; leak source narrowed to flange joint FJ-214." },
];

export const EMERGENCY_TEAMS = [
  { team: "Fire Team Alpha", lead: "Ibrahim Sule", members: 8, status: "Deployed", location: "Compressor area" },
  { team: "Medical Response", lead: "Dr. Ngozi Eze", members: 4, status: "Standby", location: "Site clinic" },
  { team: "Security", lead: "Kunle Ajayi", members: 6, status: "Deployed", location: "Perimeter gates" },
  { team: "HSE Command", lead: "Emeka Duru", members: 3, status: "Active", location: "Incident command post" },
];

export const EMERGENCY_CONTACTS = [
  { role: "Fire Team Leader", name: "Ibrahim Sule", phone: "+234 803 000 1145", group: "Internal" },
  { role: "Medical Officer", name: "Dr. Ngozi Eze", phone: "+234 806 411 2280", group: "Internal" },
  { role: "Security Lead", name: "Kunle Ajayi", phone: "+234 705 993 0021", group: "Internal" },
  { role: "HSE Department", name: "Adaeze Okonkwo", phone: "+234 802 774 5510", group: "Internal" },
  { role: "Operations Manager", name: "Emeka Duru", phone: "+234 809 220 6631", group: "Internal" },
  { role: "National Emergency", name: "NEMA Control Room", phone: "112", group: "External" },
  { role: "State Fire Service", name: "Rivers State Fire Service", phone: "+234 84 230 118", group: "External" },
  { role: "Medical Evacuation", name: "Bristow MedEvac", phone: "+234 1 279 4000", group: "External" },
];

export const EMERGENCY_ASSETS = [
  { label: "Muster Point 1", type: "Muster point", zone: "Admin block", emoji: "🟢" },
  { label: "Muster Point 3", type: "Muster point", zone: "North gate", emoji: "🟢" },
  { label: "Emergency Exit E2", type: "Emergency exit", zone: "Process area", emoji: "🚪" },
  { label: "Fire Extinguisher Bank A", type: "Fire equipment", zone: "Compressor house", emoji: "🧯" },
  { label: "Spill Kit S4", type: "Spill response", zone: "Loading bay", emoji: "🛢️" },
  { label: "Medical Station", type: "Medical", zone: "Site clinic", emoji: "🏥" },
  { label: "Assembly Point B", type: "Assembly point", zone: "West car park", emoji: "🅿️" },
  { label: "Eye Wash Station EW-2", type: "Medical", zone: "Chemical store", emoji: "👁️" },
];

export const BROADCAST_TYPES = ["Safety alert", "Severe weather warning", "Gas leak notification", "Fire alert", "Operational shutdown notice"];

export const PUBLIC_NOTICES = [
  { ref: "PSN-2026-011", title: "Planned flaring at Escravos Gas Plant", date: "2026-08-01", body: "Controlled flaring will occur between 22:00 and 04:00 on 4 August as part of scheduled turnaround activity. No action is required by surrounding communities." },
  { ref: "PSN-2026-010", title: "Road closure — Tank Farm Delta access road", date: "2026-07-28", body: "The southern access road will be closed for pipeline crossing works until 10 August. Diversion signage is in place." },
  { ref: "PSN-2026-009", title: "Community advisory: shoreline inspection activity", date: "2026-07-19", body: "Routine shoreline integrity inspections are underway. Fishing operations are unaffected outside marked exclusion buoys." },
];

export const PUBLIC_VERIFIABLE = ["INC-2026-0418", "INC-2026-0402", "AUD-2026-019"];

// ---------- AI copilot ----------

export const COPILOT_SUGGESTIONS = [
  "Show unresolved high-risk incidents",
  "Which facility has the worst safety performance?",
  "Why did incidents increase this month?",
  "Show all overdue corrective actions",
  "Which contractor has the highest incident rate?",
  "Summarise yesterday's incidents",
  "Which departments require audits?",
  "Find all gas leak incidents from May",
];

export const COPILOT_ANSWERS: { match: string[]; answer: string }[] = [
  { match: ["high-risk", "high risk", "unresolved", "critical"], answer: "There are 6 unresolved high-risk incidents. Four sit at Flow Station A (gas release, heat stress, two permit violations), one at Tank Farm Delta (dropped object during lifting) and one at Pump Station B (electrical isolation failure). The oldest, INC-2026-0391, has been open 19 days and is past its 14-day investigation target — I'd escalate that one first." },
  { match: ["worst", "facility", "performance"], answer: "Flow Station A has the weakest performance: safety score 68/100, 7 open incidents, 9 open corrective actions and a June audit score of 68%. Its risk index of 82 is driven by heat stress, slip hazards and late permit closures. Escravos Gas Plant is the strongest at 91/100 and is a good benchmark for permit discipline." },
  { match: ["increase", "why", "trend", "this month"], answer: "Reported events rose because near-miss reporting increased 41% — a positive leading-indicator shift, not a deterioration. Recordable incidents actually fell 48% over six months. The genuine concern is contractor events at the Eastern Production Facility, up 14%, concentrated in crews mobilised within the last 60 days." },
  { match: ["overdue", "corrective"], answer: "There are 4 overdue corrective actions out of 23 open. CA-2026-0209 (bund wall repair, Tank Farm Delta, Peter Nwosu) is 2 days late; CA-2026-0198 (walkway replacement) is 5 days late; two housekeeping actions at Pump Station B are 1 day late. Nine of the open actions relate to housekeeping." },
  { match: ["contractor"], answer: "Apex Mechanical has the highest incident rate: 11 incidents across 154k man-hours, a safety score of 69 and a 14-point decline this quarter. Coastal Drilling Ltd is second at 9 incidents. Delta Scaffold Co. performs best with 1 incident across 63k hours." },
  { match: ["yesterday", "summarise", "summary"], answer: "Yesterday produced 3 reports: a Critical gas release at Flow Station A (INC-2026-0418, ESD executed, all 118 personnel accounted for), a near miss involving a dropped hand tool at Tank Farm Delta, and an unsafe-condition report for damaged walkway grating at Pump Station B. No injuries and no lost time." },
  { match: ["department", "audit"], answer: "Three departments are due audit within 30 days: Drilling Operations (last audited February, 6 months elapsed), Logistics & Transport (contractor audit follow-up outstanding) and Maintenance & Integrity (two non-conformities from the June audit still open). I can draft the audit schedule if you'd like." },
  { match: ["gas leak", "may", "find", "search"], answer: "I found 4 gas leak incidents in May 2026: INC-2026-0288 (Flow Station A, Medium, closed), INC-2026-0296 (Escravos, Low, closed), INC-2026-0301 (Flow Station A, High, closed with flange programme action) and INC-2026-0309 (Pump Station B, Low, closed). Three of four involved flange joints — worth a targeted integrity campaign." },
];

export const COPILOT_FALLBACK =
  "Based on the last 90 days of operational data, Flow Station A carries the highest residual risk: 7 open incidents, a safety score of 68 and a heat-stress index of 82%. Recommended actions: reschedule non-critical hot work outside 12:00–16:00, add a hydration checkpoint to shift handover, and re-verify permit closure discipline this week.";

export const AI_RECOMMENDATIONS = [
  { text: "Increase inspection frequency at Pump Station B to weekly", impact: "High", basis: "4 open incidents, housekeeping repeat findings" },
  { text: "Schedule refresher training for contractor lifting crews", impact: "High", basis: "3 of last 8 events involve lifting operations" },
  { text: "Improve lighting around the Tank Farm Delta storage tanks", impact: "Medium", basis: "Night shift incident rate 2.4× day shift" },
  { text: "Replace damaged walkway grating at Pump Station B", impact: "Medium", basis: "2 slip near misses and an open inspection finding" },
  { text: "Increase supervision during the August shutdown campaign", impact: "High", basis: "Historic shutdown periods carry 1.8× incident density" },
];

export const AI_REPORT_TEMPLATES = [
  "Weekly HSE Report",
  "Incident Investigation Report",
  "Monthly Safety Bulletin",
  "Executive Safety Review",
  "Management Presentation",
];

export const KNOWLEDGE_BASE = [
  { title: "Hot Work Permit Procedure", category: "Permit-to-work guidance", summary: "Authorisation, gas testing intervals, fire watch duties and permit closure requirements." },
  { title: "Confined Space Entry Procedure", category: "Safety procedures", summary: "Atmospheric testing, entry attendant duties, rescue plan and communications protocol." },
  { title: "Emergency Response Plan — Gas Release", category: "Emergency response guides", summary: "Tiered response, ESD criteria, muster and headcount, external notification thresholds." },
  { title: "Oil Spill Response Plan", category: "Emergency response guides", summary: "Containment, recovery, shoreline protection and regulatory notification timelines." },
  { title: "PPE Matrix by Work Area", category: "PPE requirements", summary: "Minimum PPE by zone including FR clothing, gas monitors and fall protection triggers." },
  { title: "Lifting Operations Standard", category: "Safety procedures", summary: "Lift categorisation, lift plans, competency requirements and exclusion zones." },
  { title: "Toolbox Talk — Dropped Objects", category: "Toolbox talk templates", summary: "Ten-minute talk covering securing tools at height, exclusion zones and reporting." },
  { title: "Toolbox Talk — Heat Stress", category: "Toolbox talk templates", summary: "Hydration, work-rest cycles, symptom recognition and buddy checks." },
  { title: "QHSE Policy Statement", category: "Safety policies", summary: "Executive commitment, responsibilities and continual improvement objectives." },
  { title: "Journey Management Policy", category: "Safety policies", summary: "Trip authorisation, driver competency, curfews and in-vehicle monitoring." },
];

// ---------- Demo mode ----------

export const DEMO_SCENARIOS = [
  { name: "Gas Leak Investigation", description: "Walk a Critical gas release from field report through RCA to verified closure.", route: "/app/incidents", emoji: "💨" },
  { name: "Oil Spill Response", description: "Emergency command view with containment timeline and resource deployment.", route: "/app/emergency", emoji: "🛢️" },
  { name: "Near Miss Analysis", description: "Explore leading-indicator reporting quality and hazard clustering.", route: "/app/ai-intelligence", emoji: "⚠️" },
  { name: "Fire Incident", description: "Tiered emergency broadcast, muster and incident command board.", route: "/app/emergency", emoji: "🔥" },
  { name: "Safety Inspection", description: "Complete a templated inspection and raise findings as corrective actions.", route: "/app/inspections", emoji: "📋" },
  { name: "Executive Dashboard Review", description: "Board-level safety score, KPI pack and AI narrative insights.", route: "/app/executive", emoji: "📊" },
];

export type AdminRole = {
  id: string;
  name: string;
  users: number;
  summary: string;
  permissions: string[];
};

export const ADMIN_ROLES: AdminRole[] = [
  {
    id: "super_admin",
    name: "Super Administrator",
    users: 2,
    summary: "Unrestricted access to every module, tenant and setting.",
    permissions: ["Manage users", "Manage settings", "Manage facilities", "All modules", "View audit trail"],
  },
  {
    id: "qhse_manager",
    name: "QHSE Manager",
    users: 6,
    summary: "Owns the incident, inspection and CAPA lifecycle.",
    permissions: ["Manage incidents", "Manage inspections", "Approve corrective actions", "View dashboards", "Generate reports"],
  },
  {
    id: "site_supervisor",
    name: "Site Supervisor",
    users: 14,
    summary: "Field leadership for an assigned facility.",
    permissions: ["Report incidents", "Manage inspections", "Assign corrective actions", "View dashboards"],
  },
  {
    id: "hse_officer",
    name: "HSE Officer",
    users: 21,
    summary: "Day-to-day safety execution and investigations.",
    permissions: ["Report incidents", "Manage inspections", "View dashboards", "Upload findings"],
  },
  {
    id: "auditor",
    name: "Auditor",
    users: 8,
    summary: "Independent assurance across the management system.",
    permissions: ["Manage audits", "Create findings", "Assign corrective actions", "View reports"],
  },
  {
    id: "operations_manager",
    name: "Operations Manager",
    users: 9,
    summary: "Operational oversight of facilities and departments.",
    permissions: ["View dashboards", "View reports", "Approve corrective actions", "Manage facilities"],
  },
  {
    id: "contractor",
    name: "Contractor",
    users: 34,
    summary: "Third-party access scoped to assigned work.",
    permissions: ["Report incidents", "Submit observations", "View assigned actions"],
  },
  {
    id: "procurement_officer",
    name: "Procurement Officer",
    users: 5,
    summary: "Runs the HSE marketplace and supplier onboarding.",
    permissions: ["Manage marketplace", "View procurement requests", "Approve supplier listings", "View reports"],
  },
  {
    id: "executive",
    name: "Executive",
    users: 7,
    summary: "Strategic, read-only oversight of safety performance.",
    permissions: ["View analytics", "View reports", "View dashboards"],
  },
  {
    id: "read_only",
    name: "Read-Only User",
    users: 12,
    summary: "Observer access for regulators and interns.",
    permissions: ["View dashboards", "View reports"],
  },
];

export const PERMISSION_MODULES = [
  "Incidents",
  "Investigations",
  "Corrective actions",
  "Inspections",
  "Audits",
  "Analytics",
  "Marketplace",
  "Administration",
];

export type PermissionLevel = "full" | "edit" | "view" | "none";

export const PERMISSION_MATRIX: Record<string, Record<string, PermissionLevel>> = {
  super_admin: {
    Incidents: "full", Investigations: "full", "Corrective actions": "full", Inspections: "full",
    Audits: "full", Analytics: "full", Marketplace: "full", Administration: "full",
  },
  qhse_manager: {
    Incidents: "full", Investigations: "full", "Corrective actions": "full", Inspections: "full",
    Audits: "edit", Analytics: "view", Marketplace: "view", Administration: "none",
  },
  site_supervisor: {
    Incidents: "edit", Investigations: "view", "Corrective actions": "edit", Inspections: "edit",
    Audits: "view", Analytics: "view", Marketplace: "view", Administration: "none",
  },
  hse_officer: {
    Incidents: "edit", Investigations: "edit", "Corrective actions": "edit", Inspections: "edit",
    Audits: "view", Analytics: "view", Marketplace: "none", Administration: "none",
  },
  auditor: {
    Incidents: "view", Investigations: "view", "Corrective actions": "edit", Inspections: "view",
    Audits: "full", Analytics: "view", Marketplace: "none", Administration: "none",
  },
  operations_manager: {
    Incidents: "view", Investigations: "view", "Corrective actions": "edit", Inspections: "view",
    Audits: "view", Analytics: "view", Marketplace: "view", Administration: "none",
  },
  contractor: {
    Incidents: "edit", Investigations: "none", "Corrective actions": "view", Inspections: "view",
    Audits: "none", Analytics: "none", Marketplace: "none", Administration: "none",
  },
  procurement_officer: {
    Incidents: "view", Investigations: "none", "Corrective actions": "view", Inspections: "none",
    Audits: "none", Analytics: "view", Marketplace: "full", Administration: "none",
  },
  executive: {
    Incidents: "view", Investigations: "view", "Corrective actions": "view", Inspections: "view",
    Audits: "view", Analytics: "view", Marketplace: "view", Administration: "none",
  },
  read_only: {
    Incidents: "view", Investigations: "none", "Corrective actions": "view", Inspections: "view",
    Audits: "view", Analytics: "view", Marketplace: "none", Administration: "none",
  },
};

export const FACILITY_TYPES = ["Offshore Platform", "Flow Station", "Tank Farm", "Pipeline", "Gas Plant", "Terminal"];

export type Facility = {
  id: string;
  name: string;
  location: string;
  gps: string;
  type: string;
  manager: string;
  status: "Active" | "Maintenance" | "Suspended";
  headcount: number;
};

export const FACILITIES: Facility[] = [
  { id: "FAC-001", name: "Flow Station A", location: "Bayelsa, Nigeria", gps: "4.9247° N, 6.2642° E", type: "Flow Station", manager: "Emeka Nwosu", status: "Active", headcount: 214 },
  { id: "FAC-002", name: "Flow Station C", location: "Rivers, Nigeria", gps: "4.8156° N, 7.0498° E", type: "Flow Station", manager: "Tolu Adebayo", status: "Active", headcount: 186 },
  { id: "FAC-003", name: "Bonga Offshore Platform", location: "Offshore Delta, 120km SW", gps: "4.1200° N, 4.9800° E", type: "Offshore Platform", manager: "Grace Ekong", status: "Active", headcount: 302 },
  { id: "FAC-004", name: "Tank Farm 2", location: "Port Harcourt, Nigeria", gps: "4.7774° N, 7.0134° E", type: "Tank Farm", manager: "Ibrahim Sani", status: "Maintenance", headcount: 98 },
  { id: "FAC-005", name: "Gas Plant East", location: "Akwa Ibom, Nigeria", gps: "4.9057° N, 7.8537° E", type: "Gas Plant", manager: "Ngozi Uche", status: "Active", headcount: 141 },
  { id: "FAC-006", name: "Trunkline Corridor 7", location: "Delta State, Nigeria", gps: "5.5320° N, 5.8980° E", type: "Pipeline", manager: "Segun Balogun", status: "Suspended", headcount: 64 },
];

export type AdminDepartment = { name: string; head: string; users: number; facilities: number };

export const ADMIN_DEPARTMENTS: AdminDepartment[] = [
  { name: "Operations", head: "Emeka Nwosu", users: 84, facilities: 6 },
  { name: "Production", head: "Tolu Adebayo", users: 62, facilities: 4 },
  { name: "Maintenance", head: "Ibrahim Sani", users: 71, facilities: 6 },
  { name: "HSE", head: "Adaeze Okonkwo", users: 38, facilities: 6 },
  { name: "Security", head: "Musa Danjuma", users: 44, facilities: 6 },
  { name: "Logistics", head: "Chika Obi", users: 29, facilities: 5 },
  { name: "Procurement", head: "Yemi Ajayi", users: 12, facilities: 6 },
  { name: "Administration", head: "Bimpe Lawal", users: 18, facilities: 6 },
];

export const ESCALATION_RULES = [
  { trigger: "Critical incident reported", within: "Immediately", notify: "QHSE Manager, Facility Manager, Executive" },
  { trigger: "High-risk incident unacknowledged", within: "30 minutes", notify: "QHSE Manager, Site Supervisor" },
  { trigger: "Corrective action overdue", within: "24 hours", notify: "Action owner, Department head" },
  { trigger: "Audit non-conformity unresolved", within: "7 days", notify: "Auditor, QHSE Manager" },
  { trigger: "Permit breach detected", within: "1 hour", notify: "Site Supervisor, HSE Officer" },
];

export const ADMIN_AUDIT_LOG = [
  { user: "Adaeze Okonkwo", date: "2026-08-07", time: "21:14", activity: "User created — chinedu.eze@northgateenergy.com (HSE Officer)", ip: "102.89.34.17" },
  { user: "Bimpe Lawal", date: "2026-08-07", time: "18:42", activity: "Settings changed — Notification escalation window 45m → 30m", ip: "102.89.34.62" },
  { user: "Ibrahim Sani", date: "2026-08-07", time: "16:05", activity: "Facility updated — Tank Farm 2 status set to Maintenance", ip: "197.210.7.221" },
  { user: "Grace Ekong", date: "2026-08-07", time: "12:33", activity: "Audit completed — AUD-2026-019 Bonga Offshore Platform", ip: "41.184.120.9" },
  { user: "Adaeze Okonkwo", date: "2026-08-06", time: "09:58", activity: "User updated — Tolu Adebayo role changed to Site Supervisor", ip: "102.89.34.17" },
  { user: "Yemi Ajayi", date: "2026-08-06", time: "08:21", activity: "Supplier approved — Meridian EPC Services", ip: "105.112.44.3" },
  { user: "Musa Danjuma", date: "2026-08-05", time: "22:47", activity: "Incident deleted — duplicate record INC-2026-0391", ip: "197.210.7.88" },
  { user: "System", date: "2026-08-05", time: "02:00", activity: "Backup completed — 42.7 GB encrypted snapshot", ip: "10.0.4.11" },
];

export const SYSTEM_HEALTH = [
  { label: "Database status", value: "Operational", detail: "Primary + replica in sync · 12 ms latency", tone: "success" },
  { label: "Storage usage", value: "68%", detail: "341 GB of 500 GB used", tone: "warning" },
  { label: "Active users", value: "126", detail: "Peak today 184 · 9 facilities online", tone: "info" },
  { label: "Notifications sent", value: "4,382", detail: "Last 30 days · 99.4% delivered", tone: "success" },
  { label: "Last backup", value: "05 Aug, 02:00", detail: "Encrypted snapshot · 42.7 GB", tone: "success" },
  { label: "System uptime", value: "99.98%", detail: "Rolling 90 days · no Sev-1 events", tone: "success" },
];

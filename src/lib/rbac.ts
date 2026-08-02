export type RoleId =
  | "super_admin"
  | "org_admin"
  | "qhse_manager"
  | "site_supervisor"
  | "safety_officer"
  | "auditor"
  | "maintenance_engineer"
  | "field_worker"
  | "contractor"
  | "executive";

export type RoleDefinition = {
  id: RoleId;
  name: string;
  scope: string;
  summary: string;
  can: string[];
  cannot?: string[];
};

export const ROLES: RoleDefinition[] = [
  {
    id: "super_admin",
    name: "Super Administrator",
    scope: "Platform",
    summary: "Complete access across every tenant organization.",
    can: [
      "Manage organizations",
      "Manage users",
      "Manage subscriptions",
      "Configure platform settings",
      "View all dashboards",
      "Access audit logs",
    ],
  },
  {
    id: "org_admin",
    name: "Organization Administrator",
    scope: "Organization",
    summary: "Owns configuration and people for a single organization.",
    can: [
      "Manage users within the organization",
      "Configure company settings",
      "View analytics",
      "Assign roles",
      "Manage permissions",
    ],
  },
  {
    id: "qhse_manager",
    name: "QHSE Manager",
    scope: "Organization",
    summary: "Runs the incident and corrective action lifecycle.",
    can: [
      "Manage incidents",
      "Assign investigations",
      "Review reports",
      "Approve corrective actions",
      "View dashboards",
      "Generate reports",
    ],
  },
  {
    id: "site_supervisor",
    name: "Site Supervisor",
    scope: "Site",
    summary: "Field leadership for a specific operational site.",
    can: [
      "Report incidents",
      "Conduct inspections",
      "Assign corrective actions",
      "Monitor field activities",
      "Approve inspection reports",
    ],
  },
  {
    id: "safety_officer",
    name: "Safety Officer / HSE Officer",
    scope: "Site",
    summary: "Investigates events and drives observations.",
    can: [
      "Investigate incidents",
      "Upload investigation findings",
      "Conduct inspections",
      "Complete safety observations",
      "Track corrective actions",
    ],
  },
  {
    id: "auditor",
    name: "Auditor",
    scope: "Organization",
    summary: "Independent assurance over the safety management system.",
    can: ["View audit records", "Perform audits", "Submit findings", "Upload audit reports"],
    cannot: ["Modify incidents"],
  },
  {
    id: "maintenance_engineer",
    name: "Maintenance Engineer",
    scope: "Site",
    summary: "Executes engineering corrective actions.",
    can: [
      "Receive corrective actions",
      "Update equipment status",
      "Close maintenance tasks",
      "Upload repair evidence",
    ],
  },
  {
    id: "field_worker",
    name: "Field Worker",
    scope: "Site",
    summary: "Frontline reporting from the field.",
    can: [
      "Report incidents",
      "Report unsafe conditions",
      "Submit near misses",
      "Upload photos",
      "Submit voice reports",
    ],
    cannot: ["Edit other users' reports"],
  },
  {
    id: "contractor",
    name: "Contractor",
    scope: "Assigned scope",
    summary: "Third-party personnel with limited scoped access.",
    can: [
      "Report incidents",
      "Submit observations",
      "View assigned corrective actions",
      "Complete inspections assigned to them",
    ],
  },
  {
    id: "executive",
    name: "Executive / Management",
    scope: "Organization",
    summary: "Read-only strategic oversight.",
    can: ["View dashboards", "View KPIs", "View reports", "View analytics"],
    cannot: ["Modify operational data"],
  },
];

export const roleById = (id: RoleId) => ROLES.find((r) => r.id === id) ?? ROLES[0];

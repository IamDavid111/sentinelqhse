export type Trend = "up" | "down" | "flat";

export type ExecKpi = {
  label: string;
  value: string;
  change: string;
  trend: Trend;
  good: boolean;
  sub: string;
};

export const EXEC_KPI_CARDS: ExecKpi[] = [
  { label: "Total incidents", value: "486", change: "12.4%", trend: "down", good: true, sub: "Rolling 12 months" },
  { label: "Open incidents", value: "37", change: "6.1%", trend: "down", good: true, sub: "9 past target date" },
  { label: "Closed incidents", value: "449", change: "8.8%", trend: "up", good: true, sub: "92.4% closure rate" },
  { label: "High-risk incidents", value: "23", change: "18.2%", trend: "down", good: true, sub: "4 Tier-1 escalations" },
  { label: "Near misses", value: "312", change: "21.5%", trend: "up", good: true, sub: "Reporting culture improving" },
  { label: "Avg resolution time", value: "6.4 days", change: "2.0 days", trend: "down", good: true, sub: "Target ≤ 7 days" },
  { label: "Compliance score", value: "93.6%", change: "3.2 pts", trend: "up", good: true, sub: "ISO 45001 aligned" },
  { label: "Audits completed", value: "128", change: "14.0%", trend: "up", good: true, sub: "18 scheduled this quarter" },
  { label: "Outstanding actions", value: "64", change: "9.7%", trend: "up", good: false, sub: "21 overdue > 14 days" },
];

export const INCIDENTS_BY_MONTH = [
  { key: "Sep", incidents: 46, nearMiss: 22, closed: 41 },
  { key: "Oct", incidents: 52, nearMiss: 25, closed: 47 },
  { key: "Nov", incidents: 44, nearMiss: 28, closed: 42 },
  { key: "Dec", incidents: 39, nearMiss: 31, closed: 37 },
  { key: "Jan", incidents: 41, nearMiss: 30, closed: 38 },
  { key: "Feb", incidents: 36, nearMiss: 33, closed: 35 },
  { key: "Mar", incidents: 38, nearMiss: 35, closed: 36 },
  { key: "Apr", incidents: 33, nearMiss: 34, closed: 32 },
  { key: "May", incidents: 35, nearMiss: 37, closed: 34 },
  { key: "Jun", incidents: 30, nearMiss: 39, closed: 30 },
  { key: "Jul", incidents: 28, nearMiss: 41, closed: 28 },
  { key: "Aug", incidents: 24, nearMiss: 43, closed: 22 },
];

export const INCIDENTS_BY_WEEK = [
  { key: "W27", incidents: 9, nearMiss: 11, closed: 8 },
  { key: "W28", incidents: 7, nearMiss: 12, closed: 7 },
  { key: "W29", incidents: 8, nearMiss: 9, closed: 8 },
  { key: "W30", incidents: 6, nearMiss: 13, closed: 6 },
  { key: "W31", incidents: 5, nearMiss: 10, closed: 5 },
  { key: "W32", incidents: 4, nearMiss: 12, closed: 3 },
];

export const INCIDENTS_BY_FACILITY = [
  { key: "Flow Station A", incidents: 88, nearMiss: 61, closed: 80 },
  { key: "Flow Station C", incidents: 74, nearMiss: 79, closed: 68 },
  { key: "Bonga Offshore", incidents: 66, nearMiss: 44, closed: 62 },
  { key: "Tank Farm 2", incidents: 58, nearMiss: 39, closed: 55 },
  { key: "Gas Plant East", incidents: 47, nearMiss: 33, closed: 44 },
  { key: "Pipeline Corridor", incidents: 41, nearMiss: 28, closed: 40 },
];

export const INCIDENTS_BY_DEPARTMENT = [
  { key: "Operations", incidents: 121, nearMiss: 74, closed: 112 },
  { key: "Maintenance", incidents: 104, nearMiss: 68, closed: 95 },
  { key: "Production", incidents: 78, nearMiss: 52, closed: 74 },
  { key: "Logistics", incidents: 61, nearMiss: 41, closed: 58 },
  { key: "HSE", incidents: 43, nearMiss: 38, closed: 42 },
  { key: "Security", incidents: 27, nearMiss: 19, closed: 26 },
];

export const INCIDENTS_BY_SEVERITY = [
  { key: "Low", incidents: 214, nearMiss: 168, closed: 208 },
  { key: "Medium", incidents: 168, nearMiss: 96, closed: 158 },
  { key: "High", incidents: 81, nearMiss: 38, closed: 71 },
  { key: "Critical", incidents: 23, nearMiss: 10, closed: 19 },
];

export const INCIDENTS_BY_TYPE = [
  { key: "Slips & falls", incidents: 96, nearMiss: 72, closed: 92 },
  { key: "Hydrocarbon spill", incidents: 74, nearMiss: 48, closed: 66 },
  { key: "Equipment failure", incidents: 68, nearMiss: 55, closed: 63 },
  { key: "Permit breach", incidents: 57, nearMiss: 61, closed: 50 },
  { key: "Gas release", incidents: 44, nearMiss: 37, closed: 40 },
  { key: "Vehicle / LMV", incidents: 39, nearMiss: 24, closed: 37 },
];

export const TREND_DIMENSIONS = [
  { id: "month", label: "Month", data: INCIDENTS_BY_MONTH },
  { id: "week", label: "Week", data: INCIDENTS_BY_WEEK },
  { id: "facility", label: "Facility", data: INCIDENTS_BY_FACILITY },
  { id: "department", label: "Department", data: INCIDENTS_BY_DEPARTMENT },
  { id: "severity", label: "Severity", data: INCIDENTS_BY_SEVERITY },
  { id: "type", label: "Incident type", data: INCIDENTS_BY_TYPE },
] as const;

export const SAFETY_PERFORMANCE = [
  { label: "LTIFR", value: "0.42", target: "≤ 0.50", change: "-0.11 vs LY", good: true },
  { label: "TRIR", value: "1.18", target: "≤ 1.40", change: "-0.24 vs LY", good: true },
  { label: "Near-miss frequency", value: "6.9 / 100k hrs", target: "≥ 6.0", change: "+1.4 vs LY", good: true },
  { label: "Corrective action completion", value: "87%", target: "≥ 90%", change: "+5 pts", good: false },
  { label: "Audit compliance", value: "93.6%", target: "≥ 92%", change: "+3.2 pts", good: true },
];

export const RATE_TREND = [
  { key: "Q3 24", ltifr: 0.71, trir: 1.68, nearMiss: 4.8, capa: 74, audit: 86 },
  { key: "Q4 24", ltifr: 0.64, trir: 1.55, nearMiss: 5.2, capa: 78, audit: 88 },
  { key: "Q1 25", ltifr: 0.58, trir: 1.44, nearMiss: 5.8, capa: 81, audit: 89 },
  { key: "Q2 25", ltifr: 0.53, trir: 1.36, nearMiss: 6.1, capa: 84, audit: 91 },
  { key: "Q3 25", ltifr: 0.47, trir: 1.25, nearMiss: 6.5, capa: 85, audit: 92 },
  { key: "Q4 25", ltifr: 0.42, trir: 1.18, nearMiss: 6.9, capa: 87, audit: 94 },
];

export type RiskCell = { facility: string; scores: Record<string, number> };

export const HEATMAP_CATEGORIES = ["Process", "Occupational", "Environmental", "Contractor", "Security"];

export const RISK_HEATMAP: RiskCell[] = [
  { facility: "Flow Station A", scores: { Process: 82, Occupational: 64, Environmental: 58, Contractor: 71, Security: 34 } },
  { facility: "Flow Station C", scores: { Process: 74, Occupational: 77, Environmental: 46, Contractor: 68, Security: 41 } },
  { facility: "Bonga Offshore", scores: { Process: 61, Occupational: 44, Environmental: 66, Contractor: 52, Security: 29 } },
  { facility: "Tank Farm 2", scores: { Process: 48, Occupational: 39, Environmental: 79, Contractor: 44, Security: 37 } },
  { facility: "Gas Plant East", scores: { Process: 55, Occupational: 33, Environmental: 41, Contractor: 36, Security: 24 } },
  { facility: "Pipeline Corridor", scores: { Process: 37, Occupational: 28, Environmental: 62, Contractor: 31, Security: 68 } },
];

export const riskBand = (score: number) => (score >= 65 ? "high" : score >= 45 ? "medium" : "low");

export const ROOT_CAUSE_SPLIT = [
  { key: "Procedure not followed", value: 128 },
  { key: "Inadequate supervision", value: 94 },
  { key: "Equipment defect", value: 81 },
  { key: "Training gap", value: 66 },
  { key: "Poor housekeeping", value: 58 },
  { key: "Design deficiency", value: 34 },
];

export const WORKFORCE_SPLIT = [
  { key: "Contractor", value: 274 },
  { key: "Employee", value: 212 },
];

export const SHIFT_SPLIT = [
  { key: "Day (06–14)", value: 186 },
  { key: "Swing (14–22)", value: 141 },
  { key: "Night (22–06)", value: 159 },
];

export const WEATHER_SPLIT = [
  { key: "Clear", value: 198 },
  { key: "Rain", value: 142 },
  { key: "Harmattan haze", value: 76 },
  { key: "High winds", value: 44 },
  { key: "Storm / swell", value: 26 },
];

export const REPORT_TYPES = [
  { name: "Incident Report", description: "All recorded incidents with severity, status and closure evidence." },
  { name: "Near Miss Report", description: "Near-miss submissions with categories, locations and learnings." },
  { name: "Audit Report", description: "Audit scope, checklist scores, non-conformities and recommendations." },
  { name: "Compliance Report", description: "Regulatory compliance posture across ISO 45001, NUPRC and NOSDRA." },
  { name: "Corrective Action Report", description: "CAPA register with owners, due dates and completion evidence." },
  { name: "Contractor Performance Report", description: "Contractor incident rates, permit breaches and CAPA closure." },
  { name: "Executive Safety Report", description: "Board-ready pack: KPIs, trends, heat map and AI insights." },
];

export const AI_EXEC_INSIGHTS = [
  { tone: "success", text: "Incident frequency reduced by 14% compared to last quarter, driven by improved permit discipline at Bonga Offshore." },
  { tone: "warning", text: "Most permit violations occurred during contractor maintenance windows between 22:00 and 06:00." },
  { tone: "danger", text: "Flow Station C recorded the highest number of near misses (79) — 26% of the organization total." },
  { tone: "success", text: "Average incident resolution time improved by two days, now 6.4 days against a 7-day target." },
  { tone: "info", text: "Corrective action completion sits at 87%, 3 points below target; 21 actions are overdue beyond 14 days." },
];

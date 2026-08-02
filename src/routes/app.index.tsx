import { Link, createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  ClipboardCheck,
  FileBarChart,
  Plus,
  Sparkles,
  Wrench,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PageHeader } from "@/components/app/app-shell";
import { StatusPill } from "@/components/status-pill";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  ACTIVITY_LOG,
  AI_INSIGHTS,
  CORRECTIVE_ACTIONS,
  DEPARTMENTS,
  DEPARTMENT_COMPARISON,
  INCIDENTS,
  INSPECTIONS,
  KPIS,
  MONTHLY_TREND,
  SEVERITY_SPLIT,
  SITES,
  SITE_STATUS,
  TYPE_SPLIT,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Executive Safety Dashboard — SentinelQHSE™" },
      { name: "description", content: "Live QHSE performance, risk posture and AI safety insights across all sites." },
      { property: "og:title", content: "Executive Safety Dashboard — SentinelQHSE™" },
      { property: "og:description", content: "Live QHSE performance and AI safety insights across all sites." },
    ],
  }),
  component: Dashboard,
});

const CHART_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

const FILTERS = [
  { label: "Site", options: SITES },
  { label: "Department", options: DEPARTMENTS },
  { label: "Date range", options: ["Last 7 days", "Last 30 days", "Quarter to date", "Year to date"] },
  { label: "Severity", options: ["Low", "Medium", "High", "Critical"] },
  { label: "Incident type", options: ["Near Miss", "Unsafe Act", "Oil Spill", "Equipment Failure"] },
  { label: "Contractor", options: ["Delta Lift Services", "Northgate Mechanical", "All contractors"] },
  { label: "Shift", options: ["Day", "Night", "Swing"] },
];

const QUICK_ACTIONS = [
  { label: "Report Incident", icon: AlertTriangle, to: "/app/incidents/new" as const },
  { label: "Create Inspection", icon: ClipboardCheck, to: "/app/inspections" as const },
  { label: "Corrective Action", icon: Wrench, to: "/app/corrective-actions" as const },
  { label: "Start Audit", icon: FileBarChart, to: "/app/audits" as const },
  { label: "View Reports", icon: Sparkles, to: "/app/reports" as const },
];

function Dashboard() {
  return (
    <>
      <PageHeader
        title="Executive Safety Dashboard"
        description="Northgate Energy Plc · 6 operational sites · data refreshed 2 minutes ago"
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/app/reports">Export</Link>
            </Button>
            <Button asChild>
              <Link to="/app/incidents/new">
                <Plus className="mr-1.5 h-4 w-4" /> Report incident
              </Link>
            </Button>
          </>
        }
      />

      <Card className="mb-6 shadow-card">
        <CardContent className="flex flex-wrap gap-3 pt-6">
          {FILTERS.map((f) => (
            <Select key={f.label}>
              <SelectTrigger className="h-9 w-[168px]" aria-label={f.label}>
                <SelectValue placeholder={f.label} />
              </SelectTrigger>
              <SelectContent>
                {f.options.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {KPIS.map((k) => (
          <Link key={k.label} to={k.to}>
            <Card className="h-full shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated">
              <CardContent className="pt-5">
                <p className="text-xs font-medium text-muted-foreground">{k.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">
                  {k.value}
                  {"suffix" in k && k.suffix ? <span className="text-sm text-muted-foreground">{k.suffix}</span> : null}
                </p>
                <p
                  className={cn(
                    "mt-1.5 inline-flex items-center gap-1 text-xs font-medium",
                    k.delta >= 0 ? "text-primary" : "text-danger",
                  )}
                >
                  {k.delta >= 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  {Math.abs(k.delta)}% vs last period
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <Card className="shadow-card xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Monthly incident trend</CardTitle>
            <CardDescription>Recordable incidents, near misses and lost time injuries</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--popover-foreground)",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="incidents" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="nearMisses" stroke="var(--chart-2)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="ltis" stroke="var(--chart-5)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Incident severity</CardTitle>
            <CardDescription>Distribution over the last 12 months</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={SEVERITY_SPLIT} dataKey="value" nameKey="name" innerRadius={62} outerRadius={95} paddingAngle={3}>
                  {SEVERITY_SPLIT.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--popover-foreground)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Incident types</CardTitle>
            <CardDescription>Most reported categories this year</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TYPE_SPLIT} layout="vertical" margin={{ left: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "var(--muted)" }}
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--popover-foreground)",
                  }}
                />
                <Bar dataKey="value" fill="var(--chart-2)" radius={[0, 6, 6, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Department comparison</CardTitle>
            <CardDescription>Incidents vs open corrective actions</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEPARTMENT_COMPARISON}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="department"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  angle={-18}
                  height={54}
                  textAnchor="end"
                />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "var(--muted)" }}
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--popover-foreground)",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="incidents" fill="var(--chart-1)" radius={[6, 6, 0, 0]} barSize={16} />
                <Bar dataKey="actions" fill="var(--chart-3)" radius={[6, 6, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card className="shadow-card xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Safety map — facility status</CardTitle>
            <CardDescription>Green normal · amber warning · red critical. Select a facility to drill down.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-hidden rounded-xl border border-border surface-grid bg-muted/30 p-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {SITE_STATUS.map((s) => (
                  <Link key={s.site} to="/app/incidents" className="group">
                    <div className="rounded-xl border border-border bg-card p-4 shadow-card transition-shadow group-hover:shadow-elevated">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold">{s.site}</p>
                        <span
                          className={cn(
                            "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
                            s.status === "Normal" && "bg-primary",
                            s.status === "Warning" && "bg-warning",
                            s.status === "Critical" && "animate-pulse bg-danger",
                          )}
                        />
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {s.openIncidents} open · last event {s.lastEvent}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Progress value={s.safetyScore} className="h-1.5" />
                        <span className="text-xs font-medium">{s.safetyScore}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" /> AI safety summary
            </CardTitle>
            <CardDescription>Generated for the week ending 2 Aug 2026</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {AI_INSIGHTS.map((i) => (
              <div key={i.title}>
                <span className="text-[10px] font-semibold tracking-[0.12em] text-primary uppercase">{i.tag}</span>
                <p className="mt-1 text-sm font-medium">{i.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{i.body}</p>
                <Separator className="mt-4" />
              </div>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <Link to="/app/ai-intelligence">Open risk intelligence</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card className="shadow-card xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Recent activity</CardTitle>
            <CardDescription>Incidents, inspections, corrective actions and audits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {INCIDENTS.slice(0, 3).map((i) => (
              <Link
                key={i.id}
                to="/app/incidents/$id"
                params={{ id: i.id }}
                className="flex items-start justify-between gap-3 rounded-lg border border-border p-3 hover:bg-muted/50"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{i.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {i.ref} · {i.site} · {i.date}
                  </p>
                </div>
                <StatusPill value={i.severity} />
              </Link>
            ))}
            {INSPECTIONS.slice(0, 1).map((i) => (
              <div key={i.id} className="flex items-start justify-between gap-3 rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium">{i.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {i.id} · {i.inspector} · {i.date}
                  </p>
                </div>
                <StatusPill value={i.status} />
              </div>
            ))}
            {CORRECTIVE_ACTIONS.slice(0, 1).map((a) => (
              <div key={a.id} className="flex items-start justify-between gap-3 rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.id} · {a.assignee} · due {a.due}
                  </p>
                </div>
                <StatusPill value={a.status} />
              </div>
            ))}
            <div className="space-y-2 pt-2">
              {ACTIVITY_LOG.slice(0, 3).map((a) => (
                <p key={a.time} className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{a.user}</span> {a.activity} · {a.time}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {QUICK_ACTIONS.map((q) => (
              <Button key={q.label} variant="outline" size="lg" className="h-14 justify-start text-base" asChild>
                <Link to={q.to}>
                  <q.icon className="mr-3 h-5 w-5 text-primary" />
                  {q.label}
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

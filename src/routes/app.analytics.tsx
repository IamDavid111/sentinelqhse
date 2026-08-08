import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  FileSpreadsheet,
  FileText,
  Minus,
  Printer,
  Sparkles,
  Table2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AI_EXEC_INSIGHTS,
  EXEC_KPI_CARDS,
  HEATMAP_CATEGORIES,
  RATE_TREND,
  REPORT_TYPES,
  RISK_HEATMAP,
  ROOT_CAUSE_SPLIT,
  SAFETY_PERFORMANCE,
  SHIFT_SPLIT,
  TREND_DIMENSIONS,
  WEATHER_SPLIT,
  WORKFORCE_SPLIT,
  riskBand,
} from "@/lib/analytics-data";
import { AUDIT_TYPES, DEPARTMENTS, INCIDENT_CATEGORIES, SEVERITIES, SITES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({
    meta: [
      { title: "Executive Analytics — SentinelQHSE™" },
      {
        name: "description",
        content:
          "Executive command centre for QHSE performance: KPIs, incident trends, LTIFR and TRIR, facility risk heat map, distribution analytics and board-ready report generation.",
      },
      { property: "og:title", content: "Executive Analytics — SentinelQHSE™" },
      { property: "og:description", content: "Safety business intelligence for executives, HSE managers and regulators." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnalyticsPage,
});

const CHART = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
const BAND: Record<string, string> = {
  high: "bg-danger/18 text-danger ring-1 ring-danger/30",
  medium: "bg-warning/18 text-warning ring-1 ring-warning/30",
  low: "bg-primary/14 text-primary ring-1 ring-primary/25",
};
const TONE: Record<string, string> = {
  success: "text-primary",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
};

const CONTRACTORS = ["Meridian EPC Services", "Coastal Drilling Ltd", "Riverline Logistics", "Apex Mechanical"];
const EXPORTS = [
  { label: "PDF", icon: FileText },
  { label: "Excel", icon: FileSpreadsheet },
  { label: "CSV", icon: Table2 },
];

function chartTooltip() {
  return {
    contentStyle: {
      background: "var(--popover)",
      border: "1px solid var(--border)",
      borderRadius: "0.6rem",
      color: "var(--popover-foreground)",
      fontSize: "12px",
    },
  };
}

function AnalyticsPage() {
  const [dimension, setDimension] = useState<string>("month");
  const [report, setReport] = useState(REPORT_TYPES[0]!.name);
  const trend = TREND_DIMENSIONS.find((d) => d.id === dimension) ?? TREND_DIMENSIONS[0];

  return (
    <>
      <PageHeader
        title="Executive Analytics"
        description="Operational safety data turned into business intelligence — refreshed hourly across all facilities."
        actions={
          <>
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="mr-1.5 h-4 w-4" /> Print
            </Button>
            <Button onClick={() => toast.success("Executive Safety Report queued as PDF")}>
              <Download className="mr-1.5 h-4 w-4" /> Executive pack
            </Button>
          </>
        }
      />

      {/* KPI cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {EXEC_KPI_CARDS.map((k) => {
          const Icon = k.trend === "up" ? ArrowUpRight : k.trend === "down" ? ArrowDownRight : Minus;
          return (
            <Card key={k.label} className="shadow-card">
              <CardContent className="pt-5">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{k.label}</p>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <p className="text-2xl font-semibold">{k.value}</p>
                  <span
                    className={cn(
                      "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                      k.good ? "bg-primary/12 text-primary" : "bg-danger/12 text-danger",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {k.change}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{k.sub}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="analytics" className="mt-6">
        <TabsList className="flex w-full flex-wrap justify-start">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="performance">Safety performance</TabsTrigger>
          <TabsTrigger value="risk">Risk heat map</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="reports">Report generator</TabsTrigger>
        </TabsList>

        {/* ANALYTICS */}
        <TabsContent value="analytics" className="mt-4 space-y-4">
          <Card className="shadow-card">
            <CardHeader className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-base">Incident trends</CardTitle>
                <CardDescription>Incidents, near misses and closures by {trend!.label.toLowerCase()}.</CardDescription>
              </div>
              <Select value={dimension} onValueChange={setDimension}>
                <SelectTrigger className="w-[190px]" aria-label="Trend dimension">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TREND_DIMENSIONS.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      By {d.label.toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[...trend!.data]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="key" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" interval={0} angle={-12} dy={8} height={54} />
                  <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                  <Tooltip {...chartTooltip()} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="incidents" name="Incidents" fill="var(--chart-5)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="nearMiss" name="Near misses" fill="var(--chart-3)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="closed" name="Closed" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-primary" /> Executive insights
              </CardTitle>
              <CardDescription>Generated from the last four quarters of operational data.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {AI_EXEC_INSIGHTS.map((i) => (
                <div key={i.text} className="rounded-lg border border-border bg-muted/30 p-3">
                  <p className="text-sm leading-relaxed">
                    <Sparkles className={cn("mr-1.5 inline h-3.5 w-3.5", TONE[i.tone])} />
                    {i.text}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SAFETY PERFORMANCE */}
        <TabsContent value="performance" className="mt-4 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {SAFETY_PERFORMANCE.map((m) => (
              <Card key={m.label} className="shadow-card">
                <CardContent className="pt-5">
                  <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{m.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{m.value}</p>
                  <p className={cn("mt-1 text-xs font-medium", m.good ? "text-primary" : "text-warning")}>{m.change}</p>
                  <p className="text-xs text-muted-foreground">Target {m.target}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">LTIFR &amp; TRIR trend</CardTitle>
                <CardDescription>Per 200,000 exposure hours, by quarter.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={RATE_TREND}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="key" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                    <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                    <Tooltip {...chartTooltip()} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="ltifr" name="LTIFR" stroke="var(--chart-5)" strokeWidth={2} />
                    <Line type="monotone" dataKey="trir" name="TRIR" stroke="var(--chart-2)" strokeWidth={2} />
                    <Line type="monotone" dataKey="nearMiss" name="Near-miss freq." stroke="var(--chart-3)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">CAPA completion &amp; audit compliance</CardTitle>
                <CardDescription>Percentage by quarter against a 90% target.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={RATE_TREND}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="key" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                    <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" domain={[0, 100]} />
                    <Tooltip {...chartTooltip()} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="capa" name="CAPA completion %" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="audit" name="Audit compliance %" fill="var(--chart-3)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* RISK HEAT MAP */}
        <TabsContent value="risk" className="mt-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Operational risk heat map</CardTitle>
              <CardDescription>
                Composite risk score (0–100) per facility and risk category. Green ≤ 44 · Amber 45–64 · Red ≥ 65.
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-separate border-spacing-1">
                <thead>
                  <tr>
                    <th className="p-2 text-left text-xs font-semibold text-muted-foreground uppercase">Facility</th>
                    {HEATMAP_CATEGORIES.map((c) => (
                      <th key={c} className="p-2 text-center text-xs font-semibold text-muted-foreground uppercase">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RISK_HEATMAP.map((row) => (
                    <tr key={row.facility}>
                      <td className="p-2 text-sm font-medium whitespace-nowrap">{row.facility}</td>
                      {HEATMAP_CATEGORIES.map((c) => {
                        const score = row.scores[c] ?? 0;
                        return (
                          <td key={c} className="p-1">
                            <div className={cn("rounded-md py-3 text-center text-sm font-semibold", BAND[riskBand(score)])}>
                              {score}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-primary" /> Low risk</span>
                <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-warning" /> Medium risk</span>
                <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-danger" /> High risk</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DISTRIBUTION */}
        <TabsContent value="distribution" className="mt-4 grid gap-4 lg:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Root cause distribution</CardTitle>
              <CardDescription>Primary cause assigned during investigation.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ROOT_CAUSE_SPLIT} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                  <YAxis type="category" dataKey="key" width={150} tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                  <Tooltip {...chartTooltip()} />
                  <Bar dataKey="value" name="Incidents" fill="var(--chart-2)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Contractor vs employee</CardTitle>
              <CardDescription>Who was involved in the recorded event.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={WORKFORCE_SPLIT} dataKey="value" nameKey="key" innerRadius={60} outerRadius={100} paddingAngle={3}>
                    {WORKFORCE_SPLIT.map((_, i) => (
                      <Cell key={i} fill={CHART[i % CHART.length]} />
                    ))}
                  </Pie>
                  <Tooltip {...chartTooltip()} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Shift distribution</CardTitle>
              <CardDescription>Incidents by shift window.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SHIFT_SPLIT}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="key" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                  <Tooltip {...chartTooltip()} />
                  <Bar dataKey="value" name="Incidents" radius={[4, 4, 0, 0]}>
                    {SHIFT_SPLIT.map((_, i) => (
                      <Cell key={i} fill={CHART[i % CHART.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Weather conditions</CardTitle>
              <CardDescription>Environmental conditions at time of event.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={WEATHER_SPLIT} dataKey="value" nameKey="key" outerRadius={100}>
                    {WEATHER_SPLIT.map((_, i) => (
                      <Cell key={i} fill={CHART[i % CHART.length]} />
                    ))}
                  </Pie>
                  <Tooltip {...chartTooltip()} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* REPORT GENERATOR */}
        <TabsContent value="reports" className="mt-4 space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Report filters</CardTitle>
              <CardDescription>Filters apply to the generated report and every export format.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="an-from">From date</Label>
                <Input id="an-from" type="date" defaultValue="2026-05-01" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="an-to">To date</Label>
                <Input id="an-to" type="date" defaultValue="2026-08-08" />
              </div>
              {[
                { label: "Facility", options: SITES },
                { label: "Department", options: DEPARTMENTS },
                { label: "Incident type", options: INCIDENT_CATEGORIES },
                { label: "Contractor", options: CONTRACTORS },
                { label: "Severity", options: [...SEVERITIES] },
                { label: "Audit type", options: AUDIT_TYPES },
              ].map((f) => (
                <div key={f.label} className="space-y-2">
                  <Label htmlFor={`an-${f.label}`}>{f.label}</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id={`an-${f.label}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {f.options.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Report type</CardTitle>
                <CardDescription>Select a template to preview.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {REPORT_TYPES.map((r) => (
                  <button
                    key={r.name}
                    type="button"
                    onClick={() => setReport(r.name)}
                    className={cn(
                      "w-full rounded-lg border border-border px-3 py-2 text-left transition-colors hover:bg-muted",
                      report === r.name && "border-primary/40 bg-primary/8",
                    )}
                  >
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.description}</p>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-base">{report}</CardTitle>
                  <CardDescription>Northgate Energy Plc · 01 May 2026 – 08 Aug 2026 · All facilities</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  {EXPORTS.map((e) => (
                    <Button key={e.label} variant="outline" size="sm" onClick={() => toast.success(`${report} exported as ${e.label}`)}>
                      <e.icon className="mr-1.5 h-4 w-4" /> {e.label}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => window.print()}>
                    <Printer className="mr-1.5 h-4 w-4" /> Print
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-4">
                  {EXEC_KPI_CARDS.slice(0, 4).map((k) => (
                    <div key={k.label} className="rounded-lg border border-border p-3">
                      <p className="text-xs text-muted-foreground">{k.label}</p>
                      <p className="mt-1 text-xl font-semibold">{k.value}</p>
                    </div>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Facility</TableHead>
                        <TableHead>Incidents</TableHead>
                        <TableHead>Near misses</TableHead>
                        <TableHead>Closed</TableHead>
                        <TableHead>Risk band</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {RISK_HEATMAP.map((f) => {
                        const process = f.scores["Process"] ?? 0;
                        return (
                          <TableRow key={f.facility}>
                            <TableCell className="font-medium">{f.facility}</TableCell>
                            <TableCell>{Math.round(process * 1.05)}</TableCell>
                            <TableCell>{Math.round(process * 0.82)}</TableCell>
                            <TableCell>{Math.round(process * 0.96)}</TableCell>
                            <TableCell>
                              <Badge className={cn("capitalize", BAND[riskBand(process)])} variant="secondary">
                                {riskBand(process)}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="text-sm font-semibold">Narrative summary</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    {AI_EXEC_INSIGHTS.slice(0, 4).map((i) => (
                      <li key={i.text}>• {i.text}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Download, FileCheck2, Plus, Printer, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { PageHeader } from "@/components/app/app-shell";
import { StatusPill } from "@/components/status-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AUDIT_CHECKLIST_ITEMS,
  AUDIT_COMPLIANCE_TREND,
  AUDIT_CORRECTIVE_ACTIONS,
  AUDIT_DEPARTMENT_PERFORMANCE,
  AUDIT_FINDINGS,
  AUDIT_FINDINGS_BY_SEVERITY,
  AUDIT_KPIS,
  AUDIT_MONTHLY_ACTIVITY,
  AUDIT_REPORT,
  AUDIT_TYPE_OPTIONS,
} from "@/lib/intelligence-data";
import { AUDITS, DEPARTMENTS, SITES, USERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/audits")({
  head: () => ({
    meta: [
      { title: "Audit Management — SentinelQHSE™" },
      {
        name: "description",
        content: "Plan, conduct and close QHSE audits with digital checklists, findings, corrective actions and reports.",
      },
      { property: "og:title", content: "Audit Management — SentinelQHSE™" },
      { property: "og:description", content: "Audit programme, findings, compliance score and analytics." },
    ],
  }),
  component: AuditsPage,
});

const CALENDAR = [
  { day: 4, label: "Contractor audit follow-up", tone: "warning" },
  { day: 11, label: "Process safety audit", tone: "info" },
  { day: 18, label: "Environmental audit", tone: "info" },
  { day: 25, label: "Internal PTW re-audit", tone: "danger" },
];

const SEV_COLOR: Record<string, string> = {
  Critical: "var(--danger)",
  High: "var(--danger)",
  Medium: "var(--warning)",
  Low: "var(--primary)",
};

const SEV_BADGE: Record<string, string> = {
  Critical: "bg-danger/12 text-danger ring-1 ring-danger/25",
  High: "bg-danger/10 text-danger ring-1 ring-danger/20",
  Medium: "bg-warning/12 text-warning ring-1 ring-warning/25",
  Low: "bg-primary/12 text-primary ring-1 ring-primary/25",
};

type Result = "pass" | "fail" | "observation" | null;

function AuditsPage() {
  const [results, setResults] = useState<Record<string, Result>>({});
  const [comments, setComments] = useState<Record<string, string>>({});

  const answered = Object.values(results).filter(Boolean).length;
  const passed = Object.values(results).filter((r) => r === "pass").length;
  const failed = Object.entries(results).filter(([, r]) => r === "fail");
  const score = answered ? Math.round((passed / answered) * 100) : 0;

  return (
    <>
      <PageHeader
        title="Audit Management"
        description="Plan, conduct, document and monitor internal, compliance, environmental and contractor audits."
        actions={
          <>
            <Button variant="outline" onClick={() => toast.success("Audit report exported")}>
              <Download className="mr-1.5 h-4 w-4" /> Export
            </Button>
            <Button onClick={() => toast.success("New audit drafted")}>
              <Plus className="mr-1.5 h-4 w-4" /> New audit
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        {AUDIT_KPIS.map((k) => (
          <Card key={k.label} className="shadow-card">
            <CardContent className="pt-5">
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <p className="mt-1.5 text-2xl font-semibold">{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="dashboard" className="mt-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="create">Create audit</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="actions">Corrective actions</TabsTrigger>
          <TabsTrigger value="report">Audit report</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Dashboard */}
        <TabsContent value="dashboard" className="mt-4">
          <div className="grid gap-4 xl:grid-cols-3">
            <Card className="shadow-card xl:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Audit register</CardTitle>
                <CardDescription>All planned, in-progress and completed audits.</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Audit</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Facility</TableHead>
                        <TableHead>Auditor</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">NCs</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {AUDITS.map((a) => (
                        <TableRow key={a.id}>
                          <TableCell className="font-medium">
                            {a.id}
                            <span className="block text-xs font-normal text-muted-foreground">{a.scope}</span>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">{a.type}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{a.site}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{a.auditor}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{a.date}</TableCell>
                          <TableCell>
                            <StatusPill value={a.status} />
                          </TableCell>
                          <TableCell className="text-right font-semibold">{a.nonConformities}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CalendarDays className="h-4 w-4 text-accent" /> Audit schedule — August
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {CALENDAR.map((c) => (
                    <div key={c.label} className="flex items-center gap-3 rounded-lg border p-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-sm font-semibold">
                        {c.day}
                      </span>
                      <span className="text-sm">{c.label}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Sparkles className="h-4 w-4 text-primary" /> AI audit assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Permit-to-work findings recur in 4 of the last 6 audits — a systemic control gap.</p>
                  <p>Contractor audits score 13 points below internal audits on average.</p>
                  <p>Closing extinguisher servicing would lift the compliance score to an estimated 94%.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Create audit */}
        <TabsContent value="create" className="mt-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Create audit</CardTitle>
              <CardDescription>Define scope, ownership and schedule.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-4 md:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Audit created and assigned");
                }}
              >
                <div className="md:col-span-2">
                  <Label htmlFor="audit-title">Audit title</Label>
                  <Input id="audit-title" placeholder="Q3 Contractor Safety Audit" className="mt-1.5" required />
                </div>
                <div>
                  <Label>Facility</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select facility" />
                    </SelectTrigger>
                    <SelectContent>
                      {SITES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Department</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Audit type</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {AUDIT_TYPE_OPTIONS.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Auditor</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Assign auditor" />
                    </SelectTrigger>
                    <SelectContent>
                      {USERS.slice(0, 8).map((u) => (
                        <SelectItem key={u.id} value={u.name}>
                          {u.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="audit-date">Audit date</Label>
                  <Input id="audit-date" type="date" className="mt-1.5" />
                </div>
                <div>
                  <Label>Priority</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Low", "Medium", "High", "Critical"].map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="audit-desc">Description / scope</Label>
                  <Textarea id="audit-desc" rows={4} className="mt-1.5" placeholder="Scope, standards and areas covered…" />
                </div>
                <div className="md:col-span-2 flex justify-end gap-2">
                  <Button type="button" variant="outline">
                    Save draft
                  </Button>
                  <Button type="submit">Create audit</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Checklist */}
        <TabsContent value="checklist" className="mt-4">
          <div className="grid gap-4 xl:grid-cols-3">
            <Card className="shadow-card xl:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Digital audit checklist</CardTitle>
                <CardDescription>Mark each item and add comments. Failed items generate a finding.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {AUDIT_CHECKLIST_ITEMS.map((item) => {
                  const r = results[item.id] ?? null;
                  return (
                    <div key={item.id} className="rounded-lg border p-3">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.guidance}</p>
                        </div>
                        <div className="flex gap-1.5">
                          {(["pass", "fail", "observation"] as const).map((v) => (
                            <Button
                              key={v}
                              size="sm"
                              variant={r === v ? "default" : "outline"}
                              className={cn(
                                r === v && v === "fail" && "bg-danger text-white hover:bg-danger/90",
                                r === v && v === "observation" && "bg-warning text-white hover:bg-warning/90",
                              )}
                              onClick={() => setResults((p) => ({ ...p, [item.id]: v }))}
                            >
                              {v === "pass" ? "Pass" : v === "fail" ? "Fail" : "Observation"}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <Input
                        placeholder="Comments…"
                        className="mt-2.5"
                        value={comments[item.id] ?? ""}
                        onChange={(e) => setComments((p) => ({ ...p, [item.id]: e.target.value }))}
                      />
                    </div>
                  );
                })}
                <div className="flex justify-end">
                  <Button onClick={() => toast.success(`Checklist submitted — ${failed.length} finding(s) generated`)}>
                    <FileCheck2 className="mr-1.5 h-4 w-4" /> Submit checklist
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">Live compliance score</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold">{score}%</p>
                  <Progress value={score} className="mt-2 h-2" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {answered} of {AUDIT_CHECKLIST_ITEMS.length} items assessed · {failed.length} failed
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">Auto-generated findings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {failed.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No failed items yet.</p>
                  ) : (
                    failed.map(([id]) => {
                      const item = AUDIT_CHECKLIST_ITEMS.find((i) => i.id === id)!;
                      return (
                        <div key={id} className="rounded-lg border p-3">
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">
                            {comments[id] || "Non-conformity raised — awaiting owner and due date."}
                          </p>
                        </div>
                      );
                    })
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Findings */}
        <TabsContent value="findings" className="mt-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Findings management</CardTitle>
              <CardDescription>Every failed checklist item becomes a tracked finding.</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Checklist item</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Assigned</TableHead>
                      <TableHead>Due</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {AUDIT_FINDINGS.map((f) => (
                      <TableRow key={f.id}>
                        <TableCell className="font-mono text-xs">{f.id}</TableCell>
                        <TableCell className="text-sm">{f.item}</TableCell>
                        <TableCell className="max-w-[320px] text-xs text-muted-foreground">{f.description}</TableCell>
                        <TableCell>
                          <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", SEV_BADGE[f.severity])}>
                            {f.severity}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs">{f.owner}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{f.due}</TableCell>
                        <TableCell>
                          <Badge variant={f.status === "Closed" ? "secondary" : "outline"}>{f.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Corrective actions */}
        <TabsContent value="actions" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-3">
            {AUDIT_CORRECTIVE_ACTIONS.map((a) => (
              <Card key={a.id} className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-mono text-sm">{a.id}</CardTitle>
                    <Badge variant={a.status === "Completed" ? "secondary" : "outline"}>{a.status}</Badge>
                  </div>
                  <CardDescription>Linked to {a.finding}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>{a.action}</p>
                  <p className="text-xs text-muted-foreground">
                    Responsible: <span className="font-medium text-foreground">{a.owner}</span> · Target {a.target}
                  </p>
                  <p className="text-xs text-muted-foreground">Evidence: {a.evidence}</p>
                  <p className="text-xs text-muted-foreground">{a.notes}</p>
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" variant="outline" onClick={() => toast.success("Evidence uploaded")}>
                      Upload evidence
                    </Button>
                    <Button size="sm" onClick={() => toast.success("Action updated")}>
                      Update
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Report */}
        <TabsContent value="report" className="mt-4">
          <Card className="shadow-card">
            <CardHeader className="flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-base">{AUDIT_REPORT.title}</CardTitle>
                <CardDescription>
                  {AUDIT_REPORT.id} · {AUDIT_REPORT.type} · {AUDIT_REPORT.date}
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => toast.success("Sent to printer")}>
                <Printer className="mr-1.5 h-4 w-4" /> Print
              </Button>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Facility", AUDIT_REPORT.facility],
                  ["Department", AUDIT_REPORT.department],
                  ["Auditor", AUDIT_REPORT.auditor],
                  ["Priority", AUDIT_REPORT.priority],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">{k}</p>
                    <p className="text-sm font-medium">{v}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground">Overall compliance score</p>
                  <p className="mt-1 text-3xl font-semibold text-primary">{AUDIT_REPORT.score}%</p>
                  <Progress value={AUDIT_REPORT.score} className="mt-2 h-1.5" />
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground">Findings raised</p>
                  <p className="mt-1 text-3xl font-semibold">{AUDIT_REPORT.findings}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground">Findings closed</p>
                  <p className="mt-1 text-3xl font-semibold">{AUDIT_REPORT.closed}</p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold">Recommendations</p>
                <ul className="space-y-2">
                  {AUDIT_REPORT.recommendations.map((r) => (
                    <li key={r} className="flex gap-2.5 rounded-lg border p-3 text-sm">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Compliance trend</CardTitle>
              </CardHeader>
              <CardContent className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={AUDIT_COMPLIANCE_TREND}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis domain={[70, 100]} stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                    <Line type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Monthly audit activity</CardTitle>
              </CardHeader>
              <CardContent className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={AUDIT_MONTHLY_ACTIVITY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                    <Legend />
                    <Bar dataKey="planned" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="completed" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Findings by severity</CardTitle>
              </CardHeader>
              <CardContent className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={AUDIT_FINDINGS_BY_SEVERITY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="severity" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {AUDIT_FINDINGS_BY_SEVERITY.map((s) => (
                        <Cell key={s.severity} fill={SEV_COLOR[s.severity]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Department performance</CardTitle>
                <CardDescription>Audit completion rate 87% across the programme.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {AUDIT_DEPARTMENT_PERFORMANCE.map((d) => (
                  <div key={d.department}>
                    <div className="flex items-center justify-between text-sm">
                      <span>{d.department}</span>
                      <span className="font-semibold">{d.score}%</span>
                    </div>
                    <Progress value={d.score} className="mt-1.5 h-1.5" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

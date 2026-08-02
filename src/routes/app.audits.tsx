import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Download, Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/app/app-shell";
import { StatusPill } from "@/components/status-pill";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AUDITS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/audits")({
  head: () => ({
    meta: [
      { title: "Audit Management — SentinelQHSE™" },
      { name: "description", content: "Plan, conduct and close internal, regulatory and contractor audits with AI summaries." },
      { property: "og:title", content: "Audit Management — SentinelQHSE™" },
      { property: "og:description", content: "Audit programme, non-conformities and compliance score." },
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

function AuditsPage() {
  return (
    <>
      <PageHeader
        title="Audit Management"
        description="Internal, external, regulatory, contractor, environmental and process safety audit programmes."
        actions={
          <>
            <Button variant="outline" onClick={() => toast.success("Audit report exported")}>
              <Download className="mr-1.5 h-4 w-4" /> Export
            </Button>
            <Button onClick={() => toast.success("Audit created")}>
              <Plus className="mr-1.5 h-4 w-4" /> New audit
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        {[
          ["Upcoming audits", "3"],
          ["Completed", "18"],
          ["Overdue", "1"],
          ["High-risk findings", "7"],
          ["Open non-conformities", "18"],
          ["Compliance score", "91%"],
        ].map(([label, value]) => (
          <Card key={label} className="shadow-card">
            <CardContent className="pt-5">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="mt-1.5 text-2xl font-semibold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card className="shadow-card xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Audit register</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Audit</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Site</TableHead>
                    <TableHead>Auditor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>NCs</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {AUDITS.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>
                        <p className="font-mono text-xs">{a.id}</p>
                        <p className="text-xs text-muted-foreground">{a.scope}</p>
                      </TableCell>
                      <TableCell className="text-sm">{a.type}</TableCell>
                      <TableCell className="text-sm">{a.site}</TableCell>
                      <TableCell className="text-sm">{a.auditor}</TableCell>
                      <TableCell className="text-sm whitespace-nowrap">{a.date}</TableCell>
                      <TableCell className="text-sm font-semibold">{a.nonConformities}</TableCell>
                      <TableCell>
                        <StatusPill value={a.risk} />
                      </TableCell>
                      <TableCell>
                        <StatusPill value={a.status} />
                      </TableCell>
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
                <CalendarDays className="h-4 w-4 text-primary" /> August 2026
              </CardTitle>
              <CardDescription>Planned, ongoing and follow-up reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted-foreground">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const ev = CALENDAR.find((c) => c.day === day);
                  return (
                    <span
                      key={day}
                      title={ev?.label}
                      className={cn(
                        "flex aspect-square items-center justify-center rounded-md text-foreground",
                        ev?.tone === "warning" && "bg-warning/20 font-semibold text-warning",
                        ev?.tone === "info" && "bg-info/15 font-semibold text-info",
                        ev?.tone === "danger" && "bg-danger/15 font-semibold text-danger",
                      )}
                    >
                      {day}
                    </span>
                  );
                })}
              </div>
              <ul className="mt-4 space-y-2 text-xs">
                {CALENDAR.map((c) => (
                  <li key={c.label} className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Aug {c.day}</span>
                    <span className="text-right font-medium">{c.label}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-primary" /> AI audit assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Recurring non-conformity:</span> permit-to-work closure
                discipline has appeared in 4 of the last 6 audits.
              </p>
              <p>
                <span className="font-medium text-foreground">Management attention:</span> contractor HSE competency
                verification at Tank Farm Delta.
              </p>
              <div>
                <div className="flex justify-between text-xs">
                  <span>Compliance score</span>
                  <span className="font-semibold text-foreground">91%</span>
                </div>
                <Progress value={91} className="mt-1.5 h-1.5" />
              </div>
              <Button variant="outline" className="w-full" onClick={() => toast.success("Executive audit summary generated")}>
                Generate executive summary
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

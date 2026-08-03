import { createFileRoute } from "@tanstack/react-router";
import { CalendarRange, Download, FileSpreadsheet, FileText, Table2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AUDIT_TYPES, DEPARTMENTS, INCIDENT_CATEGORIES, INSPECTION_TYPES, SEVERITIES, SITES } from "@/lib/mock-data";
import { RECENT_EXPORTS, REPORT_CATALOGUE } from "@/lib/platform-data";

export const Route = createFileRoute("/app/reports")({
  head: () => ({
    meta: [
      { title: "Reports Center — SentinelQHSE™" },
      { name: "description", content: "Generate incident, audit, inspection, corrective action and KPI reports filtered by date, site, department and contractor." },
      { property: "og:title", content: "Reports Center — SentinelQHSE™" },
      { property: "og:description", content: "Regulatory and executive QHSE reporting in PDF, Excel and CSV." },
    ],
  }),
  component: ReportsPage,
});

const CONTRACTORS = ["Meridian EPC Services", "Coastal Drilling Ltd", "Riverline Logistics", "Apex Mechanical", "Delta Scaffold Co."];

const FORMATS = [
  { label: "PDF", icon: FileText },
  { label: "Excel", icon: FileSpreadsheet },
  { label: "CSV", icon: Table2 },
];

function ReportsPage() {
  const [busy, setBusy] = useState<string | null>(null);

  const generate = (name: string, format: string) => {
    setBusy(`${name}-${format}`);
    setTimeout(() => {
      setBusy(null);
      toast.success(`${name} generated as ${format}`);
    }, 700);
  };

  return (
    <>
      <PageHeader
        title="Reports Center"
        description="Filter by period, site, department, contractor, type or severity — then export in PDF, Excel or CSV."
      />

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CalendarRange className="h-4 w-4 text-primary" /> Report filters
          </CardTitle>
          <CardDescription>Filters apply to every report generated below.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="from">From date</Label>
            <Input id="from" type="date" defaultValue="2026-07-01" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="to">To date</Label>
            <Input id="to" type="date" defaultValue="2026-08-02" />
          </div>
          {[
            { label: "Site", options: SITES },
            { label: "Department", options: DEPARTMENTS },
            { label: "Contractor", options: CONTRACTORS },
            { label: "Incident type", options: INCIDENT_CATEGORIES },
            { label: "Severity", options: [...SEVERITIES] },
            { label: "Audit", options: AUDIT_TYPES },
            { label: "Inspection", options: INSPECTION_TYPES },
          ].map((f) => (
            <div key={f.label} className="space-y-2">
              <Label htmlFor={f.label}>{f.label}</Label>
              <Select defaultValue="all">
                <SelectTrigger id={f.label}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All {f.label.toLowerCase()}s</SelectItem>
                  {f.options.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
          <div className="flex items-end">
            <Button variant="outline" className="w-full" onClick={() => toast.success("Filters applied")}>
              Apply filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {REPORT_CATALOGUE.map((r) => (
          <Card key={r.name} className="flex flex-col shadow-card">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-4 w-4 text-primary" /> {r.name}
                </CardTitle>
                <Badge variant="secondary" className="shrink-0">{r.group}</Badge>
              </div>
              <CardDescription>{r.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto flex flex-wrap gap-2">
              {FORMATS.map((f) => (
                <Button
                  key={f.label}
                  variant="outline"
                  size="sm"
                  disabled={busy === `${r.name}-${f.label}`}
                  onClick={() => generate(r.name, f.label)}
                >
                  <f.icon className="mr-1.5 h-4 w-4" />
                  {busy === `${r.name}-${f.label}` ? "Generating…" : f.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-4 shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Recent exports</CardTitle>
          <CardDescription>Every download is written to the audit trail.</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Generated by</TableHead>
                  <TableHead>When</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECENT_EXPORTS.map((e) => (
                  <TableRow key={e.name}>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{e.format}</Badge>
                    </TableCell>
                    <TableCell>{e.by}</TableCell>
                    <TableCell className="whitespace-nowrap">{e.at}</TableCell>
                    <TableCell>{e.size}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => toast.success("Download started")}>
                        <Download className="mr-1.5 h-4 w-4" /> Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

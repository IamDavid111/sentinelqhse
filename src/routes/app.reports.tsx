import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/app/reports")({
  head: () => ({
    meta: [
      { title: "Reports — SentinelQHSE™" },
      { name: "description", content: "Generate regulatory, executive and operational QHSE reports in PDF or Excel." },
      { property: "og:title", content: "Reports — SentinelQHSE™" },
      { property: "og:description", content: "Regulatory and executive QHSE reporting." },
    ],
  }),
  component: ReportsPage,
});

const REPORTS = [
  ["Monthly HSE Performance Report", "Leading and lagging indicators across all sites"],
  ["Incident Statistics Report", "TRIR, LTIFR and severity distribution"],
  ["Regulatory Submission Pack", "NUPRC / DPR compliance submission bundle"],
  ["Audit Findings Summary", "Non-conformities and closure status"],
  ["Corrective Action Status", "Open, overdue and verified actions"],
  ["Contractor HSE Scorecard", "Performance by contractor company"],
  ["Executive Board Briefing", "One-page summary for leadership"],
  ["Training & Competency Report", "Certification validity by role"],
];

function ReportsPage() {
  return (
    <>
      <PageHeader title="Reports" description="Pre-built regulatory and executive reports, exportable as PDF or Excel." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {REPORTS.map(([title, desc]) => (
          <Card key={title} className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-primary" /> {title}
              </CardTitle>
              <CardDescription>{desc}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => toast.success("PDF generated")}>
                <Download className="mr-1.5 h-4 w-4" /> PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => toast.success("Excel generated")}>
                <Download className="mr-1.5 h-4 w-4" /> Excel
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

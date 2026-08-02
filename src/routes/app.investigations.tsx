import { Link, createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

import { PageHeader } from "@/components/app/app-shell";
import { StatusPill } from "@/components/status-pill";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { INCIDENTS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/investigations")({
  head: () => ({
    meta: [
      { title: "Investigations — SentinelQHSE™" },
      { name: "description", content: "Track open investigations, root cause analysis progress and investigator workload." },
      { property: "og:title", content: "Investigations — SentinelQHSE™" },
      { property: "og:description", content: "Track investigations and root cause analysis progress." },
    ],
  }),
  component: Investigations,
});

function Investigations() {
  const open = INCIDENTS.filter((i) => ["Under Investigation", "Assigned", "Pending Verification"].includes(i.status));

  return (
    <>
      <PageHeader
        title="Investigations"
        description="Root cause analysis in progress across all sites. Investigations are assigned by the QHSE Manager."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {open.map((i, idx) => (
          <Card key={i.id} className="shadow-card">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-base leading-snug">{i.title}</CardTitle>
                <StatusPill value={i.severity} />
              </div>
              <CardDescription>
                {i.ref} · {i.site}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>RCA progress</span>
                  <span>{[45, 70, 20][idx % 3]}%</span>
                </div>
                <Progress value={[45, 70, 20][idx % 3]} className="mt-1.5 h-1.5" />
              </div>
              <p className="text-sm text-muted-foreground">
                Lead investigator: <span className="font-medium text-foreground">{i.assignee}</span>
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/app/incidents/$id" params={{ id: i.id }}>
                  <Search className="mr-1.5 h-4 w-4" /> Open investigation
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Plus } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/app/app-shell";
import { StatusPill } from "@/components/status-pill";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CORRECTIVE_ACTIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/corrective-actions")({
  head: () => ({
    meta: [
      { title: "Corrective Actions — SentinelQHSE™" },
      { name: "description", content: "Assign, track and verify corrective actions raised from incidents, inspections and audits." },
      { property: "og:title", content: "Corrective Actions — SentinelQHSE™" },
      { property: "og:description", content: "Assign, track and verify corrective actions to closure." },
    ],
  }),
  component: CorrectiveActions,
});

const FLOW = ["Open", "Assigned", "In Progress", "Awaiting Verification", "Completed", "Closed"];

function CorrectiveActions() {
  const overdue = CORRECTIVE_ACTIONS.filter((a) => a.overdue);

  return (
    <>
      <PageHeader
        title="Corrective Actions"
        description="Every finding from an incident, inspection or audit becomes a tracked action with an owner and verification step."
        actions={
          <Button onClick={() => toast.success("New corrective action created")}>
            <Plus className="mr-1.5 h-4 w-4" /> New action
          </Button>
        }
      />

      <Card className="mb-4 shadow-card">
        <CardContent className="flex flex-wrap items-center gap-2 pt-6 text-xs">
          {FLOW.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <StatusPill value={s} />
              {i < FLOW.length - 1 && <span className="text-muted-foreground">→</span>}
            </span>
          ))}
        </CardContent>
      </Card>

      {overdue.length > 0 && (
        <Card className="mb-4 border-danger/30 bg-danger/5 shadow-card">
          <CardContent className="flex items-center gap-3 pt-6">
            <AlertTriangle className="h-5 w-5 text-danger" />
            <p className="text-sm">
              <span className="font-semibold text-danger">{overdue.length} overdue actions</span> require escalation to the
              QHSE Manager.
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action ID</TableHead>
                <TableHead className="min-w-[280px]">Action</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CORRECTIVE_ACTIONS.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-mono text-xs">{a.id}</TableCell>
                  <TableCell className="font-medium">{a.title}</TableCell>
                  <TableCell className="font-mono text-xs">{a.source}</TableCell>
                  <TableCell className="text-sm">{a.assignee}</TableCell>
                  <TableCell className="text-sm">{a.department}</TableCell>
                  <TableCell>
                    <StatusPill value={a.priority} />
                  </TableCell>
                  <TableCell className={a.overdue ? "text-sm font-semibold text-danger" : "text-sm"}>{a.due}</TableCell>
                  <TableCell>
                    <StatusPill value={a.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}

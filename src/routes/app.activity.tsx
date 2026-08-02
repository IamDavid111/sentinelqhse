import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/app/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ACTIVITY_LOG } from "@/lib/mock-data";

export const Route = createFileRoute("/app/activity")({
  head: () => ({
    meta: [
      { title: "Activity Log — SentinelQHSE™" },
      { name: "description", content: "Immutable audit trail of user activity, logins and configuration changes." },
      { property: "og:title", content: "Activity Log — SentinelQHSE™" },
      { property: "og:description", content: "Detailed user activity and security audit trail." },
    ],
  }),
  component: ActivityPage,
});

function ActivityPage() {
  return (
    <>
      <PageHeader title="Activity Log" description="Immutable audit trail of logins, record changes and configuration events." />
      <Card className="shadow-card">
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="min-w-[280px]">Activity</TableHead>
                  <TableHead>IP address</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ACTIVITY_LOG.map((a) => (
                  <TableRow key={a.time + a.activity}>
                    <TableCell className="font-mono text-xs whitespace-nowrap">{a.time}</TableCell>
                    <TableCell className="text-sm">{a.user}</TableCell>
                    <TableCell className="text-sm">{a.activity}</TableCell>
                    <TableCell className="font-mono text-xs">{a.ip}</TableCell>
                    <TableCell className="text-sm">{a.location}</TableCell>
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

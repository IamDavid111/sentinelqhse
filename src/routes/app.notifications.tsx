import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";

import { PageHeader } from "@/components/app/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { NOTIFICATIONS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — SentinelQHSE™" },
      { name: "description", content: "Safety alerts, overdue actions and audit reminders across your organization." },
      { property: "og:title", content: "Notifications — SentinelQHSE™" },
      { property: "og:description", content: "Real-time QHSE alerts and reminders." },
    ],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  return (
    <>
      <PageHeader title="Notifications" description="Alerts, escalations and reminders from across your sites." />
      <Card className="shadow-card">
        <CardContent className="divide-y p-0">
          {NOTIFICATIONS.map((n) => (
            <div key={n.title} className="flex items-start gap-3 p-4">
              <span
                className={cn(
                  "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full",
                  n.tone === "danger" && "bg-danger/15 text-danger",
                  n.tone === "warning" && "bg-warning/15 text-warning",
                  n.tone === "info" && "bg-info/15 text-info",
                )}
              >
                <Bell className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.meta}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

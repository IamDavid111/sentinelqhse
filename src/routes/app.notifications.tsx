import { createFileRoute } from "@tanstack/react-router";
import { Bell, Check, Mail, MessageSquare, Smartphone } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NOTIFICATION_EVENTS, NOTIFICATION_FEED, type NotificationChannel } from "@/lib/platform-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/notifications")({
  head: () => ({
    meta: [
      { title: "Notification Center — SentinelQHSE™" },
      { name: "description", content: "Centralized in-app, email, SMS and push notifications for incidents, audits, inspections and AI risk alerts." },
      { property: "og:title", content: "Notification Center — SentinelQHSE™" },
      { property: "og:description", content: "Real-time QHSE alerts across every channel." },
    ],
  }),
  component: NotificationsPage,
});

const CHANNEL_META: { key: NotificationChannel; label: string; icon: typeof Bell; note?: string }[] = [
  { key: "inApp", label: "In-app", icon: Bell },
  { key: "email", label: "Email", icon: Mail },
  { key: "sms", label: "SMS", icon: MessageSquare, note: "Placeholder" },
  { key: "push", label: "Push", icon: Smartphone, note: "Placeholder" },
];

function NotificationsPage() {
  const [read, setRead] = useState<string[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [prefs, setPrefs] = useState(() =>
    Object.fromEntries(NOTIFICATION_EVENTS.map((e) => [e.event, { ...e.defaults }])) as Record<string, Record<NotificationChannel, boolean>>,
  );

  const feed = useMemo(
    () => NOTIFICATION_FEED.map((n) => ({ ...n, unread: n.unread && !read.includes(n.id) })),
    [read],
  );
  const visible = filter === "unread" ? feed.filter((n) => n.unread) : feed;
  const unreadCount = feed.filter((n) => n.unread).length;

  return (
    <>
      <PageHeader
        title="Notification Center"
        description="Every alert routed across in-app, email, SMS and push channels — with per-event delivery preferences."
        actions={
          <Button
            variant="outline"
            onClick={() => {
              setRead(NOTIFICATION_FEED.map((n) => n.id));
              toast.success("All notifications marked as read");
            }}
          >
            <Check className="mr-1.5 h-4 w-4" /> Mark all read
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          ["Unread", String(unreadCount)],
          ["Today", "4"],
          ["Critical alerts", "2"],
          ["Channels active", "4"],
        ].map(([label, value]) => (
          <Card key={label} className="shadow-card">
            <CardContent className="pt-5">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="mt-1.5 text-2xl font-semibold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="feed" className="mt-4">
        <TabsList>
          <TabsTrigger value="feed">Inbox</TabsTrigger>
          <TabsTrigger value="prefs">Preferences</TabsTrigger>
          <TabsTrigger value="events">Event triggers</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="mt-4">
          <div className="mb-3 flex gap-2">
            {(["all", "unread"] as const).map((f) => (
              <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)}>
                {f === "all" ? "All" : `Unread (${unreadCount})`}
              </Button>
            ))}
          </div>
          <Card className="shadow-card">
            <CardContent className="divide-y p-0">
              {visible.length === 0 && (
                <div className="flex flex-col items-center gap-2 p-12 text-center">
                  <Bell className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm font-medium">You're all caught up</p>
                  <p className="text-xs text-muted-foreground">New alerts will appear here the moment they are raised.</p>
                </div>
              )}
              {visible.map((n) => (
                <div key={n.id} className={cn("flex items-start gap-3 p-4 transition-colors", n.unread && "bg-muted/40")}>
                  <span
                    className={cn(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      n.tone === "danger" && "bg-danger/15 text-danger",
                      n.tone === "warning" && "bg-warning/15 text-warning",
                      n.tone === "info" && "bg-info/15 text-info",
                      n.tone === "primary" && "bg-primary/12 text-primary",
                    )}
                  >
                    <Bell className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium">{n.title}</p>
                      <Badge variant="secondary" className="text-[10px]">{n.event}</Badge>
                      {n.unread && <span className="h-2 w-2 rounded-full bg-primary" aria-label="Unread" />}
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span>{n.meta}</span>
                      <span className="flex items-center gap-1.5">
                        {n.channels.map((c) => {
                          const meta = CHANNEL_META.find((m) => m.key === c);
                          const Icon = meta?.icon ?? Bell;
                          return <Icon key={c} className="h-3.5 w-3.5" aria-label={meta?.label} />;
                        })}
                      </span>
                    </div>
                  </div>
                  {n.unread && (
                    <Button variant="ghost" size="sm" onClick={() => setRead((r) => [...r, n.id])}>
                      Mark read
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prefs" className="mt-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Delivery preferences</CardTitle>
              <CardDescription>Choose how each event reaches you. SMS and push are placeholders in this prototype.</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm">
                  <thead>
                    <tr className="border-b text-left text-xs text-muted-foreground">
                      <th className="px-6 py-2 font-medium">Event</th>
                      {CHANNEL_META.map((c) => (
                        <th key={c.key} className="px-4 py-2 font-medium whitespace-nowrap">
                          {c.label}
                          {c.note && <span className="ml-1 text-[10px] opacity-70">({c.note})</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {NOTIFICATION_EVENTS.map((e) => (
                      <tr key={e.event} className="border-b last:border-0">
                        <td className="px-6 py-3">
                          <p className="font-medium">{e.event}</p>
                          <p className="text-xs text-muted-foreground">{e.description}</p>
                        </td>
                        {CHANNEL_META.map((c) => (
                          <td key={c.key} className="px-4 py-3">
                            <Switch
                              checked={prefs[e.event]?.[c.key] ?? false}
                              aria-label={`${e.event} via ${c.label}`}
                              onCheckedChange={(v) => {
                                setPrefs((p) => ({ ...p, [e.event]: { ...(p[e.event] as Record<NotificationChannel, boolean>), [c.key]: v } }));
                                toast.success("Notification preference updated");
                              }}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {NOTIFICATION_EVENTS.map((e) => (
              <Card key={e.event} className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-sm">{e.event}</CardTitle>
                  <CardDescription className="text-xs">{e.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-1.5">
                  {CHANNEL_META.filter((c) => prefs[e.event]?.[c.key]).map((c) => (
                    <Badge key={c.key} variant="secondary" className="text-[10px]">{c.label}</Badge>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

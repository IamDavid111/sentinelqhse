import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Building2,
  Database,
  KeyRound,
  Network,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ADMIN_AUDIT_LOG,
  ADMIN_DEPARTMENTS,
  ADMIN_ROLES,
  ESCALATION_RULES,
  FACILITIES,
  FACILITY_TYPES,
  PERMISSION_MATRIX,
  PERMISSION_MODULES,
  SYSTEM_HEALTH,
  type PermissionLevel,
} from "@/lib/admin-data";
import { INCIDENT_CATEGORIES, SEVERITIES, SITES, USERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admin")({
  head: () => ({
    meta: [
      { title: "System Administration — SentinelQHSE™" },
      {
        name: "description",
        content:
          "Administrator console for SentinelQHSE™: user management, role-based permissions, organization settings, facilities, departments, notifications, audit trail and system health.",
      },
      { property: "og:title", content: "System Administration — SentinelQHSE™" },
      { property: "og:description", content: "Enterprise administration console for the SentinelQHSE™ platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminPage,
});

const LEVEL: Record<PermissionLevel, string> = {
  full: "bg-primary/14 text-primary ring-1 ring-primary/25",
  edit: "bg-info/14 text-info ring-1 ring-info/25",
  view: "bg-warning/14 text-warning ring-1 ring-warning/25",
  none: "bg-muted text-muted-foreground",
};

const STATUS: Record<string, string> = {
  Active: "bg-primary/12 text-primary ring-1 ring-primary/25",
  Maintenance: "bg-warning/12 text-warning ring-1 ring-warning/25",
  Suspended: "bg-danger/12 text-danger ring-1 ring-danger/25",
};

const HEALTH_TONE: Record<string, string> = {
  success: "text-primary",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
};

function AdminPage() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedRole, setSelectedRole] = useState(ADMIN_ROLES[0]!.id);

  const users = useMemo(() => {
    const q = query.toLowerCase();
    return USERS.filter(
      (u) =>
        (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)) &&
        (roleFilter === "all" || u.role === roleFilter),
    );
  }, [query, roleFilter]);

  const roleOptions = Array.from(new Set(USERS.map((u) => u.role)));

  return (
    <>
      <PageHeader
        title="System Administration"
        description="Administrator-only console for people, permissions, facilities and platform configuration."
        actions={
          <Badge variant="secondary" className="gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Signed in as Super Administrator
          </Badge>
        }
      />

      <Tabs defaultValue="users">
        <TabsList className="flex w-full flex-wrap justify-start">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles &amp; permissions</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="audit">Audit trail</TabsTrigger>
          <TabsTrigger value="health">System health</TabsTrigger>
        </TabsList>

        {/* USERS */}
        <TabsContent value="users" className="mt-4 space-y-4">
          <Card className="shadow-card">
            <CardHeader className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-4 w-4 text-primary" /> User accounts
                </CardTitle>
                <CardDescription>Create users, assign roles, reset passwords and disable accounts.</CardDescription>
              </div>
              <Button onClick={() => toast.success("Invitation sent — user will set a password on first sign-in")}>
                <UserPlus className="mr-1.5 h-4 w-4" /> Create user
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <div className="relative min-w-[220px] flex-1">
                  <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search name or email"
                    className="pl-9"
                    aria-label="Search users"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[220px]" aria-label="Filter by role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All roles</SelectItem>
                    {roleOptions.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((u) => (
                      <TableRow key={u.email}>
                        <TableCell>
                          <div className="font-medium">{u.name}</div>
                          <div className="text-xs text-muted-foreground">{u.email}</div>
                        </TableCell>
                        <TableCell>{u.role}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{u.status}</Badge>
                        </TableCell>
                        <TableCell className="space-x-1 text-right whitespace-nowrap">
                          <Button variant="ghost" size="sm" onClick={() => toast.success(`${u.name} updated`)}>
                            <Pencil className="mr-1 h-3.5 w-3.5" /> Edit
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => toast.success(`Password reset link sent to ${u.email}`)}>
                            <KeyRound className="mr-1 h-3.5 w-3.5" /> Reset
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => toast.success(`${u.name} account disabled`)}>
                            Disable
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ROLES */}
        <TabsContent value="roles" className="mt-4 grid gap-4 lg:grid-cols-[320px_1fr]">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Roles</CardTitle>
              <CardDescription>10 predefined enterprise roles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {ADMIN_ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id)}
                  className={cn(
                    "w-full rounded-lg border border-border px-3 py-2 text-left transition-colors hover:bg-muted",
                    selectedRole === r.id && "border-primary/40 bg-primary/8",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{r.name}</p>
                    <span className="text-xs text-muted-foreground">{r.users}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.summary}</p>
                </button>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-4">
            {(() => {
              const role = ADMIN_ROLES.find((r) => r.id === selectedRole)!;
              const matrix = PERMISSION_MATRIX[role.id]!;
              return (
                <>
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="text-base">{role.name} permissions</CardTitle>
                      <CardDescription>{role.summary}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      {role.permissions.map((p) => (
                        <Badge key={p} variant="secondary">
                          {p}
                        </Badge>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="text-base">Module access matrix</CardTitle>
                      <CardDescription>Full · Edit · View · No access, per module.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-2 sm:grid-cols-2">
                      {PERMISSION_MODULES.map((m) => {
                        const level = matrix[m] ?? "none";
                        return (
                          <div key={m} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                            <span className="text-sm">{m}</span>
                            <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold capitalize", LEVEL[level])}>
                              {level === "none" ? "No access" : level}
                            </span>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                </>
              );
            })()}
          </div>
        </TabsContent>

        {/* ORGANIZATION */}
        <TabsContent value="organization" className="mt-4 grid gap-4 lg:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Organization profile</CardTitle>
              <CardDescription>Displayed on reports and regulatory submissions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ad-org">Organization name</Label>
                <Input id="ad-org" defaultValue="Northgate Energy Plc" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ad-logo">Company logo</Label>
                <Input id="ad-logo" type="file" accept="image/*" />
                <p className="text-xs text-muted-foreground">PNG or SVG, minimum 512×512, transparent background preferred.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ad-tz">Time zone</Label>
                  <Select defaultValue="wat">
                    <SelectTrigger id="ad-tz">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wat">(GMT+1) West Africa — Lagos</SelectItem>
                      <SelectItem value="utc">(GMT+0) UTC</SelectItem>
                      <SelectItem value="cat">(GMT+2) Central Africa</SelectItem>
                      <SelectItem value="gst">(GMT+4) Gulf Standard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ad-lang">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="ad-lang">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="pt">Portuguese</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ad-fac">Default facility</Label>
                <Select defaultValue={SITES[0]!}>
                  <SelectTrigger id="ad-fac">
                    <SelectValue />
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
              <Button onClick={() => toast.success("Organization settings saved")}>Save changes</Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Incident categories</CardTitle>
                <CardDescription>Categories available when reporting an event.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {INCIDENT_CATEGORIES.map((c) => (
                    <Badge key={c} variant="secondary">
                      {c}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add a category" aria-label="New incident category" />
                  <Button variant="outline" onClick={() => toast.success("Category added")}>
                    <Plus className="mr-1.5 h-4 w-4" /> Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Severity levels</CardTitle>
                <CardDescription>Escalation thresholds attached to each severity.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {SEVERITIES.map((s) => (
                  <div key={s} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                    <span className="text-sm font-medium">{s}</span>
                    <Select defaultValue={s === "Critical" ? "immediate" : s === "High" ? "30m" : "24h"}>
                      <SelectTrigger className="w-[190px]" aria-label={`${s} escalation`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Escalate immediately</SelectItem>
                        <SelectItem value="30m">Escalate after 30 minutes</SelectItem>
                        <SelectItem value="24h">Escalate after 24 hours</SelectItem>
                        <SelectItem value="none">No escalation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* FACILITIES */}
        <TabsContent value="facilities" className="mt-4 grid gap-4 lg:grid-cols-[1fr_340px]">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2 className="h-4 w-4 text-primary" /> Facility register
              </CardTitle>
              <CardDescription>Operational sites configured for this organization.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Facility</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>GPS</TableHead>
                    <TableHead>Manager</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {FACILITIES.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell>
                        <div className="font-medium">{f.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {f.id} · {f.headcount} personnel
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{f.type}</TableCell>
                      <TableCell className="whitespace-nowrap">{f.location}</TableCell>
                      <TableCell className="font-mono text-xs whitespace-nowrap">{f.gps}</TableCell>
                      <TableCell className="whitespace-nowrap">{f.manager}</TableCell>
                      <TableCell>
                        <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", STATUS[f.status])}>{f.status}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Add facility</CardTitle>
              <CardDescription>Register a new operational site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="f-name">Facility name</Label>
                <Input id="f-name" placeholder="Flow Station D" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="f-loc">Location</Label>
                <Input id="f-loc" placeholder="Bayelsa, Nigeria" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="f-gps">GPS coordinates</Label>
                <Input id="f-gps" placeholder="4.9247° N, 6.2642° E" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="f-type">Facility type</Label>
                <Select defaultValue={FACILITY_TYPES[0]!}>
                  <SelectTrigger id="f-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FACILITY_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="f-mgr">Facility manager</Label>
                <Input id="f-mgr" placeholder="Full name" />
              </div>
              <Button className="w-full" onClick={() => toast.success("Facility created")}>
                <Plus className="mr-1.5 h-4 w-4" /> Create facility
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DEPARTMENTS */}
        <TabsContent value="departments" className="mt-4 grid gap-4 lg:grid-cols-[1fr_340px]">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Network className="h-4 w-4 text-primary" /> Departments
              </CardTitle>
              <CardDescription>Organizational units used for routing and reporting.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Head</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Facilities</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ADMIN_DEPARTMENTS.map((d) => (
                    <TableRow key={d.name}>
                      <TableCell className="font-medium">{d.name}</TableCell>
                      <TableCell>{d.head}</TableCell>
                      <TableCell>{d.users}</TableCell>
                      <TableCell>{d.facilities}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => toast.success(`${d.name} updated`)}>
                          <Pencil className="mr-1 h-3.5 w-3.5" /> Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Add department</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="d-name">Department name</Label>
                <Input id="d-name" placeholder="Marine Operations" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="d-head">Department head</Label>
                <Input id="d-head" placeholder="Full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="d-notes">Notes</Label>
                <Textarea id="d-notes" rows={3} placeholder="Scope and responsibilities" />
              </div>
              <Button className="w-full" onClick={() => toast.success("Department created")}>
                <Plus className="mr-1.5 h-4 w-4" /> Create department
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NOTIFICATIONS */}
        <TabsContent value="notifications" className="mt-4 grid gap-4 lg:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Delivery channels</CardTitle>
              <CardDescription>Organization-wide defaults; users may narrow these.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Email alerts", desc: "Incident, audit and CAPA notifications by email", on: true },
                { label: "Push notifications", desc: "Mobile push for field and supervisory roles", on: true },
                { label: "SMS alerts", desc: "Critical incidents only, to on-call responders", on: true },
                { label: "Daily digest", desc: "08:00 WAT summary of open items", on: false },
              ].map((c) => (
                <div key={c.label} className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
                  <div>
                    <p className="text-sm font-medium">{c.label}</p>
                    <p className="text-xs text-muted-foreground">{c.desc}</p>
                  </div>
                  <Switch defaultChecked={c.on} aria-label={c.label} />
                </div>
              ))}
              <div className="space-y-2 pt-1">
                <Label htmlFor="n-reminder">Reminder frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="n-reminder">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Every hour</SelectItem>
                    <SelectItem value="daily">Once daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => toast.success("Notification settings saved")}>Save settings</Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Escalation rules</CardTitle>
              <CardDescription>Who gets notified, and how quickly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {ESCALATION_RULES.map((r) => (
                <div key={r.trigger} className="rounded-lg border border-border p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium">{r.trigger}</p>
                    <Badge variant="secondary">{r.within}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Notify: {r.notify}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* AUDIT TRAIL */}
        <TabsContent value="audit" className="mt-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-4 w-4 text-primary" /> Administrative audit trail
              </CardTitle>
              <CardDescription>Immutable log of every administrative action. Retained for 7 years.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>IP address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ADMIN_AUDIT_LOG.map((l, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium whitespace-nowrap">{l.user}</TableCell>
                      <TableCell className="whitespace-nowrap">{l.date}</TableCell>
                      <TableCell className="whitespace-nowrap">{l.time}</TableCell>
                      <TableCell>{l.activity}</TableCell>
                      <TableCell className="font-mono text-xs">{l.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* HEALTH */}
        <TabsContent value="health" className="mt-4 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {SYSTEM_HEALTH.map((h) => (
              <Card key={h.label} className="shadow-card">
                <CardContent className="pt-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{h.label}</p>
                    <Database className={cn("h-4 w-4", HEALTH_TONE[h.tone])} />
                  </div>
                  <p className={cn("mt-2 text-2xl font-semibold", HEALTH_TONE[h.tone])}>{h.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{h.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Maintenance</CardTitle>
              <CardDescription>Operational tasks available to administrators.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => toast.success("Backup started")}>
                Run backup now
              </Button>
              <Button variant="outline" onClick={() => toast.success("Cache cleared")}>
                Clear cache
              </Button>
              <Button variant="outline" onClick={() => toast.success("Health report exported")}>
                Export health report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

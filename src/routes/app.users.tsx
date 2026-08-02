import { createFileRoute } from "@tanstack/react-router";
import { Search, ShieldCheck, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/app/app-shell";
import { StatusPill } from "@/components/status-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { USERS } from "@/lib/mock-data";
import { ROLES, roleById } from "@/lib/rbac";

export const Route = createFileRoute("/app/users")({
  head: () => ({
    meta: [
      { title: "User Management — SentinelQHSE™" },
      { name: "description", content: "Invite users, assign enterprise roles and manage account status across your organization." },
      { property: "og:title", content: "User Management — SentinelQHSE™" },
      { property: "og:description", content: "Role-based access control for your QHSE organization." },
    ],
  }),
  component: UsersPage,
});

function UsersPage() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(
    () =>
      USERS.filter((u) => {
        const q = query.toLowerCase();
        const matches =
          !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.employeeId.toLowerCase().includes(q);
        return matches && (role === "all" || u.role === role) && (status === "all" || u.status === status);
      }),
    [query, role, status],
  );

  return (
    <>
      <PageHeader
        title="User Management"
        description="Manage people, roles and access across every site in your organization."
        actions={
          <Button onClick={() => toast.success("Invitation sent")}>
            <UserPlus className="mr-1.5 h-4 w-4" /> Invite user
          </Button>
        }
      />

      <Tabs defaultValue="people">
        <TabsList>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="roles">Roles & permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="people">
          <Card className="shadow-card">
            <CardContent className="space-y-4 pt-5">
              <div className="flex flex-wrap gap-2">
                <div className="relative min-w-[220px] flex-1">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search name, email or employee ID"
                    className="pl-9"
                  />
                </div>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All roles</SelectItem>
                    {ROLES.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {["all", "Active", "Invited", "Suspended", "Deactivated"].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s === "all" ? "All statuses" : s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[220px]">User</TableHead>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Site</TableHead>
                      <TableHead>Certification</TableHead>
                      <TableHead>Last active</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{u.employeeId}</TableCell>
                        <TableCell className="text-sm">{roleById(u.role)?.name}</TableCell>
                        <TableCell className="text-sm">{u.department}</TableCell>
                        <TableCell className="text-sm">{u.site}</TableCell>
                        <TableCell>
                          <StatusPill value={u.certification} />
                        </TableCell>
                        <TableCell className="text-sm whitespace-nowrap">{u.lastActive}</TableCell>
                        <TableCell>
                          <StatusPill value={u.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Manage
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toast.success("Role updated")}>Change role</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.success("Password reset email sent")}>
                                Reset password
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.warning("Account suspended")}>Suspend</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.error("Account deactivated")}>Deactivate</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-xs text-muted-foreground">
                Showing {filtered.length} of {USERS.length} users
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ROLES.map((r) => (
              <Card key={r.id} className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <ShieldCheck className="h-4 w-4 text-primary" /> {r.name}
                    </CardTitle>
                    <Badge variant="secondary">{r.scope}</Badge>
                  </div>
                  <CardDescription>{r.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Can</p>
                  <ul className="space-y-1">
                    {r.can.map((c) => (
                      <li key={c} className="text-muted-foreground">
                        • {c}
                      </li>
                    ))}
                  </ul>
                  {r.cannot && r.cannot.length > 0 && (
                    <>
                      <p className="pt-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">Cannot</p>
                      <ul className="space-y-1">
                        {r.cannot.map((c) => (
                          <li key={c} className="text-muted-foreground">
                            • {c}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

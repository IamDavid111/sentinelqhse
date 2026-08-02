import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeader } from "@/components/app/app-shell";
import { StatusPill } from "@/components/status-pill";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USERS } from "@/lib/mock-data";
import { roleById } from "@/lib/rbac";

export const Route = createFileRoute("/app/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — SentinelQHSE™" },
      { name: "description", content: "Manage your profile details, certifications and security settings." },
      { property: "og:title", content: "My Profile — SentinelQHSE™" },
      { property: "og:description", content: "Personal account and security settings." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const me = USERS[0]!;
  return (
    <>
      <PageHeader title="My Profile" description="Your account details, competency records and security settings." />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Personal details</CardTitle>
            <CardDescription>Some fields are managed by your organization administrator.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pname">Full name</Label>
              <Input id="pname" defaultValue={me.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pmail">Work email</Label>
              <Input id="pmail" defaultValue={me.email} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pphone">Phone</Label>
              <Input id="pphone" defaultValue={me.phone} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pjob">Job title</Label>
              <Input id="pjob" defaultValue={me.jobTitle} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pdept">Department</Label>
              <Input id="pdept" defaultValue={me.department} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="psite">Primary site</Label>
              <Input id="psite" defaultValue={me.site} readOnly />
            </div>
            <div className="sm:col-span-2">
              <Button onClick={() => toast.success("Profile updated")}>Save changes</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium">{roleById(me.role)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Employee ID</span>
                <span className="font-mono text-xs">{me.employeeId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Certification</span>
                <StatusPill value={me.certification} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Account</span>
                <StatusPill value={me.status} />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Security</CardTitle>
              <CardDescription>Multi-factor authentication is enabled.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full" onClick={() => toast.success("Password reset email sent")}>
                Change password
              </Button>
              <Button variant="outline" className="w-full" onClick={() => toast.success("MFA re-enrolment started")}>
                Reconfigure MFA
              </Button>
              <Button variant="outline" className="w-full" onClick={() => toast.success("All other sessions signed out")}>
                Sign out other sessions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeader } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Organization Settings — SentinelQHSE™" },
      { name: "description", content: "Configure organization details, security policy and notification preferences." },
      { property: "og:title", content: "Organization Settings — SentinelQHSE™" },
      { property: "og:description", content: "Tenant configuration and security policy." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <>
      <PageHeader title="Organization Settings" description="Tenant configuration, security policy and notification routing." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Organization</CardTitle>
            <CardDescription>Details shown on reports and regulatory submissions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="org">Organization name</Label>
              <Input id="org" defaultValue="Northgate Energy Limited" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg">Registration number</Label>
              <Input id="reg" defaultValue="RC-4482119" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ind">Industry</Label>
              <Input id="ind" defaultValue="Oil & Gas — Upstream and Midstream" />
            </div>
            <Button onClick={() => toast.success("Organization settings saved")}>Save</Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Security policy</CardTitle>
            <CardDescription>Applies to every user in this organization.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ["Require MFA for all users", true],
              ["Enforce 90-day password rotation", true],
              ["Block sign-in from new countries", false],
              ["Auto sign-out after 30 minutes idle", true],
              ["Email alerts for critical incidents", true],
            ].map(([label, on]) => (
              <div key={label as string} className="flex items-center justify-between gap-4">
                <span className="text-sm">{label}</span>
                <Switch defaultChecked={on as boolean} onCheckedChange={() => toast.success("Policy updated")} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

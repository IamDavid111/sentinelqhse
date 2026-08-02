import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/change-password")({
  head: () => ({
    meta: [
      { title: "Change password — SentinelQHSE™" },
      { name: "description", content: "Update the password on your SentinelQHSE account." },
      { property: "og:title", content: "Change password — SentinelQHSE™" },
      { property: "og:description", content: "Update the password on your account." },
    ],
  }),
  component: ChangePassword,
});

function ChangePassword() {
  const navigate = useNavigate();
  return (
    <AuthLayout title="Change your password" description="For security, you'll stay signed in on this device only.">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Password changed", { description: "Activity has been recorded in the audit log." });
          navigate({ to: "/app" });
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="current">Current password</Label>
          <Input id="current" type="password" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="next">New password</Label>
          <Input id="next" type="password" minLength={12} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm new password</Label>
          <Input id="confirm" type="password" minLength={12} required />
        </div>
        <Button type="submit" size="lg" className="w-full">
          Update password
        </Button>
      </form>
    </AuthLayout>
  );
}

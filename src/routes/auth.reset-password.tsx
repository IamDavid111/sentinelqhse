import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password — SentinelQHSE™" },
      { name: "description", content: "Choose a new password for your SentinelQHSE account." },
      { property: "og:title", content: "Set a new password — SentinelQHSE™" },
      { property: "og:description", content: "Choose a new password for your account." },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  return (
    <AuthLayout
      title="Set a new password"
      description="Use at least 12 characters with a mix of letters, numbers and symbols."
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Password updated", { description: "You can now sign in with your new password." });
          navigate({ to: "/auth/login" });
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="pw">New password</Label>
          <Input id="pw" type="password" minLength={12} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pw2">Confirm new password</Label>
          <Input id="pw2" type="password" minLength={12} required />
        </div>
        <Button type="submit" size="lg" className="w-full">
          Update password
        </Button>
      </form>
    </AuthLayout>
  );
}

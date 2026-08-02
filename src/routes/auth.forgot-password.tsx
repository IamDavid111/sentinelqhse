import { Link, createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — SentinelQHSE™" },
      { name: "description", content: "Request a secure password reset link for your SentinelQHSE account." },
      { property: "og:title", content: "Reset your password — SentinelQHSE™" },
      { property: "og:description", content: "Request a secure password reset link." },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  return (
    <AuthLayout
      title="Forgot your password?"
      description="Enter your work email and we'll send a secure reset link valid for 30 minutes."
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Reset link sent", { description: "Check your inbox for the recovery email." });
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" required placeholder="you@company.com" />
        </div>
        <Button type="submit" size="lg" className="w-full">
          Send reset link
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          <Link to="/auth/login" className="font-medium text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

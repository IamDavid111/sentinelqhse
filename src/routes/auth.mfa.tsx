import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const Route = createFileRoute("/auth/mfa")({
  head: () => ({
    meta: [
      { title: "Multi-factor authentication — SentinelQHSE™" },
      { name: "description", content: "Confirm your identity with a one-time verification code." },
      { property: "og:title", content: "Multi-factor authentication — SentinelQHSE™" },
      { property: "og:description", content: "Confirm your identity with a one-time code." },
    ],
  }),
  component: MfaPage,
});

function MfaPage() {
  const navigate = useNavigate();
  return (
    <AuthLayout
      title="Multi-factor authentication"
      description="Enter the 6-digit code from your authenticator app. (Placeholder — any code is accepted in this preview.)"
    >
      <div className="space-y-6">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <Button
          size="lg"
          className="w-full"
          onClick={() => {
            toast.success("Verified");
            navigate({ to: "/app" });
          }}
        >
          Verify and continue
        </Button>
        <p className="text-sm text-muted-foreground">
          Lost your device? Contact your organization administrator to reset enrolment.
        </p>
      </div>
    </AuthLayout>
  );
}

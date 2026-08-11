import { Lock, ShieldCheck } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { readSession, signIn } from "@/lib/session";

export const ADMIN_ROLES_ALLOWED = ["Super Administrator", "Organization Administrator", "Administrator"];

export function AdminGuard({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(readSession().role);
  }, []);

  if (role === null) return null;

  if (ADMIN_ROLES_ALLOWED.includes(role)) return <>{children}</>;

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-lg shadow-card">
        <CardHeader className="items-start">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-warning/12 text-warning">
            <Lock className="h-5 w-5" />
          </span>
          <CardTitle className="mt-3">Administrator access required</CardTitle>
          <CardDescription>
            You are signed in as <span className="font-medium text-foreground">{role}</span>. The administration console is
            restricted to Super Administrators and Organization Administrators.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Ask your organization administrator to elevate your role, or continue in demo mode to explore the console.
          </p>
          <Button
            className="w-full"
            onClick={() => {
              signIn({ role: "Super Administrator" });
              setRole("Super Administrator");
              toast.success("Demo elevation applied", { description: "You are now viewing as Super Administrator." });
            }}
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            Continue as Super Administrator (demo)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

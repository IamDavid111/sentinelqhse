import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Building2, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/session";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Sign in — SentinelQHSE™" },
      { name: "description", content: "Sign in to your SentinelQHSE operational safety intelligence workspace." },
      { property: "og:title", content: "Sign in — SentinelQHSE™" },
      { property: "og:description", content: "Secure access to your organization's QHSE workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("adaeze.okonkwo@northgateenergy.com");
  const [password, setPassword] = useState("demo-password");
  const [code, setCode] = useState("NGE-001");
  const [showPassword, setShowPassword] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      signIn({ email, companyCode: code });
      toast.success("Signed in", { description: "Welcome back to SentinelQHSE." });
      navigate({ to: "/app" });
    }, 600);
  };

  return (
    <AuthLayout title="Sign in to SentinelQHSE™" description="Access your organization's operational safety workspace.">
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company code</Label>
          <div className="relative">
            <Building2 className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="company" value={code} onChange={(e) => setCode(e.target.value)} className="pl-9" placeholder="NGE-001" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9"
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-9 pr-10"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox defaultChecked /> Remember me
          </label>
          <Link to="/auth/forgot-password" className="text-sm font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Signing you in…" : "Sign in"}
        </Button>

        <div className="grid gap-2 text-center text-sm text-muted-foreground">
          <span>
            No organization yet?{" "}
            <Link to="/auth/register" className="font-medium text-primary hover:underline">
              Register your company
            </Link>
          </span>
          <Link to="/auth/mfa" className="text-xs hover:underline">
            Sign in with multi-factor authentication
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { signIn } from "@/lib/session";

export const Route = createFileRoute("/auth/register")({
  head: () => ({
    meta: [
      { title: "Register your organization — SentinelQHSE™" },
      {
        name: "description",
        content: "Create a SentinelQHSE tenant for your energy company. The first registered user becomes Super Administrator.",
      },
      { property: "og:title", content: "Register your organization — SentinelQHSE™" },
      { property: "og:description", content: "Create a multi-tenant SentinelQHSE workspace for your company." },
    ],
  }),
  component: RegisterPage,
});

const INDUSTRIES = ["Upstream E&P", "Midstream", "Downstream / Refining", "Oilfield Services", "Marine & Offshore"];
const TYPES = ["Operator", "Contractor", "Joint Venture", "Regulator", "Service Company"];
const SIZES = ["1–50", "51–250", "251–1,000", "1,001–5,000", "5,000+"];

function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  return (
    <AuthLayout
      title="Register your organization"
      description="SentinelQHSE is multi-tenant. The first registered user of an organization automatically becomes its Super Administrator."
      footer={
        <span>
          Already registered?{" "}
          <Link to="/auth/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </span>
      }
    >
      <div className="mb-6 flex items-center gap-2 text-xs font-medium">
        {["Company", "Location", "Administrator"].map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${
                step > i + 1
                  ? "bg-primary text-primary-foreground"
                  : step === i + 1
                    ? "bg-primary/15 text-primary ring-1 ring-primary/40"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {step > i + 1 ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <span className={step === i + 1 ? "text-foreground" : "text-muted-foreground"}>{label}</span>
          </div>
        ))}
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 3) {
            setStep(step + 1);
            return;
          }
          signIn({ role: "Super Administrator" });
          toast.success("Organization created", {
            description: "You are now the Super Administrator for this tenant.",
          });
          navigate({ to: "/app" });
        }}
      >
        {step === 1 && (
          <>
            <div className="space-y-2">
              <Label htmlFor="company">Company name</Label>
              <Input id="company" required placeholder="Northgate Energy Plc" />
            </div>
            <div className="space-y-2">
              <Label>Company logo</Label>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border px-4 py-4 text-sm text-muted-foreground hover:bg-muted/50">
                <Upload className="h-4 w-4" /> Upload PNG or SVG (max 2MB)
                <input type="file" accept="image/*" className="sr-only" />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Industry</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rc">Registration number</Label>
                <Input id="rc" placeholder="RC 1029384" />
              </div>
              <div className="space-y-2">
                <Label>Company type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {TYPES.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Company size</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {SIZES.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i} employees
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" placeholder="Nigeria" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State / Province</Label>
                <Input id="state" placeholder="Rivers" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Registered address</Label>
              <Textarea id="address" rows={3} placeholder="Plot 14, Trans Amadi Industrial Layout" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cemail">Contact email</Label>
                <Input id="cemail" type="email" placeholder="hse@company.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cphone">Contact phone</Label>
                <Input id="cphone" placeholder="+234 800 000 0000" required />
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="rounded-lg border border-primary/25 bg-primary/8 p-4 text-sm">
              This account will be created as the <span className="font-semibold text-primary">Super Administrator</span>{" "}
              for the organization.
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fname">Full name</Label>
                <Input id="fname" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Job title</Label>
                <Input id="title" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="aemail">Work email</Label>
              <Input id="aemail" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apw">Password</Label>
              <Input id="apw" type="password" minLength={12} required />
            </div>
          </>
        )}

        <div className="flex gap-3 pt-2">
          {step > 1 && (
            <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          <Button type="submit" className="flex-1" size="lg">
            {step === 3 ? "Create organization" : "Continue"}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}

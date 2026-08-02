import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Download,
  FileText,
  Image as ImageIcon,
  Mic,
  Sparkles,
  Video,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/app/app-shell";
import { StatusPill } from "@/components/status-pill";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CORRECTIVE_ACTIONS, INCIDENTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/incidents/$id")({
  loader: ({ params }) => {
    const incident = INCIDENTS.find((i) => i.id === params.id);
    if (!incident) throw notFound();
    return { incident };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.incident.ref} — Incident detail — SentinelQHSE™` },
          { name: "description", content: loaderData.incident.title },
          { property: "og:title", content: `${loaderData.incident.ref} — SentinelQHSE™` },
          { property: "og:description", content: loaderData.incident.title },
        ]
      : [{ title: "Incident unavailable — SentinelQHSE™" }, { name: "robots", content: "noindex" }],
  }),
  component: IncidentDetail,
});

const WORKFLOW = [
  "Incident Reported",
  "Reference Number Issued",
  "Notification Sent",
  "Assigned to Investigator",
  "Investigation Started",
  "Root Cause Analysis",
  "Corrective Actions Created",
  "Verification",
  "Closure Approval",
  "Incident Closed",
];

function IncidentDetail() {
  const { incident } = Route.useLoaderData();
  const currentStep = 5;

  return (
    <>
      <Button variant="ghost" size="sm" asChild className="mb-3 -ml-2">
        <Link to="/app/incidents">
          <ArrowLeft className="mr-1.5 h-4 w-4" /> All incidents
        </Link>
      </Button>

      <PageHeader
        title={incident.title}
        description={`${incident.ref} · ${incident.category} · ${incident.site} · reported ${incident.date} by ${incident.reporter}`}
        actions={
          <>
            <StatusPill value={incident.severity} />
            <StatusPill value={incident.status} />
            <Button variant="outline" onClick={() => toast.success("PDF report generated")}>
              <Download className="mr-1.5 h-4 w-4" /> Export
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>Close incident</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Close {incident.ref}?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Closure requires verified corrective actions. This action is recorded in the audit trail and cannot be
                    undone without QHSE Manager approval.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => toast.success("Incident closed")}>Confirm closure</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        }
      />

      <Card className="mb-4 shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Workflow progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-5">
            {WORKFLOW.map((s, i) => (
              <li key={s} className="flex items-start gap-2">
                {i <= currentStep ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" />
                )}
                <span className={cn("text-xs", i <= currentStep ? "font-medium" : "text-muted-foreground")}>{s}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList className="flex w-full flex-wrap justify-start">
          {["overview", "evidence", "timeline", "investigation", "actions", "comments", "history", "ai"].map((t) => (
            <TabsTrigger key={t} value={t} className="capitalize">
              {t === "ai" ? "AI summary" : t === "actions" ? "Corrective actions" : t}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <Card className="shadow-card">
            <CardContent className="grid gap-6 pt-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h3 className="text-sm font-semibold">Description</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{incident.description}</p>
                <Separator className="my-5" />
                <h3 className="text-sm font-semibold">Immediate actions taken</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Area isolated and evacuated, permit suspended, and the shift supervisor notified control room within four
                  minutes of detection.
                </p>
              </div>
              <dl className="space-y-3 text-sm">
                {[
                  ["Reference", incident.ref],
                  ["Category", incident.category],
                  ["Department", incident.department],
                  ["Site", incident.site],
                  ["Reporter", incident.reporter],
                  ["Assignee", incident.assignee],
                  ["Contractor", incident.contractor ?? "—"],
                  ["Date", incident.date],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evidence">
          <Card className="shadow-card">
            <CardContent className="grid gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: ImageIcon, name: "separator-inlet-01.jpg", meta: "2.4 MB · photo" },
                { icon: Video, name: "gas-detector-clip.mp4", meta: "18.1 MB · video" },
                { icon: FileText, name: "shift-log-extract.pdf", meta: "310 KB · document" },
                { icon: Mic, name: "operator-statement.m4a", meta: "1.2 MB · voice note" },
              ].map((f) => (
                <div key={f.name} className="rounded-xl border border-border p-4">
                  <f.icon className="h-5 w-5 text-primary" />
                  <p className="mt-3 truncate text-sm font-medium">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.meta}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <ol className="space-y-4 border-l border-border pl-5">
                {[
                  ["14:37", "Incident reported by Musa Bello via mobile app"],
                  ["14:38", "Reference INC-2026-0418 issued, notifications dispatched"],
                  ["14:52", "Assigned to Adaeze Okonkwo for investigation"],
                  ["15:40", "Area isolation verified by control room"],
                  ["09:41", "Root cause analysis session scheduled"],
                ].map(([t, d]) => (
                  <li key={d} className="relative">
                    <span className="absolute top-1.5 -left-[26px] h-2.5 w-2.5 rounded-full bg-primary" />
                    <p className="text-sm font-medium">{d}</p>
                    <p className="text-xs text-muted-foreground">{t}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investigation">
          <Card className="shadow-card">
            <CardContent className="space-y-4 pt-6 text-sm">
              <p>
                <span className="font-semibold">Method:</span> 5-Why with barrier analysis. Lead investigator: Adaeze
                Okonkwo. Target completion: 8 Aug 2026.
              </p>
              <p className="text-muted-foreground">
                Preliminary findings point to a degraded flange gasket combined with an incomplete pressure-let-down step
                during the changeover procedure.
              </p>
              <Textarea rows={4} placeholder="Add investigation finding…" />
              <Button onClick={() => toast.success("Finding recorded")}>Add finding</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions">
          <Card className="shadow-card">
            <CardContent className="space-y-3 pt-6">
              {CORRECTIVE_ACTIONS.slice(0, 3).map((a) => (
                <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {a.id} · {a.assignee} · due {a.due}
                    </p>
                  </div>
                  <StatusPill value={a.status} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comments">
          <Card className="shadow-card">
            <CardContent className="space-y-4 pt-6">
              <div className="rounded-lg border p-3">
                <p className="text-sm">Control room confirms detector calibration was current as of 14 July.</p>
                <p className="mt-1 text-xs text-muted-foreground">Ruth Adeyemi · yesterday 16:20</p>
              </div>
              <Textarea rows={3} placeholder="Add a comment…" />
              <Button onClick={() => toast.success("Comment posted")}>Post comment</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="shadow-card">
            <CardContent className="space-y-2 pt-6 text-sm text-muted-foreground">
              {[
                "Status changed Assigned → Under Investigation · Adaeze Okonkwo · 01 Aug 14:52",
                "Severity changed High → Critical · Emeka Duru · 01 Aug 15:10",
                "Evidence uploaded (3 files) · Musa Bello · 01 Aug 14:44",
              ].map((h) => (
                <p key={h}>{h}</p>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-primary" /> AI incident analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5 text-sm lg:grid-cols-2">
              {[
                [
                  "Executive summary",
                  "A hydrocarbon vapour release was detected at the separator inlet during a routine changeover. Isolation and evacuation were completed within four minutes with no injuries or ignition.",
                ],
                [
                  "Possible root causes",
                  "Degraded flange gasket; incomplete depressurisation step; procedure not updated after the 2025 tie-in modification.",
                ],
                [
                  "Potential consequences",
                  "Under ignition conditions this scenario could escalate to a jet fire with fatality potential and 48+ hours of production loss.",
                ],
                [
                  "Suggested immediate actions",
                  "Replace the gasket population on inlet flanges; verify gas detector coverage; re-brief the changeover procedure across all shifts.",
                ],
                [
                  "Long-term recommendations",
                  "Add flange integrity to the mechanical integrity inspection scope and introduce a permit checkpoint for depressurisation verification.",
                ],
                [
                  "Similar historical incidents",
                  "INC-2025-0287 (Escravos, gasket failure) and INC-2024-0912 (Flow Station A, vapour release during changeover).",
                ],
              ].map(([title, body]) => (
                <div key={title}>
                  <p className="font-semibold">{title}</p>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

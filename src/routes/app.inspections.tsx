import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, MinusCircle, Plus, XCircle } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/app/app-shell";
import { StatusPill } from "@/components/status-pill";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { INSPECTIONS, INSPECTION_TYPES, SITES } from "@/lib/mock-data";

export const Route = createFileRoute("/app/inspections")({
  head: () => ({
    meta: [
      { title: "Safety Inspections — SentinelQHSE™" },
      { name: "description", content: "Schedule, conduct and approve field inspections and safety observations." },
      { property: "og:title", content: "Safety Inspections — SentinelQHSE™" },
      { property: "og:description", content: "Digital inspection templates, checklists and observations." },
    ],
  }),
  component: InspectionsPage,
});

const CHECKLIST = [
  "PPE worn correctly by all personnel in the area",
  "Access routes and walkways clear of obstruction",
  "Emergency equipment accessible and in date",
  "Permit displayed and matches the work in progress",
  "Gas testing records current for the task",
  "Housekeeping standards maintained at the worksite",
];

function InspectionsPage() {
  return (
    <>
      <PageHeader
        title="Safety Inspections"
        description="Fifteen inspection types plus custom templates. Failed checklist items automatically raise recommendations."
        actions={
          <Button onClick={() => toast.success("Inspection scheduled")}>
            <Plus className="mr-1.5 h-4 w-4" /> Schedule inspection
          </Button>
        }
      />

      <Tabs defaultValue="register">
        <TabsList>
          <TabsTrigger value="register">Inspection register</TabsTrigger>
          <TabsTrigger value="conduct">Conduct inspection</TabsTrigger>
          <TabsTrigger value="observations">Safety observations</TabsTrigger>
        </TabsList>

        <TabsContent value="register">
          <Card className="shadow-card">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead className="min-w-[240px]">Inspection</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Site</TableHead>
                    <TableHead>Inspector</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Findings</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {INSPECTIONS.map((i) => (
                    <TableRow key={i.id}>
                      <TableCell className="font-mono text-xs">{i.id}</TableCell>
                      <TableCell className="font-medium">{i.title}</TableCell>
                      <TableCell className="text-sm">{i.type}</TableCell>
                      <TableCell className="text-sm">{i.site}</TableCell>
                      <TableCell className="text-sm">{i.inspector}</TableCell>
                      <TableCell className="text-sm whitespace-nowrap">{i.date}</TableCell>
                      <TableCell className="text-sm">{i.findings}</TableCell>
                      <TableCell className="text-sm font-semibold">{i.score ? `${i.score}%` : "—"}</TableCell>
                      <TableCell>
                        <StatusPill value={i.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="conduct">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="shadow-card lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Checklist</CardTitle>
                <CardDescription>Mark each item Pass, Fail or Not applicable. Failures create recommendations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {CHECKLIST.map((c) => (
                  <div key={c} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3">
                    <span className="text-sm">{c}</span>
                    <div className="flex gap-1.5">
                      <Button size="sm" variant="outline" onClick={() => toast.success("Marked pass")}>
                        <CheckCircle2 className="mr-1 h-4 w-4 text-primary" /> Pass
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => toast.warning("Recommendation created")}>
                        <XCircle className="mr-1 h-4 w-4 text-danger" /> Fail
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MinusCircle className="mr-1 h-4 w-4" /> N/A
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Inspection details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ititle">Title</Label>
                  <Input id="ititle" placeholder="Weekly PPE walkthrough" />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {INSPECTION_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Site</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select site" />
                    </SelectTrigger>
                    <SelectContent>
                      {SITES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="findings">Findings & recommendations</Label>
                  <Textarea id="findings" rows={4} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sig">Digital signature</Label>
                  <Input id="sig" placeholder="Type your full name" />
                </div>
                <Button className="w-full" onClick={() => toast.success("Inspection submitted for approval")}>
                  Submit inspection
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="observations">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Submit an observation</CardTitle>
                <CardDescription>Safe act, unsafe act, unsafe condition or positive observation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Safe Act", "Unsafe Act", "Unsafe Condition", "Positive Observation"].map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Risk level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Low", "Medium", "High", "Critical"].map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="oloc">Location</Label>
                  <Input id="oloc" placeholder="Pump skid 3, east walkway" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="odesc">Description</Label>
                  <Textarea id="odesc" rows={3} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="oimp">Suggested improvement</Label>
                  <Textarea id="oimp" rows={2} />
                </div>
                <Button className="w-full" onClick={() => toast.success("Observation submitted")}>
                  Submit observation
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Recent observations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  ["Unsafe Condition", "Oil film on grating near pump skid 3", "High"],
                  ["Positive Observation", "Crew stopped the job to re-verify gas test", "Low"],
                  ["Unsafe Act", "Bypassing barricade to shorten route", "Medium"],
                  ["Safe Act", "Correct manual handling technique observed", "Low"],
                ].map(([cat, text, risk]) => (
                  <div key={text} className="flex items-start justify-between gap-3 rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-medium">{text}</p>
                      <p className="text-xs text-muted-foreground">{cat}</p>
                    </div>
                    <StatusPill value={risk} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

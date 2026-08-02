import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, FileUp, MapPin, Mic, PenLine, Save, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DEPARTMENTS, INCIDENT_CATEGORIES, SEVERITIES, SITES } from "@/lib/mock-data";

export const Route = createFileRoute("/app/incidents/new")({
  head: () => ({
    meta: [
      { title: "Report an Incident — SentinelQHSE™" },
      { name: "description", content: "Capture near misses, unsafe conditions and incidents with evidence from the field." },
      { property: "og:title", content: "Report an Incident — SentinelQHSE™" },
      { property: "og:description", content: "Capture incidents with photo, video, voice and GPS evidence." },
    ],
  }),
  component: ReportIncident,
});

const STEPS = ["Event", "Location & context", "People", "Evidence & sign-off"];

function ReportIncident() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      toast.success("Draft auto-saved");
      return;
    }
    toast.success("Incident submitted", { description: "Reference INC-2026-0419 · investigator notified." });
    navigate({ to: "/app/incidents" });
  };

  return (
    <>
      <PageHeader
        title="Report an incident"
        description="Progressive form — drafts are auto-saved and can be submitted offline; they sync when connectivity returns."
        actions={
          <Button variant="outline" onClick={() => toast.success("Draft saved")}>
            <Save className="mr-1.5 h-4 w-4" /> Save draft
          </Button>
        }
      />

      <div className="mb-5">
        <Progress value={((step + 1) / STEPS.length) * 100} className="h-1.5" />
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs">
          {STEPS.map((s, i) => (
            <span key={s} className={i === step ? "font-medium text-primary" : "text-muted-foreground"}>
              {i + 1}. {s}
            </span>
          ))}
        </div>
      </div>

      <form
        className="grid gap-4 xl:grid-cols-3"
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
      >
        <div className="space-y-4 xl:col-span-2">
          {step === 0 && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">What happened?</CardTitle>
                <CardDescription>Required fields are validated before you can continue.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Incident title *</Label>
                  <Input id="title" required placeholder="Short factual description" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {INCIDENT_CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Severity *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        {SEVERITIES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Routine", "Elevated", "Urgent", "Emergency"].map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input id="date" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time *</Label>
                      <Input id="time" type="time" required />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Description *</Label>
                  <Textarea id="desc" rows={5} required placeholder="Describe the sequence of events factually." />
                </div>
              </CardContent>
            </Card>
          )}

          {step === 1 && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Where and under what conditions?</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Site *</Label>
                  <Select required>
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
                  <Label htmlFor="facility">Facility / area</Label>
                  <Input id="facility" placeholder="Separator area, Train 2" />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gps">GPS coordinates</Label>
                  <div className="flex gap-2">
                    <Input id="gps" placeholder="4.8156, 7.0498" />
                    <Button type="button" variant="outline" size="icon" onClick={() => toast.success("Location captured")}>
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weather">Weather conditions</Label>
                  <Input id="weather" placeholder="32°C, light rain, wind 12 kt" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equip">Equipment involved</Label>
                  <Input id="equip" placeholder="Compressor K-201" />
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Who was involved?</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="reporter">Reporter name *</Label>
                    <Input id="reporter" defaultValue="Adaeze Okonkwo" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contractor">Contractor involved</Label>
                    <Input id="contractor" placeholder="Delta Lift Services" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="people">People involved</Label>
                  <Textarea id="people" rows={3} placeholder="Names, roles and injuries sustained" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="witness">Witnesses</Label>
                  <Textarea id="witness" rows={2} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="actions">Immediate actions taken *</Label>
                  <Textarea id="actions" rows={3} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cause">Potential root cause</Label>
                  <Textarea id="cause" rows={2} />
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Evidence and sign-off</CardTitle>
                <CardDescription>Images, PDF, Word, Excel, video and voice notes are supported.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: Camera, label: "Photos / video" },
                    { icon: FileUp, label: "Documents" },
                    { icon: Mic, label: "Voice recording" },
                  ].map((u) => (
                    <label
                      key={u.label}
                      className="flex h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:bg-muted/50"
                    >
                      <u.icon className="h-5 w-5" />
                      {u.label}
                      <input type="file" multiple className="sr-only" />
                    </label>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sign">Digital signature *</Label>
                  <div className="flex items-center gap-2">
                    <PenLine className="h-4 w-4 text-muted-foreground" />
                    <Input id="sign" required placeholder="Type your full name to sign" />
                  </div>
                </div>
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Checkbox required className="mt-0.5" />I confirm this report is accurate to the best of my knowledge.
                </label>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3">
            {step > 0 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            <Button type="submit" size="lg" className="ml-auto">
              {step === STEPS.length - 1 ? (
                <>
                  <Send className="mr-1.5 h-4 w-4" /> Submit incident
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Quick-report templates</CardTitle>
              <CardDescription>Prefill common field events</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              {["Near miss", "Unsafe condition", "Slip / trip / fall", "Minor spill", "Vehicle incident"].map((t) => (
                <Button
                  key={t}
                  type="button"
                  variant="outline"
                  className="h-12 justify-start"
                  onClick={() => toast.success(`${t} template applied`)}
                >
                  {t}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Field mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Large touch targets for gloved hands, one-handed layout and automatic GPS capture are enabled.</p>
              <p>Offline reports queue on the device and sync automatically when connectivity is restored.</p>
              <Button type="button" variant="secondary" className="w-full" onClick={() => toast.success("Voice-to-text recording started")}>
                <Mic className="mr-2 h-4 w-4" /> Voice-to-text report
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Activity, AlertTriangle, BrainCircuit, Lightbulb, MapPin, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { PageHeader } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AI_RISK_PREDICTIONS,
  AI_SAFETY_CARDS,
  AI_SUMMARY_TEMPLATES,
  EXEC_AI_INSIGHTS,
  NEAR_MISS_CATEGORIES,
  NEAR_MISS_LOCATIONS,
  NEAR_MISS_RECOMMENDATIONS,
  NEAR_MISS_SUMMARY,
  NEAR_MISS_TREND,
} from "@/lib/intelligence-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ai-intelligence")({
  head: () => ({
    meta: [
      { title: "AI Safety Intelligence — SentinelQHSE™" },
      {
        name: "description",
        content: "AI risk scoring, near-miss analysis, predictive facility risk and executive safety insights.",
      },
      { property: "og:title", content: "AI Safety Intelligence — SentinelQHSE™" },
      { property: "og:description", content: "Predictive safety analytics and AI insights across your facilities." },
    ],
  }),
  component: IntelligencePage,
});

const TONE: Record<string, string> = {
  danger: "text-danger",
  warning: "text-warning",
  info: "text-accent",
  success: "text-primary",
};

const RISK_BADGE: Record<string, string> = {
  High: "bg-danger/12 text-danger ring-1 ring-danger/25",
  Medium: "bg-warning/12 text-warning ring-1 ring-warning/25",
  Low: "bg-primary/12 text-primary ring-1 ring-primary/25",
};

function IntelligencePage() {
  const [summaryId, setSummaryId] = useState(AI_SUMMARY_TEMPLATES[0]!.id);
  const summary = AI_SUMMARY_TEMPLATES.find((s) => s.id === summaryId)!;

  return (
    <>
      <PageHeader
        title="AI Safety Intelligence"
        description="Move from recording incidents to understanding trends and preventing risk. Models refresh hourly."
      />

      {/* AI safety dashboard cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {AI_SAFETY_CARDS.map((c) => (
          <Card key={c.label} className="shadow-card">
            <CardContent className="pt-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{c.label}</p>
                <Sparkles className={cn("h-4 w-4", TONE[c.tone])} />
              </div>
              <p className={cn("mt-2 text-2xl font-semibold", TONE[c.tone])}>{c.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI incident summary */}
      <Card className="mt-4 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BrainCircuit className="h-4 w-4 text-accent" /> AI incident summary
          </CardTitle>
          <CardDescription>Plain-language summaries generated from the raw incident report.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {AI_SUMMARY_TEMPLATES.map((t) => (
              <Button
                key={t.id}
                size="sm"
                variant={t.id === summaryId ? "default" : "outline"}
                onClick={() => setSummaryId(t.id)}
              >
                {t.title}
              </Button>
            ))}
          </div>
          <div className="mt-4 rounded-lg border bg-accent/5 p-4">
            <Badge variant="secondary" className="mb-2">
              AI generated
            </Badge>
            <p className="text-sm leading-relaxed">{summary.summary}</p>
          </div>
        </CardContent>
      </Card>

      {/* Near-miss analysis */}
      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card className="shadow-card xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4 text-accent" /> Near-miss analysis
            </CardTitle>
            <CardDescription>
              {NEAR_MISS_SUMMARY.total} near misses recorded · {NEAR_MISS_SUMMARY.monthChange} month-on-month · most
              frequent category: {NEAR_MISS_SUMMARY.topCategory}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={NEAR_MISS_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
                <Line type="monotone" dataKey="nearMisses" stroke="var(--accent)" strokeWidth={2} />
                <Line type="monotone" dataKey="incidents" stroke="var(--danger)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Hazard categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {NEAR_MISS_CATEGORIES.map((c) => (
              <div key={c.category}>
                <div className="flex items-center justify-between text-sm">
                  <span>{c.category}</span>
                  <span className="font-semibold">{c.count}</span>
                </div>
                <Progress value={(c.count / NEAR_MISS_CATEGORIES[0]!.count) * 100} className="mt-1.5 h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4 text-warning" /> Top three high-risk locations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {NEAR_MISS_LOCATIONS.map((l, i) => (
              <div key={l.location} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-warning/12 text-xs font-semibold text-warning">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{l.location}</p>
                    <p className="text-xs text-muted-foreground">{l.note}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold">{l.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="h-4 w-4 text-primary" /> AI recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {NEAR_MISS_RECOMMENDATIONS.map((r) => (
              <div key={r} className="flex gap-2.5 rounded-lg border p-3 text-sm">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{r}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Predictive dashboard */}
      <Card className="mt-4 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-4 w-4 text-danger" /> AI safety risk prediction
          </CardTitle>
          <CardDescription>14-day predicted risk with confidence and suggested preventive actions.</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Facility</TableHead>
                  <TableHead>Predicted risk</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Key drivers</TableHead>
                  <TableHead>Recommended actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {AI_RISK_PREDICTIONS.map((p) => (
                  <TableRow key={p.facility}>
                    <TableCell className="font-medium">{p.facility}</TableCell>
                    <TableCell>
                      <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", RISK_BADGE[p.risk])}>
                        {p.risk}
                      </span>
                    </TableCell>
                    <TableCell className="w-40">
                      <div className="flex items-center gap-2">
                        <Progress value={p.confidence} className="h-1.5 w-20" />
                        <span className="text-xs font-semibold">{p.confidence}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[220px] text-xs text-muted-foreground">{p.drivers}</TableCell>
                    <TableCell>
                      <ul className="space-y-1 text-xs">
                        {p.actions.map((a) => (
                          <li key={a} className="flex items-center gap-1.5">
                            <span className="h-1 w-1 rounded-full bg-primary" /> {a}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Executive insights */}
      <Card className="mt-4 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4 text-primary" /> Executive safety insights
          </CardTitle>
          <CardDescription>AI-generated observations from the last 90 days of operational data.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {EXEC_AI_INSIGHTS.map((i) => (
              <div key={i.text} className="rounded-lg border bg-card p-4">
                <Badge variant="secondary" className="mb-2">
                  {i.tag}
                </Badge>
                <p className="text-sm leading-relaxed">{i.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4 shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Near-miss vs incident volume by month</CardTitle>
        </CardHeader>
        <CardContent className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={NEAR_MISS_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Legend />
              <Bar dataKey="nearMisses" fill="var(--accent)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="incidents" fill="var(--danger)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}

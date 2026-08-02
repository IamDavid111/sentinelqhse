import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { PageHeader } from "@/components/app/app-shell";
import { StatusPill } from "@/components/status-pill";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AI_INSIGHTS, DEPARTMENT_COMPARISON, MONTHLY_TREND, RISK_PREDICTIONS, SITE_STATUS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/ai-intelligence")({
  head: () => ({
    meta: [
      { title: "Risk Intelligence — SentinelQHSE™" },
      { name: "description", content: "Predictive facility risk scores, emerging hazard patterns and AI safety insights." },
      { property: "og:title", content: "Risk Intelligence — SentinelQHSE™" },
      { property: "og:description", content: "Predictive safety analytics across your facilities." },
    ],
  }),
  component: IntelligencePage,
});

function IntelligencePage() {
  return (
    <>
      <PageHeader
        title="Risk Intelligence"
        description="Predictive risk modelling across facilities, shifts and contractor crews, refreshed hourly."
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="shadow-card xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Incident vs near-miss trend</CardTitle>
            <CardDescription>Rising near-miss reporting with falling recordables is a healthy signal.</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
                <Line type="monotone" dataKey="incidents" stroke="var(--danger)" strokeWidth={2} />
                <Line type="monotone" dataKey="nearMisses" stroke="var(--primary)" strokeWidth={2} />
                <Line type="monotone" dataKey="ltis" stroke="var(--accent)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" /> AI insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {AI_INSIGHTS.map((i) => (
              <div key={i.title} className="rounded-lg border p-3">
                <Badge variant="secondary" className="mb-1.5">
                  {i.tag}
                </Badge>
                <p className="text-sm font-medium">{i.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{i.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {RISK_PREDICTIONS.map((f) => (
          <Card key={f.site} className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertTriangle className="h-4 w-4 text-warning" /> {f.site}
              </CardTitle>
              <CardDescription>Predicted risk over the next 14 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {f.risks.map((r) => (
                <div key={r.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{r.label}</span>
                    <span className="font-semibold">{r.value}%</span>
                  </div>
                  <Progress value={r.value} className="mt-1.5 h-1.5" />
                  <p className="mt-1 text-xs text-muted-foreground">{r.drivers}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Department comparison</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEPARTMENT_COMPARISON}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="department" stroke="var(--muted-foreground)" fontSize={11} interval={0} angle={-15} height={50} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
                <Bar dataKey="incidents" fill="var(--danger)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actions" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Facility risk ranking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[...SITE_STATUS]
              .sort((a, b) => a.safetyScore - b.safetyScore)
              .map((s) => (
                <div key={s.site} className="flex items-center justify-between gap-3 rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{s.site}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.openIncidents} open · last event {s.lastEvent}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-sm font-semibold">
                      {s.safetyScore >= 85 ? (
                        <TrendingUp className="h-4 w-4 text-primary" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-danger" />
                      )}
                      {s.safetyScore}
                    </span>
                    <StatusPill value={s.status} />
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

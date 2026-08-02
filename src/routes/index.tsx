import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bot,
  ClipboardCheck,
  Factory,
  Fuel,
  Globe2,
  HardHat,
  Layers,
  LineChart,
  Lock,
  Radar,
  Ship,
  ShieldCheck,
  Siren,
  Waves,
} from "lucide-react";

import heroImage from "@/assets/hero-facility.jpg";
import screenshot from "@/assets/screenshot-dashboard.jpg";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SentinelQHSE™ — AI-Powered Operational Safety Intelligence" },
      {
        name: "description",
        content:
          "SentinelQHSE helps oil and gas operators move from reactive incident management to predictive operational safety intelligence.",
      },
      { property: "og:title", content: "SentinelQHSE™ — Operational Safety Intelligence" },
      {
        property: "og:description",
        content: "Incident management, inspections, audits and AI risk prediction for energy operators.",
      },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  {
    icon: Siren,
    title: "Digital incident reporting",
    body: "Capture near misses to fatalities in the field with GPS, photo, video and voice evidence — online or offline.",
  },
  {
    icon: ClipboardCheck,
    title: "Inspections & audits",
    body: "Fifteen inspection types, custom templates, pass/fail checklists and audit programmes with a live calendar.",
  },
  {
    icon: Layers,
    title: "Corrective action control",
    body: "Every finding becomes a tracked action with owners, due dates, evidence and verification sign-off.",
  },
  {
    icon: Radar,
    title: "Predictive risk intelligence",
    body: "Risk scores per facility using historical incidents, observations, weather and operating context.",
  },
  {
    icon: Bot,
    title: "AI safety copilot",
    body: "Ask plain-language questions about your safety data and get summaries, charts and recommendations.",
  },
  {
    icon: Lock,
    title: "Enterprise governance",
    body: "Multi-tenant organizations, ten granular roles, full activity logging and exportable audit trails.",
  },
];

const INDUSTRIES = [
  { icon: Fuel, label: "Upstream E&P" },
  { icon: Ship, label: "Offshore & Marine" },
  { icon: Factory, label: "Refining & Petrochemical" },
  { icon: Waves, label: "Pipelines & Terminals" },
  { icon: HardHat, label: "Drilling Contractors" },
  { icon: Globe2, label: "Energy Services" },
];

const BENEFITS = [
  { stat: "48%", label: "reduction in recordable incidents within four quarters" },
  { stat: "3.1x", label: "increase in near-miss reporting from frontline crews" },
  { stat: "62%", label: "faster corrective action closure across contractors" },
  { stat: "100%", label: "auditable trail for regulator and client assurance" },
];

const TESTIMONIALS = [
  {
    quote:
      "We stopped chasing spreadsheets. Every finding now has an owner, a due date and evidence attached to it before it closes.",
    name: "HSE Director",
    org: "West African upstream operator (placeholder)",
  },
  {
    quote:
      "The risk forecast flagged heat stress at our flow station a week before we would have noticed the pattern ourselves.",
    name: "Operations Manager",
    org: "Gas processing joint venture (placeholder)",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Logo />
          <nav className="ml-6 hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
            <a href="#features" className="hover:text-foreground">
              Platform
            </a>
            <a href="#industries" className="hover:text-foreground">
              Industries
            </a>
            <a href="#benefits" className="hover:text-foreground">
              Outcomes
            </a>
            <a href="#screens" className="hover:text-foreground">
              Product
            </a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link to="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/register">Request Demo</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="Engineers reviewing safety data on an offshore oil and gas facility at dusk"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
          <div>
            <Badge className="border-primary/40 bg-primary/15 text-primary hover:bg-primary/15">
              AI-Powered Operational Safety Intelligence Platform
            </Badge>
            <h1 className="mt-5 text-4xl leading-[1.05] font-semibold text-navy-foreground sm:text-5xl lg:text-6xl">
              From reactive incident reports to predictive safety intelligence.
            </h1>
            <p className="mt-5 max-w-xl text-base text-navy-foreground/70 sm:text-lg">
              SentinelQHSE™ helps energy companies capture every event in the field, close every corrective action, and
              forecast where the next incident is most likely to happen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/auth/register">
                  Request Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-navy-foreground/25 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"
              >
                <Link to="/auth/login">Sign In</Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"
              >
                <a href="mailto:sales@sentinelqhse.com">Contact Sales</a>
              </Button>
            </div>
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4">
              {BENEFITS.map((b) => (
                <div key={b.stat}>
                  <dt className="text-2xl font-semibold text-primary">{b.stat}</dt>
                  <dd className="mt-1 text-xs leading-snug text-navy-foreground/60">{b.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="hidden lg:block">
            <div className="rounded-2xl border border-navy-foreground/15 bg-navy-foreground/5 p-4 backdrop-blur">
              <img
                src={screenshot}
                alt="SentinelQHSE executive safety dashboard"
                width={1408}
                height={912}
                loading="lazy"
                className="rounded-xl shadow-elevated"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Platform</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">One operating system for QHSE performance</h2>
          <p className="mt-3 text-muted-foreground">
            Built to the workflows international oil and gas operators already run — and to the standards their
            regulators and clients audit against.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="shadow-card transition-shadow hover:shadow-elevated">
              <CardContent className="pt-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="industries" className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold sm:text-3xl">Industries served</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {INDUSTRIES.map((i) => (
              <div
                key={i.label}
                className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center shadow-card"
              >
                <i.icon className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">{i.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Customer benefits</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Safety leaders get answers, not archives</h2>
            <ul className="mt-6 space-y-4">
              {[
                {
                  icon: ShieldCheck,
                  title: "Frontline adoption",
                  body: "Glove-friendly mobile reporting with offline sync means events get captured when they happen.",
                },
                {
                  icon: LineChart,
                  title: "Executive visibility",
                  body: "A single safety score, trend and forecast per site, department and contractor.",
                },
                {
                  icon: BarChart3,
                  title: "Assurance on demand",
                  body: "Generate inspection, audit and corrective action reports as PDF or Excel in seconds.",
                },
              ].map((b) => (
                <li key={b.title} className="flex gap-4">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <b.icon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="font-medium">{b.title}</p>
                    <p className="text-sm text-muted-foreground">{b.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div id="screens" className="rounded-2xl border border-border bg-card p-3 shadow-elevated">
            <img
              src={screenshot}
              alt="Safety analytics screens inside SentinelQHSE"
              width={1408}
              height={912}
              loading="lazy"
              className="rounded-xl"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="shadow-card">
              <CardContent className="pt-6">
                <p className="text-lg leading-relaxed">“{t.quote}”</p>
                <p className="mt-5 text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.org}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="gradient-navy text-navy-foreground">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div className="max-w-sm">
              <Logo inverted />
              <p className="mt-4 text-sm text-navy-foreground/65">
                AI-Powered Operational Safety Intelligence Platform for the energy industry.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
              <div className="space-y-2">
                <p className="font-semibold">Platform</p>
                <Link to="/app" className="block text-navy-foreground/65 hover:text-navy-foreground">
                  Dashboard
                </Link>
                <Link to="/app/incidents" className="block text-navy-foreground/65 hover:text-navy-foreground">
                  Incidents
                </Link>
                <Link to="/app/audits" className="block text-navy-foreground/65 hover:text-navy-foreground">
                  Audits
                </Link>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Company</p>
                <a href="mailto:sales@sentinelqhse.com" className="block text-navy-foreground/65 hover:text-navy-foreground">
                  Contact sales
                </a>
                <Link to="/auth/register" className="block text-navy-foreground/65 hover:text-navy-foreground">
                  Register organization
                </Link>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Access</p>
                <Link to="/auth/login" className="block text-navy-foreground/65 hover:text-navy-foreground">
                  Sign in
                </Link>
                <Link to="/auth/forgot-password" className="block text-navy-foreground/65 hover:text-navy-foreground">
                  Forgot password
                </Link>
              </div>
            </div>
          </div>
          <p className="mt-12 border-t border-navy-foreground/10 pt-6 text-xs text-navy-foreground/50">
            © 2026 SentinelQHSE™. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

import { Link, createFileRoute } from "@tanstack/react-router";
import { Archive, Download, Filter, Plus, Printer, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/app/app-shell";
import { StatusPill } from "@/components/status-pill";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { INCIDENTS, INCIDENT_CATEGORIES, INCIDENT_STATUSES, SEVERITIES, SITES } from "@/lib/mock-data";

export const Route = createFileRoute("/app/incidents/")({
  head: () => ({
    meta: [
      { title: "Incident Management — SentinelQHSE™" },
      { name: "description", content: "Search, filter, assign and close QHSE incidents across every site and contractor." },
      { property: "og:title", content: "Incident Management — SentinelQHSE™" },
      { property: "og:description", content: "Search, filter, assign and close QHSE incidents." },
    ],
  }),
  component: IncidentsPage,
});

function IncidentsPage() {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("all");
  const [status, setStatus] = useState("all");
  const [site, setSite] = useState("all");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);

  const rows = useMemo(
    () =>
      INCIDENTS.filter((i) => {
        const q = query.toLowerCase();
        const matchQuery =
          !q ||
          [i.ref, i.title, i.reporter, i.site, i.department, i.contractor ?? ""].some((v) =>
            v.toLowerCase().includes(q),
          );
        return (
          matchQuery &&
          (severity === "all" || i.severity === severity) &&
          (status === "all" || i.status === status) &&
          (site === "all" || i.site === site) &&
          (category === "all" || i.category === category)
        );
      }),
    [query, severity, status, site, category],
  );

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <>
      <PageHeader
        title="Incident Management"
        description={`${rows.length} of ${INCIDENTS.length} incidents match the current filters.`}
        actions={
          <>
            <Button variant="outline" onClick={() => toast.success("Export queued", { description: "Excel export will download shortly." })}>
              <Download className="mr-1.5 h-4 w-4" /> Export
            </Button>
            <Button asChild>
              <Link to="/app/incidents/new">
                <Plus className="mr-1.5 h-4 w-4" /> Report incident
              </Link>
            </Button>
          </>
        }
      />

      <Card className="mb-4 shadow-card">
        <CardContent className="flex flex-wrap items-center gap-3 pt-6">
          <div className="relative min-w-[240px] flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reference, title, reporter, site, contractor…"
              className="h-9 pl-9"
            />
          </div>
          {[
            { value: severity, set: setSeverity, label: "Severity", options: [...SEVERITIES] },
            { value: status, set: setStatus, label: "Status", options: [...INCIDENT_STATUSES] },
            { value: site, set: setSite, label: "Site", options: SITES },
            { value: category, set: setCategory, label: "Category", options: INCIDENT_CATEGORIES },
          ].map((f) => (
            <Select key={f.label} value={f.value} onValueChange={f.set}>
              <SelectTrigger className="h-9 w-[170px]" aria-label={f.label}>
                <SelectValue placeholder={f.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {f.label.toLowerCase()}</SelectItem>
                {f.options.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
          <Button
            variant="ghost"
            className="h-9"
            onClick={() => {
              setQuery("");
              setSeverity("all");
              setStatus("all");
              setSite("all");
              setCategory("all");
            }}
          >
            <Filter className="mr-1.5 h-4 w-4" /> Reset
          </Button>
        </CardContent>
      </Card>

      {selected.length > 0 && (
        <Card className="mb-4 border-primary/30 bg-primary/5 shadow-card">
          <CardContent className="flex flex-wrap items-center gap-3 pt-6">
            <span className="text-sm font-medium">{selected.length} selected</span>
            <Button size="sm" variant="outline" onClick={() => toast.success("Incidents assigned to investigator")}>
              Assign
            </Button>
            <Button size="sm" variant="outline" onClick={() => toast.success("Monthly report generated")}>
              Generate report
            </Button>
            <Button size="sm" variant="outline" onClick={() => toast.success("Archived")}>
              <Archive className="mr-1.5 h-4 w-4" /> Archive
            </Button>
            <Button size="sm" variant="ghost" onClick={() => window.print()}>
              <Printer className="mr-1.5 h-4 w-4" /> Print
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10" />
                <TableHead>Reference</TableHead>
                <TableHead className="min-w-[280px]">Incident</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((i) => (
                <TableRow key={i.id}>
                  <TableCell>
                    <Checkbox checked={selected.includes(i.id)} onCheckedChange={() => toggle(i.id)} aria-label="Select" />
                  </TableCell>
                  <TableCell className="font-mono text-xs">{i.ref}</TableCell>
                  <TableCell>
                    <Link to="/app/incidents/$id" params={{ id: i.id }} className="font-medium hover:text-primary">
                      {i.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      Reported by {i.reporter}
                      {i.contractor ? ` · ${i.contractor}` : ""}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm">{i.category}</TableCell>
                  <TableCell>
                    <StatusPill value={i.severity} />
                  </TableCell>
                  <TableCell>
                    <StatusPill value={i.status} />
                  </TableCell>
                  <TableCell className="text-sm">{i.site}</TableCell>
                  <TableCell className="text-sm">{i.assignee}</TableCell>
                  <TableCell className="text-sm whitespace-nowrap">{i.date}</TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="py-10 text-center text-sm text-muted-foreground">
                    No incidents match these filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}

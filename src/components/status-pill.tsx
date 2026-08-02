import { cn } from "@/lib/utils";

const toneMap: Record<string, string> = {
  Low: "bg-primary/10 text-primary border-primary/20",
  Medium: "bg-warning/15 text-warning-foreground border-warning/30 dark:text-warning",
  High: "bg-accent/15 text-accent border-accent/30",
  Critical: "bg-danger/15 text-danger border-danger/30",
  Open: "bg-muted text-muted-foreground border-border",
  Assigned: "bg-info/12 text-info border-info/25",
  "Under Investigation": "bg-info/12 text-info border-info/25",
  "In Progress": "bg-info/12 text-info border-info/25",
  "Corrective Action": "bg-accent/15 text-accent border-accent/30",
  "Awaiting Verification": "bg-warning/15 text-warning border-warning/30",
  "Pending Verification": "bg-warning/15 text-warning border-warning/30",
  Submitted: "bg-info/12 text-info border-info/25",
  Scheduled: "bg-muted text-muted-foreground border-border",
  Planned: "bg-muted text-muted-foreground border-border",
  Completed: "bg-primary/10 text-primary border-primary/20",
  Approved: "bg-primary/10 text-primary border-primary/20",
  Closed: "bg-primary/10 text-primary border-primary/20",
  Archived: "bg-muted text-muted-foreground border-border",
  Overdue: "bg-danger/15 text-danger border-danger/30",
  Active: "bg-primary/10 text-primary border-primary/20",
  Suspended: "bg-warning/15 text-warning border-warning/30",
  Deactivated: "bg-danger/15 text-danger border-danger/30",
  Invited: "bg-info/12 text-info border-info/25",
  Normal: "bg-primary/10 text-primary border-primary/20",
  Warning: "bg-warning/15 text-warning border-warning/30",
  Valid: "bg-primary/10 text-primary border-primary/20",
  Expiring: "bg-warning/15 text-warning border-warning/30",
  Expired: "bg-danger/15 text-danger border-danger/30",
};

export function StatusPill({ value, className }: { value: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        toneMap[value] ?? "bg-muted text-muted-foreground border-border",
        className,
      )}
    >
      {value}
    </span>
  );
}

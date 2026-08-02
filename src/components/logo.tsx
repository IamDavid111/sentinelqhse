import { ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

export function Logo({
  className,
  compact = false,
  inverted = false,
}: {
  className?: string;
  compact?: boolean;
  inverted?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <ShieldCheck className="h-5 w-5" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={cn("text-[15px] font-semibold tracking-tight", inverted && "text-navy-foreground")}>
            SentinelQHSE<span className="align-super text-[9px]">™</span>
          </span>
          <span
            className={cn(
              "mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground",
              inverted && "text-navy-foreground/60",
            )}
          >
            Safety Intelligence
          </span>
        </span>
      )}
    </span>
  );
}

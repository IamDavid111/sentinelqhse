import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Bell,
  Bot,
  ClipboardCheck,
  FileBarChart,
  Gauge,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  PanelLeftClose,
  Search,
  Settings,
  ShieldAlert,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
  Wrench,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NOTIFICATIONS } from "@/lib/mock-data";
import { signOut } from "@/lib/session";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/incidents/new", label: "Report Incident", icon: AlertTriangle },
  { to: "/app/incidents", label: "Incident Management", icon: ShieldAlert },
  { to: "/app/investigations", label: "Investigations", icon: Search },
  { to: "/app/corrective-actions", label: "Corrective Actions", icon: Wrench },
  { to: "/app/inspections", label: "Safety Inspections", icon: ClipboardCheck },
  { to: "/app/audits", label: "Audit Management", icon: FileBarChart },
  { to: "/app/ai-assistant", label: "AI Safety Assistant", icon: Bot },
  { to: "/app/ai-intelligence", label: "AI Safety Intelligence", icon: Sparkles },
  { to: "/app/analytics", label: "Executive Analytics", icon: Gauge },
  { to: "/app/reports", label: "Reports", icon: FileBarChart },
  { to: "/app/marketplace", label: "HSE Marketplace", icon: Store },
  { to: "/app/notifications", label: "Notifications", icon: Bell },
  { to: "/app/users", label: "Users", icon: Users },
  { to: "/app/admin", label: "Administration", icon: ShieldCheck },
  { to: "/app/settings", label: "Settings", icon: Settings },

] as const;

function NavList({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: (() => void) | undefined }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-col gap-1 px-3 py-3">
      {NAV.map((item) => {
        const active = item.to === "/app" ? pathname === "/app" : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            title={item.label}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/75 transition-colors",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              active && "bg-sidebar-primary/15 text-sidebar-primary-foreground ring-1 ring-sidebar-primary/40",
              collapsed && "justify-center px-2",
            )}
          >
            <Icon className={cn("h-4.5 w-4.5 shrink-0", active && "text-sidebar-primary")} />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBody({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: (() => void) | undefined }) {
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className={cn("flex h-16 items-center border-b border-sidebar-border px-4", collapsed && "justify-center px-2")}>
        <Link to="/">
          <Logo compact={collapsed} inverted />
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <NavList collapsed={collapsed} onNavigate={onNavigate} />
      </ScrollArea>
      <div className="border-t border-sidebar-border p-3">
        <Link
          to="/auth/login"
          onClick={() => signOut()}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            collapsed && "justify-center px-2",
          )}
        >
          <LogOut className="h-4.5 w-4.5" />
          {!collapsed && "Logout"}
        </Link>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 border-r border-sidebar-border transition-[width] duration-200 lg:block",
          collapsed ? "w-[76px]" : "w-[264px]",
        )}
      >
        <SidebarBody collapsed={collapsed} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border bg-card/85 px-3 backdrop-blur sm:px-5">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[272px] p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SidebarBody collapsed={false} />
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:inline-flex"
            onClick={() => setCollapsed((c) => !c)}
            aria-label="Toggle sidebar"
          >
            <PanelLeftClose className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")} />
          </Button>

          <div className="relative hidden min-w-0 flex-1 md:block">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search incidents, actions, sites, people…"
              className="h-9 max-w-lg pl-9"
              aria-label="Global search"
            />
          </div>

          <div className="ml-auto flex items-center gap-1">
            <Select defaultValue="en">
              <SelectTrigger className="hidden h-9 w-[92px] xl:flex" aria-label="Language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="fr">FR</SelectItem>
                <SelectItem value="pt">PT</SelectItem>
                <SelectItem value="ar">AR</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="ghost" size="icon" asChild aria-label="AI assistant">
              <Link to="/app/ai-assistant">
                <Bot className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Messages">
              <MessageSquare className="h-5 w-5" />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[340px] p-0">
                <div className="border-b px-4 py-3 text-sm font-semibold">Notifications</div>
                <div className="max-h-[320px] overflow-y-auto">
                  {NOTIFICATIONS.map((n) => (
                    <div key={n.title} className="flex gap-3 border-b px-4 py-3 last:border-0">
                      <span
                        className={cn(
                          "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                          n.tone === "danger" && "bg-danger",
                          n.tone === "warning" && "bg-warning",
                          n.tone === "info" && "bg-info",
                        )}
                      />
                      <div className="min-w-0">
                        <p className="text-sm leading-snug font-medium">{n.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{n.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2">
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link to="/app/notifications">View all notifications</Link>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ml-1 h-9 gap-2 px-1.5 sm:px-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-primary/12 text-xs font-semibold text-primary">AO</AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium sm:inline">Adaeze O.</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="text-sm font-semibold">Adaeze Okonkwo</div>
                  <div className="text-xs font-normal text-muted-foreground">QHSE Manager · Northgate Energy</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/app/profile">
                    <Users className="mr-2 h-4 w-4" /> My profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/activity">
                    <Activity className="mr-2 h-4 w-4" /> Activity log
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/auth/change-password">
                    <ShieldAlert className="mr-2 h-4 w-4" /> Change password
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/marketplace">
                    <ShoppingBag className="mr-2 h-4 w-4" /> HSE marketplace
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/auth/login" onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" /> Sign out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-[26px]">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

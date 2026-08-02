import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import authArt from "@/assets/auth-illustration.jpg";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function AuthLayout({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden bg-navy lg:block">
        <img
          src={authArt}
          alt="Industrial safety illustration of a refinery and a worker completing a safety check"
          width={1200}
          height={1408}
          className="h-full w-full object-cover opacity-95"
        />
      </div>

      <div className="flex flex-col px-5 py-6 sm:px-10">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <ThemeToggle />
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          <div className="mt-8">{children}</div>
        </div>

        <div className="mx-auto w-full max-w-md text-xs text-muted-foreground">
          {footer ?? "© 2026 SentinelQHSE™ · Enterprise safety intelligence"}
        </div>
      </div>
    </div>
  );
}

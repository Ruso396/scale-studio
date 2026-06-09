"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "@/components/shared/Logo";
import Button from "@/components/ui/Button";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/utils/cn";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="hero-navbar fixed top-0 z-40 w-full">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo size="sm" priority />

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hero-nav-link text-sm font-medium tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="hero-nav-ghost">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="premium" size="sm" className="hero-nav-cta">
              Join Free
            </Button>
          </Link>
        </div>

        <button
          className="rounded-xl p-2.5 text-muted transition-colors hover:bg-white/5 hover:text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "hero-mobile-menu border-t md:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="hero-cta-secondary w-full">
                Login
              </Button>
            </Link>
            <Link href="/register" onClick={() => setMobileOpen(false)}>
              <Button variant="premium" className="hero-cta-primary w-full">
                Join Free
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

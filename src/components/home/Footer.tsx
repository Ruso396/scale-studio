import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { NAV_LINKS } from "@/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo size="md" showTagline />
            <p className="mt-4 max-w-sm text-sm text-muted">
              India&apos;s premium B2B lead generation platform for interior
              designers. Connect with verified clients and grow your business.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground">Account</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/login"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  Designer Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  Register Free
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} Scale Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

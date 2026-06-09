import type { UserRole } from "@/types";

export function redirectAfterAuth(role: UserRole): void {
  const destination = role === "admin" ? "/admin" : "/dashboard";
  window.location.assign(destination);
}

"use client";

import { useRouter } from "next/navigation";
import { apiFetch } from "@/utils/api";
import type { AuthUser } from "@/types";

export function useAuth() {
  const router = useRouter();

  const logout = async () => {
    await apiFetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return { logout };
}

export type { AuthUser };

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import Logo from "@/components/shared/Logo";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { apiFetch } from "@/utils/api";
import { redirectAfterAuth } from "@/utils/auth-redirect";
import { toast } from "sonner";
import type { AuthUser } from "@/types";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await apiFetch<{ user: AuthUser }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      toast.success("Welcome back!");
      redirectAfterAuth(res.data!.user.role);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  };

  return (
    <div className="login-page relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      <div className="login-page-bg absolute inset-0" aria-hidden />
      <div className="login-page-overlay absolute inset-0" aria-hidden />
      <div className="login-page-glow pointer-events-none absolute inset-0" aria-hidden />

      <div className="login-page-inner relative z-10 w-full max-w-md">
        <Logo size="lg" className="login-logo mx-auto justify-center" />

        <div className="login-intro text-center">
          <span className="login-badge">
            <Sparkles className="h-3 w-3" strokeWidth={2} />
            Premium Designer Access
          </span>
          <h1 className="login-title font-display mt-5 text-3xl font-bold tracking-tight sm:text-[2rem]">
            Welcome Back
          </h1>
          <p className="login-subtitle mx-auto mt-3 max-w-sm text-sm leading-relaxed sm:text-[0.9375rem]">
            Access your premium dashboard and manage verified leads.
          </p>
        </div>

        <div className="login-card">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              placeholder="you@example.com"
              className="login-input"
            />
            <Input
              label="Password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
              placeholder="Enter your password"
              className="login-input"
            />
            <Button
              type="submit"
              variant="premium"
              className="login-cta w-full"
              loading={isSubmitting}
            >
              Sign In
            </Button>
          </form>

          <div className="login-links mt-7 space-y-3 text-center text-sm">
            <p className="login-links-muted">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="login-link">
                Register free
              </Link>
            </p>
            <p className="login-links-muted">
              Admin?{" "}
              <Link href="/admin/login" className="login-link">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

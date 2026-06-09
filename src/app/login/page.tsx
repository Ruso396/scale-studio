"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Logo size="lg" className="mx-auto justify-center" />
          <h1 className="mt-8 font-display text-2xl font-bold">
            Designer Login
          </h1>
          <p className="mt-2 text-sm text-muted">
            Access your dashboard and unlock premium leads
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              placeholder="you@example.com"
            />
            <Input
              label="Password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
              placeholder="Enter your password"
            />
            <Button type="submit" className="w-full" loading={isSubmitting}>
              Sign In
            </Button>
          </form>

          <div className="mt-6 space-y-2 text-center text-sm text-muted">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-accent hover:underline">
                Register free
              </Link>
            </p>
            <p>
              Admin?{" "}
              <Link href="/admin/login" className="text-accent hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

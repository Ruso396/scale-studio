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

export default function AdminLoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ ...data, role: "admin" }),
      });
      toast.success("Admin access granted");
      redirectAfterAuth("admin");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Logo size="lg" className="mx-auto justify-center" />
          <h1 className="mt-8 font-display text-2xl font-bold">Admin Login</h1>
          <p className="mt-2 text-sm text-muted">
            Secure access to the admin dashboard
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Admin Email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              label="Password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />
            <Button type="submit" className="w-full" loading={isSubmitting}>
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            <Link href="/" className="text-accent hover:underline">
              Back to website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

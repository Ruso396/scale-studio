"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { CITIES, SIGNUP_CREDITS } from "@/constants";
import { apiFetch } from "@/utils/api";
import { redirectAfterAuth } from "@/utils/auth-redirect";
import { toast } from "sonner";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
      toast.success(`Welcome! You received ${SIGNUP_CREDITS} free credits.`);
      redirectAfterAuth("designer");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10" />
      <div className="relative w-full max-w-lg">
        <div className="mb-8 text-center">
          <Logo size="lg" className="mx-auto justify-center" />
          <h1 className="mt-8 font-display text-2xl font-bold">
            Create Your Account
          </h1>
          <p className="mt-2 text-sm text-muted">
            Join free and get {SIGNUP_CREDITS} credits to unlock leads
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              {...register("name")}
              error={errors.name?.message}
              placeholder="Your name"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Email"
                type="email"
                {...register("email")}
                error={errors.email?.message}
                placeholder="you@example.com"
              />
              <Input
                label="Phone"
                {...register("phone")}
                error={errors.phone?.message}
                placeholder="10-digit mobile"
              />
            </div>
            <Select
              label="City"
              options={CITIES}
              placeholder="Select your city"
              {...register("city")}
              error={errors.city?.message}
            />
            <Input
              label="Password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
              placeholder="Min 6 characters"
            />
            <Button type="submit" className="w-full" loading={isSubmitting}>
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-accent hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

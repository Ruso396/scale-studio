"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Eye,
  EyeOff,
  Headphones,
  Lock,
  Mail,
  Shield,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import Button from "@/components/ui/Button";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { apiFetch } from "@/utils/api";
import { redirectAfterAuth } from "@/utils/auth-redirect";
import { toast } from "sonner";
import type { AuthUser } from "@/types";

const LEFT_FEATURES = [
  {
    icon: Award,
    title: "500+ Verified Leads",
    description: "High quality & verified",
  },
  {
    icon: Shield,
    title: "Trusted Platform",
    description: "Your data is secure",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We are here to help",
  },
] as const;

function LoginCurveDivider() {
  return (
    <div className="login-curve-wrap" aria-hidden>
      <svg
        className="login-curve-svg"
        viewBox="0 0 60 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="loginGoldGlow" x="-80%" y="-5%" width="260%" height="110%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="loginGoldStroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.35" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path
          d="M 28 0 C 8 200 52 380 28 500 C 4 620 52 800 28 1000"
          fill="none"
          stroke="url(#loginGoldStroke)"
          strokeWidth="2.5"
          filter="url(#loginGoldGlow)"
        />
      </svg>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#1877F2"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#FFFFFF" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
    <div className="login-page">
      <div className="login-split">
        {/* ── Left panel ── */}
        <aside className="login-panel-left">
          <div className="login-panel-left-bg" aria-hidden />
          <div className="login-panel-left-overlay" aria-hidden />

          <div className="login-panel-left-content">
            <div className="login-panel-brand">
              <Logo size="xl" priority className="login-split-logo" />
              <h2 className="login-panel-heading font-display">
                Premium Interior Design Leads
              </h2>
              <p className="login-panel-desc">
                India&apos;s premium B2B lead generation platform for interior
                designers.
              </p>
            </div>

            <div className="login-panel-glass-card">
              <p className="login-panel-glass-title font-display">
                500+ Verified Interior Designers
              </p>
              <p className="login-panel-glass-desc">
                Premium verified leads delivered daily
              </p>
              <Link href="/register" className="login-panel-glass-btn">
                Get Started
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            </div>

            <div className="login-panel-features">
              {LEFT_FEATURES.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="login-panel-feature">
                    <div className="login-panel-feature-icon">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="login-panel-feature-title">{item.title}</p>
                      <p className="login-panel-feature-desc">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <LoginCurveDivider />
        </aside>

        {/* ── Right panel ── */}
        <main className="login-panel-right">
          <div className="login-panel-right-glow" aria-hidden />

          <div className="login-form-wrap">
            <div className="login-form-header">
              <span className="login-badge">
                <Shield className="h-3.5 w-3.5" strokeWidth={2} />
                Premium Designer Access
              </span>

              <h1 className="login-title font-display">
                Welcome <span className="login-title-accent">Back</span>
              </h1>

              <p className="login-subtitle">
                Access your premium dashboard and manage verified leads.
              </p>

              <div className="login-header-divider" aria-hidden>
                <span className="login-header-line" />
                <span className="login-header-diamond" />
                <span className="login-header-line" />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
              <div className="login-field">
                <label htmlFor="email" className="login-label">
                  Email
                </label>
                <div className="login-input-wrap">
                  <Mail className="login-input-icon" strokeWidth={1.75} />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="login-input"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="login-error">{errors.email.message}</p>
                )}
              </div>

              <div className="login-field">
                <label htmlFor="password" className="login-label">
                  Password
                </label>
                <div className="login-input-wrap">
                  <Lock className="login-input-icon" strokeWidth={1.75} />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="login-input login-input-password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
                    ) : (
                      <Eye className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="login-error">{errors.password.message}</p>
                )}
              </div>

              <div className="login-options">
                <label className="login-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="login-checkbox"
                  />
                  <span>Remember me</span>
                </label>
                <button type="button" className="login-forgot">
                  Forgot Password?
                </button>
              </div>

              <Button
                type="submit"
                variant="premium"
                className="login-cta"
                loading={isSubmitting}
              >
                Sign In
                <ArrowRight className="h-5 w-5" strokeWidth={2} />
              </Button>
            </form>

            <div className="login-or-divider" aria-hidden>
              <span className="login-or-line" />
              <span className="login-or-text">Or continue with</span>
              <span className="login-or-line" />
            </div>

            <div className="login-social">
              <button type="button" className="login-social-btn" aria-label="Continue with Google">
                <GoogleIcon />
              </button>
              <button type="button" className="login-social-btn" aria-label="Continue with Facebook">
                <FacebookIcon />
              </button>
              <button type="button" className="login-social-btn" aria-label="Continue with Apple">
                <AppleIcon />
              </button>
            </div>

            <div className="login-links">
              <p>
                Don&apos;t have an account?{" "}
                <Link href="/register" className="login-link">
                  Register free
                </Link>
              </p>
              <p>
                Admin?{" "}
                <Link href="/admin/login" className="login-link">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

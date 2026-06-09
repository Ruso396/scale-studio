import bcrypt from "bcryptjs";
import User from "@/models/User";
import { signToken } from "@/lib/auth";
import { SIGNUP_CREDITS } from "@/constants";
import type { AuthUser, JwtPayload, RegisterInput } from "@/types";

export async function registerDesigner(
  input: RegisterInput
): Promise<{ user: AuthUser; token: string }> {
  const existingUser = await User.findOne({ email: input.email.toLowerCase() });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(input.password, 12);

  const user = await User.create({
    name: input.name,
    email: input.email.toLowerCase(),
    phone: input.phone,
    city: input.city,
    password: hashedPassword,
    role: "designer",
    credits: SIGNUP_CREDITS,
    status: "active",
  });

  const payload: JwtPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name,
  };

  return {
    user: formatAuthUser(user),
    token: signToken(payload),
  };
}

export async function loginDesigner(
  email: string,
  password: string
): Promise<{ user: AuthUser; token: string }> {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (adminEmail && email.toLowerCase() === adminEmail) {
    throw new Error(
      "This is an admin account. Please use the Admin Login page at /admin/login"
    );
  }

  const user = await User.findOne({ email: email.toLowerCase(), role: "designer" });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (user.status === "suspended") {
    throw new Error("Your account has been suspended. Contact support.");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  const payload: JwtPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name,
  };

  return {
    user: formatAuthUser(user),
    token: signToken(payload),
  };
}

export function loginAdmin(
  email: string,
  password: string
): { user: AuthUser; token: string } {
  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();

  if (!adminEmail || !adminPassword) {
    throw new Error("Admin credentials not configured");
  }

  if (
    email.toLowerCase() !== adminEmail.toLowerCase() ||
    password.trim() !== adminPassword
  ) {
    throw new Error("Invalid admin email or password");
  }

  const payload: JwtPayload = {
    userId: "admin",
    email: adminEmail,
    role: "admin",
    name: "Admin",
  };

  return {
    user: {
      id: "admin",
      name: "Admin",
      email: adminEmail,
      role: "admin",
    },
    token: signToken(payload),
  };
}

function formatAuthUser(user: InstanceType<typeof User>): AuthUser {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    city: user.city,
    role: user.role,
    credits: user.credits,
    status: user.status,
  };
}

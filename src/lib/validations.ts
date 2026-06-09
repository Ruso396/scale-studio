import { z } from "zod";
import { CITIES, SERVICES, BUDGETS, BHK_OPTIONS } from "@/constants";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian phone number"),
  city: z.enum(CITIES, { message: "Please select a valid city" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const leadSchema = z.object({
  clientName: z.string().min(2, "Client name is required"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian phone number"),
  city: z.enum(CITIES, { message: "Please select a valid city" }),
  service: z.enum(SERVICES, { message: "Please select a valid service" }),
  budget: z.enum(BUDGETS, { message: "Please select a valid budget" }),
  bhk: z.enum(BHK_OPTIONS, { message: "Please select BHK" }),
  status: z.enum(["active", "draft", "sold"]),
  image: z.string().min(1).optional().nullable(),
});

export const unlockLeadSchema = z.object({
  leadId: z.string().min(1, "Lead ID is required"),
});

export const designerStatusSchema = z.object({
  status: z.enum(["active", "suspended"]),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type LeadFormData = z.infer<typeof leadSchema>;

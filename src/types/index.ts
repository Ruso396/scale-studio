export type UserRole = "admin" | "designer";
export type UserStatus = "active" | "suspended";
export type LeadStatus = "active" | "draft" | "sold";

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface UserDocument {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  role: UserRole;
  credits: number;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LeadDocument {
  _id: string;
  clientName: string;
  phone: string;
  city: string;
  service: string;
  budget: string;
  bhk: string;
  status: LeadStatus;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PublicLead {
  _id: string;
  city: string;
  service: string;
  budget: string;
  bhk: string;
  status: LeadStatus;
  image?: string;
  clientName?: string;
  phone?: string;
  isUnlocked?: boolean;
  createdAt: string;
}

export interface UnlockedLeadDocument {
  _id: string;
  designerId: string;
  leadId: string;
  unlockedAt: string;
}

export interface AdminStats {
  totalLeads: number;
  publishedToday: number;
  totalSold: number;
  activeDesigners: number;
}

export interface TopDesigner {
  _id: string;
  name: string;
  city: string;
  credits: number;
  unlockCount: number;
  status: UserStatus;
}

export interface DesignerStats {
  availableLeads: number;
  unlockedLeads: number;
  creditsLeft: number;
  cities: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LeadInput {
  clientName: string;
  phone: string;
  city: string;
  service: string;
  budget: string;
  bhk: string;
  status: LeadStatus;
  image?: string | null;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  role: UserRole;
  credits?: number;
  status?: UserStatus;
}

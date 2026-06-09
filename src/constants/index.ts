export const APP_NAME = "Scale Studio";
export const APP_TAGLINE = "Premium Interior Design Leads";

export const SIGNUP_CREDITS = 5;
export const UNLOCK_COST = 1;

export const CITIES = [
  "Chennai",
  "Bangalore",
  "Hyderabad",
  "Mumbai",
  "Coimbatore",
] as const;

export const SERVICES = [
  "Full Home",
  "Kitchen",
  "Wardrobe",
  "Bedroom",
  "Ceiling",
  "Bathroom",
] as const;

export const BUDGETS = [
  "5 Lakhs",
  "8 Lakhs",
  "10 Lakhs",
  "15 Lakhs",
  "20 Lakhs",
] as const;

export const BHK_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"] as const;

export const LEAD_STATUSES = ["active", "draft", "sold"] as const;
export const USER_STATUSES = ["active", "suspended"] as const;

export const SERVICE_IMAGES: Record<string, string> = {
  "Full Home":
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=520&fit=crop&q=80",
  Kitchen:
    "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&h=520&fit=crop&q=80",
  Wardrobe:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=520&fit=crop&q=80",
  Bedroom:
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=520&fit=crop&q=80",
  Ceiling:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=520&fit=crop&q=80",
  Bathroom:
    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=520&fit=crop&q=80",
};

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: "Free",
    credits: "5 Credits",
    features: [
      "5 free credits on signup",
      "Browse all active leads",
      "Unlock verified clients",
      "Permanent lead access",
    ],
    highlighted: false,
  },
  {
    name: "Pro Studio",
    price: "₹4,999",
    period: "/month",
    credits: "25 Credits",
    features: [
      "25 credits monthly",
      "Priority lead access",
      "Multi-city coverage",
      "Email support",
    ],
    highlighted: true,
  },
  {
    name: "Elite",
    price: "₹9,999",
    period: "/month",
    credits: "60 Credits",
    features: [
      "60 credits monthly",
      "Premium verified leads",
      "Dedicated account manager",
      "Priority support",
    ],
    highlighted: false,
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Create Account",
    description:
      "Register as an interior designer and get instant access to our lead marketplace.",
  },
  {
    step: 2,
    title: "Get Credits",
    description:
      "Receive 5 free credits on signup to start unlocking premium verified client leads.",
  },
  {
    step: 3,
    title: "Unlock Leads",
    description:
      "Browse leads by city and budget. Unlock for 1 credit and get permanent client access.",
  },
] as const;

export const TRUST_ITEMS = [
  {
    title: "Verified Clients",
    description: "Every lead is manually verified by our team before publishing.",
  },
  {
    title: "Premium Quality",
    description: "High-intent clients with confirmed budgets and project scope.",
  },
  {
    title: "Pan-India Coverage",
    description: "Access leads across major metros and tier-2 cities in India.",
  },
  {
    title: "Secure Platform",
    description: "Your data is protected with enterprise-grade security.",
  },
] as const;

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#how-it-works", label: "How It Works" },
] as const;

export const DASHBOARD_NAV = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/dashboard/leads", label: "Browse Leads", icon: "Search" },
  { href: "/dashboard/my-leads", label: "My Leads", icon: "FolderOpen" },
  { href: "/dashboard/profile", label: "Profile", icon: "User" },
] as const;

export const ADMIN_NAV = [
  { href: "/admin", label: "Overview", icon: "LayoutDashboard" },
  { href: "/admin/leads", label: "Manage Leads", icon: "FileText" },
  { href: "/admin/designers", label: "Designers", icon: "Users" },
] as const;

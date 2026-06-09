import mongoose from "mongoose";
import Lead from "../models/Lead";
import User from "../models/User";
import bcrypt from "bcryptjs";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("MONGODB_URI is required");
  process.exit(1);
}

const CITIES = ["Chennai", "Bangalore", "Hyderabad", "Mumbai", "Coimbatore"];
const SERVICES = ["Full Home", "Kitchen", "Wardrobe", "Bedroom", "Ceiling", "Bathroom"];
const BUDGETS = ["5 Lakhs", "8 Lakhs", "10 Lakhs", "15 Lakhs", "20 Lakhs"];
const BHK_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];

const CLIENT_NAMES = [
  "Rajesh Kumar",
  "Priya Sharma",
  "Anil Mehta",
  "Deepa Reddy",
  "Vikram Singh",
  "Kavitha Nair",
  "Suresh Patel",
  "Meena Iyer",
  "Arun Joshi",
  "Lakshmi Venkat",
  "Gopal Krishnan",
  "Sunita Das",
  "Ravi Chandran",
  "Anitha Rao",
  "Mohammed Ali",
  "Pooja Gupta",
  "Karthik Subramanian",
  "Nisha Pillai",
  "Harish Babu",
  "Divya Menon",
];

const PHONES = [
  "9876543210",
  "8765432109",
  "7654321098",
  "9543210987",
  "8432109876",
  "9321098765",
  "8210987654",
  "9109876543",
  "8098765432",
  "9988776655",
  "9876123450",
  "8765234109",
  "7654345678",
  "9545678901",
  "8432567890",
  "9321789056",
  "8210456789",
  "9102345678",
  "8091234567",
  "9988001122",
];

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seed() {
  await mongoose.connect(mongoUri);

  console.log("Clearing existing data...");
  await Lead.deleteMany({});
  await User.deleteMany({ role: "designer" });

  console.log("Seeding leads...");
  const leads = [];
  for (let i = 0; i < 20; i++) {
    leads.push({
      clientName: CLIENT_NAMES[i],
      phone: PHONES[i],
      city: randomItem(CITIES),
      service: randomItem(SERVICES),
      budget: randomItem(BUDGETS),
      bhk: randomItem(BHK_OPTIONS),
      status: i < 16 ? "active" : i < 18 ? "draft" : "sold",
    });
  }
  await Lead.insertMany(leads);
  console.log(`Created ${leads.length} leads`);

  const seedDesignerPassword = process.env.SEED_DESIGNER_PASSWORD?.trim();
  if (!seedDesignerPassword) {
    console.log("Skipping sample designers (SEED_DESIGNER_PASSWORD not set)");
    console.log("Seed completed successfully!");
    await mongoose.disconnect();
    return;
  }

  console.log("Seeding sample designers...");
  const hashedPassword = await bcrypt.hash(seedDesignerPassword, 12);
  const designers = [
    {
      name: "Aisha Rahman",
      email: "aisha@designstudio.com",
      phone: "9876501234",
      city: "Chennai",
      password: hashedPassword,
      role: "designer" as const,
      credits: 5,
      status: "active" as const,
    },
    {
      name: "Rohan Desai",
      email: "rohan@interiors.com",
      phone: "8765401234",
      city: "Mumbai",
      password: hashedPassword,
      role: "designer" as const,
      credits: 3,
      status: "active" as const,
    },
    {
      name: "Sneha Kapoor",
      email: "sneha@designhub.com",
      phone: "7654301234",
      city: "Bangalore",
      password: hashedPassword,
      role: "designer" as const,
      credits: 8,
      status: "active" as const,
    },
  ];
  await User.insertMany(designers);
  console.log(`Created ${designers.length} designers`);

  console.log("Seed completed successfully!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

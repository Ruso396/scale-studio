import {
  Home,
  ChefHat,
  DoorOpen,
  BedDouble,
  Layers,
  Bath,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/utils/cn";

const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  "Full Home": Home,
  Kitchen: ChefHat,
  Wardrobe: DoorOpen,
  Bedroom: BedDouble,
  Ceiling: Layers,
  Bathroom: Bath,
};

interface ServiceIconProps {
  service: string;
  className?: string;
  iconClassName?: string;
}

export default function ServiceIcon({
  service,
  className,
  iconClassName,
}: ServiceIconProps) {
  const Icon = SERVICE_ICON_MAP[service] ?? Home;

  return (
    <div
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10",
        className
      )}
    >
      <Icon className={cn("h-4 w-4 text-accent", iconClassName)} />
    </div>
  );
}

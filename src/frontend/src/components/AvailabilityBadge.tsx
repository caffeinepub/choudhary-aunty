import type { AvailabilityType } from "@/constants/seedData";

interface AvailabilityBadgeProps {
  availability: AvailabilityType;
  size?: "sm" | "xs";
}

const AVAILABILITY_CONFIG: Record<
  AvailabilityType,
  { label: string; icon: string; cls: string }
> = {
  "available-today": {
    label: "Available Now",
    icon: "✓",
    cls: "bg-green-50 text-green-700 border-green-200",
  },
  "pre-order": {
    label: "Pre-Order",
    icon: "📅",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
  },
  seasonal: {
    label: "Seasonal",
    icon: "🌿",
    cls: "bg-sky-50 text-sky-700 border-sky-200",
  },
  "festival-special": {
    label: "Festival Special",
    icon: "🪔",
    cls: "bg-yellow-50 text-yellow-700 border-yellow-300",
  },
};

export function AvailabilityBadge({
  availability,
  size = "xs",
}: AvailabilityBadgeProps) {
  const config = AVAILABILITY_CONFIG[availability];
  const sizeClass =
    size === "sm" ? "text-xs px-2.5 py-1" : "text-[10px] px-2 py-0.5";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-body font-semibold whitespace-nowrap ${sizeClass} ${config.cls}`}
    >
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
}

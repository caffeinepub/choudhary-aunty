import { cn } from "@/lib/utils";

export type AsharfiTier =
  | "Naya Rishta"
  | "Apna Banda"
  | "Ghar Ka Fard"
  | "Parivaar Ka Sitaara"
  | "Nayi Shuruaat"
  | "Pratishthit Aunty"
  | "Mashhoor Aunty"
  | "Choudhary Aunty Legend";

interface AsharfiBadgeProps {
  balance: number;
  tier: AsharfiTier | string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const TIER_STYLES: Record<
  string,
  { bg: string; text: string; border: string; icon: string }
> = {
  "Naya Rishta": {
    bg: "bg-slate-100",
    text: "text-slate-600",
    border: "border-slate-300",
    icon: "🪙",
  },
  "Apna Banda": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-300",
    icon: "🥉",
  },
  "Ghar Ka Fard": {
    bg: "bg-saffron/10",
    text: "text-saffron",
    border: "border-saffron/40",
    icon: "🥇",
  },
  "Parivaar Ka Sitaara": {
    bg: "bg-gold/10",
    text: "text-warmBrown",
    border: "border-gold/50",
    icon: "👑",
  },
  "Nayi Shuruaat": {
    bg: "bg-slate-100",
    text: "text-slate-600",
    border: "border-slate-300",
    icon: "🌱",
  },
  "Pratishthit Aunty": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-300",
    icon: "⭐",
  },
  "Mashhoor Aunty": {
    bg: "bg-saffron/10",
    text: "text-saffron",
    border: "border-saffron/40",
    icon: "🌟",
  },
  "Choudhary Aunty Legend": {
    bg: "bg-gold/10",
    text: "text-warmBrown",
    border: "border-gold/50",
    icon: "👑",
  },
};

const SIZE_CLASSES = {
  sm: {
    container: "px-2.5 py-1 text-xs gap-1.5",
    coin: "text-sm",
    balance: "text-sm font-bold",
    tier: "text-xs",
  },
  md: {
    container: "px-3.5 py-1.5 text-sm gap-2",
    coin: "text-base",
    balance: "text-base font-bold",
    tier: "text-xs",
  },
  lg: {
    container: "px-4 py-2 text-base gap-2.5",
    coin: "text-xl",
    balance: "text-xl font-bold",
    tier: "text-sm",
  },
};

export function AsharfiBadge({
  balance,
  tier,
  size = "md",
  className,
}: AsharfiBadgeProps) {
  const styles = TIER_STYLES[tier] ?? TIER_STYLES["Naya Rishta"];
  const sizeClasses = SIZE_CLASSES[size];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border font-body transition-all",
        styles.bg,
        styles.text,
        styles.border,
        sizeClasses.container,
        className,
      )}
    >
      <span className={sizeClasses.coin}>{styles.icon}</span>
      <span className={sizeClasses.balance}>
        {balance.toLocaleString("en-IN")}
      </span>
      <span className="opacity-70 font-medium">Asharfi</span>
      <span className="opacity-50 mx-0.5">·</span>
      <span className="font-semibold">{tier}</span>
    </div>
  );
}

import { cn } from "@/lib/utils";

interface TierProgressBarProps {
  currentBalance: number;
  currentTier: string;
  nextTier: string;
  nextTierThreshold: number;
  previousTierThreshold?: number;
  className?: string;
}

export function TierProgressBar({
  currentBalance,
  currentTier,
  nextTier,
  nextTierThreshold,
  previousTierThreshold = 0,
  className,
}: TierProgressBarProps) {
  const isMaxTier =
    currentBalance >= nextTierThreshold && nextTierThreshold === 0;
  const range = nextTierThreshold - previousTierThreshold;
  const progress =
    range > 0
      ? Math.min(((currentBalance - previousTierThreshold) / range) * 100, 100)
      : 100;
  const remaining = Math.max(nextTierThreshold - currentBalance, 0);

  if (isMaxTier || nextTierThreshold === 0) {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex items-center justify-between text-xs font-body">
          <span className="font-semibold text-saffron">👑 {currentTier}</span>
          <span className="text-saffron font-medium">
            Maximum Tier Achieved!
          </span>
        </div>
        <div className="h-2.5 w-full bg-saffron/15 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-saffron to-gold transition-all duration-700 ease-out"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-xs font-body">
        <span className="font-semibold text-foreground/70">{currentTier}</span>
        <span className="text-muted-foreground">
          {remaining > 0 ? (
            <>
              <span className="text-saffron font-bold">{remaining}</span>{" "}
              Asharfi to <span className="font-semibold">{nextTier}</span>
            </>
          ) : (
            <span className="text-saffron">Tier unlocked!</span>
          )}
        </span>
        <span className="font-semibold text-foreground/70">{nextTier}</span>
      </div>
      <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-saffron to-gold transition-all duration-700 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 rounded-full bg-white/20" />
        </div>
      </div>
      <div className="flex items-center justify-between text-xs font-body text-muted-foreground">
        <span>{previousTierThreshold.toLocaleString("en-IN")} Asharfi</span>
        <span>{nextTierThreshold.toLocaleString("en-IN")} Asharfi</span>
      </div>
    </div>
  );
}

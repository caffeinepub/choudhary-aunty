import { cn } from "@/lib/utils";

type LiquidityBadgeType = "trending" | "ordered-this-week" | "sold-out";

interface LiquidityBadgeProps {
  type: LiquidityBadgeType;
  productId?: bigint | number;
  className?: string;
}

function getOrderedCount(id: number): number {
  return ((id * 7) % 20) + 3;
}

export function LiquidityBadge({
  type,
  productId,
  className,
}: LiquidityBadgeProps) {
  if (type === "trending") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border bg-amber-50 text-amber-800 border-amber-300 font-body font-semibold",
          className,
        )}
        data-ocid="product.trending_badge"
      >
        🔥 Trending
      </span>
    );
  }

  if (type === "ordered-this-week") {
    const id = Number(productId ?? 0);
    const count = getOrderedCount(id);
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border bg-green-50 text-green-700 border-green-200 font-body font-semibold",
          className,
        )}
        data-ocid="product.ordered_badge"
      >
        ✓ {count} ordered this week
      </span>
    );
  }

  if (type === "sold-out") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border bg-red-50 text-red-700 border-red-200 font-body font-semibold",
          className,
        )}
        data-ocid="product.soldout_badge"
      >
        ⚡ Last batch sold out in 3 days
      </span>
    );
  }

  return null;
}

/**
 * Convenience: returns which badge types apply to a given productId
 */
export function getProductBadgeTypes(productId: bigint | number): {
  trending: boolean;
  orderedThisWeek: boolean;
  soldOut: boolean;
} {
  const id = Number(productId);
  return {
    trending: id % 3 === 0,
    orderedThisWeek: true, // show for all products
    soldOut: id % 5 === 0,
  };
}

/**
 * Capacity dot — green / amber / red filled circle indicator
 */
export function CapacityDot({ productId }: { productId: bigint | number }) {
  const id = Number(productId);
  const filled = Math.min(95, ((id * 17) % 70) + 20);
  const color =
    filled >= 80
      ? "bg-red-500"
      : filled >= 50
        ? "bg-amber-500"
        : "bg-green-500";
  const label =
    filled >= 80 ? "Almost full" : filled >= 50 ? "Filling up" : "Available";

  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${color} shrink-0`}
      title={`Batch ${filled}% filled — ${label}`}
      aria-label={label}
    />
  );
}

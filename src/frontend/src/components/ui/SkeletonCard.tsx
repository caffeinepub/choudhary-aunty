import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
}

/**
 * Skeleton product card — matches exact dimensions of the real product card
 * to prevent layout shift during loading.
 */
export function SkeletonProductCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl border border-border overflow-hidden h-full flex flex-col",
        className,
      )}
      data-ocid="shop.loading_state"
      aria-hidden="true"
    >
      {/* Image placeholder — matches aspect-[6/5] */}
      <Skeleton className="aspect-[6/5] w-full rounded-none bg-amber-100/50 animate-pulse" />
      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Badges row */}
        <div className="flex gap-1.5">
          <Skeleton className="h-4 w-14 rounded-full bg-amber-100/50 animate-pulse" />
          <Skeleton className="h-4 w-12 rounded-full bg-amber-100/50 animate-pulse" />
        </div>
        {/* Product name */}
        <Skeleton className="h-4 w-3/4 rounded bg-amber-100/50 animate-pulse" />
        {/* Sub line */}
        <Skeleton className="h-3 w-1/2 rounded bg-amber-100/50 animate-pulse" />
        {/* Description */}
        <Skeleton className="h-3 w-full rounded bg-amber-100/50 animate-pulse" />
        <Skeleton className="h-3 w-5/6 rounded bg-amber-100/50 animate-pulse" />
        {/* Pack size */}
        <Skeleton className="h-3 w-1/3 rounded bg-amber-100/50 animate-pulse mt-1" />
        {/* Price row */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-12 rounded bg-amber-100/50 animate-pulse" />
            <Skeleton className="h-4 w-10 rounded bg-amber-100/50 animate-pulse" />
          </div>
          <Skeleton className="h-4 w-14 rounded bg-amber-100/50 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton maker profile card — matches dimensions of real maker cards.
 */
export function SkeletonMakerCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl border border-border overflow-hidden",
        className,
      )}
      data-ocid="makers.loading_state"
      aria-hidden="true"
    >
      {/* Profile image */}
      <Skeleton className="aspect-[4/3] w-full rounded-none bg-amber-100/50 animate-pulse" />
      <div className="p-5 space-y-3">
        {/* Badge */}
        <Skeleton className="h-3.5 w-16 rounded-full bg-amber-100/50 animate-pulse" />
        {/* Name */}
        <Skeleton className="h-5 w-2/3 rounded bg-amber-100/50 animate-pulse" />
        {/* Tagline */}
        <Skeleton className="h-3.5 w-4/5 rounded bg-amber-100/50 animate-pulse" />
        {/* Location */}
        <Skeleton className="h-3 w-1/2 rounded bg-amber-100/50 animate-pulse" />
        {/* Dish pills */}
        <div className="flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-5 w-14 rounded-full bg-amber-100/50 animate-pulse"
            />
          ))}
        </div>
        {/* CTA */}
        <Skeleton className="h-9 w-full rounded-full bg-amber-100/50 animate-pulse mt-1" />
      </div>
    </div>
  );
}

/**
 * Skeleton list row — matches CRM table rows.
 */
export function SkeletonListItem({ className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 py-3 px-4 border-b border-border",
        className,
      )}
      data-ocid="crm.loading_state"
      aria-hidden="true"
    >
      {/* Avatar */}
      <Skeleton className="w-8 h-8 rounded-full bg-amber-100/50 animate-pulse shrink-0" />
      {/* Name + email */}
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-32 rounded bg-amber-100/50 animate-pulse" />
        <Skeleton className="h-3 w-48 rounded bg-amber-100/50 animate-pulse" />
      </div>
      {/* Badge */}
      <Skeleton className="h-5 w-16 rounded-full bg-amber-100/50 animate-pulse" />
      {/* Value */}
      <Skeleton className="h-4 w-12 rounded bg-amber-100/50 animate-pulse" />
    </div>
  );
}

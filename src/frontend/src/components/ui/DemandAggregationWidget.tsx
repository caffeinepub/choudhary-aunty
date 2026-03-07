interface DemandAggregationWidgetProps {
  productId: bigint | number;
  minBatchKg?: number;
}

function getWaitingCount(id: number): number {
  return (Math.floor(id * 3.7) % 15) + 5;
}

function getFilledPercent(id: number): number {
  return Math.min(95, ((id * 17) % 70) + 20);
}

export function DemandAggregationWidget({
  productId,
  minBatchKg = 5,
}: DemandAggregationWidgetProps) {
  const id = Number(productId);
  const waitingCount = getWaitingCount(id);
  const filledPercent = getFilledPercent(id);

  const barColor =
    filledPercent >= 80
      ? "bg-red-500"
      : filledPercent >= 50
        ? "bg-amber-500"
        : "bg-green-500";

  const statusText =
    filledPercent >= 80
      ? "Almost full — order quickly!"
      : filledPercent >= 50
        ? "Filling up fast"
        : "Slots available";

  const statusColor =
    filledPercent >= 80
      ? "text-red-700"
      : filledPercent >= 50
        ? "text-amber-700"
        : "text-green-700";

  const statusBg =
    filledPercent >= 80
      ? "bg-red-50 border-red-200"
      : filledPercent >= 50
        ? "bg-amber-50 border-amber-200"
        : "bg-green-50 border-green-200";

  return (
    <div
      className="bg-card border border-border rounded-xl p-4 space-y-4"
      data-ocid="product.demand_widget"
    >
      {/* Waiting Customers Counter */}
      <div className="flex items-start gap-3">
        <div className="text-lg shrink-0 mt-0.5">👥</div>
        <div>
          <p className="font-display font-bold text-foreground text-sm">
            <span className="text-saffron">{waitingCount} customers</span>{" "}
            waiting for this batch
          </p>
          <p className="text-muted-foreground text-xs font-body mt-0.5 leading-relaxed">
            Order now to join the queue — batch starts when we hit minimum
            quantity
          </p>
        </div>
      </div>

      {/* Capacity Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-body font-semibold text-foreground">
            Batch Capacity
          </span>
          <span className={`text-xs font-body font-bold ${statusColor}`}>
            {filledPercent}% filled
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${barColor}`}
            style={{ width: `${filledPercent}%` }}
            role="progressbar"
            tabIndex={-1}
            aria-valuenow={filledPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Batch ${filledPercent}% full`}
          />
        </div>

        {/* Labels */}
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px] font-body text-muted-foreground">
            Min batch: {minBatchKg} kg
          </span>
          <span
            className={`text-[10px] font-body font-semibold ${statusColor}`}
          >
            {statusText}
          </span>
        </div>
      </div>

      {/* CTA notice */}
      <div
        className={`px-3 py-2 rounded-lg border text-xs font-body font-medium ${statusBg} ${statusColor}`}
      >
        ⏰ Order by Friday to secure your slot — weekend batch dispatches Monday
      </div>
    </div>
  );
}

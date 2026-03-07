import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getNextFridayMidnight(): Date {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon, ..., 5=Fri, 6=Sat
  const daysUntilFriday = (5 - day + 7) % 7 || 7; // days until next Friday (if today is Friday, get next week's)
  const nextFriday = new Date(now);
  nextFriday.setDate(now.getDate() + daysUntilFriday);
  nextFriday.setHours(23, 59, 59, 0);
  return nextFriday;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

const DISMISS_KEY = "ca_batch_banner_dismissed";

interface BatchCountdownBannerProps {
  className?: string;
}

export function BatchCountdownBanner({ className }: BatchCountdownBannerProps) {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      return false;
    }
  });

  const [target] = useState(() => getNextFridayMidnight());
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calcTimeLeft(target),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(target));
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);

  function handleDismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
  }

  if (dismissed) return null;

  const { days, hours, minutes, seconds } = timeLeft;
  const isUrgent = days === 0 && hours < 6;

  return (
    <div
      className={`bg-amber-50 border-b border-amber-200 text-amber-900 ${className ?? ""}`}
      role="banner"
      aria-label="Batch countdown"
      data-ocid="batch.countdown_banner"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap flex-1 min-w-0">
          <span className="text-base shrink-0">🍯</span>
          <p className="text-xs sm:text-sm font-body font-medium text-amber-800 leading-snug">
            <span className="font-semibold text-amber-900">
              Friday Batch Closes In:{" "}
            </span>
            <span
              className={`font-display font-bold tabular-nums ${isUrgent ? "text-red-700" : "text-amber-700"}`}
            >
              {days > 0 && `${days}d `}
              {pad(hours)}h {pad(minutes)}m {pad(seconds)}s
            </span>
            <span className="hidden sm:inline text-amber-700">
              {" "}
              — Order by Friday. Packed over the weekend. Delivered Monday.
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="shrink-0 text-amber-600 hover:text-amber-900 transition-colors p-1"
          aria-label="Dismiss banner"
          data-ocid="batch.countdown_banner.close_button"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

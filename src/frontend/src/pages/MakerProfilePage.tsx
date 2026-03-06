import { AsharfiBadge } from "@/components/loyalty/AsharfiBadge";
import { TierProgressBar } from "@/components/loyalty/TierProgressBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getMakerImage } from "@/constants/images";
import { useGetAllMakers, useGetAllProducts } from "@/hooks/useQueries";
import { Link, useSearch } from "@tanstack/react-router";
import {
  Award,
  ChefHat,
  Crown,
  ExternalLink,
  MapPin,
  Package,
  Star,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

// ============================================
// TYPES & CONSTANTS
// ============================================

interface LoyaltyTransaction {
  id: string;
  date: string;
  reason: string;
  amount: number;
}

const MAKER_TIERS = [
  {
    name: "Nayi Shuruaat",
    min: 0,
    max: 499,
    icon: "🌱",
    color: "text-slate-500",
  },
  {
    name: "Pratishthit Aunty",
    min: 500,
    max: 999,
    icon: "⭐",
    color: "text-amber-600",
  },
  {
    name: "Mashhoor Aunty",
    min: 1000,
    max: 2499,
    icon: "🌟",
    color: "text-saffron",
  },
  {
    name: "Choudhary Aunty Legend",
    min: 2500,
    max: Number.POSITIVE_INFINITY,
    icon: "👑",
    color: "text-warmBrown",
  },
];

const MAKER_EARNING_CRITERIA = [
  {
    icon: Package,
    label: "First product listed",
    points: 100,
    color: "text-blue-500",
  },
  {
    icon: Star,
    label: "First sale completed",
    points: 200,
    color: "text-saffron",
  },
  {
    icon: TrendingUp,
    label: "Every ₹1,000 revenue",
    points: 10,
    color: "text-green-600",
  },
  {
    icon: Star,
    label: "5-star review received",
    points: 50,
    color: "text-amber-500",
  },
  {
    icon: Award,
    label: "Consecutive weekly orders",
    points: 75,
    color: "text-terracotta",
  },
  {
    icon: Crown,
    label: "12 months active",
    points: 500,
    color: "text-warmBrown",
  },
];

const ACHIEVEMENTS = [
  {
    id: "first_product",
    label: "First Product Listed",
    icon: "🏷️",
    earned: true,
  },
  { id: "first_sale", label: "First Sale", icon: "⭐", earned: true },
  {
    id: "fifty_customers",
    label: "50 Happy Customers",
    icon: "💛",
    earned: false,
  },
  { id: "state_champion", label: "State Champion", icon: "🏆", earned: false },
];

const MOCK_TRANSACTIONS: LoyaltyTransaction[][] = [
  [
    {
      id: "t1",
      date: "Jan 2026",
      reason: "12 months active bonus",
      amount: 500,
    },
    {
      id: "t2",
      date: "Dec 2025",
      reason: "5-star review received (×3)",
      amount: 150,
    },
    {
      id: "t3",
      date: "Nov 2025",
      reason: "Revenue milestone ₹50,000",
      amount: 500,
    },
    {
      id: "t4",
      date: "Oct 2025",
      reason: "Consecutive weekly orders",
      amount: 75,
    },
    { id: "t5", date: "Sep 2025", reason: "First sale completed", amount: 200 },
  ],
  [
    {
      id: "t1",
      date: "Feb 2026",
      reason: "5-star review received",
      amount: 50,
    },
    {
      id: "t2",
      date: "Jan 2026",
      reason: "Revenue milestone ₹20,000",
      amount: 200,
    },
    {
      id: "t3",
      date: "Dec 2025",
      reason: "Consecutive weekly orders",
      amount: 75,
    },
    { id: "t4", date: "Nov 2025", reason: "First product listed", amount: 100 },
    { id: "t5", date: "Oct 2025", reason: "First sale completed", amount: 200 },
  ],
  [
    {
      id: "t1",
      date: "Mar 2026",
      reason: "5-star review received",
      amount: 50,
    },
    {
      id: "t2",
      date: "Feb 2026",
      reason: "Revenue milestone ₹30,000",
      amount: 300,
    },
    { id: "t3", date: "Jan 2026", reason: "First product listed", amount: 100 },
    { id: "t4", date: "Dec 2025", reason: "First sale completed", amount: 200 },
    {
      id: "t5",
      date: "Nov 2025",
      reason: "Consecutive weekly orders",
      amount: 75,
    },
  ],
  [
    {
      id: "t1",
      date: "Mar 2026",
      reason: "Revenue milestone ₹25,000",
      amount: 250,
    },
    {
      id: "t2",
      date: "Feb 2026",
      reason: "5-star review received",
      amount: 50,
    },
    {
      id: "t3",
      date: "Jan 2026",
      reason: "Consecutive weekly orders",
      amount: 75,
    },
    { id: "t4", date: "Dec 2025", reason: "First product listed", amount: 100 },
    { id: "t5", date: "Nov 2025", reason: "First sale completed", amount: 200 },
  ],
  [
    { id: "t1", date: "Mar 2026", reason: "First sale completed", amount: 200 },
    {
      id: "t2",
      date: "Feb 2026",
      reason: "Revenue milestone ₹10,000",
      amount: 100,
    },
    { id: "t3", date: "Feb 2026", reason: "First product listed", amount: 100 },
    {
      id: "t4",
      date: "Jan 2026",
      reason: "Consecutive weekly orders",
      amount: 75,
    },
    {
      id: "t5",
      date: "Jan 2026",
      reason: "5-star review received",
      amount: 50,
    },
  ],
];

// ============================================
// HELPERS
// ============================================

function getMakerBalance(makerId: number, productCount: number): number {
  return makerId * 350 + productCount * 50;
}

function getCurrentTier(balance: number) {
  return (
    MAKER_TIERS.find((t) => balance >= t.min && balance <= t.max) ??
    MAKER_TIERS[0]
  );
}

function getNextTier(balance: number) {
  const idx = MAKER_TIERS.findIndex(
    (t) => balance >= t.min && balance <= t.max,
  );
  return MAKER_TIERS[idx + 1] ?? null;
}

// ============================================
// MAIN PAGE
// ============================================

export default function MakerProfilePage() {
  const search = useSearch({ strict: false }) as { makerId?: string };
  const makerIdParam = Number(search?.makerId ?? "1");

  const makersQuery = useGetAllMakers();
  const productsQuery = useGetAllProducts();

  const makers = makersQuery.data ?? [];
  const products = productsQuery.data ?? [];

  const makerIndex = Math.max(
    0,
    (makerIdParam - 1) % Math.max(makers.length, 1),
  );
  const maker = makers[makerIndex] ?? null;

  const makerProducts = maker
    ? products.filter((p) => Number(p.makerId) === Number(maker.id))
    : [];

  const asharfiBalance = maker
    ? getMakerBalance(makerIndex + 1, makerProducts.length)
    : 0;
  const currentTier = getCurrentTier(asharfiBalance);
  const nextTier = getNextTier(asharfiBalance);

  const txList = MOCK_TRANSACTIONS[makerIndex % MOCK_TRANSACTIONS.length];

  const categories = [...new Set(makerProducts.map((p) => p.category))];

  if (makersQuery.isLoading || productsQuery.isLoading) {
    return (
      <main className="min-h-screen pt-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-8 space-y-5">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-60 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      </main>
    );
  }

  if (!maker) {
    return (
      <main className="min-h-screen pt-16 bg-background flex items-center justify-center">
        <div
          className="text-center py-16 text-muted-foreground font-body"
          data-ocid="maker.profile.empty_state"
        >
          <ChefHat className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg font-semibold">Maker not found</p>
          <p className="text-sm mt-1">This Aunty's profile is coming soon!</p>
          <Link
            to="/makers"
            className="inline-flex items-center gap-2 mt-4 text-saffron hover:underline text-sm font-semibold"
          >
            <ExternalLink className="w-4 h-4" />
            View all Aunties
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-16 bg-background">
      {/* Header Banner */}
      <div
        className="relative"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.06 42) 0%, oklch(0.30 0.08 38) 60%, oklch(0.25 0.10 22) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10 text-[10rem] flex items-center justify-end pr-8 select-none overflow-hidden">
          🧑‍🍳
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-8 sm:py-10 relative">
          <div className="flex items-start gap-5">
            <div className="relative shrink-0">
              <img
                src={getMakerImage(maker.name)}
                alt={maker.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2"
                style={{ borderColor: "oklch(0.84 0.15 82 / 0.4)" }}
              />
              <div
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm border"
                style={{
                  background: "oklch(0.65 0.22 46)",
                  borderColor: "oklch(0.84 0.15 82 / 0.4)",
                }}
              >
                {currentTier.icon}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-body font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                  style={{
                    color: "oklch(0.84 0.15 82)",
                    borderColor: "oklch(0.84 0.15 82 / 0.3)",
                    background: "oklch(0.84 0.15 82 / 0.12)",
                  }}
                >
                  <MapPin className="w-3 h-3 inline mr-1" />
                  {maker.state}
                </span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                {maker.name}
              </h1>
              <p className="text-white/60 font-body text-sm line-clamp-2 mb-3">
                {maker.bio}
              </p>
              <AsharfiBadge
                balance={asharfiBalance}
                tier={currentTier.name as "Choudhary Aunty Legend"}
                size="sm"
                className="border-white/20"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-8 space-y-6">
        {/* Maker Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3"
        >
          {[
            {
              label: "Products Listed",
              value: makerProducts.length,
              icon: Package,
              color: "text-saffron",
            },
            {
              label: "Categories",
              value: categories.length,
              icon: ChefHat,
              color: "text-terracotta",
            },
            {
              label: "Active Since",
              value: "2025",
              icon: Award,
              color: "text-green-600",
            },
          ].map((stat, idx) => (
            <Card
              key={stat.label}
              className="text-center border-border shadow-xs hover:shadow-warm transition-shadow"
              data-ocid={`maker.profile.card.${idx + 1}`}
            >
              <CardContent className="py-4 px-3">
                <stat.icon className={`w-5 h-5 mx-auto mb-1.5 ${stat.color}`} />
                <div className="font-display text-xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="font-body text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Story Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border bg-gradient-to-br from-saffron/5 to-background shadow-xs hover:shadow-warm transition-shadow">
            <CardContent className="py-5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base font-semibold text-foreground mb-1">
                  Her Story — In Her Own Words
                </h3>
                <p className="text-muted-foreground font-body text-sm line-clamp-2">
                  {maker.story
                    ? `${maker.story.substring(0, 120)}...`
                    : `The story of ${maker.name} — from ${maker.state}'s humble kitchen to bringing joy to families across India.`}
                </p>
              </div>
              <Link
                to="/maker/$id"
                params={{ id: maker.id.toString() }}
                className="shrink-0 flex items-center gap-1.5 text-saffron hover:text-terracotta font-body text-sm font-semibold transition-colors"
                data-ocid="maker.profile.link"
              >
                Read Full Story
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Loyalty Card — Aunty Edition */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div
            className="relative overflow-hidden rounded-2xl border"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.30 0.14 38) 0%, oklch(0.22 0.06 42) 40%, oklch(0.35 0.10 55) 100%)",
              borderColor: "oklch(0.65 0.22 46 / 0.3)",
            }}
          >
            <div className="absolute inset-0 opacity-10 select-none">
              <div className="absolute top-3 right-8 text-7xl">👩‍🍳</div>
              <div className="absolute bottom-3 left-4 text-5xl opacity-40">
                ✦
              </div>
            </div>

            <div className="relative p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div
                    className="text-xs font-body uppercase tracking-[0.2em] font-semibold mb-1 flex items-center gap-1.5"
                    style={{ color: "oklch(0.84 0.15 82)" }}
                  >
                    🏅 Rishta Rewards — Aunty Edition
                  </div>
                  <h2 className="font-display text-2xl font-bold text-white">
                    {maker.name.split(" ")[0]}'s Gullak
                  </h2>
                </div>
                <div
                  className="px-3 py-1.5 rounded-full border text-xs font-bold font-body"
                  style={{
                    background: "oklch(0.65 0.22 46 / 0.2)",
                    borderColor: "oklch(0.65 0.22 46 / 0.5)",
                    color: "oklch(0.84 0.15 82)",
                  }}
                >
                  {currentTier.icon} {currentTier.name}
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-5">
                <span
                  className="font-display text-5xl font-bold"
                  style={{ color: "oklch(0.84 0.15 82)" }}
                >
                  {asharfiBalance.toLocaleString("en-IN")}
                </span>
                <div>
                  <div className="text-white/70 font-body text-sm font-semibold">
                    Asharfi
                  </div>
                  <div className="text-white/40 font-body text-xs">
                    Earned through your craft
                  </div>
                </div>
              </div>

              {/* Progress */}
              {nextTier ? (
                <div className="mb-5">
                  <div className="flex justify-between text-xs font-body mb-1.5">
                    <span className="text-white/60">{currentTier.name}</span>
                    <span style={{ color: "oklch(0.84 0.15 82)" }}>
                      {nextTier.min - asharfiBalance} Asharfi to {nextTier.name}
                    </span>
                    <span className="text-white/60">{nextTier.name}</span>
                  </div>
                  <div
                    className="h-2.5 w-full rounded-full"
                    style={{ background: "oklch(1 0 0 / 0.10)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.min(((asharfiBalance - currentTier.min) / (nextTier.min - currentTier.min)) * 100, 100)}%`,
                        background:
                          "linear-gradient(90deg, oklch(0.65 0.22 46), oklch(0.84 0.15 82))",
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="text-center py-2 rounded-lg font-body text-sm font-semibold mb-5"
                  style={{
                    background: "oklch(0.84 0.15 82 / 0.15)",
                    color: "oklch(0.84 0.15 82)",
                  }}
                >
                  👑 Legend Status — Maximum Tier Achieved!
                </div>
              )}

              {/* Achievements */}
              <div>
                <div className="text-white/50 text-xs font-body uppercase tracking-wider mb-2">
                  Achievements
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ACHIEVEMENTS.map((badge) => (
                    <div
                      key={badge.id}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl text-center transition-all ${
                        badge.earned
                          ? "bg-white/10 border border-white/20"
                          : "bg-black/20 border border-white/5 opacity-40"
                      }`}
                    >
                      <span className="text-2xl">{badge.icon}</span>
                      <span className="text-white/70 font-body text-xs leading-tight">
                        {badge.label}
                      </span>
                      {badge.earned && (
                        <span className="text-green-400 text-xs font-body">
                          ✓ Earned
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Earning Criteria */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border shadow-xs hover:shadow-warm transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-saffron" />
                How Aunties Earn Asharfi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MAKER_EARNING_CRITERIA.map((criterion, idx) => (
                  <div
                    key={criterion.label}
                    className="flex items-center gap-3 p-3 bg-muted/60 rounded-xl border border-border hover:border-saffron/30 transition-colors"
                    data-ocid={`maker.loyalty.item.${idx + 1}`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-background flex items-center justify-center shrink-0 border border-border">
                      <criterion.icon
                        className={`w-4 h-4 ${criterion.color}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-body font-medium text-foreground">
                        {criterion.label}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="text-saffron font-bold font-body text-sm">
                        +{criterion.points}
                      </span>
                      <span className="text-muted-foreground font-body text-xs ml-1">
                        🪙
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Maker Tiers */}
              <div>
                <h4 className="font-display text-sm font-semibold text-foreground mb-3">
                  Maker Tier Levels
                </h4>
                <div className="space-y-2">
                  {MAKER_TIERS.map((tier) => (
                    <div
                      key={tier.name}
                      className={`flex items-center gap-3 p-2.5 rounded-lg border ${
                        currentTier.name === tier.name
                          ? "border-saffron/40 bg-saffron/8"
                          : "border-border bg-background"
                      }`}
                    >
                      <span className="text-lg">{tier.icon}</span>
                      <div className="flex-1 min-w-0">
                        <span className="font-body text-sm font-semibold text-foreground">
                          {tier.name}
                        </span>
                        <span className="text-muted-foreground font-body text-xs ml-2">
                          {tier.max === Number.POSITIVE_INFINITY
                            ? `${tier.min}+`
                            : `${tier.min}–${tier.max}`}{" "}
                          Asharfi
                        </span>
                      </div>
                      {currentTier.name === tier.name && (
                        <Badge className="bg-saffron/10 text-saffron border-saffron/25 text-xs font-body">
                          Current
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-border shadow-xs hover:shadow-warm transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-saffron" />
                Recent Asharfi Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {txList.map((tx, idx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border hover:bg-muted/80 transition-colors"
                    data-ocid={`maker.transactions.item.${idx + 1}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm text-green-600">
                        +
                      </div>
                      <div>
                        <div className="text-sm font-body font-medium text-foreground">
                          {tx.reason}
                        </div>
                        <div className="text-xs font-body text-muted-foreground">
                          {tx.date}
                        </div>
                      </div>
                    </div>
                    <div className="font-bold font-body text-sm text-green-600">
                      +{tx.amount} 🪙
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Products */}
        {makerProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-border shadow-xs hover:shadow-warm transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display text-lg flex items-center gap-2">
                    <Package className="w-5 h-5 text-saffron" />
                    Products by {maker.name.split(" ")[0]}
                  </CardTitle>
                  <Link
                    to="/shop"
                    className="text-saffron hover:text-terracotta font-body text-sm font-semibold flex items-center gap-1 transition-colors"
                    data-ocid="maker.products.link"
                  >
                    View all <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {makerProducts.slice(0, 5).map((product, idx) => (
                    <div
                      key={product.id.toString()}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50 border border-border hover:border-saffron/30 transition-colors"
                      data-ocid={`maker.products.item.${idx + 1}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-body font-semibold text-foreground">
                          {product.name}
                        </div>
                        <div className="text-xs font-body text-muted-foreground capitalize">
                          {product.category} · Min {product.minBatchKg}kg batch
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-saffron font-bold font-body text-sm">
                          ₹{product.sellingPrice}
                        </div>
                        <div className="text-muted-foreground text-xs font-body line-through">
                          ₹{product.mrp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {makerProducts.length > 5 && (
                  <p className="text-xs text-center text-muted-foreground font-body mt-3">
                    +{makerProducts.length - 5} more products in shop
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </main>
  );
}

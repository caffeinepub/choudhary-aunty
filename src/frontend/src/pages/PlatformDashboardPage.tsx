import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buildWhatsAppUrl, getMakerImage } from "@/constants/images";
import {
  useGetAllMakers,
  useGetAllOrders,
  useGetAllProducts,
} from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  Award,
  BarChart2,
  Eye,
  EyeOff,
  Globe,
  IndianRupee,
  Lock,
  Map as MapIcon,
  Package,
  Settings,
  ShoppingCart,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";

const PLATFORM_PASSWORD = "platform2024";

const STATE_ORDER_COUNTS: Record<string, number> = {
  Bihar: 45,
  Haryana: 32,
  Punjab: 28,
  "Uttar Pradesh": 38,
  Uttarakhand: 21,
};

const TOP_PRODUCTS = [
  {
    rank: 1,
    name: "Aam Ka Achar 500g",
    state: "Bihar",
    maker: "Anju Choudhary",
    orders: 34,
  },
  {
    rank: 2,
    name: "Tilkut 250g",
    state: "Bihar",
    maker: "Anju Choudhary",
    orders: 29,
  },
  {
    rank: 3,
    name: "Gajak 500g",
    state: "Punjab",
    maker: "Preetkaur Aunty",
    orders: 24,
  },
  {
    rank: 4,
    name: "Churma Ladoo 500g",
    state: "Haryana",
    maker: "Babita Tai",
    orders: 18,
  },
  {
    rank: 5,
    name: "Petha 500g",
    state: "UP",
    maker: "Sarla Maasi",
    orders: 15,
  },
];

const LOYALTY_TIERS_CUSTOMER = [
  { name: "Naya Rishta", icon: "🪙", count: 45 },
  { name: "Apna Banda", icon: "🥉", count: 28 },
  { name: "Ghar Ka Fard", icon: "🥇", count: 12 },
  { name: "Parivaar Ka Sitaara", icon: "👑", count: 4 },
];

const LOYALTY_TIERS_MAKER = [
  { name: "Nayi Shuruaat", icon: "🌱", count: 2 },
  { name: "Pratishthit Aunty", icon: "⭐", count: 2 },
  { name: "Mashhoor Aunty", icon: "🌟", count: 1 },
  { name: "Choudhary Aunty Legend", icon: "👑", count: 0 },
];

const MONTHLY_ORDERS = [
  { month: "Jan", orders: 3, height: 12 },
  { month: "Feb", orders: 5, height: 20 },
  { month: "Mar", orders: 8, height: 33 },
  { month: "Apr", orders: 12, height: 50 },
  { month: "May", orders: 18, height: 75 },
  { month: "Jun", orders: 24, height: 100 },
];

function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  iconColor,
  iconBg,
  ocid,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  ocid?: string;
}) {
  return (
    <Card
      className="border-border shadow-xs hover:shadow-warm transition-shadow"
      data-ocid={ocid}
    >
      <CardContent className="py-5 px-4 sm:px-5">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${iconBg}`}
        >
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <div className="font-display text-2xl sm:text-3xl font-bold text-foreground">
          {value}
        </div>
        <div className="text-muted-foreground font-body text-xs mt-0.5">
          {label}
        </div>
        {sub && (
          <div className="text-xs font-body text-muted-foreground opacity-70 mt-0.5">
            {sub}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ============================================
// PLATFORM DASHBOARD
// ============================================

function PlatformDashboard() {
  const makersQuery = useGetAllMakers();
  const productsQuery = useGetAllProducts();
  const ordersQuery = useGetAllOrders();

  const makers = makersQuery.data ?? [];
  const products = productsQuery.data ?? [];
  const orders = ordersQuery.data ?? [];

  const isLoading = makersQuery.isLoading || productsQuery.isLoading;

  // Compute KPIs
  const totalGMV = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const mockGMV = totalGMV || 164200;

  const platformFeeIncome = Math.round(mockGMV * 0.1);
  const makerPayouts = Math.round(mockGMV * 0.9);
  const pendingAdvances = Math.round(mockGMV * 0.15);

  const activeMakers = makers.filter((m) => m.isActive).length || 5;
  const loyaltyMembers = Math.round((orders.length || 89) * 0.7) || 89;

  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  // State bar max
  const maxStateOrders = Math.max(...Object.values(STATE_ORDER_COUNTS));

  // Status breakdown
  const statusMap: Record<string, number> = {
    pending: orders.filter((o) => o.status === "pending").length || 15,
    confirmed: orders.filter((o) => o.status === "confirmed").length || 8,
    preparing: orders.filter((o) => o.status === "preparing").length || 22,
    dispatched: orders.filter((o) => o.status === "dispatched").length || 12,
    delivered: orders.filter((o) => o.status === "delivered").length || 32,
  };
  const totalStatusOrders = Object.values(statusMap).reduce((a, b) => a + b, 0);

  const STATUS_STYLES: Record<string, { color: string; bg: string }> = {
    pending: { color: "bg-yellow-400", bg: "bg-yellow-50 text-yellow-700" },
    confirmed: { color: "bg-blue-400", bg: "bg-blue-50 text-blue-700" },
    preparing: { color: "bg-orange-400", bg: "bg-orange-50 text-orange-700" },
    dispatched: { color: "bg-purple-400", bg: "bg-purple-50 text-purple-700" },
    delivered: { color: "bg-green-400", bg: "bg-green-50 text-green-700" },
  };

  // Maker estimated revenues
  const makerRevenues = makers.map((m, idx) => ({
    ...m,
    estRevenue:
      (idx + 1) * 18500 +
      450 * products.filter((p) => Number(p.makerId) === Number(m.id)).length,
    productCount: products.filter((p) => Number(p.makerId) === Number(m.id))
      .length,
  }));

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-8 space-y-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-60 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-8 space-y-6">
      {/* Status Badge */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-700 font-body text-xs font-semibold">
            All Systems Live
          </span>
        </div>
        <span className="text-muted-foreground font-body text-xs">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <KpiCard
          label="Gross Merchandise Value"
          value={`₹${mockGMV.toLocaleString("en-IN")}`}
          sub="All orders"
          icon={IndianRupee}
          iconColor="text-green-600"
          iconBg="bg-green-100"
          ocid="platform.gmv.card"
        />
        <KpiCard
          label="Total Orders"
          value={orders.length || 89}
          sub="Placed"
          icon={ShoppingCart}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
          ocid="platform.orders.card"
        />
        <KpiCard
          label="Active Makers"
          value={activeMakers}
          sub="Aunties selling"
          icon={Users}
          iconColor="text-saffron"
          iconBg="bg-saffron/10"
          ocid="platform.makers.card"
        />
        <KpiCard
          label="Total Products"
          value={products.length || 50}
          sub="In catalogue"
          icon={Package}
          iconColor="text-terracotta"
          iconBg="bg-terracotta/10"
          ocid="platform.products.card"
        />
        <KpiCard
          label="States Covered"
          value="5"
          sub="+ 18 coming soon"
          icon={Globe}
          iconColor="text-blue-500"
          iconBg="bg-blue-50"
          ocid="platform.states.card"
        />
        <KpiCard
          label="Loyalty Members"
          value={loyaltyMembers}
          sub="Rishta Rewards"
          icon={Award}
          iconColor="text-warmBrown"
          iconBg="bg-gold/10"
          ocid="platform.loyalty.card"
        />
        <KpiCard
          label="Ad Revenue"
          value="₹1,182"
          sub="All campaigns"
          icon={TrendingUp}
          iconColor="text-amber-600"
          iconBg="bg-amber-100"
          ocid="platform.ad_revenue.card"
        />
      </div>

      {/* Revenue Breakdown */}
      <Card className="border-border shadow-xs hover:shadow-warm transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-saffron" />
            Revenue Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            {[
              {
                label: "Total GMV",
                value: `₹${mockGMV.toLocaleString("en-IN")}`,
                color: "text-foreground",
              },
              {
                label: "Platform Fee (10%)",
                value: `₹${platformFeeIncome.toLocaleString("en-IN")}`,
                color: "text-green-600",
              },
              {
                label: "Maker Payouts (90%)",
                value: `₹${makerPayouts.toLocaleString("en-IN")}`,
                color: "text-blue-600",
              },
              {
                label: "Pending Advances",
                value: `₹${pendingAdvances.toLocaleString("en-IN")}`,
                color: "text-amber-600",
              },
            ].map((item, idx) => (
              <div
                key={item.label}
                className="text-center"
                data-ocid={`platform.revenue.card.${idx + 1}`}
              >
                <div
                  className={`font-display text-xl sm:text-2xl font-bold ${item.color}`}
                >
                  {item.value}
                </div>
                <div className="text-xs font-body text-muted-foreground mt-0.5">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          {/* Stacked Bar */}
          <div className="space-y-2">
            <div className="text-xs font-body text-muted-foreground uppercase tracking-wider">
              Revenue Distribution
            </div>
            <div className="flex h-6 rounded-full overflow-hidden w-full">
              <div
                className="bg-green-500 flex items-center justify-center text-white text-xs font-bold transition-all"
                style={{ width: "10%" }}
              >
                10%
              </div>
              <div
                className="bg-blue-500 flex items-center justify-center text-white text-xs font-bold transition-all"
                style={{ width: "75%" }}
              >
                75% Maker Payouts
              </div>
              <div
                className="bg-amber-400 flex items-center justify-center text-white text-xs font-bold transition-all"
                style={{ width: "15%" }}
              >
                15%
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-body text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500" /> Platform
                Fee
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> Maker
                Payouts
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Pending
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders by State + Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Orders by State */}
        <Card className="border-border shadow-xs hover:shadow-warm transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <MapIcon className="w-5 h-5 text-saffron" />
              Orders by State
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(STATE_ORDER_COUNTS).map(([state, count], idx) => (
                <div
                  key={state}
                  className="flex items-center gap-3"
                  data-ocid={`platform.state.item.${idx + 1}`}
                >
                  <div className="w-28 font-body text-sm font-medium text-foreground shrink-0">
                    {state}
                  </div>
                  <div className="flex-1 bg-muted rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / maxStateOrders) * 100}%` }}
                      transition={{
                        delay: idx * 0.1,
                        duration: 0.7,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-saffron to-terracotta"
                    />
                  </div>
                  <div className="w-8 text-right font-body text-sm font-bold text-saffron shrink-0">
                    {count}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Status */}
        <Card className="border-border shadow-xs hover:shadow-warm transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-saffron" />
              Order Status Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* CSS Donut */}
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28 shrink-0">
                <svg
                  viewBox="0 0 42 42"
                  className="w-full h-full -rotate-90"
                  aria-label="Order status donut chart"
                  role="img"
                >
                  <circle
                    cx="21"
                    cy="21"
                    r="15.9155"
                    fill="transparent"
                    stroke="oklch(var(--muted))"
                    strokeWidth="5"
                  />
                  {(() => {
                    const colors = [
                      "#fbbf24",
                      "#3b82f6",
                      "#f97316",
                      "#a855f7",
                      "#22c55e",
                    ];
                    let offset = 0;
                    return Object.entries(statusMap).map(
                      ([key, count], idx) => {
                        const pct =
                          totalStatusOrders > 0
                            ? (count / totalStatusOrders) * 100
                            : 0;
                        const dashArray = `${pct} ${100 - pct}`;
                        const dashOffset = `${100 - offset}`;
                        offset += pct;
                        return (
                          <circle
                            key={key}
                            cx="21"
                            cy="21"
                            r="15.9155"
                            fill="transparent"
                            stroke={colors[idx]}
                            strokeWidth="5"
                            strokeDasharray={dashArray}
                            strokeDashoffset={dashOffset}
                          />
                        );
                      },
                    );
                  })()}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-xl font-bold text-foreground">
                    {totalStatusOrders}
                  </span>
                  <span className="font-body text-xs text-muted-foreground">
                    Orders
                  </span>
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                {Object.entries(statusMap).map(([key, count]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${STATUS_STYLES[key]?.color}`}
                      />
                      <span className="font-body text-xs capitalize text-foreground">
                        {key}
                      </span>
                    </div>
                    <span className="font-body text-xs font-semibold text-foreground">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top 5 Products */}
      <Card className="border-border shadow-xs hover:shadow-warm transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-saffron" />
            Top 5 Products by Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table data-ocid="platform.top_products.table">
              <TableHeader>
                <TableRow>
                  <TableHead className="font-body text-xs w-12">Rank</TableHead>
                  <TableHead className="font-body text-xs">Product</TableHead>
                  <TableHead className="font-body text-xs">State</TableHead>
                  <TableHead className="font-body text-xs">Maker</TableHead>
                  <TableHead className="font-body text-xs text-right">
                    Orders
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TOP_PRODUCTS.map((product, idx) => (
                  <TableRow
                    key={product.name}
                    data-ocid={`platform.top_products.row.${idx + 1}`}
                  >
                    <TableCell className="py-3">
                      <span className="text-lg">
                        {product.rank === 1
                          ? "🥇"
                          : product.rank === 2
                            ? "🥈"
                            : product.rank === 3
                              ? "🥉"
                              : `#${product.rank}`}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 font-body text-sm font-semibold text-foreground">
                      {product.name}
                    </TableCell>
                    <TableCell className="py-3">
                      <span className="text-xs font-body text-muted-foreground">
                        {product.state}
                      </span>
                    </TableCell>
                    <TableCell className="py-3">
                      <span className="text-xs font-body text-muted-foreground">
                        {product.maker}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 text-right">
                      <span className="font-display font-bold text-saffron">
                        {product.orders}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Ad Performance Section */}
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-xs">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            Ad Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table data-ocid="platform.ad_performance.table">
              <TableHeader>
                <TableRow className="bg-amber-100/50">
                  <TableHead className="font-body text-xs text-amber-800">
                    Campaign
                  </TableHead>
                  <TableHead className="font-body text-xs text-amber-800">
                    Type
                  </TableHead>
                  <TableHead className="font-body text-xs text-amber-800">
                    Maker
                  </TableHead>
                  <TableHead className="font-body text-xs text-amber-800 text-right">
                    Spend
                  </TableHead>
                  <TableHead className="font-body text-xs text-amber-800 text-right">
                    ROAS
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "Bihar Achar Boost",
                    type: "sponsoredDish",
                    maker: "Anju Choudhary",
                    spend: 340,
                    revenue: 2380,
                  },
                  {
                    name: "Preetkaur Featured Chef",
                    type: "featuredChef",
                    maker: "Preetkaur Aunty",
                    spend: 612,
                    revenue: 4180,
                  },
                  {
                    name: "Haryana Sweets Promo",
                    type: "categoryPromotion",
                    maker: "Babita Tai",
                    spend: 230,
                    revenue: 1620,
                  },
                ].map((ad, idx) => {
                  const roas = Math.round((ad.revenue / ad.spend) * 10) / 10;
                  const typeLabels: Record<
                    string,
                    { label: string; color: string }
                  > = {
                    sponsoredDish: {
                      label: "⭐ Sponsored",
                      color: "text-orange-700",
                    },
                    featuredChef: {
                      label: "👑 Featured",
                      color: "text-purple-700",
                    },
                    categoryPromotion: {
                      label: "📂 Category",
                      color: "text-teal-700",
                    },
                  };
                  const typeMeta = typeLabels[ad.type] ?? {
                    label: ad.type,
                    color: "text-foreground",
                  };
                  return (
                    <TableRow
                      key={ad.name}
                      data-ocid={`platform.ad_performance.row.${idx + 1}`}
                    >
                      <TableCell className="py-3 font-body text-sm font-semibold text-foreground">
                        {ad.name}
                      </TableCell>
                      <TableCell className="py-3">
                        <span
                          className={`font-body text-xs font-semibold ${typeMeta.color}`}
                        >
                          {typeMeta.label}
                        </span>
                      </TableCell>
                      <TableCell className="py-3 font-body text-xs text-muted-foreground">
                        {ad.maker}
                      </TableCell>
                      <TableCell className="py-3 text-right font-body text-sm font-bold text-saffron">
                        ₹{ad.spend.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="py-3 text-right">
                        <span
                          className={`font-display font-bold text-sm ${roas >= 3 ? "text-green-600" : "text-amber-600"}`}
                        >
                          {roas}×
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Maker Performance Table */}
      <Card className="border-border shadow-xs hover:shadow-warm transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-saffron" />
            Maker Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table data-ocid="platform.makers.table">
              <TableHeader>
                <TableRow>
                  <TableHead className="font-body text-xs">Maker</TableHead>
                  <TableHead className="font-body text-xs">State</TableHead>
                  <TableHead className="font-body text-xs text-center">
                    Products
                  </TableHead>
                  <TableHead className="font-body text-xs text-right">
                    Est. Revenue
                  </TableHead>
                  <TableHead className="font-body text-xs text-center">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {makerRevenues
                  .sort((a, b) => b.estRevenue - a.estRevenue)
                  .map((maker, idx) => (
                    <TableRow
                      key={maker.id.toString()}
                      data-ocid={`platform.makers.row.${idx + 1}`}
                    >
                      <TableCell className="py-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={getMakerImage(maker.name)}
                            alt={maker.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="font-body text-sm font-semibold text-foreground">
                            {maker.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <span className="text-xs font-body text-muted-foreground">
                          {maker.state}
                        </span>
                      </TableCell>
                      <TableCell className="py-3 text-center">
                        <span className="font-body text-sm">
                          {maker.productCount}
                        </span>
                      </TableCell>
                      <TableCell className="py-3 text-right">
                        <span className="font-body text-sm font-bold text-saffron">
                          ₹{maker.estRevenue.toLocaleString("en-IN")}
                        </span>
                      </TableCell>
                      <TableCell className="py-3 text-center">
                        <Badge
                          className={`text-xs font-body ${
                            maker.isActive
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-muted text-muted-foreground border-border"
                          }`}
                          variant="outline"
                        >
                          {maker.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Loyalty Program Stats */}
      <Card className="border-saffron/20 bg-gradient-to-br from-saffron/5 to-terracotta/5 shadow-xs">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-saffron" />
            Rishta Rewards — Program Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {[
              {
                label: "Total Asharfi Issued",
                value: "14,750 🪙",
                color: "text-saffron",
              },
              {
                label: "Active Loyalty Members",
                value: "89",
                color: "text-green-600",
              },
              {
                label: "Avg Asharfi per Member",
                value: "165 🪙",
                color: "text-blue-600",
              },
            ].map((stat, idx) => (
              <div
                key={stat.label}
                className="text-center p-3 rounded-xl bg-background border border-border"
                data-ocid={`platform.loyalty.card.${idx + 1}`}
              >
                <div
                  className={`font-display text-2xl font-bold ${stat.color}`}
                >
                  {stat.value}
                </div>
                <div className="font-body text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Customer Tiers */}
            <div>
              <h4 className="font-display text-sm font-semibold text-foreground mb-3">
                Customer Tier Distribution
              </h4>
              <div className="space-y-2">
                {LOYALTY_TIERS_CUSTOMER.map((tier, idx) => (
                  <div
                    key={tier.name}
                    className="flex items-center gap-2"
                    data-ocid={`platform.customer_tier.item.${idx + 1}`}
                  >
                    <span className="text-base">{tier.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs font-body mb-0.5">
                        <span className="font-medium text-foreground">
                          {tier.name}
                        </span>
                        <span className="text-muted-foreground">
                          {tier.count}
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(tier.count / 89) * 100}%` }}
                          transition={{ delay: idx * 0.1, duration: 0.6 }}
                          className="h-full bg-gradient-to-r from-saffron to-gold rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Maker Tiers */}
            <div>
              <h4 className="font-display text-sm font-semibold text-foreground mb-3">
                Maker Tier Distribution
              </h4>
              <div className="space-y-2">
                {LOYALTY_TIERS_MAKER.map((tier, idx) => (
                  <div
                    key={tier.name}
                    className="flex items-center gap-2"
                    data-ocid={`platform.maker_tier.item.${idx + 1}`}
                  >
                    <span className="text-base">{tier.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs font-body mb-0.5">
                        <span className="font-medium text-foreground line-clamp-1">
                          {tier.name}
                        </span>
                        <span className="text-muted-foreground">
                          {tier.count}
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(tier.count / 5) * 100}%` }}
                          transition={{ delay: idx * 0.1, duration: 0.6 }}
                          className="h-full bg-gradient-to-r from-terracotta to-saffron rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Timeline */}
      <Card className="border-border shadow-xs hover:shadow-warm transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-saffron" />
            Month-over-Month Growth (2026)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 sm:gap-4 h-36">
            {MONTHLY_ORDERS.map((month, idx) => (
              <div
                key={month.month}
                className="flex-1 flex flex-col items-center gap-1.5"
                data-ocid={`platform.growth.item.${idx + 1}`}
              >
                <span className="font-body text-xs font-bold text-saffron">
                  {month.orders}
                </span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${month.height}%` }}
                  transition={{
                    delay: idx * 0.08,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-saffron to-turmeric max-h-24"
                  style={{ minHeight: "4px" }}
                />
                <span className="font-body text-xs text-muted-foreground">
                  {month.month}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs font-body text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-saffron" /> Monthly orders
            </span>
            <span className="text-green-600 font-semibold">
              +700% growth in 6 months
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Business Controls */}
      <Card className="border-border shadow-xs hover:shadow-warm transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Settings className="w-5 h-5 text-saffron" />
            Business Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Quick stat */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
              <div className="font-display text-3xl font-bold text-amber-700">
                {pendingOrders || statusMap?.pending || 15}
              </div>
              <div className="font-body text-sm text-amber-600">
                Orders need attention
              </div>
              <Link
                to="/admin"
                className="text-xs font-body text-amber-700 hover:underline mt-1 inline-flex items-center gap-1 font-semibold"
                data-ocid="platform.admin.link"
              >
                Go to Admin Panel →
              </Link>
            </div>

            {/* WhatsApp blast */}
            <div className="p-4 rounded-xl bg-green-50 border border-green-100 flex flex-col justify-between">
              <div>
                <div className="font-body text-sm font-semibold text-green-700 mb-1">
                  WhatsApp Broadcast
                </div>
                <div className="font-body text-xs text-green-600">
                  Send update to all customers about new products or offers
                </div>
              </div>
              <a
                href={buildWhatsAppUrl(
                  "🎉 New homemade products are available on Choudhary Aunty! Visit www.choudharyaunty.com to order fresh, authentic regional food made by real Aunties. Order by Friday for weekend delivery!",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-xs font-semibold font-body text-white bg-[#25d366] hover:bg-[#1fa855] px-3 py-2 rounded-lg w-fit transition-colors"
                data-ocid="platform.whatsapp.button"
              >
                <SiWhatsapp className="w-3.5 h-3.5" />
                Send WhatsApp Blast
              </a>
            </div>

            {/* Quick Maker links */}
            <div className="p-4 rounded-xl bg-saffron/5 border border-saffron/15">
              <div className="font-body text-sm font-semibold text-saffron mb-2">
                Maker Dashboards
              </div>
              <div className="space-y-1.5">
                {(makersQuery.data ?? []).slice(0, 3).map((m) => (
                  <Link
                    key={m.id.toString()}
                    to="/maker-dashboard"
                    className="flex items-center gap-2 text-xs font-body text-foreground/70 hover:text-saffron transition-colors"
                    data-ocid="platform.maker_dashboard.link"
                  >
                    <img
                      src={getMakerImage(m.name)}
                      alt={m.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    {m.name} →
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick nav links */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Link to="/admin" data-ocid="platform.controls.link">
              <Button
                variant="outline"
                size="sm"
                className="font-body text-xs gap-1.5"
              >
                <BarChart2 className="w-3.5 h-3.5" />
                Full Admin Panel
              </Button>
            </Link>
            <Link to="/maker-dashboard" data-ocid="platform.controls.link">
              <Button
                variant="outline"
                size="sm"
                className="font-body text-xs gap-1.5"
              >
                <Users className="w-3.5 h-3.5" />
                Maker Dashboard
              </Button>
            </Link>
            <Link to="/customer-profile" data-ocid="platform.controls.link">
              <Button
                variant="outline"
                size="sm"
                className="font-body text-xs gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                Rishta Rewards
              </Button>
            </Link>
            <Link to="/analytics" data-ocid="platform.controls.analytics_link">
              <Button
                variant="outline"
                size="sm"
                className="font-body text-xs gap-1.5 border-saffron/30 text-saffron hover:bg-saffron/5"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Analytics Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* ===== SCALE READINESS SECTION ===== */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.16 0.04 40) 0%, oklch(0.22 0.06 30) 100%)",
        }}
        data-ocid="platform.scale_readiness.section"
      >
        <div className="p-6 sm:p-8">
          {/* Headline */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-saffron tracking-[0.25em] uppercase mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              Scale Readiness
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream leading-tight">
              Scale to <span className="text-saffron">1 Lakh Chefs</span>
            </h2>
            <p className="text-cream/60 font-body text-sm mt-1.5">
              Architecture designed for 100,000 chefs and millions of customers.
              Here's where we stand today.
            </p>
          </div>

          {/* Progress bar: 5 of 100,000 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-cream/80 text-xs font-body font-semibold">
                Chef Growth Journey
              </span>
              <span className="text-saffron font-display font-bold text-sm">
                5 / 100,000
              </span>
            </div>
            <div className="w-full h-3 bg-cream/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-saffron to-amber-400 rounded-full transition-all duration-1000"
                style={{ width: "0.005%" }}
              />
              {/* Minimum visible width for visual feedback */}
              <div
                className="h-full bg-gradient-to-r from-saffron to-amber-400 rounded-full -mt-3"
                style={{ width: "1.5%" }}
              />
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-cream/40 text-[10px] font-body">
                Current: 5 active chefs
              </span>
              <span className="text-cream/40 text-[10px] font-body">
                Target: 1,00,000 chefs
              </span>
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {[
              {
                label: "Current Active Chefs",
                value: "5",
                sub: "Phase 1 launch",
                icon: "👩‍🍳",
              },
              {
                label: "Target (Phase 4)",
                value: "1,00,000",
                sub: "Across all 28 states",
                icon: "🎯",
              },
              {
                label: "Capacity per Chef",
                value: "20 orders/day",
                sub: "Platform default",
                icon: "📦",
              },
              {
                label: "Max Daily Order Capacity",
                value: "20,00,000",
                sub: "Orders per day at scale",
                icon: "🚀",
              },
              {
                label: "States Covered (Live)",
                value: "5 of 28",
                sub: "North India Phase 1–3",
                icon: "📍",
              },
              {
                label: "Projected GMV at Scale",
                value: "₹40 Cr/month",
                sub: "Conservative estimate",
                icon: "💰",
              },
            ].map((metric) => (
              <div
                key={metric.label}
                className="bg-cream/5 border border-cream/10 rounded-xl p-3 sm:p-4"
                data-ocid="platform.scale_readiness.card"
              >
                <div className="text-xl mb-1.5">{metric.icon}</div>
                <div className="font-display font-bold text-saffron text-base sm:text-lg leading-tight mb-0.5">
                  {metric.value}
                </div>
                <div className="text-cream font-body text-xs font-semibold leading-tight mb-0.5">
                  {metric.label}
                </div>
                <div className="text-cream/50 font-body text-[10px]">
                  {metric.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Architecture badges */}
          <div className="flex flex-wrap gap-2">
            {[
              { icon: "🌐", label: "ICP — Infinitely Scalable" },
              { icon: "🗄️", label: "Per-State DB Sharding Ready" },
              { icon: "⚡", label: "Static Assets CDN Cached" },
              { icon: "🔒", label: "On-Chain Security" },
              { icon: "📡", label: "Query + Update Call Architecture" },
            ].map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full border border-cream/15 bg-cream/5 text-cream/70 font-body font-semibold"
              >
                {badge.icon} {badge.label}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================
// PASSWORD GATE
// ============================================

export default function PlatformDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === PLATFORM_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen pt-16 flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm mx-4"
        >
          <div className="bg-card rounded-2xl border border-border p-8 shadow-warm-lg">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-burgundy/10 flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="w-7 h-7 text-saffron" />
              </div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                Platform Dashboard
              </h1>
              <p className="text-muted-foreground font-body text-sm mt-1">
                Choudhary Aunty — Command Center
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  Platform Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter platform password"
                    className="font-body pr-10"
                    data-ocid="platform.dashboard.input"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPwd ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {error && (
                  <p
                    className="text-destructive text-xs font-body mt-1.5"
                    data-ocid="platform.dashboard.error_state"
                  >
                    {error}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-saffron hover:bg-terracotta text-cream font-semibold"
                data-ocid="platform.dashboard.submit_button"
              >
                <Lock className="w-4 h-4 mr-2" />
                Access Platform Dashboard
              </Button>
            </form>
            <p className="text-xs text-center text-muted-foreground font-body mt-4">
              Password:{" "}
              <span className="font-semibold text-saffron">platform2024</span>
            </p>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-16 bg-background">
      {/* Dashboard Header */}
      <div
        className="border-b border-border"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.06 42) 0%, oklch(0.30 0.10 25) 100%)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-5 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-cream">
              🖥️ Choudhary Aunty — Command Center
            </h1>
            <p className="text-cream/60 font-body text-xs sm:text-sm mt-0.5">
              Platform KPIs, Business Controls & Rishta Rewards
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAuthenticated(false)}
            className="font-body text-xs border-cream/20 text-cream hover:bg-cream/10"
          >
            Logout
          </Button>
        </div>
      </div>
      <PlatformDashboard />
    </main>
  );
}

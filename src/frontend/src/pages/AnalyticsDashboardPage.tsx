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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetAllAdCampaigns,
  useGetAllMakers,
  useGetAllOrders,
  useGetAllProducts,
} from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  BarChart2,
  Eye,
  EyeOff,
  IndianRupee,
  Lock,
  Map as MapIcon,
  Megaphone,
  RefreshCcw,
  Settings,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ============================================
// CONSTANTS & MOCK DATA
// ============================================

const ANALYTICS_PASSWORD = "analytics2024";

type TimeRange = "today" | "week" | "month" | "all";

interface TimeRangeData {
  totalOrders: number;
  dailyRevenue: number;
  avgOrderValue: number;
  repeatRate: number;
  totalCustomers: number;
  newCustomers: number;
  promotionRevenue: number;
  clv: number;
}

const TIME_RANGE_DATA: Record<TimeRange, TimeRangeData> = {
  all: {
    totalOrders: 89,
    dailyRevenue: 164200,
    avgOrderValue: 1845,
    repeatRate: 62,
    totalCustomers: 147,
    newCustomers: 28,
    promotionRevenue: 1182,
    clv: 4280,
  },
  month: {
    totalOrders: 21,
    dailyRevenue: 48600,
    avgOrderValue: 2314,
    repeatRate: 58,
    totalCustomers: 38,
    newCustomers: 12,
    promotionRevenue: 428,
    clv: 4280,
  },
  week: {
    totalOrders: 6,
    dailyRevenue: 18200,
    avgOrderValue: 2028,
    repeatRate: 54,
    totalCustomers: 14,
    newCustomers: 5,
    promotionRevenue: 180,
    clv: 4280,
  },
  today: {
    totalOrders: 2,
    dailyRevenue: 5400,
    avgOrderValue: 2700,
    repeatRate: 45,
    totalCustomers: 5,
    newCustomers: 2,
    promotionRevenue: 62,
    clv: 4280,
  },
};

const REVENUE_BARS: Record<TimeRange, { label: string; value: number }[]> = {
  all: [
    { label: "Jan", value: 12000 },
    { label: "Feb", value: 28000 },
    { label: "Mar", value: 45000 },
    { label: "Apr", value: 62000 },
    { label: "May", value: 89000 },
    { label: "Jun", value: 124000 },
  ],
  month: [
    { label: "Wk1", value: 8000 },
    { label: "Wk2", value: 12000 },
    { label: "Wk3", value: 18000 },
    { label: "Wk4", value: 24000 },
    { label: "Wk5", value: 31000 },
    { label: "Wk6", value: 42000 },
  ],
  week: [
    { label: "Mon", value: 1800 },
    { label: "Tue", value: 2400 },
    { label: "Wed", value: 3200 },
    { label: "Thu", value: 2900 },
    { label: "Fri", value: 4100 },
    { label: "Sat", value: 3800 },
  ],
  today: [
    { label: "6am", value: 400 },
    { label: "9am", value: 1200 },
    { label: "12pm", value: 2100 },
    { label: "3pm", value: 3600 },
    { label: "6pm", value: 4800 },
    { label: "9pm", value: 5400 },
  ],
};

const MAKER_ORDERS = [
  { name: "Anju Choudhary", state: "Bihar", orders: 45 },
  { name: "Sarla Maasi", state: "Uttar Pradesh", orders: 38 },
  { name: "Babita Tai", state: "Haryana", orders: 32 },
  { name: "Preetkaur Aunty", state: "Punjab", orders: 28 },
  { name: "Geeta Devi", state: "Uttarakhand", orders: 21 },
];

const TOP_DISHES = [
  {
    rank: 1,
    medal: "🥇",
    name: "Aam Ka Achar",
    state: "Bihar",
    maker: "Anju Choudhary",
    orders: 34,
  },
  {
    rank: 2,
    medal: "🥈",
    name: "Tilkut",
    state: "Bihar",
    maker: "Anju Choudhary",
    orders: 29,
  },
  {
    rank: 3,
    medal: "🥉",
    name: "Gajak",
    state: "Punjab",
    maker: "Preetkaur Aunty",
    orders: 24,
  },
  {
    rank: 4,
    medal: "#4",
    name: "Churma Ladoo",
    state: "Haryana",
    maker: "Babita Tai",
    orders: 18,
  },
  {
    rank: 5,
    medal: "#5",
    name: "Agra Petha",
    state: "Uttar Pradesh",
    maker: "Sarla Maasi",
    orders: 15,
  },
];

interface MakerAnalyticsData {
  totalRevenue: number;
  thisMonthRevenue: number;
  orders: number;
  avgRating: number;
  bestDishes: { name: string; orders: number }[];
}

const MAKER_ANALYTICS: MakerAnalyticsData[] = [
  {
    totalRevenue: 82350,
    thisMonthRevenue: 18200,
    orders: 45,
    avgRating: 4.9,
    bestDishes: [
      { name: "Aam Ka Achar", orders: 34 },
      { name: "Tilkut", orders: 22 },
      { name: "Sattu Ka Ladoo", orders: 18 },
    ],
  },
  {
    totalRevenue: 54400,
    thisMonthRevenue: 12800,
    orders: 32,
    avgRating: 4.8,
    bestDishes: [
      { name: "Churma Ladoo", orders: 18 },
      { name: "Methi Mathri", orders: 15 },
      { name: "Bajra Ladoo", orders: 12 },
    ],
  },
  {
    totalRevenue: 71820,
    thisMonthRevenue: 16400,
    orders: 38,
    avgRating: 4.7,
    bestDishes: [
      { name: "Agra Petha", orders: 15 },
      { name: "Besan Ladoo", orders: 14 },
      { name: "Nimbu Ka Achar", orders: 12 },
    ],
  },
  {
    totalRevenue: 51800,
    thisMonthRevenue: 11600,
    orders: 28,
    avgRating: 4.8,
    bestDishes: [
      { name: "Gajak", orders: 24 },
      { name: "Pinni", orders: 18 },
      { name: "Amritsari Achar", orders: 14 },
    ],
  },
  {
    totalRevenue: 38640,
    thisMonthRevenue: 8400,
    orders: 21,
    avgRating: 4.7,
    bestDishes: [
      { name: "Bal Mithai", orders: 16 },
      { name: "Buransh Sharbat", orders: 13 },
      { name: "Bhang Ki Chutney", orders: 10 },
    ],
  },
];

const STATE_PERFORMANCE = [
  { state: "Bihar", orders: 45, revenue: 82350, products: 10 },
  { state: "Haryana", orders: 32, revenue: 54400, products: 10 },
  { state: "Punjab", orders: 28, revenue: 51800, products: 10 },
  { state: "Uttar Pradesh", orders: 38, revenue: 71820, products: 10 },
  { state: "Uttarakhand", orders: 21, revenue: 38640, products: 10 },
];

const FUNNEL = [
  { label: "Visitors", value: 2840, pct: 100 },
  { label: "Product Views", value: 1420, pct: 50 },
  { label: "WhatsApp Clicks", value: 480, pct: 34 },
  { label: "Orders Placed", value: 164, pct: 34 },
  { label: "Repeat Orders", value: 102, pct: 62 },
];

const RFM_SEGMENTS = [
  { label: "Champions", count: 12, pct: 8, color: "bg-emerald-500" },
  { label: "Loyal Customers", count: 28, pct: 19, color: "bg-saffron" },
  { label: "Potential Loyalists", count: 38, pct: 26, color: "bg-amber-400" },
  { label: "New Customers", count: 45, pct: 31, color: "bg-blue-400" },
  { label: "At Risk", count: 18, pct: 12, color: "bg-orange-400" },
  { label: "Lost", count: 6, pct: 4, color: "bg-red-400" },
];

const AD_TYPE_COLORS: Record<string, string> = {
  sponsoredDish: "bg-saffron/15 text-saffron border-saffron/30",
  featuredChef: "bg-purple-100 text-purple-700 border-purple-200",
  categoryPromotion: "bg-blue-100 text-blue-700 border-blue-200",
  cityPromotion: "bg-green-100 text-green-700 border-green-200",
};
const AD_TYPE_LABELS: Record<string, string> = {
  sponsoredDish: "Sponsored Dish",
  featuredChef: "Featured Chef",
  categoryPromotion: "Category Promo",
  cityPromotion: "City Promo",
};

function formatCurrency(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

// ============================================
// KPI CARD
// ============================================

interface KpiCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconBg: string;
  delay?: number;
}

function KpiCard({ icon, label, value, iconBg, delay = 0 }: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
            >
              {icon}
            </div>
            <div className="min-w-0">
              <p className="font-body text-xs text-muted-foreground truncate">
                {label}
              </p>
              <p className="font-display font-bold text-xl text-foreground leading-tight mt-0.5">
                {value}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ============================================
// REVENUE BAR CHART
// ============================================

function RevenueBarChart({ timeRange }: { timeRange: TimeRange }) {
  const bars = REVENUE_BARS[timeRange];
  const maxVal = Math.max(...bars.map((b) => b.value));

  return (
    <div className="flex items-end gap-3 h-40 px-2">
      {bars.map((bar, i) => {
        const heightPct = (bar.value / maxVal) * 100;
        return (
          <div
            key={bar.label}
            className="flex-1 flex flex-col items-center gap-1"
          >
            <span className="font-body text-[10px] text-muted-foreground font-medium">
              {bar.value >= 1000
                ? `${(bar.value / 1000).toFixed(0)}k`
                : bar.value}
            </span>
            <div className="w-full flex items-end" style={{ height: "100px" }}>
              <motion.div
                key={`${timeRange}-${bar.label}`}
                initial={{ height: 0 }}
                animate={{ height: `${heightPct}%` }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                className="w-full rounded-t-md"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.72 0.22 46) 0%, oklch(0.55 0.18 30) 100%)",
                }}
              />
            </div>
            <span className="font-body text-[10px] text-muted-foreground">
              {bar.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ============================================
// CHEF ANALYTICS TAB
// ============================================

function ChefAnalyticsTab({
  makers,
}: { makers: { id: bigint; name: string }[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const displayMakers =
    makers.length > 0
      ? makers.slice(0, 5)
      : MAKER_ORDERS.map((m, i) => ({ id: BigInt(i + 1), name: m.name }));

  const data = MAKER_ANALYTICS[activeIdx] ?? MAKER_ANALYTICS[0];

  const ratingBars = [
    { stars: "5★", pct: 68 },
    { stars: "4★", pct: 22 },
    { stars: "3★", pct: 8 },
    { stars: "2★", pct: 2 },
  ];

  const promoPerfData = [
    {
      label: "Ad Spend",
      value: `₹${(800 + activeIdx * 120).toLocaleString("en-IN")}`,
    },
    {
      label: "Impressions",
      value: `${(1200 + activeIdx * 340).toLocaleString("en-IN")}`,
    },
    {
      label: "Clicks",
      value: `${(87 + activeIdx * 18).toLocaleString("en-IN")}`,
    },
    { label: "ROAS", value: `${(3.2 + activeIdx * 0.3).toFixed(1)}×` },
  ];

  return (
    <div className="space-y-4">
      {/* Maker selector tabs */}
      <div className="flex gap-2 flex-wrap">
        {displayMakers.map((m, i) => (
          <button
            key={m.id.toString()}
            type="button"
            onClick={() => setActiveIdx(i)}
            data-ocid={`chef_analytics.tab.${i + 1}`}
            className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors border ${
              activeIdx === i
                ? "bg-saffron text-cream border-saffron"
                : "bg-background text-foreground/70 border-border hover:border-saffron/40 hover:text-saffron"
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total Revenue",
            value: formatCurrency(data.totalRevenue),
            iconBg: "bg-saffron/10 text-saffron",
          },
          {
            label: "This Month",
            value: formatCurrency(data.thisMonthRevenue),
            iconBg: "bg-emerald-100 text-emerald-600",
          },
          {
            label: "Total Orders",
            value: data.orders.toString(),
            iconBg: "bg-blue-100 text-blue-600",
          },
          {
            label: "Avg Rating",
            value: `${data.avgRating}★`,
            iconBg: "bg-amber-100 text-amber-600",
          },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className={`rounded-xl p-3 border border-border ${kpi.iconBg.replace("text-", "bg-").replace("saffron", "saffron/5").replace("emerald-600", "emerald-50").replace("blue-600", "blue-50").replace("amber-600", "amber-50")}`}
          >
            <p className="font-body text-xs text-muted-foreground">
              {kpi.label}
            </p>
            <p className="font-display font-bold text-lg text-foreground mt-0.5">
              {kpi.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {/* Best Selling Dishes */}
        <Card className="sm:col-span-1 border-border shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="font-display text-sm font-semibold text-foreground">
              Best Selling Dishes
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-2">
            {data.bestDishes.map((d, i) => {
              const maxOrders = data.bestDishes[0]?.orders ?? 1;
              return (
                <div key={d.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-foreground/80 truncate pr-2">
                      {d.name}
                    </span>
                    <span className="font-body text-xs font-semibold text-foreground shrink-0">
                      {d.orders}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      key={`${activeIdx}-dish-${d.name}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(d.orders / maxOrders) * 100}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="h-full rounded-full bg-saffron"
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Customer Ratings */}
        <Card className="sm:col-span-1 border-border shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="font-display text-sm font-semibold text-foreground">
              Customer Ratings
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-2">
            {ratingBars.map((r, i) => (
              <div key={r.stars} className="flex items-center gap-2">
                <span className="font-body text-xs text-foreground/70 w-6">
                  {r.stars}
                </span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    key={`${activeIdx}-rating-${r.stars}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${r.pct}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="h-full rounded-full bg-amber-400"
                  />
                </div>
                <span className="font-body text-xs text-muted-foreground w-8 text-right">
                  {r.pct}%
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Promotion Performance */}
        <Card className="sm:col-span-1 border-border shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="font-display text-sm font-semibold text-foreground">
              Promo Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 grid grid-cols-2 gap-2">
            {promoPerfData.map((item) => (
              <div
                key={item.label}
                className="bg-muted/50 rounded-lg p-2 text-center"
              >
                <p className="font-body text-[10px] text-muted-foreground">
                  {item.label}
                </p>
                <p className="font-display font-bold text-sm text-foreground mt-0.5">
                  {item.value}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ============================================
// MAIN DASHBOARD
// ============================================

function AnalyticsDashboard({ onLogout }: { onLogout: () => void }) {
  const [timeRange, setTimeRange] = useState<TimeRange>("all");
  const { data: orders, isLoading: ordersLoading } = useGetAllOrders();
  const { data: products } = useGetAllProducts();
  const { data: makers } = useGetAllMakers();
  const { data: adCampaigns } = useGetAllAdCampaigns();

  const kpiData = TIME_RANGE_DATA[timeRange];

  // Use real data if available, otherwise fall back to mock
  const totalOrders =
    orders && orders.length > 0 ? orders.length : kpiData.totalOrders;
  const totalProducts = products ? products.length : 50;

  const adTotalSpend = adCampaigns
    ? adCampaigns.reduce((sum, c) => sum + c.totalSpend, 0)
    : 1182;
  const adTotalImpressions = adCampaigns
    ? Number(adCampaigns.reduce((sum, c) => sum + c.totalImpressions, 0n))
    : 4230;
  const blendedRevenue = adCampaigns
    ? adCampaigns.reduce((sum, c) => sum + c.totalRevenue, 0)
    : 8180;
  const blendedRoas = adTotalSpend > 0 ? blendedRevenue / adTotalSpend : 6.9;

  const kpis = [
    {
      icon: <ShoppingCart className="w-5 h-5 text-saffron" />,
      label: "Total Orders",
      value: ordersLoading ? "..." : totalOrders.toString(),
      iconBg: "bg-saffron/10",
    },
    {
      icon: <IndianRupee className="w-5 h-5 text-emerald-600" />,
      label: "Revenue",
      value: formatCurrency(kpiData.dailyRevenue),
      iconBg: "bg-emerald-100",
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
      label: "Avg Order Value",
      value: formatCurrency(kpiData.avgOrderValue),
      iconBg: "bg-blue-100",
    },
    {
      icon: <RefreshCcw className="w-5 h-5 text-purple-600" />,
      label: "Repeat Rate",
      value: `${kpiData.repeatRate}%`,
      iconBg: "bg-purple-100",
    },
    {
      icon: <Users className="w-5 h-5 text-orange-600" />,
      label: "Total Customers",
      value: kpiData.totalCustomers.toString(),
      iconBg: "bg-orange-100",
    },
    {
      icon: <ShoppingBag className="w-5 h-5 text-pink-600" />,
      label: "New Customers",
      value: kpiData.newCustomers.toString(),
      iconBg: "bg-pink-100",
    },
    {
      icon: <Megaphone className="w-5 h-5 text-amber-600" />,
      label: "Promo Revenue",
      value: formatCurrency(kpiData.promotionRevenue),
      iconBg: "bg-amber-100",
    },
    {
      icon: <BarChart2 className="w-5 h-5 text-teal-600" />,
      label: "Customer LTV",
      value: formatCurrency(kpiData.clv),
      iconBg: "bg-teal-100",
    },
  ];

  const maxMakerOrders = Math.max(...MAKER_ORDERS.map((m) => m.orders));
  const maxStateOrders = Math.max(...STATE_PERFORMANCE.map((s) => s.orders));

  return (
    <main className="min-h-screen pt-16 bg-background">
      {/* Header */}
      <div
        className="border-b border-border sticky top-16 z-40"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.06 42) 0%, oklch(0.30 0.10 25) 100%)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-lg sm:text-2xl font-bold text-cream flex items-center gap-2">
              <BarChart2 className="w-5 h-5" />
              Analytics Dashboard
            </h1>
            <p className="text-cream/60 font-body text-xs sm:text-sm mt-0.5">
              Data insights for platform operators and chefs
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            data-ocid="analytics.logout_button"
            className="font-body text-xs border-cream/20 text-cream hover:bg-cream/10"
          >
            Logout
          </Button>
        </div>

        {/* Time Range Tabs */}
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl pb-3">
          <div className="flex gap-1 bg-cream/10 rounded-lg p-1 w-fit">
            {(["today", "week", "month", "all"] as TimeRange[]).map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                data-ocid="analytics.timerange.tab"
                className={`px-3 py-1 rounded-md text-xs font-body font-medium transition-colors capitalize ${
                  timeRange === range
                    ? "bg-cream text-burgundy font-semibold"
                    : "text-cream/70 hover:text-cream"
                }`}
              >
                {range === "all"
                  ? "All Time"
                  : range === "week"
                    ? "This Week"
                    : range === "month"
                      ? "This Month"
                      : "Today"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6 space-y-8">
        {/* ── Section 1: KPI Grid ── */}
        <section aria-label="Key Performance Indicators">
          <h2 className="font-display text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-saffron" />
            Platform KPIs
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ordersLoading
              ? [
                  "orders",
                  "revenue",
                  "aov",
                  "repeat",
                  "customers",
                  "new",
                  "promo",
                  "clv",
                ].map((k) => (
                  <Skeleton
                    key={`skeleton-kpi-${k}`}
                    className="h-20 rounded-xl"
                    data-ocid="analytics.kpi.loading_state"
                  />
                ))
              : kpis.map((kpi, i) => (
                  <KpiCard
                    key={kpi.label}
                    icon={kpi.icon}
                    label={kpi.label}
                    value={kpi.value}
                    iconBg={kpi.iconBg}
                    delay={i * 0.06}
                  />
                ))}
          </div>
        </section>

        {/* ── Section 2: Revenue Trend Chart ── */}
        <section aria-label="Revenue Trend">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-base font-bold text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-saffron" />
                Revenue Trend (2026)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={timeRange}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <RevenueBarChart timeRange={timeRange} />
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </section>

        {/* ── Section 3: Orders by Chef + Top Dishes ── */}
        <section aria-label="Orders and Top Dishes">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Orders per Chef */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="font-display text-sm font-bold text-foreground flex items-center gap-2">
                  <Users className="w-4 h-4 text-saffron" />
                  Orders Per Chef
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {MAKER_ORDERS.map((m, i) => (
                  <div key={m.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-body text-xs font-medium text-foreground">
                          {m.name}
                        </span>
                        <span className="font-body text-[10px] text-muted-foreground ml-1.5">
                          ({m.state})
                        </span>
                      </div>
                      <span className="font-display font-bold text-sm text-foreground">
                        {m.orders}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(m.orders / maxMakerOrders) * 100}%`,
                        }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, oklch(0.65 0.22 46) 0%, oklch(0.50 0.18 30) 100%)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Selling Dishes */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="font-display text-sm font-bold text-foreground flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-saffron" />
                  Top Selling Dishes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {TOP_DISHES.map((d, i) => (
                  <motion.div
                    key={d.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    data-ocid={`analytics.top_dishes.item.${d.rank}`}
                    className="flex items-center gap-3"
                  >
                    <span className="text-lg w-8 text-center shrink-0">
                      {d.medal}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs font-semibold text-foreground truncate">
                        {d.name}
                      </p>
                      <p className="font-body text-[10px] text-muted-foreground">
                        {d.state} · {d.maker}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="font-body text-xs shrink-0"
                    >
                      {d.orders} orders
                    </Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── Section 4: Chef Analytics Deep Dive ── */}
        <section aria-label="Chef Analytics">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-base font-bold text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-saffron" />
                Chef Analytics Deep Dive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChefAnalyticsTab makers={makers ?? []} />
            </CardContent>
          </Card>
        </section>

        {/* ── Section 5: Ad Performance ── */}
        <section aria-label="Ad Performance">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-base font-bold text-foreground flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-saffron" />
                Promotion & Ad Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Aggregate KPIs */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    label: "Total Ad Spend",
                    value: formatCurrency(adTotalSpend),
                  },
                  {
                    label: "Blended ROAS",
                    value: `${blendedRoas.toFixed(1)}×`,
                  },
                  {
                    label: "Total Impressions",
                    value: adTotalImpressions.toLocaleString("en-IN"),
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-muted/50 rounded-xl p-3 text-center border border-border"
                  >
                    <p className="font-body text-xs text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="font-display font-bold text-lg text-foreground mt-0.5">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Campaign Table */}
              <div className="overflow-x-auto rounded-xl border border-border">
                <Table data-ocid="analytics.ads.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-body text-xs">
                        Campaign
                      </TableHead>
                      <TableHead className="font-body text-xs">Type</TableHead>
                      <TableHead className="font-body text-xs hidden sm:table-cell">
                        Budget/Day
                      </TableHead>
                      <TableHead className="font-body text-xs hidden md:table-cell">
                        Impressions
                      </TableHead>
                      <TableHead className="font-body text-xs hidden md:table-cell">
                        Clicks
                      </TableHead>
                      <TableHead className="font-body text-xs hidden lg:table-cell">
                        Orders
                      </TableHead>
                      <TableHead className="font-body text-xs">Spend</TableHead>
                      <TableHead className="font-body text-xs">ROAS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(adCampaigns ?? []).map((campaign, i) => {
                      const roas =
                        campaign.totalSpend > 0
                          ? campaign.totalRevenue / campaign.totalSpend
                          : 0;
                      return (
                        <TableRow
                          key={campaign.id.toString()}
                          data-ocid={`analytics.ads.row.${i + 1}`}
                        >
                          <TableCell className="font-body text-xs font-medium">
                            {campaign.name}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`font-body text-[10px] ${AD_TYPE_COLORS[campaign.adType] ?? ""}`}
                            >
                              {AD_TYPE_LABELS[campaign.adType] ??
                                campaign.adType}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-body text-xs hidden sm:table-cell">
                            {formatCurrency(campaign.dailyBudget)}
                          </TableCell>
                          <TableCell className="font-body text-xs hidden md:table-cell">
                            {Number(campaign.totalImpressions).toLocaleString(
                              "en-IN",
                            )}
                          </TableCell>
                          <TableCell className="font-body text-xs hidden md:table-cell">
                            {Number(campaign.totalClicks).toLocaleString(
                              "en-IN",
                            )}
                          </TableCell>
                          <TableCell className="font-body text-xs hidden lg:table-cell">
                            {Number(campaign.totalOrders).toLocaleString(
                              "en-IN",
                            )}
                          </TableCell>
                          <TableCell className="font-body text-xs">
                            {formatCurrency(campaign.totalSpend)}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`font-body text-xs font-semibold ${
                                roas >= 3
                                  ? "text-emerald-600"
                                  : "text-amber-600"
                              }`}
                            >
                              {roas.toFixed(1)}×
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
        </section>

        {/* ── Section 6: Customer Intelligence ── */}
        <section aria-label="Customer Intelligence">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-base font-bold text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-saffron" />
                Customer Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Funnel */}
                <div>
                  <h3 className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Conversion Funnel
                  </h3>
                  <div className="space-y-2">
                    {FUNNEL.map((step, i) => (
                      <div key={step.label} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-body text-xs text-foreground/80">
                            {step.label}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-body text-[10px] text-muted-foreground">
                              {step.pct}%
                            </span>
                            <span className="font-display font-bold text-sm text-foreground">
                              {step.value.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${step.pct}%` }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="h-full rounded-full"
                            style={{
                              background: `oklch(${0.65 - i * 0.06} ${0.22 - i * 0.02} 46)`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RFM Segments */}
                <div>
                  <h3 className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    RFM Segments
                  </h3>
                  <div className="space-y-2">
                    {RFM_SEGMENTS.map((seg, i) => (
                      <div key={seg.label} className="flex items-center gap-2">
                        <span className="font-body text-xs text-foreground/80 w-32 shrink-0 truncate">
                          {seg.label}
                        </span>
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${seg.pct * 2}%` }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className={`h-full rounded-full ${seg.color}`}
                          />
                        </div>
                        <span className="font-display font-bold text-xs text-foreground w-6 text-right shrink-0">
                          {seg.count}
                        </span>
                        <span className="font-body text-[10px] text-muted-foreground w-8 shrink-0">
                          ({seg.pct}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── Section 7: State Performance ── */}
        <section aria-label="State Performance">
          <h2 className="font-display text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <MapIcon className="w-4 h-4 text-saffron" />
            State Performance
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {STATE_PERFORMANCE.map((s, i) => (
              <motion.div
                key={s.state}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                data-ocid={`analytics.state.card.${i + 1}`}
              >
                <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display font-semibold text-xs text-foreground truncate">
                        {s.state}
                      </span>
                      <Badge className="bg-emerald-100 text-emerald-700 border-0 font-body text-[9px] px-1.5">
                        Live
                      </Badge>
                    </div>
                    {/* Mini bar */}
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(s.orders / maxStateOrders) * 100}%`,
                        }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="h-full rounded-full bg-saffron"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex justify-between">
                        <span className="font-body text-[10px] text-muted-foreground">
                          Orders
                        </span>
                        <span className="font-body text-[10px] font-semibold text-foreground">
                          {s.orders}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-[10px] text-muted-foreground">
                          Revenue
                        </span>
                        <span className="font-body text-[10px] font-semibold text-foreground">
                          {formatCurrency(s.revenue)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-[10px] text-muted-foreground">
                          Products
                        </span>
                        <span className="font-body text-[10px] font-semibold text-foreground">
                          {s.products}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Section 8: Quick Actions ── */}
        <section aria-label="Quick Actions">
          <h2 className="font-display text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4 text-saffron" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "Admin Panel",
                desc: "Approve chefs, manage products, oversee platform",
                icon: <BarChart2 className="w-6 h-6 text-saffron" />,
                href: "/admin",
                ocid: "analytics.admin_panel.button",
                bg: "bg-saffron/8 border-saffron/20",
              },
              {
                title: "Maker Dashboards",
                desc: "View individual maker performance and orders",
                icon: <Users className="w-6 h-6 text-emerald-600" />,
                href: "/maker-dashboard",
                ocid: "analytics.maker_dashboard.button",
                bg: "bg-emerald-50 border-emerald-200",
              },
              {
                title: "CRM Analytics",
                desc: "Customer segmentation, campaigns, RFM insights",
                icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
                href: "/crm/analytics",
                ocid: "analytics.crm.button",
                bg: "bg-purple-50 border-purple-200",
              },
            ].map((action, i) => (
              <Link key={action.href} to={action.href} data-ocid={action.ocid}>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-xl border p-4 hover:shadow-md transition-shadow cursor-pointer ${action.bg}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center shadow-sm shrink-0">
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-sm text-foreground">
                        {action.title}
                      </h3>
                      <p className="font-body text-xs text-muted-foreground mt-0.5">
                        {action.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Data source note */}
        <p className="font-body text-xs text-muted-foreground text-center pb-4">
          Total products tracked: {totalProducts} · Data refreshes on page load
          · Mock data shown where backend data is unavailable
        </p>
      </div>
    </main>
  );
}

// ============================================
// PASSWORD GATE + PAGE EXPORT
// ============================================

export default function AnalyticsDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ANALYTICS_PASSWORD) {
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
                Analytics Dashboard
              </h1>
              <p className="text-muted-foreground font-body text-sm mt-1">
                Choudhary Aunty — Data Insights
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  Analytics Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter analytics password"
                    className="font-body pr-10"
                    data-ocid="analytics.password.input"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPwd ? "Hide password" : "Show password"}
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
                    data-ocid="analytics.password.error_state"
                  >
                    {error}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-saffron hover:bg-terracotta text-cream font-semibold"
                data-ocid="analytics.password.submit_button"
              >
                <Lock className="w-4 h-4 mr-2" />
                Access Analytics Dashboard
              </Button>
            </form>
            <p className="text-xs text-center text-muted-foreground font-body mt-4">
              Password:{" "}
              <span className="font-semibold text-saffron">analytics2024</span>
            </p>
          </div>
        </motion.div>
      </main>
    );
  }

  return <AnalyticsDashboard onLogout={() => setIsAuthenticated(false)} />;
}

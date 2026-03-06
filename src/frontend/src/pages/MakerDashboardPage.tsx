import { AsharfiBadge } from "@/components/loyalty/AsharfiBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMakerImage } from "@/constants/images";
import {
  useGetAllMakers,
  useGetAllOrders,
  useGetAllProducts,
} from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BarChart2,
  ChefHat,
  Eye,
  EyeOff,
  IndianRupee,
  Lock,
  MapPin,
  Megaphone,
  MousePointer,
  Package,
  ShoppingCart,
  Tag,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const MAKER_PASSWORD = "maker2024";

const MAKER_TIERS = [
  { name: "Nayi Shuruaat", min: 0, max: 499, icon: "🌱" },
  { name: "Pratishthit Aunty", min: 500, max: 999, icon: "⭐" },
  { name: "Mashhoor Aunty", min: 1000, max: 2499, icon: "🌟" },
  {
    name: "Choudhary Aunty Legend",
    min: 2500,
    max: Number.POSITIVE_INFINITY,
    icon: "👑",
  },
];

const ORDER_STAGES = [
  {
    key: "pending",
    label: "Pending",
    color: "bg-yellow-400",
    textColor: "text-yellow-700",
    bg: "bg-yellow-50",
  },
  {
    key: "confirmed",
    label: "Confirmed",
    color: "bg-blue-400",
    textColor: "text-blue-700",
    bg: "bg-blue-50",
  },
  {
    key: "preparing",
    label: "Preparing",
    color: "bg-orange-400",
    textColor: "text-orange-700",
    bg: "bg-orange-50",
  },
  {
    key: "dispatched",
    label: "Dispatched",
    color: "bg-purple-400",
    textColor: "text-purple-700",
    bg: "bg-purple-50",
  },
  {
    key: "delivered",
    label: "Delivered",
    color: "bg-green-400",
    textColor: "text-green-700",
    bg: "bg-green-50",
  },
];

const PROMO_OFFERS = [
  {
    title: "Diwali Special: 15% off Sweets",
    status: "Active",
    expires: "Oct 31",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "First Order Discount: ₹50 off",
    status: "Active",
    expires: "Always On",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Refer & Get ₹100",
    status: "Active",
    expires: "Ongoing",
    color: "text-saffron",
    bg: "bg-saffron/5",
  },
];

function getMakerBalance(makerIdx: number, productCount: number): number {
  return (makerIdx + 1) * 350 + productCount * 50;
}

function getMakerTier(balance: number) {
  return (
    MAKER_TIERS.find((t) => balance >= t.min && balance <= t.max) ??
    MAKER_TIERS[0]
  );
}

// ============================================
// KPI CARD
// ============================================

function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
  ocid,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  color: string;
  ocid?: string;
}) {
  return (
    <Card
      className="border-border shadow-xs hover:shadow-warm transition-shadow"
      data-ocid={ocid}
    >
      <CardContent className="py-5 px-4 sm:px-5">
        <div className="flex items-start justify-between mb-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}
          >
            <Icon className="w-4 h-4" />
          </div>
        </div>
        <div className="font-display text-2xl font-bold text-foreground">
          {value}
        </div>
        <div className="text-muted-foreground font-body text-xs mt-0.5">
          {label}
        </div>
        {sub && (
          <div className="text-xs font-body text-muted-foreground mt-0.5 opacity-70">
            {sub}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ============================================
// MAIN DASHBOARD
// ============================================

function MakerDashboard() {
  const makersQuery = useGetAllMakers();
  const productsQuery = useGetAllProducts();
  const ordersQuery = useGetAllOrders();

  const [selectedMakerIdx, setSelectedMakerIdx] = useState(0);

  const makers = makersQuery.data ?? [];
  const products = productsQuery.data ?? [];
  const orders = ordersQuery.data ?? [];

  const maker = makers[selectedMakerIdx] ?? null;

  const makerProducts = maker
    ? products.filter((p) => Number(p.makerId) === Number(maker.id))
    : [];

  const makerOrders = maker
    ? orders.filter((o) => Number(o.makerId) === Number(maker.id))
    : [];

  // Revenue computation
  const totalRevenue = makerOrders
    .filter((o) => o.status === "delivered")
    .reduce((acc, o) => acc + o.totalAmount, 0);

  const mockRevenue =
    totalRevenue || (selectedMakerIdx + 1) * 18500 + makerProducts.length * 450;
  const monthRevenue = Math.round(mockRevenue * 0.3);

  const platformFee = Math.round(mockRevenue * 0.1);
  const logisticsFee = Math.round(mockRevenue * 0.05);
  const netEarnings = mockRevenue - platformFee - logisticsFee;
  const advanceReceived = Math.round(mockRevenue * 0.5);
  const balancePending = Math.round(mockRevenue * 0.35);

  const stageCounts = ORDER_STAGES.reduce(
    (acc, stage) => {
      acc[stage.key] = makerOrders.filter((o) => o.status === stage.key).length;
      return acc;
    },
    {} as Record<string, number>,
  );
  const mockOrderCount = (selectedMakerIdx + 1) * 8 + 5;
  if (makerOrders.length === 0) {
    stageCounts.pending = Math.round(mockOrderCount * 0.3);
    stageCounts.confirmed = Math.round(mockOrderCount * 0.15);
    stageCounts.preparing = Math.round(mockOrderCount * 0.2);
    stageCounts.dispatched = Math.round(mockOrderCount * 0.1);
    stageCounts.delivered = Math.round(mockOrderCount * 0.25);
  }

  const asharfiBalance = getMakerBalance(
    selectedMakerIdx,
    makerProducts.length,
  );
  const tier = getMakerTier(asharfiBalance);

  const uniqueCustomers = (selectedMakerIdx + 1) * 12 + 8;
  const avgOrderValue = 380 + selectedMakerIdx * 45;

  const isLoading = makersQuery.isLoading || productsQuery.isLoading;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-8 space-y-5">
        <Skeleton className="h-20 w-full rounded-2xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-48 rounded-2xl" />
      </div>
    );
  }

  if (!maker) {
    return (
      <div
        className="text-center py-16 text-muted-foreground font-body"
        data-ocid="maker.dashboard.empty_state"
      >
        No makers found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={getMakerImage(maker.name)}
            alt={maker.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-saffron/30 shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                {maker.name}
              </h1>
              <span className="text-xs font-body px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {maker.state}
              </span>
            </div>
            <AsharfiBadge
              balance={asharfiBalance}
              tier={tier.name as "Choudhary Aunty Legend"}
              size="sm"
              className="mt-1"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={selectedMakerIdx.toString()}
            onValueChange={(v) => setSelectedMakerIdx(Number(v))}
          >
            <SelectTrigger
              className="w-44 font-body text-sm"
              data-ocid="maker.dashboard.select"
            >
              <SelectValue placeholder="Switch maker" />
            </SelectTrigger>
            <SelectContent>
              {makers.map((m, idx) => (
                <SelectItem
                  key={m.id.toString()}
                  value={idx.toString()}
                  className="font-body text-sm"
                >
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <KpiCard
          label="Total Revenue"
          value={`₹${mockRevenue.toLocaleString("en-IN")}`}
          sub="All time"
          icon={IndianRupee}
          color="bg-green-100 text-green-600"
          ocid="maker.dashboard.card"
        />
        <KpiCard
          label="This Month"
          value={`₹${monthRevenue.toLocaleString("en-IN")}`}
          sub="30% of total"
          icon={TrendingUp}
          color="bg-saffron/10 text-saffron"
          ocid="maker.dashboard.card"
        />
        <KpiCard
          label="Total Orders"
          value={String(makerOrders.length || mockOrderCount)}
          sub="All time"
          icon={ShoppingCart}
          color="bg-blue-100 text-blue-600"
          ocid="maker.dashboard.card"
        />
        <KpiCard
          label="Pending Orders"
          value={String(stageCounts.pending)}
          sub="Need action"
          icon={Package}
          color="bg-amber-100 text-amber-600"
          ocid="maker.dashboard.card"
        />
      </div>

      {/* Order Pipeline */}
      <Card className="border-border shadow-xs hover:shadow-warm transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-saffron" />
            Order Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-stretch gap-2 sm:gap-3">
            {ORDER_STAGES.map((stage, idx) => (
              <div key={stage.key} className="flex-1 text-center">
                <div className={`rounded-xl p-3 sm:p-4 border ${stage.bg}`}>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                    {stageCounts[stage.key] ?? 0}
                  </div>
                  <div
                    className={`text-xs font-body font-semibold mt-1 ${stage.textColor}`}
                  >
                    {stage.label}
                  </div>
                </div>
                {idx < ORDER_STAGES.length - 1 && (
                  <div className="hidden sm:flex justify-end pr-0 mt-auto">
                    <ArrowRight className="w-3 h-3 text-muted-foreground absolute translate-x-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Performance + Payment Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Product Performance */}
        <Card className="border-border shadow-xs hover:shadow-warm transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Package className="w-5 h-5 text-saffron" />
              Product Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {makerProducts.length === 0 ? (
              <div
                className="text-center py-10 text-muted-foreground font-body text-sm px-5"
                data-ocid="maker.products.empty_state"
              >
                No products listed yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-body text-xs">
                        Product
                      </TableHead>
                      <TableHead className="font-body text-xs">Price</TableHead>
                      <TableHead className="font-body text-xs text-right">
                        Mock Orders
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...makerProducts]
                      .map((p, idx) => ({ ...p, mockOrders: idx * 3 + 1 }))
                      .sort((a, b) => b.mockOrders - a.mockOrders)
                      .slice(0, 6)
                      .map((product, idx) => (
                        <TableRow
                          key={product.id.toString()}
                          data-ocid={`maker.products.row.${idx + 1}`}
                        >
                          <TableCell className="font-body text-sm py-2.5">
                            <div className="font-medium text-foreground line-clamp-1">
                              {product.name}
                            </div>
                            <div className="text-xs text-muted-foreground capitalize">
                              {product.category}
                            </div>
                          </TableCell>
                          <TableCell className="py-2.5">
                            <span className="text-saffron font-bold font-body text-sm">
                              ₹{product.sellingPrice}
                            </span>
                          </TableCell>
                          <TableCell className="text-right py-2.5">
                            <span className="font-body text-sm font-semibold text-foreground">
                              {product.mockOrders}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Breakdown */}
        <Card className="border-border shadow-xs hover:shadow-warm transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-saffron" />
              Payment Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="font-body text-sm text-muted-foreground">
                Gross Revenue
              </span>
              <span className="font-body text-sm font-bold text-foreground">
                ₹{mockRevenue.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                <span className="font-body text-sm text-muted-foreground">
                  Platform Fee (10%)
                </span>
              </div>
              <span className="font-body text-sm font-semibold text-red-500">
                −₹{platformFee.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-3.5 h-3.5 text-orange-500" />
                <span className="font-body text-sm text-muted-foreground">
                  Logistics Est. (5%)
                </span>
              </div>
              <span className="font-body text-sm font-semibold text-orange-500">
                −₹{logisticsFee.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-green-50 border border-green-100">
              <span className="font-body text-sm font-bold text-green-700">
                Net Maker Earnings (85%)
              </span>
              <span className="font-display text-base font-bold text-green-700">
                ₹{netEarnings.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="font-body text-sm text-muted-foreground">
                Advance Received (50%)
              </span>
              <span className="font-body text-sm font-semibold text-blue-600">
                ₹{advanceReceived.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="font-body text-sm text-muted-foreground">
                Balance Pending (35%)
              </span>
              <span className="font-body text-sm font-semibold text-amber-600">
                ₹{balancePending.toLocaleString("en-IN")}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Promo Offers + Customer Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Promo Offers */}
        <Card className="border-border shadow-xs hover:shadow-warm transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Tag className="w-5 h-5 text-saffron" />
              Active Promo Offers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {PROMO_OFFERS.map((offer, idx) => (
              <div
                key={offer.title}
                className={`flex items-center justify-between p-3 rounded-xl border border-border ${offer.bg}`}
                data-ocid={`maker.promo.item.${idx + 1}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-body font-semibold text-foreground">
                    {offer.title}
                  </div>
                  <div className="text-xs font-body text-muted-foreground">
                    Expires: {offer.expires}
                  </div>
                </div>
                <Badge
                  className={`text-xs font-body shrink-0 ml-2 ${offer.color} bg-transparent border-current`}
                  variant="outline"
                >
                  {offer.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Customer Insights */}
        <Card className="border-border shadow-xs hover:shadow-warm transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-saffron" />
              Customer Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Unique Customers",
                  value: uniqueCustomers,
                  color: "text-blue-600",
                  icon: Users,
                },
                {
                  label: "Repeat Rate",
                  value: "62%",
                  color: "text-green-600",
                  icon: TrendingUp,
                },
                {
                  label: "Top State",
                  value: maker.state.split(" ")[0],
                  color: "text-saffron",
                  icon: MapPin,
                },
                {
                  label: "Avg Order Value",
                  value: `₹${avgOrderValue}`,
                  color: "text-terracotta",
                  icon: IndianRupee,
                },
              ].map((item, idx) => (
                <div
                  key={item.label}
                  className="text-center p-3 rounded-xl bg-muted/60 border border-border"
                  data-ocid={`maker.insights.card.${idx + 1}`}
                >
                  <item.icon
                    className={`w-5 h-5 mx-auto mb-1.5 ${item.color}`}
                  />
                  <div
                    className={`font-display text-xl font-bold ${item.color}`}
                  >
                    {item.value}
                  </div>
                  <div className="font-body text-xs text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loyalty Section */}
      <Card className="border-saffron/20 bg-gradient-to-br from-saffron/5 to-terracotta/5 shadow-xs">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-saffron" />
            Rishta Rewards Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-48">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-display text-4xl font-bold text-saffron">
                  {asharfiBalance.toLocaleString("en-IN")}
                </span>
                <span className="font-body text-muted-foreground text-sm">
                  Asharfi
                </span>
              </div>
              <AsharfiBadge
                balance={asharfiBalance}
                tier={tier.name as "Choudhary Aunty Legend"}
                size="sm"
              />
            </div>
            <div className="space-y-1.5 text-sm font-body">
              <div className="text-muted-foreground">Recent earnings:</div>
              <div className="text-green-600 font-semibold">
                +500 — 12 months active
              </div>
              <div className="text-green-600 font-semibold">
                +150 — 3 five-star reviews
              </div>
              <div className="text-green-600 font-semibold">
                +75 — Weekly order streak
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* My Ad Campaigns Section */}
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-xs">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-amber-600" />
            My Ad Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              {
                label: "Total Ad Spend",
                value: "₹1,182",
                icon: IndianRupee,
                color: "text-terracotta",
                bg: "bg-orange-100",
              },
              {
                label: "Blended ROAS",
                value: "3.5×",
                icon: TrendingUp,
                color: "text-green-600",
                bg: "bg-green-100",
              },
              {
                label: "Active Campaigns",
                value: "3",
                icon: MousePointer,
                color: "text-purple-600",
                bg: "bg-purple-100",
              },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="text-center p-3 rounded-xl bg-white/60 border border-amber-200"
                data-ocid="maker.ad_campaigns.card"
              >
                <div
                  className={`w-7 h-7 rounded-lg ${kpi.bg} flex items-center justify-center mx-auto mb-2`}
                >
                  <kpi.icon className={`w-3.5 h-3.5 ${kpi.color}`} />
                </div>
                <div className={`font-display text-lg font-bold ${kpi.color}`}>
                  {kpi.value}
                </div>
                <div className="font-body text-xs text-amber-700 mt-0.5">
                  {kpi.label}
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/ads"
            data-ocid="maker.ad_campaigns.manage_button"
            className="inline-flex items-center gap-2 bg-saffron hover:bg-terracotta text-cream font-semibold px-4 py-2.5 rounded-xl text-sm font-body transition-colors"
          >
            <Megaphone className="w-4 h-4" />
            Manage Campaigns
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// PASSWORD GATE
// ============================================

export default function MakerDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === MAKER_PASSWORD) {
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
              <div className="w-14 h-14 rounded-2xl bg-saffron/10 flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-7 h-7 text-saffron" />
              </div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                Maker Dashboard
              </h1>
              <p className="text-muted-foreground font-body text-sm mt-1">
                Choudhary Aunty — Aunty Access
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  Maker Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter password"
                    className="font-body pr-10"
                    data-ocid="maker.dashboard.input"
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
                    data-ocid="maker.dashboard.error_state"
                  >
                    {error}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-saffron hover:bg-terracotta text-cream font-semibold"
                data-ocid="maker.dashboard.submit_button"
              >
                <Lock className="w-4 h-4 mr-2" />
                Access Maker Dashboard
              </Button>
            </form>
            <p className="text-xs text-center text-muted-foreground font-body mt-4">
              Password:{" "}
              <span className="font-semibold text-saffron">maker2024</span>
            </p>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-16 bg-background">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-warmBrown/90 to-burgundy/90 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-5 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-cream">
              📊 Maker Dashboard
            </h1>
            <p className="text-cream/60 font-body text-xs sm:text-sm mt-0.5">
              Choudhary Aunty — Your Business at a Glance
            </p>
          </div>
          <div className="flex items-center gap-3">
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
      </div>
      <MakerDashboard />
    </main>
  );
}

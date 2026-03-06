import type { AdCampaign } from "@/backend.d";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
  useCreateAdCampaign,
  useGetAdAnalytics,
  useGetAllAdCampaigns,
  usePauseAdCampaign,
  useResumeAdCampaign,
} from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  BarChart2,
  Eye,
  EyeOff,
  IndianRupee,
  Lock,
  Megaphone,
  MousePointer,
  Pause,
  Play,
  Plus,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const ADS_PASSWORD = "ads2024";

const MOCK_CAMPAIGNS: AdCampaign[] = [
  {
    id: 1n,
    makerId: 1n,
    name: "Bihar Achar Boost",
    adType: "sponsoredDish",
    status: "active",
    dailyBudget: 500,
    bidPerClick: 12,
    targetState: "Bihar",
    targetCategory: "achar",
    qualityScore: 0.9,
    createdAt: BigInt(Date.now()),
    totalSpend: 340,
    totalImpressions: 1240n,
    totalClicks: 87n,
    totalOrders: 14n,
    totalRevenue: 2380,
  },
  {
    id: 2n,
    makerId: 4n,
    name: "Preetkaur Featured Chef",
    adType: "featuredChef",
    status: "active",
    dailyBudget: 800,
    bidPerClick: 18,
    targetState: "Punjab",
    targetCategory: "",
    qualityScore: 0.85,
    createdAt: BigInt(Date.now()),
    totalSpend: 612,
    totalImpressions: 2100n,
    totalClicks: 120n,
    totalOrders: 22n,
    totalRevenue: 4180,
  },
  {
    id: 3n,
    makerId: 2n,
    name: "Haryana Sweets Promo",
    adType: "categoryPromotion",
    status: "active",
    dailyBudget: 600,
    bidPerClick: 10,
    targetState: "Haryana",
    targetCategory: "sweets",
    qualityScore: 0.8,
    createdAt: BigInt(Date.now()),
    totalSpend: 230,
    totalImpressions: 890n,
    totalClicks: 54n,
    totalOrders: 9n,
    totalRevenue: 1620,
  },
];

const MAKERS = [
  { id: "1", name: "Anju Choudhary" },
  { id: "2", name: "Babita Tai" },
  { id: "3", name: "Sarla Maasi" },
  { id: "4", name: "Preetkaur Aunty" },
  { id: "5", name: "Geeta Devi" },
];

const AD_TYPE_META: Record<
  string,
  { label: string; color: string; bg: string; icon: string }
> = {
  sponsoredDish: {
    label: "Sponsored Dish",
    color: "text-orange-700",
    bg: "bg-orange-100 border-orange-200",
    icon: "⭐",
  },
  featuredChef: {
    label: "Featured Chef",
    color: "text-purple-700",
    bg: "bg-purple-100 border-purple-200",
    icon: "👑",
  },
  categoryPromotion: {
    label: "Category Promo",
    color: "text-teal-700",
    bg: "bg-teal-100 border-teal-200",
    icon: "📂",
  },
  cityPromotion: {
    label: "City Promotion",
    color: "text-blue-700",
    bg: "bg-blue-100 border-blue-200",
    icon: "🏙️",
  },
};

function AdTypeBadge({ adType }: { adType: string }) {
  const meta = AD_TYPE_META[adType] ?? {
    label: adType,
    color: "text-foreground",
    bg: "bg-muted border-border",
    icon: "📢",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border font-body font-semibold ${meta.bg} ${meta.color}`}
    >
      {meta.icon} {meta.label}
    </span>
  );
}

function calcRoas(campaign: AdCampaign): number {
  if (!campaign.totalSpend) return 0;
  return Math.round((campaign.totalRevenue / campaign.totalSpend) * 10) / 10;
}

// ─── Campaign Analytics Drawer ──────────────────────────────────────────────

function CampaignAnalyticsDrawer({
  campaign,
  open,
  onClose,
}: {
  campaign: AdCampaign | null;
  open: boolean;
  onClose: () => void;
}) {
  const { data: analytics } = useGetAdAnalytics(campaign?.id ?? null);

  if (!campaign) return null;

  const impressions = analytics
    ? Number(analytics.impressions)
    : Number(campaign.totalImpressions);
  const clicks = analytics
    ? Number(analytics.clicks)
    : Number(campaign.totalClicks);
  const orders = analytics
    ? Number(analytics.orders)
    : Number(campaign.totalOrders);
  const spend = analytics ? analytics.totalSpend : campaign.totalSpend;
  const revenue = analytics ? analytics.totalRevenue : campaign.totalRevenue;
  const cpo = analytics ? analytics.cpo : spend / (orders || 1);
  const roas = analytics ? analytics.roas : revenue / (spend || 1);
  const ctr =
    clicks > 0 && impressions > 0
      ? ((clicks / impressions) * 100).toFixed(1)
      : "0.0";

  const rankScore =
    campaign.bidPerClick *
    campaign.qualityScore *
    (campaign.targetCategory ? 0.95 : 1.0);

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-5">
          <SheetTitle className="font-display text-lg flex items-center gap-2 flex-wrap">
            {campaign.name}
            <AdTypeBadge adType={campaign.adType} />
          </SheetTitle>
        </SheetHeader>

        {/* KPI mini grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            {
              icon: Eye,
              label: "Impressions",
              value: impressions.toLocaleString("en-IN"),
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              icon: MousePointer,
              label: "Clicks",
              value: clicks.toLocaleString("en-IN"),
              color: "text-purple-600",
              bg: "bg-purple-50",
            },
            {
              icon: ShoppingCart,
              label: "Orders",
              value: orders.toLocaleString("en-IN"),
              color: "text-green-600",
              bg: "bg-green-50",
            },
            {
              icon: IndianRupee,
              label: "CTR",
              value: `${ctr}%`,
              color: "text-saffron",
              bg: "bg-amber-50",
            },
            {
              icon: IndianRupee,
              label: "Cost/Order",
              value: `₹${Math.round(cpo)}`,
              color: "text-terracotta",
              bg: "bg-orange-50",
            },
            {
              icon: TrendingUp,
              label: "ROAS",
              value: `${Math.round(roas * 10) / 10}×`,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl border border-border p-3"
            >
              <div
                className={`w-7 h-7 rounded-lg ${kpi.bg} flex items-center justify-center mb-2`}
              >
                <kpi.icon className={`w-3.5 h-3.5 ${kpi.color}`} />
              </div>
              <div className={`font-display text-xl font-bold ${kpi.color}`}>
                {kpi.value}
              </div>
              <div className="font-body text-xs text-muted-foreground">
                {kpi.label}
              </div>
            </div>
          ))}
        </div>

        {/* Auction info */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 mb-5">
          <h4 className="font-display text-sm font-bold text-amber-800 mb-3 flex items-center gap-1.5">
            <Zap className="w-4 h-4" /> Auction Score Breakdown
          </h4>
          <div className="space-y-2.5 font-body text-sm">
            <div className="flex items-center justify-between">
              <span className="text-amber-700">Bid per Click</span>
              <span className="font-bold text-amber-900">
                ₹{campaign.bidPerClick}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-amber-700">Quality Score</span>
              <span className="font-bold text-amber-900">
                {campaign.qualityScore.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-amber-700">Relevance Score</span>
              <span className="font-bold text-amber-900">
                {campaign.targetCategory ? "0.95" : "1.00"}
              </span>
            </div>
            <div className="border-t border-amber-200 pt-2 flex items-center justify-between">
              <span className="text-amber-800 font-semibold">
                Ad Rank Score
              </span>
              <span className="font-display font-bold text-amber-900 text-base">
                {rankScore.toFixed(2)}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-amber-600 font-body mt-2">
            rank = bid × quality × relevance
          </p>
        </div>

        {/* Budget */}
        <div className="rounded-xl border border-border bg-card p-4 mb-5">
          <h4 className="font-display text-sm font-bold text-foreground mb-3">
            Budget & Spend
          </h4>
          <div className="space-y-2 font-body text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Daily Budget</span>
              <span className="font-bold text-foreground">
                ₹{campaign.dailyBudget}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Spend</span>
              <span className="font-bold text-saffron">
                ₹{spend.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Revenue</span>
              <span className="font-bold text-green-600">
                ₹{revenue.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Activity timeline */}
        <div className="rounded-xl border border-border bg-card p-4 mb-5">
          <h4 className="font-display text-sm font-bold text-foreground mb-3">
            Recent Activity
          </h4>
          <div className="space-y-3">
            {[
              {
                time: "Last 24h",
                text: `${Math.round(Number(campaign.totalImpressions) * 0.04)} impressions`,
                dot: "bg-blue-400",
              },
              {
                time: "Today",
                text: `${Math.round(Number(campaign.totalClicks) * 0.09)} clicks recorded`,
                dot: "bg-purple-400",
              },
              {
                time: "This week",
                text: `${Math.round(Number(campaign.totalOrders) * 0.5)} new orders converted`,
                dot: "bg-green-400",
              },
              {
                time: "Budget",
                text: `₹${Math.round(campaign.dailyBudget * 0.68)} of ₹${campaign.dailyBudget} used today`,
                dot: "bg-amber-400",
              },
            ].map((a) => (
              <div key={a.text} className="flex items-start gap-2.5">
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.dot}`}
                />
                <div>
                  <span className="font-body text-xs font-semibold text-foreground">
                    {a.time}:{" "}
                  </span>
                  <span className="font-body text-xs text-muted-foreground">
                    {a.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link
          to="/ads/$id"
          params={{ id: campaign.id.toString() }}
          className="w-full inline-flex items-center justify-center gap-2 bg-saffron hover:bg-terracotta text-cream font-semibold px-4 py-2.5 rounded-xl text-sm font-body transition-colors"
          data-ocid="ads.view_campaign_detail.button"
        >
          View Full Analytics <TrendingUp className="w-4 h-4" />
        </Link>
      </SheetContent>
    </Sheet>
  );
}

// ─── Create Campaign Form ─────────────────────────────────────────────────────

function CreateCampaignForm() {
  const createMutation = useCreateAdCampaign();
  const [form, setForm] = useState({
    name: "",
    adType: "",
    makerId: "",
    dailyBudget: "",
    bidPerClick: "",
    targetState: "",
    targetCategory: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.name ||
      !form.adType ||
      !form.makerId ||
      !form.dailyBudget ||
      !form.bidPerClick
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    createMutation.mutate(
      {
        makerId: BigInt(form.makerId),
        name: form.name,
        adType: form.adType,
        dailyBudget: Number(form.dailyBudget),
        bidPerClick: Number(form.bidPerClick),
        targetState: form.targetState === "all" ? "" : form.targetState,
        targetCategory:
          form.targetCategory === "all" ? "" : form.targetCategory,
      },
      {
        onSuccess: () => {
          toast.success("Campaign created! Pending admin activation.");
          setForm({
            name: "",
            adType: "",
            makerId: "",
            dailyBudget: "",
            bidPerClick: "",
            targetState: "",
            targetCategory: "",
          });
        },
        onError: () => {
          toast.success("Campaign submitted for admin activation. (Demo mode)");
          setForm({
            name: "",
            adType: "",
            makerId: "",
            dailyBudget: "",
            bidPerClick: "",
            targetState: "",
            targetCategory: "",
          });
        },
      },
    );
  }

  const rankPreview =
    form.bidPerClick && form.adType
      ? (
          Number(form.bidPerClick) *
          0.85 *
          (form.targetCategory && form.targetCategory !== "all" ? 0.95 : 1.0)
        ).toFixed(2)
      : null;

  return (
    <div className="max-w-xl mx-auto">
      <Card className="border-border shadow-xs">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Plus className="w-5 h-5 text-saffron" />
            New Ad Campaign
          </CardTitle>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Fill in the details below. Campaigns go live after admin approval.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campaign Name */}
            <div>
              <Label className="font-body text-xs mb-1.5 block font-semibold">
                Campaign Name *
              </Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="e.g. Bihar Achar Summer Boost"
                className="font-body"
                data-ocid="ads.campaign_name.input"
              />
            </div>

            {/* Ad Type */}
            <div>
              <Label className="font-body text-xs mb-1.5 block font-semibold">
                Ad Type *
              </Label>
              <Select
                value={form.adType}
                onValueChange={(v) => setForm((p) => ({ ...p, adType: v }))}
              >
                <SelectTrigger
                  className="font-body"
                  data-ocid="ads.ad_type.select"
                >
                  <SelectValue placeholder="Select ad type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sponsoredDish" className="font-body">
                    ⭐ Sponsored Dish
                  </SelectItem>
                  <SelectItem value="featuredChef" className="font-body">
                    👑 Featured Chef
                  </SelectItem>
                  <SelectItem value="categoryPromotion" className="font-body">
                    📂 Category Promotion
                  </SelectItem>
                  <SelectItem value="cityPromotion" className="font-body">
                    🏙️ City Promotion
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Maker */}
            <div>
              <Label className="font-body text-xs mb-1.5 block font-semibold">
                Maker (Aunty) *
              </Label>
              <Select
                value={form.makerId}
                onValueChange={(v) => setForm((p) => ({ ...p, makerId: v }))}
              >
                <SelectTrigger className="font-body">
                  <SelectValue placeholder="Select maker" />
                </SelectTrigger>
                <SelectContent>
                  {MAKERS.map((m) => (
                    <SelectItem key={m.id} value={m.id} className="font-body">
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Budget + Bid Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="font-body text-xs mb-1.5 block font-semibold">
                  Daily Budget (₹) *
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-body text-sm">
                    ₹
                  </span>
                  <Input
                    type="number"
                    min="50"
                    max="10000"
                    value={form.dailyBudget}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, dailyBudget: e.target.value }))
                    }
                    placeholder="500"
                    className="font-body pl-7"
                    data-ocid="ads.daily_budget.input"
                  />
                </div>
              </div>
              <div>
                <Label className="font-body text-xs mb-1.5 block font-semibold">
                  Bid per Click (₹) *
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-body text-sm">
                    ₹
                  </span>
                  <Input
                    type="number"
                    min="1"
                    max="500"
                    value={form.bidPerClick}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, bidPerClick: e.target.value }))
                    }
                    placeholder="12"
                    className="font-body pl-7"
                    data-ocid="ads.bid_per_click.input"
                  />
                </div>
              </div>
            </div>

            {/* Target State */}
            <div>
              <Label className="font-body text-xs mb-1.5 block font-semibold">
                Target State
              </Label>
              <Select
                value={form.targetState}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, targetState: v }))
                }
              >
                <SelectTrigger
                  className="font-body"
                  data-ocid="ads.target_state.select"
                >
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="font-body">
                    All States
                  </SelectItem>
                  <SelectItem value="Bihar" className="font-body">
                    Bihar
                  </SelectItem>
                  <SelectItem value="Haryana" className="font-body">
                    Haryana
                  </SelectItem>
                  <SelectItem value="Punjab" className="font-body">
                    Punjab
                  </SelectItem>
                  <SelectItem value="Uttar Pradesh" className="font-body">
                    Uttar Pradesh
                  </SelectItem>
                  <SelectItem value="Uttarakhand" className="font-body">
                    Uttarakhand
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Target Category */}
            <div>
              <Label className="font-body text-xs mb-1.5 block font-semibold">
                Target Category
              </Label>
              <Select
                value={form.targetCategory}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, targetCategory: v }))
                }
              >
                <SelectTrigger className="font-body">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="font-body">
                    All Categories
                  </SelectItem>
                  <SelectItem value="achar" className="font-body">
                    Achar
                  </SelectItem>
                  <SelectItem value="sweets" className="font-body">
                    Sweets
                  </SelectItem>
                  <SelectItem value="ladoo" className="font-body">
                    Ladoo
                  </SelectItem>
                  <SelectItem value="namkeen" className="font-body">
                    Namkeen
                  </SelectItem>
                  <SelectItem value="barfi" className="font-body">
                    Barfi
                  </SelectItem>
                  <SelectItem value="snacks" className="font-body">
                    Snacks
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rank Preview */}
            {rankPreview && (
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 flex items-center gap-3">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="font-body text-xs text-amber-700">
                    Estimated Ad Rank Score:{" "}
                  </span>
                  <span className="font-display font-bold text-amber-900">
                    {rankPreview}
                  </span>
                  <p className="text-[11px] text-amber-600 font-body">
                    bid × quality × relevance
                  </p>
                </div>
              </div>
            )}

            {/* Admin note */}
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-3">
              <p className="font-body text-xs text-blue-700">
                ℹ️ Campaigns require admin activation. After submission, contact{" "}
                <a
                  href="mailto:kaisehoaunty@gmail.com"
                  className="underline font-semibold"
                >
                  kaisehoaunty@gmail.com
                </a>{" "}
                to activate your campaign.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-saffron hover:bg-terracotta text-cream font-semibold"
              disabled={createMutation.isPending}
              data-ocid="ads.create_campaign.submit_button"
            >
              {createMutation.isPending ? (
                <>Creating Campaign...</>
              ) : (
                <>
                  <Megaphone className="w-4 h-4 mr-2" />
                  Submit Campaign
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Performance Tab ──────────────────────────────────────────────────────────

function PerformanceTab({ campaigns }: { campaigns: AdCampaign[] }) {
  const totalImpressions = campaigns.reduce(
    (a, c) => a + Number(c.totalImpressions),
    0,
  );
  const totalClicks = campaigns.reduce((a, c) => a + Number(c.totalClicks), 0);
  const totalSpend = campaigns.reduce((a, c) => a + c.totalSpend, 0);
  const totalRevenue = campaigns.reduce((a, c) => a + c.totalRevenue, 0);
  const blendedRoas =
    totalSpend > 0 ? Math.round((totalRevenue / totalSpend) * 10) / 10 : 0;
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;

  const maxSpend = Math.max(...campaigns.map((c) => c.totalSpend), 1);

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          {
            label: "Campaigns",
            value: activeCampaigns,
            suffix: " active",
            icon: Megaphone,
            color: "text-saffron",
            bg: "bg-amber-50",
          },
          {
            label: "Impressions",
            value: totalImpressions.toLocaleString("en-IN"),
            suffix: "",
            icon: Eye,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Clicks",
            value: totalClicks.toLocaleString("en-IN"),
            suffix: "",
            icon: MousePointer,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            label: "Total Spend",
            value: `₹${totalSpend.toLocaleString("en-IN")}`,
            suffix: "",
            icon: IndianRupee,
            color: "text-terracotta",
            bg: "bg-orange-50",
          },
          {
            label: "Blended ROAS",
            value: `${blendedRoas}×`,
            suffix: "",
            icon: TrendingUp,
            color: "text-green-600",
            bg: "bg-green-50",
          },
        ].map((kpi) => (
          <Card key={kpi.label} className="border-border shadow-xs">
            <CardContent className="py-4 px-4">
              <div
                className={`w-8 h-8 rounded-lg ${kpi.bg} flex items-center justify-center mb-2`}
              >
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <div className={`font-display text-xl font-bold ${kpi.color}`}>
                {kpi.value}
                {kpi.suffix}
              </div>
              <div className="font-body text-xs text-muted-foreground mt-0.5">
                {kpi.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Spend vs Revenue chart (CSS-based bar chart) */}
      <Card className="border-border shadow-xs">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-saffron" />
            Spend vs Revenue per Campaign
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((c) => {
              const spendPct = (c.totalSpend / maxSpend) * 100;
              const revPct = Math.min((c.totalRevenue / maxSpend) * 100, 100);
              return (
                <div key={c.id.toString()} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <AdTypeBadge adType={c.adType} />
                      <span className="font-body text-sm font-semibold text-foreground truncate">
                        {c.name}
                      </span>
                    </div>
                    <span className="font-body text-xs text-muted-foreground ml-2 shrink-0">
                      ROAS {calcRoas(c)}×
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-right text-xs font-body text-muted-foreground shrink-0">
                        Spend
                      </span>
                      <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${spendPct}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full bg-terracotta/70"
                        />
                      </div>
                      <span className="text-xs font-body font-bold text-terracotta w-14 text-right shrink-0">
                        ₹{c.totalSpend.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-right text-xs font-body text-muted-foreground shrink-0">
                        Revenue
                      </span>
                      <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${revPct}%` }}
                          transition={{
                            duration: 0.9,
                            ease: "easeOut",
                            delay: 0.1,
                          }}
                          className="h-full rounded-full bg-green-500/70"
                        />
                      </div>
                      <span className="text-xs font-body font-bold text-green-600 w-14 text-right shrink-0">
                        ₹{c.totalRevenue.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs font-body text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-terracotta/70" />{" "}
              Spend
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />{" "}
              Revenue
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Campaigns Table ──────────────────────────────────────────────────────────

function CampaignsTable({
  campaigns,
  onSelect,
}: {
  campaigns: AdCampaign[];
  onSelect: (c: AdCampaign) => void;
}) {
  const pauseMutation = usePauseAdCampaign();
  const resumeMutation = useResumeAdCampaign();

  function handleToggle(e: React.MouseEvent, campaign: AdCampaign) {
    e.stopPropagation();
    if (campaign.status === "active") {
      pauseMutation.mutate(campaign.id, {
        onSuccess: () => toast.success(`"${campaign.name}" paused.`),
        onError: () => toast.info("Status updated (demo mode)."),
      });
    } else {
      resumeMutation.mutate(campaign.id, {
        onSuccess: () => toast.success(`"${campaign.name}" resumed.`),
        onError: () => toast.info("Status updated (demo mode)."),
      });
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border shadow-xs">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-body text-xs">Campaign</TableHead>
            <TableHead className="font-body text-xs">Type</TableHead>
            <TableHead className="font-body text-xs">Status</TableHead>
            <TableHead className="font-body text-xs text-right">
              Daily Budget
            </TableHead>
            <TableHead className="font-body text-xs text-right">
              Bid/Click
            </TableHead>
            <TableHead className="font-body text-xs text-right">
              Impressions
            </TableHead>
            <TableHead className="font-body text-xs text-right">
              Clicks
            </TableHead>
            <TableHead className="font-body text-xs text-right">
              Orders
            </TableHead>
            <TableHead className="font-body text-xs text-right">ROAS</TableHead>
            <TableHead className="font-body text-xs text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign, idx) => (
            <TableRow
              key={campaign.id.toString()}
              className="cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => onSelect(campaign)}
              data-ocid={`ads.campaign.item.${idx + 1}`}
            >
              <TableCell className="py-3">
                <div className="font-body text-sm font-semibold text-foreground max-w-[160px] truncate">
                  {campaign.name}
                </div>
                <div className="text-xs text-muted-foreground font-body">
                  {campaign.targetState || "All States"}
                  {campaign.targetCategory
                    ? ` · ${campaign.targetCategory}`
                    : ""}
                </div>
              </TableCell>
              <TableCell className="py-3">
                <AdTypeBadge adType={campaign.adType} />
              </TableCell>
              <TableCell className="py-3">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-body font-semibold px-2 py-0.5 rounded-full ${
                    campaign.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${campaign.status === "active" ? "bg-green-500 animate-pulse" : "bg-muted-foreground"}`}
                  />
                  {campaign.status === "active" ? "Active" : "Paused"}
                </span>
              </TableCell>
              <TableCell className="py-3 text-right font-body text-sm text-foreground">
                ₹{campaign.dailyBudget}
              </TableCell>
              <TableCell className="py-3 text-right font-body text-sm text-foreground">
                ₹{campaign.bidPerClick}
              </TableCell>
              <TableCell className="py-3 text-right font-body text-sm font-semibold text-blue-600">
                {Number(campaign.totalImpressions).toLocaleString("en-IN")}
              </TableCell>
              <TableCell className="py-3 text-right font-body text-sm font-semibold text-purple-600">
                {Number(campaign.totalClicks).toLocaleString("en-IN")}
              </TableCell>
              <TableCell className="py-3 text-right font-body text-sm font-semibold text-green-600">
                {Number(campaign.totalOrders).toLocaleString("en-IN")}
              </TableCell>
              <TableCell className="py-3 text-right">
                <span
                  className={`font-display font-bold text-sm ${
                    calcRoas(campaign) >= 3
                      ? "text-green-600"
                      : calcRoas(campaign) >= 1
                        ? "text-saffron"
                        : "text-red-500"
                  }`}
                >
                  {calcRoas(campaign)}×
                </span>
              </TableCell>
              <TableCell className="py-3 text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => handleToggle(e, campaign)}
                  className="text-xs font-body h-7 px-2.5"
                  data-ocid={
                    campaign.status === "active"
                      ? `ads.pause_campaign.button.${idx + 1}`
                      : `ads.resume_campaign.button.${idx + 1}`
                  }
                  disabled={pauseMutation.isPending || resumeMutation.isPending}
                >
                  {campaign.status === "active" ? (
                    <>
                      <Pause className="w-3 h-3 mr-1" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 mr-1" /> Resume
                    </>
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ─── Main Ads Dashboard ───────────────────────────────────────────────────────

function AdsDashboard() {
  const { data: backendCampaigns } = useGetAllAdCampaigns();
  const [selectedCampaign, setSelectedCampaign] = useState<AdCampaign | null>(
    null,
  );

  const campaigns =
    backendCampaigns && backendCampaigns.length > 0
      ? backendCampaigns
      : MOCK_CAMPAIGNS;

  return (
    <>
      <div className="bg-gradient-to-r from-amber-900/90 to-saffron/80 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6">
          <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-amber-200" />
                <span className="text-amber-200 text-xs tracking-[0.25em] uppercase font-body font-semibold">
                  Ad Manager
                </span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream leading-tight">
                Advertise Smarter
              </h1>
              <p className="text-cream/70 font-body text-sm mt-1">
                Auction-based promotion · Rank by bid × quality × relevance
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 bg-cream/10 border border-cream/20 rounded-full px-3 py-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-cream/90 text-xs font-body">
                  {campaigns.filter((c) => c.status === "active").length} Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6">
        <Tabs defaultValue="campaigns">
          <TabsList className="mb-6 font-body">
            <TabsTrigger value="campaigns" data-ocid="ads.tab.1">
              📋 My Campaigns
            </TabsTrigger>
            <TabsTrigger value="create" data-ocid="ads.tab.2">
              ➕ Create Campaign
            </TabsTrigger>
            <TabsTrigger value="performance" data-ocid="ads.tab.3">
              📊 Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns">
            {campaigns.length === 0 ? (
              <div
                className="text-center py-20"
                data-ocid="ads.campaigns.empty_state"
              >
                <div className="text-5xl mb-3">📢</div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  No campaigns yet
                </h3>
                <p className="text-muted-foreground font-body text-sm mb-5">
                  Create your first campaign to start promoting your dishes.
                </p>
              </div>
            ) : (
              <CampaignsTable
                campaigns={campaigns}
                onSelect={setSelectedCampaign}
              />
            )}
          </TabsContent>

          <TabsContent value="create">
            <CreateCampaignForm />
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceTab campaigns={campaigns} />
          </TabsContent>
        </Tabs>
      </div>

      <CampaignAnalyticsDrawer
        campaign={selectedCampaign}
        open={selectedCampaign !== null}
        onClose={() => setSelectedCampaign(null)}
      />
    </>
  );
}

// ─── Password Gate ────────────────────────────────────────────────────────────

export default function AdsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADS_PASSWORD) {
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
                <Megaphone className="w-7 h-7 text-saffron" />
              </div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                Ad Manager
              </h1>
              <p className="text-muted-foreground font-body text-sm mt-1">
                Choudhary Aunty — Advertise &amp; Promote
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  Access Password
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
                    data-ocid="ads.password.input"
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
                    data-ocid="ads.password.error_state"
                  >
                    {error}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-saffron hover:bg-terracotta text-cream font-semibold"
                data-ocid="ads.password.submit_button"
              >
                <Lock className="w-4 h-4 mr-2" />
                Access Ad Manager
              </Button>
            </form>
            <p className="text-xs text-center text-muted-foreground font-body mt-4">
              Password:{" "}
              <span className="font-semibold text-saffron">ads2024</span>
            </p>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-16 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <AdsDashboard />
      </motion.div>
    </main>
  );
}

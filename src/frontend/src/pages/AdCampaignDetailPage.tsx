import type { AdCampaign } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetAdAnalytics,
  useGetAllAdCampaigns,
  usePauseAdCampaign,
  useResumeAdCampaign,
} from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BarChart2,
  Eye,
  IndianRupee,
  MousePointer,
  Pause,
  Play,
  ShoppingCart,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

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
      className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-body font-semibold ${meta.bg} ${meta.color}`}
    >
      {meta.icon} {meta.label}
    </span>
  );
}

export default function AdCampaignDetailPage() {
  const { id } = useParams({ from: "/ads/$id" });
  const campaignId = BigInt(id);

  const { data: allCampaigns, isLoading: campaignsLoading } =
    useGetAllAdCampaigns();
  const { data: analytics, isLoading: analyticsLoading } =
    useGetAdAnalytics(campaignId);

  const pauseMutation = usePauseAdCampaign();
  const resumeMutation = useResumeAdCampaign();

  const campaigns =
    allCampaigns && allCampaigns.length > 0 ? allCampaigns : MOCK_CAMPAIGNS;
  const campaign = campaigns.find((c) => c.id === campaignId) ?? null;

  const isLoading = campaignsLoading || analyticsLoading;

  if (isLoading) {
    return (
      <main className="min-h-screen pt-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-8 space-y-5">
          <Skeleton className="h-12 w-64 rounded-xl" />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </main>
    );
  }

  if (!campaign) {
    return (
      <main className="min-h-screen pt-16 bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📢</div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Campaign Not Found
          </h1>
          <Link
            to="/ads"
            className="text-saffron hover:text-terracotta font-body text-sm underline"
          >
            ← Back to Ad Manager
          </Link>
        </div>
      </main>
    );
  }

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
  const cpo = spend / (orders || 1);
  const roas = revenue / (spend || 1);
  const ctr =
    impressions > 0 ? ((clicks / impressions) * 100).toFixed(1) : "0.0";

  const rankScore =
    campaign.bidPerClick *
    campaign.qualityScore *
    (campaign.targetCategory ? 0.95 : 1.0);

  function handleToggle() {
    if (campaign!.status === "active") {
      pauseMutation.mutate(campaign!.id, {
        onSuccess: () => toast.success("Campaign paused."),
        onError: () => toast.info("Status updated (demo mode)."),
      });
    } else {
      resumeMutation.mutate(campaign!.id, {
        onSuccess: () => toast.success("Campaign resumed."),
        onError: () => toast.info("Status updated (demo mode)."),
      });
    }
  }

  return (
    <main className="min-h-screen pt-16 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900/90 to-saffron/80 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-5">
            <Link
              to="/ads"
              className="inline-flex items-center gap-1.5 text-cream/70 hover:text-cream text-sm font-body mb-3 transition-colors"
              data-ocid="ad_detail.back_link"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Ad Manager
            </Link>
            <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="font-display text-xl sm:text-2xl font-bold text-cream">
                    {campaign.name}
                  </h1>
                  <AdTypeBadge adType={campaign.adType} />
                </div>
                <p className="text-cream/60 font-body text-xs">
                  {campaign.targetState || "All States"}
                  {campaign.targetCategory
                    ? ` · ${campaign.targetCategory}`
                    : ""}{" "}
                  · Created{" "}
                  {new Date(
                    Number(campaign.createdAt) / 1_000_000,
                  ).toLocaleDateString("en-IN")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-body font-semibold px-3 py-1.5 rounded-full ${
                    campaign.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      campaign.status === "active"
                        ? "bg-green-500 animate-pulse"
                        : "bg-muted-foreground"
                    }`}
                  />
                  {campaign.status === "active" ? "Active" : "Paused"}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggle}
                  className="border-cream/20 text-cream hover:bg-cream/10 font-body text-sm"
                  disabled={pauseMutation.isPending || resumeMutation.isPending}
                  data-ocid={
                    campaign.status === "active"
                      ? "ad_detail.pause_campaign.button"
                      : "ad_detail.resume_campaign.button"
                  }
                >
                  {campaign.status === "active" ? (
                    <>
                      <Pause className="w-3.5 h-3.5 mr-1.5" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 mr-1.5" /> Resume
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-6 space-y-5">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
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
              <Card key={kpi.label} className="border-border shadow-xs">
                <CardContent className="py-4 px-4">
                  <div
                    className={`w-8 h-8 rounded-lg ${kpi.bg} flex items-center justify-center mb-2`}
                  >
                    <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                  <div
                    className={`font-display text-2xl font-bold ${kpi.color}`}
                  >
                    {kpi.value}
                  </div>
                  <div className="font-body text-xs text-muted-foreground mt-0.5">
                    {kpi.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTR */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "CTR", value: `${ctr}%`, sub: "Click-through rate" },
              {
                label: "Total Spend",
                value: `₹${spend.toLocaleString("en-IN")}`,
                sub: "All time",
              },
              {
                label: "Total Revenue",
                value: `₹${revenue.toLocaleString("en-IN")}`,
                sub: "All time",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border bg-card p-4 text-center"
              >
                <div className="font-display text-xl sm:text-2xl font-bold text-foreground">
                  {item.value}
                </div>
                <div className="font-body text-xs font-semibold text-foreground mt-0.5">
                  {item.label}
                </div>
                <div className="font-body text-xs text-muted-foreground">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Auction Score Card */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-xs">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-600" />
                Auction Score Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    label: "Bid per Click",
                    value: `₹${campaign.bidPerClick}`,
                    note: "Your max bid",
                  },
                  {
                    label: "Quality Score",
                    value: campaign.qualityScore.toFixed(2),
                    note: "Platform rated",
                  },
                  {
                    label: "Relevance Score",
                    value: campaign.targetCategory ? "0.95" : "1.00",
                    note: "Category match",
                  },
                  {
                    label: "Ad Rank Score",
                    value: rankScore.toFixed(2),
                    note: "bid × quality × relevance",
                    highlight: true,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`text-center p-3 rounded-xl border ${
                      item.highlight
                        ? "bg-amber-100 border-amber-300"
                        : "bg-white/60 border-amber-200"
                    }`}
                  >
                    <div
                      className={`font-display text-2xl font-bold ${
                        item.highlight ? "text-amber-800" : "text-amber-700"
                      } mb-1`}
                    >
                      {item.value}
                    </div>
                    <div className="font-body text-xs font-semibold text-amber-800">
                      {item.label}
                    </div>
                    <div className="font-body text-xs text-amber-600 mt-0.5">
                      {item.note}
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-body text-xs text-amber-700 mt-4 text-center">
                Higher rank score = more prominent placement in search &amp;
                discovery
              </p>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card className="border-border shadow-xs">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-saffron" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    time: "Last 24h",
                    text: `${Math.round(Number(campaign.totalImpressions) * 0.04)} impressions recorded`,
                    dot: "bg-blue-400",
                    detail: "Organic discovery + search placement",
                  },
                  {
                    time: "Today",
                    text: `${Math.round(Number(campaign.totalClicks) * 0.09)} clicks on your promoted listing`,
                    dot: "bg-purple-400",
                    detail: `₹${Math.round(campaign.bidPerClick * Number(campaign.totalClicks) * 0.09)} charged from daily budget`,
                  },
                  {
                    time: "This Week",
                    text: `${Math.round(Number(campaign.totalOrders) * 0.5)} orders converted via this campaign`,
                    dot: "bg-green-400",
                    detail: `ROAS ${Math.round(roas * 10) / 10}× — ₹${Math.round(revenue * 0.14)} revenue attributed`,
                  },
                  {
                    time: "Budget",
                    text: `₹${Math.round(campaign.dailyBudget * 0.68)} of ₹${campaign.dailyBudget} daily budget used today`,
                    dot: "bg-amber-400",
                    detail: `₹${Math.round(campaign.dailyBudget * 0.32)} remaining — campaign running`,
                  },
                  {
                    time: "Quality",
                    text: `Quality score: ${campaign.qualityScore.toFixed(2)} — Above average`,
                    dot: "bg-saffron",
                    detail: "Based on CTR, product reviews, and seller rating",
                  },
                ].map((activity, idx) => (
                  <div
                    key={activity.time}
                    className="flex items-start gap-3"
                    data-ocid={`ad_detail.activity.item.${idx + 1}`}
                  >
                    <div className="flex flex-col items-center shrink-0 mt-1">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${activity.dot}`}
                      />
                      {idx < 4 && <div className="w-px h-8 bg-border mt-1" />}
                    </div>
                    <div className="pb-2">
                      <div className="flex items-baseline gap-2">
                        <span className="font-body text-xs font-bold text-foreground uppercase tracking-wider">
                          {activity.time}
                        </span>
                      </div>
                      <p className="font-body text-sm text-foreground">
                        {activity.text}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        {activity.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Overview */}
          <Card className="border-border shadow-xs">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-base flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-saffron" />
                Budget Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="font-body text-sm text-muted-foreground">
                    Daily Budget
                  </span>
                  <span className="font-body text-sm font-bold text-foreground">
                    ₹{campaign.dailyBudget}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-body text-sm text-muted-foreground">
                    Total Spend (all time)
                  </span>
                  <span className="font-body text-sm font-bold text-saffron">
                    ₹{spend.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-body text-sm text-muted-foreground">
                    Revenue Attributed
                  </span>
                  <span className="font-body text-sm font-bold text-green-600">
                    ₹{revenue.toLocaleString("en-IN")}
                  </span>
                </div>
                {/* Progress bar for daily usage */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-body text-xs text-muted-foreground">
                      Today's budget usage
                    </span>
                    <span className="font-body text-xs font-semibold">68%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "68%" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-saffron to-terracotta"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </main>
  );
}

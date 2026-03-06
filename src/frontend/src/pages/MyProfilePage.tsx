import type { Order, Product } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
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
import { getMakerImage, getProductImage } from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import { useActor } from "@/hooks/useActor";
import { useGetAllMakers, useGetAllProducts } from "@/hooks/useQueries";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Edit2,
  Gift,
  Heart,
  Loader2,
  LogOut,
  ShoppingBag,
  Sparkles,
  Star,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Helpers ────────────────────────────────────────────────────────────────

const ASHARFI_TIERS = [
  {
    name: "Naya Rishta",
    min: 0,
    max: 499,
    color: "text-stone-600",
    bg: "bg-stone-100",
    emoji: "🤝",
  },
  {
    name: "Apna Banda",
    min: 500,
    max: 1499,
    color: "text-amber-700",
    bg: "bg-amber-50",
    emoji: "⭐",
  },
  {
    name: "Ghar Ka Fard",
    min: 1500,
    max: 2999,
    color: "text-saffron",
    bg: "bg-saffron/10",
    emoji: "🏠",
  },
  {
    name: "Parivaar Ka Sitaara",
    min: 3000,
    max: 999999,
    color: "text-gold",
    bg: "bg-gold/10",
    emoji: "🌟",
  },
];

function getTier(points: number) {
  return (
    ASHARFI_TIERS.find((t) => points >= t.min && points <= t.max) ??
    ASHARFI_TIERS[0]
  );
}

function getLifecycleBadge(stage: string) {
  const map: Record<string, { cls: string; label: string }> = {
    New: { cls: "bg-blue-100 text-blue-700", label: "🆕 New Member" },
    Active: { cls: "bg-green-100 text-green-700", label: "✅ Active" },
    Loyal: { cls: "bg-amber-100 text-amber-700", label: "💛 Loyal" },
    Champion: { cls: "bg-saffron/15 text-saffron", label: "🏆 Champion" },
  };
  return map[stage] ?? { cls: "bg-muted text-muted-foreground", label: stage };
}

function PreferenceDots({ level }: { level: string }) {
  const val = level?.toLowerCase();
  const filled =
    val?.includes("low") || val === "low"
      ? 1
      : val?.includes("high") || val === "high"
        ? 3
        : 2;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full border-2 transition-colors ${
            i <= filled
              ? "bg-saffron border-saffron"
              : "bg-transparent border-border"
          }`}
        />
      ))}
    </div>
  );
}

// Rule-based recommendation engine
function getRecommendations(
  products: Product[],
  spice: string,
  oil: string,
  sweetness: string,
  region: string,
): Product[] {
  const scored = products.map((p) => {
    let score = 0;
    const name = p.name.toLowerCase();
    const cat = p.category.toLowerCase();

    if (spice?.toLowerCase().includes("high")) {
      if (
        name.includes("spicy") ||
        name.includes("mirch") ||
        cat.includes("achar")
      )
        score += 3;
    }
    if (oil?.toLowerCase().includes("low")) {
      if (
        cat.includes("namkeen") ||
        cat.includes("snack") ||
        name.includes("makhana")
      )
        score += 3;
    }
    if (sweetness?.toLowerCase().includes("high")) {
      if (
        cat.includes("sweet") ||
        cat.includes("ladoo") ||
        cat.includes("barfi") ||
        cat.includes("halwa") ||
        name.includes("ladoo") ||
        name.includes("peda") ||
        name.includes("petha")
      )
        score += 3;
    }
    if (region && p.state?.toLowerCase().includes(region.toLowerCase())) {
      score += 2;
    }
    if (p.isAvailable) score += 1;
    return { product: p, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((s) => s.product);
}

const PREF_OPTIONS = {
  spice: ["Low Spice", "Medium Spice", "High Spice"],
  oil: ["Low Oil", "Medium Oil", "High Oil"],
  sweetness: ["Low Sweet", "Medium Sweet", "High Sweet"],
  region: ["Bihar", "Haryana", "Punjab", "Uttar Pradesh", "Uttarakhand", ""],
};

const SAVED_MAKERS_KEY = "choudhary_saved_makers";

export default function MyProfilePage() {
  const { customerAccount, isLoggedIn, isLoading, logout, refreshAccount } =
    useAuth();
  const { actor } = useActor();
  const navigate = useNavigate();
  const productsQuery = useGetAllProducts();
  const makersQuery = useGetAllMakers();

  // Saved makers from localStorage (synced with heart toggle on Makers/MakerDetail pages)
  const [savedMakerIds, setSavedMakerIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(SAVED_MAKERS_KEY) ?? "[]");
    } catch {
      return [];
    }
  });

  function removeSavedMaker(id: string, name: string) {
    setSavedMakerIds((prev) => {
      const next = prev.filter((x) => x !== id);
      localStorage.setItem(SAVED_MAKERS_KEY, JSON.stringify(next));
      toast.success(`Removed ${name.split(" ")[0]} from favourites`);
      return next;
    });
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [tasteOpen, setTasteOpen] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editState, setEditState] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Taste form state
  const [spice, setSpice] = useState("");
  const [oil, setOil] = useState("");
  const [sweetness, setSweetness] = useState("");
  const [regionPref, setRegionPref] = useState("");
  const [isSavingTaste, setIsSavingTaste] = useState(false);

  useEffect(() => {
    document.title = "My Profile | Choudhary Aunty";
  }, []);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate({ to: "/login" });
    }
  }, [isLoggedIn, isLoading, navigate]);

  useEffect(() => {
    if (!customerAccount) return;
    setEditName(customerAccount.name);
    setEditCity(customerAccount.city);
    setEditState(customerAccount.state);
    setEditEmail(customerAccount.email);
    setEditPhone(customerAccount.phone);
    setSpice(customerAccount.spicePreference || "Medium Spice");
    setOil(customerAccount.oilPreference || "Medium Oil");
    setSweetness(customerAccount.sweetnessPreference || "Medium Sweet");
    setRegionPref(customerAccount.regionPreference || "");
  }, [customerAccount]);

  // Fetch orders
  useEffect(() => {
    if (!actor || !customerAccount?.phone) return;
    const fetchOrders = async () => {
      setOrdersLoading(true);
      try {
        const result = await actor.getMyOrders(customerAccount.phone);
        setOrders(result);
      } catch {
        // silently fail
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [actor, customerAccount?.phone]);

  async function handleSaveProfile() {
    if (!actor) return;
    setIsSaving(true);
    try {
      await actor.updateMyAccount(
        editName,
        editPhone,
        editEmail,
        editCity,
        editState,
        customerAccount?.dietType ?? "Veg",
        customerAccount?.spicePreference ?? "Medium Spice",
        customerAccount?.oilPreference ?? "Medium Oil",
        customerAccount?.sweetnessPreference ?? "Medium Sweet",
        customerAccount?.regionPreference ?? "",
      );
      await refreshAccount();
      setEditOpen(false);
      toast.success("Profile updated!");
    } catch {
      // Update localStorage directly
      const saved = localStorage.getItem("ca_customer_account");
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.name = editName;
        parsed.city = editCity;
        parsed.state = editState;
        localStorage.setItem("ca_customer_account", JSON.stringify(parsed));
      }
      setEditOpen(false);
      toast.success("Profile updated!");
      window.location.reload();
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSaveTaste() {
    if (!actor || !customerAccount) return;
    setIsSavingTaste(true);
    try {
      await actor.updateMyAccount(
        customerAccount.name,
        customerAccount.phone,
        customerAccount.email,
        customerAccount.city,
        customerAccount.state,
        customerAccount.dietType,
        spice,
        oil,
        sweetness,
        regionPref,
      );
      await refreshAccount();
      setTasteOpen(false);
      toast.success("Taste profile updated! 🌶️");
    } catch {
      // Update localStorage directly
      const saved = localStorage.getItem("ca_customer_account");
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.spicePreference = spice;
        parsed.oilPreference = oil;
        parsed.sweetnessPreference = sweetness;
        parsed.regionPreference = regionPref;
        localStorage.setItem("ca_customer_account", JSON.stringify(parsed));
      }
      setTasteOpen(false);
      toast.success("Taste profile updated! 🌶️");
      window.location.reload();
    } finally {
      setIsSavingTaste(false);
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen pt-16 mesh-bg">
        <div className="container mx-auto px-4 max-w-4xl py-12 space-y-6">
          <Skeleton
            className="h-32 rounded-3xl"
            data-ocid="profile.loading_state"
          />
          <Skeleton className="h-48 rounded-3xl" />
          <Skeleton className="h-64 rounded-3xl" />
        </div>
      </main>
    );
  }

  if (!customerAccount) return null;

  const points = Number(customerAccount.asharfiPoints);
  const tier = getTier(points);
  const nextTier = ASHARFI_TIERS.find((t) => t.min > points);
  const progressPct = nextTier
    ? Math.min(
        100,
        Math.round(((points - tier.min) / (tier.max - tier.min)) * 100),
      )
    : 100;
  const lifecycle = getLifecycleBadge(customerAccount.lifecycleStage);
  const products = productsQuery.data ?? [];
  const recommended = getRecommendations(
    products,
    customerAccount.spicePreference,
    customerAccount.oilPreference,
    customerAccount.sweetnessPreference,
    customerAccount.regionPreference,
  );

  const initials = customerAccount.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const memberSince = customerAccount.signupDate
    ? new Date(Number(customerAccount.signupDate) / 1_000_000).getFullYear()
    : new Date().getFullYear();

  return (
    <main className="min-h-screen pt-16 pb-12 mesh-bg">
      <div className="container mx-auto px-4 max-w-4xl py-8 space-y-6">
        {/* ── Profile Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-amber-100 shadow-warm-lg overflow-hidden"
        >
          {/* Banner */}
          <div className="h-24 bg-gradient-to-r from-burgundy via-terracotta to-saffron relative">
            <div className="absolute inset-0 opacity-10 [background-image:url(data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2240%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%2F%3E%3C%2Fsvg%3E)]" />
          </div>
          <div className="px-6 pb-6 -mt-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 mb-4">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-saffron/20 border-4 border-white shadow-warm flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-2xl text-saffron">
                  {initials}
                </span>
              </div>
              {/* Info */}
              <div className="flex-1 pt-2">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="font-display font-bold text-2xl text-foreground">
                    {customerAccount.name}
                  </h1>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-body font-semibold ${lifecycle.cls}`}
                  >
                    {lifecycle.label}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm font-body">
                  📍 {customerAccount.city}, {customerAccount.state} • Member
                  since {memberSince}
                </p>
              </div>
              {/* Asharfi Balance */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 text-center shrink-0">
                <p className="text-xs font-body font-semibold text-amber-600 uppercase tracking-wider">
                  Asharfi Balance
                </p>
                <p className="font-display text-3xl font-bold text-saffron">
                  🪙 {points.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-amber-600 font-body">
                  {tier.emoji} {tier.name}
                </p>
              </div>
            </div>
            {/* Action buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditOpen(true)}
                data-ocid="profile.edit_button"
                className="font-body border-saffron/30 text-saffron hover:bg-saffron/5 rounded-xl"
              >
                <Edit2 className="w-3.5 h-3.5 mr-1.5" />
                Edit Profile
              </Button>
              <Link to="/crm">
                <Button
                  variant="outline"
                  size="sm"
                  className="font-body border-burgundy/30 text-burgundy hover:bg-burgundy/5 rounded-xl"
                >
                  <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                  CRM Portal
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  logout();
                  navigate({ to: "/" });
                  toast.success("Logged out. Aate rehna! 👋");
                }}
                className="font-body text-muted-foreground hover:text-red-600 rounded-xl ml-auto"
              >
                <LogOut className="w-3.5 h-3.5 mr-1.5" />
                Logout
              </Button>
            </div>
          </div>
        </motion.div>

        {/* ── Taste Profile ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-amber-100 shadow-warm-lg p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display font-bold text-lg text-foreground">
                🌶️ My Taste Profile
              </h2>
              <p className="text-muted-foreground text-xs font-body">
                Personalized to your preferences
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setTasteOpen(true)}
              data-ocid="profile.taste_update_button"
              className="font-body border-saffron/30 text-saffron hover:bg-saffron/5 rounded-xl"
            >
              Update Taste
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "Spice Level",
                value: customerAccount.spicePreference || "Medium",
                icon: "🌶️",
              },
              {
                label: "Oil Level",
                value: customerAccount.oilPreference || "Medium",
                icon: "🫗",
              },
              {
                label: "Sweetness",
                value: customerAccount.sweetnessPreference || "Medium",
                icon: "🍯",
              },
              {
                label: "Region Pref.",
                value: customerAccount.regionPreference || "All India",
                icon: "📍",
              },
            ].map((pref) => (
              <div
                key={pref.label}
                className="bg-amber-50 border border-amber-100 rounded-2xl p-4"
              >
                <div className="text-2xl mb-2">{pref.icon}</div>
                <p className="text-xs font-body text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                  {pref.label}
                </p>
                <p className="font-body font-semibold text-foreground text-sm">
                  {pref.value || "Not set"}
                </p>
                {pref.label !== "Region Pref." && (
                  <div className="mt-2">
                    <PreferenceDots level={pref.value} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── My Orders ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl border border-amber-100 shadow-warm-lg p-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-saffron/10 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-saffron" />
            </div>
            <h2 className="font-display font-bold text-lg text-foreground">
              My Orders
            </h2>
          </div>
          {ordersLoading ? (
            <div className="space-y-3">
              <Skeleton
                className="h-12 rounded-xl"
                data-ocid="profile.orders_loading_state"
              />
              <Skeleton className="h-12 rounded-xl" />
            </div>
          ) : orders.length === 0 ? (
            <div
              className="text-center py-12"
              data-ocid="profile.orders_empty_state"
            >
              <div className="text-4xl mb-3">🍯</div>
              <p className="font-display font-semibold text-foreground mb-1">
                No orders yet
              </p>
              <p className="text-muted-foreground text-sm font-body mb-4">
                Start with something delicious!
              </p>
              <Link to="/shop" search={{}}>
                <Button className="bg-saffron hover:bg-terracotta text-cream font-body font-semibold rounded-xl">
                  Explore Products <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto" data-ocid="profile.orders_table">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-body text-xs uppercase tracking-wider">
                      Product
                    </TableHead>
                    <TableHead className="font-body text-xs uppercase tracking-wider">
                      Date
                    </TableHead>
                    <TableHead className="font-body text-xs uppercase tracking-wider">
                      Amount
                    </TableHead>
                    <TableHead className="font-body text-xs uppercase tracking-wider">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order, idx) => (
                    <TableRow
                      key={order.id.toString()}
                      data-ocid={`profile.order.item.${idx + 1}`}
                    >
                      <TableCell className="font-body text-sm font-semibold">
                        {order.whatsappOrderText
                          ? order.whatsappOrderText
                              .split("\n")[0]
                              .replace("Hi! I'd like to order *", "")
                              .replace("* from Choudhary Aunty.", "")
                          : `Order #${order.id.toString()}`}
                      </TableCell>
                      <TableCell className="font-body text-sm text-muted-foreground">
                        {new Date(
                          Number(order.createdAt) / 1_000_000,
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="font-body text-sm font-semibold text-saffron">
                        ₹{order.totalAmount}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs font-body font-semibold ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "dispatched"
                                ? "bg-blue-100 text-blue-700"
                                : order.status === "preparing"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {String(order.status).charAt(0).toUpperCase() +
                            String(order.status).slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>

        {/* ── Recommended For You ── */}
        {recommended.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl border border-amber-100 shadow-warm-lg p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display font-bold text-lg text-foreground">
                  ✨ Aapke Liye Khaas
                </h2>
                <p className="text-muted-foreground text-xs font-body">
                  Recommended based on your taste profile
                </p>
              </div>
              <Link to="/shop" search={{}}>
                <span className="text-saffron text-xs font-body font-semibold hover:text-terracotta">
                  View all →
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {recommended.map((p, idx) => (
                <Link
                  key={p.id.toString()}
                  to="/product/$id"
                  params={{ id: p.id.toString() }}
                  data-ocid={`profile.recommendation.item.${idx + 1}`}
                  className="group block"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-2 border border-border">
                    <img
                      src={getProductImage(p.category, p.name)}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="font-body font-semibold text-xs text-foreground line-clamp-2">
                    {p.name}
                  </p>
                  <p className="text-saffron text-xs font-bold mt-0.5">
                    ₹{p.sellingPrice}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Loyalty & Asharfi ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-3xl border border-amber-100 shadow-warm-lg p-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-gold/10 flex items-center justify-center">
              <Gift className="w-4 h-4 text-gold" />
            </div>
            <h2 className="font-display font-bold text-lg text-foreground">
              🪙 Asharfi Loyalty
            </h2>
          </div>

          {/* Current tier */}
          <div
            className={`${tier.bg} border border-amber-200 rounded-2xl p-5 mb-5`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-body text-muted-foreground font-semibold uppercase tracking-wider">
                  Current Tier
                </p>
                <p className={`font-display font-bold text-xl ${tier.color}`}>
                  {tier.emoji} {tier.name}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-3xl font-bold text-saffron">
                  {points.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-muted-foreground font-body">
                  Asharfi
                </p>
              </div>
            </div>
            {nextTier && (
              <>
                <div className="flex items-center justify-between text-xs font-body text-muted-foreground mb-1.5">
                  <span>{tier.name}</span>
                  <span>{nextTier.name}</span>
                </div>
                <Progress value={progressPct} className="h-2 bg-amber-100" />
                <p className="text-xs text-muted-foreground font-body mt-1.5">
                  {nextTier.min - points} more Asharfi to reach{" "}
                  <strong>{nextTier.name}</strong>
                </p>
              </>
            )}
          </div>

          {/* How to earn */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                icon: <ShoppingBag className="w-4 h-4" />,
                action: "Every Order",
                points: "+50 Asharfi",
                color: "bg-green-50 text-green-700 border-green-100",
              },
              {
                icon: <Star className="w-4 h-4" />,
                action: "Leave a Review",
                points: "+20 Asharfi",
                color: "bg-blue-50 text-blue-700 border-blue-100",
              },
              {
                icon: <Zap className="w-4 h-4" />,
                action: "Refer a Friend",
                points: "+100 Asharfi",
                color: "bg-amber-50 text-amber-700 border-amber-100",
              },
            ].map((way) => (
              <div
                key={way.action}
                className={`${way.color} border rounded-xl p-3 flex items-center gap-3`}
              >
                <div className="shrink-0">{way.icon}</div>
                <div>
                  <p className="text-xs font-body font-semibold">
                    {way.action}
                  </p>
                  <p className="text-xs font-bold mt-0.5">{way.points}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Favourite Makers ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl border border-amber-100 shadow-warm-lg p-6"
          data-ocid="profile.saved_makers.panel"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </div>
              <h2 className="font-display font-bold text-lg text-foreground">
                My Favourite Makers
              </h2>
            </div>
            <Link
              to="/makers"
              className="text-saffron text-xs font-body font-semibold hover:text-terracotta"
              data-ocid="profile.saved_makers.browse_link"
            >
              Browse all →
            </Link>
          </div>

          {savedMakerIds.length === 0 ? (
            <div
              className="text-center py-10"
              data-ocid="profile.saved_makers.empty_state"
            >
              <Heart className="w-10 h-10 text-amber-200 mx-auto mb-3" />
              <p className="font-body text-sm text-muted-foreground mb-1">
                No favourites saved yet
              </p>
              <p className="text-xs font-body text-muted-foreground mb-4">
                Tap the ❤️ on any maker's profile to save them here
              </p>
              <Link
                to="/makers"
                data-ocid="profile.saved_makers.explore_button"
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 bg-saffron hover:bg-terracotta text-cream text-xs font-semibold font-body px-4 py-2 rounded-xl transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  Explore Makers
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {savedMakerIds.map((mid, idx) => {
                const maker = (makersQuery.data ?? []).find(
                  (m) => m.id.toString() === mid,
                );
                if (!maker) return null;
                return (
                  <div
                    key={mid}
                    className="relative group border border-amber-100 rounded-2xl p-3 text-center hover:border-saffron/30 transition-colors"
                    data-ocid={`profile.saved_makers.item.${idx + 1}`}
                  >
                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeSavedMaker(mid, maker.name)}
                      className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-red-50 border border-red-200 text-red-400 hover:text-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      data-ocid={`profile.saved_makers.remove_button.${idx + 1}`}
                      title="Remove from favourites"
                    >
                      <Heart className="w-2.5 h-2.5 fill-current" />
                    </button>
                    <Link
                      to="/maker/$id"
                      params={{ id: mid }}
                      data-ocid={`profile.saved_makers.link.${idx + 1}`}
                    >
                      <div className="w-14 h-14 rounded-full overflow-hidden mx-auto mb-2 border-2 border-saffron/20">
                        <img
                          src={getMakerImage(maker.name)}
                          alt={maker.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <p className="font-body font-semibold text-xs text-foreground line-clamp-1">
                        {maker.name.split(" ")[0]}
                      </p>
                      <p className="text-muted-foreground font-body text-[10px] mt-0.5">
                        {maker.state}
                      </p>
                    </Link>
                  </div>
                );
              })}
              {/* "Add more" slot */}
              <Link to="/makers" data-ocid="profile.saved_makers.add_button">
                <div className="border-2 border-dashed border-amber-200 rounded-2xl p-3 text-center opacity-60 hover:opacity-90 hover:border-saffron/40 transition-all h-full flex flex-col items-center justify-center min-h-[100px]">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-2">
                    <User className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-xs font-body text-muted-foreground">
                    Find more
                  </p>
                </div>
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      {/* ── Edit Profile Modal ── */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent
          className="max-w-md rounded-3xl"
          data-ocid="profile.edit_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Edit Profile
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label className="font-body text-sm font-semibold mb-1 block">
                Name
              </Label>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="font-body rounded-xl"
              />
            </div>
            <div>
              <Label className="font-body text-sm font-semibold mb-1 block">
                Phone
              </Label>
              <Input
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="font-body rounded-xl"
              />
            </div>
            <div>
              <Label className="font-body text-sm font-semibold mb-1 block">
                Email
              </Label>
              <Input
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="font-body rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="font-body text-sm font-semibold mb-1 block">
                  City
                </Label>
                <Input
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  className="font-body rounded-xl"
                />
              </div>
              <div>
                <Label className="font-body text-sm font-semibold mb-1 block">
                  State
                </Label>
                <Input
                  value={editState}
                  onChange={(e) => setEditState(e.target.value)}
                  className="font-body rounded-xl"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setEditOpen(false)}
                data-ocid="profile.edit_cancel_button"
                className="flex-1 font-body rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveProfile}
                disabled={isSaving}
                data-ocid="profile.edit_save_button"
                className="flex-1 bg-saffron hover:bg-terracotta text-cream font-body font-semibold rounded-xl"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Taste Profile Modal ── */}
      <Dialog open={tasteOpen} onOpenChange={setTasteOpen}>
        <DialogContent
          className="max-w-md rounded-3xl"
          data-ocid="profile.taste_modal"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              🌶️ Update My Taste Profile
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5 mt-2">
            {/* Spice */}
            <div>
              <Label className="font-body text-sm font-semibold mb-2 block">
                Spice Level
              </Label>
              <div className="flex gap-2">
                {PREF_OPTIONS.spice.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSpice(opt)}
                    className={`flex-1 py-2 text-xs font-body font-semibold rounded-xl border transition-all ${
                      spice === opt
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-white border-border hover:border-red-300 text-muted-foreground"
                    }`}
                  >
                    {opt.replace(" Spice", "")}
                  </button>
                ))}
              </div>
            </div>
            {/* Oil */}
            <div>
              <Label className="font-body text-sm font-semibold mb-2 block">
                Oil Level
              </Label>
              <div className="flex gap-2">
                {PREF_OPTIONS.oil.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setOil(opt)}
                    className={`flex-1 py-2 text-xs font-body font-semibold rounded-xl border transition-all ${
                      oil === opt
                        ? "bg-amber-500 text-white border-amber-500"
                        : "bg-white border-border hover:border-amber-300 text-muted-foreground"
                    }`}
                  >
                    {opt.replace(" Oil", "")}
                  </button>
                ))}
              </div>
            </div>
            {/* Sweetness */}
            <div>
              <Label className="font-body text-sm font-semibold mb-2 block">
                Sweetness
              </Label>
              <div className="flex gap-2">
                {PREF_OPTIONS.sweetness.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSweetness(opt)}
                    className={`flex-1 py-2 text-xs font-body font-semibold rounded-xl border transition-all ${
                      sweetness === opt
                        ? "bg-saffron text-cream border-saffron"
                        : "bg-white border-border hover:border-saffron/40 text-muted-foreground"
                    }`}
                  >
                    {opt.replace(" Sweet", "")}
                  </button>
                ))}
              </div>
            </div>
            {/* Region */}
            <div>
              <Label className="font-body text-sm font-semibold mb-2 block">
                Preferred Region
              </Label>
              <Select value={regionPref} onValueChange={setRegionPref}>
                <SelectTrigger className="font-body rounded-xl">
                  <SelectValue placeholder="No preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="" className="font-body">
                    All India
                  </SelectItem>
                  {PREF_OPTIONS.region.filter(Boolean).map((r) => (
                    <SelectItem key={r} value={r} className="font-body">
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setTasteOpen(false)}
                data-ocid="profile.taste_cancel_button"
                className="flex-1 font-body rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveTaste}
                disabled={isSavingTaste}
                data-ocid="profile.taste_save_button"
                className="flex-1 bg-saffron hover:bg-terracotta text-cream font-body font-semibold rounded-xl"
              >
                {isSavingTaste ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-1.5" />
                    Save Taste
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

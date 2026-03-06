import { AsharfiBadge } from "@/components/loyalty/AsharfiBadge";
import { TierProgressBar } from "@/components/loyalty/TierProgressBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { buildWhatsAppUrl } from "@/constants/images";
import {
  Award,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Gift,
  MapPin,
  Phone,
  Share2,
  ShoppingBag,
  Star,
  TrendingUp,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ============================================
// TYPES & CONSTANTS
// ============================================

interface CustomerProfile {
  name: string;
  phone: string;
  address: string;
  dob: string;
  referralCode: string;
}

interface LoyaltyTransaction {
  id: string;
  date: string;
  reason: string;
  amount: number;
  type: "credit" | "debit";
}

interface MockOrder {
  id: string;
  date: string;
  product: string;
  maker: string;
  amount: number;
  status: string;
}

const CUSTOMER_TIERS = [
  {
    name: "Naya Rishta",
    min: 0,
    max: 199,
    color: "text-slate-500",
    bg: "bg-slate-100",
    icon: "🪙",
  },
  {
    name: "Apna Banda",
    min: 200,
    max: 499,
    color: "text-amber-600",
    bg: "bg-amber-50",
    icon: "🥉",
  },
  {
    name: "Ghar Ka Fard",
    min: 500,
    max: 999,
    color: "text-saffron",
    bg: "bg-saffron/8",
    icon: "🥇",
  },
  {
    name: "Parivaar Ka Sitaara",
    min: 1000,
    max: Number.POSITIVE_INFINITY,
    color: "text-warmBrown",
    bg: "bg-gold/10",
    icon: "👑",
  },
];

const EARNING_CRITERIA = [
  {
    icon: ShoppingBag,
    label: "First order placed",
    points: 50,
    color: "text-saffron",
  },
  {
    icon: TrendingUp,
    label: "Every ₹100 spent",
    points: 1,
    color: "text-green-600",
  },
  {
    icon: Star,
    label: "Writing a review",
    points: 25,
    color: "text-amber-500",
  },
  {
    icon: Share2,
    label: "Referring a friend",
    points: 100,
    color: "text-blue-500",
  },
  { icon: Gift, label: "Birthday bonus", points: 50, color: "text-terracotta" },
];

const DEMO_TRANSACTIONS: LoyaltyTransaction[] = [
  {
    id: "t1",
    date: "12 Feb 2026",
    reason: "First order placed",
    amount: 50,
    type: "credit",
  },
  {
    id: "t2",
    date: "5 Mar 2026",
    reason: "Order value ₹45 → ₹450 spent",
    amount: 45,
    type: "credit",
  },
  {
    id: "t3",
    date: "20 Feb 2026",
    reason: "Review submitted for Tilkut",
    amount: 25,
    type: "credit",
  },
  {
    id: "t4",
    date: "1 Mar 2026",
    reason: "Referred Sunita Verma",
    amount: 100,
    type: "credit",
  },
  {
    id: "t5",
    date: "28 Feb 2026",
    reason: "Birthday bonus",
    amount: 50,
    type: "credit",
  },
  {
    id: "t6",
    date: "15 Feb 2026",
    reason: "Order value ₹80 → ₹800 spent",
    amount: 80,
    type: "credit",
  },
];

const DEMO_ORDERS: MockOrder[] = [
  {
    id: "CA-2026-001",
    date: "12 Feb 2026",
    product: "Aam Ka Achar 500g",
    maker: "Anju Choudhary",
    amount: 450,
    status: "Delivered",
  },
  {
    id: "CA-2026-008",
    date: "5 Mar 2026",
    product: "Tilkut 250g",
    maker: "Anju Choudhary",
    amount: 320,
    status: "Delivered",
  },
  {
    id: "CA-2026-015",
    date: "1 Mar 2026",
    product: "Gajak 500g",
    maker: "Preetkaur Aunty",
    amount: 550,
    status: "Preparing",
  },
];

const DEFAULT_DEMO_PROFILE: CustomerProfile = {
  name: "Rahul Sharma",
  phone: "9876543210",
  address: "123, Green Park, New Delhi",
  dob: "1990-08-15",
  referralCode: "CA-RK2190",
};

// ============================================
// HELPERS
// ============================================

function generateReferralCode(name: string, phone: string): string {
  const initials = name.substring(0, 2).toUpperCase();
  const phoneSuffix = phone.slice(-4);
  return `CA-${initials}${phoneSuffix}`;
}

function getCurrentTier(balance: number) {
  return (
    CUSTOMER_TIERS.find((t) => balance >= t.min && balance <= t.max) ??
    CUSTOMER_TIERS[0]
  );
}

function getNextTier(balance: number) {
  const idx = CUSTOMER_TIERS.findIndex(
    (t) => balance >= t.min && balance <= t.max,
  );
  return CUSTOMER_TIERS[idx + 1] ?? null;
}

function loadProfile(phone: string): CustomerProfile | null {
  try {
    const raw = localStorage.getItem(`rishta_customer_${phone}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveProfile(profile: CustomerProfile) {
  localStorage.setItem(
    `rishta_customer_${profile.phone}`,
    JSON.stringify(profile),
  );
}

function loadTransactions(phone: string): LoyaltyTransaction[] {
  try {
    const raw = localStorage.getItem(`rishta_tx_customer_${phone}`);
    return raw ? JSON.parse(raw) : DEMO_TRANSACTIONS;
  } catch {
    return DEMO_TRANSACTIONS;
  }
}

function loadBalance(phone: string): number {
  try {
    const raw = localStorage.getItem(`rishta_balance_customer_${phone}`);
    return raw ? Number(raw) : 350;
  } catch {
    return 350;
  }
}

// ============================================
// MAIN PAGE
// ============================================

export default function CustomerProfilePage() {
  const [profile, setProfile] = useState<CustomerProfile>(() => {
    const saved = loadProfile("9876543210");
    return saved ?? DEFAULT_DEMO_PROFILE;
  });
  const [formData, setFormData] = useState<CustomerProfile>(profile);
  const [saved, setSaved] = useState(false);
  const [showCriteria, setShowCriteria] = useState(false);
  const [asharfiBalance] = useState(() => loadBalance(profile.phone));
  const [transactions] = useState<LoyaltyTransaction[]>(() =>
    loadTransactions(profile.phone),
  );

  const currentTier = getCurrentTier(asharfiBalance);
  const nextTier = getNextTier(asharfiBalance);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const code = generateReferralCode(formData.name, formData.phone);
    const updated = { ...formData, referralCode: code };
    setProfile(updated);
    saveProfile(updated);
    setSaved(true);
    toast.success("Profile saved! Your Rishta Rewards account is updated.");
    setTimeout(() => setSaved(false), 3000);
  }

  function copyReferral() {
    navigator.clipboard.writeText(profile.referralCode).then(() => {
      toast.success(
        "Referral code copied! Share with friends to earn 100 Asharfi.",
      );
    });
  }

  function shareWhatsApp() {
    const text = `Hey! Try Choudhary Aunty — amazing homemade traditional foods from real Aunties across India. Use my referral code ${profile.referralCode} while ordering and let's both earn Asharfi! 🪙\n\nwww.choudharyaunty.com`;
    window.open(buildWhatsAppUrl(text), "_blank");
  }

  return (
    <main className="min-h-screen pt-16 bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-saffron/12 via-background to-terracotta/8 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-saffron/15 border border-saffron/25 flex items-center justify-center shrink-0">
              <User className="w-7 h-7 text-saffron" />
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                My Profile & Rishta Rewards
              </h1>
              <p className="text-muted-foreground font-body text-sm mt-1">
                Earn Asharfi on every order. Redeem for discounts. Build your
                Rishta.
              </p>
              <div className="mt-2">
                <AsharfiBadge
                  balance={asharfiBalance}
                  tier={currentTier.name}
                  size="sm"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-8 space-y-6">
        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border shadow-xs hover:shadow-warm transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-saffron" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-body text-xs mb-1.5 block text-muted-foreground">
                      Full Name *
                    </Label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Your name"
                      className="font-body"
                      data-ocid="customer.profile.input"
                      required
                    />
                  </div>
                  <div>
                    <Label className="font-body text-xs mb-1.5 block text-muted-foreground">
                      Phone Number *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, phone: e.target.value }))
                        }
                        placeholder="10-digit number"
                        className="font-body pl-9"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-body text-xs mb-1.5 block text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 inline mr-1" />
                      Delivery Address
                    </Label>
                    <Input
                      value={formData.address}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, address: e.target.value }))
                      }
                      placeholder="Your address"
                      className="font-body"
                    />
                  </div>
                  <div>
                    <Label className="font-body text-xs mb-1.5 block text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 inline mr-1" />
                      Date of Birth (optional — for birthday bonus!)
                    </Label>
                    <Input
                      type="date"
                      value={formData.dob}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, dob: e.target.value }))
                      }
                      className="font-body"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <Button
                    type="submit"
                    className="bg-saffron hover:bg-terracotta text-cream font-semibold"
                    data-ocid="customer.profile.submit_button"
                  >
                    {saved ? <Check className="w-4 h-4 mr-2" /> : null}
                    {saved ? "Saved!" : "Save Profile"}
                  </Button>
                  {profile.referralCode && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg border border-border">
                      <span className="text-xs font-body text-muted-foreground">
                        Your code:
                      </span>
                      <span className="text-xs font-bold font-body text-saffron tracking-wide">
                        {profile.referralCode}
                      </span>
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Loyalty Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-saffron/25"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.22 0.06 42) 0%, oklch(0.30 0.08 38) 50%, oklch(0.25 0.10 22) 100%)",
            }}
          >
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-8 text-8xl select-none">
                🪙
              </div>
              <div className="absolute bottom-4 left-6 text-6xl select-none opacity-50">
                ✦
              </div>
              <div className="absolute top-12 left-1/3 text-4xl select-none opacity-30">
                ✦
              </div>
            </div>

            <div className="relative p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">🏅</span>
                    <span
                      className="text-xs font-body uppercase tracking-[0.2em] font-semibold"
                      style={{ color: "oklch(0.84 0.15 82)" }}
                    >
                      Rishta Rewards
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {profile.name.split(" ")[0]}'s Asharfi Gullak
                  </h2>
                </div>
                <div
                  className="px-3 py-1.5 rounded-full border text-xs font-bold font-body"
                  style={{
                    background: "oklch(0.84 0.15 82 / 0.15)",
                    borderColor: "oklch(0.84 0.15 82 / 0.4)",
                    color: "oklch(0.84 0.15 82)",
                  }}
                >
                  {currentTier.icon} {currentTier.name}
                </div>
              </div>

              {/* Balance */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-display text-5xl sm:text-6xl font-bold"
                    style={{ color: "oklch(0.84 0.15 82)" }}
                  >
                    {asharfiBalance.toLocaleString("en-IN")}
                  </span>
                  <div>
                    <div className="text-white/70 font-body text-sm font-semibold">
                      Asharfi
                    </div>
                    <div className="text-white/40 font-body text-xs">
                      ≈ ₹{Math.floor(asharfiBalance * 0.5)} value
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-6">
                {nextTier ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-body">
                      <span className="text-white/70">{currentTier.name}</span>
                      <span style={{ color: "oklch(0.84 0.15 82)" }}>
                        {nextTier.min - asharfiBalance} more to {nextTier.name}
                      </span>
                      <span className="text-white/70">{nextTier.name}</span>
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
                    className="text-center py-2 rounded-lg font-body text-sm font-semibold"
                    style={{
                      background: "oklch(0.84 0.15 82 / 0.15)",
                      color: "oklch(0.84 0.15 82)",
                    }}
                  >
                    👑 Maximum Tier Achieved — You are Parivaar Ka Sitaara!
                  </div>
                )}
              </div>

              {/* Membership card details */}
              <div
                className="flex items-center justify-between pt-4 border-t"
                style={{ borderColor: "oklch(1 0 0 / 0.12)" }}
              >
                <div>
                  <div className="text-white/40 font-body text-xs uppercase tracking-wider">
                    Member Since
                  </div>
                  <div className="text-white/80 font-body text-sm font-medium">
                    February 2026
                  </div>
                </div>
                <div>
                  <div className="text-white/40 font-body text-xs uppercase tracking-wider text-right">
                    Referral Code
                  </div>
                  <div
                    className="font-body text-sm font-bold tracking-widest"
                    style={{ color: "oklch(0.84 0.15 82)" }}
                  >
                    {profile.referralCode}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How to Earn Asharfi */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border shadow-xs hover:shadow-warm transition-shadow">
            <button
              type="button"
              className="w-full"
              onClick={() => setShowCriteria(!showCriteria)}
              data-ocid="customer.loyalty.toggle"
            >
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-saffron" />
                    How to Earn Asharfi
                  </div>
                  {showCriteria ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </CardTitle>
              </CardHeader>
            </button>

            <AnimatePresence>
              {showCriteria && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <CardContent className="pt-0 pb-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {EARNING_CRITERIA.map((criterion, idx) => (
                        <div
                          key={criterion.label}
                          className="flex items-center gap-3 p-3 bg-muted/60 rounded-xl border border-border hover:border-saffron/30 transition-colors"
                          data-ocid={`customer.loyalty.item.${idx + 1}`}
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

                    {/* Tier benefits */}
                    <div>
                      <h4 className="font-display text-sm font-semibold text-foreground mb-3">
                        Tier Benefits
                      </h4>
                      <div className="space-y-2">
                        {CUSTOMER_TIERS.map((tier) => (
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
                </motion.div>
              )}
            </AnimatePresence>
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
                Asharfi History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div
                  className="text-center py-10 text-muted-foreground font-body text-sm"
                  data-ocid="customer.transactions.empty_state"
                >
                  No transactions yet. Place your first order to earn Asharfi!
                </div>
              ) : (
                <div
                  className="space-y-2"
                  data-ocid="customer.transactions.list"
                >
                  {transactions.map((tx, idx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border hover:bg-muted/80 transition-colors"
                      data-ocid={`customer.transactions.item.${idx + 1}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                            tx.type === "credit"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-500"
                          }`}
                        >
                          {tx.type === "credit" ? "+" : "-"}
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
                      <div
                        className={`font-bold font-body text-sm ${
                          tx.type === "credit"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {tx.type === "credit" ? "+" : "-"}
                        {tx.amount} 🪙
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Refer & Earn */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-saffron/25 bg-gradient-to-br from-saffron/5 to-terracotta/5 shadow-xs hover:shadow-warm transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Share2 className="w-5 h-5 text-saffron" />
                Refer & Earn Asharfi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-body text-sm mb-4">
                Share the love of homemade food! For every friend who orders
                using your referral code, you both earn{" "}
                <span className="text-saffron font-bold">100 Asharfi</span>{" "}
                each. 🪙
              </p>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 bg-background border border-border rounded-lg px-4 py-2.5 font-body text-base font-bold tracking-widest text-saffron text-center">
                  {profile.referralCode}
                </div>
                <Button
                  variant="outline"
                  onClick={copyReferral}
                  className="shrink-0 gap-2"
                  data-ocid="customer.referral.button"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>

              <Button
                onClick={shareWhatsApp}
                className="w-full bg-[#25d366] hover:bg-[#1fa855] text-white font-semibold gap-2"
                data-ocid="customer.referral.primary_button"
              >
                <Share2 className="w-4 h-4" />
                Share on WhatsApp — Earn 100 Asharfi
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Order History */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-border shadow-xs hover:shadow-warm transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-saffron" />
                Order History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3" data-ocid="customer.orders.list">
                {DEMO_ORDERS.map((order, idx) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-muted/50 border border-border hover:shadow-xs transition-all"
                    data-ocid={`customer.orders.item.${idx + 1}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-body text-muted-foreground">
                          {order.id}
                        </span>
                        <span
                          className={`text-xs font-body font-semibold px-2 py-0.5 rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="text-sm font-body font-medium text-foreground">
                        {order.product}
                      </div>
                      <div className="text-xs font-body text-muted-foreground">
                        by {order.maker} · {order.date}
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-saffron font-bold font-body text-sm">
                        ₹{order.amount}
                      </div>
                      <div className="text-xs font-body text-muted-foreground">
                        +{Math.floor(order.amount / 100)} 🪙
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}

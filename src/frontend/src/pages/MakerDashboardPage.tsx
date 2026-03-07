import { AsharfiBadge } from "@/components/loyalty/AsharfiBadge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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
  CalendarDays,
  CheckCircle2,
  ChefHat,
  Eye,
  EyeOff,
  IndianRupee,
  Lock,
  MapPin,
  Megaphone,
  MousePointer,
  Package,
  Plus,
  Settings2,
  ShoppingCart,
  Tag,
  TrendingUp,
  Truck,
  Users,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
    key: "order_created",
    label: "Order Created",
    color: "bg-slate-400",
    textColor: "text-slate-700",
    bg: "bg-slate-50",
  },
  {
    key: "payment_confirmed",
    label: "Payment",
    color: "bg-blue-400",
    textColor: "text-blue-700",
    bg: "bg-blue-50",
  },
  {
    key: "chef_acceptance",
    label: "Accepted",
    color: "bg-saffron",
    textColor: "text-amber-700",
    bg: "bg-amber-50",
  },
  {
    key: "food_preparation",
    label: "Preparing",
    color: "bg-orange-400",
    textColor: "text-orange-700",
    bg: "bg-orange-50",
  },
  {
    key: "ready_for_pickup",
    label: "Ready",
    color: "bg-yellow-400",
    textColor: "text-yellow-700",
    bg: "bg-yellow-50",
  },
  {
    key: "out_for_delivery",
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

// Order action status type
type LocalOrderStatus =
  | "order_created"
  | "payment_confirmed"
  | "chef_acceptance"
  | "food_preparation"
  | "ready_for_pickup"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "pending"
  | "confirmed"
  | "preparing"
  | "dispatched";

interface LocalOrderState {
  [orderId: string]: LocalOrderStatus;
}

interface NewDishForm {
  name: string;
  description: string;
  sellingPrice: string;
  mrp: string;
  category: string;
  ingredients: string;
  preparationMethod: string;
  availability: string;
  minBatchKg: string;
  prepTime: string;
}

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
// CAPACITY TAB
// ============================================

const CAPACITY_STORAGE_KEY = "maker_capacity_settings";

interface CapacitySettings {
  menuOpen: boolean;
  maxOrdersPerDay: number;
  maxOrdersPerDish: number;
  prepTime: string;
  activeDaysCapacity: boolean[];
  deliveryPreference: string;
}

const DEFAULT_CAPACITY: CapacitySettings = {
  menuOpen: true,
  maxOrdersPerDay: 15,
  maxOrdersPerDish: 5,
  prepTime: "1 day",
  activeDaysCapacity: [true, true, true, true, true, false, false],
  deliveryPreference: "platform",
};

function CapacityTab() {
  const [settings, setSettings] = useState<CapacitySettings>(() => {
    try {
      const stored = localStorage.getItem(CAPACITY_STORAGE_KEY);
      return stored
        ? (JSON.parse(stored) as CapacitySettings)
        : DEFAULT_CAPACITY;
    } catch {
      return DEFAULT_CAPACITY;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CAPACITY_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  function handleSave() {
    try {
      localStorage.setItem(CAPACITY_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
    toast.success("Capacity settings saved!");
  }

  // Live capacity summary from localStorage
  const maxOrders = settings.maxOrdersPerDay;
  const ordersToday = (() => {
    try {
      const stored = localStorage.getItem("maker_orders_today");
      return stored ? Number(stored) : 7;
    } catch {
      return 7;
    }
  })();
  const remainingSlots = Math.max(0, maxOrders - ordersToday);
  const isOpen = settings.menuOpen && remainingSlots > 0;
  const capacityPct =
    maxOrders > 0 ? Math.round((ordersToday / maxOrders) * 100) : 0;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display font-bold text-lg text-foreground mb-1">
          Capacity Settings
        </h3>
        <p className="text-muted-foreground font-body text-xs">
          Control your menu availability, daily order limits, and delivery
          preferences.
        </p>
      </div>

      {/* Live Capacity Status Card */}
      <Card
        className={`border-2 shadow-xs ${isOpen ? "border-green-200 bg-green-50/50" : "border-amber-200 bg-amber-50/50"}`}
        data-ocid="maker.capacity.status_card"
      >
        <CardContent className="py-4 px-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-display font-bold text-base text-foreground">
              Your Capacity Status
            </h4>
            <span
              className={`px-3 py-1 rounded-full text-xs font-body font-bold border ${
                isOpen
                  ? "bg-green-100 text-green-700 border-green-300"
                  : "bg-red-100 text-red-700 border-red-300"
              }`}
            >
              {isOpen ? "● OPEN" : "● CLOSED"}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {[
              {
                label: "Max orders today",
                value: maxOrders,
                color: "text-foreground",
              },
              {
                label: "Orders received today",
                value: ordersToday,
                color: "text-saffron",
              },
              {
                label: "Remaining slots",
                value: remainingSlots,
                color: remainingSlots === 0 ? "text-red-600" : "text-green-600",
              },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className={`font-display font-bold text-2xl ${stat.color}`}
                >
                  {stat.value}
                </div>
                <div className="font-body text-xs text-muted-foreground mt-0.5 leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          {/* Capacity bar */}
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                capacityPct >= 90
                  ? "bg-red-500"
                  : capacityPct >= 60
                    ? "bg-amber-500"
                    : "bg-green-500"
              }`}
              style={{ width: `${capacityPct}%` }}
            />
          </div>
          <p className="text-muted-foreground font-body text-[10px] mt-1.5 text-right">
            {capacityPct}% capacity used today
          </p>
        </CardContent>
      </Card>

      {/* Menu Status */}
      <Card className="border-border shadow-xs">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-saffron" />
            Menu Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-sm font-semibold text-foreground">
                {settings.menuOpen ? "Open for Orders" : "Paused"}
              </p>
              <p className="text-muted-foreground font-body text-xs mt-0.5 max-w-xs">
                Pause your menu when you need a break. Orders won't come in
                until you re-activate.
              </p>
            </div>
            <Switch
              checked={settings.menuOpen}
              onCheckedChange={(val) =>
                setSettings((prev) => ({ ...prev, menuOpen: val }))
              }
              data-ocid="maker.capacity.menu_switch"
            />
          </div>
          {!settings.menuOpen && (
            <div className="mt-3 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-xs font-body text-amber-700">
              ⚠️ Your menu is currently paused. Customers cannot place new
              orders.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Daily Capacity */}
      <Card className="border-border shadow-xs">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <Package className="w-4 h-4 text-saffron" />
            Daily Capacity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Max Orders Per Day */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="font-body text-sm font-semibold">
                Max Orders Per Day
              </Label>
              <span className="font-display text-2xl font-bold text-saffron">
                {settings.maxOrdersPerDay}
              </span>
            </div>
            <Slider
              min={1}
              max={50}
              step={1}
              value={[settings.maxOrdersPerDay]}
              onValueChange={([val]) =>
                setSettings((prev) => ({ ...prev, maxOrdersPerDay: val }))
              }
              className="w-full"
              data-ocid="maker.capacity.orders_slider"
            />
            <div className="flex justify-between text-xs font-body text-muted-foreground mt-1">
              <span>1 order</span>
              <span>50 orders</span>
            </div>
          </div>

          {/* Max Orders Per Dish */}
          <div>
            <Label className="font-body text-sm font-semibold mb-2 block">
              Max Orders Per Dish
            </Label>
            <Input
              type="number"
              min={1}
              max={50}
              value={settings.maxOrdersPerDish}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  maxOrdersPerDish: Number(e.target.value) || 1,
                }))
              }
              className="w-32 font-body"
              data-ocid="maker.capacity.per_dish_input"
            />
            <p className="text-xs font-body text-muted-foreground mt-1">
              Limit how many orders you'll accept for a single dish per day.
            </p>
          </div>

          {/* Preparation Time */}
          <div>
            <Label className="font-body text-sm font-semibold mb-2 block">
              Preparation Time
            </Label>
            <Select
              value={settings.prepTime}
              onValueChange={(val) =>
                setSettings((prev) => ({ ...prev, prepTime: val }))
              }
            >
              <SelectTrigger
                className="w-48 font-body"
                data-ocid="maker.capacity.prep_time_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  "30 min",
                  "1 hour",
                  "2 hours",
                  "4 hours",
                  "1 day",
                  "2 days",
                ].map((t) => (
                  <SelectItem key={t} value={t} className="font-body">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs font-body text-muted-foreground mt-1">
              Time needed to prepare an order after payment confirmation.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Available Days */}
      <Card className="border-border shadow-xs">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-saffron" />
            Available Days
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs font-body text-muted-foreground mb-3">
            Select the days when you accept and prepare orders.
          </p>
          <div className="flex gap-2 flex-wrap">
            {DAYS_OF_WEEK.map((day, i) => (
              <button
                key={day}
                type="button"
                onClick={() =>
                  setSettings((prev) => {
                    const next = [...prev.activeDaysCapacity];
                    next[i] = !next[i];
                    return { ...prev, activeDaysCapacity: next };
                  })
                }
                data-ocid={`maker.capacity.day_toggle.${i + 1}`}
                className={`w-11 h-11 rounded-xl text-xs font-semibold font-body transition-all border ${
                  settings.activeDaysCapacity[i]
                    ? "bg-saffron text-cream border-saffron shadow-sm"
                    : "bg-background text-foreground/60 border-border hover:border-saffron/40"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <p className="text-xs font-body text-muted-foreground mt-2">
            {settings.activeDaysCapacity.filter(Boolean).length} day
            {settings.activeDaysCapacity.filter(Boolean).length !== 1
              ? "s"
              : ""}{" "}
            active per week
          </p>
        </CardContent>
      </Card>

      {/* Delivery Preference */}
      <Card className="border-border shadow-xs">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <Truck className="w-4 h-4 text-saffron" />
            Delivery Preference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={settings.deliveryPreference}
            onValueChange={(val) =>
              setSettings((prev) => ({ ...prev, deliveryPreference: val }))
            }
            className="space-y-3"
            data-ocid="maker.capacity.delivery_radio"
          >
            {[
              {
                value: "self",
                label: "Self Delivery",
                desc: "You arrange and handle delivery yourself.",
              },
              {
                value: "platform",
                label: "Platform Delivery",
                desc: "Choudhary Aunty coordinates logistics for you.",
              },
              {
                value: "third_party",
                label: "Third-party Partner",
                desc: "Delivery via courier partners (Delhivery, Shiprocket).",
              },
            ].map((opt) => (
              <label
                key={opt.value}
                htmlFor={`delivery-${opt.value}`}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-colors cursor-pointer ${
                  settings.deliveryPreference === opt.value
                    ? "border-saffron/40 bg-saffron/5"
                    : "border-border bg-background hover:border-saffron/20"
                }`}
              >
                <RadioGroupItem
                  value={opt.value}
                  id={`delivery-${opt.value}`}
                  className="mt-0.5"
                />
                <div>
                  <span className="font-body text-sm font-semibold text-foreground cursor-pointer">
                    {opt.label}
                  </span>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">
                    {opt.desc}
                  </p>
                </div>
              </label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        className="w-full bg-saffron hover:bg-terracotta text-cream font-bold font-body py-5 rounded-xl transition-colors"
        data-ocid="maker.capacity.save_button"
      >
        <CheckCircle2 className="w-4 h-4 mr-2" />
        Save Capacity Settings
      </Button>
    </div>
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
  // Order accept/decline local state
  const [localOrderStatuses, setLocalOrderStatuses] = useState<LocalOrderState>(
    {},
  );
  const [declineOrderId, setDeclineOrderId] = useState<string | null>(null);
  // Add dish sheet
  const [showAddDish, setShowAddDish] = useState(false);
  const [newDish, setNewDish] = useState<NewDishForm>({
    name: "",
    description: "",
    sellingPrice: "",
    mrp: "",
    category: "achar",
    ingredients: "",
    preparationMethod: "",
    availability: "Available Today",
    minBatchKg: "1",
    prepTime: "60",
  });
  // Availability scheduler state
  const [openForOrders, setOpenForOrders] = useState(true);
  const [maxOrders, setMaxOrders] = useState([10]);
  const [activeDays, setActiveDays] = useState<boolean[]>([
    true,
    true,
    true,
    true,
    true,
    false,
    false,
  ]);

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
  const _netEarnings = mockRevenue - platformFee - logisticsFee;
  const _advanceReceived = Math.round(mockRevenue * 0.5);
  const _balancePending = Math.round(mockRevenue * 0.35);

  const stageCounts = ORDER_STAGES.reduce(
    (acc, stage) => {
      acc[stage.key] = makerOrders.filter((o) => o.status === stage.key).length;
      return acc;
    },
    {} as Record<string, number>,
  );
  const mockOrderCount = (selectedMakerIdx + 1) * 8 + 5;
  if (makerOrders.length === 0) {
    stageCounts.order_created = Math.round(mockOrderCount * 0.1);
    stageCounts.payment_confirmed = Math.round(mockOrderCount * 0.15);
    stageCounts.chef_acceptance = Math.round(mockOrderCount * 0.1);
    stageCounts.food_preparation = Math.round(mockOrderCount * 0.2);
    stageCounts.ready_for_pickup = Math.round(mockOrderCount * 0.1);
    stageCounts.out_for_delivery = Math.round(mockOrderCount * 0.1);
    stageCounts.delivered = Math.round(mockOrderCount * 0.25);
  }

  // Mock order queue with action states
  const mockOrderQueue = [
    {
      id: "OQ-001",
      customer: "Priya Sharma",
      phone: "+91 98000 11111",
      items: "Aam Ka Achar × 2kg",
      amount: 380,
      stage: "order_created",
    },
    {
      id: "OQ-002",
      customer: "Raj Kumar",
      phone: "+91 97000 22222",
      items: "Sattu Ladoo × 1kg",
      amount: 250,
      stage: "payment_confirmed",
    },
    {
      id: "OQ-003",
      customer: "Meena Singh",
      phone: "+91 96000 33333",
      items: "Tilkut × 500g",
      amount: 180,
      stage: "chef_acceptance",
    },
  ];

  function getOrderLocalStatus(orderId: string, defaultStage: string): string {
    return localOrderStatuses[orderId] ?? defaultStage;
  }

  function acceptOrder(orderId: string) {
    setLocalOrderStatuses((prev) => ({
      ...prev,
      [orderId]: "chef_acceptance",
    }));
    toast.success("Order accepted! Customers notified.");
  }

  function declineOrder(orderId: string) {
    setLocalOrderStatuses((prev) => ({ ...prev, [orderId]: "cancelled" }));
    toast.error("Order declined.");
    setDeclineOrderId(null);
  }

  function handleAddDish(e: React.FormEvent) {
    e.preventDefault();
    toast.success(`"${newDish.name}" submitted for admin approval.`);
    setShowAddDish(false);
    setNewDish({
      name: "",
      description: "",
      sellingPrice: "",
      mrp: "",
      category: "achar",
      ingredients: "",
      preparationMethod: "",
      availability: "Available Today",
      minBatchKg: "1",
      prepTime: "60",
    });
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

      {/* Tabbed Dashboard */}
      <Tabs defaultValue="overview">
        <TabsList className="bg-muted/50 p-1 h-auto gap-1 flex-wrap mb-6">
          <TabsTrigger
            value="overview"
            data-ocid="maker.overview_tab"
            className="font-body text-xs sm:text-sm data-[state=active]:bg-card data-[state=active]:text-saffron"
          >
            <BarChart2 className="w-3.5 h-3.5 mr-1.5" /> Overview
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            data-ocid="maker.orders_tab"
            className="font-body text-xs sm:text-sm data-[state=active]:bg-card data-[state=active]:text-saffron"
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" /> Order Queue
          </TabsTrigger>
          <TabsTrigger
            value="products"
            data-ocid="maker.products_tab"
            className="font-body text-xs sm:text-sm data-[state=active]:bg-card data-[state=active]:text-saffron"
          >
            <Package className="w-3.5 h-3.5 mr-1.5" /> Products
          </TabsTrigger>
          <TabsTrigger
            value="promotions"
            data-ocid="maker.promotions_tab"
            className="font-body text-xs sm:text-sm data-[state=active]:bg-card data-[state=active]:text-saffron"
          >
            <Tag className="w-3.5 h-3.5 mr-1.5" /> Promotions
          </TabsTrigger>
          <TabsTrigger
            value="capacity"
            data-ocid="maker.capacity_tab"
            className="font-body text-xs sm:text-sm data-[state=active]:bg-card data-[state=active]:text-saffron"
          >
            <Settings2 className="w-3.5 h-3.5 mr-1.5" /> Capacity
          </TabsTrigger>
        </TabsList>

        {/* ── OVERVIEW TAB ── */}
        <TabsContent value="overview" className="space-y-6">
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
              value={String(stageCounts.order_created ?? 0)}
              sub="Need action"
              icon={Package}
              color="bg-amber-100 text-amber-600"
              ocid="maker.dashboard.card"
            />
          </div>

          {/* Availability Scheduler */}
          <Card className="border-saffron/20 shadow-xs">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-saffron" />
                Today's Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">
                    Open for Orders Today
                  </p>
                  <p className="text-muted-foreground font-body text-xs">
                    Customers can place new orders
                  </p>
                </div>
                <Switch
                  checked={openForOrders}
                  onCheckedChange={setOpenForOrders}
                  data-ocid="maker.availability.switch"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="font-body text-sm font-semibold">
                    Max Orders Today
                  </Label>
                  <span className="font-display text-lg font-bold text-saffron">
                    {maxOrders[0]}
                  </span>
                </div>
                <Slider
                  min={1}
                  max={20}
                  step={1}
                  value={maxOrders}
                  onValueChange={setMaxOrders}
                  className="w-full"
                  data-ocid="maker.availability.slider"
                />
              </div>
              <div>
                <Label className="font-body text-sm font-semibold mb-3 block">
                  Active Days
                </Label>
                <div className="flex gap-2 flex-wrap">
                  {DAYS_OF_WEEK.map((day, i) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() =>
                        setActiveDays((prev) => {
                          const next = [...prev];
                          next[i] = !next[i];
                          return next;
                        })
                      }
                      data-ocid={`maker.availability.day_toggle.${i + 1}`}
                      className={`w-10 h-10 rounded-xl text-xs font-semibold font-body transition-all border ${
                        activeDays[i]
                          ? "bg-saffron text-cream border-saffron"
                          : "bg-background text-foreground/60 border-border hover:border-saffron/40"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Earnings Breakdown */}
          <Card className="border-border shadow-xs">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-saffron" />
                Earnings Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  {
                    label: "Total Revenue",
                    value: `₹${(45200).toLocaleString("en-IN")}`,
                    color: "text-foreground",
                    bg: "bg-muted/60",
                  },
                  {
                    label: "Pending Payout",
                    value: `₹${(12400).toLocaleString("en-IN")}`,
                    color: "text-amber-600",
                    bg: "bg-amber-50 border-amber-100",
                  },
                  {
                    label: "Platform Fee (15%)",
                    value: `₹${(6780).toLocaleString("en-IN")}`,
                    color: "text-red-500",
                    bg: "bg-red-50 border-red-100",
                  },
                  {
                    label: "Net Earnings",
                    value: `₹${(38420).toLocaleString("en-IN")}`,
                    color: "text-green-600",
                    bg: "bg-green-50 border-green-100",
                  },
                ].map((item, idx) => (
                  <div
                    key={item.label}
                    className={`rounded-xl border p-3 text-center ${item.bg}`}
                    data-ocid={`maker.earnings.card.${idx + 1}`}
                  >
                    <div
                      className={`font-display text-xl font-bold ${item.color}`}
                    >
                      {item.value}
                    </div>
                    <div className="font-body text-xs text-muted-foreground mt-0.5">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
              {/* Sparkline bars */}
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-body text-muted-foreground mb-2">
                  Weekly revenue trend
                </p>
                <div className="flex items-end gap-1.5 h-12">
                  {[6400, 7800, 5200, 8900, 7100, 9600].map((val, i) => (
                    <div
                      key={`week-${i + 1}`}
                      className="flex-1 bg-saffron/40 hover:bg-saffron rounded-t transition-colors"
                      style={{ height: `${(val / 9600) * 100}%` }}
                      title={`Week ${i + 1}: ₹${val.toLocaleString("en-IN")}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] font-body text-muted-foreground mt-1">
                  {["W1", "W2", "W3", "W4", "W5", "W6"].map((w) => (
                    <span key={w}>{w}</span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Pipeline */}
          <Card className="border-border shadow-xs">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-saffron" />
                7-Stage Order Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-stretch gap-1 sm:gap-2 overflow-x-auto">
                {ORDER_STAGES.map((stage) => (
                  <div
                    key={stage.key}
                    className="flex-1 text-center min-w-[60px]"
                  >
                    <div className={`rounded-xl p-2 sm:p-3 border ${stage.bg}`}>
                      <div className="font-display text-xl sm:text-2xl font-bold text-foreground">
                        {stageCounts[stage.key] ?? 0}
                      </div>
                      <div
                        className={`text-[10px] sm:text-xs font-body font-semibold mt-0.5 ${stage.textColor} leading-tight`}
                      >
                        {stage.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Insights */}
          <Card className="border-border shadow-xs">
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

          {/* Loyalty */}
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
        </TabsContent>

        {/* ── ORDER QUEUE TAB ── */}
        <TabsContent value="orders" className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-bold text-lg text-foreground">
              Live Order Queue
            </h3>
            <Badge className="bg-amber-100 text-amber-800 border-amber-200 font-body text-xs">
              {
                mockOrderQueue.filter(
                  (o) =>
                    getOrderLocalStatus(o.id, o.stage) === "order_created" ||
                    getOrderLocalStatus(o.id, o.stage) === "payment_confirmed",
                ).length
              }{" "}
              Pending
            </Badge>
          </div>
          <div className="space-y-3">
            {mockOrderQueue.map((order, idx) => {
              const currentStatus = getOrderLocalStatus(order.id, order.stage);
              const isCancelled = currentStatus === "cancelled";
              const isAccepted = currentStatus === "chef_acceptance";
              return (
                <Card
                  key={order.id}
                  className={`border-border shadow-xs ${isCancelled ? "opacity-50" : ""}`}
                  data-ocid={`maker.orders.item.${idx + 1}`}
                >
                  <CardContent className="py-4 px-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-display font-bold text-foreground text-sm">
                            {order.customer}
                          </span>
                          <span className="text-xs font-body text-muted-foreground">
                            {order.phone}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold font-body border ${
                              isCancelled
                                ? "bg-red-100 text-red-700 border-red-200"
                                : isAccepted
                                  ? "bg-green-100 text-green-700 border-green-200"
                                  : currentStatus === "payment_confirmed"
                                    ? "bg-blue-100 text-blue-700 border-blue-200"
                                    : "bg-slate-100 text-slate-700 border-slate-200"
                            }`}
                          >
                            {isCancelled
                              ? "Declined"
                              : isAccepted
                                ? "Accepted"
                                : currentStatus.replace(/_/g, " ")}
                          </span>
                        </div>
                        <p className="font-body text-sm text-foreground/80">
                          {order.items}
                        </p>
                        <p className="font-body text-sm font-bold text-saffron mt-0.5">
                          ₹{order.amount}
                        </p>
                      </div>
                      {!isCancelled && !isAccepted && (
                        <div className="flex items-center gap-2 shrink-0">
                          <Button
                            size="sm"
                            onClick={() => acceptOrder(order.id)}
                            className="bg-green-600 hover:bg-green-700 text-white font-body text-xs"
                            data-ocid={`maker.orders.accept_button.${idx + 1}`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            Accept
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setDeclineOrderId(order.id)}
                            className="font-body text-xs"
                            data-ocid={`maker.orders.delete_button.${idx + 1}`}
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" />
                            Decline
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {/* 7-stage reference */}
          <Card className="border-border shadow-xs mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base">
                Order Lifecycle Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {ORDER_STAGES.map((stage) => (
                  <span
                    key={stage.key}
                    className={`px-2 py-1 rounded-lg text-[10px] font-semibold font-body border ${stage.bg} ${stage.textColor}`}
                  >
                    {stage.label}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── PRODUCTS TAB ── */}
        <TabsContent value="products" className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-bold text-lg text-foreground">
              My Products ({makerProducts.length})
            </h3>
            <Button
              size="sm"
              onClick={() => setShowAddDish(true)}
              className="bg-saffron hover:bg-terracotta text-cream font-body text-xs"
              data-ocid="maker.products.add_button"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add New Dish
            </Button>
          </div>
          {makerProducts.length === 0 ? (
            <div
              className="text-center py-12 text-muted-foreground font-body text-sm"
              data-ocid="maker.products.empty_state"
            >
              No products listed yet. Add your first dish!
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-border">
              <Table data-ocid="maker.products.table">
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-body text-xs">Product</TableHead>
                    <TableHead className="font-body text-xs">Price</TableHead>
                    <TableHead className="font-body text-xs">
                      Category
                    </TableHead>
                    <TableHead className="font-body text-xs text-right">
                      Mock Orders
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...makerProducts]
                    .map((p, i) => ({ ...p, mockOrders: i * 3 + 1 }))
                    .sort((a, b) => b.mockOrders - a.mockOrders)
                    .slice(0, 10)
                    .map((product, idx) => (
                      <TableRow
                        key={product.id.toString()}
                        data-ocid={`maker.products.row.${idx + 1}`}
                      >
                        <TableCell className="font-body text-sm py-2.5">
                          <div className="font-medium text-foreground line-clamp-1">
                            {product.name}
                          </div>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <span className="text-saffron font-bold font-body text-sm">
                            ₹{product.sellingPrice}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="capitalize text-xs font-body px-2 py-0.5 bg-muted rounded-full border border-border">
                            {product.category}
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
        </TabsContent>

        {/* ── PROMOTIONS TAB ── */}
        <TabsContent value="promotions" className="space-y-4">
          <h3 className="font-display font-bold text-lg text-foreground mb-2">
            Active Promo Offers
          </h3>
          {PROMO_OFFERS.map((offer, idx) => (
            <div
              key={offer.title}
              className={`flex items-center justify-between p-4 rounded-xl border border-border ${offer.bg}`}
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
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-xs mt-4">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-amber-600" />
                Ad Campaigns
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
                    <div
                      className={`font-display text-lg font-bold ${kpi.color}`}
                    >
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
        </TabsContent>

        {/* ── CAPACITY TAB ── */}
        <TabsContent value="capacity">
          <CapacityTab />
        </TabsContent>
      </Tabs>

      {/* Add Dish Sheet */}
      <Sheet open={showAddDish} onOpenChange={setShowAddDish}>
        <SheetContent
          className="w-full sm:max-w-lg overflow-y-auto"
          data-ocid="maker.add_dish.sheet"
        >
          <SheetHeader>
            <SheetTitle className="font-display">Add New Dish</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleAddDish} className="space-y-4 mt-4 pb-8">
            <div>
              <Label className="font-body text-xs mb-1.5 block">
                Dish Name *
              </Label>
              <Input
                value={newDish.name}
                onChange={(e) =>
                  setNewDish((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="e.g. Special Aam Achar"
                className="font-body"
                data-ocid="maker.add_dish.name_input"
                required
              />
            </div>
            <div>
              <Label className="font-body text-xs mb-1.5 block">
                Description
              </Label>
              <Textarea
                value={newDish.description}
                onChange={(e) =>
                  setNewDish((p) => ({ ...p, description: e.target.value }))
                }
                rows={2}
                className="font-body text-sm"
                data-ocid="maker.add_dish.description_textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  Selling Price (₹) *
                </Label>
                <Input
                  type="number"
                  value={newDish.sellingPrice}
                  onChange={(e) =>
                    setNewDish((p) => ({ ...p, sellingPrice: e.target.value }))
                  }
                  className="font-body"
                  required
                  data-ocid="maker.add_dish.price_input"
                />
              </div>
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  MRP (₹)
                </Label>
                <Input
                  type="number"
                  value={newDish.mrp}
                  onChange={(e) =>
                    setNewDish((p) => ({ ...p, mrp: e.target.value }))
                  }
                  className="font-body"
                />
              </div>
            </div>
            <div>
              <Label className="font-body text-xs mb-1.5 block">
                Category *
              </Label>
              <Select
                value={newDish.category}
                onValueChange={(v) =>
                  setNewDish((p) => ({ ...p, category: v }))
                }
              >
                <SelectTrigger data-ocid="maker.add_dish.category_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "achar",
                    "sweets",
                    "ladoo",
                    "namkeen",
                    "snacks",
                    "barfi",
                    "masala",
                    "chutney",
                  ].map((c) => (
                    <SelectItem
                      key={c}
                      value={c}
                      className="capitalize font-body"
                    >
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-body text-xs mb-1.5 block">
                Ingredients (comma-separated)
              </Label>
              <Input
                value={newDish.ingredients}
                onChange={(e) =>
                  setNewDish((p) => ({ ...p, ingredients: e.target.value }))
                }
                placeholder="Raw mango, mustard oil, salt..."
                className="font-body"
                data-ocid="maker.add_dish.ingredients_input"
              />
            </div>
            <div>
              <Label className="font-body text-xs mb-1.5 block">
                Preparation Method
              </Label>
              <Textarea
                value={newDish.preparationMethod}
                onChange={(e) =>
                  setNewDish((p) => ({
                    ...p,
                    preparationMethod: e.target.value,
                  }))
                }
                rows={2}
                className="font-body text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  Availability
                </Label>
                <Select
                  value={newDish.availability}
                  onValueChange={(v) =>
                    setNewDish((p) => ({ ...p, availability: v }))
                  }
                >
                  <SelectTrigger data-ocid="maker.add_dish.availability_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Available Today",
                      "Available Tomorrow",
                      "Pre-Order",
                      "Seasonal",
                      "Festival Special",
                    ].map((a) => (
                      <SelectItem key={a} value={a} className="font-body">
                        {a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  Min Batch (kg)
                </Label>
                <Input
                  type="number"
                  min={0.5}
                  step={0.5}
                  value={newDish.minBatchKg}
                  onChange={(e) =>
                    setNewDish((p) => ({ ...p, minBatchKg: e.target.value }))
                  }
                  className="font-body"
                />
              </div>
            </div>
            <div>
              <Label className="font-body text-xs mb-1.5 block">
                Prep Time (minutes)
              </Label>
              <Input
                type="number"
                value={newDish.prepTime}
                onChange={(e) =>
                  setNewDish((p) => ({ ...p, prepTime: e.target.value }))
                }
                className="font-body"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddDish(false)}
                className="flex-1 font-body"
                data-ocid="maker.add_dish.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-saffron hover:bg-terracotta text-cream font-body"
                data-ocid="maker.add_dish.submit_button"
              >
                Submit for Approval
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Decline Order Confirm */}
      <AlertDialog
        open={declineOrderId !== null}
        onOpenChange={() => setDeclineOrderId(null)}
      >
        <AlertDialogContent data-ocid="maker.orders.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Decline Order?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-sm">
              Are you sure you want to decline this order? The customer will be
              notified via WhatsApp.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="maker.orders.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => declineOrderId && declineOrder(declineOrderId)}
              className="bg-destructive text-destructive-foreground"
              data-ocid="maker.orders.confirm_button"
            >
              Decline Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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

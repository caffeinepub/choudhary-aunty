import type { CrmStats, CustomerAccount } from "@/backend.d";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActor } from "@/hooks/useActor";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Loader2,
  Lock,
  RefreshCcw,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  CRM_PASSWORDS,
  type CrmRole,
  CrmSidebar,
  clearCrmSession,
  getCrmSession,
  setCrmSession,
} from "./CrmLayout";

// ──────────────────────────────────────────────────────────────────────────────
// MOCK / COMPUTED DATA
// ──────────────────────────────────────────────────────────────────────────────

const SEGMENT_DATA = [
  { label: "Champions", pct: 12, color: "#f59e0b" },
  { label: "Loyal", pct: 28, color: "#10b981" },
  { label: "New", pct: 35, color: "#3b82f6" },
  { label: "Potential", pct: 15, color: "#14b8a6" },
  { label: "At Risk", pct: 7, color: "#f97316" },
  { label: "Lost", pct: 3, color: "#ef4444" },
];

const AUTOMATION_WORKFLOWS = [
  {
    id: "welcome",
    name: "Welcome Series",
    trigger: "New customer signup",
    channel: "📱 WhatsApp + Email",
    icon: "🎉",
  },
  {
    id: "cart-abandon",
    name: "Cart Abandonment",
    trigger: "Item viewed, no order placed",
    channel: "📱 WhatsApp",
    icon: "🛒",
  },
  {
    id: "reorder",
    name: "Reorder Reminder",
    trigger: "7-10 days after last order",
    channel: "📱 WhatsApp + SMS",
    icon: "🔄",
  },
  {
    id: "festival",
    name: "Festival Specials",
    trigger: "14 days before major festivals",
    channel: "📧 Email + WhatsApp",
    icon: "🪔",
  },
  {
    id: "reactivation",
    name: "30-day Reactivation",
    trigger: "Customer inactive 30+ days",
    channel: "📧 Email",
    icon: "💫",
  },
  {
    id: "post-purchase",
    name: "Post-Purchase Follow-up",
    trigger: "3 days after dispatch",
    channel: "📱 WhatsApp",
    icon: "⭐",
  },
];

// Donut chart using SVG
function DonutChart({ data }: { data: typeof SEGMENT_DATA }) {
  const total = data.reduce((s, d) => s + d.pct, 0);
  let cumulative = 0;
  const radius = 60;
  const cx = 80;
  const cy = 80;
  // circumference not used in SVG path calculation

  const segments = data.map((seg) => {
    const start = cumulative;
    const fraction = seg.pct / total;
    cumulative += fraction;
    const startAngle = start * 360 - 90;
    const endAngle = cumulative * 360 - 90;
    const largeArc = fraction > 0.5 ? 1 : 0;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);
    return { ...seg, x1, y1, x2, y2, largeArc, startAngle, endAngle };
  });

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <title>Customer Segment Distribution</title>
        {segments.map((seg) => (
          <path
            key={seg.label}
            d={`M ${cx} ${cy} L ${seg.x1} ${seg.y1} A ${radius} ${radius} 0 ${seg.largeArc} 1 ${seg.x2} ${seg.y2} Z`}
            fill={seg.color}
            opacity={0.85}
          />
        ))}
        {/* Center hole */}
        <circle cx={cx} cy={cy} r={36} fill="white" />
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          className="font-bold"
          style={{ fontSize: 14, fill: "#333" }}
        >
          RFM
        </text>
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          style={{ fontSize: 9, fill: "#888" }}
        >
          Segments
        </text>
      </svg>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: seg.color }}
            />
            <span className="text-xs font-body text-muted-foreground">
              {seg.label}{" "}
              <strong className="text-foreground">{seg.pct}%</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// LOGIN GATE
// ──────────────────────────────────────────────────────────────────────────────

function CrmLoginGate({ onLogin }: { onLogin: (role: CrmRole) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleLogin() {
    const role = CRM_PASSWORDS[password] as CrmRole | undefined;
    if (role) {
      setCrmSession(role);
      onLogin(role);
      setError(false);
    } else {
      setError(true);
      toast.error("Invalid CRM password");
    }
  }

  return (
    <main className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-burgundy via-burgundy/90 to-burgundy/80">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-saffron blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-cream blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/10 backdrop-blur-md border border-cream/15 rounded-3xl p-8 w-full max-w-sm mx-4"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-saffron/20 border border-saffron/30 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-saffron" />
          </div>
          <h1 className="font-display font-bold text-2xl text-cream mb-1">
            CRM Portal
          </h1>
          <p className="text-cream/60 text-sm font-body">
            Enter your access password
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-cream/80 font-body text-sm mb-1.5 block">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Enter CRM password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              data-ocid="crm.password_input"
              className={`font-body bg-white/10 border-cream/20 text-cream placeholder:text-cream/30 focus:border-saffron/50 rounded-xl h-12 ${
                error ? "border-red-400" : ""
              }`}
            />
            {error && (
              <p className="text-red-400 text-xs mt-1 font-body">
                Invalid password. Please try again.
              </p>
            )}
          </div>
          <Button
            onClick={handleLogin}
            data-ocid="crm.login_button"
            className="w-full h-12 bg-saffron hover:bg-terracotta text-cream font-semibold font-body rounded-xl shadow-warm-lg"
          >
            Access CRM
          </Button>
        </div>

        <div className="mt-6 space-y-1.5 bg-cream/5 rounded-xl p-4 border border-cream/10">
          <p className="text-cream/50 text-[10px] font-body uppercase tracking-wider mb-2">
            Demo Passwords
          </p>
          {Object.entries(CRM_PASSWORDS).map(([pwd, role]) => (
            <button
              key={pwd}
              type="button"
              onClick={() => setPassword(pwd)}
              className="block w-full text-left text-xs font-body text-cream/60 hover:text-cream transition-colors py-0.5"
            >
              {pwd} → {role}
            </button>
          ))}
        </div>
      </motion.div>
    </main>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// MAIN CRM DASHBOARD
// ──────────────────────────────────────────────────────────────────────────────

interface CrmDashboardProps {
  role: CrmRole;
}

function CrmDashboard({ role }: CrmDashboardProps) {
  const { actor, isFetching } = useActor();
  const [stats, setStats] = useState<CrmStats | null>(null);
  const [customers, setCustomers] = useState<CustomerAccount[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [workflowToggles, setWorkflowToggles] = useState<
    Record<string, boolean>
  >({
    welcome: true,
    "cart-abandon": false,
    reorder: true,
    festival: true,
    reactivation: false,
    "post-purchase": true,
  });

  useEffect(() => {
    document.title = "CRM Dashboard | Choudhary Aunty";
  }, []);

  useEffect(() => {
    if (!actor || isFetching) return;
    const fetch = async () => {
      setStatsLoading(true);
      try {
        const [crmStats, allCustomers] = await Promise.all([
          actor.getCrmStats(),
          role === "admin" || role === "crm-manager"
            ? actor.getAllCustomers()
            : Promise.resolve([] as CustomerAccount[]),
        ]);
        setStats(crmStats);
        setCustomers(allCustomers);
      } catch {
        // use mock data
        setStats({
          totalCustomers: BigInt(247),
          newCustomers: BigInt(38),
          loyalCustomers: BigInt(89),
          atRiskCustomers: BigInt(21),
          totalRevenue: 182500,
          totalOrders: BigInt(412),
          avgOrderValue: 443,
        });
      } finally {
        setStatsLoading(false);
      }
    };
    fetch();
  }, [actor, isFetching, role]);

  const kpis = stats
    ? [
        {
          label: "Total Customers",
          value: Number(stats.totalCustomers).toLocaleString("en-IN"),
          icon: <Users className="w-5 h-5" />,
          color: "bg-blue-50 text-blue-700 border-blue-100",
          trend: "+12%",
        },
        {
          label: "New Customers",
          value: Number(stats.newCustomers).toLocaleString("en-IN"),
          icon: <TrendingUp className="w-5 h-5" />,
          color: "bg-green-50 text-green-700 border-green-100",
          trend: "+24%",
        },
        {
          label: "Loyal Customers",
          value: Number(stats.loyalCustomers).toLocaleString("en-IN"),
          icon: <CheckCircle className="w-5 h-5" />,
          color: "bg-amber-50 text-amber-700 border-amber-100",
          trend: "+8%",
        },
        {
          label: "At Risk",
          value: Number(stats.atRiskCustomers).toLocaleString("en-IN"),
          icon: <AlertTriangle className="w-5 h-5" />,
          color: "bg-red-50 text-red-700 border-red-100",
          trend: "-3%",
        },
        {
          label: "Total Revenue",
          value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`,
          icon: <Zap className="w-5 h-5" />,
          color: "bg-saffron/10 text-saffron border-saffron/20",
          trend: "+31%",
        },
        {
          label: "Avg Order Value",
          value: `₹${stats.avgOrderValue.toFixed(0)}`,
          icon: <ArrowRight className="w-5 h-5" />,
          color: "bg-teal-50 text-teal-700 border-teal-100",
          trend: "+6%",
        },
      ]
    : [];

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              CRM Dashboard
            </h1>
            <p className="text-muted-foreground text-sm font-body">
              Food Intelligence & Customer Analytics
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="p-2 rounded-xl border border-border hover:bg-card transition-colors"
          >
            <RefreshCcw className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* KPI Cards */}
        {statsLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {["k1", "k2", "k3", "k4", "k5", "k6"].map((k) => (
              <Skeleton
                key={k}
                className="h-24 rounded-2xl"
                data-ocid="crm.kpi_loading_state"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {kpis.map((kpi, idx) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                data-ocid={`crm.kpi.item.${idx + 1}`}
                className={`bg-white border rounded-2xl p-4 shadow-xs ${kpi.color}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="opacity-70">{kpi.icon}</div>
                  <span className="text-xs font-body font-semibold opacity-70">
                    {kpi.trend}
                  </span>
                </div>
                <p className="font-display font-bold text-2xl mb-0.5">
                  {kpi.value}
                </p>
                <p className="text-xs font-body opacity-70">{kpi.label}</p>
              </motion.div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* RFM Segment Chart */}
          <div className="bg-white border border-border rounded-2xl p-5 shadow-xs">
            <h2 className="font-display font-bold text-lg text-foreground mb-4">
              RFM Segmentation
            </h2>
            <DonutChart data={SEGMENT_DATA} />
          </div>

          {/* Automation Workflows */}
          <div className="bg-white border border-border rounded-2xl p-5 shadow-xs">
            <h2 className="font-display font-bold text-lg text-foreground mb-4">
              ⚡ Automation Workflows
            </h2>
            <div className="space-y-3">
              {AUTOMATION_WORKFLOWS.map((wf) => (
                <div
                  key={wf.id}
                  data-ocid={`crm.workflow.item.${wf.id}`}
                  className="flex items-start gap-3 p-3 rounded-xl border border-border hover:border-saffron/30 transition-colors"
                >
                  <span className="text-xl shrink-0 mt-0.5">{wf.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-semibold text-sm text-foreground truncate">
                      {wf.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-body truncate">
                      {wf.trigger}
                    </p>
                    <span className="inline-block text-[10px] bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5 mt-1 font-body">
                      {wf.channel}
                    </span>
                  </div>
                  <Switch
                    checked={workflowToggles[wf.id] ?? false}
                    onCheckedChange={(val) =>
                      setWorkflowToggles((prev) => ({
                        ...prev,
                        [wf.id]: val,
                      }))
                    }
                    data-ocid={`crm.workflow.toggle.${wf.id}`}
                    className="shrink-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Customers */}
        {(role === "admin" || role === "crm-manager") &&
          customers.length > 0 && (
            <div className="bg-white border border-border rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-lg text-foreground">
                  Recent Customers
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/crm/customers";
                  }}
                  className="text-saffron text-xs font-body font-semibold hover:text-terracotta"
                >
                  View all →
                </button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs uppercase tracking-wider font-body">
                        Name
                      </TableHead>
                      <TableHead className="text-xs uppercase tracking-wider font-body">
                        City
                      </TableHead>
                      <TableHead className="text-xs uppercase tracking-wider font-body">
                        Stage
                      </TableHead>
                      <TableHead className="text-xs uppercase tracking-wider font-body">
                        Asharfi
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.slice(0, 5).map((c, idx) => (
                      <TableRow
                        key={c.id.toString()}
                        data-ocid={`crm.customer.item.${idx + 1}`}
                      >
                        <TableCell className="font-body text-sm font-semibold">
                          {c.name}
                        </TableCell>
                        <TableCell className="font-body text-sm text-muted-foreground">
                          {c.city}, {c.state}
                        </TableCell>
                        <TableCell>
                          <span className="text-xs bg-amber-50 text-amber-700 border border-amber-100 rounded-full px-2 py-0.5 font-body font-semibold">
                            {c.lifecycleStage}
                          </span>
                        </TableCell>
                        <TableCell className="font-body text-sm font-bold text-saffron">
                          🪙 {Number(c.asharfiPoints).toLocaleString("en-IN")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// CRM PAGE (with login gate)
// ──────────────────────────────────────────────────────────────────────────────

export default function CrmPage() {
  const [role, setRole] = useState<CrmRole | null>(getCrmSession);
  const navigate = useNavigate();

  function handleLogout() {
    clearCrmSession();
    setRole(null);
    navigate({ to: "/" });
  }

  if (!role) {
    return <CrmLoginGate onLogin={(r) => setRole(r)} />;
  }

  return (
    <div className="flex min-h-screen pt-16">
      <CrmSidebar role={role} onLogout={handleLogout} />
      <AnimatePresence mode="wait">
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 overflow-hidden"
        >
          <CrmDashboard role={role} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

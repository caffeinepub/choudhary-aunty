import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@/hooks/useActor";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CrmSidebar, clearCrmSession, getCrmSession } from "./CrmLayout";
import type { CrmRole } from "./CrmLayout";

// ── Mock Chart Data ───────────────────────────────────────────────────────────

const REVENUE_DATA = [
  { month: "Oct", revenue: 28500, orders: 58 },
  { month: "Nov", revenue: 42000, orders: 87 },
  { month: "Dec", revenue: 65000, orders: 134 },
  { month: "Jan", revenue: 38000, orders: 76 },
  { month: "Feb", revenue: 51000, orders: 104 },
  { month: "Mar", revenue: 78000, orders: 162 },
];

const TOP_PRODUCTS = [
  { name: "Aam Ka Achar", orders: 142 },
  { name: "Besan Ladoo", orders: 118 },
  { name: "Namakpara", orders: 97 },
  { name: "Tilkut", orders: 84 },
  { name: "Pinni", orders: 73 },
];

const CUSTOMER_GROWTH = [
  { month: "Oct", customers: 22 },
  { month: "Nov", customers: 45 },
  { month: "Dec", customers: 89 },
  { month: "Jan", customers: 134 },
  { month: "Feb", customers: 198 },
  { month: "Mar", customers: 247 },
];

const FOOD_PREF_DATA = [
  { name: "Spicy Lovers", value: 32, color: "#ef4444" },
  { name: "Low Oil Eaters", value: 28, color: "#10b981" },
  { name: "Sweet Lovers", value: 24, color: "#f59e0b" },
  { name: "Regional Focus", value: 16, color: "#3b82f6" },
];

export default function CrmAnalyticsPage() {
  const { actor, isFetching } = useActor();
  const navigate = useNavigate();
  const [role, setRole] = useState<CrmRole | null>(getCrmSession);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Analytics | CRM | Choudhary Aunty";
    if (!role) {
      navigate({ to: "/crm" });
    }
  }, [role, navigate]);

  useEffect(() => {
    if (!actor || isFetching) return;
    // Simulate data loading
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [actor, isFetching]);

  if (!role) return null;

  return (
    <div className="flex min-h-screen pt-16">
      <CrmSidebar
        role={role}
        onLogout={() => {
          clearCrmSession();
          setRole(null);
          navigate({ to: "/" });
        }}
      />
      <div className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Analytics
            </h1>
            <p className="text-muted-foreground text-sm font-body">
              Food Intelligence & Business Performance
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {["a1", "a2", "a3", "a4"].map((k) => (
                <Skeleton
                  key={k}
                  className="h-72 rounded-2xl"
                  data-ocid="crm.analytics_loading_state"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Trend */}
                <div
                  className="bg-white border border-border rounded-2xl p-5 shadow-xs"
                  data-ocid="crm.revenue_chart"
                >
                  <h2 className="font-display font-bold text-lg text-foreground mb-4">
                    📈 Revenue Trend
                  </h2>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={REVENUE_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fontFamily: "Figtree" }}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fontFamily: "Figtree" }}
                        tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        formatter={(value) => [
                          `₹${Number(value).toLocaleString("en-IN")}`,
                          "Revenue",
                        ]}
                        contentStyle={{
                          fontFamily: "Figtree",
                          fontSize: 12,
                          borderRadius: 12,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#f59e0b"
                        strokeWidth={2.5}
                        dot={{ fill: "#f59e0b", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Top Products */}
                <div
                  className="bg-white border border-border rounded-2xl p-5 shadow-xs"
                  data-ocid="crm.products_chart"
                >
                  <h2 className="font-display font-bold text-lg text-foreground mb-4">
                    🏆 Top 5 Products
                  </h2>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart
                      data={TOP_PRODUCTS}
                      layout="vertical"
                      margin={{ left: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f0f0f0"
                        horizontal={false}
                      />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 11, fontFamily: "Figtree" }}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 10, fontFamily: "Figtree" }}
                        width={90}
                      />
                      <Tooltip
                        formatter={(v) => [v, "Orders"]}
                        contentStyle={{
                          fontFamily: "Figtree",
                          fontSize: 12,
                          borderRadius: 12,
                        }}
                      />
                      <Bar
                        dataKey="orders"
                        fill="#f59e0b"
                        radius={[0, 6, 6, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Customer Growth */}
                <div
                  className="bg-white border border-border rounded-2xl p-5 shadow-xs"
                  data-ocid="crm.customer_growth_chart"
                >
                  <h2 className="font-display font-bold text-lg text-foreground mb-4">
                    👥 Customer Growth
                  </h2>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={CUSTOMER_GROWTH}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fontFamily: "Figtree" }}
                      />
                      <YAxis tick={{ fontSize: 11, fontFamily: "Figtree" }} />
                      <Tooltip
                        contentStyle={{
                          fontFamily: "Figtree",
                          fontSize: 12,
                          borderRadius: 12,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="customers"
                        stroke="#7c3aed"
                        strokeWidth={2.5}
                        dot={{ fill: "#7c3aed", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Food Preference Segments */}
                <div
                  className="bg-white border border-border rounded-2xl p-5 shadow-xs"
                  data-ocid="crm.food_preference_chart"
                >
                  <h2 className="font-display font-bold text-lg text-foreground mb-4">
                    🌶️ Food Preference Segments
                  </h2>
                  <div className="flex items-center gap-4">
                    <ResponsiveContainer width="50%" height={180}>
                      <PieChart>
                        <Pie
                          data={FOOD_PREF_DATA}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          dataKey="value"
                          label={false}
                        >
                          {FOOD_PREF_DATA.map((entry) => (
                            <Cell
                              key={entry.name}
                              fill={entry.color}
                              opacity={0.85}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(v) => [`${v}%`, "Share"]}
                          contentStyle={{
                            fontFamily: "Figtree",
                            fontSize: 11,
                            borderRadius: 10,
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1 space-y-2">
                      {FOOD_PREF_DATA.map((seg) => (
                        <div key={seg.name} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: seg.color }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-body text-foreground truncate">
                              {seg.name}
                            </p>
                          </div>
                          <span className="text-xs font-bold font-body text-foreground shrink-0">
                            {seg.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

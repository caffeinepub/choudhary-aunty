import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ClipboardList,
  Lock,
  Search,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ── Types ──────────────────────────────────────────────────────────────
type AuntyStatus = "pending" | "approved" | "rejected";

interface AuntyEntry {
  id: string;
  name: string;
  city: string;
  state: string;
  topDishes: string[];
  status: AuntyStatus;
  submittedAt: string;
  // optional extended fields from onboarding form
  fullName?: string;
  dishes?: string[];
  currentCity?: string;
  currentState?: string;
  education?: string;
}

// ── Mock data ───────────────────────────────────────────────────────────
const MOCK_AUNTIES: AuntyEntry[] = [
  {
    id: "1",
    name: "Sunita Devi",
    city: "Patna",
    state: "Bihar",
    topDishes: ["Sattu Paratha", "Aloo Chokha", "Litti Chokha"],
    status: "pending",
    submittedAt: "2026-03-01",
  },
  {
    id: "2",
    name: "Meera Sharma",
    city: "Lucknow",
    state: "Uttar Pradesh",
    topDishes: ["Awadhi Biryani", "Galouti Kebab", "Shahi Tukda"],
    status: "approved",
    submittedAt: "2026-02-20",
  },
  {
    id: "3",
    name: "Kamla Bai",
    city: "Jaipur",
    state: "Rajasthan",
    topDishes: ["Dal Baati Churma", "Gatte ki Sabzi", "Ker Sangri"],
    status: "pending",
    submittedAt: "2026-02-28",
  },
  {
    id: "4",
    name: "Rukmini Nair",
    city: "Thrissur",
    state: "Kerala",
    topDishes: ["Avial", "Puttu", "Kerala Prawn Curry"],
    status: "approved",
    submittedAt: "2026-02-15",
  },
  {
    id: "5",
    name: "Pushpa Gupta",
    city: "Bhopal",
    state: "Madhya Pradesh",
    topDishes: ["Poha", "Bhutte ka Kees", "Chakli"],
    status: "rejected",
    submittedAt: "2026-02-10",
  },
];

// ── Normalize a submission from the onboarding form ────────────────────
function normalizeEntry(raw: Record<string, unknown>, idx: number): AuntyEntry {
  const dishes = Array.isArray(raw.dishes)
    ? (raw.dishes as string[]).filter(Boolean).slice(0, 3)
    : [];
  return {
    id: String(raw.id ?? idx + 1),
    name: String(raw.fullName ?? raw.name ?? "Unknown"),
    city: String(raw.currentCity ?? raw.city ?? ""),
    state: String(raw.currentState ?? raw.state ?? ""),
    topDishes:
      dishes.length > 0
        ? dishes
        : Array.isArray(raw.topDishes)
          ? (raw.topDishes as string[])
          : [],
    status: (raw.status as AuntyStatus) ?? "pending",
    submittedAt: String(raw.submittedAt ?? ""),
  };
}

// ── Password Gate ──────────────────────────────────────────────────────
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === "aunty2024") {
      onUnlock();
    } else {
      setErr(true);
      setTimeout(() => setErr(false), 2000);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-card rounded-2xl border border-border shadow-lg p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-saffron/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-saffron" />
          </div>
          <h1 className="font-display text-xl font-bold text-foreground mb-1">
            Aunty Registry
          </h1>
          <p className="text-sm text-muted-foreground font-body mb-6">
            Team access only
          </p>
          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <Input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Enter password"
              data-ocid="registry.input"
              className={err ? "border-destructive" : ""}
              autoFocus
            />
            {err && (
              <p
                className="text-xs text-destructive font-body"
                data-ocid="registry.error_state"
              >
                Incorrect password
              </p>
            )}
            <Button
              type="submit"
              className="w-full bg-saffron hover:bg-terracotta text-cream font-body"
              data-ocid="registry.submit_button"
            >
              Continue
            </Button>
          </form>
        </div>
      </motion.div>
    </main>
  );
}

// ── Registry Table ──────────────────────────────────────────────────────
function RegistryDashboard() {
  const [aunties, setAunties] = useState<AuntyEntry[]>([]);
  const [filter, setFilter] = useState<"all" | AuntyStatus>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("aunty_submissions") || "[]",
      ) as Record<string, unknown>[];
      if (stored.length > 0) {
        setAunties(stored.map((r, i) => normalizeEntry(r, i)));
      } else {
        setAunties(MOCK_AUNTIES);
      }
    } catch {
      setAunties(MOCK_AUNTIES);
    }
  }, []);

  function updateStatus(id: string, newStatus: AuntyStatus) {
    setAunties((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)),
    );
    const name = aunties.find((a) => a.id === id)?.name ?? "Aunty";
    toast.success(`${name} has been ${newStatus}.`);
  }

  const filtered = aunties.filter((a) => {
    const matchesFilter = filter === "all" || a.status === filter;
    const matchesSearch =
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.city.toLowerCase().includes(search.toLowerCase()) ||
      a.state.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts = {
    total: aunties.length,
    pending: aunties.filter((a) => a.status === "pending").length,
    approved: aunties.filter((a) => a.status === "approved").length,
    rejected: aunties.filter((a) => a.status === "rejected").length,
  };

  return (
    <main className="min-h-screen bg-background pt-16 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <ClipboardList className="w-7 h-7 text-saffron" />
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Aunty Registry
              </h1>
              <p className="text-muted-foreground font-body text-sm">
                All onboarded aunty profiles
              </p>
            </div>
          </div>
          <Link to="/aunty-onboarding">
            <Button
              className="bg-saffron hover:bg-terracotta text-cream font-body"
              data-ocid="registry.primary_button"
            >
              + Add New Aunty
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
        >
          {[
            {
              label: "Total Submitted",
              value: counts.total,
              color: "text-foreground",
            },
            {
              label: "Pending",
              value: counts.pending,
              color: "text-amber-600",
            },
            {
              label: "Approved",
              value: counts.approved,
              color: "text-green-600",
            },
            {
              label: "Rejected",
              value: counts.rejected,
              color: "text-red-600",
            },
          ].map((stat, idx) => (
            <Card
              key={stat.label}
              className="border-border"
              data-ocid={`registry.stat.card.${idx + 1}`}
            >
              <CardContent className="p-4 text-center">
                <div
                  className={`text-2xl font-display font-bold ${stat.color}`}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-body mt-0.5">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Filters + search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-4"
        >
          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as typeof filter)}
            className="w-auto"
          >
            <TabsList className="h-9 bg-muted">
              {(["all", "pending", "approved", "rejected"] as const).map(
                (f) => (
                  <TabsTrigger
                    key={f}
                    value={f}
                    data-ocid={`registry.${f}.tab`}
                    className="text-xs font-body capitalize px-3"
                  >
                    {f === "all"
                      ? `All (${counts.total})`
                      : f.charAt(0).toUpperCase() + f.slice(1)}
                  </TabsTrigger>
                ),
              )}
            </TabsList>
          </Tabs>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, city, state..."
              className="pl-8 h-9 text-sm font-body"
              data-ocid="registry.search_input"
            />
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto" data-ocid="registry.table">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-body font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                      Name
                    </TableHead>
                    <TableHead className="font-body font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                      City / State
                    </TableHead>
                    <TableHead className="font-body font-semibold text-xs uppercase tracking-wide text-muted-foreground hidden md:table-cell">
                      Top Dishes
                    </TableHead>
                    <TableHead className="font-body font-semibold text-xs uppercase tracking-wide text-muted-foreground hidden sm:table-cell">
                      Submitted
                    </TableHead>
                    <TableHead className="font-body font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                      Status
                    </TableHead>
                    <TableHead className="font-body font-semibold text-xs uppercase tracking-wide text-muted-foreground text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-12"
                        data-ocid="registry.empty_state"
                      >
                        <p className="text-muted-foreground font-body text-sm">
                          No aunties match this filter.
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((aunty, idx) => (
                      <TableRow
                        key={aunty.id}
                        className="hover:bg-muted/30 transition-colors"
                        data-ocid={`registry.item.${idx + 1}`}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center shrink-0">
                              <span className="text-xs font-display font-bold text-saffron">
                                {aunty.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .slice(0, 2)
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <Link
                                to="/aunty-profile/$id"
                                params={{ id: aunty.id }}
                                className="font-body text-sm font-medium text-foreground hover:text-saffron transition-colors"
                                data-ocid={`registry.profile.link.${idx + 1}`}
                              >
                                {aunty.name}
                              </Link>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-body text-sm text-muted-foreground">
                          {aunty.city}
                          {aunty.city && aunty.state ? ", " : ""}
                          {aunty.state}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="font-body text-xs text-muted-foreground">
                            {aunty.topDishes.slice(0, 3).join(", ") || "—"}
                          </span>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell font-body text-xs text-muted-foreground">
                          {aunty.submittedAt}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={aunty.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {aunty.status !== "approved" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2 text-xs border-green-500 text-green-700 hover:bg-green-50 font-body"
                                onClick={() =>
                                  updateStatus(aunty.id, "approved")
                                }
                                data-ocid={`registry.approve.button.${idx + 1}`}
                              >
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Approve
                              </Button>
                            )}
                            {aunty.status !== "rejected" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2 text-xs border-red-400 text-red-600 hover:bg-red-50 font-body"
                                onClick={() =>
                                  updateStatus(aunty.id, "rejected")
                                }
                                data-ocid={`registry.delete_button.${idx + 1}`}
                              >
                                <XCircle className="w-3 h-3 mr-1" />
                                Reject
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: AuntyStatus }) {
  if (status === "approved") {
    return (
      <Badge className="bg-green-100 text-green-700 border-green-200 font-body text-xs">
        Approved
      </Badge>
    );
  }
  if (status === "rejected") {
    return (
      <Badge className="bg-red-100 text-red-700 border-red-200 font-body text-xs">
        Rejected
      </Badge>
    );
  }
  return (
    <Badge className="bg-amber-100 text-amber-700 border-amber-200 font-body text-xs">
      Pending
    </Badge>
  );
}

// ── Page Export ─────────────────────────────────────────────────────────
export default function AuntyRegistryPage() {
  const [unlocked, setUnlocked] = useState(false);
  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }
  return <RegistryDashboard />;
}

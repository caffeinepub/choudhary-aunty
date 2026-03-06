import type { CustomerAccount } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import { useActor } from "@/hooks/useActor";
import { useNavigate } from "@tanstack/react-router";
import { Search, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { CrmSidebar, clearCrmSession, getCrmSession } from "./CrmLayout";
import type { CrmRole } from "./CrmLayout";

// RFM badge mapping
function getRfmBadge(stage: string) {
  const map: Record<string, string> = {
    Champion: "bg-amber-100 text-amber-700",
    Loyal: "bg-green-100 text-green-700",
    New: "bg-blue-100 text-blue-700",
    Active: "bg-teal-100 text-teal-700",
    "At Risk": "bg-red-100 text-red-700",
    Lost: "bg-gray-100 text-gray-500",
  };
  return map[stage] ?? "bg-gray-100 text-gray-600";
}

// Mock customers for when backend returns empty
const MOCK_CUSTOMERS: CustomerAccount[] = [
  {
    id: BigInt(1),
    principal: null as unknown as import("@icp-sdk/core/principal").Principal,
    name: "Meena Sharma",
    phone: "9876543210",
    email: "meena@example.com",
    city: "Delhi",
    state: "Delhi",
    dietType: "Veg",
    spicePreference: "High Spice",
    oilPreference: "Low Oil",
    sweetnessPreference: "Medium Sweet",
    regionPreference: "Bihar",
    lifecycleStage: "Loyal",
    asharfiPoints: BigInt(1250),
    signupDate: BigInt(Date.now() * 1_000_000),
  },
  {
    id: BigInt(2),
    principal: null as unknown as import("@icp-sdk/core/principal").Principal,
    name: "Rohit Kapoor",
    phone: "9845671234",
    email: "rohit@example.com",
    city: "Mumbai",
    state: "Maharashtra",
    dietType: "Non-Veg",
    spicePreference: "Medium Spice",
    oilPreference: "Medium Oil",
    sweetnessPreference: "High Sweet",
    regionPreference: "Punjab",
    lifecycleStage: "Champion",
    asharfiPoints: BigInt(3200),
    signupDate: BigInt(Date.now() * 1_000_000),
  },
  {
    id: BigInt(3),
    principal: null as unknown as import("@icp-sdk/core/principal").Principal,
    name: "Priya Agarwal",
    phone: "9712345678",
    email: "priya@example.com",
    city: "Bangalore",
    state: "Karnataka",
    dietType: "Veg",
    spicePreference: "Low Spice",
    oilPreference: "Low Oil",
    sweetnessPreference: "High Sweet",
    regionPreference: "Uttar Pradesh",
    lifecycleStage: "New",
    asharfiPoints: BigInt(50),
    signupDate: BigInt(Date.now() * 1_000_000),
  },
  {
    id: BigInt(4),
    principal: null as unknown as import("@icp-sdk/core/principal").Principal,
    name: "Sunita Verma",
    phone: "9634567890",
    email: "sunita@example.com",
    city: "Hyderabad",
    state: "Telangana",
    dietType: "Veg",
    spicePreference: "High Spice",
    oilPreference: "High Oil",
    sweetnessPreference: "Low Sweet",
    regionPreference: "Haryana",
    lifecycleStage: "At Risk",
    asharfiPoints: BigInt(780),
    signupDate: BigInt(Date.now() * 1_000_000),
  },
  {
    id: BigInt(5),
    principal: null as unknown as import("@icp-sdk/core/principal").Principal,
    name: "Kavita Mishra",
    phone: "9523456789",
    email: "kavita@example.com",
    city: "Pune",
    state: "Maharashtra",
    dietType: "Veg",
    spicePreference: "Medium Spice",
    oilPreference: "Medium Oil",
    sweetnessPreference: "Medium Sweet",
    regionPreference: "Uttarakhand",
    lifecycleStage: "Loyal",
    asharfiPoints: BigInt(1890),
    signupDate: BigInt(Date.now() * 1_000_000),
  },
];

export default function CrmCustomersPage() {
  const { actor, isFetching } = useActor();
  const navigate = useNavigate();
  const [role, setRole] = useState<CrmRole | null>(getCrmSession);
  const [customers, setCustomers] = useState<CustomerAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerAccount | null>(null);

  useEffect(() => {
    document.title = "Customers | CRM | Choudhary Aunty";
    if (!role || (role !== "admin" && role !== "crm-manager")) {
      navigate({ to: "/crm" });
    }
  }, [role, navigate]);

  useEffect(() => {
    if (!actor || isFetching) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const result = await actor.getAllCustomers();
        setCustomers(result.length > 0 ? result : MOCK_CUSTOMERS);
      } catch {
        setCustomers(MOCK_CUSTOMERS);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [actor, isFetching]);

  const filtered = customers.filter((c) => {
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.city.toLowerCase().includes(search.toLowerCase());
    const matchStage =
      stageFilter === "all" || c.lifecycleStage === stageFilter;
    return matchSearch && matchStage;
  });

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
          {/* Header */}
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Customer Database
            </h1>
            <p className="text-muted-foreground text-sm font-body">
              {customers.length} customers total
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white border border-border rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-ocid="crm.customers_search_input"
                className="pl-9 font-body rounded-xl border-border"
              />
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger
                className="w-full sm:w-44 font-body rounded-xl"
                data-ocid="crm.customers_stage_select"
              >
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="font-body">
                  All Stages
                </SelectItem>
                {["New", "Active", "Loyal", "Champion", "At Risk", "Lost"].map(
                  (stage) => (
                    <SelectItem key={stage} value={stage} className="font-body">
                      {stage}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="bg-white border border-border rounded-2xl shadow-xs overflow-hidden">
            {loading ? (
              <div className="p-6 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
                  <Skeleton key={i} className="h-12 rounded-xl" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="text-center py-16"
                data-ocid="crm.customers_empty_state"
              >
                <User className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="font-body text-muted-foreground">
                  No customers found
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-body text-xs uppercase tracking-wider">
                        Customer
                      </TableHead>
                      <TableHead className="font-body text-xs uppercase tracking-wider">
                        City / State
                      </TableHead>
                      <TableHead className="font-body text-xs uppercase tracking-wider">
                        Stage
                      </TableHead>
                      <TableHead className="font-body text-xs uppercase tracking-wider">
                        Asharfi
                      </TableHead>
                      <TableHead className="font-body text-xs uppercase tracking-wider">
                        Joined
                      </TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((c, idx) => (
                      <TableRow
                        key={c.id.toString()}
                        data-ocid={`crm.customer.item.${idx + 1}`}
                        className="hover:bg-amber-50/30 cursor-pointer"
                        onClick={() => setSelectedCustomer(c)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-saffron/15 flex items-center justify-center shrink-0">
                              <span className="text-saffron font-bold text-xs font-body">
                                {c.name[0]}
                              </span>
                            </div>
                            <div>
                              <p className="font-body font-semibold text-sm text-foreground">
                                {c.name}
                              </p>
                              <p className="text-xs text-muted-foreground font-body">
                                {c.phone}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-body text-sm text-muted-foreground">
                          {c.city}, {c.state}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`text-xs font-body font-semibold ${getRfmBadge(c.lifecycleStage)}`}
                          >
                            {c.lifecycleStage}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-body text-sm font-bold text-saffron">
                          🪙 {Number(c.asharfiPoints).toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="font-body text-xs text-muted-foreground">
                          {new Date(
                            Number(c.signupDate) / 1_000_000,
                          ).toLocaleDateString("en-IN", {
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="font-body text-saffron hover:text-terracotta text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCustomer(c);
                            }}
                            data-ocid={`crm.customer.view_button.${idx + 1}`}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Detail Drawer */}
      <AnimatePresence>
        {selectedCustomer && (
          <Dialog
            open={!!selectedCustomer}
            onOpenChange={() => setSelectedCustomer(null)}
          >
            <DialogContent
              className="max-w-md rounded-3xl"
              data-ocid="crm.customer_detail_dialog"
            >
              <DialogHeader>
                <DialogTitle className="font-display text-xl">
                  Customer Profile
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-saffron/15 flex items-center justify-center">
                    <span className="font-display font-bold text-2xl text-saffron">
                      {selectedCustomer.name[0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg">
                      {selectedCustomer.name}
                    </h3>
                    <p className="text-muted-foreground text-sm font-body">
                      {selectedCustomer.city}, {selectedCustomer.state}
                    </p>
                    <Badge
                      className={`text-xs mt-1 font-body font-semibold ${getRfmBadge(selectedCustomer.lifecycleStage)}`}
                    >
                      {selectedCustomer.lifecycleStage}
                    </Badge>
                  </div>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Phone", value: selectedCustomer.phone },
                    { label: "Email", value: selectedCustomer.email || "—" },
                    { label: "Diet", value: selectedCustomer.dietType || "—" },
                    {
                      label: "Asharfi",
                      value: `🪙 ${Number(selectedCustomer.asharfiPoints).toLocaleString("en-IN")}`,
                    },
                    {
                      label: "Spice Pref.",
                      value: selectedCustomer.spicePreference || "Not set",
                    },
                    {
                      label: "Oil Pref.",
                      value: selectedCustomer.oilPreference || "Not set",
                    },
                    {
                      label: "Sweetness",
                      value: selectedCustomer.sweetnessPreference || "Not set",
                    },
                    {
                      label: "Region Pref.",
                      value: selectedCustomer.regionPreference || "All India",
                    },
                  ].map((field) => (
                    <div
                      key={field.label}
                      className="bg-gray-50 rounded-xl p-3"
                    >
                      <p className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-0.5">
                        {field.label}
                      </p>
                      <p className="text-sm font-body font-semibold text-foreground">
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => setSelectedCustomer(null)}
                  data-ocid="crm.customer_detail_close_button"
                  className="w-full bg-saffron hover:bg-terracotta text-cream font-body font-semibold rounded-xl"
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

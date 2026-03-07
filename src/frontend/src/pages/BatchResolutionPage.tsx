import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ── Types ────────────────────────────────────────────────────────────────────

type BatchStatus = "filling" | "at_risk" | "ready" | "merged" | "confirmed";
type ResolutionStep = 1 | 2 | 3 | 4;

interface BatchItem {
  batchId: string;
  productName: string;
  makerName: string;
  state: string;
  category: string;
  ordersReceived: number;
  ordersNeeded: number;
  fillRate: number;
  status: BatchStatus;
  closingDate: string;
  isMultiMaker: boolean;
}

interface TracedBatch {
  batchId: string;
  productName: string;
  makerName: string;
  isMultiMaker: boolean;
  preparedDate: string;
  dispatchDate: string;
  totalKg: number;
}

// ── Seed Data ─────────────────────────────────────────────────────────────────

const ACTIVE_BATCHES: BatchItem[] = [
  {
    batchId: "CA-BIO-2026-001",
    productName: "Aam Ka Achar (Bihari Style)",
    makerName: "Anju Choudhary",
    state: "Bihar",
    category: "achar",
    ordersReceived: 42,
    ordersNeeded: 50,
    fillRate: 84,
    status: "filling",
    closingDate: "Fri, 13 Mar 2026",
    isMultiMaker: false,
  },
  {
    batchId: "CA-PNJ-2026-002",
    productName: "Amritsari Aam Ka Achar",
    makerName: "Preetkaur Aunty",
    state: "Punjab",
    category: "achar",
    ordersReceived: 18,
    ordersNeeded: 50,
    fillRate: 36,
    status: "at_risk",
    closingDate: "Fri, 13 Mar 2026",
    isMultiMaker: false,
  },
  {
    batchId: "CA-HRY-2026-003",
    productName: "Churma Ladoo",
    makerName: "Babita Tai",
    state: "Haryana",
    category: "ladoo",
    ordersReceived: 30,
    ordersNeeded: 30,
    fillRate: 100,
    status: "ready",
    closingDate: "Fri, 13 Mar 2026",
    isMultiMaker: false,
  },
  {
    batchId: "CA-UTR-2026-004",
    productName: "Bal Mithai",
    makerName: "Geeta Devi",
    state: "Uttarakhand",
    category: "sweets",
    ordersReceived: 8,
    ordersNeeded: 25,
    fillRate: 32,
    status: "at_risk",
    closingDate: "Fri, 13 Mar 2026",
    isMultiMaker: false,
  },
  {
    batchId: "CA-UPR-2026-005",
    productName: "Agra Petha",
    makerName: "Sarla Maasi",
    state: "Uttar Pradesh",
    category: "sweets",
    ordersReceived: 45,
    ordersNeeded: 50,
    fillRate: 90,
    status: "filling",
    closingDate: "Fri, 13 Mar 2026",
    isMultiMaker: false,
  },
  {
    batchId: "CA-BIO-2026-006",
    productName: "Tilkut (Gaya Special)",
    makerName: "Anju Choudhary",
    state: "Bihar",
    category: "sweets",
    ordersReceived: 12,
    ordersNeeded: 30,
    fillRate: 40,
    status: "at_risk",
    closingDate: "Fri, 13 Mar 2026",
    isMultiMaker: false,
  },
];

const TRACED_BATCHES: TracedBatch[] = [
  {
    batchId: "CA-BIO-2026-097",
    productName: "Sattu Ka Ladoo",
    makerName: "Anju Choudhary",
    isMultiMaker: false,
    preparedDate: "22 Feb 2026",
    dispatchDate: "24 Feb 2026",
    totalKg: 18,
  },
  {
    batchId: "CA-PNJ-2026-089",
    productName: "Mixed Achar Bundle",
    makerName: "Preetkaur Aunty + Anju Choudhary",
    isMultiMaker: true,
    preparedDate: "15 Feb 2026",
    dispatchDate: "17 Feb 2026",
    totalKg: 22,
  },
  {
    batchId: "CA-HRY-2026-073",
    productName: "Methi Mathri",
    makerName: "Babita Tai",
    isMultiMaker: false,
    preparedDate: "8 Feb 2026",
    dispatchDate: "10 Feb 2026",
    totalKg: 15,
  },
  {
    batchId: "CA-UTR-2026-061",
    productName: "Pahadi Sweets Bundle",
    makerName: "Geeta Devi + Sarla Maasi",
    isMultiMaker: true,
    preparedDate: "1 Feb 2026",
    dispatchDate: "3 Feb 2026",
    totalKg: 20,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function statusBadge(status: BatchStatus) {
  const map: Record<BatchStatus, { label: string; className: string }> = {
    filling: {
      label: "Filling",
      className: "bg-blue-100 text-blue-700 border-blue-200",
    },
    at_risk: {
      label: "At Risk",
      className: "bg-red-100 text-red-700 border-red-200",
    },
    ready: {
      label: "Ready",
      className: "bg-green-100 text-green-700 border-green-200",
    },
    merged: {
      label: "Merged",
      className: "bg-purple-100 text-purple-700 border-purple-200",
    },
    confirmed: {
      label: "Confirmed",
      className: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
  };
  const { label, className } = map[status];
  return (
    <span
      className={cn(
        "text-xs font-semibold px-2.5 py-1 rounded-full border font-body",
        className,
      )}
    >
      {label}
    </span>
  );
}

function fillColor(rate: number) {
  if (rate >= 80) return "bg-green-500";
  if (rate >= 50) return "bg-amber-500";
  return "bg-red-500";
}

// ── Resolution Workflow Modal ─────────────────────────────────────────────────

function ResolutionModal({
  batch,
  onClose,
}: { batch: BatchItem; onClose: () => void }) {
  const [step, setStep] = useState<ResolutionStep>(1);
  const [makerAccepted, setMakerAccepted] = useState(false);
  const [adminChecks, setAdminChecks] = useState([false, false, false]);
  const [compatibilityChecks, setCompatibilityChecks] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [makerAContrib, setMakerAContrib] = useState(60);

  const makerBContrib = 100 - makerAContrib;

  const allAdminChecked = adminChecks.every(Boolean);
  const allCompatChecked = compatibilityChecks.every(Boolean);

  const waMsg = `Hi ${batch.makerName}! Your ${batch.productName} batch (ID: ${batch.batchId}) has only ${batch.ordersReceived} of ${batch.ordersNeeded} orders. Would you accept preparing a smaller batch of ${batch.ordersReceived} orders? Reply YES to confirm. – Team Choudhary Aunty`;

  function handleResolve() {
    toast.success(`Batch ${batch.batchId} resolved successfully!`);
    onClose();
  }

  const STEPS = [
    "Wait for Orders",
    "Ask Maker",
    "Admin Confirm",
    "Merge Check",
  ];

  return (
    <DialogContent
      className="max-w-2xl max-h-[90vh] overflow-y-auto"
      data-ocid="batch.resolution_modal"
    >
      <DialogHeader>
        <DialogTitle className="font-display text-lg text-foreground">
          Resolve Batch: {batch.batchId}
        </DialogTitle>
        <p className="text-sm text-muted-foreground font-body">
          {batch.productName} · {batch.makerName}
        </p>
      </DialogHeader>

      {/* Step indicator */}
      <div className="flex items-center gap-1 mb-4">
        {STEPS.map((label, i) => {
          const s = (i + 1) as ResolutionStep;
          return (
            <div key={label} className="flex items-center flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setStep(s)}
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-body border-2 shrink-0 transition-all",
                  step === s
                    ? "bg-saffron border-saffron text-cream"
                    : s < step
                      ? "bg-green-500 border-green-500 text-white"
                      : "bg-muted border-border text-muted-foreground",
                )}
                data-ocid={`batch.step_${s}_button`}
              >
                {s < step ? "✓" : s}
              </button>
              <span
                className={cn(
                  "text-[10px] font-body ml-1 truncate hidden sm:block",
                  step === s
                    ? "text-saffron font-semibold"
                    : "text-muted-foreground",
                )}
              >
                {label}
              </span>
              {i < 3 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-1",
                    s < step ? "bg-green-400" : "bg-border",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 1: Wait */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-display font-semibold text-blue-800 mb-2">
              Step 1 — Wait for More Orders
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-white rounded-lg p-3 text-center border border-blue-100">
                <div className="text-2xl font-bold text-blue-700 font-display">
                  {batch.ordersReceived}
                </div>
                <div className="text-xs text-muted-foreground font-body">
                  Orders Received
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-blue-100">
                <div className="text-2xl font-bold text-red-600 font-display">
                  {batch.ordersNeeded - batch.ordersReceived}
                </div>
                <div className="text-xs text-muted-foreground font-body">
                  Still Needed
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-xs text-muted-foreground font-body mb-1">
                <span>Fill rate</span>
                <span className="font-semibold">{batch.fillRate}%</span>
              </div>
              <Progress value={batch.fillRate} className="h-2" />
            </div>
            <p className="text-sm text-blue-700 font-body">
              Batch closes on <strong>{batch.closingDate}</strong>. Orders may
              still come in. Monitor until closing day before escalating.
            </p>
          </div>
          <Button
            onClick={() => setStep(2)}
            className="w-full font-body"
            data-ocid="batch.escalate_to_maker_button"
          >
            Escalate to Maker →
          </Button>
        </div>
      )}

      {/* Step 2: Ask Maker */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber-800 mb-2">
              Step 2 — Ask Maker to Accept Smaller Batch
            </h3>
            <p className="text-sm text-amber-700 font-body mb-3">
              Send this WhatsApp message to {batch.makerName}:
            </p>
            <div className="bg-white border border-amber-200 rounded-lg p-3 text-sm text-foreground font-body leading-relaxed mb-3">
              {waMsg}
            </div>
            <a
              href={`https://wa.me/919883140470?text=${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#1da851] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors font-body"
              data-ocid="batch.whatsapp_maker_button"
            >
              📱 Send on WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg">
            <input
              type="checkbox"
              id="makerAccepted"
              checked={makerAccepted}
              onChange={(e) => setMakerAccepted(e.target.checked)}
              className="w-4 h-4 accent-saffron"
              data-ocid="batch.maker_accepted_checkbox"
            />
            <label
              htmlFor="makerAccepted"
              className="text-sm font-body text-foreground cursor-pointer"
            >
              Maker confirmed acceptance of smaller batch
            </label>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1 font-body"
              data-ocid="batch.back_step1_button"
            >
              ← Back
            </Button>
            <Button
              onClick={() => setStep(3)}
              disabled={!makerAccepted}
              className="flex-1 font-body"
              data-ocid="batch.proceed_step3_button"
            >
              Admin Confirm →
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Admin Confirm */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <h3 className="font-display font-semibold text-purple-800 mb-3">
              Step 3 — Admin Confirms Preparation
            </h3>
            <p className="text-sm text-purple-700 font-body mb-3">
              All three criteria must be checked before confirming:
            </p>
            {[
              "Verified product quality standards maintained at reduced batch size",
              "Confirmed all existing customer commitments can be fulfilled",
              "Logistics and packaging confirmed for smaller batch volume",
            ].map((label, i) => (
              <div
                key={label}
                className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-purple-100/50 transition-colors mb-1"
              >
                <input
                  type="checkbox"
                  id={`admin-check-${i}`}
                  checked={adminChecks[i]}
                  onChange={(e) => {
                    const next = [...adminChecks];
                    next[i] = e.target.checked;
                    setAdminChecks(next);
                  }}
                  className="w-4 h-4 accent-saffron mt-0.5 shrink-0"
                  data-ocid={`batch.admin_check_${i + 1}_checkbox`}
                />
                <label
                  htmlFor={`admin-check-${i}`}
                  className="text-sm font-body text-foreground cursor-pointer"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setStep(2)}
              className="flex-1 font-body"
              data-ocid="batch.back_step2_button"
            >
              ← Back
            </Button>
            <Button
              onClick={handleResolve}
              disabled={!allAdminChecked}
              className="flex-1 font-body bg-green-600 hover:bg-green-700"
              data-ocid="batch.confirm_preparation_button"
            >
              ✓ Confirm Preparation
            </Button>
            <Button
              variant="outline"
              onClick={() => setStep(4)}
              disabled={!allAdminChecked}
              className="flex-1 font-body"
              data-ocid="batch.merge_check_button"
            >
              Try Merge →
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Merge Check */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <h3 className="font-display font-semibold text-rose-800 mb-3">
              Step 4 — Merge Compatibility Check
            </h3>
            <p className="text-sm text-rose-700 font-body mb-3">
              All 5 compatibility rules must pass before merging:
            </p>
            {[
              "Same recipe category and preparation style",
              "No conflicting ingredients or allergen concerns",
              "Compatible preparation methods (same equipment/technique)",
              "Both makers hold minimum hygiene certification",
              "Maker ratings ≥ 4.0 stars each",
            ].map((label, i) => (
              <div
                key={label}
                className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-rose-100/50 transition-colors mb-1"
              >
                <input
                  type="checkbox"
                  id={`compat-check-${i}`}
                  checked={compatibilityChecks[i]}
                  onChange={(e) => {
                    const next = [...compatibilityChecks];
                    next[i] = e.target.checked;
                    setCompatibilityChecks(next);
                  }}
                  className="w-4 h-4 accent-saffron mt-0.5 shrink-0"
                  data-ocid={`batch.compat_check_${i + 1}_checkbox`}
                />
                <label
                  htmlFor={`compat-check-${i}`}
                  className="text-sm font-body text-foreground cursor-pointer"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>

          {allCompatChecked && (
            <div className="bg-muted/40 rounded-xl p-4 space-y-3">
              <h4 className="text-sm font-semibold font-body text-foreground">
                Revenue Distribution
              </h4>
              <div className="flex items-center gap-3">
                <span className="text-xs font-body text-muted-foreground w-24 shrink-0">
                  {batch.makerName}
                </span>
                <input
                  type="range"
                  min={10}
                  max={90}
                  value={makerAContrib}
                  onChange={(e) => setMakerAContrib(Number(e.target.value))}
                  className="flex-1 accent-saffron"
                  data-ocid="batch.revenue_split_slider"
                />
                <span className="text-sm font-bold font-body text-saffron w-10 text-right">
                  {makerAContrib}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-body text-muted-foreground w-24 shrink-0">
                  Partner Maker
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 transition-all"
                    style={{ width: `${makerBContrib}%` }}
                  />
                </div>
                <span className="text-sm font-bold font-body text-purple-600 w-10 text-right">
                  {makerBContrib}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-body">
                Adjust the split based on each maker's contribution to the batch
                by weight.
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setStep(3)}
              className="flex-1 font-body"
              data-ocid="batch.back_step3_button"
            >
              ← Back
            </Button>
            <Button
              onClick={handleResolve}
              disabled={!allCompatChecked}
              className="flex-1 font-body bg-purple-600 hover:bg-purple-700"
              data-ocid="batch.confirm_merge_button"
            >
              ✓ Confirm Merge
            </Button>
          </div>
        </div>
      )}
    </DialogContent>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function BatchResolutionPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<BatchItem | null>(null);
  const [notifCopied, setNotifCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("active");

  const atRiskCount = ACTIVE_BATCHES.filter(
    (b) => b.status === "at_risk",
  ).length;
  const avgFillRate = Math.round(
    ACTIVE_BATCHES.reduce((s, b) => s + b.fillRate, 0) / ACTIVE_BATCHES.length,
  );

  const multiMakerNotif =
    "Dear valued customer,\n\nYour recent order (Batch #CA-PNJ-2026-002) has been carefully prepared through a collaboration between two of our verified homemakers — Preetkaur Aunty and Anju Choudhary — to ensure the authentic taste you love reaches you on time.\n\nBoth makers are certified Choudhary Aunty partners with verified kitchens and our quality guarantee applies to every gram.\n\nThank you for your trust.\n\nWith love,\nTeam Choudhary Aunty\nkaisehoaunty@gmail.com";

  function handleCopy() {
    navigator.clipboard.writeText(multiMakerNotif);
    setNotifCopied(true);
    toast.success("Notification copied to clipboard!");
    setTimeout(() => setNotifCopied(false), 2000);
  }

  // ── Login Gate ──
  if (!authenticated) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <Card className="shadow-warm-lg border-border">
            <CardHeader className="text-center pb-2">
              <div className="text-4xl mb-2">⚖️</div>
              <CardTitle className="font-display text-xl text-foreground">
                Batch Resolution Manager
              </CardTitle>
              <p className="text-sm text-muted-foreground font-body">
                Admin access required
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && password === "batch2024") {
                    setAuthenticated(true);
                  }
                }}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:border-saffron/50"
                data-ocid="batch.password_input"
              />
              <Button
                onClick={() => {
                  if (password === "batch2024") {
                    setAuthenticated(true);
                  } else {
                    toast.error("Incorrect password");
                  }
                }}
                className="w-full font-body"
                data-ocid="batch.login_button"
              >
                Access Batch Manager
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 bg-background pb-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="text-3xl">⚖️</span>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Ethical Batch Resolution
            </h1>
          </div>
          <p className="text-muted-foreground font-body text-sm ml-12">
            Manage under-filled batches with transparency and fairness
          </p>
        </motion.div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Active Batches",
              value: ACTIVE_BATCHES.length,
              color: "text-blue-600",
              bg: "bg-blue-50 border-blue-200",
            },
            {
              label: "At Risk",
              value: atRiskCount,
              color: "text-red-600",
              bg: "bg-red-50 border-red-200",
            },
            {
              label: "Merged This Week",
              value: 2,
              color: "text-purple-600",
              bg: "bg-purple-50 border-purple-200",
            },
            {
              label: "Avg Fill Rate",
              value: `${avgFillRate}%`,
              color: "text-green-600",
              bg: "bg-green-50 border-green-200",
            },
          ].map((kpi) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn("rounded-xl border p-4 text-center", kpi.bg)}
              data-ocid={`batch.kpi_${kpi.label.toLowerCase().replace(/ /g, "_")}_card`}
            >
              <div className={cn("text-3xl font-bold font-display", kpi.color)}>
                {kpi.value}
              </div>
              <div className="text-xs text-muted-foreground font-body mt-0.5">
                {kpi.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          data-ocid="batch.tabs"
        >
          <TabsList className="mb-6 flex flex-wrap gap-1 h-auto p-1">
            <TabsTrigger
              value="active"
              className="font-body text-sm"
              data-ocid="batch.active_tab"
            >
              Active Batches
            </TabsTrigger>
            <TabsTrigger
              value="traceability"
              className="font-body text-sm"
              data-ocid="batch.traceability_tab"
            >
              Traceability
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="font-body text-sm"
              data-ocid="batch.notifications_tab"
            >
              Customer Notifications
            </TabsTrigger>
          </TabsList>

          {/* Active Batches */}
          <TabsContent value="active" data-ocid="batch.active_panel">
            <div className="space-y-4">
              {ACTIVE_BATCHES.map((batch, idx) => (
                <motion.div
                  key={batch.batchId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  data-ocid={`batch.active_item.${idx + 1}`}
                >
                  <Card
                    className={cn(
                      "border",
                      batch.status === "at_risk"
                        ? "border-red-200 bg-red-50/30"
                        : batch.status === "ready"
                          ? "border-green-200 bg-green-50/30"
                          : "border-border",
                    )}
                  >
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-mono text-xs text-muted-foreground">
                              {batch.batchId}
                            </span>
                            {statusBadge(batch.status)}
                          </div>
                          <h3 className="font-display font-semibold text-foreground text-base leading-tight">
                            {batch.productName}
                          </h3>
                          <p className="text-sm text-muted-foreground font-body mt-0.5">
                            {batch.makerName} · {batch.state}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant={
                            batch.status === "at_risk" ? "default" : "outline"
                          }
                          onClick={() => setSelectedBatch(batch)}
                          className="font-body shrink-0"
                          data-ocid={`batch.resolve_button.${idx + 1}`}
                        >
                          {batch.status === "ready" ? "✓ Ready" : "Resolve"}
                        </Button>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                        <div>
                          <div className="text-lg font-bold font-display text-foreground">
                            {batch.ordersReceived}
                          </div>
                          <div className="text-[11px] text-muted-foreground font-body">
                            Received
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold font-display text-muted-foreground">
                            {batch.ordersNeeded}
                          </div>
                          <div className="text-[11px] text-muted-foreground font-body">
                            Needed
                          </div>
                        </div>
                        <div>
                          <div
                            className={cn(
                              "text-lg font-bold font-display",
                              batch.fillRate >= 80
                                ? "text-green-600"
                                : batch.fillRate >= 50
                                  ? "text-amber-600"
                                  : "text-red-600",
                            )}
                          >
                            {batch.fillRate}%
                          </div>
                          <div className="text-[11px] text-muted-foreground font-body">
                            Fill Rate
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${batch.fillRate}%` }}
                            transition={{
                              delay: idx * 0.05 + 0.2,
                              duration: 0.6,
                            }}
                            className={cn(
                              "h-full rounded-full",
                              fillColor(batch.fillRate),
                            )}
                          />
                        </div>
                        <p className="text-[11px] text-muted-foreground font-body mt-1.5">
                          Closes: {batch.closingDate}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Traceability */}
          <TabsContent
            value="traceability"
            data-ocid="batch.traceability_panel"
          >
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base text-foreground">
                  Batch Traceability Records
                </CardTitle>
                <p className="text-sm text-muted-foreground font-body">
                  Every batch has a unique ID, maker identity, and preparation
                  timestamp on record.
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-sm font-body"
                    data-ocid="batch.traceability_table"
                  >
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left px-4 py-3 font-semibold text-foreground/70 text-xs uppercase tracking-wide">
                          Batch ID
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground/70 text-xs uppercase tracking-wide">
                          Product
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground/70 text-xs uppercase tracking-wide hidden sm:table-cell">
                          Maker(s)
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground/70 text-xs uppercase tracking-wide hidden md:table-cell">
                          Prepared
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground/70 text-xs uppercase tracking-wide hidden md:table-cell">
                          Dispatched
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground/70 text-xs uppercase tracking-wide">
                          Kg
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground/70 text-xs uppercase tracking-wide">
                          Type
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {TRACED_BATCHES.map((tb, idx) => (
                        <tr
                          key={tb.batchId}
                          className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                          data-ocid={`batch.trace_row.${idx + 1}`}
                        >
                          <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                            {tb.batchId}
                          </td>
                          <td className="px-4 py-3 font-body text-sm text-foreground font-medium">
                            {tb.productName}
                          </td>
                          <td className="px-4 py-3 font-body text-sm text-muted-foreground hidden sm:table-cell">
                            {tb.makerName}
                          </td>
                          <td className="px-4 py-3 font-body text-sm text-muted-foreground hidden md:table-cell">
                            {tb.preparedDate}
                          </td>
                          <td className="px-4 py-3 font-body text-sm text-muted-foreground hidden md:table-cell">
                            {tb.dispatchDate}
                          </td>
                          <td className="px-4 py-3 font-body text-sm text-foreground">
                            {tb.totalKg} kg
                          </td>
                          <td className="px-4 py-3">
                            {tb.isMultiMaker ? (
                              <Badge
                                variant="outline"
                                className="text-purple-700 border-purple-300 bg-purple-50 text-xs"
                              >
                                Multi-Maker
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="text-green-700 border-green-300 bg-green-50 text-xs"
                              >
                                Single Maker
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customer Notifications */}
          <TabsContent
            value="notifications"
            data-ocid="batch.notifications_panel"
          >
            <Card className="border-border max-w-2xl">
              <CardHeader>
                <CardTitle className="font-display text-base text-foreground">
                  Multi-Maker Transparency Notification
                </CardTitle>
                <p className="text-sm text-muted-foreground font-body">
                  Use this message to inform customers when their batch was
                  fulfilled by multiple makers. Copy and send via WhatsApp or
                  email.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-foreground font-body leading-relaxed whitespace-pre-line">
                  {multiMakerNotif}
                </div>
                <Separator />
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleCopy}
                    className="flex-1 font-body"
                    data-ocid="batch.copy_notification_button"
                  >
                    {notifCopied ? "✓ Copied!" : "📋 Copy Message"}
                  </Button>
                  <a
                    href={`https://wa.me/919883140470?text=${encodeURIComponent(multiMakerNotif)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1da851] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors font-body"
                    data-ocid="batch.send_whatsapp_notification_button"
                  >
                    📱 Send WhatsApp
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Resolution Workflow Modal */}
      <Dialog
        open={!!selectedBatch}
        onOpenChange={() => setSelectedBatch(null)}
      >
        {selectedBatch && (
          <ResolutionModal
            batch={selectedBatch}
            onClose={() => setSelectedBatch(null)}
          />
        )}
      </Dialog>
    </main>
  );
}

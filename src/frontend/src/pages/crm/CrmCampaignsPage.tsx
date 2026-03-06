import type { CrmCampaign } from "@/backend.d";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useActor } from "@/hooks/useActor";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CrmSidebar, clearCrmSession, getCrmSession } from "./CrmLayout";
import type { CrmRole } from "./CrmLayout";

const MOCK_CAMPAIGNS: CrmCampaign[] = [
  {
    id: BigInt(1),
    name: "Welcome Series",
    channel: "WhatsApp",
    targetSegment: "New Customers",
    triggerType: "signup",
    status: "active",
    createdAt: BigInt(Date.now() * 1_000_000),
    sentCount: BigInt(38),
  },
  {
    id: BigInt(2),
    name: "Diwali Special Offer",
    channel: "Email",
    targetSegment: "Loyal Customers",
    triggerType: "festival",
    status: "active",
    createdAt: BigInt(Date.now() * 1_000_000),
    sentCount: BigInt(89),
  },
  {
    id: BigInt(3),
    name: "30-Day Reactivation",
    channel: "SMS",
    targetSegment: "At Risk",
    triggerType: "inactivity",
    status: "paused",
    createdAt: BigInt(Date.now() * 1_000_000),
    sentCount: BigInt(21),
  },
  {
    id: BigInt(4),
    name: "Reorder Reminder",
    channel: "WhatsApp",
    targetSegment: "All Customers",
    triggerType: "reorder",
    status: "draft",
    createdAt: BigInt(Date.now() * 1_000_000),
    sentCount: BigInt(0),
  },
];

const STATUS_STYLES: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  paused: "bg-amber-100 text-amber-700",
  draft: "bg-gray-100 text-gray-600",
};

const CHANNEL_STYLES: Record<string, string> = {
  WhatsApp: "bg-green-50 text-green-700 border-green-200",
  Email: "bg-blue-50 text-blue-700 border-blue-200",
  SMS: "bg-purple-50 text-purple-700 border-purple-200",
};

export default function CrmCampaignsPage() {
  const { actor, isFetching } = useActor();
  const navigate = useNavigate();
  const [role, setRole] = useState<CrmRole | null>(getCrmSession);
  const [campaigns, setCampaigns] = useState<CrmCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCampaignOpen, setNewCampaignOpen] = useState(false);

  // New campaign form
  const [newName, setNewName] = useState("");
  const [newChannel, setNewChannel] = useState("WhatsApp");
  const [newSegment, setNewSegment] = useState("New Customers");
  const [newTrigger, setNewTrigger] = useState("signup");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    document.title = "Campaigns | CRM | Choudhary Aunty";
    if (!role || (role !== "admin" && role !== "crm-manager")) {
      navigate({ to: "/crm" });
    }
  }, [role, navigate]);

  useEffect(() => {
    if (!actor || isFetching) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const result = await actor.getAllCampaigns();
        setCampaigns(result.length > 0 ? result : MOCK_CAMPAIGNS);
      } catch {
        setCampaigns(MOCK_CAMPAIGNS);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [actor, isFetching]);

  async function handleToggleStatus(campaign: CrmCampaign) {
    const newStatus = campaign.status === "active" ? "paused" : "active";
    try {
      if (actor) {
        await actor.updateCampaignStatus(campaign.id, newStatus);
      }
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === campaign.id ? { ...c, status: newStatus } : c,
        ),
      );
      toast.success(`Campaign ${newStatus}`);
    } catch {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === campaign.id ? { ...c, status: newStatus } : c,
        ),
      );
    }
  }

  async function handleCreateCampaign() {
    if (!newName.trim()) {
      toast.error("Campaign name required");
      return;
    }
    setIsCreating(true);
    try {
      let newId: bigint = BigInt(Date.now());
      if (actor) {
        newId = await actor.createCampaign(
          newName,
          newChannel,
          newSegment,
          newTrigger,
        );
      }
      const newCampaign: CrmCampaign = {
        id: newId,
        name: newName,
        channel: newChannel,
        targetSegment: newSegment,
        triggerType: newTrigger,
        status: "draft",
        createdAt: BigInt(Date.now() * 1_000_000),
        sentCount: BigInt(0),
      };
      setCampaigns((prev) => [newCampaign, ...prev]);
      setNewCampaignOpen(false);
      setNewName("");
      toast.success("Campaign created!");
    } catch {
      toast.error("Failed to create campaign");
    } finally {
      setIsCreating(false);
    }
  }

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
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                Campaigns
              </h1>
              <p className="text-muted-foreground text-sm font-body">
                Build and manage marketing campaigns
              </p>
            </div>
            <Button
              onClick={() => setNewCampaignOpen(true)}
              data-ocid="crm.campaigns_new_button"
              className="bg-saffron hover:bg-terracotta text-cream font-body font-semibold rounded-xl shadow-warm"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>

          {/* Campaign List */}
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
                <Skeleton key={i} className="h-20 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {campaigns.map((c, idx) => (
                <motion.div
                  key={c.id.toString()}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  data-ocid={`crm.campaign.item.${idx + 1}`}
                  className="bg-white border border-border rounded-2xl p-5 shadow-xs hover:border-saffron/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-body font-bold text-foreground">
                          {c.name}
                        </h3>
                        <Badge
                          className={`text-xs font-body font-semibold ${STATUS_STYLES[c.status] ?? STATUS_STYLES.draft}`}
                        >
                          {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs font-body text-muted-foreground">
                        <span
                          className={`border rounded-full px-2 py-0.5 font-semibold ${CHANNEL_STYLES[c.channel] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}
                        >
                          {c.channel}
                        </span>
                        <span>→ {c.targetSegment}</span>
                        <span>• Trigger: {c.triggerType}</span>
                        <span>
                          • Sent: {Number(c.sentCount).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                    {/* Toggle */}
                    <Switch
                      checked={c.status === "active"}
                      onCheckedChange={() => handleToggleStatus(c)}
                      data-ocid={`crm.campaign.toggle.${idx + 1}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Automation templates */}
          <div className="bg-white border border-border rounded-2xl p-5 shadow-xs">
            <h2 className="font-display font-bold text-lg text-foreground mb-4">
              📋 Automation Templates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  name: "Welcome New Customer",
                  channel: "WhatsApp",
                  desc: "Sent immediately after first signup",
                  icon: "🎉",
                },
                {
                  name: "Cart Abandonment",
                  channel: "WhatsApp",
                  desc: "Product viewed but no order placed",
                  icon: "🛒",
                },
                {
                  name: "Festival Greetings",
                  channel: "Email + WhatsApp",
                  desc: "Seasonal product recommendations",
                  icon: "🪔",
                },
                {
                  name: "Post-Purchase Review",
                  channel: "WhatsApp",
                  desc: "3 days after order delivery",
                  icon: "⭐",
                },
              ].map((template, tIdx) => (
                <button
                  key={template.name}
                  type="button"
                  data-ocid={`crm.template.item.${tIdx + 1}`}
                  className="border-2 border-dashed border-saffron/20 rounded-xl p-4 flex items-start gap-3 hover:border-saffron/40 transition-colors cursor-pointer text-left w-full"
                  onClick={() => {
                    setNewName(template.name);
                    setNewChannel(template.channel.split(" + ")[0]);
                    setNewCampaignOpen(true);
                  }}
                >
                  <span className="text-2xl">{template.icon}</span>
                  <div>
                    <p className="font-body font-semibold text-sm text-foreground">
                      {template.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-body">
                      {template.desc}
                    </p>
                    <span className="text-[10px] text-saffron font-body font-semibold mt-1 block">
                      {template.channel}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Campaign Modal */}
      <Dialog open={newCampaignOpen} onOpenChange={setNewCampaignOpen}>
        <DialogContent
          className="max-w-md rounded-3xl"
          data-ocid="crm.new_campaign_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Create New Campaign
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label className="font-body text-sm font-semibold mb-1.5 block">
                Campaign Name
              </Label>
              <Input
                placeholder="e.g. Diwali Sweets Offer"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                data-ocid="crm.campaign_name_input"
                className="font-body rounded-xl"
              />
            </div>
            <div>
              <Label className="font-body text-sm font-semibold mb-1.5 block">
                Channel
              </Label>
              <Select value={newChannel} onValueChange={setNewChannel}>
                <SelectTrigger
                  className="font-body rounded-xl"
                  data-ocid="crm.campaign_channel_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["WhatsApp", "Email", "SMS"].map((ch) => (
                    <SelectItem key={ch} value={ch} className="font-body">
                      {ch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-body text-sm font-semibold mb-1.5 block">
                Target Segment
              </Label>
              <Select value={newSegment} onValueChange={setNewSegment}>
                <SelectTrigger
                  className="font-body rounded-xl"
                  data-ocid="crm.campaign_segment_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "All Customers",
                    "New Customers",
                    "Loyal Customers",
                    "At Risk",
                    "Champions",
                    "Potential Loyalists",
                    "Spicy Food Lovers",
                    "Sweet Lovers",
                    "Low Oil Eaters",
                  ].map((seg) => (
                    <SelectItem key={seg} value={seg} className="font-body">
                      {seg}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-body text-sm font-semibold mb-1.5 block">
                Trigger Type
              </Label>
              <Select value={newTrigger} onValueChange={setNewTrigger}>
                <SelectTrigger
                  className="font-body rounded-xl"
                  data-ocid="crm.campaign_trigger_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "signup",
                    "reorder",
                    "inactivity",
                    "festival",
                    "cart-abandon",
                    "post-purchase",
                    "manual",
                  ].map((t) => (
                    <SelectItem key={t} value={t} className="font-body">
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setNewCampaignOpen(false)}
                data-ocid="crm.campaign_cancel_button"
                className="flex-1 font-body rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateCampaign}
                disabled={isCreating}
                data-ocid="crm.campaign_create_button"
                className="flex-1 bg-saffron hover:bg-terracotta text-cream font-body font-semibold rounded-xl"
              >
                {isCreating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Create Campaign"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CrmSidebar, clearCrmSession, getCrmSession } from "./CrmLayout";
import type { CrmRole } from "./CrmLayout";

export default function CrmSettingsPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<CrmRole | null>(getCrmSession);
  const [whatsappNotif, setWhatsappNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);
  const [rfmAuto, setRfmAuto] = useState(true);
  const [rewardRate, setRewardRate] = useState("50");

  useEffect(() => {
    document.title = "Settings | CRM | Choudhary Aunty";
    if (role !== "admin") {
      navigate({ to: "/crm" });
    }
  }, [role, navigate]);

  if (!role || role !== "admin") return null;

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
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              CRM Settings
            </h1>
            <p className="text-muted-foreground text-sm font-body">
              Configure platform-wide CRM behaviour
            </p>
          </div>

          {/* Notifications */}
          <div className="bg-white border border-border rounded-2xl p-6 shadow-xs">
            <h2 className="font-display font-bold text-lg mb-4 text-foreground">
              📬 Notification Channels
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-semibold text-sm text-foreground">
                    WhatsApp Notifications
                  </p>
                  <p className="text-xs text-muted-foreground font-body">
                    Send order updates & promotions via WhatsApp
                  </p>
                </div>
                <Switch
                  checked={whatsappNotif}
                  onCheckedChange={setWhatsappNotif}
                  data-ocid="crm.settings_whatsapp_switch"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-semibold text-sm text-foreground">
                    Email Notifications
                  </p>
                  <p className="text-xs text-muted-foreground font-body">
                    Send newsletters & order confirmations via email
                  </p>
                </div>
                <Switch
                  checked={emailNotif}
                  onCheckedChange={setEmailNotif}
                  data-ocid="crm.settings_email_switch"
                />
              </div>
            </div>
          </div>

          {/* Loyalty Settings */}
          <div className="bg-white border border-border rounded-2xl p-6 shadow-xs">
            <h2 className="font-display font-bold text-lg mb-4 text-foreground">
              🪙 Asharfi Loyalty Settings
            </h2>
            <div className="space-y-4">
              <div>
                <Label className="font-body text-sm font-semibold mb-1.5 block">
                  Asharfi per ₹100 Order Value
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={rewardRate}
                    onChange={(e) => setRewardRate(e.target.value)}
                    className="w-32 font-body rounded-xl"
                    data-ocid="crm.settings_reward_rate_input"
                  />
                  <span className="text-sm font-body text-muted-foreground">
                    points per ₹100
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-semibold text-sm text-foreground">
                    Auto RFM Segmentation
                  </p>
                  <p className="text-xs text-muted-foreground font-body">
                    Automatically update customer segments weekly
                  </p>
                </div>
                <Switch
                  checked={rfmAuto}
                  onCheckedChange={setRfmAuto}
                  data-ocid="crm.settings_rfm_switch"
                />
              </div>
            </div>
          </div>

          {/* Save */}
          <div className="flex gap-3">
            <Button
              onClick={() => toast.success("Settings saved!")}
              data-ocid="crm.settings_save_button"
              className="bg-saffron hover:bg-terracotta text-cream font-body font-semibold rounded-xl shadow-warm"
            >
              Save Settings
            </Button>
            <Button
              variant="outline"
              className="font-body rounded-xl"
              data-ocid="crm.settings_cancel_button"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

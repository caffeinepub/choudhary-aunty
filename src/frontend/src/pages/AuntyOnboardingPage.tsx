import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ChefHat, Heart, Lock, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ── Indian States list ──────────────────────────────────────────────
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh",
];

const FOOD_TYPES = [
  "Achar/Pickles",
  "Sweets/Mithai",
  "Namkeen/Snacks",
  "Papad",
  "Masala/Spices",
  "Pahadi/Regional",
  "Curry Bases",
  "Festive Specials",
  "Other",
];

// ── Password Gate ────────────────────────────────────────────────────
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
        <Card className="border-border shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="w-14 h-14 rounded-full bg-saffron/10 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6 text-saffron" />
            </div>
            <CardTitle className="font-display text-xl text-foreground">
              Aunty Onboarding
            </CardTitle>
            <p className="text-sm text-muted-foreground font-body mt-1">
              Team access only. Enter your password to continue.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="gate-password" className="font-body text-sm">
                  Password
                </Label>
                <Input
                  id="gate-password"
                  type="password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="Enter password"
                  data-ocid="onboarding.input"
                  className={err ? "border-destructive" : ""}
                  autoFocus
                />
                {err && (
                  <p
                    className="text-xs text-destructive font-body"
                    data-ocid="onboarding.error_state"
                  >
                    Incorrect password. Try again.
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-saffron hover:bg-terracotta text-cream font-body"
                data-ocid="onboarding.submit_button"
              >
                Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}

// ── Form types ───────────────────────────────────────────────────────
interface AuntyFormData {
  // Section 1 — Personal
  fullName: string;
  dob: string;
  marriageDate: string;
  familyMembers: string;
  earningMembers: string;
  currentCity: string;
  currentState: string;
  birthCity: string;
  birthState: string;
  mailingAddress: string;
  education: string;
  hasWhatsapp: string;
  // Section 2 — Kitchen
  dishes: string[];
  foodTypes: string[];
  sellingElsewhere: string;
  sellingPlatforms: string;
  inWhatsappGroups: string;
  whatsappGroupNames: string;
  // Section 3 — Social Media
  instagramHandle: string;
  instagramFollowers: string;
  facebookHandle: string;
  facebookFollowers: string;
  youtubeHandle: string;
  youtubeFollowers: string;
  waBusinessHandle: string;
  waBusinessFollowers: string;
  otherPlatform: string;
  otherFollowers: string;
  // Section 4 — Verification
  hasBankAccount: string;
  willSendSample: string;
  courierMethod: string;
  canVouch10: string;
  familyJoinCall: string;
  familyMemberName: string;
  familyCaretaker: string;
  appHelper: string;
  // Section 5 — Story
  wish1: string;
  wish2: string;
  wish3: string;
  lifeStory: string;
}

const INITIAL_FORM: AuntyFormData = {
  fullName: "",
  dob: "",
  marriageDate: "",
  familyMembers: "",
  earningMembers: "",
  currentCity: "",
  currentState: "",
  birthCity: "",
  birthState: "",
  mailingAddress: "",
  education: "",
  hasWhatsapp: "",
  dishes: Array(10).fill(""),
  foodTypes: [],
  sellingElsewhere: "",
  sellingPlatforms: "",
  inWhatsappGroups: "",
  whatsappGroupNames: "",
  instagramHandle: "",
  instagramFollowers: "",
  facebookHandle: "",
  facebookFollowers: "",
  youtubeHandle: "",
  youtubeFollowers: "",
  waBusinessHandle: "",
  waBusinessFollowers: "",
  otherPlatform: "",
  otherFollowers: "",
  hasBankAccount: "",
  willSendSample: "",
  courierMethod: "",
  canVouch10: "",
  familyJoinCall: "",
  familyMemberName: "",
  familyCaretaker: "",
  appHelper: "",
  wish1: "",
  wish2: "",
  wish3: "",
  lifeStory: "",
};

// ── Main Form ────────────────────────────────────────────────────────
function OnboardingForm() {
  const [form, setForm] = useState<AuntyFormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  function set(field: keyof AuntyFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function setDish(idx: number, val: string) {
    setForm((prev) => {
      const dishes = [...prev.dishes];
      dishes[idx] = val;
      return { ...prev, dishes };
    });
  }

  function toggleFoodType(type: string) {
    setForm((prev) => {
      const has = prev.foodTypes.includes(type);
      return {
        ...prev,
        foodTypes: has
          ? prev.foodTypes.filter((t) => t !== type)
          : [...prev.foodTypes, type],
      };
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fullName.trim()) {
      toast.error("Please enter the aunty's full name before submitting.");
      setActiveTab("personal");
      return;
    }
    const existing = JSON.parse(
      localStorage.getItem("aunty_submissions") || "[]",
    );
    const entry = {
      ...form,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    localStorage.setItem(
      "aunty_submissions",
      JSON.stringify([...existing, entry]),
    );
    toast.success(`${form.fullName}'s profile saved successfully!`);
    setSubmitted(true);
  }

  function handleReset() {
    setForm(INITIAL_FORM);
    setSubmitted(false);
    setActiveTab("personal");
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-4"
        data-ocid="onboarding.success_state"
      >
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="font-display text-2xl text-foreground mb-2">
          Profile Saved!
        </h2>
        <p className="text-muted-foreground font-body mb-6 max-w-sm mx-auto">
          {form.fullName}'s onboarding profile has been recorded. You can view
          it in the Aunty Registry.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button
            onClick={handleReset}
            className="bg-saffron hover:bg-terracotta text-cream font-body"
            data-ocid="onboarding.primary_button"
          >
            Add Another Aunty
          </Button>
          <a href="/aunty-registry">
            <Button
              variant="outline"
              className="font-body"
              data-ocid="onboarding.secondary_button"
            >
              View Registry
            </Button>
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 sm:grid-cols-5 w-full h-auto gap-1 p-1 bg-muted rounded-xl mb-6">
          {[
            { value: "personal", label: "Personal" },
            { value: "kitchen", label: "Kitchen" },
            { value: "social", label: "Social" },
            { value: "verify", label: "Verify" },
            { value: "story", label: "Story" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              data-ocid={`onboarding.${tab.value}.tab`}
              className="text-xs sm:text-sm font-body py-2 rounded-lg"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── Section 1: Personal Info ── */}
        <TabsContent value="personal" className="space-y-4 mt-0">
          <SectionHeader
            title="Personal Information"
            subtitle="Basic details collected on the onboarding call"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="font-body text-sm font-medium">
                Full Name *
              </Label>
              <Input
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                placeholder="e.g. Sunita Devi Sharma"
                data-ocid="onboarding.personal.input"
                required
              />
            </div>
            <FieldGroup label="Date of Birth">
              <Input
                type="date"
                value={form.dob}
                onChange={(e) => set("dob", e.target.value)}
                data-ocid="onboarding.dob.input"
              />
            </FieldGroup>
            <FieldGroup label="Marriage Date">
              <Input
                type="date"
                value={form.marriageDate}
                onChange={(e) => set("marriageDate", e.target.value)}
                data-ocid="onboarding.marriage.input"
              />
            </FieldGroup>
            <FieldGroup label="Number of Family Members">
              <Input
                type="number"
                min="1"
                value={form.familyMembers}
                onChange={(e) => set("familyMembers", e.target.value)}
                placeholder="e.g. 5"
                data-ocid="onboarding.family.input"
              />
            </FieldGroup>
            <FieldGroup label="Number of Earning Members">
              <Input
                type="number"
                min="0"
                value={form.earningMembers}
                onChange={(e) => set("earningMembers", e.target.value)}
                placeholder="e.g. 1"
                data-ocid="onboarding.earning.input"
              />
            </FieldGroup>
            <FieldGroup label="Current City">
              <Input
                value={form.currentCity}
                onChange={(e) => set("currentCity", e.target.value)}
                placeholder="e.g. Patna"
                data-ocid="onboarding.city.input"
              />
            </FieldGroup>
            <FieldGroup label="Current State">
              <StateSelect
                value={form.currentState}
                onChange={(v) => set("currentState", v)}
                id="onboarding.current_state.select"
              />
            </FieldGroup>
            <FieldGroup label="Birth City">
              <Input
                value={form.birthCity}
                onChange={(e) => set("birthCity", e.target.value)}
                placeholder="e.g. Gaya"
                data-ocid="onboarding.birthcity.input"
              />
            </FieldGroup>
            <FieldGroup label="Birth State">
              <StateSelect
                value={form.birthState}
                onChange={(v) => set("birthState", v)}
                id="onboarding.birth_state.select"
              />
            </FieldGroup>
            <FieldGroup label="Education Status">
              <Select
                value={form.education}
                onValueChange={(v) => set("education", v)}
              >
                <SelectTrigger data-ocid="onboarding.education.select">
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Primary",
                    "Secondary",
                    "Graduate",
                    "Post Graduate",
                    "Other",
                  ].map((e) => (
                    <SelectItem key={e} value={e}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldGroup>
            <FieldGroup label="WhatsApp Available?">
              <RadioGroup
                value={form.hasWhatsapp}
                onChange={(v) => set("hasWhatsapp", v)}
                name="hasWhatsapp"
                options={["Yes", "No"]}
              />
            </FieldGroup>
            <div className="sm:col-span-2 space-y-1.5">
              <Label className="font-body text-sm font-medium">
                Complete Mailing Address
              </Label>
              <Textarea
                value={form.mailingAddress}
                onChange={(e) => set("mailingAddress", e.target.value)}
                placeholder="House/flat no, street, area, city, state, PIN"
                rows={3}
                data-ocid="onboarding.address.textarea"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-sm font-medium">
                Personal Photo
              </Label>
              <label
                className="flex items-center gap-2 border border-dashed border-border rounded-lg p-3 cursor-pointer hover:border-saffron transition-colors"
                data-ocid="onboarding.photo.upload_button"
              >
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-body">
                  Upload latest personal photo
                </span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-sm font-medium">
                Memory Photos (up to 3)
              </Label>
              <label
                className="flex items-center gap-2 border border-dashed border-border rounded-lg p-3 cursor-pointer hover:border-saffron transition-colors"
                data-ocid="onboarding.memories.upload_button"
              >
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-body">
                  Marriage, family, struggle stories
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button
              type="button"
              onClick={() => setActiveTab("kitchen")}
              className="bg-saffron hover:bg-terracotta text-cream font-body"
              data-ocid="onboarding.next.button"
            >
              Next: Kitchen →
            </Button>
          </div>
        </TabsContent>

        {/* ── Section 2: Kitchen & Food ── */}
        <TabsContent value="kitchen" className="space-y-5 mt-0">
          <SectionHeader
            title="Kitchen & Food"
            subtitle="What she cooks and how she sells"
          />
          <div className="space-y-3">
            <Label className="font-body text-sm font-medium">
              Top 10 Dishes She Can Cook
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {form.dishes.map((dish, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: dishes are positional (Dish 1–10)
                <div key={`dish-slot-${i}`} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-body w-14 shrink-0">
                    Dish {i + 1}
                  </span>
                  <Input
                    value={dish}
                    onChange={(e) => setDish(i, e.target.value)}
                    placeholder={`e.g. ${["Litti Chokha", "Sattu Paratha", "Aloo Chokha", "Dal Puri", "Malpua", "Thekua", "Khaja", "Chandrakala", "Balushahi", "Kheer"][i]}`}
                    data-ocid={`onboarding.dish.input.${i + 1}`}
                    className="text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2.5">
            <Label className="font-body text-sm font-medium">
              Types of Food She Prepares
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {FOOD_TYPES.map((type) => (
                <label
                  key={type}
                  htmlFor={`foodtype-${type}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    id={`foodtype-${type}`}
                    checked={form.foodTypes.includes(type)}
                    onCheckedChange={() => toggleFoodType(type)}
                    data-ocid="onboarding.foodtype.checkbox"
                  />
                  <span className="text-sm font-body">{type}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="font-body text-sm font-medium">
              Selling on Other Platforms?
            </Label>
            <RadioGroup
              value={form.sellingElsewhere}
              onChange={(v) => set("sellingElsewhere", v)}
              name="sellingElsewhere"
              options={["Yes", "No"]}
            />
            {form.sellingElsewhere === "Yes" && (
              <Input
                value={form.sellingPlatforms}
                onChange={(e) => set("sellingPlatforms", e.target.value)}
                placeholder="Which platforms? e.g. Instagram, local markets"
                data-ocid="onboarding.platforms.input"
                className="mt-2"
              />
            )}
          </div>
          <div className="space-y-2">
            <Label className="font-body text-sm font-medium">
              Part of WhatsApp Groups?
            </Label>
            <RadioGroup
              value={form.inWhatsappGroups}
              onChange={(v) => set("inWhatsappGroups", v)}
              name="inWhatsappGroups"
              options={["Yes", "No"]}
            />
            {form.inWhatsappGroups === "Yes" && (
              <Input
                value={form.whatsappGroupNames}
                onChange={(e) => set("whatsappGroupNames", e.target.value)}
                placeholder="Group names or types"
                data-ocid="onboarding.wagroups.input"
                className="mt-2"
              />
            )}
          </div>
          <div className="flex justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab("personal")}
              className="font-body"
              data-ocid="onboarding.prev.button"
            >
              ← Back
            </Button>
            <Button
              type="button"
              onClick={() => setActiveTab("social")}
              className="bg-saffron hover:bg-terracotta text-cream font-body"
              data-ocid="onboarding.next.button"
            >
              Next: Social →
            </Button>
          </div>
        </TabsContent>

        {/* ── Section 3: Social Media ── */}
        <TabsContent value="social" className="space-y-4 mt-0">
          <SectionHeader
            title="Social Media Presence"
            subtitle="Handles and follower counts across platforms"
          />
          <div className="space-y-3">
            {[
              {
                label: "Instagram",
                handleKey: "instagramHandle",
                followerKey: "instagramFollowers",
                ph: "@aunty_pickles",
              },
              {
                label: "Facebook",
                handleKey: "facebookHandle",
                followerKey: "facebookFollowers",
                ph: "facebook.com/aunty",
              },
              {
                label: "YouTube",
                handleKey: "youtubeHandle",
                followerKey: "youtubeFollowers",
                ph: "@AuntyKitchen",
              },
              {
                label: "WhatsApp Business",
                handleKey: "waBusinessHandle",
                followerKey: "waBusinessFollowers",
                ph: "+91 98765 43210",
              },
            ].map((row) => (
              <div key={row.label} className="grid grid-cols-5 gap-2 items-end">
                <div className="col-span-1 text-sm font-body text-muted-foreground pt-5">
                  {row.label}
                </div>
                <div className="col-span-2 space-y-1">
                  <Label className="text-xs font-body text-muted-foreground">
                    Handle / ID
                  </Label>
                  <Input
                    value={form[row.handleKey as keyof AuntyFormData] as string}
                    onChange={(e) =>
                      set(row.handleKey as keyof AuntyFormData, e.target.value)
                    }
                    placeholder={row.ph}
                    data-ocid={`onboarding.${row.label.toLowerCase().replace(/\s/g, "")}.input`}
                    className="text-sm"
                  />
                </div>
                <div className="col-span-2 space-y-1">
                  <Label className="text-xs font-body text-muted-foreground">
                    Followers
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={
                      form[row.followerKey as keyof AuntyFormData] as string
                    }
                    onChange={(e) =>
                      set(
                        row.followerKey as keyof AuntyFormData,
                        e.target.value,
                      )
                    }
                    placeholder="0"
                    data-ocid={`onboarding.${row.label.toLowerCase().replace(/\s/g, "")}followers.input`}
                    className="text-sm"
                  />
                </div>
              </div>
            ))}
            <div className="grid grid-cols-5 gap-2 items-end">
              <div className="col-span-1 text-sm font-body text-muted-foreground pt-5">
                Other
              </div>
              <div className="col-span-2 space-y-1">
                <Label className="text-xs font-body text-muted-foreground">
                  Platform name
                </Label>
                <Input
                  value={form.otherPlatform}
                  onChange={(e) => set("otherPlatform", e.target.value)}
                  placeholder="e.g. Pinterest"
                  data-ocid="onboarding.other_platform.input"
                  className="text-sm"
                />
              </div>
              <div className="col-span-2 space-y-1">
                <Label className="text-xs font-body text-muted-foreground">
                  Followers
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={form.otherFollowers}
                  onChange={(e) => set("otherFollowers", e.target.value)}
                  placeholder="0"
                  data-ocid="onboarding.other_followers.input"
                  className="text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab("kitchen")}
              className="font-body"
              data-ocid="onboarding.prev.button"
            >
              ← Back
            </Button>
            <Button
              type="button"
              onClick={() => setActiveTab("verify")}
              className="bg-saffron hover:bg-terracotta text-cream font-body"
              data-ocid="onboarding.next.button"
            >
              Next: Verify →
            </Button>
          </div>
        </TabsContent>

        {/* ── Section 4: Verification ── */}
        <TabsContent value="verify" className="space-y-4 mt-0">
          <SectionHeader
            title="Verification Checklist"
            subtitle="Key eligibility and trust verification questions"
          />
          <div className="space-y-4">
            <VerifyRow
              label="Bank account in own name?"
              value={form.hasBankAccount}
              onChange={(v) => set("hasBankAccount", v)}
              name="bankAccount"
            />
            <div className="space-y-2">
              <VerifyRow
                label="Will send product sample for approval?"
                value={form.willSendSample}
                onChange={(v) => set("willSendSample", v)}
                name="sendSample"
              />
              {form.willSendSample === "Yes" && (
                <Input
                  value={form.courierMethod}
                  onChange={(e) => set("courierMethod", e.target.value)}
                  placeholder="How will you courier it? (e.g. Speed Post, DTDC)"
                  data-ocid="onboarding.courier.input"
                />
              )}
            </div>
            <div className="space-y-1">
              <VerifyRow
                label="Can 10 people vouch for her products?"
                value={form.canVouch10}
                onChange={(v) => set("canVouch10", v)}
                name="vouch10"
              />
              <p className="text-xs text-muted-foreground font-body ml-1">
                We'll send them a WhatsApp poll to verify.
              </p>
            </div>
            <div className="space-y-2">
              <VerifyRow
                label="Can a family member join video call training?"
                value={form.familyJoinCall}
                onChange={(v) => set("familyJoinCall", v)}
                name="familyCall"
              />
              {form.familyJoinCall === "Yes" && (
                <Input
                  value={form.familyMemberName}
                  onChange={(e) => set("familyMemberName", e.target.value)}
                  placeholder="Who will join? (name and relation)"
                  data-ocid="onboarding.familymember.input"
                />
              )}
            </div>
            <FieldGroup label="Who is taking care of the family while she works?">
              <Input
                value={form.familyCaretaker}
                onChange={(e) => set("familyCaretaker", e.target.value)}
                placeholder="e.g. Her husband, mother-in-law"
                data-ocid="onboarding.caretaker.input"
              />
            </FieldGroup>
            <FieldGroup label="Who at home helps her understand the app?">
              <Input
                value={form.appHelper}
                onChange={(e) => set("appHelper", e.target.value)}
                placeholder="e.g. Her son, daughter"
                data-ocid="onboarding.apphelper.input"
              />
            </FieldGroup>
          </div>
          <div className="flex justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab("social")}
              className="font-body"
              data-ocid="onboarding.prev.button"
            >
              ← Back
            </Button>
            <Button
              type="button"
              onClick={() => setActiveTab("story")}
              className="bg-saffron hover:bg-terracotta text-cream font-body"
              data-ocid="onboarding.next.button"
            >
              Next: Story →
            </Button>
          </div>
        </TabsContent>

        {/* ── Section 5: Life Story & Dreams ── */}
        <TabsContent value="story" className="space-y-4 mt-0">
          <SectionHeader
            title="Life Story & Dreams"
            subtitle="Her journey, wishes, and personal narrative"
          />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-body text-sm font-medium">
                Her 3 Wishes from These Earnings
              </Label>
              {[
                { key: "wish1", ph: "e.g. Educate my children", n: 1 },
                { key: "wish2", ph: "e.g. Build our own home", n: 2 },
                { key: "wish3", ph: "e.g. Be financially independent", n: 3 },
              ].map(({ key, ph, n }) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-body w-12 shrink-0">
                    Wish {n}
                  </span>
                  <Input
                    value={form[key as keyof AuntyFormData] as string}
                    onChange={(e) =>
                      set(key as keyof AuntyFormData, e.target.value)
                    }
                    placeholder={ph}
                    data-ocid={`onboarding.wish.input.${n}`}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-sm font-medium">
                Her Life Story
              </Label>
              <Textarea
                value={form.lifeStory}
                onChange={(e) => set("lifeStory", e.target.value)}
                placeholder="Tell us her story in her words — her struggles, her journey, what cooking means to her, her family's reaction when she decided to start selling her food..."
                rows={8}
                data-ocid="onboarding.story.textarea"
                className="resize-none"
              />
            </div>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab("verify")}
              className="font-body"
              data-ocid="onboarding.prev.button"
            >
              ← Back
            </Button>
            <Button
              type="submit"
              className="bg-saffron hover:bg-terracotta text-cream font-body font-semibold px-8"
              data-ocid="onboarding.submit_button"
            >
              <Heart className="w-4 h-4 mr-2 fill-current" />
              Save Aunty Profile
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}

// ── Helper sub-components ─────────────────────────────────────────────
function SectionHeader({
  title,
  subtitle,
}: { title: string; subtitle: string }) {
  return (
    <div className="pb-2 mb-2 border-b border-border">
      <h2 className="font-display text-lg font-semibold text-foreground">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground font-body">{subtitle}</p>
    </div>
  );
}

function FieldGroup({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="font-body text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}

function StateSelect({
  value,
  onChange,
  id,
}: { value: string; onChange: (v: string) => void; id: string }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger data-ocid={id}>
        <SelectValue placeholder="Select state" />
      </SelectTrigger>
      <SelectContent className="max-h-60">
        {INDIAN_STATES.map((s) => (
          <SelectItem key={s} value={s}>
            {s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function RadioGroup({
  value,
  onChange,
  name,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  name: string;
  options: string[];
}) {
  return (
    <div className="flex gap-4" role="radiogroup" aria-label={name}>
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="w-4 h-4 accent-saffron"
            data-ocid={`onboarding.${name}.radio`}
          />
          <span className="text-sm font-body">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function VerifyRow({
  label,
  value,
  onChange,
  name,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2">
      <span className="text-sm font-body text-foreground flex-1">{label}</span>
      <RadioGroup
        value={value}
        onChange={onChange}
        name={name}
        options={["Yes", "No"]}
      />
    </div>
  );
}

// ── Page wrapper ──────────────────────────────────────────────────────
export default function AuntyOnboardingPage() {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <main className="min-h-screen bg-background pt-16 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <ChefHat className="w-7 h-7 text-saffron" />
            <Badge className="bg-saffron/15 text-saffron border-saffron/30 font-body text-xs">
              Team Onboarding Tool
            </Badge>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Aunty Onboarding Form
          </h1>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Fill this form while on a call with the aunty. All information is
            saved locally.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-md border-border">
            <CardContent className="p-5 sm:p-8">
              <OnboardingForm />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}

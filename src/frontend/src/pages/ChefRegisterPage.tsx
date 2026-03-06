import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { STATES, buildWhatsAppUrl } from "@/constants/images";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Camera,
  CheckCircle2,
  ChefHat,
  Heart,
  IdCard,
  IndianRupee,
  MessageCircle,
  Package,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";

interface Step1Data {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
}

interface Step2Data {
  kitchenAddress: string;
  cuisineType: string;
  experienceYears: string;
  signatureDishes: string;
  whyJoin: string;
}

interface Step3Data {
  hygieneChecks: boolean[];
}

const CUISINE_TYPES = [
  { value: "pickles_achar", label: "Pickles & Achar" },
  { value: "sweets_mithai", label: "Sweets & Mithai" },
  { value: "namkeen_snacks", label: "Namkeen & Snacks" },
  { value: "chutneys", label: "Chutneys & Preserves" },
  { value: "masala_spices", label: "Masala & Spices" },
  { value: "mixed_regional", label: "Mixed / Regional Specialties" },
];

const HYGIENE_ITEMS = [
  "I cook in a clean, dedicated kitchen area",
  "I use fresh, quality ingredients for every batch",
  "My kitchen and utensils are regularly cleaned and sanitized",
  "I follow proper food safety and storage practices",
  "I have no known health conditions that could affect food safety",
];

const BENEFITS = [
  {
    icon: Users,
    title: "Your Own Profile Page",
    desc: "A beautiful dedicated page showcasing your story, photos, and products — visible to thousands of customers across India.",
    color: "text-saffron",
    bg: "bg-saffron/10",
  },
  {
    icon: Package,
    title: "We Handle Logistics",
    desc: "Don't worry about packaging or courier. We manage the entire delivery process so you can focus on what you love — cooking.",
    color: "text-terracotta",
    bg: "bg-terracotta/10",
  },
  {
    icon: IndianRupee,
    title: "Payment Collected for You",
    desc: "We collect 50% advance from customers upfront and transfer your earnings directly. No chasing payments, ever.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: TrendingUp,
    title: "Marketing Support",
    desc: "We promote your story on Instagram, WhatsApp groups, and our blog. Your recipes reach customers you'd never find alone.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Award,
    title: "Advance Payment Guarantee",
    desc: "Every order comes with a 50% advance. Your ingredients are always covered before you start cooking. Zero financial risk.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Heart,
    title: "Pride & Recognition",
    desc: "Join a community of celebrated home cooks. Your name, your story, your legacy — displayed with the respect you deserve.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Tell Us About Yourself",
    desc: "Fill this form. Tell us about your cooking, your specialty, and what makes your kitchen special.",
  },
  {
    step: "02",
    title: "Send Us Samples",
    desc: "We'll contact you via WhatsApp to arrange a sample tasting. We want to experience your food before listing it.",
  },
  {
    step: "03",
    title: "We Create Your Profile",
    desc: "Our team photographs your food and writes your story. You approve everything before it goes live.",
  },
  {
    step: "04",
    title: "Start Earning",
    desc: "Orders start coming in. We handle logistics and payments. You cook, we do the rest.",
  },
];

const STEP_LABELS = ["Personal Info", "Kitchen Details", "Verification"];

// ── Progress Bar Component ──
function StepProgress({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="mb-8" data-ocid="chef_register.step_progress">
      <div className="flex items-center justify-between mb-3">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex-1 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-body transition-all duration-300 border-2 ${
                i + 1 < currentStep
                  ? "bg-green-600 border-green-600 text-white"
                  : i + 1 === currentStep
                    ? "bg-saffron border-saffron text-cream"
                    : "bg-background border-border text-muted-foreground"
              }`}
            >
              {i + 1 < currentStep ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`text-[10px] font-body mt-1.5 text-center hidden sm:block ${
                i + 1 === currentStep
                  ? "text-saffron font-semibold"
                  : i + 1 < currentStep
                    ? "text-green-600"
                    : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
            {i < totalSteps - 1 && (
              <div className="absolute hidden" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
      {/* Connecting line */}
      <div className="relative flex items-center mt-1">
        <div className="h-1 w-full bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-saffron rounded-full transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
          />
        </div>
      </div>
      <p className="text-xs font-body text-muted-foreground mt-2 text-center">
        Step {currentStep} of {totalSteps} —{" "}
        <span className="text-saffron font-semibold">
          {STEP_LABELS[currentStep - 1]}
        </span>
      </p>
    </div>
  );
}

// ── Profile Preview Card (shown on Step 3) ──
function ProfilePreviewCard({
  step1,
  step2,
}: {
  step1: Step1Data;
  step2: Step2Data;
}) {
  const cuisineLabel =
    CUISINE_TYPES.find((c) => c.value === step2.cuisineType)?.label ??
    step2.cuisineType;

  return (
    <div className="bg-gradient-to-br from-saffron/5 to-terracotta/5 rounded-2xl border border-saffron/20 p-5 mb-5">
      <p className="text-xs font-body text-muted-foreground uppercase tracking-widest mb-3">
        Your profile will look like this:
      </p>
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 rounded-2xl bg-saffron/15 flex items-center justify-center shrink-0">
          <ChefHat className="w-7 h-7 text-saffron" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-display font-bold text-foreground text-base leading-tight">
              {step1.fullName || "Your Name"}
            </h4>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold font-body bg-green-100 text-green-700 border border-green-200">
              <ShieldCheck className="w-2.5 h-2.5" />
              Verified
            </span>
          </div>
          <p className="font-body text-xs text-muted-foreground mt-0.5">
            {step1.city || "Your City"}, {step1.state || "Your State"}
          </p>
          {cuisineLabel && (
            <Badge
              variant="outline"
              className="mt-1.5 text-[10px] font-body border-saffron/30 text-saffron"
            >
              {cuisineLabel}
            </Badge>
          )}
          {step2.signatureDishes && (
            <p className="text-xs font-body text-foreground/70 mt-1.5 line-clamp-1">
              🍽️ {step2.signatureDishes}
            </p>
          )}
          <div className="flex items-center gap-1 mt-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3 h-3 text-saffron fill-saffron" />
            ))}
            <span className="text-[10px] font-body text-muted-foreground ml-1">
              New Partner
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChefRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [step1, setStep1] = useState<Step1Data>({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    state: "",
  });

  const [step2, setStep2] = useState<Step2Data>({
    kitchenAddress: "",
    cuisineType: "",
    experienceYears: "",
    signatureDishes: "",
    whyJoin: "",
  });

  const [step3, setStep3] = useState<Step3Data>({
    hygieneChecks: Array(HYGIENE_ITEMS.length).fill(false),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.title =
      "Become a Chef Partner | Choudhary Aunty — Join Our Family";
  }, []);

  function validateStep1(): boolean {
    const errs: Record<string, string> = {};
    if (!step1.fullName.trim()) errs.fullName = "Full name is required";
    if (!step1.phone.trim()) errs.phone = "Phone number is required";
    if (!step1.city.trim()) errs.city = "City is required";
    if (!step1.state) errs.state = "Please select your state";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep2(): boolean {
    const errs: Record<string, string> = {};
    if (!step2.kitchenAddress.trim())
      errs.kitchenAddress = "Kitchen address is required";
    if (!step2.cuisineType)
      errs.cuisineType = "Please select your cuisine type";
    if (!step2.signatureDishes.trim())
      errs.signatureDishes = "Please list your signature dishes";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleNext() {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const allHygieneChecked = step3.hygieneChecks.every(Boolean);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allHygieneChecked) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const cuisineLabel =
    CUISINE_TYPES.find((c) => c.value === step2.cuisineType)?.label ??
    step2.cuisineType;

  const whatsappText = [
    "🙏 Namaskar! I want to join Choudhary Aunty as a Chef Partner.",
    "",
    "*Step 1 — My Details:*",
    `👩‍🍳 Name: ${step1.fullName}`,
    `📞 Phone: ${step1.phone}`,
    step1.email ? `📧 Email: ${step1.email}` : null,
    `📍 City & State: ${step1.city}, ${step1.state}`,
    "",
    "*Step 2 — Kitchen Details:*",
    `🏠 Kitchen Address: ${step2.kitchenAddress}`,
    `🍽️ Cuisine Type: ${cuisineLabel}`,
    step2.experienceYears
      ? `⏰ Experience: ${step2.experienceYears} years of cooking`
      : null,
    "",
    "*My Signature Dishes:*",
    step2.signatureDishes,
    step2.whyJoin ? `\n*Why I Want to Join:*\n${step2.whyJoin}` : null,
    "",
    "*Step 3 — Verification:*",
    "✅ Self-certified hygiene checklist completed",
    "📷 Kitchen photos & ID to be shared via WhatsApp",
    "",
    "Looking forward to hearing from you! 🙏",
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappUrl = buildWhatsAppUrl(whatsappText);

  return (
    <main className="min-h-screen pt-16">
      {/* ===== HERO ===== */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-saffron/8 blur-3xl" />
          <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-terracotta/8 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/30 text-saffron text-xs font-semibold font-body px-4 py-2 rounded-full mb-6">
              <ChefHat className="w-3.5 h-3.5" />
              Chef Partner Programme
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Join the{" "}
              <span className="text-saffron italic">Choudhary Aunty</span>{" "}
              Family
            </h1>
            <p className="text-muted-foreground font-body text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-4">
              Turn your kitchen into a business. Share your recipes with India.
              Earn with dignity from the comfort of your own home.
            </p>
            <p className="font-display text-lg italic text-saffron">
              "Sapne kabhi bhi old nahin hote" — Dreams have no age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-10">
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Simple 4-Step Process
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-2">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-saffron/10 border border-saffron/20 flex items-center justify-center mx-auto mb-4">
                  <span className="font-display font-bold text-xl text-saffron">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="py-12 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* ── Wizard (or Success Screen) ── */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-2xl border border-saffron/30 p-8 text-center shadow-warm"
                  data-ocid="chef_register.success_state"
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
                    Bahut Shukriya! 🙏
                  </h2>
                  <p className="font-display text-lg italic text-saffron mb-2">
                    Thank You, {step1.fullName.split(" ")[0]}!
                  </p>
                  <p className="text-muted-foreground font-body mb-8 leading-relaxed">
                    Your application has been received. The next step is to send
                    us a WhatsApp message so our team can get in touch with you
                    directly. Please tap the button below.
                  </p>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="chef_register.whatsapp_button"
                    className="inline-flex items-center gap-3 bg-[#25d366] hover:bg-[#1da851] text-white font-bold text-base px-8 py-4 rounded-2xl transition-colors font-body shadow-lg mb-6"
                  >
                    <SiWhatsapp className="w-5 h-5" />
                    Complete My Application on WhatsApp
                  </a>

                  <p className="text-xs font-body text-muted-foreground mb-6">
                    Tapping this will open WhatsApp with your application
                    pre-filled. Just hit send!
                  </p>

                  <div className="border-t border-border pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setCurrentStep(1);
                        setStep1({
                          fullName: "",
                          phone: "",
                          email: "",
                          city: "",
                          state: "",
                        });
                        setStep2({
                          kitchenAddress: "",
                          cuisineType: "",
                          experienceYears: "",
                          signatureDishes: "",
                          whyJoin: "",
                        });
                        setStep3({
                          hygieneChecks: Array(HYGIENE_ITEMS.length).fill(
                            false,
                          ),
                        });
                      }}
                      className="text-sm font-body text-saffron hover:text-terracotta transition-colors"
                    >
                      Submit another application
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-6">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                      Apply to Become a Chef Partner
                    </h2>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">
                      Fill in your details below. We review every application
                      personally and will contact you within 48 hours.
                    </p>
                  </div>

                  <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-xs">
                    <StepProgress currentStep={currentStep} totalSteps={3} />

                    <AnimatePresence mode="wait">
                      {/* ── STEP 1: Personal Info ── */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div
                            className="space-y-5"
                            data-ocid="chef_register.form"
                          >
                            {/* Full Name */}
                            <div>
                              <Label className="font-body text-sm font-semibold mb-2 block">
                                Full Name{" "}
                                <span className="text-destructive">*</span>
                              </Label>
                              <Input
                                value={step1.fullName}
                                onChange={(e) =>
                                  setStep1((p) => ({
                                    ...p,
                                    fullName: e.target.value,
                                  }))
                                }
                                placeholder="e.g. Sunita Devi"
                                className="font-body"
                                data-ocid="chef_register.name_input"
                                autoComplete="name"
                              />
                              {errors.fullName && (
                                <p
                                  className="text-destructive text-xs mt-1 font-body"
                                  data-ocid="chef_register.name_error"
                                >
                                  {errors.fullName}
                                </p>
                              )}
                            </div>

                            {/* Phone */}
                            <div>
                              <Label className="font-body text-sm font-semibold mb-2 block">
                                Phone Number{" "}
                                <span className="text-destructive">*</span>
                              </Label>
                              <Input
                                type="tel"
                                value={step1.phone}
                                onChange={(e) =>
                                  setStep1((p) => ({
                                    ...p,
                                    phone: e.target.value,
                                  }))
                                }
                                placeholder="+91 98000 00000"
                                className="font-body"
                                data-ocid="chef_register.phone_input"
                                autoComplete="tel"
                              />
                              {errors.phone && (
                                <p
                                  className="text-destructive text-xs mt-1 font-body"
                                  data-ocid="chef_register.phone_error"
                                >
                                  {errors.phone}
                                </p>
                              )}
                            </div>

                            {/* Email */}
                            <div>
                              <Label className="font-body text-sm font-semibold mb-2 block">
                                Email Address{" "}
                                <span className="text-muted-foreground text-xs font-normal">
                                  (optional)
                                </span>
                              </Label>
                              <Input
                                type="email"
                                value={step1.email}
                                onChange={(e) =>
                                  setStep1((p) => ({
                                    ...p,
                                    email: e.target.value,
                                  }))
                                }
                                placeholder="your@email.com"
                                className="font-body"
                                data-ocid="chef_register.email_input"
                                autoComplete="email"
                              />
                            </div>

                            {/* City & State */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <Label className="font-body text-sm font-semibold mb-2 block">
                                  City{" "}
                                  <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                  value={step1.city}
                                  onChange={(e) =>
                                    setStep1((p) => ({
                                      ...p,
                                      city: e.target.value,
                                    }))
                                  }
                                  placeholder="e.g. Patna"
                                  className="font-body"
                                  data-ocid="chef_register.city_input"
                                />
                                {errors.city && (
                                  <p
                                    className="text-destructive text-xs mt-1 font-body"
                                    data-ocid="chef_register.city_error"
                                  >
                                    {errors.city}
                                  </p>
                                )}
                              </div>
                              <div>
                                <Label className="font-body text-sm font-semibold mb-2 block">
                                  State{" "}
                                  <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                  value={step1.state}
                                  onValueChange={(val) =>
                                    setStep1((p) => ({ ...p, state: val }))
                                  }
                                >
                                  <SelectTrigger
                                    className="font-body"
                                    data-ocid="chef_register.state_select"
                                  >
                                    <SelectValue placeholder="Select state" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {STATES.map((s) => (
                                      <SelectItem
                                        key={s.name}
                                        value={s.name}
                                        className="font-body"
                                      >
                                        {s.emoji} {s.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                {errors.state && (
                                  <p
                                    className="text-destructive text-xs mt-1 font-body"
                                    data-ocid="chef_register.state_error"
                                  >
                                    {errors.state}
                                  </p>
                                )}
                              </div>
                            </div>

                            <Button
                              type="button"
                              onClick={handleNext}
                              className="w-full bg-saffron hover:bg-terracotta text-cream font-bold text-base py-6 rounded-xl font-body transition-colors"
                              data-ocid="chef_register.step1_next_button"
                            >
                              Continue to Kitchen Details
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                          </div>
                        </motion.div>
                      )}

                      {/* ── STEP 2: Kitchen Details ── */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div
                            className="space-y-5"
                            data-ocid="chef_register.step2_form"
                          >
                            {/* Kitchen Address */}
                            <div>
                              <Label className="font-body text-sm font-semibold mb-2 block">
                                Kitchen / Home Address{" "}
                                <span className="text-destructive">*</span>
                              </Label>
                              <Textarea
                                value={step2.kitchenAddress}
                                onChange={(e) =>
                                  setStep2((p) => ({
                                    ...p,
                                    kitchenAddress: e.target.value,
                                  }))
                                }
                                placeholder="Full address where you prepare food..."
                                rows={3}
                                className="font-body"
                                data-ocid="chef_register.kitchen_address_textarea"
                              />
                              {errors.kitchenAddress && (
                                <p
                                  className="text-destructive text-xs mt-1 font-body"
                                  data-ocid="chef_register.kitchen_address_error"
                                >
                                  {errors.kitchenAddress}
                                </p>
                              )}
                            </div>

                            {/* Cuisine Type */}
                            <div>
                              <Label className="font-body text-sm font-semibold mb-2 block">
                                Cuisine Type{" "}
                                <span className="text-destructive">*</span>
                              </Label>
                              <Select
                                value={step2.cuisineType}
                                onValueChange={(val) =>
                                  setStep2((p) => ({
                                    ...p,
                                    cuisineType: val,
                                  }))
                                }
                              >
                                <SelectTrigger
                                  className="font-body"
                                  data-ocid="chef_register.cuisine_select"
                                >
                                  <SelectValue placeholder="Select your specialty" />
                                </SelectTrigger>
                                <SelectContent>
                                  {CUISINE_TYPES.map((c) => (
                                    <SelectItem
                                      key={c.value}
                                      value={c.value}
                                      className="font-body"
                                    >
                                      {c.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors.cuisineType && (
                                <p
                                  className="text-destructive text-xs mt-1 font-body"
                                  data-ocid="chef_register.cuisine_error"
                                >
                                  {errors.cuisineType}
                                </p>
                              )}
                            </div>

                            {/* Experience */}
                            <div>
                              <Label className="font-body text-sm font-semibold mb-2 block">
                                Years of Cooking Experience{" "}
                                <span className="text-muted-foreground text-xs font-normal">
                                  (optional)
                                </span>
                              </Label>
                              <Input
                                type="number"
                                min={1}
                                max={80}
                                value={step2.experienceYears}
                                onChange={(e) =>
                                  setStep2((p) => ({
                                    ...p,
                                    experienceYears: e.target.value,
                                  }))
                                }
                                placeholder="e.g. 25"
                                className="font-body"
                                data-ocid="chef_register.experience_input"
                              />
                            </div>

                            {/* Signature Dishes */}
                            <div>
                              <Label className="font-body text-sm font-semibold mb-2 block">
                                Signature Dishes{" "}
                                <span className="text-destructive">*</span>
                                <span className="text-muted-foreground text-xs font-normal ml-2">
                                  List 3-5 dishes you're most famous for
                                </span>
                              </Label>
                              <Textarea
                                value={step2.signatureDishes}
                                onChange={(e) =>
                                  setStep2((p) => ({
                                    ...p,
                                    signatureDishes: e.target.value,
                                  }))
                                }
                                placeholder="e.g. Aam Ka Achar, Sattu Ladoo, Tilkut, Thekua..."
                                rows={3}
                                className="font-body"
                                data-ocid="chef_register.dishes_textarea"
                              />
                              {errors.signatureDishes && (
                                <p
                                  className="text-destructive text-xs mt-1 font-body"
                                  data-ocid="chef_register.dishes_error"
                                >
                                  {errors.signatureDishes}
                                </p>
                              )}
                            </div>

                            {/* Why Join */}
                            <div>
                              <Label className="font-body text-sm font-semibold mb-2 block">
                                Why Do You Want to Join?{" "}
                                <span className="text-muted-foreground text-xs font-normal">
                                  (optional, but we love hearing your story)
                                </span>
                              </Label>
                              <Textarea
                                value={step2.whyJoin}
                                onChange={(e) =>
                                  setStep2((p) => ({
                                    ...p,
                                    whyJoin: e.target.value,
                                  }))
                                }
                                placeholder="Share your story — why do you cook, what does your kitchen mean to you..."
                                rows={4}
                                className="font-body"
                                data-ocid="chef_register.why_textarea"
                              />
                            </div>

                            <div className="flex gap-3">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={handleBack}
                                className="flex-1 font-body"
                                data-ocid="chef_register.step2_back_button"
                              >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                              </Button>
                              <Button
                                type="button"
                                onClick={handleNext}
                                className="flex-1 bg-saffron hover:bg-terracotta text-cream font-bold font-body transition-colors"
                                data-ocid="chef_register.step2_next_button"
                              >
                                Continue to Verification
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* ── STEP 3: Kitchen Verification ── */}
                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                        >
                          <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            data-ocid="chef_register.step3_form"
                          >
                            {/* Kitchen Photos Placeholder */}
                            <div>
                              <Label className="font-body text-sm font-semibold mb-2 block">
                                Kitchen Photos
                              </Label>
                              <div
                                className="border-2 border-dashed border-saffron/30 rounded-2xl p-8 text-center bg-saffron/3 hover:bg-saffron/5 transition-colors cursor-default"
                                data-ocid="chef_register.kitchen_photos_dropzone"
                              >
                                <div className="w-14 h-14 rounded-2xl bg-saffron/10 flex items-center justify-center mx-auto mb-4">
                                  <Camera className="w-7 h-7 text-saffron" />
                                </div>
                                <p className="font-body text-sm font-semibold text-foreground mb-1">
                                  Upload 2-3 photos of your kitchen
                                </p>
                                <p className="font-body text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
                                  Our team will contact you to collect photos
                                  via WhatsApp. No upload needed right now.
                                </p>
                                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-saffron/10 border border-saffron/20 rounded-full text-xs font-body text-saffron font-semibold">
                                  <SiWhatsapp className="w-3.5 h-3.5" />
                                  We'll collect via WhatsApp
                                </div>
                              </div>
                            </div>

                            {/* Hygiene Self-Certification */}
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <Shield className="w-4 h-4 text-saffron" />
                                <Label className="font-body text-sm font-semibold">
                                  Kitchen Hygiene Self-Certification{" "}
                                  <span className="text-destructive">*</span>
                                </Label>
                              </div>
                              <p className="text-xs font-body text-muted-foreground mb-4">
                                Please read and tick all boxes to confirm your
                                kitchen standards.
                              </p>
                              <div className="space-y-3 bg-muted/40 rounded-xl p-4 border border-border">
                                {HYGIENE_ITEMS.map((item, i) => (
                                  <div
                                    key={item}
                                    className="flex items-start gap-3"
                                  >
                                    <Checkbox
                                      id={`hygiene-self-${i}`}
                                      checked={step3.hygieneChecks[i]}
                                      onCheckedChange={(checked) => {
                                        setStep3((prev) => {
                                          const next = [...prev.hygieneChecks];
                                          next[i] = checked === true;
                                          return {
                                            ...prev,
                                            hygieneChecks: next,
                                          };
                                        });
                                      }}
                                      className="mt-0.5"
                                      data-ocid={`chef_register.hygiene_checkbox.${i + 1}`}
                                    />
                                    <label
                                      htmlFor={`hygiene-self-${i}`}
                                      className="font-body text-sm text-foreground/80 leading-relaxed cursor-pointer"
                                    >
                                      {item}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              {!allHygieneChecked && (
                                <p className="text-xs font-body text-amber-600 mt-2 flex items-center gap-1">
                                  <Shield className="w-3 h-3" />
                                  Please tick all 5 boxes before submitting
                                </p>
                              )}
                            </div>

                            {/* Identity Verification Placeholder */}
                            <div>
                              <Label className="font-body text-sm font-semibold mb-2 block">
                                Identity Verification
                              </Label>
                              <div
                                className="border-2 border-dashed border-blue-300/50 rounded-2xl p-6 text-center bg-blue-50/30"
                                data-ocid="chef_register.id_upload_dropzone"
                              >
                                <div className="w-12 h-12 rounded-2xl bg-blue-100/50 flex items-center justify-center mx-auto mb-3">
                                  <IdCard className="w-6 h-6 text-blue-600" />
                                </div>
                                <p className="font-body text-sm font-semibold text-foreground mb-1">
                                  Upload your Aadhaar Card or any Govt. ID
                                </p>
                                <p className="font-body text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
                                  Our team will collect this securely via
                                  WhatsApp. Your information is kept
                                  confidential.
                                </p>
                                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-blue-100/50 border border-blue-200/50 rounded-full text-xs font-body text-blue-600 font-semibold">
                                  <SiWhatsapp className="w-3.5 h-3.5" />
                                  Collected securely via WhatsApp
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-3">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={handleBack}
                                className="flex-1 font-body"
                                data-ocid="chef_register.step3_back_button"
                              >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                              </Button>
                              <Button
                                type="submit"
                                disabled={!allHygieneChecked}
                                className="flex-1 bg-saffron hover:bg-terracotta text-cream font-bold font-body transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                data-ocid="chef_register.submit_button"
                              >
                                <Sparkles className="w-4 h-4 mr-2" />
                                Submit Application
                              </Button>
                            </div>

                            <p className="text-center text-xs font-body text-muted-foreground">
                              After submitting, you'll get a WhatsApp button to
                              complete your registration with our team.
                            </p>
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="sticky top-24 space-y-5">
                  {/* Profile Preview shown only on Step 3 */}
                  {currentStep === 3 && !submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <ProfilePreviewCard step1={step1} step2={step2} />
                    </motion.div>
                  )}

                  <div className="bg-gradient-to-br from-saffron/5 to-terracotta/5 rounded-2xl border border-saffron/20 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-saffron/15 flex items-center justify-center">
                        <Star className="w-5 h-5 text-saffron fill-saffron" />
                      </div>
                      <h3 className="font-display font-bold text-foreground text-lg">
                        Why Aunties Love Us
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        "No tech skills needed",
                        "No upfront investment",
                        "Cook from your home kitchen",
                        "Guaranteed advance payments",
                        "Pan-India reach",
                        "Your story told beautifully",
                      ].map((point) => (
                        <div key={point} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                          <span className="font-body text-sm text-foreground/80">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl border border-border p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageCircle className="w-4 h-4 text-[#25d366]" />
                      <span className="font-body text-sm font-semibold text-foreground">
                        Have Questions?
                      </span>
                    </div>
                    <p className="text-muted-foreground font-body text-xs mb-4 leading-relaxed">
                      Talk directly to our team on WhatsApp. We're available
                      Mon-Sat, 10am–7pm.
                    </p>
                    <a
                      href={buildWhatsAppUrl(
                        "Hi! I want to learn more about becoming a Chef Partner on Choudhary Aunty.",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#1da851] text-white text-sm font-semibold px-4 py-2.5 rounded-xl font-body transition-colors w-full justify-center"
                      data-ocid="chef_register.enquiry_button"
                    >
                      <SiWhatsapp className="w-4 h-4" />
                      Chat with Us
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BENEFITS GRID ===== */}
      <section className="py-12 sm:py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Partner Benefits
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
              What You Get as a{" "}
              <span className="text-saffron italic">Choudhary Aunty</span>{" "}
              Partner
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-background rounded-2xl border border-border p-6 hover:shadow-warm transition-shadow"
                data-ocid={`chef_register.benefit.item.${idx + 1}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${benefit.bg} flex items-center justify-center mb-4`}
                >
                  <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-14 mesh-bg border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl mb-4">👩‍🍳</div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Ready to Share Your Kitchen with India?
            </h2>
            <p className="text-muted-foreground font-body mb-6">
              Join hundreds of women who are earning with dignity, cooking from
              home, and building something that will outlast them.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 bg-saffron hover:bg-terracotta text-cream font-bold px-8 py-3.5 rounded-full font-body transition-colors shadow-warm"
                data-ocid="chef_register.cta_button"
              >
                <ChefHat className="w-4 h-4" />
                Apply Now — It's Free
              </button>
              <Link
                to="/makers"
                className="inline-flex items-center justify-center gap-2 bg-background border border-border hover:border-saffron/50 text-foreground font-semibold px-8 py-3.5 rounded-full font-body transition-colors"
                data-ocid="chef_register.meet_makers_link"
              >
                <Users className="w-4 h-4" />
                Meet Our Makers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer-level back nav */}
      <div className="py-4 bg-background border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-saffron transition-colors"
            data-ocid="chef_register.home_link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

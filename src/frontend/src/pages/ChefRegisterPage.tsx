import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Award,
  CheckCircle2,
  ChefHat,
  Heart,
  IndianRupee,
  MessageCircle,
  Package,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";

interface ChefFormData {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  cuisineSpecialty: string;
  experienceYears: string;
  signatureDishes: string;
  whyJoin: string;
}

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

export default function ChefRegisterPage() {
  const [form, setForm] = useState<ChefFormData>({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    cuisineSpecialty: "",
    experienceYears: "",
    signatureDishes: "",
    whyJoin: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ChefFormData, string>>
  >({});

  useEffect(() => {
    document.title =
      "Become a Chef Partner | Choudhary Aunty — Join Our Family";
  }, []);

  function validate(): boolean {
    const errs: Partial<Record<keyof ChefFormData, string>> = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.state) errs.state = "State is required";
    if (!form.cuisineSpecialty.trim())
      errs.cuisineSpecialty = "Cuisine specialty is required";
    if (!form.signatureDishes.trim())
      errs.signatureDishes = "Please list your signature dishes";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const whatsappText = [
    "🙏 Namaskar! I want to join Choudhary Aunty as a Chef Partner.",
    "",
    "*My Details:*",
    `👩‍🍳 Name: ${form.fullName}`,
    `📞 Phone: ${form.phone}`,
    form.email ? `📧 Email: ${form.email}` : null,
    `📍 City & State: ${form.city}, ${form.state}`,
    `🍽️ Cuisine Specialty: ${form.cuisineSpecialty}`,
    form.experienceYears
      ? `⏰ Experience: ${form.experienceYears} years of cooking`
      : null,
    "",
    "*My Signature Dishes:*",
    form.signatureDishes,
    form.whyJoin ? `\n*Why I Want to Join:*\n${form.whyJoin}` : null,
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
            {/* ── Application Form (or Success Screen) ── */}
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
                    Thank You, {form.fullName.split(" ")[0]}!
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
                        setForm({
                          fullName: "",
                          phone: "",
                          email: "",
                          city: "",
                          state: "",
                          cuisineSpecialty: "",
                          experienceYears: "",
                          signatureDishes: "",
                          whyJoin: "",
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

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5 bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-xs"
                    data-ocid="chef_register.form"
                  >
                    {/* Full Name */}
                    <div>
                      <Label className="font-body text-sm font-semibold mb-2 block">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        value={form.fullName}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, fullName: e.target.value }))
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
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, phone: e.target.value }))
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
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
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
                          City <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          value={form.city}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, city: e.target.value }))
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
                          State <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={form.state}
                          onValueChange={(val) =>
                            setForm((p) => ({ ...p, state: val }))
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

                    {/* Cuisine Specialty */}
                    <div>
                      <Label className="font-body text-sm font-semibold mb-2 block">
                        Cuisine Specialty{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        value={form.cuisineSpecialty}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            cuisineSpecialty: e.target.value,
                          }))
                        }
                        placeholder="e.g. Bihari sweets, Pickles, Chutneys"
                        className="font-body"
                        data-ocid="chef_register.cuisine_input"
                      />
                      {errors.cuisineSpecialty && (
                        <p
                          className="text-destructive text-xs mt-1 font-body"
                          data-ocid="chef_register.cuisine_error"
                        >
                          {errors.cuisineSpecialty}
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
                        value={form.experienceYears}
                        onChange={(e) =>
                          setForm((p) => ({
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
                          List 3-5 dishes you're best known for
                        </span>
                      </Label>
                      <Textarea
                        value={form.signatureDishes}
                        onChange={(e) =>
                          setForm((p) => ({
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
                        value={form.whyJoin}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, whyJoin: e.target.value }))
                        }
                        placeholder="Share your story — why do you cook, what does your kitchen mean to you..."
                        rows={4}
                        className="font-body"
                        data-ocid="chef_register.why_textarea"
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      className="w-full bg-saffron hover:bg-terracotta text-cream font-bold text-base py-6 rounded-xl font-body transition-colors"
                      data-ocid="chef_register.submit_button"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Submit My Application
                    </Button>

                    <p className="text-center text-xs font-body text-muted-foreground">
                      After submitting, you'll get a WhatsApp button to complete
                      your registration with our team.
                    </p>
                  </form>
                </motion.div>
              )}
            </div>

            {/* ── Sidebar: What You Get ── */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="sticky top-24">
                  <div className="bg-gradient-to-br from-saffron/5 to-terracotta/5 rounded-2xl border border-saffron/20 p-6 mb-6">
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

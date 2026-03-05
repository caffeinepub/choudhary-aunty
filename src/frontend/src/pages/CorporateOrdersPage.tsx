import { Badge } from "@/components/ui/badge";
import { buildWhatsAppUrl } from "@/constants/images";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  Gift,
  MessageCircle,
  Recycle,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const WHO_WE_SERVE = [
  {
    emoji: "💻",
    name: "IT & Tech Companies",
    desc: "Diwali and Employee Appreciation",
  },
  {
    emoji: "💍",
    name: "Wedding Functions",
    desc: "Return gifts & welcome boxes",
  },
  { emoji: "🎉", name: "Festive Events", desc: "Curated season gifting" },
  {
    emoji: "🌱",
    name: "NGOs & Foundations",
    desc: "Purposeful, ethical gifting",
  },
  { emoji: "🏫", name: "Schools & Colleges", desc: "Teacher's Day & events" },
  {
    emoji: "🏛️",
    name: "Government Offices",
    desc: "Republic Day, Independence Day",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: MessageCircle,
    title: "WhatsApp Inquiry",
    desc: "Send us your requirements — event type, number of units, budget per unit, and preferred delivery date.",
    color: "text-saffron",
    bg: "bg-saffron/10",
  },
  {
    step: "02",
    icon: Gift,
    title: "Sample & Proposal",
    desc: "We send you a sample hamper (at cost) within 5-7 days. You approve the contents, design, and packaging.",
    color: "text-terracotta",
    bg: "bg-terracotta/10",
  },
  {
    step: "03",
    icon: CheckCircle2,
    title: "Order Confirmation",
    desc: "Pay 50% advance to lock your order. Our aunties start preparation based on your confirmed quantities.",
    color: "text-warmBrown",
    bg: "bg-warmBrown/10",
  },
  {
    step: "04",
    icon: Award,
    title: "Quality Pack & Deliver",
    desc: "Orders are quality-checked, branded if required, and dispatched pan India. Balance + logistics on delivery.",
    color: "text-saffron",
    bg: "bg-saffron/10",
  },
];

export default function CorporateOrdersPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    eventType: "",
    units: "",
    date: "",
    requirements: "",
  });

  useEffect(() => {
    document.title =
      "Corporate & Bulk Orders | Choudhary Aunty — Authentic Homemade Gifting";
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = `Hi! I'd like to enquire about a bulk/corporate order.

Name: ${formData.name}
Company/Organisation: ${formData.company}
Event Type: ${formData.eventType}
Number of Units: ${formData.units}
Preferred Date: ${formData.date}
Special Requirements: ${formData.requirements || "None"}

Please guide me on the next steps.`;
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <main className="min-h-screen pt-16">
      {/* ===== HERO ===== */}
      <section className="relative h-[60vh] min-h-[380px] max-h-[540px] flex items-end overflow-hidden">
        <img
          src="/assets/generated/corporate-orders-hero.dim_800x600.jpg"
          alt="Corporate gifting with Choudhary Aunty"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy/90 via-burgundy/50 to-burgundy/10" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl pb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-saffron" />
              <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
                Bulk & Corporate Orders
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-cream leading-tight mb-3 max-w-2xl">
              Gift Your Team{" "}
              <span className="text-saffron italic">Something Real</span>
            </h1>
            <p className="text-cream/80 font-body text-base sm:text-lg max-w-xl">
              Authentic homemade food gifts that carry a story, support women
              entrepreneurs, and leave a lasting impression. Minimum 20 units.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-16 sm:py-20 mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Why Choudhary Aunty
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl mt-2">
              Corporate Gifting, Reimagined
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {[
              {
                icon: Award,
                title: "Authentically Homemade",
                desc: "No factory. No machines. Every product is hand-crafted by a verified homemaker using a generations-old recipe.",
                color: "text-saffron",
                bg: "bg-saffron/10",
              },
              {
                icon: Recycle,
                title: "Purposeful & Sustainable",
                desc: "Your order directly empowers women from Bihar, Haryana, Punjab, UP & Uttarakhand — a gift with a measurable social impact.",
                color: "text-terracotta",
                bg: "bg-terracotta/10",
              },
              {
                icon: BookOpen,
                title: "Story-Rich Packaging",
                desc: "Each hamper includes a story card about the maker — your recipient learns who made their food and why it matters.",
                color: "text-warmBrown",
                bg: "bg-warmBrown/10",
              },
              {
                icon: Star,
                title: "Fully Customisable",
                desc: "Custom packaging with your branding, personalised notes, specific product combinations — we adapt to your brief.",
                color: "text-saffron",
                bg: "bg-saffron/10",
              },
            ].map((card) => (
              <motion.div key={card.title} variants={item}>
                <div className="bg-card rounded-2xl p-6 border border-border card-warm shadow-xs h-full">
                  <div
                    className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mb-4`}
                  >
                    <card.icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-sm mb-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-xs font-body leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== WHO WE SERVE ===== */}
      <section className="py-16 sm:py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Our Clients
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl mt-2">
              Who We Serve
            </h2>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {WHO_WE_SERVE.map((client) => (
              <motion.div key={client.name} variants={item}>
                <div className="bg-background rounded-2xl p-4 border border-border card-warm text-center">
                  <div className="text-3xl mb-2">{client.emoji}</div>
                  <div className="font-display font-bold text-foreground text-xs mb-1 leading-tight">
                    {client.name}
                  </div>
                  <div className="text-muted-foreground text-[10px] font-body">
                    {client.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-16 sm:py-20 mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              The Process
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl mt-2">
              How Bulk Orders Work
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-lg mx-auto">
              Simple, transparent, personal. We handle everything — you just
              share what you need.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {HOW_IT_WORKS.map((step) => (
              <motion.div key={step.step} variants={item}>
                <div className="bg-card rounded-2xl p-5 border border-border card-warm shadow-xs h-full">
                  <div
                    className={`w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center mb-4`}
                  >
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  <div className="text-xs text-muted-foreground font-body font-bold tracking-widest mb-1">
                    STEP {step.step}
                  </div>
                  <h3 className="font-display font-bold text-foreground text-sm mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-xs font-body leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== INQUIRY FORM ===== */}
      <section className="py-16 sm:py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Get Started
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl mt-2">
              Send Us Your Requirements
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-lg mx-auto">
              Fill the form below — clicking Submit will open a WhatsApp message
              with your details pre-filled. Minimum order: 20 units.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-background rounded-2xl border border-border p-6 sm:p-8 shadow-warm space-y-5"
              data-ocid="corporate.form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-foreground font-body mb-1.5 block"
                  >
                    Your Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Rajesh Kumar"
                    data-ocid="corporate.name_input"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron/50 placeholder:text-muted-foreground/60"
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="text-sm font-semibold text-foreground font-body mb-1.5 block"
                  >
                    Company / Organisation *
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="ABC Technologies Pvt Ltd"
                    data-ocid="corporate.company_input"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron/50 placeholder:text-muted-foreground/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="eventType"
                    className="text-sm font-semibold text-foreground font-body mb-1.5 block"
                  >
                    Event Type *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    value={formData.eventType}
                    onChange={handleChange}
                    data-ocid="corporate.event_select"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron/50"
                  >
                    <option value="">Select event type</option>
                    <option value="Diwali Gifting">Diwali Gifting</option>
                    <option value="Employee Appreciation">
                      Employee Appreciation
                    </option>
                    <option value="Wedding / Shaadi">Wedding / Shaadi</option>
                    <option value="Festive Season">Festive Season</option>
                    <option value="Teacher's Day / Institution">
                      Teacher's Day / Institution
                    </option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="units"
                    className="text-sm font-semibold text-foreground font-body mb-1.5 block"
                  >
                    Number of Units *
                  </label>
                  <input
                    id="units"
                    name="units"
                    type="number"
                    required
                    min="20"
                    value={formData.units}
                    onChange={handleChange}
                    placeholder="Minimum 20 units"
                    data-ocid="corporate.units_input"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron/50 placeholder:text-muted-foreground/60"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="text-sm font-semibold text-foreground font-body mb-1.5 block"
                >
                  Preferred Delivery Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  data-ocid="corporate.date_input"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron/50"
                />
              </div>

              <div>
                <label
                  htmlFor="requirements"
                  className="text-sm font-semibold text-foreground font-body mb-1.5 block"
                >
                  Special Requirements
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows={4}
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="Custom branding, specific products, dietary requirements, delivery location, budget per unit..."
                  data-ocid="corporate.requirements_textarea"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron/50 placeholder:text-muted-foreground/60 resize-none"
                />
              </div>

              <button
                type="submit"
                data-ocid="corporate.submit_button"
                className="w-full inline-flex items-center justify-center gap-2 whatsapp-btn py-3.5 text-base font-semibold"
              >
                <MessageCircle className="w-5 h-5" />
                Send Enquiry via WhatsApp
              </button>

              <p className="text-muted-foreground text-xs font-body text-center">
                Clicking Submit will open WhatsApp with your details pre-filled.
                Minimum order: 20 units.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ===== PREVIOUS CLIENTS ===== */}
      <section className="py-16 sm:py-20 mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Growing Network
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl mt-2">
              Partners in Purpose
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-md mx-auto">
              We're building our corporate client network. These are the types
              of organisations we partner with.
            </p>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              { label: "Tech Startups", sub: "Diwali gifting" },
              { label: "Wedding Planners", sub: "Return gifts" },
              { label: "Women NGOs", sub: "Ethical sourcing" },
              { label: "Educational Institutions", sub: "Appreciation gifts" },
            ].map((c, idx) => (
              <motion.div key={c.label} variants={item}>
                <div
                  className="bg-card rounded-2xl border border-dashed border-border p-5 text-center card-warm"
                  data-ocid={`corporate.client.item.${idx + 1}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-muted/60 mx-auto mb-3 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="font-display font-bold text-foreground text-xs mb-1">
                    {c.label}
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px] border-saffron/20 text-saffron font-body"
                  >
                    {c.sub}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-muted-foreground font-body text-sm mb-4">
              Become one of the first corporate partners of Choudhary Aunty.
            </p>
            <a
              href={buildWhatsAppUrl(
                "Hi! I'm interested in becoming a corporate partner / bulk order client for Choudhary Aunty.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="corporate.partner_button"
              className="inline-flex items-center gap-2 bg-saffron hover:bg-terracotta text-cream font-semibold px-6 py-3 rounded-full transition-colors font-body"
            >
              Enquire Now <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== SPECS STRIP ===== */}
      <section className="py-10 bg-card border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center flex-wrap"
          >
            {[
              { icon: Users, label: "Min. 20 units per order" },
              { icon: Gift, label: "Custom branding available" },
              { icon: CheckCircle2, label: "Pan India delivery" },
              { icon: Star, label: "Story card in every hamper" },
            ].map((spec) => (
              <div
                key={spec.label}
                className="flex items-center gap-2 text-sm font-body text-foreground/70"
              >
                <spec.icon className="w-4 h-4 text-saffron" />
                {spec.label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}

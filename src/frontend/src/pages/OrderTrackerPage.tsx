import { Badge } from "@/components/ui/badge";
import { buildWhatsAppUrl } from "@/constants/images";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChefHat,
  MessageCircle,
  Package,
  Phone,
  Search,
  Truck,
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

const ORDER_STAGES = [
  {
    icon: CheckCircle2,
    stage: "01",
    title: "Order Booked",
    description:
      "You've sent your order via WhatsApp and paid 50% advance via UPI. Your slot is reserved and your aunty has been notified.",
    badge: "WhatsApp Confirmed",
    color: "text-saffron",
    bg: "bg-saffron/10",
    border: "border-saffron/30",
  },
  {
    icon: MessageCircle,
    stage: "02",
    title: "Order Confirmed",
    description:
      "Our team has verified your order details, confirmed preparation timeline, and assigned your order to the weekend batch.",
    badge: "Team Verified",
    color: "text-terracotta",
    bg: "bg-terracotta/10",
    border: "border-terracotta/30",
  },
  {
    icon: ChefHat,
    stage: "03",
    title: "Being Prepared",
    description:
      "Your aunty is making your order fresh this weekend using traditional methods and the finest ingredients. No shortcuts, ever.",
    badge: "Weekend Batch",
    color: "text-warmBrown",
    bg: "bg-warmBrown/10",
    border: "border-warmBrown/30",
  },
  {
    icon: Package,
    stage: "04",
    title: "Quality Checked & Packed",
    description:
      "Order is quality-checked and carefully packed. You'll receive a message to pay the remaining 50% + logistics charges.",
    badge: "Balance Payment Due",
    color: "text-saffron",
    bg: "bg-saffron/10",
    border: "border-saffron/30",
  },
  {
    icon: Truck,
    stage: "05",
    title: "Dispatched",
    description:
      "After full payment confirmation, your order is handed to our logistics partner. Tracking details will be shared via WhatsApp.",
    badge: "On the Way",
    color: "text-terracotta",
    bg: "bg-terracotta/10",
    border: "border-terracotta/30",
  },
];

const ORDER_FAQS = [
  {
    q: "How long does preparation take after I place an order?",
    a: "Orders placed by Thursday are prepared over the weekend (Saturday–Sunday) and dispatched Monday. Preparation time ensures freshness — we never prepare in advance.",
  },
  {
    q: "Why do I need to pay 50% advance?",
    a: "Our aunties source fresh ingredients specifically for each batch. The advance covers ingredient costs and confirms your genuine intent, so no food goes to waste.",
  },
  {
    q: "What if my order is delayed beyond Monday dispatch?",
    a: "In rare cases (illness, festival holidays), we'll notify you via WhatsApp at least 24 hours in advance and adjust your timeline. Your 50% advance is fully refundable if you prefer to cancel.",
  },
  {
    q: "Can I add items to an existing order?",
    a: "Yes — WhatsApp us before Thursday noon to add items to your current week's batch. We'll update your total accordingly.",
  },
  {
    q: "How will I know when my balance payment is due?",
    a: "We'll send you a WhatsApp message with the exact balance amount (remaining 50% + actual logistics charges) once the order is packed and ready for dispatch.",
  },
];

export default function OrderTrackerPage() {
  const [phone, setPhone] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    document.title =
      "Track Your Order | Choudhary Aunty — Homemade Traditional Indian Food";
  }, []);

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    setSearched(true);
  }

  const whatsappTrackUrl = buildWhatsAppUrl(
    `Hi! I want to track my order. My WhatsApp number is ${phone || "[your number]"}.`,
  );

  return (
    <main className="min-h-screen pt-16">
      {/* ===== HERO ===== */}
      <section className="py-16 sm:py-24 mesh-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-saffron/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-terracotta/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-saffron" />
              <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
                Order Status
              </span>
              <div className="h-px w-8 bg-saffron" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
              Track Your <span className="text-saffron italic">Order</span>
            </h1>
            <p className="text-muted-foreground font-body text-base sm:text-lg max-w-xl mx-auto">
              Your order is in loving hands. Here's how to know where it is in
              its journey from our aunty's kitchen to your door.
            </p>
          </motion.div>

          {/* Two-col layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* Search Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-2xl border border-border p-6 shadow-warm card-warm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center">
                    <Search className="w-5 h-5 text-saffron" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-foreground text-base">
                      Track by WhatsApp Number
                    </h2>
                    <p className="text-muted-foreground text-xs font-body">
                      Enter the number you ordered from
                    </p>
                  </div>
                </div>
                <form onSubmit={handleTrack} className="space-y-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="text-sm font-semibold text-foreground font-body mb-1.5 block"
                    >
                      WhatsApp Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98831 40470"
                        data-ocid="order_tracker.input"
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron/50 placeholder:text-muted-foreground/60"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    data-ocid="order_tracker.primary_button"
                    className="w-full bg-saffron hover:bg-terracotta text-cream font-semibold py-3 rounded-xl transition-colors font-body text-sm flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    Track My Order
                  </button>
                </form>

                {searched && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-saffron/8 rounded-xl border border-saffron/20"
                    data-ocid="order_tracker.success_state"
                  >
                    <p className="text-sm font-body text-foreground/80 leading-relaxed">
                      <strong>Order tracking</strong> is currently handled via
                      WhatsApp. Our team will send you real-time updates. Tap
                      below to check your order status directly.
                    </p>
                    <a
                      href={whatsappTrackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid="order_tracker.whatsapp_button"
                      className="mt-3 inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#1da851] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors font-body"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Check on WhatsApp
                    </a>
                  </motion.div>
                )}

                <div className="mt-5 pt-5 border-t border-border">
                  <p className="text-muted-foreground text-xs font-body text-center">
                    Can't find your order?{" "}
                    <a
                      href={buildWhatsAppUrl(
                        "Hi! I need help tracking my order.",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-saffron font-semibold hover:text-terracotta transition-colors"
                    >
                      Contact us on WhatsApp
                    </a>
                  </p>
                </div>
              </div>

              {/* Illustration */}
              <div className="mt-6 rounded-2xl overflow-hidden border border-border shadow-xs">
                <img
                  src="/assets/generated/order-tracker-illustration.dim_800x500.jpg"
                  alt="Order journey illustration"
                  className="w-full h-44 object-cover"
                />
              </div>
            </motion.div>

            {/* Order Stages */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="lg:col-span-3 space-y-4"
            >
              <h2 className="font-display font-bold text-xl text-foreground mb-5">
                How Your Order Progresses
              </h2>
              {ORDER_STAGES.map((stage, idx) => (
                <motion.div
                  key={stage.stage}
                  variants={item}
                  className="flex gap-4 group"
                >
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-xl ${stage.bg} flex items-center justify-center shrink-0 border ${stage.border}`}
                    >
                      <stage.icon className={`w-5 h-5 ${stage.color}`} />
                    </div>
                    {idx < ORDER_STAGES.length - 1 && (
                      <div className="w-0.5 h-6 bg-border mt-1 mb-1" />
                    )}
                  </div>
                  <div className="pb-2 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display font-bold text-foreground text-sm">
                        {stage.title}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${stage.border} ${stage.color} font-body`}
                      >
                        {stage.badge}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-xs font-body leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== ORDER FAQs ===== */}
      <section className="py-16 sm:py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Common Questions
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl mt-2">
              Order FAQs
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {ORDER_FAQS.map((faq, idx) => (
              <motion.div key={faq.q} variants={item}>
                <div
                  className="bg-background rounded-2xl border border-border p-5 card-warm"
                  data-ocid={`faq.item.${idx + 1}`}
                >
                  <h3 className="font-display font-bold text-foreground text-sm mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <p className="text-muted-foreground font-body text-sm mb-4">
              Still have questions about your order?
            </p>
            <a
              href={buildWhatsAppUrl(
                "Hi! I need help with my order from Choudhary Aunty.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="order_tracker.contact_button"
              className="inline-flex items-center gap-2 whatsapp-btn px-6 py-3 font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              Contact Our Team
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-12 mesh-bg border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-display text-xl font-bold text-foreground mb-2">
              Haven't ordered yet?
            </p>
            <p className="text-muted-foreground font-body text-sm mb-6">
              Browse our 50+ authentic homemade products from Bihar, Haryana,
              Punjab, UP & Uttarakhand.
            </p>
            <Link
              to="/shop"
              search={{}}
              data-ocid="order_tracker.shop_link"
              className="inline-flex items-center gap-2 bg-saffron hover:bg-terracotta text-cream font-semibold px-6 py-3 rounded-full transition-colors font-body"
            >
              Explore Products
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

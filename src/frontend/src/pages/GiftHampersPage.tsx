import { Badge } from "@/components/ui/badge";
import { HAMPERS } from "@/constants/hamperData";
import { buildWhatsAppUrl } from "@/constants/images";
import {
  ArrowRight,
  CheckCircle2,
  Gift,
  Heart,
  MessageCircle,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const OCCASIONS = [
  { emoji: "🪔", name: "Diwali", desc: "Festival of lights" },
  { emoji: "🏢", name: "Corporate Gifting", desc: "Impress your team" },
  { emoji: "🎂", name: "Birthdays", desc: "Thoughtful & unique" },
  { emoji: "💍", name: "Weddings", desc: "Shaadi favourites" },
  { emoji: "🤝", name: "Raksha Bandhan", desc: "Sibling love" },
  { emoji: "🌙", name: "Eid", desc: "Festival sweetness" },
];

export default function GiftHampersPage() {
  useEffect(() => {
    document.title =
      "Gift Hampers | Choudhary Aunty — Authentic Homemade Indian Food Gifts";
  }, []);

  return (
    <main className="min-h-screen pt-16">
      {/* ===== HERO ===== */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[560px] flex items-end overflow-hidden">
        <img
          src="/assets/generated/gift-hamper-hero.dim_800x600.jpg"
          alt="Choudhary Aunty Gift Hampers"
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
                Curated with Love
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight mb-3 max-w-2xl">
              Gift Hampers from{" "}
              <span className="text-saffron italic">Amma Ki Rasoi</span>
            </h1>
            <p className="text-cream/80 font-body text-base sm:text-lg max-w-xl">
              When store-bought just won't do. Authentic homemade flavours,
              curated by region, gifted with heart.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== WHY GIFT HOMEMADE ===== */}
      <section className="py-16 sm:py-20 mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Why Choose Homemade
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl mt-2">
              The Gift That Speaks for Itself
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Heart,
                title: "Made with Authentic Recipes",
                desc: "Every product in our hampers is made by a real homemaker using a family recipe that predates any factory. The story is baked into every bite.",
                color: "text-saffron",
                bg: "bg-saffron/10",
              },
              {
                icon: Sparkles,
                title: "Thoughtfully Curated",
                desc: "Each hamper is curated around a specific state's food identity — not a random assortment, but a coherent flavour journey with meaning and story.",
                color: "text-terracotta",
                bg: "bg-terracotta/10",
              },
              {
                icon: Star,
                title: "Utterly Unique",
                desc: "You cannot buy our products in any store. Every hamper is exclusively available through Choudhary Aunty — the most personal gift you can give.",
                color: "text-warmBrown",
                bg: "bg-warmBrown/10",
              },
            ].map((card) => (
              <motion.div key={card.title} variants={item}>
                <div className="bg-card rounded-2xl p-6 border border-border card-warm shadow-xs h-full">
                  <div
                    className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mb-4`}
                  >
                    <card.icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-base mb-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== HAMPER GRID ===== */}
      <section className="py-16 sm:py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Our Collections
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl mt-2">
              Shop Our Hampers
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-lg mx-auto">
              Five curated boxes, each representing a state's finest homemade
              flavours. Every hamper can be customised — just WhatsApp us.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {HAMPERS.map((hamper, idx) => {
              const whatsappMsg = buildWhatsAppUrl(
                `Hi! I'd like to order the "${hamper.name}" gift hamper (${hamper.priceRange}). Please guide me.`,
              );
              return (
                <motion.div key={hamper.id} variants={item}>
                  <div
                    className="group bg-background rounded-2xl border border-border overflow-hidden card-warm shadow-xs h-full flex flex-col"
                    data-ocid={`hampers.item.${idx + 1}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={hamper.image}
                        alt={hamper.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="state-badge bg-burgundy/90 text-cream border-0">
                          {hamper.emoji} {hamper.state}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Gift className="w-5 h-5 text-cream drop-shadow-sm" />
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-display font-bold text-foreground text-lg mb-1">
                        {hamper.name}
                      </h3>
                      <p className="text-muted-foreground text-xs font-body italic mb-3">
                        {hamper.tagline}
                      </p>

                      {/* Contents */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-foreground font-body mb-2">
                          What's inside:
                        </p>
                        <ul className="space-y-1">
                          {hamper.contents.map((c) => (
                            <li
                              key={c}
                              className="flex items-center gap-2 text-xs font-body text-muted-foreground"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-saffron shrink-0" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Occasions */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {hamper.occasions.map((occ) => (
                          <Badge
                            key={occ}
                            variant="outline"
                            className="text-[10px] border-saffron/30 text-saffron font-body"
                          >
                            {occ}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                        <span className="font-display font-bold text-foreground text-sm">
                          {hamper.priceRange}
                        </span>
                        <a
                          href={whatsappMsg}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-ocid={`hampers.order_button.${idx + 1}`}
                          className="inline-flex items-center gap-1.5 whatsapp-btn px-3 py-2 text-xs font-semibold"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Order Now
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== CUSTOMISE YOUR HAMPER ===== */}
      <section className="py-16 sm:py-20 deep-section relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-saffron blur-3xl" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-10 h-10 text-saffron mx-auto mb-4" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream mb-4">
              Build Your Own Hamper
            </h2>
            <p className="text-cream/80 font-body text-base sm:text-lg leading-relaxed mb-6 max-w-xl mx-auto">
              Can't find exactly what you need? WhatsApp us with your
              recipient's preferences, budget, and occasion — we'll curate a
              custom hamper that's perfectly tailored.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: "🎯", label: "Tell us your budget" },
                { icon: "🌏", label: "Pick a state or mix" },
                { icon: "✨", label: "We build it for you" },
              ].map((step) => (
                <div
                  key={step.label}
                  className="bg-cream/5 rounded-xl p-4 border border-cream/10"
                >
                  <div className="text-2xl mb-2">{step.icon}</div>
                  <div className="text-cream/80 text-xs font-body font-semibold">
                    {step.label}
                  </div>
                </div>
              ))}
            </div>
            <a
              href={buildWhatsAppUrl(
                "Hi! I'd like to create a custom gift hamper. Can you help me?",
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hampers.customise_button"
              className="inline-flex items-center gap-2 whatsapp-btn px-7 py-3.5 text-base font-semibold"
            >
              <MessageCircle className="w-5 h-5" />
              Customise My Hamper
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== PERFECT FOR ===== */}
      <section className="py-16 sm:py-20 mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Every Occasion
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl mt-2">
              Perfect For
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {OCCASIONS.map((occ) => (
              <motion.div key={occ.name} variants={item}>
                <div className="bg-card rounded-2xl p-4 border border-border card-warm text-center shadow-xs">
                  <div className="text-3xl mb-2">{occ.emoji}</div>
                  <div className="font-display font-bold text-foreground text-xs mb-1">
                    {occ.name}
                  </div>
                  <div className="text-muted-foreground text-[10px] font-body">
                    {occ.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Delivery note */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 bg-card rounded-2xl border border-border p-6 flex flex-col sm:flex-row items-center gap-5"
          >
            <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-saffron" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-display font-bold text-foreground mb-1">
                Pan India Delivery
              </h3>
              <p className="text-muted-foreground text-sm font-body">
                We ship hampers across India. Order by Thursday, prepared over
                the weekend, dispatched Monday. Logistics charges quoted at
                actual on your specific pin code.
              </p>
            </div>
            <a
              href={buildWhatsAppUrl(
                "Hi! I'd like to know the delivery charges for a hamper to my city.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hampers.delivery_button"
              className="inline-flex items-center gap-2 text-saffron hover:text-terracotta font-semibold text-sm font-body whitespace-nowrap transition-colors"
            >
              Ask Delivery Cost <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

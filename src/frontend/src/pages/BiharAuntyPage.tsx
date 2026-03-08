import {
  AUNTY_VARIANT_MAPPINGS,
  type AuntyBadge,
  BADGE_COLORS,
  getAuntyById,
  getVariantsForAunty,
} from "@/constants/biharData";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  MessageCircle,
  ShoppingBag,
  Star,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Star rating ──────────────────────────────────────────────────────────────
function StarRating({ rating, large }: { rating: number; large?: boolean }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${large ? "w-5 h-5" : "w-4 h-4"} ${s <= Math.round(rating) ? "text-saffron fill-saffron" : "text-border"}`}
        />
      ))}
      <span
        className={`font-body text-muted-foreground ml-1 ${large ? "text-base" : "text-sm"}`}
      >
        {rating}
      </span>
    </div>
  );
}

export default function BiharAuntyPage() {
  const params = useParams({ strict: false });
  const auntyId = params.auntyId as string;

  const aunty = getAuntyById(auntyId);

  if (!aunty) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">👩‍🍳</div>
          <h1 className="font-display font-bold text-2xl text-foreground mb-2">
            Aunty Not Found
          </h1>
          <Link
            to="/state/bihar"
            className="inline-flex items-center gap-2 bg-saffron text-cream font-semibold px-5 py-2.5 rounded-full font-body text-sm hover:bg-terracotta transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Bihar
          </Link>
        </div>
      </main>
    );
  }

  const variants = getVariantsForAunty(auntyId);

  // Collect all batch days for this aunty
  const batchDays = [
    ...new Set(
      AUNTY_VARIANT_MAPPINGS.filter((m) => m.aunty_id === auntyId).flatMap(
        (m) => m.batch_days,
      ),
    ),
  ];

  return (
    <main className="min-h-screen bg-background pt-16">
      {/* ===== HERO ===== */}
      <section className="py-12 sm:py-16 bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-2 text-xs font-body text-muted-foreground mb-8"
          >
            <Link to="/" className="hover:text-saffron transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              to="/state/bihar"
              className="hover:text-saffron transition-colors"
            >
              Bihar
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">{aunty.name}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Photo — left on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-none"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-warm-lg aspect-[4/5] max-w-sm mx-auto lg:mx-0">
                <img
                  src={aunty.photo}
                  alt={aunty.name}
                  className="w-full h-full object-cover object-top"
                />
                {/* Gradient bottom overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap gap-1">
                    {aunty.badges.slice(0, 2).map((badge) => (
                      <span
                        key={badge}
                        className={`text-[10px] font-semibold font-body px-2 py-0.5 rounded-full border ${BADGE_COLORS[badge as AuntyBadge]}`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Info — right on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="font-display font-bold text-foreground text-3xl sm:text-4xl md:text-5xl leading-tight mb-3">
                {aunty.name}
              </h1>

              <div className="flex items-center gap-2 text-muted-foreground text-sm font-body mb-4">
                <MapPin className="w-4 h-4 shrink-0 text-saffron" />
                {aunty.village}, {aunty.district}, {aunty.state}
              </div>

              <div className="mb-4">
                <StarRating rating={aunty.rating} large />
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="text-center">
                  <div className="font-display font-bold text-saffron text-2xl">
                    {aunty.total_orders}
                  </div>
                  <div className="text-xs font-body text-muted-foreground">
                    happy orders
                  </div>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center">
                  <div className="font-display font-bold text-amber-700 text-2xl">
                    {aunty.years_experience}
                  </div>
                  <div className="text-xs font-body text-muted-foreground">
                    years of experience
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${aunty.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hi ${aunty.name}! I found your profile on Choudhary Aunty and would like to place an order.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="bihar.aunty.whatsapp_button"
                className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#1da851] text-white font-semibold px-6 py-3 rounded-full font-body text-sm transition-colors shadow-warm"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STORY ===== */}
      <section className="py-12 sm:py-16 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold block mb-4">
              Her Story
            </span>

            {/* Bio */}
            <p className="font-body text-foreground/80 text-base leading-relaxed mb-6">
              {aunty.bio}
            </p>

            {/* Pull-quote story */}
            <blockquote className="relative border-l-4 border-saffron pl-6 py-2">
              <p className="font-accent italic text-foreground/90 text-lg leading-relaxed">
                {aunty.story}
              </p>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* ===== BADGES ===== */}
      <section className="py-10 sm:py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-foreground text-xl mb-5">
              Her Achievements
            </h2>
            <div className="flex flex-wrap gap-2">
              {aunty.badges.map((badge) => (
                <span
                  key={badge}
                  className={`text-sm font-semibold font-body px-4 py-1.5 rounded-full border ${BADGE_COLORS[badge as AuntyBadge]}`}
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== WHAT SHE MAKES ===== */}
      <section className="py-12 sm:py-16 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-foreground text-2xl mb-2">
              What She Makes
            </h2>
            <p className="text-muted-foreground font-body text-sm mb-6">
              Click any item below to view the full variant and order directly.
            </p>

            <div className="space-y-3">
              {variants.map(({ variant, product, mapping }, idx) => (
                <div
                  key={`${variant.variant_id}-${idx}`}
                  className="flex items-center justify-between bg-card rounded-xl border border-border px-4 py-3 hover:border-saffron/40 transition-all"
                  data-ocid={`bihar.aunty.product.item.${idx + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-foreground text-sm">
                      {product.product_name}
                    </p>
                    <p className="text-muted-foreground text-xs font-body">
                      {variant.variant_name} — ₹{mapping.price_per_kg}/kg
                    </p>
                  </div>
                  <Link
                    to="/bihar-variant/$variantId"
                    params={{ variantId: variant.variant_id }}
                    data-ocid={`bihar.aunty.order.${idx + 1}`}
                    className="shrink-0 inline-flex items-center gap-1.5 text-saffron hover:text-terracotta font-semibold text-sm font-body transition-colors ml-4"
                  >
                    Order <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}

              {variants.length === 0 && (
                <p
                  className="text-muted-foreground font-body text-sm"
                  data-ocid="bihar.aunty.products.empty_state"
                >
                  No variants mapped yet.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== AVAILABILITY ===== */}
      <section className="py-10 sm:py-12 bg-card">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          >
            <div>
              <h2 className="font-display font-bold text-foreground text-xl mb-2">
                Availability
              </h2>
              <p className="text-muted-foreground font-body text-sm">
                Available on:{" "}
                <span className="text-foreground font-semibold">
                  {batchDays.join(", ")}
                </span>
              </p>
            </div>

            <a
              href={`https://wa.me/${aunty.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                `Hi ${aunty.name}! I found your profile on Choudhary Aunty and would like to discuss an order.`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="bihar.aunty.contact_button"
              className="shrink-0 inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#1da851] text-white font-semibold px-6 py-3 rounded-full font-body text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Contact via WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Back link */}
      <div className="border-t border-border py-6">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Link
            to="/state/bihar"
            data-ocid="bihar.aunty.back_link"
            className="inline-flex items-center gap-2 text-saffron hover:text-terracotta font-semibold font-body text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Bihar
          </Link>
        </div>
      </div>
    </main>
  );
}

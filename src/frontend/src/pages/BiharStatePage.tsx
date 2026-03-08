import {
  type AuntyBadge,
  BADGE_COLORS,
  BIHAR_AUNTIES,
  BIHAR_PRODUCTS,
  BIHAR_REGIONS,
  BIHAR_STATE,
} from "@/constants/biharData";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChefHat,
  MapPin,
  Package,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

// ─── Star rating ─────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "text-saffron fill-saffron" : "text-border"}`}
        />
      ))}
      <span className="text-xs font-body text-muted-foreground ml-1">
        {rating}
      </span>
    </div>
  );
}

// ─── Category label ───────────────────────────────────────────────────────────
function CategoryBadge({ category }: { category: string }) {
  const map: Record<string, string> = {
    mithai: "bg-rose-100 text-rose-800",
    namkeen: "bg-yellow-100 text-yellow-800",
    achar: "bg-lime-100 text-lime-800",
    snack: "bg-orange-100 text-orange-800",
    beverage: "bg-sky-100 text-sky-800",
    grain: "bg-amber-100 text-amber-800",
  };
  const labels: Record<string, string> = {
    mithai: "Mithai",
    namkeen: "Namkeen",
    achar: "Achar",
    snack: "Snack",
    beverage: "Beverage",
    grain: "Grain",
  };
  return (
    <span
      className={`text-[10px] font-semibold font-body px-2 py-0.5 rounded-full ${map[category] ?? "bg-muted text-muted-foreground"}`}
    >
      {labels[category] ?? category}
    </span>
  );
}

export default function BiharStatePage() {
  const regionRefs = useRef<Record<string, HTMLElement | null>>({});

  function scrollToRegion(regionId: string) {
    regionRefs.current[regionId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="min-h-screen bg-background pt-16">
      {/* ===== HERO ===== */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.38 0.14 42) 0%, oklch(0.28 0.10 22) 60%, oklch(0.22 0.07 22) 100%)",
          minHeight: "460px",
        }}
      >
        {/* Decorative grain overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* State banner image */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url('/assets/generated/state-banner-bihar.dim_1400x500.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl py-14 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-body text-amber-200/70 mb-6">
              <Link to="/" className="hover:text-amber-200 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-amber-200/90">Bihar</span>
            </div>

            {/* Hindi tagline */}
            <p className="font-accent text-saffron text-base sm:text-lg italic mb-3">
              {BIHAR_STATE.banner_tagline}
            </p>

            {/* Hero title */}
            <h1 className="font-display font-bold text-cream text-4xl sm:text-6xl leading-tight mb-4">
              Bihar ki <span className="italic text-saffron">Rasoi</span>
            </h1>

            {/* Culinary story */}
            <p className="text-cream/85 font-body max-w-2xl text-sm sm:text-base leading-relaxed mb-8">
              {BIHAR_STATE.culinary_story}
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4 sm:gap-8"
          >
            {[
              {
                icon: Package,
                label: `${BIHAR_STATE.total_products} Products`,
                color: "text-saffron",
              },
              {
                icon: Users,
                label: `${BIHAR_STATE.total_aunties} Aunties`,
                color: "text-amber-300",
              },
              { icon: ChefHat, label: "Min. 2 kg Batch", color: "text-cream" },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className={`text-sm font-semibold font-body ${color}`}>
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== REGIONS STRIP ===== */}
      <section className="py-6 bg-card border-b border-border sticky top-16 z-20 shadow-xs">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider">
              Regions:
            </span>
            {BIHAR_REGIONS.map((region) => (
              <button
                key={region.region_id}
                type="button"
                data-ocid="bihar.region.tab"
                onClick={() => scrollToRegion(region.region_id)}
                className="group flex items-center gap-2 bg-background hover:bg-saffron/8 border border-border hover:border-saffron/40 rounded-full px-4 py-1.5 transition-all"
              >
                <MapPin className="w-3 h-3 text-saffron" />
                <span className="text-sm font-semibold font-body text-foreground group-hover:text-saffron transition-colors">
                  {region.region_name}
                </span>
                <span className="text-[10px] font-body text-muted-foreground hidden sm:inline">
                  — {region.specialty}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS BY REGION ===== */}
      {BIHAR_REGIONS.map((region) => {
        const regionProducts = BIHAR_PRODUCTS.filter(
          (p) => p.region_id === region.region_id,
        );
        return (
          <section
            key={region.region_id}
            ref={(el) => {
              regionRefs.current[region.region_id] = el;
            }}
            className="py-12 sm:py-16 border-b border-border"
          >
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
              {/* Region header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-8 bg-saffron rounded-full" />
                  <div>
                    <h2 className="font-display font-bold text-foreground text-2xl sm:text-3xl">
                      {region.region_name}
                    </h2>
                    <p className="text-saffron text-xs font-body font-semibold mt-0.5">
                      Specialty: {region.specialty}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground font-body text-sm leading-relaxed ml-4 max-w-2xl mt-2">
                  {region.region_food_story}
                </p>
              </motion.div>

              {/* Product cards grid */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
              >
                {regionProducts.map((product, idx) => {
                  const minPrice = Math.min(
                    ...product.variants.map((v) => v.price_per_kg),
                  );
                  return (
                    <motion.div key={product.product_id} variants={fadeUp}>
                      <Link
                        to="/bihar-product/$productId"
                        params={{ productId: product.product_id }}
                        data-ocid={`bihar.product.item.${idx + 1}`}
                        className="group block bg-card rounded-2xl border border-border overflow-hidden hover:border-saffron/40 hover:shadow-warm transition-all duration-300 h-full"
                      >
                        {/* Product color block */}
                        <div
                          className="h-32 flex items-center justify-center text-5xl"
                          style={{
                            background:
                              product.category === "mithai"
                                ? "linear-gradient(135deg, oklch(0.90 0.08 70) 0%, oklch(0.85 0.10 60) 100%)"
                                : product.category === "namkeen"
                                  ? "linear-gradient(135deg, oklch(0.90 0.09 85) 0%, oklch(0.86 0.12 75) 100%)"
                                  : product.category === "snack"
                                    ? "linear-gradient(135deg, oklch(0.88 0.09 60) 0%, oklch(0.84 0.11 50) 100%)"
                                    : "linear-gradient(135deg, oklch(0.88 0.09 90) 0%, oklch(0.84 0.12 80) 100%)",
                          }}
                        >
                          {product.category === "mithai"
                            ? "🍬"
                            : product.category === "namkeen"
                              ? "🥨"
                              : product.category === "snack"
                                ? "🌾"
                                : product.category === "grain"
                                  ? "🌿"
                                  : "🍽️"}
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-display font-bold text-foreground text-base leading-tight group-hover:text-saffron transition-colors">
                              {product.product_name}
                            </h3>
                            <CategoryBadge category={product.category} />
                          </div>
                          <p className="text-muted-foreground text-xs font-body line-clamp-2 mb-3">
                            {product.product_story.slice(0, 80)}…
                          </p>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-xs font-body text-muted-foreground">
                                {product.variants.length} Variant
                                {product.variants.length !== 1 ? "s" : ""}
                              </span>
                              <div className="text-sm font-bold font-body text-saffron">
                                from ₹{minPrice}/kg
                              </div>
                            </div>
                            <span className="text-xs font-semibold font-body text-saffron group-hover:gap-2 flex items-center gap-1 transition-all">
                              Explore <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* ===== MEET THE AUNTIES ===== */}
      <section className="py-14 sm:py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              The Heart of Bihar ki Rasoi
            </span>
            <h2 className="font-display font-bold text-foreground text-3xl sm:text-4xl mt-2">
              Bihar ki Shaan — Meet the Aunties
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-lg mx-auto text-sm">
              Every dish you order is hand-crafted by one of these real women in
              their home kitchen.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {BIHAR_AUNTIES.map((aunty, idx) => (
              <motion.div key={aunty.aunty_id} variants={fadeUp}>
                <div
                  className="group bg-background rounded-2xl border border-border overflow-hidden hover:border-saffron/40 hover:shadow-warm transition-all duration-300"
                  data-ocid={`bihar.aunty.item.${idx + 1}`}
                >
                  {/* Aunty photo */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={aunty.photo}
                      alt={aunty.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Gradient overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <StarRating rating={aunty.rating} />
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-display font-bold text-foreground text-lg">
                      {aunty.name}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs font-body mt-0.5 mb-2">
                      <MapPin className="w-3 h-3 shrink-0" />
                      {aunty.district}, Bihar
                    </div>

                    {/* Experience */}
                    <p className="text-xs font-body text-amber-700 font-semibold mb-2">
                      {aunty.years_experience} years of experience
                    </p>

                    {/* Badge chips */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {aunty.badges.slice(0, 2).map((badge) => (
                        <span
                          key={badge}
                          className={`text-[10px] font-semibold font-body px-2 py-0.5 rounded-full border ${BADGE_COLORS[badge as AuntyBadge]}`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    <Link
                      to="/bihar-aunty/$auntyId"
                      params={{ auntyId: aunty.aunty_id }}
                      data-ocid={`bihar.aunty.profile.${idx + 1}`}
                      className="inline-flex items-center gap-1.5 text-saffron hover:text-terracotta font-semibold text-sm font-body transition-colors"
                    >
                      View Profile <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== HOME KITCHEN GUARANTEE ===== */}
      <section className="py-10 bg-amber-50 border-t border-amber-200/60">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 rounded-full px-5 py-2 mb-4">
              <ChefHat className="w-4 h-4 text-amber-700" />
              <span className="text-amber-800 font-semibold text-sm font-body">
                Home Kitchen Guarantee
              </span>
            </div>
            <p className="text-amber-800 font-body text-sm max-w-lg mx-auto">
              Every item is made in a real home kitchen using{" "}
              <strong>gas stove, kadhai, tawa, and mixer grinder</strong> — no
              industrial equipment, ever. That's what makes it taste like home.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

import {
  type AuntyBadge,
  BADGE_COLORS,
  BIHAR_REGIONS,
  getAuntiesForVariant,
  getProductById,
} from "@/constants/biharData";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Package,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function CategoryBadge({ category }: { category: string }) {
  const map: Record<string, string> = {
    mithai: "bg-rose-100 text-rose-800 border-rose-200",
    namkeen: "bg-yellow-100 text-yellow-800 border-yellow-200",
    achar: "bg-lime-100 text-lime-800 border-lime-200",
    snack: "bg-orange-100 text-orange-800 border-orange-200",
    beverage: "bg-sky-100 text-sky-800 border-sky-200",
    grain: "bg-amber-100 text-amber-800 border-amber-200",
  };
  const labels: Record<string, string> = {
    mithai: "Mithai",
    namkeen: "Namkeen",
    achar: "Achar",
    snack: "Snack",
    beverage: "Beverage",
    grain: "Grain / Superfood",
  };
  return (
    <span
      className={`text-xs font-semibold font-body px-3 py-1 rounded-full border ${map[category] ?? "bg-muted text-muted-foreground border-border"}`}
    >
      {labels[category] ?? category}
    </span>
  );
}

export default function BiharProductPage() {
  const params = useParams({ strict: false });
  const productId = params.productId as string;

  const product = getProductById(productId);

  if (!product) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🍽️</div>
          <h1 className="font-display font-bold text-2xl text-foreground mb-2">
            Product Not Found
          </h1>
          <p className="text-muted-foreground font-body mb-6">
            This product doesn't exist in our Bihar catalog.
          </p>
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

  const region = BIHAR_REGIONS.find((r) => r.region_id === product.region_id);

  return (
    <main className="min-h-screen bg-background pt-16">
      {/* ===== PRODUCT HERO ===== */}
      <section
        className="relative overflow-hidden py-14 sm:py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.96 0.03 72) 0%, oklch(0.92 0.05 65) 100%)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          {/* Back breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-xs font-body text-muted-foreground mb-6"
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
            <span className="text-foreground font-semibold">
              {product.product_name}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category + Region badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <CategoryBadge category={product.category} />
              {region && (
                <span className="text-xs font-semibold font-body px-3 py-1 rounded-full border bg-amber-50 text-amber-800 border-amber-200">
                  📍 {region.region_name}, Bihar
                </span>
              )}
            </div>

            {/* Product name */}
            <h1 className="font-display font-bold text-foreground text-3xl sm:text-5xl leading-tight mb-5">
              {product.product_name}
            </h1>

            {/* Product story */}
            <p className="text-foreground/80 font-body text-base leading-relaxed max-w-2xl mb-6">
              {product.product_story}
            </p>

            {/* Occasion pills */}
            <div className="flex flex-wrap gap-2">
              {product.occasions.map((occ) => (
                <span
                  key={occ}
                  className="text-xs font-body font-medium px-3 py-1 bg-saffron/10 text-saffron rounded-full border border-saffron/20"
                >
                  {occ}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== VARIANTS SECTION ===== */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="font-display font-bold text-foreground text-2xl sm:text-3xl mb-2">
              Choose Your Variant
            </h2>
            <p className="text-muted-foreground font-body text-sm">
              Each variant has its own recipe, ingredients, and aunty selection.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {product.variants.map((variant, idx) => {
              const auntyCount = getAuntiesForVariant(
                variant.variant_id,
              ).length;
              return (
                <motion.div key={variant.variant_id} variants={fadeUp}>
                  <div
                    className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-saffron/50 hover:shadow-warm transition-all duration-300 h-full flex flex-col"
                    data-ocid={`bihar.variant.item.${idx + 1}`}
                  >
                    {/* Variant color band */}
                    <div
                      className="h-2"
                      style={{
                        background:
                          idx === 0
                            ? "linear-gradient(90deg, oklch(0.65 0.22 46), oklch(0.72 0.18 55))"
                            : idx === 1
                              ? "linear-gradient(90deg, oklch(0.55 0.18 40), oklch(0.45 0.14 30))"
                              : "linear-gradient(90deg, oklch(0.42 0.14 30), oklch(0.32 0.10 22))",
                      }}
                    />
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display font-bold text-foreground text-lg mb-1">
                        {variant.variant_name}
                      </h3>
                      <p className="text-muted-foreground font-body text-xs mb-4 flex-1">
                        {variant.description}
                      </p>

                      {/* Stats row */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-background rounded-xl p-2 text-center border border-border">
                          <div className="text-saffron font-bold text-lg font-body">
                            ₹{variant.price_per_kg}
                          </div>
                          <div className="text-muted-foreground text-[10px] font-body">
                            per kg
                          </div>
                        </div>
                        <div className="bg-background rounded-xl p-2 text-center border border-border">
                          <div className="text-amber-700 font-bold text-lg font-body">
                            {variant.shelf_life_days}
                          </div>
                          <div className="text-muted-foreground text-[10px] font-body">
                            days shelf life
                          </div>
                        </div>
                      </div>

                      {/* Meta row */}
                      <div className="flex items-center gap-3 text-xs font-body text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Package className="w-3 h-3 text-saffron" />2 kg batch
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-saffron" />
                          {auntyCount} Auni{auntyCount !== 1 ? "es" : ""}{" "}
                          Available
                        </span>
                      </div>

                      <Link
                        to="/bihar-variant/$variantId"
                        params={{ variantId: variant.variant_id }}
                        data-ocid={`bihar.variant.choose.${idx + 1}`}
                        className="inline-flex items-center justify-center gap-2 w-full bg-saffron hover:bg-terracotta text-cream font-semibold px-4 py-2.5 rounded-xl font-body text-sm transition-colors"
                      >
                        Choose This Variant{" "}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Minimum order callout */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-orange-50 border border-orange-200 rounded-2xl p-5 flex items-start gap-3"
          >
            <span className="text-2xl">📦</span>
            <div>
              <h4 className="font-display font-bold text-orange-800 text-base mb-1">
                Minimum Order: 2 kg per Batch
              </h4>
              <p className="text-orange-700 font-body text-sm">
                Order in full batches for authentic homemade quality. Our
                aunties cook in proper batches — this ensures consistent taste
                and freshness every single time.
              </p>
            </div>
          </motion.div>

          {/* Back link */}
          <div className="mt-8">
            <Link
              to="/state/bihar"
              data-ocid="bihar.product.back_link"
              className="inline-flex items-center gap-2 text-saffron hover:text-terracotta font-semibold font-body text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Bihar
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

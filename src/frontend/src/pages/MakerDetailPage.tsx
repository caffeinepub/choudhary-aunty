import HerStorySection from "@/components/HerStorySection";
import ReviewsSection from "@/components/ReviewsSection";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  WHATSAPP_NUMBER,
  getMakerImage,
  getProductImage,
} from "@/constants/images";
import { getMakerStory } from "@/constants/makerStories";
import { useGetMakerWithProducts } from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { SiWhatsapp } from "react-icons/si";

export default function MakerDetailPage() {
  const { id } = useParams({ from: "/maker/$id" });
  const makerId = BigInt(id);

  const makerQuery = useGetMakerWithProducts(makerId);
  const data = makerQuery.data;
  const maker = data ? data[0] : null;
  const products = data ? data[1] : [];

  useEffect(() => {
    if (maker) {
      document.title = `${maker.name} | Choudhary Aunty`;
    }
  }, [maker]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    maker
      ? `Hi! I'd like to know more about ${maker.name}'s products on Choudhary Aunty.`
      : "",
  )}`;

  if (makerQuery.isLoading) {
    return (
      <main className="min-h-screen pt-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Skeleton
              className="aspect-[4/5] rounded-2xl"
              data-ocid="maker.loading_state"
            />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!maker) {
    return (
      <main className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center" data-ocid="maker.error_state">
          <div className="text-5xl mb-4">👩‍🍳</div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Maker not found
          </h2>
          <p className="text-muted-foreground font-body mb-6">
            This maker's profile may have been removed.
          </p>
          <Link
            to="/makers"
            className="inline-flex items-center gap-2 bg-saffron text-cream font-semibold px-5 py-2.5 rounded-full font-body"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Makers
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl py-10">
        {/* Back */}
        <Link
          to="/makers"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-saffron text-sm font-body mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> All Makers
        </Link>

        {/* Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 mb-8 sm:mb-14">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[4/3] sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-warm-lg border border-border">
              <img
                src={getMakerImage(maker.name)}
                alt={maker.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center gap-5"
          >
            <div>
              <span className="state-badge mb-3 inline-block">
                {maker.state}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
                {maker.name}
              </h1>
              <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs px-2.5 py-1 rounded-full font-body font-semibold mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Kitchen ✓
              </span>
              <p className="text-muted-foreground font-body text-sm mt-2">
                {maker.bio}
              </p>
            </div>

            {/* Full Story */}
            {maker.story && (
              <div className="bg-saffron/6 border border-saffron/15 rounded-xl p-5">
                <p className="text-foreground/80 font-body text-sm leading-relaxed italic">
                  "{maker.story}"
                </p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-saffron/10 flex items-center justify-center">
                <span className="text-xl">🍽️</span>
              </div>
              <div>
                <div className="font-semibold text-sm text-foreground font-body">
                  {products.length} Product{products.length !== 1 ? "s" : ""}
                </div>
                <div className="text-xs text-muted-foreground font-body">
                  Available on Choudhary Aunty
                </div>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whatsapp-btn px-5 py-3 text-sm font-semibold w-fit"
            >
              <SiWhatsapp className="w-4 h-4" />
              Order from {maker.name.split(" ")[0]}
            </a>
          </motion.div>
        </div>

        {/* Products by this maker */}
        {products.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-border" />
              <h2 className="font-display font-bold text-2xl text-foreground whitespace-nowrap">
                {maker.name.split(" ")[0]}'s Products
              </h2>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {products.map((product, idx) => {
                const savings =
                  product.mrp > product.sellingPrice
                    ? Math.round(
                        ((product.mrp - product.sellingPrice) / product.mrp) *
                          100,
                      )
                    : 0;
                return (
                  <div
                    key={product.id.toString()}
                    className="group bg-card rounded-2xl border border-border overflow-hidden card-warm shadow-xs"
                    data-ocid={`maker.product.item.${idx + 1}`}
                  >
                    <div className="aspect-[6/4] overflow-hidden relative">
                      <img
                        src={getProductImage(product.category, product.name)}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {savings > 0 && (
                        <div className="absolute top-2 left-2">
                          <span className="savings-badge text-xs">
                            {savings}% OFF
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <Badge
                        variant="outline"
                        className="text-xs border-border capitalize font-body mb-2"
                      >
                        {product.category}
                      </Badge>
                      <h3 className="font-display font-bold text-base text-foreground mb-1">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-xs font-body mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="text-muted-foreground text-xs font-body mb-2 font-medium">
                        📦 Pack: 500g
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-green-700 font-bold text-base font-body leading-none">
                              ₹{product.sellingPrice}
                            </span>
                            {product.mrp > product.sellingPrice && (
                              <span className="text-gray-400 text-sm line-through font-body">
                                ₹{product.mrp}
                              </span>
                            )}
                          </div>
                          {product.mrp > product.sellingPrice && (
                            <span className="inline-flex items-center gap-0.5 bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full w-fit font-body">
                              ✦ Save ₹{product.mrp - product.sellingPrice}
                            </span>
                          )}
                        </div>
                        <Link
                          to="/product/$id"
                          params={{ id: product.id.toString() }}
                          className="inline-flex items-center gap-1 text-saffron hover:text-terracotta text-sm font-semibold font-body transition-colors"
                        >
                          View <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* ─── Her Story Section ─── */}
      {(() => {
        const story = getMakerStory(makerId);
        return story ? (
          <HerStorySection story={story} makerName={maker.name} />
        ) : null;
      })()}

      {/* ─── Maker Reviews ─── */}
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl pb-12">
        <ReviewsSection makerName={maker.name} displayOnly />
      </div>
    </main>
  );
}

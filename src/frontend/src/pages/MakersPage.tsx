import { Skeleton } from "@/components/ui/skeleton";
import { getMakerImage } from "@/constants/images";
import { getMakerStoryByName } from "@/constants/makerStories";
import { useGetAllMakers } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SAVED_MAKERS_KEY = "choudhary_saved_makers";

function useSavedMakers() {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(SAVED_MAKERS_KEY) ?? "[]");
    } catch {
      return [];
    }
  });

  function toggle(id: string, name: string) {
    setSavedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      localStorage.setItem(SAVED_MAKERS_KEY, JSON.stringify(next));
      if (prev.includes(id)) {
        toast.info(`Removed ${name.split(" ")[0]} from favourites`);
      } else {
        toast.success(`Added ${name.split(" ")[0]} to favourites ❤️`);
      }
      return next;
    });
  }

  return { savedIds, toggle };
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function MakersPage() {
  useEffect(() => {
    document.title =
      "Our Makers | Choudhary Aunty — The Hands Behind Your Food";
  }, []);

  const makersQuery = useGetAllMakers();
  const makers = makersQuery.data ?? [];
  const { savedIds, toggle } = useSavedMakers();

  return (
    <main className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-12 sm:py-16 mesh-bg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Meet the Makers
            </span>
            <h1 className="section-heading text-4xl sm:text-5xl mt-2 mb-4">
              The Hands Behind Your Food
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto leading-relaxed">
              Real women, real kitchens, real stories. Each maker brings decades
              of culinary wisdom and love to every product she creates.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          {makersQuery.isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }, (_, i) => `skeleton-${i}`).map(
                (key) => (
                  <div
                    key={key}
                    className="rounded-2xl overflow-hidden border border-border"
                    data-ocid="makers.loading_state"
                  >
                    <Skeleton className="aspect-[4/5] w-full" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-5 w-2/3" />
                      <Skeleton className="h-3 w-1/3" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-4/5" />
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : makers.length === 0 ? (
            <div className="text-center py-20" data-ocid="makers.empty_state">
              <div className="text-5xl mb-4">👩‍🍳</div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                Coming Soon
              </h3>
              <p className="text-muted-foreground font-body text-sm">
                Our makers are being added. Check back soon!
              </p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {makers.map((maker, idx) => (
                <motion.div key={maker.id.toString()} variants={item}>
                  <div
                    className="group bg-card rounded-2xl border border-border overflow-hidden card-warm shadow-xs h-full flex flex-col"
                    data-ocid={`makers.item.${idx + 1}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={getMakerImage(maker.name)}
                        alt={maker.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <span className="state-badge mb-2 self-start">
                        {maker.state}
                      </span>
                      <h2 className="font-display font-bold text-lg text-foreground mb-1.5">
                        {maker.name}
                      </h2>
                      <span className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-body font-semibold mb-2">
                        <ShieldCheck className="w-3 h-3" />
                        Verified Kitchen ✓
                      </span>
                      <p className="text-muted-foreground text-sm font-body leading-relaxed flex-1 line-clamp-3">
                        {maker.bio}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Link
                          to="/maker/$id"
                          params={{ id: maker.id.toString() }}
                          className="inline-flex items-center gap-1.5 text-saffron hover:text-terracotta font-semibold text-sm font-body transition-colors"
                          data-ocid={`makers.meet_link.${idx + 1}`}
                        >
                          Meet {maker.name.split(" ")[0]}{" "}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            toggle(maker.id.toString(), maker.name);
                          }}
                          data-ocid={`makers.favourite_toggle.${idx + 1}`}
                          className={`p-2 rounded-full border transition-all ${
                            savedIds.includes(maker.id.toString())
                              ? "bg-red-50 border-red-200 text-red-500"
                              : "bg-background border-border text-muted-foreground hover:border-red-300 hover:text-red-400"
                          }`}
                          title={
                            savedIds.includes(maker.id.toString())
                              ? "Remove from favourites"
                              : "Save to favourites"
                          }
                        >
                          <Heart
                            className={`w-4 h-4 transition-all ${
                              savedIds.includes(maker.id.toString())
                                ? "fill-red-500 stroke-red-500"
                                : ""
                            }`}
                          />
                        </button>
                      </div>
                      {getMakerStoryByName(maker.name) && (
                        <Link
                          to="/maker/$id"
                          params={{ id: maker.id.toString() }}
                          className="mt-1 inline-flex items-center gap-1 text-amber-700 hover:text-amber-900 text-xs font-body transition-colors italic"
                          data-ocid={`makers.story_link.${idx + 1}`}
                        >
                          📖 Read Her Story
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Values strip */}
      <section className="py-12 sm:py-16 deep-section">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: "🌶️", label: "Traditional Methods", value: "100%" },
              { icon: "🏠", label: "Home Kitchens", value: "5+" },
              { icon: "📍", label: "States", value: "5" },
              { icon: "💛", label: "Years of Experience", value: "25+ Avg" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="font-display text-2xl font-bold text-saffron mb-1">
                  {stat.value}
                </div>
                <div className="text-cream/70 text-xs font-body">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

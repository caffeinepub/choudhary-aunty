import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { STATES, STATE_BANNERS, getProductImage } from "@/constants/images";
import type { LocalProduct } from "@/constants/localData";
import type { Season } from "@/constants/seedData";
import { useGetAllProducts, useGetProductsByState } from "@/hooks/useQueries";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowRight, Filter, MapPin, Search, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface ShopSearch {
  state?: string;
}

type SeasonFilter = "all" | Season;

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const SEASON_OPTIONS: {
  value: SeasonFilter;
  label: string;
  color: string;
  bg: string;
}[] = [
  { value: "all", label: "All Seasons", color: "text-foreground", bg: "" },
  {
    value: "winter",
    label: "Winter ❄️",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
  },
  {
    value: "summer",
    label: "Summer ☀️",
    color: "text-orange-700",
    bg: "bg-orange-50 border-orange-200",
  },
  {
    value: "monsoon",
    label: "Monsoon 🌧️",
    color: "text-teal-700",
    bg: "bg-teal-50 border-teal-200",
  },
  {
    value: "spring",
    label: "Spring 🌸",
    color: "text-pink-700",
    bg: "bg-pink-50 border-pink-200",
  },
  {
    value: "all-season",
    label: "All-Season 🌿",
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
  },
];

const SEASON_BADGE: Record<Season, { label: string; cls: string }> = {
  winter: {
    label: "❄️ Winter",
    cls: "bg-blue-50 text-blue-700 border-blue-200",
  },
  summer: {
    label: "☀️ Summer",
    cls: "bg-orange-50 text-orange-700 border-orange-200",
  },
  monsoon: {
    label: "🌧️ Monsoon",
    cls: "bg-teal-50 text-teal-700 border-teal-200",
  },
  spring: {
    label: "🌸 Spring",
    cls: "bg-pink-50 text-pink-700 border-pink-200",
  },
  "all-season": {
    label: "🌿 All-Season",
    cls: "bg-green-50 text-green-700 border-green-200",
  },
};

export default function ShopPage() {
  const search = useSearch({ from: "/shop" }) as ShopSearch;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeason, setSelectedSeason] = useState<SeasonFilter>("all");
  const activeState = search.state ?? "";

  useEffect(() => {
    document.title = `Shop ${activeState ? `— ${activeState}` : "All Products"} | Choudhary Aunty`;
  }, [activeState]);

  const allProductsQuery = useGetAllProducts();
  const stateProductsQuery = useGetProductsByState(activeState);

  const rawProducts = (
    activeState
      ? (stateProductsQuery.data ?? [])
      : (allProductsQuery.data ?? [])
  ) as LocalProduct[];

  const isLoading = activeState
    ? stateProductsQuery.isLoading
    : allProductsQuery.isLoading;

  const products = rawProducts.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      (() => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      })();
    const matchesSeason =
      selectedSeason === "all" || (p as LocalProduct).season === selectedSeason;
    return matchesSearch && matchesSeason;
  });

  function handleStateFilter(state: string) {
    if (state === activeState) {
      navigate({ to: "/shop", search: { state: undefined } });
    } else {
      navigate({ to: "/shop", search: { state } });
    }
  }

  const stateBanner = activeState ? STATE_BANNERS[activeState] : null;

  return (
    <main className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-10 sm:py-14 mesh-bg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              {activeState ? `${activeState} Collection` : "All Products"}
            </span>
            <h1 className="section-heading text-3xl sm:text-4xl mt-1.5 mb-4">
              {activeState
                ? `Flavours of ${activeState}`
                : "Our Homemade Collection"}
            </h1>
            <p className="text-muted-foreground font-body max-w-lg">
              All products are freshly prepared over the weekend after order
              aggregation. Orders close every Thursday.
            </p>
          </motion.div>
        </div>
      </section>

      {/* State-Specific Banner */}
      <AnimatePresence>
        {stateBanner && (
          <motion.section
            key={activeState}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-[220px] sm:h-[280px] overflow-hidden"
          >
            <img
              src={stateBanner.image}
              alt={activeState}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <div className="max-w-xl text-cream">
                  {/* Festival badge */}
                  <span className="inline-flex items-center gap-1.5 bg-saffron/90 text-cream text-xs px-3 py-1 rounded-full font-body font-semibold mb-3 backdrop-blur-sm">
                    <Star className="w-3 h-3 fill-cream" />
                    {stateBanner.festival}
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-cream mb-1 leading-tight">
                    {activeState}
                  </h2>
                  <p className="font-body text-cream/80 text-sm mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {stateBanner.landmark}
                  </p>
                  <p className="font-display italic text-base sm:text-lg text-saffron-light mb-2">
                    "{stateBanner.tagline}"
                  </p>
                  <p className="font-body text-cream/70 text-xs mb-4">
                    {stateBanner.dishes}
                  </p>
                  <Link
                    to="/become-an-aunty"
                    className="inline-flex items-center gap-2 bg-saffron hover:bg-terracotta text-cream text-sm font-semibold px-4 py-2 rounded-full font-body transition-colors shadow-warm"
                    data-ocid="shop.become_aunty_link"
                  >
                    👩‍🍳 Join Our Family — Become a Maker
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 font-body"
                data-ocid="shop.search_input"
              />
            </div>

            {/* State filter indicator */}
            {activeState && (
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-saffron" />
                <span className="text-sm font-body text-muted-foreground">
                  Filtering by:
                </span>
                <button
                  type="button"
                  onClick={() =>
                    navigate({ to: "/shop", search: { state: undefined } })
                  }
                  className="state-badge hover:bg-saffron hover:text-cream transition-colors cursor-pointer"
                >
                  {activeState} ✕
                </button>
              </div>
            )}
          </div>

          {/* State Tabs — Live only */}
          <div className="flex flex-wrap gap-2 mb-3" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={!activeState}
              onClick={() => handleStateFilter("")}
              data-ocid="shop.state_tab"
              className={`px-4 py-2 rounded-full text-sm font-semibold font-body transition-all border ${
                !activeState
                  ? "bg-saffron text-cream border-saffron shadow-warm"
                  : "bg-background text-foreground/70 border-border hover:border-saffron/40 hover:text-saffron"
              }`}
            >
              All States
            </button>
            {STATES.filter((s) => s.live).map((state) => (
              <button
                type="button"
                key={state.name}
                role="tab"
                aria-selected={activeState === state.name}
                onClick={() => handleStateFilter(state.name)}
                data-ocid="shop.state_tab"
                className={`px-4 py-2 rounded-full text-sm font-semibold font-body transition-all border flex items-center gap-1.5 ${
                  activeState === state.name
                    ? "bg-saffron text-cream border-saffron shadow-warm"
                    : "bg-background text-foreground/70 border-border hover:border-saffron/40 hover:text-saffron"
                }`}
              >
                <span>{state.emoji}</span>
                {state.name}
              </button>
            ))}
          </div>
          {/* Coming soon states */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {STATES.filter((s) => !s.live).map((state) => (
              <span
                key={state.name}
                className="px-3 py-1 rounded-full text-xs font-body border border-dashed border-border text-muted-foreground flex items-center gap-1 opacity-60 cursor-not-allowed"
                title="Coming soon"
              >
                <span>{state.emoji}</span>
                {state.name}
                <span className="text-[9px] bg-muted px-1 rounded font-semibold">
                  SOON
                </span>
              </span>
            ))}
          </div>

          {/* Season Filter */}
          <div
            className="flex flex-wrap gap-2 mb-6"
            role="tablist"
            aria-label="Filter by season"
          >
            <span className="flex items-center text-xs font-body text-muted-foreground font-semibold uppercase tracking-wider mr-1 self-center">
              Season:
            </span>
            {SEASON_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="tab"
                aria-selected={selectedSeason === opt.value}
                onClick={() => setSelectedSeason(opt.value)}
                data-ocid="shop.season_tab"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-body transition-all border ${
                  selectedSeason === opt.value
                    ? opt.value === "all"
                      ? "bg-foreground text-background border-foreground"
                      : `${opt.bg} ${opt.color} border-current`
                    : "bg-background text-foreground/60 border-border hover:border-foreground/30"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }, (_, i) => `skeleton-${i}`).map(
                (key) => (
                  <div
                    key={key}
                    className="rounded-2xl overflow-hidden border border-border"
                  >
                    <Skeleton
                      className="aspect-[6/5] w-full"
                      data-ocid="shop.loading_state"
                    />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-5 w-1/3" />
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20" data-ocid="shop.empty_state">
              <div className="text-5xl mb-4">🍯</div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                {searchQuery
                  ? "No products match your search"
                  : activeState
                    ? `No products yet from ${activeState}`
                    : "No products available"}
              </h3>
              <p className="text-muted-foreground font-body text-sm mb-6 max-w-xs mx-auto">
                {searchQuery
                  ? "Try a different search term"
                  : selectedSeason !== "all"
                    ? "Try selecting a different season or clear the filter"
                    : "We're adding more products soon. Check back!"}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSeason("all");
                  navigate({ to: "/shop", search: { state: undefined } });
                }}
                className="text-saffron hover:text-terracotta font-semibold text-sm font-body underline underline-offset-2"
              >
                View all products
              </button>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {products.map((product, idx) => {
                const savings =
                  product.mrp > product.sellingPrice
                    ? Math.round(
                        ((product.mrp - product.sellingPrice) / product.mrp) *
                          100,
                      )
                    : 0;
                const localProduct = product as LocalProduct;
                return (
                  <motion.div key={product.id.toString()} variants={item}>
                    <div
                      className="group bg-card rounded-2xl border border-border overflow-hidden card-warm shadow-xs h-full flex flex-col"
                      data-ocid={`shop.product.item.${idx + 1}`}
                    >
                      <div className="aspect-[6/5] overflow-hidden relative">
                        <img
                          src={getProductImage(product.category, product.name)}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {savings > 0 && (
                          <div className="absolute top-3 left-3">
                            <span className="savings-badge">
                              {savings}% OFF
                            </span>
                          </div>
                        )}
                        {!product.isAvailable && (
                          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                            <span className="bg-background text-foreground font-semibold text-sm px-3 py-1 rounded-full font-body">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 mb-2">
                          <span className="state-badge">{product.state}</span>
                          <Badge
                            variant="outline"
                            className="text-xs border-border capitalize font-body"
                          >
                            {product.category}
                          </Badge>
                          {localProduct.season && (
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full border font-body font-medium ${SEASON_BADGE[localProduct.season].cls}`}
                            >
                              {SEASON_BADGE[localProduct.season].label}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display font-bold text-foreground text-base mb-1 leading-tight">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground text-xs font-body mb-2">
                          Min batch: {product.minBatchKg} kg
                        </p>
                        <p className="text-muted-foreground text-xs font-body line-clamp-2 flex-1 mb-3">
                          {product.description}
                        </p>
                        {/* Pack size */}
                        <p className="text-muted-foreground text-xs font-body mb-2 font-medium">
                          📦 Pack: 500g
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="price-selling">
                                ₹{product.sellingPrice}
                              </span>
                              {product.mrp > product.sellingPrice && (
                                <span className="price-mrp">
                                  ₹{product.mrp}
                                </span>
                              )}
                            </div>
                            {product.mrp > product.sellingPrice && (
                              <span className="savings-pill">
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
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}

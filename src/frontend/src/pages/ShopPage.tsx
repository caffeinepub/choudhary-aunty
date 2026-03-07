import type { RankedAd } from "@/backend.d";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { BatchCountdownBanner } from "@/components/ui/BatchCountdownBanner";
import {
  CapacityDot,
  LiquidityBadge,
  getProductBadgeTypes,
} from "@/components/ui/LiquidityBadge";
import { SkeletonProductCard } from "@/components/ui/SkeletonCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { STATES, STATE_BANNERS, getProductImage } from "@/constants/images";
import type { LocalProduct } from "@/constants/localData";
import type { AvailabilityType, Season } from "@/constants/seedData";
import { useActor } from "@/hooks/useActor";
import {
  useGetAllProducts,
  useGetProductsByState,
  useGetRankedAds,
} from "@/hooks/useQueries";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Filter,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

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

const PAGE_SIZE = 12;

// Active chefs per live state
const CHEF_COUNTS: Record<string, number> = {
  Bihar: 1,
  Haryana: 1,
  Punjab: 1,
  "Uttar Pradesh": 1,
  Uttarakhand: 1,
};

export default function ShopPage() {
  const search = useSearch({ from: "/shop" }) as ShopSearch;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<SeasonFilter>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDiet, setSelectedDiet] = useState("all");
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const activeState = search.state ?? "";

  // Debounce search input
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(value);
      setCurrentPage(1);
    }, 300);
  }, []);

  // Reset page when state filter changes (other filters handled via handleSearchChange)
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional page reset on filter changes
  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activeState,
    selectedSeason,
    selectedPriceRange,
    selectedCategory,
    selectedDiet,
  ]);

  useEffect(() => {
    document.title = `Shop ${activeState ? `— ${activeState}` : "All Products"} | Choudhary Aunty`;
  }, [activeState]);

  const allProductsQuery = useGetAllProducts();
  const stateProductsQuery = useGetProductsByState(activeState);

  // Sponsored / ranked ads
  const { data: rankedAds } = useGetRankedAds("", "");
  const { actor } = useActor();

  // Build a map: productId (string) → RankedAd
  const sponsoredMap = new Map<string, RankedAd>();
  if (rankedAds) {
    for (const ad of rankedAds) {
      sponsoredMap.set(ad.productId.toString(), ad);
    }
  }

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
      !debouncedSearch ||
      (() => {
        const q = debouncedSearch.toLowerCase();
        const ingredientsMatch = Array.isArray((p as LocalProduct).ingredients)
          ? (p as LocalProduct).ingredients.some((ing: string) =>
              ing.toLowerCase().includes(q),
            )
          : typeof (p as LocalProduct).ingredients === "string"
            ? ((p as LocalProduct).ingredients as unknown as string)
                .toLowerCase()
                .includes(q)
            : false;
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          ingredientsMatch
        );
      })();
    const matchesSeason =
      selectedSeason === "all" || (p as LocalProduct).season === selectedSeason;

    const matchesPrice = (() => {
      if (selectedPriceRange === "all") return true;
      const price = p.sellingPrice;
      if (selectedPriceRange === "under150") return price < 150;
      if (selectedPriceRange === "150-250") return price >= 150 && price <= 250;
      if (selectedPriceRange === "250-350") return price > 250 && price <= 350;
      if (selectedPriceRange === "350plus") return price > 350;
      return true;
    })();

    const matchesCategory =
      selectedCategory === "all" ||
      p.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesDiet = (() => {
      if (selectedDiet === "all" || selectedDiet === "veg") return true;
      // All products are veg — vegan returns nothing
      return false;
    })();

    return (
      matchesSearch &&
      matchesSeason &&
      matchesPrice &&
      matchesCategory &&
      matchesDiet
    );
  });

  // Count active advanced filters
  const activeAdvancedCount = [
    selectedPriceRange !== "all",
    selectedCategory !== "all",
    selectedDiet !== "all",
  ].filter(Boolean).length;

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
            className="relative w-full h-[140px] sm:h-[260px] overflow-hidden"
          >
            <img
              src={stateBanner.image}
              alt={activeState}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <div className="max-w-xl text-cream">
                  {/* Festival badge */}
                  <span className="inline-flex items-center gap-1.5 bg-saffron/90 text-cream text-xs px-3 py-1 rounded-full font-body font-semibold mb-3 backdrop-blur-sm">
                    <Star className="w-3 h-3 fill-cream" />
                    {stateBanner.festival}
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-cream mb-1 leading-tight [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
                    {activeState}
                  </h2>
                  <p className="font-body text-cream text-sm mb-1 flex items-center gap-1.5 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {stateBanner.landmark}
                  </p>
                  <p className="font-display italic text-base sm:text-lg text-saffron mb-2 [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]">
                    "{stateBanner.tagline}"
                  </p>
                  <p className="font-body text-cream/90 text-xs mb-4 [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
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
                placeholder="Search products, ingredients, chefs..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
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
          <div
            className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide pb-1"
            role="tablist"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!activeState}
              onClick={() => handleStateFilter("")}
              data-ocid="shop.state_tab"
              className={`px-4 py-2 rounded-full text-sm font-semibold font-body transition-all border whitespace-nowrap shrink-0 ${
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
                className={`px-4 py-2 rounded-full text-sm font-semibold font-body transition-all border flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
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
          <div className="flex gap-1.5 mb-4 overflow-x-auto scrollbar-hide pb-1">
            {STATES.filter((s) => !s.live).map((state) => (
              <span
                key={state.name}
                className="px-3 py-1 rounded-full text-xs font-body border border-dashed border-border text-muted-foreground flex items-center gap-1 opacity-60 cursor-not-allowed whitespace-nowrap shrink-0"
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
            className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-1"
            role="tablist"
            aria-label="Filter by season"
          >
            <span className="flex items-center text-xs font-body text-muted-foreground font-semibold uppercase tracking-wider mr-1 self-center whitespace-nowrap shrink-0">
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-body transition-all border whitespace-nowrap shrink-0 ${
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

          {/* Advanced Filters toggle (mobile) + desktop filters */}
          <div className="mb-4">
            {/* Mobile: toggle button */}
            <button
              type="button"
              onClick={() => setAdvancedFiltersOpen((v) => !v)}
              className="sm:hidden flex items-center gap-2 text-sm font-body font-semibold text-foreground border border-border rounded-full px-4 py-2 hover:border-saffron/50 transition-colors"
              data-ocid="shop.filters.toggle"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeAdvancedCount > 0 && (
                <span className="bg-saffron text-cream text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {activeAdvancedCount}
                </span>
              )}
            </button>

            {/* Advanced filter panels — always visible on desktop, toggle on mobile */}
            <div
              className={`${
                advancedFiltersOpen ? "block" : "hidden"
              } sm:block mt-3 sm:mt-0 space-y-3`}
            >
              {/* Price Range */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                <span className="flex items-center text-xs font-body text-muted-foreground font-semibold uppercase tracking-wider mr-1 self-center whitespace-nowrap shrink-0">
                  Price:
                </span>
                {[
                  { value: "all", label: "All Prices" },
                  { value: "under150", label: "Under ₹150" },
                  { value: "150-250", label: "₹150–₹250" },
                  { value: "250-350", label: "₹250–₹350" },
                  { value: "350plus", label: "₹350+" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSelectedPriceRange(opt.value)}
                    data-ocid="shop.price.tab"
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-body transition-all border whitespace-nowrap shrink-0 ${
                      selectedPriceRange === opt.value
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground/60 border-border hover:border-foreground/30"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Category */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                <span className="flex items-center text-xs font-body text-muted-foreground font-semibold uppercase tracking-wider mr-1 self-center whitespace-nowrap shrink-0">
                  Category:
                </span>
                {[
                  "all",
                  "achar",
                  "sweets",
                  "namkeen",
                  "snacks",
                  "ladoo",
                  "masala",
                  "chutney",
                  "barfi",
                ].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    data-ocid="shop.category.tab"
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-body transition-all border whitespace-nowrap shrink-0 capitalize ${
                      selectedCategory === cat
                        ? "bg-saffron text-cream border-saffron shadow-warm"
                        : "bg-background text-foreground/60 border-border hover:border-saffron/40"
                    }`}
                  >
                    {cat === "all" ? "All Categories" : cat}
                  </button>
                ))}
              </div>

              {/* Diet Type */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                <span className="flex items-center text-xs font-body text-muted-foreground font-semibold uppercase tracking-wider mr-1 self-center whitespace-nowrap shrink-0">
                  Diet:
                </span>
                {[
                  { value: "all", label: "All" },
                  { value: "veg", label: "Veg 🌿" },
                  { value: "vegan", label: "Vegan 🌱" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSelectedDiet(opt.value)}
                    data-ocid="shop.diet.tab"
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-body transition-all border whitespace-nowrap shrink-0 ${
                      selectedDiet === opt.value
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground/60 border-border hover:border-foreground/30"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Clear all advanced */}
              {activeAdvancedCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPriceRange("all");
                    setSelectedCategory("all");
                    setSelectedDiet("all");
                  }}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-body transition-colors"
                  data-ocid="shop.filters.clear_button"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Active filter badge pills */}
          {(searchQuery ||
            selectedSeason !== "all" ||
            activeAdvancedCount > 0 ||
            activeState) && (
            <div className="flex flex-wrap gap-2 mb-3">
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-saffron/10 border border-saffron/30 text-saffron text-xs font-body font-semibold px-2.5 py-1 rounded-full">
                  🔍 "{searchQuery}"
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="ml-0.5 hover:text-terracotta"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {activeState && (
                <span className="inline-flex items-center gap-1 bg-saffron/10 border border-saffron/30 text-saffron text-xs font-body font-semibold px-2.5 py-1 rounded-full">
                  📍 {activeState}
                  <button
                    type="button"
                    onClick={() =>
                      navigate({ to: "/shop", search: { state: undefined } })
                    }
                    className="ml-0.5 hover:text-terracotta"
                    aria-label="Clear state filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedSeason !== "all" && (
                <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-body font-semibold px-2.5 py-1 rounded-full">
                  {
                    SEASON_OPTIONS.find((s) => s.value === selectedSeason)
                      ?.label
                  }
                  <button
                    type="button"
                    onClick={() => setSelectedSeason("all")}
                    className="ml-0.5 hover:text-blue-900"
                    aria-label="Clear season filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedPriceRange !== "all" && (
                <span className="inline-flex items-center gap-1 bg-muted border border-border text-foreground text-xs font-body font-semibold px-2.5 py-1 rounded-full">
                  💰{" "}
                  {selectedPriceRange === "under150"
                    ? "Under ₹150"
                    : selectedPriceRange === "150-250"
                      ? "₹150–₹250"
                      : selectedPriceRange === "250-350"
                        ? "₹250–₹350"
                        : "₹350+"}
                  <button
                    type="button"
                    onClick={() => setSelectedPriceRange("all")}
                    className="ml-0.5 hover:text-muted-foreground"
                    aria-label="Clear price filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 bg-saffron/10 border border-saffron/30 text-saffron text-xs font-body font-semibold px-2.5 py-1 rounded-full capitalize">
                  🏷️ {selectedCategory}
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    className="ml-0.5 hover:text-terracotta"
                    aria-label="Clear category filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedDiet !== "all" && (
                <span className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-xs font-body font-semibold px-2.5 py-1 rounded-full">
                  🌿 {selectedDiet === "veg" ? "Veg" : "Vegan"}
                  <button
                    type="button"
                    onClick={() => setSelectedDiet("all")}
                    className="ml-0.5 hover:text-green-900"
                    aria-label="Clear diet filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Batch countdown banner */}
          <BatchCountdownBanner className="rounded-xl mb-4 border border-amber-200" />

          {/* Liquidity signals strip */}
          {!isLoading && products.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-body text-muted-foreground">
              <span>
                📦{" "}
                <span className="font-semibold text-foreground">
                  {products.length}
                </span>{" "}
                products available
              </span>
              <span className="text-border">•</span>
              <span>
                🔥{" "}
                <span className="font-semibold text-amber-700">
                  {Math.max(1, Math.floor(products.length * 0.1))} trending
                </span>{" "}
                this week
              </span>
              <span className="text-border">•</span>
              <span className="font-semibold text-terracotta">
                ⏰ Batch closes Friday
              </span>
              {activeState && CHEF_COUNTS[activeState] !== undefined && (
                <>
                  <span className="text-border">•</span>
                  <span>
                    👩‍🍳{" "}
                    <span className="font-semibold text-foreground">
                      {CHEF_COUNTS[activeState]} active chef
                      {CHEF_COUNTS[activeState] !== 1 ? "s" : ""}
                    </span>{" "}
                    in {activeState}
                  </span>
                </>
              )}
            </div>
          )}

          {/* Result count + pagination info */}
          {!isLoading &&
            products.length > 0 &&
            (() => {
              const totalPages = Math.ceil(products.length / PAGE_SIZE);
              const start = (currentPage - 1) * PAGE_SIZE + 1;
              const end = Math.min(currentPage * PAGE_SIZE, products.length);
              return (
                <p className="text-muted-foreground text-xs font-body mb-4">
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {start}–{end}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-foreground">
                    {products.length}
                  </span>{" "}
                  product{products.length !== 1 ? "s" : ""}
                  {totalPages > 1 && (
                    <span className="ml-1 text-muted-foreground">
                      (page {currentPage} of {totalPages})
                    </span>
                  )}
                </p>
              );
            })()}

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
              {Array.from({ length: PAGE_SIZE }, (_, i) => `skeleton-${i}`).map(
                (key) => (
                  <SkeletonProductCard key={key} />
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
                {selectedDiet === "vegan"
                  ? "All our products are made with ghee and milk — currently no vegan-certified items. We're working on it!"
                  : searchQuery
                    ? "Try a different search term"
                    : selectedSeason !== "all" || activeAdvancedCount > 0
                      ? "Try adjusting or clearing your filters"
                      : "We're adding more products soon. Check back!"}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSeason("all");
                  setSelectedPriceRange("all");
                  setSelectedCategory("all");
                  setSelectedDiet("all");
                  navigate({ to: "/shop", search: { state: undefined } });
                }}
                className="text-saffron hover:text-terracotta font-semibold text-sm font-body underline underline-offset-2"
              >
                View all products
              </button>
            </div>
          ) : (
            (() => {
              const totalPages = Math.ceil(products.length / PAGE_SIZE);
              const pageProducts = products.slice(
                (currentPage - 1) * PAGE_SIZE,
                currentPage * PAGE_SIZE,
              );
              return (
                <>
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5"
                  >
                    {pageProducts.map((product, idx) => {
                      const savings =
                        product.mrp > product.sellingPrice
                          ? Math.round(
                              ((product.mrp - product.sellingPrice) /
                                product.mrp) *
                                100,
                            )
                          : 0;
                      const localProduct = product as LocalProduct;
                      const sponsoredAd = sponsoredMap.get(
                        product.id.toString(),
                      );
                      const badges = getProductBadgeTypes(product.id);
                      const globalIdx = (currentPage - 1) * PAGE_SIZE + idx + 1;
                      return (
                        <motion.div
                          key={product.id.toString()}
                          variants={item}
                          onAnimationComplete={() => {
                            // Fire impression for sponsored products (fire-and-forget)
                            if (sponsoredAd && actor) {
                              actor
                                .recordAdImpression(
                                  sponsoredAd.campaignId,
                                  sponsoredAd.productId,
                                  sponsoredAd.makerId,
                                )
                                .catch(() => {
                                  /* silent */
                                });
                            }
                          }}
                        >
                          <div
                            className="group bg-card rounded-2xl border border-border overflow-hidden card-warm shadow-xs h-full flex flex-col"
                            data-ocid={`shop.product.item.${globalIdx}`}
                          >
                            <div className="aspect-[6/5] overflow-hidden relative">
                              <img
                                src={getProductImage(
                                  product.category,
                                  product.name,
                                )}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                              {/* Sponsored badge */}
                              {sponsoredAd && (
                                <div className="absolute top-2 left-2 z-10">
                                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border bg-amber-100 text-amber-800 border-amber-300 font-body font-semibold shadow-sm">
                                    ⭐ Sponsored
                                  </span>
                                </div>
                              )}
                              {savings > 0 && (
                                <div
                                  className={`absolute ${sponsoredAd ? "top-7" : "top-3"} left-3`}
                                >
                                  <span className="savings-badge">
                                    {savings}% OFF
                                  </span>
                                </div>
                              )}
                              {localProduct.availability && (
                                <div className="absolute top-3 right-3">
                                  <AvailabilityBadge
                                    availability={
                                      localProduct.availability as AvailabilityType
                                    }
                                  />
                                </div>
                              )}
                              {!product.isAvailable && (
                                <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                                  <span className="bg-background text-foreground font-semibold text-sm px-3 py-1 rounded-full font-body">
                                    Out of Stock
                                  </span>
                                </div>
                              )}
                              {/* Capacity dot */}
                              <div className="absolute bottom-2 right-2">
                                <CapacityDot productId={product.id} />
                              </div>
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                                <span className="state-badge">
                                  {product.state}
                                </span>
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
                              {/* Liquidity badges */}
                              <div className="flex flex-wrap gap-1 mb-2">
                                {badges.trending && (
                                  <LiquidityBadge type="trending" />
                                )}
                                {badges.soldOut && (
                                  <LiquidityBadge type="sold-out" />
                                )}
                              </div>
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
                                      ✦ Save ₹
                                      {product.mrp - product.sellingPrice}
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

                  {/* Pagination controls */}
                  {totalPages > 1 && (
                    <div
                      className="flex items-center justify-center gap-3 mt-8"
                      data-ocid="shop.pagination"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                        data-ocid="shop.pagination_prev"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold font-body border border-border bg-background text-foreground/70 hover:border-saffron/40 hover:text-saffron transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" /> Previous
                      </button>

                      <div className="flex items-center gap-1.5">
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1,
                        ).map((page) => (
                          <button
                            key={page}
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            data-ocid="shop.pagination.page_button"
                            className={`w-8 h-8 rounded-full text-xs font-semibold font-body transition-all border ${
                              page === currentPage
                                ? "bg-saffron text-cream border-saffron shadow-warm"
                                : "bg-background text-foreground/70 border-border hover:border-saffron/40 hover:text-saffron"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                        data-ocid="shop.pagination_next"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold font-body border border-border bg-background text-foreground/70 hover:border-saffron/40 hover:text-saffron transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Next <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Load More (fallback) */}
                  {totalPages > 1 && currentPage < totalPages && (
                    <div className="text-center mt-4">
                      <button
                        type="button"
                        onClick={() => setCurrentPage((p) => p + 1)}
                        data-ocid="shop.load_more_button"
                        className="text-saffron hover:text-terracotta text-xs font-semibold font-body underline underline-offset-2 transition-colors"
                      >
                        Load more products (
                        {products.length - currentPage * PAGE_SIZE} remaining)
                      </button>
                    </div>
                  )}
                </>
              );
            })()
          )}
        </div>
      </section>
    </main>
  );
}

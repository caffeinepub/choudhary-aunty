import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import {
  type CustomizationState,
  CustomizationWidget,
} from "@/components/CustomizationWidget";
import ReviewsSection from "@/components/ReviewsSection";
import { BatchCountdownBanner } from "@/components/ui/BatchCountdownBanner";
import { DemandAggregationWidget } from "@/components/ui/DemandAggregationWidget";
import {
  LiquidityBadge,
  getProductBadgeTypes,
} from "@/components/ui/LiquidityBadge";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PRODUCT_GALLERY_IMAGES,
  WHATSAPP_NUMBER,
  getProductImage,
} from "@/constants/images";
import type { LocalProduct } from "@/constants/localData";
import type { AvailabilityType } from "@/constants/seedData";
import { useAuth } from "@/context/AuthContext";
import { useActor } from "@/hooks/useActor";
import { useGetAllProducts, useGetProductById } from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  ChefHat,
  Clock,
  MessageCircle,
  ShieldCheck,
  Star,
  Users,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

const GALLERY_TABS = [
  { id: "hero", label: "Product" },
  { id: "ingredients", label: "Ingredients" },
  { id: "preparation", label: "Preparation" },
  { id: "usp", label: "Why Homemade?" },
  { id: "maker", label: "Meet the Aunty" },
] as const;

type GalleryTab = (typeof GALLERY_TABS)[number]["id"];

export default function ProductDetailPage() {
  const { id } = useParams({ from: "/product/$id" });
  const productId = BigInt(id);
  const [activeTab, setActiveTab] = useState<GalleryTab>("hero");
  const { customerAccount, isLoggedIn } = useAuth();
  const { actor } = useActor();

  const [customization, setCustomization] = useState<CustomizationState>({
    spiceLevel: "Medium Spice",
    oilLevel: "Medium Oil",
    saltLevel: "Medium Salt",
    sweetnessLevel: "Medium Sweet",
    portionSize: "Medium",
  });

  const productQuery = useGetProductById(productId);
  const allProductsQuery = useGetAllProducts();

  const product = productQuery.data;
  const relatedProducts = (allProductsQuery.data ?? [])
    .filter(
      (p) =>
        p.id !== productId &&
        (p.state === product?.state || p.category === product?.category),
    )
    .slice(0, 3);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Choudhary Aunty`;
    }
  }, [product]);

  // Pre-fill from taste profile when logged in
  const [prefilled, setPrefilled] = useState(false);
  useEffect(() => {
    if (!isLoggedIn || !customerAccount || prefilled) return;
    setCustomization((prev) => ({
      ...prev,
      spiceLevel: customerAccount.spicePreference || prev.spiceLevel,
      oilLevel: customerAccount.oilPreference || prev.oilLevel,
      sweetnessLevel:
        customerAccount.sweetnessPreference || prev.sweetnessLevel,
    }));
    setPrefilled(true);
  }, [isLoggedIn, customerAccount, prefilled]);

  async function handleOrderClick() {
    if (!actor || !product) return;

    // 1. Record order item with full customization (non-blocking)
    try {
      await actor.createOrderItem(
        BigInt(0), // placeholder order ID until order is confirmed
        product.id,
        1,
        customization.spiceLevel,
        customization.oilLevel,
        customization.saltLevel,
        customization.sweetnessLevel,
        customization.portionSize,
      );
    } catch {
      // silently ignore — WhatsApp order still goes through
    }

    // 2. Auto-update taste profile with selections from this order (non-blocking)
    if (isLoggedIn && customerAccount) {
      try {
        // Derive cuisine/region preference from product state
        const stateToRegion: Record<string, string> = {
          Bihar: "Bihar",
          Haryana: "Haryana",
          Punjab: "Punjab",
          "Uttar Pradesh": "Uttar Pradesh",
          Uttarakhand: "Uttarakhand",
          Rajasthan: "Rajasthan",
          Gujarat: "Gujarat",
          Maharashtra: "Maharashtra",
          "West Bengal": "West Bengal",
        };
        const newRegion =
          stateToRegion[product.state] || customerAccount.regionPreference;

        await actor.updateMyAccount(
          customerAccount.name,
          customerAccount.phone,
          customerAccount.email,
          customerAccount.city,
          customerAccount.state,
          customerAccount.dietType,
          customization.spiceLevel,
          customization.oilLevel,
          customization.sweetnessLevel,
          newRegion,
        );

        // Persist to localStorage too so profile page reflects update immediately
        const saved = localStorage.getItem("ca_customer_account");
        if (saved) {
          const parsed = JSON.parse(saved);
          parsed.spicePreference = customization.spiceLevel;
          parsed.oilPreference = customization.oilLevel;
          parsed.sweetnessPreference = customization.sweetnessLevel;
          parsed.regionPreference = newRegion;
          localStorage.setItem("ca_customer_account", JSON.stringify(parsed));
        }

        toast.success("Taste profile updated! 🌶️", {
          description: `${customization.spiceLevel} · ${customization.oilLevel} · ${customization.saltLevel} saved.`,
        });
      } catch {
        // silently ignore
      }
    }
  }

  const buildWhatsAppMessage = () => {
    if (!product) return "";
    const isSweetCategory = ["sweets", "ladoo", "barfi", "halwa"].includes(
      product.category.toLowerCase(),
    );
    const sweetnessLine = isSweetCategory
      ? `• Sweetness: ${customization.sweetnessLevel}\n`
      : "";
    // Portion size label with size hint
    const portionHints: Record<string, string> = {
      Small: "Small (~250g)",
      Medium: "Medium (~500g)",
      Large: "Large (~1kg)",
    };
    const portionLabel =
      portionHints[customization.portionSize] || customization.portionSize;
    return `Hi! I'd like to order *${product.name}* from Choudhary Aunty.\n\nProduct: ${product.name}\nState: ${product.state}\nPrice: ₹${product.sellingPrice}/500g\nMin Batch: ${product.minBatchKg} kg\n\n🎨 My Cooking Preferences:\n• Spice Level: ${customization.spiceLevel}\n• Oil Level: ${customization.oilLevel}\n• Salt Level: ${customization.saltLevel}\n${sweetnessLine}• Portion Size: ${portionLabel}\n\nPlease guide me on payment and dispatch. 🙏`;
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage())}`;

  function getGalleryImage(tab: GalleryTab): string {
    if (!product) return "";
    switch (tab) {
      case "hero":
        return getProductImage(product.category, product.name);
      case "ingredients":
        return PRODUCT_GALLERY_IMAGES.ingredients;
      case "preparation":
        return PRODUCT_GALLERY_IMAGES.preparation;
      case "usp":
        return PRODUCT_GALLERY_IMAGES.uspVsFactory;
      case "maker":
        return PRODUCT_GALLERY_IMAGES.meetMaker;
    }
  }

  function getGalleryCaption(tab: GalleryTab): { title: string; desc: string } {
    if (!product) return { title: "", desc: "" };
    switch (tab) {
      case "hero":
        return {
          title: product.name,
          desc: product.description,
        };
      case "ingredients":
        return {
          title: "Pure, Natural Ingredients",
          desc:
            product.ingredients.length > 0
              ? product.ingredients.join(" • ")
              : "Traditional blend of natural spices and ingredients — no artificial additives, no preservatives.",
        };
      case "preparation":
        return {
          title: "Traditional Preparation Method",
          desc:
            product.preparationMethod ||
            "Prepared using time-tested traditional methods, passed down through generations. Each step done by hand, with patience and love.",
        };
      case "usp":
        return {
          title: "Why Factory Products Kill the Goodness",
          desc: "Industrial food processing destroys enzymes, natural probiotics and authentic flavours through high-heat pasteurisation, chemical preservatives and artificial additives. Our homemakers use no shortcuts — just traditional methods that preserve every bit of nutrition and taste.",
        };
      case "maker":
        return {
          title: "The Aunty Behind This",
          desc:
            product.usp ||
            "Made with 35+ years of kitchen wisdom. When you order from Choudhary Aunty, you're not just buying food — you're supporting a woman's enterprise and preserving India's culinary heritage.",
        };
    }
  }

  if (productQuery.isLoading) {
    return (
      <main className="min-h-screen pt-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Skeleton
              className="aspect-square rounded-2xl"
              data-ocid="product.loading_state"
            />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-12 w-40 rounded-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center" data-ocid="product.error_state">
          <div className="text-5xl mb-4">🍯</div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Product not found
          </h2>
          <p className="text-muted-foreground font-body mb-6">
            This product may have been removed or is temporarily unavailable.
          </p>
          <Link
            to="/shop"
            search={{}}
            className="inline-flex items-center gap-2 bg-saffron text-cream font-semibold px-5 py-2.5 rounded-full font-body"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const savings =
    product.mrp > product.sellingPrice
      ? Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)
      : 0;

  const caption = getGalleryCaption(activeTab);
  const liquidityBadges = getProductBadgeTypes(product.id);

  return (
    <main className="min-h-screen pt-16 pb-24 sm:pb-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-4 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-body text-muted-foreground mb-6">
          <Link to="/" className="hover:text-saffron transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            to="/shop"
            search={{}}
            className="hover:text-saffron transition-colors"
          >
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Batch countdown banner */}
        <BatchCountdownBanner className="rounded-xl mb-6 border border-amber-200" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Left: 5-image gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main gallery image */}
            <div className="aspect-[4/3] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-card border border-border shadow-warm relative">
              <motion.img
                key={activeTab}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={getGalleryImage(activeTab)}
                alt={caption.title}
                className="w-full h-full object-cover"
              />
              {savings > 0 && activeTab === "hero" && (
                <div className="absolute top-4 left-4">
                  <span className="savings-badge text-sm px-3 py-1">
                    {savings}% OFF
                  </span>
                </div>
              )}
              {!product.isAvailable && activeTab === "hero" && (
                <div className="absolute inset-0 rounded-2xl bg-foreground/30 flex items-center justify-center">
                  <span className="bg-background text-foreground font-semibold px-4 py-2 rounded-full font-body">
                    Out of Stock
                  </span>
                </div>
              )}
              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 rounded-b-2xl">
                <p className="text-white/90 text-xs font-body font-semibold uppercase tracking-wider mb-1">
                  {GALLERY_TABS.find((t) => t.id === activeTab)?.label}
                </p>
                <p className="text-white text-sm font-body leading-snug line-clamp-2">
                  {caption.desc}
                </p>
              </div>
            </div>

            {/* Thumbnail nav — scrollable on mobile */}
            <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
              {GALLERY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  data-ocid="product.gallery.tab"
                  aria-label={tab.label}
                  className={`shrink-0 w-14 h-14 sm:flex-1 sm:w-auto sm:aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activeTab === tab.id
                      ? "border-saffron shadow-warm"
                      : "border-border opacity-60 hover:opacity-100 hover:border-saffron/40"
                  }`}
                >
                  <img
                    src={getGalleryImage(tab.id)}
                    alt={tab.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            {/* Gallery tab labels — scrollable on mobile */}
            <div className="flex gap-2 mt-2 overflow-x-auto scrollbar-hide pb-0.5">
              {GALLERY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 w-14 sm:flex-1 text-center text-[10px] font-body font-semibold leading-tight transition-colors py-1 ${
                    activeTab === tab.id
                      ? "text-saffron"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="state-badge">{product.state}</span>
              <Badge
                variant="outline"
                className="text-xs border-border capitalize font-body"
              >
                {product.category}
              </Badge>
              {product.isAvailable ? (
                <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-body font-semibold">
                  <CheckCircle className="w-3 h-3" /> Available
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full font-body font-semibold">
                  <AlertCircle className="w-3 h-3" /> Unavailable
                </span>
              )}
              {(product as LocalProduct).availability && (
                <AvailabilityBadge
                  availability={
                    (product as LocalProduct).availability as AvailabilityType
                  }
                />
              )}
            </div>

            {/* Name */}
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              {product.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-saffron text-saffron" />
              ))}
              <span className="text-muted-foreground text-xs font-body ml-1.5">
                Quality assured by Choudhary Aunty
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3">
              <span className="price-selling text-2xl">
                ₹{product.sellingPrice}
              </span>
              {product.mrp > product.sellingPrice && (
                <>
                  <span className="price-mrp text-base">₹{product.mrp}</span>
                  <span className="savings-badge">
                    Save ₹{product.mrp - product.sellingPrice}
                  </span>
                </>
              )}
            </div>

            {/* Liquidity badges */}
            <div className="flex flex-wrap gap-2">
              {liquidityBadges.trending && <LiquidityBadge type="trending" />}
              <LiquidityBadge type="ordered-this-week" productId={product.id} />
              {liquidityBadges.soldOut && <LiquidityBadge type="sold-out" />}
            </div>

            {/* Description */}
            <p className="text-foreground/75 font-body text-base leading-relaxed">
              {product.description}
            </p>

            {/* Demand Aggregation Widget */}
            <DemandAggregationWidget
              productId={product.id}
              minBatchKg={product.minBatchKg}
            />

            {/* Min Batch Info */}
            <div className="bg-saffron/8 border border-saffron/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm font-body mb-1">
                    Minimum Batch: {product.minBatchKg} kg
                  </p>
                  <p className="text-muted-foreground text-xs font-body leading-relaxed">
                    This product requires a minimum of {product.minBatchKg} kg
                    to maintain authentic taste and quality. Orders aggregate
                    till <strong>Friday</strong> — prepared fresh over the
                    weekend, dispatched Monday. If your order is below minimum,
                    we notify you and hold it till batch fills.
                  </p>
                </div>
              </div>
            </div>

            {/* Customization Widget */}
            <CustomizationWidget
              category={product.category}
              onChange={setCustomization}
              initialState={{
                spiceLevel: customerAccount?.spicePreference || "Medium Spice",
                oilLevel: customerAccount?.oilPreference || "Medium Oil",
                sweetnessLevel:
                  customerAccount?.sweetnessPreference || "Medium Sweet",
              }}
            />

            {/* WhatsApp Order Button */}
            {product.isAvailable ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="product.whatsapp_button"
                onClick={() => handleOrderClick()}
                className="flex items-center justify-center gap-2 whatsapp-btn px-6 py-4 text-base font-semibold w-full sm:w-auto"
              >
                <SiWhatsapp className="w-5 h-5" />
                Order on WhatsApp
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="flex items-center justify-center gap-2 bg-muted text-muted-foreground px-6 py-4 rounded-full text-base font-semibold cursor-not-allowed font-body w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5" />
                Currently Unavailable
              </button>
            )}

            {/* Payment Info Card */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-display font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                💳 Payment & Dispatch Process
              </h3>
              <div className="space-y-2.5">
                {[
                  {
                    icon: "1️⃣",
                    text: "Place order via WhatsApp with your details",
                  },
                  {
                    icon: "2️⃣",
                    text: "Pay 50% advance via UPI to confirm your order",
                  },
                  {
                    icon: "3️⃣",
                    text: "Orders aggregate till Friday, prepared over the weekend",
                  },
                  {
                    icon: "4️⃣",
                    text: "Pay balance 50% + logistics when order is ready",
                  },
                  { icon: "5️⃣", text: "Dispatched after full payment — No COD" },
                ].map((step) => (
                  <div key={step.icon} className="flex items-start gap-2.5">
                    <span className="text-base leading-none mt-0.5">
                      {step.icon}
                    </span>
                    <p className="text-muted-foreground text-xs font-body">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-xs font-body font-semibold">
                  ⚠️ No Cash on Delivery. UPI payment only. Logistics charged at
                  actuals.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===== DETAILED SECTIONS ===== */}
        <div className="mt-14 space-y-8">
          {/* Ingredients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center bg-card rounded-2xl border border-border overflow-hidden"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={PRODUCT_GALLERY_IMAGES.ingredients}
                alt="Natural Ingredients"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
                Pure & Natural
              </span>
              <h2 className="section-heading text-2xl sm:text-3xl mt-2 mb-4">
                🌿 Ingredients
              </h2>
              {product.ingredients.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {product.ingredients.map((ing) => (
                    <div
                      key={ing}
                      className="flex items-center gap-2 text-sm font-body text-foreground/80"
                    >
                      <span className="w-2 h-2 rounded-full bg-saffron shrink-0" />
                      {ing}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  Traditional blend of natural spices — mustard seeds,
                  fenugreek, turmeric, red chili, fennel and cold-pressed
                  mustard oil. No artificial colour, no chemical preservatives,
                  no MSG. Just the real thing.
                </p>
              )}
              <div className="mt-5 flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                <p className="text-green-700 text-xs font-body font-semibold">
                  No artificial preservatives. No chemicals. No shortcuts.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Preparation Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center bg-card rounded-2xl border border-border overflow-hidden"
          >
            <div className="p-6 sm:p-8 order-2 lg:order-1">
              <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
                The Craft
              </span>
              <h2 className="section-heading text-2xl sm:text-3xl mt-2 mb-4 flex items-center gap-2">
                <ChefHat className="w-6 h-6 text-saffron" />
                Preparation Method
              </h2>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                {product.preparationMethod ||
                  "Prepared using time-tested traditional methods passed down through generations. Each step is done by hand — from selecting raw ingredients at the local bazaar to the final sealing of jars. No machines, no shortcuts."}
              </p>
              <div className="grid grid-cols-3 gap-3 mt-5">
                {[
                  { icon: "⏱️", label: "Weekend Prep", sub: "Fri–Sun only" },
                  { icon: "🤲", label: "Handcrafted", sub: "No machines" },
                  { icon: "🌞", label: "Sun-Dried", sub: "Natural process" },
                ].map((f) => (
                  <div
                    key={f.label}
                    className="bg-background rounded-xl p-3 border border-border text-center"
                  >
                    <div className="text-xl mb-1">{f.icon}</div>
                    <div className="text-xs font-display font-bold text-foreground">
                      {f.label}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-body">
                      {f.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-[4/3] overflow-hidden order-1 lg:order-2">
              <img
                src={PRODUCT_GALLERY_IMAGES.preparation}
                alt="Traditional Preparation"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Why Homemade vs Factory */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center bg-card rounded-2xl border border-border overflow-hidden"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={PRODUCT_GALLERY_IMAGES.uspVsFactory}
                alt="Homemade vs Factory"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
                The Real Difference
              </span>
              <h2 className="section-heading text-2xl sm:text-3xl mt-2 mb-4">
                Why Factory Products Kill the Goodness
              </h2>
              <div className="space-y-3">
                {[
                  {
                    id: "enzymes",
                    factory:
                      "High-heat processing destroys natural enzymes & probiotics",
                    homemade:
                      "Sun-dried & slow-processed — preserves all natural goodness",
                  },
                  {
                    id: "preservatives",
                    factory:
                      "Chemical preservatives (sodium benzoate, citric acid, EDTA)",
                    homemade:
                      "Salt & spices are the only preservatives — the natural way",
                  },
                  {
                    id: "colour",
                    factory:
                      "Artificial colours & flavour enhancers for visual appeal",
                    homemade:
                      "Natural turmeric & chili give colour — no artificial dyes",
                  },
                  {
                    id: "freshness",
                    factory: "Made in bulk batches months in advance",
                    homemade:
                      "Made fresh every week only after orders are received",
                  },
                ].map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-2 gap-3 text-xs font-body"
                  >
                    <div className="flex items-start gap-1.5 text-red-700 bg-red-50 rounded-lg p-2.5 border border-red-100">
                      <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-red-500" />
                      <span>{row.factory}</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-green-700 bg-green-50 rounded-lg p-2.5 border border-green-100">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-green-500" />
                      <span>{row.homemade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Meet the Aunty */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center bg-card rounded-2xl border border-border overflow-hidden"
          >
            <div className="p-6 sm:p-8 order-2 lg:order-1">
              <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
                The Hands Behind This Product
              </span>
              <h2 className="section-heading text-2xl sm:text-3xl mt-2 mb-2 flex items-center gap-2">
                <Users className="w-6 h-6 text-saffron" />
                Meet the Aunty
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-muted-foreground font-body text-xs">
                  From{" "}
                  <span className="font-semibold text-foreground">
                    {product.state}
                  </span>
                </p>
                <span className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-xs px-2 py-0.5 rounded-full font-body font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Kitchen ✓
                </span>
              </div>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-5">
                {product.usp ||
                  "Behind every jar is a woman with decades of kitchen wisdom. She selected these spices herself at the local bazaar. She tested this recipe on her own family first. And she puts her name — and her dignity — behind every product she ships."}
              </p>
              <blockquote className="border-l-2 border-saffron pl-4 mb-5">
                <p className="font-display italic text-foreground/80 text-sm">
                  "Sapne kabhi old nahin hote."
                </p>
                <p className="text-xs text-muted-foreground font-body mt-1">
                  Dreams never grow old.
                </p>
              </blockquote>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-saffron hover:text-terracotta font-body transition-colors"
              >
                <SiWhatsapp className="w-4 h-4" />
                Order directly from this maker →
              </a>
            </div>
            <div className="aspect-[4/3] overflow-hidden order-1 lg:order-2">
              <img
                src={PRODUCT_GALLERY_IMAGES.meetMaker}
                alt="Meet the Maker"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <ReviewsSection productName={product.name} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <Separator className="mb-10" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-2xl text-foreground">
                You May Also Like
              </h2>
              <Link
                to="/shop"
                search={{}}
                className="text-saffron hover:text-terracotta text-sm font-semibold font-body transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {relatedProducts.map((rp) => {
                const rpSavings =
                  rp.mrp > rp.sellingPrice
                    ? Math.round(((rp.mrp - rp.sellingPrice) / rp.mrp) * 100)
                    : 0;
                return (
                  <Link
                    key={rp.id.toString()}
                    to="/product/$id"
                    params={{ id: rp.id.toString() }}
                    className="group bg-card rounded-2xl border border-border overflow-hidden card-warm shadow-xs"
                  >
                    <div className="aspect-[6/4] overflow-hidden relative">
                      <img
                        src={getProductImage(rp.category, rp.name)}
                        alt={rp.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {rpSavings > 0 && (
                        <div className="absolute top-2 left-2">
                          <span className="savings-badge text-xs">
                            {rpSavings}% OFF
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <span className="state-badge mb-2 inline-block">
                        {rp.state}
                      </span>
                      <h3 className="font-display font-bold text-sm text-foreground mb-1">
                        {rp.name}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-saffron font-bold text-sm font-body">
                          ₹{rp.sellingPrice}
                        </span>
                        {rp.mrp > rp.sellingPrice && (
                          <span className="text-muted-foreground text-xs line-through font-body">
                            ₹{rp.mrp}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky WhatsApp Button */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden z-40 p-4 bg-background/95 backdrop-blur-sm border-t border-border">
        {product.isAvailable ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="product.order_button"
            onClick={() => handleOrderClick()}
            className="flex items-center justify-center gap-2 whatsapp-btn px-6 py-4 text-base font-semibold w-full"
          >
            <SiWhatsapp className="w-5 h-5" />
            Order on WhatsApp — ₹{product.sellingPrice}
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="flex items-center justify-center gap-2 bg-muted text-muted-foreground px-6 py-4 rounded-full text-base font-semibold w-full font-body cursor-not-allowed"
          >
            Currently Unavailable
          </button>
        )}
      </div>
    </main>
  );
}

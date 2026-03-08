import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { BatchCountdownBanner } from "@/components/ui/BatchCountdownBanner";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BLOG_POSTS } from "@/constants/blogData";
import {
  HERO_IMAGE,
  STATES,
  WHATSAPP_NUMBER,
  buildWhatsAppUrl,
  getMakerImage,
  getProductImage,
} from "@/constants/images";
import { getMakerStoryByName } from "@/constants/makerStories";
import { useActor } from "@/hooks/useActor";
import {
  useGetAllMakers,
  useGetAllTestimonials,
  useGetStateCounts,
} from "@/hooks/useQueries";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ChefHat,
  Heart,
  MessageCircle,
  Play,
  Share2,
  ShoppingBag,
  Star,
  Truck,
  Users,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiFacebook, SiInstagram, SiWhatsapp, SiX } from "react-icons/si";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── Animated Counter ───────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// ─── Avatar helper ──────────────────────────────────────────────────────────
function getAvatarBg(name: string): string {
  const colors = [
    "bg-saffron/20 text-saffron",
    "bg-terracotta/20 text-terracotta",
    "bg-burgundy/20 text-burgundy",
    "bg-amber-200/60 text-amber-800",
    "bg-rose-200/60 text-rose-700",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

// ─── Customer photo map ─────────────────────────────────────────────────────
const CUSTOMER_PHOTOS: Record<string, string> = {
  "Meena Sharma": "/assets/generated/customer-meena.dim_200x200.jpg",
  "Rohit Kapoor": "/assets/generated/customer-rohit.dim_200x200.jpg",
  "Priya Agarwal": "/assets/generated/customer-priya.dim_200x200.jpg",
  "Kavita Mishra": "/assets/generated/customer-kavita.dim_200x200.jpg",
  "Sunita Verma": "/assets/generated/customer-sunita.dim_200x200.jpg",
};

export default function HomePage() {
  const { actor } = useActor();
  const makersQuery = useGetAllMakers();
  const testimonialsQuery = useGetAllTestimonials();
  const stateCountsQuery = useGetStateCounts();
  const navigate = useNavigate();

  // Seed data on first load
  useEffect(() => {
    if (!actor) return;
    const seed = async () => {
      try {
        const makers = await actor.getAllMakers();
        if (makers.length === 0) {
          await actor.seedData();
        }
      } catch {
        // ignore
      }
    };
    seed();
  }, [actor]);

  // Set page title
  useEffect(() => {
    document.title =
      "Choudhary Aunty | Homemade Traditional Indian Food | Authentic Regional Recipes";
  }, []);

  const makers = makersQuery.data ?? [];
  const testimonials = testimonialsQuery.data ?? [];
  const stateCounts = stateCountsQuery.data ?? [];

  function getStateCount(stateName: string): number {
    const found = stateCounts.find((s) => s.state === stateName);
    return found ? Number(found.count) : 0;
  }

  const shareText = encodeURIComponent(
    "Check out Choudhary Aunty — authentic homemade regional Indian food! Order achar, ladoo, sweets and more from real homemakers across India. 🍯 www.choudharyaunty.com",
  );

  return (
    <main className="min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative h-[70vh] min-h-[480px] max-h-[680px] flex items-end overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Traditional Indian homemade food"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />

        {/* Decorative grain */}
        <div className="absolute inset-0 opacity-[0.04] [background-image:url(data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%221%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url%28%23n%29%22%2F%3E%3C%2Fsvg%3E)] pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-saffron" />
              <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
                Straight from Amma Ki Rasoi
              </span>
            </div>

            <h1 className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 max-w-3xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Made This Weekend.
              <br />
              <span className="text-amber-300 italic">For You.</span>
            </h1>

            <p className="text-white/95 text-lg sm:text-xl font-body mb-2 max-w-xl leading-relaxed [text-shadow:0_2px_8px_rgba(0,0,0,0.7)]">
              Not last month. Not last year. This weekend — by a real woman, in
              a real kitchen, from a recipe that's older than any brand you've
              seen on a shelf.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Link
                to="/shop"
                search={{}}
                data-ocid="hero.explore_button"
                className="inline-flex items-center gap-2 bg-saffron hover:bg-terracotta text-cream font-semibold px-6 py-3.5 rounded-full transition-colors shadow-warm-lg font-body"
              >
                Explore Our Flavours
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/story"
                className="inline-flex items-center gap-2 bg-cream/15 hover:bg-cream/25 text-cream font-semibold px-6 py-3.5 rounded-full transition-colors border border-cream/30 backdrop-blur-sm font-body"
              >
                Our Story
              </Link>
            </div>
            <p className="text-white/90 text-xs sm:text-sm font-body italic [text-shadow:0_2px_8px_rgba(0,0,0,0.7)]">
              Order by Friday. Fresh in your hands by Sunday. Pan India
              delivery.
            </p>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 flex items-center gap-4 sm:gap-10"
          >
            {[
              { label: "Homemakers", value: "5+" },
              { label: "States", value: "23" },
              { label: "Recipes", value: "50+" },
              { label: "Happy Families", value: "100+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-xl sm:text-2xl font-bold text-amber-300 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
                  {stat.value}
                </div>
                <div className="text-white/90 text-xs font-body mt-0.5 [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== BATCH COUNTDOWN STRIP ===== */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-2.5 flex items-center justify-between gap-4">
          <p className="text-amber-900 text-sm font-body font-medium">
            <span className="font-semibold">Next batch closes Friday</span> —
            order now for Monday delivery
          </p>
          <Link
            to="/shop"
            search={{}}
            data-ocid="home.batch_cta_link"
            className="inline-flex items-center gap-1.5 text-saffron hover:text-terracotta text-xs font-semibold font-body whitespace-nowrap transition-colors shrink-0"
          >
            Order Now <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* ===== IMPACT NUMBERS MATRIX ===== */}
      <section className="py-10 sm:py-24 deep-section relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-saffron/8 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-turmeric/8 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-saffron/50" />
              <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
                The Impact
              </span>
              <div className="h-px w-8 bg-saffron/50" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight mb-4">
              Numbers That Tell a{" "}
              <span className="text-saffron italic">Woman's Story</span>
            </h2>
            <p className="text-cream/80 font-body text-base sm:text-lg max-w-xl mx-auto">
              Every number is a woman's dream — and a family's dignity.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6"
          >
            {[
              {
                icon: "👩",
                value: 50,
                suffix: "+",
                label: "Women Empowered",
                sub: "Building enterprise from their kitchen",
              },
              {
                icon: "💰",
                value: 15000,
                prefix: "₹",
                suffix: "+",
                label: "Monthly Earnings",
                sub: "Active sellers earning per month",
              },
              {
                icon: "🌸",
                value: 120,
                suffix: "+",
                label: "Young Women Supporting",
                sub: "Joining & supporting our aunties",
              },
              {
                icon: "📍",
                value: 28,
                suffix: "",
                label: "States Being Covered",
                sub: "Across India — North to South",
              },
              {
                icon: "🍯",
                value: 50,
                suffix: "+",
                label: "Authentic Recipes",
                sub: "Traditional recipes listed & sold",
              },
              {
                icon: "🏡",
                value: 10000,
                suffix: "+",
                label: "Families Served",
                sub: "Delivering authentic taste pan-India",
              },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                variants={item}
                className="bg-cream/5 border border-cream/10 rounded-2xl p-3 sm:p-6 text-center hover:bg-cream/8 transition-colors"
                data-ocid={`impact.item.${idx + 1}`}
              >
                <div className="text-2xl sm:text-4xl mb-2 sm:mb-3">
                  {stat.icon}
                </div>
                <div className="font-display text-xl sm:text-3xl md:text-4xl font-bold text-saffron leading-none mb-1 sm:mb-2">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix ?? ""}
                  />
                </div>
                <div className="text-cream font-display font-semibold text-sm mb-1">
                  {stat.label}
                </div>
                <div className="text-cream/80 font-body text-xs leading-snug">
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mt-10"
          >
            <Link
              to="/become-an-aunty"
              data-ocid="impact.become_aunty_button"
              className="inline-flex items-center gap-2 bg-saffron hover:bg-terracotta text-cream font-semibold px-7 py-3.5 rounded-full transition-colors font-body shadow-warm-lg"
            >
              Join Our Movement <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== NO FACTORY FOOD TRUST STRIP ===== */}
      <section className="py-6 sm:py-8 bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4"
          >
            <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">
              No Factory Food
            </h2>
            <p className="text-muted-foreground font-body text-sm mt-1">
              Directly from the world's most hygienic place — the Home Kitchen
            </p>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto"
          >
            {[
              {
                icon: ShoppingBag,
                label: "Order by Thursday",
                sub: "Place via WhatsApp",
              },
              {
                icon: ChefHat,
                label: "Cooked Fresh",
                sub: "Home kitchen, weekend batch",
              },
              {
                icon: Truck,
                label: "Delivered Monday+",
                sub: "Packed with care, pan India",
              },
            ].map((trust, idx) => (
              <motion.div
                key={trust.label}
                variants={item}
                className="flex flex-col items-center text-center gap-2"
                data-ocid={`trust.item.${idx + 1}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-saffron/10 border border-saffron/20 flex items-center justify-center">
                  <trust.icon className="w-6 h-6 text-saffron" />
                </div>
                <div>
                  <p className="font-display font-bold text-xs sm:text-sm text-foreground leading-tight">
                    {trust.label}
                  </p>
                  <p className="text-muted-foreground text-[10px] sm:text-xs font-body mt-0.5">
                    {trust.sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== BIHAR KI RASOI FEATURE BANNER ===== */}
      <section className="py-8 sm:py-14 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl shadow-warm-lg"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.52 0.18 43) 0%, oklch(0.44 0.15 36) 45%, oklch(0.34 0.12 28) 100%)",
            }}
            data-ocid="home.bihar_rasoi.panel"
          >
            {/* Decorative grain overlay */}
            <div className="absolute inset-0 opacity-[0.05] [background-image:url(data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%221%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url%28%23n%29%22%2F%3E%3C%2Fsvg%3E)] pointer-events-none" />

            {/* Decorative blobs */}
            <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-saffron/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-amber-300/10 blur-3xl pointer-events-none" />

            {/* Large decorative text */}
            <div className="absolute top-4 right-6 text-[120px] sm:text-[160px] leading-none opacity-[0.07] font-display font-black text-cream select-none pointer-events-none">
              बिहार
            </div>

            <div className="relative z-10 p-7 sm:p-12">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
                {/* Left: copy */}
                <div className="flex-1 min-w-0">
                  {/* Eyebrow */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-green-500 text-white text-[10px] font-bold font-body px-2.5 py-1 rounded-full shadow">
                      🔴 Now Live
                    </span>
                    <span className="text-saffron/80 text-xs tracking-[0.3em] uppercase font-body font-semibold">
                      State-Based Marketplace
                    </span>
                  </div>

                  <h2 className="font-display font-black text-cream text-3xl sm:text-4xl lg:text-5xl leading-tight mb-2">
                    Choose Your Aunty,
                    <br />
                    <span className="text-amber-300 italic">
                      Order Your Batch.
                    </span>
                  </h2>

                  <p className="text-cream/80 font-body text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                    Bihar's first verified home-kitchen marketplace is live.
                    Browse traditional recipes, pick your variant, and{" "}
                    <strong className="text-cream font-semibold">
                      choose the aunty who prepares your order.
                    </strong>
                  </p>

                  {/* Trust pillars */}
                  <div className="flex flex-wrap gap-3 sm:gap-4 mb-7">
                    {[
                      { icon: "🏠", label: "Home Kitchen Only" },
                      { icon: "👩‍🍳", label: "Verified Aunties" },
                      { icon: "📦", label: "2 kg Minimum Batch" },
                    ].map((trust) => (
                      <div
                        key={trust.label}
                        className="flex items-center gap-2 bg-cream/10 border border-cream/20 rounded-xl px-3 py-2 backdrop-blur-sm"
                      >
                        <span className="text-base leading-none">
                          {trust.icon}
                        </span>
                        <span className="text-cream/90 text-xs font-body font-semibold whitespace-nowrap">
                          {trust.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    to="/state/bihar"
                    data-ocid="home.bihar_rasoi.primary_button"
                    className="inline-flex items-center gap-2.5 bg-amber-300 hover:bg-amber-200 text-burgundy font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-[1.03] font-body text-sm shadow-warm-lg"
                  >
                    Explore Bihar ki Rasoi
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Right: stat cards */}
                <div className="flex-shrink-0 grid grid-cols-3 lg:grid-cols-1 gap-3 w-full lg:w-40">
                  {[
                    { value: "8", label: "Products" },
                    { value: "6", label: "Aunties" },
                    { value: "3", label: "Regions" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-cream/10 border border-cream/20 rounded-2xl p-3 sm:p-4 text-center backdrop-blur-sm"
                    >
                      <div className="font-display font-black text-amber-300 text-2xl sm:text-3xl leading-none">
                        {stat.value}
                      </div>
                      <div className="text-cream/75 text-[11px] font-body mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SHOP BY STATE ===== */}
      <section className="py-8 sm:py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-5"
          >
            <div>
              <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
                Regional Flavours
              </span>
              <h2 className="section-heading text-2xl sm:text-3xl mt-1">
                Shop by State
              </h2>
            </div>
            <Link
              to="/shop"
              search={{}}
              className="text-saffron text-xs font-body font-semibold hover:text-terracotta flex items-center gap-1 whitespace-nowrap"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>

          {/* Live States — compact grid */}
          <div className="mb-5">
            <p className="text-[10px] font-body font-semibold text-saffron tracking-widest uppercase mb-2">
              Now Available
            </p>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3"
            >
              {STATES.filter((s) => s.live).map((state) => {
                const count = getStateCount(state.name);
                const chefCount = {
                  Bihar: 6,
                  Haryana: 1,
                  Punjab: 1,
                  "Uttar Pradesh": 1,
                  Uttarakhand: 1,
                } as Record<string, number>;
                const numChefs = chefCount[state.name] ?? 0;
                const isBiharLive = state.name === "Bihar";
                return (
                  <motion.div key={state.name} variants={item}>
                    {isBiharLive ? (
                      <Link
                        to="/state/bihar"
                        data-ocid="home.shop_by_state.bihar_link"
                        className="group w-full bg-card hover:bg-saffron/5 border-2 border-saffron/50 hover:border-saffron rounded-xl p-2.5 sm:p-3 text-left transition-all card-warm shadow-warm relative block"
                        aria-label="Explore Bihar ki Rasoi"
                      >
                        <div className="absolute top-1.5 right-1.5">
                          <span className="bg-green-500 text-white text-[8px] font-bold font-body px-1.5 py-0.5 rounded-full shadow-sm">
                            Live
                          </span>
                        </div>
                        <div className="text-2xl mb-1.5">{state.emoji}</div>
                        <h3 className="font-display font-bold text-foreground text-xs leading-tight mb-0.5">
                          {state.name}
                        </h3>
                        <p className="text-muted-foreground text-[10px] font-body">
                          {count > 0 ? `${count} products` : "8 products"}
                        </p>
                        {numChefs > 0 && (
                          <p className="text-muted-foreground text-[9px] font-body mt-0.5">
                            👩‍🍳 {numChefs} aunties
                          </p>
                        )}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          navigate({
                            to: "/shop",
                            search: { state: state.name },
                          })
                        }
                        data-ocid="shop.state_tab"
                        className="group w-full bg-card hover:bg-saffron/5 border border-border hover:border-saffron/40 rounded-xl p-2.5 sm:p-3 text-left transition-all card-warm shadow-xs"
                        aria-label={`Shop ${state.name} products`}
                      >
                        <div className="text-2xl mb-1.5">{state.emoji}</div>
                        <h3 className="font-display font-bold text-foreground text-xs leading-tight mb-0.5">
                          {state.name}
                        </h3>
                        <p className="text-muted-foreground text-[10px] font-body">
                          {count > 0 ? `${count} products` : "Available now"}
                        </p>
                        {numChefs > 0 && (
                          <p className="text-muted-foreground text-[9px] font-body mt-0.5">
                            👩‍🍳 {numChefs} chef{numChefs !== 1 ? "s" : ""}
                          </p>
                        )}
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Coming Soon — only 4 states */}
          <div>
            <p className="text-[10px] font-body font-semibold text-muted-foreground tracking-widest uppercase mb-2">
              Coming Soon
            </p>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-4 gap-2 sm:gap-3"
            >
              {STATES.filter((s) => !s.live)
                .slice(0, 4)
                .map((state) => (
                  <motion.div key={state.name} variants={item}>
                    <div className="w-full bg-muted/30 border border-dashed border-border rounded-xl p-2.5 text-center group hover:border-saffron/30 transition-all">
                      <div className="text-xl mb-1">{state.emoji}</div>
                      <h3 className="font-display font-semibold text-foreground/60 text-[10px] leading-tight">
                        {state.name}
                      </h3>
                      <p className="text-muted-foreground/70 text-[9px] font-body mt-0.5">
                        Coming soon
                      </p>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED MAKERS ===== */}
      <section className="py-8 sm:py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-10"
          >
            <div>
              <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
                Meet the Makers
              </span>
              <h2 className="section-heading text-3xl sm:text-4xl mt-1.5">
                The Hands Behind Your Food
              </h2>
            </div>
            <Link
              to="/makers"
              className="inline-flex items-center gap-1.5 text-saffron hover:text-terracotta font-semibold text-sm font-body transition-colors whitespace-nowrap"
            >
              Meet All Makers <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {makersQuery.isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
                <div key={i} className="rounded-2xl overflow-hidden">
                  <Skeleton className="aspect-[4/5] w-full" />
                  <div className="p-3 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
            >
              {makers.slice(0, 5).map((maker, idx) => {
                const makerStory = getMakerStoryByName(maker.name);
                return (
                  <motion.div key={maker.id.toString()} variants={item}>
                    <div
                      className="group rounded-2xl overflow-hidden border border-border card-warm bg-background shadow-xs flex flex-col h-full"
                      data-ocid={`makers.item.${idx + 1}`}
                    >
                      <Link
                        to="/maker/$id"
                        params={{ id: maker.id.toString() }}
                        className="block"
                      >
                        <div className="aspect-[4/5] overflow-hidden">
                          <img
                            src={getMakerImage(maker.name)}
                            alt={maker.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-3 pb-1">
                          <div className="state-badge mb-2">{maker.state}</div>
                          <h3 className="font-display font-semibold text-sm text-foreground leading-tight">
                            {maker.name}
                          </h3>
                          <p className="text-muted-foreground text-xs font-body mt-1 line-clamp-2">
                            {maker.bio}
                          </p>
                          {makerStory && (
                            <p className="text-amber-700/80 text-[11px] font-serif italic mt-1.5 line-clamp-1">
                              "{makerStory.tagline}"
                            </p>
                          )}
                        </div>
                      </Link>
                      {makerStory && (
                        <div className="px-3 pb-3 pt-1">
                          <Link
                            to="/maker/$id"
                            params={{ id: maker.id.toString() }}
                            className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-900 text-[11px] font-body italic transition-colors"
                            data-ocid={`home.maker.story_link.${idx + 1}`}
                          >
                            📖 Her Story →
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* ===== SAMPLE PRODUCTS ===== */}
      <section className="py-8 sm:py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-6 sm:mb-10"
          >
            <div>
              <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
                Our Products
              </span>
              <h2 className="section-heading text-3xl sm:text-4xl mt-1.5">
                Popular Picks
              </h2>
            </div>
            <Link
              to="/shop"
              search={{}}
              className="inline-flex items-center gap-1.5 text-saffron hover:text-terracotta font-semibold text-sm font-body transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Static sample product cards for display */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {[
              {
                image: getProductImage("achar"),
                name: "Aam Ka Achar",
                maker: "Anju Choudhary",
                state: "Bihar",
                mrp: 350,
                price: 280,
                minBatch: "5 kg",
                category: "Pickle",
                availability: "seasonal" as const,
              },
              {
                image: getProductImage("sweets"),
                name: "Besan Ke Ladoo",
                maker: "Sarla Maasi",
                state: "UP",
                mrp: 450,
                price: 380,
                minBatch: "2 kg",
                category: "Sweets",
                availability: "available-today" as const,
              },
              {
                image: getProductImage("namkeen"),
                name: "Namakpara",
                maker: "Babita Tai",
                state: "Haryana",
                mrp: 250,
                price: 200,
                minBatch: "1 kg",
                category: "Snacks",
                availability: "available-today" as const,
              },
            ].map((product, productIdx) => {
              const savings = Math.round(
                ((product.mrp - product.price) / product.mrp) * 100,
              );
              return (
                <motion.div key={product.name} variants={item}>
                  <div
                    className="group bg-background rounded-2xl border border-border overflow-hidden card-warm shadow-xs"
                    data-ocid={`home.product.item.${productIdx + 1}`}
                  >
                    <div className="aspect-[6/5] overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="savings-badge">{savings}% OFF</span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <AvailabilityBadge
                          availability={product.availability}
                        />
                      </div>
                    </div>
                    <div className="p-3 sm:p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="state-badge">{product.state}</span>
                        <Badge
                          variant="outline"
                          className="text-xs border-border"
                        >
                          {product.category}
                        </Badge>
                      </div>
                      <h3 className="font-display font-bold text-foreground text-base mb-1">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-xs font-body mb-1">
                        by {product.maker} • {product.state}
                      </p>
                      <p className="text-muted-foreground text-xs font-body mb-3 font-medium">
                        📦 Pack: 500g
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="price-selling">
                              ₹{product.price}
                            </span>
                            <span className="price-mrp">₹{product.mrp}</span>
                          </div>
                          <span className="savings-pill">
                            ✦ Save ₹{product.mrp - product.price}
                          </span>
                        </div>
                        <Link
                          to="/shop"
                          search={{}}
                          className="text-saffron hover:text-terracotta text-sm font-semibold font-body transition-colors flex items-center gap-1"
                        >
                          View <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                      <p className="text-muted-foreground text-xs font-body mt-2">
                        Min batch: {product.minBatch}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-8 sm:py-20 mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              What They Say
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl mt-1.5">
              Voices from Our Customers
            </h2>
          </motion.div>

          {/* Static testimonials (shown while data loads) */}
          {testimonials.length === 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                {
                  name: "Meena Sharma",
                  location: "Delhi",
                  rating: 5,
                  message:
                    "The achar from Anju ji is exactly like my dadi used to make! I've been ordering every week. The taste is unbelievable — you can feel the love in every bite.",
                },
                {
                  name: "Rohit Kapoor",
                  location: "Mumbai",
                  rating: 5,
                  message:
                    "Got the Besan Ladoo for Diwali and my entire family was asking where I bought them from. Pure ghee, authentic recipe — nothing like the store-bought ones.",
                },
                {
                  name: "Priya Agarwal",
                  location: "Bangalore",
                  rating: 5,
                  message:
                    "Finally found something that tastes like home! The namakpara from Babita ji is crispy, light and perfectly spiced. Already placed my second order.",
                },
                {
                  name: "Kavita Mishra",
                  location: "Pune",
                  rating: 5,
                  message:
                    "Ordered the Tilkut from Bihar for my father who grew up there. He cried when he tasted it — said it tasted exactly like his childhood. Thank you Anju ji.",
                },
                {
                  name: "Sunita Verma",
                  location: "Hyderabad",
                  rating: 5,
                  message:
                    "The customer service is amazing — they kept me updated throughout the weekend batch process. And the namakpara? Gone in 2 days in my house!",
                },
              ].map((t, testimonialIdx) => (
                <motion.div key={t.name} variants={item}>
                  <div
                    className="testimonial-card"
                    data-ocid={`testimonials.item.${testimonialIdx + 1}`}
                  >
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mb-3">
                      {Array.from(
                        { length: t.rating },
                        (_, i) => `star-${i}`,
                      ).map((starKey) => (
                        <Star
                          key={starKey}
                          className="w-4 h-4 fill-saffron text-saffron"
                        />
                      ))}
                    </div>
                    {/* Quote */}
                    <p className="text-foreground/85 text-sm font-body leading-relaxed flex-1 italic">
                      {t.message}
                    </p>
                    {/* Customer */}
                    <div className="mt-5 pt-4 border-t border-border/60 flex items-center gap-3">
                      {CUSTOMER_PHOTOS[t.name] ? (
                        <img
                          src={CUSTOMER_PHOTOS[t.name]}
                          alt={t.name}
                          className="testimonial-avatar"
                        />
                      ) : (
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 testimonial-avatar ${getAvatarBg(t.name)}`}
                        >
                          <span className="font-display font-bold text-base">
                            {t.name[0]}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-sm text-foreground font-body">
                          {t.name}
                        </div>
                        <div className="text-xs text-muted-foreground font-body flex items-center gap-1 flex-wrap">
                          <span>📍 {t.location}</span>
                          <span className="text-emerald-600 font-semibold">
                            ✓ Verified Customer
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {testimonials.map((t, testimonialIdx) => (
                <motion.div key={t.id.toString()} variants={item}>
                  <div
                    className="testimonial-card"
                    data-ocid={`testimonials.item.${testimonialIdx + 1}`}
                  >
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mb-3">
                      {Array.from(
                        { length: Number(t.rating) },
                        (_, i) => `star-${i}`,
                      ).map((starKey) => (
                        <Star
                          key={starKey}
                          className="w-4 h-4 fill-saffron text-saffron"
                        />
                      ))}
                    </div>
                    {/* Quote */}
                    <p className="text-foreground/85 text-sm font-body leading-relaxed flex-1 italic">
                      {t.message}
                    </p>
                    {/* Customer */}
                    <div className="mt-5 pt-4 border-t border-border/60 flex items-center gap-3">
                      {CUSTOMER_PHOTOS[t.customerName] ? (
                        <img
                          src={CUSTOMER_PHOTOS[t.customerName]}
                          alt={t.customerName}
                          className="testimonial-avatar"
                        />
                      ) : (
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 testimonial-avatar ${getAvatarBg(t.customerName)}`}
                        >
                          <span className="font-display font-bold text-base">
                            {t.customerName[0]}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-sm text-foreground font-body">
                          {t.customerName}
                        </div>
                        <div className="text-xs text-muted-foreground font-body flex items-center gap-1 flex-wrap">
                          <span>📍 {t.location}</span>
                          <span className="text-emerald-600 font-semibold">
                            ✓ Verified Customer
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ===== INSTAGRAM REELS SECTION ===== */}
      <section className="py-8 sm:py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            {/* Instagram gradient eyebrow */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white text-xs px-4 py-1.5 rounded-full font-body font-semibold mb-4">
              <SiInstagram className="w-3.5 h-3.5" />
              @choudharyaunty
            </div>
            <h2 className="section-heading text-3xl sm:text-4xl mt-1.5">
              Watch Our Kitchen Stories
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-xl mx-auto">
              📱 Watch our reels and stories — follow us on Instagram for live
              kitchen moments
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8"
          >
            {[
              {
                caption: "Anju ji's aam ka achar — made fresh this weekend 🫙",
                gradient: "from-amber-800 via-orange-900 to-stone-900",
                emoji: "🫙",
              },
              {
                caption: "5 kg mangoes, 3 hours of love. The real process 🌿",
                gradient: "from-green-900 via-emerald-800 to-stone-900",
                emoji: "🥭",
              },
              {
                caption:
                  "Babita Tai's namakpara gets crispy because she kneads 40 minutes by hand 👐",
                gradient: "from-yellow-900 via-amber-800 to-stone-900",
                emoji: "🤌",
              },
              {
                caption:
                  "Sarla Maasi's Diwali ladoo ritual — 40 years in the making ✨",
                gradient: "from-rose-900 via-pink-800 to-stone-900",
                emoji: "✨",
              },
            ].map((reel, idx) => (
              <motion.a
                key={reel.caption}
                variants={item}
                href="https://www.instagram.com/choudharyaunty"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid={`instagram.item.${idx + 1}`}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative aspect-[3/4] sm:aspect-[9/16] rounded-2xl overflow-hidden shadow-warm cursor-pointer"
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${reel.gradient}`}
                />
                {/* Noise texture overlay */}
                <div className="absolute inset-0 opacity-[0.06] [background-image:url(data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url%28%23n%29%22%2F%3E%3C%2Fsvg%3E)]" />
                {/* Emoji decoration */}
                <div className="absolute top-3 left-3 text-2xl">
                  {reel.emoji}
                </div>
                {/* Instagram icon top-right */}
                <div className="absolute top-3 right-3">
                  <SiInstagram className="w-4 h-4 text-white/60 group-hover:text-white/90 transition-colors" />
                </div>
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/30 transition-all group-hover:scale-110">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                </div>
                {/* Caption at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <p className="text-white text-[10px] sm:text-xs font-body leading-tight line-clamp-3 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
                    {reel.caption}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <div className="text-center">
            <a
              href="https://www.instagram.com/choudharyaunty"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="instagram.follow_button"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold px-7 py-3.5 rounded-full transition-opacity hover:opacity-90 font-body shadow-warm-lg"
            >
              <SiInstagram className="w-5 h-5" />
              Follow @choudharyaunty on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ===== WHY SUPPORT US ===== */}
      <section className="py-10 sm:py-24 deep-section relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-saffron blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-turmeric blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-saffron fill-saffron" />
              <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
                Our Purpose
              </span>
              <Heart className="w-5 h-5 text-saffron fill-saffron" />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream mb-6 leading-tight">
              Why Support This Initiative?
            </h2>

            <p className="text-cream/80 text-base sm:text-lg font-body leading-relaxed mb-6 max-w-2xl mx-auto">
              We are empowering women who are the backbone of our existence. To
              make them relevant and value-adders to the family, society and
              self — and empower them for a{" "}
              <span className="text-saffron font-semibold">
                dignified later stage of life
              </span>{" "}
              by making them financially independent and adding activeness via
              enterprise to their lives.
            </p>

            <blockquote className="border-l-2 border-saffron pl-6 text-left max-w-lg mx-auto mb-8">
              <p className="font-accent text-xl sm:text-2xl italic text-cream/90">
                "Every pickle jar carries a memory. Every sweet tells a story."
              </p>
            </blockquote>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[
                { icon: "💪", label: "Financial Independence" },
                { icon: "🏛️", label: "Cultural Preservation" },
                { icon: "🤝", label: "Community Building" },
                { icon: "🌱", label: "Dignified Living" },
              ].map((v) => (
                <div
                  key={v.label}
                  className="bg-cream/5 rounded-xl p-4 border border-cream/10"
                >
                  <div className="text-2xl mb-2">{v.icon}</div>
                  <div className="text-cream/90 text-xs font-body font-semibold">
                    {v.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SEASONAL SPECIALS ===== */}
      <section className="py-8 sm:py-20 mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Limited Season
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl mt-1.5">
              Seasonal Specials & Festival Favourites
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-lg mx-auto">
              Traditions come alive with flavour — order in time for your next
              celebration
            </p>
          </motion.div>

          <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible scrollbar-hide">
            {[
              {
                emoji: "🪔",
                name: "Diwali Sweets Collection",
                products: "Besan Ladoo, Mathura Peda, Pinni",
                season: "Oct–Nov",
                color: "from-amber-700 to-amber-900",
              },
              {
                emoji: "🌊",
                name: "Chhath Prasad Box",
                products: "Thekua, Tilkut, Makhana Namkeen",
                season: "Oct–Nov",
                color: "from-yellow-700 to-yellow-900",
              },
              {
                emoji: "🌾",
                name: "Makar Sankranti Box",
                products: "Gajak, Til Ladoo, Churma",
                season: "January",
                color: "from-orange-700 to-orange-900",
              },
              {
                emoji: "🎨",
                name: "Holi Special",
                products: "Gujiya, Namakpara, Mathri",
                season: "March",
                color: "from-pink-700 to-pink-900",
              },
              {
                emoji: "🤝",
                name: "Raksha Bandhan Mithai",
                products: "Besan Ladoo, Barfi, Thekua",
                season: "August",
                color: "from-red-700 to-red-900",
              },
              {
                emoji: "🌙",
                name: "Eid Special",
                products: "Sheer Khurma Mix, Sewai, Mathri",
                season: "Variable",
                color: "from-emerald-700 to-emerald-900",
              },
            ].map((festival, idx) => (
              <motion.div
                key={festival.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="shrink-0 w-72 sm:w-auto"
                data-ocid={`seasonal.item.${idx + 1}`}
              >
                <div
                  className={`relative bg-gradient-to-br ${festival.color} rounded-2xl overflow-hidden p-5 h-full text-cream shadow-warm`}
                >
                  <div className="text-4xl mb-3">{festival.emoji}</div>
                  <Badge
                    variant="outline"
                    className="text-[10px] border-cream/40 text-cream font-body mb-2"
                  >
                    {festival.season}
                  </Badge>
                  <h3 className="font-display font-bold text-base mb-1">
                    {festival.name}
                  </h3>
                  <p className="text-cream/90 text-xs font-body mb-4 [text-shadow:0_1px_3px_rgba(0,0,0,0.3)]">
                    {festival.products}
                  </p>
                  <a
                    href={buildWhatsAppUrl(
                      `Hi! I'd like to pre-order the "${festival.name}" (${festival.season}). Please guide me.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid={`seasonal.order_button.${idx + 1}`}
                    className="inline-flex items-center gap-1.5 bg-cream/15 hover:bg-cream/25 text-cream text-xs font-semibold px-4 py-2 rounded-full transition-colors font-body border border-cream/20"
                  >
                    Pre-order Now <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CORPORATE ORDERS STRIP ===== */}
      <section className="py-8 bg-saffron/5 border-y border-saffron/15">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-saffron shrink-0" />
              <div>
                <p className="font-display font-bold text-foreground text-base">
                  Gifting for Your Team or Event?
                </p>
                <p className="text-muted-foreground text-xs font-body">
                  Corporate hampers with custom branding. Min 20 units. Pan
                  India delivery.
                </p>
              </div>
            </div>
            <Link
              to="/corporate-orders"
              data-ocid="home.corporate_button"
              className="inline-flex items-center gap-2 bg-saffron hover:bg-terracotta text-cream font-semibold px-5 py-2.5 rounded-full transition-colors font-body text-sm whitespace-nowrap shrink-0"
            >
              Enquire for Bulk Orders <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== BLOG PREVIEW ===== */}
      <section className="py-8 sm:py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-6 sm:mb-10"
          >
            <div>
              <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
                Kitchen Stories
              </span>
              <h2 className="section-heading text-3xl sm:text-4xl mt-1.5">
                From Our Kitchen Stories
              </h2>
            </div>
            <Link
              to="/blog"
              data-ocid="home.blog_link"
              className="inline-flex items-center gap-1.5 text-saffron hover:text-terracotta font-semibold text-sm font-body transition-colors whitespace-nowrap"
            >
              Read All Stories <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
          >
            {BLOG_POSTS.slice(0, 3).map((post, idx) => (
              <motion.div key={post.slug} variants={item}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  data-ocid={`home.blog.item.${idx + 1}`}
                  className="group block bg-background rounded-2xl border border-border overflow-hidden card-warm shadow-xs h-full flex flex-col"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={post.heroImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-[10px] border-saffron/30 text-saffron font-body"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="font-display font-bold text-foreground text-sm leading-snug mb-2 flex-1 line-clamp-3">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between pt-3 border-t border-border mt-2">
                      <span className="text-xs text-muted-foreground font-body">
                        {post.author}
                      </span>
                      <span className="text-xs text-saffron font-semibold font-body group-hover:text-terracotta transition-colors flex items-center gap-1">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SPREAD THE LOVE / HELP US GROW ===== */}
      <section className="py-8 sm:py-20 mesh-bg border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Share2 className="w-10 h-10 text-saffron mx-auto mb-4" />
            <h2 className="section-heading text-3xl sm:text-4xl mb-4">
              Spread the Love
            </h2>
            <p className="text-muted-foreground font-body text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Share our stories in your network, social media pages, and
              WhatsApp groups. Every share helps an aunty build her enterprise
              and a family gain financial dignity.
            </p>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 mb-8 sm:mb-10">
              <a
                href={`https://wa.me/?text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="home.whatsapp_share"
                className="flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1da851] text-white font-semibold px-4 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all duration-200 hover:scale-105 shadow-warm font-body text-sm"
              >
                <SiWhatsapp className="w-4 h-4 shrink-0" />
                <span className="truncate">Share on WhatsApp</span>
              </a>
              <a
                href="https://www.instagram.com/choudharyaunty"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="home.instagram_share"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-4 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all duration-200 hover:scale-105 hover:opacity-90 font-body text-sm"
              >
                <SiInstagram className="w-4 h-4 shrink-0" />
                <span className="truncate">Follow on Instagram</span>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://www.choudharyaunty.com")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="home.facebook_share"
                className="flex items-center justify-center gap-2 bg-[#1877f2] hover:bg-[#1565d8] text-white font-semibold px-4 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all duration-200 hover:scale-105 font-body text-sm"
              >
                <SiFacebook className="w-4 h-4 shrink-0" />
                <span className="truncate">Share on Facebook</span>
              </a>
              <a
                href={`https://x.com/intent/tweet?text=${shareText}&url=${encodeURIComponent("https://www.choudharyaunty.com")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="home.twitter_share"
                className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-black text-white font-semibold px-4 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all duration-200 hover:scale-105 font-body text-sm"
              >
                <SiX className="w-4 h-4 shrink-0" />
                <span className="truncate">Share on X</span>
              </a>
            </div>

            {/* Ambassador card */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden card-warm shadow-xs text-left">
              <img
                src="/assets/generated/ambassador-program-hero.dim_800x500.jpg"
                alt="Become a Choudhary Aunty Ambassador"
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <Badge
                  variant="outline"
                  className="text-xs border-saffron/30 text-saffron font-body mb-2"
                >
                  Ambassador Program
                </Badge>
                <h3 className="font-display font-bold text-foreground text-base mb-2">
                  Become Our Ambassador
                </h3>
                <p className="text-muted-foreground font-body text-sm italic leading-relaxed mb-4">
                  "Generations have savoured your recipes in silence. It's time
                  your name carried as far as your flavours."
                </p>
                <ul className="space-y-1.5 mb-4">
                  {[
                    "Share our story in your network & social media",
                    "Earn rewards for every successful referral",
                    "Help aunties grow their home enterprise",
                  ].map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-xs font-body text-muted-foreground"
                    >
                      <Star className="w-3.5 h-3.5 text-saffron mt-0.5 shrink-0 fill-saffron/20" />
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href={buildWhatsAppUrl(
                    "Hi! I want to become a Choudhary Aunty Ambassador. Please tell me more.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="home.ambassador_button"
                  className="inline-flex items-center gap-2 whatsapp-btn px-5 py-2.5 text-sm font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  Join as Ambassador
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== ORDER TRACKER TEASER ===== */}
      <section className="py-8 bg-saffron/5 border-y border-saffron/15">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
          >
            <p className="font-body text-foreground/80 text-sm">
              <span className="font-semibold text-foreground">
                Already placed an order?
              </span>{" "}
              Track its progress through each stage of the weekend batch
              process.
            </p>
            <Link
              to="/order-tracker"
              data-ocid="home.order_tracker_link"
              className="inline-flex items-center gap-2 text-saffron hover:text-terracotta font-semibold text-sm font-body whitespace-nowrap transition-colors shrink-0"
            >
              Track Your Order <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL WHATSAPP CTA ===== */}
      <section className="py-14 bg-card border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-6 bg-saffron/8 rounded-2xl border border-saffron/20">
              <p className="font-display text-lg font-semibold text-foreground mb-3">
                Ready to taste the difference?
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Choudhary Aunty! I want to place an order. Please guide me.")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="home.order_button"
                className="inline-flex items-center gap-2 whatsapp-btn px-6 py-3 font-semibold"
              >
                <MessageCircle className="w-5 h-5" />
                Order via WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

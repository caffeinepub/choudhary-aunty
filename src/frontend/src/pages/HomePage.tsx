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
  Gift,
  Heart,
  MessageCircle,
  Share2,
  ShoppingBag,
  Star,
  Truck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
      <section className="relative h-[90vh] min-h-[560px] max-h-[780px] flex items-end overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Traditional Indian homemade food"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy/90 via-burgundy/50 to-burgundy/10" />

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

            <h1 className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream mb-4 max-w-3xl">
              Made This Weekend.
              <br />
              <span className="text-saffron italic">For You.</span>
            </h1>

            <p className="text-cream/85 text-lg sm:text-xl font-body mb-2 max-w-xl leading-relaxed">
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
            <p className="text-cream/55 text-xs sm:text-sm font-body italic">
              Order by Friday. Fresh in your hands by Sunday. Pan India
              delivery.
            </p>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 flex items-center gap-6 sm:gap-10"
          >
            {[
              { label: "Homemakers", value: "5+" },
              { label: "States", value: "23" },
              { label: "Recipes", value: "50+" },
              { label: "Happy Families", value: "100+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-xl sm:text-2xl font-bold text-saffron">
                  {stat.value}
                </div>
                <div className="text-cream/60 text-xs font-body mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-16 sm:py-20 mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              The Process
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl mt-2">
              How Your Order Reaches You
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-xl mx-auto">
              Fresh, authentic, and made with love — here's how our weekly batch
              process works
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative"
          >
            {/* Connecting line */}
            <div className="hidden sm:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-saffron/20 z-0" />

            {[
              {
                icon: ShoppingBag,
                step: "01",
                day: "By Thursday",
                title: "Browse & Order",
                desc: "Explore products from our homemakers, pick your favourites, and place your order via WhatsApp by Thursday.",
                color: "text-saffron",
                bg: "bg-saffron/10",
              },
              {
                icon: ChefHat,
                step: "02",
                day: "Weekend",
                title: "Fresh Preparation",
                desc: "Your aunty prepares your order fresh from scratch over the weekend using traditional methods and fresh ingredients.",
                color: "text-terracotta",
                bg: "bg-terracotta/10",
              },
              {
                icon: Truck,
                step: "03",
                day: "Monday Onwards",
                title: "Dispatched with Love",
                desc: "After quality check and your final payment confirmation, your order is carefully packed and dispatched to you.",
                color: "text-warmBrown",
                bg: "bg-warmBrown/10",
              },
            ].map((step) => (
              <motion.div
                key={step.step}
                variants={item}
                className="relative z-10 bg-card rounded-2xl p-6 sm:p-8 border border-border card-warm shadow-xs"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center mb-5`}
                >
                  <step.icon className={`w-7 h-7 ${step.color}`} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold tracking-widest text-muted-foreground font-body">
                    STEP {step.step}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs border-saffron/30 text-saffron font-body"
                  >
                    {step.day}
                  </Badge>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED MAKERS ===== */}
      <section className="py-16 sm:py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
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
              {makers.slice(0, 5).map((maker, idx) => (
                <motion.div key={maker.id.toString()} variants={item}>
                  <Link
                    to="/maker/$id"
                    params={{ id: maker.id.toString() }}
                    className="group block rounded-2xl overflow-hidden border border-border card-warm bg-background shadow-xs"
                    data-ocid={`makers.item.${idx + 1}`}
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={getMakerImage(maker.name)}
                        alt={maker.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <div className="state-badge mb-2">{maker.state}</div>
                      <h3 className="font-display font-semibold text-sm text-foreground leading-tight">
                        {maker.name}
                      </h3>
                      <p className="text-muted-foreground text-xs font-body mt-1 line-clamp-2">
                        {maker.bio}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ===== SHOP BY STATE ===== */}
      <section className="py-16 sm:py-20 mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Regional Flavours
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl mt-1.5">
              Shop by State
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-lg mx-auto">
              Each state has its own food identity. Discover the distinctive
              flavours from across North India.
            </p>
          </motion.div>

          {/* Live States */}
          <div className="mb-4">
            <p className="text-xs font-body font-semibold text-saffron tracking-widest uppercase mb-3">
              Now Available
            </p>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
            >
              {STATES.filter((s) => s.live).map((state) => {
                const count = getStateCount(state.name);
                return (
                  <motion.div key={state.name} variants={item}>
                    <button
                      type="button"
                      onClick={() =>
                        navigate({ to: "/shop", search: { state: state.name } })
                      }
                      data-ocid="shop.state_tab"
                      className="group w-full bg-card hover:bg-saffron/5 border border-border hover:border-saffron/40 rounded-2xl p-5 text-left transition-all card-warm shadow-xs"
                      aria-label={`Shop ${state.name} products`}
                    >
                      <div className="text-3xl mb-3">{state.emoji}</div>
                      <h3 className="font-display font-bold text-foreground text-sm leading-tight mb-1">
                        {state.name}
                      </h3>
                      <p className="text-muted-foreground text-xs font-body">
                        {count > 0 ? `${count} products` : "Available now"}
                      </p>
                      <div className="mt-3 flex items-center gap-1 text-saffron opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold font-body">
                        Explore <ArrowRight className="w-3 h-3" />
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Coming Soon States */}
          <div>
            <p className="text-xs font-body font-semibold text-muted-foreground tracking-widest uppercase mb-3">
              Coming Soon — Phase 4 & Beyond
            </p>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3"
            >
              {STATES.filter((s) => !s.live).map((state) => (
                <motion.div key={state.name} variants={item}>
                  <div className="w-full bg-muted/40 border border-dashed border-border rounded-2xl p-4 text-center opacity-70 cursor-not-allowed">
                    <div className="text-2xl mb-2">{state.emoji}</div>
                    <h3 className="font-display font-semibold text-foreground/60 text-xs leading-tight mb-1">
                      {state.name}
                    </h3>
                    <p className="text-muted-foreground text-[10px] font-body">
                      Coming soon
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SAMPLE PRODUCTS ===== */}
      <section className="py-16 sm:py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
                    </div>
                    <div className="p-5">
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
      <section className="py-16 sm:py-20 mesh-bg">
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
              ].map((t, testimonialIdx) => (
                <motion.div key={t.name} variants={item}>
                  <div
                    className="bg-card rounded-2xl p-6 border border-border card-warm shadow-xs h-full flex flex-col"
                    data-ocid={`testimonials.item.${testimonialIdx + 1}`}
                  >
                    <div className="flex items-center gap-1 mb-3">
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
                    <p className="text-foreground/80 text-sm font-body leading-relaxed flex-1 italic">
                      "{t.message}"
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-saffron/15 flex items-center justify-center">
                        <span className="font-display font-bold text-saffron text-sm">
                          {t.name[0]}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-foreground font-body">
                          {t.name}
                        </div>
                        <div className="text-xs text-muted-foreground font-body">
                          {t.location}
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
                    className="bg-card rounded-2xl p-6 border border-border card-warm shadow-xs h-full flex flex-col"
                    data-ocid={`testimonials.item.${testimonialIdx + 1}`}
                  >
                    <div className="flex items-center gap-1 mb-3">
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
                    <p className="text-foreground/80 text-sm font-body leading-relaxed flex-1 italic">
                      "{t.message}"
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-saffron/15 flex items-center justify-center">
                        <span className="font-display font-bold text-saffron text-sm">
                          {t.customerName[0]}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-foreground font-body">
                          {t.customerName}
                        </div>
                        <div className="text-xs text-muted-foreground font-body">
                          {t.location}
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

      {/* ===== WHY SUPPORT US ===== */}
      <section className="py-16 sm:py-24 deep-section relative overflow-hidden">
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
                  <div className="text-cream/80 text-xs font-body font-semibold">
                    {v.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SEASONAL SPECIALS ===== */}
      <section className="py-16 sm:py-20 mesh-bg">
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
                    className="text-[10px] border-cream/30 text-cream/80 font-body mb-2"
                  >
                    {festival.season}
                  </Badge>
                  <h3 className="font-display font-bold text-base mb-1">
                    {festival.name}
                  </h3>
                  <p className="text-cream/70 text-xs font-body mb-4">
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

      {/* ===== GIFT HAMPERS TEASER ===== */}
      <section className="py-16 sm:py-24 deep-section relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-saffron blur-3xl" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold mb-3 block">
                Curated with Love
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream mb-6 leading-tight">
                Make Someone's Day{" "}
                <span className="text-saffron italic">Truly Special</span>
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: Heart,
                    title: "Curated with Love",
                    desc: "Each hamper is a state-specific flavour journey from a real homemaker",
                  },
                  {
                    icon: ChefHat,
                    title: "Delivered Fresh",
                    desc: "Made to order — never sitting in a warehouse. Prepared fresh that week",
                  },
                  {
                    icon: Truck,
                    title: "Available Pan India",
                    desc: "We ship to every corner of India with careful, temperature-considerate packing",
                  },
                ].map((b) => (
                  <div key={b.title} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-saffron/15 flex items-center justify-center shrink-0 mt-0.5">
                      <b.icon className="w-5 h-5 text-saffron" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-cream text-sm">
                        {b.title}
                      </div>
                      <div className="text-cream/70 text-xs font-body mt-0.5">
                        {b.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/gift-hampers"
                data-ocid="home.gift_hampers_button"
                className="inline-flex items-center gap-2 bg-saffron hover:bg-terracotta text-cream font-semibold px-7 py-3.5 rounded-full transition-colors font-body shadow-warm-lg"
              >
                <Gift className="w-5 h-5" />
                Explore Gift Hampers
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img
                src="/assets/generated/gift-hamper-hero.dim_800x600.jpg"
                alt="Choudhary Aunty Gift Hampers"
                className="rounded-2xl w-full shadow-warm-lg"
              />
            </motion.div>
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
      <section className="py-16 sm:py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
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
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
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
      <section className="py-16 sm:py-20 mesh-bg border-t border-border">
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

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
              <a
                href={`https://wa.me/?text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="home.whatsapp_share"
                className="flex items-center gap-2 bg-[#25d366] hover:bg-[#1da851] text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-warm font-body"
              >
                <SiWhatsapp className="w-5 h-5" />
                Share on WhatsApp
              </a>
              <a
                href="https://www.instagram.com/choudharyaunty"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="home.instagram_share"
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-6 py-3 rounded-full transition-opacity hover:opacity-90 font-body"
              >
                <SiInstagram className="w-5 h-5" />
                Follow on Instagram
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://www.choudharyaunty.com")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="home.facebook_share"
                className="flex items-center gap-2 bg-[#1877f2] hover:bg-[#1565d8] text-white font-semibold px-6 py-3 rounded-full transition-colors font-body"
              >
                <SiFacebook className="w-5 h-5" />
                Share on Facebook
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

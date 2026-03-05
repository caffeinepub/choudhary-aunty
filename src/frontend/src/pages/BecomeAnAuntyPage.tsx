import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  MAKER_IMAGES,
  WHATSAPP_NUMBER,
  buildWhatsAppUrl,
  getMakerImage,
} from "@/constants/images";
import { LOCAL_PRODUCTS } from "@/constants/localData";
import { SEED_MAKERS } from "@/constants/seedData";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Camera,
  CheckCircle,
  Heart,
  Package,
  Star,
  TrendingUp,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { SiWhatsapp } from "react-icons/si";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const SUPPORT_CARDS = [
  {
    icon: Camera,
    title: "Product Photography",
    desc: "We visit you and professionally photograph all your products so they shine online.",
    color: "text-saffron",
  },
  {
    icon: Package,
    title: "Packaging Support",
    desc: "We advise on the right packaging to keep your products fresh and presentable.",
    color: "text-terracotta",
  },
  {
    icon: Truck,
    title: "Logistics Handled",
    desc: "We arrange all shipping and delivery — you only cook. We handle the rest.",
    color: "text-burgundy",
  },
  {
    icon: Wallet,
    title: "Payment Collection",
    desc: "We collect payments from customers and transfer your earnings directly to your account.",
    color: "text-saffron",
  },
  {
    icon: Users,
    title: "Customer Support",
    desc: "We manage all customer queries, complaints, and feedback on your behalf.",
    color: "text-terracotta",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    desc: "We promote your products on social media, WhatsApp groups, and our platform.",
    color: "text-burgundy",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "WhatsApp Karo",
    titleEn: "Message Us",
    desc: "Just send us a WhatsApp message. Tell us your name, state, and what you love to make.",
    icon: "💬",
  },
  {
    num: "02",
    title: "Sample Bhejo",
    titleEn: "Send Your Sample",
    desc: "We'll ask for a small sample of your signature product. If our taste-testers love it, we proceed.",
    icon: "📦",
  },
  {
    num: "03",
    title: "Profile Ban Jaaye",
    titleEn: "Your Profile is Created",
    desc: "We create your beautiful maker profile, photograph your products, and list them on the platform.",
    icon: "✨",
  },
  {
    num: "04",
    title: "Kamaai Shuru!",
    titleEn: "Start Earning!",
    desc: "Orders start coming in. You prepare with love over the weekend. We handle everything else.",
    icon: "🎉",
  },
];

const VOUCHERS = [
  {
    name: "Sunita Agarwal",
    city: "Delhi",
    quote: "Anju didi ki makhana ne hum sab ko diwana kar diya!",
    stars: 5,
  },
  {
    name: "Rajan Sharma",
    city: "Mumbai",
    quote: "Babita Tai ki churma ladoo meri maa ki yaad dilata hai.",
    stars: 5,
  },
  {
    name: "Priya Singh",
    city: "Bengaluru",
    quote: "Sarla Maasi ka petha — Agra se better laga! Incredible.",
    stars: 5,
  },
  {
    name: "Arjun Bhatia",
    city: "Pune",
    quote: "Preetkaur Aunty ka gajak Lohri pe order kiya — sab khush!",
    stars: 5,
  },
  {
    name: "Meena Joshi",
    city: "Hyderabad",
    quote: "Geeta Devi ji ka buransh sharbat — pahad ki khushboo ghar mein!",
    stars: 5,
  },
  {
    name: "Vikram Nair",
    city: "Chennai",
    quote: "Bihar ka thekua pehli baar khaya — ek dum authentic.",
    stars: 5,
  },
  {
    name: "Kavya Reddy",
    city: "Kolkata",
    quote: "Tilkut ek baar order kiya, ab mahine mein teen baar aata hai!",
    stars: 5,
  },
  {
    name: "Rohit Gupta",
    city: "Jaipur",
    quote: "Sattu ladoo ne meri energy levels change kar di. Pure protein!",
    stars: 5,
  },
  {
    name: "Anita Kumari",
    city: "Chandigarh",
    quote: "Amritsari mathri — bhaiya bilkul waise hi jaise nani banati thi.",
    stars: 5,
  },
  {
    name: "Deepak Verma",
    city: "Ahmedabad",
    quote: "Nimbu achar oil-free! Liver ke liye best, taste mein best.",
    stars: 5,
  },
  {
    name: "Shweta Pandey",
    city: "Lucknow",
    quote: "Bal mithai — pehli baar suna tha, pehli baar khaya. Addicted!",
    stars: 5,
  },
  {
    name: "Amit Mishra",
    city: "Varanasi",
    quote: "Anarsa khake laga Diwali aa gayi! Anju ji ka hath ka jaadu.",
    stars: 5,
  },
  {
    name: "Pallavi Tiwari",
    city: "Bhopal",
    quote: "Gahat ki chutney — completely new taste, completely hooked.",
    stars: 5,
  },
  {
    name: "Sanjay Khatri",
    city: "Nagpur",
    quote:
      "Moong dal halwa — 3 ghante ki mehnat ka result clearly pata chalta.",
    stars: 5,
  },
  {
    name: "Divya Nanda",
    city: "Noida",
    quote: "Kanji — I had no idea I was missing this in my life!",
    stars: 5,
  },
  {
    name: "Manish Gupta",
    city: "Gurugram",
    quote:
      "Besan ladoo melt-in-mouth — Sarla Maasi ka secret ingredient kya hai?!",
    stars: 5,
  },
  {
    name: "Pooja Chauhan",
    city: "Indore",
    quote:
      "Kafal sharbat ka naam pehle suna nahin tha. Now it's my summer staple.",
    stars: 5,
  },
  {
    name: "Tarun Kapoor",
    city: "Kolkata",
    quote: "Pahadi chips vs factory chips — no comparison. Zero oil taste.",
    stars: 5,
  },
  {
    name: "Simi Arora",
    city: "Amritsar",
    quote:
      "Preetkaur ji ka pinni — meri saas ko bhi pasand aa gaya. Badi baat!",
    stars: 5,
  },
  {
    name: "Rajesh Bose",
    city: "Patna",
    quote:
      "Jhangora kheer — diabetes patient ke liye bhi safe. Thank you Geeta Devi ji.",
    stars: 5,
  },
];

const STATS = [
  { value: "5", label: "Makers & Counting" },
  { value: "50+", label: "Homemade Products" },
  { value: "5", label: "States Covered" },
  { value: "100+", label: "Happy Customers" },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function BecomeAnAuntyPage() {
  useEffect(() => {
    document.title =
      "Become a Maker | Choudhary Aunty — Bano Hamaari Family Ka Hissa";
  }, []);

  const whatsappJoinUrl = buildWhatsAppUrl(
    "Namaste! Mera naam ___ hai. Main ___ (state) se hoon. Mujhe Choudhary Aunty ki family ka hissa banna hai. Main ___ banati hoon. Kaise join karein?",
  );

  return (
    <main className="min-h-screen pt-16 bg-background">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[500px] sm:min-h-[560px] flex items-center overflow-hidden">
        <img
          src="/assets/generated/onboarding-hero-aunties.dim_1400x600.jpg"
          alt="Join our family of homemakers"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy/90 via-burgundy/70 to-transparent" />
        <div className="relative container mx-auto px-4 sm:px-6 max-w-7xl py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <Badge className="mb-4 bg-saffron/20 text-saffron border-saffron/30 font-body text-xs">
              👩‍🍳 Become a Choudhary Aunty Maker
            </Badge>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-cream leading-tight mb-4">
              Bano Choudhary Aunty Ki{" "}
              <span className="text-saffron">Family Ka Hissa</span>
            </h1>
            <p className="font-body text-cream/85 text-base sm:text-lg mb-8 leading-relaxed">
              Aapke haathon mein jo khazana hai — woh desh ko milna chahiye.
              Join us and turn your love for cooking into dignity, purpose, and
              financial independence.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappJoinUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="onboarding.whatsapp_button"
                className="inline-flex items-center gap-2.5 bg-[#25d366] hover:bg-[#128C7E] text-white font-semibold px-6 py-3 rounded-full font-body transition-colors shadow-lg"
              >
                <SiWhatsapp className="w-5 h-5" />
                Join Our Family on WhatsApp
              </a>
              <Link
                to="/makers"
                data-ocid="onboarding.makers_link"
                className="inline-flex items-center gap-2 bg-cream/10 hover:bg-cream/20 text-cream border border-cream/30 font-semibold px-6 py-3 rounded-full font-body transition-colors"
              >
                Meet Our Makers
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 4-STEP PROCESS ─── */}
      <section className="py-16 sm:py-20 bg-cream/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              The Process
            </span>
            <h2 className="section-heading text-2xl sm:text-3xl mt-2">
              Itna Simple Hai — 4 Asaan Kadam
            </h2>
            <p className="text-muted-foreground font-body max-w-lg mx-auto mt-3">
              From your kitchen to customers across India — we guide you every
              step of the way.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line — desktop */}
            <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-saffron/30 via-saffron to-saffron/30 z-0" />

            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative z-10"
              >
                <Card className="bg-card border-border card-warm text-center h-full">
                  <CardContent className="pt-8 pb-6 px-5">
                    <div className="w-14 h-14 rounded-full bg-saffron/10 border-2 border-saffron text-3xl flex items-center justify-center mx-auto mb-4 relative">
                      <span>{step.icon}</span>
                      <span className="absolute -top-2 -right-2 bg-saffron text-cream text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-body">
                        {idx + 1}
                      </span>
                    </div>
                    <p className="font-body text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                      Step {step.num}
                    </p>
                    <h3 className="font-display font-bold text-foreground text-lg mb-1">
                      {step.title}
                    </h3>
                    <p className="text-saffron font-body text-sm font-medium mb-3">
                      {step.titleEn}
                    </p>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT WE SUPPORT ─── */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Our Support
            </span>
            <h2 className="section-heading text-2xl sm:text-3xl mt-2">
              Aap Sirf Khana Banao — Baaki Sab Hum Karenge
            </h2>
            <p className="text-muted-foreground font-body max-w-lg mx-auto mt-3">
              We are not just a platform — we are your partners. Here's
              everything we take care of for you:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUPPORT_CARDS.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Card className="bg-card border-border card-warm h-full group hover:shadow-warm transition-shadow">
                  <CardContent className="pt-6 pb-5 px-5 flex gap-4">
                    <div className={`mt-0.5 shrink-0 ${card.color}`}>
                      <card.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground text-base mb-1">
                        {card.title}
                      </h3>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Reassurance */}
          <div className="mt-8 bg-saffron/5 border border-saffron/20 rounded-2xl p-6 flex flex-wrap gap-4">
            {[
              "We visit you for photography",
              "No upfront cost to join",
              "You earn per order",
              "Weekly payment transfer",
              "No minimum commitment",
            ].map((point) => (
              <div key={point} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-saffron shrink-0" />
                <span className="text-sm font-body text-foreground/80">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR VISION ─── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <img
          src="/assets/generated/onboarding-makers-collage.dim_1200x600.jpg"
          alt="Our vision for women empowerment"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-burgundy/85" />
        <div className="relative container mx-auto px-4 sm:px-6 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-4xl mb-4">🌺</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-cream mb-6 leading-tight">
              "Sapne Kabhi <span className="text-saffron">Old Nahin Hote</span>"
            </h2>
            <p className="font-body text-cream/85 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              We are empowering women who are the backbone of our existence.
              Making them financially independent, giving them dignity, purpose,
              and a thriving enterprise in their later years. Every jar sold is
              a life transformed.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display font-bold text-4xl sm:text-5xl text-saffron mb-1">
                    {stat.value}
                  </div>
                  <div className="font-body text-cream/70 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <a
              href={whatsappJoinUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="onboarding.vision_whatsapp_button"
              className="inline-flex items-center gap-2.5 bg-saffron hover:bg-terracotta text-cream font-semibold px-8 py-3.5 rounded-full font-body transition-colors shadow-lg text-base"
            >
              <Heart className="w-5 h-5 fill-cream" />
              Join Our Mission
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── SUCCESS STORIES ─── */}
      <section className="py-16 sm:py-20 bg-cream/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Our Makers
            </span>
            <h2 className="section-heading text-2xl sm:text-3xl mt-2">
              Meet the Aunties Behind Every Bite
            </h2>
            <p className="text-muted-foreground font-body max-w-lg mx-auto mt-3">
              5 extraordinary women. 5 states. Hundreds of years of combined
              cooking wisdom.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {SEED_MAKERS.map((maker, idx) => {
              const makerProducts = LOCAL_PRODUCTS.filter(
                (p) => p.state === maker.state,
              ).slice(0, 5);
              const makerImage =
                MAKER_IMAGES[maker.name] ?? getMakerImage(maker.name);

              return (
                <motion.div
                  key={maker.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="bg-card border-border card-warm h-full overflow-hidden group">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={makerImage}
                        alt={maker.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="pt-4 pb-5 px-4">
                      <Badge className="mb-2 bg-saffron/10 text-saffron border-saffron/20 text-xs font-body">
                        {maker.state}
                      </Badge>
                      <h3 className="font-display font-bold text-foreground text-base mb-1">
                        {maker.name}
                      </h3>
                      <p className="text-muted-foreground font-body text-xs leading-relaxed mb-3 line-clamp-3">
                        {maker.story}
                      </p>
                      {makerProducts.length > 0 && (
                        <div>
                          <p className="text-xs font-body font-semibold text-foreground/60 uppercase tracking-wider mb-1.5">
                            Signature Dishes:
                          </p>
                          <ul className="space-y-0.5">
                            {makerProducts.map((p) => (
                              <li
                                key={p.id.toString()}
                                className="text-xs font-body text-foreground/70 flex items-center gap-1.5"
                              >
                                <span className="w-1 h-1 rounded-full bg-saffron shrink-0" />
                                {p.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 20 VOUCHERS / TESTIMONIALS ─── */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Community Love
            </span>
            <h2 className="section-heading text-2xl sm:text-3xl mt-2">
              20 Logon Ne Bola: "Ye Toh Dil Se Bana Hai!"
            </h2>
            <p className="text-muted-foreground font-body max-w-lg mx-auto mt-3">
              Real customers. Real homes. Real love for authentic homemade food.
            </p>
          </motion.div>

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {VOUCHERS.map((voucher, idx) => (
              <motion.div
                key={voucher.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 4) * 0.06 }}
                className="break-inside-avoid"
              >
                <Card className="bg-card border-border card-warm">
                  <CardContent className="pt-4 pb-4 px-4">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: voucher.stars }).map((_, i) => (
                        <Star
                          key={`${voucher.name}-star-${i}`}
                          className="w-3 h-3 text-saffron fill-saffron"
                        />
                      ))}
                    </div>
                    <p className="font-body text-foreground/80 text-sm leading-relaxed mb-3 italic">
                      "{voucher.quote}"
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-saffron/20 flex items-center justify-center text-saffron font-bold text-xs font-display shrink-0">
                        {voucher.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-body font-semibold text-xs text-foreground">
                          {voucher.name}
                        </p>
                        <p className="font-body text-muted-foreground text-[10px]">
                          {voucher.city}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-16 sm:py-24 mesh-bg border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-5xl mb-5">🍯</div>
            <h2 className="section-heading text-2xl sm:text-3xl mb-4">
              Ready to Join Our Family?
            </h2>
            <p className="text-muted-foreground font-body text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Agar aapke haathon mein koi khaas recipe hai jo aaurat ne dil se
              seekhi ho — toh woh duniya ko milni chahiye. Aayiye, milke yeh
              sapna sach karein.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappJoinUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="onboarding.final_whatsapp_button"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25d366] hover:bg-[#128C7E] text-white font-semibold px-8 py-4 rounded-full font-body transition-colors shadow-lg text-base"
              >
                <SiWhatsapp className="w-5 h-5" />
                WhatsApp karo — Join Karein
              </a>
              <Link
                to="/shop"
                data-ocid="onboarding.shop_link"
                className="inline-flex items-center justify-center gap-2 bg-saffron hover:bg-terracotta text-cream font-semibold px-8 py-4 rounded-full font-body transition-colors text-base"
              >
                Browse Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

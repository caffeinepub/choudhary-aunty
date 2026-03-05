import { CONTACT_EMAIL, buildWhatsAppUrl } from "@/constants/images";
import {
  Download,
  ExternalLink,
  Heart,
  Mail,
  MessageCircle,
  Newspaper,
  Quote,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PUBLICATIONS = [
  {
    name: "The Hindu",
    category: "National Daily",
    status: "Coverage Coming Soon",
    desc: "India's newspaper of record",
    color: "bg-red-50 border-red-200",
    textColor: "text-red-700",
  },
  {
    name: "Economic Times",
    category: "Business Daily",
    status: "Coverage Coming Soon",
    desc: "India's leading financial newspaper",
    color: "bg-blue-50 border-blue-200",
    textColor: "text-blue-700",
  },
  {
    name: "NDTV",
    category: "TV & Digital",
    status: "Coverage Coming Soon",
    desc: "Leading Indian news broadcaster",
    color: "bg-purple-50 border-purple-200",
    textColor: "text-purple-700",
  },
  {
    name: "Livemint",
    category: "Business News",
    status: "Coverage Coming Soon",
    desc: "Business and startup coverage",
    color: "bg-emerald-50 border-emerald-200",
    textColor: "text-emerald-700",
  },
];

const PULL_QUOTES = [
  {
    quote:
      "Women who have spent decades feeding their families with extraordinary skill are finally being recognised as the food entrepreneurs they always were.",
    attribution: "On the women empowerment angle of Choudhary Aunty",
  },
  {
    quote:
      "In a world of processed food, the idea of ordering from a specific human being — a real person whose name you know, whose story you can read — is profoundly countercultural.",
    attribution: "On the authentic food movement in India",
  },
  {
    quote:
      "The preservation of regional food traditions is not nostalgia — it is biodiversity. When a homemaker stops making singri ki sabzi or thekua from her clay molds, something irreplaceable is lost.",
    attribution: "On India's culinary heritage and the risk of loss",
  },
];

const IMPACT_STATS = [
  { number: "5", label: "States Covered", emoji: "🗺️" },
  { number: "5", label: "Women Empowered", emoji: "💪" },
  { number: "50+", label: "Authentic Recipes", emoji: "📖" },
  { number: "Growing", label: "Happy Community", emoji: "❤️" },
];

export default function PressPage() {
  useEffect(() => {
    document.title =
      "Press & Media | Choudhary Aunty — Women Empowerment & Authentic Indian Food";
  }, []);

  return (
    <main className="min-h-screen pt-16">
      {/* ===== HERO ===== */}
      <section className="relative h-[55vh] min-h-[360px] max-h-[520px] flex items-end overflow-hidden">
        <img
          src="/assets/generated/press-media-hero.dim_800x600.jpg"
          alt="Press and Media — Choudhary Aunty"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy/90 via-burgundy/55 to-burgundy/10" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl pb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-saffron" />
              <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
                Press & Media
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-cream leading-tight mb-3 max-w-2xl">
              Our Story Has{" "}
              <span className="text-saffron italic">Been Noticed</span>
            </h1>
            <p className="text-cream/80 font-body text-base sm:text-lg max-w-xl">
              A story about five women, fifty recipes, and the power of keeping
              India's food memory alive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== AS FEATURED IN ===== */}
      <section className="py-16 sm:py-20 mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Media Coverage
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl mt-2">
              As Featured In
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-md mx-auto">
              We're growing fast and our story is resonating. Media coverage is
              building — check back soon.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {PUBLICATIONS.map((pub, idx) => (
              <motion.div key={pub.name} variants={item}>
                <div
                  className="bg-card rounded-2xl border border-border card-warm p-6 text-center shadow-xs"
                  data-ocid={`press.publication.item.${idx + 1}`}
                >
                  {/* Logo placeholder */}
                  <div
                    className={`w-full h-16 rounded-xl ${pub.color} border ${pub.color} flex items-center justify-center mb-4`}
                  >
                    <Newspaper className={`w-7 h-7 ${pub.textColor}`} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-base mb-0.5">
                    {pub.name}
                  </h3>
                  <p className="text-muted-foreground text-xs font-body mb-3">
                    {pub.category} · {pub.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-body font-semibold text-muted-foreground/70 bg-muted/50 px-3 py-1.5 rounded-full border border-dashed border-border">
                    {pub.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== PULL QUOTES ===== */}
      <section className="py-16 sm:py-20 deep-section relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-saffron blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-turmeric blur-3xl" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Our Mission
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream mt-2">
              In Their Words
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {PULL_QUOTES.map((q, idx) => (
              <motion.div key={q.attribution} variants={item}>
                <div
                  className="bg-cream/5 rounded-2xl border border-cream/10 p-6 h-full flex flex-col"
                  data-ocid={`press.quote.item.${idx + 1}`}
                >
                  <Quote className="w-6 h-6 text-saffron mb-4 shrink-0" />
                  <p className="text-cream/90 font-display text-sm leading-relaxed italic flex-1">
                    "{q.quote}"
                  </p>
                  <p className="text-cream/50 text-xs font-body mt-4 border-t border-cream/10 pt-3">
                    — {q.attribution}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== IMPACT STATS ===== */}
      <section className="py-14 sm:py-18 mesh-bg border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Impact
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl mt-2">
              Our Story in Numbers
            </h2>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-5"
          >
            {IMPACT_STATS.map((stat) => (
              <motion.div key={stat.label} variants={item}>
                <div className="bg-card rounded-2xl border border-border p-6 text-center card-warm shadow-xs">
                  <div className="text-3xl mb-2">{stat.emoji}</div>
                  <div className="font-display text-3xl font-bold text-saffron mb-1">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground text-xs font-body">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== BRAND KIT ===== */}
      <section className="py-16 sm:py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-background rounded-2xl border border-border p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6">
              <div className="w-14 h-14 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0">
                <Download className="w-7 h-7 text-saffron" />
              </div>
              <div className="flex-1">
                <h2 className="font-display font-bold text-foreground text-xl mb-2">
                  Download Our Brand Kit
                </h2>
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                  Our brand kit includes: high-resolution logo files, brand
                  colour palette (PANTONE & HEX), typography guide, product
                  photographs (high-res), maker portraits, and our official
                  press release with mission statement.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    "Logo Files",
                    "Brand Colours",
                    "Product Photos",
                    "Maker Portraits",
                    "Press Release",
                  ].map((asset) => (
                    <span
                      key={asset}
                      className="text-xs font-body bg-saffron/8 text-saffron border border-saffron/20 px-3 py-1 rounded-full"
                    >
                      {asset}
                    </span>
                  ))}
                </div>
                <a
                  href={buildWhatsAppUrl(
                    "Hi! I'm from the press/media and would like to request the Choudhary Aunty brand kit.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="press.brandkit_button"
                  className="inline-flex items-center gap-2 whatsapp-btn px-5 py-2.5 text-sm font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  Request Brand Kit on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT FOR PRESS ===== */}
      <section className="py-16 sm:py-20 mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="w-10 h-10 text-saffron mx-auto mb-4 fill-saffron/20" />
            <h2 className="section-heading text-3xl sm:text-4xl mb-4">
              Contact for Press Enquiries
            </h2>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-8 max-w-md mx-auto">
              We welcome interview requests, feature coverage, brand
              partnerships, and podcast appearances. We respond to all press
              inquiries within 24 hours.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-card rounded-xl p-4 border border-border card-warm">
                <Mail className="w-5 h-5 text-saffron mx-auto mb-2" />
                <div className="text-xs font-body font-semibold text-foreground mb-1">
                  Media Email
                </div>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-xs text-saffron font-body hover:text-terracotta transition-colors break-all"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border card-warm">
                <MessageCircle className="w-5 h-5 text-saffron mx-auto mb-2" />
                <div className="text-xs font-body font-semibold text-foreground mb-1">
                  WhatsApp (Fastest)
                </div>
                <a
                  href={buildWhatsAppUrl(
                    "Hi! I'm from the press and would like to connect with Choudhary Aunty.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-saffron font-body hover:text-terracotta transition-colors"
                >
                  +91 98831 40470
                </a>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border card-warm">
                <ExternalLink className="w-5 h-5 text-saffron mx-auto mb-2" />
                <div className="text-xs font-body font-semibold text-foreground mb-1">
                  Response Time
                </div>
                <div className="text-xs text-muted-foreground font-body">
                  Within 24 hours
                </div>
              </div>
            </div>

            <a
              href={buildWhatsAppUrl(
                "Hi! I represent a media organisation and would like to feature Choudhary Aunty. Can we schedule a time to talk?",
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="press.contact_button"
              className="inline-flex items-center gap-2 whatsapp-btn px-6 py-3 font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              Get in Touch for Media
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

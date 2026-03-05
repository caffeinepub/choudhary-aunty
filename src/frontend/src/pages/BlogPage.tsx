import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/constants/blogData";
import { buildWhatsAppUrl } from "@/constants/images";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  MessageCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogPage() {
  useEffect(() => {
    document.title =
      "Kitchen Stories | Choudhary Aunty Blog — Traditional Indian Food, Heritage & Women Empowerment";
  }, []);

  const [featured, ...rest] = BLOG_POSTS;

  return (
    <main className="min-h-screen pt-16">
      {/* ===== HERO ===== */}
      <section className="py-16 sm:py-24 deep-section relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-saffron blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-turmeric blur-3xl" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <BookOpen className="w-12 h-12 text-saffron mx-auto mb-4" />
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-saffron" />
              <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
                Our Blog
              </span>
              <div className="h-px w-8 bg-saffron" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight mb-4 max-w-3xl mx-auto">
              From Our{" "}
              <span className="text-saffron italic">Kitchen Stories</span>
            </h1>
            <p className="text-cream/80 font-body text-base sm:text-lg max-w-xl mx-auto">
              Deep dives into India's regional food traditions, the women who
              preserve them, and the science of why homemade always tastes
              better.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED POST ===== */}
      <section className="py-12 sm:py-16 mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Featured Story
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              data-ocid="blog.featured_card"
              className="group block bg-card rounded-2xl border border-border overflow-hidden card-warm shadow-warm hover:shadow-warm-lg transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-[16/9] lg:aspect-auto lg:h-full overflow-hidden relative min-h-[280px]">
                  <img
                    src={featured.heroImage}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-burgundy/20" />
                </div>
                <div className="p-7 sm:p-9 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featured.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-saffron/30 text-saffron font-body"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed mb-5">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-body mb-5">
                    <span className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-saffron/15 flex items-center justify-center">
                        <span className="font-display font-bold text-saffron text-[10px]">
                          {featured.author[0]}
                        </span>
                      </div>
                      {featured.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featured.publishDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-saffron font-semibold text-sm font-body group-hover:text-terracotta transition-colors">
                    Read Full Story <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== BLOG GRID ===== */}
      <section className="py-12 sm:py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              More Stories
            </span>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {rest.map((post, idx) => (
              <motion.div key={post.slug} variants={item}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  data-ocid={`blog.item.${idx + 1}`}
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
                    <div className="flex flex-wrap gap-1.5 mb-3">
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
                    <h3 className="font-display font-bold text-foreground text-base leading-snug mb-2 flex-1">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-xs font-body leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                        <div className="w-5 h-5 rounded-full bg-saffron/15 flex items-center justify-center">
                          <span className="font-display font-bold text-saffron text-[9px]">
                            {post.author[0]}
                          </span>
                        </div>
                        {post.author}
                      </div>
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-body">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SUBSCRIBE TEASER ===== */}
      <section className="py-16 sm:py-20 mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl mb-4">📖</div>
            <h2 className="section-heading text-3xl sm:text-4xl mb-3">
              Get Kitchen Stories on WhatsApp
            </h2>
            <p className="text-muted-foreground font-body text-base leading-relaxed mb-6 max-w-md mx-auto">
              New recipes, food stories, homemaker profiles, and seasonal
              specials — delivered directly to your WhatsApp. No spam, only
              substance.
            </p>
            <div className="bg-card rounded-2xl border border-border p-5 mb-6 inline-block">
              <p className="text-sm font-body text-foreground">
                Send{" "}
                <span className="font-semibold text-saffron">"Subscribe"</span>{" "}
                to{" "}
                <span className="font-semibold text-saffron">
                  +91 98831 40470
                </span>
              </p>
            </div>
            <div>
              <a
                href={buildWhatsAppUrl(
                  "Subscribe — Hi! I'd like to receive Choudhary Aunty's kitchen stories and updates on WhatsApp.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="blog.subscribe_button"
                className="inline-flex items-center gap-2 whatsapp-btn px-6 py-3 font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                Subscribe to Stories
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

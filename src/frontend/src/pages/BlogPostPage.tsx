import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/constants/blogData";
import { buildWhatsAppUrl } from "@/constants/images";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  MessageCircle,
  Share2,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { SiFacebook, SiWhatsapp } from "react-icons/si";

export default function BlogPostPage() {
  const { slug } = useParams({ strict: false }) as { slug: string };
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Choudhary Aunty Blog`;
    } else {
      document.title = "Blog Post Not Found | Choudhary Aunty";
    }
  }, [post]);

  if (!post) {
    return (
      <main className="min-h-screen pt-16 flex items-center justify-center mesh-bg">
        <div className="text-center px-4">
          <div className="text-5xl mb-4">📖</div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">
            Story Not Found
          </h1>
          <p className="text-muted-foreground font-body mb-6">
            This story seems to have wandered off the page.
          </p>
          <Link
            to="/blog"
            data-ocid="blog_post.back_button"
            className="inline-flex items-center gap-2 bg-saffron hover:bg-terracotta text-cream font-semibold px-5 py-2.5 rounded-full transition-colors font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Stories
          </Link>
        </div>
      </main>
    );
  }

  const shareText = encodeURIComponent(
    `"${post.title}" — from the Choudhary Aunty blog. ${window.location.href}`,
  );

  return (
    <main className="min-h-screen pt-16">
      {/* ===== HERO IMAGE ===== */}
      <section className="relative h-[55vh] min-h-[380px] max-h-[520px] overflow-hidden">
        <img
          src={post.heroImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy/90 via-burgundy/50 to-burgundy/10" />
        <div className="relative z-10 h-full flex flex-col justify-end container mx-auto px-4 sm:px-6 max-w-4xl pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back link */}
            <Link
              to="/blog"
              data-ocid="blog_post.back_link"
              className="inline-flex items-center gap-1.5 text-cream/70 hover:text-cream font-body text-sm mb-5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Stories
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 4).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs border-saffron/40 text-saffron bg-burgundy/20 backdrop-blur-sm font-body"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight mb-4 max-w-3xl">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-cream/70 text-sm font-body">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-saffron/20 flex items-center justify-center">
                  <span className="font-display font-bold text-saffron text-xs">
                    {post.author[0]}
                  </span>
                </div>
                <span>{post.author}</span>
                <span className="state-badge bg-saffron/20 text-saffron border-saffron/30">
                  {post.authorState}
                </span>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.publishDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== ARTICLE BODY ===== */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="min-w-0"
            >
              {/* Subtitle / Deck */}
              <p className="text-muted-foreground font-body text-lg leading-relaxed border-l-4 border-saffron pl-5 mb-8 italic">
                {post.subtitle}
              </p>

              {/* Rich text content */}
              <div
                className="prose prose-stone max-w-none 
                  font-body text-foreground/90 leading-relaxed
                  prose-headings:font-display prose-headings:text-foreground prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-p:mb-5 prose-p:text-foreground/80 prose-p:leading-relaxed
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-em:text-foreground/70
                  prose-a:text-saffron prose-a:no-underline hover:prose-a:text-terracotta
                  prose-blockquote:border-saffron prose-blockquote:text-foreground/70
                  prose-li:text-foreground/80"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static blog content
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Social Sharing */}
              <div className="mt-10 pt-8 border-t border-border">
                <div className="flex items-center gap-3 flex-wrap">
                  <Share2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-body text-muted-foreground">
                    Share this story:
                  </span>
                  <a
                    href={`https://wa.me/?text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="blog_post.whatsapp_share"
                    className="flex items-center gap-2 bg-[#25d366] hover:bg-[#1da851] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors font-body"
                  >
                    <SiWhatsapp className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="blog_post.facebook_share"
                    className="flex items-center gap-2 bg-[#1877f2] hover:bg-[#1565d8] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors font-body"
                  >
                    <SiFacebook className="w-3.5 h-3.5" />
                    Facebook
                  </a>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-10 bg-saffron/8 rounded-2xl border border-saffron/20 p-6">
                <p className="font-display font-bold text-foreground text-base mb-2">
                  Taste what you just read
                </p>
                <p className="text-muted-foreground text-sm font-body mb-4">
                  Order authentic homemade products from the same kitchens whose
                  stories we tell here.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/shop"
                    search={{}}
                    data-ocid="blog_post.shop_link"
                    className="inline-flex items-center gap-2 bg-saffron hover:bg-terracotta text-cream font-semibold px-5 py-2.5 rounded-full transition-colors font-body text-sm"
                  >
                    Shop Products <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={buildWhatsAppUrl(
                      "Hi! I read your blog and I'd like to place an order.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="blog_post.order_button"
                    className="inline-flex items-center gap-2 whatsapp-btn px-5 py-2.5 text-sm font-semibold"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Order on WhatsApp
                  </a>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              {/* More Stories */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <h3 className="font-display font-bold text-foreground text-base mb-4">
                  More Stories
                </h3>
                <div className="space-y-4">
                  {otherPosts.map((p) => (
                    <Link
                      key={p.slug}
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="group block"
                    >
                      <div className="flex gap-3 items-start">
                        <img
                          src={p.heroImage}
                          alt={p.title}
                          className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="min-w-0">
                          <p className="font-display font-semibold text-foreground text-xs leading-snug line-clamp-2 group-hover:text-saffron transition-colors mb-1">
                            {p.title}
                          </p>
                          <p className="text-muted-foreground text-[10px] font-body">
                            {p.readTime}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/blog"
                  data-ocid="blog_post.all_stories_link"
                  className="mt-4 inline-flex items-center gap-1 text-saffron hover:text-terracotta text-xs font-semibold font-body transition-colors"
                >
                  View All Stories <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Related Products CTA */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <h3 className="font-display font-bold text-foreground text-base mb-3">
                  Related Products
                </h3>
                <p className="text-muted-foreground text-xs font-body leading-relaxed mb-4">
                  The foods described in this article are available from our
                  homemakers. Fresh-made, traditionally prepared, ship pan
                  India.
                </p>
                <Link
                  to="/shop"
                  search={{
                    state:
                      post.authorState === "Uttar Pradesh"
                        ? "Uttar Pradesh"
                        : post.authorState,
                  }}
                  data-ocid="blog_post.related_products_link"
                  className="inline-flex items-center gap-1.5 text-saffron hover:text-terracotta text-xs font-semibold font-body transition-colors"
                >
                  Shop {post.authorState} Products{" "}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Maker bio */}
              <div className="bg-saffron/8 rounded-2xl border border-saffron/20 p-5">
                <p className="text-xs text-saffron font-body font-semibold tracking-wider uppercase mb-2">
                  About the Author
                </p>
                <p className="font-display font-bold text-foreground text-sm mb-1">
                  {post.author}
                </p>
                <p className="text-muted-foreground text-xs font-body mb-3">
                  Homemaker & food artisan from {post.authorState}
                </p>
                <Link
                  to="/makers"
                  data-ocid="blog_post.makers_link"
                  className="inline-flex items-center gap-1 text-saffron hover:text-terracotta text-xs font-semibold font-body transition-colors"
                >
                  View Our Makers <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </main>
  );
}

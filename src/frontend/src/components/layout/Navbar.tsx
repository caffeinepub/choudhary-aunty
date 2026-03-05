import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOGO_IMAGE, WHATSAPP_NUMBER } from "@/constants/images";
import {
  LANGUAGE_NAMES,
  type LanguageCode,
  useLanguage,
} from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, Globe, Menu, MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const NAV_LINK_KEYS = [
  { key: "nav.home", href: "/", ocid: "nav.home_link" },
  { key: "nav.story", href: "/story", ocid: "nav.story_link" },
  { key: "nav.shop", href: "/shop", ocid: "nav.shop_link" },
  { key: "nav.makers", href: "/makers", ocid: "nav.makers_link" },
  { key: "nav.howToOrder", href: "/how-to-order", ocid: "nav.order_link" },
];

const MORE_LINKS = [
  {
    label: "👩‍🍳 Become an Aunty",
    href: "/become-an-aunty",
    ocid: "nav.become_aunty_link",
  },
  {
    label: "🎁 Gift Hampers",
    href: "/gift-hampers",
    ocid: "nav.gift_hampers_link",
  },
  {
    label: "🏢 Corporate Orders",
    href: "/corporate-orders",
    ocid: "nav.corporate_link",
  },
  { label: "📖 Blog", href: "/blog", ocid: "nav.blog_link" },
  { label: "📰 Press & Media", href: "/press", ocid: "nav.press_link" },
  { label: "📦 Track Order", href: "/order-tracker", ocid: "nav.tracker_link" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional - path change closes menu
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Choudhary Aunty! I'd like to know more about your homemade products.")}`;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-warm border-b border-border"
          : "bg-cream/90 backdrop-blur-sm",
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          data-ocid="nav.home_link"
        >
          <img
            src={LOGO_IMAGE}
            alt="Choudhary Aunty"
            className="w-10 h-10 object-contain rounded-full bg-white shadow-warm group-hover:scale-105 transition-transform"
          />
          <div className="leading-tight">
            <div className="font-display font-bold text-burgundy text-base leading-none">
              Choudhary Aunty
            </div>
            <div className="text-muted-foreground text-[10px] tracking-wider font-body">
              Dream has no age
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINK_KEYS.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                data-ocid={link.ocid}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium font-body transition-colors",
                  "hover:text-saffron hover:bg-saffron/5",
                  location.pathname === link.href
                    ? "text-saffron font-semibold"
                    : "text-foreground/80",
                )}
              >
                {t(link.key)}
              </Link>
            </li>
          ))}
          {/* More dropdown */}
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger
                data-ocid="nav.more_dropdown"
                className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium font-body transition-colors",
                  "hover:text-saffron hover:bg-saffron/5",
                  MORE_LINKS.some((l) => location.pathname === l.href)
                    ? "text-saffron font-semibold"
                    : "text-foreground/80",
                )}
              >
                {t("nav.more")}
                <ChevronDown className="w-3.5 h-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                {MORE_LINKS.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      to={link.href}
                      data-ocid={link.ocid}
                      className="font-body text-sm cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>

        {/* Language Selector — Desktop */}
        <div className="hidden md:flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger
              data-ocid="nav.language_toggle"
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium font-body transition-colors",
                "hover:text-saffron hover:bg-saffron/5 text-foreground/70",
              )}
              aria-label="Select language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="text-xs">{LANGUAGE_NAMES[language]}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-44 max-h-80 overflow-y-auto"
              data-ocid="nav.language_select"
            >
              {(Object.entries(LANGUAGE_NAMES) as [LanguageCode, string][]).map(
                ([code, name]) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => setLanguage(code)}
                    className={cn(
                      "font-body text-sm cursor-pointer",
                      language === code && "text-saffron font-semibold",
                    )}
                  >
                    {name}
                    {language === code && (
                      <span className="ml-auto text-saffron text-xs">✓</span>
                    )}
                  </DropdownMenuItem>
                ),
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* WhatsApp CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="nav.whatsapp_button"
          className="hidden md:flex items-center gap-2 whatsapp-btn px-4 py-2 text-sm font-semibold shadow-warm"
        >
          <MessageCircle className="w-4 h-4" />
          {t("cta.orderWhatsapp")}
        </a>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-md text-foreground hover:text-saffron hover:bg-saffron/5 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-cream border-t border-border shadow-warm-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINK_KEYS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  data-ocid={link.ocid}
                  className={cn(
                    "px-4 py-3 rounded-md text-sm font-medium font-body transition-colors",
                    "hover:text-saffron hover:bg-saffron/5",
                    location.pathname === link.href
                      ? "text-saffron font-semibold bg-saffron/5"
                      : "text-foreground/80",
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
              {/* More links flat in mobile */}
              <div className="border-t border-border mt-1 pt-1">
                {MORE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    data-ocid={link.ocid}
                    className={cn(
                      "block px-4 py-2.5 rounded-md text-sm font-medium font-body transition-colors",
                      "hover:text-saffron hover:bg-saffron/5",
                      location.pathname === link.href
                        ? "text-saffron font-semibold bg-saffron/5"
                        : "text-foreground/70",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="nav.whatsapp_button"
                className="mt-2 flex items-center justify-center gap-2 whatsapp-btn px-4 py-3 text-sm font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                {t("cta.orderWhatsapp")}
              </a>
              {/* Language selector in mobile */}
              <div className="border-t border-border mt-2 pt-2">
                <p className="px-4 py-1 text-xs text-muted-foreground font-body uppercase tracking-wider">
                  Language / भाषा
                </p>
                <div className="flex flex-wrap gap-1.5 px-4 py-2">
                  {(
                    Object.entries(LANGUAGE_NAMES) as [LanguageCode, string][]
                  ).map(([code, name]) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setLanguage(code)}
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-body border transition-colors",
                        language === code
                          ? "bg-saffron text-cream border-saffron"
                          : "border-border text-foreground/60 hover:border-saffron/40",
                      )}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

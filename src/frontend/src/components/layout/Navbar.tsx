import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOGO_IMAGE, WHATSAPP_NUMBER } from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import {
  LANGUAGE_NAMES,
  type LanguageCode,
  useLanguage,
} from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  Globe,
  LogOut,
  Menu,
  MessageCircle,
  ShoppingBag,
  Star,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiFacebook, SiInstagram, SiWhatsapp, SiX } from "react-icons/si";
import { toast } from "sonner";

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
  {
    label: "👤 My Profile",
    href: "/my-profile",
    ocid: "nav.my_profile_link",
  },
  {
    label: "📢 Advertise",
    href: "/ads",
    ocid: "nav.ads_link",
  },
  {
    label: "📊 CRM Portal",
    href: "/crm",
    ocid: "nav.crm_more_link",
  },
  {
    label: "📊 Maker Dashboard",
    href: "/maker-dashboard",
    ocid: "nav.maker_dashboard_link",
  },
  {
    label: "🖥️ Platform Dashboard",
    href: "/platform-dashboard",
    ocid: "nav.platform_dashboard_link",
  },
  {
    label: "📈 Analytics Dashboard",
    href: "/analytics",
    ocid: "nav.analytics_link",
  },
  {
    label: "⚖️ Batch Manager",
    href: "/batch-resolution",
    ocid: "nav.batch_resolution_link",
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { customerAccount, isLoggedIn, logout } = useAuth();

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
          className="flex items-center group"
          data-ocid="nav.home_link"
        >
          <img
            src={LOGO_IMAGE}
            alt="Choudhary Aunty"
            className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-200 drop-shadow-sm"
          />
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

        {/* My Account button — Desktop */}
        {isLoggedIn && customerAccount ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              data-ocid="nav.account_dropdown"
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border border-saffron/30 bg-saffron/5 hover:bg-saffron/10 transition-colors text-foreground/80 hover:text-foreground"
              aria-label="My Account"
            >
              <div className="w-7 h-7 rounded-full bg-saffron/20 flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-xs text-saffron">
                  {customerAccount.name[0]}
                </span>
              </div>
              <span className="text-sm font-body font-medium max-w-[100px] truncate">
                {customerAccount.name.split(" ")[0]}
              </span>
              {/* Asharfi badge */}
              <span className="text-[10px] bg-amber-100 text-amber-700 border border-amber-200 rounded-full px-1.5 py-0.5 font-body font-bold">
                🪙{" "}
                {Number(customerAccount.asharfiPoints).toLocaleString("en-IN")}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link
                  to="/my-profile"
                  data-ocid="nav.my_profile_link"
                  className="font-body text-sm cursor-pointer flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/my-profile"
                  data-ocid="nav.my_orders_link"
                  className="font-body text-sm cursor-pointer flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  My Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/my-profile"
                  data-ocid="nav.loyalty_link"
                  className="font-body text-sm cursor-pointer flex items-center gap-2"
                >
                  <Star className="w-4 h-4" />
                  Loyalty (Asharfi)
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  to="/crm"
                  data-ocid="nav.crm_link"
                  className="font-body text-sm cursor-pointer flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  CRM Portal
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                data-ocid="nav.logout_button"
                onClick={() => {
                  logout();
                  navigate({ to: "/" });
                  toast.success("Logged out. Aate rehna! 👋");
                }}
                className="font-body text-sm cursor-pointer text-red-600 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            to="/login"
            data-ocid="nav.login_link"
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border border-saffron/30 text-saffron hover:bg-saffron/5 transition-colors text-sm font-body font-semibold"
          >
            <User className="w-4 h-4" />
            Login
          </Link>
        )}

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
                    "px-4 py-2.5 rounded-md text-sm font-medium font-body transition-colors",
                    "hover:text-saffron hover:bg-saffron/5",
                    location.pathname === link.href
                      ? "text-saffron font-semibold bg-saffron/5"
                      : "text-foreground/80",
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
              {/* Account section in mobile */}
              <div className="border-t border-border mt-1 pt-1">
                {isLoggedIn && customerAccount ? (
                  <>
                    <div className="px-4 py-2 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center">
                        <span className="font-display font-bold text-xs text-saffron">
                          {customerAccount.name[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-semibold text-foreground truncate">
                          {customerAccount.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-body">
                          🪙{" "}
                          {Number(customerAccount.asharfiPoints).toLocaleString(
                            "en-IN",
                          )}{" "}
                          Asharfi
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/my-profile"
                      data-ocid="nav.my_profile_mobile_link"
                      className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium font-body text-foreground/70 hover:text-saffron hover:bg-saffron/5 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </Link>
                    <Link
                      to="/crm"
                      data-ocid="nav.crm_mobile_link"
                      className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium font-body text-foreground/70 hover:text-saffron hover:bg-saffron/5 transition-colors"
                    >
                      <TrendingUp className="w-4 h-4" />
                      CRM Portal
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        navigate({ to: "/" });
                        toast.success("Logged out!");
                      }}
                      data-ocid="nav.logout_mobile_button"
                      className="flex items-center gap-2 w-full px-4 py-2 rounded-md text-sm font-medium font-body text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    data-ocid="nav.login_mobile_link"
                    className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium font-body text-saffron hover:bg-saffron/5 transition-colors font-semibold"
                  >
                    <User className="w-4 h-4" />
                    Login / Sign Up
                  </Link>
                )}
              </div>
              {/* More links flat in mobile */}
              <div className="border-t border-border mt-1 pt-1">
                {MORE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    data-ocid={link.ocid}
                    className={cn(
                      "block px-4 py-2 rounded-md text-sm font-medium font-body transition-colors",
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
                className="mt-2 flex items-center justify-center gap-2 whatsapp-btn px-4 py-2.5 text-sm font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                {t("cta.orderWhatsapp")}
              </a>
              {/* Language selector in mobile — compact select dropdown */}
              <div className="border-t border-border mt-2 pt-2 px-4 pb-1">
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <select
                    value={language}
                    onChange={(e) =>
                      setLanguage(e.target.value as LanguageCode)
                    }
                    data-ocid="nav.language_select"
                    className="flex-1 text-xs font-body bg-background border border-border rounded-md px-2 py-1.5 text-foreground/70 focus:outline-none focus:border-saffron/50"
                    aria-label="Select language"
                  >
                    {(
                      Object.entries(LANGUAGE_NAMES) as [LanguageCode, string][]
                    ).map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Social links in mobile menu */}
              <div className="border-t border-border mt-2 pt-2.5 pb-1 px-4">
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-2">
                  Follow Us
                </p>
                <div className="flex items-center gap-1.5">
                  <a
                    href="https://instagram.com/choudharyaunty"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-8 h-8 rounded-full bg-saffron/8 hover:bg-saffron/15 border border-saffron/20 flex items-center justify-center transition-colors text-foreground/70 hover:text-saffron"
                    data-ocid="nav.instagram_link"
                  >
                    <SiInstagram className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://x.com/choudharyaunty"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                    className="w-8 h-8 rounded-full bg-saffron/8 hover:bg-saffron/15 border border-saffron/20 flex items-center justify-center transition-colors text-foreground/70 hover:text-saffron"
                    data-ocid="nav.twitter_link"
                  >
                    <SiX className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://facebook.com/choudharyaunty"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-full bg-saffron/8 hover:bg-saffron/15 border border-saffron/20 flex items-center justify-center transition-colors text-foreground/70 hover:text-saffron"
                    data-ocid="nav.facebook_link"
                  >
                    <SiFacebook className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="w-8 h-8 rounded-full bg-[#25d366]/10 hover:bg-[#25d366]/20 border border-[#25d366]/25 flex items-center justify-center transition-colors text-[#1a9e4e] hover:text-[#168b44]"
                    data-ocid="nav.whatsapp_social_link"
                  >
                    <SiWhatsapp className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

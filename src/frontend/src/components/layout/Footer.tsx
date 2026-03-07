import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  LOGO_IMAGE,
  WHATSAPP_NUMBER,
} from "@/constants/images";
import { Link } from "@tanstack/react-router";
import { Heart, Mail, MapPin, Phone } from "lucide-react";
import {
  SiFacebook,
  SiInstagram,
  SiWhatsapp,
  SiX,
  SiYoutube,
} from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "choudharyaunty.com")}`;

  return (
    <footer className="bg-burgundy text-cream">
      {/* Decorative top border */}
      <div className="h-1 bg-spice-gradient" />

      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-10">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 lg:row-span-1">
            <Link to="/" className="flex items-center mb-4 group">
              <img
                src={LOGO_IMAGE}
                alt="Choudhary Aunty"
                className="h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-200 drop-shadow-md"
              />
            </Link>
            <p className="text-cream/80 text-sm font-body leading-relaxed mb-5">
              Authentic homemade regional Indian food, made with love by real
              homemakers from across India. Every jar tells a story.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <a
                href="https://instagram.com/choudharyaunty"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                data-ocid="footer.instagram_link"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-saffron border border-white/10 hover:border-saffron flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/choudharyaunty"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                data-ocid="footer.twitter_link"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-saffron border border-white/10 hover:border-saffron flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/choudharyaunty"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                data-ocid="footer.facebook_link"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-saffron border border-white/10 hover:border-saffron flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/choudharyaunty"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                data-ocid="footer.youtube_link"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-saffron border border-white/10 hover:border-saffron flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <SiYoutube className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                data-ocid="footer.whatsapp_link"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25d366] border border-white/10 hover:border-[#25d366] flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <SiWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-cream text-base mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "Our Story", to: "/story" },
                { label: "Shop All Products", to: "/shop" },
                { label: "Our Makers", to: "/makers" },
                { label: "How to Order", to: "/how-to-order" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-cream/75 hover:text-saffron text-sm font-body transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover More */}
          <div>
            <h4 className="font-display font-semibold text-cream text-base mb-4">
              Discover More
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "👩‍🍳 Become a Maker", to: "/become-an-aunty" },
                { label: "🎁 Gift Hampers", to: "/gift-hampers" },
                { label: "🏢 Corporate Orders", to: "/corporate-orders" },
                { label: "📦 Track Your Order", to: "/order-tracker" },
                { label: "📖 Our Blog", to: "/blog" },
                { label: "📰 Press & Media", to: "/press" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-cream/75 hover:text-saffron text-sm font-body transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop by State */}
          <div>
            <h4 className="font-display font-semibold text-cream text-base mb-4">
              Shop by State
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Bihar", state: "Bihar" },
                { label: "Haryana", state: "Haryana" },
                { label: "Punjab", state: "Punjab" },
                { label: "Uttar Pradesh", state: "Uttar Pradesh" },
                { label: "Uttarakhand", state: "Uttarakhand" },
              ].map((item) => (
                <li key={item.state}>
                  <Link
                    to="/shop"
                    search={{ state: item.state }}
                    className="text-cream/75 hover:text-saffron text-sm font-body transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-cream text-base mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-saffron mt-0.5 shrink-0" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-cream/80 hover:text-saffron text-sm font-body transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-saffron mt-0.5 shrink-0" />
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                  className="text-cream/80 hover:text-saffron text-sm font-body transition-colors"
                >
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-saffron mt-0.5 shrink-0" />
                <span className="text-cream/80 text-sm font-body">
                  Pan India Delivery
                </span>
              </li>
            </ul>

            {/* Order CTA */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to place an order with Choudhary Aunty.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 whatsapp-btn px-4 py-2 text-sm"
            >
              <SiWhatsapp className="w-4 h-4" />
              Order Now
            </a>
          </div>
        </div>

        {/* Team & Aunty Central — discrete internal access row */}
        <div className="border-t border-cream/10 pt-4 pb-2">
          <div className="flex flex-wrap items-center gap-x-1 gap-y-1 justify-center">
            <span className="text-cream/30 text-[10px] font-body uppercase tracking-widest mr-1">
              Team Portal
            </span>
            {[
              {
                label: "Maker Dashboard",
                href: "/maker-dashboard",
                ocid: "footer.maker_dashboard_link",
              },
              {
                label: "Platform Dashboard",
                href: "/platform-dashboard",
                ocid: "footer.platform_dashboard_link",
              },
              { label: "CRM Portal", href: "/crm", ocid: "footer.crm_link" },
              {
                label: "Analytics",
                href: "/analytics",
                ocid: "footer.analytics_link",
              },
              { label: "Ads Manager", href: "/ads", ocid: "footer.ads_link" },
              {
                label: "Batch Manager",
                href: "/batch-resolution",
                ocid: "footer.batch_link",
              },
              {
                label: "Admin Panel",
                href: "/admin",
                ocid: "footer.admin_link",
              },
            ].map((link, idx, arr) => (
              <span key={link.href} className="flex items-center gap-x-1">
                <Link
                  to={link.href}
                  data-ocid={link.ocid}
                  className="text-cream/35 hover:text-cream/65 text-[10px] font-body transition-colors"
                >
                  {link.label}
                </Link>
                {idx < arr.length - 1 && (
                  <span className="text-cream/20 text-[10px]">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cream/65 text-xs font-body text-center sm:text-left">
            © {currentYear} Choudhary Aunty. All rights reserved. |
            www.choudharyaunty.com
          </p>
          <p className="text-cream/55 text-xs font-body flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-saffron fill-saffron" />{" "}
            using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-saffron transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

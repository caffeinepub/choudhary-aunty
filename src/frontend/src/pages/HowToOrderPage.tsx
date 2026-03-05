import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WHATSAPP_NUMBER } from "@/constants/images";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { SiWhatsapp } from "react-icons/si";

export default function HowToOrderPage() {
  useEffect(() => {
    document.title =
      "How to Order | Choudhary Aunty — Simple, Transparent Process";
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Choudhary Aunty! I want to place an order. Please guide me through the process.",
  )}`;

  return (
    <main className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-12 sm:py-16 mesh-bg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Simple Process
            </span>
            <h1 className="section-heading text-4xl sm:text-5xl mt-2 mb-4">
              How to Order
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
              Our ordering process is designed to be simple and transparent.
              Here's everything you need to know.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Step by Step */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="section-heading text-3xl">Step-by-Step Process</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                step: "01",
                emoji: "🛒",
                title: "Browse & Choose",
                desc: "Visit our shop, explore products by state or category. Each product page has complete details — ingredients, preparation method, minimum batch, and pricing.",
                detail:
                  "Click 'View Details' on any product to see the full description before ordering.",
              },
              {
                step: "02",
                emoji: "💬",
                title: "WhatsApp Us",
                desc: "Click the 'Order on WhatsApp' button on any product page. This will pre-fill your order message. Send us your name, address, quantity needed, and the product you want.",
                detail: "WhatsApp: +91 9883140470",
              },
              {
                step: "03",
                emoji: "✅",
                title: "Confirm & Pay Advance",
                desc: "We'll confirm your order and share our UPI ID. Pay 50% of the order value as advance to book your slot. This triggers order preparation by your aunty.",
                detail: "UPI payment only. No cash, no COD.",
              },
              {
                step: "04",
                emoji: "👩‍🍳",
                title: "Fresh Preparation",
                desc: "Orders placed by Thursday are prepared fresh over the weekend. Your aunty follows her traditional recipe from scratch — no shortcuts, no preservatives.",
                detail:
                  "Orders are aggregated to meet minimum batch requirements.",
              },
              {
                step: "05",
                emoji: "📦",
                title: "Dispatch Notification",
                desc: "Once your order is ready (typically Sunday or Monday), we'll notify you on WhatsApp. Pay the remaining 50% plus actual logistics charges.",
                detail: "Logistics charged at actuals based on your location.",
              },
              {
                step: "06",
                emoji: "🚀",
                title: "Shipped to You",
                desc: "After full payment is confirmed, your order is carefully packed and dispatched. You'll receive a tracking number once shipped.",
                detail: "Typical delivery: 3-5 working days.",
              },
            ].map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex gap-5 bg-card rounded-2xl p-5 sm:p-6 border border-border card-warm shadow-xs"
              >
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-saffron/10 flex items-center justify-center text-xl">
                    {step.emoji}
                  </div>
                  {idx < 5 && <div className="w-0.5 h-6 bg-saffron/20" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-saffron tracking-widest font-body">
                      STEP {step.step}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-foreground mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed mb-2">
                    {step.desc}
                  </p>
                  <p className="text-saffron text-xs font-semibold font-body">
                    📌 {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Model */}
      <section className="py-12 sm:py-16 mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="section-heading text-3xl">Payment Model</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-2xl mb-3">💳</div>
              <h3 className="font-display font-bold text-base text-foreground mb-2">
                Advance (50%)
              </h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">
                Pay 50% of the product total upfront via UPI to confirm your
                order and trigger preparation.
              </p>
              <div className="mt-3 text-xs text-saffron font-semibold font-body">
                Paid via UPI after WhatsApp confirmation
              </div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="font-display font-bold text-base text-foreground mb-2">
                Balance (50% + Logistics)
              </h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">
                Pay remaining 50% plus actual logistics charges when your order
                is ready for dispatch.
              </p>
              <div className="mt-3 text-xs text-saffron font-semibold font-body">
                Logistics charged at actuals based on location
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
            <p className="text-amber-800 text-sm font-body font-semibold">
              ⚠️ Important: No Cash on Delivery. UPI payment only. No manual
              payments.
            </p>
          </div>
        </div>
      </section>

      {/* Dispatch Timeline */}
      <section className="py-12 sm:py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="section-heading text-3xl">Dispatch Timeline</h2>
            <p className="text-muted-foreground font-body mt-3 max-w-lg mx-auto">
              Our weekly batch process ensures freshness and authentic quality.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                day: "Thursday",
                icon: "🛒",
                label: "Order Deadline",
                color: "bg-saffron/10 border-saffron/30",
              },
              {
                day: "Friday",
                icon: "📋",
                label: "Order Aggregation",
                color: "bg-turmeric/10 border-turmeric/30",
              },
              {
                day: "Sat–Sun",
                icon: "👩‍🍳",
                label: "Fresh Preparation",
                color: "bg-terracotta/10 border-terracotta/30",
              },
              {
                day: "Monday+",
                icon: "📦",
                label: "Dispatch",
                color: "bg-warmBrown/10 border-warmBrown/30",
              },
            ].map((slot) => (
              <div
                key={slot.day}
                className={`rounded-xl p-4 text-center border ${slot.color}`}
              >
                <div className="text-2xl mb-2">{slot.icon}</div>
                <div className="font-display font-bold text-sm text-foreground mb-1">
                  {slot.day}
                </div>
                <div className="text-muted-foreground text-xs font-body">
                  {slot.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="section-heading text-3xl">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-2">
            {[
              {
                q: "How do I place an order?",
                a: "Click the 'Order on WhatsApp' button on any product page. It will pre-fill a message for you. We'll then guide you through confirmation and payment.",
              },
              {
                q: "What is the minimum order quantity?",
                a: "Each product has a minimum batch quantity (e.g., 5 kg for aam ka achar). This is the minimum needed to start the traditional preparation process. You can order as small a quantity as you like — we'll aggregate orders from multiple customers to meet the batch minimum.",
              },
              {
                q: "Why can't I get next-day delivery?",
                a: "Our products are made fresh specifically for your order, from scratch. The preparation process — grinding spices, sun-drying, marinating — takes time. This is what ensures authentic taste. We don't maintain stock of pre-made products.",
              },
              {
                q: "Is the advance payment refundable?",
                a: "If for any reason we cannot fulfil your order (e.g., minimum batch not reached within 2 weeks), your advance will be fully refunded. If you cancel after preparation has started, the advance is non-refundable.",
              },
              {
                q: "How are logistics charges calculated?",
                a: "Logistics charges are calculated based on the actual weight of your order and your delivery location. We'll share the exact amount when your order is ready. We use trusted courier services.",
              },
              {
                q: "Are there any preservatives in the products?",
                a: "No artificial preservatives. Our products are made with traditional preservation methods — mustard oil for pickles, natural drying for namkeens. Most products have a shelf life of 3-12 months when stored properly.",
              },
              {
                q: "Can I order from multiple makers in one order?",
                a: "Yes! You can order from multiple makers. Just mention all your products in the WhatsApp message. We'll consolidate the order and logistics for you.",
              },
              {
                q: "How do I know if my order meets the minimum batch?",
                a: "We'll notify you via WhatsApp if your order is the first one for a product. We typically wait up to 2 weeks to aggregate orders. If the minimum isn't met, we'll inform you and you can either wait or get a refund.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major UPI apps — GPay, PhonePe, Paytm, BHIM, etc. No cash, no cards, no COD. This helps us track payments transparently.",
              },
              {
                q: "Do you ship pan-India?",
                a: "Currently, we ship to all major cities across India. For remote locations, we may charge higher logistics. Contact us on WhatsApp to check if we ship to your area.",
              },
            ].map((faq) => (
              <AccordionItem
                key={faq.q}
                value={faq.q}
                className="bg-card border border-border rounded-xl px-4"
              >
                <AccordionTrigger className="font-display font-semibold text-sm text-foreground text-left py-4 hover:text-saffron hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm font-body leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 deep-section">
        <div className="container mx-auto px-4 sm:px-6 max-w-xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream mb-4">
              Ready to Order?
            </h2>
            <p className="text-cream/70 font-body mb-6">
              Still have questions? Message us directly on WhatsApp — we're
              happy to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 whatsapp-btn px-6 py-3.5 font-semibold"
              >
                <SiWhatsapp className="w-5 h-5" />
                Order on WhatsApp
              </a>
              <Link
                to="/shop"
                search={{}}
                className="flex items-center justify-center gap-2 bg-cream/15 hover:bg-cream/25 text-cream border border-cream/30 font-semibold px-6 py-3.5 rounded-full transition-colors font-body"
              >
                Browse Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

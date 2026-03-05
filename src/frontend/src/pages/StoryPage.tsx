import { HERO_IMAGE, STORY_IMAGES } from "@/constants/images";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, MapPin, Quote, Star } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const anjuJourney = [
  {
    img: STORY_IMAGES.anjuYoung,
    year: "1985",
    caption: "The early years",
    story:
      "A young Anju in rural Bihar, learning her craft by her mother's side — long before anyone imagined this would become her enterprise.",
  },
  {
    img: STORY_IMAGES.anjuGrindingSpices,
    year: "2001",
    caption: "The hands that remember",
    story:
      "Grinding spices on a stone sil-batta the way her grandmother taught her. These hands carry 35 years of memory in every motion.",
  },
  {
    img: STORY_IMAGES.anjuKitchen,
    year: "2018",
    caption: "Her kitchen, her kingdom",
    story:
      "Rows of mango achar jars line her kitchen shelves each summer. Quietly made, quietly given — to family, to neighbours, to anyone who asked.",
  },
  {
    img: STORY_IMAGES.anjuFirstPayment,
    year: "2024",
    caption: "The first payment",
    story:
      "The moment she received her first customer payment on her phone. A moment of disbelief, then quiet pride. 'Mera kaam itna keemat ka hai?' she asked.",
  },
  {
    img: STORY_IMAGES.anjuEnterprise,
    year: "2025",
    caption: "An entrepreneur",
    story:
      "Today, Anju Choudhary packs and dispatches her achar to customers across India. Each jar carries her name, her recipe, and her dignity.",
  },
];

export default function StoryPage() {
  useEffect(() => {
    document.title = "Our Story | Choudhary Aunty — Sapne Kabhi Old Nahin Hote";
  }, []);

  return (
    <main className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Story hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy/90 via-burgundy/60 to-burgundy/20" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-5xl pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Our Story
            </span>
            <h1 className="hero-headline text-4xl sm:text-5xl text-cream mt-2">
              A Journey from Kitchens
              <br />
              <span className="text-saffron italic">to Your Table</span>
            </h1>
            <p className="text-cream/90 text-base font-body mt-3 italic [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
              "Sapne kabhi old nahin hote" — Dreams never grow old.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-14 sm:py-20 mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="prose prose-lg max-w-none"
          >
            <p className="font-accent text-2xl sm:text-3xl font-semibold text-foreground leading-relaxed mb-8 italic">
              "It started in a small kitchen in Bihar, where{" "}
              <span className="text-saffron not-italic">Anju Choudhary</span>{" "}
              would spend her mornings grinding spices the way her grandmother
              taught her..."
            </p>

            <p className="text-foreground/75 font-body text-base sm:text-lg leading-relaxed mb-6">
              The aroma of freshly ground rai and methi seeds. The sound of the
              stone grinder. The careful hand that knows exactly when the
              mustard oil is hot enough. These are not just cooking techniques —
              they are memories passed down through generations, living in the
              hands of women who have never written a recipe in their lives, yet
              produce results that no restaurant chef can replicate.
            </p>

            <p className="text-foreground/75 font-body text-base sm:text-lg leading-relaxed mb-6">
              Choudhary Aunty was born from a simple question:{" "}
              <em>
                Why should these extraordinary skills remain within four walls?
              </em>{" "}
              These women — our aunties, our maasis, our tais — have fed entire
              families for decades. Their pickles have cured winter colds. Their
              sweets have marked every celebration. Their namkeen has been the
              comfort food of countless road trips.
            </p>

            <p className="text-foreground/75 font-body text-base sm:text-lg leading-relaxed">
              They deserve more than gratitude. They deserve{" "}
              <span className="font-semibold text-saffron">
                recognition, independence, and enterprise.
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-14 sm:py-20 deep-section relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-saffron blur-3xl" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Quote className="w-12 h-12 text-saffron mx-auto mb-4 opacity-60" />
            <blockquote className="font-accent text-2xl sm:text-3xl md:text-4xl font-semibold text-cream leading-relaxed italic">
              Sapne kabhi bhi old nahin hote.
              <br />
              <span className="text-saffron/85 text-xl sm:text-2xl font-normal">
                Dream has no age — will happen. I just keep cooking.
              </span>
            </blockquote>
            <p className="text-cream/80 font-body text-sm mt-6 not-italic">
              — Anju Choudhary, Founder
            </p>
          </motion.div>
        </div>
      </section>

      {/* Anju's Journey — 5 Photos */}
      <section className="py-14 sm:py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              The Journey
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl mt-1.5">
              Anju Choudhary's Story
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-lg mx-auto text-sm">
              From a small kitchen in Bihar to kitchens across India — this is
              her journey. Five moments. One woman's extraordinary dream.
            </p>
          </motion.div>

          <div className="space-y-12">
            {anjuJourney.map((chapter, idx) => (
              <motion.div
                key={chapter.year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-6 items-center ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-warm relative ${
                    idx % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <img
                    src={chapter.img}
                    alt={chapter.caption}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-saffron text-cream text-xs font-display font-bold px-3 py-1 rounded-full shadow-warm">
                    {chapter.year}
                  </div>
                </div>

                {/* Text */}
                <div
                  className={`flex flex-col justify-center ${
                    idx % 2 === 1 ? "lg:order-1 lg:pr-6" : "lg:pl-6"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-saffron/10 flex items-center justify-center text-saffron font-display font-bold text-xs">
                      {idx + 1}
                    </div>
                    <span className="text-saffron text-xs tracking-widest uppercase font-body font-semibold">
                      Chapter {idx + 1}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-3 leading-tight">
                    {chapter.caption}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm sm:text-base leading-relaxed">
                    {chapter.story}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-14 sm:py-20 mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
                Our Mission
              </span>
              <h2 className="section-heading text-3xl sm:text-4xl mt-2 mb-5">
                Preserving India's Culinary Heritage, One Jar at a Time
              </h2>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-4">
                India's regional cuisines are among the most diverse and
                sophisticated in the world. Yet much of this knowledge lives
                only in memory — passed down in kitchens, never documented,
                never celebrated beyond the household.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-4">
                Choudhary Aunty is building a platform where this knowledge has
                value — where a woman in rural Bihar can build a livelihood from
                her grandmother's achar recipe, where a homemaker in Punjab can
                earn financial independence through her family's generations-old
                sweet recipe.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed">
                We are not just selling food.{" "}
                <span className="text-saffron font-semibold">
                  We are preserving living heritage.
                </span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  icon: "🌶️",
                  title: "Authenticity",
                  desc: "Traditional recipes, no shortcuts, no artificial preservatives. Made exactly the way your grandmother made it.",
                },
                {
                  icon: "✨",
                  title: "Quality",
                  desc: "We sample every product before listing. Minimum batch sizes ensure consistent quality in every order.",
                },
                {
                  icon: "💜",
                  title: "Empowerment",
                  desc: "Putting financial independence and dignity into the hands of women who built our families.",
                },
                {
                  icon: "📖",
                  title: "Tradition",
                  desc: "Preserving the culinary knowledge of India's homemakers for generations to come.",
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="bg-card rounded-2xl p-5 border border-border card-warm shadow-xs"
                >
                  <div className="text-3xl mb-3">{value.icon}</div>
                  <h3 className="font-display font-bold text-sm text-foreground mb-1.5">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-xs font-body leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Women Behind It */}
      <section className="py-14 sm:py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              The Makers
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl mt-1.5">
              The Women Behind It All
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {[
              {
                name: "Anju Choudhary",
                state: "Bihar",
                emoji: "🌾",
                story:
                  "Anju ji has been making achar for 35 years. Her aam ka achar recipe was passed down from her dadi, who learned it in the kitchens of Munger. Every year, when the first mangoes arrive, Anju ji begins the ancient ritual of washing, drying, and slicing. Her minimum batch of 5 kg isn't a business constraint — it's a minimum requirement for the traditional sun-drying process that gives her achar its unique flavor.",
                quote: true,
              },
              {
                name: "Babita Tai",
                state: "Haryana",
                emoji: "🌻",
                story:
                  "Babita Tai from Rohtak makes namakpara that disappears within hours in her household. Her secret? Pure desi ghee and a hand-kneading technique that takes 40 minutes — something no machine can replicate. She laughs when asked about a recipe: 'I just know when the dough feels right.' A homemaker of 28 years, Babita Tai is now building her own small enterprise.",
              },
              {
                name: "Sarla Maasi",
                state: "Uttar Pradesh",
                emoji: "🏺",
                story:
                  "From the city of festivals, Lucknow, Sarla Maasi's besan ladoo have been the centerpiece of every Diwali in her mohalla. Roasting besan to the exact golden color, the ratio of ghee, the precise moment to add powdered sugar — these are skills developed over 40 years. She calls her ladoos 'emotional support food' and she's not wrong.",
              },
              {
                name: "Preetkaur Aunty",
                state: "Punjab",
                emoji: "🌿",
                story:
                  "Preetkaur Aunty from Amritsar grew up in a family where every harvest season meant pickling. Her mixed vegetable achars — gajar-gobhi-shalgam — are made with mustard oil that she insists on personally selecting at the bazaar. 'The oil has to smell right,' she says. Her products have already found fans across Mumbai and Bangalore.",
              },
              {
                name: "Geeta Devi",
                state: "Uttarakhand",
                emoji: "🏔️",
                story:
                  "From the hills of Almora, Geeta Devi makes traditional Pahadi foods that most urban Indians have never tasted. Her bhaang ki chutney and aloo ke gutke represent a culinary tradition that's at risk of being forgotten. She joined Choudhary Aunty to share the flavors of the mountains with the plains.",
              },
            ].map((maker, idx) => (
              <motion.div
                key={maker.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-5 bg-background rounded-2xl p-6 border border-border card-warm shadow-xs"
              >
                <div className="w-12 h-12 shrink-0 rounded-full bg-saffron/10 flex items-center justify-center text-2xl">
                  {maker.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-display font-bold text-foreground text-base">
                      {maker.name}
                    </h3>
                    <span className="state-badge">{maker.state}</span>
                  </div>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed">
                    {maker.story}
                  </p>
                  {"quote" in maker && maker.quote && (
                    <div className="mt-3 pt-3 border-t border-saffron/20">
                      <p className="font-display font-semibold text-foreground text-base">
                        'Sapne kabhi bhi old nahin hote'
                      </p>
                      <p className="text-muted-foreground text-sm font-body italic mt-1">
                        Dream has no age — will happen. I just keep cooking.
                      </p>
                      <p className="text-saffron text-xs font-body font-semibold mt-1">
                        — Anju Choudhary, Founder
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expansion Plan */}
      <section className="py-14 sm:py-20 mesh-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
              The Vision
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl mt-1.5">
              Growing, State by State
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-lg mx-auto">
              We're building this movement one state at a time, ensuring quality
              and trust before scaling.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                phase: "Phase 1",
                timeline: "March 2026",
                states: "Bihar & Haryana",
                status: "live",
                desc: "Our founding states. Where it all began with Anju Choudhary and Babita Tai.",
              },
              {
                phase: "Phase 2",
                timeline: "April 2026",
                states: "Punjab & Uttar Pradesh",
                status: "live",
                desc: "Expanding to the rich culinary traditions of Punjab and UP — Preetkaur Aunty and Sarla Maasi.",
              },
              {
                phase: "Phase 3",
                timeline: "May 2026",
                states: "Uttarakhand",
                status: "live",
                desc: "Bringing the flavours of the mountains to your doorstep with Geeta Devi.",
              },
              {
                phase: "Phase 4",
                timeline: "Q3 2026",
                states: "Rajasthan, Gujarat, Bengal, Maharashtra & more",
                status: "upcoming",
                desc: "Expanding across India's most celebrated culinary traditions.",
              },
              {
                phase: "Phase 5",
                timeline: "2027",
                states: "Pan India — All 28 States",
                status: "upcoming",
                desc: "Every state, every aunty, every recipe. India's first truly national homemade food platform.",
              },
            ].map((phase, idx) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border"
              >
                <div className="flex-shrink-0 flex flex-col items-center gap-1">
                  <div
                    className={`w-3 h-3 rounded-full ${phase.status === "live" ? "bg-saffron" : "bg-border"}`}
                  />
                  {idx < 4 && <div className="w-0.5 h-8 bg-border" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-display font-bold text-foreground text-sm">
                      {phase.phase}
                    </span>
                    <span className="text-xs text-muted-foreground font-body">
                      {phase.timeline}
                    </span>
                    {phase.status === "live" ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold font-body">
                        Live
                      </span>
                    ) : (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-body">
                        Upcoming
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-saffron shrink-0" />
                    <span className="text-saffron text-sm font-semibold font-body">
                      {phase.states}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs font-body">
                    {phase.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KUKU & DADI KI JODI ===== */}
      <section className="py-0">
        <div className="relative w-full overflow-hidden">
          {/* Full-width photo */}
          <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[360px] max-h-[600px] overflow-hidden">
            <img
              src="/assets/uploads/PHOTO-2026-03-04-22-52-52-1.jpg"
              alt="Kuku and Dadi — Anju ji and Kuku together"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-burgundy/20 to-burgundy/80" />
            {/* Overlay text at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <span className="text-saffron text-xs tracking-[0.3em] uppercase font-body font-semibold">
                Kuku & Dadi ki Jodi
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-cream mt-2 leading-tight max-w-2xl">
                A Grandson. A Grandmother.{" "}
                <span className="text-saffron italic">
                  And a Website Built with Love.
                </span>
              </h2>
            </div>
          </div>

          {/* Story paragraph */}
          <div className="bg-burgundy px-6 sm:px-10 lg:px-20 py-10 sm:py-14">
            <div className="max-w-3xl mx-auto">
              <p className="text-cream/85 font-body text-base sm:text-lg leading-relaxed">
                You are on a website that was built by a boy — for his Dadi.
                Kuku didn't hire an agency. He sat down and built it himself —
                because when your grandmother has a story this powerful and a
                kitchen this extraordinary, you don't leave it to anyone else.
              </p>
              <p className="text-cream/85 font-body text-base sm:text-lg leading-relaxed mt-5">
                This is{" "}
                <span className="text-saffron font-semibold font-display text-xl">
                  Kuku & Dadi ki Jodi.
                </span>{" "}
                A team of two. One who has lived a lifetime of recipes. One who
                is making sure the world finally gets to taste them.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-saffron/25" />
                <span className="text-saffron font-display italic text-sm">
                  Made with love. Built with purpose.
                </span>
                <div className="h-px flex-1 bg-saffron/25" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 deep-section relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-saffron blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-turmeric blur-3xl" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-saffron text-saffron" />
              ))}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream mb-2">
              Taste the Story
            </h2>
            <p className="text-cream/85 font-body text-sm mb-2 italic">
              "Sapne kabhi old nahin hote."
            </p>
            <p className="text-cream/75 font-body text-xs mb-8">
              Every order you place supports a real woman and her family. Be
              part of this movement.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/shop"
                search={{}}
                className="inline-flex items-center justify-center gap-2 bg-saffron hover:bg-terracotta text-cream font-semibold px-6 py-3.5 rounded-full transition-colors shadow-warm font-body"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/makers"
                className="inline-flex items-center justify-center gap-2 border border-cream/30 text-cream hover:bg-cream/10 font-semibold px-6 py-3.5 rounded-full transition-colors font-body"
              >
                <Heart className="w-4 h-4" />
                Meet the Makers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

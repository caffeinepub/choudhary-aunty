import type { MakerStory } from "@/constants/makerStories";
import { Calendar, Heart, Home, MapPin, UtensilsCrossed } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface HerStorySectionProps {
  story: MakerStory;
  makerName: string;
}

// ─── Life Marker Badge ───────────────────────────────────────────────────────
function LifeMarker({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-full px-4 py-2.5 shrink-0">
      <div className="w-7 h-7 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5 text-amber-700" />
      </div>
      <div>
        <div className="text-[10px] font-body font-semibold uppercase tracking-wider text-amber-600/80">
          {label}
        </div>
        <div className="font-serif italic text-amber-900 text-sm leading-tight">
          {value}
        </div>
      </div>
    </div>
  );
}

// ─── Timeline Chapter Card ───────────────────────────────────────────────────
function ChapterCard({
  chapter,
  index,
}: {
  chapter: { title: string; emoji: string; content: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="relative flex gap-4 sm:gap-6"
    >
      {/* Timeline line + dot */}
      <div className="hidden sm:flex flex-col items-center shrink-0">
        <div className="w-10 h-10 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center shadow-sm z-10">
          <span className="text-lg" role="img" aria-label={chapter.title}>
            {chapter.emoji}
          </span>
        </div>
        {index < 4 && (
          <div className="flex-1 w-px border-l-2 border-dashed border-amber-300 mt-1 min-h-[2rem]" />
        )}
      </div>

      {/* Mobile dot */}
      <div className="sm:hidden shrink-0 mt-1">
        <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center">
          <span className="text-sm" role="img" aria-label={chapter.title}>
            {chapter.emoji}
          </span>
        </div>
      </div>

      {/* Card */}
      <div
        className="flex-1 bg-white/90 border border-amber-100 rounded-xl shadow-sm p-4 sm:p-5 mb-6"
        style={{
          boxShadow: "3px 3px 0 rgba(180, 120, 40, 0.15)",
        }}
      >
        <h4 className="font-display font-bold text-amber-900 text-base sm:text-lg mb-2 leading-snug">
          {chapter.title}
        </h4>
        <p className="font-body text-foreground/75 leading-relaxed text-sm">
          {chapter.content}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function HerStorySection({
  story,
  makerName,
}: HerStorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const firstName = makerName.split(" ")[0];

  return (
    <section
      ref={sectionRef}
      data-ocid="maker.story.section"
      className="mt-14 border-t-4 border-amber-700/30 relative overflow-hidden"
      style={{
        background: "#fdf6e3",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      }}
    >
      {/* Decorative marigold top border */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-12 sm:py-16">
        {/* ─── A — Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          {/* Ornament divider */}
          <div
            className="flex items-center justify-center gap-3 mb-5"
            aria-hidden="true"
          >
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-amber-400/60" />
            <span className="text-amber-600/70 text-xs tracking-[0.4em] uppercase font-body font-semibold">
              Her Story
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-amber-400/60" />
          </div>
          <div
            aria-hidden="true"
            className="flex items-center justify-center gap-2 mb-3 text-amber-500/60 text-xs"
          >
            ✦ &nbsp; ❧ &nbsp; ✦
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-amber-900 mb-2">
            — {firstName}'s Story —
          </h2>
          <p className="font-serif italic text-amber-700/80 text-base">
            "Every recipe holds a lifetime"
          </p>
        </motion.div>

        {/* ─── B — Life Markers Strip ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          <LifeMarker icon={Calendar} label="Born" value={story.dob} />
          <LifeMarker icon={MapPin} label="From" value={story.birthPlace} />
          <LifeMarker icon={Heart} label="Married" value={story.marriedYear} />
          <LifeMarker
            icon={Home}
            label="Now lives in"
            value={story.presentLocation}
          />
        </motion.div>

        {/* ─── C — Nostalgic Photo ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center mb-12"
        >
          <div
            className="relative inline-block"
            style={{
              filter: "sepia(0.4) contrast(1.1) brightness(0.95)",
            }}
          >
            <img
              src={story.storyImage}
              alt={`${makerName} — her story`}
              className="w-full max-w-xs sm:max-w-sm rounded-lg object-cover"
              style={{
                boxShadow:
                  "4px 4px 0 #c8a96e, 0 8px 32px rgba(100, 60, 20, 0.25)",
                outline: "4px solid white",
                outlineOffset: "-4px",
              }}
              loading="lazy"
            />
            {/* Decorative corner fold */}
            <div
              aria-hidden="true"
              className="absolute top-2 right-2 w-6 h-6 bg-amber-100/80 border-r border-b border-amber-300"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
            />
          </div>
          <p className="mt-3 font-serif italic text-amber-700 text-sm text-center max-w-xs">
            "{story.tagline}"
          </p>
        </motion.div>

        {/* ─── D — Story Timeline ─── */}
        <div data-ocid="maker.story.timeline" className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-3 mb-7"
          >
            <div className="h-px flex-1 bg-amber-200" />
            <h3 className="font-display font-bold text-amber-900 text-lg sm:text-xl whitespace-nowrap">
              📖 Her Life in Chapters
            </h3>
            <div className="h-px flex-1 bg-amber-200" />
          </motion.div>

          <div className="space-y-0">
            {story.chapters.map((chapter, index) => (
              <ChapterCard
                key={chapter.title}
                chapter={chapter}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* ─── E — Five Best Dishes ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-amber-200" />
            <h3 className="font-display font-bold text-amber-900 text-lg whitespace-nowrap">
              <UtensilsCrossed className="inline w-4 h-4 mr-1.5 text-amber-600" />
              {firstName}'s 5 Signature Dishes
            </h3>
            <div className="h-px flex-1 bg-amber-200" />
          </div>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {story.fiveBestDishes.map((dish) => (
              <span
                key={dish}
                className="font-body text-sm px-3.5 py-1.5 rounded-full border border-amber-300 text-amber-800 bg-amber-50 hover:bg-amber-100 transition-colors"
                style={{ background: "oklch(0.96 0.05 80)" }}
              >
                🍽️ {dish}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ─── F — Her Dream (closing card) ─── */}
        <motion.div
          data-ocid="maker.story.dream_card"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.4 }}
          className="rounded-2xl p-6 sm:p-8 border border-amber-200 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #fffbf2 0%, #fff8ed 50%, #fef3e2 100%)",
            boxShadow: "0 4px 24px rgba(180, 120, 20, 0.12)",
          }}
        >
          {/* Decorative large quote mark */}
          <div
            aria-hidden="true"
            className="absolute -top-2 left-4 font-display text-9xl font-black text-amber-200/70 leading-none select-none pointer-events-none"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            ❝
          </div>

          {/* Background marigold pattern */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 text-[8rem] opacity-[0.04] select-none pointer-events-none leading-none"
          >
            🌼
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-4 h-4 text-amber-600 fill-amber-200" />
              <span className="font-body text-xs font-semibold uppercase tracking-wider text-amber-600">
                {firstName}'s Dream
              </span>
            </div>

            <p className="font-body text-lg leading-relaxed text-amber-900/85 mb-5">
              {story.herDream}
            </p>

            <blockquote className="border-l-4 border-amber-400 pl-4 mt-4">
              <p className="font-serif italic text-amber-800 text-base leading-relaxed">
                "{story.dreamQuote}"
              </p>
              <footer className="mt-3 text-amber-700/70 text-sm font-body font-semibold">
                — {makerName}
              </footer>
            </blockquote>
          </div>
        </motion.div>

        {/* Bottom marigold divider */}
        <div
          aria-hidden="true"
          className="mt-10 flex items-center justify-center gap-2 text-amber-400/50 text-sm"
        >
          ❧ &nbsp; ✦ &nbsp; ❧
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface Review {
  name: string;
  location: string;
  date: string;
  rating: number;
  text: string;
  photoInitial?: string;
}

interface ReviewsSectionProps {
  productName?: string;
  makerName?: string;
  displayOnly?: boolean;
}

const PRODUCT_REVIEWS: Review[] = [
  {
    name: "Meena Sharma",
    location: "Delhi",
    date: "Feb 2026",
    rating: 5,
    text: "The achar is absolutely divine! Tastes exactly like what my dadi used to make. The mustard oil fragrance is authentic and the spice level is perfect. Will order again and again!",
    photoInitial: "M",
  },
  {
    name: "Ankit Gupta",
    location: "Pune",
    date: "Jan 2026",
    rating: 5,
    text: "Ordered for Diwali gifting and every single person asked me where I got this from. The packaging is neat and the quality is exceptional. Truly homemade, you can taste the difference.",
    photoInitial: "A",
  },
  {
    name: "Priya Agarwal",
    location: "Bengaluru",
    date: "Jan 2026",
    rating: 4,
    text: "Finally found authentic UP/Bihar food in Bangalore! The ladoos are melt-in-mouth and the achar has that real ghar ka swaad. Delivery was smooth and packaging was solid.",
    photoInitial: "P",
  },
  {
    name: "Rahul Verma",
    location: "Mumbai",
    date: "Dec 2025",
    rating: 5,
    text: "Best purchase of the year! My mother was in tears tasting the petha — said it reminded her of her childhood in Agra. These aunties are truly talented and the product speaks for itself.",
    photoInitial: "R",
  },
];

const MAKER_REVIEWS: Review[] = [
  {
    name: "Sunita Patel",
    location: "Hyderabad",
    date: "Feb 2026",
    rating: 5,
    text: "I've ordered from this maker 4 times now. Each time the product arrives perfectly packed and the taste is consistently amazing. Her dedication to the traditional recipe shows in every bite.",
    photoInitial: "S",
  },
  {
    name: "Vivek Khanna",
    location: "Gurgaon",
    date: "Jan 2026",
    rating: 5,
    text: "Such a heartwarming initiative! Supporting these amazing women while getting authentic food is a win-win. Her products are top-quality and the communication via WhatsApp is prompt.",
    photoInitial: "V",
  },
  {
    name: "Kavita Mishra",
    location: "Chennai",
    date: "Dec 2025",
    rating: 4,
    text: "The care and love that goes into her products is evident. Got the winter special collection as a gift and my entire family loved it. The traditional preparation method really makes a difference.",
    photoInitial: "K",
  },
];

const AVATAR_COLORS = [
  "bg-saffron/25 text-amber-800",
  "bg-rose-200/60 text-rose-700",
  "bg-emerald-200/50 text-emerald-700",
  "bg-sky-200/50 text-sky-700",
];

function getAvatarColor(name: string): string {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

function StarRating({
  rating,
  interactive = false,
  onRate,
}: {
  rating: number;
  interactive?: boolean;
  onRate?: (r: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  if (!interactive) {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i <= rating
                ? "fill-saffron text-saffron"
                : "fill-border text-border"
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onRate?.(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
          aria-label={`${i} star`}
          data-ocid="review.star.toggle"
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              i <= (hovered || rating)
                ? "fill-saffron text-saffron"
                : "fill-border text-border"
            }`}
          />
        </button>
      ))}
      <span className="text-xs text-muted-foreground font-body ml-1">
        {rating > 0 ? `${rating}/5` : "Tap to rate"}
      </span>
    </div>
  );
}

function ReviewCard({ review, idx }: { review: Review; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.08 }}
      className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 hover:shadow-warm transition-shadow"
      data-ocid={`reviews.item.${idx + 1}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-base border-2 border-saffron/30 shrink-0 ${getAvatarColor(review.name)}`}
          >
            {review.photoInitial ?? review.name.charAt(0)}
          </div>
          <div>
            <p className="font-body font-semibold text-sm text-foreground leading-none mb-0.5">
              {review.name}
            </p>
            <p className="text-muted-foreground text-xs font-body">
              {review.location} · {review.date}
            </p>
          </div>
        </div>
        {/* Verified badge */}
        <span className="inline-flex items-center gap-1 text-[10px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-body font-semibold shrink-0">
          ✓ Verified
        </span>
      </div>

      <StarRating rating={review.rating} />

      <p className="text-foreground/75 text-sm font-body leading-relaxed">
        {review.text}
      </p>
    </motion.div>
  );
}

export default function ReviewsSection({
  productName,
  makerName,
  displayOnly = false,
}: ReviewsSectionProps) {
  const reviews = makerName ? MAKER_REVIEWS : PRODUCT_REVIEWS;
  const avgRating =
    Math.round(
      (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10,
    ) / 10;

  // Write-review form state
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !rating || text.length < 30) return;
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thank you! Your review will appear after moderation.");
      setName("");
      setLocation("");
      setRating(0);
      setText("");
      setSubmitting(false);
    }, 600);
  }

  const title = makerName
    ? `Reviews for ${makerName.split(" ")[0]}`
    : "Customer Reviews";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-12"
      data-ocid="reviews.section"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h2 className="font-display font-bold text-2xl text-foreground">
            {title}
          </h2>
          {productName && (
            <p className="text-muted-foreground text-xs font-body">
              for {productName}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i <= Math.round(avgRating)
                    ? "fill-saffron text-saffron"
                    : "fill-border text-border"
                }`}
              />
            ))}
          </div>
          <span className="font-display font-bold text-foreground text-base">
            {avgRating}
          </span>
          <span className="text-muted-foreground text-xs font-body">
            ({reviews.length} reviews)
          </span>
        </div>
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {reviews.map((review, idx) => (
          <ReviewCard key={review.name} review={review} idx={idx} />
        ))}
      </div>

      {/* Write a Review Form (not shown in display-only mode) */}
      {!displayOnly && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-saffron/5 border border-saffron/20 rounded-2xl p-6"
          data-ocid="reviews.write.panel"
        >
          <h3 className="font-display font-bold text-lg text-foreground mb-1">
            Share Your Experience
          </h3>
          <p className="text-muted-foreground text-xs font-body mb-5">
            Your review helps others discover authentic homemade food.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="review-name"
                  className="block text-xs font-body font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider"
                >
                  Your Name *
                </label>
                <Input
                  id="review-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Meena Sharma"
                  required
                  className="font-body"
                  data-ocid="review.name.input"
                />
              </div>
              <div>
                <label
                  htmlFor="review-location"
                  className="block text-xs font-body font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider"
                >
                  Your City
                </label>
                <Input
                  id="review-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Delhi"
                  className="font-body"
                  data-ocid="review.location.input"
                />
              </div>
            </div>

            <div>
              <p className="block text-xs font-body font-semibold text-foreground/70 mb-2 uppercase tracking-wider">
                Your Rating *
              </p>
              <StarRating rating={rating} interactive onRate={setRating} />
            </div>

            <div>
              <label
                htmlFor="review-text"
                className="block text-xs font-body font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider"
              >
                Your Review *{" "}
                <span className="text-muted-foreground normal-case tracking-normal">
                  (min 30 characters)
                </span>
              </label>
              <Textarea
                id="review-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tell us about your experience with this product..."
                rows={4}
                className="font-body resize-none"
                data-ocid="review.text.textarea"
              />
              <p className="text-muted-foreground text-[10px] font-body mt-1">
                {text.length}/30 characters minimum
              </p>
            </div>

            <Button
              type="submit"
              disabled={!name || !rating || text.length < 30 || submitting}
              className="bg-saffron hover:bg-terracotta text-cream font-semibold font-body rounded-full px-6"
              data-ocid="review.submit_button"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </motion.div>
      )}
    </motion.section>
  );
}

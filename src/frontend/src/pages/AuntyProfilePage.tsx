import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import {
  Award,
  ChefHat,
  Heart,
  MapPin,
  Quote,
  ShoppingBag,
  Star,
} from "lucide-react";
import { motion } from "motion/react";

// ── Mock Aunty Data ─────────────────────────────────────────────────────
interface AuntyProfile {
  id: string;
  name: string;
  city: string;
  state: string;
  tagline: string;
  story: string;
  quote: string;
  topDishes: string[];
  badges: string[];
  rating: number;
  ordersCompleted: number;
  speciality: string;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
}

const MOCK_PROFILES: AuntyProfile[] = [
  {
    id: "1",
    name: "Sunita Devi",
    city: "Patna",
    state: "Bihar",
    tagline: "The Soul of Bihari Kitchen",
    story:
      "Sunita ji has been cooking Bihari delicacies for over 30 years, starting from her mother's small mud kitchen in Gaya. When her husband fell ill, she turned her love for Litti Chokha and Sattu into a livelihood. Today, her food carries the warmth of generations.",
    quote:
      "Khana banana sirf pet nahi, dil bhi bharta hai. Every dish I make carries a prayer for the person eating it.",
    topDishes: [
      "Litti Chokha",
      "Sattu Paratha",
      "Aloo Chokha",
      "Thekua",
      "Malpua",
    ],
    badges: ["Verified", "Heritage Recipes", "Hand-Crafted"],
    rating: 4.9,
    ordersCompleted: 342,
    speciality: "Bihari Traditional",
    initials: "SD",
    gradientFrom: "#f59e0b",
    gradientTo: "#d97706",
  },
  {
    id: "2",
    name: "Meera Sharma",
    city: "Lucknow",
    state: "Uttar Pradesh",
    tagline: "Nawabi Flavours from Her Dastarkhan",
    story:
      "Meera ji grew up in the lanes of Lucknow where food is not just eaten but experienced. She learned Awadhi dum cooking from her nani at age twelve. Her Galouti Kebabs melt like butter — a secret she guards closely.",
    quote:
      "Lucknow ka khana sirf zabaan nahi, rooh ko choo leta hai. I cook with patience because the best flavours cannot be rushed.",
    topDishes: [
      "Awadhi Biryani",
      "Galouti Kebab",
      "Shahi Tukda",
      "Nihari",
      "Korma",
    ],
    badges: ["Verified", "Heritage Recipes", "Hand-Crafted"],
    rating: 4.8,
    ordersCompleted: 521,
    speciality: "Awadhi Cuisine",
    initials: "MS",
    gradientFrom: "#7c3aed",
    gradientTo: "#4c1d95",
  },
  {
    id: "3",
    name: "Kamla Bai",
    city: "Jaipur",
    state: "Rajasthan",
    tagline: "Desert Warmth in Every Bite",
    story:
      "Kamla ji cooks the food of the Thar desert — hearty, spiced, and deeply rooted in Rajasthani tradition. She has been making Dal Baati and Gatte ki Sabzi since she was 16. The secret? Firewood, patience, and a generous hand with ghee.",
    quote:
      "Rajasthan ka khana desert ki tarah lagta hai — khadak bahar se, lekin andar se bahut warm. I want people to feel that.",
    topDishes: [
      "Dal Baati Churma",
      "Gatte ki Sabzi",
      "Ker Sangri",
      "Moong Dal Halwa",
      "Bajre ki Roti",
    ],
    badges: ["Verified", "Heritage Recipes", "Hand-Crafted"],
    rating: 4.7,
    ordersCompleted: 189,
    speciality: "Rajasthani Traditional",
    initials: "KB",
    gradientFrom: "#ef4444",
    gradientTo: "#b91c1c",
  },
  {
    id: "4",
    name: "Rukmini Nair",
    city: "Thrissur",
    state: "Kerala",
    tagline: "God's Own Kitchen",
    story:
      "Rukmini ji from Thrissur has spent four decades mastering the balance of coconut, curry leaf, and mustard seed. Her Avial is a ritual — slow-cooked, aromatic, and eaten best with rice during Onam. She says food is her prayer.",
    quote:
      "In Kerala we say — good food is cooked with the rhythm of the rain outside and the smell of coconut oil inside. That is my kitchen.",
    topDishes: ["Avial", "Puttu", "Kerala Prawn Curry", "Appam", "Fish Molee"],
    badges: ["Verified", "Heritage Recipes", "Hand-Crafted"],
    rating: 4.9,
    ordersCompleted: 618,
    speciality: "Kerala Traditional",
    initials: "RN",
    gradientFrom: "#059669",
    gradientTo: "#065f46",
  },
  {
    id: "5",
    name: "Pushpa Gupta",
    city: "Bhopal",
    state: "Madhya Pradesh",
    tagline: "Madhya Pradesh in a Plate",
    story:
      "Pushpa ji from Bhopal is known in her neighbourhood as the best Poha maker in three streets. Her Bhutte ka Kees (spiced corn) is a monsoon ritual. She started cooking professionally after her two children started school, turning her kitchen into a small food enterprise.",
    quote:
      "Ghar ka khana sirf ghar mein hi milta hai. I want to bring that feeling to every table across India.",
    topDishes: ["Poha", "Bhutte ka Kees", "Chakli", "Mawa Bati", "Dal Bafla"],
    badges: ["Verified", "Heritage Recipes", "Hand-Crafted"],
    rating: 4.6,
    ordersCompleted: 97,
    speciality: "MP Cuisine",
    initials: "PG",
    gradientFrom: "#f97316",
    gradientTo: "#ea580c",
  },
];

function getProfileById(id: string): AuntyProfile | null {
  return MOCK_PROFILES.find((p) => p.id === id) ?? null;
}

// ── Dish Pill ─────────────────────────────────────────────────────────
function DishPill({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1 bg-saffron/10 text-saffron border border-saffron/25 rounded-full px-3 py-1 text-xs font-body font-medium">
      {name}
    </span>
  );
}

// ── Badge Pill ────────────────────────────────────────────────────────
function AwarBadge({ label }: { label: string }) {
  const icons: Record<string, React.ReactNode> = {
    Verified: <Award className="w-3 h-3" />,
    "Heritage Recipes": <Heart className="w-3 h-3 fill-current" />,
    "Hand-Crafted": <ChefHat className="w-3 h-3" />,
  };
  return (
    <span className="inline-flex items-center gap-1.5 bg-cream border border-border rounded-full px-3 py-1 text-xs font-body font-semibold text-foreground shadow-sm">
      {icons[label] ?? <Star className="w-3 h-3" />}
      {label}
    </span>
  );
}

// ── Profile Page ──────────────────────────────────────────────────────
export default function AuntyProfilePage() {
  const { id } = useParams({ from: "/aunty-profile/$id" });
  const profile = getProfileById(id);

  if (!profile) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-4">
          <div className="text-5xl mb-4">🫙</div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Profile not found
          </h1>
          <p className="text-muted-foreground font-body mb-6">
            This aunty's profile doesn't exist yet.
          </p>
          <Link to="/makers">
            <Button className="bg-saffron hover:bg-terracotta text-cream font-body">
              Meet Our Makers
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: `linear-gradient(135deg, ${profile.gradientFrom} 0%, ${profile.gradientTo} 100%)`,
          }}
        />
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative container mx-auto px-4 max-w-4xl pt-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center sm:items-end gap-6"
          >
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="shrink-0"
            >
              <div
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white/40 shadow-2xl flex items-center justify-center text-white"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="font-display font-bold text-4xl sm:text-5xl">
                  {profile.initials}
                </span>
              </div>
            </motion.div>

            {/* Name & location */}
            <div className="text-white text-center sm:text-left pb-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                <Badge className="bg-white/20 text-white border-white/30 font-body text-xs backdrop-blur-sm">
                  ✓ Verified Aunty
                </Badge>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight drop-shadow-md">
                {profile.name}
              </h1>
              <div className="flex items-center gap-1.5 mt-1.5 justify-center sm:justify-start">
                <MapPin className="w-3.5 h-3.5 opacity-80" />
                <span className="font-body text-sm opacity-90">
                  {profile.city}, {profile.state}
                </span>
              </div>
              <p className="font-accent italic text-base sm:text-lg opacity-85 mt-2 drop-shadow">
                "{profile.tagline}"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="container mx-auto px-4 max-w-4xl -mt-4">
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border shadow-md p-5 mb-6 grid grid-cols-3 divide-x divide-border"
        >
          {[
            {
              label: "Rating",
              value: `${profile.rating} ★`,
              color: "text-amber-500",
            },
            {
              label: "Orders",
              value: `${profile.ordersCompleted}+`,
              color: "text-saffron",
            },
            {
              label: "Speciality",
              value: profile.speciality,
              color: "text-foreground",
            },
          ].map((stat) => (
            <div key={stat.label} className="px-4 text-center">
              <div
                className={`font-display font-bold text-lg sm:text-xl ${stat.color}`}
              >
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-body mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Story + Quote + Badges */}
          <div className="md:col-span-2 space-y-5">
            {/* Story */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-card rounded-2xl border border-border p-5 sm:p-6"
            >
              <h2 className="font-display text-lg font-semibold text-foreground mb-3">
                Her Story
              </h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {profile.story}
              </p>
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-saffron/8 rounded-2xl border border-saffron/20 p-5 sm:p-6 relative"
            >
              <Quote className="w-8 h-8 text-saffron/30 absolute top-4 right-4" />
              <p className="font-accent italic text-base sm:text-lg text-foreground leading-relaxed">
                "{profile.quote}"
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-6 h-0.5 bg-saffron/50 rounded-full" />
                <span className="text-xs font-body text-muted-foreground">
                  {profile.name}
                </span>
              </div>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-card rounded-2xl border border-border p-5"
            >
              <h2 className="font-display text-base font-semibold text-foreground mb-3">
                Achievements
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.badges.map((b) => (
                  <AwarBadge key={b} label={b} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Dishes + CTA */}
          <div className="space-y-5">
            {/* Dishes */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl border border-border p-5"
            >
              <h2 className="font-display text-base font-semibold text-foreground mb-3">
                Signature Dishes
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.topDishes.map((dish) => (
                  <DishPill key={dish} name={dish} />
                ))}
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.38 }}
              className="bg-card rounded-2xl border border-border p-5 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-saffron/10 flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-5 h-5 text-saffron" />
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground mb-1">
                Love her cooking?
              </h3>
              <p className="text-xs text-muted-foreground font-body mb-4">
                Order authentic homemade food from {profile.name.split(" ")[0]}{" "}
                ji directly.
              </p>
              <Link to="/shop">
                <Button
                  className="w-full bg-saffron hover:bg-terracotta text-cream font-body font-semibold"
                  data-ocid="profile.primary_button"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Order from {profile.name.split(" ")[0]} ji
                </Button>
              </Link>
              <Link to="/makers">
                <Button
                  variant="ghost"
                  className="w-full mt-2 font-body text-sm text-muted-foreground hover:text-foreground"
                  data-ocid="profile.secondary_button"
                >
                  ← Meet All Makers
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}

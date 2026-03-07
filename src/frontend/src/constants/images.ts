export const MAKER_IMAGES: Record<string, string> = {
  "Anju Choudhary": "/assets/generated/maker-anju.dim_400x500.jpg",
  "Babita Tai": "/assets/generated/maker-babita.dim_400x500.jpg",
  "Sarla Maasi": "/assets/generated/maker-sarla.dim_400x500.jpg",
  "Preetkaur Aunty": "/assets/generated/maker-preetkaur.dim_400x500.jpg",
  "Geeta Devi": "/assets/generated/maker-geeta.dim_400x500.jpg",
};

export const PRODUCT_IMAGES: Record<string, string> = {
  // Category defaults
  achar: "/assets/generated/product-achar.dim_600x500.jpg",
  pickle: "/assets/generated/product-mixed-veg-pickle.dim_800x600.jpg",
  sweets: "/assets/generated/product-ladoo-premium.dim_800x600.jpg",
  ladoo: "/assets/generated/product-ladoo-premium.dim_800x600.jpg",
  namkeen: "/assets/generated/product-makhana-namkeen-bihar.dim_800x600.jpg",
  snacks: "/assets/generated/product-mathri-haryana.dim_800x600.jpg",
  namakpara: "/assets/generated/product-namakpara.dim_600x500.jpg",
  chutney:
    "/assets/generated/product-gahat-chutney-uttarakhand.dim_800x600.jpg",
  murabba: "/assets/generated/product-murabba-up.dim_800x600.jpg",
  halwa: "/assets/generated/product-moong-halwa-haryana.dim_800x600.jpg",
  barfi: "/assets/generated/product-singhara-barfi-bihar.dim_800x600.jpg",
  masala: "/assets/generated/product-saag-masala-punjab.dim_800x600.jpg",
  // Bihar specific
  tilkut: "/assets/generated/product-tilkut-bihar.dim_800x600.jpg",
  thekua: "/assets/generated/product-thekua-bihar.dim_800x600.jpg",
  makhana: "/assets/generated/product-makhana-namkeen-bihar.dim_800x600.jpg",
  foxnut: "/assets/generated/product-makhana-namkeen-bihar.dim_800x600.jpg",
  khaja: "/assets/generated/product-khaja-bihar.dim_800x600.jpg",
  singhara: "/assets/generated/product-singhara-barfi-bihar.dim_800x600.jpg",
  sattu: "/assets/generated/product-sattu-ladoo-bihar.dim_800x600.jpg",
  chana: "/assets/generated/product-chana-jor-bihar.dim_800x600.jpg",
  laai: "/assets/generated/product-laai-bihar.dim_800x600.jpg",
  anarsa: "/assets/generated/product-anarsa-bihar.dim_800x600.jpg",
  // Haryana specific
  churma: "/assets/generated/product-churma-ladoo-haryana.dim_800x600.jpg",
  bajra: "/assets/generated/product-bajra-ladoo-haryana.dim_800x600.jpg",
  kachri: "/assets/generated/product-kachri-chutney-haryana.dim_800x600.jpg",
  singri: "/assets/generated/product-singri-haryana.dim_800x600.jpg",
  moong: "/assets/generated/product-moong-halwa-haryana.dim_800x600.jpg",
  mathri: "/assets/generated/product-mathri-haryana.dim_800x600.jpg",
  gajar: "/assets/generated/product-gajar-halwa-up.dim_800x600.jpg",
  // Punjab specific
  gajak: "/assets/generated/product-gajak-punjab.dim_800x600.jpg",
  pinni: "/assets/generated/product-pinni-punjab.dim_800x600.jpg",
  wadi: "/assets/generated/product-wadi-punjab.dim_800x600.jpg",
  papad: "/assets/generated/product-papad-punjab.dim_800x600.jpg",
  aampapad: "/assets/generated/product-aam-papad-punjab.dim_800x600.jpg",
  chunda: "/assets/generated/product-mango-chunda-punjab.dim_800x600.jpg",
  saag: "/assets/generated/product-saag-masala-punjab.dim_800x600.jpg",
  besan: "/assets/generated/product-besan-ladoo-up.dim_800x600.jpg",
  besanhalwa: "/assets/generated/product-besan-halwa-punjab.dim_800x600.jpg",
  // UP specific
  petha: "/assets/generated/product-petha-agra-up.dim_800x600.jpg",
  peda: "/assets/generated/product-peda-up.dim_800x600.jpg",
  murabba2: "/assets/generated/product-murabba-up.dim_800x600.jpg",
  kachori: "/assets/generated/product-namakpara.dim_600x500.jpg",
  kanji: "/assets/generated/product-kanji-up.dim_800x600.jpg",
  aloo: "/assets/generated/product-aloo-achar-up.dim_800x600.jpg",
  namakpare: "/assets/generated/product-namakpara.dim_600x500.jpg",
  // Uttarakhand specific
  buransh:
    "/assets/generated/product-buransh-syrup-uttarakhand.dim_800x600.jpg",
  bhang: "/assets/generated/product-gahat-chutney-uttarakhand.dim_800x600.jpg",
  bal: "/assets/generated/product-bal-mithai-uttarakhand.dim_800x600.jpg",
  jhangora:
    "/assets/generated/product-jhangora-kheer-uttarakhand.dim_800x600.jpg",
  gahat: "/assets/generated/product-gahat-chutney-uttarakhand.dim_800x600.jpg",
  timru: "/assets/generated/product-timru-pickle-uttarakhand.dim_800x600.jpg",
  pahadi: "/assets/generated/product-pahadi-chips-uttarakhand.dim_800x600.jpg",
  singal: "/assets/generated/product-namakpara.dim_600x500.jpg",
  kafal: "/assets/generated/product-buransh-syrup-uttarakhand.dim_800x600.jpg",
};

export interface ProductGalleryImages {
  ingredients: string;
  preparation: string;
  uspVsFactory: string;
  meetMaker: string;
}

// Per-category gallery images (ingredients + preparation panels)
const GALLERY_IMAGES_BY_CATEGORY: Record<
  string,
  Partial<ProductGalleryImages>
> = {
  achar: {
    ingredients: "/assets/generated/gallery-ingredients-achar.dim_800x600.jpg",
    preparation: "/assets/generated/gallery-preparation-achar.dim_800x600.jpg",
  },
  sweets: {
    ingredients: "/assets/generated/gallery-ingredients-sweets.dim_800x600.jpg",
    preparation: "/assets/generated/gallery-preparation-sweets.dim_800x600.jpg",
  },
  ladoo: {
    ingredients: "/assets/generated/gallery-ingredients-sweets.dim_800x600.jpg",
    preparation: "/assets/generated/gallery-preparation-sweets.dim_800x600.jpg",
  },
  barfi: {
    ingredients: "/assets/generated/gallery-ingredients-sweets.dim_800x600.jpg",
    preparation: "/assets/generated/gallery-preparation-sweets.dim_800x600.jpg",
  },
  halwa: {
    ingredients: "/assets/generated/gallery-ingredients-sweets.dim_800x600.jpg",
    preparation: "/assets/generated/gallery-preparation-sweets.dim_800x600.jpg",
  },
  murabba: {
    ingredients: "/assets/generated/gallery-ingredients-achar.dim_800x600.jpg",
    preparation: "/assets/generated/gallery-preparation-achar.dim_800x600.jpg",
  },
  namkeen: {
    ingredients:
      "/assets/generated/gallery-ingredients-namkeen.dim_800x600.jpg",
    preparation:
      "/assets/generated/gallery-preparation-namkeen.dim_800x600.jpg",
  },
  snacks: {
    ingredients:
      "/assets/generated/gallery-ingredients-namkeen.dim_800x600.jpg",
    preparation:
      "/assets/generated/gallery-preparation-namkeen.dim_800x600.jpg",
  },
  chutney: {
    ingredients:
      "/assets/generated/gallery-ingredients-chutney.dim_800x600.jpg",
    preparation: "/assets/generated/gallery-preparation-pahadi.dim_800x600.jpg",
  },
  masala: {
    ingredients:
      "/assets/generated/gallery-ingredients-chutney.dim_800x600.jpg",
    preparation: "/assets/generated/gallery-preparation-pahadi.dim_800x600.jpg",
  },
};

const GALLERY_DEFAULTS: ProductGalleryImages = {
  ingredients: "/assets/generated/gallery-ingredients-namkeen.dim_800x600.jpg",
  preparation: "/assets/generated/gallery-preparation-namkeen.dim_800x600.jpg",
  uspVsFactory:
    "/assets/generated/gallery-usp-homemade-vs-factory.dim_800x600.jpg",
  meetMaker: "/assets/generated/product-meet-maker-anju.dim_800x600.jpg",
};

// Per-maker meet-maker images
const MEET_MAKER_IMAGES: Record<string, string> = {
  Bihar: "/assets/generated/maker-anju.dim_400x500.jpg",
  Haryana: "/assets/generated/maker-babita.dim_400x500.jpg",
  Punjab: "/assets/generated/maker-preetkaur.dim_400x500.jpg",
  "Uttar Pradesh": "/assets/generated/maker-sarla.dim_400x500.jpg",
  Uttarakhand: "/assets/generated/maker-geeta.dim_400x500.jpg",
};

export function getProductGalleryImages(
  category: string,
  state?: string,
): ProductGalleryImages {
  const catLower = category.toLowerCase();
  const catOverride = GALLERY_IMAGES_BY_CATEGORY[catLower] ?? {};
  const meetMaker =
    (state && MEET_MAKER_IMAGES[state]) || GALLERY_DEFAULTS.meetMaker;
  return {
    ...GALLERY_DEFAULTS,
    ...catOverride,
    meetMaker,
  };
}

// Keep old export for any remaining references
export const PRODUCT_GALLERY_IMAGES = GALLERY_DEFAULTS;

export const STORY_IMAGES = {
  anjuYoung: "/assets/generated/story-anju-young.dim_800x600.jpg",
  anjuKitchen: "/assets/generated/story-anju-kitchen.dim_800x600.jpg",
  anjuGrindingSpices:
    "/assets/generated/story-anju-grinding-spices.dim_800x600.jpg",
  anjuFirstPayment:
    "/assets/generated/story-anju-first-payment.dim_800x600.jpg",
  anjuEnterprise: "/assets/generated/story-anju-enterprise.dim_800x600.jpg",
};

export const DEFAULT_PRODUCT_IMAGE =
  "/assets/generated/product-achar.dim_600x500.jpg";
export const DEFAULT_MAKER_IMAGE =
  "/assets/generated/maker-anju.dim_400x500.jpg";
export const LOGO_IMAGE =
  "/assets/generated/logo-choudhary-aunty-transparent.dim_400x120.png";
export const HERO_IMAGE = "/assets/generated/hero-banner.dim_1400x700.jpg";
export const INDIA_MAP_IMAGE =
  "/assets/generated/india-map-states.dim_600x700.png";

export function getMakerImage(name: string): string {
  return MAKER_IMAGES[name] ?? DEFAULT_MAKER_IMAGE;
}

export function getProductImage(category: string, name?: string): string {
  if (name) {
    const nameLower = name.toLowerCase();
    // Check for specific product name keywords first (longest match wins)
    const nameKeywords = [
      // Must be before shorter variants
      "chana jor",
      "aam papad",
      "bal mithai",
      "pahadi aloo",
      "nam pak",
      "namak pare",
      "moong dal",
      "besan halwa",
      "besan ka halwa",
      // Single-word / shorter
      "tilkut",
      "thekua",
      "makhana",
      "foxnut",
      "khaja",
      "singhara",
      "sattu",
      "laai",
      "anarsa",
      "churma",
      "bajra",
      "kachri",
      "singri",
      "gajak",
      "pinni",
      "wadi",
      "papad",
      "chunda",
      "sarson",
      "saag",
      "petha",
      "peda",
      "murabba",
      "kachori",
      "kanji",
      "besan",
      "buransh",
      "bhang",
      "jhangora",
      "gahat",
      "timru",
      "pahadi",
      "singal",
      "kafal",
      "gajar",
      "halwa",
      "mathri",
      "achar",
      "aloo",
      "ladoo",
      "barfi",
      "chutney",
    ];
    for (const keyword of nameKeywords) {
      if (nameLower.includes(keyword)) {
        // Normalize key: remove spaces
        const key = keyword.replace(/\s+/g, "");
        if (PRODUCT_IMAGES[key]) return PRODUCT_IMAGES[key];
        // Try first word
        const firstWord = keyword.split(" ")[0];
        if (PRODUCT_IMAGES[firstWord]) return PRODUCT_IMAGES[firstWord];
      }
    }
    // Fallback: scan all keys against name
    for (const [key, val] of Object.entries(PRODUCT_IMAGES)) {
      if (nameLower.includes(key)) return val;
    }
  }
  const catLower = category.toLowerCase();
  return PRODUCT_IMAGES[catLower] ?? DEFAULT_PRODUCT_IMAGE;
}

export const STATES = [
  {
    name: "Bihar",
    emoji: "🌾",
    color: "from-yellow-700 to-yellow-900",
    phase: 1,
    live: true,
  },
  {
    name: "Haryana",
    emoji: "🌻",
    color: "from-green-700 to-green-900",
    phase: 1,
    live: true,
  },
  {
    name: "Punjab",
    emoji: "🌿",
    color: "from-orange-600 to-orange-900",
    phase: 2,
    live: true,
  },
  {
    name: "Uttar Pradesh",
    emoji: "🏺",
    color: "from-red-700 to-red-900",
    phase: 2,
    live: true,
  },
  {
    name: "Uttarakhand",
    emoji: "🏔️",
    color: "from-teal-700 to-teal-900",
    phase: 3,
    live: true,
  },
  {
    name: "Rajasthan",
    emoji: "🏜️",
    color: "from-amber-600 to-amber-900",
    phase: 4,
    live: false,
  },
  {
    name: "Gujarat",
    emoji: "🦁",
    color: "from-orange-500 to-orange-800",
    phase: 4,
    live: false,
  },
  {
    name: "Maharashtra",
    emoji: "🌊",
    color: "from-blue-700 to-blue-900",
    phase: 4,
    live: false,
  },
  {
    name: "West Bengal",
    emoji: "🐯",
    color: "from-emerald-600 to-emerald-900",
    phase: 4,
    live: false,
  },
  {
    name: "Madhya Pradesh",
    emoji: "🌳",
    color: "from-lime-700 to-lime-900",
    phase: 4,
    live: false,
  },
  {
    name: "Himachal Pradesh",
    emoji: "⛰️",
    color: "from-cyan-600 to-cyan-900",
    phase: 4,
    live: false,
  },
  {
    name: "Delhi",
    emoji: "🏛️",
    color: "from-rose-600 to-rose-900",
    phase: 4,
    live: false,
  },
  {
    name: "Odisha",
    emoji: "🛕",
    color: "from-purple-600 to-purple-900",
    phase: 4,
    live: false,
  },
  {
    name: "Jharkhand",
    emoji: "🌲",
    color: "from-green-600 to-green-900",
    phase: 4,
    live: false,
  },
  {
    name: "Chhattisgarh",
    emoji: "🌿",
    color: "from-teal-600 to-teal-900",
    phase: 4,
    live: false,
  },
  {
    name: "Assam",
    emoji: "🍵",
    color: "from-emerald-700 to-emerald-900",
    phase: 4,
    live: false,
  },
  {
    name: "Karnataka",
    emoji: "🌺",
    color: "from-red-600 to-red-900",
    phase: 4,
    live: false,
  },
  {
    name: "Tamil Nadu",
    emoji: "🌴",
    color: "from-orange-700 to-orange-900",
    phase: 4,
    live: false,
  },
  {
    name: "Kerala",
    emoji: "🥥",
    color: "from-green-500 to-green-800",
    phase: 4,
    live: false,
  },
  {
    name: "Andhra Pradesh",
    emoji: "🌶️",
    color: "from-red-700 to-red-900",
    phase: 4,
    live: false,
  },
  {
    name: "Telangana",
    emoji: "🫙",
    color: "from-pink-600 to-pink-900",
    phase: 4,
    live: false,
  },
  {
    name: "Goa",
    emoji: "🌊",
    color: "from-teal-500 to-teal-800",
    phase: 4,
    live: false,
  },
  {
    name: "Jammu & Kashmir",
    emoji: "❄️",
    color: "from-sky-600 to-sky-900",
    phase: 4,
    live: false,
  },
];

export interface StateBannerInfo {
  image: string;
  landmark: string;
  festival: string;
  tagline: string;
  dishes: string;
}

export const STATE_BANNERS: Record<string, StateBannerInfo> = {
  Bihar: {
    image: "/assets/generated/state-banner-bihar.dim_1400x500.jpg",
    landmark: "Mahabodhi Temple, Gaya",
    festival: "Chhath Puja",
    tagline: "Bihar ki Dharti Ka Swaad",
    dishes: "Tilkut • Makhana • Thekua • Sattu Ladoo",
  },
  Haryana: {
    image: "/assets/generated/state-banner-haryana.dim_1400x500.jpg",
    landmark: "Kurukshetra, Land of the Gita",
    festival: "Lohri Festival",
    tagline: "Haryana Ki Rasoi Ka Jaadu",
    dishes: "Mathri • Churma Ladoo • Bajra Ladoo • Moong Halwa",
  },
  Punjab: {
    image: "/assets/generated/state-banner-punjab.dim_1400x500.jpg",
    landmark: "Golden Temple, Amritsar",
    festival: "Baisakhi",
    tagline: "Punjab Di Rasoi Wich Khush Aamdeed",
    dishes: "Pinni • Gajak • Aam Achar • Mathri",
  },
  "Uttar Pradesh": {
    image: "/assets/generated/state-banner-up.dim_1400x500.jpg",
    landmark: "Taj Mahal, Agra",
    festival: "Diwali",
    tagline: "UP Ki Nawabi Rasoi Ka Swaad",
    dishes: "Petha • Peda • Ladoo • Gajar Halwa",
  },
  Uttarakhand: {
    image: "/assets/generated/state-banner-uttarakhand.dim_1400x500.jpg",
    landmark: "Kedarnath Temple",
    festival: "Harela Festival",
    tagline: "Pahad Ki Khushboo, Ghar Ka Swaad",
    dishes: "Bal Mithai • Buransh Sharbat • Jhangora Kheer",
  },
};

export const WHATSAPP_NUMBER = "919883140470";
export const CONTACT_EMAIL = "kaisehoaunty@gmail.com";
export const CONTACT_PHONE = "+91 9883140470";
export const WEBSITE = "www.choudharyaunty.com";

export function buildWhatsAppUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

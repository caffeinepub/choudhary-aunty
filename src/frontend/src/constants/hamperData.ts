export interface Hamper {
  id: string;
  name: string;
  state: string;
  emoji: string;
  tagline: string;
  contents: string[];
  priceRange: string;
  occasions: string[];
  image: string;
  description: string;
  highlight: string;
}

export const HAMPERS: Hamper[] = [
  {
    id: "bihari-swad-box",
    name: "Bihari Swad Box",
    state: "Bihar",
    emoji: "🌾",
    tagline: "A taste of the Gangetic plains",
    contents: [
      "Aam Ka Achar (500g)",
      "Thekua (250g)",
      "Tilkut (200g)",
      "Makhana Namkeen (100g)",
      "Sattu Ka Ladoo (200g)",
    ],
    priceRange: "₹899 – ₹1,499",
    occasions: ["Diwali", "Corporate Gift", "Family Gift", "Chhath"],
    image: "/assets/generated/gift-hamper-hero.dim_800x600.jpg",
    description:
      "Curated by Anju Choudhary from Patna, this box brings together Bihar's most iconic homemade flavours — from the tang of slow-fermented aam ka achar to the sacred crunch of Chhath-special thekua. Ideal for anyone with Bihari roots, or anyone who has yet to discover the world's finest mango pickle.",
    highlight: "Bihar's most iconic flavours, curated by Anju Choudhary",
  },
  {
    id: "punjabi-tadka-box",
    name: "Punjabi Tadka Box",
    state: "Punjab",
    emoji: "🌿",
    tagline: "Bold flavours from the land of five rivers",
    contents: [
      "Amritsari Aam Ka Achar (500g)",
      "Gajak (300g)",
      "Pinni (250g)",
      "Amritsari Wadi (150g)",
      "Mango Chunda (200g)",
    ],
    priceRange: "₹999 – ₹1,699",
    occasions: ["Lohri", "Makar Sankranti", "Corporate Gift", "Winter Gifting"],
    image: "/assets/generated/hamper-punjabi-tadka.dim_800x600.jpg",
    description:
      "Preetkaur Aunty's masterclass in Punjabi flavour — the sharp punch of Amritsari achar, the brittle sweetness of hand-made gajak, the dense nourishment of pinni made with desi ghee. A box that celebrates the harvest bounty of the Punjab plains and the warmth of Punjabi hospitality.",
    highlight: "Perfect for Lohri & Makar Sankranti gifting",
  },
  {
    id: "up-mithai-box",
    name: "UP Mithai Box",
    state: "Uttar Pradesh",
    emoji: "🏺",
    tagline: "From the kitchens of Mathura, Agra & Varanasi",
    contents: [
      "Besan Ka Ladoo (300g)",
      "Gajar Ka Halwa (300g)",
      "Nimbu Ka Achar (250g)",
      "Amla Murabba (200g)",
      "Namak Pare (150g)",
    ],
    priceRange: "₹849 – ₹1,399",
    occasions: ["Diwali", "Weddings", "Pooja Gifts", "Family Gift"],
    image: "/assets/generated/gift-hamper-hero.dim_800x600.jpg",
    description:
      "Sarla Maasi brings together the sweetness of Varanasi's kitchen traditions — buttery besan ladoo slow-roasted in desi ghee, the tanginess of lime pickle, amla murabba with its extraordinary vitamin C concentration, and the addictive crunch of perfect namak pare. UP's finest, hand-made.",
    highlight: "Varanasi's kitchen heritage in one beautiful box",
  },
  {
    id: "haryanvi-ghar-ka-swad",
    name: "Haryanvi Ghar Ka Swad",
    state: "Haryana",
    emoji: "🌻",
    tagline: "The honest flavours of Haryana's hearth",
    contents: [
      "Churma Ladoo (250g)",
      "Methi Mathri (200g)",
      "Kachri Ki Chutney (150g)",
      "Bajra Ladoo (250g)",
      "Gajar Gobhi Achar (300g)",
    ],
    priceRange: "₹799 – ₹1,299",
    occasions: [
      "Corporate Gift",
      "Winter Gifting",
      "Harvest Festival",
      "Family Gift",
    ],
    image: "/assets/generated/gift-hamper-hero.dim_800x600.jpg",
    description:
      "Babita Tai's Haryanvi heritage box — earthy churma ladoo made with desi ghee, the wild-sourced kachri chutney that has no equivalent anywhere in India, and the comforting bite of methi mathri. Haryana's food culture is India's best-kept culinary secret. This box reveals it.",
    highlight:
      "Haryana's wild food traditions — rarely available outside the state",
  },
  {
    id: "pahadi-treasure-box",
    name: "Pahadi Treasure Box",
    state: "Uttarakhand",
    emoji: "🏔️",
    tagline: "Rare flavours from the Himalayan foothills",
    contents: [
      "Buransh Ka Sharbat (250ml)",
      "Bhang Ki Chutney (150g)",
      "Bal Mithai (200g)",
      "Timru Ka Achar (200g)",
      "Pahadi Aloo Ki Chips (100g)",
    ],
    priceRange: "₹1,099 – ₹1,899",
    occasions: [
      "Unique Gift",
      "Corporate Gift",
      "Foodie Gift",
      "Mountain Heritage",
    ],
    image: "/assets/generated/gift-hamper-hero.dim_800x600.jpg",
    description:
      "Geeta Devi's Pahadi box is for the adventurous food lover — the floral sweetness of rhododendron syrup from Almora's forests, the extraordinary depth of hemp seed chutney, the distinctive fudge-like bal mithai coated in sesame, and the rare timru (Himalayan pepper) achar. Uttarakhand's flavours are unlike anything else in India.",
    highlight:
      "Uttarakhand's rarest flavours — ingredients you cannot find elsewhere",
  },
];

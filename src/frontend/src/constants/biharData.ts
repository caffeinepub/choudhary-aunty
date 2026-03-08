/**
 * Bihar State-Based Marketplace Data
 *
 * Full relational data architecture:
 * States → Regions → Products → Variants (SKUs) → Ingredients + Steps
 * Aunties → Aunty-Variant Mapping (many aunties per SKU)
 * Badges assigned to aunties
 */

// ============================================================
// TYPE DEFINITIONS
// ============================================================

export interface StateData {
  state_id: string;
  state_name: string;
  culinary_story: string;
  banner_tagline: string;
  total_products: number;
  total_aunties: number;
}

export interface RegionData {
  region_id: string;
  state_id: string;
  region_name: string;
  region_food_story: string;
  specialty: string;
}

export interface IngredientData {
  ingredient_id: string;
  ingredient_name: string;
  category:
    | "spice"
    | "grain"
    | "sweetener"
    | "fat"
    | "nut"
    | "fruit"
    | "dairy"
    | "other";
}

export interface RecipeIngredient {
  ingredient_id: string;
  quantity: number;
  unit: string;
  note?: string;
}

export interface PreparationStep {
  step_number: number;
  instruction: string;
  duration_minutes?: number;
  tip?: string;
}

export interface ProductVariant {
  variant_id: string;
  product_id: string;
  variant_name: string;
  batch_size_kg: number;
  shelf_life_days: number;
  price_per_kg: number;
  description: string;
  ingredients: RecipeIngredient[];
  preparation_steps: PreparationStep[];
}

export interface BiharProduct {
  product_id: string;
  state_id: string;
  region_id: string;
  product_name: string;
  category: "mithai" | "namkeen" | "achar" | "snack" | "beverage" | "grain";
  product_story: string;
  occasions: string[];
  variants: ProductVariant[];
}

export type AuntyBadge =
  | "Traditional Recipe Keeper"
  | "Village Heritage Cook"
  | "Festival Specialist"
  | "Community Favourite"
  | "Premium Ingredients"
  | "Master Sweet Maker"
  | "Namkeen Expert"
  | "Achar Specialist"
  | "Bihar Ki Shaan";

export interface AuntyData {
  aunty_id: string;
  name: string;
  photo: string;
  village: string;
  district: string;
  state: string;
  years_experience: number;
  bio: string;
  story: string;
  rating: number;
  total_orders: number;
  badges: AuntyBadge[];
  specialty_dishes: string[];
  whatsapp: string;
}

export interface AuntyVariantMapping {
  aunty_variant_id: string;
  aunty_id: string;
  variant_id: string;
  price_per_kg: number;
  availability: "available" | "limited" | "unavailable";
  batch_days: string[];
  personal_note: string;
}

// ============================================================
// STATES
// ============================================================

export const BIHAR_STATE: StateData = {
  state_id: "bihar",
  state_name: "Bihar",
  culinary_story:
    "Bihar ki rasoi mein teen peedhiyon ki khushboo milti hai. Yahan ka khana sirf pet bharne ke liye nahin — yeh rishton ki bhasha hai. Chhath Puja ka thekua, Holi ka gujiya, roz ka sattu — har dish ek zinda parampara hai. Bihar ki matiyal khushboo aur ganga ki nami se bana yeh swaad poori duniya mein nahin milta.",
  banner_tagline: "Bihar ka swaad — ghar ki yaad",
  total_products: 8,
  total_aunties: 6,
};

// ============================================================
// REGIONS
// ============================================================

export const BIHAR_REGIONS: RegionData[] = [
  {
    region_id: "mithila",
    state_id: "bihar",
    region_name: "Mithila",
    region_food_story:
      "Darbhanga, Madhubani aur Sitamarhi ki dhoop mein seki hui Mithila ki rasoi apni alag hi pehchaan rakhti hai. Yahan ka khana seedha, saaf aur dil se bana hota hai — bina dikhawe ke, sirf swaad ke liye.",
    specialty: "Thekua, Makhana, Litti",
  },
  {
    region_id: "magadh",
    state_id: "bihar",
    region_name: "Magadh",
    region_food_story:
      "Gaya, Nalanda aur Bodh Gaya ki dharti — jahaan aadhyatm aur khana dono ek saath chalte hain. Yahan ka sattu sharbat aur chura-dahi Bihar ki asli pehchaan hai.",
    specialty: "Sattu, Chura Bhunja, Pua",
  },
  {
    region_id: "bhojpur",
    state_id: "bihar",
    region_name: "Bhojpur",
    region_food_story:
      "Ara, Buxar aur Bhojpur ki rasoi mein thand mein ghee ki khushboo aur ghar ke maidaan mein sukhaye achar ki mahak — yahi Bhojpuri zindagi hai.",
    specialty: "Nimki, Achar, Khaja",
  },
];

// ============================================================
// INGREDIENTS MASTER LIST
// ============================================================

export const BIHAR_INGREDIENTS: IngredientData[] = [
  {
    ingredient_id: "i001",
    ingredient_name: "Nariyal (Fresh Coconut)",
    category: "fruit",
  },
  { ingredient_id: "i002", ingredient_name: "Khoya (Mawa)", category: "dairy" },
  { ingredient_id: "i003", ingredient_name: "Kaju (Cashew)", category: "nut" },
  {
    ingredient_id: "i004",
    ingredient_name: "Kismis (Raisins)",
    category: "nut",
  },
  { ingredient_id: "i005", ingredient_name: "Badam (Almond)", category: "nut" },
  {
    ingredient_id: "i006",
    ingredient_name: "Pista (Pistachio)",
    category: "nut",
  },
  {
    ingredient_id: "i007",
    ingredient_name: "Cheeni (Sugar)",
    category: "sweetener",
  },
  {
    ingredient_id: "i008",
    ingredient_name: "Elaichi Powder (Cardamom)",
    category: "spice",
  },
  {
    ingredient_id: "i009",
    ingredient_name: "Ghee (Pure Cow Ghee)",
    category: "fat",
  },
  {
    ingredient_id: "i010",
    ingredient_name: "Maida (Refined Flour)",
    category: "grain",
  },
  { ingredient_id: "i011", ingredient_name: "Namak (Salt)", category: "spice" },
  {
    ingredient_id: "i012",
    ingredient_name: "Ajwain (Carom Seeds)",
    category: "spice",
  },
  {
    ingredient_id: "i013",
    ingredient_name: "Kalonji (Nigella Seeds)",
    category: "spice",
  },
  {
    ingredient_id: "i014",
    ingredient_name: "Tel (Mustard Oil)",
    category: "fat",
  },
  {
    ingredient_id: "i015",
    ingredient_name: "Chini Powder (Powdered Sugar)",
    category: "sweetener",
  },
  {
    ingredient_id: "i016",
    ingredient_name: "Sattu (Roasted Gram Flour)",
    category: "grain",
  },
  {
    ingredient_id: "i017",
    ingredient_name: "Gehun Aata (Whole Wheat Flour)",
    category: "grain",
  },
  {
    ingredient_id: "i018",
    ingredient_name: "Chura (Beaten Rice / Poha)",
    category: "grain",
  },
  {
    ingredient_id: "i019",
    ingredient_name: "Chawal (Rice)",
    category: "grain",
  },
  {
    ingredient_id: "i020",
    ingredient_name: "Gur (Jaggery)",
    category: "sweetener",
  },
  {
    ingredient_id: "i021",
    ingredient_name: "Aam (Raw Green Mango)",
    category: "fruit",
  },
  {
    ingredient_id: "i022",
    ingredient_name: "Rai (Mustard Seeds)",
    category: "spice",
  },
  {
    ingredient_id: "i023",
    ingredient_name: "Haldi (Turmeric)",
    category: "spice",
  },
  {
    ingredient_id: "i024",
    ingredient_name: "Lal Mirch (Red Chilli)",
    category: "spice",
  },
  {
    ingredient_id: "i025",
    ingredient_name: "Saunf (Fennel Seeds)",
    category: "spice",
  },
  {
    ingredient_id: "i026",
    ingredient_name: "Methi Dana (Fenugreek Seeds)",
    category: "spice",
  },
  {
    ingredient_id: "i027",
    ingredient_name: "Til (Sesame Seeds)",
    category: "spice",
  },
];

// ============================================================
// PRODUCTS & VARIANTS — BIHAR SKU CATALOG
// ============================================================

export const BIHAR_PRODUCTS: BiharProduct[] = [
  // ─── 1. COCONUT LADDOO ───────────────────────────────────────
  {
    product_id: "p-coconut-laddoo",
    state_id: "bihar",
    region_id: "mithila",
    product_name: "Nariyal Laddoo",
    category: "mithai",
    product_story:
      "Mithila ki dadi ki rasoi mein Nariyal Laddoo bina kisi bade occasion ke bhi banta tha — sirf is liye ki ghar mein koi aaya. Iska swaad nahin bhulta. Taaza nariyal, desi ghee aur elaichi ka ye mishran Bihar ki mohabbat ka symbol hai.",
    occasions: ["Chhath Puja", "Diwali", "Shaadi", "Ghar ka Manoranjan"],
    variants: [
      {
        variant_id: "v-coconut-basic",
        product_id: "p-coconut-laddoo",
        variant_name: "Basic",
        batch_size_kg: 2,
        shelf_life_days: 7,
        price_per_kg: 380,
        description:
          "Sada nariyal laddoo — taaza coconut, sugar aur elaichi. Har ghar mein banne wala classic recipe.",
        ingredients: [
          {
            ingredient_id: "i001",
            quantity: 1000,
            unit: "grams",
            note: "Taaza nariyal kaddookash kiya hua",
          },
          { ingredient_id: "i007", quantity: 600, unit: "grams" },
          { ingredient_id: "i008", quantity: 10, unit: "grams" },
          {
            ingredient_id: "i009",
            quantity: 50,
            unit: "grams",
            note: "Desi cow ghee",
          },
        ],
        preparation_steps: [
          {
            step_number: 1,
            instruction:
              "Taaza nariyal ko mota-mota kaddookash karein. Ek kadhai mein ghee garam karein.",
            duration_minutes: 10,
          },
          {
            step_number: 2,
            instruction:
              "Kaddookash nariyal ko ghee mein 5-7 minute bhunein jab tak halki khushboo na aaye.",
            duration_minutes: 7,
            tip: "Aag medium-low rakhein, jalaye nahin",
          },
          {
            step_number: 3,
            instruction:
              "Cheeni dalein aur achi tarah milayen. Cheeni pighalte hi mixture mota hone lagega.",
            duration_minutes: 8,
          },
          {
            step_number: 4,
            instruction:
              "Aag band karein. Elaichi powder dalein aur milayen. Thanda hone dein.",
            duration_minutes: 15,
            tip: "Mixture zyada thanda nahin hona chahiye warna laddoo nahi banenge",
          },
          {
            step_number: 5,
            instruction:
              "Haath mein thoda ghee lagakar medium laddoo banayen — har ek lagbhag 40 gram.",
            duration_minutes: 20,
          },
        ],
      },
      {
        variant_id: "v-coconut-meva",
        product_id: "p-coconut-laddoo",
        variant_name: "Meva Premium",
        batch_size_kg: 2,
        shelf_life_days: 10,
        price_per_kg: 520,
        description:
          "Kaju aur kismis se bhaara hua premium nariyal laddoo. Shaadi-vyadig mein sabse pasand.",
        ingredients: [
          {
            ingredient_id: "i001",
            quantity: 800,
            unit: "grams",
            note: "Taaza nariyal",
          },
          { ingredient_id: "i007", quantity: 500, unit: "grams" },
          {
            ingredient_id: "i003",
            quantity: 150,
            unit: "grams",
            note: "Chhote tukde",
          },
          { ingredient_id: "i004", quantity: 100, unit: "grams" },
          { ingredient_id: "i009", quantity: 80, unit: "grams" },
          { ingredient_id: "i008", quantity: 12, unit: "grams" },
        ],
        preparation_steps: [
          {
            step_number: 1,
            instruction:
              "Nariyal kaddookash karein. Kaju ko halka sona karne tak ghee mein bhunein.",
            duration_minutes: 8,
          },
          {
            step_number: 2,
            instruction:
              "Nariyal ko kadhai mein 5 minute bhunein. Phir cheeni milayein.",
            duration_minutes: 8,
          },
          {
            step_number: 3,
            instruction: "Bhune kaju, kismis aur elaichi dalein. Acha milayen.",
            duration_minutes: 5,
          },
          {
            step_number: 4,
            instruction:
              "Thoda thanda karke laddoo banayen. Beech mein ek kaju aur kismis rakhein garnish ke liye.",
            duration_minutes: 20,
            tip: "Laddoo mein kaju dekhna chahiye — yeh premium feel deta hai",
          },
        ],
      },
      {
        variant_id: "v-coconut-dryfruit",
        product_id: "p-coconut-laddoo",
        variant_name: "Meva & Dry Fruits",
        batch_size_kg: 2,
        shelf_life_days: 12,
        price_per_kg: 680,
        description:
          "Badam, pista, kaju, kismis — sab milaakar bana premium laddoo. Gift karne layak packaging ke saath.",
        ingredients: [
          { ingredient_id: "i001", quantity: 700, unit: "grams" },
          { ingredient_id: "i007", quantity: 450, unit: "grams" },
          { ingredient_id: "i003", quantity: 120, unit: "grams" },
          { ingredient_id: "i004", quantity: 80, unit: "grams" },
          {
            ingredient_id: "i005",
            quantity: 100,
            unit: "grams",
            note: "Pehle se bhigoke, chhilke utaaro",
          },
          {
            ingredient_id: "i006",
            quantity: 60,
            unit: "grams",
            note: "Chhote tukde",
          },
          { ingredient_id: "i009", quantity: 100, unit: "grams" },
          { ingredient_id: "i008", quantity: 15, unit: "grams" },
        ],
        preparation_steps: [
          {
            step_number: 1,
            instruction:
              "Badam ko raat bhar bhigayen, chhilka utaaren aur pata-pata kaat lein. Pista slice karein.",
            duration_minutes: 15,
          },
          {
            step_number: 2,
            instruction:
              "Sab dry fruits alag alag halka ghee mein bhunein. Ek taraf rakhein.",
            duration_minutes: 12,
          },
          {
            step_number: 3,
            instruction:
              "Nariyal ghee mein bhunein. Cheeni milayein. Sab dry fruits dalein.",
            duration_minutes: 10,
          },
          {
            step_number: 4,
            instruction:
              "Elaichi dalein. Thanda karke sundar laddoo banayen. Upar pista se sajayein.",
            duration_minutes: 20,
            tip: "Yeh laddoos gift box mein diye jate hain — sundar banana zaroori hai",
          },
        ],
      },
    ],
  },

  // ─── 2. NAMAKPARA (NIMKI) ────────────────────────────────────
  {
    product_id: "p-namakpara",
    state_id: "bihar",
    region_id: "bhojpur",
    product_name: "Namakpara (Nimki)",
    category: "namkeen",
    product_story:
      "Bihar ke ghar mein Diwali ho ya Chhath — Namakpara zaroor banta hai. Crispy, namkeen, aur ghee ki khushboo — yeh sirf ek snack nahin, yeh rishton ka swaad hai. Dadi ke haathon se bana Namakpara aaj bhi yaad aata hai.",
    occasions: ["Diwali", "Chhath Puja", "Eid", "Roz ke chai ke saath"],
    variants: [
      {
        variant_id: "v-namakpara-patla",
        product_id: "p-namakpara",
        variant_name: "Patla Diamond Cut",
        batch_size_kg: 2,
        shelf_life_days: 21,
        price_per_kg: 280,
        description:
          "Patli aur crispy nimki — diamond shape mein kata hua. Chai ke saath perfect.",
        ingredients: [
          {
            ingredient_id: "i010",
            quantity: 1200,
            unit: "grams",
            note: "Maida (Refined Flour)",
          },
          {
            ingredient_id: "i009",
            quantity: 120,
            unit: "grams",
            note: "Desi ghee for moyan",
          },
          { ingredient_id: "i011", quantity: 20, unit: "grams" },
          { ingredient_id: "i012", quantity: 8, unit: "grams" },
          { ingredient_id: "i013", quantity: 5, unit: "grams" },
          {
            ingredient_id: "i014",
            quantity: 500,
            unit: "ml",
            note: "Deep frying ke liye",
          },
        ],
        preparation_steps: [
          {
            step_number: 1,
            instruction:
              "Maida mein namak, ajwain, kalonji aur ghee dalein. Achi tarah ragatein — texture bread crumbs jaisa hona chahiye.",
            duration_minutes: 10,
            tip: "Moyan dene se nimki crispy banti hai",
          },
          {
            step_number: 2,
            instruction:
              "Thoda thanda paani daalte hue sakht dough gundh lein. 20 minute dhak ke rakhein.",
            duration_minutes: 25,
          },
          {
            step_number: 3,
            instruction:
              "Dough ki patli roti belein (3mm). Diamond shapes mein kaat lein.",
            duration_minutes: 15,
          },
          {
            step_number: 4,
            instruction:
              "Tel medium garam karein. Diamond cuts daalein aur sone jaisi rang hone tak talein.",
            duration_minutes: 20,
            tip: "Medium aag pe talein — zyada tez aag pe bahar se jal jaayegi andar se kachchi rahegi",
          },
          {
            step_number: 5,
            instruction:
              "Tissue paper pe nikalein. Thanda hone pe airtight dabba mein bandh karein.",
            duration_minutes: 15,
          },
        ],
      },
      {
        variant_id: "v-namakpara-mota",
        product_id: "p-namakpara",
        variant_name: "Mota Diamond Cut",
        batch_size_kg: 2,
        shelf_life_days: 21,
        price_per_kg: 300,
        description:
          "Moti aur crunchy nimki — zyada ghee se bani, zyada satisfying. Chhath Puja special.",
        ingredients: [
          { ingredient_id: "i010", quantity: 1200, unit: "grams" },
          {
            ingredient_id: "i009",
            quantity: 180,
            unit: "grams",
            note: "Zyada ghee for richness",
          },
          { ingredient_id: "i011", quantity: 22, unit: "grams" },
          { ingredient_id: "i012", quantity: 10, unit: "grams" },
          { ingredient_id: "i013", quantity: 6, unit: "grams" },
          { ingredient_id: "i014", quantity: 500, unit: "ml" },
        ],
        preparation_steps: [
          {
            step_number: 1,
            instruction:
              "Maida mein zyada ghee dalein. Seedha mix karein jab tak breadcrumb texture na aaye.",
            duration_minutes: 12,
            tip: "Zyada ghee = zyada crunch",
          },
          {
            step_number: 2,
            instruction: "Sakht dough gundh lein. 30 minute rest dein.",
            duration_minutes: 35,
          },
          {
            step_number: 3,
            instruction:
              "Moti roti belein (5mm). Bade diamond shapes mein kaat lein.",
            duration_minutes: 15,
          },
          {
            step_number: 4,
            instruction: "Medium aag pe sone jaisi colour tak deep fry karein.",
            duration_minutes: 25,
          },
          {
            step_number: 5,
            instruction: "Cool karke pack karein.",
            duration_minutes: 15,
          },
        ],
      },
    ],
  },

  // ─── 3. MEETHAPARA ───────────────────────────────────────────
  {
    product_id: "p-meethapara",
    state_id: "bihar",
    region_id: "bhojpur",
    product_name: "Meethapara (Sweet Nimki)",
    category: "mithai",
    product_story:
      "Meethapara Bihar ka ek unique mithai-namkeen hybrid hai — maida se bana, tel mein tala, aur chini ki chashni mein duboya hua. Iska crispy-sweet combination bachpan ki yaad dilata hai.",
    occasions: ["Diwali", "Eid", "Holi", "Shaadi"],
    variants: [
      {
        variant_id: "v-meethapara-classic",
        product_id: "p-meethapara",
        variant_name: "Classic",
        batch_size_kg: 2,
        shelf_life_days: 14,
        price_per_kg: 320,
        description:
          "Maida ki crispy patti, chini ki patli chashni mein duboi hui — sweet aur light.",
        ingredients: [
          { ingredient_id: "i010", quantity: 1200, unit: "grams" },
          { ingredient_id: "i009", quantity: 100, unit: "grams" },
          {
            ingredient_id: "i007",
            quantity: 700,
            unit: "grams",
            note: "Chashni ke liye",
          },
          { ingredient_id: "i008", quantity: 8, unit: "grams" },
          { ingredient_id: "i014", quantity: 500, unit: "ml" },
        ],
        preparation_steps: [
          {
            step_number: 1,
            instruction:
              "Maida mein ghee aur thoda namak milaakar sakht dough banayen.",
            duration_minutes: 12,
          },
          {
            step_number: 2,
            instruction:
              "Patli strips mein kaatein. Tel mein golden fry karein.",
            duration_minutes: 20,
          },
          {
            step_number: 3,
            instruction: "Cheeni ki ek tar chashni banayen. Elaichi dalein.",
            duration_minutes: 10,
            tip: "Chashni mein ek tar honi chahiye — zyada paki to coating theek nahin aayegi",
          },
          {
            step_number: 4,
            instruction:
              "Tali strips ko chashni mein dip karein. Alag alag nikaalein. Thanda hone dein.",
            duration_minutes: 15,
          },
        ],
      },
    ],
  },

  // ─── 4. GULAB KHAJA ──────────────────────────────────────────
  {
    product_id: "p-gulab-khaja",
    state_id: "bihar",
    region_id: "bhojpur",
    product_name: "Gulab Khaja",
    category: "mithai",
    product_story:
      "Khaja Bihar ki sabse purani mithai hai — sath-sat tahan ke crispy layers, ghee ki mehak aur gulab ki khushboo. Deoghar aur Bodh Gaya ke mandir prasad mein khaja zaroor hota hai.",
    occasions: ["Mandir Prasad", "Chhath", "Shaadi", "Diwali"],
    variants: [
      {
        variant_id: "v-khaja-classic",
        product_id: "p-gulab-khaja",
        variant_name: "Classic Layered",
        batch_size_kg: 2,
        shelf_life_days: 15,
        price_per_kg: 420,
        description:
          "Crispy layers wala pata khaja — ek ek parat haath se banayi gayi. Ghee aur sugar ki perfect jodi.",
        ingredients: [
          { ingredient_id: "i010", quantity: 1000, unit: "grams" },
          {
            ingredient_id: "i009",
            quantity: 200,
            unit: "grams",
            note: "Layers banaane ke liye bhi",
          },
          { ingredient_id: "i007", quantity: 600, unit: "grams" },
          { ingredient_id: "i008", quantity: 5, unit: "grams" },
          { ingredient_id: "i014", quantity: 500, unit: "ml" },
        ],
        preparation_steps: [
          {
            step_number: 1,
            instruction:
              "Maida mein thoda ghee aur paani milakar medium dough banayen.",
            duration_minutes: 10,
          },
          {
            step_number: 2,
            instruction:
              "Patli roti belein. Upar ghee lagayen. Fold karein. Dobara belein. 7-8 baar repeat karein.",
            duration_minutes: 30,
            tip: "Yahi folding technique layered texture deti hai",
          },
          {
            step_number: 3,
            instruction:
              "Rectangle shapes mein kaatein. Medium garam tel mein sone jaisi colour tak fry karein.",
            duration_minutes: 20,
          },
          {
            step_number: 4,
            instruction:
              "Cheeni ki chashni banayen. Khaja ko chashni mein dip karein aur alag rakhein.",
            duration_minutes: 15,
          },
        ],
      },
    ],
  },

  // ─── 5. GUDDAMMA ─────────────────────────────────────────────
  {
    product_id: "p-guddamma",
    state_id: "bihar",
    region_id: "mithila",
    product_name: "Guddamma (Sweet Mango Jaggery)",
    category: "mithai",
    product_story:
      "Guddamma Mithila ka ek naayab mithai hai jo kaancha aam aur gur se banta hai. Garmi ke pehle jab kaccha aam aata hai — tab Guddamma banta hai. Iska khatta-meetha swaad sirf Bihar mein milega.",
    occasions: ["Garmi ka Mausam", "Ram Navami", "Sattu Parob"],
    variants: [
      {
        variant_id: "v-guddamma-classic",
        product_id: "p-guddamma",
        variant_name: "Classic",
        batch_size_kg: 2,
        shelf_life_days: 30,
        price_per_kg: 360,
        description:
          "Kaccha aam aur gur ka traditional mishran — khatta-meetha aur naturally preserved.",
        ingredients: [
          {
            ingredient_id: "i021",
            quantity: 1200,
            unit: "grams",
            note: "Kaancha (Raw) Green Mango",
          },
          {
            ingredient_id: "i020",
            quantity: 600,
            unit: "grams",
            note: "Desi Gur (Jaggery)",
          },
          { ingredient_id: "i022", quantity: 15, unit: "grams" },
          { ingredient_id: "i023", quantity: 5, unit: "grams" },
          { ingredient_id: "i024", quantity: 10, unit: "grams" },
          { ingredient_id: "i011", quantity: 15, unit: "grams" },
        ],
        preparation_steps: [
          {
            step_number: 1,
            instruction:
              "Kaccha aam chhilein, gutli nikalein. Mota kaddookash karein.",
            duration_minutes: 15,
          },
          {
            step_number: 2,
            instruction:
              "Namak lagakar 2 ghante ke liye rakhein. Paani nichodein.",
            duration_minutes: 125,
          },
          {
            step_number: 3,
            instruction:
              "Gur ko thoda paani mein pigalayen. Aam ke saath milayen.",
            duration_minutes: 10,
          },
          {
            step_number: 4,
            instruction:
              "Rai, haldi aur lal mirch dalein. Achi tarah mix karein.",
            duration_minutes: 5,
          },
          {
            step_number: 5,
            instruction:
              "4-5 ghante dhoop mein rakhein. Thanda karke pack karein.",
            duration_minutes: 300,
            tip: "Dhoop mein rakhi cheez zyada dino tak tikti hai",
          },
        ],
      },
    ],
  },

  // ─── 6. CHURA BHUNJA ─────────────────────────────────────────
  {
    product_id: "p-chura-bhunja",
    state_id: "bihar",
    region_id: "magadh",
    product_name: "Chura Bhunja",
    category: "snack",
    product_story:
      "Bihar ka highway ho ya ghar ka chaupal — Chura Bhunja sab jagah milta hai. Bhuna hua chura aur sath mein gur ya namak — yeh Bihar ka sabse honest, seedha snack hai. Chhath Puja ka prasad bhi yahi hota hai.",
    occasions: [
      "Chhath Puja Prasad",
      "Roz ke snack",
      "Train safar",
      "Office tiffin",
    ],
    variants: [
      {
        variant_id: "v-chura-basic",
        product_id: "p-chura-bhunja",
        variant_name: "Basic",
        batch_size_kg: 2,
        shelf_life_days: 30,
        price_per_kg: 220,
        description:
          "Saada bhuna hua chura — halka namak, ajwain. Clean aur healthy snack.",
        ingredients: [
          {
            ingredient_id: "i018",
            quantity: 1600,
            unit: "grams",
            note: "Mota Chura (Thick Beaten Rice)",
          },
          { ingredient_id: "i009", quantity: 60, unit: "grams" },
          { ingredient_id: "i011", quantity: 15, unit: "grams" },
          { ingredient_id: "i012", quantity: 8, unit: "grams" },
          { ingredient_id: "i027", quantity: 20, unit: "grams" },
        ],
        preparation_steps: [
          {
            step_number: 1,
            instruction:
              "Chura ko dry tawa pe halka sek lein — seedha ghee nahin daalte abhi.",
            duration_minutes: 10,
          },
          {
            step_number: 2,
            instruction:
              "Ghee garam karein. Ajwain aur til dalein. Phir chura dalein.",
            duration_minutes: 5,
          },
          {
            step_number: 3,
            instruction:
              "Medium aag pe constantly hilate hue 15-20 minute bhunein.",
            duration_minutes: 20,
            tip: "Continuously hilate rahein warna jal jaayega",
          },
          {
            step_number: 4,
            instruction: "Namak dalein. Thanda karke airtight pack karein.",
            duration_minutes: 15,
          },
        ],
      },
      {
        variant_id: "v-chura-premium",
        product_id: "p-chura-bhunja",
        variant_name: "Premium (Gur aur Dry Fruits)",
        batch_size_kg: 2,
        shelf_life_days: 21,
        price_per_kg: 380,
        description:
          "Bhuna chura + gur + kaju + kismis — meetha aur healthy. Bihar ki shaahi snacking.",
        ingredients: [
          { ingredient_id: "i018", quantity: 1200, unit: "grams" },
          {
            ingredient_id: "i020",
            quantity: 300,
            unit: "grams",
            note: "Grated jaggery",
          },
          { ingredient_id: "i003", quantity: 150, unit: "grams" },
          { ingredient_id: "i004", quantity: 100, unit: "grams" },
          { ingredient_id: "i009", quantity: 80, unit: "grams" },
          { ingredient_id: "i008", quantity: 8, unit: "grams" },
        ],
        preparation_steps: [
          {
            step_number: 1,
            instruction: "Chura dry bhunein. Kaju ko ghee mein sona karein.",
            duration_minutes: 15,
          },
          {
            step_number: 2,
            instruction:
              "Gur ko kadhai mein pigalayen. Bhuna chura aur kismis dalein.",
            duration_minutes: 10,
            tip: "Gur jab melt ho jaye tabhi mix karein",
          },
          {
            step_number: 3,
            instruction:
              "Bhune kaju aur elaichi dalein. Jaldi mix karein gur theek hone se pehle.",
            duration_minutes: 5,
          },
          {
            step_number: 4,
            instruction:
              "Greased plate pe spread karein. Thanda hone de. Tukde todein.",
            duration_minutes: 20,
          },
        ],
      },
    ],
  },

  // ─── 7. THEKUA ───────────────────────────────────────────────
  {
    product_id: "p-thekua",
    state_id: "bihar",
    region_id: "mithila",
    product_name: "Thekua",
    category: "mithai",
    product_story:
      "Chhath Puja ka prasad — Thekua bina pooja adhuri hai. Gehu aata, gur aur ghee se bana yeh crispy snack sirf Bihar mein hi milega is shuddh tarike se. Devi ko chadhaaya jaata hai aur phir prasad mein baanta jaata hai.",
    occasions: ["Chhath Puja", "Mandir Prasad", "Sattu Parob"],
    variants: [
      {
        variant_id: "v-thekua-classic",
        product_id: "p-thekua",
        variant_name: "Classic Gur Thekua",
        batch_size_kg: 2,
        shelf_life_days: 20,
        price_per_kg: 340,
        description:
          "Gehu aata aur desi gur — Chhath Puja prasad. Traditional round mold se banaya hua.",
        ingredients: [
          {
            ingredient_id: "i017",
            quantity: 1400,
            unit: "grams",
            note: "Whole wheat atta",
          },
          {
            ingredient_id: "i020",
            quantity: 500,
            unit: "grams",
            note: "Desi gur grated",
          },
          { ingredient_id: "i009", quantity: 150, unit: "grams" },
          { ingredient_id: "i008", quantity: 10, unit: "grams" },
          { ingredient_id: "i025", quantity: 15, unit: "grams" },
          {
            ingredient_id: "i014",
            quantity: 400,
            unit: "ml",
            note: "Deep frying",
          },
        ],
        preparation_steps: [
          {
            step_number: 1,
            instruction:
              "Gur ko thoda garam karke liquid karein. Thanda hone dein.",
            duration_minutes: 10,
          },
          {
            step_number: 2,
            instruction:
              "Aata mein ghee, elaichi, saunf milayein. Gur ka liquid daalkar sakht dough banayen.",
            duration_minutes: 15,
          },
          {
            step_number: 3,
            instruction:
              "Traditional thekua mold mein shape banayen ya haath se round press karein.",
            duration_minutes: 20,
            tip: "Thekua mold chhoti design deta hai jo Chhath prasad ka sign hai",
          },
          {
            step_number: 4,
            instruction: "Medium tel mein golden brown tak fry karein.",
            duration_minutes: 20,
          },
          {
            step_number: 5,
            instruction: "Thanda karke pack karein.",
            duration_minutes: 15,
          },
        ],
      },
    ],
  },

  // ─── 8. SATTU KA PAANI (SATTU SHARBAT) ──────────────────────
  {
    product_id: "p-sattu-mix",
    state_id: "bihar",
    region_id: "magadh",
    product_name: "Sattu Mix (Ready to Use)",
    category: "grain",
    product_story:
      "Bihar ka energy drink — sattu. Gym nahin tha, protein powder nahin tha, par Bihar ke khet mazdoor roz subah sattu ka sharbat peete the aur poora din kaam karte the. Yeh Bihar ki asli superfood heritage hai.",
    occasions: [
      "Garmi ka Mausam",
      "Roz ka Nashta",
      "Travel snack",
      "Post-workout",
    ],
    variants: [
      {
        variant_id: "v-sattu-classic",
        product_id: "p-sattu-mix",
        variant_name: "Classic Roasted",
        batch_size_kg: 2,
        shelf_life_days: 90,
        price_per_kg: 180,
        description:
          "Seedha bhuna hua chana sattu — natural, no additives. Paani ya chaach mein gholein aur piyen.",
        ingredients: [
          {
            ingredient_id: "i016",
            quantity: 2000,
            unit: "grams",
            note: "Pure roasted gram flour — no additives",
          },
        ],
        preparation_steps: [
          {
            step_number: 1,
            instruction:
              "Desi chana ko tawa pe dhire dhire sona hone tak bhunein.",
            duration_minutes: 30,
            tip: "Low aag pe roast karein — taste ka fark aata hai",
          },
          {
            step_number: 2,
            instruction: "Thanda karke grinder mein mota pees lein.",
            duration_minutes: 10,
          },
          {
            step_number: 3,
            instruction: "Chalna se chaan lein. Mota tukda dobara pees lein.",
            duration_minutes: 10,
          },
          {
            step_number: 4,
            instruction: "Airtight pack karein. Store in cool dry place.",
            duration_minutes: 5,
          },
        ],
      },
    ],
  },
];

// ============================================================
// AUNTIES DATA
// ============================================================

export const BIHAR_AUNTIES: AuntyData[] = [
  {
    aunty_id: "a001",
    name: "Anju Choudhary",
    photo: "/assets/generated/aunty-anju-choudhary.dim_400x400.jpg",
    village: "Muzaffarpur",
    district: "Muzaffarpur",
    state: "Bihar",
    years_experience: 30,
    bio: "Muzaffarpur ki dhup aur hawa mein pali Anju ji 30 saalon se pure dil se khaana banati hain. Unka Nariyal Laddoo aur Thekua poore mohalle mein mashhoor hai.",
    story:
      "Bachpan mein daadi ke paas baithke recipe seekhi, aaj woh khud 6 bahuon ko sikhati hain. Unka kehna hai — 'Jab haath se banate ho, toh pyaar bhi chala jaata hai khaane mein.'",
    rating: 4.9,
    total_orders: 847,
    badges: [
      "Traditional Recipe Keeper",
      "Bihar Ki Shaan",
      "Community Favourite",
    ],
    specialty_dishes: ["Nariyal Laddoo", "Thekua", "Namakpara"],
    whatsapp: "+91-9883140470",
  },
  {
    aunty_id: "a002",
    name: "Sunita Devi",
    photo: "/assets/generated/aunty-sunita-devi.dim_400x400.jpg",
    village: "Darbhanga",
    district: "Darbhanga",
    state: "Bihar",
    years_experience: 22,
    bio: "Mithila ki Sunita ji ke haath mein jo swaad hai woh unki naani se mili talent hai. Unka Guddamma aur Gulab Khaja festival mein poora bik jaata hai.",
    story:
      "Teen bacchon ki maa Sunita ji ne ghar baithke apni kamai shuru ki. Pehle order mein 2 kilo khaja banaya tha — aaj 50 kilo ka order aata hai ek baar mein.",
    rating: 4.7,
    total_orders: 523,
    badges: [
      "Festival Specialist",
      "Village Heritage Cook",
      "Master Sweet Maker",
    ],
    specialty_dishes: ["Guddamma", "Gulab Khaja", "Meethapara"],
    whatsapp: "+91-9883140470",
  },
  {
    aunty_id: "a003",
    name: "Pushpa Rani",
    photo: "/assets/generated/aunty-pushpa-rani.dim_400x400.jpg",
    village: "Ara",
    district: "Bhojpur",
    state: "Bihar",
    years_experience: 18,
    bio: "Bhojpur ki Pushpa ji ko Namakpara banana ka usool hai — 'Jab tak ek parat crispy na ho, tala nahin.' Unki nimki mein ek alag texture hai.",
    story:
      "Pushpa ji ke pati gaye par hausla nahin gaya. Namakpara aur Khaja se ghar chalaya — aaj unka brand hai 'Pushpa ki Nimki' jo pure Bhojpur mein famous hai.",
    rating: 4.8,
    total_orders: 391,
    badges: ["Namkeen Expert", "Community Favourite", "Village Heritage Cook"],
    specialty_dishes: ["Namakpara", "Meethapara", "Chura Bhunja"],
    whatsapp: "+91-9883140470",
  },
  {
    aunty_id: "a004",
    name: "Rekha Singh",
    photo: "/assets/generated/aunty-rekha-singh.dim_400x400.jpg",
    village: "Gaya",
    district: "Gaya",
    state: "Bihar",
    years_experience: 25,
    bio: "Magadh ki Rekha ji ko Chhath ka Thekua banana seekhte 15 saal lage — ab unka thekua pooja ke liye Gaya se Patna tak order aata hai.",
    story:
      "Pehle sirf Chhath ke liye banati thi. Phir ek baar unka ek customer NRI tha — usne USA le jaana chaha. Tab se unka confidence badha. Aaj woh ek month mein 100 kilo tak banati hain.",
    rating: 4.9,
    total_orders: 712,
    badges: [
      "Festival Specialist",
      "Traditional Recipe Keeper",
      "Bihar Ki Shaan",
    ],
    specialty_dishes: ["Thekua", "Sattu Mix", "Chura Bhunja"],
    whatsapp: "+91-9883140470",
  },
  {
    aunty_id: "a005",
    name: "Meena Kumari",
    photo: "/assets/generated/aunty-meena-kumari.dim_400x400.jpg",
    village: "Sitamarhi",
    district: "Sitamarhi",
    state: "Bihar",
    years_experience: 15,
    bio: "Sitamarhi ki Meena ji Nariyal Laddoo ki expert hain. Unke haath ka Meva Premium laddoo Diwali gift boxes mein sab se zyada order hota hai.",
    story:
      "Meena ji ki saas ne kaha tha — 'Laddoo banana ek kala hai, isko seekhne mein saal lagte hain.' 15 saal baad aaj Meena ji woh kala seekh chuki hain.",
    rating: 4.6,
    total_orders: 298,
    badges: ["Master Sweet Maker", "Premium Ingredients"],
    specialty_dishes: ["Nariyal Laddoo", "Guddamma"],
    whatsapp: "+91-9883140470",
  },
  {
    aunty_id: "a006",
    name: "Kamla Devi",
    photo: "/assets/generated/aunty-kamla-devi.dim_400x400.jpg",
    village: "Nalanda",
    district: "Nalanda",
    state: "Bihar",
    years_experience: 35,
    bio: "Nalanda ki Kamla ji 35 saalon se Sattu aur Chura Bhunja banana ki paramparik tarike follow karti hain. Unka sattu mix pure market mein bika nahin milta — ghar ka tha, ghar ka rahega.",
    story:
      "Kamla ji ke pita chawal ke kisaan the. Unhon ne bachpan mein sattu aur chura ko apni aankhon se bante dekha. Woh recipe sirf unke ghar mein hai — market mein milne wala sattu unhe acceptable nahin lagta.",
    rating: 4.8,
    total_orders: 445,
    badges: [
      "Traditional Recipe Keeper",
      "Village Heritage Cook",
      "Bihar Ki Shaan",
    ],
    specialty_dishes: ["Sattu Mix", "Chura Bhunja", "Thekua"],
    whatsapp: "+91-9883140470",
  },
];

// ============================================================
// AUNTY-VARIANT MAPPINGS
// ============================================================

export const AUNTY_VARIANT_MAPPINGS: AuntyVariantMapping[] = [
  // Nariyal Laddoo — Basic: Anju + Meena + Kamla
  {
    aunty_variant_id: "av001",
    aunty_id: "a001",
    variant_id: "v-coconut-basic",
    price_per_kg: 380,
    availability: "available",
    batch_days: ["Monday", "Wednesday", "Friday"],
    personal_note:
      "Taaza nariyal hi use karti hoon — market se roz laati hoon.",
  },
  {
    aunty_variant_id: "av002",
    aunty_id: "a005",
    variant_id: "v-coconut-basic",
    price_per_kg: 370,
    availability: "available",
    batch_days: ["Tuesday", "Thursday", "Saturday"],
    personal_note: "15 saal se banaa rahi hoon — trust guarantee hai.",
  },
  {
    aunty_variant_id: "av003",
    aunty_id: "a006",
    variant_id: "v-coconut-basic",
    price_per_kg: 390,
    availability: "limited",
    batch_days: ["Friday", "Saturday"],
    personal_note: "Sirf limited orders leta hoon taaki quality barqarar rahe.",
  },

  // Nariyal Laddoo — Meva Premium: Anju + Sunita + Meena
  {
    aunty_variant_id: "av004",
    aunty_id: "a001",
    variant_id: "v-coconut-meva",
    price_per_kg: 520,
    availability: "available",
    batch_days: ["Wednesday", "Saturday"],
    personal_note: "Meva bhi khud choosti hoon — bekar cheez nahin daalongi.",
  },
  {
    aunty_variant_id: "av005",
    aunty_id: "a002",
    variant_id: "v-coconut-meva",
    price_per_kg: 510,
    availability: "available",
    batch_days: ["Monday", "Thursday"],
    personal_note: "Festival orders ke liye bulk discount available hai.",
  },
  {
    aunty_variant_id: "av006",
    aunty_id: "a005",
    variant_id: "v-coconut-meva",
    price_per_kg: 540,
    availability: "available",
    batch_days: ["Tuesday", "Friday"],
    personal_note: "Premium kaju aur badam Kolkata se mangwati hoon.",
  },

  // Nariyal Laddoo — Meva & Dry Fruits: Anju + Sunita
  {
    aunty_variant_id: "av007",
    aunty_id: "a001",
    variant_id: "v-coconut-dryfruit",
    price_per_kg: 680,
    availability: "available",
    batch_days: ["Saturday"],
    personal_note:
      "Gift packaging mein bhi deti hoon. Shaadi gift ke liye perfect.",
  },
  {
    aunty_variant_id: "av008",
    aunty_id: "a002",
    variant_id: "v-coconut-dryfruit",
    price_per_kg: 700,
    availability: "limited",
    batch_days: ["Friday"],
    personal_note: "Sirf 10 kg ka order accept karta hoon ek baar mein.",
  },

  // Namakpara — Patla: Pushpa + Kamla
  {
    aunty_variant_id: "av009",
    aunty_id: "a003",
    variant_id: "v-namakpara-patla",
    price_per_kg: 280,
    availability: "available",
    batch_days: ["Monday", "Wednesday", "Friday", "Saturday"],
    personal_note: "Crispy guarantee — agar crispy nahin to return le lungi.",
  },
  {
    aunty_variant_id: "av010",
    aunty_id: "a006",
    variant_id: "v-namakpara-patla",
    price_per_kg: 270,
    availability: "available",
    batch_days: ["Tuesday", "Thursday"],
    personal_note: "Pure desi ghee moyan se — yahi fark hai market wale se.",
  },

  // Namakpara — Mota: Pushpa + Anju
  {
    aunty_variant_id: "av011",
    aunty_id: "a003",
    variant_id: "v-namakpara-mota",
    price_per_kg: 300,
    availability: "available",
    batch_days: ["Tuesday", "Thursday", "Saturday"],
    personal_note: "Chhath ke liye special order bhi accept karti hoon.",
  },
  {
    aunty_variant_id: "av012",
    aunty_id: "a001",
    variant_id: "v-namakpara-mota",
    price_per_kg: 310,
    availability: "available",
    batch_days: ["Wednesday", "Friday"],
    personal_note: "Mota nimki mein zyada ghee hota hai — zyada satisfying.",
  },

  // Meethapara: Sunita + Pushpa
  {
    aunty_variant_id: "av013",
    aunty_id: "a002",
    variant_id: "v-meethapara-classic",
    price_per_kg: 320,
    availability: "available",
    batch_days: ["Monday", "Thursday"],
    personal_note: "Chashni bilkul ek tar ki — na zyada na kam.",
  },
  {
    aunty_variant_id: "av014",
    aunty_id: "a003",
    variant_id: "v-meethapara-classic",
    price_per_kg: 315,
    availability: "available",
    batch_days: ["Wednesday", "Saturday"],
    personal_note: "Eid aur Diwali ke liye advance order leta hoon.",
  },

  // Gulab Khaja: Sunita + Anju
  {
    aunty_variant_id: "av015",
    aunty_id: "a002",
    variant_id: "v-khaja-classic",
    price_per_kg: 420,
    availability: "available",
    batch_days: ["Friday", "Saturday"],
    personal_note: "7 layers ka thekua — ek ek parat haath se bani.",
  },
  {
    aunty_variant_id: "av016",
    aunty_id: "a001",
    variant_id: "v-khaja-classic",
    price_per_kg: 440,
    availability: "limited",
    batch_days: ["Saturday"],
    personal_note: "Sirf week mein ek baar banati hoon — zyada orders nahin.",
  },

  // Guddamma: Sunita + Meena
  {
    aunty_variant_id: "av017",
    aunty_id: "a002",
    variant_id: "v-guddamma-classic",
    price_per_kg: 360,
    availability: "available",
    batch_days: ["Monday", "Wednesday"],
    personal_note: "Sirf fresh kaccha aam season mein milega.",
  },
  {
    aunty_variant_id: "av018",
    aunty_id: "a005",
    variant_id: "v-guddamma-classic",
    price_per_kg: 350,
    availability: "limited",
    batch_days: ["Friday"],
    personal_note: "Mithila ki original recipe — naani se seekhi hai.",
  },

  // Chura Bhunja — Basic: Kamla + Pushpa + Rekha
  {
    aunty_variant_id: "av019",
    aunty_id: "a006",
    variant_id: "v-chura-basic",
    price_per_kg: 220,
    availability: "available",
    batch_days: ["Monday", "Wednesday", "Friday"],
    personal_note: "35 saalon se bhunti hoon — haath ka andaaza hai aag ka.",
  },
  {
    aunty_variant_id: "av020",
    aunty_id: "a003",
    variant_id: "v-chura-basic",
    price_per_kg: 210,
    availability: "available",
    batch_days: ["Tuesday", "Thursday", "Saturday"],
    personal_note: "Ajwain fresh market se — dabbi wali nahin.",
  },
  {
    aunty_variant_id: "av021",
    aunty_id: "a004",
    variant_id: "v-chura-basic",
    price_per_kg: 225,
    availability: "available",
    batch_days: ["Wednesday", "Saturday"],
    personal_note: "Chhath prasad quality — puja ke liye bhi diya jaata hai.",
  },

  // Chura Bhunja — Premium: Kamla + Rekha
  {
    aunty_variant_id: "av022",
    aunty_id: "a006",
    variant_id: "v-chura-premium",
    price_per_kg: 380,
    availability: "available",
    batch_days: ["Thursday", "Saturday"],
    personal_note: "Gur premium quality ka hota hai — market wala nahin.",
  },
  {
    aunty_variant_id: "av023",
    aunty_id: "a004",
    variant_id: "v-chura-premium",
    price_per_kg: 375,
    availability: "available",
    batch_days: ["Monday", "Friday"],
    personal_note:
      "Dry fruits wala chura — gift ke roop mein bhi de sakte hain.",
  },

  // Thekua: Rekha + Anju + Kamla
  {
    aunty_variant_id: "av024",
    aunty_id: "a004",
    variant_id: "v-thekua-classic",
    price_per_kg: 340,
    availability: "available",
    batch_days: ["Wednesday", "Friday", "Saturday"],
    personal_note: "Chhath prasad — special mold use karti hoon.",
  },
  {
    aunty_variant_id: "av025",
    aunty_id: "a001",
    variant_id: "v-thekua-classic",
    price_per_kg: 350,
    availability: "available",
    batch_days: ["Thursday", "Saturday"],
    personal_note: "Pure gur aur ghee — koi mixer grinder se nahin banta.",
  },
  {
    aunty_variant_id: "av026",
    aunty_id: "a006",
    variant_id: "v-thekua-classic",
    price_per_kg: 335,
    availability: "limited",
    batch_days: ["Saturday"],
    personal_note: "Chhath season mein advance booking zaroori hai.",
  },

  // Sattu Mix: Kamla + Rekha
  {
    aunty_variant_id: "av027",
    aunty_id: "a006",
    variant_id: "v-sattu-classic",
    price_per_kg: 180,
    availability: "available",
    batch_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    personal_note: "Daily batch banati hoon — always fresh, no stock.",
  },
  {
    aunty_variant_id: "av028",
    aunty_id: "a004",
    variant_id: "v-sattu-classic",
    price_per_kg: 185,
    availability: "available",
    batch_days: ["Monday", "Wednesday", "Friday"],
    personal_note: "Desi chana se — protein zyada, additives zero.",
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/** Get all aunties for a specific variant */
export function getAuntiesForVariant(variant_id: string): {
  aunty: AuntyData;
  mapping: AuntyVariantMapping;
}[] {
  return AUNTY_VARIANT_MAPPINGS.filter((m) => m.variant_id === variant_id)
    .map((mapping) => ({
      aunty: BIHAR_AUNTIES.find((a) => a.aunty_id === mapping.aunty_id)!,
      mapping,
    }))
    .filter((item) => item.aunty !== undefined);
}

/** Get all variants for a specific aunty */
export function getVariantsForAunty(aunty_id: string): {
  variant: ProductVariant;
  product: BiharProduct;
  mapping: AuntyVariantMapping;
}[] {
  return AUNTY_VARIANT_MAPPINGS.filter((m) => m.aunty_id === aunty_id)
    .map((mapping) => {
      const product = BIHAR_PRODUCTS.find((p) =>
        p.variants.some((v) => v.variant_id === mapping.variant_id),
      );
      const variant = product?.variants.find(
        (v) => v.variant_id === mapping.variant_id,
      );
      return { variant: variant!, product: product!, mapping };
    })
    .filter((item) => item.variant && item.product);
}

/** Get product by ID */
export function getProductById(product_id: string): BiharProduct | undefined {
  return BIHAR_PRODUCTS.find((p) => p.product_id === product_id);
}

/** Get variant by ID */
export function getVariantById(
  variant_id: string,
): { variant: ProductVariant; product: BiharProduct } | undefined {
  for (const product of BIHAR_PRODUCTS) {
    const variant = product.variants.find((v) => v.variant_id === variant_id);
    if (variant) return { variant, product };
  }
  return undefined;
}

/** Get aunty by ID */
export function getAuntyById(aunty_id: string): AuntyData | undefined {
  return BIHAR_AUNTIES.find((a) => a.aunty_id === aunty_id);
}

/** Get ingredient name by ID */
export function getIngredientById(
  ingredient_id: string,
): IngredientData | undefined {
  return BIHAR_INGREDIENTS.find((i) => i.ingredient_id === ingredient_id);
}

/** Badge color mapping */
export const BADGE_COLORS: Record<AuntyBadge, string> = {
  "Traditional Recipe Keeper": "bg-amber-100 text-amber-800 border-amber-200",
  "Village Heritage Cook": "bg-green-100 text-green-800 border-green-200",
  "Festival Specialist": "bg-orange-100 text-orange-800 border-orange-200",
  "Community Favourite": "bg-pink-100 text-pink-800 border-pink-200",
  "Premium Ingredients": "bg-purple-100 text-purple-800 border-purple-200",
  "Master Sweet Maker": "bg-rose-100 text-rose-800 border-rose-200",
  "Namkeen Expert": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Achar Specialist": "bg-lime-100 text-lime-800 border-lime-200",
  "Bihar Ki Shaan": "bg-red-100 text-red-800 border-red-200",
};

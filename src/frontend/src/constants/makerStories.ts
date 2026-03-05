export interface MakerStory {
  makerId: bigint;
  makerName: string;
  storyImage: string;
  dob: string;
  birthPlace: string;
  marriedYear: string;
  presentLocation: string;
  tagline: string;
  chapters: StoryChapter[];
  fiveBestDishes: string[];
  herDream: string;
  dreamQuote: string;
}

export interface StoryChapter {
  title: string;
  emoji: string;
  content: string;
}

export const MAKER_STORIES: MakerStory[] = [
  {
    makerId: 1n,
    makerName: "Anju Choudhary",
    storyImage: "/assets/generated/story-young-anju.dim_600x700.jpg",
    dob: "14 March, 1967",
    birthPlace: "Darbhanga, Bihar",
    marriedYear: "1984",
    presentLocation: "Patna, Bihar",
    tagline: "Sapne kabhi bhi old nahin hote",
    chapters: [
      {
        title: "Bachpan — The Girl Who Watched",
        emoji: "🌿",
        content:
          "Anju was born into a modest farming family in Darbhanga, where the kitchen was the heart of the home. Her mother, Savitri Devi, was known in the entire mohalla for her magical aam ka achar. Little Anju would sit on a patla beside the chulha, wide-eyed, watching the haldi and mustard seeds dance in hot oil, inhaling the perfume of spices that would stay with her for a lifetime. She learned to cook before she learned to read — and she learned both with equal devotion.",
      },
      {
        title: "Byaah — A New Kitchen, Old Memories",
        emoji: "🌸",
        content:
          "At just 17, Anju was married and moved to her sasural in Patna. The new kitchen was unfamiliar — the utensils were different, the water was different, even the mustard oil had a different warmth. Her mother-in-law, Kamla Devi, was strict but fair. She tested Anju's first achar. There was silence. Then a slow nod. 'Haath mein swaad hai, bahu.' Those five words became the foundation of Anju's confidence.",
      },
      {
        title: "Sangharsh — When the Kitchen Became Everything",
        emoji: "💛",
        content:
          "The 1990s brought hardship. Her husband's small shop struggled through economic uncertainty and two back-to-back floods. With three children to feed and school fees to arrange, Anju began making extra achar and mithai and selling them quietly to neighbours. Nobody talked about it as 'work' — it was just 'Anju didi helping out.' But every rupee she earned carried enormous dignity.",
      },
      {
        title: "Uljhan — Why No One Took Her Seriously",
        emoji: "🪔",
        content:
          "When Anju suggested turning her home kitchen into a real business, her family smiled politely. 'Kaun kharidega?' they said. Who will buy? The market was full of factory products with bright packaging and long shelf lives. Her thekua — made fresh for Chhath, crumbling with pure ghee — had no label, no barcode. She didn't stop. She simply kept cooking, kept improving, kept gifting her products to anyone willing to give an honest opinion.",
      },
      {
        title: "Kyun Jooda — Why She Joined Choudhary Aunty",
        emoji: "✨",
        content:
          "When Kuku told her about Choudhary Aunty, Anju sat quietly for a long time. 'Mera naam website pe hoga?' she asked. Her name, on a website. For the whole country to see. She joined not for the money alone — she joined because she wanted her recipes to outlive her. She wanted her granddaughter to taste her thekua in a city she had never visited.",
      },
    ],
    fiveBestDishes: [
      "Aam Ka Achar (Mango Pickle)",
      "Thekua (Chhath Prasad)",
      "Sattu Ka Ladoo",
      "Tilkut (Gaya Special)",
      "Singhara Atta Barfi",
    ],
    herDream:
      "Anju ji dreams of the day her recipe book — handwritten in her tight, looping Hindi — becomes a printed cookbook that sits in every Indian home abroad. She wants to visit Gaya's Mahabodhi Temple once more, this time with her grandchildren, and offer thekua she made herself as prasad.",
    dreamQuote:
      "Mera sapna hai ki meri recipe duniya ke kone kone mein pahunche. Mera naam ek din sab log jaanein — Anju ki Rasoi se.",
  },
  {
    makerId: 2n,
    makerName: "Babita Tai",
    storyImage: "/assets/generated/story-young-babita.dim_600x700.jpg",
    dob: "2 September, 1970",
    birthPlace: "Rohtak, Haryana",
    marriedYear: "1988",
    presentLocation: "Hisar, Haryana",
    tagline: "Haath ke swaad ko koi machine replace nahin kar sakti",
    chapters: [
      {
        title: "Bachpan — Wheat Fields and Wooden Chakla",
        emoji: "🌾",
        content:
          "Babita grew up in Rohtak, in a joint family of eight where the women woke before sunrise to prepare food for the men working the fields. Her nani was the family's head cook — she could tell by the smell of a dal whether it needed more ghee or more hing. Babita absorbed this science silently, watching from the doorway, too young to be allowed near the tawa but old enough to understand everything.",
      },
      {
        title: "Shaadi — From Rohtak to Hisar",
        emoji: "🌻",
        content:
          "Her marriage at 18 brought her to Hisar, where her mother-in-law ran the household with military precision. Breakfast at 6, lunch at noon, dinner at sunset. Babita was given the mathri station — every Thursday she would roll and fry enough mathri to last a week. Her crisp, salt-forward mathri became the family's most requested item at every festival.",
      },
      {
        title: "Takleef — When the Harvest Failed",
        emoji: "🪵",
        content:
          "In 2007, two consecutive poor harvests hit her husband's small farm hard. The family had to borrow. Babita took a quiet decision: she would make churma ladoo and sell them at the local mela. Her first batch of 50 ladoos sold out in two hours. She came home with ₹800 in her pallu — more than she had ever personally earned. She cried silently that night, not from sadness, but from a feeling she had no word for.",
      },
      {
        title: "Pehchaan — Finding Her Voice",
        emoji: "💪",
        content:
          "By 2015, Babita's bajra ladoo and methi mathri had a small but fiercely loyal following in Hisar's residential colonies. Neighbours would place advance orders before festivals. She never thought of herself as an entrepreneur — she thought of herself as someone whose food made people happy.",
      },
      {
        title: "Kyun Jooda — Why She Joined Choudhary Aunty",
        emoji: "✨",
        content:
          "Babita joined Choudhary Aunty because her daughter convinced her. 'Maa, teri mathri Delhi mein bhi bikegi,' she said. Babita laughed. Then she thought about it for a week. Then she called the number. She joined because she realised: her recipes were not just food. They were her legacy.",
      },
    ],
    fiveBestDishes: [
      "Methi Mathri",
      "Churma Ladoo",
      "Bajra Ladoo",
      "Moong Dal Halwa",
      "Gajar Gobhi Shalgam Achar",
    ],
    herDream:
      "Babita Tai dreams of opening a small dhaaba-style tiffin service from her home in Hisar, where working women can order authentic Haryanvi food made daily. She wants her churma ladoo recipe to be passed to her daughter — the same daughter who told her the world deserved to taste her cooking.",
    dreamQuote:
      "Meri mathri ek din har sheher mein pahunchegi. Yeh mera vaada hai apni ma ko, jo khud ek kamaal ki rasoi ki malkin thi.",
  },
  {
    makerId: 3n,
    makerName: "Sarla Maasi",
    storyImage: "/assets/generated/story-young-sarla.dim_600x700.jpg",
    dob: "27 June, 1965",
    birthPlace: "Varanasi, Uttar Pradesh",
    marriedYear: "1982",
    presentLocation: "Lucknow, Uttar Pradesh",
    tagline: "Khaana banate waqt dil bhi daalti hoon",
    chapters: [
      {
        title: "Bachpan — The Lanes of Banaras",
        emoji: "🛕",
        content:
          "Sarla was born near the ghats of Varanasi, in a narrow gali where every family's kitchen smell mingled with incense from the nearby temple. Her family made besan ladoo every Diwali — enough to feed 40 people — and the process took three days. She was the eldest daughter and the first to learn the exact ratio of ghee to besan that her mother swore by.",
      },
      {
        title: "Shaadi — A Lucknawi Kitchen",
        emoji: "🌸",
        content:
          "Her marriage brought her from Varanasi's spiced street food culture to the gentler, more nawabi kitchen of Lucknow. Her mother-in-law cooked with a refinement that felt almost restrained — but within months, Sarla learned to blend both styles. Her Lucknawi-Banarasi fusion ladoos became a quiet sensation at family gatherings.",
      },
      {
        title: "Mushkil — A Life She Managed Alone",
        emoji: "💧",
        content:
          "Sarla's husband passed away unexpectedly in 2003, leaving her with two school-going children and very little savings. She moved to her brother's house temporarily, but pride and independence drove her back to her own rented home within a year. She started making nimbu achar and Agra-style murabba for sale. She never asked for charity. She asked for orders.",
      },
      {
        title: "Sahara — When Community Lifted Her",
        emoji: "🤝",
        content:
          "Her locality's women's SHG (self-help group) became her backbone. They pooled money for raw materials and rotated sales responsibilities. Sarla's gajar ka halwa and besan ladoo brought the most consistent repeat orders. She paid back her share in six months and continued contributing to lift others.",
      },
      {
        title: "Kyun Jooda — Why She Joined Choudhary Aunty",
        emoji: "✨",
        content:
          "Sarla joined Choudhary Aunty because she wanted her children to be proud. Her daughter is studying engineering in Pune — and Sarla wanted to be able to say, 'Main bhi kuch karti hoon.' She joined because dignity, she believes, is something you cook for yourself.",
      },
    ],
    fiveBestDishes: [
      "Besan Ladoo",
      "Nimbu Ka Achar",
      "Gajar Ka Halwa",
      "Mathura Peda",
      "Amla Murabba",
    ],
    herDream:
      "Sarla Maasi's dream is to see her besan ladoo served at a wedding in Mumbai — where people know nothing about Varanasi but take one bite and ask, 'Yeh kahan se aaya?' She dreams of a small room that is entirely her own — her kitchen, her office, her stage.",
    dreamQuote:
      "Mujhe pata tha ki ek din duniya meri baat sunegi. Main bas wait karti rahi. Aur cook karti rahi.",
  },
  {
    makerId: 4n,
    makerName: "Preetkaur Aunty",
    storyImage: "/assets/generated/story-young-preetkaur.dim_600x700.jpg",
    dob: "19 January, 1972",
    birthPlace: "Amritsar, Punjab",
    marriedYear: "1990",
    presentLocation: "Ludhiana, Punjab",
    tagline: "Punjabi rasoi mein dil bhi parossi hai hamesha",
    chapters: [
      {
        title: "Bachpan — Amritsar Ki Khushboo",
        emoji: "🌺",
        content:
          "Preetkaur grew up in the shadow of the Golden Temple, in a family that treated cooking as seva — service. Her mother made pinni every winter, and the smell of roasted atta in desi ghee would drift through the entire house. Preet was always first to lick the kadhai. She says the first taste of ghee-soaked atta is still her definition of safety and warmth.",
      },
      {
        title: "Shaadi — A Ludhiana Home",
        emoji: "🧡",
        content:
          "Her marriage took her to Ludhiana's industrial city energy — a contrast from Amritsar's spiritual calm. But her kitchen remained her sanctuary. Her gajak at Lohri and pinni in winter became the most anticipated offerings in the family. 'Preet di pinni aagayi?' became a seasonal ritual for uncles, cousins, and neighbours alike.",
      },
      {
        title: "Takleef — The Quiet Sacrifice",
        emoji: "💛",
        content:
          "When her husband's textile business hit a rough patch in 2012, Preetkaur began selling her gajak and mathri through local shops on consignment. She never told her children how hard things were. She simply worked harder and said less. Her son only learned of this chapter years later — and he says it is why he calls her the strongest person he knows.",
      },
      {
        title: "Umang — The Spark Returns",
        emoji: "⭐",
        content:
          "By 2019, things had stabilised financially, but Preetkaur didn't stop selling. She had tasted the satisfaction of earning. A local women's food fair gave her a stall — and she sold out of pinni and gajak in 90 minutes. A customer from Delhi placed a bulk order for Diwali. She had arrived.",
      },
      {
        title: "Kyun Jooda — Why She Joined Choudhary Aunty",
        emoji: "✨",
        content:
          "Preetkaur joined because she believed that Punjab's home kitchen deserves national recognition. 'Factory gajak mein dil nahin hota,' she says. She joined Choudhary Aunty to prove that the best gajak in the world is still made in someone's home, with hands that learned from their mother's hands.",
      },
    ],
    fiveBestDishes: [
      "Pinni (Punjabi Winter Sweet)",
      "Gajak (Sesame Brittle)",
      "Amritsari Aam Ka Achar",
      "Punjabi Mathri",
      "Amritsari Wadi",
    ],
    herDream:
      "Preetkaur Aunty dreams of a day when every Indian child abroad receives a box of her pinni at Lohri — so they know what a real Punjabi winter tastes like. She wants to visit the Golden Temple once more with her family, with her own money earned from her own work.",
    dreamQuote:
      "Waheguru ne haath diye hain toh kuch banao. Meri pinni mein uska hi aashirwaad hai.",
  },
  {
    makerId: 5n,
    makerName: "Geeta Devi",
    storyImage: "/assets/generated/story-young-geeta.dim_600x700.jpg",
    dob: "8 April, 1968",
    birthPlace: "Almora, Uttarakhand",
    marriedYear: "1986",
    presentLocation: "Dehradun, Uttarakhand",
    tagline: "Pahad ki khushboo mere haathon mein basi hai",
    chapters: [
      {
        title: "Bachpan — Almora Ki Pahadi",
        emoji: "🏔️",
        content:
          "Geeta was born in Almora, high in the Kumaoni hills, where winters are long and kitchens are warm with wood-fire stoves. Her grandmother made Bal Mithai — the dark, fudge-like sweet coated in tiny white sugar balls — as an offering at the local temple during Harela festival. Little Geeta would watch the khoa caramelise in a heavy iron kadhai for hours, learning patience before she learned recipes.",
      },
      {
        title: "Shaadi — Down From the Mountains",
        emoji: "🌿",
        content:
          "Her marriage brought her from Almora's quiet altitude to the busier plains of Dehradun. The city felt vast and loud. But Geeta brought her mountains with her — in the form of buransh flowers collected on her last visit home, dried timru berries in a cloth bag, and her grandmother's recipe written on the back of a wedding invitation card.",
      },
      {
        title: "Pahad Ki Takleef — Distance From Home",
        emoji: "💧",
        content:
          "For years, Geeta felt the quiet grief of the pahadi who has left home. City life offered opportunity but took away the scent of pine and first rain on stone. She channelled this longing into cooking — making jhangora kheer on winter nights, preparing timru ka achar with the same care her grandmother used. Food became her way of staying connected to Almora.",
      },
      {
        title: "Pehchaan — Pahadi Food in the City",
        emoji: "🌸",
        content:
          "In Dehradun, colleagues and neighbours had rarely tasted genuine buransh sharbat or authentic pahadi namak mix. Geeta's offerings were a revelation. A local organic food store offered her a shelf. Within one season, her bal mithai and buransh products had a dedicated customer base. She discovered that in leaving her mountains, she had become their ambassador.",
      },
      {
        title: "Kyun Jooda — Why She Joined Choudhary Aunty",
        emoji: "✨",
        content:
          "Geeta joined Choudhary Aunty because she wanted Uttarakhand's food traditions to not be forgotten. Every time a child in Delhi or Mumbai tastes buransh sharbat and asks 'Yeh kya hai?', she gets to say: yeh mera pahad hai. She joined to keep her grandmother's recipes alive — and to make sure the mountains are always close.",
      },
    ],
    fiveBestDishes: [
      "Bal Mithai (Kumaoni Chocolate Fudge)",
      "Buransh Ka Sharbat",
      "Jhangora Ki Kheer",
      "Timru Ka Achar",
      "Pahadi Aloo Ki Chips",
    ],
    herDream:
      "Geeta Devi dreams of a mountain homestay where guests wake to fresh jhangora kheer and the sound of birds. She dreams of taking her grandchildren to Almora and showing them the same kitchen her grandmother cooked in — still warm, still smelling of timru and pine smoke.",
    dreamQuote:
      "Mere pahad ne mujhe sab kuch diya hai. Meri rasoi usi ka shukriya hai.",
  },
];

export function getMakerStory(makerId: bigint): MakerStory | undefined {
  return MAKER_STORIES.find((s) => s.makerId === makerId);
}

export function getMakerStoryByName(name: string): MakerStory | undefined {
  return MAKER_STORIES.find((s) => s.makerName === name);
}

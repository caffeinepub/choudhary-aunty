import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// ─────────────────────────────────────────────
// Language types
// ─────────────────────────────────────────────

export type LanguageCode =
  | "en"
  | "hi"
  | "bn"
  | "pa"
  | "gu"
  | "mr"
  | "ta"
  | "te"
  | "kn"
  | "ml"
  | "or";

export const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  en: "English",
  hi: "हिंदी",
  bn: "বাংলা",
  pa: "ਪੰਜਾਬੀ",
  gu: "ગુજરાતી",
  mr: "मराठी",
  ta: "தமிழ்",
  te: "తెలుగు",
  kn: "ಕನ್ನಡ",
  ml: "മലയാളം",
  or: "ଓଡ଼ିଆ",
};

// ─────────────────────────────────────────────
// Translation strings
// Order: en, hi, bn, pa, gu, mr, ta, te, kn, ml, or
// ─────────────────────────────────────────────

type Translations = Record<string, Record<LanguageCode, string>>;

const translations: Translations = {
  "nav.home": {
    en: "Home",
    hi: "होम",
    bn: "হোম",
    pa: "ਹੋਮ",
    gu: "હોમ",
    mr: "होम",
    ta: "முகப்பு",
    te: "హోమ్",
    kn: "ಹೋಮ್",
    ml: "ഹോം",
    or: "ହୋମ",
  },
  "nav.shop": {
    en: "Shop",
    hi: "दुकान",
    bn: "দোকান",
    pa: "ਦੁਕਾਨ",
    gu: "દુકાન",
    mr: "दुकान",
    ta: "கடை",
    te: "దుకాణం",
    kn: "ಅಂಗಡಿ",
    ml: "കട",
    or: "ଦୋକାନ",
  },
  "nav.story": {
    en: "Our Story",
    hi: "हमारी कहानी",
    bn: "আমাদের গল্প",
    pa: "ਸਾਡੀ ਕਹਾਣੀ",
    gu: "આપણી વાર્તા",
    mr: "आमची गोष्ट",
    ta: "எங்கள் கதை",
    te: "మా కథ",
    kn: "ನಮ್ಮ ಕಥೆ",
    ml: "ഞങ്ങളുടെ കഥ",
    or: "ଆମ କାହାଣୀ",
  },
  "nav.makers": {
    en: "Our Makers",
    hi: "हमारी अंटियाँ",
    bn: "আমাদের তৈরিকারীরা",
    pa: "ਸਾਡੀਆਂ ਮੇਕਰਸ",
    gu: "આપણા મૅકર્સ",
    mr: "आमच्या मेकर्स",
    ta: "எங்கள் தயாரிப்பாளர்கள்",
    te: "మా మేకర్లు",
    kn: "ನಮ್ಮ ತಯಾರಕರು",
    ml: "ഞങ്ങളുടെ നിർമ്മാതാക്കൾ",
    or: "ଆମ ମେକର୍ସ",
  },
  "nav.howToOrder": {
    en: "How to Order",
    hi: "कैसे ऑर्डर करें",
    bn: "কীভাবে অর্ডার করবেন",
    pa: "ਕਿਵੇਂ ਆਰਡਰ ਕਰੀਏ",
    gu: "ઓર્ડર કેવી રીતે કરવો",
    mr: "ऑर्डर कसे करायचे",
    ta: "எப்படி ஆர்டர் செய்வது",
    te: "ఎలా ఆర్డర్ చేయాలి",
    kn: "ಆರ್ಡರ್ ಮಾಡುವುದು ಹೇಗೆ",
    ml: "എങ്ങനെ ഓർഡർ ചെയ്യാം",
    or: "କିପରି ଅର୍ଡର କରିବେ",
  },
  "hero.tagline": {
    en: "Sapne Kabhi Old Nahin Hote",
    hi: "Sapne Kabhi Old Nahin Hote",
    bn: "Sapne Kabhi Old Nahin Hote",
    pa: "Sapne Kabhi Old Nahin Hote",
    gu: "Sapne Kabhi Old Nahin Hote",
    mr: "Sapne Kabhi Old Nahin Hote",
    ta: "Sapne Kabhi Old Nahin Hote",
    te: "Sapne Kabhi Old Nahin Hote",
    kn: "Sapne Kabhi Old Nahin Hote",
    ml: "Sapne Kabhi Old Nahin Hote",
    or: "Sapne Kabhi Old Nahin Hote",
  },
  "hero.subtitle": {
    en: "Authentic homemade flavours from India's heartland, made with love by real homemakers",
    hi: "असली घर का खाना, प्यार से बनाया, भारत के दिल से",
    bn: "ভারতের হৃদয় থেকে আসা খাঁটি ঘরের স্বাদ, প্রকৃত গৃহিণীদের ভালোবাসায় তৈরি",
    pa: "ਭਾਰਤ ਦੇ ਦਿਲ ਤੋਂ ਅਸਲੀ ਘਰੇਲੂ ਸੁਆਦ, ਅਸਲ ਗ੍ਰਹਿਣੀਆਂ ਦੇ ਪਿਆਰ ਨਾਲ ਬਣਾਏ",
    gu: "ભારતના હૃદયથી અસ્સલ ઘરેલુ સ્વાદ, સાચી ગૃહિણીઓ ના પ્રેમ સાથે બનાવ્યા",
    mr: "भारताच्या हृदयातून खरे घरचे चव, खऱ्या गृहिणींच्या प्रेमाने बनवलेले",
    ta: "இந்தியாவின் இதயத்திலிருந்து உண்மையான வீட்டு சுவை, உண்மையான இல்லத்தரசிகளால் அன்போடு செய்யப்பட்டவை",
    te: "భారతదేశపు హృదయం నుండి నిజమైన ఇంటి రుచులు, నిజమైన గృహిణులు ప్రేమతో చేసినవి",
    kn: "ಭಾರತದ ಹೃದಯದಿಂದ ನಿಜವಾದ ಮನೆಯ ರುಚಿಗಳು, ನಿಜವಾದ ಗೃಹಿಣಿಯರು ಪ್ರೀತಿಯಿಂದ ಮಾಡಿದ",
    ml: "ഭാരതത്തിന്റെ ഹൃദയത്തിൽ നിന്ന് യഥാർഥ ഭവനരുചികൾ, യഥാർഥ ഗൃഹിണിമാർ സ്നേഹത്തോടെ ഉണ്ടാക്കിയത്",
    or: "ଭାରତର ହୃଦୟରୁ ଅସଲ ଘରୋଇ ସ୍ୱାଦ, ପ୍ରକୃତ ଗୃହିଣୀଙ୍କ ଭଲ ପାଇ ତିଆରି",
  },
  "cta.orderWhatsapp": {
    en: "Order on WhatsApp",
    hi: "WhatsApp पर ऑर्डर करें",
    bn: "WhatsApp-এ অর্ডার করুন",
    pa: "WhatsApp 'ਤੇ ਆਰਡਰ ਕਰੋ",
    gu: "WhatsApp પર ઓર્ડર કરો",
    mr: "WhatsApp वर ऑर्डर करा",
    ta: "WhatsApp-இல் ஆர்டர் செய்யுங்கள்",
    te: "WhatsApp లో ఆర్డర్ చేయండి",
    kn: "WhatsApp ನಲ್ಲಿ ಆರ್ಡರ್ ಮಾಡಿ",
    ml: "WhatsApp ൽ ഓർഡർ ചെയ്യൂ",
    or: "WhatsApp ରେ ଅର୍ଡର କରନ୍ତୁ",
  },
  "cta.shopNow": {
    en: "Shop Now",
    hi: "अभी खरीदें",
    bn: "এখনই কিনুন",
    pa: "ਹੁਣੇ ਖਰੀਦੋ",
    gu: "અત્યારે ખરીદો",
    mr: "आत्ता खरेदी करा",
    ta: "இப்போதே வாங்குங்கள்",
    te: "ఇప్పుడే కొనుగోలు చేయండి",
    kn: "ಈಗಲೇ ಖರೀದಿಸಿ",
    ml: "ഇപ്പോൾ വാങ്ങൂ",
    or: "ଏବେ କିଣନ୍ତୁ",
  },
  "footer.tagline": {
    en: "Sapne Kabhi Old Nahin Hote",
    hi: "Sapne Kabhi Old Nahin Hote",
    bn: "Sapne Kabhi Old Nahin Hote",
    pa: "Sapne Kabhi Old Nahin Hote",
    gu: "Sapne Kabhi Old Nahin Hote",
    mr: "Sapne Kabhi Old Nahin Hote",
    ta: "Sapne Kabhi Old Nahin Hote",
    te: "Sapne Kabhi Old Nahin Hote",
    kn: "Sapne Kabhi Old Nahin Hote",
    ml: "Sapne Kabhi Old Nahin Hote",
    or: "Sapne Kabhi Old Nahin Hote",
  },
  "nav.more": {
    en: "More",
    hi: "और",
    bn: "আরও",
    pa: "ਹੋਰ",
    gu: "વધુ",
    mr: "अधिक",
    ta: "மேலும்",
    te: "మరిన్ని",
    kn: "ಇನ್ನಷ್ಟು",
    ml: "കൂടുതൽ",
    or: "ଅଧିକ",
  },
};

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────

const STORAGE_KEY = "choudhary-aunty-lang";

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && stored in LANGUAGE_NAMES) return stored as LanguageCode;
    } catch {
      // localStorage might be unavailable
    }
    return "en";
  });

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[language] ?? entry.en ?? key;
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}

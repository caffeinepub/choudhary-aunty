import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOGO_IMAGE } from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle, Loader2, Lock, Phone, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
];

type Step = "phone" | "otp" | "profile";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function LoginPage() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [dietType, setDietType] = useState("Veg");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Login | Choudhary Aunty";
    if (isLoggedIn) {
      navigate({ to: "/my-profile" });
    }
  }, [isLoggedIn, navigate]);

  function handleSendOtp() {
    if (!phone && !email) {
      toast.error("Please enter your phone number or email");
      return;
    }
    const otp = generateOTP();
    setGeneratedOtp(otp);
    setStep("otp");
    toast.success("OTP generated! Check the highlighted box below.");
  }

  function handleVerifyOtp() {
    if (enteredOtp !== generatedOtp) {
      toast.error("Incorrect OTP. Please try again.");
      return;
    }
    setStep("profile");
  }

  async function handleSubmit() {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!city.trim()) {
      toast.error("Please enter your city");
      return;
    }
    if (!state) {
      toast.error("Please select your state");
      return;
    }
    setIsLoading(true);
    try {
      await login(name.trim(), phone, email, city.trim(), state);
      toast.success("Welcome to the Choudhary Aunty family! 🎉");
      navigate({ to: "/my-profile" });
    } catch {
      // fallback: create local account
      const localAccount = {
        id: BigInt(Date.now()),
        principal: {
          _arr: new Uint8Array(),
          _isPrincipal: true,
        } as unknown as import("@icp-sdk/core/principal").Principal,
        name: name.trim(),
        phone,
        email,
        city,
        state,
        dietType,
        spicePreference: "medium",
        oilPreference: "medium",
        sweetnessPreference: "medium",
        regionPreference: "",
        lifecycleStage: "New",
        asharfiPoints: BigInt(50),
        signupDate: BigInt(Date.now()),
      };
      localStorage.setItem(
        "ca_customer_account",
        JSON.stringify(localAccount, (_k, v) =>
          typeof v === "bigint" ? v.toString() : v,
        ),
      );
      window.location.href = "/my-profile";
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden">
      {/* Warm background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-amber-50 to-orange-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-terracotta/8 rounded-full blur-3xl" />
      {/* Decorative spice dots */}
      <div className="absolute top-1/4 left-8 w-3 h-3 rounded-full bg-saffron/30 animate-float" />
      <div
        className="absolute top-3/4 right-8 w-2 h-2 rounded-full bg-terracotta/30 animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-turmeric/30 animate-float"
        style={{ animationDelay: "0.5s" }}
      />

      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-8">
        {/* Logo + heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <img
            src={LOGO_IMAGE}
            alt="Choudhary Aunty"
            className="h-16 w-auto mx-auto mb-4 object-contain"
          />
          <h1 className="font-display text-3xl font-bold text-burgundy mb-1">
            Aapka Swagat Hai
          </h1>
          <p className="text-foreground/60 font-body text-sm">
            Join our family of food lovers. Sign in or create your account.
          </p>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {(["phone", "otp", "profile"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s
                    ? "bg-saffron text-cream shadow-warm"
                    : (["phone", "otp", "profile"] as Step[]).indexOf(step) > i
                      ? "bg-green-500 text-white"
                      : "bg-border text-muted-foreground"
                }`}
              >
                {(["phone", "otp", "profile"] as Step[]).indexOf(step) > i ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  i + 1
                )}
              </div>
              {i < 2 && <div className="w-8 h-px bg-border" />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: Phone/Email */}
          {step === "phone" && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl border border-amber-100 shadow-warm-lg p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-saffron/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-saffron" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-foreground">
                    Enter Your Contact
                  </h2>
                  <p className="text-muted-foreground text-xs font-body">
                    Phone or email to get started
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="font-body text-sm font-semibold text-foreground mb-1.5 block">
                    Mobile Number
                  </Label>
                  <Input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    data-ocid="login.phone_input"
                    className="font-body text-base border-amber-200 focus:border-saffron rounded-xl h-12"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground font-body">
                    or
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div>
                  <Label className="font-body text-sm font-semibold text-foreground mb-1.5 block">
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    placeholder="e.g. anju@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="font-body text-base border-amber-200 focus:border-saffron rounded-xl h-12"
                  />
                </div>
                <Button
                  onClick={handleSendOtp}
                  data-ocid="login.send_otp_button"
                  className="w-full h-12 bg-saffron hover:bg-terracotta text-cream font-semibold font-body rounded-xl text-base shadow-warm transition-all"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Send OTP
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: OTP */}
          {step === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl border border-amber-100 shadow-warm-lg p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-saffron/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-saffron" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-foreground">
                    Verify OTP
                  </h2>
                  <p className="text-muted-foreground text-xs font-body">
                    Enter the code shown below
                  </p>
                </div>
              </div>

              {/* Demo OTP display */}
              <div className="bg-amber-50 border-2 border-saffron/40 rounded-2xl p-4 mb-5 text-center">
                <p className="text-xs font-body text-amber-700 font-semibold mb-1 uppercase tracking-wider">
                  🔐 Your Demo OTP
                </p>
                <p className="font-display text-4xl font-bold text-saffron tracking-[0.3em]">
                  {generatedOtp}
                </p>
                <p className="text-xs text-muted-foreground font-body mt-1">
                  Copy this code and enter it below
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="font-body text-sm font-semibold text-foreground mb-1.5 block">
                    Enter OTP
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    maxLength={6}
                    data-ocid="login.otp_input"
                    className="font-body text-xl tracking-[0.4em] text-center border-amber-200 focus:border-saffron rounded-xl h-12 font-bold"
                  />
                </div>
                <Button
                  onClick={handleVerifyOtp}
                  data-ocid="login.verify_button"
                  className="w-full h-12 bg-saffron hover:bg-terracotta text-cream font-semibold font-body rounded-xl text-base shadow-warm"
                >
                  Verify OTP
                </Button>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="w-full text-sm text-muted-foreground font-body hover:text-saffron transition-colors"
                >
                  ← Change phone/email
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Profile */}
          {step === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl border border-amber-100 shadow-warm-lg p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-foreground">
                    Complete Your Profile
                  </h2>
                  <p className="text-muted-foreground text-xs font-body">
                    Just a few details to personalise your experience
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="font-body text-sm font-semibold text-foreground mb-1.5 block">
                    Your Name *
                  </Label>
                  <Input
                    type="text"
                    placeholder="e.g. Meena Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    data-ocid="login.name_input"
                    className="font-body border-amber-200 focus:border-saffron rounded-xl h-12"
                  />
                </div>
                <div>
                  <Label className="font-body text-sm font-semibold text-foreground mb-1.5 block">
                    City *
                  </Label>
                  <Input
                    type="text"
                    placeholder="e.g. New Delhi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="font-body border-amber-200 focus:border-saffron rounded-xl h-12"
                  />
                </div>
                <div>
                  <Label className="font-body text-sm font-semibold text-foreground mb-1.5 block">
                    State *
                  </Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger
                      className="font-body border-amber-200 focus:border-saffron rounded-xl h-12"
                      data-ocid="login.state_select"
                    >
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent className="max-h-64 overflow-y-auto">
                      {INDIAN_STATES.map((s) => (
                        <SelectItem key={s} value={s} className="font-body">
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="font-body text-sm font-semibold text-foreground mb-1.5 block">
                    Diet Type
                  </Label>
                  <div className="flex gap-2">
                    {["Veg", "Vegan", "Non-Veg"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDietType(d)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-body font-semibold border transition-all ${
                          dietType === d
                            ? "bg-saffron text-cream border-saffron shadow-warm"
                            : "bg-white border-amber-200 text-foreground/70 hover:border-saffron/50"
                        }`}
                      >
                        {d === "Veg"
                          ? "🌿 Veg"
                          : d === "Vegan"
                            ? "🌱 Vegan"
                            : "🍖 Non-Veg"}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  data-ocid="login.submit_button"
                  className="w-full h-12 bg-saffron hover:bg-terracotta text-cream font-semibold font-body rounded-xl text-base shadow-warm mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Joining Family...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Join Our Family 🎉
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-muted-foreground font-body mt-6"
        >
          🔒 Your data is safe & secure. We never share your details.
        </motion.p>
      </div>
    </main>
  );
}

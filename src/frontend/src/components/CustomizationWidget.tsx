import { motion } from "motion/react";
import { useState } from "react";

export interface CustomizationState {
  spiceLevel: string;
  oilLevel: string;
  saltLevel: string;
  sweetnessLevel: string;
  portionSize: string;
}

const DEFAULT_CUSTOMIZATION: CustomizationState = {
  spiceLevel: "Medium Spice",
  oilLevel: "Medium Oil",
  saltLevel: "Medium Salt",
  sweetnessLevel: "Medium Sweet",
  portionSize: "Medium",
};

const SWEET_CATEGORIES = ["sweets", "ladoo", "barfi", "halwa"];

// ─── Radio Option Config ─────────────────────────────────────────────────────

interface RadioOption {
  value: string;
  label: string;
  sub?: string;
  icon: string;
  activeColor: string;
  activeBg: string;
  activeBorder: string;
}

const SPICE_OPTIONS: RadioOption[] = [
  {
    value: "Low Spice",
    label: "Low Spice",
    icon: "🟢",
    activeColor: "text-green-700",
    activeBg: "bg-green-50",
    activeBorder: "border-green-400",
  },
  {
    value: "Medium Spice",
    label: "Medium Spice",
    icon: "🟡",
    activeColor: "text-amber-700",
    activeBg: "bg-amber-50",
    activeBorder: "border-amber-400",
  },
  {
    value: "High Spice",
    label: "High Spice",
    icon: "🔴",
    activeColor: "text-red-700",
    activeBg: "bg-red-50",
    activeBorder: "border-red-400",
  },
];

const OIL_OPTIONS: RadioOption[] = [
  {
    value: "Low Oil",
    label: "Low Oil",
    icon: "💧",
    activeColor: "text-sky-700",
    activeBg: "bg-sky-50",
    activeBorder: "border-sky-400",
  },
  {
    value: "Medium Oil",
    label: "Medium Oil",
    icon: "💦",
    activeColor: "text-amber-700",
    activeBg: "bg-amber-50",
    activeBorder: "border-amber-400",
  },
  {
    value: "High Oil",
    label: "High Oil",
    icon: "🫗",
    activeColor: "text-orange-700",
    activeBg: "bg-orange-50",
    activeBorder: "border-orange-400",
  },
];

const SALT_OPTIONS: RadioOption[] = [
  {
    value: "Low Salt",
    label: "Low Salt",
    icon: "🔵",
    activeColor: "text-blue-700",
    activeBg: "bg-blue-50",
    activeBorder: "border-blue-400",
  },
  {
    value: "Medium Salt",
    label: "Medium Salt",
    icon: "⚪",
    activeColor: "text-slate-700",
    activeBg: "bg-slate-50",
    activeBorder: "border-slate-400",
  },
  {
    value: "High Salt",
    label: "High Salt",
    icon: "🟤",
    activeColor: "text-stone-700",
    activeBg: "bg-stone-100",
    activeBorder: "border-stone-400",
  },
];

const SWEETNESS_OPTIONS: RadioOption[] = [
  {
    value: "Low Sweet",
    label: "Low Sweet",
    icon: "🌿",
    activeColor: "text-emerald-700",
    activeBg: "bg-emerald-50",
    activeBorder: "border-emerald-400",
  },
  {
    value: "Medium Sweet",
    label: "Medium Sweet",
    icon: "🍯",
    activeColor: "text-amber-700",
    activeBg: "bg-amber-50",
    activeBorder: "border-amber-400",
  },
  {
    value: "High Sweet",
    label: "High Sweet",
    icon: "🍬",
    activeColor: "text-pink-700",
    activeBg: "bg-pink-50",
    activeBorder: "border-pink-400",
  },
];

const PORTION_OPTIONS: RadioOption[] = [
  {
    value: "Small",
    label: "Small",
    sub: "~250g",
    icon: "🥄",
    activeColor: "text-saffron",
    activeBg: "bg-saffron/8",
    activeBorder: "border-saffron",
  },
  {
    value: "Medium",
    label: "Medium",
    sub: "~500g",
    icon: "🍽️",
    activeColor: "text-saffron",
    activeBg: "bg-saffron/8",
    activeBorder: "border-saffron",
  },
  {
    value: "Large",
    label: "Large",
    sub: "~1 kg",
    icon: "🫕",
    activeColor: "text-saffron",
    activeBg: "bg-saffron/8",
    activeBorder: "border-saffron",
  },
];

// ─── RadioGroup Component ─────────────────────────────────────────────────────

interface RadioGroupProps {
  id: string;
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (val: string) => void;
}

function RadioGroup({ id, label, options, value, onChange }: RadioGroupProps) {
  return (
    <fieldset>
      <legend className="text-xs font-body font-semibold text-foreground/70 mb-2.5 uppercase tracking-wider">
        {label}
      </legend>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
        {options.map((opt) => {
          const isSelected = value === opt.value;
          const inputId = `${id}-${opt.value.replace(/\s+/g, "-").toLowerCase()}`;
          return (
            <label
              key={opt.value}
              htmlFor={inputId}
              data-ocid={`customization.${id}.radio`}
              className={`flex-1 flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none ${
                isSelected
                  ? `${opt.activeBg} ${opt.activeBorder} ${opt.activeColor}`
                  : "bg-background border-border text-foreground/70 hover:border-saffron/40 hover:bg-saffron/4"
              }`}
            >
              {/* Hidden native radio */}
              <input
                type="radio"
                id={inputId}
                name={id}
                value={opt.value}
                checked={isSelected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
                data-ocid={`customization.${id}.input`}
              />
              {/* Custom radio indicator */}
              <span
                className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                  isSelected
                    ? `${opt.activeBorder} bg-current`
                    : "border-border bg-background"
                }`}
                aria-hidden="true"
              >
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                )}
              </span>
              {/* Icon + label */}
              <span className="flex items-center gap-1.5 min-w-0">
                <span
                  className="text-sm leading-none shrink-0"
                  aria-hidden="true"
                >
                  {opt.icon}
                </span>
                <span className="text-xs font-body font-semibold truncate">
                  {opt.label}
                </span>
                {opt.sub && (
                  <span className="text-[10px] font-body text-muted-foreground ml-0.5 shrink-0">
                    {opt.sub}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

// ─── Main Widget ──────────────────────────────────────────────────────────────

interface CustomizationWidgetProps {
  category: string;
  onChange?: (state: CustomizationState) => void;
  initialState?: Partial<CustomizationState>;
}

export function CustomizationWidget({
  category,
  onChange,
  initialState,
}: CustomizationWidgetProps) {
  const [state, setState] = useState<CustomizationState>({
    ...DEFAULT_CUSTOMIZATION,
    ...initialState,
  });

  const showSweetness = SWEET_CATEGORIES.includes(category.toLowerCase());

  function update(key: keyof CustomizationState, value: string) {
    const next = { ...state, [key]: value };
    setState(next);
    onChange?.(next);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-saffron/5 border border-saffron/20 rounded-2xl p-5"
      data-ocid="product.customization.panel"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-xl bg-saffron/15 flex items-center justify-center shrink-0">
          <span className="text-base leading-none">🎨</span>
        </div>
        <div>
          <h3 className="font-display font-bold text-sm text-foreground leading-tight">
            Customise Your Order
          </h3>
          <p className="text-muted-foreground text-[10px] font-body leading-tight">
            Tell the aunty how you like it cooked
          </p>
        </div>
      </div>

      <div className="space-y-5" aria-label="Food customization options">
        <RadioGroup
          id="spice"
          label="🌶️ Spice Level"
          options={SPICE_OPTIONS}
          value={state.spiceLevel}
          onChange={(v) => update("spiceLevel", v)}
        />

        <div className="border-t border-saffron/10" />

        <RadioGroup
          id="oil"
          label="🫗 Oil Level"
          options={OIL_OPTIONS}
          value={state.oilLevel}
          onChange={(v) => update("oilLevel", v)}
        />

        <div className="border-t border-saffron/10" />

        <RadioGroup
          id="salt"
          label="🧂 Salt Level"
          options={SALT_OPTIONS}
          value={state.saltLevel}
          onChange={(v) => update("saltLevel", v)}
        />

        {showSweetness && (
          <>
            <div className="border-t border-saffron/10" />
            <RadioGroup
              id="sweetness"
              label="🍬 Sweetness Level"
              options={SWEETNESS_OPTIONS}
              value={state.sweetnessLevel}
              onChange={(v) => update("sweetnessLevel", v)}
            />
          </>
        )}

        <div className="border-t border-saffron/10" />

        <RadioGroup
          id="portion"
          label="🍽️ Portion Size"
          options={PORTION_OPTIONS}
          value={state.portionSize}
          onChange={(v) => update("portionSize", v)}
        />
      </div>

      {/* Summary strip */}
      <div className="mt-5 bg-white/60 border border-saffron/15 rounded-xl px-4 py-3">
        <p className="text-[10px] font-body font-semibold text-saffron uppercase tracking-wider mb-1.5">
          Your Selection
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {[
            state.spiceLevel,
            state.oilLevel,
            state.saltLevel,
            ...(showSweetness ? [state.sweetnessLevel] : []),
            state.portionSize,
          ].map((val) => (
            <span
              key={val}
              className="text-[11px] font-body font-semibold text-foreground/80"
            >
              {val}
            </span>
          ))}
        </div>
        <p className="text-muted-foreground text-[10px] font-body mt-1.5 leading-relaxed">
          These preferences will be sent in your WhatsApp order message. The
          aunty will cook exactly to your taste.
        </p>
      </div>
    </motion.div>
  );
}

export { DEFAULT_CUSTOMIZATION, SWEET_CATEGORIES };
export type { CustomizationState as Customization };

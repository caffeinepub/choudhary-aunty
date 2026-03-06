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
  portionSize: "Medium (500g)",
};

const SWEET_CATEGORIES = ["sweets", "ladoo", "barfi", "halwa"];

interface RadioGroupProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

function PillRadioGroup({ label, options, value, onChange }: RadioGroupProps) {
  return (
    <div>
      <p className="text-xs font-body font-semibold text-foreground/70 mb-2 uppercase tracking-wider">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-body font-semibold border transition-all duration-200 ${
                selected
                  ? "bg-saffron text-cream border-saffron shadow-sm"
                  : "bg-background text-foreground/70 border-border hover:border-saffron/50 hover:text-saffron"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface CustomizationWidgetProps {
  category: string;
  onChange?: (state: CustomizationState) => void;
}

export function CustomizationWidget({
  category,
  onChange,
}: CustomizationWidgetProps) {
  const [state, setState] = useState<CustomizationState>(DEFAULT_CUSTOMIZATION);
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
      className="bg-saffron/5 border border-saffron/20 rounded-xl p-5"
      data-ocid="product.customization.panel"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🎨</span>
        <h3 className="font-display font-bold text-base text-foreground">
          Customise Your Order
        </h3>
      </div>

      <div className="space-y-4">
        <PillRadioGroup
          label="Spice Level"
          options={["Low Spice", "Medium Spice", "High Spice"]}
          value={state.spiceLevel}
          onChange={(v) => update("spiceLevel", v)}
        />
        <PillRadioGroup
          label="Oil Level"
          options={["Low Oil", "Medium Oil", "High Oil"]}
          value={state.oilLevel}
          onChange={(v) => update("oilLevel", v)}
        />
        <PillRadioGroup
          label="Salt Level"
          options={["Low Salt", "Medium Salt", "High Salt"]}
          value={state.saltLevel}
          onChange={(v) => update("saltLevel", v)}
        />
        {showSweetness && (
          <PillRadioGroup
            label="Sweetness Level"
            options={["Low Sweet", "Medium Sweet", "High Sweet"]}
            value={state.sweetnessLevel}
            onChange={(v) => update("sweetnessLevel", v)}
          />
        )}
        <PillRadioGroup
          label="Portion Size"
          options={["Small (250g)", "Medium (500g)", "Large (1kg)"]}
          value={state.portionSize}
          onChange={(v) => update("portionSize", v)}
        />
      </div>

      <p className="text-muted-foreground text-[10px] font-body mt-4 leading-relaxed">
        Your preferences will be included in the WhatsApp order message. Our
        aunty will prepare according to your taste.
      </p>
    </motion.div>
  );
}

export { DEFAULT_CUSTOMIZATION, SWEET_CATEGORIES };
export type { CustomizationState as Customization };

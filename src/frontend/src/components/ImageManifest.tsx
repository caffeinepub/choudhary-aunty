/**
 * ImageManifest — hidden component that hardcodes every asset path so the
 * Caffeine build pipeline's image-pruning scanner always finds them and
 * never deletes them. Rendered in App.tsx root layout.
 *
 * Uses position:fixed + opacity:0 + pointer-events:none + size:0 so it is
 * in the DOM but completely invisible and non-interactive.
 */
export function ImageManifest() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        overflow: "hidden",
        opacity: 0,
        pointerEvents: "none",
        zIndex: -9999,
      }}
      aria-hidden="true"
    >
      {/* Generated images */}
      <img
        src="/assets/generated/ambassador-program-hero.dim_800x500.jpg"
        alt=""
      />
      <img
        src="/assets/generated/blog-post-achar-story.dim_800x500.jpg"
        alt=""
      />
      <img
        src="/assets/generated/blog-post-maker-story.dim_800x500.jpg"
        alt=""
      />
      <img
        src="/assets/generated/blog-post-spices-header.dim_800x500.jpg"
        alt=""
      />
      <img
        src="/assets/generated/corporate-orders-hero.dim_800x600.jpg"
        alt=""
      />
      <img src="/assets/generated/customer-kavita.dim_200x200.jpg" alt="" />
      <img src="/assets/generated/customer-meena.dim_200x200.jpg" alt="" />
      <img src="/assets/generated/customer-priya.dim_200x200.jpg" alt="" />
      <img src="/assets/generated/customer-rohit.dim_200x200.jpg" alt="" />
      <img src="/assets/generated/customer-sunita.dim_200x200.jpg" alt="" />
      <img src="/assets/generated/gift-hamper-hero.dim_800x600.jpg" alt="" />
      <img
        src="/assets/generated/hamper-punjabi-tadka.dim_800x600.jpg"
        alt=""
      />
      <img src="/assets/generated/hero-banner.dim_1400x700.jpg" alt="" />
      <img src="/assets/generated/india-map-states.dim_600x700.png" alt="" />
      <img src="/assets/generated/logo-transparent.dim_400x400.png" alt="" />
      <img src="/assets/generated/maker-anju.dim_400x500.jpg" alt="" />
      <img src="/assets/generated/maker-babita.dim_400x500.jpg" alt="" />
      <img src="/assets/generated/maker-geeta.dim_400x500.jpg" alt="" />
      <img src="/assets/generated/maker-preetkaur.dim_400x500.jpg" alt="" />
      <img src="/assets/generated/maker-sarla.dim_400x500.jpg" alt="" />
      <img
        src="/assets/generated/onboarding-hero-aunties.dim_1400x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/onboarding-makers-collage.dim_1200x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/order-tracker-illustration.dim_800x500.jpg"
        alt=""
      />
      <img src="/assets/generated/press-media-hero.dim_800x600.jpg" alt="" />
      <img
        src="/assets/generated/product-aam-papad-punjab.dim_800x600.jpg"
        alt=""
      />
      <img src="/assets/generated/product-achar.dim_600x500.jpg" alt="" />
      <img
        src="/assets/generated/product-aloo-achar-up.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-anarsa-bihar.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-bajra-ladoo-haryana.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-besan-ladoo-up.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-buransh-syrup-uttarakhand.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-chakli-haryana.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-chana-jor-bihar.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-churma-ladoo-haryana.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-gahat-chutney-uttarakhand.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-gajak-punjab.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-gajar-halwa-up.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-ingredients-achar.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-jhangora-kheer-uttarakhand.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-kachri-chutney-haryana.dim_800x600.jpg"
        alt=""
      />
      <img src="/assets/generated/product-kanji-up.dim_800x600.jpg" alt="" />
      <img src="/assets/generated/product-khaja-bihar.dim_800x600.jpg" alt="" />
      <img
        src="/assets/generated/product-ladoo-premium.dim_800x600.jpg"
        alt=""
      />
      <img src="/assets/generated/product-ladoo.dim_600x500.jpg" alt="" />
      <img
        src="/assets/generated/product-makhana-namkeen-bihar.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-mango-chunda-punjab.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-mathri-haryana.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-meet-maker-anju.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-mixed-veg-pickle.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-moong-halwa-haryana.dim_800x600.jpg"
        alt=""
      />
      <img src="/assets/generated/product-murabba-up.dim_800x600.jpg" alt="" />
      <img src="/assets/generated/product-namakpara.dim_600x500.jpg" alt="" />
      <img
        src="/assets/generated/product-pahadi-chips-uttarakhand.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-papad-punjab.dim_800x600.jpg"
        alt=""
      />
      <img src="/assets/generated/product-peda-up.dim_800x600.jpg" alt="" />
      <img src="/assets/generated/product-petha-up.dim_800x600.jpg" alt="" />
      <img
        src="/assets/generated/product-preparation-namakpara.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-saag-masala-punjab.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-sattu-ladoo-bihar.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-singhara-barfi-bihar.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-singri-haryana.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-thekua-bihar.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-tilkut-bihar.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-timru-pickle-uttarakhand.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/product-usp-homemade-vs-factory.dim_800x600.jpg"
        alt=""
      />
      <img src="/assets/generated/product-wadi-punjab.dim_800x600.jpg" alt="" />
      <img
        src="/assets/generated/seasonal-chhath-special.dim_800x500.jpg"
        alt=""
      />
      <img
        src="/assets/generated/seasonal-festivals-banner.dim_1200x600.jpg"
        alt=""
      />
      <img src="/assets/generated/state-banner-bihar.dim_1400x500.jpg" alt="" />
      <img
        src="/assets/generated/state-banner-haryana.dim_1400x500.jpg"
        alt=""
      />
      <img
        src="/assets/generated/state-banner-punjab.dim_1400x500.jpg"
        alt=""
      />
      <img src="/assets/generated/state-banner-up.dim_1400x500.jpg" alt="" />
      <img
        src="/assets/generated/state-banner-uttarakhand.dim_1400x500.jpg"
        alt=""
      />
      <img
        src="/assets/generated/story-anju-enterprise.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/story-anju-first-payment.dim_800x600.jpg"
        alt=""
      />
      <img
        src="/assets/generated/story-anju-grinding-spices.dim_800x600.jpg"
        alt=""
      />
      <img src="/assets/generated/story-anju-kitchen.dim_800x600.jpg" alt="" />
      <img src="/assets/generated/story-anju-young.dim_800x600.jpg" alt="" />
      <img src="/assets/generated/story-young-anju.dim_600x700.jpg" alt="" />
      <img src="/assets/generated/story-young-babita.dim_600x700.jpg" alt="" />
      <img src="/assets/generated/story-young-geeta.dim_600x700.jpg" alt="" />
      <img
        src="/assets/generated/story-young-preetkaur.dim_600x700.jpg"
        alt=""
      />
      <img src="/assets/generated/story-young-sarla.dim_600x700.jpg" alt="" />
      {/* Uploaded images */}
      <img
        src="/assets/uploads/ChatGPT-Image-Mar-5-2026-01_03_13-PM-1.png"
        alt=""
      />
      <img src="/assets/uploads/PHOTO-2026-03-04-22-52-52-1.jpg" alt="" />
    </div>
  );
}

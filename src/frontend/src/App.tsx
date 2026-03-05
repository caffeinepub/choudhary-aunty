import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/hooks/useLanguage";
import AdminPage from "@/pages/AdminPage";
import BecomeAnAuntyPage from "@/pages/BecomeAnAuntyPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import CorporateOrdersPage from "@/pages/CorporateOrdersPage";
import GiftHampersPage from "@/pages/GiftHampersPage";
import HomePage from "@/pages/HomePage";
import HowToOrderPage from "@/pages/HowToOrderPage";
import MakerDetailPage from "@/pages/MakerDetailPage";
import MakersPage from "@/pages/MakersPage";
import OrderTrackerPage from "@/pages/OrderTrackerPage";
import PressPage from "@/pages/PressPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import ShopPage from "@/pages/ShopPage";
import StoryPage from "@/pages/StoryPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  notFound,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";

// ============================================
// ROOT LAYOUT
// ============================================

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}

// ============================================
// NOT FOUND PAGE
// ============================================

function NotFoundPage() {
  return (
    <main className="min-h-screen pt-16 flex items-center justify-center mesh-bg">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4"
      >
        <div className="text-6xl mb-4">🍯</div>
        <h1 className="font-display text-4xl font-bold text-foreground mb-3">
          Page Not Found
        </h1>
        <p className="text-muted-foreground font-body mb-6">
          Looks like this page went missing like the last bit of achar in the
          jar.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-saffron hover:bg-terracotta text-cream font-semibold px-6 py-3 rounded-full font-body transition-colors"
        >
          Back to Home
        </a>
      </motion.div>
    </main>
  );
}

// ============================================
// ROUTES
// ============================================

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const storyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/story",
  component: StoryPage,
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  validateSearch: (search: Record<string, unknown>): { state?: string } => ({
    state: typeof search.state === "string" ? search.state : undefined,
  }),
  component: ShopPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductDetailPage,
});

const makersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/makers",
  component: MakersPage,
});

const makerDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/maker/$id",
  component: MakerDetailPage,
});

const howToOrderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/how-to-order",
  component: HowToOrderPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const orderTrackerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-tracker",
  component: OrderTrackerPage,
});

const giftHampersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gift-hampers",
  component: GiftHampersPage,
});

const corporateOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/corporate-orders",
  component: CorporateOrdersPage,
});

const pressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/press",
  component: PressPage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogPage,
});

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$slug",
  component: BlogPostPage,
});

const becomeAnAuntyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/become-an-aunty",
  component: BecomeAnAuntyPage,
});

// ============================================
// ROUTER
// ============================================

const routeTree = rootRoute.addChildren([
  indexRoute,
  storyRoute,
  shopRoute,
  productRoute,
  makersRoute,
  makerDetailRoute,
  howToOrderRoute,
  adminRoute,
  orderTrackerRoute,
  giftHampersRoute,
  corporateOrdersRoute,
  pressRoute,
  blogRoute,
  blogPostRoute,
  becomeAnAuntyRoute,
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

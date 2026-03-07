import { ImageManifest } from "@/components/ImageManifest";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/hooks/useLanguage";
import AdCampaignDetailPage from "@/pages/AdCampaignDetailPage";
import AdminPage from "@/pages/AdminPage";
import AdsPage from "@/pages/AdsPage";
import AnalyticsDashboardPage from "@/pages/AnalyticsDashboardPage";
import BatchResolutionPage from "@/pages/BatchResolutionPage";
import BecomeAnAuntyPage from "@/pages/BecomeAnAuntyPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import CorporateOrdersPage from "@/pages/CorporateOrdersPage";
import CustomerProfilePage from "@/pages/CustomerProfilePage";
import GiftHampersPage from "@/pages/GiftHampersPage";
import HomePage from "@/pages/HomePage";
import HowToOrderPage from "@/pages/HowToOrderPage";
import LoginPage from "@/pages/LoginPage";
import MakerDashboardPage from "@/pages/MakerDashboardPage";
import MakerDetailPage from "@/pages/MakerDetailPage";
import MakerProfilePage from "@/pages/MakerProfilePage";
import MakersPage from "@/pages/MakersPage";
import MyProfilePage from "@/pages/MyProfilePage";
import OrderTrackerPage from "@/pages/OrderTrackerPage";
import PlatformDashboardPage from "@/pages/PlatformDashboardPage";
import PressPage from "@/pages/PressPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import ShopPage from "@/pages/ShopPage";
import StoryPage from "@/pages/StoryPage";
import CrmAnalyticsPage from "@/pages/crm/CrmAnalyticsPage";
import CrmCampaignsPage from "@/pages/crm/CrmCampaignsPage";
import CrmCustomersPage from "@/pages/crm/CrmCustomersPage";
import CrmPage from "@/pages/crm/CrmPage";
import CrmSettingsPage from "@/pages/crm/CrmSettingsPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { motion } from "motion/react";

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

const customerProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/customer-profile",
  component: CustomerProfilePage,
});

const myProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-profile",
  component: MyProfilePage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const makerProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/maker-profile",
  validateSearch: (search: Record<string, unknown>): { makerId?: string } => ({
    makerId: typeof search.makerId === "string" ? search.makerId : undefined,
  }),
  component: MakerProfilePage,
});

const makerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/maker-dashboard",
  component: MakerDashboardPage,
});

const platformDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/platform-dashboard",
  component: PlatformDashboardPage,
});

const analyticsDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  component: AnalyticsDashboardPage,
});

const batchResolutionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/batch-resolution",
  component: BatchResolutionPage,
});

// ── Ads Routes ──────────────────────────────────────────────────────────────

const adsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ads",
  component: AdsPage,
});

const adCampaignDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ads/$id",
  component: AdCampaignDetailPage,
});

// ── CRM Routes ──────────────────────────────────────────────────────────────

const crmRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/crm",
  component: CrmPage,
});

const crmCustomersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/crm/customers",
  component: CrmCustomersPage,
});

const crmCampaignsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/crm/campaigns",
  component: CrmCampaignsPage,
});

const crmAnalyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/crm/analytics",
  component: CrmAnalyticsPage,
});

const crmSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/crm/settings",
  component: CrmSettingsPage,
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
  customerProfileRoute,
  myProfileRoute,
  loginRoute,
  makerProfileRoute,
  makerDashboardRoute,
  platformDashboardRoute,
  analyticsDashboardRoute,
  batchResolutionRoute,
  adsRoute,
  adCampaignDetailRoute,
  crmRoute,
  crmCustomersRoute,
  crmCampaignsRoute,
  crmAnalyticsRoute,
  crmSettingsRoute,
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
      <AuthProvider>
        <ImageManifest />
        <RouterProvider router={router} />
      </AuthProvider>
    </LanguageProvider>
  );
}

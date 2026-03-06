# Choudhary Aunty — Advertising & Promotion System

## Current State

A fully built homemade regional food marketplace with:
- 5 makers (Bihar, Haryana, Punjab, UP, Uttarakhand) with 10 products each
- Customer login, CRM portal, loyalty program (Rishta Rewards / Asharfi points)
- Maker Dashboard, Platform Dashboard, Admin panel
- WhatsApp-based ordering with 50% advance UPI model
- Authorization component (admin/user/guest roles)
- Backend: Motoko with full product, order, customer, CRM campaign management

## Requested Changes (Diff)

### Add

**Backend:**
- `AdCampaign` type: id, makerId, name, adType, status, dailyBudget, bidPerClick, startDate, endDate, targetState, targetCategory, qualityScore, createdAt, totalSpend, totalImpressions, totalClicks, totalOrders, totalRevenue
- `AdType` variant: `#sponsoredDish | #featuredChef | #categoryPromotion | #cityPromotion`
- `AdBid` type: id, campaignId, productId, bidAmount, adRankScore (= bidAmount × qualityScore × relevanceScore), timestamp
- `AdImpression` type: id, campaignId, productId, makerId, timestamp, converted (Bool)
- `AdClick` type: id, campaignId, productId, makerId, timestamp, costCharged, convertedToOrder (Bool)
- Backend functions:
  - `createAdCampaign(makerId, name, adType, dailyBudget, bidPerClick, targetState, targetCategory)` → CampaignId
  - `updateAdCampaign(campaign)` → ()
  - `pauseAdCampaign(id)` / `resumeAdCampaign(id)` → ()
  - `recordAdImpression(campaignId, productId)` → ()
  - `recordAdClick(campaignId, productId)` → Float (cost charged)
  - `recordAdConversion(campaignId, productId, orderValue)` → ()
  - `getAdCampaignsByMaker(makerId)` → [AdCampaign]
  - `getAllAdCampaigns()` → [AdCampaign] (admin only)
  - `getRankedAds(state, category)` → [AdBid] sorted by ad_rank_score desc (public)
  - `getAdAnalytics(campaignId)` → AdAnalytics record
  - `getPlatformAdRevenue()` → Float (admin only)
- Ad rank formula: `adRankScore = bidAmount × qualityScore × relevanceScore`
- qualityScore seeded at 0.8 (adjustable), relevanceScore computed from state/category match

**Frontend pages:**
- `/ads` — Chef Ads Manager: create/manage campaigns, choose ad type, set budget and bid
- `/ads/new` — New Campaign form
- `/ads/[id]` — Campaign detail with analytics (impressions, clicks, orders, CPO, ROAS)
- `/platform-dashboard` — Add "Ad Revenue" KPI card and ads performance section

**Frontend integrations:**
- Shop page: sponsored dish cards visually marked (gold "Sponsored" badge), ranked higher in results
- Home page: "Featured Chef" section pulls from active featuredChef ad campaigns
- Shop page category view: "Category Promotion" pins appear at top of category
- Shop page state view: "City Promotion" pins appear at top of state section
- Navbar "More" menu: add "Advertise" link pointing to `/ads`

### Modify

- `MakerDashboardPage.tsx` — add "My Ads" tab linking to `/ads` and showing summary stats (total spend, ROAS)
- `PlatformDashboardPage.tsx` — add "Ad Revenue" KPI and ad performance table
- `ShopPage.tsx` — integrate getRankedAds result to reorder and badge sponsored products
- `HomePage.tsx` — Featured Chef section pulls active featured chef ad data

### Remove

Nothing removed.

## Implementation Plan

1. Extend Motoko backend with AdCampaign, AdBid, AdImpression, AdClick types and all ad management functions
2. Regenerate backend.d.ts bindings
3. Build `/ads` Chef Campaign Dashboard: campaign list, status toggles, performance summary cards
4. Build `/ads/new` Create Campaign form: ad type selector, budget, bid, targeting (state/category)
5. Build `/ads/[id]` Campaign Analytics: impressions, clicks, orders, CPO, ROAS charts
6. Integrate sponsored ranking into ShopPage product list (call getRankedAds, reorder, badge)
7. Integrate Featured Chef ads into HomePage featured section
8. Add Ad Revenue KPI to PlatformDashboardPage
9. Add "My Ads" tab/card to MakerDashboardPage
10. Add "Advertise" to navbar More menu

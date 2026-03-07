# Choudhary Aunty

## Current State
Full marketplace platform with 26 pages including home, shop, product detail, maker profiles, admin panel, CRM, ads, analytics, loyalty program, chef onboarding, and more. Backend has comprehensive Motoko with products, orders, makers, CRM, ad campaigns. Last failed feature: Ethical Batch Resolution System.

## Requested Changes (Diff)

### Add
- `/batch-resolution` page (password-protected: `batch2024`)
- BatchResolutionPage.tsx with 5 sections:
  1. KPI strip (Active Batches, At Risk, Merged This Week, Avg Fill Rate)
  2. Active Batches list with color-coded fill bars and Resolve buttons
  3. Resolution Workflow Modal with 4-step decision hierarchy (wait → ask maker → admin confirm → merge with compatibility check)
  4. Batch Traceability Table with batch IDs, multiple-maker badges, certificate viewer
  5. Customer Notification Generator for merged batches
- Route added to App.tsx
- Link in Admin panel quick links and navbar More menu

### Modify
- App.tsx: add batchResolutionRoute
- AdminPage.tsx: add quick link to /batch-resolution
- Navbar: add "Batch Manager" to More dropdown

### Remove
- Nothing

## Implementation Plan
1. Write BatchResolutionPage.tsx (pure frontend, no new backend APIs needed)
2. Add route to App.tsx
3. Add link to AdminPage quick links
4. Add to Navbar More menu
5. Validate and deploy

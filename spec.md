# Choudhary Aunty — Marketplace Core Architecture

## Current State

The platform already has:
- Full product/maker backend (Motoko) with 5 makers, 10 Bihar products, orders, testimonials
- Customer login (`/login`), customer profile (`/my-profile`), CRM portal (`/crm`)
- Maker dashboard (`/maker-dashboard`), platform dashboard (`/platform-dashboard`), admin panel (`/admin`)
- Advertising & promotion system (`/ads`) with auction ranking
- Loyalty program (Rishta Rewards / Asharfi points)
- Shop by state, product detail pages, maker profiles
- Home page, Our Story, Blog, Gift Hampers, Corporate Orders, Press, Order Tracker, Become an Aunty pages
- Order management backend (createOrder, updateOrderStatus, getAllOrders)
- CRM campaigns, customer events, RFM segmentation frontend

## Requested Changes (Diff)

### Add

1. **Chef (Aunty) Self-Registration Flow** — A proper `/chef-register` page where chefs can submit their application (name, phone, city, cuisine specialty, signature dishes) that creates a pending Chef record awaiting admin approval. Separate from the admin-managed onboarding already present.

2. **Chef Dashboard — Full Functional Upgrade**
   - Upload/edit dishes directly from the dashboard (currently admin-only)
   - Set prices, prep time, max orders per day, availability schedule
   - Accept or decline individual orders (order queue view with action buttons)
   - View earnings summary (total revenue, pending payouts, completed)
   - Run promotional campaigns (link to /ads)

3. **Admin Dashboard — Full Approval Workflow**
   - Pending chef approvals list with Approve/Reject actions
   - Pending dish approvals list
   - Kitchen verification checklist (hygiene score, photo review)
   - Chef performance table (orders completed, rating, revenue)
   - Full order monitoring with status update controls

4. **Order Lifecycle — Full 7-Stage State Machine**
   - Current backend uses: pending, confirmed, preparing, dispatched, delivered
   - Upgrade to: order_created → payment_confirmed → chef_acceptance → food_preparation → ready_for_pickup → out_for_delivery → delivered
   - Order tracker page to reflect all 7 stages

5. **Search & Filter — Enhanced Discovery**
   - Search bar across all products by name, ingredient, region
   - Filters: price range, spice level, oil level, rating, availability, diet type
   - Results count display

6. **Chef Onboarding Backend APIs**
   - `submitChefApplication(...)` — creates pending chef record
   - `approveChef(id)` / `rejectChef(id)` — admin approval
   - `updateChefAvailability(id, schedule)` — chef sets daily availability
   - `setMaxOrdersPerDay(id, max)` — chef capacity setting

7. **Dish Management APIs (Chef-side)**
   - `chefCreateProduct(...)` — chef submits dish for approval
   - `chefUpdateProduct(...)` — chef edits their own dish
   - `setDishAvailability(productId, availabilityType)` — today/tomorrow/pre-order/seasonal/festival

8. **Save Favorite Chefs** — Customer can mark a maker as favourite from their profile and maker detail pages

9. **Reorder Feature** — On order history page, one-click reorder sends same product to WhatsApp

### Modify

- **Order Status Enum** — Expand from 5 states to 7 states to match the required lifecycle
- **Maker/Chef type** — Add fields: `verificationStatus`, `cuisineSpecialty`, `maxOrdersPerDay`, `availabilitySchedule`, `yearsExperience`, `approvalStatus`
- **Product type** — Add: `availabilityType`, `prepTime`, `rating`
- **Admin Page** — Add chef approval, dish approval, kitchen verification, chef performance sections
- **Chef Dashboard** — Add order queue, accept/decline actions, dish upload form, earnings view
- **Order Tracker** — Update to show all 7 lifecycle stages
- **My Profile Page** — Add saved favorite chefs, reorder button on order history

### Remove

- Nothing removed (all existing features preserved)

## Implementation Plan

1. Generate new Motoko backend with extended Chef type, 7-stage OrderStatus, chef application workflow, dish availability types, chef-side product management
2. Build `/chef-register` page — chef application form with WhatsApp CTA
3. Upgrade `/maker-dashboard` — add order queue tab, accept/decline buttons, dish upload form, earnings view, availability scheduler
4. Upgrade `/admin` page — add chef approvals tab, dish approvals tab, kitchen verification tab, chef performance table
5. Upgrade `/order-tracker` — show all 7 stages on the timeline
6. Upgrade `/shop` — add full-text search + all filters
7. Upgrade `/my-profile` — add saved makers section, reorder button
8. Upgrade `/maker/$id` detail page — add "Save as Favourite" heart button

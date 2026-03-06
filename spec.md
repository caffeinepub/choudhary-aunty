# Choudhary Aunty

## Current State
A fully built homemade regional food marketplace with:
- 5 pre-seeded makers, 10 products per state (Bihar fully seeded, others via admin)
- Customer login, CRM portal, loyalty (Asharfi) system, advertising/promotion engine
- Basic `/chef-register` page with a single-form application that sends a WhatsApp message
- Maker dashboard with order queue, earnings, and ad campaigns
- Admin panel with chef approvals tab (basic) and dish approval tab

## Requested Changes (Diff)

### Add
- **3-step chef onboarding wizard** on `/chef-register`:
  - Step 1: Personal info (name, phone, email, city, state)
  - Step 2: Kitchen details (address, cuisine type, years experience, specialty dishes)
  - Step 3: Kitchen verification (photo upload placeholder, hygiene checklist 5 items, identity verification acknowledgement)
  - Progress indicator showing step 1/2/3
  - Final success screen with WhatsApp CTA

- **Chef profile preview card** shown on step 3 (how their public profile will look)

- **Admin Chef Verification Panel** (upgrade existing Admin "Chef Approvals" tab):
  - List of pending chef applications with full detail drawer
  - Kitchen hygiene checklist score (out of 5)
  - Approve / Reject buttons with reason
  - Status badges: Pending / Approved / Rejected / Under Review
  - Approved chefs counter and KPI

- **Chef Capacity Settings** (new tab in Maker Dashboard):
  - Max orders per day slider (1–50)
  - Max orders per dish input
  - Preparation time per order selector
  - Available days toggle (Mon–Sun)
  - Menu pause / activate toggle
  - Save button that persists to localStorage

### Modify
- ChefRegisterPage: replace single-form with 3-step wizard (keep WhatsApp CTA on success)
- AdminPage "Chef Approvals" tab: expand from basic list to full verification workflow
- MakerDashboardPage: add "Capacity Settings" tab

### Remove
- Nothing removed

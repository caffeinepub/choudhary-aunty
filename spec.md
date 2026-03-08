# Choudhary Aunty

## Current State
Full-stack marketplace platform with customer pages, maker dashboards, CRM, analytics, ads, and batch management. No dedicated aunty onboarding form or aunty profile page exists.

## Requested Changes (Diff)

### Add
- `/aunty-onboarding` -- internal tool (password: aunty2024) for the onboarding team to fill on call. Multi-section form covering:
  - Personal info: name, DOB, marriage date, family members, earning members, current city/state, birth city/state, complete mailing address, education status, WhatsApp availability, latest personal photo (upload), memory photos (upload, up to 3)
  - Kitchen & food: top 10 dishes she can cook, food types she prepares, selling on other platforms (yes/no + details), part of WhatsApp groups (yes/no)
  - Social media: handles and follower counts for each platform
  - Verification checklist: bank account in own name (yes/no), will send product sample (yes/no + courier method), can 10 people vouch (yes/no), can a family member join video training call (yes/no), who is taking care of family while she works
  - Life story: first 3 wishes from earnings, personal struggle/life story (textarea), who supports her at home to understand the app
  - Status: pending / approved / rejected

- `/aunty-profile/:id` -- customer-facing aunty profile showing name, photo, region, story snippet, top 5 dishes, badges (Verified, Top Seller, etc.)

- `/aunty-registry` -- internal team dashboard (same password: aunty2024) listing all submitted aunty profiles with status filters (all / pending / approved / rejected), quick approve/reject actions

### Modify
- `App.tsx` -- add routes for `/aunty-onboarding`, `/aunty-profile/:id`, `/aunty-registry`
- Footer `Team Portal` section -- add links to Aunty Onboarding and Aunty Registry

### Remove
- Nothing removed

## Implementation Plan
1. Create `AuntyOnboardingPage.tsx` -- password gate + multi-section form with local state (no backend needed, form data stored in localStorage for now)
2. Create `AuntyRegistryPage.tsx` -- password gate + table of mock aunty profiles with status filter + approve/reject buttons
3. Create `AuntyProfilePage.tsx` -- customer-facing profile view using mock data
4. Wire routes in `App.tsx`
5. Add footer links

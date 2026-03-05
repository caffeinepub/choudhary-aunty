# Choudhary Aunty

## Current State
The website has a MakerDetailPage that shows maker profile (photo, bio, story quote, WhatsApp CTA) and product grid. The MakersPage has a grid of maker cards. There is no personal biographical backstory section on either page. The makers page cards link to `/maker/$id` but have no "Her Story" teaser.

## Requested Changes (Diff)

### Add
- `MAKER_STORIES` constant in `src/frontend/src/constants/makerStories.ts` — full biographical data for all 5 makers: DOB, birthPlace, marriedYear, presentLocation, childhoodStory, marriageStruggles, whySheJoined, herDream, fiveBestDishes
- Nostalgic "Her Story" section at the bottom of MakerDetailPage, rendered as a visual timeline / old-photo-album with sepia/earth tones, handwritten-style font moments, aged paper texture backgrounds, marigold accent details
- Story section components: LifeMarkers strip (DOB, birthPlace, married, location), PersonalStoryTimeline (childhood → marriage → struggle → why joined → dream), HerDream closing card
- "Meet Her Story" teaser card/link on maker cards in MakersPage grid
- Story teaser strip on the homepage Featured Makers section

### Modify
- MakerDetailPage: append the HerStorySection below the products grid
- MakersPage maker cards: add a "Read Her Story" link below the existing "Meet X" link
- Homepage maker cards: add small story teaser line and "Her Story" link

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/constants/makerStories.ts` with full biographical data for all 5 makers
2. Generate nostalgic story images (sepia portrait style, village kitchen scene, marigold texture)
3. Build `HerStorySection` component in MakerDetailPage with:
   - Aged paper/sepia visual style using CSS via inline styles or Tailwind arbitrary values
   - LifeMarkers: horizontal row of date/place badges with hand-drawn-style icons
   - PersonalStoryTimeline: vertical timeline cards for each life chapter
   - HerDreamCard: closing emotional card with quote and dream statement
4. Update MakersPage cards to show "Read Her Story" teaser link
5. Update HomePage featured makers section to include story teaser

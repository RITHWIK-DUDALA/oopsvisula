# Task Record: OOPS-20261105-0100 — Apply Cloud Component to All White Cards with No Blue Outline

## 1. Context and Objective
- **User Instruction:** "apply same cloud component to all othre white cards with no blue outlinee"
- **User Attached Screenshots:**
  1. Section 4 (Simulation Pipeline) & Section 5 (Privacy & Governance): Showing Card 3 (Isolated Container Runner) with a blue top border and blue outline (`border-t-4 border-t-[#2463EB]`, `border-[#BFDBFE]/70`).
  2. Section 3 (Core Capabilities): 4 architecture pillar cards.
  3. Section 2 (Memory Visualizer): Interactive concept simulation panel, Call Stack, Java 21 Code Snippet, JVM Eden Heap with heavy black outline, and preview bar.
- **Goal:**
  - Apply the authentic volumetric cloud material system from the final CTA section to all white cards and panels across the landing page.
  - Eliminate all blue borders/outlines (`border-t-4 border-t-[#2463EB]`, `border-[#BFDBFE]`, `hover:border-[#2463EB]`) from card elements.
  - Standardize all cards to clean, translucent, volumetric cloud-white surfaces with sunlit crest highlights, delicate sunset peach reflections, and neutral borders (`border-white/95`).
  - Maintain 100% sharp text, syntax highlighting, and interactive button functionality.

---

## 2. Technical Root Causes & Diagnoses
1. **Blue Border on Privacy Card 3:**
   - In `LandingPage.tsx`, Privacy & Governance Card 3 had explicit styling `border border-[#BFDBFE]/70 border-t-4 border-t-[#2463EB]`, causing a harsh blue stripe along the top and blue borders around the card.
   - Simulation Pipeline cards 1 & 4 had `hover:border-[#2463EB]`.
   - Core Capabilities cards 1 & 4 had `hover:border-[#2463EB]/40`.
2. **Card Visual Appearance:**
   - Previous card backgrounds had high opacity (`bg-[rgba(255,255,255,0.94)]`) and overlaid heavy white gradients over a low-opacity (35%) cloud texture, resulting in a washed-out, flat white card appearance.
   - The JVM Eden Heap card also had a harsh `border-2 border-[#111111]`.

---

## 3. Implementation Details
1. **`CloudSurface.tsx` Upgrade (`frontend/src/features/landing/components/CloudSurface.tsx`):**
   - Calibrated base translucency to `bg-[rgba(255,255,255,0.86)]` for panels, `bg-[rgba(255,255,255,0.89)]` for cards, and `bg-[rgba(255,255,255,0.82)]` for subtle panels.
   - Set the cumulus cloud texture (`/images/realistic-cumulus-cloud.png?v=9`) to `scale-100` and `opacity-65` (cards) / `opacity-60` (panels) with enhanced contrast (`contrast-[1.14]`, `brightness-[1.02]`, `saturate-[1.08]`) so the volumetric billows and crests are clearly discernible.
   - Embedded sunlit crest highlight (top-left, 80% opacity), sunset peach warm underbelly glow (bottom-right, 55% opacity), and sky blue atmosphere reflection (bottom-left, 40% opacity).
   - Standardized borders to pure neutral cloud-white (`border-white/95`) with zero blue tints.
   - Added volumetric box shadow: `shadow-[0_10px_30px_rgba(20,50,90,0.05),0_2px_8px_rgba(20,50,90,0.02),inset_0_1px_1px_rgba(255,255,255,0.98)]` and smooth hover elevation.

2. **`LandingPage.tsx` Sanitization (`frontend/src/features/landing/LandingPage.tsx`):**
   - **Section 2 (Memory Visualizer):** Removed `border-2 border-[#111111]` from JVM Eden Heap card; unified with standard `CloudSurface variant="card"`.
   - **Section 3 (Core Capabilities):** Removed all colored hover outlines (`hover:border-[#2463EB]/40`, `hover:border-[#F47B20]/40`, `hover:border-[#F5BD24]/50`); replaced with standard cloud hover elevation (`shadow-2xs hover:shadow-md`).
   - **Section 4 (Simulation Pipeline):** Removed colored hover borders (`hover:border-[#2463EB]`, `hover:border-[#F47B20]`, `hover:border-[#F5BD24]`) from all 4 step cards; unified on cloud card styling.
   - **Section 5 (Privacy & Governance):** Removed `border-t-4 border-t-[#2463EB]` and `border-[#BFDBFE]/70` from Card 3; removed colored top borders from Card 1 and Card 2; all 3 cards now use pure, elegant cloud card surfaces with neutral borders.

---

## 4. Verification & Validation
- **TypeScript Compilation:** `pnpm exec tsc --noEmit` passed with 0 errors.
- **Production Build:** `pnpm run build` completed successfully in 25.54s (2,285 modules transformed).
- **Knowledge Graph:** Graphify local knowledge graph updated (`1,775 nodes, 2,818 edges, 171 communities`).
- **Live Server:** Vite dev server running on port 5173 with clean HMR updates.


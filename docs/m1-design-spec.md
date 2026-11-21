# CineVault 2.0 — Milestone 1 Design Specification
**Visual Direction: Modern Film Journal (Revised & Verified)**

---

## 1. Executive Summary & Design Philosophy

Milestone 1 establishes the visual and structural foundation of CineVault 2.0 under the **Modern Film Journal** creative direction. The platform is designed as an authoritative, high-elegance editorial publication combined with a modern media discovery interface.

### Core Principles
1. **Editorial Restraint:** Print-inspired discipline, generous white space, hairline rules, and asymmetric composition over generic SaaS layouts.
2. **Cinematic Hero Priority:** The hero section is the single strongest visual element on the page—uncluttered, striking, static (no jarring autoplay carousels), and photographically dominant.
3. **Data Integrity & Truthfulness:** Zero fabricated release dates, zero fake countdowns, zero fictional awards or quotes. Real film metadata is used in all demo states, and all static preview items are transparently labeled.
4. **Accessible & Inclusive:** Every color pair strictly verified against WCAG 2.1 AA standards (minimum 4.5:1 for normal text). Platform-aware keyboard accessibility (`Cmd+K` on macOS, `Ctrl+K` on Windows/Linux).
5. **Strict Milestone Boundaries:** Milestone 1 is **strictly visual and structural**. It contains no live TMDB fetching, no Supabase database integration, no active authentication, and no persistent watchlists.

---

## 2. Color Palette & WCAG 2.1 AA Contrast Verification

The color system emulates archival paper stock, carbon ink, and celluloid warm tones. Every text/background combination has been mathematically verified against WCAG 2.1 AA standards for normal text (minimum 4.5:1):

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ARCHIVAL CELLULOID PALETTE                            │
├─────────────────────┬──────────────┬────────────────────────────────────────┤
│ Token Name          │ Value (HEX)  │ Role                                   │
├─────────────────────┼──────────────┼────────────────────────────────────────┤
│ `paper-canvas`      │ #F9F8F6      │ Primary Page Background (Warm Ivory)   │
│ `paper-surface`     │ #F2EFE9      │ Layered Containers & Editorial Panels  │
│ `paper-rule`        │ #E2DDD5      │ 1px Hairline Column Dividers           │
│ `paper-highlight`   │ #E8E4DC      │ Interactive Hover & Chip Backgrounds   │
├─────────────────────┼──────────────┼────────────────────────────────────────┤
│ `ink-primary`       │ #121316      │ Headings, Titles & Primary Text        │
│ `ink-muted`         │ #484B52      │ Body Text, Synopses & Subheadings      │
│ `ink-caption`       │ #575B62      │ Metadata, Timestamps & Labels          │
├─────────────────────┼──────────────┼────────────────────────────────────────┤
│ `accent-warm`       │ #C2410C      │ Terracotta / Burnt Sienna (Primary CTA)│
│ `accent-hover`      │ #9A3412      │ Deep Terracotta (Hover States)         │
│ `accent-wash`       │ #FAF0EB      │ Soft Terracotta Tint for Active Badges │
│ `rating-gold`       │ #9A4E08      │ Deep Antique Amber for TMDB Scores     │
└─────────────────────┴──────────────┴────────────────────────────────────────┘
```

### Contrast Ratio Mathematical Audit (Standard Relative Luminance Formula)

Formula:
$$L = 0.2126 \times R_{\text{linear}} + 0.7152 \times G_{\text{linear}} + 0.0722 \times B_{\text{linear}}$$
$$\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05} \quad (L_1 > L_2)$$

| Foreground Token | HEX Code | Background | Relative Luminance ($L_1, L_2$) | Contrast Ratio | WCAG 2.1 AA Status | Evaluation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`ink-primary`** | `#121316` | `#F9F8F6` (Canvas) | $L_{\text{bg}}=0.9393, L_{\text{fg}}=0.0065$ | **17.50:1** | **PASS (AAA)** | Outstanding optical contrast for headlines, serif titles, and primary reading. |
| **`ink-muted`** | `#484B52` | `#F9F8F6` (Canvas) | $L_{\text{bg}}=0.9393, L_{\text{fg}}=0.0702$ | **8.23:1** | **PASS (AAA)** | High clarity for editorial synopses, article bodies, and subheads. |
| **`ink-caption`** | `#575B62` | `#F9F8F6` (Canvas) | $L_{\text{bg}}=0.9393, L_{\text{fg}}=0.1039$ | **6.43:1** | **PASS (AA)** | Exceeds the 4.5:1 minimum for metadata, timestamps, and credit lines. |
| **`ink-caption`** | `#575B62` | `#F2EFE9` (Surface) | $L_{\text{bg}}=0.8649, L_{\text{fg}}=0.1039$ | **5.94:1** | **PASS (AA)** | Fully compliant when set against secondary editorial panels and callouts. |
| **`accent-warm`** | `#C2410C` | `#F9F8F6` (Canvas) | $L_{\text{bg}}=0.9393, L_{\text{fg}}=0.1528$ | **4.88:1** | **PASS (AA)** | Compliant for standalone text links, active tab indicators, and border rules. |
| **White on Accent**| `#FFFFFF` | `#C2410C` (Button) | $L_{\text{fg}}=1.0000, L_{\text{bg}}=0.1528$ | **5.18:1** | **PASS (AA)** | Sharp, compliant contrast for primary button labels. |
| **`rating-gold`** | `#9A4E08` | `#F9F8F6` (Canvas) | $L_{\text{bg}}=0.9393, L_{\text{fg}}=0.1234$ | **5.71:1** | **PASS (AA)** | Compliant antique amber for numerical TMDB scores against canvas. |
| **`rating-gold`** | `#9A4E08` | `#F2EFE9` (Surface) | $L_{\text{bg}}=0.8649, L_{\text{fg}}=0.1234$ | **5.28:1** | **PASS (AA)** | Compliant antique amber for numerical TMDB scores against surface panels. |

---

## 3. Typography Hierarchy & Platform-Aware Typographic System

We combine optical editorial serifs with a legible grotesque sans-serif and an architectural monospace:

* **Display & Editorial Titles:** `Newsreader` (optical weights 400, 500, 600, and italic).
* **Interface & Body Copy:** `Plus Jakarta Sans` / `Instrument Sans` (weights 400, 500, 600).
* **Metadata, Scores & Tags:** `Space Mono` / `JetBrains Mono` (weights 400, 700).

### Typographic Scale

| Style Level | Font Family | Size (Desktop / Mobile) | Line Height | Tracking | Weight |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display 1 (Hero Title)** | Serif (`Newsreader`) | `3.75rem` (60px) / `2.25rem` (36px) | `1.05` | `-0.025em` | SemiBold (600) |
| **Headline 2 (Section)** | Serif (`Newsreader`) | `2.25rem` (36px) / `1.75rem` (28px) | `1.15` | `-0.02em` | Medium (500) |
| **Headline 3 (Card Title)**| Serif (`Newsreader`) | `1.25rem` (20px) / `1.125rem` (18px)| `1.25` | `-0.015em` | SemiBold (600) |
| **Lead Subhead** | Sans (`Plus Jakarta Sans`)| `1.125rem` (18px) / `1.0rem` (16px) | `1.55` | `0em` | Regular (400) |
| **Body (UI Default)** | Sans (`Plus Jakarta Sans`)| `0.9375rem` (15px) / `0.875rem` (14px)| `1.50` | `0em` | Regular / Medium |
| **Technical Metadata** | Mono (`Space Mono`) | `0.75rem` (12px) / `0.6875rem` (11px)| `1.30` | `+0.05em` | Medium (500) |

### Platform-Aware Shortcut Detection
The global search shortcut dynamically detects the user's operating system:
* **macOS / iOS:** Renders as `⌘K` (Command + K).
* **Windows / Linux / Android:** Renders as `Ctrl+K`.
* **Fallback:** Defaults to `Ctrl+K` if OS detection is indeterminate.

---

## 4. Homepage Component Specifications

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ GLOBAL HEADER: Colophon Strip + Wordmark + Nav Links + Search [⌘K] + Profile │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ EDITORIAL HERO (The Visual Focal Point — Static, High-Impact)               │
│ ┌─────────────────────────────────────────────────────────┬───────────────┐ │
│ │                                                         │ [CURATOR'S]   │ │
│ │  PANORAMIC CINEMATIC STILL (2.39:1)                     │               │ │
│ │  High-definition, curated still, zero autoplay          │ HEADLINE      │ │
│ │  Discrete photo credit stamp                            │ SYNOPSIS      │ │
│ │                                                         │ METADATA      │ │
│ │                                                         │ TWO CTAs ONLY │ │
│ └─────────────────────────────────────────────────────────┴───────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ TRENDING REPERTOIRE (Asymmetric Broadsheet Composition — No Card Clones)    │
│ ┌───────────────────────────┬───────────────────────────┬─────────────────┐ │
│ │ LEAD CRITIC FOCUS         │ DUAL DIALOGUE FRAMES      │ COMPACT DIGEST  │ │
│ │ Vertical 3:4 portrait     │ Two 16:9 landscape stills │ Ranked #4 to #6 │ │
│ │ Real metadata & note      │ Real verified titles      │ Text + ISO date │ │
│ └───────────────────────────┴───────────────────────────┴─────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ RELEASE RADAR PREVIEW (Static M1 Prototype with Disclaimers)                │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [NOTICE: Static M1 Demo. Live TMDB Regional Dates Connect in Milestone 8]│ │
│ ├───────────────────┬───────────────────┬───────────────────┬─────────────┤ │
│ │ RELEASING TODAY   │ THIS WEEK         │ COMING SOON       │ CALENDAR    │ │
│ │ Verified date     │ Verified date     │ Verified date     │ Preview link│ │
│ └───────────────────┴───────────────────┴───────────────────┴─────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ CURATOR'S RETROSPECTIVE: The Celluloid Archive                              │
│ Focused director spotlight or historic film movement with still and notes   │
├─────────────────────────────────────────────────────────────────────────────┤
│ FOOTER: Colophon, TMDB Attribution, No-Showtimes Notice, Region Selector   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### A. Global Header (`Navbar.tsx`)
* **Top Colophon Strip:**
  * Left: `"CINEVAULT JOURNAL // FILM & TELEVISION ARCHIVE"`
  * Center: Today's current formatted date (e.g. `"SATURDAY, NOVEMBER 21, 2026"`)
  * Right: Regional Context Indicator (`"REGION: INDIA [IN]"` with region toggle modal trigger)
* **Main Navigation Bar:**
  * **Brand Mark:** `"C I N E V A U L T"` in Newsreader serif with `2.0` mono badge.
  * **Primary Links:**
    * `Discover` (Active route with subtle terracotta underline indicator)
    * `Movies`
    * `TV Shows`
    * `Release Radar` (With tiny live indicator dot)
  * **Search Trigger:** Platform-aware input button displaying `"Search archives..."` and `[⌘K]` or `[Ctrl+K]`.
  * **User Profile Trigger:** Clean icon/avatar placeholder indicating guest state.
* **Mobile Behavior:**
  * Fixed top bar with wordmark, platform-aware search icon, and hamburger menu.
  * Expands to a clean editorial drawer with generous typographic spacing.

---

### B. Editorial Hero (`HeroDispatch.tsx`) — The Visual Anchor
* **Priorities:**
  * **Static & Non-Distracting:** Strictly no autoplay carousels, timers, or sliding banners.
  * **Photographic Dominance:** Large 2.39:1 widescreen frame featuring high-definition, verified cinematography (e.g., *Dune: Part Two*).
  * **Elegant Spacing:** Generous negative space between image, typography, and technical metadata.
  * **Minimal Actions (Two Only):**
    1. Primary CTA: `"Explore Feature"` (Solid terracotta `#C2410C` button).
    2. Secondary CTA: `"Save to Vault"` (Hairline outline button with bookmark icon).
* **Metadata Structure (Verified Real Metadata):**
  * Kicker: `[ CURATOR'S FEATURE // DISPATCH ]`
  * Title: `"Dune: Part Two"` (60px Newsreader Serif)
  * Director & Cinematographer: `"Directed by Denis Villeneuve • Cinematography by Greig Fraser"`
  * Synopsis: High-quality, neutral editorial summary (3 sentences maximum).
  * Technical Stamp: `2024 • 166 MIN • CERT: UA • TMDB: ★ 8.5/10 (14,200 VOTES)`

---

### C. Trending Repertoire (`TrendingRepertoire.tsx`)
* **Layout Design:** Eliminates repetitive card carousels in favor of an asymmetric 3-column broadsheet:
  * **Column 1 (Lead Focus - 40% width):** Large 3:4 portrait frame, title, ranking `#01`, verified synopsis excerpt, and director credit.
  * **Column 2 (Dual Frames - 35% width):** Two stacked 16:9 landscape stills with ranking numbers `#02` and `#03`, titles, and release years.
  * **Column 3 (Critical Digest - 25% width):** Clean typographic list for rankings `#04`, `#05`, and `#06` displaying rank, title, year, and TMDB score.
* **Hover Interaction:** Subtle, restrained scale (`1.015`) of the image inside an `overflow-hidden` container with a 250ms ease-out curve.

---

### D. Release Radar Preview (`ReleaseRadarPreview.tsx`)
* **Strict Integrity Guardrails:**
  * Must **never display fabricated release dates or countdowns**.
  * Prominent demo badge:  
    `[ PROTOTYPE PREVIEW — Live regional dates & streaming tracking connect in Milestone 8 ]`
  * Real, historically verified dates used for all demo items.
  * **Theatrical Listings vs. Ticket Showtimes Notice:**  
    A persistent informational label states:  
    *"Release dates indicate regional theatrical debuts or digital drops. CineVault does not provide live cinema showtimes or ticket booking."*
* **Preview Content Categories:**
  * **Releasing This Week:** Verified film titles with exact calendar dates.
  * **In Theaters:** Current theatrical titles with official censor certifications.
  * **Coming Soon:** Verified future releases with official announcement dates.
  * **Actions:** Non-functional visual demo triggers ("Notify Me") that display an informational toast explaining that notifications activate in Milestone 8.

---

### E. Curator's Retrospective (`CuratorFocus.tsx`)
* A full-width editorial panel in `paper-surface` (`#F2EFE9`) with top/bottom hairline borders.
* Focuses on an authentic film movement or auteur (e.g., *"The Visual Poetry of Edward Yang"* or *"The New Hollywood Era"*).
* Includes an archival film still, verified historical context, and 3 linked masterpiece recommendations.

---

### F. Global Footer (`Footer.tsx`)
* **Colophon:** Statement of CineVault 2.0's engineering architecture and editorial purpose.
* **Navigation Index:** Structured links categorized under Exploration, Release Radar, Technical Architecture, and Source Code.
* **Legal & Third-Party Attribution:**
  * Official TMDB attribution badge and disclaimer:  
    *"This product uses the TMDB API but is not endorsed or certified by TMDB."*
  * Cinema showtimes disclaimer:  
    *"CineVault provides informational release schedules and streaming availability. We do not provide real-time cinema seat availability or ticket sales."*
  * IMDb external reference disclaimer:  
    *"External ratings and cast filmographies reference official TMDB and IMDb public records."*

---

## 5. Expanded Viewport & Responsive Testing Matrix

The layout will be formally verified across 7 distinct responsive breakpoints:

| Viewport Category | Width Range | Target Devices | Layout Behavior |
| :--- | :--- | :--- | :--- |
| **1. Extra Small Mobile** | `320px – 374px` | iPhone SE, Galaxy Mini | Single-column stack. Font size drops from 60px to 28px. Hairline rules span full width. Header collapses to logo, search icon, and menu toggle. |
| **2. Standard Mobile** | `375px – 429px` | iPhone 13/14/15, Pixel | Single-column stack. Hero displays 16:9 image with stacked metadata underneath. Trending cards stack vertically. |
| **3. Large Mobile** | `430px – 767px` | iPhone Pro Max, Galaxy Ultra | Single-column with increased padding (`px-6`). Action buttons fit side-by-side. Release radar displays horizontal swipeable card list. |
| **4. Tablet** | `768px – 1023px` | iPad, Galaxy Tab | 2-column asymmetric layout. Colophon header reveals full date and region badge. Trending repertoire adopts a 2-column grid. |
| **5. Laptop** | `1024px – 1279px`| MacBook Air, 13" laptops | Full 12-column broadsheet layout. Hero displays split media/text panel. All navigation links visible. |
| **6. Desktop** | `1280px – 1535px`| 24" & 27" monitors | Optimal viewing experience. 12-column layout with 40/35/25 trending split. Maximum container width: `1280px`. |
| **7. Ultrawide** | `1536px – 2560px+`| 34" Ultrawide, 4K displays| Container width strictly capped at `1440px` (`max-w-7xl mx-auto`) with balanced margins to prevent awkward typographic stretching. |

---

## 6. Milestone Component Boundary & Roadmap Matrix

To maintain clean engineering discipline, the boundary between Milestone 1 and future milestones strictly matches our approved roadmap:

```
┌──────────────────────────────────────┬──────────────┬───────────────────────────────┐
│ Feature / Capability                 │ Milestone    │ Status in Milestone 1         │
├──────────────────────────────────────┼──────────────┼───────────────────────────────┤
│ Editorial Theme Tokens & Typography  │ Milestone 1  │ APPROVED SCOPE — NOT YET IMPL │
│ Global Header & Colophon Nav Bar     │ Milestone 1  │ APPROVED SCOPE — NOT YET IMPL │
│ Static Editorial Hero Frame          │ Milestone 1  │ APPROVED SCOPE — NOT YET IMPL │
│ Asymmetric Trending Repertoire Grid  │ Milestone 1  │ APPROVED SCOPE — NOT YET IMPL │
│ Release Radar UI Prototype (Static)  │ Milestone 1  │ APPROVED SCOPE — NOT YET IMPL │
│ Curator Focus Retrospective Panel    │ Milestone 1  │ APPROVED SCOPE — NOT YET IMPL │
│ Global Editorial Colophon Footer     │ Milestone 1  │ APPROVED SCOPE — NOT YET IMPL │
├──────────────────────────────────────┼──────────────┼───────────────────────────────┤
│ Live TMDB API Client & Caching Layer │ Milestone 2  │ NOT in M1 (Mock data only)    │
│ Dynamic Movie / TV Discovery Feeds   │ Milestone 2  │ NOT in M1 (Mock data only)    │
│ Media Detail Pages & Trailers (/m/:id)│ Milestone 3 │ NOT in M1                     │
│ Region-Aware Watch Providers         │ Milestone 3  │ NOT in M1                     │
│ Omni-Search & Command Palette (⌘K)   │ Milestone 4  │ NOT in M1 (Static trigger only│
│ Supabase Authentication & Database   │ Milestone 5  │ NOT in M1 (No auth flow)      │
│ PostgreSQL Schemas & RLS Security    │ Milestone 5  │ NOT in M1 (No database)       │
│ Watchlist, Favorites & User Profiles │ Milestone 6  │ NOT in M1 (No persistence)    │
│ Reviews, Ratings & Comprehensive QA  │ Milestone 7  │ NOT in M1 (Smoke suite only)  │
│ Release Radar Engine (Live Dates/IN) │ Milestone 8  │ NOT in M1 (No live dates/cron)│
│ AI-Powered Movie Recommendations     │ Milestone 9  │ NOT in M1                     │
│ PWA, Offline & Production Deployment │ Milestone 10 │ NOT in M1                     │
├──────────────────────────────────────┼──────────────┼───────────────────────────────┤
│ Custom Collections Builder           │ Unassigned   │ UNASSIGNED / FUTURE ROADMAP   │
└──────────────────────────────────────┴──────────────┴───────────────────────────────┘
```

---

## 7. Next Actions (Upon Explicit Approval)

Once approved, the implementation of Milestone 1 will proceed in these exact steps:
1. Update `tailwind.config.js` with the verified `paper-*`, `ink-*`, `accent-warm`, and `rating-gold` color tokens.
2. Link Google Fonts (`Newsreader`, `Plus Jakarta Sans`, `Space Mono`) in `index.html`.
3. Create the 6 core visual components: `Navbar`, `HeroDispatch`, `TrendingRepertoire`, `ReleaseRadarPreview`, `CuratorFocus`, and `Footer`.
4. Run `npm run build` and `npm test` to verify zero TypeScript errors and passing smoke tests.
5. Launch the development server and verify rendering across all 7 viewports.
6. Present the live preview for your personal review and commit approval.

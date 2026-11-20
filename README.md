# CineVault 2.0 🎬

> **The Next-Generation Cinematic & Television Discovery Platform**  
> *Engineered with modern full-stack architecture, dark cinema aesthetics, and real-time regional release intelligence.*

---

## 🌟 Product Vision

CineVault 2.0 is a portfolio-grade, cinematic media discovery and personal library application designed for film enthusiasts, series bingers, and cinema purists. It marries an immersive, dark-mode-first aesthetic with a resilient, type-safe software engineering foundation.

### Key Highlights
* **Cinematic Experience:** Atmospheric glow tokens, glassmorphism, responsive hero backdrops, and integrated high-definition trailer playback.
* **Regional Release Radar:** Advanced release discovery engine featuring Indian theatrical release dates, regional calendars, upcoming OTT premiere countdowns, and "Notify Me" tracking.
* **Stream / Rent / Buy Availability:** Transparent, region-aware TMDB Watch Providers integration (powered by JustWatch metadata).
* **Data Transparency:** Dedicated TMDB ratings with vote counts and external IMDb references (no misrepresented rating badges).
* **Cloud Sync:** Supabase PostgreSQL with strict Row-Level Security (RLS) policies for watchlists, custom collections, and spoiler-flagged reviews.
* **Omni-Search:** Instant `Cmd+K` global command bar with debounced multi-search across movies, TV series, and actors.
* **Offline-Ready PWA:** Service worker caching and graceful offline viewing for saved libraries.

---

## 🛠️ Technology Stack (Mutually Compatible LTS)

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Bundler & Dev Server** | [Vite](https://vitejs.dev/) | `^5.4.11` | Instant HMR, ES module bundling, zero cold starts |
| **UI Framework** | [React](https://react.dev/) | `^18.3.1` | Declarative component architecture |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `^5.6.3` | End-to-end type safety, strict null checking |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `^3.4.14` | Custom cinema dark theme, micro-utilities |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | `^11.11.11` | Spring physics, layout transitions, exit anims |
| **Client UI State** | [Zustand](https://github.com/pmndrs/zustand) | `^5.0.1` | Ephemeral UI state (modals, drawers, palette) |
| **Icons** | [Lucide React](https://lucide.dev/) | `^0.454.0` | Accessible, tree-shakeable SVG icons |
| **Unit Testing** | [Vitest](https://vitest.dev/) | `^2.1.4` | Vite-native fast test runner |
| **DOM Testing** | [Testing Library](https://testing-library.com/) | `^16.0.1` | User-centric UI and accessibility assertions |

---

## 🗺️ Engineering Roadmap & Milestones

### Core MVP Releases (v1.0)

* [x] **Milestone 0: Tooling, Architecture & Design Scaffolding** *(Current)*
  * Vite 5 + React 18 + Strict TypeScript environment.
  * Tailwind CSS with dark cinema design tokens (Obsidian `#080B11`, Crimson `#E50914`, Gold `#F5C518`).
  * Path alias mapping (`@/*`), Zustand store foundation, and passing Vitest smoke suite.
* [ ] **Milestone 1: Cinematic Shell, Navigation & Responsive Layout**
  * Glassmorphism top navigation bar with scroll threshold blur.
  * Responsive mobile navigation drawer and global footer with TMDB attribution.
  * Dynamic Hero Showcase component with trailer trigger button.
* [ ] **Milestone 2: TMDB API Layer, Resilient Client & Discovery Feeds**
  * Centralized TMDB HTTP client with exponential backoff and rate-limit handling (HTTP 429).
  * TanStack Query caching (`staleTime: 10 min`).
  * Trending This Week, Top Rated Movies, Popular TV Series, and Now Playing carousels.
* [ ] **Milestone 3: Deep Media Details, Trailer Modal & Watch Providers**
  * Dynamic detail pages (`/movie/:id`, `/tv/:id`) with full-bleed backdrops and certifications.
  * Embedded YouTube player modal for official trailers.
  * Cast & Crew horizontal carousel.
  * Region-aware Watch Providers (Stream, Rent, Buy).
* [ ] **Milestone 4: Actor & Person Profiles (`/person/:id`)**
  * Dedicated actor and filmmaker profiles with biography and chronological filmography.
* [ ] **Milestone 5: Omni-Search & Command Palette (`Cmd+K`)**
  * Keyboard-accessible `Cmd+K` / `Ctrl+K` command dialog.
  * Debounced multi-search querying Movies, TV Shows, and People.
* [ ] **Milestone 6: Supabase Auth, Watchlists & Favorites**
  * User registration and authentication via Supabase Auth.
  * Cloud-persisted Watchlist and Favorites with optimistic UI updates.
  * PostgreSQL Row-Level Security (RLS) enforcement.
* [ ] **Milestone 7: Comprehensive Testing Suite & Quality Assurance**
  * Unit tests with Vitest, component tests with React Testing Library, and E2E flows with Playwright.
  * WCAG 2.1 AA accessibility audit.

### Post-MVP Releases (v2.0 / v2.1)

* [ ] **Milestone 8: RELEASE RADAR — New Releases & Upcoming Movies and Shows**
  * Recently Released & Upcoming Movies and TV shows.
  * Releasing Today & Releasing This Week curated tabs.
  * Monthly interactive release calendar.
  * **India-specific theatrical release dates** via TMDB release-dates endpoint (`ISO 3166-1` `IN`).
  * Theatrical vs. OTT release timeline distinction.
  * Live release countdown timers and "Notify Me" alerts.
* [ ] **Milestone 9: Custom Collections, User Reviews & Watch History**
  * Custom user-curated public/private collections.
  * Star ratings (1–10) and reviews with spoiler masking.
  * Automatic watch history logger.
* [ ] **Milestone 10: AI Movie Assistant**
  * Secure server-proxied natural language cinematic recommendations grounded in TMDB data.
* [ ] **Milestone 11: PWA Offline Support, Performance & Vercel Deployment**
  * Service worker caching with `vite-plugin-pwa` and offline fallback.
  * Lighthouse score optimization and production launch on Vercel.

---

## 🚦 Local Development Setup

### 1. Prerequisites
* **Node.js:** v18.0.0 or higher (v24.15+ recommended)
* **npm:** v9.0.0 or higher

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Devansh0Tyagi-Codes/cinevault-2.0.git
cd cinevault-2.0

# Install dependencies
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env` and fill in your keys:
```bash
cp .env.example .env
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Run Test Suite
```bash
# Run unit & smoke tests
npm test

# Run tests in watch mode
npm run test:watch
```

### 6. Production Build
```bash
npm run build
npm run preview
```

---

## 🔒 Security & Git Workflow

* **Protected Branch:** `main` holds production-verified code.
* **Feature Branches:** All work is staged on branches such as `feat/m0-scaffolding`.
* **Conventional Commits:** Follows the standard (`feat:`, `fix:`, `test:`, `chore:`, `refactor:`).
* **Secret Hygiene:** Environment files (`.env`) are strictly ignored by Git and never committed.

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

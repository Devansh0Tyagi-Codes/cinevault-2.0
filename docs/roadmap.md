# CineVault 2.0 — Product Roadmap & Milestone Matrix

**Updated:** November 2026  
**Product Strategy:** Premium Dark Cinematic Movie Discovery & Release-Tracking Platform  
**Visual Direction:** Dark Cinematic Discovery (inspired by Moctale's product philosophy; original CineVault identity)  

---

## 1. Executive Roadmap Overview

```
┌─────────────┬───────────────────────────────────────────┬───────────────┬───────────────────────────────┐
│ Milestone   │ Objective / Capability                    │ Status        │ Target Branch                 │
├─────────────┼───────────────────────────────────────────┼───────────────┼───────────────────────────────┤
│ Milestone 0 │ Foundation, Scaffolding & CI Pipeline     │ COMPLETED     │ `feat/m0-scaffolding` (34cb935│
│ Milestone 1 │ Shell & Layout (Editorial Proto)          │ COMPLETED     │ `feat/m1-shell` (c35ad13)     │
│ Milestone 2 │ Dark Cinematic Discovery & TMDB Services  │ IN PROGRESS   │ `feat/m2-discovery`           │
│ M2.5        │ Community Verdicts (UI & Local Store)     │ UPCOMING      │ `feat/m2-discovery`           │
│ Milestone 3 │ Media Details, Trailers & Watch Providers │ UPCOMING      │ `feat/m3-details`             │
│ Milestone 4 │ Omni-Search & Command Palette (Ctrl+K)    │ UPCOMING      │ `feat/m4-search`              │
│ Milestone 5 │ Supabase Auth & PostgreSQL Verdicts DB    │ UPCOMING      │ `feat/m5-backend`             │
│ Milestone 6 │ Watchlist, Favorites & User Profiles      │ UPCOMING      │ `feat/m6-user-vault`          │
│ Milestone 7 │ Reviews, Ratings & Comprehensive QA       │ UPCOMING      │ `feat/m7-qa-reviews`          │
│ Milestone 8 │ Release Radar Engine (Theatrical vs OTT)  │ UPCOMING      │ `feat/m8-release-radar`       │
│ Milestone 9 │ AI Recommendations & Cinematic Curation   │ UPCOMING      │ `feat/m9-ai-recommendations`  │
│ Milestone 10│ PWA, Offline Caching & Production Deploy  │ UPCOMING      │ `feat/m10-prod-deploy`        │
└─────────────┴───────────────────────────────────────────┴───────────────┴───────────────────────────────┘
```

---

## 2. Milestone Alignment & Scope Matrix

### Milestone 0: Scaffolding & Architecture (Completed)
- React 18, Vite 5, TypeScript 5, Tailwind CSS, Lucide icons, Vitest.
- Commit: `34cb935`.

### Milestone 1: Layout Foundations (Completed)
- Modern Film Journal prototype shell, accessibility landmarks, responsive viewport tests.
- Commit: `c35ad13`.

### Milestone 2: Dark Cinematic Discovery & Live TMDB Feeds (Current)
- Complete visual transition to **Dark Cinematic Discovery** (`#0B0C0E` canvas, `#14161B` surface, amber/gold accents).
- Working TMDB client, resilient bounded backoff, image URL fallbacks, React Query caching.
- 9 prioritized homepage discovery sections:
  1. Featured Movie / Cinematic Hero
  2. Latest Movie Releases (`now_playing`)
  3. Coming Soon (`upcoming`)
  4. Trending Movies (`trending/movie/week`)
  5. Popular TV Shows (`tv/popular` or `trending/tv/week`)
  6. Top Rated Movies (`movie/top_rated`)
  7. Release Calendar Radar (Theatrical vs Streaming)
  8. Community Verdicts Showcase (UI Prototype)
  9. Personalized Watchlist Teaser

### Milestone 2.5: Community Feature — The Verdict (UI & Client State)
- 8 Curated presets (*Masterpiece*, *Must Watch*, *Mind Blowing*, *Banger*, *Worth It*, *One Time Watch*, *Overrated*, *Disappointing*) + custom verdict input (<= 30 chars).
- Verdict modal, breakdown percentage bar, and recent community submissions ticker.
- Client-side store with clearly labeled demonstration mode (waiting for Supabase auth in M5).

### Milestone 3: Media Details, Modal Viewers & Trailers
- Deep detail pages (`/movie/:id`, `/tv/:id`) and quick-view modals.
- YouTube trailer embeds with lazy loading.
- Official watch provider badges (powered by TMDB `watch/providers`).

### Milestone 4: Global Omni-Search & Command Palette
- Instant fuzzy search across movies, TV series, actors, and directors.
- Keyboard-driven command palette triggered with OS-aware shortcut (`Ctrl+K` on Windows/Linux, `⌘K` on macOS).

### Milestone 5: Supabase Authentication & PostgreSQL Database
- User registration, login, and OAuth session management.
- Live PostgreSQL `community_verdicts` table with Row Level Security (RLS).
- Live cloud persistence replacing mock verdict data.

### Milestone 6: Personal Watchlist, Favorites & User Profiles
- User vault to save, rate, and organize watched films.
- User profile page showing their verdicts and custom lists.

### Milestone 7: Reviews, Social Ratings & Comprehensive Test Suite
- Extended written reviews and detailed ratings.
- E2E testing with Playwright, full WCAG 2.1 AA automated audit.

### Milestone 8: Release Radar Engine
- Live theatrical release dates vs streaming platform availability.
- Countdown reminders and notifications.

### Milestone 9: AI Movie Recommendations
- Smart natural language film discovery ("films that feel like Blade Runner 2049 meets Arrival").

### Milestone 10: PWA, Offline & Production Deployment
- Service worker, offline viewing of user watchlist, Vercel/Netlify deployment.

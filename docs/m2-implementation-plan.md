# CineVault 2.0 — Milestone 2 Implementation Plan (Revised)
**Live TMDB Integration & Discovery Engine**

---

## 1. Security Architecture & Credential Strategy

### A. Client-Side Exposure Disclosure
In Vite single-page applications, **all environment variables prefixed with `VITE_` are statically compiled into the client-side JavaScript bundle**. Anyone inspecting network requests or reading source maps can see these values.

* **Frontend-Only Milestone 2 Approach:**
  * We use **TMDB v3 API Key (`VITE_TMDB_API_KEY`)** only.
  * In TMDB's architecture, v3 API keys are considered client-side identifiers for web apps.
* **Strict Rule on Private Bearer Tokens:**
  * **Never place a private TMDB v4 Read Access Bearer Token in a `VITE_` variable.**
  * Doing so would expose full account read permissions in the public bundle.
* **Server-Side Proxy Architecture (Future Milestone):**
  * If complete credential concealment is required for production, a server-side proxy (e.g., a Vercel Serverless Function or Supabase Edge Function: `/api/tmdb?endpoint=...`) must be implemented as a separate architectural requirement.
  * We will not silently introduce a backend in Milestone 2.
* **Secret Hygiene:**
  * Real `.env` files are strictly excluded via `.gitignore`.
  * Only documented placeholder templates are committed in `.env.example`.

### B. Proposed Client Environment Configuration (`.env.example`)

```bash
# ==============================================================================
# TMDB API CREDENTIALS (Vite Client-Side Identifiers)
# Obtain from: https://www.themoviedb.org/settings/api
# NOTE: VITE_ variables are embedded in the browser bundle. Never place private
# server secrets or v4 Bearer access tokens here.
# ==============================================================================
VITE_TMDB_API_KEY=your_v3_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

---

## 2. Dependency Audit & Architectural Recommendation

### A. Actual Dependency Audit
An inspection of `package.json` and `package-lock.json` reveals the actual state of the workspace:
* **Installed Runtime Dependencies:**
  * `clsx ^2.1.1`
  * `framer-motion ^11.11.11`
  * `lucide-react ^0.454.0`
  * `react ^18.3.1`
  * `react-dom ^18.3.1`
  * `tailwind-merge ^2.5.4`
  * `zustand ^5.0.1`
* **Installed Dev Dependencies:**
  * `vite ^5.4.11`, `typescript ^5.6.3`, `tailwindcss ^3.4.14`, `vitest ^2.1.4`, `@testing-library/react ^16.0.1`, etc.
* **Audit Finding:**
  * **`@tanstack/react-query` is NOT currently installed in the workspace.**
  * It was discussed during early exploratory roadmapping, but was never scaffolded, installed, or approved for inclusion in M0 or M1.

### B. Dependency Options for Milestone 2 Data Fetching

| Option | Package & Version | Trade-offs & Evaluation |
| :--- | :--- | :--- |
| **Option A: Proposed Dependency** | `@tanstack/react-query ^5.59.x` | **Pros:** Industry-standard server-state caching, automatic background revalidation (`staleTime: 10 mins`), request deduplication across tab switches, built-in window focus refetching.<br>**Cons:** Adds ~12kB (gzipped) new dependency to bundle. Requires your explicit approval before installation. |
| **Option B: Zero-Dependency Architecture** | Native React (`useEffect`, `useState`) + Custom Cache Module | **Pros:** Zero new dependencies; maintains the exact existing package footprint.<br>**Cons:** Requires writing custom cache invalidation, request deduplication, and retry logic by hand. |

**Recommendation:** We propose installing `@tanstack/react-query ^5.59.x` for resilient caching, but **we will not install it until you grant explicit approval**.

---

## 3. Fallback, Error Handling & Mock Mode Strategy

To maintain complete transparency and data integrity, the system strictly distinguishes between 5 operational states:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       DATA STATE TAXONOMY IN M2                             │
├─────────────────────┬────────────────────────────────┬──────────────────────┤
│ State               │ Trigger Condition              │ UI Behavior          │
├─────────────────────┼────────────────────────────────┼──────────────────────┤
│ 1. Missing Key      │ `!VITE_TMDB_API_KEY`           │ Active Mock Mode with│
│                     │                                │ visible badge        │
│ 2. Offline Network  │ `!navigator.onLine` / FetchFail │ "Network Offline"    │
│                     │                                │ notice with retry    │
│ 3. API Error        │ HTTP 401 / 404 / 500 / 503     │ Editorial Error Card │
│                     │                                │ with status code     │
│ 4. Rate Limited     │ HTTP 429 Too Many Requests     │ Bounded retry with   │
│                     │                                │ Retry-After backoff  │
│ 5. Empty Results    │ `results.length === 0`         │ Editorial Empty Note │
└─────────────────────┴────────────────────────────────┴──────────────────────┘
```

### A. Transparent Mock Mode (Never Silent)
* When `VITE_TMDB_API_KEY` is not supplied or is empty:
  * The application serves the verified static fixtures (`src/data/mock-media.ts`).
  * A prominent, visible editorial banner is displayed above the content:  
    `[ ARCHIVAL DEMO // MOCK MODE ACTIVE — Supply VITE_TMDB_API_KEY in .env for live TMDB feeds ]`
  * **Static mock data is NEVER misrepresented as live TMDB data.**

### B. Bounded Retries & Rate Limiting (HTTP 429)
* **Maximum Retries:** Bounded strictly to **2 attempts** to prevent request storms.
* **HTTP 429 Handling:** Reads the `Retry-After` HTTP header. If absent, applies exponential backoff:
  * Attempt 1: Wait 1,500ms + randomized jitter.
  * Attempt 2: Wait 3,000ms + randomized jitter.
  * If still failing: Raise `TMDBRateLimitError` and render a user-friendly retry button.
* **Network Timeout:** Each request uses an `AbortSignal.timeout(10000)` (10-second ceiling).

---

## 4. Image Handling, Aspect Ratios & Fallbacks

TMDB provides image paths rather than full URLs. Image handling must prevent **Cumulative Layout Shift (CLS)** and broken image icons.

### A. Strict Aspect Ratio Preservation
* **Hero / Widescreen Backdrops:** `2.39:1` and `16:9` (`aspect-[2.39/1]`, `aspect-[16/9]`).
* **Vertical Cards & Posters:** `3:4` and `2:3` (`aspect-[3/4]`, `aspect-[2/3]`).
* **Secondary Stills:** `16:10` (`aspect-[16/10]`).

### B. Resolution Discipline
* Posters: `w342` for compact digests, `w500` for standard cards, `w780` for featured portraits.
* Backdrops: `w1280` for standard stills, `original` for the lead hero frame.

### C. Graceful Fallbacks
* If `poster_path: null` or `backdrop_path: null`:
  * Returns an inline SVG data URI styled in the Modern Film Journal palette (`#F2EFE9` background, `#E2DDD5` hairline border, film icon, and movie title).
* If an image URL fails to load in the browser:
  * The image component catches `onError` and seamlessly replaces the broken `src` with the fallback SVG, preventing broken browser image icons.

---

## 5. UI Preservation: Modern Film Journal Aesthetics

Milestone 2 does **not** redesign the approved Milestone 1 layout. It binds live data directly into the approved components:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. HERO DISPATCH (HeroDispatch.tsx)                                         │
│    - Consumes live trending movie #1 (from /trending/movie/week)            │
│    - Renders widescreen 2.39:1 frame, real TMDB score, real runtime, credits│
│    - Shows subtle hairline skeleton during initial load                     │
│    - Falls back to labeled mock if key is missing or network fails          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. TRENDING REPERTOIRE (TrendingRepertoire.tsx)                             │
│    - Broadsheet 3-column asymmetric layout preserved identically            │
│    - Lead Focus: Trending result #2 (vertical 3:4 portrait)                 │
│    - Dual Frames: Trending results #3 & #4 (16:10 landscape stills)         │
│    - Critical Digest: Trending results #5 through #7                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. DISCOVERY FEED EXPLORER (DiscoveryFeed.tsx — New Section in M2)          │
│    - Located below Trending Repertoire                                      │
│    - Tabs: [Trending Movies] • [Popular TV Series] • [Critically Acclaimed] │
│    - Filter Pills: [All Genres] [Drama] [Sci-Fi] [Crime] [History]          │
│    - Rendered using the approved print-inspired broadsheet card layout      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. RELEASE RADAR PREVIEW (ReleaseRadarPreview.tsx)                          │
│    - Strictly preserved as prototype preview with disclaimers (M8 scope)    │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. CURATOR FOCUS & FOOTER (CuratorFocus.tsx & Footer.tsx)                   │
│    - Preserved identically with historical context and TMDB attribution     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Typed Data Models & Domain Normalization

### A. Raw TMDB API Schemas (`src/types/tmdb.ts`)

```typescript
export interface TMDBRawMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
}

export interface TMDBRawTVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  origin_country: string[];
}

export interface TMDBPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBGenre {
  id: number;
  name: string;
}
```

### B. Normalized Domain Model (`src/types/media.ts`)

```typescript
export type MediaType = 'movie' | 'tv';

export interface NormalizedMediaItem {
  id: string; // e.g. "movie-823464"
  rawId: number;
  mediaType: MediaType;
  title: string;
  year: string;
  releaseDate: string;
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  tmdbRating: number;
  tmdbVotes: string;
  genreNames: string[];
  popularity: number;
}
```

---

## 7. Proposed File Structure for Milestone 2

```text
src/
├── types/
│   ├── tmdb.ts               # Raw TMDB API TypeScript interfaces
│   └── media.ts              # Unified NormalizedMediaItem domain interfaces
├── services/
│   └── tmdb/
│       ├── client.ts         # Central HTTP client (v3 key, AbortSignal, backoff)
│       ├── api.ts            # Typed endpoints (trending, top-rated, genres)
│       ├── images.ts         # Image URL resolver, size variants, fallback SVGs
│       └── mappers.ts        # Maps raw TMDB movie/tv records to NormalizedMediaItem
├── hooks/
│   └── useTMDB.ts            # Caching hooks (useTrending, useTopRated, useGenres)
├── components/
│   ├── common/
│   │   ├── MediaSkeleton.tsx # Hairline editorial loading skeleton
│   │   ├── ErrorCard.tsx     # Editorial error notice with retry button
│   │   └── MockModeBadge.tsx # Visible badge when mock mode is active
│   └── home/
│       ├── HeroDispatch.tsx  # Updated to bind live trending #1 data
│       ├── TrendingRepertoire.tsx # Updated to bind live trending #2–#7 data
│       └── DiscoveryFeed.tsx # New tabbed exploration feed with genre pills
└── tests/
    └── tmdb.test.ts          # Vitest suite for client, mappers, errors, and fallbacks
```

---

## 8. Comprehensive Testing Strategy

A dedicated test suite (`src/tests/tmdb.test.ts`) covering:
1. **Missing Credentials Test:** Verifies that when `VITE_TMDB_API_KEY` is undefined, the service enters mock mode and returns verified fallback data without throwing unhandled exceptions.
2. **Successful Response & Mapping Test:** Mocks valid TMDB movie/TV responses and asserts that votes, dates, and genres are mapped accurately to `NormalizedMediaItem`.
3. **Malformed Payload Test:** Verifies that payloads missing `title`, `overview`, or `vote_average` are handled safely with fallbacks rather than crashing components.
4. **HTTP 429 Rate-Limit Backoff Test:** Simulates HTTP 429, verifies bounded retries, and checks that `Retry-After` delay is respected.
5. **Network Timeout Test:** Simulates an aborted request and confirms clean error classification.
6. **Image Fallback Test:** Verifies that null `poster_path` and `backdrop_path` return valid SVG fallback data URIs.
7. **Smoke Suite Preservation:** Confirms that all existing Milestone 0 & 1 tests continue to pass 100%.

---

## 9. Proposed Implementation Sequence

1. **Step 1: Dependency Resolution & Setup:**
   * Review and approve proposed dependency (`@tanstack/react-query`).
   * Configure `QueryClientProvider` in `App.tsx` (or implement custom hook cache if zero-dependency preferred).
2. **Step 2: TypeScript Data Models:**
   * Create `src/types/tmdb.ts` and `src/types/media.ts`.
3. **Step 3: Central TMDB Client & Utilities:**
   * Create `src/services/tmdb/client.ts`, `images.ts`, `mappers.ts`, and `api.ts`.
4. **Step 4: Editorial Skeletons & Error Badges:**
   * Create `MediaSkeleton.tsx`, `ErrorCard.tsx`, and `MockModeBadge.tsx`.
5. **Step 5: Data Fetching Hooks:**
   * Create `src/hooks/useTMDB.ts` with error normalization and mock mode detection.
6. **Step 6: UI Component Integration:**
   * Wire live data into `HeroDispatch.tsx` and `TrendingRepertoire.tsx`.
   * Create `DiscoveryFeed.tsx` for genre-filtered exploration.
7. **Step 7: Vitest Unit & Integration Testing:**
   * Run and pass all tests in `src/tests/tmdb.test.ts` and `src/tests/smoke.test.tsx`.
8. **Step 8: Build Verification & Browser QA:**
   * Execute `npm run build`, start the dev server, and verify live rendering in the browser.

---

### Approval Gate

This revised specification resolves all architectural, security, dependency, and testing constraints.

* No source files have been modified.
* No dependencies have been installed.
* No commits or pushes have been made.

**Awaiting your explicit approval of this revised plan and proposed dependency before proceeding with Milestone 2 implementation.**

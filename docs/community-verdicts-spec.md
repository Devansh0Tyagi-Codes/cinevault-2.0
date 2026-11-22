# CineVault 2.0 — Community Verdicts Architecture & Specification

**Document Version:** 1.0.0  
**Status:** PROPOSED ARCHITECTURE & DATABASE SPECIFICATION  
**Feature:** The Verdict (Short Community Verdicts for Movies & TV Shows)  
**Target Milestone:** Phase A in M2.5 / Phase B in M5 (Supabase)  

---

## 1. Feature Overview & Product Objectives

Traditional star ratings (e.g., 7.8/10 or ★★★★☆) can feel clinical and fail to capture emotional consensus. **The Verdict** allows cinephiles to define a film or series in a single punchy, expressive label (e.g., *"Masterpiece"*, *"Banger"*, *"Must Watch"*, *"Overrated"*).

### Key User Requirements
1. **Submit Verdict:** Authenticated users can cast a verdict for any movie or TV show.
2. **Preset & Custom:** Users can pick from 8 curated presets or enter an original custom verdict (max 30 characters).
3. **Public Consensus:** Anyone can view the aggregated breakdown and percentage distribution for each title.
4. **Submission Volume:** Displays total number of users who participated (e.g., `2,840 cinephiles`).
5. **Recent Activity Feed:** Shows latest verdicts with user display names, timestamps, and media titles.
6. **One Verdict Rule:** Exactly **one active verdict per user per title**.
7. **Edit / Delete:** Users can edit their verdict or remove it at any time.
8. **Spam & Abuse Defense:** Length bounds, sanitization, basic profanity filtering, and rate limits.
9. **Universal Support:** Works seamlessly for both `movie` and `tv` records linked to TMDB IDs.
10. **Theme Integration:** Visually styled to match the dark cinematic aesthetic.

---

## 2. Verdict Catalog & Constraints

### Standard Curated Presets

```
┌────────────────────────────────────────────────────────────────────────┐
│ CURATED VERDICT PRESETS                                                │
├───────────────────┬──────────────────────┬─────────────────────────────┤
│ Verdict Tag       │ Sentiment / Category │ Visual Accent               │
├───────────────────┼──────────────────────┼─────────────────────────────┤
│ `Masterpiece`     │ Highest Acclaim      │ Gold (`#F59E0B`)            │
│ `Must Watch`      │ Essential Viewing    │ Emerald (`#10B981`)         │
│ `Mind Blowing`    │ High Impact / Twist  │ Indigo (`#6366F1`)          │
│ `Banger`          │ High Energy / Fun    │ Amber (`#F97316`)           │
│ `Worth It`        │ Solid Recommendation │ Teal (`#14B8A6`)            │
│ `One Time Watch`  │ Moderate / Casual    │ Slate (`#94A3B8`)           │
│ `Overrated`       │ Critical Divergence  │ Rose (`#F43F5E`)            │
│ `Disappointing`   │ Negative / Letdown   │ Red (`#EF4444`)             │
└───────────────────┴──────────────────────┴─────────────────────────────┘
```

### Custom Verdict Validation Rules
- **Minimum Length:** 2 characters (excluding whitespace).
- **Maximum Length:** 30 characters (prevents layout breakage and essay reviews).
- **Format:** Plain text only; no HTML, Markdown, URLs, or special control characters.
- **Profanity & Abuse:** Basic client and server blocklist regex filter.
- **Normalization:** Trimmed of leading/trailing whitespace, capitalized first letter.

---

## 3. TypeScript Domain Models

```typescript
export type MediaType = 'movie' | 'tv';

export type StandardVerdictPreset =
  | 'Masterpiece'
  | 'Must Watch'
  | 'Mind Blowing'
  | 'Banger'
  | 'Worth It'
  | 'One Time Watch'
  | 'Overrated'
  | 'Disappointing';

export interface PublicVerdict {
  id: string;
  displayName: string;
  avatarUrl?: string;
  tmdbId: number;
  mediaType: MediaType;
  mediaTitle: string;
  verdict: string;
  isPreset: boolean;
  createdAt: string; // ISO 8601
}

export interface UserVerdictRecord extends PublicVerdict {
  // Only available to the authenticated owner of the verdict
  isOwner: boolean;
  updatedAt: string;
}

export interface VerdictBreakdownItem {
  verdict: string;
  count: number;
  percentage: number; // 0 to 100
}

export interface TitleVerdictSummary {
  tmdbId: number;
  mediaType: MediaType;
  totalVerdicts: number;
  topVerdict: string;
  topVerdictPercentage: number;
  breakdown: VerdictBreakdownItem[];
  userVerdict?: UserVerdictRecord | null; // Populated if current user has voted
}

export interface VerdictSubmissionPayload {
  tmdbId: number;
  mediaType: MediaType;
  mediaTitle: string;
  verdict: string;
}
```

---

## 4. PostgreSQL Schema & Database Architecture (Supabase)

```sql
-- 1. Create the community_verdicts table
CREATE TABLE public.community_verdicts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tmdb_id INTEGER NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('movie', 'tv')),
  media_title TEXT NOT NULL,
  verdict TEXT NOT NULL CHECK (char_length(trim(verdict)) >= 2 AND char_length(trim(verdict)) <= 30),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  
  -- Strict constraint: 1 verdict per user per title
  CONSTRAINT unique_user_title_verdict UNIQUE (user_id, tmdb_id, media_type)
);

-- 2. Indexes for high-frequency queries
CREATE INDEX idx_verdicts_media_lookup ON public.community_verdicts(tmdb_id, media_type);
CREATE INDEX idx_verdicts_user_lookup ON public.community_verdicts(user_id);
CREATE INDEX idx_verdicts_feed ON public.community_verdicts(created_at DESC);

-- 3. Automatic updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_verdict_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_verdict_timestamp
  BEFORE UPDATE ON public.community_verdicts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_verdict_updated_at();

-- 4. Privacy-Preserving Public View (Excludes internal user_id)
CREATE VIEW public.public_community_verdicts AS
  SELECT 
    v.id,
    v.tmdb_id,
    v.media_type,
    v.media_title,
    v.verdict,
    v.created_at,
    COALESCE(p.display_name, 'Anonymous Cinephile') AS display_name,
    p.avatar_url
  FROM public.community_verdicts v
  LEFT JOIN public.profiles p ON p.id = v.user_id;

-- 5. Row Level Security (RLS) Configuration on Base Table
ALTER TABLE public.community_verdicts ENABLE ROW LEVEL SECURITY;

-- Base table read: Authenticated users can view their own verdict row (including user_id)
CREATE POLICY "Allow users to view own verdict row"
  ON public.community_verdicts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Authenticated users can insert their own verdict
CREATE POLICY "Allow authenticated users to submit their verdict"
  ON public.community_verdicts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update only their own existing verdict
CREATE POLICY "Allow users to update own verdict"
  ON public.community_verdicts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete only their own verdict
CREATE POLICY "Allow users to delete own verdict"
  ON public.community_verdicts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
```

### Stored SQL Procedure for Aggregated Summaries

To avoid pulling hundreds of rows to the browser to calculate percentages, a performant PostgreSQL function calculates the distribution directly in the database:

```sql
CREATE OR REPLACE FUNCTION public.get_title_verdict_summary(
  p_tmdb_id INTEGER,
  p_media_type TEXT
)
RETURNS JSONB AS $$
DECLARE
  v_total INTEGER;
  v_breakdown JSONB;
  v_top_verdict TEXT;
  v_top_pct NUMERIC;
BEGIN
  -- Count total votes for title
  SELECT count(*) INTO v_total
  FROM public.community_verdicts
  WHERE tmdb_id = p_tmdb_id AND media_type = p_media_type;

  IF v_total = 0 THEN
    RETURN jsonb_build_object(
      'totalVerdicts', 0,
      'topVerdict', null,
      'topVerdictPercentage', 0,
      'breakdown', '[]'::jsonb
    );
  END IF;

  -- Build aggregated percentage breakdown
  SELECT 
    jsonb_agg(
      jsonb_build_object(
        'verdict', verdict,
        'count', cnt,
        'percentage', round((cnt::numeric / v_total::numeric) * 100, 1)
      ) ORDER BY cnt DESC
    )
  INTO v_breakdown
  FROM (
    SELECT verdict, count(*) as cnt
    FROM public.community_verdicts
    WHERE tmdb_id = p_tmdb_id AND media_type = p_media_type
    GROUP BY verdict
    ORDER BY cnt DESC
    LIMIT 6
  ) sub;

  -- Extract top verdict and percentage
  SELECT 
    verdict,
    round((count(*)::numeric / v_total::numeric) * 100, 1)
  INTO v_top_verdict, v_top_pct
  FROM public.community_verdicts
  WHERE tmdb_id = p_tmdb_id AND media_type = p_media_type
  GROUP BY verdict
  ORDER BY count(*) DESC
  LIMIT 1;

  RETURN jsonb_build_object(
    'totalVerdicts', v_total,
    'topVerdict', v_top_verdict,
    'topVerdictPercentage', v_top_pct,
    'breakdown', v_breakdown
  );
END;
$$ LANGUAGE plpgsql STABLE;
```

---

## 5. Phased Implementation Plan

```
┌────────────────────────────────────────────────────────────────────────┐
│ COMMUNITY VERDICTS ROLLOUT PHASES                                      │
├─────────┬─────────────────────────┬────────────────────────────────────┤
│ Phase   │ Scope & Milestones      │ Architecture State                 │
├─────────┼─────────────────────────┼────────────────────────────────────┤
│ Phase A │ UI & Interaction Design │ Mock/Local provider with in-memory │
│         │ (M2.5 Redesign)         │ state. Clearly labeled DEMO data.  │
│         │                         │ Modal, breakdown bars & presets.   │
├─────────┼─────────────────────────┼────────────────────────────────────┤
│ Phase B │ Supabase Auth & SQL     │ Live Supabase PostgreSQL table,   │
│         │ (Milestone 5)           │ RLS policies, RPC procedure, and   │
│         │                         │ real user authentication session.  │
├─────────┼─────────────────────────┼────────────────────────────────────┤
│ Phase C │ Realtime & Testing      │ Supabase Realtime websocket sync   │
│         │ (Milestones 6 & 7)      │ across tabs/devices + E2E QA.      │
└─────────┴─────────────────────────┴────────────────────────────────────┘
```

### Phase A: UI & Interaction Deliverables (Immediate)
- **`VerdictBadge.tsx`**: Compact pill showing top verdict and percentage (e.g., `★ 92% Masterpiece`).
- **`VerdictModal.tsx`**: Dialog for selecting presets, entering custom verdicts, and managing edit/delete.
- **`VerdictBreakdown.tsx`**: Horizontal distribution bar visualizing community consensus.
- **`CommunityVerdictsShowcase.tsx`**: Homepage section highlighting trending community verdicts and recent reviews.
- **State Store**: React Context / Zustand store with optimistic update, labeled mock dataset, and clear notice that multi-user sync activates with Supabase in M5.

---

## 6. Anti-Spam & Abuse Defense

1. **Length Validation:** Exact bounds (`2 <= char_length <= 30`).
2. **Frequency Throttling (Rate Limiting):** A user cannot submit more than 5 verdicts in a 60-second window.
3. **Profanity Filter:** Regex pattern filtering out offensive slurs, hate speech, and spam links before persistence.
4. **Duplicate Prevention:** The unique database constraint `(user_id, tmdb_id, media_type)` renders duplicate spam physically impossible at the database level.

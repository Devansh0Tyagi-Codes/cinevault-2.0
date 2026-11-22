import { create } from 'zustand';
import {
  PublicVerdict,
  TitleVerdictSummary,
  VerdictBreakdownItem,
  VerdictSubmissionPayload,
} from '@/types/verdict';

const DEMO_USER_ID = 'usr_local_demo_cinephile';
const DEMO_USER_NAME = 'You (Archival Curator)';

/**
 * Verified initial community demonstration records.
 */
const INITIAL_DEMO_VERDICTS: (PublicVerdict & { userId: string })[] = [
  {
    id: 'v-dune-1',
    userId: 'usr_sarah_c',
    displayName: 'Sarah Jenkins',
    tmdbId: 693134,
    mediaType: 'movie',
    mediaTitle: 'Dune: Part Two',
    verdict: 'Masterpiece',
    isPreset: true,
    createdAt: '2024-03-05T14:30:00Z',
  },
  {
    id: 'v-dune-2',
    userId: 'usr_marcus_v',
    displayName: 'Marcus Vance',
    tmdbId: 693134,
    mediaType: 'movie',
    mediaTitle: 'Dune: Part Two',
    verdict: 'Mind Blowing',
    isPreset: true,
    createdAt: '2024-03-06T18:12:00Z',
  },
  {
    id: 'v-dune-3',
    userId: 'usr_elena_r',
    displayName: 'Elena Rostova',
    tmdbId: 693134,
    mediaType: 'movie',
    mediaTitle: 'Dune: Part Two',
    verdict: 'Masterpiece',
    isPreset: true,
    createdAt: '2024-03-08T09:45:00Z',
  },
  {
    id: 'v-dune-4',
    userId: 'usr_kai_t',
    displayName: 'Kai Takahashi',
    tmdbId: 693134,
    mediaType: 'movie',
    mediaTitle: 'Dune: Part Two',
    verdict: 'Must Watch',
    isPreset: true,
    createdAt: '2024-03-10T20:00:00Z',
  },
  {
    id: 'v-opp-1',
    userId: 'usr_sarah_c',
    displayName: 'Sarah Jenkins',
    tmdbId: 872585,
    mediaType: 'movie',
    mediaTitle: 'Oppenheimer',
    verdict: 'Masterpiece',
    isPreset: true,
    createdAt: '2023-08-01T12:00:00Z',
  },
  {
    id: 'v-opp-2',
    userId: 'usr_marcus_v',
    displayName: 'Marcus Vance',
    tmdbId: 872585,
    mediaType: 'movie',
    mediaTitle: 'Oppenheimer',
    verdict: 'Must Watch',
    isPreset: true,
    createdAt: '2023-08-04T16:20:00Z',
  },
  {
    id: 'v-poor-1',
    userId: 'usr_elena_r',
    displayName: 'Elena Rostova',
    tmdbId: 792307,
    mediaType: 'movie',
    mediaTitle: 'Poor Things',
    verdict: 'Mind Blowing',
    isPreset: true,
    createdAt: '2023-12-15T22:10:00Z',
  },
  {
    id: 'v-shogun-1',
    userId: 'usr_kai_t',
    displayName: 'Kai Takahashi',
    tmdbId: 126308,
    mediaType: 'tv',
    mediaTitle: 'Shōgun',
    verdict: 'Masterpiece',
    isPreset: true,
    createdAt: '2024-03-02T19:30:00Z',
  },
  {
    id: 'v-godfather-1',
    userId: 'usr_marcus_v',
    displayName: 'Marcus Vance',
    tmdbId: 238,
    mediaType: 'movie',
    mediaTitle: 'The Godfather',
    verdict: 'Masterpiece',
    isPreset: true,
    createdAt: '2024-01-10T11:15:00Z',
  },
];

interface VerdictModalTarget {
  tmdbId: number;
  mediaType: 'movie' | 'tv';
  mediaTitle: string;
}

interface VerdictState {
  verdicts: (PublicVerdict & { userId: string })[];
  isDemoMode: boolean;
  modalTarget: VerdictModalTarget | null;
  openVerdictModal: (target: VerdictModalTarget) => void;
  closeVerdictModal: () => void;
  submitVerdict: (payload: VerdictSubmissionPayload) => { success: boolean; error?: string };
  updateVerdict: (tmdbId: number, mediaType: 'movie' | 'tv', verdict: string) => { success: boolean; error?: string };
  deleteVerdict: (tmdbId: number, mediaType: 'movie' | 'tv') => void;
  getSummary: (tmdbId: number, mediaType: 'movie' | 'tv') => TitleVerdictSummary;
  getRecentVerdicts: (limit?: number) => PublicVerdict[];
}

export const useVerdictStore = create<VerdictState>((set, get) => ({
  verdicts: INITIAL_DEMO_VERDICTS,
  isDemoMode: true,
  modalTarget: null,

  openVerdictModal: (target) => set({ modalTarget: target }),
  closeVerdictModal: () => set({ modalTarget: null }),

  submitVerdict: (payload) => {
    const trimmed = payload.verdict.trim();
    if (trimmed.length < 2 || trimmed.length > 30) {
      return { success: false, error: 'Verdict must be between 2 and 30 characters.' };
    }

    const { verdicts } = get();
    // Rule: exactly one verdict per user per title
    const existingIndex = verdicts.findIndex(
      (v) => v.userId === DEMO_USER_ID && v.tmdbId === payload.tmdbId && v.mediaType === payload.mediaType
    );

    const isPreset = [
      'Masterpiece',
      'Must Watch',
      'Mind Blowing',
      'Banger',
      'Worth It',
      'One Time Watch',
      'Overrated',
      'Disappointing',
    ].includes(trimmed);

    if (existingIndex >= 0) {
      // Update existing
      const updated = [...verdicts];
      updated[existingIndex] = {
        ...updated[existingIndex],
        verdict: trimmed,
        isPreset,
        createdAt: new Date().toISOString(),
      };
      set({ verdicts: updated, modalTarget: null });
      return { success: true };
    }

    const newVerdict: PublicVerdict & { userId: string } = {
      id: `v-user-${Date.now()}`,
      userId: DEMO_USER_ID,
      displayName: DEMO_USER_NAME,
      tmdbId: payload.tmdbId,
      mediaType: payload.mediaType,
      mediaTitle: payload.mediaTitle,
      verdict: trimmed,
      isPreset,
      createdAt: new Date().toISOString(),
    };

    set({ verdicts: [newVerdict, ...verdicts], modalTarget: null });
    return { success: true };
  },

  updateVerdict: (tmdbId, mediaType, newVerdict) => {
    const trimmed = newVerdict.trim();
    if (trimmed.length < 2 || trimmed.length > 30) {
      return { success: false, error: 'Verdict must be between 2 and 30 characters.' };
    }

    const { verdicts } = get();
    const updated = verdicts.map((v) => {
      if (v.userId === DEMO_USER_ID && v.tmdbId === tmdbId && v.mediaType === mediaType) {
        return {
          ...v,
          verdict: trimmed,
          createdAt: new Date().toISOString(),
        };
      }
      return v;
    });

    set({ verdicts: updated, modalTarget: null });
    return { success: true };
  },

  deleteVerdict: (tmdbId, mediaType) => {
    set((state) => ({
      verdicts: state.verdicts.filter(
        (v) => !(v.userId === DEMO_USER_ID && v.tmdbId === tmdbId && v.mediaType === mediaType)
      ),
      modalTarget: null,
    }));
  },

  getSummary: (tmdbId, mediaType) => {
    const { verdicts } = get();
    const titleVerdicts = verdicts.filter((v) => v.tmdbId === tmdbId && v.mediaType === mediaType);
    const total = titleVerdicts.length;

    const userVerdict = titleVerdicts.find((v) => v.userId === DEMO_USER_ID);

    if (total === 0) {
      return {
        tmdbId,
        mediaType,
        totalVerdicts: 0,
        topVerdict: 'Unreviewed',
        topVerdictPercentage: 0,
        breakdown: [],
        userVerdict: userVerdict
          ? {
              ...userVerdict,
              isOwner: true,
              updatedAt: userVerdict.createdAt,
            }
          : null,
      };
    }

    // Count by verdict
    const counts: Record<string, number> = {};
    titleVerdicts.forEach((v) => {
      counts[v.verdict] = (counts[v.verdict] || 0) + 1;
    });

    const breakdown: VerdictBreakdownItem[] = Object.entries(counts)
      .map(([verdict, count]) => ({
        verdict,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count);

    const top = breakdown[0];

    return {
      tmdbId,
      mediaType,
      totalVerdicts: total,
      topVerdict: top ? top.verdict : 'Unreviewed',
      topVerdictPercentage: top ? top.percentage : 0,
      breakdown,
      userVerdict: userVerdict
        ? {
            ...userVerdict,
            isOwner: true,
            updatedAt: userVerdict.createdAt,
          }
        : null,
    };
  },

  getRecentVerdicts: (limit = 10) => {
    const { verdicts } = get();
    // Exclude internal userId when returning public feeds
    return verdicts.slice(0, limit).map(({ id, displayName, avatarUrl, tmdbId, mediaType, mediaTitle, verdict, isPreset, createdAt }) => ({
      id,
      displayName,
      avatarUrl,
      tmdbId,
      mediaType,
      mediaTitle,
      verdict,
      isPreset,
      createdAt,
    }));
  },
}));

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { useVerdictStore } from '@/stores/verdict-store';
import VerdictBadge from '@/components/verdicts/VerdictBadge';
import VerdictBreakdown from '@/components/verdicts/VerdictBreakdown';
import VerdictModal from '@/components/verdicts/VerdictModal';

describe('Community Verdicts Feature Suite ("The Verdict")', () => {
  beforeEach(() => {
    // Reset store state before each test with fresh demo verdicts
    useVerdictStore.setState({
      verdicts: [
        {
          id: 'v-dune-1',
          userId: 'usr_sarah_c',
          displayName: 'Sarah Jenkins',
          tmdbId: 823464,
          mediaType: 'movie',
          mediaTitle: 'Dune: Part Two',
          verdict: 'Masterpiece',
          isPreset: true,
          createdAt: '2024-03-05T14:30:00Z',
        },
      ],
      modalTarget: null,
      isDemoMode: true,
    });
  });

  describe('Verdict Store & Business Logic', () => {
    it('initializes with verified demonstration verdicts and explicit demo mode flag', () => {
      const state = useVerdictStore.getState();
      expect(state.isDemoMode).toBe(true);
      expect(state.verdicts.length).toBeGreaterThanOrEqual(1);

      // Verify that public feed does not expose internal user ID
      const recent = state.getRecentVerdicts();
      expect(recent[0]).toHaveProperty('displayName');
      expect(recent[0]).toHaveProperty('verdict');
      expect(recent[0]).not.toHaveProperty('userId');
    });

    it('submits a valid preset verdict and enforces exactly 1 verdict per title per user', () => {
      const { submitVerdict, getSummary } = useVerdictStore.getState();
      const testMovieId = 999991;

      // Initial state
      const initialSummary = getSummary(testMovieId, 'movie');
      expect(initialSummary.totalVerdicts).toBe(0);

      // First submission
      const sub1 = submitVerdict({
        tmdbId: testMovieId,
        mediaType: 'movie',
        mediaTitle: 'Test Feature 1',
        verdict: 'Masterpiece',
      });
      expect(sub1.success).toBe(true);

      const afterFirst = useVerdictStore.getState().getSummary(testMovieId, 'movie');
      expect(afterFirst.totalVerdicts).toBe(1);
      expect(afterFirst.topVerdict).toBe('Masterpiece');
      expect(afterFirst.topVerdictPercentage).toBe(100);

      // Second submission for SAME title by same user updates rather than duplicates
      const sub2 = useVerdictStore.getState().submitVerdict({
        tmdbId: testMovieId,
        mediaType: 'movie',
        mediaTitle: 'Test Feature 1',
        verdict: 'Must Watch',
      });
      expect(sub2.success).toBe(true);

      const afterSecond = useVerdictStore.getState().getSummary(testMovieId, 'movie');
      expect(afterSecond.totalVerdicts).toBe(1); // Still 1! Never duplicated
      expect(afterSecond.topVerdict).toBe('Must Watch');
    });

    it('validates custom verdict character length constraints (2 to 30 chars)', () => {
      const { submitVerdict } = useVerdictStore.getState();

      // Too short (< 2 chars)
      const tooShort = submitVerdict({
        tmdbId: 888881,
        mediaType: 'movie',
        mediaTitle: 'Short Test',
        verdict: 'A',
      });
      expect(tooShort.success).toBe(false);
      expect(tooShort.error).toContain('between 2 and 30 characters');

      // Too long (> 30 chars)
      const tooLong = submitVerdict({
        tmdbId: 888882,
        mediaType: 'movie',
        mediaTitle: 'Long Test',
        verdict: 'This verdict is far too long and exceeds thirty chars',
      });
      expect(tooLong.success).toBe(false);
      expect(tooLong.error).toContain('between 2 and 30 characters');

      // Valid custom verdict
      const validCustom = submitVerdict({
        tmdbId: 888883,
        mediaType: 'movie',
        mediaTitle: 'Custom Test',
        verdict: 'Sensory Tour de Force',
      });
      expect(validCustom.success).toBe(true);
    });

    it('calculates percentage breakdowns accurately across multiple votes', () => {
      const testMovieId = 777771;
      const { getSummary } = useVerdictStore.getState();

      // Seed state with known distribution
      useVerdictStore.setState({
        verdicts: [
          {
            id: 'v1',
            userId: 'user_a',
            displayName: 'Alice',
            tmdbId: testMovieId,
            mediaType: 'movie',
            mediaTitle: 'Distribution Film',
            verdict: 'Masterpiece',
            isPreset: true,
            createdAt: new Date().toISOString(),
          },
          {
            id: 'v2',
            userId: 'user_b',
            displayName: 'Bob',
            tmdbId: testMovieId,
            mediaType: 'movie',
            mediaTitle: 'Distribution Film',
            verdict: 'Masterpiece',
            isPreset: true,
            createdAt: new Date().toISOString(),
          },
          {
            id: 'v3',
            userId: 'user_c',
            displayName: 'Charlie',
            tmdbId: testMovieId,
            mediaType: 'movie',
            mediaTitle: 'Distribution Film',
            verdict: 'Must Watch',
            isPreset: true,
            createdAt: new Date().toISOString(),
          },
          {
            id: 'v4',
            userId: 'user_d',
            displayName: 'Diana',
            tmdbId: testMovieId,
            mediaType: 'movie',
            mediaTitle: 'Distribution Film',
            verdict: 'Overrated',
            isPreset: true,
            createdAt: new Date().toISOString(),
          },
        ],
      });

      const summary = getSummary(testMovieId, 'movie');
      expect(summary.totalVerdicts).toBe(4);
      expect(summary.topVerdict).toBe('Masterpiece');
      expect(summary.topVerdictPercentage).toBe(50); // 2 out of 4 = 50%

      const mustWatchItem = summary.breakdown.find((b) => b.verdict === 'Must Watch');
      expect(mustWatchItem?.percentage).toBe(25); // 1 out of 4 = 25%
    });

    it('deletes an existing user verdict cleanly', () => {
      const testMovieId = 666661;
      const { submitVerdict, deleteVerdict, getSummary } = useVerdictStore.getState();

      submitVerdict({
        tmdbId: testMovieId,
        mediaType: 'movie',
        mediaTitle: 'Deletion Test',
        verdict: 'Banger',
      });

      expect(getSummary(testMovieId, 'movie').totalVerdicts).toBe(1);

      deleteVerdict(testMovieId, 'movie');
      expect(getSummary(testMovieId, 'movie').totalVerdicts).toBe(0);
    });
  });

  describe('Verdict UI Components', () => {
    it('renders VerdictBadge with top consensus percentage', () => {
      render(
        React.createElement(VerdictBadge, {
          tmdbId: 823464, // Dune: Part Two in mock data
          mediaType: 'movie',
          mediaTitle: 'Dune: Part Two',
        })
      );

      expect(screen.getByText(/MASTERPIECE/i)).toBeInTheDocument();
      expect(screen.getByText(/%/i)).toBeInTheDocument();
    });

    it('renders VerdictBreakdown with all items and percentages', () => {
      const breakdown = [
        { verdict: 'Masterpiece', count: 3, percentage: 75 },
        { verdict: 'Must Watch', count: 1, percentage: 25 },
      ];

      render(
        React.createElement(VerdictBreakdown, {
          breakdown,
          totalVerdicts: 4,
        })
      );

      expect(screen.getByText('Masterpiece')).toBeInTheDocument();
      expect(screen.getByText('75%')).toBeInTheDocument();
      expect(screen.getByText('Must Watch')).toBeInTheDocument();
      expect(screen.getByText('25%')).toBeInTheDocument();
    });

    it('opens VerdictModal, allows selecting preset and submitting', () => {
      useVerdictStore.getState().openVerdictModal({
        tmdbId: 555551,
        mediaType: 'movie',
        mediaTitle: 'Modal Test Movie',
      });

      render(React.createElement(VerdictModal));

      expect(screen.getByText(/THE COMMUNITY VERDICT/i)).toBeInTheDocument();
      expect(screen.getByText('Modal Test Movie')).toBeInTheDocument();

      // Click preset "Must Watch"
      const mustWatchBtn = screen.getByRole('button', { name: /Must Watch/i });
      fireEvent.click(mustWatchBtn);

      // Submit
      const submitBtn = screen.getByRole('button', { name: /RECORD VERDICT/i });
      fireEvent.click(submitBtn);

      // Verify submission in store
      const summary = useVerdictStore.getState().getSummary(555551, 'movie');
      expect(summary.totalVerdicts).toBe(1);
      expect(summary.topVerdict).toBe('Must Watch');
    });
  });
});

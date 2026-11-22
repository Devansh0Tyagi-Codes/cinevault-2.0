import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  formatVoteCount,
  extractReleaseYear,
  mapTMDBMovieToNormalized,
  mapTMDBTVToNormalized,
} from '@/services/tmdb/mappers';
import { getPosterUrl, getBackdropUrl, getPlaceholderImageUri } from '@/services/tmdb/images';
import {
  tmdbFetch,
  hasTMDBKey,
  TMDBError,
  TMDBAuthError,
  TMDBRateLimitError,
  TMDBNotFoundError,
  TMDBNetworkError,
} from '@/services/tmdb/client';
import { TMDBRawMovie, TMDBRawTVShow } from '@/types/tmdb';
import MockModeBadge from '@/components/common/MockModeBadge';

describe('TMDB Integration & Normalization Suite (Milestone 2 QA)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  /* -------------------------------------------------------------------------- */
  /* 1. Data Mappers & Malformed Payload Handling                               */
  /* -------------------------------------------------------------------------- */
  describe('Data Mappers & Fallback Normalization', () => {
    it('formats vote numbers into readable editorial strings', () => {
      expect(formatVoteCount(0)).toBe('0');
      expect(formatVoteCount(450)).toBe('450');
      expect(formatVoteCount(1500)).toBe('1.5K');
      expect(formatVoteCount(14250)).toBe('14.3K');
      expect(formatVoteCount(2500000)).toBe('2.5M');
    });

    it('extracts release years cleanly from ISO dates', () => {
      expect(extractReleaseYear('2024-03-01')).toBe('2024');
      expect(extractReleaseYear('1994-10-14')).toBe('1994');
      expect(extractReleaseYear('')).toBe('N/A');
      expect(extractReleaseYear(undefined)).toBe('N/A');
      expect(extractReleaseYear('invalid-date')).toBe('N/A');
    });

    it('maps raw TMDB movie payload to NormalizedMediaItem with genre resolution', () => {
      const rawMovie: TMDBRawMovie = {
        id: 823464,
        title: 'Godzilla x Kong',
        overview: 'An all-new adventure pitting Kong against a colossal threat.',
        poster_path: '/tMefBSflR6OenvF16bMwXG2aW8S.jpg',
        backdrop_path: '/1XDDXPXGiI8id7MrUxK26VI48ue.jpg',
        release_date: '2024-03-27',
        vote_average: 7.15,
        vote_count: 3200,
        popularity: 1850.5,
        genre_ids: [28, 878],
        adult: false,
      };

      const genreMap = new Map<number, string>([
        [28, 'Action'],
        [878, 'Sci-Fi'],
      ]);

      const normalized = mapTMDBMovieToNormalized(rawMovie, genreMap);

      expect(normalized.id).toBe('movie-823464');
      expect(normalized.rawId).toBe(823464);
      expect(normalized.mediaType).toBe('movie');
      expect(normalized.title).toBe('Godzilla x Kong');
      expect(normalized.year).toBe('2024');
      expect(normalized.releaseDate).toBe('2024-03-27');
      expect(normalized.tmdbRating).toBe(7.2);
      expect(normalized.tmdbVotes).toBe('3.2K');
      expect(normalized.genreNames).toEqual(['Action', 'Sci-Fi']);
      expect(normalized.posterUrl).toContain('tMefBSflR6OenvF16bMwXG2aW8S.jpg');
      expect(normalized.backdropUrl).toContain('1XDDXPXGiI8id7MrUxK26VI48ue.jpg');
    });

    it('maps raw TMDB TV show payload safely with fallback overview', () => {
      const rawTV: TMDBRawTVShow = {
        id: 1399,
        name: 'Game of Thrones',
        overview: '',
        poster_path: null,
        backdrop_path: null,
        first_air_date: '2011-04-17',
        vote_average: 8.44,
        vote_count: 23100,
        popularity: 750.2,
        genre_ids: [18],
      };

      const normalized = mapTMDBTVToNormalized(rawTV);

      expect(normalized.id).toBe('tv-1399');
      expect(normalized.mediaType).toBe('tv');
      expect(normalized.title).toBe('Game of Thrones');
      expect(normalized.year).toBe('2011');
      expect(normalized.synopsis).toBe('Series synopsis has not yet been recorded in the archival registry.');
      expect(normalized.posterUrl).toContain('data:image/svg+xml');
      expect(normalized.tmdbRating).toBe(8.4);
      expect(normalized.tmdbVotes).toBe('23.1K');
    });

    it('gracefully handles malformed raw movie objects with missing titles or null values', () => {
      const malformedMovie = {
        id: 999999,
        title: '',
        overview: '',
        poster_path: null,
        backdrop_path: null,
        release_date: '',
        vote_average: 0,
        vote_count: 0,
        popularity: 0,
        genre_ids: [],
        adult: false,
      } as unknown as TMDBRawMovie;

      const normalized = mapTMDBMovieToNormalized(malformedMovie);

      expect(normalized.id).toBe('movie-999999');
      expect(normalized.title).toBe('Untitled Feature');
      expect(normalized.year).toBe('N/A');
      expect(normalized.synopsis).toContain('archival registry');
      expect(normalized.posterUrl).toMatch(/^data:image\/svg\+xml/);
      expect(normalized.genreNames).toEqual([]);
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 2. Image Resolution & Fallback Utilities                                   */
  /* -------------------------------------------------------------------------- */
  describe('Image Resolution & Fallback Utilities', () => {
    it('constructs correct TMDB image paths for valid identifiers', () => {
      const poster = getPosterUrl('/sample.jpg', 'w500');
      expect(poster).toContain('/w500/sample.jpg');

      const backdrop = getBackdropUrl('/backdrop.jpg', 'w1280');
      expect(backdrop).toContain('/w1280/backdrop.jpg');
    });

    it('generates compliant SVG data URIs for null, empty or undefined paths', () => {
      const nullPoster = getPosterUrl(null, 'w500', 'Missing Film');
      expect(nullPoster).toMatch(/^data:image\/svg\+xml/);
      expect(nullPoster).toContain(encodeURIComponent('Missing Film'));

      const emptyBackdrop = getBackdropUrl('', 'w1280', 'Missing Frame');
      expect(emptyBackdrop).toMatch(/^data:image\/svg\+xml/);

      const rawUri = getPlaceholderImageUri('Dune Test', 'backdrop');
      expect(rawUri).toContain(encodeURIComponent('Dune Test'));
      expect(rawUri).toContain(encodeURIComponent('[ ARCHIVAL STILL UNAVAILABLE ]'));
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 3. Credentials & Mock Mode Activation                                      */
  /* -------------------------------------------------------------------------- */
  describe('Missing Credentials & Mock Mode Activation', () => {
    it('throws TMDBAuthError immediately when calling tmdbFetch without VITE_TMDB_API_KEY', async () => {
      vi.stubEnv('VITE_TMDB_API_KEY', '');
      await expect(tmdbFetch('/trending/movie/week')).rejects.toThrow(TMDBAuthError);
    });

    it('hasTMDBKey correctly reflects absent or empty credential strings', () => {
      vi.stubEnv('VITE_TMDB_API_KEY', '');
      expect(hasTMDBKey()).toBe(false);

      vi.stubEnv('VITE_TMDB_API_KEY', '   ');
      expect(hasTMDBKey()).toBe(false);

      vi.stubEnv('VITE_TMDB_API_KEY', 'valid_test_api_key_12345');
      expect(hasTMDBKey()).toBe(true);
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 4. HTTP 429 Handling, Retry-After & Bounded Retry Behavior                 */
  /* -------------------------------------------------------------------------- */
  describe('HTTP 429 Rate Limiting & Bounded Retry Behavior', () => {
    it('parses Retry-After header and raises TMDBRateLimitError when attempts are exhausted', async () => {
      vi.stubEnv('VITE_TMDB_API_KEY', 'valid_v3_key');

      // Attempt 3 should fail immediately and surface the header value
      const mockResponse = new Response('Too Many Requests', {
        status: 429,
        headers: { 'Retry-After': '5' },
      });

      vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse);

      try {
        await tmdbFetch('/trending/movie/week', {}, 3);
        expect.unreachable('Should have thrown TMDBRateLimitError');
      } catch (err) {
        expect(err).toBeInstanceOf(TMDBRateLimitError);
        const rateLimitErr = err as TMDBRateLimitError;
        expect(rateLimitErr.statusCode).toBe(429);
        expect(rateLimitErr.retryAfterSeconds).toBe(5);
        expect(rateLimitErr.message).toContain('Retry after 5s');
      }
    });

    it('defaults to 2 seconds when Retry-After header is missing', async () => {
      vi.stubEnv('VITE_TMDB_API_KEY', 'valid_v3_key');

      const mockResponse = new Response('Too Many Requests', {
        status: 429,
        headers: {},
      });

      vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse);

      try {
        await tmdbFetch('/trending/movie/week', {}, 3);
        expect.unreachable('Should have thrown TMDBRateLimitError');
      } catch (err) {
        expect(err).toBeInstanceOf(TMDBRateLimitError);
        const rateLimitErr = err as TMDBRateLimitError;
        expect(rateLimitErr.retryAfterSeconds).toBe(2);
      }
    });

    it('retries transient 5xx server errors up to attempt 2 and throws TMDBError on attempt 3', async () => {
      vi.stubEnv('VITE_TMDB_API_KEY', 'valid_v3_key');

      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response('Internal Server Error', {
          status: 500,
          statusText: 'Internal Server Error',
        })
      );

      // Starting at attempt 1: will retry on attempt 1 -> 2 -> 3, then fail on attempt 3
      await expect(tmdbFetch('/movie/popular', {}, 1)).rejects.toThrow(TMDBError);
      expect(fetchSpy).toHaveBeenCalledTimes(3);
    });

    it('does NOT retry on 401 Unauthorized and throws TMDBAuthError immediately', async () => {
      vi.stubEnv('VITE_TMDB_API_KEY', 'invalid_key');

      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response('{"status_code":7,"status_message":"Invalid API key"}', {
          status: 401,
          statusText: 'Unauthorized',
        })
      );

      await expect(tmdbFetch('/movie/popular', {}, 1)).rejects.toThrow(TMDBAuthError);
      expect(fetchSpy).toHaveBeenCalledTimes(1); // Never retried
    });

    it('does NOT retry on 404 Not Found and throws TMDBNotFoundError immediately', async () => {
      vi.stubEnv('VITE_TMDB_API_KEY', 'valid_key');

      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response('Not Found', {
          status: 404,
          statusText: 'Not Found',
        })
      );

      await expect(tmdbFetch('/movie/99999999', {}, 1)).rejects.toThrow(TMDBNotFoundError);
      expect(fetchSpy).toHaveBeenCalledTimes(1); // Never retried
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 5. Request Timeout and AbortSignal Handling                                */
  /* -------------------------------------------------------------------------- */
  describe('Timeout and AbortSignal Handling', () => {
    it('throws TMDBNetworkError when an explicit AbortSignal is aborted', async () => {
      vi.stubEnv('VITE_TMDB_API_KEY', 'valid_key');

      const controller = new AbortController();
      controller.abort();

      vi.spyOn(globalThis, 'fetch').mockImplementation(() => {
        const error = new DOMException('The user aborted a request.', 'AbortError');
        return Promise.reject(error);
      });

      await expect(
        tmdbFetch('/movie/popular', { signal: controller.signal })
      ).rejects.toThrow(TMDBNetworkError);
    });

    it('throws TMDBNetworkError when request exceeds timeout threshold', async () => {
      vi.stubEnv('VITE_TMDB_API_KEY', 'valid_key');

      vi.spyOn(globalThis, 'fetch').mockImplementation(() => {
        const error = new DOMException('The operation was aborted due to timeout', 'TimeoutError');
        return Promise.reject(error);
      });

      await expect(tmdbFetch('/movie/popular')).rejects.toThrow(TMDBNetworkError);
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 6. Malformed JSON Response & Empty Results Handling                        */
  /* -------------------------------------------------------------------------- */
  describe('Malformed Response & Empty Payload Handling', () => {
    it('throws TMDBError when response payload contains invalid non-JSON text', async () => {
      vi.stubEnv('VITE_TMDB_API_KEY', 'valid_key');

      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response('<html><body>502 Bad Gateway Nginx</body></html>', {
          status: 200,
          headers: { 'Content-Type': 'text/html' },
        })
      );

      await expect(tmdbFetch('/trending/movie/week')).rejects.toThrow(
        'Malformed JSON payload received from TMDB.'
      );
    });

    it('handles successful API response with empty results array', async () => {
      vi.stubEnv('VITE_TMDB_API_KEY', 'valid_key');

      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(JSON.stringify({ page: 1, results: [], total_pages: 0, total_results: 0 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      );

      const res = await tmdbFetch<{ page: number; results: TMDBRawMovie[] }>('/discover/movie');
      expect(res.results).toEqual([]);
      expect(res.page).toBe(1);
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 7. Verification that Mock Data is NEVER Silently Presented as Live         */
  /* -------------------------------------------------------------------------- */
  describe('Mock Mode Visibility & Anti-Deception Verifications', () => {
    it('renders MockModeBadge with accessible role="status" and clear archival disclaimer', () => {
      render(React.createElement(MockModeBadge));

      const badge = screen.getByRole('status');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent(/ARCHIVAL DEMO \/\/ MOCK MODE ACTIVE/i);
      expect(badge).toHaveTextContent(/VITE_TMDB_API_KEY/i);
      expect(badge).toHaveTextContent(/\.env/i);
    });

    it('asserts that MockModeBadge explicitly informs user how to switch to live TMDB data', () => {
      render(React.createElement(MockModeBadge));

      expect(
        screen.getByText(/Displaying verified static demonstration records/i)
      ).toBeInTheDocument();
    });
  });
});

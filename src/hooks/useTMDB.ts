import { useQuery } from '@tanstack/react-query';
import {
  getTrendingMovies,
  getTrendingTV,
  getPopularTV,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getMovieGenres,
  getTVGenres,
  discoverByGenre,
} from '@/services/tmdb/api';
import { hasTMDBKey } from '@/services/tmdb/client';
import {
  mapTMDBMovieToNormalized,
  mapTMDBTVToNormalized,
} from '@/services/tmdb/mappers';
import { NormalizedMediaItem, DiscoveryTab } from '@/types/media';
import {
  HERO_DISPATCH,
  TRENDING_REPERTOIRE,
  RELEASE_RADAR_MOCK,
} from '@/data/mock-media';
import { TMDBRawMovie, TMDBRawTVShow } from '@/types/tmdb';

/**
 * Builds static normalized fallbacks for trending movies.
 */
function getStaticMockItems(): NormalizedMediaItem[] {
  return [
    {
      id: HERO_DISPATCH.id,
      rawId: 693134,
      mediaType: 'movie',
      title: HERO_DISPATCH.title,
      year: String(HERO_DISPATCH.year),
      releaseDate: '2024-03-01',
      synopsis: HERO_DISPATCH.synopsis,
      posterUrl: HERO_DISPATCH.posterUrl || 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      backdropUrl: HERO_DISPATCH.backdropUrl || 'https://image.tmdb.org/t/p/w1280/uhUO7vQQKvCTfQWubOt5MAKokbL.jpg',
      tmdbRating: HERO_DISPATCH.tmdbRating,
      tmdbVotes: HERO_DISPATCH.tmdbVotes,
      genreIds: [878, 12, 18],
      genreNames: HERO_DISPATCH.genres,
      popularity: 95.5,
    },
    {
      id: TRENDING_REPERTOIRE.lead.id,
      rawId: 872585,
      mediaType: 'movie',
      title: TRENDING_REPERTOIRE.lead.title,
      year: String(TRENDING_REPERTOIRE.lead.year),
      releaseDate: '2023-07-21',
      synopsis: TRENDING_REPERTOIRE.lead.synopsis,
      posterUrl: TRENDING_REPERTOIRE.lead.imageUrl,
      backdropUrl: TRENDING_REPERTOIRE.lead.imageUrl,
      tmdbRating: TRENDING_REPERTOIRE.lead.tmdbRating,
      tmdbVotes: TRENDING_REPERTOIRE.lead.tmdbVotes,
      genreIds: [18, 36],
      genreNames: TRENDING_REPERTOIRE.lead.genres,
      popularity: 88.2,
    },
    ...TRENDING_REPERTOIRE.dualFrames.map((m, idx) => ({
      id: m.id,
      rawId: 900000 + idx,
      mediaType: 'movie' as const,
      title: m.title,
      year: String(m.year),
      releaseDate: `${m.year}-06-15`,
      synopsis: m.synopsis,
      posterUrl: m.imageUrl,
      backdropUrl: m.imageUrl,
      tmdbRating: m.tmdbRating,
      tmdbVotes: m.tmdbVotes,
      genreIds: [18],
      genreNames: m.genres,
      popularity: 75.0,
    })),
    ...TRENDING_REPERTOIRE.digest.map((m, idx) => ({
      id: m.id,
      rawId: 910000 + idx,
      mediaType: 'movie' as const,
      title: m.title,
      year: String(m.year),
      releaseDate: `${m.year}-10-20`,
      synopsis: m.synopsis,
      posterUrl: m.imageUrl,
      backdropUrl: m.imageUrl,
      tmdbRating: m.tmdbRating,
      tmdbVotes: m.tmdbVotes,
      genreIds: [18],
      genreNames: m.genres,
      popularity: 60.0,
    })),
  ];
}

/**
 * Builds static mock items for Now Playing (Theatrical Releases).
 * Sourced strictly from official TMDB poster and backdrop assets.
 */
function getNowPlayingMockItems(): NormalizedMediaItem[] {
  return [
    {
      id: 'movie-693134',
      rawId: 693134,
      mediaType: 'movie',
      title: 'Dune: Part Two',
      year: '2024',
      releaseDate: '2024-03-01',
      synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      backdropUrl: 'https://image.tmdb.org/t/p/w1280/uhUO7vQQKvCTfQWubOt5MAKokbL.jpg',
      tmdbRating: 8.5,
      tmdbVotes: '14.2K',
      genreIds: [878, 12],
      genreNames: ['Sci-Fi', 'Adventure'],
      popularity: 98.4,
    },
    {
      id: 'movie-872585',
      rawId: 872585,
      mediaType: 'movie',
      title: 'Oppenheimer',
      year: '2023',
      releaseDate: '2023-07-21',
      synopsis: 'The story of J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      backdropUrl: 'https://image.tmdb.org/t/p/w1280/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg',
      tmdbRating: 8.1,
      tmdbVotes: '12.8K',
      genreIds: [18, 36],
      genreNames: ['Drama', 'History'],
      popularity: 92.1,
    },
    {
      id: 'movie-792307',
      rawId: 792307,
      mediaType: 'movie',
      title: 'Poor Things',
      year: '2023',
      releaseDate: '2023-12-08',
      synopsis: 'The incredible tale of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
      backdropUrl: 'https://image.tmdb.org/t/p/w1280/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
      tmdbRating: 7.8,
      tmdbVotes: '6.4K',
      genreIds: [35, 10749],
      genreNames: ['Comedy', 'Romance'],
      popularity: 84.3,
    },
    {
      id: 'movie-915935',
      rawId: 915935,
      mediaType: 'movie',
      title: 'Anatomy of a Fall',
      year: '2023',
      releaseDate: '2023-08-23',
      synopsis: 'A woman is suspected of murder after her husband’s death, and their blind son faces a moral dilemma as the main witness.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/lDVl2jf6VB8ODl1olZ6FLvOV1gX.jpg',
      backdropUrl: 'https://image.tmdb.org/t/p/w1280/lDVl2jf6VB8ODl1olZ6FLvOV1gX.jpg',
      tmdbRating: 7.6,
      tmdbVotes: '4.8K',
      genreIds: [18, 9648],
      genreNames: ['Drama', 'Mystery'],
      popularity: 76.5,
    },
    {
      id: 'movie-666277',
      rawId: 666277,
      mediaType: 'movie',
      title: 'Past Lives',
      year: '2023',
      releaseDate: '2023-06-02',
      synopsis: 'Nora and Hae Sung, two deeply connected childhood friends, are wrested apart after Nora’s family emigrates from South Korea.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg',
      backdropUrl: 'https://image.tmdb.org/t/p/w500/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg',
      tmdbRating: 7.9,
      tmdbVotes: '5.1K',
      genreIds: [18, 10749],
      genreNames: ['Drama', 'Romance'],
      popularity: 79.2,
    },
  ];
}

/**
 * Builds static mock items for Coming Soon (Upcoming Releases).
 */
function getUpcomingMockItems(): NormalizedMediaItem[] {
  return RELEASE_RADAR_MOCK.comingSoon.map((item, idx) => ({
    id: `upcoming-${item.id}`,
    rawId: 920000 + idx,
    mediaType: 'movie' as const,
    title: item.title,
    year: '2025',
    releaseDate: item.releaseDate || '2025-04-18',
    synopsis: `${item.title} — Directed by ${item.director}. Scheduled ${item.releaseType} debut.`,
    posterUrl: item.imageUrl,
    backdropUrl: item.imageUrl,
    tmdbRating: 8.2,
    tmdbVotes: 'Anticipated',
    genreIds: [878, 18],
    genreNames: ['Sci-Fi', 'Cinema'],
    popularity: 95.0,
  }));
}

/**
 * Builds static mock items for TV Series.
 */
function getPopularTVMockItems(): NormalizedMediaItem[] {
  return [
    {
      id: 'tv-126308',
      rawId: 126308,
      mediaType: 'tv',
      title: 'Shōgun',
      year: '2024',
      releaseDate: '2024-02-27',
      synopsis: 'When a mysterious European ship is found marooned in a nearby fishing village, Lord Yoshii Toranaga discovers secrets that could tip the scales of power.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg',
      backdropUrl: 'https://image.tmdb.org/t/p/w1280/bwSmgmd90hCWwqOKQYTEraeOZhJ.jpg',
      tmdbRating: 8.8,
      tmdbVotes: '6.8K',
      genreIds: [18, 10768],
      genreNames: ['Drama', 'War & Politics'],
      popularity: 99.1,
    },
    {
      id: 'tv-76479',
      rawId: 76479,
      mediaType: 'tv',
      title: 'The Boys',
      year: '2019',
      releaseDate: '2019-07-26',
      synopsis: 'A fun and irreverent take on what happens when superheroes abuse their superpowers rather than use them for good.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg',
      backdropUrl: 'https://image.tmdb.org/t/p/w1280/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg',
      tmdbRating: 8.5,
      tmdbVotes: '9.4K',
      genreIds: [10765, 10759],
      genreNames: ['Sci-Fi', 'Action'],
      popularity: 94.2,
    },
    {
      id: 'tv-94997',
      rawId: 94997,
      mediaType: 'tv',
      title: 'House of the Dragon',
      year: '2022',
      releaseDate: '2022-08-21',
      synopsis: 'The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg',
      backdropUrl: 'https://image.tmdb.org/t/p/w1280/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg',
      tmdbRating: 8.4,
      tmdbVotes: '8.2K',
      genreIds: [10765, 18],
      genreNames: ['Drama', 'Fantasy'],
      popularity: 91.5,
    },
  ];
}

/**
 * Builds static mock items for Top Rated Movies.
 */
function getTopRatedMockItems(): NormalizedMediaItem[] {
  return [
    {
      id: 'movie-238',
      rawId: 238,
      mediaType: 'movie',
      title: 'The Godfather',
      year: '1972',
      releaseDate: '1972-03-14',
      synopsis: 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      backdropUrl: 'https://image.tmdb.org/t/p/w1280/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
      tmdbRating: 8.7,
      tmdbVotes: '19.8K',
      genreIds: [18, 80],
      genreNames: ['Drama', 'Crime'],
      popularity: 89.0,
    },
    {
      id: 'movie-278',
      rawId: 278,
      mediaType: 'movie',
      title: 'The Shawshank Redemption',
      year: '1994',
      releaseDate: '1994-09-23',
      synopsis: 'Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
      backdropUrl: 'https://image.tmdb.org/t/p/w1280/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg',
      tmdbRating: 8.7,
      tmdbVotes: '26.4K',
      genreIds: [18, 80],
      genreNames: ['Drama', 'Crime'],
      popularity: 94.6,
    },
    {
      id: 'movie-129',
      rawId: 129,
      mediaType: 'movie',
      title: 'Spirited Away',
      year: '2001',
      releaseDate: '2001-07-20',
      synopsis: 'A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage within herself.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
      backdropUrl: 'https://image.tmdb.org/t/p/w1280/mSDsSDwaP3E7dEfUPWy4J0djt4O.jpg',
      tmdbRating: 8.5,
      tmdbVotes: '16.1K',
      genreIds: [16, 14],
      genreNames: ['Animation', 'Fantasy'],
      popularity: 87.2,
    },
  ];
}

/**
 * Hook to retrieve all movie and TV genres mapped by ID.
 */
export function useGenres() {
  const isMock = !hasTMDBKey();

  return useQuery({
    queryKey: ['tmdb', 'genres'],
    queryFn: async () => {
      if (isMock) {
        return new Map<number, string>([
          [28, 'Action'],
          [12, 'Adventure'],
          [16, 'Animation'],
          [35, 'Comedy'],
          [80, 'Crime'],
          [99, 'Documentary'],
          [18, 'Drama'],
          [14, 'Fantasy'],
          [36, 'History'],
          [27, 'Horror'],
          [10402, 'Music'],
          [9648, 'Mystery'],
          [10749, 'Romance'],
          [878, 'Sci-Fi'],
          [53, 'Thriller'],
          [10759, 'Action & Adventure'],
          [10765, 'Sci-Fi & Fantasy'],
          [10768, 'War & Politics'],
        ]);
      }

      const [movieGenres, tvGenres] = await Promise.all([
        getMovieGenres(),
        getTVGenres(),
      ]);

      const map = new Map<number, string>();
      movieGenres.forEach((g) => map.set(g.id, g.name));
      tvGenres.forEach((g) => map.set(g.id, g.name));
      return map;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

/**
 * Hook to fetch live trending movies with fallback to labeled mock mode.
 */
export function useTrendingMovies(timeWindow: 'day' | 'week' = 'week') {
  const isMock = !hasTMDBKey();
  const { data: genreMap } = useGenres();

  return useQuery({
    queryKey: ['tmdb', 'trending', 'movies', timeWindow, isMock],
    queryFn: async () => {
      if (isMock) {
        return {
          items: getStaticMockItems(),
          isMockMode: true,
        };
      }

      const response = await getTrendingMovies(timeWindow);
      const items = (response.results || []).map((m) =>
        mapTMDBMovieToNormalized(m, genreMap)
      );

      return {
        items,
        isMockMode: false,
      };
    },
    staleTime: 1000 * 60 * 10,
  });
}

/**
 * Hook to fetch Latest Releases (Now Playing in Theatres).
 */
export function useNowPlayingMovies(region?: string) {
  const isMock = !hasTMDBKey();
  const { data: genreMap } = useGenres();

  return useQuery({
    queryKey: ['tmdb', 'now_playing', region, isMock],
    queryFn: async () => {
      if (isMock) {
        return {
          items: getNowPlayingMockItems(),
          isMockMode: true,
        };
      }

      const res = await getNowPlayingMovies(1, region);
      const items = (res.results || []).map((m) =>
        mapTMDBMovieToNormalized(m, genreMap)
      );

      return {
        items,
        isMockMode: false,
      };
    },
    staleTime: 1000 * 60 * 10,
  });
}

/**
 * Hook to fetch Coming Soon (Upcoming Releases).
 */
export function useUpcomingMovies(region?: string) {
  const isMock = !hasTMDBKey();
  const { data: genreMap } = useGenres();

  return useQuery({
    queryKey: ['tmdb', 'upcoming', region, isMock],
    queryFn: async () => {
      if (isMock) {
        return {
          items: getUpcomingMockItems(),
          isMockMode: true,
        };
      }

      const res = await getUpcomingMovies(1, region);
      const items = (res.results || []).map((m) =>
        mapTMDBMovieToNormalized(m, genreMap)
      );

      return {
        items,
        isMockMode: false,
      };
    },
    staleTime: 1000 * 60 * 10,
  });
}

/**
 * Hook to fetch Popular TV Shows.
 */
export function usePopularSeries() {
  const isMock = !hasTMDBKey();
  const { data: genreMap } = useGenres();

  return useQuery({
    queryKey: ['tmdb', 'popular_tv', isMock],
    queryFn: async () => {
      if (isMock) {
        return {
          items: getPopularTVMockItems(),
          isMockMode: true,
        };
      }

      const res = await getPopularTV(1);
      const items = (res.results || []).map((tv) =>
        mapTMDBTVToNormalized(tv, genreMap)
      );

      return {
        items,
        isMockMode: false,
      };
    },
    staleTime: 1000 * 60 * 10,
  });
}

/**
 * Hook to fetch Top Rated Masterpieces.
 */
export function useTopRated() {
  const isMock = !hasTMDBKey();
  const { data: genreMap } = useGenres();

  return useQuery({
    queryKey: ['tmdb', 'top_rated', isMock],
    queryFn: async () => {
      if (isMock) {
        return {
          items: getTopRatedMockItems(),
          isMockMode: true,
        };
      }

      const res = await getTopRatedMovies(1);
      const items = (res.results || []).map((m) =>
        mapTMDBMovieToNormalized(m, genreMap)
      );

      return {
        items,
        isMockMode: false,
      };
    },
    staleTime: 1000 * 60 * 10,
  });
}

/**
 * Hook to fetch live discovery items based on active tab and optional genre filter.
 */
export function useDiscoveryFeed(
  activeTab: DiscoveryTab,
  genreId?: number
) {
  const isMock = !hasTMDBKey();
  const { data: genreMap } = useGenres();

  return useQuery({
    queryKey: ['tmdb', 'discovery', activeTab, genreId, isMock],
    queryFn: async () => {
      if (isMock) {
        let items = getStaticMockItems();
        if (activeTab === 'popular_tv') {
          items = items.map((it) => ({ ...it, mediaType: 'tv' as const }));
        }
        if (genreId) {
          items = items.filter((it) => it.genreIds.includes(genreId));
        }
        return {
          items,
          isMockMode: true,
        };
      }

      // If genre filter is active, call discover endpoint
      if (genreId) {
        const mediaType = activeTab === 'popular_tv' ? 'tv' : 'movie';
        const response = await discoverByGenre(genreId, mediaType);
        const items = (response.results || []).map((item) => {
          if (mediaType === 'tv') {
            return mapTMDBTVToNormalized(item as TMDBRawTVShow, genreMap);
          }
          return mapTMDBMovieToNormalized(item as TMDBRawMovie, genreMap);
        });
        return { items, isMockMode: false };
      }

      // Tab-specific endpoints
      if (activeTab === 'trending_movies') {
        const res = await getTrendingMovies('week');
        const items = (res.results || []).map((m) =>
          mapTMDBMovieToNormalized(m, genreMap)
        );
        return { items, isMockMode: false };
      }

      if (activeTab === 'popular_tv') {
        const res = await getTrendingTV('week');
        const items = (res.results || []).map((tv) =>
          mapTMDBTVToNormalized(tv, genreMap)
        );
        return { items, isMockMode: false };
      }

      // Top Rated
      const res = await getTopRatedMovies();
      const items = (res.results || []).map((m) =>
        mapTMDBMovieToNormalized(m, genreMap)
      );
      return { items, isMockMode: false };
    },
    staleTime: 1000 * 60 * 10,
  });
}

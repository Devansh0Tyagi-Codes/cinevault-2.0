import {
  TMDBRawMovie,
  TMDBRawTVShow,
  TMDBPaginatedResponse,
  TMDBGenreResponse,
  TMDBGenre,
} from '@/types/tmdb';
import { tmdbFetch } from './client';

export async function getNowPlayingMovies(
  page = 1,
  region?: string,
  signal?: AbortSignal
): Promise<TMDBPaginatedResponse<TMDBRawMovie>> {
  return tmdbFetch<TMDBPaginatedResponse<TMDBRawMovie>>('/movie/now_playing', {
    params: { page, region },
    signal,
  });
}

export async function getUpcomingMovies(
  page = 1,
  region?: string,
  signal?: AbortSignal
): Promise<TMDBPaginatedResponse<TMDBRawMovie>> {
  return tmdbFetch<TMDBPaginatedResponse<TMDBRawMovie>>('/movie/upcoming', {
    params: { page, region },
    signal,
  });
}

export async function getTrendingMovies(
  timeWindow: 'day' | 'week' = 'week',
  page = 1,
  signal?: AbortSignal
): Promise<TMDBPaginatedResponse<TMDBRawMovie>> {
  return tmdbFetch<TMDBPaginatedResponse<TMDBRawMovie>>(`/trending/movie/${timeWindow}`, {
    params: { page },
    signal,
  });
}

export async function getPopularMovies(
  page = 1,
  signal?: AbortSignal
): Promise<TMDBPaginatedResponse<TMDBRawMovie>> {
  return tmdbFetch<TMDBPaginatedResponse<TMDBRawMovie>>('/movie/popular', {
    params: { page },
    signal,
  });
}

export async function getTopRatedMovies(
  page = 1,
  signal?: AbortSignal
): Promise<TMDBPaginatedResponse<TMDBRawMovie>> {
  return tmdbFetch<TMDBPaginatedResponse<TMDBRawMovie>>('/movie/top_rated', {
    params: { page },
    signal,
  });
}

export async function getTrendingTV(
  timeWindow: 'day' | 'week' = 'week',
  page = 1,
  signal?: AbortSignal
): Promise<TMDBPaginatedResponse<TMDBRawTVShow>> {
  return tmdbFetch<TMDBPaginatedResponse<TMDBRawTVShow>>(`/trending/tv/${timeWindow}`, {
    params: { page },
    signal,
  });
}

export async function getPopularTV(
  page = 1,
  signal?: AbortSignal
): Promise<TMDBPaginatedResponse<TMDBRawTVShow>> {
  return tmdbFetch<TMDBPaginatedResponse<TMDBRawTVShow>>('/tv/popular', {
    params: { page },
    signal,
  });
}

export async function getTopRatedTV(
  page = 1,
  signal?: AbortSignal
): Promise<TMDBPaginatedResponse<TMDBRawTVShow>> {
  return tmdbFetch<TMDBPaginatedResponse<TMDBRawTVShow>>('/tv/top_rated', {
    params: { page },
    signal,
  });
}

export async function getMovieGenres(signal?: AbortSignal): Promise<TMDBGenre[]> {
  const data = await tmdbFetch<TMDBGenreResponse>('/genre/movie/list', { signal });
  return data.genres || [];
}

export async function getTVGenres(signal?: AbortSignal): Promise<TMDBGenre[]> {
  const data = await tmdbFetch<TMDBGenreResponse>('/genre/tv/list', { signal });
  return data.genres || [];
}

export async function discoverByGenre(
  genreId: number,
  mediaType: 'movie' | 'tv' = 'movie',
  page = 1,
  signal?: AbortSignal
): Promise<TMDBPaginatedResponse<TMDBRawMovie | TMDBRawTVShow>> {
  const endpoint = mediaType === 'movie' ? '/discover/movie' : '/discover/tv';
  return tmdbFetch<TMDBPaginatedResponse<TMDBRawMovie | TMDBRawTVShow>>(endpoint, {
    params: {
      with_genres: genreId,
      sort_by: 'popularity.desc',
      page,
    },
    signal,
  });
}

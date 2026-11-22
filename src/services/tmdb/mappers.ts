import { TMDBRawMovie, TMDBRawTVShow } from '@/types/tmdb';
import { NormalizedMediaItem } from '@/types/media';
import { getPosterUrl, getBackdropUrl } from './images';

/**
 * Formats vote numbers into compact editorial notation (e.g., 14,230 -> "14.2K").
 */
export function formatVoteCount(count: number | undefined): string {
  if (!count || count <= 0) return '0';
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toLocaleString('en-US');
}

/**
 * Extracts a clean 4-digit release year from ISO dates (e.g., "2024-03-01" -> "2024").
 */
export function extractReleaseYear(dateStr?: string): string {
  if (!dateStr || typeof dateStr !== 'string') return 'N/A';
  const match = dateStr.match(/^\d{4}/);
  return match ? match[0] : 'N/A';
}

/**
 * Maps a raw TMDB Movie record to the unified NormalizedMediaItem domain model.
 */
export function mapTMDBMovieToNormalized(
  movie: TMDBRawMovie,
  genreMap?: Map<number, string>
): NormalizedMediaItem {
  const title = movie.title || movie.original_title || 'Untitled Feature';
  const year = extractReleaseYear(movie.release_date);
  const genreIds = movie.genre_ids || [];
  const genreNames = genreIds
    .map((id) => (genreMap ? genreMap.get(id) : null))
    .filter((name): name is string => Boolean(name));

  return {
    id: `movie-${movie.id}`,
    rawId: movie.id,
    mediaType: 'movie',
    title,
    year,
    releaseDate: movie.release_date || 'Date Unannounced',
    synopsis:
      movie.overview && movie.overview.trim().length > 0
        ? movie.overview.trim()
        : 'Synopsis has not yet been recorded in the archival registry.',
    posterUrl: getPosterUrl(movie.poster_path, 'w500', title),
    backdropUrl: getBackdropUrl(movie.backdrop_path, 'w1280', title),
    tmdbRating: movie.vote_average ? Number(movie.vote_average.toFixed(1)) : 0,
    tmdbVotes: formatVoteCount(movie.vote_count),
    genreIds,
    genreNames,
    popularity: movie.popularity || 0,
  };
}

/**
 * Maps a raw TMDB TV Show record to the unified NormalizedMediaItem domain model.
 */
export function mapTMDBTVToNormalized(
  tv: TMDBRawTVShow,
  genreMap?: Map<number, string>
): NormalizedMediaItem {
  const title = tv.name || tv.original_name || 'Untitled Series';
  const year = extractReleaseYear(tv.first_air_date);
  const genreIds = tv.genre_ids || [];
  const genreNames = genreIds
    .map((id) => (genreMap ? genreMap.get(id) : null))
    .filter((name): name is string => Boolean(name));

  return {
    id: `tv-${tv.id}`,
    rawId: tv.id,
    mediaType: 'tv',
    title,
    year,
    releaseDate: tv.first_air_date || 'Air Date Unannounced',
    synopsis:
      tv.overview && tv.overview.trim().length > 0
        ? tv.overview.trim()
        : 'Series synopsis has not yet been recorded in the archival registry.',
    posterUrl: getPosterUrl(tv.poster_path, 'w500', title),
    backdropUrl: getBackdropUrl(tv.backdrop_path, 'w1280', title),
    tmdbRating: tv.vote_average ? Number(tv.vote_average.toFixed(1)) : 0,
    tmdbVotes: formatVoteCount(tv.vote_count),
    genreIds,
    genreNames,
    popularity: tv.popularity || 0,
  };
}

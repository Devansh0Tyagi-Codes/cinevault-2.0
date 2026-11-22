export type MediaType = 'movie' | 'tv';

export type DiscoveryTab = 'trending_movies' | 'popular_tv' | 'top_rated';

export interface NormalizedMediaItem {
  id: string; // e.g., "movie-823464" or "tv-1399"
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
  genreIds: number[];
  genreNames: string[];
  popularity: number;
}

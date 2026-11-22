const TMDB_IMAGE_BASE_URL =
  import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

export type PosterSize = 'w185' | 'w342' | 'w500' | 'w780' | 'original';
export type BackdropSize = 'w300' | 'w780' | 'w1280' | 'original';

/**
 * Generates an inline SVG data URI placeholder for missing media artwork.
 * Matches the Neutral Light Minimal color scheme (#EFEFED surface, #FFFFFF card, #202020 text, #E5E5E2 border, #303030 icon).
 */
export function getPlaceholderImageUri(
  title: string = 'Cinema Archive',
  type: 'poster' | 'backdrop' = 'poster'
): string {
  const isPoster = type === 'poster';
  const width = isPoster ? 500 : 1280;
  const height = isPoster ? 750 : 720;
  const safeTitle = title.replace(/[<>&"']/g, '');

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#F4F4F1"/>
  <rect x="20" y="20" width="${width - 40}" height="${height - 40}" rx="10" fill="#FFFFFF" stroke="#DEDFDC" stroke-width="1.5"/>
  <circle cx="50%" cy="38%" r="${isPoster ? '28' : '36'}" fill="#E9EAE8" stroke="#303030" stroke-width="2"/>
  <polygon points="${isPoster ? '245,280 260,288 245,296' : '632,266 652,276 632,286'}" fill="#303030"/>
  <text x="50%" y="48%" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="${isPoster ? '19' : '26'}" font-weight="700" fill="#202020" text-anchor="middle" dominant-baseline="middle">
    ${safeTitle.length > 28 ? safeTitle.slice(0, 26) + '...' : safeTitle}
  </text>
  <text x="50%" y="54%" font-family="Space Mono, monospace" font-size="${isPoster ? '11' : '13'}" font-weight="500" fill="#929292" letter-spacing="0.1em" text-anchor="middle" dominant-baseline="middle">
    [ ARCHIVAL STILL UNAVAILABLE ]
  </text>
</svg>`.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Constructs a fully qualified official TMDB image URL with fallback protection.
 */
export function getPosterUrl(
  path: string | null | undefined,
  size: PosterSize = 'w500',
  title: string = 'Film Poster'
): string {
  if (!path || typeof path !== 'string' || path.trim() === '') {
    return getPlaceholderImageUri(title, 'poster');
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${TMDB_IMAGE_BASE_URL}/${size}${cleanPath}`;
}

/**
 * Constructs a fully qualified official TMDB backdrop URL with fallback protection.
 */
export function getBackdropUrl(
  path: string | null | undefined,
  size: BackdropSize = 'w1280',
  title: string = 'Cinematography Still'
): string {
  if (!path || typeof path !== 'string' || path.trim() === '') {
    return getPlaceholderImageUri(title, 'backdrop');
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${TMDB_IMAGE_BASE_URL}/${size}${cleanPath}`;
}

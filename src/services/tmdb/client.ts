export class TMDBError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'TMDBError';
  }
}

export class TMDBAuthError extends TMDBError {
  constructor(message = 'Invalid or missing TMDB API credentials.', endpoint?: string) {
    super(message, 401, endpoint);
    this.name = 'TMDBAuthError';
  }
}

export class TMDBRateLimitError extends TMDBError {
  constructor(public retryAfterSeconds = 2, endpoint?: string) {
    super(`TMDB rate limit encountered. Retry after ${retryAfterSeconds}s.`, 429, endpoint);
    this.name = 'TMDBRateLimitError';
  }
}

export class TMDBNotFoundError extends TMDBError {
  constructor(message = 'Requested TMDB media resource could not be found.', endpoint?: string) {
    super(message, 404, endpoint);
    this.name = 'TMDBNotFoundError';
  }
}

export class TMDBNetworkError extends TMDBError {
  constructor(message = 'Network connection failed while querying TMDB services.', endpoint?: string) {
    super(message, 0, endpoint);
    this.name = 'TMDBNetworkError';
  }
}

/**
 * Checks whether a client-side TMDB v3 API Key is configured in environment variables.
 */
export function hasTMDBKey(): boolean {
  const key = import.meta.env.VITE_TMDB_API_KEY;
  return typeof key === 'string' && key.trim().length > 0;
}

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

interface RequestOptions {
  params?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
}

const isTest = import.meta.env.MODE === 'test';
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, isTest ? 10 : ms));

/**
 * Centralized HTTP Client for TMDB v3 API.
 * Features bounded exponential backoff retries, rate-limit awareness, and timeout handling.
 */
export async function tmdbFetch<T>(
  endpoint: string,
  options: RequestOptions = {},
  attempt = 1
): Promise<T> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    throw new TMDBAuthError('No TMDB v3 API key configured in VITE_TMDB_API_KEY.', endpoint);
  }

  // Build URL with query parameters
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = new URL(`${BASE_URL}${cleanEndpoint}`);
  url.searchParams.set('api_key', apiKey.trim());

  if (options.params) {
    Object.entries(options.params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        url.searchParams.set(key, String(val));
      }
    });
  }

  // Create an automatic 10-second timeout signal if caller did not provide one
  const timeoutSignal = AbortSignal.timeout ? AbortSignal.timeout(10000) : undefined;
  const effectiveSignal = options.signal || timeoutSignal;

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: effectiveSignal,
    });

    // Handle HTTP 429 Too Many Requests with bounded backoff
    if (response.status === 429) {
      const retryAfterHeader = response.headers.get('Retry-After');
      const retryAfter = retryAfterHeader ? parseInt(retryAfterHeader, 10) || 2 : 2;

      if (attempt <= 2) {
        const delay = (retryAfter * 1000) + Math.random() * 500;
        await sleep(delay);
        return tmdbFetch<T>(endpoint, options, attempt + 1);
      }
      throw new TMDBRateLimitError(retryAfter, endpoint);
    }

    // Handle Authentication Errors
    if (response.status === 401 || response.status === 403) {
      throw new TMDBAuthError('TMDB rejected API credentials.', endpoint);
    }

    // Handle 404 Not Found
    if (response.status === 404) {
      throw new TMDBNotFoundError('TMDB resource not found.', endpoint);
    }

    // Handle Transient Server Errors (5xx) with bounded retry
    if (response.status >= 500) {
      if (attempt <= 2) {
        await sleep(attempt * 1200 + Math.random() * 300);
        return tmdbFetch<T>(endpoint, options, attempt + 1);
      }
      throw new TMDBError(`TMDB service error: ${response.status} ${response.statusText}`, response.status, endpoint);
    }

    if (!response.ok) {
      throw new TMDBError(`TMDB request failed with HTTP ${response.status}`, response.status, endpoint);
    }

    try {
      const data = (await response.json()) as T;
      return data;
    } catch (parseError) {
      if (parseError instanceof SyntaxError) {
        throw new TMDBError('Malformed JSON payload received from TMDB.', response.status, endpoint);
      }
      throw parseError;
    }
  } catch (error) {
    if (error instanceof TMDBError) {
      throw error;
    }
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      throw new TMDBNetworkError('TMDB request timed out after 10 seconds.', endpoint);
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new TMDBNetworkError('TMDB request was aborted.', endpoint);
    }
    throw new TMDBNetworkError(
      error instanceof Error ? error.message : 'Unknown network failure while reaching TMDB.',
      endpoint
    );
  }
}

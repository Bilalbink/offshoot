/**
 * Base error class for Spotify-related errors
 */
export class SpotifyError extends Error {
    constructor(
        message: string,
        public statusCode: number = 500,
        public code?: string,
        public originalError?: unknown
    ) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Thrown when token exchange fails
 */
export class TokenExchangeError extends SpotifyError {
    constructor(
        message: string,
        statusCode: number = 400,
        originalError?: unknown
    ) {
        super(message, statusCode, "TOKEN_EXCHANGE_FAILED", originalError);
    }
}

/**
 * Thrown when token refresh fails
 */
export class TokenRefreshError extends SpotifyError {
    constructor(
        message: string,
        statusCode: number = 400,
        originalError?: unknown
    ) {
        super(message, statusCode, "TOKEN_REFRESH_FAILED", originalError);
    }
}

/**
 * Thrown when Spotify API returns an error
 */
export class SpotifyApiError extends SpotifyError {
    constructor(
        message: string,
        statusCode: number,
        public spotifyErrorCode?: string,
        originalError?: unknown
    ) {
        super(message, statusCode, "SPOTIFY_API_ERROR", originalError);
    }
}

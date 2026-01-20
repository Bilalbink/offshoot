/**
 * Base error class for Spotify-related errors
 */
export class SpotifyError extends Error {
    constructor(
        message: string,
        public statusCode: number = 500,
        public code?: string,
        public originalError?: unknown,
    ) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Thrown when Spotify API returns an error
 */
export class SpotifyApiError extends SpotifyError {
    constructor(message: string, statusCode: number, originalError?: unknown) {
        super(message, statusCode, "SPOTIFY_API_ERROR", originalError);
    }
}

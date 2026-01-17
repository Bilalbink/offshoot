export interface SpotifyTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}

export interface SpotifyAuthUrlResponse {
    url: string;
}

export interface SpotifyTokenExchangeRequest {
    code: string;
    state: string;
}

export interface SpotifyTokenRefreshRequest {
    refresh_token: string;
}

export interface SpotifyError {
    error: string;
    error_description?: string;
}

export type SpotifyServiceOerations = "exchange" | "refresh";

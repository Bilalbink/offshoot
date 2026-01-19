export interface SpotifyError {
    error: string;
    error_description?: string;
}

export type SpotifyServiceOerations = "exchange" | "refresh";

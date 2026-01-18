import { z } from "zod";
import {
    tokenExchangeRequestSchema,
    tokenRefreshRequestSchema,
    tokenResponseSchema,
    authUrlResponseSchema,
} from "../validators/auth.validator";

// Infer TypeScript types from Zod schemas
export type SpotifyTokenExchangeRequest = z.infer<
    typeof tokenExchangeRequestSchema
>;
export type SpotifyTokenRefreshRequest = z.infer<
    typeof tokenRefreshRequestSchema
>;
export type SpotifyTokenResponse = z.infer<typeof tokenResponseSchema>;
export type SpotifyAuthUrlResponse = z.infer<typeof authUrlResponseSchema>;

export interface SpotifyError {
    error: string;
    error_description?: string;
}

export type SpotifyServiceOerations = "exchange" | "refresh";

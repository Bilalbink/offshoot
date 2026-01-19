import { z } from "zod";
import {
    tokenExchangeRequestSchema,
    tokenRefreshRequestSchema,
    tokenResponseSchema,
    authUrlResponseSchema,
    userProfileResponseSchema,
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
export type SpotifyUserProfileResponse = z.infer<
    typeof userProfileResponseSchema
>;

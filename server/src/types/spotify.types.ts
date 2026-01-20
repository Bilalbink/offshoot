import { z } from "zod";
import { zSpotifyUserProfileSchema } from "../validators/user.validator";
export interface SpotifyError {
    error: string;
    error_description?: string;
}

export type SpotifyUserProfile = z.infer<typeof zSpotifyUserProfileSchema>;

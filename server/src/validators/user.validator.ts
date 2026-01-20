import { z } from "zod";

export const zSpotifyUserProfileSchema = z.object({
    country: z.string(),
    display_name: z.string(),
    email: z.email(),
    explicit_content: z.object({
        filter_enabled: z.boolean(),
        filter_locked: z.boolean(),
    }),
    external_urls: z.object({
        spotify: z.url(),
    }),
    followers: z.object({
        href: z.string(),
        total: z.number(),
    }),
    href: z.url(),
    id: z.string(),
    images: z.array(
        z.object({
            url: z.url(),
            height: z.number(),
            width: z.number(),
        }),
    ),
    product: z.string(),
    type: z.string(),
    uri: z.string(),
});

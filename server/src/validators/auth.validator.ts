// src/validators/auth.validator.ts
import { z } from "zod";

export const tokenExchangeRequestSchema = z.object({
    code: z
        .string({
            message: "Authorization code must be a string",
        })
        .min(1, "Authorization code cannot be empty")
        .max(500, "Authorization code is too long"),

    state: z
        .string({
            message: "State must be a string",
        })
        .min(1, "State cannot be empty")
        .max(100, "State is too long"),
});

export const tokenRefreshRequestSchema = z.object({
    refresh_token: z
        .string({
            message: "Refresh token must be a string",
        })
        .min(1, "Refresh token cannot be empty")
        .max(1000, "Refresh token is too long"),
});

export const tokenResponseSchema = z.object({
    access_token: z.string(),
    token_type: z.string(),
    expires_in: z.number().int().positive(),
    refresh_token: z.string(),
    scope: z.string(),
});

export const authUrlResponseSchema = z.object({
    url: z.string().url(),
});

export const userProfileResponseSchema = z.object({
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
        href: z.string().nullable(),
        total: z.number().int().nonnegative(),
    }),
    href: z.url(),
    id: z.string(),
    images: z.array(
        z.object({
            url: z.url(),
            height: z.number().int().positive().nullable(),
            width: z.number().int().positive().nullable(),
        })
    ),
    product: z.string(),
    type: z.string(),
    uri: z.string(),
});

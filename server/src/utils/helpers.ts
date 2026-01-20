import crypto from "crypto";

/**
 * Generates a cryptographically random string of specified length
 *
 * @param length - The desired length of the random string
 * @returns A random alphanumeric string
 *
 * @example
 * ```typescript
 * const state = generateRandomString(16);
 * // Returns something like: "aB3dEf9GhI2jKlMn"
 * ```
 */
export const generateStateToken = (length: number): string => {
    return crypto.randomBytes(length).toString("hex");
};

/**
 * Encodes client credentials for HTTP Basic Authentication
 *
 * @param clientId - The client ID from Spotify Developer Dashboard
 * @param clientSecret - The client secret from Spotify Developer Dashboard
 * @returns Base64 encoded string in the format "clientId:clientSecret"
 *
 * @example
 * ```typescript
 * const authHeader = encodeBasicAuth('my_client_id', 'my_client_secret');
 * // Use in Authorization header: `Basic ${authHeader}`
 * ```
 *
 */
export const encodeBasicAuth = (
    clientId: string,
    clientSecret: string
): string => {
    return Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
};

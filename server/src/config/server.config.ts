import "@dotenvx/dotenvx";

export const serverConfig = {
    port: process.env.PORT || 3000,
    corsOrigin: process.env.CORS_ORIGIN!,
    nodeEnv: process.env.NODE_ENV || "development",
    backendUrl: process.env.BACKEND_URL!,
    jwtSecret: process.env.JWT_SECRET!,
};

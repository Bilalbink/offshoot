import '@dotenvx/dotenvx';

export const serverConfig = {
  port: process.env.PORT || 3000,
  corsOrigin: process.env.CORS_ORIGIN || 'http://127.0.0.1:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
};
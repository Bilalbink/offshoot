import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { serverConfig } from "./config/server.config";
import { errorHandler } from "./middleware/error.middleware";

// Routes
import routes from "./routes";

const app = express();

// Trust Fly.io proxy
app.set("trust proxy", 1);

// Security headers
app.use(helmet());

// Rate Limiting - Prevent brute force/DoS
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false,
});

// Apply to all routes
app.use(limiter);

// Middleware
app.use(cors({ origin: serverConfig.corsOrigin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes (all under /api)
app.use("/api", routes);

app.use(errorHandler);

export default app;

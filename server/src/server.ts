import express, { Request, Response } from "express";
import cors from "cors";
import { serverConfig } from "./config/server.config";
import { errorHandler } from "./middleware/error.middleware";

// Routes
import routes from "./routes";

const app = express();

// Middleware
app.use(cors({ origin: serverConfig.corsOrigin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes (all under /api)
app.use("/api", routes);

export default app;

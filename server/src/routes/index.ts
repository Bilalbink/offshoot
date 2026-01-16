import { Router } from "express";
import authRoutes from "./auth.routes";

const router = Router();

/**
 * Register all application routes
 */
router.use("/auth", authRoutes);

export default router;

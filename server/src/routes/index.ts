import { Router } from "express";
import userRoutes from "./user.routes";

const router = Router();

/**
 * Register all application routes
 */
router.use("/user", userRoutes);

export default router;

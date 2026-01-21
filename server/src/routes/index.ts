import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import playlistRoutes from "./playlists.routes";

const router = Router();

/**
 * Register all application routes
 */
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/playlistRoutes", playlistRoutes);

export default router;

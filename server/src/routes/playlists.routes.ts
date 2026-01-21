import { Router } from "express";
import { verifyJWTMiddleware } from "../middleware/auth.middlewarte";
import playlistController from "../controllers/playlist.controller";

const router = Router();

// Protected route - requires authentication
router.get("/", verifyJWTMiddleware, playlistController.getUserPlaylists);
router.get(
    "/:playlistId/tracks",
    verifyJWTMiddleware,
    playlistController.getPlaylistTrackWithGenre,
);

export default router;

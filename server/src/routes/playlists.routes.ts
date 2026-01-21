import { Router } from "express";
import { verifyJWTMiddleware } from "../middleware/auth.middlewarte";
import playlistController from "../controllers/playlist.controller";
import { validate } from "../middleware/validator.middleware";
import { zSplitPlaylistRequestSchema } from "../validators/playlists.validator";
const router = Router();

// Protected route - requires authentication
router.get("/", verifyJWTMiddleware, playlistController.getUserPlaylists);
router.get(
    "/:playlistId/tracks",
    verifyJWTMiddleware,
    playlistController.getPlaylistTrackWithGenre,
);
router.post(
    "/split",
    verifyJWTMiddleware,
    validate(zSplitPlaylistRequestSchema),
    playlistController.splitPlaylist,
);

export default router;

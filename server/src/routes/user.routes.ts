import { Router } from "express";
import { verifyAppwriteSession } from "../middleware/appwrite-auth.middleware";
import userController from "../controllers/user.controller";

const router = Router();

// Protected route - requires authentication
router.get(
    "/spotify-profile",
    verifyAppwriteSession,
    userController.getSpotifyProfile,
);

export default router;

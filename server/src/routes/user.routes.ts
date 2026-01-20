import { Router } from "express";
import { verifyJWTMiddleware } from "../middleware/auth.middlewarte";
import userController from "../controllers/user.controller";

const router = Router();

// Protected route - requires authentication
router.get(
    "/spotify-profile",
    verifyJWTMiddleware,
    userController.getSpotifyProfile,
);

export default router;

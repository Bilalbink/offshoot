import { Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

/**
 * @route   GET /api/auth/spotify
 * @desc    Initiate Spotify OAuth
 * @access  Public
 */
router.get("/spotify", authController.initiateSpotifyLogin);

/**
 * @route   GET /api/auth/callback
 * @desc    Handle OAuth callback
 * @access  Public
 */
router.get("/callback", authController.handleSpotifyCallback);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Public
 */
router.post("/logout", authController.logout);

export default router;

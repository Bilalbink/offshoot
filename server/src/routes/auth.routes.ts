import { Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

// Get Spotify authorization URL
router.get("/url", authController.getAuthUrl);

// Exchange code for token
router.post("/token", authController.exchangeToken);

// Refresh access token
router.post("/refresh", authController.refreshToken);

export default router;

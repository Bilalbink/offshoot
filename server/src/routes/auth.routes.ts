import { Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

// Get Spotify authorization URL
router.get("/auth/url", authController.getAuthUrl);

// Exchange code for token
router.post("/auth/token", authController.exchangeToken);

// Refresh access token
router.post("/auth/refresh", authController.refreshToken);

export default router;

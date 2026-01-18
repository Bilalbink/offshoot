import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validate } from "../middleware/validator.middleware";
import {
    tokenExchangeRequestSchema,
    tokenRefreshRequestSchema,
} from "../validators/auth.validator";

const router = Router();

// Get Spotify authorization URL
router.get("/url", authController.getAuthUrl);

// Exchange code for token
router.post(
    "/token",
    validate(tokenExchangeRequestSchema, "body"),
    authController.exchangeToken
);

// Refresh access token
router.post(
    "/refresh",
    validate(tokenRefreshRequestSchema, "body"),
    authController.refreshToken
);

export default router;

import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt";
import { logger } from "../utils/logger";

export const verifyJWTMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                error: "UNAUTHORIZED",
                message: "No token provided",
            });
            return;
        }

        const token = authHeader.replace("Bearer ", "");
        const decoded = verifyJWT(token);

        req.user = decoded;
        logger.info("JWT verified", { userId: decoded.userId });

        next();
    } catch (error) {
        logger.error("JWT verification failed", { error });
        res.status(401).json({
            error: "INVALID_TOKEN",
            message: "Invalid or expired token",
        });
    }
};

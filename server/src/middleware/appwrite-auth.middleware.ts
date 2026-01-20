import { Request, Response, NextFunction } from "express";
import { createSessionClient } from "../config/appwrite.config";

export const verifyAppwriteSession = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const session = req.headers.authorization?.replace("Bearer ", "");

        if (!session) {
            res.status(401).json({
                error: "UNAUTHORIZED",
                message: "No session token provided",
            });
            return;
        }

        // Verify session with Appwrite
        const { account } = createSessionClient(session);
        const user = await account.get();

        // Attach user and session to request
        req.user = user;
        req.session = session;

        next();
    } catch (error) {
        res.status(401).json({
            error: "INVALID_SESSION",
            message: "Invalid or expired session",
        });
    }
};

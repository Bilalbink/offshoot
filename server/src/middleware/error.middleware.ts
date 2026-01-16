import { Request, Response, NextFunction } from "express";
import { SpotifyError } from "../errors/spotify.errors";

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // Handle custom Spotify errors
    if (error instanceof SpotifyError) {
        res.status(error.statusCode).json({
            error: error.code,
            message: error.message,
            ...(process.env.NODE_ENV === "development" && {
                stack: error.stack,
            }),
        });
        return;
    }

    // Handle generic errors
    res.status(500).json({
        error: "INTERNAL_SERVER_ERROR",
        message:
            process.env.NODE_ENV === "development"
                ? error.message
                : "An unexpected error occurred",
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
};

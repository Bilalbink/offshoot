import jwt from "jsonwebtoken";
import { serverConfig } from "../config/server.config";

interface JWTPayload {
    userId: string;
    email: string;
}

export const generateJWT = (payload: JWTPayload): string => {
    return jwt.sign(payload, serverConfig.jwtSecret, {
        expiresIn: "7d",
    });
};

export const verifyJWT = (token: string): JWTPayload => {
    return jwt.verify(token, serverConfig.jwtSecret) as JWTPayload;
};

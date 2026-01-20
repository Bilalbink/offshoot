import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";

/**
 * Validates request body, query params, or route params against a Zod schema
 */
export const validate = (
    schema: ZodObject,
    source: "body" | "query" | "params" = "body"
) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const dataToValidate = req[source];

            // Validate and parse the data
            const validated = await schema.parseAsync(dataToValidate);

            // Replace the original data with validated data
            req[source] = validated;

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    error: "VALIDATION_ERROR",
                    message: "Invalid request data",
                    details: error.issues.map((err) => ({
                        field: err.path.join("."),
                        message: err.message,
                    })),
                });
                return;
            }

            next(error);
        }
    };
};

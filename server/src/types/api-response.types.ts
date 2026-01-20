/**
 * Standard success response wrapper
 */
export interface SuccessResponse<T = unknown> {
    success: true;
    data: T;
    message?: string;
}

/**
 * Standard error response wrapper
 */
export interface ErrorResponse {
    success: false;
    error: string;
    message: string;
    details?: Array<{
        field: string;
        message: string;
    }>;
    stack?: string; // Only in development
}

/**
 * Generic API response type
 */
export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

declare global {
    namespace Express {
        interface Request {
            user?: {
                $id: string;
                name: string;
                email: string;
                [key: string]: any;
            };
            session?: string;
        }
    }
}

export {};

import "@dotenvx/dotenvx";
import { Client, Account, Users } from "node-appwrite";

export const appwriteConfig = {
    endpoint: process.env.APPWRITE_ENDPOINT!,
    projectId: process.env.APPWRITE_PROJECT_ID!,
    apiKey: process.env.APPWRITE_API_KEY!,
};

if (
    !appwriteConfig.projectId ||
    !appwriteConfig.apiKey ||
    !appwriteConfig.endpoint
) {
    throw new Error("Missing Appwrite configuration");
}

// Admin client (for server operations)
export const createAdminClient = () => {
    const client = new Client()
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId)
        .setKey(appwriteConfig.apiKey);

    return {
        account: new Account(client),
        users: new Users(client),
    };
};

export const createSessionClient = (session: string) => {
    const client = new Client()
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId)
        .setSession(session);

    return {
        account: new Account(client),
    };
};

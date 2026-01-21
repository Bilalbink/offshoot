import { useState, createContext, useContext, type ReactNode } from "react";

interface UserContextType {
    spotifyUserId: string | null;
    setSpotifyUserId: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used inside UserProvider");
    return ctx;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [spotifyUserId, setSpotifyUserId] = useState<string | null>(null);
    return (
        <UserContext.Provider value={{ spotifyUserId, setSpotifyUserId }}>
            {children}
        </UserContext.Provider>
    );
};

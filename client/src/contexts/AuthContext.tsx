import { createContext, useContext, type ReactNode } from "react";
import authService from "../services/auth.service";

interface AuthContextType {
    authService: typeof authService;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    return (
        <AuthContext.Provider value={{ authService }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

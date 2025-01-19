import React, { createContext, useState, useContext, useEffect } from "react";
import { onIdTokenChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    user: User | null;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (user) {
                const newToken = await user.getIdToken();
                setToken(newToken);
            } else {
                setToken(null);
            }
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

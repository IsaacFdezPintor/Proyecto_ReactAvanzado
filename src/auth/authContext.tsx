import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AuthSession, User } from "../types/Auth";
import { authStorage } from "./authStorage";

type AuthContextValue = {
    user: User | null;
    isAuthenticated: boolean;
    login: (session: AuthSession) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const initial: AuthSession | null = authStorage.get();

    const [user, setUser] = useState<User | null>(initial?.user ?? null)
    const [token, setToken] = useState<string | null>(initial?.token ?? null)

    function syncFromStorage() {
        const session: AuthSession | null = authStorage.get();
        setUser(session?.user ?? null)
        setToken(session?.token ?? null)
    }

    function login(session: AuthSession) {
        authStorage.set(session);
        setUser(session.user);
        setToken(session.token);
    }

    function logout() {
        authStorage.clear();
        setUser(null);
        setToken(null);
    }

    const value = useMemo<AuthContextValue>(() => {
        return {
            user,
            isAuthenticated: Boolean(user),
            login,
            logout
        };
    }, [user, token])

    useEffect(() => {
        window.addEventListener("storage", syncFromStorage)
        return window.removeEventListener("storage", syncFromStorage)
    })

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const contexto = useContext(AuthContext);
    if (!contexto) throw new Error("useAuth debe usarse dentro de <AuthProvider />");
    return contexto;
}
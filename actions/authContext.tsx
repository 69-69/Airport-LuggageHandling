'use client';

import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import {UserRole} from "@/types/userRole";
import {useRouter} from "next/navigation";

type User = {
    role: UserRole;
    username: string;
    airlineCode?: string;
    accessLevel?: string; // Gate (G1, G2, etc) or Security Clearance
};

type AuthContextType = {
    user: User | null;
    login: (user: User, remember?: boolean, redirectPath?: string) => void;
    logout: (redirectPath?: string) => void;
    loading: boolean;
};


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    // Restore session on first load
    useEffect(() => {
        const storedUser =
            localStorage.getItem("user") ||
            sessionStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);


    const _redirectPage = (redirectPath: string | undefined) => {
        if (redirectPath) {
            // Redirect after Auth Context update
            setTimeout(() => {
                router.push(redirectPath);
            }, 0);
        }
    }

    // Login
    const login = (user: User, remember = false, redirectPath?: string) => {
        setUser(user);


        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("user", JSON.stringify(user));

        _redirectPage(redirectPath);
    };

    const logout = (redirectPath?: string) => {
        setUser(null);
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");

        _redirectPage(redirectPath);
    }

    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }
    return context;
}

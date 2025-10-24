"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// =========================
// ✅ Backend user type (matches API)
// =========================
interface BackendUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// =========================
// ✅ Frontend user type (clean for app)
// =========================
export interface UserInterface {
  id: string;
  name: string;
  email: string;
  role: string;
}

// =========================
// ✅ Auth context type
// =========================
interface AuthContextType {
  isLoggedIn: boolean;
  user: UserInterface | null;
  login: (token: string, user: BackendUser) => void;
  logout: () => void;
}

// =========================
// ✅ Create context
// =========================
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =========================
// ✅ Provider component
// =========================
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInterface | null>(null);

  // Check localStorage for token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser: BackendUser = JSON.parse(userData);

        // Normalize backend _id to frontend id
        const normalizedUser: UserInterface = {
          id: parsedUser._id,
          name: parsedUser.name,
          email: parsedUser.email,
          role: parsedUser.role,
        };

        setUser(normalizedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Login function (normalize backend user)
  const login = (token: string, backendUser: BackendUser) => {
    const normalizedUser: UserInterface = {
      id: backendUser._id,
      name: backendUser.name,
      email: backendUser.email,
      role: backendUser.role,
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(backendUser)); // store original backend user
    setUser(normalizedUser);
    setIsLoggedIn(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// =========================
// ✅ Hook to use context
// =========================
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

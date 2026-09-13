import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthUser, DEMO_USERS, UserRole } from "../data/mockData";

interface AuthContextType {
  user: AuthUser | null;
  login: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "theodra_demo_user_role";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const savedRole = localStorage.getItem(STORAGE_KEY) as UserRole | null;
      if (savedRole && DEMO_USERS[savedRole]) {
        return DEMO_USERS[savedRole];
      }
    } catch {
      // Ignore localStorage errors
    }
    return null;
  });

  const login = (role: UserRole) => {
    const selectedUser = DEMO_USERS[role];
    setUser(selectedUser);
    try {
      localStorage.setItem(STORAGE_KEY, role);
    } catch {
      // Ignore
    }
  };

  const switchRole = (role: UserRole) => {
    login(role);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        switchRole,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

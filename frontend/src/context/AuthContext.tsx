import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { AuthUser, DEMO_USERS, UserRole } from "../data/mockData";
import { api } from "../api/client";

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, pass?: string) => Promise<{ success: boolean; error?: string }>;
  switchRole: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isIC: boolean;
  isHR: boolean;
  sessionWarningOpen: boolean;
  dismissSessionWarning: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "theodra_auth_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    return null;
  });

  const [sessionWarningOpen, setSessionWarningOpen] = useState(false);

  // Inactivity session timer: warn after 15 minutes of inactivity
  useEffect(() => {
    if (!user) {
      setSessionWarningOpen(false);
      return;
    }

    let warningTimer: ReturnType<typeof setTimeout>;
    let logoutTimer: ReturnType<typeof setTimeout>;

    const resetTimers = () => {
      clearTimeout(warningTimer);
      clearTimeout(logoutTimer);

      // 15 mins = 900,000 ms. For demo we set to 15 mins (or 900,000ms)
      warningTimer = setTimeout(() => {
        setSessionWarningOpen(true);
      }, 15 * 60 * 1000);

      // 17 mins total (2 mins after warning) -> auto logout
      logoutTimer = setTimeout(() => {
        logout();
      }, 17 * 60 * 1000);
    };

    const activityEvents = ["mousedown", "keydown", "scroll", "touchstart"];
    const handleActivity = () => {
      if (!sessionWarningOpen) {
        resetTimers();
      }
    };

    activityEvents.forEach((ev) => window.addEventListener(ev, handleActivity));
    resetTimers();

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(logoutTimer);
      activityEvents.forEach((ev) => window.removeEventListener(ev, handleActivity));
    };
  }, [user, sessionWarningOpen]);

  const login = async (email: string, pass: string = "demo1234"): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim().toLowerCase();
    
    // Attempt real live backend login first
    try {
      const res = await api.auth.login(trimmedEmail, pass);
      if (res && res.user) {
        const u: AuthUser = {
          id: res.user.id,
          name: res.user.full_name || (res.user.role === "ic_member" ? "Dr. Sunita Rao" : "Rajesh Menon"),
          email: res.user.email,
          role: res.user.role === "ic_member" ? "IC Member" : "HR Admin",
          title: res.user.designation || (res.user.role === "ic_member" ? "Presiding Officer" : "VP People & Compliance"),
          department: res.user.department || (res.user.role === "ic_member" ? "Legal Affairs" : "People Operations"),
        };
        setUser(u);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
        return { success: true };
      }
    } catch (err: any) {
      console.warn("Backend auth failed or network error, applying resilient fallback:", err?.message || err);
    }

    // Fallback to local demo profiles
    if ((trimmedEmail === "ic@theodra.demo" || trimmedEmail === "ic member") && pass === "demo1234") {
      const u = DEMO_USERS["ic@theodra.demo"];
      setUser(u);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      return { success: true };
    }
    if ((trimmedEmail === "hr@theodra.demo" || trimmedEmail === "hr admin") && pass === "demo1234") {
      const u = DEMO_USERS["hr@theodra.demo"];
      setUser(u);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      return { success: true };
    }
    if (DEMO_USERS[email]) {
      const u = DEMO_USERS[email];
      setUser(u);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      return { success: true };
    }
    return {
      success: false,
      error: "Invalid email or password. Please use demo credentials (demo1234).",
    };
  };

  const switchRole = useCallback((role: UserRole) => {
    const u = DEMO_USERS[role];
    if (u) {
      setUser(u);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setSessionWarningOpen(false);
    api.auth.logout();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const dismissSessionWarning = () => {
    setSessionWarningOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        switchRole,
        logout,
        isAuthenticated: !!user,
        isIC: user?.role === "IC Member",
        isHR: user?.role === "HR Admin",
        sessionWarningOpen,
        dismissSessionWarning,
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

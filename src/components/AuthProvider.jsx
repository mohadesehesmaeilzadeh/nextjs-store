"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  clearStoredAuthSession,
  mockLogin,
  readStoredAuthSession,
  storeAuthSession,
} from "../lib/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children, initialSession = null }) {
  const [session, setSession] = useState(initialSession);
  const [isHydrated, setIsHydrated] = useState(Boolean(initialSession));

  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      setSession(readStoredAuthSession() || initialSession);
      setIsHydrated(true);
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
  }, [initialSession]);

  const value = useMemo(
    () => ({
      isHydrated,
      session,
      async login(credentials) {
        const user = await mockLogin(credentials);
        storeAuthSession(user);
        setSession(user);
        return user;
      },
      logout() {
        clearStoredAuthSession();
        setSession(null);
      },
    }),
    [isHydrated, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}

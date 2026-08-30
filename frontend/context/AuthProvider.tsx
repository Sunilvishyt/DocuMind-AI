"use client";

import { useCallback, useState, useEffect } from "react";
import { AuthContext, type User } from "./AuthContext";
import { useRouter } from "next/navigation";
import api from "@/lib/axios"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.post("/auth/login", {
          email,
          password,
        });

        const data = response.data;

        setUser(data.user);

        // Redirect to home
        router.push("/home");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Login failed";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  const register = useCallback(
    async (
      username: string,
      email: string,
      password: string,
      confirmPassword: string,
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.post(
          "/auth/register",
          {
            username,
            email,
            password,
            confirm_password: confirmPassword,
          },
        );

        // After successful registration, redirect to login
        router.push("/auth/login");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Registration failed";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  const logout = useCallback(() => {
    api.post("/auth/logout");
    setUser(null);
    setError(null);
    router.push("/auth/login");
  }, [router]);

  const value = {
    user,
    isLoading,
    error,
    isInitializing,
    setIsInitializing,
    setUser,
    login,
    register,
    logout,
    isAuthenticated: Boolean(user),
  };

  if (isInitializing) return <div>initializing...</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

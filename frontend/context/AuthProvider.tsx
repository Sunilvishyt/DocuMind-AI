"use client";

import { useCallback, useEffect, useState } from "react";
import { AuthContext, type User } from "./AuthContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import api from "@/lib/axios"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setError("");
  }, [pathname]);

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
      } catch (err: any) {
        console.log(err)
        setError(err.response.data.detail);
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
        await api.post(
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
      } catch (err: any) {
        setError(err.response.data.detail);
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

  if (isInitializing) return <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

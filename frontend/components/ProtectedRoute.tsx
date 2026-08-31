"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { type User } from "@/context/AuthContext";
import api from "@/lib/axios";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { setIsInitializing, user, setUser, isInitializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsInitializing(true);
        const response = await api.get("/auth/me");

        const userData: User = response.data;
        setUser(userData);
      } catch (error) {
        setUser(null);
        router.push("/auth/login");
      } finally {
        setIsInitializing(false);
      }
    };
    if (!user && !isInitializing) checkAuthStatus();
  }, [router, setIsInitializing, user, setUser, isInitializing]);


  return <>{children}</>;
}

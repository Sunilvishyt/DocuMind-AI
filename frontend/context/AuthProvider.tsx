import { useCallback, useState, useEffect } from "react";
import { AuthContext, type User } from "./AuthContext";
import { useRouter } from "next/navigation";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   const checkAuthStatus = async () => {
  //     try {
  //       setIsInitializing(true);
  //       const response = await fetch("http://localhost:8000/api/auth/me", {
  //         method: "GET",
  //         credentials: "include",
  //       });

  //       if (!response.ok) {
  //         throw new Error("Uauthorized");
  //       }

  //       const userData: User = await response.json();
  //       setUser(userData);
  //     } catch (error) {
  //       setUser(null);
  //       console.error("Auth verification failed:", error);
  //       router.push("/auth/login");
  //     } finally {
  //       setIsInitializing(false);
  //     }
  //   };
  //   checkAuthStatus();
  // }, [router]);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:8000/api/auth/login", {
          method: "POST",
          credentials: "include", // REQUIRED for cookies
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.detail || "Login failed"); //necessary to throw error only then it will go in catch block.
        }

        const data = await response.json();

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
        const response = await fetch(
          "http://localhost:8000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              email,
              password,
              confirm_password: confirmPassword,
            }),
          },
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.detail || "Registration failed");
        }

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
    fetch("http://localhost:8000/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
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

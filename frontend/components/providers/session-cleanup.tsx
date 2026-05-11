"use client";

import { useEffect, ReactNode } from "react";

export function SessionCleanup({ children }: { children: ReactNode }) {
  useEffect(() => {
    const handleBeforeUnload = async () => {
      try {
        // Call the clear-session endpoint to clean up documents and vectors
        await fetch("http://localhost:8000/clear-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Error clearing session:", error);
      }
    };

    // Add event listener for when user closes the tab/browser
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return <>{children}</>;
}

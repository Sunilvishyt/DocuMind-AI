"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2.5 rounded-lg transition-all duration-200 bg-card hover:bg-card/80 border border-border hover:border-border/80 text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground"
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <div className="flex gap-2 items-center">
          <Sun size={18} className="text-amber-400" /> Switch to Light Mode
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <Moon size={18} className="text-amber-600" /> Switch to dark mode
        </div>
      )}
    </button>
  );
}

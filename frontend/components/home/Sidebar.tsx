import { Settings, UserCircle2, Users, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: "assistants" | "settings") => void;
}) {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-sidebar/50 backdrop-blur-xl flex flex-col justify-between z-40">
      <div>
        <div className="px-6 mb-10 mt-10">
          <div className="text-lg font-bold text-foreground mb-1">
            DocuMind AI
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest">
            Premium Tier
          </div>
        </div>

        <div className="flex-1 px-3 space-y-2">
          <button
            onClick={() => setActiveTab("assistants")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              activeTab === "assistants"
                ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-sidebar-primary"
                : "text-muted-foreground hover:bg-sidebar/50 hover:text-foreground border-l-2 border-transparent"
            }`}
          >
            <Users size={18} />
            <span className="text-sm font-medium">Assistants</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              activeTab === "settings"
                ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-sidebar-primary"
                : "text-muted-foreground hover:bg-sidebar/50 hover:text-foreground border-l-2 border-transparent"
            }`}
          >
            <Settings size={18} />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </div>

      {/* Bottom Section with Theme Toggle and Profile */}
      <div className="p-4 border-t border-border space-y-3">
        <ThemeToggle />
        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 dark:hover:bg-white/5 transition-colors group">
          <div className="flex items-center gap-3">
            <UserCircle2
              size={32}
              className="text-muted-foreground group-hover:text-foreground transition-colors"
            />
            <div className="text-left flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {user?.username || "User"}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}

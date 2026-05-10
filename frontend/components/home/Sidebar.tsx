import { ChevronsUpDown, Settings, UserCircle2, Users } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Sidebar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: "assistants" | "settings") => void;
}) {
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
        <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 dark:hover:bg-white/5 transition-colors group">
          <div className="flex items-center gap-3">
            <UserCircle2
              size={32}
              className="text-muted-foreground group-hover:text-foreground transition-colors"
            />
            <div className="text-left flex flex-col">
              <span className="text-sm font-medium text-foreground">
                Dr. Smith
              </span>
              <span className="text-xs text-muted-foreground">ID: NX-8842</span>
            </div>
          </div>
          <ChevronsUpDown size={14} className="text-muted-foreground" />
        </button>
      </div>
    </aside>
  );
}

import { ChevronsUpDown, Settings, UserCircle2, Users } from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: "assistants" | "settings") => void;
}) {
  return (
    <aside className="w-64 shrink-0 border-r border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between z-40">
      <div>
        <div className="px-6 mb-10 mt-10">
          <div className="text-lg font-bold text-slate-100 mb-1">
            DocuMind AI
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-widest">
            Premium Tier
          </div>
        </div>

        <div className="flex-1 px-3 space-y-2">
          <button
            onClick={() => setActiveTab("assistants")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              activeTab === "assistants"
                ? "bg-white/10 text-slate-50 border-l-2 border-indigo-500"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border-l-2 border-transparent"
            }`}
          >
            <Users size={18} />
            <span className="text-sm font-medium">Assistants</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              activeTab === "settings"
                ? "bg-white/10 text-slate-50 border-l-2 border-indigo-500"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border-l-2 border-transparent"
            }`}
          >
            <Settings size={18} />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </div>

      {/* Bottom ID / Profile Switcher */}
      <div className="p-4 border-t border-white/5">
        <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
          <div className="flex items-center gap-3">
            <UserCircle2
              size={32}
              className="text-slate-400 group-hover:text-slate-200 transition-colors"
            />
            <div className="text-left flex flex-col">
              <span className="text-sm font-medium text-slate-200">
                Dr. Smith
              </span>
              <span className="text-xs text-slate-500">ID: NX-8842</span>
            </div>
          </div>
          <ChevronsUpDown size={14} className="text-slate-500" />
        </button>
      </div>
    </aside>
  );
}

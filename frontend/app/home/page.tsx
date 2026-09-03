"use client";

import { useState } from "react";
import Sidebar from "@/components/home/Sidebar";
import ExpertSelection from "@/components/home/ExpertSelection";
import HomeSettings from "@/components/home/HomeSettings";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Menu } from "lucide-react";

export default function AssistantSelector() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"assistants" | "settings">(
    "assistants",
  );

  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full bg-background text-foreground antialiased overflow-hidden font-sans">
        {/* Sidebar Navigation */}
        {isSidebarOpen && (
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto relative">
          {!isSidebarOpen && (
            <div className="absolute top-6 left-6 z-50">
              <button
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu />
              </button>
            </div>
          )}
          <div className="max-w-7xl mx-auto px-10 py-12">
            {activeTab === "assistants" ? (
              <ExpertSelection />
            ) : (
              <HomeSettings />
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

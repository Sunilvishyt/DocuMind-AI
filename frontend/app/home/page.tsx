"use client";

import { useState } from "react";
import Sidebar from "@/components/home/Sidebar";
import ExpertSelection from "@/components/home/ExpertSelection";
import HomeSettings from "@/components/home/HomeSettings";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {useAuth} from "@/context/AuthContext";

export default function AssistantSelector() {
  const [activeTab, setActiveTab] = useState<"assistants" | "settings">(
    "assistants",
  );



  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full bg-background text-foreground antialiased overflow-hidden font-sans">
        {/* Sidebar Navigation */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto relative">
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

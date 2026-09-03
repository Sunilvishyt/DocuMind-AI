"use client";
import { ASSISTANT_MODES } from "@/lib/assistants-config";
import { ChatMain } from "@/components/chat/chat-main";
import { ChatInsights } from "@/components/chat/chat-right-sidebar";
import { useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function ChatPage() {
  const [fileName, setFileName] = useState("");
  const [docStatus, setDocStatus] = useState("Start your Analysis");
  const [docReady, setDocReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
        {/* Main Chat Workspace */}
        <ChatMain
          fileName={fileName}
          setFileName={setFileName}
          color={ASSISTANT_MODES.MEDICAL.color}
          docStatus={docStatus}
          setDocStatus={setDocStatus}
          docReady={docReady}
          setDocReady={setDocReady}
          assistantType="medical"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Right Sidebar: Medical Mode & Suggestions */}
        {sidebarOpen && (
          <div className="fixed inset-y-0 right-0 z-50 w-full md:relative md:w-80 animate-in slide-in-from-right md:animate-none">
            <ChatInsights
              config={ASSISTANT_MODES.MEDICAL}
              setFileName={setFileName}
              setDocStatus={setDocStatus}
              setDocReady={setDocReady}
              setSidebarOpen={setSidebarOpen}
            />
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

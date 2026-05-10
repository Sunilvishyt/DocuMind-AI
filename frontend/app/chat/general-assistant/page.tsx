"use client";
import { ASSISTANT_MODES } from "@/lib/assistants-config";
import { ChatMain } from "@/components/chat/chat-main";
import { ChatInsights } from "@/components/chat/chat-right-sidebar";
import { useState } from "react";

export default function ChatPage() {
  // In a real app, fetch messages here.
  const [fileName, setFileName] = useState("");

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Left Sidebar: Chat History */}

      {/* Main Chat Workspace */}
      <ChatMain fileName={fileName} color={ASSISTANT_MODES.GENERAL.color} />

      {/* Right Sidebar: Medical Mode & Suggestions */}
      <ChatInsights
        config={ASSISTANT_MODES.GENERAL}
        setFileName={setFileName}
      />
    </div>
  );
}

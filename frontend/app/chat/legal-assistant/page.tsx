"use client";
import { ASSISTANT_MODES } from "@/lib/assistants-config";
import { ChatMain } from "@/components/chat/chat-main";
import { ChatInsights } from "@/components/chat/chat-right-sidebar";
import { useState } from "react";

export default function ChatPage() {
  // In a real app, fetch messages here.
  const [fileName, setFileName] = useState("");

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0e1116] text-[#e4e2e4]">
      {/* Left Sidebar: Chat History */}

      {/* Main Chat Workspace */}
      <ChatMain fileName={fileName} color={ASSISTANT_MODES.LEGAL.color} />

      {/* Right Sidebar: Medical Mode & Suggestions */}
      <ChatInsights config={ASSISTANT_MODES.LEGAL} setFileName={setFileName} />
    </div>
  );
}

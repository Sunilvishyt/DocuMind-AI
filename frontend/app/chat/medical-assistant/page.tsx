"use client";
import { ASSISTANT_MODES } from "@/lib/assistants-config";
import { ChatMain } from "@/components/chat/chat-main";
import { ChatInsights } from "@/components/chat/chat-right-sidebar";
import { useState } from "react";

export default function ChatPage() {
  const [fileName, setFileName] = useState("");
  const [docStatus, setDocStatus] = useState("Start your Analysis");
  const [docReady, setDocReady] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Main Chat Workspace */}
      <ChatMain
        fileName={fileName}
        color={ASSISTANT_MODES.MEDICAL.color}
        docStatus={docStatus}
        docReady={docReady}
        assistantType="medical"
      />

      {/* Right Sidebar: Medical Mode & Suggestions */}
      <ChatInsights
        config={ASSISTANT_MODES.MEDICAL}
        setFileName={setFileName}
        setDocStatus={setDocStatus}
        setDocReady={setDocReady}
      />
    </div>
  );
}

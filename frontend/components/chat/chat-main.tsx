"use client";
import { useState } from "react";
import {
  Bot,
  User,
  Send,
  Sparkles,
  FileText,
  UploadCloud,
  ShieldCheck,
  Menu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { FileUploadStruc } from "../shadcn-space/file-upload/file-upload-01";

export function ChatMain({
  fileName,
  setFileName,
  color,
  docStatus,
  setDocStatus,
  docReady,
  setDocReady,
  assistantType = "general",
  sidebarOpen,
  setSidebarOpen,
}: {
  fileName: string;
  setFileName: (fileName: string) => void;
  color: string;
  docStatus: string;
  setDocStatus: (status: string) => void;
  docReady: boolean;
  setDocReady: (ready: boolean) => void;
  assistantType?: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [query, setQuery] = useState("");
  const router = useRouter();

  async function handleMessageSend() {
    if (!query.trim()) return;

    // Don't allow chat if no document is uploaded
    if (!docReady) {
      alert("Please upload a document first");
      return;
    }

    setIsThinking(true);
    setMessages((prev) => [...prev, { role: "user", content: query }]);

    try {
      const response = await api.post("/chat", {
        question: query,
        assistant_type: assistantType,
      });

      const data = response.data;
      const answer =
        typeof data.answer === "string"
          ? data.answer
          : (JSON.stringify(data.answer) ?? "");

      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${error instanceof Error ? error.message : "Failed to get response"}`,
        },
      ]);
    } finally {
      setIsThinking(false);
      setQuery("");
    }
  }

  async function handleFileChange(files: File[]) {
    try {
      const file = files[0];
      if (file) {
        console.log("File uploaded:", file.name);
        setFileName(file.name);

        const formData = new FormData();
        formData.append("file", file);
        setDocStatus("Uploading PDF...");
        const response = await api.post("/upload", formData);
        if (response.data.message === "success") {
          setDocStatus(`PDF Uploaded - ${response.data.chunks} chunks created`);
          setDocReady(true);
        } else if (response.data.error) {
          setDocStatus(`Error: ${response.data.error}`);
        }
      }
    } catch (error) {
      setDocStatus(
        `Error uploading file: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  return (
    <main className=" flex-1 flex flex-col relative bg-background">
      {/* IMPROVED HEADER */}
      <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-card/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div
            style={{ "--my-color": color } as React.CSSProperties}
            className={`size-2 rounded-full animate-pulse ${fileName ? "bg-(--my-color)" : "bg-muted-foreground"}`}
          />
          <div className="flex flex-col">
            <p className="text-sm font-medium text-foreground">
              {docReady ? fileName : "Awaiting Document..."}
            </p>
          </div>
        </div>
        <div
          style={{ "--my-color": color } as React.CSSProperties}
          className="flex items-center gap-2 p-3 py-1 rounded-lg bg-(--my-color)/5 border border-(--my-color)/10"
        >
          <button
            className=" hover:bg-(--my-color)/10"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 py-8 space-y-8 pb-32">
        <AnimatePresence mode="wait">
          {messages.length === 0 ? (
            /* IMPROVED EMPTY STATE */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6"
            >
              <div
                style={{ "--my-color": color } as React.CSSProperties}
                className="size-20 rounded-3xl bg-(--my-color)/10 border border-(--my-color)/20 flex items-center justify-center text-(--my-color) shadow-2xl shadow-(--my-color)/10"
              >
                {fileName ? <FileText size={40} /> : <UploadCloud size={40} />}
              </div>
              <div className="space-y-2">
                <h2
                  className={`text-xl font-semibold text-foreground ${docStatus == "Uploading PDF..." ? "animate-pulse" : ""}`}
                >
                  {docStatus}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {fileName
                    ? `I've processed "${fileName}". You can now ask for summaries, data extraction, or clinical insights.`
                    : "Upload a medical record, lab result, or pathology report in the sidebar to begin your secure AI-powered consultation."}
                </p>
              </div>
              {fileName && (
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-lg bg-card/50 border border-border text-[10px] text-muted-foreground">
                    PDF Analysis Active
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-card/50 border border-border text-[10px] text-muted-foreground">
                    RAG Enabled
                  </span>
                </div>
              )}
            </motion.div>
          ) : (
            /* MESSAGES UI */

            <motion.div
              key="chat-messages"
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    style={{ "--my-color": color } as React.CSSProperties}
                    className={`size-10 rounded-xl flex items-center justify-center shrink-0 border shadow-lg ${
                      msg.role === "assistant"
                        ? "bg-(--my-color)/10 border-(--my-color)/20 text-(--my-color)"
                        : "bg-card border-border text-foreground"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <Bot size={20} />
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                  <div
                    style={{ "--my-color": color } as React.CSSProperties}
                    className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${
                      msg.role === "assistant"
                        ? "bg-card rounded-tl-none border border-border text-foreground prose prose-invert"
                        : "bg-(--my-color)/20 border border-(--my-color)/10 text-foreground rounded-tr-none ml-auto"
                    }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      skipHtml
                      // className="prose prose-sm text-foreground"
                    >
                      {msg.content}
                    </ReactMarkdown>
                    {/* <p className="text-sm leading-relaxed">{msg.content}</p> */}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* THINKING STATE */}
        <AnimatePresence>
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div
                style={{ "--my-color": color } as React.CSSProperties}
                className="size-10 rounded-xl bg-(--my-color)/10 border border-(--my-color)/20 text-(--my-color) flex items-center justify-center shadow-lg"
              >
                <Bot size={20} />
              </div>
              <div
                style={{ "--my-color": color } as React.CSSProperties}
                className="p-5 rounded-2xl rounded-tl-none bg-card border border-(--my-color)/20 flex items-center gap-4"
              >
                <div
                  style={{ "--my-color": color } as React.CSSProperties}
                  className="flex gap-1"
                >
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="size-1.5 bg-(--my-color) rounded-full"
                  />
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                    className="size-1.5 bg-(--my-color) rounded-full"
                  />
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                    className="size-1.5 bg-(--my-color) rounded-full"
                  />
                </div>
                <span
                  style={{ "--my-color": color } as React.CSSProperties}
                  className="text-xs font-medium text-(--my-color)/80 tracking-wide uppercase"
                >
                  Processing Clinical Context...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* INPUT BAR */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-3xl mx-auto relative group">
          {!docReady ? (
            <div className="bg-card border border-border rounded-2xl shadow-lg p-2 max-h-64 overflow-y-auto">
              <FileUploadStruc onChange={handleFileChange} />
            </div>
          ) : (
            <>
              <div
                style={{ "--my-color": color } as React.CSSProperties}
                className="absolute inset-0 bg-(--my-color)/5 blur-xl group-focus-within:bg-(--my-color)/10 transition-all rounded-2xl"
              />
              <input
                style={{ "--my-color": color } as React.CSSProperties}
                className="w-full h-14 bg-card border border-border rounded-2xl pl-12 pr-16 focus:ring-2 focus:ring-(--my-color)/50 focus:border-(--my-color)/50 outline-none transition-all text-foreground placeholder:text-muted-foreground relative z-10"
                placeholder="Ask about the document..."
                disabled={!docReady}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
              <Sparkles
                style={{ "--my-color": color } as React.CSSProperties}
                className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 transition-colors ${fileName ? "text-(--my-color)" : "text-muted-foreground"}`}
                size={18}
              />
              <button
                style={{ "--my-color": color } as React.CSSProperties}
                disabled={!fileName}
                className="absolute right-3 top-1/2 -translate-y-1/2 size-10 bg-(--my-color) disabled:bg-muted disabled:text-muted-foreground text-foreground rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-(--my-color)/20 z-20"
                onClick={handleMessageSend}
              >
                <Send size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

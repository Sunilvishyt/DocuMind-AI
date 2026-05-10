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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ChatMain({
  fileName,
  color,
}: {
  fileName: string;
  color: string;
}) {
  const [isThinking] = useState(false);
  const [messages] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content: "Hello! How can I help you today?",
    },
    {
      role: "user",
      content: "I need help with my legal documents.",
    },
  ]);

  return (
    <main className="flex-1 flex flex-col relative bg-[#0e1116]">
      {/* IMPROVED HEADER */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#131315]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div
            style={{ "--my-color": color } as React.CSSProperties}
            className={`size-2 rounded-full animate-pulse ${fileName ? "bg-(--my-color)" : "bg-slate-500"}`}
          />
          <div className="flex flex-col">
            <h1 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Current Session
            </h1>
            <p className="text-sm font-medium text-slate-200">
              {fileName ? fileName : "Awaiting Document..."}
            </p>
          </div>
        </div>

        <div
          style={{ "--my-color": color } as React.CSSProperties}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-(--my-color)/5 border border-(--my-color)/10"
        >
          <ShieldCheck
            style={{ "--my-color": color } as React.CSSProperties}
            size={14}
            className="text-(--my-color)"
          />
          <span
            style={{ "--my-color": color } as React.CSSProperties}
            className="text-[10px] font-bold text-(--my-color) uppercase tracking-tighter"
          >
            HIPAA Encrypted
          </span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 pb-32">
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
                <h2 className="text-xl font-semibold text-white">
                  {fileName ? "Document Ready" : "Start your Analysis"}
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {fileName
                    ? `I've processed "${fileName}". You can now ask for summaries, data extraction, or clinical insights.`
                    : "Upload a medical record, lab result, or pathology report in the sidebar to begin your secure AI-powered consultation."}
                </p>
              </div>
              {fileName && (
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-slate-400">
                    PDF Analysis Active
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-slate-400">
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
                        : "bg-[#1b1b1d] border-white/10 text-slate-300"
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
                    className={`max-w-[80%] p-5 rounded-2xl shadow-sm ${
                      msg.role === "assistant"
                        ? "bg-[#1b1b1d] rounded-tl-none border border-white/5 text-slate-200"
                        : "bg-(--my-color)/20 border border-(--my-color)/10 text-white rounded-tr-none ml-auto"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
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
                className="p-5 rounded-2xl rounded-tl-none bg-[#1b1b1d] border border-(--my-color)/20 flex items-center gap-4"
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
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0e1116] via-[#0e1116] to-transparent">
        <div className="max-w-3xl mx-auto relative group">
          <div
            style={{ "--my-color": color } as React.CSSProperties}
            className="absolute inset-0 bg-(--my-color)/5 blur-xl group-focus-within:bg-(--my-color)/10 transition-all rounded-2xl"
          />
          <input
            style={{ "--my-color": color } as React.CSSProperties}
            className="w-full h-14 bg-[#1b1b1d] border border-white/10 rounded-2xl pl-12 pr-16 focus:ring-2 focus:ring-(--my-color)/50 focus:border-(--my-color)/50 outline-none transition-all text-slate-200 placeholder:text-slate-600 relative z-10"
            placeholder={
              fileName
                ? "Ask about the document..."
                : "Upload a file to enable chat..."
            }
            disabled={!fileName}
          />
          <Sparkles
            style={{ "--my-color": color } as React.CSSProperties}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 transition-colors ${fileName ? "text-(--my-color)" : "text-slate-600"}`}
            size={18}
          />
          <button
            style={{ "--my-color": color } as React.CSSProperties}
            disabled={!fileName}
            className="absolute right-3 top-1/2 -translate-y-1/2 size-10 bg-(--my-color) disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-(--my-color)/20 z-20"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </main>
  );
}

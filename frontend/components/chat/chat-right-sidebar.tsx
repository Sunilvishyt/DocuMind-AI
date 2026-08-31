"use client";

import { Lightbulb, LucideIcon, MessageSquare } from "lucide-react";
import { FileUploadStruc } from "../shadcn-space/file-upload/file-upload-01";
import api from "@/lib/axios";
interface Prop {
  suggestions: string[];
  description: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

export function ChatInsights({
  config,
  setFileName,
  setDocStatus,
  setDocReady,
}: {
  config: Prop;
  setFileName: (fileName: string) => void;
  setDocStatus: (status: string) => void;
  setDocReady: (ready: boolean) => void;
}) {
  const { suggestions, description, label, icon: Icon, color } = config;

  async function handleFileChange(files: File[]) {
    // files is already the array [File, File, ...]
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
    <aside className="w-80 border-l border-border bg-card p-6 flex flex-col gap-8">
      <div>
        <div
          style={{ "--my-color": color } as React.CSSProperties}
          className="flex items-center gap-2 pb-3  text-(--my-color) mb-1"
        >
          <Icon size={18} />
          <h3 className="text-xs font-bold uppercase tracking-[0.2em]">
            {label}
          </h3>
        </div>
        <div
          style={{ "--my-color": color } as React.CSSProperties}
          className="p-4 rounded-xl bg-(--my-color)/5 border border-(--my-color)/10"
        >
          <p
            style={{ "--my-color": color } as React.CSSProperties}
            className="text-sm text-(--my-color) leading-relaxed"
          >
            {description}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Lightbulb size={16} />
          <h4 className="text-[10px] font-bold uppercase tracking-widest">
            Suggested Actions
          </h4>
        </div>
        <div className="grid gap-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              className="text-left p-3 rounded-lg bg-card/50 border border-border text-xs text-muted-foreground hover:bg-card/80 hover:text-foreground transition-all flex items-center gap-2 group"
            >
              <MessageSquare
                style={{ "--my-color": color } as React.CSSProperties}
                size={12}
                className="text-(--my-color)/50 group-hover:text-(--my-color)"
              />
              {s}
            </button>
          ))}
        </div>
      </div>
      <FileUploadStruc onChange={handleFileChange} />
    </aside>
  );
}

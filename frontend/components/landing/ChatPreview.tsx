import { motion } from "framer-motion";
import { Cpu, Lock, User } from "lucide-react";

export default function ChatPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
    >
      <div className="bg-[#1f1f21]/40 backdrop-blur-2xl p-1 rounded-2xl border border-white/5 shadow-2xl">
        <div className="bg-[#131315] rounded-xl overflow-hidden border border-white/5">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div className="ml-auto flex items-center gap-2 bg-[#1b1b1d] px-3 py-1 rounded-md border border-white/5">
              <Lock className="w-3 h-3 text-slate-500" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Secure_Session_v3
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0 border border-secondary/20">
                <Cpu className="w-5 h-5 text-secondary" />
              </div>
              <div className="bg-[#1b1b1d] p-4 rounded-2xl rounded-tl-none border border-white/5">
                <p className="text-[11px] text-secondary font-bold mb-1 uppercase tracking-tighter">
                  DocuMind Assistant
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  I&apos;ve analyzed the 400-page medical ledger. I found 3
                  conflicting clinical results in section 4.2. Would you like a
                  vector comparison?
                </p>
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <div className="bg-primary/10 p-4 rounded-2xl rounded-tr-none border border-primary/20 max-w-[80%]">
                <p className="text-sm text-slate-200">
                  Yes, specifically look for patient outcome deviations.
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 border border-primary/20">
                <User className="w-5 h-5 text-primary" />
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-medium">
                  RAG PROCESSING...
                </span>
                <span className="text-[10px] text-secondary font-bold">
                  84%
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "84%" }}
                  className="h-full bg-secondary shadow-[0_0_10px_rgba(123,208,255,0.5)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

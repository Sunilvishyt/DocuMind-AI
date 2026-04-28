import { Search, ShieldCheck } from "lucide-react";
import { FileText } from "lucide-react";

export default function BentoLayout() {
  return (
    <section className="py-24 px-6 bg-[#0e0e10]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Clarity Through Depth
          </h2>
          <p className="text-slate-400 text-lg">
            Every answer is grounded in your data, effectively eliminating AI
            hallucination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 min-h-150">
          <div className="md:col-span-2 md:row-span-2 bg-[#1f1f21]/40 border border-white/5 p-10 rounded-[2rem] flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-secondary text-xs font-bold tracking-[0.2em] mb-4 block uppercase">
                Step 01
              </span>
              <h3 className="text-3xl font-bold text-white mb-4">
                Ingest & Vectorize
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Drop your documents and let our system transform raw text into
                semantic high-performance vector embeddings.
              </p>
            </div>
            <div className="mt-12 h-64 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-all cursor-pointer">
              <div className="text-center">
                <FileText className="w-12 h-12 text-secondary mb-4 mx-auto" />
                <p className="text-sm font-medium text-slate-400">
                  Drag & Drop Documents
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-[#1f1f21]/40 border border-white/5 p-8 rounded-[2rem] flex items-center justify-between group hover:bg-white/5 transition-colors">
            <div>
              <span className="text-tertiary text-xs font-bold tracking-[0.2em] mb-2 block uppercase">
                Step 02
              </span>
              <h4 className="text-2xl font-bold text-white mb-2">
                Contextual Retrieval
              </h4>
              <p className="text-slate-500 text-sm max-w-xs">
                AI fetches only the most relevant document segments before
                generating an answer.
              </p>
            </div>
            <div className="w-20 h-20 rounded-full border border-tertiary/20 flex items-center justify-center bg-tertiary/5 shrink-0">
              <Search size={40} />
            </div>
          </div>

          <div className="md:col-span-2 bg-[#1f1f21]/40 border border-white/5 p-8 rounded-[2rem] flex items-center justify-between group hover:bg-white/5 transition-colors">
            <div>
              <span className="text-primary text-xs font-bold tracking-[0.2em] mb-2 block uppercase">
                Step 03
              </span>
              <h4 className="text-2xl font-bold text-white mb-2">
                Expert Synthesis
              </h4>
              <p className="text-slate-500 text-sm max-w-xs">
                Our advanced models generate responses with precise page-level
                citations.
              </p>
            </div>
            <div className="w-20 h-20 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5 shrink-0">
              <ShieldCheck size={60} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

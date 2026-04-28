import { Cpu } from "lucide-react";
import Link from "next/link";

export default function Topbar() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md">
      <div className="flex justify-between items-center px-6 md:px-12 h-16 w-full max-w-7xl mx-auto">
        <div className="text-3xl font-bold tracking-tighter text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center">
            <Cpu className="w-5 h-5 text-on-primary" />
          </div>
          DocuMind AI
        </div>

        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="text-slate-300 hover:text-white">
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="bg-[#bec6e0] text-[#283044] hover:bg-[#bec6e0]/90 font-semibold rounded-full px-6 py-1 "
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

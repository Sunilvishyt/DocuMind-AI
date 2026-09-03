import { Cpu } from "lucide-react";
import Link from "next/link";

export default function Topbar() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-border bg-sidebar/50 backdrop-blur-md">
      <div className="flex justify-between items-center px-6 md:px-12 h-16 w-full max-w-7xl mx-auto">
        <div className="text-xl md:text-2xl  font-bold tracking-tighter text-foreground flex items-center gap-2">
          <div className="w-5 h-5 md:w-8 md:h-8 bg-linear-to-br from-secondary to-primary rounded-lg flex items-center justify-center">
            <Cpu className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
          </div>
          DocuMind AI
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-muted-foreground hover:text-foreground"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className=" w-25 md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full px-6 py-1 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}

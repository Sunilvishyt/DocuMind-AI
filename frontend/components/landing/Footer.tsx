import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#020617] py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="text-xl font-bold text-white tracking-tighter">
            DocuMind AI
          </div>
          <p className="text-slate-500 text-xs">
            © 2026 DocuMind Intelligence.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-500">
          <Link href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Security Architecture
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Status
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

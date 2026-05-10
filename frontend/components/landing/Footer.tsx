import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex justify-center align-center items-center md:items-start gap-4">
          <p className="text-xl font-bold text-foreground tracking-tighter">
            DocuMind AI
          </p>
          <p className="flex justify-center align-center items-center text-muted-foreground text-xs">
            © 2026 DocuMind Intelligence.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          <Link href="#" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

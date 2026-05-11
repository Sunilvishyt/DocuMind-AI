import "./globals.css";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers/theme-provider";
import { SessionCleanup } from "@/components/providers/session-cleanup";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "DocuMind AI",
  description: "DocuMind AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", figtree.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SessionCleanup>
          <Providers>{children}</Providers>
        </SessionCleanup>
      </body>
    </html>
  );
}

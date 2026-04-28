"use client";
import { LoginForm } from "@/components/Login-form";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";

function Page() {
  return (
    // Main wrapper must be relative to contain the absolute background
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-card-foreground">
      {/* 1. Background Layer */}
      <InteractiveGridPattern
        width={60}
        height={50}
        squares={[20, 20]}
        squaresClassName="hover:bg-primary-500/30"
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-6 ",
        )}
      />

      {/* 2. Content Layer (Higher Z-Index) */}
      <div className="z-10 flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Documind AI
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}

export default Page;

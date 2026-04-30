import { Button } from "../ui/button";
import { RainbowButton } from "../ui/rainbow-button";
import { TypingAnimation } from "../ui/typing-animation";

function CtaSection() {
  return (
    <section className="py-32 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(123,208,255,0.05),transparent)]"></div>
      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
          <TypingAnimation>Ready to unlock your data?</TypingAnimation>
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <RainbowButton
            size="lg"
            className="text-2xl p-8 rounded-[300px] "
            color="red"
          >
            Start Your Free Analysis
          </RainbowButton>
          {/* <Button
            size="lg"
            className="h-16 px-12 bg-white text-black hover:bg-slate-200 rounded-full text-xl font-bold transition-all hover:scale-105"
          >
            Start Your Free Analysis
          </Button> */}
        </div>
      </div>
    </section>
  );
}

export default CtaSection;

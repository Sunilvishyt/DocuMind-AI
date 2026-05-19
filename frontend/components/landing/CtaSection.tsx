import { RainbowButton } from "../ui/rainbow-button";
import { TypingAnimation } from "../ui/typing-animation";
function CtaSection() {
  return (
    <section className="py-32 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(123,208,255,0.05),transparent)]"></div>
      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        <h2 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
          <TypingAnimation>Ready to unlock your data?</TypingAnimation>
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <RainbowButton
            size="lg"
            className="text-2xl p-8 rounded-[300px] "
            color="red"
            onClick={() => {
              window.location.href = "/home";
            }}
          >
            Start Your Free Analysis
          </RainbowButton>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;

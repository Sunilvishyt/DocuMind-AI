import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import ChatPreview from "./ChatPreview";
import { motion } from "framer-motion";
import { AuroraText } from "@/components/ui/aurora-text";
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] pt-16 px-5 md:px-20 flex items-center justify-center overflow-hidden ">

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]"
          >
            Deep Intelligence <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#7bd0ff] via-[#bec6e0] to-[#dec29a]">
              <AuroraText> For Every Document</AuroraText>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-md text-muted-foreground max-w-lg leading-relaxed"
          >
            DocuMind AI transforms static PDF s into dynamic knowledge hubs. Chat
            with your data using specialized neural layers for Finance, Law, and
            Medicine.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Button
              size="lg"
              className="h-14 px-8 bg-secondary text-secondary-foreground hover:scale-105 transition-transform rounded-xl font-bold text-lg gap-2 hover:bg-secondary/90"
            >
              Start Analyzing <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 border-border bg-card/50 hover:bg-card text-foreground rounded-xl font-bold text-lg hover:bg-card hover:border-border/80 transition-all"
            >
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Chat Preview */}
        <ChatPreview />
      </div>
    </section>
  );
}

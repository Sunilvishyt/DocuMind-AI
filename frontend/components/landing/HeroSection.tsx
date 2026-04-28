import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import ChatPreview from "./ChatPreview";
import { motion } from "framer-motion";

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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-125 h-125 bg-secondary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-125 h-125 bg-tertiary/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* <motion.div variants={itemVariants}>
                <Badge
                  variant="outline"
                  className="py-1 px-4 border-white/10 bg-white/5 text-secondary gap-2 rounded-full"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                  </span>
                  V3 Engine Now Live
                </Badge>
              </motion.div> */}

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Deep Intelligence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7bd0ff] via-[#bec6e0] to-[#dec29a]">
              For Every Document
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed"
          >
            DocuMind AI transforms static PDFs into dynamic knowledge hubs. Chat
            with your data using specialized neural layers for Finance, Law, and
            Medicine.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Button
              size="lg"
              className="h-14 px-8 bg-secondary text-primary hover:scale-105 transition-transform rounded-xl font-bold text-lg gap-2"
            >
              Start Analyzing <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-lg"
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

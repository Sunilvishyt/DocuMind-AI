import {
  Bot,
  ChevronRight,
  Code2,
  Plus,
  Scale,
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

function ExpertSelection() {
  return (
    <>
      {/* Header section */}
      <section className="mb-12 mt-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Select your expert
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">
          Choose an AI assistant specialized for your current task.
        </p>
      </section>

      {/* Expertise Grid with Framer Motion */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {/* Medical Expert */}
        <motion.div
          variants={cardVariants}
          className="bg-card backdrop-blur-xl border border-border rounded-3xl p-6 transition-all duration-300 group cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)] hover:border-emerald-500/50 dark:hover:border-emerald-500/30"
        >
          <Link href="/chat/medical-assistant">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
              <Stethoscope size={28} className="text-emerald-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-card-foreground mb-3 group-hover:text-emerald-400 dark:group-hover:text-emerald-300 transition-colors">
              Medical Expert
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed text-sm">
              Specialized in clinical research, drug interactions, and medical
              literature synthesis with rigorous peer-reviewed accuracy.
            </p>
            <div className="flex items-center text-emerald-400 font-semibold text-sm group-hover:gap-2 transition-all">
              <span>Consult Expert</span>
              <ChevronRight size={16} className="ml-1" />
            </div>
          </Link>
        </motion.div>

        {/* Coding Architect */}
        <motion.div
          variants={cardVariants}
          className="bg-card backdrop-blur-xl border border-border rounded-3xl p-6 transition-all duration-300 group cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] hover:border-blue-500/50 dark:hover:border-blue-500/30"
        >
          <Link href="/chat/coding-assistant">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
              <Code2 size={28} className="text-blue-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-card-foreground mb-3 group-hover:text-blue-400 dark:group-hover:text-blue-300 transition-colors">
              Coding Architect
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed text-sm">
              Advanced algorithm optimization, systems architecture design, and
              complex debugging across 50+ languages.
            </p>
            <div className="flex items-center text-blue-400 font-semibold text-sm group-hover:gap-2 transition-all">
              <span>Open Terminal</span>
              <ChevronRight size={16} className="ml-1" />
            </div>
          </Link>
        </motion.div>

        {/* Finance Analyst */}
        <motion.div
          variants={cardVariants}
          className="bg-card backdrop-blur-xl border border-border rounded-3xl p-6 transition-all duration-300 group cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.15)] hover:border-yellow-500/50 dark:hover:border-yellow-500/30"
        >
          <Link href="/chat/finance-assistant">
            <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6 border border-yellow-500/20">
              <TrendingUp size={28} className="text-yellow-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-card-foreground mb-3 group-hover:text-yellow-400 dark:group-hover:text-yellow-300 transition-colors">
              Finance Analyst
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed text-sm">
              Expert-level market modeling, risk assessment reports, and
              real-time economic data interpretation for high-stakes decisions.
            </p>
            <div className="flex items-center text-yellow-400 font-semibold text-sm group-hover:gap-2 transition-all">
              <span>Analyze Markets</span>
              <ChevronRight size={16} className="ml-1" />
            </div>
          </Link>
        </motion.div>

        {/* Legal Scholar */}
        <motion.div
          variants={cardVariants}
          className="bg-card backdrop-blur-xl border border-border rounded-3xl p-6 transition-all duration-300 group cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)] hover:border-purple-500/50 dark:hover:border-purple-500/30"
        >
          <Link href="/chat/legal-assistant">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20">
              <Scale size={28} className="text-purple-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-card-foreground mb-3 group-hover:text-purple-400 dark:group-hover:text-purple-300 transition-colors">
              Legal Scholar
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed text-sm">
              Case law research, contract cross-examination, and regulatory
              compliance parsing across global jurisdictions.
            </p>
            <div className="flex items-center text-purple-400 font-semibold text-sm group-hover:gap-2 transition-all">
              <span>Review Statutes</span>
              <ChevronRight size={16} className="ml-1" />
            </div>
          </Link>
        </motion.div>

        {/* General Assistant */}
        <motion.div
          variants={cardVariants}
          className="bg-card backdrop-blur-xl border border-border rounded-3xl p-6 transition-all duration-300 group cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(148,163,184,0.15)] hover:border-muted/50 dark:hover:border-muted/30"
        >
          <Link href="/chat/general-assistant">
            <div className="w-14 h-14 rounded-2xl bg-muted/10 flex items-center justify-center mb-6 border border-muted/20">
              <Bot size={28} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-card-foreground mb-3 group-hover:text-muted-foreground dark:group-hover:text-muted-foreground transition-colors">
              General Assistant
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed text-sm">
              Versatile multitasking partner for everyday queries, scheduling,
              creative writing, and high-level summaries.
            </p>
            <div className="flex items-center text-muted-foreground font-semibold text-sm group-hover:gap-2 transition-all">
              <span>Start Chat</span>
              <ChevronRight size={16} className="ml-1" />
            </div>
          </Link>
        </motion.div>
      </motion.section>
    </>
  );
}

export default ExpertSelection;

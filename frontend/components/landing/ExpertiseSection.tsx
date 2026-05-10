import { motion } from "framer-motion";
import { Banknote, Scale, Stethoscope, Zap } from "lucide-react";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";

export default function ExpertiseSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          <DiaTextReveal
            text="Specialized Intelligence Layers"
            textColor="var(--secondary)"
          />
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          Dedicated expert models fine-tuned for high-stakes industries where
          precision is non-negotiable.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Medical Intelligence",
            icon: Stethoscope,
            color: "text-secondary",
            bg: "bg-secondary/10",
            desc: "HIPAA-compliant analysis of clinical trials and pharmacological research papers.",
          },
          {
            title: "Financial Nexus",
            icon: Banknote,
            color: "text-tertiary",
            bg: "bg-tertiary/10",
            desc: "Expert parsing of 10-K filings and complex audit reports with mathematical accuracy.",
          },
          {
            title: "Legal Advisor",
            icon: Scale,
            color: "text-primary",
            bg: "bg-primary/10",
            desc: "Case law synthesis, contract risk detection, and regulatory compliance monitoring.",
          },
        ].map((item, i) => (
          <motion.div
            initial={{ opacity: 0, y: 60 * i + 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            key={i}
            whileHover={{ y: -8 }}
            className="p-8 rounded-3xl bg-card/40 border border-border hover:border-border/80 transition-colors"
          >
            <div
              className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-8 border border-border/50`}
            >
              <item.icon className={`w-7 h-7 ${item.color}`} />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {item.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {item.desc}
            </p>
            <ul className="space-y-3">
              {["Verified citations", "Real-time extraction"].map(
                (feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-muted-foreground font-medium"
                  >
                    <Zap className={`w-4 h-4 ${item.color}`} /> {feature}
                  </li>
                ),
              )}
            </ul>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center items-center pt-5">
        <h3 className="text-2xl text-foreground">and much more...</h3>
      </div>
    </section>
  );
}

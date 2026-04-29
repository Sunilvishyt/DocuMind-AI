import { CircleDollarSign, CodeXml, HeartHandshake } from "lucide-react";
import { Stethoscope, Gavel, type LucideIcon } from "lucide-react";

export interface AssistantConfig {
    label: string;
    description: string;
    color: string;
    icon: LucideIcon; // This ensures it's a component, not a string
    route: string;
    suggestions: string[];
}

export const ASSISTANT_MODES: Record<string, AssistantConfig> = {
    MEDICAL: {
        label: "Medical Assistant",
        description: "Analyze medical records and lab results",
        color: "#10b981", // Emerald
        icon: Stethoscope,
        route: "/chat/medical",
        suggestions: [
            "Summarize pathology report",
            "according to the results of this report, what is the diagnosis?",
            "Check drug interactions",
            "Generate clinical brief",
            "Extract lab values",

        ]
    },
    LEGAL: {
        label: "Legal Counsel",
        description: "Review contracts and compliance documents",
        color: "#f59e0b", // Amber
        icon: Gavel,
        route: "/chat/legal",
        suggestions: [
            "Redact PII from contract",
            "Compare clause versions",
            "Summarize case law",
            "Identify liability risks",
        ]
    },
    CODING: {
        label: "Syntax Architect",
        description: "Debug code and generate documentation",
        color: "#6366f1", // Indigo
        icon: CodeXml,
        route: "/chat/coding",
        suggestions: [
            "what wrong with the code in the image?",
            "Explain this regex",
            "explain this topic from this pdf in easy terms",
            "how much indepth does this topic is covered in thsi pdf?"
        ]
    },
    FINANCIAL: {
        label: "Financial Assistant",
        description: "Predict trends and analyze fiscal reports",
        color: "#06b6d4", // Cyan
        icon: CircleDollarSign,
        route: "/chat/financial",
        suggestions: [
            "Analyze quarterly earnings",
            "Estimate revenue growth",
            "Predict market sentiment"]
    },
    GENERAL: {
        label: "General Assistant",
        description: "Answer general questions",
        color: "#f43f5e", // Rose
        icon: HeartHandshake,
        route: "/chat/general",
        suggestions: [
            "How much indepth does this topic is covered in this pdf?",
            "what does this image is about",
            "what is the means of particular thing this pdf?",
            "summarize this pdf"
        ]
    }
};
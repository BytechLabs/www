import React from "react";
import { cn } from "@/lib/utils";
import { CornerReference, FolioNumber, MeasurementLine } from "@/components/ui/CodexOrnaments";
import { motion } from "framer-motion";

interface BentoCardProps {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    folio: string;
    delay?: number;
}

export function BentoCard({ title, subtitle, icon, children, className, folio, delay = 0 }: BentoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: delay }}
            className={cn(
                "group relative flex flex-col p-6 sm:p-8 bg-ink/30 backdrop-blur-sm border border-off-white/10 overflow-hidden transition-all duration-500 hover:bg-ink/40 hover:border-off-white/20",
                className
            )}
        >
            {/* Background Texture / element */}
            <div className="absolute inset-0 bg-gradient-to-br from-off-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Corner Ornaments */}
            <CornerReference label="FIG" position="top-left" className="opacity-30 group-hover:opacity-60 transition-opacity" />
            <FolioNumber number={folio} position="bottom-right" className="opacity-30 group-hover:opacity-60 transition-opacity" />

            {/* Content Header */}
            <div className="relative z-10 flex flex-col gap-4 mb-4">
                {/* Icon Container */}
                {icon && (
                    <div className="w-10 h-10 flex items-center justify-center rounded-sm border border-off-white/10 bg-ink/50 group-hover:border-off-white/30 transition-colors">
                        {icon}
                    </div>
                )}

                <div className="flex flex-col gap-1">
                    <h3 className="font-serif text-2xl text-off-white group-hover:text-off-white transition-colors">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="font-mono text-xs text-off-white/40 uppercase tracking-widest">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>

            {/* Divider */}
            <div className="relative z-10 w-full flex items-center gap-4 mb-4 opacity-30 group-hover:opacity-50 transition-opacity">
                <MeasurementLine length="w-full" />
            </div>

            {/* Body Content */}
            <div className="relative z-10 font-mono text-xs sm:text-sm text-off-white/60 leading-relaxed group-hover:text-off-white/80 transition-colors">
                {children}
            </div>

            {/* Hover Reveal: Technical Grid overlay or similar detail */}
            <div
                className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundSize: '20px 20px' }}
            />
        </motion.div>
    );
}

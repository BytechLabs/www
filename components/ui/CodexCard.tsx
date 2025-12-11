import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CodexCardProps {
    children: React.ReactNode;
    className?: string;
    withFolio?: boolean;
    folioNumber?: string;
    withCorners?: boolean;
}

/**
 * Codex Leicester themed card with ornamental details
 */
export function CodexCard({
    children,
    className,
    withFolio = false,
    folioNumber = "12r",
    withCorners = true,
}: CodexCardProps) {
    return (
        <motion.div
            className={cn(
                "relative p-8 bg-parchment/50 dark:bg-ink/50 border border-charcoal/10 dark:border-off-white/10 rounded-sm",
                "shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.1)]",
                className
            )}
            whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.1)" }}
            transition={{ duration: 0.2 }}
        >
            {/* Corner ornaments */}
            {withCorners && (
                <>
                    <span className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-charcoal/20 dark:border-off-white/20" />
                    <span className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-charcoal/20 dark:border-off-white/20" />
                    <span className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-charcoal/20 dark:border-off-white/20" />
                    <span className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-charcoal/20 dark:border-off-white/20" />
                </>
            )}

            {/* Folio number */}
            {withFolio && (
                <div className="absolute top-2 right-2 font-mono text-xs text-charcoal/40 dark:text-off-white/40 italic">
                    Folio {folioNumber}
                </div>
            )}

            {/* Measurement marks on left edge */}
            <div className="absolute left-0 top-1/4 flex flex-col gap-2">
                <span className="w-2 h-px bg-charcoal/20 dark:bg-off-white/20" />
                <span className="w-3 h-px bg-charcoal/20 dark:bg-off-white/20" />
                <span className="w-2 h-px bg-charcoal/20 dark:bg-off-white/20" />
            </div>

            {children}
        </motion.div>
    );
}

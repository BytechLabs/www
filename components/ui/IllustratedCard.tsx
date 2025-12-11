import React from "react";
import { cn } from "@/lib/utils";
import { CornerReference, FolioNumber, MeasurementLine } from "@/components/ui/CodexOrnaments";
import { motion } from "framer-motion";
import Image from "next/image";

interface IllustratedCardProps {
    title: string;
    subtitle?: string;
    imageSrc: string;
    children?: React.ReactNode;
    className?: string;
    folio: string;
    delay?: number;
    aspect?: "square" | "portrait" | "landscape";
}

export function IllustratedCard({ title, subtitle, imageSrc, children, className, folio, delay = 0, aspect = "square" }: IllustratedCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: delay }}
            className={cn(
                "group relative flex flex-col bg-[#1a1a1a] border border-[#3a3a3a] overflow-hidden transition-all duration-500 hover:border-[#8c7b64]/50",
                className
            )}
        >
            {/* Image Container with Sepia Filter */}
            <div className={cn(
                "relative w-full overflow-hidden mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 opacity-80 group-hover:opacity-100",
                aspect === "square" ? "aspect-square" : aspect === "portrait" ? "aspect-[3/4]" : "aspect-[16/9]"
            )}>
                <div className="absolute inset-0 bg-[#4e4034]/20 mix-blend-multiply z-10 pointer-events-none" />
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-60 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700"
                />
                {/* Sketch Lines Overlay */}
                <div className="absolute inset-0 border-[0.5px] border-off-white/10 m-2 z-20" />
            </div>

            {/* Content Segment */}
            <div className="relative p-6 border-t border-off-white/10 bg-[#161616] flex-grow">
                <CornerReference label="FIG" position="top-right" className="opacity-50" />

                <div className="flex flex-col gap-2 mb-4">
                    <span className="font-serif italic text-[#8c7b64] text-xs">Fig. {folio} — {subtitle}</span>
                    <h3 className="font-serif text-xl tracking-wide text-[#d4d4d4] group-hover:text-off-white transition-colors">
                        {title}
                    </h3>
                </div>

                <div className="w-12 h-px bg-[#8c7b64]/30 mb-4" />

                <div className="font-mono text-xs text-[#888] leading-relaxed">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { CornerReference } from "@/components/ui/CodexOrnaments";

import Link from "next/link";

interface ProjectFrameProps {
    title: string;
    client: string;
    description: string;
    imageSrc: string;
    techStack: readonly string[];
    folio: string;
    year: string;
    href?: string;
    className?: string;
    delay?: number;
}

export function ProjectFrame({
    title,
    client,
    description,
    imageSrc,
    techStack,
    folio,
    year,
    href = "#",
    className,
    delay = 0
}: ProjectFrameProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: delay, ease: "easeOut" }}
            className={cn(
                "group relative w-full",
                className
            )}
        >
            <Link href={href} className="block w-full h-full bg-[#111] border border-[#333] overflow-hidden">
                {/* The Frame (Border layers) */}
                <div className="absolute inset-0 border-2 border-[#1a1a1a] z-20 pointer-events-none" />
                <div className="absolute inset-2 border border-[#8c7b64]/20 z-20 pointer-events-none group-hover:border-[#8c7b64]/50 transition-colors duration-500" />

                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0a0a]">
                    {/* Fallback pattern if image fails or for placeholder */}
                    <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center text-[#333] font-mono text-xs">
                        [IMAGE DATA CORRUPTED]
                    </div>

                    {/* Actual Image (commented out until assets exist, or using placeholder) */}
                    {/* <Image src={imageSrc} alt={title} fill className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0" /> */}

                    {/* The Lens Overlay (Tech Stack Reveal) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 bg-black/60 backdrop-blur-sm">
                        <span className="font-serif italic text-[#8c7b64] text-sm mb-4">Alchemical Ingredients</span>
                        <div className="flex flex-wrap gap-2 justify-center px-8">
                            {techStack.map((tech) => (
                                <span key={tech} className="px-3 py-1 border border-[#8c7b64]/40 rounded-full font-mono text-[10px] text-[#ccc] bg-black/50">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Plaque / Label */}
                <div className="relative p-6 border-t border-[#333] bg-[#0c0c0c] group-hover:bg-[#111] transition-colors duration-500">
                    <CornerReference label={folio} position="top-right" className="opacity-40" />

                    <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-serif text-2xl text-[#e5e5e5] group-hover:text-[#8c7b64] transition-colors duration-300">
                            {title}
                        </h3>
                        <span className="font-mono text-xs text-[#666]">{year}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-1 rounded-full bg-[#8c7b64]" />
                        <span className="font-mono text-xs uppercase tracking-wider text-[#888]">{client}</span>
                    </div>

                    <p className="font-serif text-sm text-[#888] leading-relaxed line-clamp-3 group-hover:text-[#aaa] transition-colors">
                        {description}
                    </p>

                    <div className="absolute bottom-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-xs font-mono text-[#8c7b64]">VIEW ARTIFACT →</span>
                    </div>
                </div>
            </Link>

        </motion.div>
    );
}

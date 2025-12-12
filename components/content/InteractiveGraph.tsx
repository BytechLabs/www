"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface GraphProps {
    title?: string;
    data?: { label: string; value: number }[];
}

export function InteractiveGraph({
    title = "Performance Metrics",
    data = [
        { label: "Legacy", value: 45 },
        { label: "v1.0", value: 78 },
        { label: "v2.0", value: 92 },
        { label: "Current", value: 98 }
    ]
}: GraphProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="my-12 p-8 border border-off-white/10 rounded-lg bg-ink/50 backdrop-blur-sm not-prose">
            <div className="flex justify-between items-end mb-8">
                <h3 className="font-serif text-2xl text-off-white">{title}</h3>
                <span className="font-mono text-xs text-emerald-500 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    LIVE DATA
                </span>
            </div>

            <div className="h-64 flex items-end gap-4 relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                    {[0, 25, 50, 75, 100].map((tick) => (
                        <div key={tick} className="w-full h-px bg-off-white/20" />
                    ))}
                </div>

                {data.map((item, i) => (
                    <div
                        key={i}
                        className="flex-1 flex flex-col justify-end group relative h-full"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${item.value}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                            className={`w-full relative rounded-t-sm transition-colors duration-300 ${hoveredIndex === i ? "bg-emerald-400" : "bg-emerald-500/60"
                                }`}
                        >
                            {/* Tooltip */}
                            <div className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-ink border border-off-white/20 px-3 py-1 rounded transition-opacity duration-200 pointer-events-none z-10 ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'}`}>
                                <span className="font-mono text-xs text-emerald-400">{item.value}%</span>
                            </div>
                        </motion.div>

                        <div className="mt-4 text-center">
                            <span className={`font-mono text-xs transition-colors duration-300 ${hoveredIndex === i ? 'text-off-white' : 'text-off-white/40'}`}>
                                {item.label}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

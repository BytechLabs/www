"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Mock Data
import { navigationItems } from "@/config/navigation";

// Use shared config
const commands = navigationItems;

export function CommandStrip() {
    const pathname = usePathname();
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <motion.div
            layout
            className="flex items-center gap-2 px-3 py-2 bg-ink/80 backdrop-blur-xl border border-off-white/10 rounded-full shadow-2xl pointer-events-auto"
        >
            {commands.map((cmd) => {
                const isActive = pathname === cmd.href;
                return (
                    <Link
                        key={cmd.id}
                        href={cmd.href}
                        onMouseEnter={() => setHovered(cmd.id)}
                        onMouseLeave={() => setHovered(null)}
                        className="relative"
                    >
                        <motion.div
                            layout
                            className={cn(
                                "flex items-center justify-center px-3 py-2 rounded-full cursor-pointer transition-colors duration-300",
                                isActive ? "bg-off-white/10 text-off-white" : "text-off-white/50 hover:text-off-white hover:bg-off-white/5"
                            )}
                        >
                            <span className="text-lg leading-none">{cmd.icon}</span>
                            <AnimatePresence>
                                {(hovered === cmd.id || isActive) && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                                        animate={{ opacity: 1, width: "auto", marginLeft: 8 }}
                                        exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                                        className="font-mono text-xs overflow-hidden whitespace-nowrap"
                                    >
                                        {cmd.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </Link>
                );
            })}
        </motion.div>
    );
}

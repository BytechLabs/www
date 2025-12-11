"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CyclingTextProps {
    words: string[];
    interval?: number;
    className?: string;
}

export function CyclingText({ words, interval = 3000, className }: CyclingTextProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, interval);
        return () => clearInterval(timer);
    }, [words.length, interval]);

    // Find the longest word to reserve correct width
    const longestWord = words.reduce((a, b) => a.length > b.length ? a : b, "");

    return (
        <div className={cn("relative inline-grid place-items-center whitespace-nowrap", className)}>
            {/* Invisible longest word to reserve space strictly */}
            <span className="invisible opacity-0 px-2 py-1 pointer-events-none select-none">
                {longestWord}
            </span>

            <AnimatePresence mode="popLayout">
                <motion.span
                    key={index}
                    initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute center inset-0 flex items-center justify-center whitespace-nowrap"
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}

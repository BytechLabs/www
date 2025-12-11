"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MuseumGlass } from "./MuseumGlass";
import { cn } from "@/lib/utils";

interface FloatingWidgetProps {
    title: string;
    metric?: string;
    status?: "success" | "warning" | "error" | "info";
    position?: { x: number; y: number };
    className?: string;
    children?: React.ReactNode;
}

/**
 * FloatingWidget Component
 * 
 * The signature "Floating Intelligence" card that appears to float over
 * vintage illustrations like a microscope slide. Uses Museum Glass styling
 * with gentle parallax animation on scroll.
 */
export function FloatingWidget({
    title,
    metric,
    status = "info",
    position = { x: 0, y: 0 },
    className,
    children,
}: FloatingWidgetProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Gentle parallax effect
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const statusColors = {
        success: "text-success-green",
        warning: "text-alert-red",
        error: "text-alert-red",
        info: "text-link-blue",
    };

    const statusBorders = {
        success: "border-l-success-green",
        warning: "border-l-alert-red",
        error: "border-l-alert-red",
        info: "border-l-link-blue",
    };

    return (
        <motion.div
            ref={ref}
            style={{
                y,
                left: `${position.x}%`,
                top: `${position.y}%`,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
                "absolute z-10",
                className
            )}
        >
            <MuseumGlass className={cn(
                "p-4 rounded-lg border-l-4",
                statusBorders[status],
                "hover:scale-105 transition-transform duration-300"
            )}>
                <div className="space-y-2">
                    <h3 className={cn(
                        "font-mono text-sm font-semibold uppercase tracking-wide",
                        statusColors[status]
                    )}>
                        {title}
                    </h3>

                    {metric && (
                        <p className="font-serif text-2xl font-bold text-charcoal dark:text-off-white">
                            {metric}
                        </p>
                    )}

                    {children && (
                        <div className="text-sm text-charcoal/80 dark:text-off-white/80">
                            {children}
                        </div>
                    )}
                </div>
            </MuseumGlass>
        </motion.div>
    );
}

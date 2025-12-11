"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDevMode } from "@/lib/store/devMode";
import { cn } from "@/lib/utils";

/**
 * DevModeToggle Component - REDESIGNED
 * 
 * DRAMATIC Renaissance Instrumentation Panel
 * Styled like Da Vinci's technical instruments with ornate details
 */
export function DevModeToggle() {
    const { isDevMode, toggleDevMode } = useDevMode();
    const [fps, setFps] = useState(60);
    const [memory, setMemory] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Keyboard shortcut: Ctrl+Shift+D
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.key === "D") {
                e.preventDefault();
                toggleDevMode();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleDevMode]);

    // FPS Counter
    useEffect(() => {
        if (!isDevMode) return;

        let frameCount = 0;
        let lastTime = performance.now();

        const measureFPS = () => {
            frameCount++;
            const currentTime = performance.now();

            if (currentTime >= lastTime + 1000) {
                setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
                frameCount = 0;
                lastTime = currentTime;
            }

            requestAnimationFrame(measureFPS);
        };

        const animationId = requestAnimationFrame(measureFPS);
        return () => cancelAnimationFrame(animationId);
    }, [isDevMode]);

    // Memory Usage
    useEffect(() => {
        if (!isDevMode) return;

        const updateMemory = () => {
            if ('memory' in performance && (performance as any).memory) {
                const memoryInfo = (performance as any).memory;
                const usedMB = memoryInfo.usedJSHeapSize / 1048576;
                setMemory(Math.round(usedMB));
            }
        };

        updateMemory();
        const interval = setInterval(updateMemory, 1000);
        return () => clearInterval(interval);
    }, [isDevMode]);

    return (
        <>
            {/* Dev Mode Overlay */}
            <AnimatePresence>
                {isDevMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 pointer-events-none z-40"
                    >
                        {/* Grid Lines */}
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `
                  linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                                backgroundSize: "50px 50px",
                            }}
                        />

                        {/* Corner Markers */}
                        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-link-blue/30" />
                        <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-link-blue/30" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-link-blue/30" />
                        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-link-blue/30" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ornate Control Panel */}
            <div className="fixed top-6 right-6 z-50">
                <motion.div
                    initial={false}
                    animate={{
                        scale: isHovered ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    className="relative"
                >
                    {/* Ornamental Frame */}
                    <div className="absolute -inset-3 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <g stroke="currentColor" fill="none" strokeWidth="0.5" className="text-charcoal/20 dark:text-off-white/20">
                                {/* Corner Ornaments */}
                                <path d="M 10 10 L 30 10 L 30 30" strokeWidth="1" />
                                <path d="M 190 10 L 170 10 L 170 30" strokeWidth="1" />
                                <path d="M 10 190 L 30 190 L 30 170" strokeWidth="1" />
                                <path d="M 190 190 L 170 190 L 170 170" strokeWidth="1" />

                                {/* Decorative Circles */}
                                <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.3" />
                                <circle cx="180" cy="20" r="3" fill="currentColor" opacity="0.3" />
                                <circle cx="20" cy="180" r="3" fill="currentColor" opacity="0.3" />
                                <circle cx="180" cy="180" r="3" fill="currentColor" opacity="0.3" />
                            </g>
                        </svg>
                    </div>

                    {/* Main Control Panel */}
                    <div className="museum-glass rounded-lg border-2 border-charcoal/20 dark:border-off-white/20 shadow-2xl overflow-hidden">
                        <AnimatePresence mode="wait">
                            {!isDevMode ? (
                                // Collapsed State - Ornate Button
                                <motion.button
                                    key="collapsed"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    onClick={toggleDevMode}
                                    className="group relative p-4 pointer-events-auto"
                                    title="Activate Developer Instrumentation (Ctrl+Shift+D)"
                                >
                                    {/* Background Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-link-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="relative flex flex-col items-center gap-2">
                                        {/* Ornamental Icon */}
                                        <div className="relative">
                                            <svg className="w-8 h-8 text-charcoal dark:text-off-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                                                <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                                                <line x1="12" y1="3" x2="12" y2="6" stroke="currentColor" strokeWidth="1" />
                                                <line x1="12" y1="18" x2="12" y2="21" stroke="currentColor" strokeWidth="1" />
                                                <line x1="3" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1" />
                                                <line x1="18" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1" />
                                            </svg>

                                            {/* Pulse Ring */}
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.5, 1],
                                                    opacity: [0.5, 0, 0.5],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                }}
                                                className="absolute inset-0 border-2 border-link-blue rounded-full"
                                            />
                                        </div>

                                        <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal/60 dark:text-off-white/60 group-hover:text-link-blue transition-colors">
                                            Dev
                                        </span>
                                    </div>
                                </motion.button>
                            ) : (
                                // Expanded State - Instrumentation Panel
                                <motion.div
                                    key="expanded"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="pointer-events-auto p-6 min-w-[280px]"
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-charcoal/10 dark:border-off-white/10">
                                        <div className="flex items-center gap-3">
                                            <div className="text-link-blue">
                                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                                                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-serif text-sm font-semibold text-charcoal dark:text-off-white">
                                                    Developer Instrumentation
                                                </h3>
                                                <p className="font-mono text-[9px] uppercase tracking-wider text-charcoal/40 dark:text-off-white/40">
                                                    System Diagnostics
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={toggleDevMode}
                                            className="text-charcoal/40 hover:text-charcoal dark:text-off-white/40 dark:hover:text-off-white transition-colors p-1"
                                            title="Deactivate (Ctrl+Shift+D)"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Metrics - Ornate Gauges */}
                                    <div className="space-y-4">
                                        {/* FPS Gauge */}
                                        <div className="relative">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-mono text-xs text-charcoal/60 dark:text-off-white/60 uppercase tracking-wide">
                                                    Frame Rate
                                                </span>
                                                <span className={cn(
                                                    "font-mono text-lg font-bold tabular-nums",
                                                    fps >= 55 ? "text-success-green" : fps >= 30 ? "text-[#F5A623]" : "text-alert-red"
                                                )}>
                                                    {fps}
                                                </span>
                                            </div>

                                            {/* Gauge Bar */}
                                            <div className="h-1.5 bg-charcoal/10 dark:bg-off-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    className={cn(
                                                        "h-full rounded-full",
                                                        fps >= 55 ? "bg-success-green" : fps >= 30 ? "bg-[#F5A623]" : "bg-alert-red"
                                                    )}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(fps / 60) * 100}%` }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </div>

                                            <div className="flex justify-between mt-1">
                                                <span className="font-mono text-[9px] text-charcoal/30 dark:text-off-white/30">0</span>
                                                <span className="font-mono text-[9px] text-charcoal/30 dark:text-off-white/30">60 FPS</span>
                                            </div>
                                        </div>

                                        {/* Memory Gauge */}
                                        {memory > 0 && (
                                            <div className="relative">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-mono text-xs text-charcoal/60 dark:text-off-white/60 uppercase tracking-wide">
                                                        Memory Usage
                                                    </span>
                                                    <span className="font-mono text-lg font-bold text-charcoal dark:text-off-white tabular-nums">
                                                        {memory}
                                                    </span>
                                                </div>

                                                <div className="h-1.5 bg-charcoal/10 dark:bg-off-white/10 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-link-blue rounded-full"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${Math.min((memory / 100) * 100, 100)}%` }}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                </div>

                                                <div className="flex justify-between mt-1">
                                                    <span className="font-mono text-[9px] text-charcoal/30 dark:text-off-white/30">0</span>
                                                    <span className="font-mono text-[9px] text-charcoal/30 dark:text-off-white/30">MB</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Status Indicator */}
                                        <div className="pt-3 border-t border-charcoal/10 dark:border-off-white/10">
                                            <div className="flex items-center gap-2">
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                        opacity: [0.5, 1, 0.5],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                    }}
                                                    className="w-2 h-2 rounded-full bg-success-green"
                                                />
                                                <span className="font-mono text-xs text-charcoal/60 dark:text-off-white/60">
                                                    Wireframe Mode Active
                                                </span>
                                            </div>
                                        </div>

                                        {/* Keyboard Shortcut Hint */}
                                        <div className="pt-3 border-t border-charcoal/10 dark:border-off-white/10">
                                            <div className="flex items-center justify-center gap-1 font-mono text-[10px] text-charcoal/30 dark:text-off-white/30">
                                                <kbd className="px-1.5 py-0.5 bg-charcoal/5 dark:bg-off-white/5 rounded border border-charcoal/10 dark:border-off-white/10">
                                                    Ctrl
                                                </kbd>
                                                <span>+</span>
                                                <kbd className="px-1.5 py-0.5 bg-charcoal/5 dark:bg-off-white/5 rounded border border-charcoal/10 dark:border-off-white/10">
                                                    Shift
                                                </kbd>
                                                <span>+</span>
                                                <kbd className="px-1.5 py-0.5 bg-charcoal/5 dark:bg-off-white/5 rounded border border-charcoal/10 dark:border-off-white/10">
                                                    D
                                                </kbd>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </>
    );
}

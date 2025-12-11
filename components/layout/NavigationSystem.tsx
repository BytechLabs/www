"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { CommandStrip } from "@/components/layout/CommandStrip";
import { NeuralNode } from "@/components/layout/NeuralNode";
import { cn } from "@/lib/utils";

type NavMode = "arch" | "util" | "orgc";

export function NavigationSystem() {
    const [mode, setMode] = useState<NavMode>("arch");
    const [isControllerOpen, setIsControllerOpen] = useState(false);
    const controllerRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedMode = localStorage.getItem("bytech_nav_mode") as NavMode;
        if (savedMode) setMode(savedMode);

        const handleClickOutside = (event: MouseEvent) => {
            if (controllerRef.current && !controllerRef.current.contains(event.target as Node)) {
                setIsControllerOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleModeChange = (newMode: NavMode) => {
        setMode(newMode);
        localStorage.setItem("bytech_nav_mode", newMode);
    };

    return (
        <>
            {/* The Active Navigation Mode */}
            <AnimatePresence mode="wait">
                {mode === "arch" && (
                    <motion.div
                        key="arch"
                        initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }} // Subtle entry
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 pointer-events-none" // CRITICAL: Fixes positioning context
                    >
                        <div className="contents pointer-events-auto">
                            <Navbar />
                        </div>
                    </motion.div>
                )}
                {mode === "util" && (
                    <motion.div
                        key="util"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: "spring", damping: 15, stiffness: 200 }}
                        className="fixed inset-0 z-40 pointer-events-none flex items-end justify-center pb-8"
                    >
                        <div className="pointer-events-auto">
                            <CommandStrip />
                        </div>
                    </motion.div>
                )}
                {mode === "orgc" && (
                    <motion.div
                        key="orgc"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", damping: 15, stiffness: 200 }}
                        className="fixed inset-0 z-40 pointer-events-none"
                    >
                        <div className="contents pointer-events-auto">
                            <NeuralNode />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Interface Controller (The Easter Egg) */}
            <div ref={controllerRef} className="fixed bottom-6 left-6 z-[100] flex flex-col items-start gap-2 mix-blend-difference text-off-white">

                {/* Controller Trigger / Display */}
                <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setIsControllerOpen(!isControllerOpen)}
                >
                    <div className="relative w-2 h-2 flex items-center justify-center">
                        <div className={cn(
                            "absolute inset-0 rounded-full transition-all duration-300",
                            isControllerOpen ? "bg-off-white" : "bg-off-white/30"
                        )} />
                        {!isControllerOpen && (
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 rounded-full bg-off-white"
                            />
                        )}
                        <div className={cn(
                            "relative w-1.5 h-1.5 rounded-full transition-colors duration-300",
                            isControllerOpen ? "bg-ink" : "bg-off-white"
                        )} />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-off-white/50 group-hover:text-off-white transition-colors select-none">
                        SYS.UI
                    </span>
                </div>

                {/* Mode Selectors */}
                <AnimatePresence>
                    {isControllerOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: 10 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: 10 }}
                            className="flex flex-col gap-1 pl-5 border-l border-off-white/20 select-none overflow-hidden"
                        >
                            <NavOption
                                label="ARCH [Codex]"
                                active={mode === "arch"}
                                onClick={() => handleModeChange("arch")}
                            />
                            <NavOption
                                label="UTIL [Strip]"
                                active={mode === "util"}
                                onClick={() => handleModeChange("util")}
                            />
                            <NavOption
                                label="ORGC [Node]"
                                active={mode === "orgc"}
                                onClick={() => handleModeChange("orgc")}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

function NavOption({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "font-mono text-[10px] uppercase tracking-widest text-left transition-colors hover:text-off-white",
                active ? "text-off-white" : "text-off-white/30"
            )}
        >
            {active && <span className="mr-1">{">"}</span>}
            {label}
        </button>
    );
}

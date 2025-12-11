"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface WaxSealButtonProps {
    onClick?: () => void;
    isSubmitting?: boolean;
    isSuccess?: boolean;
    className?: string;
}

export function WaxSealButton({ onClick, isSubmitting, isSuccess, className }: WaxSealButtonProps) {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        if (isSubmitting || isSuccess) return;
        setIsPressed(true);
        if (onClick) onClick();
        setTimeout(() => setIsPressed(false), 500);
    };

    return (
        <div className={cn("relative flex flex-col items-center", className)}>

            <motion.button
                onClick={handlePress}
                disabled={isSubmitting || isSuccess}
                className="group relative flex items-center justify-center p-4 outline-none active:scale-95 transition-transform"
            >
                {/* The Wax Seal Visual */}
                <div className={cn(
                    "relative w-24 h-24 flex items-center justify-center transition-all duration-700",
                    isSuccess ? "scale-90" : "hover:-translate-y-1"
                )}>
                    {/* Animated Melting Blob Background */}
                    <motion.div
                        animate={{
                            borderRadius: ["50% 50% 50% 50%", "52% 48% 51% 49%", "51% 49% 49% 51%", "50% 50% 50% 50%"],
                            rotate: [0, 2, -1, 0],
                            scale: [1, 1.02, 0.98, 1]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.33, 0.66, 1]
                        }}
                        className={cn(
                            "absolute inset-0 bg-gradient-to-br from-[#8c2b2b] to-[#5c1a1a] shadow-lg shadow-[#5c1a1a]/40",
                            isSuccess ? "rounded-full" : ""
                        )}
                    />

                    {/* Irregular Border (to look like wax pool) - animating with parent */}
                    <motion.div
                        animate={{
                            borderRadius: ["50% 50% 50% 50%", "52% 48% 51% 49%", "51% 49% 49% 51%", "50% 50% 50% 50%"],
                            rotate: [0, -2, 1, 0]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 border-[3px] border-[#7a2222] opacity-50 blur-[1px]"
                    />
                    <div className="absolute inset-1 rounded-full border border-[#a64d4d]/30" />

                    {/* Inner Ring - Etched Look */}
                    <div className="absolute inset-3 rounded-full border border-[#4a1212]/30 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]" />

                    {/* Content */}
                    <AnimatePresence mode="wait">
                        {isSubmitting ? (
                            <motion.div
                                key="loading"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-8 h-8 border-2 border-t-transparent border-[#4a1212] rounded-full"
                            />
                        ) : isSuccess ? (
                            <motion.span
                                key="success"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-3xl text-[#3d0f0f] font-serif font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)] shadow-inner"
                                style={{ textShadow: "0px 1px 0px rgba(255,255,255,0.1)" }}
                            >
                                B
                            </motion.span>
                        ) : (
                            <motion.div
                                key="idle"
                                className="flex flex-col items-center justify-center w-full h-full"
                            >
                                <span
                                    className="font-mono text-[10px] uppercase font-bold text-[#e8dcc4] tracking-widest text-center leading-tight drop-shadow-md"
                                >
                                    Seal<br />&<br />Send
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Specular Highlight */}
                    <div className="absolute top-4 left-5 w-4 h-2 bg-white/10 rounded-full blur-[1px] -rotate-45 pointer-events-none" />
                </div>

            </motion.button>

        </div>
    );
}

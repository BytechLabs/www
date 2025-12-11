"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Mock Data - Constellation Pattern (Fanning Top-Left)
import { navigationItems } from "@/config/navigation";

export function NeuralNode() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const nodeRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleClickOutside = (event: MouseEvent) => {
            if (nodeRef.current && !nodeRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener('resize', checkMobile);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Mobile Fan Pattern (Upwards/Outwards)
    const getMobileCoords = (index: number) => {
        // Simple fan: -180 (left) to 0 (right). Top is -90.
        // 4 satellites
        const positions = [
            { x: -70, y: -60 },  // Top Left
            { x: -25, y: -90 },  // Top Left-ish
            { x: 25, y: -90 },   // Top Right-ish
            { x: 70, y: -60 },   // Top Right
        ];
        return positions[index] || { x: 0, y: -100 };
    };

    return (
        <div ref={nodeRef} className="fixed bottom-8 left-1/2 -translate-x-1/2 sm:bottom-12 sm:right-12 sm:left-auto sm:translate-x-0 z-50 flex items-center justify-center">

            {/* The Core Node */}
            <motion.div
                onClick={() => setIsOpen(!isOpen)}
                animate={{
                    scale: isOpen ? 0.9 : 1,
                    boxShadow: isOpen ? "0 0 40px rgba(232, 220, 196, 0.2)" : "0 0 0px rgba(232, 220, 196, 0)"
                }}
                className="w-14 h-14 rounded-full bg-ink/80 backdrop-blur-md border border-off-white/20 flex items-center justify-center cursor-pointer relative z-50 group transition-colors hover:border-off-white/40 pointer-events-auto"
            >
                {/* Inner pulsing core */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                        backgroundColor: isOpen ? "#E8DCC4" : "#E8DCC4"
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-2 h-2 rounded-full blur-[1px]"
                />

                {/* Orbital Rings */}
                <div className="absolute inset-0 border border-off-white/5 rounded-full scale-125 pointer-events-none" />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                >
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[9px] w-0.5 h-0.5 bg-off-white/30 rounded-full" />
                </motion.div>
            </motion.div>

            {/* Expended Satellite Nodes (Constellation) */}
            <AnimatePresence>
                {isOpen && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {/* Connecting Lines (SVG Layer) */}
                        <svg className="absolute w-[300px] h-[300px] pointer-events-none overflow-visible">
                            {navigationItems.filter(n => n.id !== 'home').map((node, i) => {
                                const pos = isMobile ? getMobileCoords(i) : { x: node.x, y: node.y };
                                return (
                                    <motion.line
                                        key={`line-${node.id}`}
                                        x1="150" y1="150"
                                        x2={150 + pos.x} y2={150 + pos.y}
                                        stroke="currentColor"
                                        className="text-off-white/20"
                                        strokeWidth="1"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        exit={{ pathLength: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                    />
                                );
                            })}
                        </svg>

                        {navigationItems.map((node, i) => {
                            const isActive = pathname === node.href;
                            const pos = isMobile ? getMobileCoords(i) : { x: node.x, y: node.y };

                            return (
                                <motion.div
                                    key={node.id}
                                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                                    animate={{ opacity: 1, x: pos.x, y: pos.y, scale: 1 }}
                                    exit={{ opacity: 0, x: 0, y: 0, scale: 0, transition: { duration: 0.2 } }}
                                    transition={{ type: "spring", damping: 15, stiffness: 200, delay: node.delay }}
                                    className="absolute z-40 pointer-events-auto"
                                >
                                    <Link
                                        href={node.href}
                                        className="group flex flex-col items-center justify-center gap-2"
                                    >
                                        {/* Glass Orb Station - Active State */}
                                        <div className={cn(
                                            "w-8 h-8 rounded-full border backdrop-blur-sm flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(232,220,196,0.15)]",
                                            isActive
                                                ? "bg-off-white text-ink border-off-white scale-110 shadow-[0_0_20px_rgba(232,220,196,0.4)]"
                                                : "bg-ink/90 border-off-white/30 text-transparent group-hover:scale-110 group-hover:border-off-white"
                                        )}>
                                            <div className={cn(
                                                "w-1.5 h-1.5 rounded-full transition-colors",
                                                isActive ? "bg-ink" : "bg-off-white"
                                            )} />
                                        </div>

                                        {/* Floating Label */}
                                        <div className="absolute top-full mt-1 whitespace-nowrap">
                                            <span className={cn(
                                                "font-serif italic text-xs px-2 py-0.5 rounded-full backdrop-blur-sm transition-colors duration-300",
                                                isActive
                                                    ? "text-ink bg-off-white"
                                                    : "text-off-white/60 bg-ink/50 group-hover:text-off-white"
                                            )}>
                                                {node.label}
                                            </span>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

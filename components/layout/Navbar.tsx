"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

// --- Components ---

function NavAnchor({ position, children, className, onClick }: {
    position: "top-left" | "top-right" | "top-center",
    children: React.ReactNode,
    className?: string,
    onClick?: () => void
}) {
    const positionStyles = {
        "top-left": "top-6 left-6 sm:top-8 sm:left-8",
        "top-right": "top-6 right-6 sm:top-8 sm:right-8",
        "top-center": "top-6 left-1/2 -translate-x-1/2 sm:top-8"
    };

    return (
        <div
            onClick={onClick}
            className={cn(
                "fixed z-50 flex items-center gap-3 mix-blend-difference text-off-white cursor-pointer group pointer-events-auto",
                positionStyles[position],
                className
            )}
        >
            {children}
        </div>
    );
}

// --- Menu Overlay ---

import { navigationItems } from "@/config/navigation";

// --- Menu Overlay ---

function MenuOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md flex flex-col justify-center items-center"
                >
                    {/* Noise texture for the menu specifically */}
                    <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

                    {/* Close Trigger (same position as open) */}
                    <div
                        onClick={onClose}
                        className="absolute top-6 right-6 sm:top-8 sm:right-8 flex items-center gap-2 cursor-pointer text-off-white/50 hover:text-off-white transition-colors z-50 pointer-events-auto"
                    >
                        <span className="font-mono text-xs uppercase tracking-widest hidden sm:block">Close</span>
                        <div className="w-8 h-8 flex items-center justify-center border border-off-white/20 rounded-full">
                            <span className="text-lg">×</span>
                        </div>
                    </div>

                    <nav className="relative z-10 flex flex-col items-center gap-4 sm:gap-8 pointer-events-auto">
                        {navigationItems.map((item, idx) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={onClose}
                                className="group relative"
                            >
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 + idx * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    className="relative flex items-baseline gap-4 sm:gap-8"
                                >
                                    <span className="font-mono text-xs sm:text-sm text-off-white/30 group-hover:text-off-white/50 transition-colors">
                                        {item.number}
                                    </span>
                                    <span className="font-serif text-5xl sm:text-7xl md:text-8xl text-off-white group-hover:text-off-white/80 transition-colors">
                                        {item.label}
                                    </span>
                                </motion.div>

                                {/* Hover line */}
                                <span className="absolute -bottom-2 left-0 w-0 h-px bg-off-white group-hover:w-full transition-all duration-500 ease-out" />
                            </Link>
                        ))}
                    </nav>

                    {/* Agency Contact Info Footer */}
                    <div className="absolute bottom-12 w-full text-center pointer-events-auto">
                        <p className="font-mono text-xs text-off-white/30 uppercase tracking-widest">
                            Bytech Labs © 2025
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// --- Main Navbar Component ---

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Determine current "Chapter" based on route
    const getChapter = () => {
        if (pathname === "/") return "FIG. 01 — HERO";
        if (pathname.includes("work")) return "FIG. 02 — WORK";
        if (pathname.includes("services")) return "FIG. 03 — CAPABILITIES";
        if (pathname.includes("studio")) return "FIG. 04 — STUDIO";
        if (pathname.includes("contact")) return "FIG. 05 — CONTACT";
        return "FIG. 00 — INDEX";
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* TOP LEFT: BRAND MARK */}
            <NavAnchor position="top-left">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 border border-off-white/30 rounded-full flex items-center justify-center relative overflow-hidden">
                        <span className="font-serif italic text-lg sm:text-xl relative z-10">B</span>
                        <div className="absolute inset-0 bg-off-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm tracking-wide leading-none">BYTECH</span>
                        <span className="font-mono text-[10px] text-off-white/50 leading-none mt-1">LABS</span>
                    </div>
                </Link>
            </NavAnchor>

            {/* TOP CENTER: CHAPTER INDICATOR */}
            <NavAnchor position="top-center" className="hidden md:flex">
                <div className={cn(
                    "px-4 py-1.5 border border-off-white/20 rounded-full backdrop-blur-sm transition-all duration-500",
                    scrolled ? "bg-ink/50 border-off-white/10" : "bg-transparent"
                )}>
                    <span className="font-mono text-xs tracking-widest uppercase text-off-white/70">
                        {getChapter()}
                    </span>
                </div>
            </NavAnchor>

            {/* TOP RIGHT: MENU TRIGGER */}
            <NavAnchor position="top-right" onClick={() => setIsMenuOpen(true)}>
                <div className="flex items-center gap-3">
                    <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="font-mono text-xs uppercase tracking-widest hidden sm:block"
                    >
                        Menu
                    </motion.span>
                    <div className="flex flex-col gap-1.5 w-6 items-end group-hover:gap-2 transition-all">
                        <span className="h-px w-6 bg-off-white" />
                        <span className="h-px w-4 bg-off-white group-hover:w-6 transition-all" />
                        <span className="h-px w-6 bg-off-white" />
                    </div>
                </div>
            </NavAnchor>

            {/* FULL SCREEN MENU */}
            <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}

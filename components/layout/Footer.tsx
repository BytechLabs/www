"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { motion, AnimatePresence } from "framer-motion";

export function Footer() {
    const [showSignature, setShowSignature] = useState(false);

    return (
        <footer className="relative w-full py-16 bg-black border-t border-[#1a1a1a] overflow-hidden">
            <Container className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-0">

                    {/* Brand */}
                    <div className="flex flex-col gap-2">
                        <span className="font-serif text-2xl text-[#e5e5e5]">BytechLabs</span>
                        <span className="font-mono text-[10px] text-[#666] uppercase tracking-widest">
                            Renaissance Futurism
                        </span>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-wrap gap-8">
                        {["Services", "Work", "About", "Contact"].map((item) => (
                            <a
                                key={item}
                                href={item === "About" ? "/studio" : `/${item.toLowerCase()}`}
                                className="font-mono text-sm text-[#888] hover:text-[#e5e5e5] transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Socials */}
                    <div className="flex gap-6">
                        {["GH", "TW", "LI"].map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="w-8 h-8 rounded-full border border-[#333] flex items-center justify-center text-[10px] font-mono text-[#666] hover:border-[#8c7b64] hover:text-[#8c7b64] transition-colors"
                            >
                                {social}
                            </a>
                        ))}
                    </div>

                </div>

                {/* Divider / Signature Area */}
                <div className="mt-16 pt-8 border-t border-[#111] flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="font-mono text-[10px] text-[#444]">
                        © 2024 BytechLabs. All Rights Reserved.
                    </span>

                    {/* Easter Egg: The Maker's Mark */}
                    <button
                        onClick={() => setShowSignature(!showSignature)}
                        className="group relative"
                    >
                        <AnimatePresence mode="wait">
                            {showSignature ? (
                                <motion.span
                                    key="signature"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="font-serif italic text-lg text-[#8c7b64]"
                                >
                                    Leonardo
                                </motion.span>
                            ) : (
                                <motion.div
                                    key="mark"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-6 h-6 border border-[#222] rotate-45 group-hover:border-[#8c7b64]/50 group-hover:rotate-90 transition-all duration-700"
                                />
                            )}
                        </AnimatePresence>
                    </button>
                </div>

            </Container>
        </footer>
    );
}

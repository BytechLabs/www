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
                            Enterprise Architecture
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
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <span className="font-mono text-[10px] text-[#444]">
                            © {new Date().getFullYear()} BytechLabs. All Rights Reserved.
                        </span>
                        <a href="/privacy" className="font-mono text-[10px] text-[#333] hover:text-[#666]">Privacy Policy</a>
                        <a href="/terms" className="font-mono text-[10px] text-[#333] hover:text-[#666]">Terms of Service</a>
                    </div>
                </div>
            </Container>
        </footer >
    );
}

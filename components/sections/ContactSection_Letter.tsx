"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { WaxSealButton } from "@/components/ui/WaxSealButton";
import { MeasurementLine } from "@/components/ui/CodexOrnaments";
import { motion } from "framer-motion";

export function ContactSection_Letter() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulate network request
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 2000);
    };

    return (
        <section id="contact" className="relative w-full py-32 bg-[#080808] overflow-hidden">

            <Container className="relative z-10 max-w-4xl">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-4"
                    >
                        <span className="font-mono text-[#8c7b64] text-xs uppercase tracking-[0.3em]">
                            The Correspondence
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-serif text-4xl sm:text-5xl text-[#e5e5e5]"
                    >
                        Write to the Guild
                    </motion.h2>
                </div>

                {/* Perspective Paper Container */}
                <div className="relative w-full p-8 md:p-16 bg-[#111] border border-[#222] shadow-2xl">

                    {/* Decorative Corner Marks */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#8c7b64]/30" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#8c7b64]/30" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#8c7b64]/30" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#8c7b64]/30" />

                    {/* The Form Letters */}
                    <div className="flex flex-col gap-12 font-serif text-lg md:text-xl text-[#ccc] leading-relaxed">

                        {/* Salutation */}
                        <div className="flex flex-wrap items-baseline gap-4">
                            <span>To the Masters of BytechLabs,</span>
                        </div>

                        {/* Identity Inputs */}
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-8">
                            <span>I am</span>
                            <div className="flex-1 min-w-[200px] relative group">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full bg-transparent border-b border-[#333] pb-2 outline-none text-[#e5e5e5] placeholder:text-[#444] group-hover:border-[#8c7b64] transition-colors font-mono text-base"
                                />
                            </div>
                            <span>, representing</span>
                            <div className="flex-1 min-w-[200px] relative group">
                                <input
                                    type="text"
                                    placeholder="Company / Organization"
                                    className="w-full bg-transparent border-b border-[#333] pb-2 outline-none text-[#e5e5e5] placeholder:text-[#444] group-hover:border-[#8c7b64] transition-colors font-mono text-base"
                                />
                            </div>
                        </div>

                        {/* Contact Input */}
                        <div className="flex flex-wrap items-baseline gap-4">
                            <span>You can correspond with me at</span>
                            <div className="flex-1 min-w-[240px] relative group">
                                <input
                                    type="email"
                                    placeholder="email@address.com"
                                    className="w-full bg-transparent border-b border-[#333] pb-2 outline-none text-[#e5e5e5] placeholder:text-[#444] group-hover:border-[#8c7b64] transition-colors font-mono text-base"
                                />
                            </div>
                            <span>.</span>
                        </div>

                        {/* Message Body */}
                        <div className="flex flex-col gap-4">
                            <span>I wish to discuss:</span>
                            <div className="relative group">
                                <textarea
                                    rows={4}
                                    placeholder="The nature of your inquiry..."
                                    className="w-full bg-transparent border-b border-[#333] pb-2 outline-none text-[#e5e5e5] placeholder:text-[#444] group-hover:border-[#8c7b64] transition-colors resize-none font-mono text-base leading-relaxed"
                                />
                            </div>
                        </div>

                        {/* Sign-off */}
                        <div className="w-full flex justify-end mt-12 relative">
                            {/* Ornamental Pointer Line */}
                            <div className="absolute right-32 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none hidden sm:flex">
                                <span className="font-mono text-[#444] text-[10px] uppercase tracking-widest">Click to Affix</span>
                                <div className="w-16 h-px bg-[#333]" />
                                <div className="w-2 h-2 rounded-full border border-[#333]" />
                            </div>

                            <div className="flex flex-col items-center z-10">
                                <span className="mb-4 italic text-[#666] font-serif">Sincerely,</span>
                                <WaxSealButton
                                    onClick={handleSubmit}
                                    isSubmitting={isSubmitting}
                                    isSuccess={isSuccess}
                                />
                            </div>
                        </div>

                    </div>

                </div>

            </Container>
        </section>
    );
}

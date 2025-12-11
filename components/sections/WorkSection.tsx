"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { ProjectFrame } from "@/components/ui/ProjectFrame";
import { motion } from "framer-motion";
import { workData } from "@/config/work";
import { MeasurementLine } from "@/components/ui/CodexOrnaments";

export function WorkSection() {
    return (
        <section id="work" className="relative w-full py-32 bg-[#050505]">

            {/* Atmospheric Lighting */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-[#8c7b64]/5 blur-[120px] rounded-full pointer-events-none" />

            <Container className="relative z-10">

                {/* Gallery Header */}
                <div className="flex flex-col items-start mb-24 max-w-2xl px-4 sm:px-0">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <MeasurementLine length="w-12" />
                        <span className="font-mono text-[#8c7b64] text-xs uppercase tracking-widest">
                            The Collection
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-5xl sm:text-6xl text-[#e5e5e5] leading-tight"
                    >
                        Gallery of <br />
                        <span className="italic text-[#666]">Inventions</span>
                    </motion.h2>
                </div>

                {/* The Gallery Wall (Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 px-4 sm:px-0">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-16 md:mt-0">
                        {workData.filter((_, i) => i % 2 === 0).map((project, index) => (
                            <ProjectFrame
                                key={project.id}
                                {...project}
                                className="w-full"
                                delay={index * 0.2}
                            />
                        ))}
                    </div>

                    {/* Column 2 (Offset 'hanging' style) */}
                    <div className="flex flex-col gap-16 md:mt-24">
                        {workData.filter((_, i) => i % 2 !== 0).map((project, index) => (
                            <ProjectFrame
                                key={project.id}
                                {...project}
                                className="w-full"
                                delay={0.1 + (index * 0.2)}
                            />
                        ))}
                    </div>
                </div>

                {/* Curator's Note */}
                <div className="mt-24 flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex flex-col items-center gap-2"
                    >
                        <span className="font-serif italic text-[#888] group-hover:text-[#e5e5e5] transition-colors">
                            View Full Archives
                        </span>
                        <div className="w-1 h-12 bg-[#333] group-hover:bg-[#8c7b64] transition-colors" />
                    </motion.button>
                </div>

            </Container>
        </section>
    );
}

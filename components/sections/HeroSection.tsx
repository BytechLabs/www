"use client";

import React from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useVelocity } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { CodexButton } from "@/components/ui/CodexButton";
import { FolioNumber, MarginAnnotation, MeasurementLine, CornerReference } from "@/components/ui/CodexOrnaments";
import { CyclingText } from "@/components/ui/CyclingText";

/**
 * Hero Section - Surreal Renaissance
 * INTERACTIVE WITH TINY CURSOR-FOLLOWING GLOW
 * FIT TO SCREEN (NO SCROLL)
 */
export function HeroSection() {
    const { scrollY } = useScroll();
    const diagramOpacity = useTransform(scrollY, [0, 300], [0.04, 0]);

    return (
        <section
            className="relative h-screen w-full flex items-center justify-center bg-ink overflow-hidden"
        >
            {/* Dramatic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/50 to-ink pointer-events-none z-10" />

            <Container size="lg" className="relative w-full z-20 h-full flex flex-col items-center justify-center">
                {/* Main content */}
                <div className="flex flex-col items-center text-center gap-6 sm:gap-10 lg:gap-14 w-full max-w-5xl">

                    {/* Measurement line decoration */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 w-full"
                    >
                        <MeasurementLine length="w-16 sm:w-24 lg:w-32" className="hidden sm:flex" />
                        <span className="font-mono text-[10px] sm:text-xs text-off-white/40 uppercase tracking-widest whitespace-nowrap px-2 select-none">
                            Fig. I — System Architecture
                        </span>
                        <MeasurementLine length="w-16 sm:w-24 lg:w-32" className="hidden sm:flex" />
                    </motion.div>

                    {/* TITLE */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full relative"
                    >

                        {/* Main title with gradient and effects */}
                        <h1 className="relative font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] px-4 tracking-normal">
                            <span className="inline-block font-semibold bg-gradient-to-br from-off-white via-off-white to-off-white/80 bg-clip-text text-transparent"
                                style={{
                                    filter: 'drop-shadow(0 0 60px rgba(229,229,229,0.3)) drop-shadow(0 0 120px rgba(229,229,229,0.15))',
                                }}>
                                Bytech
                            </span>
                            <span className="inline-block font-extralight bg-gradient-to-br from-off-white/70 via-off-white/50 to-off-white/30 bg-clip-text text-transparent"
                                style={{ filter: 'drop-shadow(0 0 40px rgba(229,229,229,0.15))' }}>
                                Labs
                            </span>
                        </h1>

                        {/* Ornamental underline */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="flex items-center justify-center gap-2 select-none"
                        >
                            <span className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-off-white/30" />
                            <span className="w-2 h-2 rounded-full bg-off-white/40" />
                            <span className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-off-white/30" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl text-off-white/50 italic max-w-4xl mx-auto leading-relaxed px-6 sm:px-8 flex flex-wrap justify-center gap-x-2"
                        >
                            <span>Architecting</span>
                            <CyclingText
                                words={[
                                    "enterprise ecosystems",
                                    "scalable platforms",
                                    "ironclad security",
                                    "digital cathedrals",
                                    "resilient systems"
                                ]}
                                className="text-off-white/80 font-normal min-w-[280px]"
                            />
                            <span>for the modern age.</span>
                        </motion.div>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.8 }}
                        className="flex flex-col max-w-2xl w-full px-6 sm:px-8"
                    >
                        <p className="font-mono text-xs sm:text-sm leading-relaxed text-off-white/50 tracking-wide">
                            We are a premier software development agency building critical applications for global enterprises.
                            Merging timeless engineering principles with cutting-edge technology to create systems that last.
                        </p>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="flex w-full justify-center px-4 sm:px-6 pt-4 sm:pt-8"
                    >
                        <CodexButton
                            variant="primary"
                            size="lg"
                            href="#contact"
                            className="w-full sm:w-auto"
                        >
                            Initiate Project
                            <motion.span
                                animate={{ x: [0, 6, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                →
                            </motion.span>
                        </CodexButton>
                    </motion.div>

                    {/* Bottom decoration */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8, duration: 0.8 }}
                        className="flex flex-row items-center justify-center gap-6 sm:gap-8 pt-6 sm:pt-10"
                    >
                        <MeasurementLine length="w-16 sm:w-20 lg:w-32" />
                        <div className="flex flex-row gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-off-white/20" />
                            <span className="w-1.5 h-1.5 rounded-full bg-off-white/30" />
                            <span className="w-1.5 h-1.5 rounded-full bg-off-white/20" />
                        </div>
                        <MeasurementLine length="w-16 sm:w-20 lg:w-32" />
                    </motion.div>
                </div>

                {/* Margin annotation */}
                <MarginAnnotation
                    text="Observatio prima: De architectura systematis"
                    position="left"
                    className="hidden xl:block"
                />
            </Container>

            {/* CENTERED Background technical diagram with parallax and CONTINUOUS ROTATION */}
            <motion.div
                className="fixed translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
                style={{ opacity: diagramOpacity }}
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
                <svg
                    className="w-[400px] h-[400px] sm:w-[700px] sm:h-[700px] lg:w-[1000px] lg:h-[1000px]"
                    viewBox="0 0 400 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Concentric circles - water vortex study */}
                    <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="0.5" opacity="0.9" />
                    <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="0.6" opacity="0.9" />
                    <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="0.7" opacity="0.9" />
                    <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="0.9" opacity="0.9" />

                    {/* Radial lines */}
                    <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="0.7" className="text-off-white" opacity="0.9" />
                    <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="0.6" className="text-off-white" opacity="0.9" />
                    <line x1="60" y1="60" x2="340" y2="340" stroke="currentColor" strokeWidth="0.5" className="text-off-white" opacity="0.9" />
                    <line x1="340" y1="60" x2="60" y2="340" stroke="currentColor" strokeWidth="0.4" className="text-off-white" opacity="0.9" />
                </svg>
            </motion.div>
        </section>
    );
}

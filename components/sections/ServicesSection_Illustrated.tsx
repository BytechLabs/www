"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { IllustratedCard } from "@/components/ui/IllustratedCard";
import { MeasurementLine, MarginAnnotation } from "@/components/ui/CodexOrnaments";
import { motion } from "framer-motion";
import { servicesData } from "@/config/services";

export function ServicesSection_Illustrated() {

    // Helper to map service ID to specific illustration assets
    const illustrationMap: Record<string, { src: string, aspect: "landscape" | "portrait" | "square", className: string }> = {
        // Row 1 (4 cols total): [2] [1] [1]
        architecture: { src: "/assets/illustrations/ornithopter.png", aspect: "landscape", className: "lg:col-span-2" },
        development: { src: "/assets/illustrations/gears.png", aspect: "portrait", className: "lg:col-span-1" },
        security: { src: "/assets/illustrations/vitruvian_hands.png", aspect: "portrait", className: "lg:col-span-1" },

        // Row 2 (4 cols total): [1] [1] [2]   
        cloud: { src: "/assets/illustrations/ornithopter.png", aspect: "square", className: "lg:col-span-1" }, // Reusing asset for cohesive theme
        modernization: { src: "/assets/illustrations/gears.png", aspect: "square", className: "lg:col-span-1" },
        data: { src: "/assets/illustrations/optics.png", aspect: "landscape", className: "lg:col-span-2" },
    };

    // Explicit order for perfect grid layout: 2-1-1 | 1-1-2
    const orderedIds = ["architecture", "development", "security", "cloud", "modernization", "data"];
    const illustratedServices = orderedIds
        .map(id => servicesData.find(s => s.id === id))
        .filter((s): s is typeof servicesData[0] => s !== undefined);

    return (
        <section id="services-illustrated" className="relative w-full py-24 bg-[#0a0a0a] overflow-hidden">

            {/* Darker, moodier background for illustrations to pop */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#1f1f1f] via-[#0a0a0a] to-[#0a0a0a] opacity-60 pointer-events-none" />

            <Container className="relative z-10">
                {/* Section Header */}
                <div className="flex flex-col items-start justify-start mb-20 gap-4 border-l-2 border-[#8c7b64]/40 pl-6">
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="font-mono text-[#8c7b64] text-xs uppercase tracking-[0.2em]"
                    >
                        Option D: The Codex
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-4xl sm:text-5xl text-[#e5e5e5]"
                    >
                        Engineering <br />
                        <span className="italic text-[#8c7b64]">The Impossible</span>
                    </motion.h2>
                </div>

                {/* The Illustrated Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {illustratedServices.map((service, index) => {
                        const config = illustrationMap[service.id];
                        const folios = ["IV", "V", "VI", "VII"]; // Custom folios for this set

                        return (
                            <IllustratedCard
                                key={service.id}
                                title={service.title}
                                subtitle={service.subtitle}
                                imageSrc={config.src}
                                folio={folios[index]}
                                className={config.className}
                                aspect={config.aspect}
                                delay={index * 0.1 + 0.1}
                            >
                                {service.description}
                            </IllustratedCard>
                        );
                    })}

                </div>

                <div className="mt-16 w-full h-px bg-[#333] flex items-center justify-center">
                    <span className="bg-[#0a0a0a] px-4 font-serif italic text-[#444] text-sm">Finis</span>
                </div>

            </Container>
        </section>
    );
}

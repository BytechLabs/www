"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { BentoCard } from "@/components/ui/BentoCard";
import { MeasurementLine, MarginAnnotation, CornerReference } from "@/components/ui/CodexOrnaments";
import { motion } from "framer-motion";
import { servicesData } from "@/config/services";

export function ServicesSection_Glass() {
    return (
        <section id="services-glass" className="relative w-full py-20 sm:py-32 bg-ink overflow-hidden border-b border-off-white/10">

            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-off-white/5 via-transparent to-transparent opacity-30 pointer-events-none" />

            <Container className="relative z-10">
                {/* Section Header */}
                <div className="flex flex-col items-center justify-center mb-16 sm:mb-24 gap-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-row items-center gap-4 text-off-white/40"
                    >
                        <MeasurementLine length="w-12 sm:w-24" />
                        <span className="font-mono text-xs uppercase tracking-widest">Our Capabilities</span>
                        <MeasurementLine length="w-12 sm:w-24" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="font-serif text-4xl sm:text-5xl md:text-6xl text-off-white"
                    >
                        Mastery of the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-off-white to-off-white/50 italic">
                            Digital Craft
                        </span>
                    </motion.h2>
                </div>

                {/* The Da Vinci Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">

                    {servicesData.map((service, index) => {
                        // Custom Layout Logic based on index to match original design
                        const className =
                            index === 0 ? "lg:col-span-2 lg:row-span-2 min-h-[300px]" :
                                index === 2 ? "lg:col-span-1 lg:row-span-2" :
                                    index === 4 || index === 5 ? "md:col-span-2 lg:col-span-2 lg:row-span-1" :
                                        "lg:col-span-1 lg:row-span-1";

                        // Icon mapping
                        const icons = ["⌖", "✦", "⚙", "📱", "⚡", "🧠"];

                        return (
                            <BentoCard
                                key={service.id}
                                title={service.title}
                                subtitle={service.subtitle}
                                folio={service.folio}
                                className={className}
                                delay={index * 0.1}
                                icon={<span className="text-xl">{icons[index]}</span>}
                            >
                                {service.description}
                            </BentoCard>
                        );
                    })}

                </div>

                {/* Bottom Annotation */}
                <div className="w-full flex justify-end mt-8">
                    <MarginAnnotation text="Fig. II — The Services Matrix" position="right" className="relative translate-x-0 translate-y-0 right-auto top-auto" />
                </div>

            </Container>
        </section>
    );
}

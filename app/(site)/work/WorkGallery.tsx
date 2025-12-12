"use client";

import React, { useState, useMemo } from "react";
import { ProjectFrame } from "@/components/ui/ProjectFrame";
import { motion, AnimatePresence } from "framer-motion";

interface WorkItem {
    slug: string;
    entry: {
        title: string;
        client: string;
        description: string;
        coverImage: string | null;
        publishedDate: string | null;
        techStack: readonly string[];
    };
}

interface WorkGalleryProps {
    items: WorkItem[];
}

export function WorkGallery({ items }: WorkGalleryProps) {
    const [activeFilter, setActiveFilter] = useState("All");

    // Extract unique tech stack items for filter menu
    const filters = useMemo(() => {
        const allStack = items.flatMap((item) => item.entry.techStack || []);
        const uniqueStack = Array.from(new Set(allStack)).sort();
        return ["All", ...uniqueStack];
    }, [items]);

    // Filter items
    const filteredItems = useMemo(() => {
        if (activeFilter === "All") return items;
        return items.filter((item) =>
            (item.entry.techStack || []).includes(activeFilter)
        );
    }, [items, activeFilter]);

    return (
        <div className="space-y-12">
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-4 border-b border-off-white/10 pb-6">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`
              px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300
              ${activeFilter === filter
                                ? "bg-[#8c7b64] text-black"
                                : "bg-off-white/5 text-off-white/60 hover:bg-off-white/10 hover:text-off-white"
                            }
            `}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
                <AnimatePresence mode="popLayout">
                    {filteredItems.map((item, idx) => (
                        <motion.div
                            key={item.slug}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProjectFrame
                                title={item.entry.title}
                                client={item.entry.client}
                                description={item.entry.description}
                                imageSrc={item.entry.coverImage || ""}
                                techStack={item.entry.techStack || []}
                                folio={`FIG. 0${idx + 1}`}
                                year={item.entry.publishedDate ? new Date(item.entry.publishedDate).getFullYear().toString() : "2024"}
                                href={`/work/${item.slug}`}
                                className="w-full"
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredItems.length === 0 && (
                    <div className="col-span-full py-20 text-center border border-dashed border-off-white/10 rounded-lg">
                        <p className="font-mono text-off-white/30">
                            No artifacts found for filter: {activeFilter}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { notFound } from 'next/navigation';
import { FolioNumber, CornerReference, MarginAnnotation } from "@/components/ui/CodexOrnaments";
import { DocumentRenderer } from '@keystatic/core/renderer';

export const dynamicParams = false;

export async function generateStaticParams() {
    try {
        const reader = createReader(process.cwd(), keystaticConfig);
        const industries = await reader.collections.industries.list();
        return industries.map(slug => ({ slug }));
    } catch (error) {
        console.error("Error generating static params for industries:", error);
        return [];
    }
}

import { WorkGallery } from '@/app/(site)/work/WorkGallery';

const WorkGalleryWrapper = WorkGallery as any;

async function getIndustry(slug: string) {
    const reader = createReader(process.cwd(), keystaticConfig);
    const item = await reader.collections.industries.read(slug);
    if (!item) return null;

    // Keystatic content is a promise of data
    const content = await item.content();

    // Fetch related work items
    const allWork = await reader.collections.work.all();
    const relatedWork = allWork
        .filter(workItem => {
            const industries = workItem.entry.industries || [];
            return industries.includes(slug);
        })
        .map(work => ({
            ...work,
            entry: {
                ...work.entry,
                content: undefined // Remove non-serializable content function
            }
        }));

    return { ...item, content, relatedWork };
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const item = await getIndustry(slug);
    if (!item) return {};

    return {
        title: `${item.title} | Industries | BytechLabs`,
        description: item.description,
    };
}

// Helper to determine sector-specific pattern
function getSectorPattern(slug: string) {
    // Tech / Hardware / Cyber -> "Silicon Wafer" (Dense Dot Matrix)
    if (slug.includes('tech') || slug.includes('cyber') || slug.includes('hard') || slug.includes('soft')) {
        return {
            backgroundImage: 'radial-gradient(circle, #8c7b64 1.5px, transparent 1.5px)',
            backgroundSize: '12px 12px'
        };
    }

    // Finance / Fintech / Banking -> "Ledger Lines" (Ruled Paper)
    if (slug.includes('fin') || slug.includes('bank') || slug.includes('trade')) {
        return {
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, #8c7b64 19px, #8c7b64 20px)',
            backgroundSize: '100% 20px'
        };
    }

    // Health / Medtech / Bio -> "Hex Lattice" (Organic)
    if (slug.includes('health') || slug.includes('med') || slug.includes('bio')) {
        return {
            backgroundImage: 'radial-gradient(circle at 100% 50%, transparent 20%, rgba(140,123,100,0.3) 21%, rgba(140,123,100,0.3) 34%, transparent 35%, transparent), radial-gradient(circle at 0% 50%, transparent 20%, rgba(140,123,100,0.3) 21%, rgba(140,123,100,0.3) 34%, transparent 35%, transparent)',
            backgroundSize: '20px 40px',
            backgroundPosition: '0 0, 10px 20px'
        };
    }

    // Supply Chain / Logistics / Retail -> "Transit Diagonal" (Speed Stripes)
    if (slug.includes('retail') || slug.includes('logis') || slug.includes('supply')) {
        return {
            backgroundImage: 'repeating-linear-gradient(45deg, #8c7b64 0, #8c7b64 1px, transparent 1px, transparent 10px)'
        };
    }

    // Default / Generic -> "Blueprint Grid" (Architectural)
    return {
        backgroundImage: 'linear-gradient(#8c7b64 1px, transparent 1px), linear-gradient(90deg, #8c7b64 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        opacity: 0.15
    };
}

export default async function IndustryDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const item = await getIndustry(slug);

    if (!item) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-ink pt-32 pb-24 px-6 sm:px-12 relative overflow-hidden">
            {/* --- CODEX ORNAMENTS --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <FolioNumber number="03" />
                <CornerReference label={`SEC.${slug.toUpperCase()}`} position="top-right" />
                <MarginAnnotation text="SECTOR ANALYSIS" position="left" className="top-1/4 opacity-30" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <Breadcrumbs />

                {/* --- COMPACT CARD HEADER --- */}
                <div className="mt-12 mb-12 bg-off-white/5 border border-off-white/10 p-8 md:p-12 rounded-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <CornerReference label={`SEC.${slug.toUpperCase()}`} position="top-right" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-1 text-5xl opacity-50">{item.icon}</div>

                        <div className="md:col-span-6">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-2 h-2 rounded-full bg-[#8c7b64]" />
                                <span className="font-mono text-xs uppercase tracking-widest text-off-white/40">Sector Analysis</span>
                            </div>
                            <h1 className="font-serif text-4xl sm:text-5xl text-off-white">{item.customTitle || item.title}</h1>
                        </div>

                        <div className="md:col-span-5 border-l border-off-white/10 pl-8">
                            <p className="font-sans text-off-white/70 leading-relaxed text-sm">
                                {item.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- CONTENT (Compact) --- */}
                <div className="prose prose-invert prose-lg max-w-4xl mx-auto text-off-white/80 font-serif leading-relaxed mb-16">
                    <DocumentRenderer document={item.content} />
                </div>

                {/* Related Work Section - COMPACT LAYOUT */}
                {item.relatedWork && item.relatedWork.length > 0 && (
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <h2 className="font-serif text-3xl text-off-white">Our Work in {item.customTitle || item.title}</h2>
                            <div className="h-px bg-off-white/20 flex-1" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {item.relatedWork.map((work: any) => (
                                <a key={work.slug} href={`/work/${work.slug}`} className="shine-effect group block w-full bg-off-white/5 border border-off-white/10 hover:border-off-white/30 transition-colors relative overflow-hidden p-6 flex flex-col gap-4">

                                    {/* Top Row: Client & ID */}
                                    <div className="flex justify-between items-start">
                                        <span className="font-mono text-[10px] text-[#8c7b64] uppercase tracking-widest">{work.entry.client}</span>
                                        <span className="font-mono text-[10px] text-off-white/20">0{item.relatedWork.indexOf(work) + 1}</span>
                                    </div>

                                    {/* Main Content */}
                                    <div>
                                        <h3 className="font-serif text-lg text-off-white group-hover:text-[#e5e5e5] mb-3 leading-tight">
                                            {work.entry.title}
                                        </h3>
                                        <div className="flex gap-2 opacity-40 text-[9px] font-mono uppercase">
                                            {work.entry.techStack.slice(0, 2).join(" / ")}
                                        </div>
                                    </div>

                                    {/* Hover overlay pattern - Dynamic Sector ID */}
                                    <div className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none"
                                        style={getSectorPattern(slug)}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- NEW: TECH TICKER --- */}
                <div className="py-12 border-y border-off-white/5 my-12 overflow-hidden relative group">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink to-transparent z-10" />
                    {/* Slower duration (60s), Pause on Hover */}
                    <div className="flex gap-16 animate-scroll whitespace-nowrap opacity-40 hover:opacity-100 transition-opacity duration-500 hover:[animation-play-state:paused]" style={{ animationDuration: '60s' }}>
                        {/* Duplicated for infinite scroll */}
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex gap-16">
                                {["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "GraphQL"].map(tech => (
                                    <span key={tech} className="font-mono text-xl text-off-white uppercase tracking-widest">{tech}</span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- NEW: IMPACT GRID (Editorial Style - No Button Feel) --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 border-t border-off-white/10 pt-12">
                    <div className="relative">
                        <CornerReference label="01" position="top-right" />
                        <h3 className="font-serif text-2xl text-off-white mb-4">Enterprise Velocity</h3>
                        <p className="font-sans text-off-white/60 leading-relaxed text-sm">
                            Rapid deployment pipelines and modular architecture to accelerate time-to-market without compromising stability.
                        </p>
                    </div>
                    <div className="relative">
                        <CornerReference label="02" position="top-right" />
                        <h3 className="font-serif text-2xl text-off-white mb-4">Bank-Grade Security</h3>
                        <p className="font-sans text-off-white/60 leading-relaxed text-sm">
                            Zero-trust architecture and compliance-first engineering ensuring your data architecture is fortress-secure.
                        </p>
                    </div>
                    <div className="relative">
                        <CornerReference label="03" position="top-right" />
                        <h3 className="font-serif text-2xl text-off-white mb-4">Infinite Scalability</h3>
                        <p className="font-sans text-off-white/60 leading-relaxed text-sm">
                            Cloud-native systems designed to handle millions of transactions with sub-millisecond latency.
                        </p>
                    </div>
                </div>

                {/* --- NEW: TESTIMONIALS (Editorial Style) --- */}
                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="font-serif text-3xl text-off-white">Trusted by Industry Leaders</h2>
                        <div className="h-px bg-off-white/20 flex-1" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Testimonial 1 */}
                        <div className="relative pl-6 border-l border-[#8c7b64]/30">
                            <div className="text-[#8c7b64] text-xs mb-4 tracking-widest font-mono">★★★★★</div>
                            <blockquote className="font-serif text-xl text-off-white leading-relaxed mb-6 italic opacity-80">
                                "BytechLabs didn't just rebuild our infrastructure; they completely reimagined our digital capability. We are shipping features 3x faster."
                            </blockquote>
                            <div className="flex items-baseline justify-between pt-2">
                                <div>
                                    <div className="font-mono text-xs uppercase tracking-widest text-[#8c7b64]">Chief Technology Officer</div>
                                    <div className="font-sans text-sm text-off-white/40 mt-1">Fortune 500 Financial Services</div>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="relative pl-6 border-l border-[#8c7b64]/30">
                            <div className="text-[#8c7b64] text-xs mb-4 tracking-widest font-mono">★★★★★</div>
                            <blockquote className="font-serif text-xl text-off-white leading-relaxed mb-6 italic opacity-80">
                                "The level of engineering rigor they bring is unmatched. Secure, scalable, and absolutely stunning execution."
                            </blockquote>
                            <div className="flex items-baseline justify-between pt-2">
                                <div>
                                    <div className="font-mono text-xs uppercase tracking-widest text-[#8c7b64]">VP of Product</div>
                                    <div className="font-sans text-sm text-off-white/40 mt-1">Enterprise HealthTech Unicorn</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- NEW: INDUSTRY SPECIFIC CTA --- */}
                <div className="mb-24">
                    <a href="/contact" className="shine-effect block w-full bg-[#8c7b64] text-ink py-12 px-8 text-center hover:bg-[#a39075] transition-colors relative overflow-hidden group">
                        <div className="relative z-10 space-y-4">
                            <span className="font-mono text-xs uppercase tracking-[0.3em] opacity-70">Strategic Partnership</span>
                            <h2 className="font-serif text-4xl md:text-5xl">Transform Your {item.customTitle || item.title} Business</h2>
                            <span className="inline-block border-b border-ink/30 pb-1 font-mono text-sm mt-4 group-hover:border-ink/80 transition-colors">START CONVERSATION →</span>
                        </div>
                    </a>
                </div>
            </div>
        </main>
    );
}

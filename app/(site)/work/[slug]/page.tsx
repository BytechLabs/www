import { createReader } from '@keystatic/core/reader';
import { Callout } from '@/components/content/Callout';
import { InteractiveGraph } from '@/components/content/InteractiveGraph';
import keystaticConfig from '@/keystatic.config';
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { notFound } from 'next/navigation';
import { FolioNumber, CornerReference, MeasurementLine, MarginAnnotation } from "@/components/ui/CodexOrnaments";
import { DocumentRenderer } from '@keystatic/core/renderer';

export const dynamicParams = false;

export async function generateStaticParams() {
    try {
        const reader = createReader(process.cwd(), keystaticConfig);
        const workItems = await reader.collections.work.list();
        return workItems.map(slug => ({ slug }));
    } catch (error) {
        // Fallback to empty array to allow build to proceed (Next.js will 404 if not found)
        console.error("Error generating static params for work:", error);
        return [];
    }
}

async function getWorkItem(slug: string) {
    const reader = createReader(process.cwd(), keystaticConfig);
    const item = await reader.collections.work.read(slug);
    if (!item) return null;

    // Keystatic content is a promise of data
    const content = await item.content();
    return { ...item, content };
}

async function getOtherWork(currentSlug: string) {
    const reader = createReader(process.cwd(), keystaticConfig);
    const allSlugs = await reader.collections.work.list();

    // Filter out current item and shuffle slugs first (avoid reading all files)
    const otherSlugs = allSlugs
        .filter(slug => slug !== currentSlug)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);

    // Parallel fetch only the needed items
    const otherWork = await Promise.all(otherSlugs.map(async (slug) => {
        const entry = await reader.collections.work.read(slug);
        return { slug, entry: entry! };
    }));

    return otherWork;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const item = await getWorkItem(slug);
    if (!item) return {};

    return {
        title: `${item.title} | Work | BytechLabs`,
        description: item.description,
    };
}

export default async function WorkDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const item = await getWorkItem(slug);
    const otherWork = await getOtherWork(slug);

    if (!item) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-ink pt-32 pb-24 px-6 sm:px-12 relative overflow-hidden">
            {/* --- CODEX ORNAMENTS --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <FolioNumber number="02" />
                <CornerReference label={`REF.${slug.toUpperCase()}`} position="top-right" />
                <MarginAnnotation text="CONFIDENTIAL // CASE STUDY" position="left" className="top-1/4 opacity-30" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex justify-between items-start">
                    <Breadcrumbs />
                    <a href="/contact" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-[#8c7b64]/30 rounded-full text-[#8c7b64] font-mono text-xs hover:bg-[#8c7b64] hover:text-[#111] transition-colors">
                        <span>NEED SOMETHING LIKE THIS?</span>
                    </a>
                </div>

                <div className="mt-8 mb-24 space-y-8 border-b border-off-white/10 pb-12">
                    <div className="flex flex-col gap-4">
                        <span className="font-mono text-xs text-[#8c7b64] uppercase tracking-widest">// Client: {item.client}</span>
                        <h1 className="font-serif text-6xl sm:text-8xl text-off-white leading-[0.9]">{item.title}</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    {/* Sidebar Metadata */}
                    <div className="lg:col-span-4 space-y-12">
                        <div className="space-y-4">
                            <h3 className="font-mono text-xs text-off-white/40 uppercase tracking-widest">Description</h3>
                            <p className="font-serif text-2xl text-off-white/90 leading-tight">
                                {item.description}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-mono text-xs text-off-white/40 uppercase tracking-widest">Technology</h3>
                            <div className="flex flex-wrap gap-2">
                                {item.techStack.map(tech => (
                                    <span key={tech} className="px-3 py-1 border border-off-white/10 rounded-full font-mono text-xs text-off-white/60 hover:bg-off-white/5 transition-colors">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-mono text-xs text-off-white/40 uppercase tracking-widest">Date</h3>
                            <p className="font-mono text-sm text-off-white/60">
                                {item.publishedDate ? new Date(item.publishedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}
                            </p>
                        </div>
                    </div>



                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="prose prose-invert max-w-none text-off-white/90 font-sans leading-relaxed tracking-wide">
                            <DocumentRenderer
                                document={item.content}
                                componentBlocks={{
                                    Callout: (props) => (
                                        <Callout type={props.type as any}>
                                            {props.content}
                                        </Callout>
                                    ),
                                    InteractiveGraph: (props) => (
                                        <InteractiveGraph title={props.title} />
                                    ),
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-32 border-t border-[#1a1a1a] pt-16">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="font-serif text-3xl text-[#e5e5e5]">Other Selected Work</h2>
                    <a href="/work" className="font-mono text-xs text-[#8c7b64] hover:text-[#e5e5e5] transition-colors">VIEW ALL</a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Dynamic Related Work Items */}
                    {otherWork.map(work => (
                        <a key={work.slug} href={`/work/${work.slug}`} className="shine-effect group block p-8 border border-[#1a1a1a] hover:border-[#333] transition-colors relative overflow-hidden">
                            <span className="font-mono text-xs text-[#666] mb-2 block uppercase tracking-widest">{work.entry.client}</span>
                            <h3 className="font-serif text-2xl text-[#ccc] group-hover:text-[#e5e5e5] mb-4 transition-colors">{work.entry.title}</h3>
                            <span className="font-mono text-xs text-[#8c7b64] opacity-0 group-hover:opacity-100 transition-opacity">VIEW CASE STUDY →</span>
                        </a>
                    ))}

                    {/* Final "Inquire" Card - Improved */}
                    <a href="/contact" className="shine-effect block p-8 border border-[#1a1a1a] hover:border-[#8c7b64]/30 group bg-[#8c7b64]/5 flex flex-col justify-between min-h-[200px] relative overflow-hidden">
                        <div>
                            <span className="font-mono text-xs text-[#8c7b64] mb-2 block uppercase tracking-widest">PARTNERSHIP</span>
                            <h3 className="font-serif text-3xl text-[#e5e5e5] leading-none mb-2">Build Your Vision</h3>
                            <p className="font-sans text-sm text-[#888] leading-relaxed max-w-xs">
                                Let's architect your next breakthrough.
                            </p>
                        </div>
                        <span className="font-mono text-xs text-[#8c7b64] mt-6 group-hover:translate-x-1 transition-transform inline-block">START A PROJECT →</span>
                    </a>
                </div>
            </div>
        </main>
    );
}

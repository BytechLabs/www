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
                <Breadcrumbs />

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
                        <div className="prose prose-invert prose-xl max-w-none text-off-white/80 font-serif leading-relaxed">
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
        </main>
    );
}

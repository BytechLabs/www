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

import { WorkGallery } from '@/app/work/WorkGallery';

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

                <div className="mt-8 mb-16 space-y-6 border-b border-off-white/10 pb-12">
                    <div className="text-6xl mb-4">{item.icon}</div>
                    <h1 className="font-serif text-5xl sm:text-7xl text-off-white">{item.customTitle || item.title}</h1>
                    <p className="font-sans text-xl text-off-white/80 leading-relaxed max-w-2xl">
                        {item.description}
                    </p>
                </div>

                <div className="prose prose-invert prose-lg max-w-none text-off-white/70 font-sans mb-24">
                    <DocumentRenderer document={item.content} />
                </div>

                {/* Related Work Section */}
                {item.relatedWork && item.relatedWork.length > 0 && (
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <h2 className="font-serif text-3xl text-off-white">Selected Work in {item.customTitle || item.title}</h2>
                            <div className="h-px bg-off-white/20 flex-1" />
                        </div>
                        <WorkGalleryWrapper items={item.relatedWork} />
                    </div>
                )}
            </div>
        </main>
    );
}

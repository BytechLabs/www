import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';
import { FolioNumber, CornerReference, MeasurementLine, MarginAnnotation } from "@/components/ui/CodexOrnaments";
import { WorkGallery } from "./WorkGallery";

// Helper to get logic from Keystatic
async function getWork() {
    const reader = createReader(process.cwd(), keystaticConfig);
    const work = await reader.collections.work.all();
    return work.map(item => ({
        ...item,
        entry: {
            ...item.entry,
            content: undefined // Remove non-serializable content function
        }
    }));
}

export const metadata = {
    title: "Our Work | BytechLabs",
    description: "Case studies in enterprise architecture, high-performance systems, and digital transformation.",
};

export default async function WorkPage() {
    const workItems = await getWork();

    return (
        <main className="min-h-screen bg-ink pt-32 pb-16 px-6 sm:px-12 relative overflow-hidden">
            {/* --- CODEX ORNAMENTS --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <FolioNumber number="02" />
                <CornerReference label="FIG. 02" position="top-left" />
                <CornerReference label="REF. A-1" position="bottom-right" />
                <MeasurementLine orientation="vertical" length="h-96" className="absolute left-6 top-32 opacity-20 hidden md:flex" />
                <MarginAnnotation text="Selected Case Studies" position="right" className="top-1/3 opacity-30" />
            </div>

            <div className="max-w-7xl mx-auto space-y-16 relative z-10">

                {/* Header */}
                <div className="space-y-6">
                    <div className="flex justify-between items-start">
                        <Breadcrumbs />
                        <a href="/contact" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-[#8c7b64]/30 rounded-full text-[#8c7b64] font-mono text-xs hover:bg-[#8c7b64] hover:text-[#111] transition-colors">
                            <span>START A PROJECT</span>
                        </a>
                    </div>
                    <div className="flex items-end gap-6 border-b border-off-white/10 pb-8">
                        <h1 className="font-serif text-6xl sm:text-8xl text-off-white">Selected Work</h1>
                        <span className="font-mono text-xs text-off-white/30 mb-4 hidden sm:block">
                            [ARCHIVE_VOL_2]
                        </span>
                    </div>
                    <p className="font-sans text-off-white/80 max-w-2xl text-lg pl-2 border-l border-off-white/20 leading-relaxed">
                        Case studies in enterprise architecture, high-performance systems, and digital transformation.
                    </p>
                </div>

                {/* Interactive Gallery */}
                <WorkGallery items={workItems} />
            </div>

            <div className="h-24" />
        </main>
    );
}

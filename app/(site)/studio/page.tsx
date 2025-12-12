import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';
import { FolioNumber, CornerReference, MeasurementLine, MarginAnnotation } from "@/components/ui/CodexOrnaments";

async function getStudio() {
    const reader = createReader(process.cwd(), keystaticConfig);
    const studio = await reader.collections.studio.all();
    return studio;
}

export const metadata = {
    title: "The Studio | BytechLabs",
    description: "A collective of engineers, designers, and strategists obsessed with quality.",
};

export default async function StudioPage() {
    const team = await getStudio();

    return (
        <main className="min-h-screen bg-ink pt-32 pb-16 px-6 sm:px-12 relative overflow-hidden">
            {/* --- CODEX ORNAMENTS --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <FolioNumber number="04" />
                <CornerReference label="FIG. 04" position="top-left" />
                <CornerReference label="STUDIO" position="bottom-right" />
                <MeasurementLine orientation="vertical" length="h-screen" className="absolute right-12 top-0 opacity-10 hidden md:flex" />
            </div>

            <div className="max-w-7xl mx-auto space-y-24 relative z-10">

                {/* Header */}
                <div className="space-y-6">
                    <Breadcrumbs />
                    <h1 className="font-serif text-6xl sm:text-8xl text-off-white">The Studio</h1>
                </div>

                {/* Manifesto / About Text */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-b border-off-white/10 py-12 relative">
                    <CornerReference label="MANIFESTO" position="top-left" className="-top-3 left-0 bg-ink px-2" />

                    <div className="md:col-span-8 space-y-8 text-lg sm:text-2xl text-off-white/90 leading-relaxed font-serif">
                        <p>
                            <span className="text-4xl float-left mr-2 font-mono text-off-white/40">01</span>
                            BytechLabs was founded on a simple premise: software should be built with the same level of care and precision as physical engineering.
                        </p>
                        <p>
                            <span className="text-4xl float-left mr-2 font-mono text-off-white/40">02</span>
                            We don't just write code; we architect systems that are resilient, scalable, and beautiful. We believe that the internal quality of code is directly reflected in the external quality of the user experience.
                        </p>
                    </div>
                </div>

                {/* Team Grid */}
                <div>
                    <div className="flex items-center justify-between mb-8 border-b border-off-white/10 pb-4">
                        <h2 className="font-mono text-xs uppercase tracking-widest text-off-white/40">
                            Leadership & Partners
                        </h2>
                        <span className="font-mono text-xs text-off-white/20">Authorized Personnel Only</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {team.map(member => (
                            <div key={member.slug} className="space-y-4 group">
                                <div className="aspect-[3/4] bg-off-white/5 rounded-sm overflow-hidden relative border border-off-white/10">
                                    {member.entry.avatar && (
                                        <img src={member.entry.avatar} alt={member.entry.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                    )}
                                    {/* Technical overlay on image */}
                                    <div className="absolute bottom-4 left-4 font-mono text-[10px] text-off-white/60 bg-black/50 backdrop-blur px-2 py-0.5">
                                        {member.entry.role.toUpperCase()}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-serif text-2xl text-off-white">{member.entry.title}</h3>
                                    <p className="mt-2 text-off-white/60 text-sm font-sans leading-relaxed">{member.entry.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className="h-24" />
        </main>
    );
}

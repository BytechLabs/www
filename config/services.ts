export interface ServiceItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    folio: string; // Base folio number/string
}

export const servicesData: ServiceItem[] = [
    {
        id: "architecture",
        title: "Enterprise Architecture",
        subtitle: "The Blueprint",
        folio: "01",
        description: "We design robust, scalable foundations for complex applications. Like the great domes of the Renaissance, our systems are built to withstand the weight of massive scale and the test of time."
    },
    {
        id: "development",
        title: "Application Development",
        subtitle: "The Construction",
        folio: "02",
        description: "Full-cycle software engineering for mission-critical platforms. We write code that is clean, performant, and maintainable, ensuring your business runs on a flawless digital engine."
    },
    {
        id: "modernization",
        title: "Legacy Modernization",
        subtitle: "The Restoration",
        folio: "03",
        description: "Transforming aging monoliths into agile, modern microservices. We breathe new life into existing systems, preserving their value while unlocking future potential."
    },
    {
        id: "cloud",
        title: "Cloud Infrastructure",
        subtitle: "The Heavens",
        folio: "04",
        description: "Architecting serverless and cloud-native environments. We ensure your applications reside in a secure, elastic infrastructure that adapts instantly to global demand."
    },
    {
        id: "data",
        title: "Data Intelligence",
        subtitle: "The Codex",
        folio: "05",
        description: "Turning raw information into actionable wisdom. We build sophisticated data pipelines and analytics engines that reveal the hidden patterns within your enterprise."
    },
    {
        id: "security",
        title: "Cybersecurity & Defense",
        subtitle: "The Fortress",
        folio: "06",
        description: "Fortifying your digital assets against modern threats. We implement zero-trust architectures and military-grade encryption to ensure your data remains inviolable."
    }
];

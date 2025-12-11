export interface ProjectItem {
    id: string;
    title: string;
    client: string;
    description: string;
    imageSrc: string; // Placeholder for now, will use generic or generated
    techStack: string[];
    folio: string;
    year: string;
    href: string;
}

export const workData: ProjectItem[] = [
    {
        id: "fintech_core",
        title: "Global Banking Core",
        client: "Sovereign Financial",
        description: "A complete modernization of a legacy banking mainframe into a distributed cloud-native ledger. Processing millions of transactions daily with 99.999% uptime.",
        imageSrc: "/assets/work/fintech.png",
        techStack: ["Java", "Spring Boot", "Kafka", "AWS"],
        folio: "FIG. I",
        year: "2024",
        href: "#"
    },
    {
        id: "logistics_ai",
        title: "Autonomous Logistics",
        client: "Vanguard Shipping",
        description: "An AI-driven supply chain optimization platform. We engineered the neural networks that route thousands of vessels across global trade routes in real-time.",
        imageSrc: "/assets/work/medical.png", // Using existing asset map for now
        techStack: ["Python", "TensorFlow", "Kubernetes", "Redis"],
        folio: "FIG. II",
        year: "2023",
        href: "#"
    },
    {
        id: "healthcare_mesh",
        title: "National Health Grid",
        client: "Apex Medical",
        description: "A secure, HIPAA-compliant patient data mesh connecting 500+ hospitals. Designed for absolute privacy and interoperability across disparate systems.",
        imageSrc: "/assets/work/medical.png",
        techStack: ["Go", "gRPC", "PostgreSQL", "React"],
        folio: "FIG. III",
        year: "2024",
        href: "#"
    },
    {
        id: "energy_grid",
        title: "Smart Energy Hive",
        client: "Core Utilities",
        description: "IoT management platform for renewable energy distribution. Balancing load across a decentralized grid of millions of solar and wind assets.",
        imageSrc: "/assets/work/crypto.png",
        techStack: ["Rust", "MQTT", "TimescaleDB", "Elixir"],
        folio: "FIG. IV",
        year: "2023",
        href: "#"
    }
];

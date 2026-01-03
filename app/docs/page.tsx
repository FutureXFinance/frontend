import { Metadata } from "next";
import Link from "next/link";
import { Book, Code, Rocket, Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "Documentation | FutureX Finance",
    description: "Complete documentation for integrating FutureX Finance into your applications.",
};

export default function DocsPage() {
    const sections = [
        {
            icon: Rocket,
            title: "Getting Started",
            description: "Quick start guide to integrate FutureX Finance",
            links: ["Installation", "Authentication", "First API Call", "Best Practices"]
        },
        {
            icon: Code,
            title: "API Reference",
            description: "Complete API documentation",
            links: ["Fraud Detection API", "KYC API", "Document Parser API", "Webhooks"]
        },
        {
            icon: Shield,
            title: "Security",
            description: "Security best practices and compliance",
            links: ["Authentication", "Encryption", "Data Privacy", "Compliance"]
        },
        {
            icon: Book,
            title: "Guides",
            description: "Step-by-step integration guides",
            links: ["Node.js Integration", "Python Integration", "React Integration", "Error Handling"]
        },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-sm font-semibold mb-6">
                        Documentation
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Developer
                        <br />
                        <span className="bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent">
                            Documentation
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Everything you need to integrate FutureX Finance into your applications.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {sections.map((section, index) => (
                        <div key={index} className="bg-slate-900/50 border border-white/10 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                                <section.icon className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{section.title}</h3>
                            <p className="text-slate-400 mb-6">{section.description}</p>
                            <ul className="space-y-2">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <Link href="#" className="text-emerald-500 hover:text-emerald-400 transition-colors text-sm">
                                            {link} →
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

import { Metadata } from "next";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";

export const metadata: Metadata = {
    title: "Security | FutureX Finance",
    description: "Our commitment to security and compliance.",
};

export default function SecurityPage() {
    const features = [
        {
            icon: Lock,
            title: "End-to-End Encryption",
            description: "All data is encrypted in transit and at rest using industry-standard AES-256 encryption."
        },
        {
            icon: Shield,
            title: "SOC 2 Type II Certified",
            description: "We maintain SOC 2 Type II certification, demonstrating our commitment to security controls."
        },
        {
            icon: Eye,
            title: "Regular Security Audits",
            description: "Third-party security audits and penetration testing conducted quarterly."
        },
        {
            icon: FileCheck,
            title: "Compliance",
            description: "GDPR, PCI DSS, and ISO 27001 compliant infrastructure and processes."
        },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-sm font-semibold mb-6">
                        Security
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Enterprise-Grade
                        <br />
                        <span className="bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent">
                            Security
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Security is at the core of everything we do. We employ industry-leading practices to protect your data.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-slate-900/50 border border-white/10 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                                <feature.icon className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-3xl p-12">
                    <h2 className="text-3xl font-bold mb-6">Bug Bounty Program</h2>
                    <p className="text-slate-300 leading-relaxed mb-6">
                        We believe in working with the security community to keep our platform secure. If you discover a security vulnerability, please report it to our security team.
                    </p>
                    <a
                        href="mailto:security@futurexfinance.com"
                        className="inline-block bg-emerald-500 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-400 transition-all"
                    >
                        Report a Vulnerability
                    </a>
                </div>
            </div>
        </div>
    );
}

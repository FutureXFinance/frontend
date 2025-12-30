"use client";

import Link from "next/link";

export default function Footer() {
    const sections = [
        {
            title: "Infrastructure",
            links: [
                { label: "AI Core Nodes", href: "#" },
                { label: "Neural Security", href: "#" },
                { label: "Compliance Layer", href: "#" },
                { label: "Market Protocols", href: "#" },
            ],
        },
        {
            title: "Solutions",
            links: [
                { label: "Fraud Detection", href: "/solutions/fraud" },
                { label: "Identity Sync", href: "/solutions/kyc" },
                { label: "Document Intelligence", href: "/solutions/parser" },
                { label: "Institutional Insights", href: "/solutions/insights" },
            ],
        },
        {
            title: "Resources",
            links: [
                { label: "Technical Docs", href: "#" },
                { label: "Whitepaper V2", href: "#" },
                { label: "Service Integrity", href: "#" },
                { label: "Global Standards", href: "#" },
            ],
        },
        {
            title: "Company",
            links: [
                { label: "About FutureX", href: "#" },
                { label: "Institutional Group", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Legal Framework", href: "#" },
            ],
        },
    ];

    return (
        <footer className="bg-[#020617] border-t border-white/5 pt-32 pb-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-24">
                    <div className="col-span-2 space-y-10">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10">
                                <img
                                    src="/logo.png"
                                    alt="FutureXFinance Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">FutureX<span className="text-emerald-500">Finance</span></span>
                        </Link>
                        <p className="text-slate-500 text-sm max-w-sm leading-relaxed font-medium">
                            Sovereign AI infrastructure engineered for high-throughput institutional banking and global regulatory compliance. Built on trust and neural operational excellence.
                        </p>
                        <div className="flex gap-4">
                            {["X", "IN", "GH"].map((social) => (
                                <Link key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-black text-slate-500 hover:text-emerald-500 hover:border-emerald-500/20 transition-all">
                                    {social}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {sections.map((section, i) => (
                        <div key={i} className="space-y-8">
                            <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map((link, j) => (
                                    <li key={j}>
                                        <Link href={link.href} className="text-slate-400 hover:text-white text-sm font-medium transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <p className="text-[10px] font-bold text-slate-800 uppercase tracking-widest leading-none">
                        &copy; 2025 FutureXFinance. All rights reserved.
                    </p>
                    <div className="flex gap-10 text-[10px] font-bold text-slate-800 uppercase tracking-widest">
                        <Link href="#" className="hover:text-emerald-500 transition-colors">Privacy Protocol</Link>
                        <Link href="#" className="hover:text-emerald-500 transition-colors">Service Terms</Link>
                        <Link href="#" className="hover:text-emerald-500 transition-colors">Cookie ID</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

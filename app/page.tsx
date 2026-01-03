"use client";

import Link from "next/link";

export default function Home() {
    const solutions = [
        {
            title: "Fraud Detection",
            description: "Advanced neural networks trained on trillion-scale datasets to identify anomalies with sub-millisecond precision.",
            link: "/solutions/fraud",
            tech: "Transformers • Real-time",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
        },
        {
            title: "KYC Verification",
            description: "Automated identity orchestration using biometric consensus and document verification across 190 jurisdictions.",
            link: "/solutions/kyc",
            tech: "Biometrics • Global",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
        },
        {
            title: "Document Parser",
            description: "Extract structured intelligence from opaque financial documents with high-fidelity OCR and semantic understanding.",
            link: "/solutions/parser",
            tech: "NLP • Structured Data",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
        },
        {
            title: "Customer Insights",
            description: "Predictive behavioral analytics to personalize financial engagement and optimize institutional portfolio health.",
            link: "/solutions/insights",
            tech: "Predictive • Analytics",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
        },
        {
            title: "Compliance Monitor",
            description: "Autonomous regulatory tracking that maps global policy shifts to internal control frameworks in real-time.",
            link: "/solutions/compliance",
            tech: "Regulatory • Auto-map",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
        },
        {
            title: "AI Chatbot",
            description: "Institutional-grade conversational AI capable of resolving complex financial queries and operational workflows.",
            link: "/solutions/chatbot",
            tech: "LLM • Concierge",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 15-3-3 3-3" /><path d="M15 6.8a6 6 0 1 0 0 10.4" /><path d="M22 12h-4" /></svg>
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#020617] selection:bg-emerald-500/30">
            <main className="flex-grow">
                {/* Hero Section - The "Stripes" Minimalist Look */}
                <section className="relative pt-44 pb-32 px-6 overflow-hidden">
                    {/* Subtle Backdrop Render */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
                        <img
                            src="/images/hero_render.png"
                            className="w-full h-full object-cover blur-[80px] scale-150"
                            alt=""
                        />
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col items-center text-center">
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-500 mb-12 backdrop-blur-md">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]"></span>
                                Institutional Infrastructure V2.4
                            </div>

                            <h1 className="text-hero mb-8 max-w-5xl">
                                The intelligence layer for <br />
                                <span className="text-slate-500">modern finance.</span>
                            </h1>

                            <p className="text-body-premium max-w-2xl mx-auto mb-16 px-4">
                                FutureX provides a sovereign ecosystem of modular AI agents engineered
                                to scale institutional banking, security, and global compliance operations.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
                                <Link href="/dashboard">
                                    <button className="btn-primary-new px-12">
                                        Launch Interface
                                    </button>
                                </Link>
                                <button className="btn-secondary-new px-12">
                                    Request Access
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trust Logos - Minimalist & Subtle */}
                <section className="py-20 border-y border-white/5 bg-white/[0.01]">
                    <div className="max-w-7xl mx-auto px-6">
                        <p className="text-center text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em] mb-12">Powering global institutional nodes</p>
                        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-30 grayscale contrast-125">
                            {["PRIME", "VERTEX", "NEXUS", "GLOBAL", "ORBIT"].map(logo => (
                                <span key={logo} className="text-2xl font-black italic tracking-tighter text-white">{logo}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Solutions Grid - Content First */}
                <section id="solutions" className="py-40 px-6 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                            <div className="max-w-2xl">
                                <p className="text-label-caps mb-4">Infrastructure Suite</p>
                                <h2 className="text-section-title">
                                    High-performance AI modules for <br />
                                    <span className="text-slate-500">mission-critical operations.</span>
                                </h2>
                            </div>
                            <div className="hidden md:block w-32 h-[1px] bg-white/10 mb-6"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {solutions.map((item, i) => (
                                <Link key={i} href={item.link} className="group card-premium p-10 flex flex-col h-full">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center text-emerald-500 mb-8 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-500">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-white group-hover:text-emerald-500 transition-colors">{item.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-grow">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-8 border-t border-white/5">
                                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{item.tech}</span>
                                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section - Clean & Geometric */}
                <section className="py-40 border-t border-white/5 bg-slate-900/10">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-20">
                        {[
                            { label: "Stability", value: "99.99%" },
                            { label: "Latency", value: "42ms" },
                            { label: "Global Reach", value: "140+" },
                            { label: "Volume Capacity", value: "$6B+" }
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <span className="text-label-caps">{stat.label}</span>
                                <span className="text-5xl font-bold text-white tracking-tighter">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Overlay Section */}
                <section className="py-40 px-6">
                    <div className="max-w-6xl mx-auto relative rounded-[48px] overflow-hidden bg-emerald-600 p-20 text-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-700"></div>
                        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                        <div className="relative z-10">
                            <h2 className="text-hero text-slate-950 mb-10 leading-tight">
                                Transform your institutional <br /> operational core.
                            </h2>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button className="bg-slate-950 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-900 transition-all">
                                    Contact Enterprise Team
                                </button>
                                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-slate-950 px-10 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
                                    Technical Docs
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

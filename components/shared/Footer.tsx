"use client";

import Link from "next/link";
import { Linkedin, Twitter, Github } from "lucide-react";

export default function Footer() {
    const sections = [
        {
            title: "Products",
            links: [
                { label: "Fraud Detection", href: "/solutions/fraud" },
                { label: "KYC Verification", href: "/solutions/kyc" },
                { label: "Document Parser", href: "/solutions/parser" },
                { label: "Customer Insights", href: "/solutions/insights" },
                { label: "Compliance Monitoring", href: "/solutions/compliance" },
            ],
        },
        {
            title: "Resources",
            links: [
                { label: "Documentation", href: "/docs" },
                { label: "API Reference", href: "/api-reference" },
                { label: "Blog", href: "/blog" },
                { label: "Case Studies", href: "/case-studies" },
            ],
        },
        {
            title: "Company",
            links: [
                { label: "About Us", href: "/about" },
                { label: "Careers", href: "/careers" },
                { label: "Contact", href: "/contact" },
                { label: "Pricing", href: "/pricing" },
            ],
        },
        {
            title: "Legal",
            links: [
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Security", href: "/security" },
            ],
        },
    ];

    return (
        <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10">
                                <img
                                    src="/logo.png"
                                    alt="FutureXFinance Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">
                                FutureX<span className="text-emerald-500">Finance</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                            Next-generation AI infrastructure for institutional banking. Secure, compliant, and engineered for high-performance financial operations.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="https://linkedin.com"
                                target="_blank"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all"
                            >
                                <Linkedin className="w-4 h-4" />
                            </Link>
                            <Link
                                href="https://twitter.com"
                                target="_blank"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all"
                            >
                                <Twitter className="w-4 h-4" />
                            </Link>
                            <Link
                                href="https://github.com"
                                target="_blank"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all"
                            >
                                <Github className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Link Sections */}
                    {sections.map((section, i) => (
                        <div key={i} className="space-y-4">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link, j) => (
                                    <li key={j}>
                                        <Link
                                            href={link.href}
                                            className="text-slate-400 hover:text-white text-sm transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} FutureXFinance. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-xs text-slate-500">
                        <Link href="/privacy" className="hover:text-emerald-500 transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-emerald-500 transition-colors">
                            Terms
                        </Link>
                        <Link href="/security" className="hover:text-emerald-500 transition-colors">
                            Security
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const products = [
        { name: "Fraud Detection", href: "/solutions/fraud", description: "Real-time anomaly detection" },
        { name: "KYC Verification", href: "/solutions/kyc", description: "Identity verification" },
        { name: "Document Parser", href: "/solutions/parser", description: "Intelligent document processing" },
        { name: "Customer Insights", href: "/solutions/insights", description: "Behavioral analytics" },
        { name: "Compliance Monitoring", href: "/solutions/compliance", description: "Regulatory compliance" },
    ];

    const resources = [
        { name: "Documentation", href: "/docs", description: "Integration guides" },
        { name: "API Reference", href: "/api-reference", description: "Complete API docs" },
        { name: "Blog", href: "/blog", description: "Latest insights" },
        { name: "Case Studies", href: "/case-studies", description: "Success stories" },
    ];

    const company = [
        { name: "About Us", href: "/about", description: "Our mission" },
        { name: "Careers", href: "/careers", description: "Join our team" },
        { name: "Contact", href: "/contact", description: "Get in touch" },
    ];

    return (
        <nav
            className={clsx(
                "fixed top-0 w-full z-50 transition-all duration-500",
                isScrolled
                    ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4"
                    : "bg-transparent py-8"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 transition-all duration-500 group-hover:scale-110">
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

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    {/* Products Dropdown */}
                    <div
                        className="relative group"
                        onMouseEnter={() => setActiveDropdown("products")}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            Products
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        {activeDropdown === "products" && (
                            <div className="absolute top-full left-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
                                {products.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="block p-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                                    >
                                        <div className="font-medium text-white group-hover/item:text-emerald-500 transition-colors">
                                            {item.name}
                                        </div>
                                        <div className="text-xs text-slate-500 mt-1">
                                            {item.description}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Resources Dropdown */}
                    <div
                        className="relative group"
                        onMouseEnter={() => setActiveDropdown("resources")}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            Resources
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        {activeDropdown === "resources" && (
                            <div className="absolute top-full left-0 mt-2 w-72 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
                                {resources.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="block p-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                                    >
                                        <div className="font-medium text-white group-hover/item:text-emerald-500 transition-colors">
                                            {item.name}
                                        </div>
                                        <div className="text-xs text-slate-500 mt-1">
                                            {item.description}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Company Dropdown */}
                    <div
                        className="relative group"
                        onMouseEnter={() => setActiveDropdown("company")}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            Company
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        {activeDropdown === "company" && (
                            <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
                                {company.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="block p-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                                    >
                                        <div className="font-medium text-white group-hover/item:text-emerald-500 transition-colors">
                                            {item.name}
                                        </div>
                                        <div className="text-xs text-slate-500 mt-1">
                                            {item.description}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link
                        href="/pricing"
                        className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        Pricing
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/signin"
                        className="hidden sm:block text-sm font-semibold text-white hover:text-emerald-500 transition-colors"
                    >
                        Sign In
                    </Link>
                    <Link href="/dashboard">
                        <button className="bg-emerald-500 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
                            Get Started
                        </button>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 text-white"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/5 p-6">
                    <div className="space-y-6">
                        <div>
                            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Products</div>
                            {products.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block py-2 text-slate-400 hover:text-white transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div>
                            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Resources</div>
                            {resources.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block py-2 text-slate-400 hover:text-white transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div>
                            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Company</div>
                            {company.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block py-2 text-slate-400 hover:text-white transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <Link
                            href="/pricing"
                            className="block py-2 text-slate-400 hover:text-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Pricing
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

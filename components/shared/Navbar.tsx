"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                    <div className="relative w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-950">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">
                        FutureX<span className="text-emerald-500">.</span>
                    </span>
                </Link>

                {/* Main Navigation */}
                <div className="hidden md:flex items-center gap-10">
                    {["Solutions", "Platform", "Pricing", "Company"].map((item) => (
                        <Link
                            key={item}
                            href={item === "Solutions" ? "/dashboard" : "#"}
                            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="hidden sm:block text-sm font-semibold text-white hover:text-emerald-500 transition-colors">
                        Sign In
                    </Link>
                    <Link href="/dashboard">
                        <button className="bg-white text-slate-950 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-white/5">
                            Launch App
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

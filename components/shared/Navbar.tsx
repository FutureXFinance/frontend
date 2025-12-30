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

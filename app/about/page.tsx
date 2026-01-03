import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Users, Zap, Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us | FutureX Finance",
    description: "Learn about FutureX Finance's mission to revolutionize institutional banking with AI-powered infrastructure.",
};

export default function AboutPage() {
    const values = [
        {
            icon: Target,
            title: "Mission-Driven",
            description: "Empowering financial institutions with cutting-edge AI technology for secure, compliant operations."
        },
        {
            icon: Shield,
            title: "Security First",
            description: "Built with enterprise-grade security and compliance at the core of everything we do."
        },
        {
            icon: Zap,
            title: "Innovation",
            description: "Continuously pushing boundaries with advanced ML models and real-time processing capabilities."
        },
        {
            icon: Users,
            title: "Customer Success",
            description: "Dedicated to delivering exceptional value and support to our institutional partners."
        },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-sm font-semibold mb-6">
                        About FutureX Finance
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-100 to-emerald-500 bg-clip-text text-transparent">
                        Building the Future of
                        <br />
                        Institutional Banking
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        We're on a mission to transform financial operations with AI-powered infrastructure that's secure, compliant, and built for scale.
                    </p>
                </div>

                {/* Mission Statement */}
                <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-3xl p-12 mb-20">
                    <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                    <p className="text-lg text-slate-300 leading-relaxed mb-6">
                        FutureX Finance is dedicated to revolutionizing institutional banking through advanced AI infrastructure. We provide financial institutions with the tools they need to detect fraud, verify identities, process documents, and maintain compliance—all in real-time.
                    </p>
                    <p className="text-lg text-slate-300 leading-relaxed">
                        Our platform combines cutting-edge machine learning, robust security protocols, and seamless integration capabilities to deliver unparalleled performance and reliability.
                    </p>
                </div>

                {/* Values */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all"
                            >
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                                    <value.icon className="w-6 h-6 text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {[
                        { number: "99.9%", label: "Uptime Guarantee" },
                        { number: "50M+", label: "Transactions Processed" },
                        { number: "100+", label: "Enterprise Clients" },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-5xl font-bold text-emerald-500 mb-2">{stat.number}</div>
                            <div className="text-slate-400">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center bg-slate-900/50 border border-white/10 rounded-3xl p-12">
                    <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Operations?</h2>
                    <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                        Join leading financial institutions that trust FutureX Finance for their AI infrastructure needs.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/contact">
                            <button className="bg-emerald-500 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-400 transition-all flex items-center gap-2">
                                Get in Touch
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                        <Link href="/pricing">
                            <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
                                View Pricing
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

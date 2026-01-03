import { Metadata } from "next";
import Link from "next/link";
import { Shield, Zap, FileText, Users, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Products | FutureX Finance",
    description: "Explore our suite of AI-powered financial infrastructure products.",
};

export default function ProductsPage() {
    const products = [
        {
            icon: Shield,
            name: "Fraud Detection",
            description: "Real-time anomaly detection with advanced ML models",
            features: ["15+ advanced features", "Ensemble ML models", "99.9% accuracy", "Real-time processing"],
            href: "/solutions/fraud",
            color: "emerald"
        },
        {
            icon: Users,
            name: "KYC Verification",
            description: "Automated identity verification and compliance",
            features: ["Document verification", "Biometric matching", "AML screening", "Regulatory compliance"],
            href: "/solutions/kyc",
            color: "blue"
        },
        {
            icon: FileText,
            name: "Document Parser",
            description: "Intelligent document processing and extraction",
            features: ["OCR technology", "Multi-format support", "Data extraction", "Validation rules"],
            href: "/solutions/parser",
            color: "purple"
        },
        {
            icon: TrendingUp,
            name: "Customer Insights",
            description: "Behavioral analytics and risk profiling",
            features: ["Behavioral patterns", "Risk scoring", "Predictive analytics", "Custom dashboards"],
            href: "/solutions/insights",
            color: "orange"
        },
        {
            icon: CheckCircle2,
            name: "Compliance Monitoring",
            description: "Automated regulatory compliance and reporting",
            features: ["Real-time monitoring", "Automated reporting", "Audit trails", "Multi-jurisdiction"],
            href: "/solutions/compliance",
            color: "pink"
        },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Hero */}
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-sm font-semibold mb-6">
                        Our Products
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        AI-Powered Financial
                        <br />
                        <span className="bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent">
                            Infrastructure
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Complete suite of AI-powered tools designed for institutional banking. Secure, compliant, and built for scale.
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {products.map((product, index) => (
                        <Link
                            key={index}
                            href={product.href}
                            className="group bg-slate-900/50 border border-white/10 rounded-3xl p-8 hover:border-emerald-500/30 hover:bg-slate-900/70 transition-all"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                                    <product.icon className="w-7 h-7 text-emerald-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-500 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-slate-400">
                                        {product.description}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                {product.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 text-emerald-500 font-semibold group-hover:gap-3 transition-all">
                                Learn More
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-3xl p-12">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                        Explore our pricing plans or contact our sales team to learn how FutureX Finance can transform your operations.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/pricing">
                            <button className="bg-emerald-500 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-400 transition-all">
                                View Pricing
                            </button>
                        </Link>
                        <Link href="/contact">
                            <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
                                Contact Sales
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

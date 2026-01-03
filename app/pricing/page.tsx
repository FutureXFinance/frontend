import { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "Pricing | FutureX Finance",
    description: "Flexible pricing plans for businesses of all sizes.",
};

export default function PricingPage() {
    const plans = [
        {
            name: "Starter",
            price: "$499",
            period: "/month",
            description: "Perfect for growing businesses",
            features: [
                "Up to 10,000 transactions/month",
                "Fraud Detection",
                "KYC Verification",
                "Email support",
                "99.9% uptime SLA",
                "API access",
            ],
            cta: "Start Free Trial",
            popular: false,
        },
        {
            name: "Professional",
            price: "$1,999",
            period: "/month",
            description: "For established enterprises",
            features: [
                "Up to 100,000 transactions/month",
                "All Starter features",
                "Document Parser",
                "Customer Insights",
                "Priority support",
                "Custom integrations",
                "Dedicated account manager",
                "Advanced analytics",
            ],
            cta: "Start Free Trial",
            popular: true,
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "",
            description: "For large-scale operations",
            features: [
                "Unlimited transactions",
                "All Professional features",
                "Compliance Monitoring",
                "24/7 phone support",
                "Custom ML models",
                "On-premise deployment",
                "SLA guarantees",
                "Security audits",
            ],
            cta: "Contact Sales",
            popular: false,
        },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-sm font-semibold mb-6">
                        Pricing
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Simple, Transparent
                        <br />
                        <span className="bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent">
                            Pricing
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Choose the perfect plan for your business. All plans include a 14-day free trial.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-slate-900/50 border rounded-3xl p-8 ${plan.popular
                                    ? "border-emerald-500/50 shadow-2xl shadow-emerald-500/10"
                                    : "border-white/10"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-sm font-bold rounded-full flex items-center gap-1">
                                    <Zap className="w-4 h-4" />
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-slate-400 text-sm">{plan.description}</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-bold">{plan.price}</span>
                                    <span className="text-slate-400">{plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-300 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/contact">
                                <button
                                    className={`w-full py-4 rounded-full font-bold transition-all ${plan.popular
                                            ? "bg-emerald-500 text-white hover:bg-emerald-400"
                                            : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                                        }`}
                                >
                                    {plan.cta}
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* FAQ */}
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: "Can I change plans later?",
                                a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
                            },
                            {
                                q: "What payment methods do you accept?",
                                a: "We accept all major credit cards, wire transfers, and ACH payments for enterprise customers."
                            },
                            {
                                q: "Is there a setup fee?",
                                a: "No, there are no setup fees. You only pay for your chosen plan."
                            },
                            {
                                q: "What's included in the free trial?",
                                a: "The 14-day free trial includes full access to all features in your chosen plan, with no credit card required."
                            },
                        ].map((faq, index) => (
                            <div key={index} className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                                <h3 className="font-bold mb-2">{faq.q}</h3>
                                <p className="text-slate-400 text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-16 bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-3xl p-12">
                    <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
                    <p className="text-slate-400 mb-8">
                        Our team is here to help you find the perfect plan for your needs.
                    </p>
                    <Link href="/contact">
                        <button className="bg-emerald-500 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 mx-auto">
                            Contact Sales
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

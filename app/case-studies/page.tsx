import { Metadata } from "next";
import { TrendingUp, Users, Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "Case Studies | FutureX Finance",
    description: "Success stories from our customers.",
};

export default function CaseStudiesPage() {
    const cases = [
        {
            icon: Shield,
            company: "Global Bank Corp",
            industry: "Banking",
            challenge: "Needed to reduce fraud losses by 50% while maintaining customer experience",
            solution: "Implemented FutureX Fraud Detection with real-time ML models",
            results: ["65% reduction in fraud losses", "99.9% accuracy rate", "2x faster processing"],
            color: "emerald"
        },
        {
            icon: Users,
            company: "FinTech Innovations",
            industry: "Financial Services",
            challenge: "Manual KYC process taking 3-5 days per customer",
            solution: "Deployed automated KYC verification system",
            results: ["90% faster verification", "50% cost reduction", "Improved compliance"],
            color: "blue"
        },
        {
            icon: TrendingUp,
            company: "Investment Partners LLC",
            industry: "Investment",
            challenge: "Needed better customer insights for personalized services",
            solution: "Integrated Customer Insights platform",
            results: ["40% increase in engagement", "Better risk profiling", "Personalized offerings"],
            color: "purple"
        },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-sm font-semibold mb-6">
                        Case Studies
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Customer
                        <br />
                        <span className="bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent">
                            Success Stories
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        See how leading financial institutions are transforming their operations with FutureX Finance.
                    </p>
                </div>

                <div className="space-y-8">
                    {cases.map((caseStudy, index) => (
                        <div key={index} className="bg-slate-900/50 border border-white/10 rounded-3xl p-8">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <caseStudy.icon className="w-8 h-8 text-emerald-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <h3 className="text-2xl font-bold">{caseStudy.company}</h3>
                                        <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-xs font-semibold">
                                            {caseStudy.industry}
                                        </span>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Challenge</h4>
                                            <p className="text-slate-300 text-sm">{caseStudy.challenge}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Solution</h4>
                                            <p className="text-slate-300 text-sm">{caseStudy.solution}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Results</h4>
                                            <ul className="space-y-1">
                                                {caseStudy.results.map((result, i) => (
                                                    <li key={i} className="text-emerald-500 text-sm">✓ {result}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { getCustomerInsights } from "../../../utils/api";

export default function InsightsPage() {
    const [customerId, setCustomerId] = useState("");
    const [insights, setInsights] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = await getCustomerInsights(customerId);
            setInsights(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#020617] text-white selection:bg-emerald-500/30">
            <main className="flex-grow pt-40 pb-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Content */}
                    <div className="space-y-12">
                        <div>
                            <p className="text-label-caps mb-4">Behavioral Intelligence</p>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Customer Insights</h1>
                            <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-xl">
                                Predictive behavioral analytics to personalize engagement and optimize institutional portfolio health.
                            </p>
                        </div>

                        <div className="card-premium p-10 space-y-10 group">
                            <form onSubmit={handleAction} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest pl-1">Protocol Identifier</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Institutional User ID (e.g. US_992)"
                                            className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-sm font-semibold focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-800"
                                            value={customerId}
                                            onChange={e => setCustomerId(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button type="submit" disabled={isLoading} className="btn-primary-new w-full py-4 text-sm">
                                    {isLoading ? "Generating Behavioral Vector..." : "Generate Insights"}
                                </button>
                            </form>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="p-8 rounded-[32px] bg-white/[0.01] border border-white/5">
                                <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-2">Churn Prediction</p>
                                <p className="text-3xl font-bold text-rose-500/80 tracking-tighter">Low Risk</p>
                            </div>
                            <div className="p-8 rounded-[32px] bg-white/[0.01] border border-white/5">
                                <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-2">Advocacy Score</p>
                                <p className="text-3xl font-bold text-emerald-500/80 tracking-tighter">9.2 / 10</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Results Dashboard */}
                    <div className="lg:sticky lg:top-40">
                        {insights ? (
                            <div className="animate-in card-premium p-12 border-emerald-500/10">
                                <div className="flex items-center justify-between mb-12">
                                    <div className="space-y-1">
                                        <p className="text-label-caps text-xs">Engagement Profile</p>
                                        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{insights.risk_level || "Core Tier 1"}</h3>
                                    </div>
                                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center text-emerald-500 font-black">
                                        {insights.churn_probability || "A+"}
                                    </div>
                                </div>

                                <div className="space-y-12">
                                    <div>
                                        <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Institutional Recommendations</h4>
                                        <div className="space-y-4">
                                            {(insights.recommendations || ["Optimize wealth allocation", "Increase liquidity buffer", "Institutional credit push"]).map((rec: string, i: number) => (
                                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 cursor-default hover:bg-white/[0.04] transition-colors">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div>
                                                    <span className="text-sm font-medium text-slate-300">{rec}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-8 rounded-2xl bg-slate-950/50 border border-white/5">
                                        <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-4">Predictive Sentiment</h4>
                                        <p className="text-sm font-medium text-slate-500 italic leading-relaxed">
                                            "Target profile demonstrates significant affinity for high-yield treasury products based on last 90-day liquidity shifts."
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-12 flex justify-end">
                                    <button className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest hover:text-emerald-400 transition-colors">Sync to CRM Hub</button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-[500px] card-premium flex flex-col items-center justify-center p-12 text-center border-dashed border-2 opacity-30">
                                <div className="w-16 h-16 rounded-2xl bg-white/[0.02] flex items-center justify-center text-slate-700 mb-8">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                                </div>
                                <h3 className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-2">Behavioral Sync Pending</h3>
                                <p className="text-[10px] font-medium text-slate-800 max-w-[200px]">Awaiting institutional entity identification.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>        </div>
    );
}

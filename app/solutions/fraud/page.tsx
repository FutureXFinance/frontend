"use client";

import { useState } from "react";
import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";
import AnalyticsDashboard from "../../../components/solutions/fraud/AnalyticsDashboard";
import TransactionHistory from "../../../components/solutions/fraud/TransactionHistory";
import AlertsPanel from "../../../components/solutions/fraud/AlertsPanel";
import { analyzeFraud, type FraudAnalysisResult } from "../../../utils/api";

export default function FraudDashboardPage() {
    const [activeTab, setActiveTab] = useState<"analyze" | "dashboard" | "history" | "alerts">("analyze");
    const [formData, setFormData] = useState({
        amount: "",
        type: "purchase",
        merchant_category: "general",
        location_distance_km: "0",
        account_age_days: "30",
        count_last_hour: "0",
        amount_last_hour: "0"
    });

    const [result, setResult] = useState<FraudAnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const transactionData = {
                amount: parseFloat(formData.amount),
                type: formData.type,
                merchant_category: formData.merchant_category,
                location_distance_km: parseFloat(formData.location_distance_km),
                account_age_days: parseInt(formData.account_age_days),
                recent_transaction_count: parseInt(formData.count_last_hour),
                amount_last_hour: parseFloat(formData.amount_last_hour),
                count_last_hour: parseInt(formData.count_last_hour)
            };

            const analysis = await analyzeFraud(transactionData);
            setResult(analysis);
        } catch (err: any) {
            setError(err.response?.data?.detail || "Analysis failed. Please try again.");
            console.error("Fraud analysis error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const tabs = [
        { id: "analyze" as const, label: "Analyze", icon: "🔍" },
        { id: "dashboard" as const, label: "Dashboard", icon: "📊" },
        { id: "history" as const, label: "History", icon: "📜" },
        { id: "alerts" as const, label: "Alerts", icon: "🚨" }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#020617] text-white selection:bg-emerald-500/30">
            <Navbar />

            <main className="flex-grow pt-40 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <p className="text-label-caps mb-4">Real-time Analytics</p>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Fraud Detection Engine</h1>
                        <p className="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed">
                            Analyze transaction telemetry through ML-powered anomaly detection to identify sophisticated fraud patterns.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-8 border-b border-white/5">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === tab.id
                                        ? "border-emerald-500 text-white"
                                        : "border-transparent text-slate-500 hover:text-slate-300"
                                    }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    {activeTab === "analyze" && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            {/* Analysis Form */}
                            <div className="space-y-8">
                                <form onSubmit={handleSubmit} className="card-premium p-10 space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Transaction Amount</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                placeholder="Amount ($)"
                                                required
                                                className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-sm font-semibold focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-800"
                                                value={formData.amount}
                                                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Type</label>
                                                <select
                                                    className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-sm font-semibold focus:outline-none focus:border-emerald-500/50 transition-all"
                                                    value={formData.type}
                                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                                >
                                                    <option value="purchase">Purchase</option>
                                                    <option value="withdrawal">Withdrawal</option>
                                                    <option value="transfer">Transfer</option>
                                                    <option value="deposit">Deposit</option>
                                                    <option value="payment">Payment</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Category</label>
                                                <select
                                                    className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-sm font-semibold focus:outline-none focus:border-emerald-500/50 transition-all"
                                                    value={formData.merchant_category}
                                                    onChange={e => setFormData({ ...formData, merchant_category: e.target.value })}
                                                >
                                                    <option value="general">General</option>
                                                    <option value="online">Online</option>
                                                    <option value="travel">Travel</option>
                                                    <option value="entertainment">Entertainment</option>
                                                    <option value="grocery">Grocery</option>
                                                    <option value="gas">Gas</option>
                                                    <option value="restaurant">Restaurant</option>
                                                    <option value="healthcare">Healthcare</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Location Distance (km)</label>
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-sm font-semibold focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-800"
                                                    value={formData.location_distance_km}
                                                    onChange={e => setFormData({ ...formData, location_distance_km: e.target.value })}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Account Age (days)</label>
                                                <input
                                                    type="number"
                                                    placeholder="30"
                                                    className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-sm font-semibold focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-800"
                                                    value={formData.account_age_days}
                                                    onChange={e => setFormData({ ...formData, account_age_days: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Transactions (last hour)</label>
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-sm font-semibold focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-800"
                                                    value={formData.count_last_hour}
                                                    onChange={e => setFormData({ ...formData, count_last_hour: e.target.value })}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Amount (last hour)</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="0"
                                                    className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-sm font-semibold focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-800"
                                                    value={formData.amount_last_hour}
                                                    onChange={e => setFormData({ ...formData, amount_last_hour: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                            <p className="text-sm text-red-400">{error}</p>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="btn-primary-new w-full py-4 text-sm"
                                    >
                                        {isLoading ? "Processing Analysis..." : "Initiate Anomaly Scan"}
                                    </button>
                                </form>

                                <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/[0.01] border border-white/5">
                                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                                    </div>
                                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                                        Enhanced ML model with 15 features. Combines Isolation Forest + LOF with rule-based scoring.
                                    </p>
                                </div>
                            </div>

                            {/* Results */}
                            <div className="lg:sticky lg:top-40">
                                {result ? (
                                    <div className="animate-in card-premium p-12 border-emerald-500/20 bg-slate-900/60">
                                        <div className="flex items-center justify-between mb-12">
                                            <div className="space-y-1">
                                                <p className="text-label-caps text-xs">Analysis Complete</p>
                                                <h3 className="text-2xl font-bold text-white">Risk Assessment</h3>
                                            </div>
                                            <div className={`px-4 py-2 rounded-full font-black text-[10px] tracking-widest border uppercase ${result.is_fraudulent
                                                ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                                                : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                                }`}>
                                                {result.risk_level}
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">Risk Score</span>
                                                    <span className="text-sm font-black text-emerald-500">{result.risk_score}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full transition-all duration-1000 ${result.risk_score > 70 ? 'bg-rose-500' :
                                                            result.risk_score > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                                                            }`}
                                                        style={{ width: `${result.risk_score}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">ML Score</p>
                                                    <p className="text-sm font-bold text-white">{result.ml_score !== null ? `${result.ml_score}%` : 'N/A'}</p>
                                                </div>
                                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">Rule Score</p>
                                                    <p className="text-sm font-bold text-white">{result.rule_score}%</p>
                                                </div>
                                            </div>

                                            {result.anomalies.length > 0 && (
                                                <div className="p-8 rounded-2xl bg-slate-950/50 border border-white/5">
                                                    <h4 className="text-[10px] font-black text-rose-500/60 uppercase tracking-widest mb-4">Detected Anomalies</h4>
                                                    <ul className="space-y-2">
                                                        {result.anomalies.map((anomaly, i) => (
                                                            <li key={i} className="text-sm font-medium text-slate-400 flex items-start gap-2">
                                                                <span className="text-rose-500 mt-1">•</span>
                                                                <span>{anomaly}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            <div className="p-8 rounded-2xl bg-slate-950/50 border border-white/5">
                                                <h4 className="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest mb-4">Recommendation</h4>
                                                <p className="text-sm font-medium text-slate-400 leading-relaxed">
                                                    {result.recommendation}
                                                </p>
                                            </div>

                                            <div className="pt-6 border-t border-white/5 text-xs text-slate-600">
                                                <p>Transaction ID: {result.transaction_id.slice(0, 8)}</p>
                                                <p>Model: {result.details.model_used}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-[600px] card-premium flex flex-col items-center justify-center p-12 text-center border-dashed border-2 opacity-40">
                                        <div className="w-20 h-20 rounded-3xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-slate-700 mb-8 animate-pulse">
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-600 mb-2 uppercase tracking-tight">Analytical Standby</h3>
                                        <p className="text-xs font-medium text-slate-700 max-w-sm">Awaiting transaction data for fraud analysis.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "dashboard" && <AnalyticsDashboard />}
                    {activeTab === "history" && <TransactionHistory />}
                    {activeTab === "alerts" && <AlertsPanel />}
                </div>
            </main>

            <Footer />
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";

interface DashboardAnalytics {
    period_days: number;
    total_transactions: number;
    fraudulent_transactions: number;
    fraud_rate: number;
    average_risk_score: number;
    risk_distribution: {
        LOW: number;
        MEDIUM: number;
        HIGH: number;
        CRITICAL: number;
    };
    active_alerts: number;
    model_version: string;
    model_trained: boolean;
}

export default function AnalyticsDashboard() {
    const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);
    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState(30);

    useEffect(() => {
        fetchAnalytics();
    }, [days]);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/fraud/analytics/dashboard?days=${days}`
            );
            const data = await response.json();
            setAnalytics(data);
        } catch (error) {
            console.error("Failed to fetch analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading || !analytics) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="card-premium p-8 animate-pulse">
                        <div className="h-4 bg-white/5 rounded w-1/2 mb-4"></div>
                        <div className="h-8 bg-white/10 rounded w-3/4"></div>
                    </div>
                ))}
            </div>
        );
    }

    const riskLevels = [
        { name: "LOW", count: analytics.risk_distribution.LOW, color: "emerald" },
        { name: "MEDIUM", count: analytics.risk_distribution.MEDIUM, color: "amber" },
        { name: "HIGH", count: analytics.risk_distribution.HIGH, color: "orange" },
        { name: "CRITICAL", count: analytics.risk_distribution.CRITICAL, color: "rose" }
    ];

    const total = Object.values(analytics.risk_distribution).reduce((a, b) => a + b, 0);

    return (
        <div className="space-y-8">
            {/* Period Selector */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
                <div className="flex gap-2">
                    {[7, 30, 90].map(d => (
                        <button
                            key={d}
                            onClick={() => setDays(d)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${days === d
                                    ? "bg-emerald-500 text-white"
                                    : "bg-white/5 text-slate-500 hover:bg-white/10"
                                }`}
                        >
                            {d} Days
                        </button>
                    ))}
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card-premium p-8">
                    <p className="text-label-caps mb-2">Total Transactions</p>
                    <p className="text-3xl font-bold text-white">{analytics.total_transactions.toLocaleString()}</p>
                    <p className="text-xs text-slate-500 mt-2">Last {analytics.period_days} days</p>
                </div>

                <div className="card-premium p-8">
                    <p className="text-label-caps mb-2">Fraud Rate</p>
                    <p className="text-3xl font-bold text-rose-500">{analytics.fraud_rate}%</p>
                    <p className="text-xs text-slate-500 mt-2">
                        {analytics.fraudulent_transactions} fraudulent
                    </p>
                </div>

                <div className="card-premium p-8">
                    <p className="text-label-caps mb-2">Avg Risk Score</p>
                    <p className="text-3xl font-bold text-amber-500">{analytics.average_risk_score}</p>
                    <p className="text-xs text-slate-500 mt-2">Out of 100</p>
                </div>

                <div className="card-premium p-8">
                    <p className="text-label-caps mb-2">Active Alerts</p>
                    <p className="text-3xl font-bold text-orange-500">{analytics.active_alerts}</p>
                    <p className="text-xs text-slate-500 mt-2">Pending review</p>
                </div>
            </div>

            {/* Risk Distribution */}
            <div className="card-premium p-8">
                <h3 className="text-lg font-bold mb-6">Risk Distribution</h3>

                {/* Bar Chart */}
                <div className="space-y-4 mb-8">
                    {riskLevels.map(level => {
                        const percentage = total > 0 ? (level.count / total) * 100 : 0;
                        return (
                            <div key={level.name}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-slate-400">{level.name}</span>
                                    <span className="text-sm font-bold text-white">{level.count}</span>
                                </div>
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full bg-${level.color}-500 transition-all duration-1000`}
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pie Chart Representation */}
                <div className="grid grid-cols-4 gap-4">
                    {riskLevels.map(level => {
                        const percentage = total > 0 ? ((level.count / total) * 100).toFixed(1) : 0;
                        return (
                            <div key={level.name} className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <p className={`text-2xl font-bold text-${level.color}-500`}>{percentage}%</p>
                                <p className="text-xs text-slate-500 mt-1">{level.name}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Model Info */}
            <div className="card-premium p-8">
                <h3 className="text-lg font-bold mb-4">Model Information</h3>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <p className="text-xs text-slate-500 mb-1">Version</p>
                        <p className="text-sm font-bold text-white">{analytics.model_version}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 mb-1">Status</p>
                        <p className={`text-sm font-bold ${analytics.model_trained ? 'text-emerald-500' : 'text-amber-500'}`}>
                            {analytics.model_trained ? 'Trained' : 'Untrained'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

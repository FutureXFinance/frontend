"use client";

import { useState } from "react";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import Link from "next/link";

export default function DashboardPage() {
    const [performance, setPerformance] = useState({
        nodes: 12,
        uptime: "99.98%",
        latency: "14ms",
        status: "Optimal"
    });

    const solutions = [
        { name: "Fraud Detection", status: "Active", health: 98, link: "/solutions/fraud" },
        { name: "KYC Engine", status: "Active", health: 100, link: "/solutions/kyc" },
        { name: "Document Parser", status: "Standby", health: 92, link: "/solutions/parser" },
        { name: "Insights Agent", status: "Computing", health: 85, link: "/solutions/insights" },
        { name: "Compliance Node", status: "Active", health: 99, link: "/solutions/compliance" },
        { name: "AI Concierge", status: "Active", health: 100, link: "/solutions/chatbot" }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#020617] text-slate-50 selection:bg-emerald-500/30">
            <Navbar />

            <main className="flex-grow pt-40 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <div>
                            <p className="text-label-caps mb-4">Command Center</p>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">Institutional Dashboard</h1>
                            <p className="text-slate-500 text-sm font-medium">Real-time telemetry and modular node orchestration.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="badge-emerald">System Protocol Secure</span>
                            <span className="text-slate-700 text-[10px] font-bold uppercase tracking-widest">Auth ID: FX-88-22</span>
                        </div>
                    </div>

                    {/* Performance Tiles - Geometric & Clean */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: "Active Nodes", value: performance.nodes, sub: "Distributed across 4 regions" },
                            { label: "Network Uptime", value: performance.uptime, sub: "Last 30-day aggregate" },
                            { label: "Core Latency", value: performance.latency, sub: "Sub-millisecond resolution" },
                            { label: "System Status", value: performance.status, sub: "All protocols operational" }
                        ].map((item, i) => (
                            <div key={i} className="card-premium p-8">
                                <p className="text-label-caps text-[9px] mb-4 text-slate-500">{item.label}</p>
                                <p className="text-4xl font-bold text-white mb-2">{item.value}</p>
                                <p className="text-[10px] font-medium text-slate-600 uppercase tracking-wider">{item.sub}</p>
                            </div>
                        ))}
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Modules Control */}
                        <div className="lg:col-span-2 card-premium p-10">
                            <h3 className="text-xl font-bold text-white mb-10 flex items-center gap-3">
                                Infrastructure Modules
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {solutions.map((node, i) => (
                                    <Link key={i} href={node.link} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all group">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-sm font-bold text-white group-hover:text-emerald-500 transition-colors uppercase tracking-tight">{node.name}</span>
                                            <span className={`text-[9px] font-black uppercase tracking-widest ${node.status === "Active" ? "text-emerald-500" : "text-amber-500"}`}>{node.status}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-grow h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${node.health}%` }}></div>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-600">{node.health}%</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Intelligence Feed */}
                        <div className="card-premium p-10">
                            <h3 className="text-xl font-bold text-white mb-10">Neural Log</h3>
                            <div className="space-y-8">
                                {[
                                    { time: "10:42:01", event: "Fraud query resolved", node: "CORE_ALPHA" },
                                    { time: "10:41:45", event: "Node latency stabilized", node: "EDGE_WEST" },
                                    { time: "10:38:12", event: "KYC biometric match", node: "SECURE_GATE" },
                                    { time: "10:35:59", event: "New data partition sync", node: "DATA_CLUSTER" }
                                ].map((log, i) => (
                                    <div key={i} className="flex flex-col gap-1.5 border-l-2 border-emerald-500/20 pl-4 py-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-slate-700">{log.time}</span>
                                            <span className="text-[9px] font-bold text-emerald-500/60 uppercase tracking-tighter">{log.node}</span>
                                        </div>
                                        <p className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">{log.event}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-10 py-3 rounded-xl border border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] hover:bg-white/5 hover:text-white transition-all">
                                View Security Protocols
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

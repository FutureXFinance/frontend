"use client";

import { useState } from "react";
import { getComplianceUpdates } from "../../../utils/api";

export default function CompliancePage() {
    const [status, setStatus] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCheck = async () => {
        setIsLoading(true);
        try {
            const result = await getComplianceUpdates();
            setStatus(result);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#020617] text-white selection:bg-emerald-500/30">
            <main className="flex-grow pt-40 pb-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-24">
                        <div className="max-w-2xl">
                            <p className="text-label-caps mb-4">Regulatory Monitoring</p>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Compliance Protocol</h1>
                            <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">
                                Autonomous tracking of global regulatory shifts mapped to internal control frameworks in real-time.
                            </p>
                        </div>
                        <div className="w-full lg:w-auto">
                            <button
                                onClick={handleCheck}
                                disabled={isLoading}
                                className="btn-primary-new w-full lg:w-80 py-5 text-sm uppercase tracking-widest shadow-emerald-500/30"
                            >
                                {isLoading ? "Scanning Global Policy..." : "Run Framework Audit"}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Audit Log */}
                        <div className="lg:col-span-2 card-premium p-10 md:p-14">
                            <div className="flex items-center justify-between mb-12">
                                <h3 className="text-xl font-bold text-white uppercase tracking-tight">System Controls</h3>
                                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Aggregate Score: 98/100</span>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { name: "AML Framework V4", status: "Compliant", level: "Global" },
                                    { name: "GDPR Data Nodes", status: "Compliant", level: "EU Standard" },
                                    { name: "SEC Disclosure Log", status: "Pending Sync", level: "US Federal" },
                                    { name: "Sovereign Asset Cap", status: "In-Progress", level: "Regional" }
                                ].map((control, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.02] transition-all group">
                                        <div className="flex items-center gap-6">
                                            <div className={`w-2 h-2 rounded-full ${control.status === "Compliant" ? "bg-emerald-500" : "bg-amber-500"}`}></div>
                                            <div>
                                                <p className="text-sm font-bold text-white group-hover:text-emerald-500 transition-colors uppercase tracking-tight">{control.name}</p>
                                                <p className="text-[10px] font-medium text-slate-600 uppercase tracking-[0.2em]">{control.level}</p>
                                            </div>
                                        </div>
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${control.status === "Compliant" ? "text-emerald-500" : "text-amber-500"}`}>{control.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Regulatory Alerts */}
                        <div className="space-y-8">
                            <div className="card-premium p-10 bg-slate-900/40">
                                <p className="text-label-caps text-[9px] mb-6">High Impact Alerts</p>
                                <div className="space-y-8">
                                    {[
                                        { title: "BCBS Basel III Update", type: "Federal Policy", impact: "High" },
                                        { title: "CFTC Liquidity Ruling", type: "Operational", impact: "Medium" }
                                    ].map((alert, i) => (
                                        <div key={i} className="space-y-2 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                                            <p className="text-xs font-bold text-white uppercase tracking-tight">{alert.title}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">{alert.type}</span>
                                                <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">{alert.impact}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-10 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 text-center">
                                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] mb-4">Institutional Guard</p>
                                <p className="text-xs font-medium text-slate-400 leading-relaxed italic">
                                    "Autonomous compliance shield actively monitoring 12,000+ regulatory legislative nodes."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>        </div>
    );
}

"use client";

import { useState } from "react";
import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";
import { parseDocument } from "../../../utils/api";

export default function ParserPage() {
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAction = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;
        setIsLoading(true);
        try {
            const data = await parseDocument(file);
            setResult(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#020617] text-white selection:bg-emerald-500/30">
            <Navbar />

            <main className="flex-grow pt-40 pb-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-start">
                    {/* Left Side: Content */}
                    <div className="lg:w-1/2 space-y-12">
                        <div>
                            <p className="text-label-caps mb-4">Semantic Extraction</p>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Document Intelligence</h1>
                            <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-xl">
                                Extract structured data from opaque financial instruments with high-fidelity OCR and semantic understanding.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {[
                                { label: "OCR Accuracy", value: "99.9%" },
                                { label: "Processing", value: "< 1.2s" },
                                { label: "File Formats", value: "32+" },
                                { label: "Auto-ID", value: "Active" }
                            ].map((stat, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-white/[0.01] border border-white/5">
                                    <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <p className="text-xl font-bold text-white">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Interface */}
                    <div className="lg:w-1/2 w-full">
                        <div className="card-premium p-10 md:p-14">
                            <form onSubmit={handleAction} className="space-y-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest pl-1">Ingestion Protocol</label>
                                    <div className="relative border-2 border-dashed border-white/10 rounded-[32px] p-20 text-center hover:border-emerald-500/30 transition-all bg-white/[0.01]">
                                        <input
                                            type="file"
                                            onChange={e => setFile(e.target.files?.[0] || null)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="space-y-4 text-center">
                                            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center text-slate-700 mx-auto">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white uppercase tracking-tight">{file ? file.name : "Select Financial Instrument"}</p>
                                                <p className="text-[10px] font-medium text-slate-700 uppercase tracking-widest mt-1">Institutional Ledger, Invoice, or Report</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!file || isLoading}
                                    className="btn-primary-new w-full py-5 text-sm uppercase"
                                >
                                    {isLoading ? "Analyzing Data Structures..." : "Execute Semantic Parse"}
                                </button>
                            </form>

                            {result && (
                                <div className="mt-12 pt-10 border-t border-white/5 animate-in">
                                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8">Structured Output</h3>
                                    <div className="space-y-4">
                                        {Object.entries(result.entities || {}).map(([key, value]: [string, any], i) => (
                                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{key}</span>
                                                <span className="text-sm font-semibold text-emerald-500">{String(value)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-10 p-6 rounded-2xl bg-slate-950 border border-white/5">
                                        <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-2 italic">Neural Summary</p>
                                        <p className="text-xs font-medium text-slate-500 leading-relaxed italic">
                                            "{result.summary || "No anomalies detected in document structure."}"
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

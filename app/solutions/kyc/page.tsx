"use client";

import { useState } from "react";
import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";
import { uploadKycDocument, type KYCVerificationResult } from "../../../utils/api";

export default function KycPage() {
    const [idDocument, setIdDocument] = useState<File | null>(null);
    const [selfie, setSelfie] = useState<File | null>(null);
    const [result, setResult] = useState<KYCVerificationResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!idDocument || !selfie) {
            setError("Please upload both ID document and selfie");
            return;
        }

        setIsLoading(true);
        setError(null);
        setUploadProgress(0);

        try {
            // Simulate upload progress
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => Math.min(prev + 10, 90));
            }, 200);

            const verificationResult = await uploadKycDocument(idDocument, selfie);

            clearInterval(progressInterval);
            setUploadProgress(100);
            setResult(verificationResult);
        } catch (err: any) {
            setError(err.response?.data?.detail || "Verification failed. Please try again.");
            console.error("KYC Error:", err);
        } finally {
            setIsLoading(false);
            setTimeout(() => setUploadProgress(0), 1000);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#020617] text-white selection:bg-emerald-500/30">
            <Navbar />

            <main className="flex-grow pt-40 pb-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-start">
                    {/* Left: Content */}
                    <div className="lg:w-1/2 space-y-12">
                        <div>
                            <p className="text-label-caps mb-4">Identity Orchestration</p>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">KYC Protocol Engine</h1>
                            <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-xl">
                                Verify institutional identities with biometric precision and automated document validation across 190 global jurisdictions.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 flex-shrink-0 text-xs font-black">01</div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-bold text-white uppercase tracking-tight">Security-First Upload</h3>
                                    <p className="text-xs font-semibold text-slate-600 tracking-tight">End-to-end encrypted transmission node.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 flex-shrink-0 text-xs font-black">02</div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-bold text-white uppercase tracking-tight">Biometric Consensus</h3>
                                    <p className="text-xs font-semibold text-slate-600 tracking-tight">Automated liveness testing via neural vision.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 flex-shrink-0 text-xs font-black">03</div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-bold text-white uppercase tracking-tight">Instant Finality</h3>
                                    <p className="text-xs font-semibold text-slate-600 tracking-tight">Regulatory validation results in sub-4 seconds.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-slate-900/20 border border-white/5 flex items-center gap-6">
                            <div className="p-4 rounded-full bg-emerald-500/5 text-emerald-500 animate-pulse">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            </div>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Global Compliance V2.1 Active</p>
                        </div>
                    </div>

                    {/* Right: Interface */}
                    <div className="lg:w-1/2 w-full">
                        <div className="card-premium p-10 md:p-14 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                            <form onSubmit={handleUpload} className="space-y-8">
                                {/* ID Document Upload */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] pl-1">ID Document</label>
                                    <div className="relative border-2 border-dashed border-white/10 rounded-[24px] p-12 text-center hover:border-emerald-500/30 transition-all bg-white/[0.01] hover:bg-white/[0.02]">
                                        <input
                                            type="file"
                                            accept="image/*,.pdf"
                                            onChange={e => setIdDocument(e.target.files?.[0] || null)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="space-y-3">
                                            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-center text-slate-700 mx-auto group-hover:text-emerald-500 transition-colors">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white uppercase tracking-tight mb-1">{idDocument ? idDocument.name : "Upload ID Document"}</p>
                                                <p className="text-[10px] font-medium text-slate-700 uppercase tracking-widest">Passport, License, or ID Card</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Selfie Upload */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] pl-1">Selfie Photo</label>
                                    <div className="relative border-2 border-dashed border-white/10 rounded-[24px] p-12 text-center hover:border-emerald-500/30 transition-all bg-white/[0.01] hover:bg-white/[0.02]">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setSelfie(e.target.files?.[0] || null)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="space-y-3">
                                            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-center text-slate-700 mx-auto group-hover:text-emerald-500 transition-colors">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white uppercase tracking-tight mb-1">{selfie ? selfie.name : "Upload Selfie"}</p>
                                                <p className="text-[10px] font-medium text-slate-700 uppercase tracking-widest">Clear face photo</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Error Display */}
                                {error && (
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                        <p className="text-sm text-red-400">{error}</p>
                                    </div>
                                )}

                                {/* Progress Bar */}
                                {uploadProgress > 0 && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs text-slate-500">
                                            <span>Processing...</span>
                                            <span>{uploadProgress}%</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-500 transition-all duration-300"
                                                style={{ width: `${uploadProgress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={!idDocument || !selfie || isLoading}
                                    className="btn-primary-new w-full py-5 text-sm uppercase tracking-widest disabled:opacity-20 disabled:grayscale"
                                >
                                    {isLoading ? "Executing Neural Validation..." : "Execute Identity Sync"}
                                </button>
                            </form>

                            {result && (
                                <div className="mt-12 pt-10 border-t border-white/5 animate-in">
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="text-label-caps">Validation Outcome</span>
                                        <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${result.status === 'VERIFIED'
                                                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                            }`}>
                                            {result.status}
                                        </span>
                                    </div>
                                    <div className="p-8 rounded-2xl bg-slate-950/50 border border-white/5 space-y-6">
                                        <div className="grid grid-cols-2 gap-8">
                                            <div>
                                                <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest mb-1 italic">Verification ID</p>
                                                <p className="text-sm font-bold text-white uppercase">{result.verification_id.slice(0, 8)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest mb-1 italic">Confidence</p>
                                                <p className="text-sm font-black text-emerald-500">{result.face_match_confidence.toFixed(2)}%</p>
                                            </div>
                                        </div>

                                        {result.details.face_match && (
                                            <div className="pt-6 border-t border-white/5">
                                                <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest mb-2">Face Match Result</p>
                                                <p className="text-xs font-medium text-slate-400">{result.details.face_match}</p>
                                            </div>
                                        )}

                                        {result.details.structured_data && Object.keys(result.details.structured_data).length > 0 && (
                                            <div className="pt-6 border-t border-white/5">
                                                <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest mb-2">Extracted Data</p>
                                                <div className="text-xs text-slate-400 space-y-1">
                                                    {result.details.structured_data.id_numbers?.length > 0 && (
                                                        <p>ID: {result.details.structured_data.id_numbers[0]}</p>
                                                    )}
                                                    {result.details.structured_data.dates?.length > 0 && (
                                                        <p>Date: {result.details.structured_data.dates[0]}</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {result.details.rejection_reason && (
                                            <div className="pt-6 border-t border-white/5">
                                                <p className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-2">Rejection Reason</p>
                                                <p className="text-xs font-medium text-red-400">{result.details.rejection_reason}</p>
                                            </div>
                                        )}
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

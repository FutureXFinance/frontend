"use client";

import { useState } from "react";
import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";
import { chatWithBot } from "../../../utils/api";

export default function ChatbotPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: "user", text: input };
        setMessages([...messages, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const botResponse = await chatWithBot(input);
            setMessages(prev => [...prev, { role: "bot", text: botResponse }]);
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
                <div className="max-w-5xl mx-auto flex flex-col h-[700px] card-premium overflow-hidden border-white/5 bg-slate-900/40">
                    {/* Top Panel */}
                    <div className="p-8 border-b border-white/5 bg-slate-900/60 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21 15-3-3 3-3" /><path d="M15 6.8a6 6 0 1 0 0 10.4" /><path d="M22 12h-4" /></svg>
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-white uppercase tracking-tight leading-none">AI Institutional Concierge</h2>
                                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Protocol Model V9.4 Active</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Auth ID: FX-BB-9</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]"></div>
                        </div>
                    </div>

                    {/* Chat Feed */}
                    <div className="flex-grow overflow-y-auto p-10 space-y-8 scroll-smooth">
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30">
                                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Encrypted Session Initiated</h3>
                                    <p className="text-[10px] font-medium text-slate-600 max-w-[240px] uppercase">Awaiting institutional operational queries.</p>
                                </div>
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in`}>
                                <div className={`max-w-[80%] p-6 rounded-3xl text-sm font-medium leading-relaxed ${msg.role === "user"
                                        ? "bg-emerald-500 text-slate-950 rounded-tr-none font-bold shadow-lg shadow-emerald-500/10"
                                        : "bg-white/[0.02] border border-white/5 text-slate-200 rounded-tl-none backdrop-blur-md"
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start animate-pulse">
                                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl rounded-tl-none">
                                    <div className="flex gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-8 border-t border-white/5 bg-slate-950/40">
                        <form onSubmit={handleSend} className="relative group">
                            <input
                                type="text"
                                placeholder="Query institutional protocol..."
                                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-8 py-5 text-sm font-semibold focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-800"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                            </button>
                        </form>
                        <p className="mt-4 text-[9px] font-black text-slate-800 uppercase tracking-widest text-center">Protocol V11 Secured Session • Neural Consensus Enabled</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

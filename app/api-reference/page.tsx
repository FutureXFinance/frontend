import { Metadata } from "next";
import { Code2 } from "lucide-react";

export const metadata: Metadata = {
    title: "API Reference | FutureX Finance",
    description: "Complete API reference for all FutureX Finance endpoints.",
};

export default function APIReferencePage() {
    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-sm font-semibold mb-6">
                        API Reference
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Complete API
                        <br />
                        <span className="bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent">
                            Reference
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Comprehensive documentation for all API endpoints, parameters, and responses.
                    </p>
                </div>

                <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                            <Code2 className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Interactive API Documentation</h2>
                            <p className="text-slate-400">Explore and test our APIs in real-time</p>
                        </div>
                    </div>
                    <p className="text-slate-300 mb-6">
                        Visit our interactive API documentation to explore all available endpoints, test requests, and view responses.
                    </p>
                    <a
                        href="https://backend-production-0abc.up.railway.app/docs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-emerald-500 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-400 transition-all"
                    >
                        View API Docs →
                    </a>
                </div>
            </div>
        </div>
    );
}

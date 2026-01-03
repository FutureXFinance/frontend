import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | FutureX Finance",
    description: "Terms and conditions for using FutureX Finance services.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <div className="mb-12">
                    <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-sm font-semibold mb-6">
                        Legal
                    </div>
                    <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
                    <p className="text-slate-400">Last updated: January 3, 2026</p>
                </div>

                <div className="prose prose-invert prose-emerald max-w-none space-y-8">
                    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                        <p className="text-slate-300 leading-relaxed">
                            By accessing and using FutureX Finance services, you accept and agree to be bound by the terms and provision of this agreement.
                        </p>
                    </div>

                    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Permission is granted to temporarily access and use FutureX Finance services for commercial purposes in accordance with your subscription plan.
                        </p>
                    </div>

                    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-4">3. Service Level Agreement</h2>
                        <p className="text-slate-300 leading-relaxed">
                            We commit to maintaining 99.9% uptime for our services. In the event of service interruptions, you may be eligible for service credits as outlined in your subscription agreement.
                        </p>
                    </div>

                    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-4">4. Acceptable Use</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            You agree not to:
                        </p>
                        <ul className="space-y-2 text-slate-300">
                            <li>• Use the service for any illegal purpose</li>
                            <li>• Attempt to gain unauthorized access to our systems</li>
                            <li>• Interfere with or disrupt the service</li>
                            <li>• Reverse engineer or attempt to extract source code</li>
                        </ul>
                    </div>

                    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
                        <p className="text-slate-300 leading-relaxed">
                            FutureX Finance shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
                        </p>
                    </div>

                    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-4">6. Contact</h2>
                        <p className="text-slate-300 leading-relaxed">
                            For questions about these Terms, contact us at{" "}
                            <a href="mailto:legal@futurexfinance.com" className="text-emerald-500 hover:text-emerald-400">
                                legal@futurexfinance.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

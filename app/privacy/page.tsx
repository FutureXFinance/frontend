import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | FutureX Finance",
    description: "Our commitment to protecting your data and privacy.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <div className="mb-12">
                    <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-sm font-semibold mb-6">
                        Legal
                    </div>
                    <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-slate-400">Last updated: January 3, 2026</p>
                </div>

                <div className="prose prose-invert prose-emerald max-w-none">
                    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                        <p className="text-slate-300 leading-relaxed">
                            At FutureX Finance, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
                        </p>
                    </div>

                    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            We collect information that you provide directly to us, including:
                        </p>
                        <ul className="space-y-2 text-slate-300">
                            <li>• Account information (name, email, company details)</li>
                            <li>• Transaction data processed through our APIs</li>
                            <li>• Usage data and analytics</li>
                            <li>• Communication preferences</li>
                        </ul>
                    </div>

                    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 mb-8">
                        <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="space-y-2 text-slate-300">
                            <li>• Provide, maintain, and improve our services</li>
                            <li>• Process transactions and send related information</li>
                            <li>• Send technical notices and support messages</li>
                            <li>• Respond to your comments and questions</li>
                            <li>• Monitor and analyze trends and usage</li>
                        </ul>
                    </div>

                    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                        <p className="text-slate-300 leading-relaxed">
                            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, access controls, and regular security audits.
                        </p>
                    </div>

                    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 mb-8">
                        <h2 className="text-2xl font-bold mb-4">GDPR Compliance</h2>
                        <p className="text-slate-300 leading-relaxed">
                            For users in the European Economic Area (EEA), we comply with the General Data Protection Regulation (GDPR). You have the right to access, correct, delete, or restrict the use of your personal data.
                        </p>
                    </div>

                    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                        <p className="text-slate-300 leading-relaxed">
                            If you have questions about this Privacy Policy, please contact us at{" "}
                            <a href="mailto:privacy@futurexfinance.com" className="text-emerald-500 hover:text-emerald-400">
                                privacy@futurexfinance.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

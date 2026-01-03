import { Metadata } from "next";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us | FutureX Finance",
    description: "Get in touch with FutureX Finance. We're here to help with your AI infrastructure needs.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-sm font-semibold mb-6">
                        Contact Us
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Let's Build Something
                        <br />
                        <span className="bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent">
                            Amazing Together
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Have questions? We're here to help. Reach out to our team and we'll get back to you within 24 hours.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                                <Mail className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h3 className="font-bold mb-2">Email Us</h3>
                            <p className="text-slate-400 text-sm mb-3">Our team is here to help</p>
                            <a href="mailto:hello@futurexfinance.com" className="text-emerald-500 hover:text-emerald-400 transition-colors">
                                hello@futurexfinance.com
                            </a>
                        </div>

                        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                                <Phone className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h3 className="font-bold mb-2">Call Us</h3>
                            <p className="text-slate-400 text-sm mb-3">Mon-Fri 9am-6pm EST</p>
                            <a href="tel:+1234567890" className="text-emerald-500 hover:text-emerald-400 transition-colors">
                                +1 (234) 567-890
                            </a>
                        </div>

                        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                                <MapPin className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h3 className="font-bold mb-2">Visit Us</h3>
                            <p className="text-slate-400 text-sm">
                                123 Financial District
                                <br />
                                New York, NY 10004
                                <br />
                                United States
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-slate-900/50 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="john@company.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Company</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="Your Company"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    rows={6}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                    placeholder="Tell us about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-emerald-500 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                            >
                                Send Message
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

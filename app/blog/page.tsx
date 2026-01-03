import { Metadata } from "next";
import { Calendar, User } from "lucide-react";

export const metadata: Metadata = {
    title: "Blog | FutureX Finance",
    description: "Latest insights and updates from FutureX Finance.",
};

export default function BlogPage() {
    const posts = [
        {
            title: "The Future of AI in Financial Services",
            excerpt: "Exploring how artificial intelligence is transforming the banking industry and what it means for institutions.",
            author: "Sarah Chen",
            date: "Jan 2, 2026",
            category: "AI & ML"
        },
        {
            title: "Building Secure Fraud Detection Systems",
            excerpt: "A deep dive into our approach to real-time fraud detection using ensemble machine learning models.",
            author: "Michael Rodriguez",
            date: "Dec 28, 2025",
            category: "Security"
        },
        {
            title: "Compliance in the Age of Digital Banking",
            excerpt: "How modern financial institutions can maintain regulatory compliance while innovating rapidly.",
            author: "Emily Watson",
            date: "Dec 20, 2025",
            category: "Compliance"
        },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-sm font-semibold mb-6">
                        Blog
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Latest
                        <br />
                        <span className="bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent">
                            Insights
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Thoughts on AI, fintech, and the future of banking.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <article key={index} className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all group cursor-pointer">
                            <div className="text-xs text-emerald-500 font-semibold mb-3">{post.category}</div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-500 transition-colors">{post.title}</h3>
                            <p className="text-slate-400 text-sm mb-4">{post.excerpt}</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                <div className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {post.author}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {post.date}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, AlertCircle, User, Building } from "lucide-react";

export default function SignUpPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        company: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Validate password length
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    full_name: formData.fullName,
                    company: formData.company
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Sign up failed");
            }

            const data = await response.json();

            // Store token in localStorage
            if (data.token) {
                localStorage.setItem("auth_token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
            }

            // Redirect to dashboard
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 pt-32">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3 group">
                        <div className="w-10 h-10">
                            <img
                                src="/logo.png"
                                alt="FutureXFinance Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">
                            FutureX<span className="text-emerald-500">Finance</span>
                        </span>
                    </Link>
                </div>

                {/* Sign Up Card */}
                <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                        <p className="text-slate-400">Get started with FutureX Finance</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-400">{error}</p>
                        </div>
                    )}

                    {/* Sign Up Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name Field */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="you@company.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Company Field */}
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium mb-2">
                                Company (Optional)
                            </label>
                            <div className="relative">
                                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="company"
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="Your Company"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-500 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <p className="mt-8 text-center text-sm text-slate-400">
                        Already have an account?{" "}
                        <Link href="/signin" className="text-emerald-500 hover:text-emerald-400 font-semibold transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>

                {/* Footer Links */}
                <div className="mt-8 flex justify-center gap-6 text-xs text-slate-500">
                    <Link href="/privacy" className="hover:text-emerald-500 transition-colors">
                        Privacy
                    </Link>
                    <Link href="/terms" className="hover:text-emerald-500 transition-colors">
                        Terms
                    </Link>
                    <Link href="/contact" className="hover:text-emerald-500 transition-colors">
                        Contact
                    </Link>
                </div>
            </div>
        </div>
    );
}

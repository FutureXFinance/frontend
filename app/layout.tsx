import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space",
});

export const metadata: Metadata = {
    title: "FutureX Finance | Institutional AI Infrastructure",
    description: "The next-generation AI ecosystem for global banking. Secure, compliant, and engineered for high-performance financial operations.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body
                className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-slate-950 text-slate-50 antialiased`}
            >
                <div className="relative min-h-screen">
                    {/* Background Ambient Glows - Unified Emerald Theme */}
                    <div className="fixed top-0 -left-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none opacity-50"></div>
                    <div className="fixed bottom-0 -right-1/4 w-[600px] h-[600px] bg-emerald-600/5 blur-[150px] rounded-full pointer-events-none opacity-40"></div>

                    <main className="relative z-10">{children}</main>
                </div>
            </body>
        </html>
    );
}

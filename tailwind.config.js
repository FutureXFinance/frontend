/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./styles/**/*.{css,scss}",
    ],
    theme: {
        extend: {
            colors: {
                emerald: {
                    500: "#10b981",
                    400: "#34d399",
                },
                slate: {
                    950: "#020617",
                    900: "#0f172a",
                    800: "#1e293b",
                    700: "#334155",
                    600: "#475569",
                    500: "#64748b",
                    400: "#94a3b8",
                }
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
    ],
}

"use client";

import { useEffect, useState } from "react";

interface Transaction {
    transaction_id: string;
    user_id: string | null;
    amount: number;
    currency: string;
    type: string;
    merchant_category: string;
    merchant_name: string | null;
    timestamp: string;
    is_fraudulent: boolean;
    risk_score: number;
    risk_level: string;
    recommendation: string;
    anomalies: string[];
}

interface TransactionHistoryProps {
    limit?: number;
}

export default function TransactionHistory({ limit = 20 }: TransactionHistoryProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<{
        risk_level?: string;
        is_fraudulent?: boolean;
    }>({});
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetchTransactions();
    }, [filter, page]);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                limit: limit.toString(),
                offset: (page * limit).toString(),
                ...(filter.risk_level && { risk_level: filter.risk_level }),
                ...(filter.is_fraudulent !== undefined && { is_fraudulent: filter.is_fraudulent.toString() })
            });

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/fraud/history?${params}`
            );
            const data = await response.json();
            setTransactions(data.transactions || []);
        } catch (error) {
            console.error("Failed to fetch transaction history:", error);
        } finally {
            setLoading(false);
        }
    };

    const getRiskColor = (level: string) => {
        switch (level) {
            case "CRITICAL": return "rose";
            case "HIGH": return "orange";
            case "MEDIUM": return "amber";
            default: return "emerald";
        }
    };

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-4">
                <select
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium focus:outline-none focus:border-emerald-500/50"
                    value={filter.risk_level || ""}
                    onChange={e => setFilter({ ...filter, risk_level: e.target.value || undefined })}
                >
                    <option value="">All Risk Levels</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                </select>

                <select
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium focus:outline-none focus:border-emerald-500/50"
                    value={filter.is_fraudulent === undefined ? "" : filter.is_fraudulent.toString()}
                    onChange={e => setFilter({
                        ...filter,
                        is_fraudulent: e.target.value === "" ? undefined : e.target.value === "true"
                    })}
                >
                    <option value="">All Transactions</option>
                    <option value="true">Fraudulent Only</option>
                    <option value="false">Legitimate Only</option>
                </select>

                <button
                    onClick={() => setFilter({})}
                    className="px-4 py-2 rounded-xl bg-white/5 text-sm font-medium hover:bg-white/10 transition-all"
                >
                    Clear Filters
                </button>
            </div>

            {/* Table */}
            <div className="card-premium overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto"></div>
                        <p className="text-sm text-slate-500 mt-4">Loading transactions...</p>
                    </div>
                ) : transactions.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-slate-500">No transactions found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Transaction
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Risk Score
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Risk Level
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {transactions.map(tx => {
                                    const color = getRiskColor(tx.risk_level);
                                    return (
                                        <tr key={tx.transaction_id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-mono text-white">
                                                        {tx.transaction_id.slice(0, 8)}...
                                                    </p>
                                                    <p className="text-xs text-slate-500">{tx.merchant_category}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-white">
                                                    ${tx.amount.toLocaleString()}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-slate-400 capitalize">{tx.type}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full bg-${color}-500`}
                                                            style={{ width: `${tx.risk_score}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-bold text-white">{tx.risk_score}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${color}-500/10 text-${color}-500 border border-${color}-500/20`}>
                                                    {tx.risk_level}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${tx.is_fraudulent
                                                        ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                                                        : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                                    }`}>
                                                    {tx.is_fraudulent ? "FRAUD" : "LEGIT"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-slate-400">
                                                    {new Date(tx.timestamp).toLocaleDateString()}
                                                </p>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {!loading && transactions.length > 0 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
                        <button
                            onClick={() => setPage(Math.max(0, page - 1))}
                            disabled={page === 0}
                            className="px-4 py-2 rounded-xl bg-white/5 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-slate-500">Page {page + 1}</span>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={transactions.length < limit}
                            className="px-4 py-2 rounded-xl bg-white/5 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

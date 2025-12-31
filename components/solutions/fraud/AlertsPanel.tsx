"use client";

import { useEffect, useState } from "react";

interface Alert {
    id: string;
    transaction_id: string;
    alert_type: string;
    severity: string;
    message: string;
    status: string;
    created_at: string;
    assigned_to: string | null;
}

export default function AlertsPanel() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("PENDING");

    useEffect(() => {
        fetchAlerts();
    }, [statusFilter]);

    const fetchAlerts = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/fraud/alerts?status=${statusFilter}`
            );
            const data = await response.json();
            setAlerts(data.alerts || []);
        } catch (error) {
            console.error("Failed to fetch alerts:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateAlertStatus = async (alertId: string, newStatus: string) => {
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/fraud/alerts/${alertId}?status=${newStatus}`,
                { method: "PUT" }
            );
            fetchAlerts(); // Refresh list
        } catch (error) {
            console.error("Failed to update alert:", error);
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "CRITICAL": return "rose";
            case "HIGH": return "orange";
            case "MEDIUM": return "amber";
            default: return "emerald";
        }
    };

    return (
        <div className="space-y-6">
            {/* Status Filter */}
            <div className="flex items-center gap-4">
                {["PENDING", "REVIEWING", "RESOLVED"].map(status => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${statusFilter === status
                                ? "bg-emerald-500 text-white"
                                : "bg-white/5 text-slate-500 hover:bg-white/10"
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="card-premium p-12 text-center">
                        <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto"></div>
                        <p className="text-sm text-slate-500 mt-4">Loading alerts...</p>
                    </div>
                ) : alerts.length === 0 ? (
                    <div className="card-premium p-12 text-center">
                        <p className="text-slate-500">No {statusFilter.toLowerCase()} alerts</p>
                    </div>
                ) : (
                    alerts.map(alert => {
                        const color = getSeverityColor(alert.severity);
                        return (
                            <div key={alert.id} className="card-premium p-6 hover:border-emerald-500/20 transition-all">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${color}-500/10 text-${color}-500 border border-${color}-500/20`}>
                                                {alert.severity}
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                {alert.alert_type.replace(/_/g, " ")}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-white mb-2">{alert.message}</p>
                                        <div className="flex items-center gap-4 text-xs text-slate-500">
                                            <span>TX: {alert.transaction_id.slice(0, 8)}...</span>
                                            <span>•</span>
                                            <span>{new Date(alert.created_at).toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    {statusFilter === "PENDING" && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => updateAlertStatus(alert.id, "REVIEWING")}
                                                className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-500 text-xs font-bold hover:bg-amber-500/20 transition-all"
                                            >
                                                Review
                                            </button>
                                            <button
                                                onClick={() => updateAlertStatus(alert.id, "RESOLVED")}
                                                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-bold hover:bg-emerald-500/20 transition-all"
                                            >
                                                Resolve
                                            </button>
                                        </div>
                                    )}

                                    {statusFilter === "REVIEWING" && (
                                        <button
                                            onClick={() => updateAlertStatus(alert.id, "RESOLVED")}
                                            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-bold hover:bg-emerald-500/20 transition-all"
                                        >
                                            Resolve
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

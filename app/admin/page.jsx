'use client'
import { dummyAdminDashboardData } from "@/assets/assets";
import Loading from "@/components/Loading";
import OrdersAreaChart from "@/components/OrdersAreaChart";
import { DollarSign, Package, ShoppingBag, Store, TrendingUp, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        products: 0,
        revenue: 0,
        orders: 0,
        stores: 0,
        allOrders: [],
    });

    const dashboardCardsData = [
        {
            title: 'Platform Gross Revenue',
            value: `${currency}${Number(dashboardData.revenue).toLocaleString()}`,
            change: '+24.6%',
            icon: DollarSign,
            bgLight: 'bg-emerald-50 text-emerald-600 border-emerald-200'
        },
        {
            title: 'Platform Total Orders',
            value: dashboardData.orders,
            change: '+15.2%',
            icon: ShoppingBag,
            bgLight: 'bg-indigo-50 text-indigo-600 border-indigo-200'
        },
        {
            title: 'Registered Stores',
            value: dashboardData.stores,
            change: '100% active',
            icon: Store,
            bgLight: 'bg-cyan-50 text-cyan-600 border-cyan-200'
        },
        {
            title: 'Active Catalog Items',
            value: dashboardData.products,
            change: '+8 this week',
            icon: Package,
            bgLight: 'bg-amber-50 text-amber-600 border-amber-200'
        },
    ];

    const fetchDashboardData = async () => {
        setDashboardData(dummyAdminDashboardData);
        setLoading(false);
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="space-y-8 pb-16">
            
            {/* Header */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full mb-2">
                        <ShieldCheck size={13} /> Master Console
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Platform Operations & Health
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        High-level overview of multi-vendor activity, marketplace sales, and merchant volumes.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/approve"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-4 py-2.5 rounded-2xl transition"
                    >
                        <span>Store Queue</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {dashboardCardsData.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:border-indigo-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    {card.title}
                                </span>
                                <div className={`size-11 rounded-2xl flex items-center justify-center border ${card.bgLight} shadow-xs`}>
                                    <Icon size={20} />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                    {card.value}
                                </h3>
                                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
                                    <TrendingUp size={13} />
                                    <span>{card.change}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Platform Sales Chart Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-100 mb-6">
                    <div>
                        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                            Platform Orders Timeline
                        </h2>
                        <p className="text-xs text-slate-400">Aggregated daily sales transactions across all stores</p>
                    </div>

                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full self-start sm:self-auto">
                        Live Metrics
                    </span>
                </div>

                <OrdersAreaChart allOrders={dashboardData.allOrders} />
            </div>

        </div>
    );
}
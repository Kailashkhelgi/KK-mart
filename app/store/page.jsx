'use client'
import { dummyStoreDashboardData } from "@/assets/assets";
import Loading from "@/components/Loading";
import { DollarSign, Package, ShoppingBag, Star, ArrowUpRight, TrendingUp, Sparkles, Plus, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        totalProducts: 0,
        totalEarnings: 0,
        totalOrders: 0,
        ratings: [],
    });

    const dashboardCardsData = [
        { 
            title: 'Gross Revenue', 
            value: `${currency}${dashboardData.totalEarnings.toLocaleString()}`, 
            change: '+18.4%', 
            icon: DollarSign, 
            gradient: 'from-emerald-500 to-teal-600',
            bgLight: 'bg-emerald-50 text-emerald-600 border-emerald-200' 
        },
        { 
            title: 'Fulfilled Orders', 
            value: dashboardData.totalOrders, 
            change: '+12.5%', 
            icon: ShoppingBag, 
            gradient: 'from-indigo-500 to-indigo-700',
            bgLight: 'bg-indigo-50 text-indigo-600 border-indigo-200' 
        },
        { 
            title: 'Live Catalog Products', 
            value: dashboardData.totalProducts, 
            change: '+3 new', 
            icon: Package, 
            gradient: 'from-cyan-500 to-blue-600',
            bgLight: 'bg-cyan-50 text-cyan-600 border-cyan-200' 
        },
        { 
            title: 'Store Feedback Rating', 
            value: '4.9 / 5.0', 
            change: `${dashboardData.ratings.length} reviews`, 
            icon: Star, 
            gradient: 'from-amber-500 to-orange-600',
            bgLight: 'bg-amber-50 text-amber-600 border-amber-200' 
        },
    ];

    const fetchDashboardData = async () => {
        setDashboardData(dummyStoreDashboardData);
        setLoading(false);
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="space-y-8 pb-16">
            
            {/* Header with Quick Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full mb-2">
                        <Sparkles size={13} /> Merchant Studio
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Store Analytics & Activity
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Track live revenue, buyer feedback, and inventory performance in real-time.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/store/add-product"
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-102 active:scale-98"
                    >
                        <Plus size={16} />
                        <span>Add New Product</span>
                    </Link>
                </div>
            </div>

            {/* Metric KPI Cards Grid */}
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
                                    <span className="text-slate-400 font-normal">vs last month</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Customer Reviews & Feedback Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                    <div>
                        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                            Recent Customer Reviews
                        </h2>
                        <p className="text-xs text-slate-400">Verified buyer ratings on your store products</p>
                    </div>

                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
                        {dashboardData.ratings.length} Reviews Logged
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {dashboardData.ratings.map((review, index) => (
                        <div
                            key={index}
                            className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={review.user.image}
                                            alt={review.user.name}
                                            className="size-10 rounded-full object-cover border border-slate-200"
                                            width={40}
                                            height={40}
                                        />
                                        <div>
                                            <p className="text-xs sm:text-sm font-bold text-slate-900">{review.user.name}</p>
                                            <p className="text-[11px] text-slate-400">{new Date(review.createdAt).toDateString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg text-amber-700 text-xs font-bold">
                                        <Star size={12} fill="#d97706" className="text-amber-500" />
                                        <span>{review.rating}</span>
                                    </div>
                                </div>

                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-4">
                                    "{review.review}"
                                </p>
                            </div>

                            <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                                <div>
                                    <span className="text-[10px] uppercase font-bold text-indigo-600 block">{review.product?.category}</span>
                                    <span className="font-bold text-slate-800 line-clamp-1">{review.product?.name}</span>
                                </div>

                                <button
                                    onClick={() => router.push(`/product/${review.product?.id}`)}
                                    className="p-2 rounded-xl bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 transition"
                                    title="View Product"
                                >
                                    <ExternalLink size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
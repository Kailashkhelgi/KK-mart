'use client'
import { storesDummyData } from "@/assets/assets";
import StoreInfo from "@/components/admin/StoreInfo";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Store, Search, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminStores() {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchStores = async () => {
        setStores(storesDummyData);
        setLoading(false);
    };

    const toggleIsActive = (storeId) => {
        setStores(prev => prev.map(s => {
            if (s.id === storeId) {
                const nextActive = !s.isActive;
                toast.success(`Store "${s.name}" is now ${nextActive ? 'Active & Live' : 'Suspended'}`);
                return { ...s, isActive: nextActive };
            }
            return s;
        }));
    };

    useEffect(() => {
        fetchStores();
    }, []);

    if (loading) return <Loading />;

    const filtered = stores.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-16">
            
            {/* Header */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full mb-2">
                        <Store size={13} /> Multi-Vendor Directory
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Live Merchant Stores
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Oversee registered merchant accounts, activate/suspend storefronts, and inspect profile data.
                    </p>
                </div>

                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-2xl self-start sm:self-auto">
                    Total: <strong>{stores.length}</strong> Registered Stores
                </span>
            </div>

            {/* Search Filter */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <div className="relative max-w-sm">
                    <input
                        type="text"
                        placeholder="Filter stores by name or username..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                </div>
            </div>

            {/* Stores List */}
            {filtered.length > 0 ? (
                <div className="space-y-6">
                    {filtered.map((store) => (
                        <div
                            key={store.id}
                            className="bg-white border border-slate-200/80 rounded-3xl shadow-sm p-6 sm:p-8 flex flex-col lg:flex-row gap-6 lg:items-center justify-between hover:border-indigo-300 transition-all duration-300"
                        >
                            <StoreInfo store={store} />

                            {/* Actions Column */}
                            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 flex-shrink-0">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-slate-600">Store Active:</span>
                                    <button
                                        type="button"
                                        onClick={() => toggleIsActive(store.id)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                                            store.isActive ? 'bg-indigo-600' : 'bg-slate-300'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                                                store.isActive ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>

                                <Link
                                    href={`/shop?search=${encodeURIComponent(store.name)}`}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition"
                                >
                                    <span>Visit Storefront</span>
                                    <ExternalLink size={13} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-800 mb-1">No Stores Found</h3>
                    <p className="text-xs text-slate-400">No stores matched your search query</p>
                </div>
            )}

        </div>
    );
}
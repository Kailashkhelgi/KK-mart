'use client'
import { storesDummyData } from "@/assets/assets";
import StoreInfo from "@/components/admin/StoreInfo";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ShieldAlert, Check, X, Sparkles, CheckCircle2 } from "lucide-react";

export default function AdminApprove() {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStores = async () => {
        // Show stores with pending or simulated review state
        setStores(storesDummyData.map((s, idx) => idx === 0 ? { ...s, status: 'pending' } : s));
        setLoading(false);
    };

    const handleApprove = (storeId, status) => {
        setStores(prev => prev.map(s => s.id === storeId ? { ...s, status } : s));
        toast.success(`Store application marked as ${status.toUpperCase()}!`, {
            style: {
                borderRadius: '12px',
                background: '#0f172a',
                color: '#fff',
                fontSize: '13px'
            },
            icon: status === 'approved' ? '✅' : '❌'
        });
    };

    useEffect(() => {
        fetchStores();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="space-y-8 pb-16">
            
            {/* Header */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full mb-2">
                        <ShieldAlert size={13} /> Onboarding Queue
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Store Approvals & KYC Verification
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Review merchant application credentials, warehouse addresses, and identity profiles.
                    </p>
                </div>

                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-2xl self-start sm:self-auto">
                    {stores.length} Merchant Applications
                </span>
            </div>

            {/* Stores Review Queue */}
            {stores.length > 0 ? (
                <div className="space-y-6">
                    {stores.map((store) => (
                        <div
                            key={store.id}
                            className="bg-white border border-slate-200/80 rounded-3xl shadow-sm p-6 sm:p-8 flex flex-col lg:flex-row gap-6 lg:items-center justify-between hover:border-indigo-300 transition-all duration-300"
                        >
                            <StoreInfo store={store} />

                            {/* Approval CTAs */}
                            <div className="flex items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 flex-shrink-0">
                                <button
                                    onClick={() => handleApprove(store.id, 'approved')}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all hover:scale-102 active:scale-98 cursor-pointer"
                                >
                                    <Check size={14} />
                                    <span>Approve</span>
                                </button>
                                
                                <button
                                    onClick={() => handleApprove(store.id, 'rejected')}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold text-xs transition cursor-pointer"
                                >
                                    <X size={14} />
                                    <span>Reject</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm">
                    <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-slate-800 mb-1">Queue Clear</h3>
                    <p className="text-xs text-slate-400">No merchant applications currently pending review</p>
                </div>
            )}

        </div>
    );
}
'use client'
import Image from "next/image";
import { MapPin, Mail, Phone, Calendar, User, ShieldCheck } from "lucide-react";

const StoreInfo = ({ store }) => {
    return (
        <div className="flex-1 space-y-4 text-xs sm:text-sm">
            {/* Header: Logo, Name, Username, Status */}
            <div className="flex items-start gap-4">
                <div className="size-16 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 p-1 flex-shrink-0">
                    <Image
                        width={64}
                        height={64}
                        src={store.logo}
                        alt={store.name}
                        className="size-full object-contain"
                    />
                </div>

                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-lg font-black text-slate-900">{store.name}</h3>
                        <span className="text-xs text-slate-400 font-mono">@{store.username}</span>
                        
                        {/* Status Badge */}
                        <span
                            className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                                store.status === 'pending'
                                    ? 'bg-amber-100 text-amber-800'
                                    : store.status === 'rejected'
                                    ? 'bg-rose-100 text-rose-800'
                                    : 'bg-emerald-100 text-emerald-800'
                            }`}
                        >
                            {store.status}
                        </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed max-w-2xl">
                        {store.description}
                    </p>
                </div>
            </div>

            {/* Contact & Address Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-indigo-600 flex-shrink-0" />
                    <span className="truncate">{store.address}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Mail size={14} className="text-cyan-600 flex-shrink-0" />
                    <span className="truncate">{store.email}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Phone size={14} className="text-emerald-600 flex-shrink-0" />
                    <span>{store.contact}</span>
                </div>
            </div>

            {/* Owner Footer */}
            <div className="flex items-center justify-between pt-2 text-xs text-slate-400 border-t border-slate-100">
                <div className="flex items-center gap-2">
                    {store.user?.image && (
                        <Image width={24} height={24} src={store.user.image} alt={store.user.name} className="size-6 rounded-full" />
                    )}
                    <span>Owner: <strong className="text-slate-700">{store.user?.name || 'Verified Merchant'}</strong> ({store.user?.email})</span>
                </div>
                <span className="text-[11px]">Applied {new Date(store.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    );
};

export default StoreInfo;
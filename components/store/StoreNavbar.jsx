'use client'
import Link from "next/link";
import { Store, ArrowLeft, ExternalLink, ShieldCheck, Bell } from "lucide-react";
import Image from "next/image";
import { dummyStoreData } from "@/assets/assets";

const StoreNavbar = () => {
    return (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
            {/* Left: Brand & Portal Badge */}
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="size-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white font-black text-xs shadow-md">
                        KK
                    </div>
                    <span className="text-xl font-black tracking-tight text-slate-900">
                        KK<span className="text-indigo-600"> Mart</span>
                    </span>
                </Link>

                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
                    <Store size={13} /> Vendor Studio
                </span>
            </div>

            {/* Right: Store Status & Shortcuts */}
            <div className="flex items-center gap-3 sm:gap-4">
                <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Store Live & Accepting Orders</span>
                </div>

                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 px-3 py-1.5 rounded-xl transition"
                >
                    <ArrowLeft size={14} />
                    <span className="hidden sm:inline">Buyer Storefront</span>
                </Link>

                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                    <div className="size-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                        <Image
                            src={dummyStoreData.logo}
                            alt="Seller"
                            width={32}
                            height={32}
                            className="size-full object-cover"
                        />
                    </div>
                    <span className="hidden sm:inline text-xs font-bold text-slate-800">
                        {dummyStoreData.name}
                    </span>
                </div>
            </div>
        </header>
    );
};

export default StoreNavbar;
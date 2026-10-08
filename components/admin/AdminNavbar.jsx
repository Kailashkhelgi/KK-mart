'use client'
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Bell, Sparkles } from "lucide-react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const AdminNavbar = () => {
    return (
        <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-md">
            {/* Left: Logo & Portal Tag */}
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="size-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-md">
                        KK
                    </div>
                    <span className="text-xl font-black tracking-tight text-white">
                        KK<span className="text-cyan-400"> Mart</span>
                    </span>
                </Link>

                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
                    <ShieldCheck size={13} /> Platform Super-Admin
                </span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-1.5 rounded-xl transition"
                >
                    <ArrowLeft size={14} />
                    <span className="hidden sm:inline">Storefront</span>
                </Link>

                <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                    <div className="size-8 rounded-full overflow-hidden bg-slate-800 border border-slate-700">
                        <Image
                            src={assets.gs_logo}
                            alt="Admin"
                            width={32}
                            height={32}
                            className="size-full object-cover"
                        />
                    </div>
                    <span className="hidden sm:inline text-xs font-bold text-slate-200">
                        Super Admin
                    </span>
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;
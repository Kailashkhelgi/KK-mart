'use client'
import { usePathname } from "next/navigation";
import { LayoutDashboard, Store, ShieldAlert, TicketPercent, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/assets/assets";

const AdminSidebar = () => {
    const pathname = usePathname();

    const sidebarLinks = [
        { name: 'Console Overview', href: '/admin', icon: LayoutDashboard },
        { name: 'Live Stores', href: '/admin/stores', icon: Store },
        { name: 'Store Approvals', href: '/admin/approve', icon: ShieldAlert },
        { name: 'Promo Coupons', href: '/admin/coupons', icon: TicketPercent },
    ];

    return (
        <aside className="w-18 sm:w-64 bg-slate-950 text-slate-300 flex flex-col justify-between flex-shrink-0 min-h-[calc(100vh-61px)] border-r border-slate-800">
            <div>
                {/* Admin Profile Card */}
                <div className="p-4 sm:p-6 border-b border-slate-800/80 flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative size-12 rounded-2xl overflow-hidden bg-slate-900 border-2 border-cyan-500/40 shadow-md flex-shrink-0">
                        <Image
                            className="size-full object-cover"
                            src={assets.gs_logo}
                            alt="Admin Logo"
                            width={48}
                            height={48}
                        />
                    </div>
                    <div className="hidden sm:block min-w-0">
                        <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-white truncate">Platform Admin</h3>
                            <ShieldCheck size={14} className="text-cyan-400 flex-shrink-0" />
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono">root@kkmart.market</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="p-3 space-y-1.5">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                                    isActive
                                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                                }`}
                            >
                                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                                <span className="hidden sm:inline">{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Status Info */}
            <div className="hidden sm:block p-4 m-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>System Operational</span>
                </div>
                <p className="text-[11px] text-slate-400">
                    Next.js Multi-Vendor Engine running v2.5.0
                </p>
            </div>
        </aside>
    );
};

export default AdminSidebar;
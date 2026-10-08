'use client'
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, PackageCheck, ShoppingBag, ShieldCheck, ExternalLink, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const StoreSidebar = ({ storeInfo }) => {
    const pathname = usePathname();

    const sidebarLinks = [
        { name: 'Store Overview', href: '/store', icon: LayoutDashboard },
        { name: 'Add Product', href: '/store/add-product', icon: PlusCircle },
        { name: 'Manage Products', href: '/store/manage-product', icon: PackageCheck },
        { name: 'Store Orders', href: '/store/orders', icon: ShoppingBag },
    ];

    return (
        <aside className="w-18 sm:w-64 bg-slate-900 text-slate-300 flex flex-col justify-between flex-shrink-0 min-h-[calc(100vh-61px)] border-r border-slate-800">
            <div>
                {/* Store Profile Card */}
                <div className="p-4 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative size-12 rounded-2xl overflow-hidden bg-slate-800 border-2 border-indigo-500/50 shadow-md flex-shrink-0">
                        {storeInfo?.logo && (
                            <Image
                                className="size-full object-cover"
                                src={storeInfo.logo}
                                alt="Store Logo"
                                width={48}
                                height={48}
                            />
                        )}
                    </div>
                    <div className="hidden sm:block min-w-0">
                        <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-white truncate">{storeInfo?.name || 'My Store'}</h3>
                            <ShieldCheck size={14} className="text-emerald-400 flex-shrink-0" />
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono truncate">@{storeInfo?.username || 'vendor'}</p>
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
                                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                                }`}
                            >
                                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                                <span className="hidden sm:inline">{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Upgrade Callout */}
            <div className="hidden sm:block p-4 m-3 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/30 text-xs">
                <div className="flex items-center gap-2 text-cyan-300 font-bold mb-1">
                    <Sparkles size={14} />
                    <span>Growth Pro Active</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                    Enjoy 2% lower transaction fees and 24-hr priority payouts.
                </p>
                <Link
                    href="/pricing"
                    className="block text-center py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold text-[11px] transition"
                >
                    View Plan Perks
                </Link>
            </div>
        </aside>
    );
};

export default StoreSidebar;
'use client'
import { Search, ShoppingBag, Store, ShieldCheck, Package, Menu, X, Sparkles, ChevronDown, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { dummyUserData } from "@/assets/assets";

const Navbar = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const cartCount = useSelector(state => state.cart.total);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/shop?search=${encodeURIComponent(search.trim())}`);
            setMobileMenuOpen(false);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full transition-all duration-300">
            {/* Top Announcement & Switcher Bar */}
            <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            <Sparkles size={10} /> Exclusive
                        </span>
                        <span className="hidden sm:inline text-slate-300">Get 20% off with coupon <strong className="text-cyan-400 font-mono">NEW20</strong> at checkout!</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                        <Link href="/pricing" className="hover:text-cyan-400 transition flex items-center gap-1">
                            <Store size={13} /> Seller Plans
                        </Link>
                        <span className="text-slate-700">|</span>
                        <Link href="/store" className="hover:text-cyan-400 transition flex items-center gap-1">
                            <Store size={13} /> Vendor Portal
                        </Link>
                        <span className="text-slate-700">|</span>
                        <Link href="/admin" className="hover:text-indigo-400 transition flex items-center gap-1">
                            <ShieldCheck size={13} /> Admin Panel
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className={`transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-md py-3 border-b border-slate-200/80' : 'bg-white py-4 border-b border-slate-100'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
                    
                    {/* Brand Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="size-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                            KK
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                                <span className="text-2xl font-black tracking-tight text-slate-900">
                                    KK<span className="text-indigo-600"> Mart</span>
                                </span>
                                <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-[10px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    PLUS
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md items-center relative">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search gadgets, watches, audio, gear..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder-slate-400 text-sm rounded-full pl-11 pr-24 py-2.5 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                            />
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <button
                                type="submit"
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all shadow-sm"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Navigation Actions */}
                    <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
                        <Link href="/" className="hover:text-indigo-600 transition">
                            Home
                        </Link>
                        <Link href="/shop" className="hover:text-indigo-600 transition flex items-center gap-1">
                            Catalog
                        </Link>
                        <Link href="/orders" className="hover:text-indigo-600 transition flex items-center gap-1">
                            <Package size={16} /> My Orders
                        </Link>
                        <Link href="/create-store" className="hover:text-indigo-600 transition flex items-center gap-1">
                            <Store size={16} /> Open Store
                        </Link>
                    </div>

                    {/* User Profile & Cart Buttons */}
                    <div className="flex items-center gap-3">
                        {/* Cart Button */}
                        <Link
                            href="/cart"
                            className="relative flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 transition-all border border-slate-200/80 group"
                        >
                            <div className="relative">
                                <ShoppingBag size={19} className="group-hover:scale-110 transition-transform" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2.5 bg-gradient-to-r from-rose-500 to-indigo-600 text-white text-[11px] font-bold size-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="hidden sm:inline text-xs font-semibold">Cart</span>
                        </Link>

                        {/* Account Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all shadow-md"
                            >
                                <div className="size-6 rounded-full overflow-hidden bg-indigo-500 relative flex items-center justify-center">
                                    <Image src={dummyUserData.image} alt="User" width={24} height={24} className="object-cover" />
                                </div>
                                <span className="hidden sm:inline">{dummyUserData.name}</span>
                                <ChevronDown size={14} className="hidden sm:inline text-slate-400" />
                            </button>

                            {/* Dropdown Menu */}
                            {profileDropdownOpen && (
                                <div 
                                    className="absolute right-0 mt-2 w-56 rounded-2xl glass-dropdown p-2 text-slate-700 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                                    onClick={() => setProfileDropdownOpen(false)}
                                >
                                    <div className="px-3 py-2 border-b border-slate-100">
                                        <p className="text-xs text-slate-400">Signed in as</p>
                                        <p className="text-sm font-bold text-slate-900 truncate">{dummyUserData.email}</p>
                                    </div>
                                    <div className="py-1">
                                        <Link href="/orders" className="flex items-center gap-2 px-3 py-2 text-xs rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition">
                                            <Package size={15} /> Order History
                                        </Link>
                                        <Link href="/shop" className="flex items-center gap-2 px-3 py-2 text-xs rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition">
                                            <ShoppingBag size={15} /> Shop Products
                                        </Link>
                                        <Link href="/store" className="flex items-center gap-2 px-3 py-2 text-xs rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition">
                                            <Store size={15} /> Vendor Dashboard
                                        </Link>
                                        <Link href="/admin" className="flex items-center gap-2 px-3 py-2 text-xs rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition">
                                            <ShieldCheck size={15} /> Admin Console
                                        </Link>
                                    </div>
                                    <div className="border-t border-slate-100 pt-1">
                                        <Link href="/pricing" className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50/70 rounded-xl hover:bg-indigo-100/70 transition">
                                            <span>Upgrade to Pro</span>
                                            <ArrowRight size={13} />
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
                        >
                            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden px-4 pt-3 pb-6 bg-white border-b border-slate-200 animate-in slide-in-from-top duration-200">
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-slate-100 text-slate-900 text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none border border-slate-200"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            </div>
                        </form>
                        <div className="flex flex-col gap-2 font-medium text-slate-700 text-sm">
                            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100">
                                Home
                            </Link>
                            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100">
                                Explore Shop
                            </Link>
                            <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100">
                                My Orders
                            </Link>
                            <Link href="/create-store" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100">
                                Become a Seller
                            </Link>
                            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100">
                                Pricing & Plans
                            </Link>
                            <div className="border-t border-slate-100 pt-2 flex flex-col gap-1">
                                <Link href="/store" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl bg-slate-50 text-indigo-600 font-semibold flex items-center justify-between">
                                    <span>Vendor Dashboard</span>
                                    <Store size={16} />
                                </Link>
                                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl bg-slate-50 text-slate-900 font-semibold flex items-center justify-between">
                                    <span>Admin Panel</span>
                                    <ShieldCheck size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
'use client'
import Link from "next/link";
import { Mail, Phone, MapPin, Store, ShieldCheck, Heart, Sparkles } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
                
                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
                            <div className="size-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-black text-sm shadow-lg">
                                KK
                            </div>
                            <span className="text-2xl font-black text-white tracking-tight">
                                KK<span className="text-indigo-400"> Mart</span>
                                <span className="text-cyan-400">.</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                            The premier open multi-vendor marketplace for high-performance audio, premium wearables, smart home tech, and lifestyle gadgets.
                        </p>
                        
                        <div className="flex flex-col gap-2.5 text-xs text-slate-400">
                            <div className="flex items-center gap-2.5">
                                <MapPin size={15} className="text-indigo-400 flex-shrink-0" />
                                <span>794 Francisco Ave, Suite 94102, New York, US</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone size={15} className="text-cyan-400 flex-shrink-0" />
                                <span>+1 (800) 555-KKMART</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail size={15} className="text-emerald-400 flex-shrink-0" />
                                <span>support@kkmart.market</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
                            Marketplace
                        </h4>
                        <ul className="space-y-2.5 text-xs">
                            <li><Link href="/shop" className="hover:text-cyan-400 transition">All Products</Link></li>
                            <li><Link href="/shop?search=Headphones" className="hover:text-cyan-400 transition">Headphones & Audio</Link></li>
                            <li><Link href="/shop?search=Watch" className="hover:text-cyan-400 transition">Smart Watches</Link></li>
                            <li><Link href="/shop?search=Speakers" className="hover:text-cyan-400 transition">Hi-Fi Speakers</Link></li>
                            <li><Link href="/shop?search=Mouse" className="hover:text-cyan-400 transition">Gaming Peripherals</Link></li>
                        </ul>
                    </div>

                    {/* Vendor Links */}
                    <div>
                        <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
                            Sellers & Stores
                        </h4>
                        <ul className="space-y-2.5 text-xs">
                            <li>
                                <Link href="/create-store" className="hover:text-indigo-400 transition flex items-center gap-1.5 text-indigo-400 font-semibold">
                                    <Store size={13} /> Open a Store
                                </Link>
                            </li>
                            <li><Link href="/pricing" className="hover:text-cyan-400 transition">Seller Plans & Pricing</Link></li>
                            <li><Link href="/store" className="hover:text-cyan-400 transition">Vendor Dashboard</Link></li>
                            <li><Link href="/store/add-product" className="hover:text-cyan-400 transition">Add New Product</Link></li>
                            <li><Link href="/admin" className="hover:text-cyan-400 transition">Admin Console</Link></li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
                            Customer Care
                        </h4>
                        <ul className="space-y-2.5 text-xs">
                            <li><Link href="/orders" className="hover:text-cyan-400 transition">Track Your Order</Link></li>
                            <li><Link href="/cart" className="hover:text-cyan-400 transition">View Shopping Cart</Link></li>
                            <li><Link href="/" className="hover:text-cyan-400 transition">Return Policy (7 Days)</Link></li>
                            <li><Link href="/" className="hover:text-cyan-400 transition">Terms of Service</Link></li>
                            <li><Link href="/" className="hover:text-cyan-400 transition">Privacy Policy</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} KK Mart Plus Platform. All rights reserved.</p>
                    
                    <div className="flex items-center gap-4 text-slate-400">
                        <span className="flex items-center gap-1">
                            <ShieldCheck size={14} className="text-emerald-400" /> SSL 256-bit Encrypted
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <Sparkles size={14} className="text-indigo-400" /> Multi-Vendor Next.js Engine
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
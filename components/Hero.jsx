'use client'
import { assets } from '@/assets/assets';
import { ArrowRight, Sparkles, ShieldCheck, Zap, TrendingUp, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CategoriesMarquee from './CategoriesMarquee';

const Hero = () => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    return (
        <section className="px-4 sm:px-6 py-4">
            <div className="max-w-7xl mx-auto">
                {/* Hero Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    
                    {/* Main High-Impact Hero Banner (8 Cols) */}
                    <div className="lg:col-span-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-12 flex flex-col justify-between shadow-2xl border border-slate-800 group">
                        
                        {/* Ambient Glow Background Effects */}
                        <div className="absolute -top-24 -left-24 size-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
                        
                        {/* Content Container */}
                        <div className="relative z-10 max-w-xl">
                            {/* Pill Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-cyan-300 mb-6 shadow-inner">
                                <span className="flex size-2 rounded-full bg-cyan-400 animate-ping" />
                                <Sparkles size={14} className="text-cyan-400" />
                                <span>Multi-Vendor Tech & Lifestyle Collection</span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5">
                                Next-Gen Tech. <br />
                                <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                                    Prices You Trust.
                                </span>
                            </h1>

                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
                                Discover thousands of verified products from independent stores worldwide. Premium acoustics, wearables, smart gadgets & workspace essentials.
                            </p>

                            {/* Price Callout & Action Buttons */}
                            <div className="flex flex-wrap items-center gap-6">
                                <div>
                                    <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider block">Deals starting at</span>
                                    <span className="text-3xl sm:text-4xl font-black text-white flex items-baseline gap-1">
                                        <span className="text-cyan-400 text-2xl font-bold">{currency}</span>29.00
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Link
                                        href="/shop"
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all"
                                    >
                                        <span>Explore Catalog</span>
                                        <ArrowRight size={18} />
                                    </Link>
                                    <Link
                                        href="/pricing"
                                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-5 py-3.5 rounded-2xl border border-white/15 backdrop-blur-md transition-all"
                                    >
                                        <span>Sell With Us</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Trust Perks */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-10 pt-8 border-t border-slate-800/80 text-xs text-slate-300">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-emerald-400" />
                                    <span>Verified Stores</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap size={16} className="text-amber-400" />
                                    <span>Fast Delivery</span>
                                </div>
                                <div className="hidden sm:flex items-center gap-2">
                                    <Star size={16} className="text-indigo-400" />
                                    <span>4.9/5 Platform Rating</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Model Image with Floating Card Overlay */}
                        <div className="hidden sm:block absolute right-0 bottom-0 max-w-sm pointer-events-none">
                            <Image 
                                src={assets.hero_model_img} 
                                alt="KK Mart Showcase" 
                                className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transform group-hover:scale-105 transition-transform duration-700" 
                                priority
                            />
                        </div>
                    </div>

                    {/* Side Cards (4 Cols) */}
                    <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-6">
                        
                        {/* Promo Card 1: Best Products / Speakers */}
                        <Link 
                            href="/shop?search=Speakers"
                            className="flex-1 relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 p-6 flex items-center justify-between group hover:border-amber-400 hover:shadow-xl transition-all duration-300 bg-white"
                        >
                            <div className="relative z-10">
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-2.5 py-0.5 rounded-full mb-2">
                                    <TrendingUp size={12} /> Hot Picks
                                </span>
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                                    Acoustic & Audio
                                </h3>
                                <p className="text-xs text-slate-500 mt-1 mb-3">Hi-Fi Speakers & Soundbars</p>
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-800 group-hover:text-amber-600">
                                    Shop audio <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                            <div className="relative size-28 sm:size-32 flex-shrink-0">
                                <Image 
                                    src={assets.hero_product_img1} 
                                    alt="Speakers" 
                                    className="object-contain w-full h-full drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                        </Link>

                        {/* Promo Card 2: 20% Off Smart Wearables */}
                        <Link 
                            href="/shop?search=Watch"
                            className="flex-1 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/10 via-cyan-500/5 to-transparent border border-indigo-500/20 p-6 flex items-center justify-between group hover:border-indigo-400 hover:shadow-xl transition-all duration-300 bg-white"
                        >
                            <div className="relative z-10">
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-100 px-2.5 py-0.5 rounded-full mb-2">
                                    <Sparkles size={12} /> Save 20%
                                </span>
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                    Smart Wearables
                                </h3>
                                <p className="text-xs text-slate-500 mt-1 mb-3">Next-gen smart watches</p>
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-800 group-hover:text-indigo-600">
                                    Explore watches <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                            <div className="relative size-28 sm:size-32 flex-shrink-0">
                                <Image 
                                    src={assets.hero_product_img2} 
                                    alt="Smart Watch" 
                                    className="object-contain w-full h-full drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                        </Link>

                    </div>
                </div>

                {/* Categories Marquee Strip */}
                <CategoriesMarquee />
            </div>
        </section>
    );
};

export default Hero;
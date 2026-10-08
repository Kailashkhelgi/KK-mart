'use client'
import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setIsSubscribed(true);
            toast.success('Thank you for subscribing! Your 20% coupon is NEW20.', {
                style: {
                    borderRadius: '12px',
                    background: '#0f172a',
                    color: '#fff',
                    fontSize: '13px'
                },
                icon: '🎉'
            });
            setEmail('');
        }
    };

    return (
        <section className="px-4 sm:px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 p-8 sm:p-14 text-white shadow-2xl border border-indigo-500/20">
                    
                    {/* Background glow meshes */}
                    <div className="absolute top-0 right-0 size-80 bg-cyan-500/15 blur-3xl pointer-events-none rounded-full" />
                    <div className="absolute bottom-0 left-0 size-80 bg-indigo-500/20 blur-3xl pointer-events-none rounded-full" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                        {/* Text Info */}
                        <div className="max-w-xl text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-400/30">
                                <Sparkles size={13} />
                                <span>VIP Member Deals</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
                                Get 20% Off Your First Order
                            </h2>
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                Join our community of 50,000+ tech lovers. Receive secret drop alerts, flash vouchers, and early access to limited edition gear.
                            </p>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-4 text-xs text-slate-300">
                                <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-400" /> No spam guaranteed</span>
                                <span className="flex items-center gap-1.5"><ShieldCheck size={15} className="text-cyan-400" /> Unsubscribe anytime</span>
                            </div>
                        </div>

                        {/* Input Box */}
                        <div className="w-full lg:max-w-md">
                            <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row items-stretch gap-2 bg-white/10 backdrop-blur-xl p-2 rounded-2xl border border-white/20 shadow-2xl">
                                <input
                                    type="email"
                                    placeholder="Enter your email address..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-transparent text-white placeholder-slate-400 text-sm px-4 py-3 outline-none focus:ring-0"
                                />
                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
                                >
                                    <span>Get Code</span>
                                    <Send size={15} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
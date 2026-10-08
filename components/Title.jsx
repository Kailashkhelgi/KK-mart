'use client'
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Title = ({ title, description, visibleButton = true, href = '/shop' }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80">
            <div>
                <div className="flex items-center gap-2 mb-1.5">
                    <span className="size-2 rounded-full bg-indigo-600" />
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Curated Marketplace</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {title}
                </h2>
                {description && (
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                        {description}
                    </p>
                )}
            </div>

            {visibleButton && href && (
                <Link
                    href={href}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-full transition-all group self-start sm:self-auto"
                >
                    <span>Explore All</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            )}
        </div>
    );
};

export default Title;
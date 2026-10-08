'use client'
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const PageTitle = ({ heading, text, path = "/shop", linkText = "Continue Shopping" }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-slate-200/80 mb-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {heading}
                </h1>
                {text && <p className="text-xs sm:text-sm text-slate-500 mt-1">{text}</p>}
            </div>

            {linkText && (
                <Link
                    href={path}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-full transition-all group self-start sm:self-auto"
                >
                    <span>{linkText}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            )}
        </div>
    );
};

export default PageTitle;
'use client'
import { categories } from "@/assets/assets";
import { useRouter } from "next/navigation";
import { Headphones, Speaker, Watch, Radio, Mouse, Sparkles, Tag } from "lucide-react";

const getCategoryIcon = (cat) => {
    switch (cat.toLowerCase()) {
        case 'headphones': return Headphones;
        case 'speakers': return Speaker;
        case 'watch': return Watch;
        case 'earbuds': return Radio;
        case 'mouse': return Mouse;
        case 'decoration': return Sparkles;
        default: return Tag;
    }
};

const CategoriesMarquee = () => {
    const router = useRouter();

    const handleCategoryClick = (category) => {
        router.push(`/shop?search=${encodeURIComponent(category)}`);
    };

    return (
        <div className="relative max-w-7xl mx-auto overflow-hidden select-none my-8 sm:my-16 py-2">
            <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-indigo-600 animate-ping" />
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">Trending Departments</h3>
                </div>
                <button 
                    onClick={() => router.push('/shop')} 
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
                >
                    View All Categories &rarr;
                </button>
            </div>

            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-slate-50 via-indigo-50/30 to-slate-50 border border-slate-200/80 p-3">
                <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-r from-slate-50 to-transparent" />
                
                <div className="flex min-w-[200%] animate-[marqueeScroll_30s_linear_infinite] group-hover:[animation-play-state:paused] gap-3">
                    {[...categories, ...categories, ...categories, ...categories].map((category, index) => {
                        const Icon = getCategoryIcon(category);
                        return (
                            <button
                                key={index}
                                onClick={() => handleCategoryClick(category)}
                                className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-xl text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200/90 shadow-sm hover:border-indigo-400 hover:text-indigo-600 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200 whitespace-nowrap cursor-pointer"
                            >
                                <div className="size-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <Icon size={14} />
                                </div>
                                <span>{category}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-l from-slate-50 to-transparent" />
            </div>
        </div>
    );
};

export default CategoriesMarquee;
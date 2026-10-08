'use client'
import { Suspense, useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { ArrowLeft, Search, SlidersHorizontal, Sparkles, Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { categories } from "@/assets/assets";

function ShopContent() {
    const searchParams = useSearchParams();
    const search = searchParams.get('search') || '';
    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState(
        categories.find(c => c.toLowerCase() === search.toLowerCase()) || 'All'
    );
    const [sortBy, setSortBy] = useState('featured');
    const [priceRange, setPriceRange] = useState(300);

    const products = useSelector(state => state.product.list);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let list = [...products];

        // Search query filter
        if (search) {
            list = list.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.category?.toLowerCase().includes(search.toLowerCase()) ||
                p.description?.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Category filter if not 'All'
        if (selectedCategory && selectedCategory !== 'All') {
            list = list.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());
        }

        // Price Filter
        list = list.filter(p => p.price <= priceRange);

        // Sorting
        if (sortBy === 'price-low') {
            list.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            list.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            list.sort((a, b) => (b.rating?.length || 0) - (a.rating?.length || 0));
        } else if (sortBy === 'newest') {
            list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return list;
    }, [products, search, selectedCategory, sortBy, priceRange]);

    const handleClearFilter = () => {
        setSelectedCategory('All');
        setPriceRange(300);
        setSortBy('featured');
        router.push('/shop');
    };

    return (
        <div className="min-h-[80vh] px-4 sm:px-6 py-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white mb-8 border border-slate-800 shadow-xl">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
                                <Sparkles size={14} /> Catalog Collection
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                                {search ? `Results for "${search}"` : 'All Products'}
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-300 mt-1">
                                Showing {filteredProducts.length} verified products across all vendor stores
                            </p>
                        </div>

                        {search && (
                            <button
                                onClick={handleClearFilter}
                                className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-full backdrop-blur-md border border-white/20 transition-all self-start"
                            >
                                <ArrowLeft size={14} /> View Full Catalog
                            </button>
                        )}
                    </div>
                </div>

                {/* Filters & Sorting Bar */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm mb-8">
                    
                    {/* Category Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-slate-100 mb-4">
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                selectedCategory === 'All'
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                        >
                            All Categories
                        </button>
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                    selectedCategory === cat
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Secondary Controls: Sorting & Price Filter */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Price Range Slider */}
                        <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
                            <span>Max Price: <strong className="text-indigo-600">${priceRange}</strong></span>
                            <input
                                type="range"
                                min="20"
                                max="300"
                                step="10"
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="accent-indigo-600 cursor-pointer w-28 sm:w-36"
                            />
                        </div>

                        {/* Sort Selector */}
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                            <span className="text-slate-400">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-indigo-500"
                            >
                                <option value="featured">Featured First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                                <option value="newest">Newest Arrivals</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 mb-20 p-8">
                        <div className="size-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                            <Search size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No matching products found</h3>
                        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
                            We couldn't find any items matching your current filters. Try changing your search keywords or reset filters.
                        </p>
                        <button
                            onClick={handleClearFilter}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-full transition-all shadow-md"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}

export default function Shop() {
    return (
        <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center text-slate-400">Loading catalog...</div>}>
            <ShopContent />
        </Suspense>
    );
}
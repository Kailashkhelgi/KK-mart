'use client'
import { Star, ShoppingBag, Eye, Heart, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/features/cart/cartSlice';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Calculate rating
    const ratingCount = product.rating?.length || 0;
    const avgRating = ratingCount > 0 
        ? (product.rating.reduce((acc, curr) => acc + (curr.rating || 0), 0) / ratingCount).toFixed(1)
        : "5.0";

    // Calculate discount percent
    const discountPercent = product.mrp && product.mrp > product.price 
        ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
        : 0;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart({ productId: product.id }));
        toast.success(`Added ${product.name} to cart!`, {
            style: {
                borderRadius: '12px',
                background: '#0f172a',
                color: '#fff',
                fontSize: '13px',
                fontWeight: '600'
            },
            icon: '🛍️'
        });
    };

    const handleToggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
        toast(isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist!', {
            icon: isWishlisted ? '💔' : '❤️',
            style: {
                borderRadius: '12px',
                background: '#0f172a',
                color: '#fff',
                fontSize: '13px'
            }
        });
    };

    return (
        <div className="group relative flex flex-col justify-between bg-white rounded-3xl p-3.5 sm:p-4 border border-slate-200/80 hover:border-indigo-300 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.18)] transition-all duration-300 w-full">
            
            {/* Top Badges & Actions */}
            <div className="relative w-full aspect-square bg-gradient-to-b from-slate-50 to-slate-100/70 rounded-2xl overflow-hidden flex items-center justify-center p-4">
                
                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5 pointer-events-none">
                    {discountPercent > 0 && (
                        <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                            -{discountPercent}%
                        </span>
                    )}
                    {product.category && (
                        <span className="bg-white/90 backdrop-blur-md text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200/60 shadow-xs">
                            {product.category}
                        </span>
                    )}
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={handleToggleWishlist}
                    className="absolute top-2.5 right-2.5 z-10 size-8 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-rose-500 hover:scale-110 active:scale-95 transition-all shadow-xs"
                    title="Add to Wishlist"
                >
                    <Heart size={15} fill={isWishlisted ? '#f43f5e' : 'none'} className={isWishlisted ? 'text-rose-500' : ''} />
                </button>

                {/* Product Image */}
                <Link href={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
                    <Image
                        width={400}
                        height={400}
                        className="object-contain max-h-36 sm:max-h-44 w-auto transform group-hover:scale-108 transition-transform duration-500"
                        src={product.images[0]}
                        alt={product.name}
                    />
                </Link>

                {/* Quick Add Overlay on Hover */}
                <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto">
                    <button
                        onClick={handleAddToCart}
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-900/90 hover:bg-indigo-600 backdrop-blur-md text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
                    >
                        <ShoppingBag size={14} />
                        <span>Quick Add</span>
                    </button>
                </div>
            </div>

            {/* Product Meta Info */}
            <div className="pt-3.5 flex flex-col flex-grow justify-between">
                <div>
                    {/* Store / Rating Row */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                        <span className="truncate max-w-[130px] font-medium text-slate-400">
                            {product.store?.name || 'Verified Seller'}
                        </span>
                        <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-md text-amber-700 font-bold text-[11px]">
                            <Star size={11} fill="#d97706" className="text-amber-600" />
                            <span>{avgRating}</span>
                        </div>
                    </div>

                    {/* Product Title */}
                    <Link href={`/product/${product.id}`} className="block">
                        <h3 className="text-sm font-bold text-slate-800 hover:text-indigo-600 line-clamp-1 transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                {/* Pricing & Add Row */}
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100">
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-lg font-black text-slate-900">
                                {currency}{product.price}
                            </span>
                            {product.mrp && product.mrp > product.price && (
                                <span className="text-xs text-slate-400 line-through">
                                    {currency}{product.mrp}
                                </span>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="size-8 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs active:scale-90"
                        title="Add to cart"
                    >
                        <ShoppingBag size={15} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
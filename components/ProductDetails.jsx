'use client'
import { addToCart } from "@/lib/features/cart/cartSlice";
import { Star, ShieldCheck, Truck, RefreshCw, Zap, Store, ShoppingBag, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";
import RatingModal from "./RatingModal";
import toast from "react-hot-toast";
import Link from "next/link";

const ProductDetails = ({ product }) => {
    const productId = product.id;
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const cart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    const router = useRouter();

    const [mainImage, setMainImage] = useState(product.images[0]);
    const [ratingModalOpen, setRatingModalOpen] = useState(false);

    const addToCartHandler = () => {
        dispatch(addToCart({ productId }));
        toast.success(`Added ${product.name} to cart!`, {
            style: {
                borderRadius: '12px',
                background: '#0f172a',
                color: '#fff',
                fontSize: '13px'
            },
            icon: '🛍️'
        });
    };

    const handleBuyNow = () => {
        if (!cart[productId]) {
            dispatch(addToCart({ productId }));
        }
        router.push('/cart');
    };

    const ratingCount = product.rating?.length || 0;
    const averageRating = ratingCount > 0
        ? (product.rating.reduce((acc, item) => acc + (item.rating || 0), 0) / ratingCount).toFixed(1)
        : "5.0";

    const discountPercent = product.mrp && product.mrp > product.price
        ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
        : 0;

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Images Gallery Viewport (6 Cols) */}
                <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
                    {/* Thumbnails */}
                    {product.images?.length > 1 && (
                        <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setMainImage(image)}
                                    className={`size-20 sm:size-22 rounded-2xl p-2 bg-slate-50 border-2 transition-all flex items-center justify-center flex-shrink-0 cursor-pointer ${
                                        mainImage === image
                                            ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/30'
                                            : 'border-slate-200 hover:border-slate-300'
                                    }`}
                                >
                                    <Image
                                        src={image}
                                        alt=""
                                        width={60}
                                        height={60}
                                        className="object-contain max-h-16 w-auto"
                                    />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Main Showcase Image */}
                    <div className="flex-1 bg-gradient-to-b from-slate-50 to-slate-100/60 rounded-3xl p-8 flex items-center justify-center min-h-[350px] sm:min-h-[420px] relative border border-slate-200/60 group">
                        {discountPercent > 0 && (
                            <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                Save {discountPercent}%
                            </span>
                        )}
                        <Image
                            src={mainImage}
                            alt={product.name}
                            width={380}
                            height={380}
                            className="object-contain max-h-80 w-auto group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                            priority
                        />
                    </div>
                </div>

                {/* Product Meta & Purchase Panel (6 Cols) */}
                <div className="lg:col-span-6 flex flex-col">
                    
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between gap-4 mb-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                            {product.category || 'Featured'}
                        </span>
                        
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full text-amber-700 font-bold text-xs">
                                <Star size={13} fill="#d97706" className="text-amber-600" />
                                <span>{averageRating}</span>
                            </div>
                            <button
                                onClick={() => setRatingModalOpen(true)}
                                className="text-xs text-slate-500 hover:text-indigo-600 underline font-medium cursor-pointer"
                            >
                                ({ratingCount} Reviews)
                            </button>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-3">
                        {product.name}
                    </h1>

                    {/* Price Block */}
                    <div className="flex items-baseline gap-3 my-4">
                        <span className="text-3xl sm:text-4xl font-black text-slate-900">
                            {currency}{product.price}
                        </span>
                        {product.mrp && product.mrp > product.price && (
                            <span className="text-lg text-slate-400 line-through">
                                {currency}{product.mrp}
                            </span>
                        )}
                        {discountPercent > 0 && (
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                                Save {currency}{(product.mrp - product.price).toFixed(2)}
                            </span>
                        )}
                    </div>

                    {/* In Stock Badge */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-6">
                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>In Stock & Ready to Ship</span>
                    </div>

                    {/* Quantity & Action CTAs */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                        {cart[productId] && (
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Cart Quantity:</span>
                                <Counter productId={productId} />
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row items-stretch gap-3">
                            <button
                                onClick={addToCartHandler}
                                className="flex-1 py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-102 active:scale-98 cursor-pointer"
                            >
                                <ShoppingBag size={18} />
                                <span>{cart[productId] ? 'Add More to Cart' : 'Add to Cart'}</span>
                            </button>
                            
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all hover:scale-102 active:scale-98 cursor-pointer"
                            >
                                <Zap size={18} />
                                <span>Buy Now</span>
                            </button>
                        </div>
                    </div>

                    {/* Vendor Mini-Card */}
                    {product.store && (
                        <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {product.store.logo && (
                                    <Image
                                        src={product.store.logo}
                                        alt={product.store.name}
                                        width={40}
                                        height={40}
                                        className="size-10 rounded-xl object-cover border border-slate-200"
                                    />
                                )}
                                <div>
                                    <p className="text-xs text-slate-400 font-medium">Sold & Fulfilled by</p>
                                    <p className="text-sm font-bold text-slate-800">{product.store.name}</p>
                                </div>
                            </div>
                            <Link
                                href={`/shop?search=${encodeURIComponent(product.store.name)}`}
                                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                            >
                                <span>Store Page</span>
                                <ArrowRight size={13} />
                            </Link>
                        </div>
                    )}

                    {/* Trust Perks */}
                    <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-100 text-xs text-slate-600 font-medium">
                        <div className="flex items-center gap-2">
                            <Truck size={16} className="text-indigo-600" />
                            <span>Free Express Delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <RefreshCw size={16} className="text-emerald-600" />
                            <span>7-Day Easy Returns</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className="text-cyan-600" />
                            <span>100% Buyer Protection</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap size={16} className="text-amber-500" />
                            <span>Instant Dispatch</span>
                        </div>
                    </div>

                </div>

            </div>

            {/* Rating Modal */}
            {ratingModalOpen && (
                <RatingModal
                    ratingModal={ratingModalOpen}
                    setRatingModal={setRatingModalOpen}
                    productId={productId}
                    productName={product.name}
                />
            )}
        </div>
    );
};

export default ProductDetails;
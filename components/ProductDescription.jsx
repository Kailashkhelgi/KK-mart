'use client'
import { ArrowRight, Star, Sparkles, MessageSquare, Store, ShieldCheck, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import RatingModal from "./RatingModal";
import { useSelector } from "react-redux";

const ProductDescription = ({ product }) => {
    const [selectedTab, setSelectedTab] = useState('Description');
    const [ratingModalOpen, setRatingModalOpen] = useState(false);
    
    // Get real-time added ratings from Redux if any
    const reduxRatings = useSelector(state => state.rating.ratings) || [];
    const productReduxRatings = reduxRatings.filter(r => r.productId === product.id);
    const allReviews = [...productReduxRatings, ...(product.rating || [])];

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-16">
            
            {/* Tabs Bar */}
            <div className="flex items-center gap-4 border-b border-slate-200 pb-4 mb-8 overflow-x-auto">
                {['Description', 'Specifications & Reviews', 'Vendor Information'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                            selectedTab === tab
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                    >
                        {tab} {tab.includes('Reviews') && `(${allReviews.length})`}
                    </button>
                ))}
            </div>

            {/* Description Tab Content */}
            {selectedTab === "Description" && (
                <div className="space-y-6 max-w-4xl text-slate-700 leading-relaxed text-sm sm:text-base">
                    <div className="p-6 rounded-2xl bg-indigo-50/40 border border-indigo-100 mb-6">
                        <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <Sparkles size={18} className="text-indigo-600" />
                            Product Highlights
                        </h3>
                        <p className="text-slate-600 text-sm">{product.description}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                            <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <strong className="text-slate-900 block font-bold">Premium Build</strong>
                                <span className="text-slate-500">Crafted from grade-A materials with rigorous multi-stage quality control.</span>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                            <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <strong className="text-slate-900 block font-bold">Official Store Warranty</strong>
                                <span className="text-slate-500">Includes direct manufacturer warranty and dedicated customer service.</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews & Specs Tab */}
            {selectedTab === "Specifications & Reviews" && (
                <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Customer Ratings & Feedback</h3>
                            <p className="text-xs text-slate-500">Real feedback from verified purchasers</p>
                        </div>
                        <button
                            onClick={() => setRatingModalOpen(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-full transition shadow-md self-start sm:self-auto cursor-pointer"
                        >
                            Write a Review
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {allReviews.map((item, index) => (
                            <div key={index} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <div className="flex items-center gap-3">
                                            {item.user?.image ? (
                                                <Image src={item.user.image} alt={item.user?.name || "User"} className="size-10 rounded-full object-cover border border-slate-200" width={40} height={40} />
                                            ) : (
                                                <div className="size-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                                                    {(item.user?.name || "U")[0]}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-bold text-xs sm:text-sm text-slate-900">{item.user?.name || 'Verified Buyer'}</p>
                                                <p className="text-[11px] text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                                            <Star size={12} fill="#d97706" className="text-amber-600" />
                                            <span className="text-xs font-bold text-amber-700">{item.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        "{item.review}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Vendor Info Tab */}
            {selectedTab === "Vendor Information" && product.store && (
                <div className="max-w-2xl space-y-6">
                    <div className="flex items-center gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-200/80">
                        {product.store.logo && (
                            <Image
                                src={product.store.logo}
                                alt={product.store.name}
                                width={70}
                                height={70}
                                className="size-16 rounded-2xl object-cover border border-slate-200"
                            />
                        )}
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold text-slate-900">{product.store.name}</h3>
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <ShieldCheck size={11} /> Approved Seller
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed mb-3">{product.store.description}</p>
                            <Link
                                href={`/shop?search=${encodeURIComponent(product.store.name)}`}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                            >
                                <span>Browse all products from this seller</span>
                                <ArrowRight size={13} />
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Review Composer Modal */}
            {ratingModalOpen && (
                <RatingModal
                    ratingModal={ratingModalOpen}
                    setRatingModal={setRatingModalOpen}
                    productId={product.id}
                    productName={product.name}
                />
            )}
        </div>
    );
};

export default ProductDescription;
'use client'
import Image from "next/image";
import { CheckCircle2, Clock, Truck, Package, Star, MapPin, Receipt, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import RatingModal from "./RatingModal";
import Link from "next/link";

const OrderItem = ({ order }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const [ratingModal, setRatingModal] = useState(null);
    const { ratings } = useSelector(state => state.rating);

    const isDelivered = (order.status || '').toUpperCase() === 'DELIVERED';
    const isShipped = isDelivered || (order.status || '').toUpperCase() === 'SHIPPED';

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            
            {/* Top Order Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                        Order #{order.id?.slice(-8).toUpperCase() || 'ORD-9821'}
                    </span>
                    <span className="text-slate-400">Placed on</span>
                    <span className="font-semibold text-slate-700">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>

                {/* Status Pill */}
                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
                        isDelivered 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                        <span className={`size-2 rounded-full ${isDelivered ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                        <span>{(order.status || 'PROCESSING').toUpperCase()}</span>
                    </span>
                </div>
            </div>

            {/* Visual Delivery Progress Tracker */}
            <div className="bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-slate-200/60">
                <div className="grid grid-cols-4 gap-2 text-center relative">
                    {/* Progress Bar Background */}
                    <div className="absolute top-4 left-6 right-6 h-1 bg-slate-200 -z-0">
                        <div className={`h-full bg-indigo-600 transition-all ${isDelivered ? 'w-full' : isShipped ? 'w-3/4' : 'w-1/2'}`} />
                    </div>

                    {/* Step 1 */}
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="size-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                            <CheckCircle2 size={16} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-800 mt-2">Confirmed</span>
                    </div>

                    {/* Step 2 */}
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="size-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                            <Package size={16} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-800 mt-2">Packed</span>
                    </div>

                    {/* Step 3 */}
                    <div className="relative z-10 flex flex-col items-center">
                        <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${
                            isShipped ? 'bg-indigo-600 text-white' : 'bg-white border-2 border-slate-300 text-slate-400'
                        }`}>
                            <Truck size={16} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-800 mt-2">In Transit</span>
                    </div>

                    {/* Step 4 */}
                    <div className="relative z-10 flex flex-col items-center">
                        <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${
                            isDelivered ? 'bg-emerald-600 text-white' : 'bg-white border-2 border-slate-300 text-slate-400'
                        }`}>
                            <CheckCircle2 size={16} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-800 mt-2">Delivered</span>
                    </div>
                </div>
            </div>

            {/* Order Items Grid */}
            <div className="divide-y divide-slate-100">
                {order.orderItems?.map((item, idx) => (
                    <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="size-18 rounded-2xl bg-slate-50 border border-slate-200/80 p-2 flex items-center justify-center flex-shrink-0">
                                <Image
                                    className="object-contain max-h-14 w-auto"
                                    src={item.product?.images?.[0] || item.product?.image}
                                    alt={item.product?.name || "Product"}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div>
                                <Link href={`/product/${item.product?.id}`} className="font-bold text-sm text-slate-800 hover:text-indigo-600 transition-colors">
                                    {item.product?.name}
                                </Link>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Quantity: <strong className="text-slate-700">{item.quantity}</strong> × {currency}{item.price}
                                </p>
                            </div>
                        </div>

                        {/* Review Action */}
                        <div className="flex items-center gap-3 self-end sm:self-auto">
                            <span className="text-sm font-black text-slate-900">
                                {currency}{(item.price * item.quantity).toFixed(2)}
                            </span>

                            <button
                                onClick={() => setRatingModal({ orderId: order.id, productId: item.product?.id, productName: item.product?.name })}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-slate-600 text-xs font-semibold transition cursor-pointer"
                            >
                                <Star size={13} fill="#d97706" className="text-amber-500" />
                                <span>Rate Item</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Details Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500 bg-slate-50/50 p-4 rounded-2xl">
                <div className="flex items-start gap-2 max-w-sm">
                    <MapPin size={15} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <span className="font-bold text-slate-700 block">Delivery Address:</span>
                        <span>{order.address?.street}, {order.address?.city}, {order.address?.state} {order.address?.zip}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                    <div className="text-right">
                        <span className="text-slate-400 block text-[11px]">Total Paid ({order.paymentMethod || 'COD'})</span>
                        <span className="text-lg font-black text-slate-900">{currency}{order.total?.toFixed(2)}</span>
                    </div>
                    
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-1 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-xl transition shadow-sm"
                    >
                        <span>Buy Again</span>
                        <ArrowRight size={13} />
                    </Link>
                </div>
            </div>

            {/* Rating Modal */}
            {ratingModal && (
                <RatingModal
                    ratingModal={ratingModal}
                    setRatingModal={setRatingModal}
                    productId={ratingModal.productId}
                    productName={ratingModal.productName}
                />
            )}
        </div>
    );
};

export default OrderItem;
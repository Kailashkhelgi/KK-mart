'use client'
import { Plus, Check, Tag, ShieldCheck, MapPin, CreditCard, Banknote, Sparkles, X, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import AddressModal from './AddressModal';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { couponDummyData } from '@/assets/assets';
import { clearCart } from '@/lib/features/cart/cartSlice';

const OrderSummary = ({ totalPrice, items }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const router = useRouter();
    const dispatch = useDispatch();

    const addressList = useSelector(state => state.address.list);

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [selectedAddress, setSelectedAddress] = useState(addressList[0] || null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [couponCodeInput, setCouponCodeInput] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const handleApplyCoupon = (e, codeToApply) => {
        if (e) e.preventDefault();
        const code = (codeToApply || couponCodeInput).trim().toUpperCase();

        const match = couponDummyData.find(c => c.code.toUpperCase() === code);
        if (match) {
            setAppliedCoupon(match);
            setCouponCodeInput('');
            toast.success(`Coupon ${match.code} applied! Saved ${match.discount}%`, {
                style: {
                    borderRadius: '12px',
                    background: '#0f172a',
                    color: '#fff',
                    fontSize: '13px'
                },
                icon: '🎟️'
            });
        } else {
            toast.error('Invalid or expired coupon code. Try NEW20 or OFF10.');
        }
    };

    const discountAmount = appliedCoupon ? (appliedCoupon.discount / 100) * totalPrice : 0;
    const finalTotal = Math.max(0, totalPrice - discountAmount);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (!selectedAddress) {
            toast.error('Please select or add a delivery address first!');
            return;
        }

        toast.loading('Processing your secure order...', { id: 'order-toast' });
        
        setTimeout(() => {
            dispatch(clearCart());
            toast.success('Order placed successfully! Redirecting to tracking...', {
                id: 'order-toast',
                style: {
                    borderRadius: '12px',
                    background: '#0f172a',
                    color: '#fff',
                    fontSize: '13px'
                },
                icon: '🚀'
            });
            router.push('/orders');
        }, 1200);
    };

    return (
        <div className="w-full lg:w-[380px] flex-shrink-0">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-lg sticky top-24 space-y-6">
                
                {/* Heading */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                        Order Summary
                    </h2>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                        {items.length} {items.length === 1 ? 'Item' : 'Items'}
                    </span>
                </div>

                {/* Delivery Address Section */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                            <MapPin size={14} className="text-indigo-600" />
                            <span>Delivery Address</span>
                        </label>
                        <button
                            onClick={() => setShowAddressModal(true)}
                            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 cursor-pointer"
                        >
                            <Plus size={13} /> Add New
                        </button>
                    </div>

                    {selectedAddress ? (
                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3">
                            <div>
                                <p className="text-xs font-bold text-slate-900">{selectedAddress.name}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zip}</p>
                                <p className="text-[11px] text-slate-400 mt-1">Phone: {selectedAddress.phone}</p>
                            </div>
                            {addressList.length > 1 && (
                                <button
                                    onClick={() => setSelectedAddress(null)}
                                    className="text-[11px] text-indigo-600 font-bold hover:underline"
                                >
                                    Change
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {addressList.length > 0 ? (
                                <select
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500"
                                    onChange={(e) => setSelectedAddress(addressList[e.target.value])}
                                >
                                    <option value="">Select a saved address...</option>
                                    {addressList.map((addr, idx) => (
                                        <option key={idx} value={idx}>
                                            {addr.name} — {addr.street}, {addr.city}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <button
                                    onClick={() => setShowAddressModal(true)}
                                    className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-400 text-slate-500 hover:text-indigo-600 text-xs font-bold transition flex items-center justify-center gap-1.5"
                                >
                                    <Plus size={14} /> Add Shipping Address
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Payment Method Selector */}
                <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                        Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                        <button
                            type="button"
                            onClick={() => setPaymentMethod('COD')}
                            className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                                paymentMethod === 'COD'
                                    ? 'bg-indigo-50/70 border-indigo-600 text-indigo-900 shadow-sm ring-2 ring-indigo-500/20'
                                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            <Banknote size={18} className={paymentMethod === 'COD' ? 'text-indigo-600' : 'text-slate-400'} />
                            <span>Cash on Delivery</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setPaymentMethod('STRIPE')}
                            className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                                paymentMethod === 'STRIPE'
                                    ? 'bg-indigo-50/70 border-indigo-600 text-indigo-900 shadow-sm ring-2 ring-indigo-500/20'
                                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            <CreditCard size={18} className={paymentMethod === 'STRIPE' ? 'text-indigo-600' : 'text-slate-400'} />
                            <span>Card / Stripe</span>
                        </button>
                    </div>
                </div>

                {/* Coupon Code Section */}
                <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                        Promo Code
                    </label>
                    
                    {!appliedCoupon ? (
                        <form onSubmit={(e) => handleApplyCoupon(e)} className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="e.g. NEW20"
                                value={couponCodeInput}
                                onChange={(e) => setCouponCodeInput(e.target.value)}
                                className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase font-mono tracking-wider focus:bg-white focus:border-indigo-500 outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer"
                            >
                                Apply
                            </button>
                        </form>
                    ) : (
                        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                            <div className="flex items-center gap-2">
                                <Sparkles size={16} className="text-emerald-600" />
                                <div>
                                    <p className="font-bold font-mono">{appliedCoupon.code} (-{appliedCoupon.discount}%)</p>
                                    <p className="text-[11px] text-emerald-600">{appliedCoupon.description}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setAppliedCoupon(null)}
                                className="p-1 text-emerald-700 hover:text-rose-600 transition"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}

                    {/* Quick suggestion chips */}
                    {!appliedCoupon && (
                        <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar">
                            <span className="text-[10px] text-slate-400 flex-shrink-0">Try:</span>
                            {['NEW20', 'OFF10'].map((code) => (
                                <button
                                    key={code}
                                    type="button"
                                    onClick={() => handleApplyCoupon(null, code)}
                                    className="text-[10px] font-bold font-mono text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/60 px-2 py-0.5 rounded-md transition"
                                >
                                    +{code}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                        <span>Items Subtotal</span>
                        <span className="font-bold text-slate-900">{currency}{totalPrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-slate-600">
                        <span>Standard Delivery</span>
                        <span className="font-bold text-emerald-600">FREE</span>
                    </div>

                    {appliedCoupon && (
                        <div className="flex justify-between text-emerald-600 font-semibold">
                            <span>Coupon Savings ({appliedCoupon.code})</span>
                            <span>-{currency}{discountAmount.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="flex items-baseline justify-between pt-3 border-t border-slate-100 text-base">
                        <span className="font-bold text-slate-900">Total Payable</span>
                        <span className="text-2xl font-black text-indigo-600">
                            {currency}{finalTotal.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Checkout CTA */}
                <button
                    onClick={handlePlaceOrder}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/25 transition-all hover:scale-102 active:scale-98 cursor-pointer"
                >
                    <span>Confirm & Place Order</span>
                    <ArrowRight size={16} />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>256-bit Encrypted Checkout</span>
                </div>

            </div>

            {/* Address Modal */}
            {showAddressModal && (
                <AddressModal
                    setShowAddressModal={setShowAddressModal}
                    onAddressAdded={(newAddr) => setSelectedAddress(newAddr)}
                />
            )}
        </div>
    );
};

export default OrderSummary;
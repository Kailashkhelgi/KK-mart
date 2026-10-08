'use client'
import { useEffect, useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Trash2, TicketPercent, Plus, Sparkles, Tag, Check, Copy } from "lucide-react";
import { couponDummyData } from "@/assets/assets";

export default function AdminCoupons() {
    const [coupons, setCoupons] = useState([]);
    const [newCoupon, setNewCoupon] = useState({
        code: '',
        description: '',
        discount: 20,
        forNewUser: false,
        forMember: false,
        isPublic: true,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });

    const fetchCoupons = async () => {
        setCoupons(couponDummyData);
    };

    const handleAddCoupon = (e) => {
        e.preventDefault();
        if (!newCoupon.code || !newCoupon.discount) {
            return toast.error("Please enter coupon code and discount percentage");
        }

        const couponObj = {
            ...newCoupon,
            code: newCoupon.code.trim().toUpperCase(),
            discount: Number(newCoupon.discount),
            createdAt: new Date().toISOString()
        };

        setCoupons([couponObj, ...coupons]);
        toast.success(`Coupon ${couponObj.code} created successfully!`, {
            style: {
                borderRadius: '12px',
                background: '#0f172a',
                color: '#fff',
                fontSize: '13px'
            },
            icon: '🎟️'
        });

        setNewCoupon({
            code: '',
            description: '',
            discount: 20,
            forNewUser: false,
            forMember: false,
            isPublic: true,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
    };

    const handleChange = (e) => {
        setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value });
    };

    const deleteCoupon = (code) => {
        setCoupons(coupons.filter(c => c.code !== code));
        toast.success(`Deleted coupon ${code}`, {
            style: {
                borderRadius: '12px',
                background: '#0f172a',
                color: '#fff',
                fontSize: '13px'
            }
        });
    };

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        toast.success(`Copied code "${code}" to clipboard!`);
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    return (
        <div className="space-y-8 pb-16">
            
            {/* Header */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full mb-2">
                        <TicketPercent size={13} /> Promotions Center
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Coupons & Discount Engine
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Configure promotional vouchers, new customer incentives, and VIP member codes.
                    </p>
                </div>

                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-2xl self-start sm:self-auto">
                    Active: <strong>{coupons.length}</strong> Coupons
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Create Coupon Form (5 Cols) */}
                <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
                    <h2 className="text-lg font-black text-slate-900 mb-1">Create Promotional Code</h2>
                    <p className="text-xs text-slate-400 mb-6">Create instant discounts applicable at cart checkout</p>

                    <form onSubmit={handleAddCoupon} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Coupon Code *
                                </label>
                                <input
                                    type="text"
                                    name="code"
                                    value={newCoupon.code}
                                    onChange={handleChange}
                                    placeholder="SUMMER25"
                                    required
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold uppercase text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Discount % *
                                </label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={newCoupon.discount}
                                    onChange={handleChange}
                                    min={1}
                                    max={100}
                                    placeholder="20"
                                    required
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Description *
                            </label>
                            <input
                                type="text"
                                name="description"
                                value={newCoupon.description}
                                onChange={handleChange}
                                placeholder="e.g. 20% Off for Summer Tech Sale"
                                required
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Expiration Date
                            </label>
                            <input
                                type="date"
                                name="expiresAt"
                                value={newCoupon.expiresAt}
                                onChange={handleChange}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
                            />
                        </div>

                        {/* Toggles */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                            <label className="flex items-center justify-between text-xs font-semibold text-slate-700 cursor-pointer">
                                <span>Exclusive for New Users</span>
                                <input
                                    type="checkbox"
                                    name="forNewUser"
                                    checked={newCoupon.forNewUser}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, forNewUser: e.target.checked })}
                                    className="accent-indigo-600 size-4 cursor-pointer"
                                />
                            </label>

                            <label className="flex items-center justify-between text-xs font-semibold text-slate-700 cursor-pointer">
                                <span>Exclusive for Plus Members</span>
                                <input
                                    type="checkbox"
                                    name="forMember"
                                    checked={newCoupon.forMember}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, forMember: e.target.checked })}
                                    className="accent-indigo-600 size-4 cursor-pointer"
                                />
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                        >
                            <Plus size={15} />
                            <span>Create Coupon</span>
                        </button>
                    </form>
                </div>

                {/* Coupons Table (7 Cols) */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 text-sm">Active Marketplace Coupons</h3>
                        <span className="text-xs text-slate-400">Click code to copy</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                                <tr>
                                    <th className="px-5 py-3.5">Code</th>
                                    <th className="px-5 py-3.5">Discount</th>
                                    <th className="px-5 py-3.5">Audience</th>
                                    <th className="px-5 py-3.5 hidden sm:table-cell">Expiry</th>
                                    <th className="px-5 py-3.5 text-right">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {coupons.map((coupon) => (
                                    <tr key={coupon.code} className="hover:bg-slate-50/70 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <button
                                                onClick={() => copyCode(coupon.code)}
                                                className="inline-flex items-center gap-1.5 font-mono font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/60 px-2.5 py-1 rounded-lg transition"
                                                title="Click to copy"
                                            >
                                                <span>{coupon.code}</span>
                                                <Copy size={11} className="text-indigo-400" />
                                            </button>
                                            <span className="block text-[11px] text-slate-400 mt-0.5 truncate max-w-[150px]">
                                                {coupon.description}
                                            </span>
                                        </td>

                                        <td className="px-5 py-3.5 font-black text-emerald-600">
                                            {coupon.discount}% OFF
                                        </td>

                                        <td className="px-5 py-3.5">
                                            {coupon.forNewUser ? (
                                                <span className="bg-cyan-50 text-cyan-700 font-bold px-2 py-0.5 rounded-md text-[10px]">New Users</span>
                                            ) : coupon.forMember ? (
                                                <span className="bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-md text-[10px]">Members</span>
                                            ) : (
                                                <span className="bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md text-[10px]">All Users</span>
                                            )}
                                        </td>

                                        <td className="px-5 py-3.5 hidden sm:table-cell text-slate-400">
                                            {format(new Date(coupon.expiresAt), 'MMM dd, yyyy')}
                                        </td>

                                        <td className="px-5 py-3.5 text-right">
                                            <button
                                                onClick={() => deleteCoupon(coupon.code)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                                title="Delete Coupon"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>
    );
}
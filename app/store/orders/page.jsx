'use client'
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { orderDummyData } from "@/assets/assets";
import { toast } from "react-hot-toast";
import { ShoppingBag, Eye, X, CheckCircle2, Truck, User, MapPin, Sparkles, CreditCard } from "lucide-react";
import Image from "next/image";

export default function StoreOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchOrders = async () => {
        setOrders(orderDummyData);
        setLoading(false);
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder(prev => ({ ...prev, status: newStatus }));
        }
        toast.success(`Order #${orderId.slice(-6)} updated to ${newStatus}`, {
            style: {
                borderRadius: '12px',
                background: '#0f172a',
                color: '#fff',
                fontSize: '13px'
            }
        });
    };

    const openModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="space-y-8 pb-16">
            
            {/* Header */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full mb-2">
                        <ShoppingBag size={13} /> Order Fulfillment
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Vendor Orders & Logistics
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Review customer shipping details, update dispatch milestones, and inspect invoices.
                    </p>
                </div>

                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-2xl self-start sm:self-auto">
                    Total: <strong>{orders.length}</strong> Orders
                </span>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Total Amount</th>
                                <th className="px-6 py-4 hidden md:table-cell">Payment</th>
                                <th className="px-6 py-4">Status & Action</th>
                                <th className="px-6 py-4 hidden sm:table-cell">Date</th>
                                <th className="px-6 py-4 text-right">Inspect</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                                    {/* Order ID */}
                                    <td className="px-6 py-4 font-mono font-bold text-slate-800">
                                        #{order.id.slice(-8).toUpperCase()}
                                    </td>

                                    {/* Customer */}
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-slate-900">{order.user?.name || 'Customer'}</p>
                                            <p className="text-[11px] text-slate-400">{order.user?.email}</p>
                                        </div>
                                    </td>

                                    {/* Total */}
                                    <td className="px-6 py-4 font-black text-slate-900">
                                        ${order.total?.toFixed(2)}
                                        {order.isCouponUsed && (
                                            <span className="block text-[10px] font-bold text-emerald-600">
                                                Coupon Used
                                            </span>
                                        )}
                                    </td>

                                    {/* Payment Method */}
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-lg text-[11px]">
                                            {order.paymentMethod || 'COD'}
                                        </span>
                                    </td>

                                    {/* Status Selector */}
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 cursor-pointer"
                                        >
                                            <option value="ORDER_PLACED">ORDER_PLACED</option>
                                            <option value="PROCESSING">PROCESSING</option>
                                            <option value="SHIPPED">SHIPPED</option>
                                            <option value="DELIVERED">DELIVERED</option>
                                        </select>
                                    </td>

                                    {/* Date */}
                                    <td className="px-6 py-4 hidden sm:table-cell text-xs text-slate-400">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>

                                    {/* Action View */}
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => openModal(order)}
                                            className="p-2.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition cursor-pointer"
                                            title="View Order Details"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Inspection Modal */}
            {isModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative border border-slate-200 animate-in zoom-in-95 duration-200 space-y-6">
                        
                        {/* Modal Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                                    Invoice Breakdown
                                </span>
                                <h2 className="text-xl font-black text-slate-900 mt-1">
                                    Order #{selectedOrder.id.slice(-8).toUpperCase()}
                                </h2>
                            </div>
                            <button
                                onClick={closeModal}
                                className="size-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Customer & Address Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                                <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-2">
                                    <User size={14} className="text-indigo-600" />
                                    <span>Customer Info</span>
                                </div>
                                <p className="font-bold text-slate-800">{selectedOrder.user?.name}</p>
                                <p className="text-slate-500">{selectedOrder.user?.email}</p>
                                <p className="text-slate-500">{selectedOrder.address?.phone}</p>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                                <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-2">
                                    <MapPin size={14} className="text-indigo-600" />
                                    <span>Shipping Destination</span>
                                </div>
                                <p className="font-bold text-slate-800">{selectedOrder.address?.street}</p>
                                <p className="text-slate-500">{selectedOrder.address?.city}, {selectedOrder.address?.state} {selectedOrder.address?.zip}</p>
                                <p className="text-slate-400">{selectedOrder.address?.country}</p>
                            </div>
                        </div>

                        {/* Product Items */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                                Purchased Items
                            </h3>
                            <div className="space-y-2">
                                {selectedOrder.orderItems?.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                                        <div className="flex items-center gap-3">
                                            <div className="size-12 rounded-xl bg-white p-1 border border-slate-200 flex items-center justify-center">
                                                <Image
                                                    src={item.product?.images?.[0] || item.product?.image}
                                                    alt={item.product?.name || "Product"}
                                                    width={40}
                                                    height={40}
                                                    className="object-contain max-h-10 w-auto"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-bold text-xs sm:text-sm text-slate-900">{item.product?.name}</p>
                                                <p className="text-[11px] text-slate-400">Qty: {item.quantity} × ${item.price}</p>
                                            </div>
                                        </div>
                                        <span className="font-black text-slate-900 text-sm">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary Totals & Status */}
                        <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                            <div>
                                <span className="text-slate-500 block">Payment Method: <strong>{selectedOrder.paymentMethod}</strong></span>
                                <span className="text-slate-500 block">Status: <strong className="text-indigo-600">{selectedOrder.status}</strong></span>
                            </div>

                            <div className="text-right">
                                <span className="text-slate-400 block text-[11px]">Total Paid Amount</span>
                                <span className="text-xl font-black text-indigo-700">${selectedOrder.total?.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Modal Action */}
                        <div className="flex justify-end pt-2">
                            <button
                                onClick={closeModal}
                                className="py-2.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
                            >
                                Close Modal
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

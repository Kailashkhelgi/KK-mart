'use client'
import PageTitle from "@/components/PageTitle";
import { useEffect, useState } from "react";
import OrderItem from "@/components/OrderItem";
import { orderDummyData } from "@/assets/assets";
import { Package, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setOrders(orderDummyData);
    }, []);

    return (
        <div className="min-h-[85vh] px-4 sm:px-6 py-8">
            <div className="max-w-5xl mx-auto">
                {/* Title */}
                <PageTitle 
                    heading="Order History & Tracking" 
                    text={`You have ${orders.length} active or completed orders on KK Mart.`} 
                    path="/shop"
                    linkText="Continue Shopping" 
                />

                {orders.length > 0 ? (
                    <div className="space-y-8 mb-20">
                        {orders.map((order) => (
                            <OrderItem order={order} key={order.id} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm">
                        <div className="size-20 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-6">
                            <Package size={36} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">No Past Orders Found</h2>
                        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
                            You haven't placed any orders yet. Explore our store catalog and discover great deals on modern tech gadgets!
                        </p>
                        <Link
                            href="/shop"
                            className="inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all hover:scale-102 active:scale-98"
                        >
                            <span>Start Shopping</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
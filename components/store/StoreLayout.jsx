'use client'
import { useEffect, useState } from "react";
import Loading from "../Loading";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StoreNavbar from "./StoreNavbar";
import StoreSidebar from "./StoreSidebar";
import { dummyStoreData } from "@/assets/assets";

const StoreLayout = ({ children }) => {
    const [isSeller, setIsSeller] = useState(false);
    const [loading, setLoading] = useState(true);
    const [storeInfo, setStoreInfo] = useState(null);

    const fetchIsSeller = async () => {
        setIsSeller(true);
        setStoreInfo(dummyStoreData);
        setLoading(false);
    };

    useEffect(() => {
        fetchIsSeller();
    }, []);

    if (loading) return <Loading />;

    return isSeller ? (
        <div className="flex flex-col min-h-screen bg-slate-100/60">
            <StoreNavbar />
            <div className="flex flex-1 items-stretch">
                <StoreSidebar storeInfo={storeInfo} />
                <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl">
                    {children}
                </main>
            </div>
        </div>
    ) : (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-2xl sm:text-4xl font-black text-slate-800">You need a vendor store to view this area</h1>
            <Link href="/create-store" className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 mt-8 py-3 px-8 text-sm font-bold rounded-2xl shadow-lg transition">
                Create Your Store <ArrowRight size={16} />
            </Link>
        </div>
    );
};

export default StoreLayout;
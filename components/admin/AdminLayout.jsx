'use client'
import { useEffect, useState } from "react";
import Loading from "../Loading";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchIsAdmin = async () => {
        setIsAdmin(true);
        setLoading(false);
    };

    useEffect(() => {
        fetchIsAdmin();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="flex flex-col min-h-screen bg-slate-100/60">
            <AdminNavbar />
            <div className="flex flex-1 items-stretch">
                <AdminSidebar />
                <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
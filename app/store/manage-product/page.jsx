'use client'
import { useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Loading from "@/components/Loading";
import { Trash2, ExternalLink, Search, Sparkles, Plus, PackageCheck, AlertCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleStock, deleteProduct } from "@/lib/features/product/productSlice";
import Link from "next/link";

export default function StoreManageProducts() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.list);

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const handleToggleStock = (productId, productName, currentStatus) => {
        dispatch(toggleStock(productId));
        toast.success(`${productName} is now ${!currentStatus ? 'In Stock' : 'Out of Stock'}`, {
            style: {
                borderRadius: '12px',
                background: '#0f172a',
                color: '#fff',
                fontSize: '13px'
            }
        });
    };

    const handleDelete = (productId, productName) => {
        if (confirm(`Are you sure you want to delete "${productName}" from your store?`)) {
            dispatch(deleteProduct(productId));
            toast.success(`Deleted ${productName}`, {
                style: {
                    borderRadius: '12px',
                    background: '#0f172a',
                    color: '#fff',
                    fontSize: '13px'
                }
            });
        }
    };

    const filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category?.toLowerCase().includes(search.toLowerCase());
        const matchesCat = selectedCategory === "All" || p.category?.toLowerCase() === selectedCategory.toLowerCase();
        return matchesSearch && matchesCat;
    });

    return (
        <div className="space-y-8 pb-16">
            
            {/* Header */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full mb-2">
                        <PackageCheck size={13} /> Product Directory
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Manage Catalog Inventory
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Control real-time stock levels, pricing, and live catalog visibility.
                    </p>
                </div>

                <Link
                    href="/store/add-product"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-102 active:scale-98 self-start sm:self-auto"
                >
                    <Plus size={16} />
                    <span>Add Product</span>
                </Link>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:max-w-xs">
                    <input
                        type="text"
                        placeholder="Search product inventory..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                </div>

                <span className="text-xs text-slate-500 font-semibold self-end sm:self-auto">
                    Showing <strong>{filtered.length}</strong> items in inventory
                </span>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                            <tr>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4 hidden md:table-cell">Category</th>
                                <th className="px-6 py-4 hidden sm:table-cell">MRP</th>
                                <th className="px-6 py-4">Selling Price</th>
                                <th className="px-6 py-4 text-center">In Stock Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50/70 transition-colors">
                                    
                                    {/* Product Title & Image */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-12 rounded-xl bg-slate-50 border border-slate-200/80 p-1 flex items-center justify-center flex-shrink-0">
                                                <Image
                                                    width={40}
                                                    height={40}
                                                    className="object-contain max-h-10 w-auto"
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                />
                                            </div>
                                            <div>
                                                <Link href={`/product/${product.id}`} className="font-bold text-slate-800 hover:text-indigo-600 transition-colors line-clamp-1">
                                                    {product.name}
                                                </Link>
                                                <span className="text-[11px] text-slate-400 font-mono">ID: {product.id}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Category */}
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-full text-[11px]">
                                            {product.category || 'Tech'}
                                        </span>
                                    </td>

                                    {/* MRP */}
                                    <td className="px-6 py-4 hidden sm:table-cell text-slate-400 line-through">
                                        {currency}{product.mrp?.toLocaleString() || product.price}
                                    </td>

                                    {/* Price */}
                                    <td className="px-6 py-4 font-black text-slate-900">
                                        {currency}{product.price.toLocaleString()}
                                    </td>

                                    {/* In Stock Toggle Switch */}
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            type="button"
                                            onClick={() => handleToggleStock(product.id, product.name, product.inStock)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                                product.inStock
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                                            }`}
                                        >
                                            <span className={`size-2 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                            <span>{product.inStock ? 'Available' : 'Sold Out'}</span>
                                        </button>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/product/${product.id}`}
                                                className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
                                                title="View on Storefront"
                                            >
                                                <ExternalLink size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id, product.name)}
                                                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                                title="Delete Product"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                        <AlertCircle className="mx-auto mb-2 text-slate-300" size={32} />
                        <p className="font-semibold text-sm">No products found matching your search</p>
                    </div>
                )}
            </div>

        </div>
    );
}
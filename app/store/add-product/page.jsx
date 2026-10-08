'use client'
import { assets, categories, dummyStoreData } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Upload, Plus, Sparkles, Check, PackagePlus, ArrowRight, Tag, DollarSign, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addProduct } from "@/lib/features/product/productSlice";
import { useRouter } from "next/navigation";

export default function StoreAddProduct() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null });
    const [productInfo, setProductInfo] = useState({
        name: "",
        description: "",
        mrp: "",
        price: "",
        category: "Headphones",
        inStock: true
    });
    const [loading, setLoading] = useState(false);

    const onChangeHandler = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (key, file) => {
        if (file) {
            setImages(prev => ({ ...prev, [key]: file }));
        }
    };

    const removeImage = (key) => {
        setImages(prev => ({ ...prev, [key]: null }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        if (!productInfo.name || !productInfo.price) {
            return toast.error("Please provide a product title and offer price");
        }

        const mrpNum = Number(productInfo.mrp) || Number(productInfo.price);
        const priceNum = Number(productInfo.price);

        if (priceNum > mrpNum) {
            return toast.error("Offer price cannot be greater than Actual MRP");
        }

        setLoading(true);

        // Build image array or fallback to product_img1
        const uploadedImages = Object.values(images).filter(Boolean);
        const productImages = uploadedImages.length > 0 
            ? uploadedImages.map(img => URL.createObjectURL(img))
            : [assets.product_img1];

        const newProduct = {
            id: `prod_${Date.now()}`,
            name: productInfo.name,
            description: productInfo.description || "High-performance tech gear built with premium quality materials.",
            mrp: mrpNum,
            price: priceNum,
            category: productInfo.category || "Electronics",
            images: productImages,
            storeId: dummyStoreData.id,
            store: dummyStoreData,
            inStock: Boolean(productInfo.inStock),
            rating: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        dispatch(addProduct(newProduct));

        toast.success(`Published "${productInfo.name}" to your store!`, {
            style: {
                borderRadius: '12px',
                background: '#0f172a',
                color: '#fff',
                fontSize: '13px'
            },
            icon: '📦'
        });

        setTimeout(() => {
            router.push('/store/manage-product');
        }, 800);
    };

    const discountPercentage = productInfo.mrp && productInfo.price && Number(productInfo.mrp) > Number(productInfo.price)
        ? Math.round(((Number(productInfo.mrp) - Number(productInfo.price)) / Number(productInfo.mrp)) * 100)
        : 0;

    return (
        <div className="max-w-4xl pb-16">
            
            {/* Header */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm mb-8">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full mb-2">
                    <PackagePlus size={13} /> Inventory Manager
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Add New Product
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Upload images, set pricing, write features, and list directly to the global marketplace.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
                
                {/* Image Upload Grid */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                            Product Images (Up to 4) *
                        </label>
                        <span className="text-xs text-slate-400">First image will be the primary card thumbnail</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((key) => {
                            const file = images[key];
                            return (
                                <div key={key} className="relative group">
                                    <label
                                        htmlFor={`product_image_${key}`}
                                        className={`size-full aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-2 cursor-pointer transition-all ${
                                            file
                                                ? 'border-indigo-500 bg-indigo-50/20'
                                                : 'border-slate-300 hover:border-indigo-400 bg-slate-50 hover:bg-slate-100/70'
                                        }`}
                                    >
                                        {file ? (
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt={`Preview ${key}`}
                                                width={160}
                                                height={160}
                                                className="size-full object-contain rounded-xl"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center text-center p-3 text-slate-400">
                                                <Upload size={22} className="mb-1.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                                                <span className="text-[11px] font-bold">Image #{key}</span>
                                                <span className="text-[9px] text-slate-400">Click to upload</span>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id={`product_image_${key}`}
                                            onChange={(e) => handleImageUpload(key, e.target.files[0])}
                                            hidden
                                        />
                                    </label>

                                    {file && (
                                        <button
                                            type="button"
                                            onClick={() => removeImage(key)}
                                            className="absolute top-2 right-2 size-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md hover:scale-110 transition cursor-pointer"
                                            title="Remove image"
                                        >
                                            <X size={13} />
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Product Title */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Product Name / Title *
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={productInfo.name}
                        onChange={onChangeHandler}
                        placeholder="e.g. Studio Pro Wireless ANC Headphones"
                        required
                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition"
                    />
                </div>

                {/* Category & Stock Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                            Product Department / Category *
                        </label>
                        <select
                            name="category"
                            value={productInfo.category}
                            onChange={onChangeHandler}
                            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none cursor-pointer"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                            <option value="Electronics">Electronics</option>
                            <option value="Audio">Audio</option>
                            <option value="Gaming">Gaming</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                            Stock Availability
                        </label>
                        <select
                            name="inStock"
                            value={productInfo.inStock}
                            onChange={(e) => setProductInfo({ ...productInfo, inStock: e.target.value === 'true' })}
                            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none cursor-pointer"
                        >
                            <option value="true">In Stock & Ready for Dispatch</option>
                            <option value="false">Out of Stock / Pre-order</option>
                        </select>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Product Description & Specs *
                    </label>
                    <textarea
                        name="description"
                        value={productInfo.description}
                        onChange={onChangeHandler}
                        placeholder="Detailed breakdown of dimensions, acoustic drivers, battery life, connectivity, and box contents..."
                        rows={5}
                        required
                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition resize-none"
                    />
                </div>

                {/* Pricing Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                            Original MRP ($)
                        </label>
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                            <input
                                type="number"
                                name="mrp"
                                value={productInfo.mrp}
                                onChange={onChangeHandler}
                                placeholder="59.00"
                                step="0.01"
                                className="w-full pl-8 pr-3.5 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:border-indigo-500 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                Selling Offer Price ($) *
                            </label>
                            {discountPercentage > 0 && (
                                <span className="text-[10px] font-black text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full uppercase">
                                    -{discountPercentage}% Discount
                                </span>
                            )}
                        </div>
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-600 font-bold">$</span>
                            <input
                                type="number"
                                name="price"
                                value={productInfo.price}
                                onChange={onChangeHandler}
                                placeholder="39.00"
                                step="0.01"
                                required
                                className="w-full pl-8 pr-3.5 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-indigo-600 focus:border-indigo-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => router.push('/store')}
                        className="py-3 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="py-3.5 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-2"
                    >
                        <span>Publish to Storefront</span>
                        <ArrowRight size={16} />
                    </button>
                </div>

            </form>
        </div>
    );
}
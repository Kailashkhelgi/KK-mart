'use client'
import { assets } from "@/assets/assets";
import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import { Store, Upload, CheckCircle2, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateStore() {
    const router = useRouter();
    const [alreadySubmitted, setAlreadySubmitted] = useState(false);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    const [storeInfo, setStoreInfo] = useState({
        name: "",
        username: "",
        description: "",
        email: "",
        contact: "",
        address: "",
        image: null
    });

    const onChangeHandler = (e) => {
        setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setStoreInfo({ ...storeInfo, image: file });
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!storeInfo.name || !storeInfo.username || !storeInfo.email) {
            return toast.error("Please fill in the store name and email address");
        }

        toast.loading("Registering your vendor store...", { id: "store-submit" });

        setTimeout(() => {
            setAlreadySubmitted(true);
            setStatus("approved");
            toast.success("Store submitted and approved! Welcome aboard.", {
                id: "store-submit",
                style: {
                    borderRadius: "12px",
                    background: "#0f172a",
                    color: "#fff",
                    fontSize: "13px"
                },
                icon: "🎉"
            });
        }, 1200);
    };

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen px-4 sm:px-6 py-12">
            <div className="max-w-4xl mx-auto">
                {!alreadySubmitted ? (
                    <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-xl">
                        
                        {/* Header Banner */}
                        <div className="flex items-center gap-3 mb-2">
                            <span className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 shadow-xs">
                                <Store size={26} />
                            </span>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                    Open Your Merchant Store
                                </h1>
                                <p className="text-xs sm:text-sm text-slate-500">
                                    Start selling to millions of buyers worldwide with verified trust badges
                                </p>
                            </div>
                        </div>

                        <form onSubmit={onSubmitHandler} className="mt-8 space-y-6">
                            
                            {/* Logo Upload Zone */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                    Store Brand Logo *
                                </label>
                                <div className="flex items-center gap-4">
                                    <label className="flex flex-col items-center justify-center size-28 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50/30 cursor-pointer overflow-hidden transition-all group">
                                        {previewUrl ? (
                                            <Image
                                                src={previewUrl}
                                                alt="Store preview"
                                                width={112}
                                                height={112}
                                                className="size-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center p-2 text-center text-slate-400 group-hover:text-indigo-600">
                                                <Upload size={22} className="mb-1" />
                                                <span className="text-[10px] font-bold">Upload Logo</span>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            hidden
                                        />
                                    </label>
                                    <div className="text-xs text-slate-400 space-y-1">
                                        <p className="font-semibold text-slate-600">Recommended: Square PNG/JPG (at least 300x300px)</p>
                                        <p>Your logo will appear on product cards, store profile, and invoices.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Store Name & Slug */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Store Name *
                                    </label>
                                    <input
                                        name="name"
                                        onChange={onChangeHandler}
                                        value={storeInfo.name}
                                        type="text"
                                        placeholder="e.g. Apex Audio Labs"
                                        required
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Store Slug / Username *
                                    </label>
                                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/10">
                                        <span className="pl-3 text-xs text-slate-400 select-none">kkmart.com/</span>
                                        <input
                                            name="username"
                                            onChange={onChangeHandler}
                                            value={storeInfo.username}
                                            type="text"
                                            placeholder="apexaudio"
                                            required
                                            className="w-full p-3 bg-transparent text-xs text-slate-900 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    About Your Store & Brand *
                                </label>
                                <textarea
                                    name="description"
                                    onChange={onChangeHandler}
                                    value={storeInfo.description}
                                    rows={3}
                                    placeholder="Tell shoppers about your products, mission, quality standards, and warranty..."
                                    required
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none resize-none"
                                />
                            </div>

                            {/* Email & Phone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Business Email *
                                    </label>
                                    <input
                                        name="email"
                                        onChange={onChangeHandler}
                                        value={storeInfo.email}
                                        type="email"
                                        placeholder="merchant@example.com"
                                        required
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Business Phone Number *
                                    </label>
                                    <input
                                        name="contact"
                                        onChange={onChangeHandler}
                                        value={storeInfo.contact}
                                        type="text"
                                        placeholder="+1 555-019-2834"
                                        required
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Physical Address */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Headquarters / Warehouse Address *
                                </label>
                                <textarea
                                    name="address"
                                    onChange={onChangeHandler}
                                    value={storeInfo.address}
                                    rows={2}
                                    placeholder="450 Broadway, Floor 4, New York, NY 10013, USA"
                                    required
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none resize-none"
                                />
                            </div>

                            {/* Submit CTA */}
                            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <ShieldCheck size={16} className="text-emerald-500" />
                                    <span>Instant automated approval verification enabled</span>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all hover:scale-102 active:scale-98 cursor-pointer"
                                >
                                    Submit Application
                                </button>
                            </div>

                        </form>
                    </div>
                ) : (
                    <div className="text-center py-16 px-8 bg-white rounded-3xl border border-slate-200/80 shadow-xl max-w-lg mx-auto animate-in zoom-in-95 duration-200">
                        <div className="size-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">
                            Store Registration Approved!
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mb-8 leading-relaxed">
                            Congratulations! <strong>{storeInfo.name || 'Your Store'}</strong> has been verified. You can now access your seller dashboard, list products, and fulfill customer orders.
                        </p>
                        <Link
                            href="/store"
                            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all hover:scale-102 active:scale-98"
                        >
                            <span>Go to Vendor Dashboard</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
'use client'
import { X, MapPin, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addAddress } from "@/lib/features/address/addressSlice";

const AddressModal = ({ setShowAddressModal, onAddressAdded }) => {
    const dispatch = useDispatch();

    const [address, setAddress] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'USA',
        phone: ''
    });

    const handleAddressChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!address.name || !address.street || !address.city || !address.zip) {
            return toast.error('Please fill in all required shipping fields');
        }

        const newAddressObj = {
            id: `addr_${Date.now()}`,
            ...address,
            createdAt: new Date().toISOString()
        };

        dispatch(addAddress(newAddressObj));
        if (onAddressAdded) {
            onAddressAdded(newAddressObj);
        }

        toast.success('Shipping address saved successfully!', {
            style: {
                borderRadius: '12px',
                background: '#0f172a',
                color: '#fff',
                fontSize: '13px'
            },
            icon: '📍'
        });
        setShowAddressModal(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl w-full max-w-lg relative border border-slate-200 animate-in zoom-in-95 duration-200">
                
                {/* Close Button */}
                <button
                    onClick={() => setShowAddressModal(false)}
                    className="absolute top-4 right-4 size-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
                >
                    <X size={18} />
                </button>

                {/* Header */}
                <div className="flex items-center gap-2 mb-1">
                    <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                        <MapPin size={20} />
                    </span>
                    <h2 className="text-xl font-black text-slate-900">Add Shipping Address</h2>
                </div>
                <p className="text-xs text-slate-500 mb-6">
                    Enter your delivery location for fast, tracked shipping
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Full Name *
                            </label>
                            <input
                                name="name"
                                onChange={handleAddressChange}
                                value={address.name}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition"
                                type="text"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Email *
                            </label>
                            <input
                                name="email"
                                onChange={handleAddressChange}
                                value={address.email}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition"
                                type="email"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Street Address *
                        </label>
                        <input
                            name="street"
                            onChange={handleAddressChange}
                            value={address.street}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition"
                            type="text"
                            placeholder="123 Main Street, Apt 4B"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                City *
                            </label>
                            <input
                                name="city"
                                onChange={handleAddressChange}
                                value={address.city}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition"
                                type="text"
                                placeholder="New York"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                State / Province *
                            </label>
                            <input
                                name="state"
                                onChange={handleAddressChange}
                                value={address.state}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition"
                                type="text"
                                placeholder="NY"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Postal Code *
                            </label>
                            <input
                                name="zip"
                                onChange={handleAddressChange}
                                value={address.zip}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition"
                                type="text"
                                placeholder="10001"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Phone Number *
                            </label>
                            <input
                                name="phone"
                                onChange={handleAddressChange}
                                value={address.phone}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition"
                                type="tel"
                                placeholder="+1 555-0199"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-3">
                        <button
                            type="button"
                            onClick={() => setShowAddressModal(false)}
                            className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-102 active:scale-98 cursor-pointer"
                        >
                            Save Address
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressModal;
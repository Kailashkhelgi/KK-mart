'use client'
import Counter from "@/components/Counter";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import { deleteItemFromCart } from "@/lib/features/cart/cartSlice";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Cart() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    
    const { cartItems } = useSelector(state => state.cart);
    const products = useSelector(state => state.product.list);
    const dispatch = useDispatch();

    const [cartArray, setCartArray] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const createCartArray = () => {
        let currentTotal = 0;
        const array = [];
        for (const [key, value] of Object.entries(cartItems)) {
            const product = products.find(p => p.id === key);
            if (product && value > 0) {
                array.push({
                    ...product,
                    quantity: value,
                });
                currentTotal += product.price * value;
            }
        }
        setTotalPrice(currentTotal);
        setCartArray(array);
    };

    const handleDeleteItem = (productId, productName) => {
        dispatch(deleteItemFromCart({ productId }));
        toast.success(`Removed ${productName || 'item'} from cart`, {
            style: {
                borderRadius: '12px',
                background: '#0f172a',
                color: '#fff',
                fontSize: '13px'
            }
        });
    };

    useEffect(() => {
        if (products.length > 0) {
            createCartArray();
        }
    }, [cartItems, products]);

    return cartArray.length > 0 ? (
        <div className="min-h-[85vh] px-4 sm:px-6 py-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <PageTitle 
                    heading="Shopping Bag" 
                    text={`Review your selected items and proceed to fast checkout.`} 
                    path="/shop"
                    linkText="Continue Shopping" 
                />

                <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                    
                    {/* Cart Items List */}
                    <div className="flex-1 w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm overflow-hidden">
                        
                        {/* Table Header (Desktop) */}
                        <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
                            <div className="col-span-6">Product Details</div>
                            <div className="col-span-3 text-center">Quantity</div>
                            <div className="col-span-2 text-right">Subtotal</div>
                            <div className="col-span-1 text-center">Action</div>
                        </div>

                        {/* Items Rows */}
                        <div className="divide-y divide-slate-100">
                            {cartArray.map((item) => (
                                <div key={item.id} className="py-5 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center">
                                    
                                    {/* Product Details (6 Cols) */}
                                    <div className="sm:col-span-6 flex items-center gap-4 w-full">
                                        <div className="size-20 sm:size-22 rounded-2xl bg-slate-50 border border-slate-200/80 p-2 flex items-center justify-center flex-shrink-0">
                                            <Image
                                                src={item.images[0]}
                                                className="object-contain max-h-16 w-auto"
                                                alt={item.name}
                                                width={60}
                                                height={60}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                                                {item.category || 'Tech'}
                                            </span>
                                            <Link href={`/product/${item.id}`} className="block mt-1">
                                                <h3 className="text-sm font-bold text-slate-800 hover:text-indigo-600 truncate transition-colors">
                                                    {item.name}
                                                </h3>
                                            </Link>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                Unit: <strong className="text-slate-700">{currency}{item.price}</strong>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Quantity Stepper (3 Cols) */}
                                    <div className="sm:col-span-3 flex items-center justify-between sm:justify-center w-full sm:w-auto">
                                        <span className="sm:hidden text-xs font-semibold text-slate-500">Qty:</span>
                                        <Counter productId={item.id} />
                                    </div>

                                    {/* Row Subtotal (2 Cols) */}
                                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-end w-full sm:w-auto">
                                        <span className="sm:hidden text-xs font-semibold text-slate-500">Subtotal:</span>
                                        <span className="text-sm font-black text-slate-900">
                                            {currency}{(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>

                                    {/* Remove Button (1 Col) */}
                                    <div className="sm:col-span-1 flex justify-end sm:justify-center w-full sm:w-auto pt-2 sm:pt-0">
                                        <button
                                            onClick={() => handleDeleteItem(item.id, item.name)}
                                            className="size-8 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-all cursor-pointer"
                                            title="Remove item"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Order Summary Checkout Card */}
                    <OrderSummary totalPrice={totalPrice} items={cartArray} />

                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-[75vh] px-4 flex items-center justify-center">
            <div className="max-w-md w-full text-center p-8 bg-white rounded-3xl border border-slate-200/80 shadow-sm">
                <div className="size-20 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag size={36} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Your Shopping Bag is Empty</h2>
                <p className="text-xs sm:text-sm text-slate-500 mb-8 leading-relaxed">
                    Looks like you haven't added any products yet. Browse through our curated collection of tech and lifestyle gear!
                </p>
                <Link
                    href="/shop"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all hover:scale-102 active:scale-98"
                >
                    <span>Explore Products</span>
                    <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    );
}
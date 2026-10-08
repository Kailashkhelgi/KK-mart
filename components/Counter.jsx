'use client'
import { addToCart, removeFromCart } from "@/lib/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Minus } from "lucide-react";

const Counter = ({ productId }) => {
    const { cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const addToCartHandler = (e) => {
        e.preventDefault();
        dispatch(addToCart({ productId }));
    };

    const removeFromCartHandler = (e) => {
        e.preventDefault();
        dispatch(removeFromCart({ productId }));
    };

    const currentQty = cartItems[productId] || 0;

    return (
        <div className="inline-flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-slate-800 font-bold text-sm shadow-inner">
            <button
                onClick={removeFromCartHandler}
                className="size-8 rounded-xl bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center transition active:scale-90 shadow-xs cursor-pointer"
                title="Decrease"
            >
                <Minus size={14} />
            </button>
            <span className="w-10 text-center font-extrabold text-slate-900 select-none">
                {currentQty}
            </span>
            <button
                onClick={addToCartHandler}
                className="size-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition active:scale-90 shadow-xs cursor-pointer"
                title="Increase"
            >
                <Plus size={14} />
            </button>
        </div>
    );
};

export default Counter;
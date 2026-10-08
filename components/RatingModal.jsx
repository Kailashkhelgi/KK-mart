'use client'
import { Star, X, MessageSquare, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRating } from '@/lib/features/rating/ratingSlice';
import toast from 'react-hot-toast';
import { dummyUserData } from '@/assets/assets';

const RatingModal = ({ ratingModal, setRatingModal, productId, productName }) => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating <= 0 || rating > 5) {
            return toast.error('Please select a star rating between 1 and 5');
        }
        if (review.trim().length < 4) {
            return toast.error('Please write at least a few words about your experience');
        }

        const newRatingObj = {
            id: `rat_${Date.now()}`,
            rating: Number(rating),
            review: review.trim(),
            productId: productId || "prod_1",
            createdAt: new Date().toISOString(),
            user: {
                name: dummyUserData.name || "Happy Customer",
                image: dummyUserData.image
            }
        };

        dispatch(addRating(newRatingObj));
        toast.success('Your review has been submitted!', {
            style: {
                borderRadius: '12px',
                background: '#0f172a',
                color: '#fff',
                fontSize: '13px'
            },
            icon: '🌟'
        });
        setRatingModal(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl w-full max-w-md relative border border-slate-200 animate-in zoom-in-95 duration-200">
                
                {/* Close Button */}
                <button
                    onClick={() => setRatingModal(null)}
                    className="absolute top-4 right-4 size-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
                >
                    <X size={18} />
                </button>

                {/* Header */}
                <div className="flex items-center gap-2 mb-1">
                    <span className="p-2 rounded-xl bg-amber-50 text-amber-500">
                        <Sparkles size={20} />
                    </span>
                    <h2 className="text-xl font-black text-slate-900">Review & Rate</h2>
                </div>
                <p className="text-xs text-slate-500 mb-6">
                    Share your experience with <strong>{productName || 'this product'}</strong>
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Star Selector */}
                    <div className="flex flex-col items-center justify-center bg-slate-50 py-4 px-6 rounded-2xl border border-slate-100">
                        <span className="text-xs font-semibold text-slate-500 mb-2">Overall Rating</span>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(star)}
                                    className="p-1 hover:scale-125 transition-transform cursor-pointer"
                                >
                                    <Star
                                        size={28}
                                        fill={(hoverRating || rating) >= star ? "#f59e0b" : "none"}
                                        className={(hoverRating || rating) >= star ? "text-amber-500" : "text-slate-300"}
                                    />
                                </button>
                            ))}
                        </div>
                        <span className="text-xs font-bold text-amber-600 mt-2">
                            {rating === 5 ? '⭐⭐⭐⭐⭐ Exceptional (5/5)' :
                             rating === 4 ? '⭐⭐⭐⭐ Great (4/5)' :
                             rating === 3 ? '⭐⭐⭐ Average (3/5)' :
                             rating === 2 ? '⭐⭐ Poor (2/5)' : '⭐ Terrible (1/5)'}
                        </span>
                    </div>

                    {/* Review Textarea */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Your Feedback
                        </label>
                        <textarea
                            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition"
                            placeholder="What did you like or dislike? How was the build quality and performance?"
                            rows={4}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setRatingModal(null)}
                            className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-102 active:scale-98"
                        >
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RatingModal;
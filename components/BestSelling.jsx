'use client'
import React from 'react';
import Title from './Title';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';

const BestSelling = () => {
    const displayQuantity = 8;
    const products = useSelector(state => state.product.list);

    const bestSellers = [...products]
        .sort((a, b) => (b.rating?.length || 0) - (a.rating?.length || 0))
        .slice(0, displayQuantity);

    return (
        <section className="px-4 sm:px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <Title 
                    title="Best Selling & Top Rated" 
                    description={`Top-rated tech and gadgets loved and verified by thousands of shoppers.`} 
                    href="/shop" 
                />
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {bestSellers.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestSelling;
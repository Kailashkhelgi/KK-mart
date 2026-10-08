'use client'
import React from 'react';
import Title from './Title';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';

const LatestProducts = () => {
    const displayQuantity = 4;
    const products = useSelector(state => state.product.list);

    const latest = [...products]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, displayQuantity);

    return (
        <section className="px-4 sm:px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <Title 
                    title="Fresh New Arrivals" 
                    description={`Discover the newest releases added by verified stores this week.`} 
                    href="/shop" 
                />
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {latest.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestProducts;
'use client'
import React from 'react';
import Title from './Title';
import { ourSpecsData } from '@/assets/assets';

const OurSpecs = () => {
    return (
        <section className="px-4 sm:px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <Title 
                    visibleButton={false} 
                    title="Why Shop With KK Mart" 
                    description="We guarantee top-tier service, buyer protection, and swift dispatch so you can shop with 100% confidence." 
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    {ourSpecsData.map((spec, index) => {
                        const Icon = spec.icon;
                        return (
                            <div 
                                key={index} 
                                className="relative rounded-3xl p-8 bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
                            >
                                <div 
                                    className="size-14 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 mb-6"
                                    style={{ 
                                        backgroundColor: spec.accent,
                                        boxShadow: `0 10px 25px -5px ${spec.accent}66`
                                    }}
                                >
                                    <Icon size={26} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                                    {spec.title}
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                                    {spec.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OurSpecs;
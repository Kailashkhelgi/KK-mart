'use client'
import { Check, Sparkles, Zap, ShieldCheck, ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
    const [annualBilling, setAnnualBilling] = useState(true);

    const plans = [
        {
            name: "Starter Merchant",
            badge: "Free Tier",
            priceMonthly: 0,
            priceAnnual: 0,
            description: "Ideal for new creators and independent makers testing the waters.",
            features: [
                "Up to 15 active product listings",
                "Standard merchant storefront",
                "Standard 7-day payout schedule",
                "5% platform transaction fee",
                "Community & email support",
                "Customer rating & reviews",
            ],
            cta: "Get Started Free",
            ctaLink: "/create-store",
            popular: false
        },
        {
            name: "Growth Pro",
            badge: "Most Popular",
            priceMonthly: 29,
            priceAnnual: 24,
            description: "For expanding brands and fast-selling stores looking for high scale.",
            features: [
                "Unlimited product listings",
                "Featured search ranking & badges",
                "Custom store username & banner",
                "Low 2% platform transaction fee",
                "Instant 24-hour revenue payouts",
                "Promotional coupon creator tool",
                "Advanced sales & order analytics",
                "Priority 24/7 seller support"
            ],
            cta: "Launch Pro Store",
            ctaLink: "/create-store",
            popular: true
        },
        {
            name: "Enterprise Scale",
            badge: "Full Power",
            priceMonthly: 99,
            priceAnnual: 79,
            description: "High-volume retailers and authorized flagship distributors.",
            features: [
                "Everything in Growth Pro",
                "0% platform transaction fee",
                "Dedicated merchant success manager",
                "Homepage hero spotlight placement",
                "Custom invoice and branding tags",
                "Bulk CSV product import/export",
                "VIP API access & webhooks"
            ],
            cta: "Contact Enterprise",
            ctaLink: "/create-store",
            popular: false
        }
    ];

    const faqs = [
        {
            q: "How fast can I start selling after registering?",
            a: "Store applications are reviewed and typically approved within 15 minutes by our automated admin verification pipeline."
        },
        {
            q: "When and how do I receive my earnings?",
            a: "Funds are automatically transferred to your connected bank account or Stripe profile depending on your selected payout schedule."
        },
        {
            q: "Can I switch or upgrade plans anytime?",
            a: "Yes! You can upgrade, downgrade, or cancel your subscription at any point directly from your Vendor Dashboard."
        }
    ];

    return (
        <div className="min-h-screen px-4 sm:px-6 py-12">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
                        <Sparkles size={14} />
                        <span>Seller Monetization Plans</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
                        Simple, Transparent Plans <br />
                        <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                            Built for Every Stage of Growth
                        </span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                        Open your multi-vendor digital shop today. Connect with thousands of tech buyers worldwide with zero hidden costs.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <span className={`text-xs font-bold ${!annualBilling ? 'text-slate-900' : 'text-slate-500'}`}>
                            Monthly Billing
                        </span>
                        <button
                            onClick={() => setAnnualBilling(!annualBilling)}
                            className="relative w-14 h-8 rounded-full bg-slate-900 p-1 transition-colors cursor-pointer"
                        >
                            <div className={`size-6 rounded-full bg-white transition-transform ${annualBilling ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                        <span className={`text-xs font-bold flex items-center gap-1.5 ${annualBilling ? 'text-indigo-600' : 'text-slate-500'}`}>
                            Annual Billing
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                                Save 20%
                            </span>
                        </span>
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
                    {plans.map((plan, idx) => {
                        const price = annualBilling ? plan.priceAnnual : plan.priceMonthly;
                        return (
                            <div
                                key={idx}
                                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                                    plan.popular
                                        ? 'bg-slate-950 text-white shadow-2xl ring-2 ring-indigo-500 transform lg:-translate-y-2'
                                        : 'bg-white text-slate-800 border border-slate-200/80 shadow-sm hover:border-slate-300'
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                                        ⭐ {plan.badge}
                                    </div>
                                )}

                                <div>
                                    {/* Plan Title & Badge */}
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <h3 className="text-xl font-black">{plan.name}</h3>
                                        {!plan.popular && (
                                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                                                {plan.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-xs mb-6 ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                                        {plan.description}
                                    </p>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-200/20">
                                        <span className="text-4xl sm:text-5xl font-black tracking-tight">
                                            ${price}
                                        </span>
                                        <span className={`text-xs ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                                            / month {annualBilling && '(billed yearly)'}
                                        </span>
                                    </div>

                                    {/* Features Checklist */}
                                    <ul className="space-y-3.5 mb-8 text-xs sm:text-sm">
                                        {plan.features.map((feat, fIdx) => (
                                            <li key={fIdx} className="flex items-start gap-2.5">
                                                <div className={`size-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                                    plan.popular ? 'bg-indigo-500/30 text-cyan-400' : 'bg-emerald-100 text-emerald-600'
                                                }`}>
                                                    <Check size={11} strokeWidth={3} />
                                                </div>
                                                <span className={plan.popular ? 'text-slate-300' : 'text-slate-600'}>
                                                    {feat}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA Button */}
                                <Link
                                    href={plan.ctaLink}
                                    className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                                        plan.popular
                                            ? 'bg-gradient-to-r from-indigo-500 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 text-white shadow-lg shadow-indigo-500/25 hover:scale-102 active:scale-98'
                                            : 'bg-slate-100 hover:bg-slate-200 text-slate-900 active:scale-98'
                                    }`}
                                >
                                    <span>{plan.cta}</span>
                                    <ArrowRight size={15} />
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                            <HelpCircle size={20} />
                        </span>
                        <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
                    </div>

                    <div className="divide-y divide-slate-100 space-y-4">
                        {faqs.map((faq, fIdx) => (
                            <div key={fIdx} className="pt-4 first:pt-0">
                                <h4 className="font-bold text-sm text-slate-800 mb-1.5">{faq.q}</h4>
                                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
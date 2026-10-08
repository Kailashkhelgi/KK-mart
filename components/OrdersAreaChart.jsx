'use client'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function OrdersAreaChart({ allOrders = [] }) {
    // Group orders by date
    const ordersPerDay = allOrders.reduce((acc, order) => {
        const date = new Date(order.createdAt).toISOString().split('T')[0]; // format: YYYY-MM-DD
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    // Convert to array for Recharts
    const chartData = Object.entries(ordersPerDay).map(([date, count]) => ({
        date: date.slice(5), // MM-DD
        orders: count
    }));

    return (
        <div className="w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                        dataKey="date"
                        stroke="#94a3b8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis
                        allowDecimals={false}
                        stroke="#94a3b8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#0f172a',
                            borderRadius: '16px',
                            border: 'none',
                            color: '#fff',
                            fontSize: '12px',
                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                            padding: '8px 14px'
                        }}
                        itemStyle={{ color: '#38bdf8', fontWeight: 'bold' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="orders"
                        name="Orders"
                        stroke="#6366f1"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#orderGradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

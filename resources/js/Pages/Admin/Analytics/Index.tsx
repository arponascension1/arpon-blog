import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    AreaChart,
    Area
} from 'recharts';

interface DailyView {
    date: string;
    views: number;
}

interface CategoryView {
    name: string;
    views: number;
}

interface TopPost {
    title: string;
    views: number;
    slug: string;
}

interface AnalyticsProps {
    daily_views: DailyView[];
    category_views: CategoryView[];
    top_posts: TopPost[];
    stats: {
        total_views: number;
        views_today: number;
        avg_views_per_post: number;
        most_active_category: string;
    };
}

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4'];

export default function Index({ daily_views, category_views, top_posts, stats }: AnalyticsProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <AdminLayout>
            <Head title="Analytics Dashboard" />

            <div className="py-10 bg-[#f8fafc] min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Performance Analytics</h1>
                            <p className="mt-2 text-gray-500 font-medium">Detailed insights into your blog's traffic and engagement.</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex space-x-3">
                            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                                Last 30 Days
                            </button>
                            <button className="px-4 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-md">
                                Export Report
                            </button>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Total Reach</p>
                            <div className="flex items-end justify-between">
                                <div>
                                    <h3 className="text-3xl font-black text-gray-900">{stats.total_views.toLocaleString()}</h3>
                                    <p className="text-xs text-green-600 font-bold mt-1">+12.5% from last month</p>
                                </div>
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Views Today</p>
                            <div className="flex items-end justify-between">
                                <div>
                                    <h3 className="text-3xl font-black text-gray-900">{stats.views_today.toLocaleString()}</h3>
                                    <p className="text-xs text-blue-600 font-bold mt-1">Live tracking active</p>
                                </div>
                                <div className="p-3 bg-pink-50 text-pink-600 rounded-2xl">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Avg. Engagement</p>
                            <div className="flex items-end justify-between">
                                <div>
                                    <h3 className="text-3xl font-black text-gray-900">{stats.avg_views_per_post.toFixed(1)}</h3>
                                    <p className="text-xs text-gray-500 font-medium mt-1">Views per article</p>
                                </div>
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Hot Category</p>
                            <div className="flex items-end justify-between">
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 truncate max-w-[150px]">{stats.most_active_category}</h3>
                                    <p className="text-xs text-orange-600 font-bold mt-1">Trending now</p>
                                </div>
                                <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.5-7 3 3 3 3.333 3.5 5 1.5 1 3 3 3 5.5 0 1.98-.79 3.772-2.07 5.07z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12.343 14.343L11 11l-1.343 3.343L7 16l3.343 1.343L11 20l1.343-3.343L16 15l-3.657-1.657z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                        {/* Traffic Overview Graph */}
                        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h3 className="text-xl font-black text-gray-900">Traffic Overview</h3>
                                    <p className="text-sm text-gray-500 font-medium mt-1">Daily views for the past month</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="h-3 w-3 rounded-full bg-blue-600"></span>
                                    <span className="text-xs font-bold text-gray-600">Page Views</span>
                                </div>
                            </div>
                            <div className="h-[400px] w-full">
                                {isClient ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={daily_views}>
                                            <defs>
                                                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis 
                                                dataKey="date" 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                                                dy={10}
                                            />
                                            <YAxis 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                                            />
                                            <Tooltip 
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '12px' }}
                                                itemStyle={{ fontWeight: 800, color: '#1e293b' }}
                                            />
                                            <Area 
                                                type="monotone" 
                                                dataKey="views" 
                                                stroke="#3B82F6" 
                                                strokeWidth={4} 
                                                fillOpacity={1} 
                                                fill="url(#colorViews)" 
                                                animationDuration={1500}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full w-full bg-gray-50 rounded-2xl animate-pulse flex items-center justify-center">
                                        <span className="text-gray-300 font-bold italic tracking-widest">Generating Chart...</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Category Distribution */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-black text-gray-900 mb-2">Topic Performance</h3>
                            <p className="text-sm text-gray-500 font-medium mb-10">Views by category</p>
                            <div className="h-[300px] w-full">
                                {isClient ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={category_views}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={5}
                                                dataKey="views"
                                                animationDuration={1500}
                                            >
                                                {category_views.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full w-full rounded-full border-8 border-gray-50 animate-pulse"></div>
                                )}
                            </div>
                            <div className="mt-6 space-y-3">
                                {category_views.slice(0, 4).map((cat, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                                            <span className="text-sm font-bold text-gray-700">{cat.name}</span>
                                        </div>
                                        <span className="text-xs font-black text-gray-400">{(cat.views).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Top Performing Articles */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black text-gray-900">Elite Performance</h3>
                                <Link href="/admin/posts" className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">View All Posts</Link>
                            </div>
                            <div className="space-y-6">
                                {top_posts.map((post, i) => (
                                    <div key={i} className="group flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-10 w-10 bg-gray-100 rounded-xl flex items-center justify-center font-black text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                                                {i + 1}
                                            </div>
                                            <div className="max-w-[200px] md:max-w-[350px]">
                                                <h4 className="text-sm font-bold text-gray-900 truncate">{post.title}</h4>
                                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">/posts/{post.slug}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-lg font-black text-gray-900">{post.views.toLocaleString()}</span>
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Views</p>
                                        </div>
                                    </div>
                                ))}
                                {top_posts.length === 0 && (
                                    <div className="py-10 text-center text-gray-400 italic font-medium">No engagement data available yet.</div>
                                )}
                            </div>
                        </div>

                        {/* Recent Trends / Bar Chart */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-black text-gray-900 mb-2">Category Benchmarks</h3>
                            <p className="text-sm text-gray-500 font-medium mb-10">Popularity comparison by topic</p>
                            <div className="h-[400px] w-full">
                                {isClient ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={category_views}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis 
                                                dataKey="name" 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                            />
                                            <YAxis 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                            />
                                            <Tooltip 
                                                cursor={{fill: '#f8fafc'}}
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                            />
                                            <Bar 
                                                dataKey="views" 
                                                fill="#8B5CF6" 
                                                radius={[10, 10, 0, 0]} 
                                                barSize={40}
                                                animationDuration={2000}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full w-full flex items-end space-x-4">
                                        {[1,2,3,4,5].map(i => <div key={i} className="flex-1 bg-gray-50 rounded-t-xl" style={{ height: `${i*20}%` }}></div>)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

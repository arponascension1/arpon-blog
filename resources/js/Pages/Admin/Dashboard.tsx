import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

interface Post {
    id: number;
    title: string;
    status: 'published' | 'draft';
    published_at: string;
    views: number;
    category: { name: string } | null;
    author: { name: string };
}

interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    created_at: string;
}

interface CategoryStat {
    name: string;
    posts_count: number;
    total_views: number;
}

import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend, Cell
} from 'recharts';

interface Post {
    id: number;
    title: string;
    status: 'published' | 'draft';
    published_at: string;
    views: number;
    category: { name: string } | null;
    author: { name: string };
}

interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    created_at: string;
}

interface CategoryStat {
    name: string;
    posts_count: number;
    total_views: number;
}

interface DashboardProps {
    stats: {
        total_users: number;
        total_posts: number;
        total_views: number;
        total_categories: number;
        total_tags: number;
        admin_users: number;
        published_posts: number;
        draft_posts: number;
    };
    recent_posts: Post[];
    popular_posts: Post[];
    recent_users: User[];
    category_stats: CategoryStat[];
    recent_activity: Array<{
        id: string;
        type: string;
        user: string;
        post: string;
        created_at: string;
    }>;
    chart_data: Array<{
        date: string;
        views: number;
        users: number;
    }>;
}

export default function Dashboard({ stats, recent_posts, popular_posts, recent_users, category_stats, recent_activity, chart_data }: DashboardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                        <p className="mt-1 text-sm text-gray-600">Quick overview of your application's current state.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                        <StatCard 
                            title="Total Views" 
                            value={stats.total_views} 
                            description="All-time article views"
                            icon={
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            }
                            colorClass="bg-pink-500"
                        />
                        <StatCard 
                            title="Total Posts" 
                            value={stats.total_posts} 
                            description={`${stats.published_posts} published articles`}
                            icon={
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            }
                            colorClass="bg-blue-500"
                        />
                        <StatCard 
                            title="Total Users" 
                            value={stats.total_users} 
                            description={`${stats.admin_users} administrators`}
                            icon={
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            }
                            colorClass="bg-green-500"
                        />
                        <StatCard 
                            title="Categories" 
                            value={stats.total_categories} 
                            description="Active topics"
                            icon={
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            }
                            colorClass="bg-purple-500"
                        />
                    </div>

                    {/* Analytics Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Traffic Overview</h3>
                                    <p className="text-sm text-gray-500">Post views over the last 14 days</p>
                                </div>
                                <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                                    <span>Views</span>
                                </div>
                            </div>
                            <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chart_data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis 
                                            dataKey="date" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }} 
                                            dy={10}
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
                                        />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                            itemStyle={{ fontSize: '12px', fontWeight: 900, color: '#1f2937' }}
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="views" 
                                            stroke="#3b82f6" 
                                            strokeWidth={3} 
                                            fillOpacity={1} 
                                            fill="url(#colorViews)" 
                                            animationDuration={1500}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">New Members</h3>
                                    <p className="text-sm text-gray-500">Registrations (14d)</p>
                                </div>
                                <div className="p-2 bg-green-50 rounded-md text-green-600">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chart_data} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis 
                                            dataKey="date" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
                                            dy={10}
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
                                        />
                                        <Tooltip 
                                            cursor={{ fill: '#f9fafb' }}
                                            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                            itemStyle={{ fontSize: '12px', fontWeight: 900, color: '#10b981' }}
                                        />
                                        <Bar dataKey="users" fill="#10b981" radius={[4, 4, 0, 0]} barSize={12} animationDuration={1500} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Popular Posts */}
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Popular Content</h3>
                                    <p className="mt-1 text-sm text-gray-500">The most read stories on your blog.</p>
                                </div>
                                <div className="p-2 bg-pink-50 rounded-md text-pink-600">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                            </div>
                            <div className="px-4 py-5 sm:p-0">
                                <ul className="divide-y divide-gray-200">
                                    {popular_posts.map((post) => (
                                        <li key={post.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <Link href={`/admin/posts/${post.id}/edit`} className="text-sm font-semibold text-gray-900 truncate">
                                                        {post.title}
                                                    </Link>
                                                    <span className="text-xs text-gray-500 mt-1">{post.category?.name || 'Uncategorized'}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg font-black text-gray-900">{post.views.toLocaleString()}</span>
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Views</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    {popular_posts.length === 0 && (
                                        <li className="px-4 py-8 text-center text-gray-500 italic">No data yet.</li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Category Performance */}
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Category Impact</h3>
                                    <p className="mt-1 text-sm text-gray-500">Distribution of interest across topics.</p>
                                </div>
                                <div className="p-2 bg-purple-50 rounded-md text-purple-600">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V1.512A9.025 9.025 0 0120.488 9z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-6">
                                    {category_stats.map((cat, i) => {
                                        const maxViews = Math.max(...category_stats.map(c => c.total_views), 1);
                                        const percentage = (cat.total_views / maxViews) * 100;
                                        return (
                                            <div key={i}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-bold text-gray-700">{cat.name}</span>
                                                    <span className="text-xs font-black text-gray-400 uppercase">{cat.total_views.toLocaleString()} Views</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-2">
                                                    <div 
                                                        className="bg-purple-600 h-2 rounded-full transition-all duration-1000" 
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {category_stats.length === 0 && (
                                        <div className="py-8 text-center text-gray-500 italic">No category data yet.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Recent Posts */}
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Posts</h3>
                                    <p className="mt-1 text-sm text-gray-500">The latest articles published on your blog.</p>
                                </div>
                                <Link href="/admin/posts" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                    View all
                                </Link>
                            </div>
                            <div className="px-4 py-5 sm:p-0">
                                <ul className="divide-y divide-gray-200">
                                    {recent_posts.map((post) => (
                                        <li key={post.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <Link href={`/admin/posts/${post.id}/edit`} className="text-sm font-semibold text-blue-600 truncate">
                                                        {post.title}
                                                    </Link>
                                                    <div className="flex items-center mt-1">
                                                        <span className="text-xs text-gray-500">{post.author.name}</span>
                                                        <span className="mx-2 text-gray-300">•</span>
                                                        <span className="text-xs text-gray-500">{post.category?.name || 'Uncategorized'}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {post.status}
                                                    </span>
                                                    <span className="ml-4 text-xs text-gray-400">
                                                        {formatDate(post.published_at || (post as any).created_at)}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    {recent_posts.length === 0 && (
                                        <li className="px-4 py-8 text-center text-gray-500 italic">No posts found yet.</li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Recent Users */}
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Users</h3>
                                    <p className="mt-1 text-sm text-gray-500">Latest people to join your platform.</p>
                                </div>
                                <Link href="/admin/users" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                    View all
                                </Link>
                            </div>
                            <div className="px-4 py-5 sm:p-0">
                                <ul className="divide-y divide-gray-200">
                                    {recent_users.map((user) => (
                                        <li key={user.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                        <div className="text-sm text-gray-500">{user.email}</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    {user.is_admin ? (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 mb-1">
                                                            Admin
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 mb-1">
                                                            User
                                                        </span>
                                                    )}
                                                    <span className="text-xs text-gray-400">
                                                        Joined {formatDate(user.created_at)}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    {recent_users.length === 0 && (
                                        <li className="px-4 py-8 text-center text-gray-500 italic">No users found yet.</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity Feed */}
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 mb-8">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Platform Activity</h3>
                                <p className="mt-1 text-sm text-gray-500">Real-time interactions from your readers.</p>
                            </div>
                            <div className="p-2 bg-blue-50 rounded-md text-blue-600">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="p-6">
                            {recent_activity.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {recent_activity.map((activity) => (
                                        <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                                            <div className={`p-2.5 rounded-lg shrink-0 ${
                                                activity.type === 'like' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                                            }`}>
                                                {activity.type === 'like' ? (
                                                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm text-gray-900 font-bold truncate group-hover:text-blue-600 transition-colors">
                                                    {activity.post}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    <span className="font-black text-gray-900">{activity.user}</span> 
                                                    {activity.type === 'like' ? ' liked this' : ' read this'}
                                                </p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">
                                                    {activity.created_at}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <div className="inline-flex items-center justify-center p-4 bg-gray-50 rounded-full text-gray-300 mb-4">
                                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500 italic">Waiting for the first interactions...</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions & System Status */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Link
                                        href="/admin/posts/create"
                                        className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors group"
                                    >
                                        <div className="p-3 bg-blue-600 rounded-md text-white mr-4">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">New Article</p>
                                            <p className="text-xs text-gray-500">Draft a new post</p>
                                        </div>
                                    </Link>
                                    <Link
                                        href="/admin/media"
                                        className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors group"
                                    >
                                        <div className="p-3 bg-purple-600 rounded-md text-white mr-4">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Media Library</p>
                                            <p className="text-xs text-gray-500">Manage your images</p>
                                        </div>
                                    </Link>
                                    <Link
                                        href="/admin/categories/create"
                                        className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors group"
                                    >
                                        <div className="p-3 bg-green-600 rounded-md text-white mr-4">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Add Category</p>
                                            <p className="text-xs text-gray-500">New topic for posts</p>
                                        </div>
                                    </Link>
                                    <Link
                                        href="/admin/users/create"
                                        className="flex items-center p-4 bg-orange-50 rounded-lg border border-orange-100 hover:bg-orange-100 transition-colors group"
                                    >
                                        <div className="p-3 bg-orange-600 rounded-md text-white mr-4">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Invite User</p>
                                            <p className="text-xs text-gray-500">Register new staff</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">System</h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500 font-medium">Server</span>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Online
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500 font-medium">Database</span>
                                        <span className="text-sm text-gray-900 font-bold">SQLite</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500 font-medium">PHP</span>
                                        <span className="text-sm text-gray-900 font-bold">v8.3.6</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500 font-medium">Laravel</span>
                                        <span className="text-sm text-gray-900 font-bold">v12.0</span>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <div className="flex items-center text-xs text-gray-400">
                                            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Last backup: 2 hours ago
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

interface StatCardProps {
    title: string;
    value: number;
    description: string;
    icon: React.ReactNode;
    colorClass: string;
}

function StatCard({ title, value, description, icon, colorClass }: StatCardProps) {
    return (
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-5">
                <div className="flex items-center">
                    <div className={`flex-shrink-0 ${colorClass} rounded-lg p-3 shadow-inner`}>
                        {icon}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                {title}
                            </dt>
                            <dd className="flex items-baseline">
                                <div className="text-2xl font-bold text-gray-900">
                                    {value}
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="text-xs font-medium text-gray-500">
                    {description}
                </div>
            </div>
        </div>
    );
}

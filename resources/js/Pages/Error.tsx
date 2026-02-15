import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import SEO from '@/Components/SEO';
import { Link } from '@inertiajs/react';

interface ErrorProps {
    status: number;
    message?: string;
}

export default function Error({ status, message }: ErrorProps) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status] || 'Error';

    const description = message || {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status] || 'An unexpected error occurred.';

    return (
        <PublicLayout>
            <SEO title={title} robots="noindex" />
            
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                <div className="mb-12">
                    <h1 className="text-[12rem] md:text-[16rem] font-black text-gray-100 leading-none select-none">
                        {status}
                    </h1>
                    <div className="relative -mt-20 md:-mt-24">
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">
                            {title.split(': ')[1] || title}
                        </h2>
                        <p className="text-xl text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                        href="/" 
                        className="px-10 py-5 bg-black text-white font-black rounded-2xl hover:bg-gray-800 transition-all hover:shadow-2xl hover:-translate-y-1"
                    >
                        Back to Home
                    </Link>
                    <Link 
                        href={route('blog.articles')} 
                        className="px-10 py-5 bg-white text-black font-black border-2 border-gray-100 rounded-2xl hover:border-black transition-all"
                    >
                        Browse Articles
                    </Link>
                </div>

                {/* Search suggestion for 404 */}
                {status === 404 && (
                    <div className="mt-20 pt-12 border-t border-gray-100 w-full max-w-2xl">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Or try searching for something else</p>
                        <form action={route('blog.search')} method="GET" className="relative group">
                            <input 
                                type="text" 
                                name="search"
                                placeholder="Search our stories..." 
                                className="w-full pl-12 pr-4 py-5 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-black transition-all"
                            />
                            <svg className="absolute left-4 top-4.5 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </form>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}

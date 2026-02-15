import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import SEO from '@/Components/SEO';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { Link, router } from '@inertiajs/react';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string;
    featured_image_alt?: string;
    published_at: string;
    meta_keywords?: string;
    category: { name: string, slug: string } | null;
    author: { name: string };
    tags: { name: string, slug: string }[];
}

interface ArticlesProps {
    posts: {
        data: Post[];
        links: any[];
        current_page: number;
        last_page: number;
        total: number;
    };
    categories: { name: string, slug: string }[];
    tags: { name: string, slug: string }[];
    filters: {
        category?: string;
        tag?: string;
        sort?: string;
    };
}

export default function Articles({ posts, categories, tags, filters }: ArticlesProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        if (!value) delete (newFilters as any)[key];
        router.get(route('blog.articles'), newFilters, { preserveState: true });
    };

    return (
        <PublicLayout>
            <SEO 
                title="Archive of Stories" 
                description="Browse our complete archive of thoughts, tutorials, and insights. Find all our stories in one place."
                breadcrumbs={[{ label: 'Articles', url: route('blog.articles') }]}
            />
            
            {/* Page Header */}
            <section className="bg-white border-b border-gray-100 pt-32 pb-24">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
                    <Breadcrumbs items={[{ label: 'Articles', active: true }]} />
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                        <div className="max-w-2xl">
                            <span className="inline-block py-1.5 px-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8 animate-fadeIn">
                                Library
                            </span>
                            <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-10 animate-slideUp">
                                Every Story <br />
                                <span className="text-blue-600">Ever Told.</span>
                            </h1>
                            <p className="text-xl text-gray-500 font-medium animate-slideUp delay-100">
                                Browse our complete archive of thoughts, tutorials, and insights across all categories.
                            </p>
                        </div>
                        
                        {/* Sorting Dropdown */}
                        <div className="animate-slideUp delay-200">
                            <select 
                                value={filters.sort || 'latest'}
                                onChange={(e) => handleFilterChange('sort', e.target.value)}
                                className="appearance-none px-10 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest focus:border-black focus:ring-0 transition-all cursor-pointer"
                            >
                                <option value="latest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="popular">Most Popular</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Navigation */}
            <section className="sticky top-20 z-40 bg-[#fafafa]/80 backdrop-blur-md border-b border-gray-100 py-6">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
                    <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-2">
                        <button 
                            onClick={() => handleFilterChange('category', '')}
                            className={`whitespace-nowrap text-xs font-black uppercase tracking-widest transition-all ${!filters.category ? 'text-blue-600' : 'text-gray-400 hover:text-black'}`}
                        >
                            All Topics
                        </button>
                        <div className="h-4 w-[1px] bg-gray-200 shrink-0"></div>
                        {categories.map((cat) => (
                            <button
                                key={cat.slug}
                                onClick={() => handleFilterChange('category', cat.slug)}
                                className={`whitespace-nowrap text-xs font-black uppercase tracking-widest transition-all ${filters.category === cat.slug ? 'text-blue-600' : 'text-gray-400 hover:text-black'}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                        {posts.data.map((post) => (
                            <article key={post.id} className="flex flex-col group animate-fadeIn">
                                <div className="mb-8 relative group overflow-hidden rounded-[2.5rem] shadow-sm bg-white p-3 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                                    <Link href={route('posts.show', post.slug)} className="block">
                                        <div className="aspect-[1/1] overflow-hidden rounded-[2rem]">
                                            <img 
                                                src={post.featured_image} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                                alt={post.featured_image_alt || post.title}
                                            />
                                        </div>
                                    </Link>
                                    <div className="absolute top-8 left-8 z-10">
                                        {post.category && (
                                            <Link 
                                                href={route('blog.category', post.category.slug)}
                                                className="py-2 px-4 bg-white/90 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest text-black shadow-lg hover:bg-black hover:text-white transition-all"
                                            >
                                                {post.category.name}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                                <div className="px-2">
                                    <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                                        <span>{formatDate(post.published_at)}</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 leading-[1.2] mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        <Link href={route('posts.show', post.slug)}>{post.title}</Link>
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed text-sm mb-8 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center font-bold text-white text-[10px]">
                                                {post.author.name.charAt(0)}
                                            </div>
                                            <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{post.author.name}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            {post.tags.slice(0, 1).map(tag => (
                                                <span key={tag.slug} className="text-[9px] font-black text-blue-600 uppercase tracking-widest">#{tag.name}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {posts.data.length === 0 && (
                        <div className="text-center py-40">
                            <div className="h-24 w-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center mx-auto mb-10 text-gray-300">
                                <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM14 4v4h4" /></svg>
                            </div>
                            <h3 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">No stories found.</h3>
                            <p className="text-gray-500 mb-12">Try adjusting your filters or search keywords.</p>
                            <button 
                                onClick={() => router.get(route('blog.articles'))}
                                className="px-10 py-5 bg-black text-white font-black rounded-2xl hover:bg-gray-800 transition-all shadow-2xl"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {posts.last_page > 1 && (
                        <div className="mt-32 flex justify-center">
                            <div className="flex space-x-3">
                                {posts.links.map((link: any, i: number) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`h-14 w-14 flex items-center justify-center rounded-[1.5rem] text-xs font-black transition-all shadow-sm ${
                                            link.active 
                                                ? 'bg-black text-white shadow-xl scale-110 z-10' 
                                                : 'bg-white text-gray-400 hover:text-black border border-gray-100 hover:shadow-md'
                                        } ${!link.url && 'opacity-30 cursor-not-allowed'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <style dangerouslySetInnerHTML={{ __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slideUp {
                    animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
                }
                .animate-fadeIn {
                    animation: fadeIn 1s ease both;
                }
                .delay-100 { animation-delay: 100ms; }
                .delay-200 { animation-delay: 200ms; }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}} />
        </PublicLayout>
    );
}

declare function route(name: string, params?: any): string;

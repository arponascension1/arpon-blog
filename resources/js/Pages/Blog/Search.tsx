import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import SEO from '@/Components/SEO';
import { Link } from '@inertiajs/react';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string;
    published_at: string;
    category: { name: string, slug: string } | null;
    author: { name: string };
    tags: { name: string, slug: string }[];
}

interface SearchProps {
    posts: {
        data: Post[];
        links: any[];
        current_page: number;
        last_page: number;
        total: number;
    };
    search: string;
    categories: { name: string, slug: string, posts_count: number }[];
    popular_tags: { name: string, slug: string, posts_count: number }[];
}

export default function Search({ posts, search, categories, popular_tags }: SearchProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <PublicLayout>
            <SEO 
                title={`Search results for "${search}"`} 
                robots="noindex, follow"
            />
            
            {/* Search Header */}
            <div className="bg-white border-b border-gray-100 pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                    <div className="max-w-3xl">
                        <span className="inline-block py-1 px-3 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-md mb-6 animate-fadeIn">
                            Discovery
                        </span>
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6 leading-tight animate-slideUp">
                            Results for <span className="text-blue-600">"{search}"</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-medium animate-slideUp delay-100">
                            We found {posts.total} matches for your query across articles, categories, and tags.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-24">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Main Results */}
                    <div className="lg:w-2/3">
                        <div className="grid grid-cols-1 gap-16">
                            {posts.data.map((post) => (
                                <article key={post.id} className="group animate-fadeIn">
                                    <div className="flex flex-col md:flex-row gap-10">
                                        <div className="md:w-2/5 flex-shrink-0">
                                            <Link href={route('posts.show', post.slug)}>
                                                <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500">
                                                    <img 
                                                        src={post.featured_image} 
                                                        className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                                                        alt={post.title} 
                                                    />
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <div className="flex items-center space-x-3 mb-4">
                                                {post.category && (
                                                    <Link 
                                                        href={route('blog.category', post.category.slug)}
                                                        className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-md hover:bg-blue-600 hover:text-white transition-all"
                                                    >
                                                        {post.category.name}
                                                    </Link>
                                                )}
                                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                                                    {formatDate(post.published_at)}
                                                </span>
                                            </div>
                                            <h3 className="text-3xl font-black text-gray-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                                                <Link href={route('posts.show', post.slug)}>{post.title}</Link>
                                            </h3>
                                            <p className="text-gray-500 leading-relaxed mb-8 line-clamp-2 font-medium">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center space-x-3">
                                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center font-black text-gray-400 text-[10px]">
                                                    {post.author.name.charAt(0)}
                                                </div>
                                                <span className="text-xs font-black text-gray-900 uppercase tracking-widest">{post.author.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}

                            {posts.data.length === 0 && (
                                <div className="text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-gray-100">
                                    <div className="h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-300">
                                        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-black text-gray-900 mb-4">No results found</h3>
                                    <p className="text-gray-400 max-w-sm mx-auto font-medium mb-10">
                                        We couldn't find any articles matching your search. Try different keywords or browse our categories.
                                    </p>
                                    <Link href="/" className="px-10 py-5 bg-black text-white font-black rounded-2xl hover:bg-gray-800 transition-all shadow-xl">
                                        Explore All Stories
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {posts.last_page > 1 && (
                            <div className="mt-24 flex justify-center">
                                <div className="flex space-x-2">
                                    {posts.links.map((link: any, i: number) => (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            className={`h-12 w-12 flex items-center justify-center rounded-2xl text-xs font-black transition-all ${
                                                link.active 
                                                    ? 'bg-black text-white shadow-xl scale-110' 
                                                    : 'bg-white text-gray-400 hover:text-black border border-gray-100'
                                            } ${!link.url && 'opacity-30 cursor-not-allowed'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Suggestions */}
                    <div className="lg:w-1/3 space-y-20">
                        <div>
                            <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-10 pb-4 border-b-2 border-black inline-block">Refine by Category</h4>
                            <div className="flex flex-wrap gap-3">
                                {categories.map((cat) => (
                                    <Link 
                                        key={cat.slug} 
                                        href={route('blog.category', cat.slug)}
                                        className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 hover:border-black hover:text-black transition-all shadow-sm"
                                    >
                                        {cat.name}
                                        <span className="ml-2 text-[10px] text-gray-300 font-black">{cat.posts_count}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-10 pb-4 border-b-2 border-black inline-block">Popular Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {popular_tags.map((tag) => (
                                    <Link 
                                        key={tag.slug} 
                                        href={route('blog.tag', tag.slug)}
                                        className="px-4 py-2 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black hover:text-white transition-all"
                                    >
                                        #{tag.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slideUp {
                    animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
                }
                .animate-fadeIn {
                    animation: fadeIn 1s ease both;
                }
                .delay-100 { animation-delay: 100ms; }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}} />
        </PublicLayout>
    );
}

declare function route(name: string, params?: any): string;

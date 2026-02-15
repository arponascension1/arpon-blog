import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import SEO from '@/Components/SEO';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { Link } from '@inertiajs/react';

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

interface IndexProps {
    posts: Post[] | {
        data: Post[];
        links: any[];
        current_page: number;
        last_page: number;
        total: number;
    };
    featured_posts: Post[];
    categories: { name: string, slug: string, posts_count: number }[];
    tag?: { name: string };
    category?: { name: string };
}

export default function Index({ posts, featured_posts, categories, tag, category }: IndexProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Determine if posts is paginated or simple array
    const postsData = Array.isArray(posts) ? posts : posts.data;
    const isPaginated = !Array.isArray(posts);

    return (
        <PublicLayout>
            <SEO 
                title={category ? `${category.name} Stories` : (tag ? `Stories tagged with ${tag.name}` : 'Explore our Stories')} 
                description={category ? `Browse all articles in the ${category.name} category.` : (tag ? `Explore articles tagged with ${tag.name}.` : 'Discover expert-led insights, creative thinking, and deep dives into technology, design, and culture.')}
                keywords={category ? (category as any).meta_keywords : (tag ? (tag as any).meta_keywords : undefined)}
                breadcrumbs={category ? [
                    { label: 'Articles', url: route('blog.articles') },
                    { label: category.name, url: route('blog.category', (category as any).slug) }
                ] : (tag ? [
                    { label: 'Articles', url: route('blog.articles') },
                    { label: `Tag: ${tag.name}`, url: route('blog.tag', (tag as any).slug) }
                ] : undefined)}
            />
            
            {/* Hero Section */}
            {(tag || category) && (
                <div className="bg-white pt-20 pb-10 border-b border-gray-50">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                        <Breadcrumbs 
                            items={[
                                { label: 'Articles', url: route('blog.articles') },
                                { label: category ? category.name : (tag ? `Tag: ${tag.name}` : ''), active: true }
                            ]} 
                        />
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
                            {category ? category.name : (tag ? `Tag: ${tag.name}` : '')}
                        </h1>
                    </div>
                </div>
            )}

            {!tag && !category && (
                <section className="relative bg-white pt-20 pb-32 overflow-hidden">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pink-50 rounded-full blur-3xl opacity-30"></div>
                    
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
                        <div className="max-w-3xl">
                            <span className="inline-block py-1.5 px-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8 animate-fadeIn">
                                Published Daily
                            </span>
                            <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-10 animate-slideUp">
                                Explore the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Future</span> of Ideas.
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-2xl mb-12 animate-slideUp delay-100">
                                Discover expert-led insights, creative thinking, and deep dives into technology, design, and culture.
                            </p>
                            <div className="flex flex-wrap gap-4 animate-slideUp delay-200">
                                <Link 
                                    href={route('blog.articles')}
                                    className="px-10 py-5 bg-black text-white font-black rounded-2xl hover:bg-gray-800 transition-all hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
                                >
                                    Start Reading
                                </Link>
                                <button className="px-10 py-5 bg-white text-black font-black border-2 border-gray-100 rounded-2xl hover:border-black transition-all">
                                    Our Mission
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Post Grid */}
            {!tag && !category && featured_posts.length > 0 && (
                <section className="pb-32 bg-white">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                        <div className="flex items-end justify-between mb-16">
                            <div>
                                <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-2">Featured Selection</h2>
                                <p className="text-gray-500 font-medium">Handpicked stories you shouldn't miss.</p>
                            </div>
                            <div className="hidden md:flex space-x-2">
                                <button className="p-3 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button className="p-3 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors text-blue-600">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                            {/* Large Featured Card */}
                            <div className="lg:col-span-8 group">
                                <Link href={route('posts.show', featured_posts[0].slug)}>
                                    <div className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-xl">
                                        <img 
                                            src={featured_posts[0].featured_image} 
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                            alt={featured_posts[0].featured_image_alt || featured_posts[0].title}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 p-12 w-full">
                                            <span className="inline-block py-1 px-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-md mb-6">
                                                {featured_posts[0].category?.name}
                                            </span>
                                            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight max-w-2xl">
                                                {featured_posts[0].title}
                                            </h3>
                                            <div className="flex items-center space-x-4">
                                                <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-white border border-white/30">
                                                    {featured_posts[0].author.name.charAt(0)}
                                                </div>
                                                <div className="text-white/80 text-sm font-medium">
                                                    By <span className="text-white font-bold">{featured_posts[0].author.name}</span> • {formatDate(featured_posts[0].published_at)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            
                            {/* Side Featured Posts */}
                            <div className="lg:col-span-4 flex flex-col gap-10">
                                {featured_posts.slice(1, 3).map((post) => (
                                    <Link key={post.id} href={route('posts.show', post.slug)} className="group flex-1">
                                        <div className="relative h-full rounded-3xl overflow-hidden shadow-lg">
                                            <img src={post.featured_image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={post.featured_image_alt || post.title} />
                                            <div className="absolute inset-0 bg-black/60 opacity-60 group-hover:opacity-70 transition-opacity"></div>
                                            <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                                <h4 className="text-2xl font-black text-white leading-tight">
                                                    {post.title}
                                                </h4>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Recent Articles Section (Limited to 4) */}
            <section className="py-32 bg-[#fafafa]">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                    <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
                        <div>
                            <h2 className="text-5xl font-black text-gray-900 tracking-tighter mb-4">
                                Latest Stories
                            </h2>
                            <p className="text-gray-500 text-lg font-medium">Recently published articles from our experts.</p>
                        </div>
                        <Link 
                            href={route('blog.articles')}
                            className="px-8 py-4 bg-white border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all shadow-sm"
                        >
                            View All Articles
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {postsData.map((post) => (
                            <article key={post.id} className="flex flex-col group animate-fadeIn">
                                <div className="mb-6 relative group overflow-hidden rounded-3xl shadow-sm">
                                    <Link href={route('posts.show', post.slug)} className="block">
                                        <div className="aspect-[4/5] bg-gray-100">
                                            <img 
                                                src={post.featured_image} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                                alt={post.featured_image_alt || post.title}
                                            />
                                        </div>
                                    </Link>
                                    <div className="absolute top-4 left-4 z-10">
                                        {post.category && (
                                            <Link 
                                                href={route('blog.category', post.category.slug)}
                                                className="py-1.5 px-3 bg-white/90 backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-widest text-black shadow-sm hover:bg-black hover:text-white transition-all"
                                            >
                                                {post.category.name}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1">
                                    <div className="flex items-center text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                                        <span>{formatDate(post.published_at)}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        <Link href={route('posts.show', post.slug)}>{post.title}</Link>
                                    </h3>
                                    <div className="flex items-center space-x-2 mt-auto">
                                        <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-[8px]">
                                            {post.author.name.charAt(0)}
                                        </div>
                                        <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">{post.author.name}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        {isPaginated && posts.last_page > 1 ? (
                            <div className="flex justify-center space-x-2">
                                {posts.links.map((link: any, i: number) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`h-10 w-10 flex items-center justify-center rounded-xl text-[10px] font-black transition-all ${
                                            link.active 
                                                ? 'bg-black text-white shadow-lg' 
                                                : 'bg-white text-gray-400 hover:text-black border border-gray-100'
                                        } ${!link.url && 'opacity-30 cursor-not-allowed'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <Link 
                                href={route('blog.articles')}
                                className="inline-flex items-center space-x-4 group"
                            >
                                <span className="h-[1px] w-12 bg-gray-200 group-hover:w-20 group-hover:bg-blue-600 transition-all"></span>
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-blue-600 transition-colors">Load More from Archive</span>
                                <span className="h-[1px] w-12 bg-gray-200 group-hover:w-20 group-hover:bg-blue-600 transition-all"></span>
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{ __html: `
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

import React, { useState, useEffect } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import SEO from '@/Components/SEO';
import Breadcrumbs from '@/Components/Breadcrumbs';
import SocialShare from '@/Components/SocialShare';
import GoogleAd from '@/Components/GoogleAd';
import { Link, usePage, router } from '@inertiajs/react';

interface Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featured_image: string;
    featured_image_alt?: string;
    published_at: string;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    category: { name: string, slug: string } | null;
    author: { name: string };
    tags: { name: string, slug: string }[];
    likes_count: number;
}

interface ShowProps {
    post: Post;
    related_posts: Post[];
    is_liked: boolean;
}

export default function Show({ post, related_posts, is_liked }: ShowProps) {
    const [progress, setProgress] = useState(0);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleLike = () => {
        router.post(route('posts.like', post.id), {}, {
            preserveScroll: true,
        });
    };

    useEffect(() => {
        const updateProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = window.scrollY;
            setProgress((scrollTop / scrollHeight) * 100);
        };
        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    const { url } = usePage();
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const fullUrl = `${siteUrl}${url}`;

    return (
        <PublicLayout>
            <SEO
                title={post.meta_title || post.title}
                description={post.meta_description || post.excerpt}
                keywords={post.meta_keywords || undefined}
                image={post.featured_image}
                ogType="article"
                breadcrumbs={[
                    { label: 'Articles', url: route('blog.articles') },
                    { label: post.title, url: route('posts.show', post.slug) }
                ]}
                schema={{
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": post.title,
                    "description": post.excerpt,
                    "image": post.featured_image,
                    "author": {
                        "@type": "Person",
                        "name": post.author.name
                    },
                    "datePublished": post.published_at,
                    "publisher": {
                        "@type": "Organization",
                        "name": "Arpon Blog",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "/favicon.ico"
                        }
                    },
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": route('posts.show', post.slug)
                    }
                }}
            />

            {/* Reading Progress Bar */}
            <div
                className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 z-[100] transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
            ></div>

            <div className="bg-[#fafafa] min-h-screen">
                {/* Dynamic Header Section */}
                <header className="relative pt-32 pb-40 overflow-hidden bg-white">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-40"></div>
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl opacity-30"></div>

                    <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 relative text-center">
                        <div className="flex justify-center mb-8 animate-fadeIn">
                            <Breadcrumbs
                                items={[
                                    { label: 'Articles', url: route('blog.articles') },
                                    { label: post.title, active: true }
                                ]}
                            />
                        </div>
                        <div className="mb-12 animate-fadeIn flex justify-center items-center gap-4">
                            {post.category && (
                                <Link
                                    href={route('blog.category', post.category.slug)}
                                    className="px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-blue-600 transition-all shadow-lg"
                                >
                                    {post.category.name}
                                </Link>
                            )}
                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{formatDate(post.published_at)}</span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.95] mb-16 animate-slideUp">
                            {post.title}
                        </h1>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 animate-slideUp delay-100">
                            <div className="flex items-center space-x-4 p-2 pl-2 pr-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="h-12 w-12 rounded-xl bg-black flex items-center justify-center font-black text-white shadow-xl">
                                    {post.author.name.charAt(0)}
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-black text-gray-900 uppercase tracking-widest">{post.author.name}</p>
                                    <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Featured Author</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
                                <svg className="h-5 w-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                8 min read
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content & Image Wrapper */}
                <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-12 -mt-32 relative z-10">
                    {/* Hero Image */}
                    {post.featured_image && (
                        <div className="mb-24 animate-fadeIn">
                            <div className="relative h-[500px] md:h-[850px] rounded-none overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-8 border-white ring-1 ring-gray-100">
                                <img
                                    src={post.featured_image}
                                    alt={post.featured_image_alt || post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                        {/* Left Social Share Sidebar (Desktop Only) */}
                        <div className="hidden xl:block w-20 relative">
                            <div className="sticky top-32 space-y-8">
                                <button
                                    onClick={handleLike}
                                    className={`w-full aspect-square rounded-2xl flex flex-col items-center justify-center transition-all border ${is_liked
                                            ? 'bg-red-50 border-red-100 text-red-600 shadow-lg shadow-red-100'
                                            : 'bg-white border-gray-100 text-gray-400 hover:border-red-200 hover:text-red-400'
                                        }`}
                                >
                                    <svg className={`h-6 w-6 mb-1 ${is_liked ? 'fill-current' : 'fill-none'}`} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span className="text-[10px] font-black">{post.likes_count}</span>
                                </button>
                                <SocialShare url={fullUrl} title={post.title} />
                            </div>
                        </div>

                        {/* Article Content Card */}
                        <div className="flex-1 bg-white rounded-[4rem] p-10 md:p-16 lg:p-24 shadow-2xl border border-gray-50 shadow-gray-200/40">
                            {/* Excerpt */}
                            {post.excerpt && (
                                <div className="mb-20 pb-20 border-b border-gray-50">
                                    <p className="text-3xl md:text-6xl font-black text-gray-900 tracking-tighter leading-[1] transition-all">
                                        "{post.excerpt}"
                                    </p>
                                </div>
                            )}

                            {/* Content */}
                            <div
                                className="prose prose-xl prose-slate max-w-none text-gray-800 leading-[1.8] prose-headings:font-sans prose-headings:font-black prose-headings:tracking-tighter prose-a:text-blue-600 prose-img:rounded-none prose-blockquote:border-l-[12px] prose-blockquote:border-black prose-blockquote:bg-gray-50 prose-blockquote:py-10 prose-blockquote:px-16 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:font-sans prose-blockquote:font-bold prose-blockquote:text-gray-900 editor-content fr-view"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Social Share (Mobile & Large Tablet) */}
                            <div className="xl:hidden mt-20 p-10 bg-gray-50 rounded-[3rem] border border-gray-100">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8 text-center">Interactions</h4>
                                <div className="flex flex-col items-center gap-8">
                                    <button
                                        onClick={handleLike}
                                        className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${is_liked
                                                ? 'bg-red-600 text-white shadow-xl shadow-red-200'
                                                : 'bg-white text-gray-900 border border-gray-200'
                                            }`}
                                    >
                                        <svg className={`h-5 w-5 ${is_liked ? 'fill-current' : 'fill-none'}`} stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        <span>{is_liked ? 'Liked' : 'Like this story'} • {post.likes_count}</span>
                                    </button>
                                    <SocialShare url={fullUrl} title={post.title} />
                                </div>
                            </div>

                            {/* Tags */}
                            {post.tags.length > 0 && (
                                <div className="mt-24 pt-16 border-t border-gray-50">
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Filed Under</span>
                                        <div className="h-[1px] flex-1 bg-gray-50"></div>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {post.tags.map((tag) => (
                                            <Link
                                                key={tag.slug}
                                                href={route('blog.tag', tag.slug)}
                                                className="px-8 py-3 bg-gray-50 text-gray-500 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-black hover:text-white transition-all border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1"
                                            >
                                                #{tag.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Sidebar - Author & Info */}
                        <div className="lg:w-[400px] shrink-0 space-y-16">
                            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/50">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8">The Author</h4>
                                <div className="flex flex-col items-center text-center">
                                    <div className="h-24 w-24 rounded-[2rem] bg-black flex items-center justify-center text-3xl font-black text-white shadow-2xl mb-6">
                                        {post.author.name.charAt(0)}
                                    </div>
                                    <h5 className="text-xl font-black text-gray-900 mb-4">{post.author.name}</h5>
                                    <p className="text-sm text-gray-500 leading-relaxed mb-8">
                                        Exploring the intersection of technology, design, and modern culture through deep-dive analysis.
                                    </p>
                                    <div className="flex gap-4">
                                        <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:text-blue-600 transition-all border border-gray-100">
                                            <i className="fab fa-twitter"></i>
                                        </button>
                                        <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:text-pink-600 transition-all border border-gray-100">
                                            <i className="fab fa-instagram"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <GoogleAd
                                adSlot="1234567890"
                                className="mb-16"
                            />

                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-200">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 mb-6">Never Miss a Story</h4>
                                <p className="text-lg font-bold mb-8">Join 10,000+ subscribers for weekly insights.</p>
                                <form className="space-y-4">
                                    <input type="email" placeholder="Email address" className="w-full px-6 py-4 rounded-2xl bg-white/10 border-none text-white placeholder-blue-200 focus:ring-2 focus:ring-white transition-all text-sm" />
                                    <button className="w-full bg-white text-blue-600 font-black py-4 rounded-2xl hover:bg-blue-50 transition-all shadow-xl">Subscribe</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Further Reading Section */}
                {related_posts.length > 0 && (
                    <section className="mt-40 pt-32 pb-32 bg-white border-t border-gray-100">
                        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                                <div>
                                    <h2 className="text-5xl font-black text-gray-900 tracking-tighter mb-4">Further Reading</h2>
                                    <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Continue your journey</p>
                                </div>
                                <Link href="/" className="px-8 py-4 bg-gray-50 text-gray-900 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all">View All Stories</Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                {related_posts.map((rp) => (
                                    <div key={rp.id} className="group flex flex-col">
                                        <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-500 relative">
                                            <Link href={route('posts.show', rp.slug)}>
                                                <img
                                                    src={rp.featured_image}
                                                    alt={rp.featured_image_alt || rp.title}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </Link>
                                            {rp.category && (
                                                <div className="absolute top-6 left-6 z-10">
                                                    <Link
                                                        href={route('blog.category', rp.category.slug)}
                                                        className="py-1.5 px-3 bg-white/90 backdrop-blur-md rounded-lg text-[8px] font-black uppercase tracking-widest text-black shadow-sm hover:bg-black hover:text-white transition-all"
                                                    >
                                                        {rp.category.name}
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                        <Link href={route('posts.show', rp.slug)}>
                                            <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {rp.title}
                                            </h3>
                                        </Link>
                                        <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <span>{formatDate(rp.published_at)}</span>
                                            <Link href={route('posts.show', rp.slug)} className="text-gray-900 hover:text-blue-600">
                                                <svg className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
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
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                    transform: rotate(180deg);
                }
            `}} />
        </PublicLayout>
    );
}

declare function route(name: string, params?: any): string;

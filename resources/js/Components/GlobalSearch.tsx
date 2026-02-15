import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { Transition } from '@headlessui/react';

interface SearchResult {
    posts: { id: number; title: string; slug: string }[];
    users: { id: number; name: string; email: string }[];
    categories: { id: number; name: string; slug: string }[];
    tags: { id: number; name: string; slug: string }[];
}

export default function GlobalSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.length < 2) {
            setResults(null);
            setIsOpen(false);
            return;
        }

        const timeoutId = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await axios.get(route('admin.search'), {
                    params: { query }
                });
                setResults(response.data);
                setIsOpen(true);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query]);

    const hasResults = results && (
        results.posts.length > 0 || 
        results.users.length > 0 || 
        results.categories.length > 0 || 
        results.tags.length > 0
    );

    return (
        <div className="relative flex-1 max-w-lg" ref={searchRef}>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border-0 bg-gray-100/50 rounded-xl leading-5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white sm:text-sm transition-all border border-transparent focus:border-blue-100"
                    placeholder="Search anything..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length >= 2 && setIsOpen(true)}
                />
                {loading && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg className="animate-spin h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )}
            </div>

            <Transition
                show={isOpen}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 translate-y-2 scale-95"
                enterTo="transform opacity-100 translate-y-0 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="transform opacity-100 translate-y-0 scale-100"
                leaveTo="transform opacity-0 translate-y-2 scale-95"
            >
                <div className="absolute mt-2 w-full bg-white shadow-2xl rounded-2xl border border-gray-100 z-50 max-h-[70vh] overflow-y-auto overflow-x-hidden ring-1 ring-black/5">
                    {!hasResults ? (
                        <div className="p-8 text-sm text-gray-500 text-center flex flex-col items-center">
                            <div className="p-3 bg-gray-50 rounded-full mb-3 text-gray-300">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <p className="font-medium text-gray-900">No results found</p>
                            <p className="mt-1">We couldn't find anything for "{query}"</p>
                        </div>
                    ) : (
                        <div className="p-3 space-y-5">
                            {results.posts.length > 0 && (
                                <div>
                                    <h3 className="px-3 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-2">Posts</h3>
                                    <ul className="space-y-1">
                                        {results.posts.map(post => (
                                            <li key={post.id}>
                                                <Link
                                                    href={`/admin/posts/${post.id}/edit`}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                                                >
                                                    {post.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {results.users.length > 0 && (
                                <div>
                                    <h3 className="px-3 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-2">Users</h3>
                                    <ul className="space-y-1">
                                        {results.users.map(user => (
                                            <li key={user.id}>
                                                <Link
                                                    href={`/admin/users/${user.id}/edit`}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block px-3 py-2.5 hover:bg-blue-50 rounded-xl transition-all group"
                                                >
                                                    <div className="font-bold text-sm text-gray-700 group-hover:text-blue-600 transition-colors">{user.name}</div>
                                                    <div className="text-xs text-gray-500">{user.email}</div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {results.categories.length > 0 && (
                                <div>
                                    <h3 className="px-3 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-2">Categories</h3>
                                    <ul className="space-y-1">
                                        {results.categories.map(category => (
                                            <li key={category.id}>
                                                <Link
                                                    href={`/admin/categories/${category.id}/edit`}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                                                >
                                                    {category.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {results.tags.length > 0 && (
                                <div>
                                    <h3 className="px-3 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-2">Tags</h3>
                                    <div className="mt-2 flex flex-wrap gap-2 px-3 pb-2">
                                        {results.tags.map(tag => (
                                            <Link
                                                key={tag.id}
                                                href={`/admin/tags/${tag.id}/edit`}
                                                onClick={() => setIsOpen(false)}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all border border-gray-100"
                                            >
                                                # {tag.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Transition>
        </div>
    );
}

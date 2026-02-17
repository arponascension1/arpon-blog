import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import SEO from '@/Components/SEO';
import Dropdown from '@/Components/Dropdown';

interface PublicLayoutProps {
    children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    const { auth, settings } = usePage().props as any;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const siteName = settings?.site_name || 'Arpon Blog';
    const siteLogo = settings?.site_logo;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('blog.search'), { search: searchQuery });
    };

    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
            <SEO />
            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                scrolled ? 'bg-black/90 backdrop-blur-md border-b border-gray-800 py-3 shadow-lg' : 'bg-black/80 py-5'
            }`}>
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-8">
                            <Link href="/" className="flex items-center group">
                                {siteLogo ? (
                                    <img src={siteLogo} alt={siteName} className="h-9 w-auto mr-3 transition-transform group-hover:scale-105" />
                                ) : (
                                    <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold mr-3 shadow-lg group-hover:bg-blue-500 transition-colors">
                                        {siteName.charAt(0)}
                                    </div>
                                )}
                                <span className="text-xl font-extrabold tracking-tight text-white">
                                    {siteName}
                                </span>
                            </Link>

                            {/* Search Bar Desktop */}
                            <form onSubmit={handleSearch} className="hidden lg:block relative group">
                                <input 
                                    type="text"
                                    placeholder="Search stories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 bg-gray-800/50 border-none rounded-full text-xs font-bold text-white placeholder-gray-500 focus:bg-gray-800 focus:ring-2 focus:ring-blue-600 transition-all w-64"
                                />
                                <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </form>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-10">
                            <nav className="flex space-x-8">
                                <Link href="/" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors relative group">
                                    Home
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                                </Link>
                                <Link href={route('blog.articles')} className="text-sm font-semibold text-gray-300 hover:text-white transition-colors relative group">
                                    Articles
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                                </Link>
                                <Link href={route('blog.about')} className="text-sm font-semibold text-gray-300 hover:text-white transition-colors relative group">
                                    About
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                                </Link>
                                <Link href={route('blog.contact')} className="text-sm font-semibold text-gray-300 hover:text-white transition-colors relative group">
                                    Contact
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                                </Link>
                            </nav>
                            
                            <div className="flex items-center space-x-5 pl-8 border-l border-gray-800">
                                {auth.user ? (
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button className="flex items-center space-x-3 group focus:outline-none">
                                                <div className="text-right hidden sm:block">
                                                    <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                                                        {auth.user.name}
                                                    </p>
                                                    {auth.user.is_admin && (
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">Admin</p>
                                                    )}
                                                </div>
                                                <div className="h-10 w-10 rounded-full border-2 border-transparent group-hover:border-blue-600 transition-all overflow-hidden bg-gray-800 shadow-sm">
                                                    {auth.user.avatar ? (
                                                        <img src={auth.user.avatar} alt={auth.user.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center bg-blue-900/30 text-blue-400 font-bold text-sm">
                                                            {auth.user.name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content width="48">
                                            {auth.user.is_admin && (
                                                <Dropdown.Link href="/admin">
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        Admin Panel
                                                    </div>
                                                </Dropdown.Link>
                                            )}
                                            <Dropdown.Link href={route('dashboard')}>
                                                <div className="flex items-center font-semibold">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                    Dashboard
                                                </div>
                                            </Dropdown.Link>
                                            <Dropdown.Link href={route('profile.edit')}>
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Profile
                                                </div>
                                            </Dropdown.Link>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                <div className="flex items-center text-red-600 font-bold">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    Log Out
                                                </div>
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="text-sm font-bold text-gray-400 hover:text-white transition-colors">Login</Link>
                                        <Link 
                                            href={route('register')} 
                                            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-500 transition-all shadow-md hover:shadow-blue-900/20 hover:-translate-y-0.5 active:translate-y-0"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Mobile Search & Menu Button */}
                        <div className="md:hidden flex items-center space-x-4">
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 text-gray-400 hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`md:hidden absolute top-full left-0 w-full bg-black border-b border-gray-800 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                    <div className="px-6 py-8 space-y-6">
                        {/* Mobile Search */}
                        <form onSubmit={handleSearch} className="relative group mb-8">
                            <input 
                                type="text"
                                placeholder="Search stories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-900 border-none rounded-2xl text-sm font-bold text-white focus:ring-2 focus:ring-blue-600 transition-all"
                            />
                            <svg className="absolute left-4 top-4 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </form>
                        <Link href="/" className="block text-lg font-bold text-white/90">Home</Link>
                        <Link href={route('blog.articles')} className="block text-lg font-bold text-white/90">Articles</Link>
                        <Link href={route('blog.about')} className="block text-lg font-bold text-white/90">About</Link>
                        <Link href={route('blog.contact')} className="block text-lg font-bold text-white/90">Contact</Link>
                        <div className="pt-6 border-t border-gray-800 flex flex-col space-y-4">
                            {auth.user ? (
                                <>
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-800 border border-gray-700">
                                            {auth.user.avatar ? (
                                                <img src={auth.user.avatar} alt={auth.user.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center bg-blue-900/20 text-blue-400 font-bold">
                                                    {auth.user.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">{auth.user.name}</p>
                                            <p className="text-sm text-gray-400">{auth.user.email}</p>
                                        </div>
                                    </div>
                                    {auth.user.is_admin && (
                                        <Link href="/admin" className="text-lg font-bold text-blue-400">Admin Panel</Link>
                                    )}
                                    <Link href={route('dashboard')} className="text-lg font-bold text-white">Dashboard</Link>
                                    <Link href={route('profile.edit')} className="text-lg font-bold text-white">Profile</Link>
                                    <Link href={route('logout')} method="post" as="button" className="text-lg font-bold text-red-500 text-left">Log Out</Link>
                                </>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-lg font-bold text-white">Login</Link>
                                    <Link href={route('register')} className="text-lg font-bold text-blue-400">Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow pt-24">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 pt-24 pb-12 text-gray-300">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
                        <div className="md:col-span-5">
                            <Link href="/" className="flex items-center mb-6">
                                <span className="text-2xl font-black tracking-tighter text-white">{siteName}</span>
                            </Link>
                            <p className="text-lg text-gray-400 max-w-sm leading-relaxed mb-8">
                                {settings?.app_description || 'High-quality insights for modern thinkers and builders. Stay curious.'}
                            </p>
                            <div className="flex space-x-5">
                                {settings?.twitter_url && (
                                    <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 text-sky-400 hover:bg-sky-600 hover:text-white transition-all shadow-sm group/icon">
                                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>
                                )}
                                {settings?.facebook_url && (
                                    <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-sm group/icon">
                                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.8.714-1.8 1.768v2.319h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                                        </svg>
                                    </a>
                                )}
                                {settings?.instagram_url && (
                                    <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 text-pink-500 hover:bg-pink-600 hover:text-white transition-all shadow-sm group/icon">
                                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.074 4.771 4.85.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.064 4.771-4.85 4.771-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.067-4.771-4.85-.058-1.266-.069-1.644-.069-4.849 0-3.204.012-3.584.069-4.849.149-3.227 1.064-4.771 4.85-4.771 1.266-.058 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-5.838 2.435-5.838 5.838s2.435 5.838 5.838 5.838 5.838-2.435 5.838-5.838-2.435-5.838-5.838-5.838zm0 9.513c-2.03 0-3.675-1.645-3.675-3.675 0-2.03 1.645-3.675 3.675-3.675 2.03 0 3.675 1.645 3.675 3.675 0 2.03-1.645 3.675-3.675 3.675zm4.961-11.405c0 .731-.593 1.323-1.322 1.323s-1.322-.592-1.322-1.323.593-1.322 1.322-1.322 1.322.591 1.322 1.322z" />
                                        </svg>
                                    </a>
                                )}
                                {settings?.linkedin_url && (
                                    <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm group/icon">
                                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-8">Magazine</h4>
                            <ul className="space-y-4">
                                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors font-medium">Stories</Link></li>
                                <li><Link href={route('blog.articles')} className="text-gray-400 hover:text-white transition-colors font-medium">Archive</Link></li>
                                <li><Link href={route('blog.contact')} className="text-gray-400 hover:text-white transition-colors font-medium">Contact Us</Link></li>
                            </ul>
                        </div>
                        <div className="md:col-span-2">
                            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-8">Company</h4>
                            <ul className="space-y-4">
                                <li><Link href={route('blog.about')} className="text-gray-400 hover:text-white transition-colors font-medium">Our Story</Link></li>
                                <li><Link href={route('blog.privacy')} className="text-gray-400 hover:text-white transition-colors font-medium">Privacy Policy</Link></li>
                            </ul>
                        </div>
                        <div className="md:col-span-3">
                            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-8">Stay Updated</h4>
                            <p className="text-sm text-gray-400 mb-6 leading-relaxed">Receive our best stories in your inbox every week.</p>
                            <div className="flex">
                                <input 
                                    type="email" 
                                    placeholder="Email address" 
                                    className="w-full px-4 py-3 rounded-l-xl bg-gray-800 border-none focus:ring-2 focus:ring-blue-600 text-sm text-white"
                                />
                                <button className="px-4 py-3 bg-blue-600 text-white rounded-r-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                        <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
                        <div className="flex space-x-10 mt-6 md:mt-0">
                            <Link href={route('blog.privacy')} className="hover:text-white transition-colors">Privacy</Link>
                            <Link href={route('blog.contact')} className="hover:text-white transition-colors">Contact</Link>
                            <Link href={route('blog.about')} className="hover:text-white transition-colors">About</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

declare function route(name: string, params?: any): string;

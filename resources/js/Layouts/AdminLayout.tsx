import React, { useState, useEffect, Fragment } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Dialog, Transition } from '@headlessui/react';
import { FlashMessages } from '@/types';
import GlobalSearch from '@/Components/GlobalSearch';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { auth, flash } = usePage().props;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showFlash, setShowFlash] = useState(false);
    const [flashMessage, setFlashMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    useEffect(() => {
        const flashData = flash as FlashMessages;
        
        if (flashData && (flashData.success || flashData.error)) {
            const message = flashData.success || flashData.error || '';
            
            setFlashMessage({
                type: flashData.success ? 'success' : 'error',
                message: message
            });
            setShowFlash(true);
            
            const timer = setTimeout(() => {
                setShowFlash(false);
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const dismissFlash = () => {
        setShowFlash(false);
    };

    const navigation = [
        {
            name: 'Dashboard',
            href: '/admin',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            current: window.location.pathname === '/admin',
        },
        {
            name: 'Posts',
            href: '/admin/posts',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
            current: window.location.pathname.startsWith('/admin/posts'),
        },
        {
            name: 'Users',
            href: '/admin/users',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            current: window.location.pathname.startsWith('/admin/users'),
        },
        {
            name: 'Categories',
            href: '/admin/categories',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            current: window.location.pathname.startsWith('/admin/categories'),
        },
        {
            name: 'Tags',
            href: '/admin/tags',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
            ),
            current: window.location.pathname.startsWith('/admin/tags'),
        },
        {
            name: 'Media',
            href: '/admin/media',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            current: window.location.pathname.startsWith('/admin/media'),
        },
        {
            name: 'Analytics',
            href: '/admin/analytics',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            current: window.location.pathname === '/admin/analytics',
        },
        {
            name: 'Settings',
            href: '/admin/settings',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            current: window.location.pathname === '/admin/settings',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar */}
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                            <span className="sr-only">Close sidebar</span>
                                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </Transition.Child>
                                
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <h1 className="text-xl font-black text-gray-900 tracking-tight">ARPON<span className="text-blue-600">BLOG</span></h1>
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                            <li>
                                                <ul role="list" className="-mx-2 space-y-1">
                                                    {navigation.map((item) => (
                                                        <li key={item.name}>
                                                            <Link
                                                                href={item.href}
                                                                onClick={() => setSidebarOpen(false)}
                                                                className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                                                                    item.current
                                                                        ? 'bg-blue-50 text-blue-600'
                                                                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                                                }`}
                                                            >
                                                                <span className={`${item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}`}>
                                                                    {item.icon}
                                                                </span>
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                            <li className="mt-auto">
                                                <Link
                                                    href={route('profile.edit')}
                                                    onClick={() => setSidebarOpen(false)}
                                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                                                >
                                                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                                                        {user.avatar ? (
                                                            <img src={user.avatar} alt="" className="h-full w-full object-cover" />
                                                        ) : (
                                                            <span className="text-[10px]">{user.name.charAt(0)}</span>
                                                        )}
                                                    </div>
                                                    <span className="truncate">{user.name}</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                        <h1 className="text-xl font-black text-gray-900 tracking-tight">ARPON<span className="text-blue-600">BLOG</span></h1>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                                                    item.current
                                                        ? 'bg-blue-50 text-blue-600'
                                                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                                }`}
                                            >
                                                <span className={`${item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}`}>
                                                    {item.icon}
                                                </span>
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="mt-auto">
                                <Link
                                    href={route('profile.edit')}
                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                                >
                                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt="" className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="text-[10px]">{user.name.charAt(0)}</span>
                                        )}
                                    </div>
                                    <span className="truncate">{user.name}</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="lg:pl-64">
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>

                    <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="relative flex flex-1 items-center">
                            <div className="w-full max-w-lg">
                                <GlobalSearch />
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            <Link href="/" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors hidden sm:block">
                                View Site
                            </Link>
                            
                            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

                            <div className="flex items-center gap-x-2">
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="rounded-full bg-white p-1 text-gray-400 hover:text-red-600 transition-colors"
                                >
                                    <span className="sr-only">Logout</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {/* Flash Messages */}
                        {showFlash && flashMessage && (
                            <div className="mb-8 max-w-4xl mx-auto">
                                <div
                                    className={`rounded-xl p-4 shadow-sm border ${
                                        flashMessage.type === 'success'
                                            ? 'bg-green-50 border-green-100 text-green-800'
                                            : 'bg-red-50 border-red-100 text-red-800'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-x-3">
                                            {flashMessage.type === 'success' ? (
                                                <svg className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                            <p className="text-sm font-semibold">{flashMessage.message}</p>
                                        </div>
                                        <button onClick={dismissFlash} className="p-1 hover:bg-black/5 rounded-md transition-colors">
                                            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

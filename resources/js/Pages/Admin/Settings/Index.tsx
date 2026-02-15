import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import MediaPicker from '@/Components/MediaPicker';

interface SettingsProps {
    settings: {
        // General
        site_name: string;
        app_description: string;
        site_logo: string;
        site_favicon: string;
        site_language: string;
        timezone: string;
        
        // SEO
        site_description: string;
        site_keywords: string;
        og_title: string;
        og_description: string;
        twitter_card: string;
        google_analytics_id: string;
        search_console_id: string;

        // Contact
        admin_email: string;
        contact_phone: string;
        contact_address: string;
        facebook_url: string;
        twitter_url: string;
        instagram_url: string;
        linkedin_url: string;

        // Maintenance
        maintenance_mode: string;
        maintenance_message: string;
    };
}

type TabType = 'general' | 'seo' | 'contact' | 'maintenance';

export default function Index({ settings }: SettingsProps) {
    const [activeTab, setActiveTab] = useState<TabType>('general');

    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        site_name: settings.site_name || '',
        app_description: settings.app_description || '',
        site_logo: settings.site_logo || '',
        site_favicon: settings.site_favicon || '',
        site_language: settings.site_language || 'en',
        timezone: settings.timezone || 'UTC',

        site_description: settings.site_description || '',
        site_keywords: settings.site_keywords || '',
        og_title: settings.og_title || '',
        og_description: settings.og_description || '',
        twitter_card: settings.twitter_card || 'summary_large_image',
        google_analytics_id: settings.google_analytics_id || '',
        search_console_id: settings.search_console_id || '',

        admin_email: settings.admin_email || '',
        contact_phone: settings.contact_phone || '',
        contact_address: settings.contact_address || '',
        facebook_url: settings.facebook_url || '',
        twitter_url: settings.twitter_url || '',
        instagram_url: settings.instagram_url || '',
        linkedin_url: settings.linkedin_url || '',

        maintenance_mode: settings.maintenance_mode || '0',
        maintenance_message: settings.maintenance_message || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.settings.update'), {
            preserveScroll: true,
            onError: (errors) => {
                if (errors.site_name || errors.app_description || errors.site_logo || errors.site_favicon || errors.site_language || errors.timezone) {
                    setActiveTab('general');
                } else if (errors.site_description || errors.site_keywords || errors.og_title || errors.og_description || errors.twitter_card || errors.google_analytics_id || errors.search_console_id) {
                    setActiveTab('seo');
                } else if (errors.admin_email || errors.contact_phone || errors.contact_address || errors.facebook_url || errors.twitter_url || errors.instagram_url || errors.linkedin_url) {
                    setActiveTab('contact');
                } else if (errors.maintenance_mode || errors.maintenance_message) {
                    setActiveTab('maintenance');
                }
            }
        });
    };

    const tabs = [
        { id: 'general', name: 'General', icon: (
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        )},
        { id: 'seo', name: 'SEO', icon: (
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        )},
        { id: 'contact', name: 'Contact & Social', icon: (
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        )},
        { id: 'maintenance', name: 'Maintenance', icon: (
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        )},
    ];

    return (
        <AdminLayout>
            <Head title="App Settings" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">App Settings</h1>
                        <p className="mt-1 text-sm text-gray-600">Configure your application's global behavior and metadata.</p>
                    </div>

                    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            {/* Tabs Sidebar */}
                            <div className="w-full lg:w-72 bg-gray-50/50 border-r border-gray-100">
                                <nav className="p-4 space-y-1">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as TabType)}
                                            className={`w-full flex items-center gap-x-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                                                activeTab === tab.id
                                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                        >
                                            <span className={`${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`}>
                                                {tab.icon}
                                            </span>
                                            {tab.name}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Form Content */}
                            <div className="flex-1 p-6 sm:p-10">
                                <form onSubmit={submit} className="max-w-4xl">
                                    {Object.keys(errors).length > 0 && (
                                        <div className="mb-8 rounded-2xl bg-red-50 p-4 border border-red-100 animate-fadeIn">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <svg className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414-1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="text-sm font-black text-red-900 uppercase tracking-tight">Submission Failed</h3>
                                                    <div className="mt-2 text-xs text-red-700 font-bold">
                                                        <ul role="list" className="list-disc space-y-1 pl-5">
                                                            {Object.values(errors).map((error, index) => (
                                                                <li key={index}>{error}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'general' && (
                                        <div className="space-y-8 animate-fadeIn">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">General Identity</h3>
                                                <p className="text-sm text-gray-500 mt-1">Core branding and regional settings for your blog.</p>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 gap-8">
                                                <div className="group">
                                                    <label htmlFor="site_name" className="block text-sm font-bold text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">Site Name</label>
                                                    <input
                                                        type="text"
                                                        id="site_name"
                                                        value={data.site_name}
                                                        onChange={(e) => setData('site_name', e.target.value)}
                                                        className="block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                                        placeholder="My Awesome Blog"
                                                    />
                                                    {errors.site_name && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.site_name}</p>}
                                                </div>

                                                <div>
                                                    <label htmlFor="app_description" className="block text-sm font-bold text-gray-700 mb-1">App Description</label>
                                                    <textarea
                                                        id="app_description"
                                                        rows={4}
                                                        value={data.app_description}
                                                        onChange={(e) => setData('app_description', e.target.value)}
                                                        className="block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                                        placeholder="Tell the world about your blog..."
                                                    />
                                                    {errors.app_description && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.app_description}</p>}
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                                                        <MediaPicker 
                                                            label="Site Logo"
                                                            currentValue={data.site_logo}
                                                            onSelect={(url) => setData('site_logo', url)}
                                                        />
                                                        {errors.site_logo && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.site_logo}</p>}
                                                    </div>
                                                    <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                                                        <MediaPicker 
                                                            label="Favicon"
                                                            currentValue={data.site_favicon}
                                                            onSelect={(url) => setData('site_favicon', url)}
                                                        />
                                                        {errors.site_favicon && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.site_favicon}</p>}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div>
                                                        <label htmlFor="site_language" className="block text-sm font-bold text-gray-700 mb-1">Default Language</label>
                                                        <select
                                                            id="site_language"
                                                            value={data.site_language}
                                                            onChange={(e) => setData('site_language', e.target.value)}
                                                            className="block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                                        >
                                                            <option value="en">English</option>
                                                            <option value="es">Spanish</option>
                                                            <option value="fr">French</option>
                                                            <option value="de">German</option>
                                                        </select>
                                                        {errors.site_language && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.site_language}</p>}
                                                    </div>
                                                    <div>
                                                        <label htmlFor="timezone" className="block text-sm font-bold text-gray-700 mb-1">Timezone</label>
                                                        <input
                                                            type="text"
                                                            id="timezone"
                                                            value={data.timezone}
                                                            onChange={(e) => setData('timezone', e.target.value)}
                                                            className="block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                                            placeholder="UTC"
                                                        />
                                                        {errors.timezone && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.timezone}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'seo' && (
                                        <div className="space-y-8 animate-fadeIn">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">SEO & Metadata</h3>
                                                <p className="text-sm text-gray-500 mt-1">Optimize your visibility on search engines and social media.</p>
                                            </div>

                                            <div className="space-y-8">
                                                <div>
                                                    <label htmlFor="site_description" className="block text-sm font-bold text-gray-700 mb-1">Meta Description</label>
                                                    <textarea
                                                        id="site_description"
                                                        rows={3}
                                                        value={data.site_description}
                                                        onChange={(e) => setData('site_description', e.target.value)}
                                                        className="block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                                        placeholder="Maximum 160 characters for best results..."
                                                    />
                                                    {errors.site_description && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.site_description}</p>}
                                                </div>
                                                
                                                <div>
                                                    <label htmlFor="site_keywords" className="block text-sm font-bold text-gray-700 mb-1">Keywords</label>
                                                    <input
                                                        type="text"
                                                        id="site_keywords"
                                                        value={data.site_keywords}
                                                        onChange={(e) => setData('site_keywords', e.target.value)}
                                                        className="block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                                        placeholder="blog, laravel, coding, tech..."
                                                    />
                                                    {errors.site_keywords && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.site_keywords}</p>}
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div>
                                                        <label htmlFor="google_analytics_id" className="block text-sm font-bold text-gray-700 mb-1">Analytics ID</label>
                                                        <input
                                                            type="text"
                                                            id="google_analytics_id"
                                                            value={data.google_analytics_id}
                                                            onChange={(e) => setData('google_analytics_id', e.target.value)}
                                                            className="block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                                            placeholder="G-XXXXXXXXXX"
                                                        />
                                                        {errors.google_analytics_id && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.google_analytics_id}</p>}
                                                    </div>
                                                    <div>
                                                        <label htmlFor="search_console_id" className="block text-sm font-bold text-gray-700 mb-1">Search Console</label>
                                                        <input
                                                            type="text"
                                                            id="search_console_id"
                                                            value={data.search_console_id}
                                                            onChange={(e) => setData('search_console_id', e.target.value)}
                                                            className="block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                                            placeholder="Google verification code"
                                                        />
                                                        {errors.search_console_id && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.search_console_id}</p>}
                                                    </div>
                                                </div>

                                                <div className="bg-blue-50/30 p-6 rounded-2xl border border-blue-50">
                                                    <h4 className="text-sm font-black text-blue-900 uppercase tracking-widest mb-4">Open Graph (Social Sharing)</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="md:col-span-2">
                                                            <label htmlFor="og_title" className="block text-sm font-bold text-gray-700 mb-1">Social Title</label>
                                                            <input
                                                                type="text"
                                                                id="og_title"
                                                                value={data.og_title}
                                                                onChange={(e) => setData('og_title', e.target.value)}
                                                                className="block w-full border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                                            />
                                                            {errors.og_title && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.og_title}</p>}
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <label htmlFor="twitter_card" className="block text-sm font-bold text-gray-700 mb-1">Twitter Card</label>
                                                            <select
                                                                id="twitter_card"
                                                                value={data.twitter_card}
                                                                onChange={(e) => setData('twitter_card', e.target.value)}
                                                                className="block w-full border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                                            >
                                                                <option value="summary">Summary</option>
                                                                <option value="summary_large_image">Summary with Large Image</option>
                                                            </select>
                                                            {errors.twitter_card && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.twitter_card}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'contact' && (
                                        <div className="space-y-8 animate-fadeIn">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">Contact & Social</h3>
                                                <p className="text-sm text-gray-500 mt-1">Ways for your audience to connect with you.</p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div>
                                                    <label htmlFor="admin_email" className="block text-sm font-bold text-gray-700 mb-1">Admin Email</label>
                                                    <input
                                                        type="email"
                                                        id="admin_email"
                                                        value={data.admin_email}
                                                        onChange={(e) => setData('admin_email', e.target.value)}
                                                        className="block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                                    />
                                                    {errors.admin_email && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.admin_email}</p>}
                                                </div>
                                                <div>
                                                    <label htmlFor="contact_phone" className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                                                    <input
                                                        type="text"
                                                        id="contact_phone"
                                                        value={data.contact_phone}
                                                        onChange={(e) => setData('contact_phone', e.target.value)}
                                                        className="block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                                    />
                                                    {errors.contact_phone && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.contact_phone}</p>}
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label htmlFor="contact_address" className="block text-sm font-bold text-gray-700 mb-1">Office Address</label>
                                                    <textarea
                                                        id="contact_address"
                                                        rows={2}
                                                        value={data.contact_address}
                                                        onChange={(e) => setData('contact_address', e.target.value)}
                                                        className="block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                                    />
                                                    {errors.contact_address && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.contact_address}</p>}
                                                </div>

                                                <div className="md:col-span-2 space-y-6 pt-4">
                                                    <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Social Profiles</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                            <label htmlFor="facebook_url" className="block text-sm font-bold text-gray-700 mb-1">Facebook</label>
                                                            <input
                                                                type="text"
                                                                id="facebook_url"
                                                                value={data.facebook_url}
                                                                onChange={(e) => setData('facebook_url', e.target.value)}
                                                                className="block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                                            />
                                                            {errors.facebook_url && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.facebook_url}</p>}
                                                        </div>
                                                        <div>
                                                            <label htmlFor="twitter_url" className="block text-sm font-bold text-gray-700 mb-1">Twitter / X</label>
                                                            <input
                                                                type="text"
                                                                id="twitter_url"
                                                                value={data.twitter_url}
                                                                onChange={(e) => setData('twitter_url', e.target.value)}
                                                                className="block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                                            />
                                                            {errors.twitter_url && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.twitter_url}</p>}
                                                        </div>
                                                        <div>
                                                            <label htmlFor="instagram_url" className="block text-sm font-bold text-gray-700 mb-1">Instagram</label>
                                                            <input
                                                                type="text"
                                                                id="instagram_url"
                                                                value={data.instagram_url}
                                                                onChange={(e) => setData('instagram_url', e.target.value)}
                                                                className="block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                                            />
                                                            {errors.instagram_url && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.instagram_url}</p>}
                                                        </div>
                                                        <div>
                                                            <label htmlFor="linkedin_url" className="block text-sm font-bold text-gray-700 mb-1">LinkedIn</label>
                                                            <input
                                                                type="text"
                                                                id="linkedin_url"
                                                                value={data.linkedin_url}
                                                                onChange={(e) => setData('linkedin_url', e.target.value)}
                                                                className="block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                                            />
                                                            {errors.linkedin_url && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.linkedin_url}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'maintenance' && (
                                        <div className="space-y-8 animate-fadeIn">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">System & Maintenance</h3>
                                                <p className="text-sm text-gray-500 mt-1">Manage site availability and critical system messages.</p>
                                            </div>

                                            <div className="space-y-8">
                                                <div className="flex items-center justify-between p-6 bg-orange-50 rounded-2xl border border-orange-100">
                                                    <div className="max-w-md">
                                                        <p className="text-sm font-black text-orange-900 uppercase tracking-tight">Maintenance Mode</p>
                                                        <p className="mt-1 text-xs text-orange-700 font-medium leading-relaxed">When enabled, visitors will see a maintenance page. Admins can still access the dashboard.</p>
                                                    </div>
                                                    <button 
                                                        type="button"
                                                        onClick={() => setData('maintenance_mode', data.maintenance_mode === '1' ? '0' : '1')}
                                                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${data.maintenance_mode === '1' ? 'bg-orange-600' : 'bg-gray-200'}`}
                                                    >
                                                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${data.maintenance_mode === '1' ? 'translate-x-5' : 'translate-x-0'}`} />
                                                    </button>
                                                </div>
                                                {errors.maintenance_mode && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.maintenance_mode}</p>}

                                                <div>
                                                    <label htmlFor="maintenance_message" className="block text-sm font-bold text-gray-700 mb-1">Maintenance Message</label>
                                                    <textarea
                                                        id="maintenance_message"
                                                        rows={4}
                                                        value={data.maintenance_message}
                                                        onChange={(e) => setData('maintenance_message', e.target.value)}
                                                        className="block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                                        placeholder="Site is temporarily unavailable..."
                                                    />
                                                    {errors.maintenance_message && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-tight">{errors.maintenance_message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-end">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex items-center px-8 py-3.5 border border-transparent text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-100 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all transform hover:translate-y-[-2px] active:translate-y-[0px]"
                                        >
                                            {processing ? (
                                                <div className="flex items-center gap-x-2">
                                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Saving...
                                                </div>
                                            ) : 'Save All Settings'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .animate-fadeIn {
                    animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </AdminLayout>
    );
}

// Add route helper for TypeScript if not globally available
declare function route(name: string, params?: any): string;

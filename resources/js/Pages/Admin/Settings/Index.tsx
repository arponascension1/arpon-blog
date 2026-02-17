import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import MediaPicker from '@/Components/MediaPicker';
import RichTextEditor from '@/Components/RichTextEditor';

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

        // Ads
        google_adsense_client_id: string;

        // Pages Content
        about_content: string;
        privacy_policy_content: string;

        // SMTP
        mail_mailer: string;
        mail_host: string;
        mail_port: string;
        mail_username: string;
        mail_password: string;
        mail_encryption: string;
        mail_from_address: string;
        mail_from_name: string;
    };
    active_tab: string;
}

type TabType = 'general' | 'seo' | 'contact' | 'pages' | 'mail' | 'ads' | 'maintenance';

export default function Index({ settings, active_tab }: SettingsProps) {
    const [activeTab, setActiveTab] = useState<TabType>((active_tab as TabType) || 'general');

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

        google_adsense_client_id: settings.google_adsense_client_id || '',

        about_content: settings.about_content || '',
        privacy_policy_content: settings.privacy_policy_content || '',

        mail_mailer: settings.mail_mailer || 'smtp',
        mail_host: settings.mail_host || '',
        mail_port: settings.mail_port || '587',
        mail_username: settings.mail_username || '',
        mail_password: settings.mail_password || '',
        mail_encryption: settings.mail_encryption || 'tls',
        mail_from_address: settings.mail_from_address || '',
        mail_from_name: settings.mail_from_name || '',
    });

    const handleTabChange = (tabId: TabType) => {
        setActiveTab(tabId);
        
        // If general tab, don't put it in the URL
        const query = tabId === 'general' ? {} : { tab: tabId };
        
        router.get(route('admin.settings.index'), query, { 
            preserveState: true, 
            preserveScroll: true,
            replace: true 
        });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.settings.update'), {
            preserveScroll: true,
            data: { ...data, tab: activeTab },
            onError: (errors) => {
                if (errors.site_name || errors.app_description || errors.site_logo || errors.site_favicon || errors.site_language || errors.timezone) {
                    handleTabChange('general');
                } else if (errors.site_description || errors.site_keywords || errors.og_title || errors.og_description || errors.twitter_card || errors.google_analytics_id || errors.search_console_id) {
                    handleTabChange('seo');
                } else if (errors.admin_email || errors.contact_phone || errors.contact_address || errors.facebook_url || errors.twitter_url || errors.instagram_url || errors.linkedin_url) {
                    handleTabChange('contact');
                } else if (errors.maintenance_mode || errors.maintenance_message) {
                    handleTabChange('maintenance');
                } else if (errors.google_adsense_client_id) {
                    handleTabChange('ads');
                } else if (errors.about_content || errors.privacy_policy_content) {
                    handleTabChange('pages');
                } else if (errors.mail_mailer || errors.mail_host || errors.mail_port || errors.mail_username || errors.mail_password || errors.mail_encryption || errors.mail_from_address || errors.mail_from_name) {
                    handleTabChange('mail');
                }
            }
        });
    };

    const tabs = [
        { id: 'general', name: 'General', icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        )},
        { id: 'seo', name: 'SEO', icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        )},
        { id: 'contact', name: 'Contact', icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        )},
        { id: 'pages', name: 'Content', icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        )},
        { id: 'mail', name: 'Email', icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 19v-8.93a2 2 0 01.89-1.664l7-5.98a2 2 0 012.22 0l7 5.98A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
            </svg>
        )},
        { id: 'ads', name: 'Ads', icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        )},
        { id: 'maintenance', name: 'System', icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        )},
    ];

    return (
        <AdminLayout>
            <Head title="App Settings" />

            <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tighter">App Settings</h1>
                        <p className="mt-2 text-sm font-bold text-gray-500 uppercase tracking-widest">Global configuration & metadata</p>
                    </div>
                    
                    {/* Horizontal Tabs */}
                    <div className="bg-gray-100 p-1.5 rounded-2xl flex flex-wrap gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id as TabType)}
                                className={`flex items-center gap-x-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                                }`}
                            >
                                {tab.icon}
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white shadow-2xl shadow-gray-200/50 rounded-[2.5rem] border border-gray-100 overflow-hidden">
                    <form onSubmit={submit} className="p-8 sm:p-12">
                        {Object.keys(errors).length > 0 && (
                            <div className="mb-10 rounded-3xl bg-red-50 p-6 border border-red-100 animate-fadeIn">
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shrink-0">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-red-900 uppercase tracking-widest mb-2">Attention Required</h3>
                                        <ul role="list" className="text-xs text-red-700 font-bold space-y-1 opacity-80">
                                            {Object.values(errors).map((error, index) => (
                                                <li key={index}>• {error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'general' && (
                            <div className="space-y-10 animate-fadeIn">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">General Identity</h3>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Branding and localization</p>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-10">
                                    <div className="group">
                                        <label htmlFor="site_name" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Site Name</label>
                                        <input
                                            type="text"
                                            id="site_name"
                                            value={data.site_name}
                                            onChange={(e) => setData('site_name', e.target.value)}
                                            className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                            placeholder="My Awesome Blog"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="app_description" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">App Description</label>
                                        <textarea
                                            id="app_description"
                                            rows={4}
                                            value={data.app_description}
                                            onChange={(e) => setData('app_description', e.target.value)}
                                            className="block w-full border-none bg-gray-50 rounded-[2rem] px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm resize-none"
                                            placeholder="Tell the world about your blog..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="bg-gray-50 p-6 rounded-[2.5rem]">
                                            <MediaPicker 
                                                label="Site Logo"
                                                currentValue={data.site_logo}
                                                onSelect={(url) => setData('site_logo', url)}
                                            />
                                        </div>
                                        <div className="bg-gray-50 p-6 rounded-[2.5rem]">
                                            <MediaPicker 
                                                label="Favicon"
                                                currentValue={data.site_favicon}
                                                onSelect={(url) => setData('site_favicon', url)}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div>
                                            <label htmlFor="site_language" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Default Language</label>
                                            <select
                                                id="site_language"
                                                value={data.site_language}
                                                onChange={(e) => setData('site_language', e.target.value)}
                                                className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                            >
                                                <option value="en">English</option>
                                                <option value="es">Spanish</option>
                                                <option value="fr">French</option>
                                                <option value="de">German</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="timezone" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Timezone</label>
                                            <input
                                                type="text"
                                                id="timezone"
                                                value={data.timezone}
                                                onChange={(e) => setData('timezone', e.target.value)}
                                                className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                                placeholder="UTC"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'seo' && (
                            <div className="space-y-10 animate-fadeIn">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">SEO & Metadata</h3>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Search engine optimization</p>
                                </div>

                                <div className="space-y-10">
                                    <div>
                                        <label htmlFor="site_description" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Meta Description</label>
                                        <textarea
                                            id="site_description"
                                            rows={3}
                                            value={data.site_description}
                                            onChange={(e) => setData('site_description', e.target.value)}
                                            className="block w-full border-none bg-gray-50 rounded-[2rem] px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm resize-none"
                                            placeholder="Maximum 160 characters for best results..."
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="site_keywords" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Keywords</label>
                                        <input
                                            type="text"
                                            id="site_keywords"
                                            value={data.site_keywords}
                                            onChange={(e) => setData('site_keywords', e.target.value)}
                                            className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                            placeholder="blog, laravel, coding, tech..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div>
                                            <label htmlFor="google_analytics_id" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Analytics ID</label>
                                            <input
                                                type="text"
                                                id="google_analytics_id"
                                                value={data.google_analytics_id}
                                                onChange={(e) => setData('google_analytics_id', e.target.value)}
                                                className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                                placeholder="G-XXXXXXXXXX"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="search_console_id" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Search Console</label>
                                            <input
                                                type="text"
                                                id="search_console_id"
                                                value={data.search_console_id}
                                                onChange={(e) => setData('search_console_id', e.target.value)}
                                                className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                                placeholder="Google verification code"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 p-8 rounded-[3rem] border border-blue-100">
                                        <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6 ml-1">Open Graph (Social)</h4>
                                        <div className="grid grid-cols-1 gap-8">
                                            <div>
                                                <label htmlFor="og_title" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Social Title</label>
                                                <input
                                                    type="text"
                                                    id="og_title"
                                                    value={data.og_title}
                                                    onChange={(e) => setData('og_title', e.target.value)}
                                                    className="block w-full border-none bg-white rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="twitter_card" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Twitter Card</label>
                                                <select
                                                    id="twitter_card"
                                                    value={data.twitter_card}
                                                    onChange={(e) => setData('twitter_card', e.target.value)}
                                                    className="block w-full border-none bg-white rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                                >
                                                    <option value="summary">Summary</option>
                                                    <option value="summary_large_image">Summary with Large Image</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'contact' && (
                            <div className="space-y-10 animate-fadeIn">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Contact & Social</h3>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Connectivity channels</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div>
                                        <label htmlFor="admin_email" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Admin Email</label>
                                        <input
                                            type="email"
                                            id="admin_email"
                                            value={data.admin_email}
                                            onChange={(e) => setData('admin_email', e.target.value)}
                                            className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contact_phone" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Phone Number</label>
                                        <input
                                            type="text"
                                            id="contact_phone"
                                            value={data.contact_phone}
                                            onChange={(e) => setData('contact_phone', e.target.value)}
                                            className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="contact_address" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Office Address</label>
                                        <textarea
                                            id="contact_address"
                                            rows={2}
                                            value={data.contact_address}
                                            onChange={(e) => setData('contact_address', e.target.value)}
                                            className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm resize-none"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-8 pt-6">
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] border-b border-gray-100 pb-4">Social Profiles</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div>
                                                <label htmlFor="facebook_url" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Facebook</label>
                                                <input
                                                    type="text"
                                                    id="facebook_url"
                                                    value={data.facebook_url}
                                                    onChange={(e) => setData('facebook_url', e.target.value)}
                                                    className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="twitter_url" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Twitter / X</label>
                                                <input
                                                    type="text"
                                                    id="twitter_url"
                                                    value={data.twitter_url}
                                                    onChange={(e) => setData('twitter_url', e.target.value)}
                                                    className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="instagram_url" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Instagram</label>
                                                <input
                                                    type="text"
                                                    id="instagram_url"
                                                    value={data.instagram_url}
                                                    onChange={(e) => setData('instagram_url', e.target.value)}
                                                    className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="linkedin_url" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">LinkedIn</label>
                                                <input
                                                    type="text"
                                                    id="linkedin_url"
                                                    value={data.linkedin_url}
                                                    onChange={(e) => setData('linkedin_url', e.target.value)}
                                                    className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'pages' && (
                            <div className="space-y-12 animate-fadeIn">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Pages Content</h3>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">About & Privacy editors</p>
                                </div>

                                <div className="space-y-12">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6 ml-1">About Page Content</label>
                                        <RichTextEditor 
                                            value={data.about_content}
                                            onChange={(val) => setData('about_content', val)}
                                            placeholder="Describe your blog, mission, and team..."
                                        />
                                    </div>

                                    <div className="pt-12 border-t border-gray-100">
                                        <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6 ml-1">Privacy Policy Content</label>
                                        <RichTextEditor 
                                            value={data.privacy_policy_content}
                                            onChange={(val) => setData('privacy_policy_content', val)}
                                            placeholder="Explain how you handle user data..."
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'mail' && (
                            <div className="space-y-10 animate-fadeIn">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Email System</h3>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">SMTP and mailer configuration</p>
                                </div>

                                <div className="bg-indigo-50 p-8 rounded-[3rem] border border-indigo-100 mb-10">
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 ml-1">Configuration Hint</h4>
                                            <p className="text-xs text-indigo-700 font-bold opacity-70 leading-relaxed">
                                                These settings override your <code>.env</code> file at runtime. Decryption is handled automatically.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="md:col-span-2">
                                        <label htmlFor="mail_mailer" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Mailer Driver</label>
                                        <select
                                            id="mail_mailer"
                                            value={data.mail_mailer}
                                            onChange={(e) => setData('mail_mailer', e.target.value)}
                                            className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                        >
                                            <option value="smtp">SMTP (External Server)</option>
                                            <option value="sendmail">Sendmail (System Local)</option>
                                            <option value="log">Log (Developer Testing)</option>
                                        </select>
                                    </div>

                                    <div className={`md:col-span-2 ${data.mail_mailer !== 'smtp' ? 'opacity-30 pointer-events-none' : ''}`}>
                                        <label htmlFor="mail_host" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">SMTP Host</label>
                                        <input
                                            type="text"
                                            id="mail_host"
                                            disabled={data.mail_mailer !== 'smtp'}
                                            value={data.mail_host}
                                            onChange={(e) => setData('mail_host', e.target.value)}
                                            className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                            placeholder="smtp.mailtrap.io"
                                        />
                                    </div>

                                    <div className={data.mail_mailer !== 'smtp' ? 'opacity-30 pointer-events-none' : ''}>
                                        <label htmlFor="mail_port" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">SMTP Port</label>
                                        <input
                                            type="text"
                                            id="mail_port"
                                            disabled={data.mail_mailer !== 'smtp'}
                                            value={data.mail_port}
                                            onChange={(e) => setData('mail_port', e.target.value)}
                                            className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                            placeholder="587"
                                        />
                                    </div>

                                    <div className={data.mail_mailer !== 'smtp' ? 'opacity-30 pointer-events-none' : ''}>
                                        <label htmlFor="mail_encryption" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Encryption</label>
                                        <select
                                            id="mail_encryption"
                                            disabled={data.mail_mailer !== 'smtp'}
                                            value={data.mail_encryption}
                                            onChange={(e) => setData('mail_encryption', e.target.value)}
                                            className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                        >
                                            <option value="tls">TLS</option>
                                            <option value="ssl">SSL</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>

                                    <div className={data.mail_mailer !== 'smtp' ? 'opacity-30 pointer-events-none' : ''}>
                                        <label htmlFor="mail_username" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Username</label>
                                        <input
                                            type="text"
                                            id="mail_username"
                                            disabled={data.mail_mailer !== 'smtp'}
                                            value={data.mail_username}
                                            onChange={(e) => setData('mail_username', e.target.value)}
                                            className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                        />
                                    </div>

                                    <div className={data.mail_mailer !== 'smtp' ? 'opacity-30 pointer-events-none' : ''}>
                                        <label htmlFor="mail_password" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Password</label>
                                        <input
                                            type="password"
                                            id="mail_password"
                                            disabled={data.mail_mailer !== 'smtp'}
                                            value={data.mail_password}
                                            onChange={(e) => setData('mail_password', e.target.value)}
                                            className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="mail_from_address" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">From Email</label>
                                        <input
                                            type="email"
                                            id="mail_from_address"
                                            value={data.mail_from_address}
                                            onChange={(e) => setData('mail_from_address', e.target.value)}
                                            className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                            placeholder="noreply@yourdomain.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="mail_from_name" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">From Name</label>
                                        <input
                                            type="text"
                                            id="mail_from_name"
                                            value={data.mail_from_name}
                                            onChange={(e) => setData('mail_from_name', e.target.value)}
                                            className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                            placeholder="Arpon Blog"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'ads' && (
                            <div className="space-y-10 animate-fadeIn">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Monetization</h3>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Google AdSense integration</p>
                                </div>

                                <div className="space-y-10">
                                    <div className="bg-yellow-50 p-8 rounded-[3rem] border border-yellow-100">
                                        <div className="flex gap-4">
                                            <div className="h-10 w-10 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-700 shrink-0">
                                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-black text-yellow-700 uppercase tracking-[0.2em] mb-2 ml-1">AdSense ID</h4>
                                                <p className="text-xs text-yellow-800 font-bold opacity-70 leading-relaxed">
                                                    Enter your Publisher ID. Manual ads and auto-ads will use this configuration.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="google_adsense_client_id" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Publisher ID (Client ID)</label>
                                        <input
                                            type="text"
                                            id="google_adsense_client_id"
                                            value={data.google_adsense_client_id}
                                            onChange={(e) => setData('google_adsense_client_id', e.target.value)}
                                            className="block w-full border-none bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                            placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'maintenance' && (
                            <div className="space-y-10 animate-fadeIn">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Site Health</h3>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">System status management</p>
                                </div>

                                <div className="space-y-10">
                                    <div className="flex items-center justify-between p-10 bg-orange-50 rounded-[3rem] border border-orange-100">
                                        <div className="max-w-md">
                                            <p className="text-sm font-black text-orange-900 uppercase tracking-[0.2em] mb-2">Maintenance Mode</p>
                                            <p className="text-xs text-orange-700 font-bold opacity-70 leading-relaxed">Toggle this to restrict public access while you work on updates.</p>
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={() => setData('maintenance_mode', data.maintenance_mode === '1' ? '0' : '1')}
                                            className={`relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-4 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${data.maintenance_mode === '1' ? 'bg-orange-600' : 'bg-gray-200'}`}
                                        >
                                            <span className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${data.maintenance_mode === '1' ? 'translate-x-8' : 'translate-x-0'}`} />
                                        </button>
                                    </div>

                                    <div>
                                        <label htmlFor="maintenance_message" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Maintenance Message</label>
                                        <textarea
                                            id="maintenance_message"
                                            rows={4}
                                            value={data.maintenance_message}
                                            onChange={(e) => setData('maintenance_message', e.target.value)}
                                            className="block w-full border-none bg-gray-50 rounded-[2rem] px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm resize-none"
                                            placeholder="Site is temporarily unavailable..."
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-16 pt-10 border-t border-gray-100 flex items-center justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-12 py-5 border border-transparent text-xs font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-blue-100 text-white bg-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all transform hover:translate-y-[-2px] active:translate-y-[0px]"
                            >
                                {processing ? (
                                    <div className="flex items-center gap-x-3">
                                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Syncing...
                                    </div>
                                ) : 'Save All Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .animate-fadeIn {
                    animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </AdminLayout>
    );
}

declare function route(name: string, params?: any): string;

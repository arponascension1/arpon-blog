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
            preserveScroll: true
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
                            <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200">
                                <nav className="p-4 space-y-1">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as TabType)}
                                            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                                                activeTab === tab.id
                                                    ? 'bg-blue-600 text-white shadow-md'
                                                    : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                                            }`}
                                        >
                                            {tab.icon}
                                            {tab.name}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Form Content */}
                            <div className="flex-1 p-6 md:p-8">
                                <form onSubmit={submit}>
                                    {activeTab === 'general' && (
                                        <div className="space-y-6 animate-fadeIn">
                                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">General Settings</h3>
                                            <div className="grid grid-cols-1 gap-6">
                                                <div>
                                                    <label htmlFor="site_name" className="block text-sm font-medium text-gray-700">Site Name</label>
                                                    <p className="text-xs text-gray-500 mb-1">The name of your website as it appears in the browser tab and emails.</p>
                                                    <input
                                                        type="text"
                                                        id="site_name"
                                                        value={data.site_name}
                                                        onChange={(e) => setData('site_name', e.target.value)}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    />
                                                    {errors.site_name && <p className="mt-1 text-sm text-red-600">{errors.site_name}</p>}
                                                </div>
                                                <div>
                                                    <label htmlFor="app_description" className="block text-sm font-medium text-gray-700">App Description</label>
                                                    <p className="text-xs text-gray-500 mb-1">A detailed description of your application/blog.</p>
                                                    <textarea
                                                        id="app_description"
                                                        rows={4}
                                                        value={data.app_description}
                                                        onChange={(e) => setData('app_description', e.target.value)}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    />
                                                    {errors.app_description && <p className="mt-1 text-sm text-red-600">{errors.app_description}</p>}
                                                </div>
                                                <div>
                                                    <MediaPicker 
                                                        label="Logo"
                                                        currentValue={data.site_logo}
                                                        onSelect={(url) => setData('site_logo', url)}
                                                    />
                                                    <p className="text-xs text-gray-500 mt-1">Select your site's logo from the media library.</p>
                                                    {errors.site_logo && <p className="mt-1 text-sm text-red-600">{errors.site_logo}</p>}
                                                </div>
                                                <div>
                                                    <MediaPicker 
                                                        label="Favicon"
                                                        currentValue={data.site_favicon}
                                                        onSelect={(url) => setData('site_favicon', url)}
                                                    />
                                                    <p className="text-xs text-gray-500 mt-1">Select your site's favicon (usually 32x32 or 16x16 pixels).</p>
                                                    {errors.site_favicon && <p className="mt-1 text-sm text-red-600">{errors.site_favicon}</p>}
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label htmlFor="site_language" className="block text-sm font-medium text-gray-700">Default Language</label>
                                                        <p className="text-xs text-gray-500 mb-1">Primary language for the site content.</p>
                                                        <select
                                                            id="site_language"
                                                            value={data.site_language}
                                                            onChange={(e) => setData('site_language', e.target.value)}
                                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        >
                                                            <option value="en">English</option>
                                                            <option value="es">Spanish</option>
                                                            <option value="fr">French</option>
                                                            <option value="de">German</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">Timezone</label>
                                                        <p className="text-xs text-gray-500 mb-1">Regional time offset for displaying dates and times.</p>
                                                        <input
                                                            type="text"
                                                            id="timezone"
                                                            value={data.timezone}
                                                            onChange={(e) => setData('timezone', e.target.value)}
                                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                            placeholder="UTC"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'seo' && (
                                        <div className="space-y-6 animate-fadeIn">
                                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">SEO & Metadata</h3>
                                            <div className="space-y-6">
                                                <div>
                                                    <label htmlFor="site_description" className="block text-sm font-medium text-gray-700">Meta Description</label>
                                                    <p className="text-xs text-gray-500 mb-1">A short summary (max 160 chars) of your site for search engine results.</p>
                                                    <textarea
                                                        id="site_description"
                                                        rows={3}
                                                        value={data.site_description}
                                                        onChange={(e) => setData('site_description', e.target.value)}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="site_keywords" className="block text-sm font-medium text-gray-700">Keywords (comma separated)</label>
                                                    <p className="text-xs text-gray-500 mb-1">Relevant keywords to help people find your site (e.g., blog, laravel, coding).</p>
                                                    <input
                                                        type="text"
                                                        id="site_keywords"
                                                        value={data.site_keywords}
                                                        onChange={(e) => setData('site_keywords', e.target.value)}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label htmlFor="google_analytics_id" className="block text-sm font-medium text-gray-700">Google Analytics ID</label>
                                                        <p className="text-xs text-gray-500 mb-1">Your GA4 or UA Measurement ID (e.g., G-XXXXXX).</p>
                                                        <input
                                                            type="text"
                                                            id="google_analytics_id"
                                                            value={data.google_analytics_id}
                                                            onChange={(e) => setData('google_analytics_id', e.target.value)}
                                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                            placeholder="UA-XXXXX-Y"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="search_console_id" className="block text-sm font-medium text-gray-700">Search Console Verification</label>
                                                        <p className="text-xs text-gray-500 mb-1">The value from the 'google-site-verification' meta tag.</p>
                                                        <input
                                                            type="text"
                                                            id="search_console_id"
                                                            value={data.search_console_id}
                                                            onChange={(e) => setData('search_console_id', e.target.value)}
                                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                                    <h4 className="text-sm font-bold text-gray-700 mb-1">Open Graph (Social Sharing)</h4>
                                                    <p className="text-xs text-gray-500 mb-4">Settings for how your site appears when shared on social media like Facebook and Twitter.</p>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label htmlFor="og_title" className="block text-sm font-medium text-gray-700">OG Title</label>
                                                            <input
                                                                type="text"
                                                                id="og_title"
                                                                value={data.og_title}
                                                                onChange={(e) => setData('og_title', e.target.value)}
                                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="twitter_card" className="block text-sm font-medium text-gray-700">Twitter Card Type</label>
                                                            <select
                                                                id="twitter_card"
                                                                value={data.twitter_card}
                                                                onChange={(e) => setData('twitter_card', e.target.value)}
                                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                                        <div className="space-y-6 animate-fadeIn">
                                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Contact & Social Links</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label htmlFor="admin_email" className="block text-sm font-medium text-gray-700">Admin Email</label>
                                                    <p className="text-xs text-gray-500 mb-1">Primary email for system notifications and contact forms.</p>
                                                    <input
                                                        type="email"
                                                        id="admin_email"
                                                        value={data.admin_email}
                                                        onChange={(e) => setData('admin_email', e.target.value)}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    />
                                                    {errors.admin_email && <p className="mt-1 text-sm text-red-600">{errors.admin_email}</p>}
                                                </div>
                                                <div>
                                                    <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700">Contact Phone</label>
                                                    <p className="text-xs text-gray-500 mb-1">Publicly displayed contact number.</p>
                                                    <input
                                                        type="text"
                                                        id="contact_phone"
                                                        value={data.contact_phone}
                                                        onChange={(e) => setData('contact_phone', e.target.value)}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label htmlFor="contact_address" className="block text-sm font-medium text-gray-700">Office Address</label>
                                                    <p className="text-xs text-gray-500 mb-1">Physical address of your organization.</p>
                                                    <textarea
                                                        id="contact_address"
                                                        rows={2}
                                                        value={data.contact_address}
                                                        onChange={(e) => setData('contact_address', e.target.value)}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-4 md:col-span-2 border-t pt-4">
                                                    <h4 className="text-sm font-bold text-gray-700">Social Media Profiles</h4>
                                                    <p className="text-xs text-gray-500 mb-4">URLs to your official social media pages.</p>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label htmlFor="facebook_url" className="block text-sm font-medium text-gray-700">Facebook URL</label>
                                                            <input
                                                                type="text"
                                                                id="facebook_url"
                                                                value={data.facebook_url}
                                                                onChange={(e) => setData('facebook_url', e.target.value)}
                                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="twitter_url" className="block text-sm font-medium text-gray-700">Twitter/X URL</label>
                                                            <input
                                                                type="text"
                                                                id="twitter_url"
                                                                value={data.twitter_url}
                                                                onChange={(e) => setData('twitter_url', e.target.value)}
                                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="instagram_url" className="block text-sm font-medium text-gray-700">Instagram URL</label>
                                                            <input
                                                                type="text"
                                                                id="instagram_url"
                                                                value={data.instagram_url}
                                                                onChange={(e) => setData('instagram_url', e.target.value)}
                                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                                                            <input
                                                                type="text"
                                                                id="linkedin_url"
                                                                value={data.linkedin_url}
                                                                onChange={(e) => setData('linkedin_url', e.target.value)}
                                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'maintenance' && (
                                        <div className="space-y-6 animate-fadeIn">
                                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Maintenance Mode</h3>
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                                                    <div>
                                                        <p className="text-sm font-bold text-orange-800">Enable Maintenance Mode</p>
                                                        <p className="text-xs text-orange-600">When enabled, visitors will see a maintenance page instead of your site. Useful for updates.</p>
                                                    </div>
                                                    <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                                        <input 
                                                            type="checkbox" 
                                                            name="toggle" 
                                                            id="toggle" 
                                                            checked={data.maintenance_mode === '1'}
                                                            onChange={(e) => setData('maintenance_mode', e.target.checked ? '1' : '0')}
                                                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                        />
                                                        <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="maintenance_message" className="block text-sm font-medium text-gray-700">Maintenance Message</label>
                                                    <p className="text-xs text-gray-500 mb-1">The message users will see when the site is in maintenance mode.</p>
                                                    <textarea
                                                        id="maintenance_message"
                                                        rows={4}
                                                        value={data.maintenance_message}
                                                        onChange={(e) => setData('maintenance_message', e.target.value)}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-10 pt-6 border-t flex items-center justify-between">
                                        <div className="flex items-center">
                                            {recentlySuccessful && (
                                                <span className="flex items-center text-sm text-green-600 font-medium">
                                                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    Settings saved successfully!
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all transform hover:scale-105 active:scale-95"
                                        >
                                            {processing ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Saving...
                                                </>
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
                    animation: fadeIn 0.3s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .toggle-checkbox:checked {
                    right: 0;
                    border-color: #3b82f6;
                }
                .toggle-checkbox:checked + .toggle-label {
                    background-color: #3b82f6;
                }
                .toggle-checkbox {
                    right: 1.5rem;
                    transition: all 0.3s;
                }
                .toggle-label {
                    transition: all 0.3s;
                }
            `}} />
        </AdminLayout>
    );
}

// Add route helper for TypeScript if not globally available
declare function route(name: string, params?: any): string;

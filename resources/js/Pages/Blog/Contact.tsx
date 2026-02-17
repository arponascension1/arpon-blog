import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import SEO from '@/Components/SEO';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Contact() {
    const { settings } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('blog.contact.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <PublicLayout>
            <SEO 
                title="Get in Touch" 
                description="Have a question or feedback? Contact the Arpon Blog team today."
                breadcrumbs={[{ label: 'Contact', url: route('blog.contact') }]}
            />
            
            <div className="bg-[#fafafa] min-h-screen pb-40">
                {/* Contact Header */}
                <header className="relative pt-32 pb-48 overflow-hidden bg-white">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-40"></div>
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl opacity-30"></div>
                    
                    <div className="max-w-5xl mx-auto px-6 relative text-center">
                        <div className="flex justify-center mb-8 animate-fadeIn">
                            <Breadcrumbs items={[{ label: 'Contact', active: true }]} />
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.95] mb-12 animate-slideUp">
                            Say <span className="text-blue-600">Hello.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto animate-slideUp delay-100">
                            Have a project in mind or just want to chat? Reach out and we'll get back to you within 24 hours.
                        </p>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                        {/* Info Section */}
                        <div className="lg:w-1/3 shrink-0">
                            <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-2xl h-full flex flex-col justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-12">Contact Details</h2>
                                    <div className="space-y-12">
                                        <div className="flex items-start gap-6">
                                            <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 border border-blue-100 shadow-sm">
                                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Email Address</h4>
                                                <p className="text-lg font-bold text-gray-900">{settings?.admin_email || 'hello@arponblog.com'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-6">
                                            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-100 shadow-sm">
                                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Location</h4>
                                                <p className="text-lg font-bold text-gray-900">{settings?.contact_address || 'Dhaka, Bangladesh'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-20 pt-12 border-t border-gray-100">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8">Follow Us</h4>
                                    <div className="flex flex-wrap gap-4">
                                        {settings?.twitter_url && (
                                            <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="h-12 w-12 flex items-center justify-center rounded-2xl bg-sky-50 text-sky-600 transition-all border border-sky-100 hover:bg-sky-600 hover:text-white shadow-sm hover:shadow-sky-200 group/icon">
                                                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                                </svg>
                                            </a>
                                        )}
                                        {settings?.instagram_url && (
                                            <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="h-12 w-12 flex items-center justify-center rounded-2xl bg-pink-50 text-pink-600 transition-all border border-pink-100 hover:bg-pink-600 hover:text-white shadow-sm hover:shadow-pink-200 group/icon">
                                                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.074 4.771 4.85.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.064 4.771-4.85 4.771-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.067-4.771-4.85-.058-1.266-.069-1.644-.069-4.849 0-3.204.012-3.584.069-4.849.149-3.227 1.064-4.771 4.85-4.771 1.266-.058 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-5.838 2.435-5.838 5.838s2.435 5.838 5.838 5.838 5.838-2.435 5.838-5.838-2.435-5.838-5.838-5.838zm0 9.513c-2.03 0-3.675-1.645-3.675-3.675 0-2.03 1.645-3.675 3.675-3.675 2.03 0 3.675 1.645 3.675 3.675 0 2.03-1.645 3.675-3.675 3.675zm4.961-11.405c0 .731-.593 1.323-1.322 1.323s-1.322-.592-1.322-1.323.593-1.322 1.322-1.322 1.322.591 1.322 1.322z" />
                                                </svg>
                                            </a>
                                        )}
                                        {settings?.facebook_url && (
                                            <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="h-12 w-12 flex items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition-all border border-blue-100 hover:bg-blue-700 hover:text-white shadow-sm hover:shadow-blue-200 group/icon">
                                                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.8.714-1.8 1.768v2.319h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                                                </svg>
                                            </a>
                                        )}
                                        {settings?.linkedin_url && (
                                            <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="h-12 w-12 flex items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-all border border-indigo-100 hover:bg-indigo-600 hover:text-white shadow-sm hover:shadow-indigo-200 group/icon">
                                                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="flex-1">
                            <div className="bg-white rounded-[4rem] p-10 md:p-16 lg:p-24 shadow-2xl border border-gray-50">
                                {recentlySuccessful ? (
                                    <div className="py-20 text-center animate-fadeIn">
                                        <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-10 text-green-600 shadow-xl shadow-green-100">
                                            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <h3 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter">Message Sent!</h3>
                                        <p className="text-gray-500 font-medium mb-12 max-w-sm mx-auto">Thank you for reaching out. We've received your message and will get back to you shortly.</p>
                                        <button 
                                            onClick={() => reset()}
                                            className="px-10 py-5 bg-black text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl"
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={submit} className="space-y-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Full Name</label>
                                                <input 
                                                    type="text" 
                                                    value={data.name}
                                                    onChange={e => setData('name', e.target.value)}
                                                    className={`w-full px-8 py-5 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 transition-all text-sm font-bold ${errors.name ? 'ring-red-500' : ''}`}
                                                    placeholder="Alex Johnson"
                                                />
                                                {errors.name && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-2">{errors.name}</p>}
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Email Address</label>
                                                <input 
                                                    type="email" 
                                                    value={data.email}
                                                    onChange={e => setData('email', e.target.value)}
                                                    className={`w-full px-8 py-5 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 transition-all text-sm font-bold ${errors.email ? 'ring-red-500' : ''}`}
                                                    placeholder="alex@example.com"
                                                />
                                                {errors.email && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-2">{errors.email}</p>}
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Subject</label>
                                            <input 
                                                type="text" 
                                                value={data.subject}
                                                onChange={e => setData('subject', e.target.value)}
                                                className={`w-full px-8 py-5 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 transition-all text-sm font-bold ${errors.subject ? 'ring-red-500' : ''}`}
                                                placeholder="What would you like to discuss?"
                                            />
                                            {errors.subject && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-2">{errors.subject}</p>}
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Message</label>
                                            <textarea 
                                                rows={6}
                                                value={data.message}
                                                onChange={e => setData('message', e.target.value)}
                                                className={`w-full px-8 py-6 rounded-[2rem] bg-gray-50 border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 transition-all text-sm font-bold resize-none ${errors.message ? 'ring-red-500' : ''}`}
                                                placeholder="Tell us more about your ideas..."
                                            />
                                            {errors.message && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-2">{errors.message}</p>}
                                        </div>

                                        <button 
                                            disabled={processing}
                                            className="w-full bg-black text-white font-black py-6 rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-blue-100 uppercase tracking-widest text-xs disabled:opacity-50"
                                        >
                                            {processing ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
            `}} />
        </PublicLayout>
    );
}

declare function route(name: string, params?: any): string;

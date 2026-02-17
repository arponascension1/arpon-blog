import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import SEO from '@/Components/SEO';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function About() {
    const { settings } = usePage<PageProps>().props;

    return (
        <PublicLayout>
            <SEO 
                title="About Us" 
                description="Learn more about Arpon Blog, our mission, and the stories we tell."
                breadcrumbs={[{ label: 'About', url: route('blog.about') }]}
            />
            
            <div className="bg-[#fafafa] min-h-screen pb-32">
                {/* Header Section */}
                <header className="relative pt-32 pb-40 overflow-hidden bg-white border-b border-gray-100">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-40"></div>
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-30"></div>
                    
                    <div className="max-w-5xl mx-auto px-6 relative text-center">
                        <div className="flex justify-center mb-8 animate-fadeIn">
                            <Breadcrumbs items={[{ label: 'About', active: true }]} />
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-12 animate-slideUp">
                            We tell stories that <br />
                            <span className="text-blue-600">matter.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-3xl mx-auto animate-slideUp delay-100">
                            {settings?.app_description || 'Arpon Blog is a platform dedicated to exploring the intersection of technology, design, and modern culture through deep-dive analysis and creative storytelling.'}
                        </p>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
                    <div className="bg-white rounded-[3rem] p-10 md:p-20 shadow-2xl border border-gray-50">
                        <div 
                            className="prose prose-2xl prose-slate max-w-none text-gray-800 leading-[1.8] font-serif prose-headings:font-sans prose-headings:font-black prose-headings:tracking-tighter prose-blockquote:border-l-[12px] prose-blockquote:border-black prose-blockquote:bg-gray-50 prose-blockquote:py-10 prose-blockquote:px-12 prose-blockquote:rounded-r-3xl prose-blockquote:not-italic"
                            dangerouslySetInnerHTML={{ __html: settings?.about_content || '<p>Our mission is simple: to provide high-quality, thought-provoking content that informs, inspires, and challenges our readers.</p>' }}
                        />
                    </div>
                </main>
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

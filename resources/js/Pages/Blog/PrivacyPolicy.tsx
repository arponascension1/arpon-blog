import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import SEO from '@/Components/SEO';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function PrivacyPolicy() {
    const { settings } = usePage<PageProps>().props;

    return (
        <PublicLayout>
            <SEO
                title="Privacy Policy"
                description="Read our privacy policy to understand how we handle your data."
                breadcrumbs={[{ label: 'Privacy Policy', url: route('blog.privacy') }]}
            />

            <div className="bg-[#fafafa] min-h-screen pb-32">
                <header className="pt-32 pb-20 bg-white border-b border-gray-100">
                    <div className="max-w-5xl mx-auto px-6">
                        <Breadcrumbs items={[{ label: 'Privacy Policy', active: true }]} />
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mt-8">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-500 font-bold mt-4 uppercase tracking-widest text-xs">
                            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                </header>

                <main className="max-w-5xl mx-auto px-6 py-20">
                    <div className="bg-white rounded-[3rem] p-10 md:p-20 shadow-xl border border-gray-100">
                        <div
                            className="prose prose-xl prose-slate max-w-none text-gray-700 leading-[1.8] font-serif prose-headings:font-black prose-headings:text-gray-900 editor-content fr-view"
                            dangerouslySetInnerHTML={{ __html: settings?.privacy_policy_content || '<p>Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.</p>' }}
                        />
                    </div>
                </main>
            </div>
        </PublicLayout>
    );
}

declare function route(name: string, params?: any): string;

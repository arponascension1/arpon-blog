import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Tag } from '@/types';

interface ShowProps {
    tag: Tag;
}

export default function Show({ tag }: ShowProps) {
    return (
        <AdminLayout>
            <Head title={`Tag Details: ${tag.name}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Tag: {tag.name}</h1>
                            <p className="mt-1 text-sm text-gray-600">View tag details and statistics</p>
                        </div>
                        <div className="flex space-x-3">
                            <Link
                                href={`/admin/tags/${tag.id}/edit`}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                Edit Tag
                            </Link>
                            <Link
                                href="/admin/tags"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Back to Tags
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50">
                                <h3 className="text-lg font-medium text-gray-900">General Information</h3>
                            </div>
                            <div className="px-4 py-5 sm:p-6">
                                <dl className="grid grid-cols-1 gap-y-6">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{tag.name}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Slug</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{tag.slug}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Created At</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{new Date(tag.created_at).toLocaleString()}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50">
                                <h3 className="text-lg font-medium text-gray-900">SEO Metadata</h3>
                            </div>
                            <div className="px-4 py-5 sm:p-6">
                                <dl className="space-y-4">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Meta Title</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{tag.meta_title || tag.name}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Meta Description</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{tag.meta_description || 'No meta description set.'}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Category } from '@/types';

interface ShowProps {
    category: Category;
}

export default function Show({ category }: ShowProps) {
    return (
        <AdminLayout>
            <Head title={`Category Details: ${category.name}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Category: {category.name}</h1>
                            <p className="mt-1 text-sm text-gray-600">View category details and statistics</p>
                        </div>
                        <div className="flex space-x-3">
                            <Link
                                href={`/admin/categories/${category.id}/edit`}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                Edit Category
                            </Link>
                            <Link
                                href="/admin/categories"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Back to Categories
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50">
                                    <h3 className="text-lg font-medium text-gray-900">General Information</h3>
                                </div>
                                <div className="px-4 py-5 sm:p-6">
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{category.name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Slug</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{category.slug}</dd>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <dt className="text-sm font-medium text-gray-500">Description</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{category.description || 'No description provided.'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Parent Category</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{category.parent?.name || 'None (Top Level)'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                                            <dd className="mt-1">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    category.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {category.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </dd>
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
                                            <dd className="mt-1 text-sm text-gray-900">{category.meta_title || category.name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Meta Description</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{category.meta_description || 'No meta description set.'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Meta Keywords</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{category.meta_keywords || 'No meta keywords set.'}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50">
                                    <h3 className="text-lg font-medium text-gray-900">Statistics</h3>
                                </div>
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="text-center py-4">
                                        <div className="text-3xl font-bold text-gray-900">0</div>
                                        <div className="text-sm text-gray-500 uppercase tracking-wide">Total Posts</div>
                                    </div>
                                </div>
                            </div>

                            {category.image_url && (
                                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50">
                                        <h3 className="text-lg font-medium text-gray-900">Thumbnail</h3>
                                    </div>
                                    <div className="p-4">
                                        <img src={category.image_url} alt={category.name} className="w-full h-auto rounded-lg shadow-inner" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

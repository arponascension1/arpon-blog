import React, { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import MediaPicker from '@/Components/MediaPicker';
import MultiSelect from '@/Components/MultiSelect';
import SearchSelect from '@/Components/SearchSelect';
import RichTextEditor from '@/Components/RichTextEditor';
import { Category, Tag } from '@/types';

interface CreateProps {
    categories: Category[];
    tags: Tag[];
}

export default function Create({ categories, tags }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        featured_image: '',
        status: 'draft',
        is_featured: false,
        published_at: '',
        tags: [] as number[],
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
    });

    // Auto-generate slug from title
    useEffect(() => {
        const slug = data.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
        setData('slug', slug);
    }, [data.title]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/posts');
    };

    return (
        <AdminLayout>
            <Head title="Create Post" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
                            </div>
                            <div className="flex space-x-3">
                                <Link
                                    href="/admin/posts"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Cancel
                                </Link>
                                <PrimaryButton disabled={processing}>
                                    Save Post
                                </PrimaryButton>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Main Content Area */}
                            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                                <div className="space-y-6">
                                    <div>
                                        <InputLabel htmlFor="title" value="Post Title" />
                                        <TextInput
                                            id="title"
                                            type="text"
                                            className="mt-1 block w-full text-xl font-bold border-none bg-gray-50 focus:bg-white transition-all"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Enter an engaging title..."
                                            required
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="content" value="Content" />
                                        <div className="mt-1">
                                            <RichTextEditor
                                                value={data.content}
                                                onChange={(content) => setData('content', content)}
                                                placeholder="Start writing your story..."
                                            />
                                        </div>
                                        <InputError message={errors.content} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="excerpt" value="Excerpt (Short Summary)" />
                                        <textarea
                                            id="excerpt"
                                            className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                            rows={2}
                                            value={data.excerpt || ''}
                                            onChange={(e) => setData('excerpt', e.target.value)}
                                            placeholder="A brief summary for search results and social media..."
                                        />
                                        <InputError message={errors.excerpt} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            {/* Settings Grid - Second "Layer" */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Organization & Media */}
                                <div className="space-y-6">
                                    <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                                        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                            Post Settings
                                        </h2>
                                        <div className="space-y-4">
                                            <div>
                                                <InputLabel htmlFor="category_id" value="Category" />
                                                <SearchSelect
                                                    options={categories}
                                                    value={data.category_id}
                                                    onChange={(value) => setData('category_id', value.toString())}
                                                    placeholder="Select category..."
                                                    required
                                                />
                                                <InputError message={errors.category_id} className="mt-2" />
                                            </div>
                                            <div>
                                                <InputLabel htmlFor="tags" value="Tags" />
                                                <MultiSelect
                                                    options={tags}
                                                    selected={data.tags}
                                                    onChange={(selectedIds) => setData('tags', selectedIds)}
                                                    placeholder="Add tags..."
                                                />
                                                <InputError message={errors.tags} className="mt-2" />
                                            </div>
                                            <div className="pt-2">
                                                <MediaPicker
                                                    label="Featured Image"
                                                    currentValue={data.featured_image || ''}
                                                    onSelect={(url) => setData('featured_image', url)}
                                                />
                                                <InputError message={errors.featured_image} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Publishing & SEO */}
                                <div className="space-y-6">
                                    <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 h-full">
                                        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Publishing
                                        </h2>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <InputLabel htmlFor="status" value="Status" />
                                                    <select
                                                        id="status"
                                                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm text-sm"
                                                        value={data.status}
                                                        onChange={(e) => setData('status', e.target.value as any)}
                                                    >
                                                        <option value="draft">Draft</option>
                                                        <option value="published">Published</option>
                                                        <option value="scheduled">Scheduled</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="is_featured" value="Featured" />
                                                    <div className="mt-3 flex items-center">
                                                        <input
                                                            id="is_featured"
                                                            type="checkbox"
                                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                            checked={data.is_featured}
                                                            onChange={(e) => setData('is_featured', e.target.checked)}
                                                        />
                                                        <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-700">Feature Post</label>
                                                    </div>
                                                </div>
                                            </div>

                                            {data.status === 'scheduled' && (
                                                <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                                                    <InputLabel htmlFor="published_at" value="Publish Date & Time" />
                                                    <input
                                                        id="published_at"
                                                        type="datetime-local"
                                                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm text-sm"
                                                        value={data.published_at}
                                                        onChange={(e) => setData('published_at', e.target.value)}
                                                    />
                                                </div>
                                            )}

                                            <div className="pt-4 border-t border-gray-100">
                                                <InputLabel htmlFor="slug" value="URL Slug" />
                                                <TextInput
                                                    id="slug"
                                                    type="text"
                                                    className="mt-1 block w-full text-xs text-gray-500 bg-gray-50"
                                                    value={data.slug}
                                                    onChange={(e) => setData('slug', e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SEO Section - Third "Layer" */}
                            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    SEO Metadata
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel htmlFor="meta_title" value="Meta Title" />
                                            <TextInput
                                                id="meta_title"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.meta_title || ''}
                                                onChange={(e) => setData('meta_title', e.target.value)}
                                                placeholder="SEO title..."
                                            />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="meta_keywords" value="Meta Keywords" />
                                            <TextInput
                                                id="meta_keywords"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.meta_keywords || ''}
                                                onChange={(e) => setData('meta_keywords', e.target.value)}
                                                placeholder="news, blog, updates..."
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="meta_description" value="Meta Description" />
                                        <textarea
                                            id="meta_description"
                                            className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                            rows={4}
                                            value={data.meta_description || ''}
                                            onChange={(e) => setData('meta_description', e.target.value)}
                                            placeholder="Brief description for search engines..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

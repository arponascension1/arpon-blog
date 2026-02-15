import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import MediaPicker from '@/Components/MediaPicker';
import SearchSelect from '@/Components/SearchSelect';
import { Category } from '@/types';

interface CreateProps {
    parentCategories: Category[];
}

export default function Create({ parentCategories }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        description: '',
        parent_id: '' as string | number,
        image_url: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        is_active: true,
        is_featured: false,
    });

    // Auto-generate slug from name
    useEffect(() => {
        const slug = data.name
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
        setData('slug', slug);
    }, [data.name]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/categories');
    };

    return (
        <AdminLayout>
            <Head title="Create Category" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Create Category</h1>
                            <p className="mt-1 text-sm text-gray-600">Add a new category for your blog posts</p>
                        </div>
                        <Link
                            href="/admin/categories"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Back to Categories
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">General Information</h2>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="md:w-1/3">
                                    <MediaPicker
                                        label="Header Image"
                                        currentValue={data.image_url}
                                        onSelect={(url) => setData('image_url', url)}
                                    />
                                    <InputError message={errors.image_url} className="mt-2" />
                                </div>
                                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="name" value="Name" />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="slug" value="Slug" />
                                        <TextInput
                                            id="slug"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.slug} className="mt-2" />
                                    </div>

                                    <div className="md:col-span-2">
                                        <InputLabel htmlFor="description" value="Description" />
                                        <textarea
                                            id="description"
                                            className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                            rows={3}
                                            value={data.description || ''}
                                            onChange={(e) => setData('description', e.target.value)}
                                        />
                                        <InputError message={errors.description} className="mt-2" />
                                    </div>

                                                                    <div>
                                                                        <InputLabel htmlFor="parent_id" value="Parent Category" />
                                                                        <SearchSelect
                                                                            options={[{ id: '', name: 'None (Top Level)' }, ...parentCategories]}
                                                                            value={data.parent_id}
                                                                            onChange={(value) => setData('parent_id', value)}
                                                                            placeholder="Search parent categories..."
                                                                        />
                                                                        <InputError message={errors.parent_id} className="mt-2" />
                                                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <div className="flex items-center">
                                            <input
                                                id="is_active"
                                                type="checkbox"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                checked={data.is_active}
                                                onChange={(e) => setData('is_active', e.target.checked)}
                                            />
                                            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">Active</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="is_featured"
                                                type="checkbox"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                checked={data.is_featured}
                                                onChange={(e) => setData('is_featured', e.target.checked)}
                                            />
                                            <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900">Featured</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h2>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <InputLabel htmlFor="meta_title" value="Meta Title" />
                                    <TextInput
                                        id="meta_title"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.meta_title || ''}
                                        onChange={(e) => setData('meta_title', e.target.value)}
                                        placeholder="If empty, category name will be used"
                                    />
                                    <InputError message={errors.meta_title} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="meta_description" value="Meta Description" />
                                    <textarea
                                        id="meta_description"
                                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                        rows={2}
                                        value={data.meta_description || ''}
                                        onChange={(e) => setData('meta_description', e.target.value)}
                                    />
                                    <InputError message={errors.meta_description} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="meta_keywords" value="Meta Keywords" />
                                    <TextInput
                                        id="meta_keywords"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.meta_keywords || ''}
                                        onChange={(e) => setData('meta_keywords', e.target.value)}
                                        placeholder="keyword1, keyword2, keyword3"
                                    />
                                    <InputError message={errors.meta_keywords} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <PrimaryButton disabled={processing}>
                                Create Category
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

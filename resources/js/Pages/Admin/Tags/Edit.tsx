import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Tag } from '@/types';

interface EditProps {
    tag: Tag;
}

export default function Edit({ tag }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: tag.name,
        slug: tag.slug,
        meta_title: tag.meta_title || '',
        meta_description: tag.meta_description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/tags/${tag.id}`);
    };

    return (
        <AdminLayout>
            <Head title={`Edit Tag: ${tag.name}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Edit Tag: {tag.name}</h1>
                            <p className="mt-1 text-sm text-gray-600">Update tag details and SEO settings</p>
                        </div>
                        <Link
                            href="/admin/tags"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Back to Tags
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">General Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                        value={data.meta_title}
                                        onChange={(e) => setData('meta_title', e.target.value)}
                                    />
                                    <InputError message={errors.meta_title} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="meta_description" value="Meta Description" />
                                    <textarea
                                        id="meta_description"
                                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                        rows={2}
                                        value={data.meta_description}
                                        onChange={(e) => setData('meta_description', e.target.value)}
                                    />
                                    <InputError message={errors.meta_description} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <PrimaryButton disabled={processing}>
                                Update Tag
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

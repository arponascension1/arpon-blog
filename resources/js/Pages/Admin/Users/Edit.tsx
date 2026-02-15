import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { User } from '@/types';
import MediaPicker from '@/Components/MediaPicker';

interface EditProps {
    user: User;
}

export default function Edit({ user }: EditProps) {
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        avatar: user.avatar || '',
        password: '',
        password_confirmation: '',
        is_admin: user.is_admin,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.users.update', user.id), {
            onSuccess: () => {
                setData('password', '');
                setData('password_confirmation', '');
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Edit User" />
            
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <div className="flex items-center mb-4">
                            <Link
                                href="/admin/users"
                                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Users
                            </Link>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
                        <p className="mt-1 text-sm text-gray-600">Update user information and permissions</p>
                    </div>

                    <div className="bg-white shadow-sm rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="sm:w-1/3">
                                    <MediaPicker 
                                        label="Profile Picture"
                                        currentValue={data.avatar}
                                        onSelect={(url) => setData('avatar', url)}
                                    />
                                    {errors.avatar && (
                                        <p className="mt-2 text-sm text-red-600">{errors.avatar}</p>
                                    )}
                                </div>

                                <div className="sm:w-2/3 space-y-6">
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                required
                                            />
                                            {errors.name && (
                                                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                required
                                            />
                                            {errors.email && (
                                                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                placeholder="Leave empty to keep current password"
                                            />
                                            {errors.password && (
                                                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                                Confirm New Password
                                            </label>
                                            <input
                                                type="password"
                                                id="password_confirmation"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                placeholder="Leave empty to keep current password"
                                            />
                                            {errors.password_confirmation && (
                                                <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="is_admin"
                                            checked={data.is_admin}
                                            onChange={(e) => setData('is_admin', e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="is_admin" className="ml-2 block text-sm text-gray-900">
                                            Grant admin privileges
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-md">
                                <h3 className="text-sm font-medium text-gray-900 mb-2">User Information</h3>
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 text-sm">
                                    <div>
                                        <dt className="font-medium text-gray-500">User ID</dt>
                                        <dd className="text-gray-900">{user.id}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium text-gray-500">Joined</dt>
                                        <dd className="text-gray-900">{new Date(user.created_at).toLocaleDateString()}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium text-gray-500">Email Verified</dt>
                                        <dd className="text-gray-900">
                                            {user.email_verified_at ? 'Yes' : 'No'}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium text-gray-500">Last Updated</dt>
                                        <dd className="text-gray-900">{new Date(user.updated_at).toLocaleDateString()}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                <Link
                                    href="/admin/users"
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    {processing ? 'Updating...' : 'Update User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { User } from '@/types';

interface ShowProps {
    user: User;
    activities: Array<{
        id: string;
        type: string;
        description: string;
        created_at: string;
    }>;
}

export default function Show({ user, activities }: ShowProps) {
    return (
        <AdminLayout>
            <Head title={`User: ${user.name}`} />
            
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
                        <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
                        <p className="mt-1 text-sm text-gray-600">View user information and activity</p>
                    </div>

                    <div className="bg-white shadow-sm rounded-lg">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-12 w-12">
                                        <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                                            <span className="text-lg font-medium text-gray-700">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">{user.name}</h3>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                                        user.is_admin
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {user.is_admin ? 'Admin' : 'User'}
                                    </span>
                                    <Link
                                        href={`/admin/users/${user.id}/edit`}
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className="px-4 py-5 sm:p-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">User ID</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.id}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            user.is_admin
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {user.is_admin ? 'Administrator' : 'Regular User'}
                                        </span>
                                    </dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Account Created</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {new Date(user.created_at).toLocaleDateString()} at {new Date(user.created_at).toLocaleTimeString()}
                                    </dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {new Date(user.updated_at).toLocaleDateString()} at {new Date(user.updated_at).toLocaleTimeString()}
                                    </dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Email Verification</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {user.email_verified_at ? (
                                            <span className="inline-flex items-center text-green-600">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Verified on {new Date(user.email_verified_at).toLocaleDateString()}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center text-yellow-600">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                                                </svg>
                                                Not verified
                                            </span>
                                        )}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                {activities.map((activity) => (
                                    <div key={activity.id} className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                                activity.type === 'like' ? 'bg-red-100' : 'bg-blue-100'
                                            }`}>
                                                {activity.type === 'like' ? (
                                                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-900">{activity.description}</p>
                                            <p className="text-xs text-gray-500">{activity.created_at}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-900">Account created</p>
                                        <p className="text-xs text-gray-500">{new Date(user.created_at).toLocaleDateString()} at {new Date(user.created_at).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                                {user.updated_at !== user.created_at && (
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-900">Profile updated</p>
                                            <p className="text-xs text-gray-500">{new Date(user.updated_at).toLocaleDateString()} at {new Date(user.updated_at).toLocaleTimeString()}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

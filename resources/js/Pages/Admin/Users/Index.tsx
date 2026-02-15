import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { User, PaginatedCollection } from '@/types';

interface UsersProps {
    users: PaginatedCollection<User>;
    filters: {
        search?: string;
        role?: string;
    };
    sort?: {
        field: string;
        direction: 'asc' | 'desc';
    };
}

export default function Index({ users, filters, sort }: UsersProps) {
    const { props } = usePage();
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [userToToggleAdmin, setUserToToggleAdmin] = useState<User | null>(null);
    const [processingAction, setProcessingAction] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');
    const [currentSort, setCurrentSort] = useState({
        field: sort?.field || 'created_at',
        direction: sort?.direction || 'desc'
    });
    const isFirstRender = React.useRef(true);

    // Auto-apply filters when they change (but not on initial load)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeoutId = setTimeout(() => {
            // Only trigger if something actually changed from what's currently in the URL/props
            if (searchTerm === (filters.search || '') && 
                roleFilter === (filters.role || '') && 
                currentSort.field === (sort?.field || 'created_at') && 
                currentSort.direction === (sort?.direction || 'desc')) {
                return;
            }

            const params: any = {
                search: searchTerm || undefined, 
                role: roleFilter || undefined,
            };
            
            if (currentSort.field !== 'created_at' || currentSort.direction !== 'desc') {
                params.sort = currentSort.field;
                params.direction = currentSort.direction;
            }
            
            router.get('/admin/users', params, { 
                preserveState: true,
                replace: true 
            });
        }, 300); // 300ms debounce

        return () => clearTimeout(timeoutId);
    }, [searchTerm, roleFilter, currentSort]);

    // Sync state with props when props change (e.g. from back button or external updates)
    useEffect(() => {
        setSearchTerm(filters.search || '');
        setRoleFilter(filters.role || '');
        if (sort?.field && sort?.direction) {
            setCurrentSort({
                field: sort.field,
                direction: sort.direction
            });
        }
    }, [filters.search, filters.role, sort?.field, sort?.direction]);

    const confirmDeleteUser = (user: User) => {
        setUserToDelete(user);
    };

    const deleteUser = () => {
        if (!userToDelete) return;

        setProcessingAction(true);
        router.delete(`/admin/users/${userToDelete.id}`, {
            onFinish: () => {
                setProcessingAction(false);
                setUserToDelete(null);
            }
        });
    };

    const confirmToggleAdmin = (user: User) => {
        setUserToToggleAdmin(user);
    };

    const toggleAdmin = () => {
        if (!userToToggleAdmin) return;

        setProcessingAction(true);
        router.patch(
            `/admin/users/${userToToggleAdmin.id}/toggle-admin`,
            {},
            {
                onFinish: () => {
                    setProcessingAction(false);
                    setUserToToggleAdmin(null);
                }
            }
        );
    };

    const clearFilters = () => {
        setSearchTerm('');
        setRoleFilter('');
        setCurrentSort({
            field: 'created_at',
            direction: 'desc'
        });
    };

    const handleSort = (field: string) => {
        if (currentSort.field === field) {
            // Toggle direction if same field
            setCurrentSort({
                field,
                direction: currentSort.direction === 'asc' ? 'desc' : 'asc'
            });
        } else {
            // Set new field with default desc direction
            setCurrentSort({
                field,
                direction: 'desc'
            });
        }
    };

    const getSortIcon = (field: string) => {
        if (currentSort.field !== field) {
            return (
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4 4" />
                </svg>
            );
        }
        
        return currentSort.direction === 'asc' ? (
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
        ) : (
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
        );
    };

    return (
        <AdminLayout>
            <Head title="Manage Users" />
            
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                            <p className="mt-1 text-sm text-gray-600">Manage user accounts and permissions</p>
                        </div>
                        <div className="flex space-x-3">
                            <Link
                                href="/admin/users/create"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add User
                            </Link>
                            <Link
                                href="/admin/dashboard"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white shadow-sm rounded-lg mb-6">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div className="sm:w-48">
                                    <select
                                        value={roleFilter}
                                        onChange={(e) => setRoleFilter(e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    >
                                        <option value="">All Roles</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                                {(searchTerm || roleFilter || (currentSort.field !== 'created_at' || currentSort.direction !== 'desc')) && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                            {(searchTerm || roleFilter || (currentSort.field !== 'created_at' || currentSort.direction !== 'desc')) && (
                                <div className="mt-3 text-sm text-gray-600">
                                    Active filters: 
                                    {searchTerm && <span className="ml-2 font-medium">Search: "{searchTerm}"</span>}
                                    {roleFilter && <span className="ml-2 font-medium">Role: {roleFilter}</span>}
                                    {(currentSort.field !== 'created_at' || currentSort.direction !== 'desc') && (
                                        <span className="ml-2 font-medium">
                                            Sort: {currentSort.field} ({currentSort.direction === 'asc' ? '↑' : '↓'})
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white shadow-sm rounded-lg">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">All Users</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        A list of all users in your application including their name, email, role and registration date.
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">
                                        {users.total} total users
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort('name')}
                                        >
                                            <div className="flex items-center space-x-1">
                                                <span>User</span>
                                                {getSortIcon('name')}
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort('created_at')}
                                        >
                                            <div className="flex items-center space-x-1">
                                                <span>Joined</span>
                                                {getSortIcon('created_at')}
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.data.map((user: User) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                                            {user.avatar ? (
                                                                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                                                            ) : (
                                                                <span className="text-sm font-medium text-gray-700">
                                                                    {user.name.charAt(0).toUpperCase()}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            ID: {user.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.email}</div>
                                                {user.email_verified_at && (
                                                    <div className="text-xs text-green-600">Verified</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    user.is_admin
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {user.is_admin ? 'Admin' : 'User'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Link
                                                        href={`/admin/users/${user.id}`}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={`/admin/users/${user.id}/edit`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => confirmToggleAdmin(user)}
                                                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                                                            user.is_admin
                                                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                        }`}
                                                    >
                                                        {user.is_admin ? 'Remove Admin' : 'Make Admin'}
                                                    </button>
                                                    <button
                                                        onClick={() => confirmDeleteUser(user)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <Pagination 
                            links={users.links}
                            current_page={users.current_page}
                            last_page={users.last_page}
                            from={users.from}
                            to={users.to}
                            total={users.total}
                        />
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                show={!!userToDelete}
                title="Delete User"
                message={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`}
                onConfirm={deleteUser}
                onClose={() => setUserToDelete(null)}
                processing={processingAction}
            />

            {/* Toggle Admin Confirmation Modal */}
            <ConfirmationModal
                show={!!userToToggleAdmin}
                title={userToToggleAdmin?.is_admin ? 'Remove Admin Privileges' : 'Grant Admin Privileges'}
                message={`Are you sure you want to ${userToToggleAdmin?.is_admin ? 'remove admin privileges from' : 'grant admin privileges to'} ${userToToggleAdmin?.name}?`}
                confirmText={userToToggleAdmin?.is_admin ? 'Remove Admin' : 'Make Admin'}
                onConfirm={toggleAdmin}
                onClose={() => setUserToToggleAdmin(null)}
                processing={processingAction}
            />
        </AdminLayout>
    );
}


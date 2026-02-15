import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { Category, PaginatedCollection } from '@/types';

interface CategoriesProps {
    categories: PaginatedCollection<Category>;
    parentCategories: Array<{ id: number; name: string }>;
    filters: {
        search?: string;
        status?: string;
        parent_id?: string;
    };
    sort?: {
        field: string;
        direction: 'asc' | 'desc';
    };
}

export default function Index({ categories, parentCategories, filters, sort }: CategoriesProps) {
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
    const [processingAction, setProcessingAction] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [parentIdFilter, setParentIdFilter] = useState(filters.parent_id || '');
    const [currentSort, setCurrentSort] = useState({
        field: sort?.field || 'name',
        direction: sort?.direction || 'asc'
    });
    const isFirstRender = React.useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeoutId = setTimeout(() => {
            if (searchTerm === (filters.search || '') && 
                statusFilter === (filters.status || '') && 
                parentIdFilter === (filters.parent_id || '') && 
                currentSort.field === (sort?.field || 'name') && 
                currentSort.direction === (sort?.direction || 'asc')) {
                return;
            }

            const params: any = {
                search: searchTerm || undefined, 
                status: statusFilter || undefined,
                parent_id: parentIdFilter || undefined,
            };
            
            if (currentSort.field !== 'name' || currentSort.direction !== 'asc') {
                params.sort = currentSort.field;
                params.direction = currentSort.direction;
            }
            
            router.get('/admin/categories', params, { 
                preserveState: true,
                replace: true 
            });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, statusFilter, parentIdFilter, currentSort]);

    // Sync state with props when props change
    useEffect(() => {
        setSearchTerm(filters.search || '');
        setStatusFilter(filters.status || '');
        setParentIdFilter(filters.parent_id || '');
        if (sort?.field && sort?.direction) {
            setCurrentSort({
                field: sort.field,
                direction: sort.direction
            });
        }
    }, [filters.search, filters.status, filters.parent_id, sort?.field, sort?.direction]);

    const deleteCategory = () => {
        if (!categoryToDelete) return;

        setProcessingAction(true);
        router.delete(`/admin/categories/${categoryToDelete.id}`, {
            onFinish: () => {
                setProcessingAction(false);
                setCategoryToDelete(null);
            }
        });
    };

    const toggleActive = (category: Category) => {
        router.patch(`/admin/categories/${category.id}/toggle-active`, {}, {
            preserveScroll: true
        });
    };

    const handleSort = (field: string) => {
        if (currentSort.field === field) {
            setCurrentSort({
                field,
                direction: currentSort.direction === 'asc' ? 'desc' : 'asc'
            });
        } else {
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
            <Head title="Manage Categories" />
            
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                            <p className="mt-1 text-sm text-gray-600">Organize your blog posts into categories</p>
                        </div>
                        <div className="flex space-x-3">
                            <Link
                                href="/admin/categories/create"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Category
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
                                        placeholder="Search categories..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div className="sm:w-48">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    >
                                        <option value="">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="sm:w-48">
                                    <select
                                        value={parentIdFilter}
                                        onChange={(e) => setParentIdFilter(e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    >
                                        <option value="">All Parents</option>
                                        <option value="top_level">Top Level Only</option>
                                        {parentCategories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-sm rounded-lg">
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
                                                <span>Category</span>
                                                {getSortIcon('name')}
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Slug
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Parent
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {categories.data.map((category: Category) => (
                                        <tr key={category.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {category.image_url && (
                                                        <div className="flex-shrink-0 h-10 w-10 mr-4">
                                                            <img src={category.image_url} alt="" className="h-10 w-10 rounded-md object-cover" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                                        {category.is_featured && (
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                                                Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {category.slug}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {category.parent?.name || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => toggleActive(category)}
                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        category.is_active
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {category.is_active ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Link
                                                        href={`/admin/categories/${category.id}/edit`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => setCategoryToDelete(category)}
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
                            links={categories.links}
                            current_page={categories.current_page}
                            last_page={categories.last_page}
                            from={categories.from}
                            to={categories.to}
                            total={categories.total}
                        />
                    </div>
                </div>
            </div>

            <ConfirmationModal
                show={!!categoryToDelete}
                title="Delete Category"
                message={`Are you sure you want to delete ${categoryToDelete?.name}? This action cannot be undone.`}
                onConfirm={deleteCategory}
                onClose={() => setCategoryToDelete(null)}
                processing={processingAction}
            />
        </AdminLayout>
    );
}

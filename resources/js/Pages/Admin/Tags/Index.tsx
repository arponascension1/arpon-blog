import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { Tag, PaginatedCollection } from '@/types';

interface TagsProps {
    tags: PaginatedCollection<Tag>;
    filters: {
        search?: string;
    };
    sort?: {
        field: string;
        direction: 'asc' | 'desc';
    };
}

export default function Index({ tags, filters, sort }: TagsProps) {
    const [tagToDelete, setTagToDelete] = useState<Tag | null>(null);
    const [processingAction, setProcessingAction] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
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
                currentSort.field === (sort?.field || 'name') && 
                currentSort.direction === (sort?.direction || 'asc')) {
                return;
            }

            const params: any = {
                search: searchTerm || undefined, 
            };
            
            if (currentSort.field !== 'name' || currentSort.direction !== 'asc') {
                params.sort = currentSort.field;
                params.direction = currentSort.direction;
            }
            
            router.get('/admin/tags', params, { 
                preserveState: true,
                replace: true 
            });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, currentSort]);

    useEffect(() => {
        setSearchTerm(filters.search || '');
        if (sort?.field && sort?.direction) {
            setCurrentSort({
                field: sort.field,
                direction: sort.direction
            });
        }
    }, [filters.search, sort?.field, sort?.direction]);

    const deleteTag = () => {
        if (!tagToDelete) return;

        setProcessingAction(true);
        router.delete(`/admin/tags/${tagToDelete.id}`, {
            onFinish: () => {
                setProcessingAction(false);
                setTagToDelete(null);
            }
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
            <Head title="Manage Tags" />
            
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Tags</h1>
                            <p className="mt-1 text-sm text-gray-600">Label and organize your blog posts</p>
                        </div>
                        <div className="flex space-x-3">
                            <Link
                                href="/admin/tags/create"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Tag
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
                                        placeholder="Search tags..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
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
                                                <span>Tag Name</span>
                                                {getSortIcon('name')}
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Slug
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort('created_at')}
                                        >
                                            <div className="flex items-center space-x-1">
                                                <span>Created At</span>
                                                {getSortIcon('created_at')}
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tags.data.map((tag: Tag) => (
                                        <tr key={tag.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{tag.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {tag.slug}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(tag.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Link
                                                        href={`/admin/tags/${tag.id}/edit`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => setTagToDelete(tag)}
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
                            links={tags.links}
                            current_page={tags.current_page}
                            last_page={tags.last_page}
                            from={tags.from}
                            to={tags.to}
                            total={tags.total}
                        />
                    </div>
                </div>
            </div>

            <ConfirmationModal
                show={!!tagToDelete}
                title="Delete Tag"
                message={`Are you sure you want to delete ${tagToDelete?.name}? This action cannot be undone.`}
                onConfirm={deleteTag}
                onClose={() => setTagToDelete(null)}
                processing={processingAction}
            />
        </AdminLayout>
    );
}

import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import ConfirmationModal from '@/Components/ConfirmationModal';
import SearchSelect from '@/Components/SearchSelect';
import { Post, Category, PaginatedCollection } from '@/types';

interface PostsProps {
    posts: PaginatedCollection<Post>;
    categories: Category[];
    filters: {
        search?: string;
        category_id?: string;
        status?: string;
    };
    sort?: {
        field: string;
        direction: 'asc' | 'desc';
    };
}

export default function Index({ posts, categories, filters, sort }: PostsProps) {
    const [postToDelete, setPostToDelete] = useState<Post | null>(null);
    const [processingAction, setProcessingAction] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [categoryFilter, setCategoryFilter] = useState(filters.category_id || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [currentSort, setCurrentSort] = useState({
        field: sort?.field || 'created_at',
        direction: sort?.direction || 'desc'
    });
    const isFirstRender = React.useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeoutId = setTimeout(() => {
            if (searchTerm === (filters.search || '') && 
                categoryFilter === (filters.category_id || '') && 
                statusFilter === (filters.status || '') && 
                currentSort.field === (sort?.field || 'created_at') && 
                currentSort.direction === (sort?.direction || 'desc')) {
                return;
            }

            const params: any = {
                search: searchTerm || undefined, 
                category_id: categoryFilter || undefined,
                status: statusFilter || undefined,
            };
            
            if (currentSort.field !== 'created_at' || currentSort.direction !== 'desc') {
                params.sort = currentSort.field;
                params.direction = currentSort.direction;
            }
            
            router.get('/admin/posts', params, { 
                preserveState: true,
                replace: true 
            });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, categoryFilter, statusFilter, currentSort]);

    useEffect(() => {
        setSearchTerm(filters.search || '');
        setCategoryFilter(filters.category_id || '');
        setStatusFilter(filters.status || '');
        if (sort?.field && sort?.direction) {
            setCurrentSort({
                field: sort.field,
                direction: sort.direction
            });
        }
    }, [filters.search, filters.category_id, filters.status, sort?.field, sort?.direction]);

    const deletePost = () => {
        if (!postToDelete) return;

        setProcessingAction(true);
        router.delete(`/admin/posts/${postToDelete.id}`, {
            onFinish: () => {
                setProcessingAction(false);
                setPostToDelete(null);
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

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'published':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Published</span>;
            case 'draft':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Draft</span>;
            case 'scheduled':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Scheduled</span>;
            default:
                return null;
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
            <Head title="Manage Posts" />
            
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
                            <p className="mt-1 text-sm text-gray-600">Manage your blog content</p>
                        </div>
                        <div className="flex space-x-3">
                            <Link
                                href="/admin/posts/create"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                New Post
                            </Link>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white shadow-sm rounded-2xl border border-gray-100 mb-6 overflow-hidden">
                        <div className="px-4 py-5 sm:p-6 bg-white">
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                                <div className="sm:col-span-6 lg:col-span-7">
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search posts..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="block w-full pl-10 pr-3 py-2 border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3 lg:col-span-3">
                                    <SearchSelect
                                        options={[{ id: '', name: 'All Categories' }, ...categories]}
                                        value={categoryFilter}
                                        onChange={(value) => setCategoryFilter(value.toString())}
                                        placeholder="Category..."
                                    />
                                </div>
                                <div className="sm:col-span-3 lg:col-span-2">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="block w-full border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                                    >
                                        <option value="">All Status</option>
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="scheduled">Scheduled</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:bg-gray-100 transition-colors"
                                            onClick={() => handleSort('title')}
                                        >
                                            <div className="flex items-center space-x-1">
                                                <span>Title</span>
                                                {getSortIcon('title')}
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            Category
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            Status
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:bg-gray-100 transition-colors"
                                            onClick={() => handleSort('created_at')}
                                        >
                                            <div className="flex items-center space-x-1">
                                                <span>Date</span>
                                                {getSortIcon('created_at')}
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-50">
                                    {posts.data.map((post: Post) => (
                                        <tr key={post.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    {post.featured_image && (
                                                        <div className="flex-shrink-0 h-10 w-14 mr-4">
                                                            <img src={post.featured_image} alt="" className="h-full w-full rounded-lg object-cover shadow-sm" />
                                                        </div>
                                                    )}
                                                    <div className="min-w-0">
                                                        <div className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{post.title}</div>
                                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">By {post.author?.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                                                    {post.category?.name || 'Uncategorized'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(post.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-gray-500 uppercase">
                                                {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-3">
                                                    <Link
                                                        href={`/admin/posts/${post.id}/edit`}
                                                        className="text-blue-600 hover:text-blue-700 p-1.5 hover:bg-blue-50 rounded-lg transition-all"
                                                        title="Edit Post"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </Link>
                                                    <button
                                                        onClick={() => setPostToDelete(post)}
                                                        className="text-red-500 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-all"
                                                        title="Delete Post"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {posts.data.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                                                No posts found matching your criteria.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        <Pagination 
                            links={posts.links}
                            current_page={posts.current_page}
                            last_page={posts.last_page}
                            from={posts.from}
                            to={posts.to}
                            total={posts.total}
                        />
                    </div>
                </div>
            </div>

            <ConfirmationModal
                show={!!postToDelete}
                title="Delete Post"
                message={`Are you sure you want to delete "${postToDelete?.title}"?`}
                onConfirm={deletePost}
                onClose={() => setPostToDelete(null)}
                processing={processingAction}
            />
        </AdminLayout>
    );
}

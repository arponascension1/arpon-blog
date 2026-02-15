import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router, WhenVisible } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

interface MediaItem {
    name: string;
    path: string;
    type: 'file' | 'folder';
    size?: number;
    mime?: string;
    url?: string;
    last_modified?: number;
}

interface Breadcrumb {
    name: string;
    path: string;
}

interface IndexProps {
    items: {
        data: MediaItem[];
        next_page_url: string | null;
    };
    currentPath: string;
    breadcrumbs: Breadcrumb[];
    allDirectories: string[];
    filters: {
        search: string | null;
        sort_by: string;
        sort_order: string;
    };
}

export default function Index({ items, currentPath, breadcrumbs, allDirectories, filters }: IndexProps) {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
    const [renameItem, setRenameItem] = useState<MediaItem | null>(null);
    const [moveItems, setMoveItems] = useState<MediaItem[] | null>(null);
    const [search, setSearch] = useState(filters.search || '');
    const [directorySearch, setDirectorySearch] = useState('');
    const [expandedFolders, setExpandedFolders] = useState<string[]>(['Root']);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>(
        (localStorage.getItem('media_view_mode') as 'list' | 'grid') || 'list'
    );

    const mediaItems = items.data;

    const toggleViewMode = (mode: 'list' | 'grid') => {
        setViewMode(mode);
        localStorage.setItem('media_view_mode', mode);
    };

    const getParams = (newSearch?: string, newSortBy?: string, newSortOrder?: string, newPath?: string) => {
        const finalSortBy = newSortBy !== undefined ? newSortBy : filters.sort_by;
        const finalSortOrder = newSortOrder !== undefined ? newSortOrder : filters.sort_order;

        const params: any = {
            path: (newPath !== undefined ? newPath : currentPath) || undefined,
            search: (newSearch !== undefined ? newSearch : search) || undefined,
            sort_by: finalSortBy === 'name' ? undefined : finalSortBy,
            sort_order: finalSortOrder === 'asc' ? undefined : finalSortOrder,
        };

        // Remove undefined keys
        return Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== undefined));
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.media.index'), getParams() as any, { preserveState: true });
    };

    const handleSort = (column: string) => {
        const order = filters.sort_by === column && filters.sort_order === 'asc' ? 'desc' : 'asc';
        router.get(route('admin.media.index'), getParams(search, column, order) as any, { preserveState: true });
    };

    const toggleSelection = (path: string) => {
        setSelectedItems(prev => 
            prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
        );
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const formData = new FormData();
            formData.append('path', currentPath);
            files.forEach(file => formData.append('files[]', file));
            
            router.post(route('admin.media.upload'), formData, {
                onSuccess: () => {
                    e.target.value = '';
                }
            });
        }
    };

    const createFolder = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.media.folder'), {
            onSuccess: () => {
                setIsCreateFolderModalOpen(false);
                reset('name');
            }
        });
    };

    const handleRename = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('admin.media.rename'), {
            path: renameItem?.path,
            new_name: data.new_name,
            type: renameItem?.type
        }, {
            onSuccess: () => {
                setRenameItem(null);
                reset('new_name');
            }
        });
    };

    const handleMove = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('admin.media.move'), {
            items: moveItems?.map(i => ({ path: i.path })),
            destination: data.destination === 'Root' ? '' : data.destination
        }, {
            onSuccess: () => {
                setMoveItems(null);
                setSelectedItems([]);
                reset('destination');
            }
        });
    };

    const deleteSelected = () => {
        if (confirm('Are you sure you want to delete selected items?')) {
            const itemsToDelete = mediaItems.filter(item => selectedItems.includes(item.path))
                .map(item => ({ path: item.path, type: item.type }));
            
            router.delete(route('admin.media.destroy'), {
                data: { items: itemsToDelete },
                onSuccess: () => setSelectedItems([])
            });
        }
    };

    const formatSize = (bytes?: number) => {
        if (!bytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const basename = (path: string) => {
        return path.split('/').pop() || '';
    };

    const toggleExpand = (path: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setExpandedFolders(prev => 
            prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
        );
    };

    const hasChildren = (path: string) => {
        if (path === 'Root') return allDirectories.length > 1;
        return allDirectories.some(dir => dir.startsWith(path + '/'));
    };

    const isFolderVisible = (path: string) => {
        if (directorySearch) return true;
        if (path === 'Root') return true;
        
        const parts = path.split('/');
        if (!expandedFolders.includes('Root')) return false;
        
        let current = '';
        for (let i = 0; i < parts.length - 1; i++) {
            current += (current ? '/' : '') + parts[i];
            if (!expandedFolders.includes(current)) return false;
        }
        return true;
    };

    const filteredDirectories = allDirectories.filter(dir => {
        const matchesSearch = dir.toLowerCase().includes(directorySearch.toLowerCase());
        const matchesVisibility = isFolderVisible(dir);
        return matchesSearch && matchesVisibility;
    });

    const getIndentLevel = (path: string) => {
        if (path === 'Root') return 0;
        return (path.match(/\//g) || []).length + 1;
    };

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        path: currentPath,
        new_name: '',
        destination: '',
    });

    return (
        <AdminLayout>
            <Head title="Media Management" />
            
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div className="flex-1 min-w-0 mr-4">
                            <h1 className="text-2xl font-bold text-gray-900">Media Management</h1>
                            <nav className="flex mt-1" aria-label="Breadcrumb">
                                <ol className="flex items-center space-x-2">
                                    {breadcrumbs.map((crumb, index) => (
                                        <li key={crumb.path} className="flex items-center">
                                            {index > 0 && <span className="text-gray-400 mx-2">/</span>}
                                            <Link 
                                                href={route('admin.media.index', getParams(search, filters.sort_by, filters.sort_order, crumb.path))}
                                                className={`text-sm font-medium ${index === breadcrumbs.length - 1 ? 'text-gray-900' : 'text-blue-600 hover:text-blue-800'}`}
                                            >
                                                {crumb.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        </div>
                        
                        <div className="mt-4 md:mt-0 flex flex-wrap gap-3 items-center">
                            <div className="flex items-center bg-gray-100 rounded-lg p-1 mr-2">
                                <button
                                    onClick={() => toggleViewMode('list')}
                                    className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    title="List View"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => toggleViewMode('grid')}
                                    className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    title="Grid View"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM6 14a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 14a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </button>
                            </div>

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                                        <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                                        </svg>
                                        Sort
                                        <svg className="ml-2 -mr-1 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    {[
                                        { label: 'Name (A-Z)', sort: 'name', order: 'asc' },
                                        { label: 'Name (Z-A)', sort: 'name', order: 'desc' },
                                        { label: 'Size (Smallest)', sort: 'size', order: 'asc' },
                                        { label: 'Size (Largest)', sort: 'size', order: 'desc' },
                                        { label: 'Date (Oldest)', sort: 'last_modified', order: 'asc' },
                                        { label: 'Date (Newest)', sort: 'last_modified', order: 'desc' },
                                    ].map((option) => (
                                        <button
                                            key={`${option.sort}-${option.order}`}
                                            onClick={() => {
                                                router.get(route('admin.media.index'), getParams(search, option.sort, option.order) as any, { preserveState: true });
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between transition-colors ${
                                                filters.sort_by === option.sort && filters.sort_order === option.order 
                                                ? 'text-blue-600 font-semibold bg-blue-50' 
                                                : 'text-gray-700'
                                            }`}
                                        >
                                            {option.label}
                                            {filters.sort_by === option.sort && filters.sort_order === option.order && (
                                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>
                                    ))}
                                </Dropdown.Content>
                            </Dropdown>

                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search files..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </form>

                            {selectedItems.length > 0 && (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => {
                                            const itemsToMove = mediaItems.filter(item => selectedItems.includes(item.path));
                                            setMoveItems(itemsToMove);
                                            setData('destination', currentPath);
                                        }}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Move ({selectedItems.length})
                                    </button>
                                    <button
                                        onClick={deleteSelected}
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                            <button
                                onClick={() => setIsCreateFolderModalOpen(true)}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                New Folder
                            </button>
                            <label className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                                Upload
                                <input type="file" multiple className="hidden" onChange={handleFileUpload} />
                            </label>
                        </div>
                    </div>

                    <div className={`${viewMode === 'list' ? 'bg-white shadow overflow-hidden sm:rounded-md' : ''}`}>
                        {viewMode === 'list' ? (
                            <>
                                <ul className="divide-y divide-gray-200">
                                    {mediaItems.length === 0 && (
                                        <li className="px-6 py-12 text-center text-gray-500">
                                            This folder is empty.
                                        </li>
                                    )}
                                    {mediaItems.map((item) => (
                                        <li key={item.path} className="hover:bg-gray-50 flex items-center px-4 py-4 sm:px-6">
                                            <div className="flex items-center flex-1">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(item.path)}
                                                    onChange={() => toggleSelection(item.path)}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-4"
                                                />
                                                <div className="min-w-0 flex-1 flex items-center">
                                                    <div className="flex-shrink-0">
                                                        {item.type === 'folder' ? (
                                                            <svg className="h-10 w-10 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                                            </svg>
                                                        ) : (
                                                            <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded text-gray-400 overflow-hidden">
                                                                {item.mime && typeof item.mime === 'string' && item.mime.startsWith('image/') ? (
                                                                    <img src={item.url} alt="" className="h-full w-full object-cover" />
                                                                ) : (
                                                                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                                    </svg>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0 flex-1 px-4 flex items-center justify-between">
                                                        <div className="flex-1 truncate mr-4">
                                                            {item.type === 'folder' ? (
                                                                <Link 
                                                                    href={route('admin.media.index', getParams(search, filters.sort_by, filters.sort_order, item.path))}
                                                                    className="text-sm font-medium text-blue-600 truncate hover:underline"
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            ) : (
                                                                <button 
                                                                    onClick={() => setPreviewItem(item)}
                                                                    className="text-sm font-medium text-gray-900 truncate hover:text-blue-600 text-left"
                                                                >
                                                                    {item.name}
                                                                </button>
                                                            )}
                                                            <div className="text-xs text-gray-500 md:hidden">
                                                                {item.type === 'file' ? formatSize(item.size) : 'Folder'} 
                                                                {item.last_modified && ` • ${new Date(item.last_modified * 1000).toLocaleDateString()}`}
                                                            </div>
                                                        </div>
                                                        <div className="hidden md:flex items-center text-sm text-gray-500">
                                                            <div className="w-32 truncate">
                                                                {item.type === 'file' ? formatSize(item.size) : '-'}
                                                            </div>
                                                            <div className="w-48 truncate">
                                                                {item.last_modified ? new Date(item.last_modified * 1000).toLocaleDateString() : '-'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setRenameItem(item);
                                                        setData('new_name', item.name);
                                                    }}
                                                    className="p-1 text-gray-400 hover:text-blue-600"
                                                    title="Rename"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setMoveItems([item]);
                                                        setData('destination', currentPath);
                                                    }}
                                                    className="p-1 text-gray-400 hover:text-blue-600"
                                                    title="Move"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this?')) {
                                                            router.delete(route('admin.media.destroy'), {
                                                                data: { items: [{ path: item.path, type: item.type }] }
                                                            });
                                                        }
                                                    }}
                                                    className="p-1 text-gray-400 hover:text-red-600"
                                                    title="Delete"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {mediaItems.length === 0 && (
                                    <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-lg shadow">
                                        This folder is empty.
                                    </div>
                                )}
                                {mediaItems.map((item) => (
                                    <div 
                                        key={item.path} 
                                        className={`relative group bg-white rounded-lg shadow-sm border p-2 hover:shadow-md transition-shadow ${selectedItems.includes(item.path) ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200'}`}
                                    >
                                        <div className={`absolute top-2 left-2 z-10 transition-opacity ${selectedItems.includes(item.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 focus-within:opacity-100'}`}>
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item.path)}
                                                onChange={() => toggleSelection(item.path)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col space-y-1">
                                            <button
                                                onClick={() => {
                                                    setRenameItem(item);
                                                    setData('new_name', item.name);
                                                }}
                                                className="p-1 bg-white rounded-full shadow-sm text-gray-400 hover:text-blue-600 border"
                                                title="Rename"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setMoveItems([item]);
                                                    setData('destination', currentPath);
                                                }}
                                                className="p-1 bg-white rounded-full shadow-sm text-gray-400 hover:text-blue-600 border"
                                                title="Move"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete this?')) {
                                                        router.delete(route('admin.media.destroy'), {
                                                            data: { items: [{ path: item.path, type: item.type }] }
                                                        });
                                                    }
                                                }}
                                                className="p-1 bg-white rounded-full shadow-sm text-gray-400 hover:text-red-600 border"
                                                title="Delete"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="aspect-square w-full mb-2 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
                                            {item.type === 'folder' ? (
                                                <Link 
                                                    href={route('admin.media.index', getParams(search, filters.sort_by, filters.sort_order, item.path))}
                                                    className="w-full h-full flex items-center justify-center text-yellow-400 hover:scale-110 transition-transform"
                                                >
                                                    <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                                    </svg>
                                                </Link>
                                            ) : (
                                                <button 
                                                    onClick={() => setPreviewItem(item)}
                                                    className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform"
                                                >
                                                    {item.mime && typeof item.mime === 'string' && item.mime.startsWith('image/') ? (
                                                        <img src={item.url} alt="" className="h-full w-full object-cover" />
                                                    ) : (
                                                        <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                        <div className="px-1">
                                            <div className="text-xs font-medium text-gray-900 truncate" title={item.name}>
                                                {item.name}
                                            </div>
                                            <div className="text-[10px] text-gray-500 truncate">
                                                {item.type === 'file' ? formatSize(item.size) : 'Folder'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {items.next_page_url && (
                            <WhenVisible 
                                data="items" 
                                always 
                                fallback={
                                    <div className="py-8 text-center">
                                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                                        </div>
                                    </div>
                                }
                            >
                                {({ fetching }) => fetching && (
                                    <div className="py-8 text-center text-gray-500">
                                        Loading more items...
                                    </div>
                                )}
                            </WhenVisible>
                        )}
                    </div>
                </div>
            </div>

            {/* Create Folder Modal */}
            {isCreateFolderModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setIsCreateFolderModalOpen(false)}></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={createFolder}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Folder</h3>
                                    <input
                                        type="text"
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Folder Name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        autoFocus
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        disabled={processing}
                                    >
                                        Create
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setIsCreateFolderModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Rename Modal */}
            {renameItem && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setRenameItem(null)}></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleRename}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Rename {renameItem.type}</h3>
                                    <input
                                        type="text"
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="New Name"
                                        value={data.new_name}
                                        onChange={e => setData('new_name', e.target.value)}
                                        autoFocus
                                    />
                                    {errors.new_name && <p className="mt-1 text-xs text-red-600">{errors.new_name}</p>}
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        disabled={processing}
                                    >
                                        Rename
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setRenameItem(null)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Move Modal */}
            {moveItems && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setMoveItems(null)}></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleMove}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Move Items</h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Select destination folder for {moveItems.length} item(s):
                                    </p>
                                    
                                    <div className="mb-4">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10 sm:text-sm"
                                                placeholder="Search destination folder..."
                                                value={directorySearch}
                                                onChange={e => setDirectorySearch(e.target.value)}
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-md max-h-60 overflow-y-auto bg-gray-50">
                                        {filteredDirectories.length === 0 ? (
                                            <div className="p-4 text-center text-sm text-gray-500">No folders found</div>
                                        ) : (
                                            <div className="py-1">
                                                {filteredDirectories.map(dir => (
                                                    <button
                                                        key={dir}
                                                        type="button"
                                                        onClick={() => setData('destination', dir === 'Root' ? '' : dir)}
                                                        className={`w-full text-left px-4 py-2 text-sm flex items-center hover:bg-blue-50 transition-colors ${
                                                            (data.destination === dir || (data.destination === '' && dir === 'Root')) 
                                                            ? 'bg-blue-100 text-blue-700 font-semibold' 
                                                            : 'text-gray-700'
                                                        }`}
                                                    >
                                                        <span style={{ marginLeft: `${getIndentLevel(dir) * 1.25}rem` }} className="flex items-center">
                                                            <div 
                                                                className="w-5 h-5 flex items-center justify-center mr-1 cursor-pointer hover:bg-gray-200 rounded"
                                                                onClick={(e) => hasChildren(dir) && toggleExpand(dir, e)}
                                                            >
                                                                {hasChildren(dir) ? (
                                                                    <svg 
                                                                        className={`h-3 w-3 transition-transform ${expandedFolders.includes(dir) ? 'rotate-90' : ''}`} 
                                                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                                    >
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                                                                    </svg>
                                                                ) : (
                                                                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                                                                )}
                                                            </div>
                                                            <svg className={`h-4 w-4 mr-2 ${dir === 'Root' ? 'text-blue-500' : 'text-yellow-400'}`} fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                                            </svg>
                                                            {dir === 'Root' ? 'Root' : basename(dir)}
                                                        </span>
                                                        {(data.destination === dir || (data.destination === '' && dir === 'Root')) && (
                                                            <svg className="h-4 w-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {data.destination !== undefined && (
                                        <p className="mt-3 text-xs text-gray-500 truncate">
                                            Destination: <span className="font-semibold text-gray-700">{data.destination || 'Root'}</span>
                                        </p>
                                    )}
                                    {errors.destination && <p className="mt-1 text-xs text-red-600">{errors.destination}</p>}
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        disabled={processing || (!data.destination && data.destination !== '')}
                                    >
                                        Move
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setMoveItems(null)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {previewItem && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-900 opacity-90" onClick={() => setPreviewItem(null)}></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl sm:w-full">
                            <div className="bg-white px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-medium text-gray-900 truncate pr-4">{previewItem.name}</h3>
                                <button onClick={() => setPreviewItem(null)} className="text-gray-400 hover:text-gray-500">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-4 flex justify-center bg-gray-50" style={{ maxHeight: '70vh', overflow: 'auto' }}>
                                {previewItem.mime && typeof previewItem.mime === 'string' && previewItem.mime.startsWith('image/') ? (
                                    <img src={previewItem.url} alt={previewItem.name} className="max-w-full h-auto" />
                                ) : previewItem.mime === 'application/pdf' ? (
                                    <iframe src={previewItem.url} className="w-full h-[60vh]" />
                                ) : (previewItem.mime && typeof previewItem.mime === 'string' && previewItem.mime.startsWith('text/')) || previewItem.mime === 'application/json' || previewItem.name.endsWith('.txt') ? (
                                    <iframe src={previewItem.url} className="w-full h-[60vh] bg-white" />
                                ) : (
                                    <div className="text-center py-12">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        <p className="mt-2 text-sm text-gray-500">Preview not available for this file type.</p>
                                        <a href={previewItem.url} target="_blank" className="mt-4 inline-flex items-center text-blue-600 hover:underline">
                                            Open in new tab
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
                                <a
                                    href={previewItem.url}
                                    download
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Download
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

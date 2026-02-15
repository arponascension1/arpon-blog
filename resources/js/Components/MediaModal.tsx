import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import Dropdown from '@/Components/Dropdown';

interface MediaItem {
    name: string;
    path: string;
    type: 'file' | 'folder';
    url?: string;
    mime?: string;
}

interface MediaModalProps {
    show: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
    title?: string;
}

export default function MediaModal({ show, onClose, onSelect, title = 'Select Media' }: MediaModalProps) {
    const [items, setItems] = useState<MediaItem[]>([]);
    const [currentPath, setCurrentPath] = useState('');
    const [breadcrumbs, setBreadcrumbs] = useState<{ name: string; path: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const fetchMedia = async (path: string = currentPath, searchTerm: string = search, sort: string = sortBy, order: string = sortOrder) => {
        setLoading(true);
        try {
            const response = await axios.get(route('admin.media.fetch'), {
                params: { 
                    path,
                    search: searchTerm || undefined,
                    sort_by: sort,
                    sort_order: order
                }
            });
            setItems(response.data.items);
            setBreadcrumbs(response.data.breadcrumbs);
            setCurrentPath(path);
        } catch (error) {
            console.error('Error fetching media:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (show) {
            fetchMedia();
        }
    }, [show, sortBy, sortOrder]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        fetchMedia();
    };

    const handleSelect = (item: MediaItem) => {
        if (item.type === 'folder') {
            fetchMedia(item.path);
        } else if (item.mime?.startsWith('image/')) {
            setSelectedUrl(item.url || null);
        }
    };

    const confirmSelection = () => {
        if (selectedUrl) {
            onSelect(selectedUrl);
            onClose();
        }
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-2">
                            {breadcrumbs.map((crumb, index) => (
                                <li key={crumb.path} className="flex items-center">
                                    {index > 0 && <span className="text-gray-400 mx-2">/</span>}
                                    <button 
                                        type="button"
                                        onClick={() => fetchMedia(crumb.path)}
                                        className={`text-sm font-medium ${index === breadcrumbs.length - 1 ? 'text-gray-900' : 'text-blue-600 hover:text-blue-800'}`}
                                    >
                                        {crumb.name}
                                    </button>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <div className="flex items-center space-x-2">
                        <form onSubmit={handleSearch} className="relative flex-1 sm:w-64">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="block w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </form>

                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                                    <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                                    </svg>
                                    Sort
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
                                        type="button"
                                        onClick={() => {
                                            setSortBy(option.sort);
                                            setSortOrder(option.order);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between ${
                                            sortBy === option.sort && sortOrder === option.order 
                                            ? 'text-blue-600 font-semibold bg-blue-50' 
                                            : 'text-gray-700'
                                        }`}
                                    >
                                        {option.label}
                                        {sortBy === option.sort && sortOrder === option.order && (
                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-lg min-h-[400px] max-h-[500px] overflow-y-auto p-4 bg-gray-50">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                            {items.map((item) => (
                                <div 
                                    key={item.path}
                                    onClick={() => handleSelect(item)}
                                    className={`relative group cursor-pointer border rounded-md p-1 transition-all ${
                                        selectedUrl === item.url ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 bg-white hover:border-blue-300'
                                    }`}
                                >
                                    <div className="aspect-square flex items-center justify-center overflow-hidden rounded">
                                        {item.type === 'folder' ? (
                                            <svg className="h-12 w-12 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                            </svg>
                                        ) : (
                                            item.mime?.startsWith('image/') ? (
                                                <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                            )
                                        )}
                                    </div>
                                    <div className="mt-1 text-[10px] truncate text-center text-gray-600">
                                        {item.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <SecondaryButton type="button" onClick={onClose}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton 
                        type="button"
                        onClick={confirmSelection}
                        disabled={!selectedUrl}
                    >
                        Select Image
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}

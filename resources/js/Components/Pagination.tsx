import { Link } from '@inertiajs/react';
import React from 'react';

interface PaginationProps {
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
}

export default function Pagination({ links, current_page, last_page, from, to, total }: PaginationProps) {
    if (last_page <= 1) return null;

    const renderPaginationLinks = () => {
        const items = [];
        const onEachSide = 1;

        // Previous Link
        const prevLink = links[0];
        items.push(
            prevLink.url ? (
                <Link
                    key="prev"
                    href={prevLink.url}
                    preserveScroll
                    preserveState
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    dangerouslySetInnerHTML={{ __html: prevLink.label }}
                />
            ) : (
                <span
                    key="prev-disabled"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-50 text-sm font-medium text-gray-400 cursor-not-allowed"
                    dangerouslySetInnerHTML={{ __html: prevLink.label }}
                />
            )
        );

        // First Page
        const firstPageLink = links.find(l => l.label === '1');
        if (firstPageLink) {
            items.push(
                <Link
                    key="page-1"
                    href={firstPageLink.url!}
                    preserveScroll
                    preserveState
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        current_page === 1
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    1
                </Link>
            );
        }

        // Ellipsis after first page
        if (current_page > onEachSide + 2) {
            items.push(
                <span key="ellipsis-start" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-50 text-sm font-medium text-gray-700">
                    ...
                </span>
            );
        }

        // Pages around current page
        const start = Math.max(2, current_page - onEachSide);
        const end = Math.min(last_page - 1, current_page + onEachSide);

        for (let i = start; i <= end; i++) {
            const pageLink = links.find(l => l.label === i.toString());
            if (pageLink) {
                items.push(
                    <Link
                        key={`page-${i}`}
                        href={pageLink.url!}
                        preserveScroll
                        preserveState
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            current_page === i
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                        {i}
                    </Link>
                );
            }
        }

        // Ellipsis before last page
        if (current_page < last_page - onEachSide - 1) {
            items.push(
                <span key="ellipsis-end" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-50 text-sm font-medium text-gray-700">
                    ...
                </span>
            );
        }

        // Last Page
        if (last_page > 1) {
            const lastPageLink = links.find(l => l.label === last_page.toString());
            if (lastPageLink) {
                items.push(
                    <Link
                        key={`page-${last_page}`}
                        href={lastPageLink.url!}
                        preserveScroll
                        preserveState
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            current_page === last_page
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                        {last_page}
                    </Link>
                );
            }
        }

        // Next Link
        const nextLink = links[links.length - 1];
        items.push(
            nextLink.url ? (
                <Link
                    key="next"
                    href={nextLink.url}
                    preserveScroll
                    preserveState
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    dangerouslySetInnerHTML={{ __html: nextLink.label }}
                />
            ) : (
                <span
                    key="next-disabled"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-gray-50 text-sm font-medium text-gray-400 cursor-not-allowed"
                    dangerouslySetInnerHTML={{ __html: nextLink.label }}
                />
            )
        );

        return items;
    };

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                {links[0]?.url ? (
                    <Link
                        href={links[0].url}
                        preserveScroll
                        preserveState
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        dangerouslySetInnerHTML={{ __html: links[0].label }}
                    />
                ) : (
                    <span
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-50 cursor-not-allowed"
                        dangerouslySetInnerHTML={{ __html: links[0].label }}
                    />
                )}
                {links[links.length - 1]?.url ? (
                    <Link
                        href={links[links.length - 1].url as string}
                        preserveScroll
                        preserveState
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        dangerouslySetInnerHTML={{ __html: links[links.length - 1].label }}
                    />
                ) : (
                    <span
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-50 cursor-not-allowed"
                        dangerouslySetInnerHTML={{ __html: links[links.length - 1].label }}
                    />
                )}
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{from || 0}</span> to{' '}
                        <span className="font-medium">{to || 0}</span> of{' '}
                        <span className="font-medium">{total}</span> results
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        {renderPaginationLinks()}
                    </nav>
                </div>
            </div>
        </div>
    );
}

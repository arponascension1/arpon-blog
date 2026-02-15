import React from 'react';
import { Link } from '@inertiajs/react';

interface BreadcrumbItem {
    label: string;
    url?: string;
    active?: boolean;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    if (items.length === 0) return null;

    return (
        <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                <li>
                    <Link href="/" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                        Home
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                        <svg className="h-3 w-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                        </svg>
                        {item.url && !item.active ? (
                            <Link href={item.url} className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-xs font-black uppercase tracking-widest text-gray-900">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    is_read: boolean;
    created_at: string;
}

interface IndexProps {
    contacts: {
        data: Contact[];
        links: any[];
    };
}

export default function Index({ contacts }: IndexProps) {
    const deleteContact = (id: number) => {
        if (confirm('Are you sure you want to delete this message?')) {
            router.delete(route('admin.contacts.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Contact Messages" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-black mb-6">Contact Messages</h2>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-500">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-500">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-500">Subject</th>
                                            <th className="px-6 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-500">Date</th>
                                            <th className="px-6 py-3 text-right text-xs font-black uppercase tracking-widest text-gray-500">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {contacts.data.map((contact) => (
                                            <tr key={contact.id} className={contact.is_read ? 'opacity-60' : 'bg-blue-50/30'}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {contact.is_read ? (
                                                        <span className="px-2 py-1 text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-500 rounded-md">Read</span>
                                                    ) : (
                                                        <span className="px-2 py-1 text-[10px] font-black uppercase tracking-widest bg-blue-100 text-blue-600 rounded-md">New</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-bold text-gray-900">{contact.name}</div>
                                                    <div className="text-xs text-gray-500">{contact.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 max-w-xs truncate">{contact.subject || 'No Subject'}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(contact.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link 
                                                        href={route('admin.contacts.show', contact.id)}
                                                        className="text-blue-600 hover:text-blue-900 mr-4 font-black uppercase tracking-widest text-[10px]"
                                                    >
                                                        View
                                                    </Link>
                                                    <button 
                                                        onClick={() => deleteContact(contact.id)}
                                                        className="text-red-600 hover:text-red-900 font-black uppercase tracking-widest text-[10px]"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {contacts.data.length === 0 && (
                                <div className="text-center py-12 text-gray-500 font-medium italic">
                                    No messages found.
                                </div>
                            )}

                            {/* Pagination would go here if needed */}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

declare function route(name: string, params?: any): string;

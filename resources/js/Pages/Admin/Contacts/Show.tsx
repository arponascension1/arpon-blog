import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
}

interface ShowProps {
    contact: Contact;
}

export default function Show({ contact }: ShowProps) {
    const deleteContact = () => {
        if (confirm('Are you sure you want to delete this message?')) {
            router.delete(route('admin.contacts.destroy', contact.id));
        }
    };

    return (
        <AdminLayout>
            <Head title={`Message from ${contact.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100">
                        <div className="p-8 md:p-12">
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <Link 
                                        href={route('admin.contacts.index')}
                                        className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black mb-4 inline-block transition-colors"
                                    >
                                        &larr; Back to Messages
                                    </Link>
                                    <h2 className="text-3xl font-black tracking-tighter text-gray-900">{contact.subject || 'No Subject'}</h2>
                                </div>
                                <button 
                                    onClick={deleteContact}
                                    className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all border border-red-100"
                                >
                                    Delete
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">From</h4>
                                    <p className="font-bold text-gray-900">{contact.name}</p>
                                    <p className="text-sm text-gray-500">{contact.email}</p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Received</h4>
                                    <p className="font-bold text-gray-900">{new Date(contact.created_at).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Message Content</h4>
                                <div className="p-8 bg-white border border-gray-100 rounded-3xl text-gray-800 leading-relaxed whitespace-pre-wrap shadow-sm">
                                    {contact.message}
                                </div>
                            </div>

                            <div className="mt-12 pt-12 border-t border-gray-100 flex justify-end">
                                <a 
                                    href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}
                                    className="px-10 py-4 bg-black text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl uppercase tracking-widest text-xs"
                                >
                                    Reply via Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

declare function route(name: string, params?: any): string;

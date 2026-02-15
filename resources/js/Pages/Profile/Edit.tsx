import PublicLayout from '@/Layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <PublicLayout>
            <Head title="Profile" />

            <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
                <div className="mb-12">
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-4">Account Settings</h1>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Manage your account details and security preferences.</p>
                </div>

                <div className="space-y-12">
                    <div className="bg-white p-8 md:p-12 shadow-xl rounded-[3rem] border border-gray-100 animate-slideUp">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-2xl"
                        />
                    </div>

                    <div className="bg-white p-8 md:p-12 shadow-xl rounded-[3rem] border border-gray-100 animate-slideUp delay-100">
                        <UpdatePasswordForm className="max-w-2xl" />
                    </div>

                    <div className="bg-white p-8 md:p-12 shadow-xl rounded-[3rem] border border-gray-100 animate-slideUp delay-200">
                        <DeleteUserForm className="max-w-2xl" />
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slideUp {
                    animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
                }
                .delay-100 { animation-delay: 100ms; }
                .delay-200 { animation-delay: 200ms; }
            `}} />
        </PublicLayout>
    );
}

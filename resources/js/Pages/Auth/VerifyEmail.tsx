import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <PublicLayout>
            <Head title="Email Verification" />

            <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#fafafa]">
                <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                    <div className="h-20 w-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 animate-slideUp">
                        <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-5xl font-black text-gray-900 tracking-tighter mb-4 animate-slideUp">
                        Check Inbox.
                    </h2>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-8 animate-fadeIn max-w-xs mx-auto text-center leading-relaxed">
                        Before getting started, please verify your email address by clicking on the link we just sent.
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl animate-slideUp delay-100">
                    <div className="bg-white py-12 px-8 shadow-2xl shadow-gray-200/50 sm:rounded-[3rem] border border-gray-100/50 sm:px-16">
                        {status === 'verification-link-sent' && (
                            <div className="mb-8 p-4 bg-green-50 rounded-2xl text-sm font-bold text-green-600 border border-green-100 animate-fadeIn">
                                A new verification link has been sent to your email address.
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <button 
                                disabled={processing}
                                className="w-full py-5 bg-black text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:translate-y-0"
                            >
                                Resend Verification Email
                            </button>

                            <div className="pt-6 border-t border-gray-50 flex justify-center">
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors"
                                >
                                    Log Out
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slideUp {
                    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
                }
                .animate-fadeIn {
                    animation: fadeIn 1s ease both;
                }
                .delay-100 { animation-delay: 100ms; }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}} />
        </PublicLayout>
    );
}

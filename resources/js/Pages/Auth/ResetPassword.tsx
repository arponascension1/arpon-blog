import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <PublicLayout>
            <Head title="Reset Password" />

            <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#fafafa]">
                <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                    <div className="h-20 w-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 animate-slideUp">
                        <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                    </div>
                    <h2 className="text-5xl font-black text-gray-900 tracking-tighter mb-4 animate-slideUp">
                        New Security.
                    </h2>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-8 animate-fadeIn max-w-xs mx-auto">
                        Create a strong new password to regain access to your account.
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl animate-slideUp delay-100">
                    <div className="bg-white py-12 px-8 shadow-2xl shadow-gray-200/50 sm:rounded-[3rem] border border-gray-100/50 sm:px-16">
                        <form onSubmit={submit} className="space-y-8">
                            <div>
                                <InputLabel htmlFor="email" value="Email Address" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-black transition-all"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError message={errors.email} className="mt-2 ml-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password" value="New Password" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1" />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-black transition-all"
                                    autoComplete="new-password"
                                    isFocused={true}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                />

                                <InputError message={errors.password} className="mt-2 ml-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password_confirmation" value="Confirm New Password" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1" />

                                <TextInput
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-black transition-all"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="••••••••"
                                />

                                <InputError message={errors.password_confirmation} className="mt-2 ml-1" />
                            </div>

                            <div className="pt-4">
                                <button 
                                    disabled={processing}
                                    className="w-full py-5 bg-black text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:translate-y-0"
                                >
                                    Reset Password
                                </button>
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

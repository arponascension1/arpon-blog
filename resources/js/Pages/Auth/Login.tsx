import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <PublicLayout>
            <Head title="Log in" />

            <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#fafafa]">
                <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                    <h2 className="text-5xl font-black text-gray-900 tracking-tighter mb-4 animate-slideUp">
                        Welcome Back
                    </h2>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-8 animate-fadeIn">
                        Enter your credentials to access your account
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl animate-slideUp delay-100">
                    <div className="bg-white py-12 px-8 shadow-2xl shadow-gray-200/50 sm:rounded-[3rem] border border-gray-100/50 sm:px-16">
                        {status && (
                            <div className="mb-6 p-4 bg-green-50 rounded-2xl text-sm font-bold text-green-600 border border-green-100">
                                {status}
                            </div>
                        )}

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
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="your@email.com"
                                />

                                <InputError message={errors.email} className="mt-2 ml-1" />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-3 ml-1">
                                    <InputLabel htmlFor="password" value="Password" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400" />
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-black transition-colors"
                                        >
                                            Forgot?
                                        </Link>
                                    )}
                                </div>

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-black transition-all"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                />

                                <InputError message={errors.password} className="mt-2 ml-1" />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center cursor-pointer group">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                'remember',
                                                (e.target.checked || false) as false,
                                            )
                                        }
                                        className="rounded-lg border-gray-200 text-black focus:ring-black h-5 w-5 transition-all"
                                    />
                                    <span className="ms-3 text-xs font-bold text-gray-500 group-hover:text-black transition-colors">
                                        Keep me logged in
                                    </span>
                                </label>
                            </div>

                            <div>
                                <button 
                                    disabled={processing}
                                    className="w-full py-5 bg-black text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:translate-y-0"
                                >
                                    Log In
                                </button>
                            </div>
                        </form>

                        <div className="mt-12 pt-8 border-t border-gray-50 text-center">
                            <p className="text-sm font-bold text-gray-400">
                                Don't have an account?{' '}
                                <Link
                                    href={route('register')}
                                    className="text-blue-600 hover:text-black transition-colors"
                                >
                                    Sign up for free
                                </Link>
                            </p>
                        </div>
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

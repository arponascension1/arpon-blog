import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage().props.auth.user;
    const fileInput = useRef<HTMLInputElement>(null);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            avatar: null as File | null,
            _method: 'PATCH', // Use post with _method: 'PATCH' for file uploads in Inertia
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                if (fileInput.current) {
                    fileInput.current.value = '';
                }
            }
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-500 font-medium">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-10 space-y-8">
                {/* Custom Avatar Upload */}
                <div>
                    <InputLabel htmlFor="avatar" value="Profile Picture" className="mb-4" />
                    <div className="flex items-center space-x-6">
                        <div className="shrink-0">
                            {user.avatar ? (
                                <img className="h-20 w-20 object-cover rounded-[1.5rem] shadow-lg border-2 border-white ring-1 ring-gray-100" src={user.avatar} alt={user.name} />
                            ) : (
                                <div className="h-20 w-20 rounded-[1.5rem] bg-black flex items-center justify-center text-2xl font-black text-white shadow-lg">
                                    {user.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        <label className="block">
                            <span className="sr-only">Choose profile photo</span>
                            <input 
                                type="file" 
                                ref={fileInput}
                                onChange={(e) => setData('avatar', e.target.files ? e.target.files[0] : null)}
                                className="block w-full text-xs text-gray-500
                                    file:mr-4 file:py-2.5 file:px-6
                                    file:rounded-xl file:border-0
                                    file:text-[10px] file:font-black file:uppercase file:tracking-widest
                                    file:bg-black file:text-white
                                    hover:file:bg-gray-800 transition-all cursor-pointer
                                "
                            />
                        </label>
                    </div>
                    <InputError className="mt-2" message={errors.avatar} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            className="mt-2 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoComplete="name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email Address" />

                        <TextInput
                            id="email"
                            type="email"
                            className="mt-2 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                        <p className="text-sm text-orange-800 font-medium">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 rounded-md text-sm text-orange-600 font-bold underline hover:text-orange-900 focus:outline-none"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-bold text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-10 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-800 transition-all shadow-xl disabled:opacity-50"
                    >
                        Save Changes
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 font-bold">
                            Profile updated successfully.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

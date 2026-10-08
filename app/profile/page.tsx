'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import Link from 'next/link';

import { User, Mail, ShieldCheck, Fingerprint, Calendar, LogOut, ArrowLeft } from 'lucide-react';

import Logo from '@/components/Logo';

interface UserInfo {
    id: string;
    email: string;
    isActive: boolean;
    createdAt: string;
}

export default function Profile() {
    const [user, setUser] = useState<UserInfo | null>({
        id: 'hisham-ali',
        email: 'hishamali@gmail.com',
        isActive: true,
        createdAt: 'October 1, 2026'
    })

    const router = useRouter();

    const handleSignOut = () => {
        // Sign Out logic here
        router.push('/login');
    };

    if (!user) {
        return (
            <div className='min-h-screen bg-white flex items-center justify-center text-sm text-zinc-500'>
                Loading profile...
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-white text-zinc-900 py-12 px-4 sm:px-6'>
            <div className='max-w-2xl mx-auto'>
                {/* Top Bar: Back Link & Logo */}
                <div className='flex items-center justify-between mb-8 pb-4 border-b border-zinc-100'>
                    <Link
                        href='/login'
                        className='inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors'
                    >
                        <ArrowLeft size={14} /> Back to Sign In
                    </Link>

                    <Logo size='sm' />
                </div>

                {/* Page Title */}
                <div className='mb-8'>
                    <h1 className='text-2xl font-bold tracking-tight text-zinc-950'>
                        Account Profile
                    </h1>

                    <p className='text-sm text-zinc-500 mt-1'>
                        Manage your credentials and view security workspace details.
                    </p>
                </div>

                {/* Profile Card */}
                <div className='border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-sm'>
                    {/* User Header */}
                    <div className='p-6 bg-zinc-50 border-b border-zinc-200 flex items-center gap-4'>
                        <div className='w-14 h-14 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center font-bold text-lg'>
                            <User size={24} />
                        </div>

                        <div>
                            <h2 className='text-base font-bold text-zinc-950'>{user.email}</h2>

                            <div className='flex items-center gap-2 mt-1'>
                                <span className='w-2 h-2 rounded-full bg-emerald-500' />

                                <span className='text-xs font-medium text-emerald-700'>
                                    {user.isActive ? 'Active Account' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Details List */}
                    <div className='divide-y divide-zinc-100 p-2 text-sm'>
                        {/* Email */}
                        <div className='p-4 flex items-center justify-between'>
                            <div className='flex items-center gap-3 text-zinc-600'>
                                <Mail size={16} className='text-zinc-400' />

                                <span className='font-medium text-xs'>Email Address</span>
                            </div>

                            <span className='font-semibold text-zinc-900 text-xs'>{user.email}</span>
                        </div>

                        {/* User ID */}
                        <div className='p-4 flex items-center justify-between'>
                            <div className='flex items-center gap-3 text-zinc-600'>
                                <Fingerprint size={16} className='text-zinc-400' />

                                <span className='font-medium text-xs'>User ID</span>
                            </div>

                            <span className='font-mono text-xs text-zinc-500'>{user.id}</span>
                        </div>

                        {/* Created At */}
                        <div className='p-4 flex items-center justify-between'>
                            <div className='flex items-center gap-3 text-zinc-600'>
                                <Calendar size={16} className='text-zinc-400' />

                                <span className='font-medium text-xs'>Member Since</span>
                            </div>

                            <span className='text-zinc-700 text-xs'>{user.createdAt}</span>
                        </div>

                        {/* Security Status */}
                        <div className='p-4 flex items-center justify-between'>
                            <div className='flex items-center gap-3 text-zinc-600'>
                                <ShieldCheck size={16} className='text-zinc-400' />

                                <span className='font-medium text-xs'>Security Role</span>
                            </div>

                            <span className='text-xs font-semibold px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-800'>
                                Workspace Administrator
                            </span>
                        </div>
                    </div>

                    {/* Sign Out Action */}
                    <div className='p-4 bg-zinc-50 border-t border-zinc-200 flex justify-end'>
                        <button
                            onClick={handleSignOut}
                            className='inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer'
                        >
                            <LogOut size={14} /> Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

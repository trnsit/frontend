'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Eye, EyeOff, Loader2 } from 'lucide-react';

import Logo from '@/components/Logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className='min-h-screen bg-white text-zinc-900 flex flex-col items-center justify-center px-4 py-12'>
      <div className='w-full max-w-sm'>

        {/* THE LOGO*/}
        <div className='mb-8'>
          <Logo size='md' />
        </div>

        {/* HEADING */}
        <h1 className='text-2xl font-bold tracking-tight text-zinc-950'>
          Sign In
        </h1>
        <p className='text-sm text-zinc-500 mt-1 mb-8'>
          Enter your details to access your account.
        </p>

        {/* THE FORM */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* EMAIL */}
          <div>
            <label className='block text-xs font-semibold text-zinc-600 mb-1.5'>
              Email
            </label>

            <input
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='name@example.com'
              className='w-full h-11 px-3.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 focus:bg-white transition-all'
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className='block text-xs font-semibold text-zinc-600 mb-1.5'>
              Password
            </label>

            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='••••••••••••'
                className='w-full h-11 pl-3.5 pr-10 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 focus:bg-white transition-all'
              />

              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors'
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* THE SUBMIT BUTTON */}
          <button
            type='submit'
            disabled={isLoading}
            className='w-full h-11 mt-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer'
          >
            {isLoading ? <Loader2 size={16} className='animate-spin' /> : 'Sign In'}
          </button>

        </form>

        {/* 4. THE LINK TO THE REGISTER PAGE */}
        <p className='text-center text-xs text-zinc-500 mt-6'>
          Don&apos;t have an account?{' '}
          <Link href='/signup' className='font-semibold text-zinc-950 hover:underline'>
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

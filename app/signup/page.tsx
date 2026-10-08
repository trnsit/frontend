'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Eye, EyeOff, Loader2 } from 'lucide-react';

import Logo from '@/components/Logo';

import apiRequest, { saveAccessToken } from '@/lib/api';

interface TokenResponse {
  access_token: string;
  token_type: string;
}

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');

      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');

      return;
    }

    setIsLoading(true);

    try{
      const response = await apiRequest<TokenResponse>('/register', {
        method: 'POST',
        body: JSON.stringify({
          email: email.trim(),
          password: password
        })
      });

      saveAccessToken(response.access_token);

      router.push('/profile');
    }

    catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    }

    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-white text-zinc-900 flex flex-col items-center justify-center px-4 py-12'>
      <div className='w-full max-w-sm'>
        {/* LOGO */}
        <div className='mb-8'>
          <Logo size='md' />
        </div>

        {/* HEADING */}
        <h1 className='text-2xl font-bold tracking-tight text-zinc-950'>
          Create an Account
        </h1>

        <p className='text-sm text-zinc-500 mt-1 mb-8'>
          Enter your details to get started with Transit.
        </p>

        {/* ERROR BANNER */}
        {error && (
          <div className='mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-medium'>
            {error}
          </div>
        )}

        {/* FORM */}
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

          {/* CONFIRM PASSWORD */}
          <div>
            <label className='block text-xs font-semibold text-zinc-600 mb-1.5'>
              Confirm Password
            </label>

            <input
              type='password'
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='••••••••••••'
              className='w-full h-11 px-3.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 focus:bg-white transition-all'
            />
          </div>

          {/* THE SUBMIT BUTTON */}
          <button
            type='submit'
            disabled={isLoading}
            className='w-full h-11 mt-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer'
          >
            {isLoading ? <Loader2 size={16} className='animate-spin' /> : 'Create Account'}
          </button>

        </form>

        {/* THE LINK TO THE LOGIN PAGE  */}
        <p className='text-center text-xs text-zinc-500 mt-6'>
          Already have an account?{' '}
          <Link href='/login' className='font-semibold text-zinc-950 hover:underline'>
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
}

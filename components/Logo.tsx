import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  }[size];

  return (
    <div className={`inline-block select-none font-bold tracking-tight text-zinc-950 ${spaceGrotesk.className} ${sizeClasses} ${className}`}>
      TRANSIT
    </div>
  );
}

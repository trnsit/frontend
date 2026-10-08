import type { Metadata } from 'next';

// 'type' is a TS concept. It provides the blueprint of the data. It simply defines what kind of data is allowed.

// 'Metadata' is a Next.js concept. It provides the checklist of valid page header properties, such as title, description, icons, and keywords.

import { Inter } from 'next/font/google';

import './globals.css';

export const metadata: Metadata = {
  title: 'Transit',
  description: 'Automated cryptographic vulnerability scanner and PQC migration engine'
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: LayoutProps<'/'>) {
  /* 'LayoutProps' is a Next.js concept.
  It defines the allowed inputs (props) for a layout component—primarily the page content ({ children }) and any URL route parameters. */

  // The '<'/'>' specifies the route path so TypeScript knows which URL parameters apply to this specific layout.

  return (
    <html lang='en' className={`h-full antialiased`}>
      <body className={`min-h-full bg-white text-zinc-950 flex flex-col ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}

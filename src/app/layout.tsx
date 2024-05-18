'use client'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '../context/authProvider';
import { Toaster } from '@/components/ui/toaster';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

const metadata: Metadata = {
  title: 'IncogNote',
  description: 'Real feedback from real people.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // Fix hydration issues by ensuring dynamic content is loaded only on the client
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          {isClient && <Toaster />}
        </AuthProvider>
      </body>
    </html>
  );
}

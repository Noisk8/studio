
'use client'; // Required for the hook and useEffect

import type { Metadata } from 'next'; // Keep for static metadata if needed
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import SiteHeader from '@/components/SiteHeader';
import { useTheme } from '@/hooks/use-theme'; // Import the hook
import { useEffect } from 'react';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Static metadata can still be defined here
// export const metadata: Metadata = {
// title: 'VinylVision',
// description: 'Explore and manage your LP collection with BPM insights.',
// };
// However, for dynamic titles based on theme or other client-side state,
// you'd manage it differently (e.g. in page components or via Head component)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme(); // Initialize theme hook

  // Set document title dynamically if needed, or keep static metadata
  useEffect(() => {
    document.title = 'VinylVision - Explore Your LPs';
  }, []);


  return (
    // The class 'dark' will be managed by the useTheme hook on the <html> element directly.
    // So we don't need to add it here.
    <html lang="en" className={theme === 'dark' ? 'dark' : ''} suppressHydrationWarning>
      <body className={`${inter.variable} ${robotoMono.variable} antialiased flex flex-col min-h-screen`}>
        <SiteHeader />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Toaster />
        <footer className="bg-card text-center p-4 text-sm text-muted-foreground border-t">
          © {new Date().getFullYear()} VinylVision. All rights reserved.
        </footer>
      </body>
    </html>
  );
}

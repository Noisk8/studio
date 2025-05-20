import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google'; // Changed from Geist_Sans, Geist_Mono
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import SiteHeader from '@/components/SiteHeader';

const inter = Inter({ // Changed from geistSans = Geist_Sans
  variable: '--font-geist-sans', // CSS variable name remains the same
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({ // Changed from geistMono = Geist_Mono
  variable: '--font-geist-mono', // CSS variable name remains the same
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'VinylVision',
  description: 'Explore and manage your LP collection with BPM insights.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased flex flex-col min-h-screen`}> {/* Updated to use new font variables */}
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

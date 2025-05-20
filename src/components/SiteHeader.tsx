
'use client';

import Link from 'next/link';
import { Disc3, LogIn, LogOut, LayoutDashboard } from 'lucide-react'; // Using Disc3 as a vinyl-like icon
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SiteHeader() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const loggedIn = localStorage.getItem('vinylAdminLoggedIn') === 'true';
    setIsAdminLoggedIn(loggedIn);
  }, []);
  
  // Effect to update login state if localStorage changes (e.g. logout from admin page)
  useEffect(() => {
    const handleStorageChange = () => {
      const loggedIn = localStorage.getItem('vinylAdminLoggedIn') === 'true';
      setIsAdminLoggedIn(loggedIn);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('vinylAdminLoggedIn');
    setIsAdminLoggedIn(false);
    router.push('/'); // Or /login
  };

  if (!isMounted) {
    return (
      <header className="bg-card shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
            <Disc3 className="w-8 h-8" />
            <span>VinylVision</span>
          </Link>
          <div className="h-10 w-24 bg-muted animate-pulse rounded-md"></div> {/* Placeholder for button */}
        </div>
      </header>
    );
  }

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
          <Disc3 className="w-8 h-8" />
          <span>VinylVision</span>
        </Link>
        
        <div className="flex items-center gap-2">
          {isAdminLoggedIn ? (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Admin
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Salir
              </Button>
            </>
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Admin Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

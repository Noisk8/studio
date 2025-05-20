
'use client';

import Link from 'next/link';
import { Disc3, LogIn, LogOut, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/use-theme';

export default function SiteHeader() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
    const loggedIn = localStorage.getItem('vinylAdminLoggedIn') === 'true';
    setIsAdminLoggedIn(loggedIn);
  }, []);
  
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'vinylAdminLoggedIn') {
        const loggedIn = localStorage.getItem('vinylAdminLoggedIn') === 'true';
        setIsAdminLoggedIn(loggedIn);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('vinylAdminLoggedIn');
    setIsAdminLoggedIn(false);
    // Dispatch a storage event so other tabs/components can react if needed
    window.dispatchEvent(new StorageEvent('storage', { key: 'vinylAdminLoggedIn' }));
    router.push('/'); 
  };

  if (!isMounted) {
    return (
      <header className="bg-card shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
            <Disc3 className="w-8 h-8" />
            <span>VinylVision</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-muted animate-pulse rounded-md"></div> {/* Placeholder for theme toggle */}
            <div className="h-10 w-24 bg-muted animate-pulse rounded-md"></div> {/* Placeholder for login button */}
          </div>
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
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
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


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, ListMusic, LogOut, Menu, PlusCircle, Settings } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);
    const isAdminLoggedIn = localStorage.getItem('vinylAdminLoggedIn');
    if (!isAdminLoggedIn) {
      router.replace('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('vinylAdminLoggedIn');
    router.push('/login');
  };

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  const isAdminLoggedIn = typeof window !== 'undefined' && localStorage.getItem('vinylAdminLoggedIn');
  if (!isAdminLoggedIn) {
     // This will be handled by the effect, but as a fallback
    return null;
  }

  const navItems = (
    <>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/admin/dashboard">
          <ListMusic className="mr-2 h-4 w-4" /> Dashboard
        </Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/admin/add-lp">
          <PlusCircle className="mr-2 h-4 w-4" /> Agregar LP
        </Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/">
          <Home className="mr-2 h-4 w-4" /> Ver Sitio Público
        </Link>
      </Button>
      <Button variant="ghost" onClick={handleLogout} className="w-full justify-start mt-auto">
        <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
      </Button>
    </>
  );

  return (
    <div className="flex min-h-screen bg-muted/40">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-4 w-[280px]">
             <h2 className="text-lg font-semibold text-primary mb-4 pl-2">Admin Panel</h2>
            <nav className="flex flex-col space-y-2 flex-grow">
              {navItems}
            </nav>
          </SheetContent>
        </Sheet>
      ) : (
        <aside className="hidden lg:flex flex-col w-64 border-r bg-card p-4 space-y-2">
          <h2 className="text-xl font-semibold text-primary mb-4">Admin Panel</h2>
          {navItems}
        </aside>
      )}
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        {children}
      </main>
    </div>
  );
}

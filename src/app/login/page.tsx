
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Disc3, LogIn } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock authentication
    if (email === 'admin@example.com' && password === 'password') {
      localStorage.setItem('vinylAdminLoggedIn', 'true');
      toast({
        title: 'Inicio de Sesión Exitoso',
        description: 'Redirigiendo al panel de administración...',
      });
      router.push('/admin/dashboard');
    } else {
      setError('Credenciales inválidas. Inténtalo de nuevo.');
      toast({
        title: 'Error de Inicio de Sesión',
        description: 'Credenciales inválidas.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Disc3 className="w-16 h-16 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Acceso Administrador</CardTitle>
          <CardDescription>Ingresa tus credenciales para acceder al panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-base"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full text-lg py-3">
              <LogIn className="mr-2 h-5 w-5" />
              Ingresar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

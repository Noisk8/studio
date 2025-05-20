
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { ArrowLeft, PlusCircle } from 'lucide-react';
// For a real form, you'd use react-hook-form and Zod as per project setup.
// This is a simplified placeholder.

export default function AddLpPage() {
  // Placeholder for form state and logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Funcionalidad de Agregar LP aún no implementada.');
    // Add logic to handle form submission
  };

  return (
    <div className="space-y-6">
       <Button variant="outline" asChild className="mb-4">
        <Link href="/admin/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Dashboard
        </Link>
      </Button>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary flex items-center">
            <PlusCircle className="mr-3 h-7 w-7" />
            Agregar Nuevo LP
          </CardTitle>
          <CardDescription>
            Completa los detalles del nuevo álbum para agregarlo a la colección.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Título del Álbum</Label>
              <Input id="title" placeholder="Ej: Sgt. Pepper's Lonely Hearts Club Band" />
            </div>
            <div>
              <Label htmlFor="artist">Artista(s)</Label>
              <Input id="artist" placeholder="Ej: The Beatles" />
            </div>
             <div>
              <Label htmlFor="year">Año de Lanzamiento</Label>
              <Input id="year" type="number" placeholder="Ej: 1967" />
            </div>
            <div>
              <Label htmlFor="genre">Género</Label>
               <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rock">Rock</SelectItem>
                  <SelectItem value="electronic">Electronic</SelectItem>
                  <SelectItem value="jazz">Jazz</SelectItem>
                  <SelectItem value="pop">Pop</SelectItem>
                  {/* Add more genres from mockGeneros or a dynamic list */}
                </SelectContent>
              </Select>
            </div>
             <div>
              <Label htmlFor="coverUrl">URL de la Carátula</Label>
              <Input id="coverUrl" type="url" placeholder="https://placehold.co/300x300.png" />
            </div>
            <div>
              <Label htmlFor="description">Descripción (Opcional)</Label>
              <Textarea id="description" placeholder="Notas adicionales sobre el álbum..." />
            </div>
            {/* More fields can be added here: Sello, Formato, Tracks, etc. */}
            <div className="flex justify-end pt-4">
              <Button type="submit">
                <PlusCircle className="mr-2 h-4 w-4" /> Agregar Álbum
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

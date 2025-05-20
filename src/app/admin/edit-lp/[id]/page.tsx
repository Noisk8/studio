
'use client';

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
// For a real form, you'd use react-hook-form and Zod.
// This is a simplified placeholder.
// You would also fetch the specific album data based on the ID.

export default function EditLpPage() {
  const params = useParams();
  const albumId = params.id;

  // Placeholder for form state and logic
  // In a real app, fetch album data using albumId here
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Funcionalidad de Editar LP (ID: ${albumId}) aún no implementada.`);
    // Add logic to handle form submission
  };
  
  // Dummy data for now
  const albumData = {
    title: `Álbum Ejemplo (ID: ${albumId})`,
    artist: "Artista Ejemplo",
    year: 2000,
    genre: "rock",
    coverUrl: "https://placehold.co/300x300.png",
    description: "Descripción de ejemplo para el álbum a editar."
  }

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
            <Save className="mr-3 h-7 w-7" />
            Editar LP: {albumData.title}
          </CardTitle>
          <CardDescription>
            Modifica los detalles del álbum.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Título del Álbum</Label>
              <Input id="title" defaultValue={albumData.title} />
            </div>
            <div>
              <Label htmlFor="artist">Artista(s)</Label>
              <Input id="artist" defaultValue={albumData.artist} />
            </div>
             <div>
              <Label htmlFor="year">Año de Lanzamiento</Label>
              <Input id="year" type="number" defaultValue={albumData.year} />
            </div>
            <div>
              <Label htmlFor="genre">Género</Label>
               <Select defaultValue={albumData.genre}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rock">Rock</SelectItem>
                  <SelectItem value="electronic">Electronic</SelectItem>
                  <SelectItem value="jazz">Jazz</SelectItem>
                  <SelectItem value="pop">Pop</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div>
              <Label htmlFor="coverUrl">URL de la Carátula</Label>
              <Input id="coverUrl" type="url" defaultValue={albumData.coverUrl} />
            </div>
            <div>
              <Label htmlFor="description">Descripción (Opcional)</Label>
              <Textarea id="description" defaultValue={albumData.description} />
            </div>
            <div className="flex justify-end pt-4">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Guardar Cambios
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

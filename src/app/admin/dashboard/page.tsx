
'use client';

import { useState, useEffect } from 'react'; // Added useState, useEffect
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAlbums } from '@/lib/mock-data'; // Using getAlbums for persisted data
import type { Album } from '@/lib/types';
import { PlusCircle, Edit, ListMusic, RefreshCw } from 'lucide-react';

export default function AdminDashboardPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      setAlbums(getAlbums());
      setIsLoading(false);
    };
    loadData();

    const handleAlbumsUpdate = () => {
      loadData();
    };
    window.addEventListener('albumsUpdated', handleAlbumsUpdate);
    return () => {
      window.removeEventListener('albumsUpdated', handleAlbumsUpdate);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RefreshCw className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary flex items-center">
            <ListMusic className="mr-3 h-8 w-8" />
            Panel de Administración de LPs
          </h1>
          <p className="text-muted-foreground">Gestiona tu colección de vinilos.</p>
        </div>
        <Button asChild>
          <Link href="/admin/add-lp">
            <PlusCircle className="mr-2 h-4 w-4" /> Agregar Nuevo LP
          </Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Listado de Álbumes</CardTitle>
          <CardDescription>
            Actualmente tienes {albums.length} álbumes en tu colección.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {albums.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Carátula</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Artista(s)</TableHead>
                    <TableHead>Año</TableHead>
                    <TableHead>Género</TableHead>
                    <TableHead className="text-right w-[150px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {albums.map((album) => (
                    <TableRow key={album.id_album}>
                      <TableCell>
                        <Image
                          src={album.url_caratula || 'https://placehold.co/50x50.png'}
                          alt={album.titulo}
                          width={50}
                          height={50}
                          className="rounded aspect-square object-cover"
                          data-ai-hint="album cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/50x50.png'; }}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{album.titulo}</TableCell>
                      <TableCell>
                        {album.es_compilacion
                          ? 'Varios Artistas'
                          : album.artistas.map((a) => a.nombre).join(', ')}
                      </TableCell>
                      <TableCell>{album.anio_lanzamiento || 'N/A'}</TableCell>
                      <TableCell>{album.genero_nombre || 'N/A'}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/edit-lp/${album.id_album}`}>
                            <Edit className="mr-1 h-3 w-3" /> Editar
                          </Link>
                        </Button>
                        {/* Delete button can be added later with confirmation */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No hay álbumes para mostrar. Comienza agregando uno.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

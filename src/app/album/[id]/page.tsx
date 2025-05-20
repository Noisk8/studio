
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { findAlbumById } from '@/lib/mock-data';
import type { Album } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BpmIndicator from '@/components/BpmIndicator';
import { ArrowLeft, Users, Tag, Disc, CalendarDays, ListMusic, Info, RefreshCw, UserSquare } from 'lucide-react';

export default function AlbumDetailPage() {
  const params = useParams();
  const router = useRouter();
  const albumId = params.id as string;

  const [album, setAlbum] = useState<Album | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (albumId) {
      const foundAlbum = findAlbumById(albumId);
      setAlbum(foundAlbum);
      setIsLoading(false);
    }
    const handleAlbumsUpdate = () => {
      if (albumId) {
        const updatedFoundAlbum = findAlbumById(albumId);
        setAlbum(updatedFoundAlbum);
      }
    };
    window.addEventListener('albumsUpdated', handleAlbumsUpdate);
    return () => {
      window.removeEventListener('albumsUpdated', handleAlbumsUpdate);
    };
  }, [albumId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <RefreshCw className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!album) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold mb-4">Álbum no encontrado</h1>
        <p className="text-muted-foreground mb-6">
          El álbum que buscas no existe o ha sido movido.
        </p>
        <Button onClick={() => router.push('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
        </Button>
      </div>
    );
  }

  const artistsDisplay = album.es_compilacion ? "Varios Artistas" : album.artistas.map(a => a.nombre).join(', ');

  return (
    <div className="space-y-8">
      <Button variant="outline" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Listado
        </Link>
      </Button>

      <Card className="overflow-hidden shadow-xl">
        <div className="md:flex">
          <div className="md:w-1/3 relative">
            <Image
              src={album.url_caratula || 'https://placehold.co/600x600.png'}
              alt={`Cover of ${album.titulo}`}
              width={600}
              height={600}
              className="object-cover w-full h-full aspect-square md:aspect-auto"
              data-ai-hint="album cover detail"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x600.png'; }}
            />
          </div>
          <div className="md:w-2/3">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl lg:text-4xl font-bold text-primary">{album.titulo}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground flex items-center pt-1">
                <Users className="w-5 h-5 mr-2 " /> {artistsDisplay}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {album.genero_nombre && (
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-2 text-primary" />
                    <strong>Género:</strong> <span className="ml-1">{album.genero_nombre}</span>
                  </div>
                )}
                {album.anio_lanzamiento && (
                  <div className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-2 text-primary" />
                    <strong>Año:</strong> <span className="ml-1">{album.anio_lanzamiento}</span>
                  </div>
                )}
                {album.sello_nombre && (
                  <div className="flex items-center">
                    <Disc className="w-4 h-4 mr-2 text-primary" />
                    <strong>Sello:</strong> <span className="ml-1">{album.sello_nombre}</span>
                  </div>
                )}
                {album.formato && (
                  <div className="flex items-center">
                    <Info className="w-4 h-4 mr-2 text-primary" />
                    <strong>Formato:</strong> <Badge variant="secondary" className="ml-1">{album.formato}</Badge>
                  </div>
                )}
              </div>
              
              {album.canciones && album.canciones.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-3 mt-4 flex items-center text-primary">
                    <ListMusic className="w-5 h-5 mr-2" /> Listado de Canciones
                  </h3>
                  <ul className="space-y-2 border rounded-md p-4 max-h-96 overflow-y-auto">
                    {album.canciones.map((cancion, index) => (
                      <li key={cancion.id_cancion || index} className="flex justify-between items-start p-2 rounded hover:bg-muted/50">
                        <div>
                          <span className="font-medium">
                            {cancion.numero_pista ? `${cancion.numero_pista}. ` : `${index + 1}. `}
                            {cancion.titulo}
                          </span>
                          {album.es_compilacion && cancion.artista_principal_nombre && (
                            <div className="text-xs text-muted-foreground ml-5 flex items-center">
                               <UserSquare className="w-3 h-3 mr-1"/> {cancion.artista_principal_nombre}
                            </div>
                          )}
                        </div>
                        <BpmIndicator bpm={cancion.bpm} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}

    
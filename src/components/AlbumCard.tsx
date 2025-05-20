
import Image from 'next/image';
import Link from 'next/link';
import type { Album } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import BpmIndicator from './BpmIndicator';
import { Badge } from '@/components/ui/badge';
import { ListMusic, Users, Tag, Disc, UserSquare } from 'lucide-react';

interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  const artistsDisplay = album.es_compilacion ? "Varios Artistas" : album.artistas.map(a => a.nombre).join(', ');

  return (
    <Link href={`/album/${album.id_album}`} className="flex">
      <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
        <CardHeader className="p-0 relative">
          <Image
            src={album.url_caratula || 'https://placehold.co/400x400.png'}
            alt={`Cover of ${album.titulo}`}
            width={400}
            height={400}
            className="object-cover w-full aspect-square"
            data-ai-hint="album cover"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400.png'; }}
          />
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-xl mb-1 truncate" title={album.titulo}>{album.titulo}</CardTitle>
          <CardDescription className="mb-2 text-sm flex items-center">
            <Users className="w-4 h-4 mr-2 text-muted-foreground" />
            <span className="truncate" title={artistsDisplay}>{artistsDisplay}</span>
          </CardDescription>
          <div className="flex flex-wrap gap-2 mb-3">
            {album.genero_nombre && (
              <Badge variant="secondary" className="flex items-center">
                <Tag className="w-3 h-3 mr-1" /> {album.genero_nombre}
              </Badge>
            )}
            {album.sello_nombre && (
               <Badge variant="outline" className="flex items-center text-xs">
                <Disc className="w-3 h-3 mr-1" /> {album.sello_nombre}
              </Badge>
            )}
            {album.anio_lanzamiento && (
              <Badge variant="outline">{album.anio_lanzamiento}</Badge>
            )}
          </div>

          {album.canciones && album.canciones.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-1 mt-3 flex items-center">
                <ListMusic className="w-4 h-4 mr-2 text-primary" /> Tracks
              </h4>
              <ul className="space-y-1 text-xs max-h-32 overflow-y-auto pr-2">
                {album.canciones.slice(0, 5).map((cancion) => ( 
                  <li key={cancion.id_cancion} className="flex justify-between items-start">
                    <div className="flex-1 truncate pr-2">
                      <span title={cancion.titulo}>
                        {cancion.numero_pista ? `${cancion.numero_pista}. ` : ''}
                        {cancion.titulo}
                      </span>
                      {album.es_compilacion && cancion.artista_principal_nombre && (
                        <div className="text-muted-foreground ml-2 flex items-center text-[0.7rem]">
                           <UserSquare className="w-2.5 h-2.5 mr-1"/> {cancion.artista_principal_nombre}
                        </div>
                      )}
                    </div>
                    <BpmIndicator bpm={cancion.bpm} />
                  </li>
                ))}
                 {album.canciones.length > 5 && (
                  <li className="text-center text-muted-foreground text-xs pt-1">...y {album.canciones.length - 5} más canciones</li>
                )}
              </ul>
            </div>
          )}
        </CardContent>
        {album.formato && (
          <CardFooter className="p-4 pt-0">
             <Badge variant="default" className="text-xs">{album.formato}</Badge>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}

    
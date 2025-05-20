
'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea'; // Eliminado
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Save, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockAlbums, mockGeneros, mockArtistas } from '@/lib/mock-data';
import type { Album, Artista, Cancion } from '@/lib/types';

const songSchema = z.object({
  titulo: z.string().min(1, "El título de la canción es requerido."),
  bpm: z.coerce.number().positive("BPM debe ser un número positivo.").optional().or(z.literal('')),
});

const albumFormSchema = z.object({
  titulo: z.string().min(1, "El título del álbum es requerido."),
  artista: z.string().min(1, "El artista es requerido."),
  anio_lanzamiento: z.coerce
    .number({ invalid_type_error: "El año debe ser un número.", required_error: "El año de lanzamiento es requerido." })
    .min(1900, "Año de lanzamiento inválido.")
    .max(new Date().getFullYear() + 5, "Año de lanzamiento inválido."),
  genero_nombre: z.string().min(1, "El género es requerido."),
  url_caratula: z.string().url("URL de carátula inválida o vacía. Usar https://placehold.co/300x300.png si no hay URL.").or(z.literal('')).optional(),
  // descripcion: z.string().optional(), // Eliminado
  canciones: z.array(songSchema).optional(),
});

type AlbumFormValues = z.infer<typeof albumFormSchema>;

export default function EditLpPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const albumId = params.id as string;

  // Find mutable album from mockAlbums for live update effect
  const albumToEditIndex = mockAlbums.findIndex(album => album.id_album.toString() === albumId);
  const albumToEdit = albumToEditIndex !== -1 ? mockAlbums[albumToEditIndex] : undefined;

  const form = useForm<AlbumFormValues>({
    resolver: zodResolver(albumFormSchema),
    defaultValues: {
      titulo: '',
      artista: '',
      anio_lanzamiento: '' as unknown as number,
      genero_nombre: '',
      url_caratula: '',
      // descripcion: '', // Eliminado
      canciones: [],
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'canciones',
  });

  const watchedCaratula = form.watch('url_caratula');

  useEffect(() => {
    if (albumToEdit) {
      form.reset({
        titulo: albumToEdit.titulo,
        artista: albumToEdit.es_compilacion ? "Various Artists" : albumToEdit.artistas.map(a => a.nombre).join(', '),
        anio_lanzamiento: albumToEdit.anio_lanzamiento ?? ('' as unknown as number),
        genero_nombre: albumToEdit.genero_nombre,
        url_caratula: albumToEdit.url_caratula || '', // ensure empty string if null/undefined
        // descripcion: albumToEdit.descripcion || '', // Eliminado
        canciones: albumToEdit.canciones.map(c => ({ 
          titulo: c.titulo, 
          bpm: c.bpm ?? ''
        })) || [],
      });
    } else if (!form.formState.isLoading) { // Prevent redirection if still loading
      toast({ title: 'Error', description: 'Álbum no encontrado.', variant: 'destructive' });
      router.push('/admin/dashboard');
    }
  }, [albumToEdit, form, router, toast]);

  const onSubmit = (data: AlbumFormValues) => {
    if (albumToEditIndex === -1) {
      toast({ title: 'Error', description: 'No se pudo actualizar el álbum.', variant: 'destructive' });
      return;
    }

    const isCompilation = data.artista.toLowerCase().includes('various');
    let artistsArray: Artista[];
     if (isCompilation) {
        const va = mockArtistas.find(a => a.nombre.toLowerCase() === 'various artists');
        artistsArray = va ? [va] : [{id_artista: Date.now() + Math.random(), nombre: 'Various Artists'}]
    } else {
        // Try to preserve original artist ID if single artist and name matches, otherwise new ID.
        const existingArtist = albumToEdit?.artistas[0];
        artistsArray = (existingArtist && existingArtist.nombre === data.artista && !albumToEdit?.es_compilacion) 
                         ? [existingArtist] 
                         : [{ id_artista: Date.now() + Math.random(), nombre: data.artista }];
    }

    const updatedAlbum: Album = {
      ...mockAlbums[albumToEditIndex], // Spread existing album data first
      titulo: data.titulo,
      artistas: artistsArray,
      anio_lanzamiento: Number(data.anio_lanzamiento),
      genero_nombre: data.genero_nombre,
      genero_id: mockGeneros.find(g => g.nombre === data.genero_nombre)?.id_genero || mockAlbums[albumToEditIndex].genero_id,
      url_caratula: data.url_caratula || 'https://placehold.co/300x300.png',
      // descripcion: data.descripcion, // Eliminado
      es_compilacion: isCompilation,
      canciones: data.canciones ? data.canciones.map((c, idx) => {
        const existingSong = albumToEdit?.canciones.find(ec => ec.titulo === c.titulo);
        return {
          id_cancion: existingSong?.id_cancion || Date.now() + idx + Math.random(),
          titulo: c.titulo,
          bpm: c.bpm ? Number(c.bpm) : undefined,
          artistas: artistsArray // Assign main album artists to songs for simplicity in mock
        };
      }) : [],
    };

    mockAlbums[albumToEditIndex] = updatedAlbum;
    
    toast({
      title: 'Álbum Actualizado',
      description: `El álbum "${data.titulo}" ha sido actualizado exitosamente (simulación).`,
    });
    router.push('/admin/dashboard');
  };
  
  if (!albumToEdit && !form.formState.isLoading) {
    // This case should be handled by useEffect redirecting, but as a fallback.
    return <div className="flex items-center justify-center h-screen">Álbum no encontrado. Redirigiendo...</div>;
  }
  
  if (form.formState.isLoading && !albumToEdit) { // Initial load before useEffect kicks in
    return <div className="flex items-center justify-center h-screen">Cargando datos del álbum...</div>;
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
            Editar LP: {form.watch('titulo') || 'Cargando...'}
          </CardTitle>
          <CardDescription>
            Modifica los detalles del álbum.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título del Álbum</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="artista"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artista(s)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ej: The Beatles o Various Artists"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="anio_lanzamiento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año de Lanzamiento</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genero_nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Género</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un género" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockGeneros.map(g => (
                          <SelectItem key={g.id_genero} value={g.nombre}>{g.nombre}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="url_caratula"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de la Carátula</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://placehold.co/300x300.png" {...field} />
                    </FormControl>
                    {watchedCaratula && (
                      <div className="mt-2">
                        <Image
                          src={watchedCaratula || 'https://placehold.co/100x100.png'} // Fallback if watchedCaratula is empty string
                          alt="Vista previa de carátula"
                          width={100}
                          height={100}
                          className="rounded object-cover aspect-square"
                          data-ai-hint="album cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100x100.png'; }} // Fallback for broken links
                        />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*
              <FormField
                control={form.control}
                name="descripcion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              */}

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Canciones</Label>
                {fields.map((item, index) => (
                  <Card key={item.id} className="p-4 space-y-3">
                    <FormField
                      control={form.control}
                      name={`canciones.${index}.titulo`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título Canción {index + 1}</FormLabel>
                          <FormControl>
                            <Input placeholder="Título de la canción" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`canciones.${index}.bpm`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>BPM Canción {index + 1} (Opcional)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Ej: 120" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                      <Trash2 className="mr-2 h-4 w-4" /> Eliminar Canción
                    </Button>
                  </Card>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ titulo: '', bpm: '' })}
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Agregar Otra Canción
                </Button>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  <Save className="mr-2 h-4 w-4" /> 
                  {form.formState.isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

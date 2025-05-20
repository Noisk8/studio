
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Save, PlusCircle, Trash2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { findAlbumById, updateAlbum, getArtistas, mockGeneros, mockSellos, addOrGetArtista } from '@/lib/mock-data';
import type { Album, Artista } from '@/lib/types';

const songSchema = z.object({
  id_cancion: z.number().optional(),
  titulo: z.string().min(1, "El título de la canción es requerido."),
  bpm: z.coerce.number().positive("BPM debe ser un número positivo.").optional().or(z.literal('')),
  artista_principal_nombre: z.string().optional(), 
});

const albumFormSchema = z.object({
  titulo: z.string().min(1, "El título del álbum es requerido."),
  artista: z.string().min(1, "El artista es requerido. Ingresa 'Various Artists' para compilaciones."),
  anio_lanzamiento: z.coerce
    .number({ invalid_type_error: "El año debe ser un número.", required_error: "El año de lanzamiento es requerido." })
    .min(1900, "Año de lanzamiento inválido.")
    .max(new Date().getFullYear() + 15, "Año de lanzamiento inválido."),
  genero_nombre: z.string().min(1, "El género es requerido."),
  sello_nombre: z.string().min(1, "El sello discográfico es requerido."),
  url_caratula: z.string().url("URL de carátula inválida. Usar https://placehold.co/300x300.png si no hay URL.").or(z.literal('')).optional(),
  canciones: z.array(songSchema).optional(),
});

type AlbumFormValues = z.infer<typeof albumFormSchema>;

export default function EditLpPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const albumId = params.id as string;

  const [isLoadingAlbum, setIsLoadingAlbum] = useState(true);
  const [albumToEdit, setAlbumToEdit] = useState<Album | undefined>(undefined);
  const [availableArtistas, setAvailableArtistas] = useState<Artista[]>([]);


  useEffect(() => {
    setAvailableArtistas(getArtistas());
  }, []);

  const form = useForm<AlbumFormValues>({
    resolver: zodResolver(albumFormSchema),
    defaultValues: {
      titulo: '',
      artista: '',
      anio_lanzamiento: '' as unknown as number,
      genero_nombre: '',
      sello_nombre: '',
      url_caratula: '',
      canciones: [],
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'canciones',
  });

  const watchedCaratula = form.watch('url_caratula');
  const watchedArtista = form.watch('artista');
  const isAlbumCompilation = watchedArtista?.toLowerCase().includes('various');

  useEffect(() => {
    if (albumId) {
      const foundAlbum = findAlbumById(albumId);
      setAlbumToEdit(foundAlbum);
      if (foundAlbum) {
        form.reset({
          titulo: foundAlbum.titulo,
          artista: foundAlbum.es_compilacion ? "Various Artists" : foundAlbum.artistas.map(a => a.nombre).join(', '),
          anio_lanzamiento: foundAlbum.anio_lanzamiento ?? ('' as unknown as number),
          genero_nombre: foundAlbum.genero_nombre,
          sello_nombre: foundAlbum.sello_nombre || '',
          url_caratula: foundAlbum.url_caratula || '',
          canciones: foundAlbum.canciones.map(c => ({ 
            id_cancion: c.id_cancion,
            titulo: c.titulo, 
            bpm: c.bpm ?? '',
            artista_principal_nombre: c.artista_principal_nombre || ''
          })) || [],
        });
      } else {
        toast({ title: 'Error', description: 'Álbum no encontrado.', variant: 'destructive' });
        router.push('/admin/dashboard');
      }
      setIsLoadingAlbum(false);
    }
  }, [albumId, form, router, toast]);

  const onSubmit = (data: AlbumFormValues) => {
    if (!albumToEdit) {
      toast({ title: 'Error', description: 'No se pudo actualizar el álbum.', variant: 'destructive' });
      return;
    }

    const isCompilation = data.artista.toLowerCase().includes('various');
    let albumArtistas: Artista[];

    if (isCompilation) {
        albumArtistas = [addOrGetArtista('Various Artists')];
    } else {
        albumArtistas = [addOrGetArtista(data.artista)];
    }

    const selectedSello = mockSellos.find(s => s.nombre === data.sello_nombre);

    const updatedAlbumData: Album = {
      ...albumToEdit,
      titulo: data.titulo,
      artistas: albumArtistas,
      anio_lanzamiento: Number(data.anio_lanzamiento),
      genero_nombre: data.genero_nombre,
      genero_id: mockGeneros.find(g => g.nombre === data.genero_nombre)?.id_genero || albumToEdit.genero_id,
      sello_id: selectedSello?.id_sello || albumToEdit.sello_id || 0,
      sello_nombre: selectedSello?.nombre || data.sello_nombre,
      url_caratula: data.url_caratula || 'https://placehold.co/300x300.png',
      es_compilacion: isCompilation,
      canciones: data.canciones ? data.canciones.map((c, idx) => {
        let songArtistasArray: Artista[] = albumArtistas;
        if (isCompilation && c.artista_principal_nombre) {
            songArtistasArray = [addOrGetArtista(c.artista_principal_nombre)];
        }
        return {
          id_cancion: c.id_cancion || Date.now() + idx + Math.random(),
          titulo: c.titulo,
          bpm: c.bpm ? Number(c.bpm) : undefined,
          artista_principal_nombre: isCompilation ? c.artista_principal_nombre : undefined,
          artistas: songArtistasArray
        };
      }) : [],
    };

    updateAlbum(albumToEdit.id_album, updatedAlbumData);
    
    toast({
      title: 'Álbum Actualizado',
      description: `El álbum "${data.titulo}" ha sido actualizado exitosamente.`,
    });
    router.push('/admin/dashboard');
  };
  
  if (isLoadingAlbum) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RefreshCw className="w-12 h-12 animate-spin text-primary" />
        <span className="ml-4 text-lg">Cargando datos del álbum...</span>
      </div>
    );
  }
  
  if (!albumToEdit) {
    return <div className="flex items-center justify-center h-screen">Álbum no encontrado. Redirigiendo...</div>;
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
                    <FormLabel>Artista(s) del Álbum</FormLabel>
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
                name="sello_nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sello Discográfico</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un sello" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockSellos.map(s => (
                          <SelectItem key={s.id_sello} value={s.nombre}>{s.nombre}</SelectItem>
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
                          src={watchedCaratula || 'https://placehold.co/100x100.png'}
                          alt="Vista previa de carátula"
                          width={100}
                          height={100}
                          className="rounded object-cover aspect-square"
                          data-ai-hint="album cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100x100.png'; }}
                        />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    {isAlbumCompilation && (
                       <FormField
                        control={form.control}
                        name={`canciones.${index}.artista_principal_nombre`}
                        render={({ field: songField }) => (
                          <FormItem>
                            <FormLabel>Artista Canción {index + 1}</FormLabel>
                            <FormControl>
                              <Input placeholder="Artista específico de esta canción" {...songField} defaultValue={songField.value || ''} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                      <Trash2 className="mr-2 h-4 w-4" /> Eliminar Canción
                    </Button>
                  </Card>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ id_cancion: Date.now() + Math.random(), titulo: '', bpm: '', artista_principal_nombre: '' })}
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

    
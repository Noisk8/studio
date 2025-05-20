
'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import { ArrowLeft, Save, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockAlbums, mockGeneros } from '@/lib/mock-data'; // Using mock data for now
import type { Album } from '@/lib/types';

const songSchema = z.object({
  // id_cancion: z.number().optional(), // Keep for potential future use with DB
  titulo: z.string().min(1, "El título de la canción es requerido."),
  bpm: z.coerce.number().positive("BPM debe ser un número positivo.").optional().or(z.literal('')),
});

const albumFormSchema = z.object({
  titulo: z.string().min(1, "El título del álbum es requerido."),
  artista: z.string().min(1, "El artista es requerido."), // Simplified: mockAlbums have artistas array
  anio_lanzamiento: z.coerce
    .number({ invalid_type_error: "El año debe ser un número.", required_error: "El año de lanzamiento es requerido." })
    .min(1900, "Año de lanzamiento inválido.")
    .max(new Date().getFullYear() + 5, "Año de lanzamiento inválido."),
  genero_nombre: z.string().min(1, "El género es requerido."),
  url_caratula: z.string().url("URL de carátula inválida.").optional().or(z.literal('')),
  descripcion: z.string().optional(),
  canciones: z.array(songSchema).optional(),
});

type AlbumFormValues = z.infer<typeof albumFormSchema>;

export default function EditLpPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const albumId = params.id as string;

  const albumToEdit = mockAlbums.find(album => album.id_album.toString() === albumId);

  const form = useForm<AlbumFormValues>({
    resolver: zodResolver(albumFormSchema),
    defaultValues: {
      titulo: '',
      artista: '',
      anio_lanzamiento: '' as unknown as number, // Initialize as empty string
      genero_nombre: '',
      url_caratula: '',
      descripcion: '',
      canciones: [],
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'canciones',
  });

  useEffect(() => {
    if (albumToEdit) {
      form.reset({
        titulo: albumToEdit.titulo,
        artista: albumToEdit.es_compilacion ? "Various Artists" : albumToEdit.artistas.map(a => a.nombre).join(', '),
        anio_lanzamiento: albumToEdit.anio_lanzamiento ?? ('' as unknown as number), // Ensure empty string if null/undefined
        genero_nombre: albumToEdit.genero_nombre,
        url_caratula: albumToEdit.url_caratula,
        descripcion: albumToEdit.descripcion || '',
        canciones: albumToEdit.canciones.map(c => ({ 
          titulo: c.titulo, 
          bpm: c.bpm ?? '' // Ensure bpm is string if undefined or number
        })) || [],
      });
    } else {
      // Handle album not found, e.g., redirect or show error
      toast({ title: 'Error', description: 'Álbum no encontrado.', variant: 'destructive' });
      router.push('/admin/dashboard');
    }
  }, [albumToEdit, form, router, toast]);

  const onSubmit = (data: AlbumFormValues) => {
    console.log('Album data to update:', data);
    // In a real app, you would send this data to your backend.
    // For this prototype, we find the album in mockAlbums and "update" it (in memory).
    // This change won't persist across reloads.
    toast({
      title: 'Álbum Actualizado (Simulado)',
      description: `El álbum "${data.titulo}" ha sido actualizado exitosamente (simulación).`,
    });
    router.push('/admin/dashboard');
  };
  
  if (!albumToEdit && form.formState.isLoading) { // Check isLoading as well
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
                      <Input {...field} />
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
                      <Input type="url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

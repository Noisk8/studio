
export interface Sello {
  id_sello: number;
  nombre: string;
  pais?: string;
  fecha_fundacion?: string; // Date as string
  descripcion?: string;
}

export interface Artista {
  id_artista: number;
  nombre: string;
  alias?: string;
  pais?: string;
  biografia?: string;
}

export interface Genero {
  id_genero: number;
  nombre: string;
  descripcion?: string;
}

export interface BpmCategoria {
  id_categoria: number;
  rango_minimo: number;
  rango_maximo: number;
  color: string;
  emoji: string;
  className?: string; // For Tailwind CSS color class
}

export interface Cancion {
  id_cancion: number;
  titulo: string;
  numero_pista?: number;
  duracion?: string; // TIME as string e.g., "00:03:45"
  bpm?: number;
  id_categoria_bpm?: number;
  artista_principal_id?: number; // FK to Artista
  artista_principal_nombre?: string; // Denormalized for convenience
  artistas?: Artista[]; // For featured artists on a track
  notas?: string;
}

export interface Album {
  id_album: number;
  titulo: string;
  sello_id: number; // FK to Sello
  sello_nombre?: string; // Denormalized for convenience
  anio_lanzamiento?: number;
  genero_id?: number; // FK to Genero
  genero_nombre?: string; // Denormalized for convenience
  url_caratula: string;
  formato?: string; // e.g., "LP", "CD", "Digital"
  numero_catalogo?: string;
  es_compilacion?: boolean;
  descripcion?: string;
  fecha_adquisicion?: string; // Date as string
  artistas: Artista[]; // Can be one or many
  canciones: Cancion[];
}

export interface Filters {
  genre?: string;
  artist?: string;
  bpmRange?: string;
}

export type SortKey = 'title_asc' | 'title_desc' | 'year_new' | 'year_old' | 'bpm_avg_asc' | 'bpm_avg_desc';

export const BPM_CATEGORIES: BpmCategoria[] = [
  { id_categoria: 1, rango_minimo: 70, rango_maximo: 90, color: 'Azul', emoji: '🔵', className: 'bg-blue-500 text-white' },
  { id_categoria: 2, rango_minimo: 90, rango_maximo: 100, color: 'Verde', emoji: '🟢', className: 'bg-green-500 text-white' },
  { id_categoria: 3, rango_minimo: 100, rango_maximo: 110, color: 'Amarillo', emoji: '🟡', className: 'bg-yellow-400 text-black' },
  { id_categoria: 4, rango_minimo: 110, rango_maximo: 120, color: 'Naranja', emoji: '🟠', className: 'bg-orange-500 text-white' },
  { id_categoria: 5, rango_minimo: 120, rango_maximo: 130, color: 'Rojo', emoji: '🔴', className: 'bg-red-500 text-white' },
  { id_categoria: 6, rango_minimo: 130, rango_maximo: 140, color: 'Púrpura', emoji: '🟣', className: 'bg-purple-500 text-white' },
];

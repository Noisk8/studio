
import type { Album, Artista, Genero, Sello } from './types';

const VINYLVISION_ALBUMS_KEY = 'vinylVisionAlbums';

// Original hardcoded data (will serve as default)
const defaultMockAlbums: Album[] = [
  {
    id_album: 1,
    titulo: 'Trans-Europe Express',
    sello_id: 1,
    sello_nombre: 'EMI',
    anio_lanzamiento: 1977,
    genero_id: 1,
    genero_nombre: 'Electronic',
    url_caratula: 'https://i.discogs.com/uFKN7V6056qN0Yj2vNsYy0wRvoPEEPHrX29n7zWSSnI/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ5NzM4LTE2OTU5ODQyOTEtNDM3OC5qcGVn.jpeg',
    formato: 'LP',
    es_compilacion: false,
    artistas: [{ id_artista: 1, nombre: 'Kraftwerk', pais: 'Germany' }],
    canciones: [
      { id_cancion: 1, titulo: 'Europe Endless', bpm: 115, artistas: [{ id_artista: 1, nombre: 'Kraftwerk' }] },
      { id_cancion: 2, titulo: 'The Hall of Mirrors', bpm: 85, artistas: [{ id_artista: 1, nombre: 'Kraftwerk' }] },
      { id_cancion: 3, titulo: 'Showroom Dummies', bpm: 122, artistas: [{ id_artista: 1, nombre: 'Kraftwerk' }] },
    ],
  },
  {
    id_album: 2,
    titulo: 'Discovery',
    sello_id: 2,
    sello_nombre: 'Virgin Records',
    anio_lanzamiento: 2001,
    genero_id: 1,
    genero_nombre: 'Electronic',
    url_caratula: 'https://i.discogs.com/K7y0n7i8r7Q3X5nZ_0pY5mB3c8vX1bV9t7Y8fWqT_eM/rs:fit/g:sm/q:90/h:598/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE5OTAxLTE1NzU1NjQwNDQtOTQyMi5qcGVn.jpeg',
    formato: 'LP',
    es_compilacion: false,
    artistas: [{ id_artista: 2, nombre: 'Daft Punk', pais: 'France' }],
    canciones: [
      { id_cancion: 4, titulo: 'One More Time', bpm: 123, artistas: [{ id_artista: 2, nombre: 'Daft Punk' }] },
      { id_cancion: 5, titulo: 'Aerodynamic', bpm: 123, artistas: [{ id_artista: 2, nombre: 'Daft Punk' }] },
      { id_cancion: 6, titulo: 'Digital Love', bpm: 125, artistas: [{ id_artista: 2, nombre: 'Daft Punk' }] },
    ],
  },
  {
    id_album: 3,
    titulo: 'Abbey Road',
    sello_id: 3,
    sello_nombre: 'Parlophone',
    anio_lanzamiento: 1969,
    genero_id: 2,
    genero_nombre: 'Rock',
    url_caratula: 'https://i.discogs.com/Bzn25f0g0t6z4P8qXO9Xv0XZyFw_739KXRrb7oKRlOU/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ5OTA5Mi0xNTk3OTU3MTQxLTk2NDIuanBlZw.jpeg',
    formato: 'LP',
    es_compilacion: false,
    artistas: [{ id_artista: 3, nombre: 'The Beatles', pais: 'UK' }],
    canciones: [
      { id_cancion: 7, titulo: 'Come Together', bpm: 82, artistas: [{ id_artista: 3, nombre: 'The Beatles' }] },
      { id_cancion: 8, titulo: 'Something', bpm: 70, artistas: [{ id_artista: 3, nombre: 'The Beatles' }] },
      { id_cancion: 9, titulo: 'Here Comes The Sun', bpm: 129, artistas: [{ id_artista: 3, nombre: 'The Beatles' }] },
    ],
  },
  {
    id_album: 4,
    titulo: 'The Dark Side of the Moon',
    sello_id: 1,
    sello_nombre: 'EMI',
    anio_lanzamiento: 1973,
    genero_id: 2,
    genero_nombre: 'Rock',
    url_caratula: 'https://i.discogs.com/7FvI7xrMgxh007Ria9qqANI4y1je7aLl9ozJPrtU5D4/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI4NDI0MjU0LTE2OTU5MTA0MjMtMTM1MC5qcGVn.jpeg',
    formato: 'LP',
    es_compilacion: false,
    artistas: [{ id_artista: 4, nombre: 'Pink Floyd', pais: 'UK' }],
    canciones: [
      { id_cancion: 10, titulo: 'Speak to Me/Breathe', bpm: 72, artistas: [{ id_artista: 4, nombre: 'Pink Floyd' }] },
      { id_cancion: 11, titulo: 'Time', bpm: 120, artistas: [{ id_artista: 4, nombre: 'Pink Floyd' }] },
      { id_cancion: 12, titulo: 'Money', bpm: 126, artistas: [{ id_artista: 4, nombre: 'Pink Floyd' }] },
    ],
  },
  {
    id_album: 5,
    titulo: 'Kind of Blue',
    sello_id: 4,
    sello_nombre: 'Columbia',
    anio_lanzamiento: 1959,
    genero_id: 4,
    genero_nombre: 'Jazz',
    url_caratula: 'https://i.discogs.com/4Bv077Y_mRxXCoSCXAt4i9z22-H2LSVOQ072G5f_rX0/rs:fit/g:sm/q:90/h:599/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU0NDU2OC0xNjY2ODE4MjUwLTUyNDUuanBlZw.jpeg',
    formato: 'LP',
    es_compilacion: false,
    artistas: [{ id_artista: 6, nombre: 'Miles Davis', pais: 'USA'}],
    canciones: [
      { id_cancion: 13, titulo: 'So What', bpm: 135, artistas: [{ id_artista: 6, nombre: 'Miles Davis' }] },
      { id_cancion: 14, titulo: 'Freddie Freeloader', bpm: 95, artistas: [{ id_artista: 6, nombre: 'Miles Davis' }] },
      { id_cancion: 15, titulo: 'Blue in Green', bpm: 75, artistas: [{ id_artista: 6, nombre: 'Miles Davis' }] },
    ],
  },
  {
    id_album: 6,
    titulo: 'Mezzanine',
    sello_id: 2,
    sello_nombre: 'Virgin Records',
    anio_lanzamiento: 1998,
    genero_id: 5,
    genero_nombre: 'Trip Hop',
    url_caratula: 'https://i.discogs.com/h9sWjX0SMXBZ42t05p4VerP2OgNDN4xV9pWWNw68y5k/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM3NzEtMTQ0MzY2MzMyMC0zNjAyLmpwZWc.jpeg',
    formato: 'LP',
    es_compilacion: false,
    artistas: [{ id_artista: 7, nombre: 'Massive Attack', pais: 'UK'}],
    canciones: [
      { id_cancion: 16, titulo: 'Angel', bpm: 80, artistas: [{ id_artista: 7, nombre: 'Massive Attack' }] },
      { id_cancion: 17, titulo: 'Teardrop', bpm: 78, artistas: [{ id_artista: 7, nombre: 'Massive Attack' }] },
      { id_cancion: 18, titulo: 'Inertia Creeps', bpm: 98, artistas: [{ id_artista: 7, nombre: 'Massive Attack' }] },
    ],
  },
  {
    id_album: 7,
    titulo: 'Techno Compilation Vol. 1',
    sello_id: 5,
    sello_nombre: 'Warp Records',
    anio_lanzamiento: 2023,
    genero_id: 6,
    genero_nombre: 'Techno',
    url_caratula: 'https://placehold.co/300x300.png',
    formato: 'LP',
    es_compilacion: true,
    artistas: [{ id_artista: 5, nombre: 'Various Artists' }],
    canciones: [
      { id_cancion: 19, titulo: 'Future Beat', bpm: 130, artista_principal_nombre: 'DJ Electron' },
      { id_cancion: 20, titulo: 'Acid Dreams', bpm: 135, artista_principal_nombre: 'Syntax Error' },
      { id_cancion: 21, titulo: 'Rhythm Machine', bpm: 128, artista_principal_nombre: 'The Modulator' },
    ],
  },
];


export const mockArtistas: Artista[] = [
  { id_artista: 1, nombre: 'Kraftwerk', pais: 'Germany' },
  { id_artista: 2, nombre: 'Daft Punk', pais: 'France' },
  { id_artista: 3, nombre: 'The Beatles', pais: 'UK' },
  { id_artista: 4, nombre: 'Pink Floyd', pais: 'UK' },
  { id_artista: 5, nombre: 'Various Artists' }, // For compilations
  { id_artista: 6, nombre: 'Miles Davis', pais: 'USA'},
  { id_artista: 7, nombre: 'Massive Attack', pais: 'UK'},
];

export const mockGeneros: Genero[] = [
  { id_genero: 1, nombre: 'Electronic' },
  { id_genero: 2, nombre: 'Rock' },
  { id_genero: 3, nombre: 'Pop' },
  { id_genero: 4, nombre: 'Jazz' },
  { id_genero: 5, nombre: 'Trip Hop' },
  { id_genero: 6, nombre: 'Techno' },
];

export const mockSellos: Sello[] = [
  { id_sello: 1, nombre: 'EMI' },
  { id_sello: 2, nombre: 'Virgin Records' },
  { id_sello: 3, nombre: 'Parlophone' },
  { id_sello: 4, nombre: 'Columbia' },
  { id_sello: 5, nombre: 'Warp Records' },
];

// --- localStorage persistence logic ---
let currentAlbums: Album[] = [];
let hasLoadedFromStorage = false; // Renamed for clarity

function _saveAlbumsToLocalStorage(albumsToSave: Album[]) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(VINYLVISION_ALBUMS_KEY, JSON.stringify(albumsToSave));
      // Dispatch an event to notify other components of the update
      window.dispatchEvent(new CustomEvent('albumsUpdated'));
    } catch (error) {
      console.error("Error saving albums to localStorage:", error);
    }
  }
}

export function getAlbums(): Album[] {
  if (typeof window === 'undefined') {
    // For SSR/prerendering, return a fresh copy of defaults.
    // This won't be persisted but avoids errors during build.
    return JSON.parse(JSON.stringify(defaultMockAlbums));
  }

  if (!hasLoadedFromStorage) {
    try {
      const storedAlbumsJson = localStorage.getItem(VINYLVISION_ALBUMS_KEY);
      if (storedAlbumsJson) {
        currentAlbums = JSON.parse(storedAlbumsJson);
      } else {
        // Initialize with a deep copy of defaultMockAlbums
        currentAlbums = JSON.parse(JSON.stringify(defaultMockAlbums));
        _saveAlbumsToLocalStorage(currentAlbums); // Save initial defaults
      }
    } catch (error) {
      console.error("Error loading albums from localStorage, using defaults:", error);
      // Fallback to a deep copy of defaultMockAlbums in case of parsing error
      currentAlbums = JSON.parse(JSON.stringify(defaultMockAlbums));
    }
    hasLoadedFromStorage = true;
  }
  // Return a deep copy to prevent direct mutation of currentAlbums from outside
  return JSON.parse(JSON.stringify(currentAlbums));
}

export function addAlbum(newAlbum: Album): void {
  const albums = getAlbums(); // Ensure current data is loaded
  // Ensure newAlbum has a unique ID
  const maxId = albums.length > 0 ? Math.max(...albums.map(a => a.id_album)) : 0;
  newAlbum.id_album = maxId + 1;
  
  const updatedAlbums = [...albums, newAlbum];
  currentAlbums = updatedAlbums; // Update the in-memory cache
  _saveAlbumsToLocalStorage(updatedAlbums);
}

export function updateAlbum(albumId: number, updatedAlbumData: Album): void {
  const albums = getAlbums();
  const updatedAlbums = albums.map(album =>
    album.id_album === albumId ? { ...album, ...updatedAlbumData, id_album: albumId } : album
  );
  currentAlbums = updatedAlbums;
  _saveAlbumsToLocalStorage(updatedAlbums);
}

export function findAlbumById(albumId: string | number): Album | undefined {
    const albums = getAlbums();
    return albums.find(album => album.id_album.toString() === albumId.toString());
}
// --- End localStorage persistence logic ---


import type { Album, Artista, Genero, Sello } from './types';

const VINYLVISION_ALBUMS_KEY = 'vinylVisionAlbums';
const VINYLVISION_ARTISTS_KEY = 'vinylVisionArtists';
const VINYLVISION_GENRES_KEY = 'vinylVisionGenres';
const VINYLVISION_SELLOS_KEY = 'vinylVisionSellos';

// --- Default Data (Fallback) ---
const defaultMockArtistas: Artista[] = [
  { id_artista: 1, nombre: 'Kraftwerk', pais: 'Germany' },
  { id_artista: 2, nombre: 'Daft Punk', pais: 'France' },
  { id_artista: 3, nombre: 'The Beatles', pais: 'UK' },
  { id_artista: 4, nombre: 'Pink Floyd', pais: 'UK' },
  { id_artista: 5, nombre: 'Various Artists' },
  { id_artista: 6, nombre: 'Miles Davis', pais: 'USA'},
  { id_artista: 7, nombre: 'Massive Attack', pais: 'UK'},
  { id_artista: 8, nombre: 'DJ Electron' },
  { id_artista: 9, nombre: 'Syntax Error' },
  { id_artista: 10, nombre: 'The Modulator' },
];

const defaultMockGeneros: Genero[] = [
  { id_genero: 1, nombre: 'Electronic' },
  { id_genero: 2, nombre: 'Rock' },
  { id_genero: 3, nombre: 'Pop' },
  { id_genero: 4, nombre: 'Jazz' },
  { id_genero: 5, nombre: 'Trip Hop' },
  { id_genero: 6, nombre: 'Techno' },
];

const defaultMockSellos: Sello[] = [
  { id_sello: 1, nombre: 'EMI' },
  { id_sello: 2, nombre: 'Virgin Records' },
  { id_sello: 3, nombre: 'Parlophone' },
  { id_sello: 4, nombre: 'Columbia' },
  { id_sello: 5, nombre: 'Warp Records' },
];

const defaultMockAlbums: Album[] = [
  {
    id_album: 1,
    titulo: 'Trans-Europe Express',
    sello_id: defaultMockSellos.find(s => s.nombre === 'EMI')!.id_sello,
    sello_nombre: 'EMI',
    anio_lanzamiento: 1977,
    genero_id: defaultMockGeneros.find(g => g.nombre === 'Electronic')!.id_genero,
    genero_nombre: 'Electronic',
    url_caratula: 'https://i.discogs.com/uFKN7V6056qN0Yj2vNsYy0wRvoPEEPHrX29n7zWSSnI/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ5NzM4LTE2OTU5ODQyOTEtNDM3OC5qcGVn.jpeg',
    formato: 'LP',
    es_compilacion: false,
    artistas: [defaultMockArtistas.find(a => a.nombre === 'Kraftwerk')!],
    canciones: [
      { id_cancion: 1, titulo: 'Europe Endless', bpm: 115, artistas: [defaultMockArtistas.find(a => a.nombre === 'Kraftwerk')!] },
      { id_cancion: 2, titulo: 'The Hall of Mirrors', bpm: 85, artistas: [defaultMockArtistas.find(a => a.nombre === 'Kraftwerk')!] },
      { id_cancion: 3, titulo: 'Showroom Dummies', bpm: 122, artistas: [defaultMockArtistas.find(a => a.nombre === 'Kraftwerk')!] },
    ],
  },
  {
    id_album: 2,
    titulo: 'Discovery',
    sello_id: defaultMockSellos.find(s => s.nombre === 'Virgin Records')!.id_sello,
    sello_nombre: 'Virgin Records',
    anio_lanzamiento: 2001,
    genero_id: defaultMockGeneros.find(g => g.nombre === 'Electronic')!.id_genero,
    genero_nombre: 'Electronic',
    url_caratula: 'https://i.discogs.com/K7y0n7i8r7Q3X5nZ_0pY5mB3c8vX1bV9t7Y8fWqT_eM/rs:fit/g:sm/q:90/h:598/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE5OTAxLTE1NzU1NjQwNDQtOTQyMi5qcGVn.jpeg',
    formato: 'LP',
    es_compilacion: false,
    artistas: [defaultMockArtistas.find(a => a.nombre === 'Daft Punk')!],
    canciones: [
      { id_cancion: 4, titulo: 'One More Time', bpm: 123, artistas: [defaultMockArtistas.find(a => a.nombre === 'Daft Punk')!] },
      { id_cancion: 5, titulo: 'Aerodynamic', bpm: 123, artistas: [defaultMockArtistas.find(a => a.nombre === 'Daft Punk')!] },
      { id_cancion: 6, titulo: 'Digital Love', bpm: 125, artistas: [defaultMockArtistas.find(a => a.nombre === 'Daft Punk')!] },
    ],
  },
   {
    id_album: 3,
    titulo: 'Abbey Road',
    sello_id: defaultMockSellos.find(s => s.nombre === 'Parlophone')!.id_sello,
    sello_nombre: 'Parlophone',
    anio_lanzamiento: 1969,
    genero_id: defaultMockGeneros.find(g => g.nombre === 'Rock')!.id_genero,
    genero_nombre: 'Rock',
    url_caratula: 'https://i.discogs.com/Bzn25f0g0t6z4P8qXO9Xv0XZyFw_739KXRrb7oKRlOU/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ5OTA5Mi0xNTk3OTU3MTQxLTk2NDIuanBlZw.jpeg',
    formato: 'LP',
    es_compilacion: false,
    artistas: [defaultMockArtistas.find(a => a.nombre === 'The Beatles')!],
    canciones: [
      { id_cancion: 7, titulo: 'Come Together', bpm: 82, artistas: [defaultMockArtistas.find(a => a.nombre === 'The Beatles')!] },
      { id_cancion: 8, titulo: 'Something', bpm: 70, artistas: [defaultMockArtistas.find(a => a.nombre === 'The Beatles')!] },
      { id_cancion: 9, titulo: 'Here Comes The Sun', bpm: 129, artistas: [defaultMockArtistas.find(a => a.nombre === 'The Beatles')!] },
    ],
  },
  {
    id_album: 4,
    titulo: 'The Dark Side of the Moon',
    sello_id: defaultMockSellos.find(s => s.nombre === 'EMI')!.id_sello,
    sello_nombre: 'EMI',
    anio_lanzamiento: 1973,
    genero_id: defaultMockGeneros.find(g => g.nombre === 'Rock')!.id_genero,
    genero_nombre: 'Rock',
    url_caratula: 'https://i.discogs.com/7FvI7xrMgxh007Ria9qqANI4y1je7aLl9ozJPrtU5D4/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI4NDI0MjU0LTE2OTU5MTA0MjMtMTM1MC5qcGVn.jpeg',
    formato: 'LP',
    es_compilacion: false,
    artistas: [defaultMockArtistas.find(a => a.nombre === 'Pink Floyd')!],
    canciones: [
      { id_cancion: 10, titulo: 'Speak to Me/Breathe', bpm: 72, artistas: [defaultMockArtistas.find(a => a.nombre === 'Pink Floyd')!] },
      { id_cancion: 11, titulo: 'Time', bpm: 120, artistas: [defaultMockArtistas.find(a => a.nombre === 'Pink Floyd')!] },
      { id_cancion: 12, titulo: 'Money', bpm: 126, artistas: [defaultMockArtistas.find(a => a.nombre === 'Pink Floyd')!] },
    ],
  },
  {
    id_album: 5,
    titulo: 'Kind of Blue',
    sello_id: defaultMockSellos.find(s => s.nombre === 'Columbia')!.id_sello,
    sello_nombre: 'Columbia',
    anio_lanzamiento: 1959,
    genero_id: defaultMockGeneros.find(g => g.nombre === 'Jazz')!.id_genero,
    genero_nombre: 'Jazz',
    url_caratula: 'https://i.discogs.com/4Bv077Y_mRxXCoSCXAt4i9z22-H2LSVOQ072G5f_rX0/rs:fit/g:sm/q:90/h:599/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU0NDU2OC0xNjY2ODE4MjUwLTUyNDUuanBlZw.jpeg',
    formato: 'LP',
    es_compilacion: false,
    artistas: [defaultMockArtistas.find(a => a.nombre === 'Miles Davis')!],
    canciones: [
      { id_cancion: 13, titulo: 'So What', bpm: 135, artistas: [defaultMockArtistas.find(a => a.nombre === 'Miles Davis')!] },
      { id_cancion: 14, titulo: 'Freddie Freeloader', bpm: 95, artistas: [defaultMockArtistas.find(a => a.nombre === 'Miles Davis')!] },
      { id_cancion: 15, titulo: 'Blue in Green', bpm: 75, artistas: [defaultMockArtistas.find(a => a.nombre === 'Miles Davis')!] },
    ],
  },
  {
    id_album: 6,
    titulo: 'Mezzanine',
    sello_id: defaultMockSellos.find(s => s.nombre === 'Virgin Records')!.id_sello,
    sello_nombre: 'Virgin Records',
    anio_lanzamiento: 1998,
    genero_id: defaultMockGeneros.find(g => g.nombre === 'Trip Hop')!.id_genero,
    genero_nombre: 'Trip Hop',
    url_caratula: 'https://i.discogs.com/h9sWjX0SMXBZ42t05p4VerP2OgNDN4xV9pWWNw68y5k/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM3NzEtMTQ0MzY2MzMyMC0zNjAyLmpwZWc.jpeg',
    formato: 'LP',
    es_compilacion: false,
    artistas: [defaultMockArtistas.find(a => a.nombre === 'Massive Attack')!],
    canciones: [
      { id_cancion: 16, titulo: 'Angel', bpm: 80, artistas: [defaultMockArtistas.find(a => a.nombre === 'Massive Attack')!] },
      { id_cancion: 17, titulo: 'Teardrop', bpm: 78, artistas: [defaultMockArtistas.find(a => a.nombre === 'Massive Attack')!] },
      { id_cancion: 18, titulo: 'Inertia Creeps', bpm: 98, artistas: [defaultMockArtistas.find(a => a.nombre === 'Massive Attack')!] },
    ],
  },
  {
    id_album: 7,
    titulo: 'Techno Compilation Vol. 1',
    sello_id: defaultMockSellos.find(s => s.nombre === 'Warp Records')!.id_sello,
    sello_nombre: 'Warp Records',
    anio_lanzamiento: 2023,
    genero_id: defaultMockGeneros.find(g => g.nombre === 'Techno')!.id_genero,
    genero_nombre: 'Techno',
    url_caratula: 'https://placehold.co/300x300.png',
    formato: 'LP',
    es_compilacion: true,
    artistas: [defaultMockArtistas.find(a => a.nombre === 'Various Artists')!],
    canciones: [
      { id_cancion: 19, titulo: 'Future Beat', bpm: 130, artista_principal_nombre: 'DJ Electron', artistas: [defaultMockArtistas.find(a => a.nombre === 'DJ Electron')!] },
      { id_cancion: 20, titulo: 'Acid Dreams', bpm: 135, artista_principal_nombre: 'Syntax Error', artistas: [defaultMockArtistas.find(a => a.nombre === 'Syntax Error')!] },
      { id_cancion: 21, titulo: 'Rhythm Machine', bpm: 128, artista_principal_nombre: 'The Modulator', artistas: [defaultMockArtistas.find(a => a.nombre === 'The Modulator')!] },
    ],
  },
];


// --- In-memory cache and loaded flags ---
let currentAlbums: Album[] = [];
let albumsLoadedFromStorage = false;

let currentArtistas: Artista[] = [];
let artistasLoadedFromStorage = false;

let currentGeneros: Genero[] = [];
let generosLoadedFromStorage = false;

let currentSellos: Sello[] = [];
let sellosLoadedFromStorage = false;

// --- Generic LocalStorage Saver ---
function _saveToLocalStorage<T>(key: string, data: T[], eventName: string) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent(eventName));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }
}

// --- Albums Logic ---
export function getAlbums(): Album[] {
  if (typeof window === 'undefined') return JSON.parse(JSON.stringify(defaultMockAlbums));
  if (!albumsLoadedFromStorage) {
    try {
      const storedJson = localStorage.getItem(VINYLVISION_ALBUMS_KEY);
      if (storedJson) {
        currentAlbums = JSON.parse(storedJson);
      } else {
        currentAlbums = JSON.parse(JSON.stringify(defaultMockAlbums));
        _saveToLocalStorage(VINYLVISION_ALBUMS_KEY, currentAlbums, 'albumsUpdated');
      }
    } catch (error) {
      console.error("Error loading albums from localStorage, using defaults:", error);
      currentAlbums = JSON.parse(JSON.stringify(defaultMockAlbums));
    }
    albumsLoadedFromStorage = true;
  }
  return JSON.parse(JSON.stringify(currentAlbums));
}

// --- Artists Logic ---
export function getArtistas(): Artista[] {
  if (typeof window === 'undefined') return JSON.parse(JSON.stringify(defaultMockArtistas));
  if (!artistasLoadedFromStorage) {
    try {
      const storedJson = localStorage.getItem(VINYLVISION_ARTISTS_KEY);
      if (storedJson) {
        currentArtistas = JSON.parse(storedJson);
        // Ensure default artists are present
        defaultMockArtistas.forEach(defaultArtist => {
          if (!currentArtistas.find(a => a.nombre.toLowerCase() === defaultArtist.nombre.toLowerCase())) {
            currentArtistas.push(JSON.parse(JSON.stringify(defaultArtist)));
          }
        });
      } else {
        currentArtistas = JSON.parse(JSON.stringify(defaultMockArtistas));
      }
      _saveToLocalStorage(VINYLVISION_ARTISTS_KEY, currentArtistas, 'artistasUpdated');
    } catch (error) {
      console.error("Error loading artistas from localStorage, using defaults:", error);
      currentArtistas = JSON.parse(JSON.stringify(defaultMockArtistas));
    }
    artistasLoadedFromStorage = true;
  }
  return JSON.parse(JSON.stringify(currentArtistas));
}

export function addOrGetArtista(nombreArtista: string): Artista {
  let artistas = getArtistas();
  const normalizedNombre = nombreArtista.trim();
  let existingArtist = artistas.find(a => a.nombre.toLowerCase() === normalizedNombre.toLowerCase());

  if (!existingArtist) {
    const newArtistId = artistas.length > 0 ? Math.max(...artistas.map(a => a.id_artista)) + 1 : 1;
    const newArtist: Artista = { id_artista: newArtistId, nombre: normalizedNombre };
    artistas.push(newArtist);
    currentArtistas = artistas;
    _saveToLocalStorage(VINYLVISION_ARTISTS_KEY, artistas, 'artistasUpdated');
    return newArtist;
  }
  return existingArtist;
}


// --- Generos Logic ---
export function getGeneros(): Genero[] {
  if (typeof window === 'undefined') return JSON.parse(JSON.stringify(defaultMockGeneros));
  if (!generosLoadedFromStorage) {
    try {
      const storedJson = localStorage.getItem(VINYLVISION_GENRES_KEY);
      if (storedJson) {
        currentGeneros = JSON.parse(storedJson);
         defaultMockGeneros.forEach(defaultGenero => {
          if (!currentGeneros.find(g => g.nombre.toLowerCase() === defaultGenero.nombre.toLowerCase())) {
            currentGeneros.push(JSON.parse(JSON.stringify(defaultGenero)));
          }
        });
      } else {
        currentGeneros = JSON.parse(JSON.stringify(defaultMockGeneros));
      }
      _saveToLocalStorage(VINYLVISION_GENRES_KEY, currentGeneros, 'generosUpdated');
    } catch (error) {
      console.error("Error loading generos from localStorage, using defaults:", error);
      currentGeneros = JSON.parse(JSON.stringify(defaultMockGeneros));
    }
    generosLoadedFromStorage = true;
  }
  return JSON.parse(JSON.stringify(currentGeneros));
}

export function addOrGetGenero(nombreGenero: string): Genero {
  let generos = getGeneros();
  const normalizedNombre = nombreGenero.trim();
  let existingGenero = generos.find(g => g.nombre.toLowerCase() === normalizedNombre.toLowerCase());

  if (!existingGenero) {
    const newGeneroId = generos.length > 0 ? Math.max(...generos.map(g => g.id_genero)) + 1 : 1;
    const newGenero: Genero = { id_genero: newGeneroId, nombre: normalizedNombre };
    generos.push(newGenero);
    currentGeneros = generos;
    _saveToLocalStorage(VINYLVISION_GENRES_KEY, generos, 'generosUpdated');
    return newGenero;
  }
  return existingGenero;
}

// --- Sellos Logic ---
export function getSellos(): Sello[] {
  if (typeof window === 'undefined') return JSON.parse(JSON.stringify(defaultMockSellos));
  if (!sellosLoadedFromStorage) {
    try {
      const storedJson = localStorage.getItem(VINYLVISION_SELLOS_KEY);
      if (storedJson) {
        currentSellos = JSON.parse(storedJson);
        defaultMockSellos.forEach(defaultSello => {
          if (!currentSellos.find(s => s.nombre.toLowerCase() === defaultSello.nombre.toLowerCase())) {
            currentSellos.push(JSON.parse(JSON.stringify(defaultSello)));
          }
        });
      } else {
        currentSellos = JSON.parse(JSON.stringify(defaultMockSellos));
      }
      _saveToLocalStorage(VINYLVISION_SELLOS_KEY, currentSellos, 'sellosUpdated');
    } catch (error) {
      console.error("Error loading sellos from localStorage, using defaults:", error);
      currentSellos = JSON.parse(JSON.stringify(defaultMockSellos));
    }
    sellosLoadedFromStorage = true;
  }
  return JSON.parse(JSON.stringify(currentSellos));
}

export function addOrGetSello(nombreSello: string): Sello {
  let sellos = getSellos();
  const normalizedNombre = nombreSello.trim();
  let existingSello = sellos.find(s => s.nombre.toLowerCase() === normalizedNombre.toLowerCase());

  if (!existingSello) {
    const newSelloId = sellos.length > 0 ? Math.max(...sellos.map(s => s.id_sello)) + 1 : 1;
    const newSello: Sello = { id_sello: newSelloId, nombre: normalizedNombre };
    sellos.push(newSello);
    currentSellos = sellos;
    _saveToLocalStorage(VINYLVISION_SELLOS_KEY, sellos, 'sellosUpdated');
    return newSello;
  }
  return existingSello;
}


// --- Album CRUD Operations ---
export function addAlbum(newAlbumData: Album): void {
  const albums = getAlbums(); // Ensure current list is loaded
  const maxId = albums.length > 0 ? Math.max(...albums.map(a => a.id_album)) : 0;
  newAlbumData.id_album = maxId + 1;

  // Process artists
  newAlbumData.artistas = newAlbumData.artistas.map(formArtist => addOrGetArtista(formArtist.nombre));
  if (newAlbumData.es_compilacion && newAlbumData.canciones) {
    newAlbumData.canciones.forEach(cancion => {
      if (cancion.artista_principal_nombre) {
        const songArtist = addOrGetArtista(cancion.artista_principal_nombre);
        cancion.artistas = [songArtist];
      }
    });
  }
  
  // Process genero and sello (they are already set in the form submission logic)
  // The newAlbumData should already have genero_id, genero_nombre, sello_id, sello_nombre populated
  // by addOrGetGenero and addOrGetSello in the form's onSubmit handler.

  const updatedAlbums = [...albums, newAlbumData];
  currentAlbums = updatedAlbums;
  _saveToLocalStorage(VINYLVISION_ALBUMS_KEY, updatedAlbums, 'albumsUpdated');
}

export function updateAlbum(albumId: number, updatedAlbumData: Album): void {
  let albums = getAlbums();

  // Process artists
  updatedAlbumData.artistas = updatedAlbumData.artistas.map(formArtist => addOrGetArtista(formArtist.nombre));
  if (updatedAlbumData.es_compilacion && updatedAlbumData.canciones) {
    updatedAlbumData.canciones.forEach(cancion => {
      if (cancion.artista_principal_nombre) {
        const songArtist = addOrGetArtista(cancion.artista_principal_nombre);
        cancion.artistas = [songArtist];
      }
    });
  }
  
  // Process genero and sello (similar to addAlbum, assuming form logic handles it)

  const updatedAlbums = albums.map(album =>
    album.id_album === albumId ? { ...album, ...updatedAlbumData, id_album: albumId } : album
  );
  currentAlbums = updatedAlbums;
  _saveToLocalStorage(VINYLVISION_ALBUMS_KEY, updatedAlbums, 'albumsUpdated');
}

export function findAlbumById(albumId: string | number): Album | undefined {
    const albums = getAlbums();
    return albums.find(album => album.id_album.toString() === albumId.toString());
}

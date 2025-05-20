
'use client';

import { useState, useEffect } from 'react';
import type { Album, Filters, SortKey, Artista, Genero } from '@/lib/types';
import { getAlbums, getArtistas, mockGeneros } from '@/lib/mock-data'; // Updated import
import AlbumCard from '@/components/AlbumCard';
import FilterSortControls from '@/components/FilterSortControls';
import { Input } from '@/components/ui/input';
import { Search, RefreshCw } from 'lucide-react'; 

export default function HomePage() {
  const [allAlbums, setAllAlbums] = useState<Album[]>([]);
  const [allArtistas, setAllArtistas] = useState<Artista[]>([]); // State for artistas
  const [displayedAlbums, setDisplayedAlbums] = useState<Album[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [sortKey, setSortKey] = useState<SortKey>('title_asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      setAllAlbums(getAlbums());
      setAllArtistas(getArtistas()); // Load artistas
      setIsLoading(false);
    };
    loadData(); 

    const handleDataUpdate = () => { // Combined handler for albums and artistas
      loadData(); 
    };

    window.addEventListener('albumsUpdated', handleDataUpdate);
    window.addEventListener('artistasUpdated', handleDataUpdate); // Listen for artist updates
    return () => {
      window.removeEventListener('albumsUpdated', handleDataUpdate);
      window.removeEventListener('artistasUpdated', handleDataUpdate);
    };
  }, []);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortKey: SortKey) => {
    setSortKey(newSortKey);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  useEffect(() => {
    if (isLoading) return; 

    let filtered = [...allAlbums];

    if (searchTerm) {
      filtered = filtered.filter(album =>
        album.titulo.toLowerCase().includes(searchTerm) ||
        album.artistas.some(artist => artist.nombre.toLowerCase().includes(searchTerm)) ||
        (album.es_compilacion && "various artists".includes(searchTerm))
      );
    }
    
    if (filters.genre) {
      filtered = filtered.filter(album => album.genero_nombre === filters.genre);
    }

    if (filters.artist) {
      filtered = filtered.filter(album => 
        album.es_compilacion ? filters.artist === "Various Artists" : album.artistas.some(a => a.nombre === filters.artist)
      );
    }
    
    if (filters.bpmRange) {
      const [minBpmStr, maxBpmStr] = filters.bpmRange.split('-');
      const minBpm = parseInt(minBpmStr, 10);
      const maxBpm = parseInt(maxBpmStr, 10);
      
      filtered = filtered.filter(album => 
        album.canciones.some(song => 
          song.bpm && song.bpm >= minBpm && song.bpm <= maxBpm
        )
      );
    }

    switch (sortKey) {
      case 'title_asc':
        filtered.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case 'title_desc':
        filtered.sort((a, b) => b.titulo.localeCompare(a.titulo));
        break;
      case 'year_new':
        filtered.sort((a, b) => (b.anio_lanzamiento || 0) - (a.anio_lanzamiento || 0));
        break;
      case 'year_old':
        filtered.sort((a, b) => (a.anio_lanzamiento || 0) - (b.anio_lanzamiento || 0));
        break;
      default:
        break;
    }

    setDisplayedAlbums(filtered);
  }, [allAlbums, filters, sortKey, searchTerm, isLoading]);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <RefreshCw className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-xl text-muted-foreground">Loading albums...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Your Vinyl Collection</h1>
        <p className="text-lg text-muted-foreground">Discover, filter, and sort your favorite LPs.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search albums or artists..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10 py-2 text-base"
        />
      </div>

      <FilterSortControls
        allArtists={allArtistas} // Pass dynamic artistas
        allGenres={mockGeneros}   
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        initialFilters={filters}
        initialSortKey={sortKey}
      />

      {displayedAlbums.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedAlbums.map(album => (
            <AlbumCard key={album.id_album} album={album} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No albums match your criteria.</p>
          <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
}

    
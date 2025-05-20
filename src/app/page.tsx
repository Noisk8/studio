'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Album, Filters, SortKey, Artista, Genero } from '@/lib/types';
import { mockAlbums, mockArtistas, mockGeneros } from '@/lib/mock-data';
import AlbumCard from '@/components/AlbumCard';
import FilterSortControls from '@/components/FilterSortControls';
import { BPM_CATEGORIES } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function HomePage() {
  const [allAlbums] = useState<Album[]>(mockAlbums);
  const [allArtists] = useState<Artista[]>(mockArtistas);
  const [allGenres] = useState<Genero[]>(mockGeneros);
  
  const [displayedAlbums, setDisplayedAlbums] = useState<Album[]>(allAlbums);
  const [filters, setFilters] = useState<Filters>({});
  const [sortKey, setSortKey] = useState<SortKey>('title_asc');
  const [searchTerm, setSearchTerm] = useState('');

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
    let filtered = [...allAlbums];

    // Search term filtering (album title, artist name)
    if (searchTerm) {
      filtered = filtered.filter(album =>
        album.titulo.toLowerCase().includes(searchTerm) ||
        album.artistas.some(artist => artist.nombre.toLowerCase().includes(searchTerm)) ||
        (album.es_compilacion && "various artists".includes(searchTerm))
      );
    }
    
    // Genre filter
    if (filters.genre) {
      filtered = filtered.filter(album => album.genero_nombre === filters.genre);
    }

    // Artist filter
    if (filters.artist) {
      filtered = filtered.filter(album => 
        album.es_compilacion ? filters.artist === "Various Artists" : album.artistas.some(a => a.nombre === filters.artist)
      );
    }
    
    // BPM Range filter
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

    // Sorting logic
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
      // Add BPM average sorting if implemented
      default:
        break;
    }

    setDisplayedAlbums(filtered);
  }, [allAlbums, filters, sortKey, searchTerm]);

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
        allArtists={allArtists}
        allGenres={allGenres}
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

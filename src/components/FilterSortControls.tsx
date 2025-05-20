'use client';

import type { ChangeEvent } from 'react';
import { useState, useMemo } from 'react';
import type { Artista, Genero, Filters, SortKey } from '@/lib/types';
import { BPM_CATEGORIES } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Filter, RotateCcw, ListFilter, Users, Music2 } from 'lucide-react';

interface FilterSortControlsProps {
  allArtists: Artista[];
  allGenres: Genero[];
  onFilterChange: (filters: Filters) => void;
  onSortChange: (sortKey: SortKey) => void;
  initialFilters?: Filters;
  initialSortKey?: SortKey;
}

const bpmRanges = [
  { label: 'All BPMs', value: '' },
  ...BPM_CATEGORIES.map(cat => ({
    label: `${cat.rango_minimo}-${cat.rango_maximo} BPM (${cat.emoji})`,
    value: `${cat.rango_minimo}-${cat.rango_maximo}`
  }))
];

const sortOptions: { label: string; value: SortKey }[] = [
  { label: 'Title (A-Z)', value: 'title_asc' },
  { label: 'Title (Z-A)', value: 'title_desc' },
  { label: 'Year (Newest First)', value: 'year_new' },
  { label: 'Year (Oldest First)', value: 'year_old' },
  // { label: 'Avg. BPM (Low-High)', value: 'bpm_avg_asc' }, // Avg BPM requires calculation
  // { label: 'Avg. BPM (High-Low)', value: 'bpm_avg_desc' },
];

export default function FilterSortControls({
  allArtists,
  allGenres,
  onFilterChange,
  onSortChange,
  initialFilters = {},
  initialSortKey = 'title_asc'
}: FilterSortControlsProps) {
  const [genre, setGenre] = useState(initialFilters.genre || '');
  const [artist, setArtist] = useState(initialFilters.artist || '');
  const [bpmRange, setBpmRange] = useState(initialFilters.bpmRange || '');
  const [sortKey, setSortKey] = useState<SortKey>(initialSortKey);

  const uniqueArtists = useMemo(() => {
    const artistNames = new Set<string>();
    allArtists.forEach(a => artistNames.add(a.nombre));
    return Array.from(artistNames).sort();
  }, [allArtists]);

  const uniqueGenres = useMemo(() => {
    const genreNames = new Set<string>();
    allGenres.forEach(g => genreNames.add(g.nombre));
    return Array.from(genreNames).sort();
  }, [allGenres]);

  const handleApplyFilters = () => {
    onFilterChange({ genre, artist, bpmRange });
  };

  const handleResetFilters = () => {
    setGenre('');
    setArtist('');
    setBpmRange('');
    onFilterChange({});
  };

  const handleSortChange = (value: string) => {
    const newSortKey = value as SortKey;
    setSortKey(newSortKey);
    onSortChange(newSortKey);
  };
  
  return (
    <div className="p-4 md:p-6 bg-card shadow rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <Label htmlFor="genre-filter" className="flex items-center mb-1 text-sm font-medium">
            <Music2 className="w-4 h-4 mr-2" /> Genre
          </Label>
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger id="genre-filter">
              <SelectValue placeholder="All Genres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Genres</SelectItem>
              {uniqueGenres.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="artist-filter" className="flex items-center mb-1 text-sm font-medium">
            <Users className="w-4 h-4 mr-2" /> Artist
          </Label>
          <Select value={artist} onValueChange={setArtist}>
            <SelectTrigger id="artist-filter">
              <SelectValue placeholder="All Artists" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Artists</SelectItem>
              {uniqueArtists.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="bpm-filter" className="flex items-center mb-1 text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M2 12h3l3-9 4 18 3-9h3"/><path d="M12 2v20"/></svg>
            BPM Range
          </Label>
          <Select value={bpmRange} onValueChange={setBpmRange}>
            <SelectTrigger id="bpm-filter">
              <SelectValue placeholder="All BPMs" />
            </SelectTrigger>
            <SelectContent>
              {bpmRanges.map(range => <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="sort-by" className="flex items-center mb-1 text-sm font-medium">
            <ListFilter className="w-4 h-4 mr-2" /> Sort By
          </Label>
          <Select value={sortKey} onValueChange={handleSortChange}>
            <SelectTrigger id="sort-by">
              <SelectValue placeholder="Sort albums..." />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-end">
          <Button onClick={handleApplyFilters} className="w-full sm:w-auto">
            <Filter className="w-4 h-4 mr-2" /> Apply Filters
          </Button>
          <Button variant="outline" onClick={handleResetFilters} className="w-full sm:w-auto">
            <RotateCcw className="w-4 h-4 mr-2" /> Reset Filters
          </Button>
        </div>
    </div>
  );
}

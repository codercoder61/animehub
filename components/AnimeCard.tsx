'use client';

import Link from 'next/link';
import { Star, Heart } from 'lucide-react';
import { Anime } from '@/lib/mockData';
import { useAuth } from '@/lib/auth-context';
export interface AnimeDetails{
  id: string;
  title: string;
  animePoster: string;
  description: string;
  genres: string;
}
interface AnimeCardProps {
  anime: AnimeDetails;
}
const parseGenres = (genres: any) => {
  if (!genres) return [];

  if (Array.isArray(genres)) return genres;

  if (typeof genres === "string") {
    return genres.split(",").map(g => g.trim());
  }

  return [];
};
export default function AnimeCard({ anime }: AnimeCardProps) {
  const { isFavorited, toggleFavorite } = useAuth();
  return (
    <Link href={`/anime/${anime.id}`}>
      <div className="group cursor-pointer rounded-lg overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
        <div className="relative overflow-hidden bg-muted h-80">
          <img
            src={anime.poster || anime.animePoster }
            alt={anime.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(anime.id);
            }}
            className="absolute top-2 right-2 z-10 p-2 rounded-full bg-background/80 hover:bg-primary text-foreground hover:text-primary-foreground transition-colors"
            title="Add to favorites"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorited(anime.id) ? 'fill-current text-accent' : ''
              }`}
            />
          </button>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {anime.title}
            </h3>
          </div>
          

          <div className="flex flex-wrap gap-1">
<div className="flex flex-wrap gap-1">
  {parseGenres(anime.genres)
    .slice(0, 2)
    .map((genre) => (
      <span
        key={genre}
        className="text-xs bg-primary/20 text-primary px-2 py-1 rounded"
      >
        {genre}
      </span>
    ))}
</div>
</div>
        </div>
      </div>
    </Link>
  );
}

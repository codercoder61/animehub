'use client';

import { Suspense, useMemo ,useState, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimeCard from '@/components/AnimeCard';
import { mockAnimeData } from '@/lib/mockData';
import axios from 'axios'

export interface AnimeDetails {
  id: string;
  title: string;
  animePoster: string;
  description: string;
  genres: string;
}


function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
    const [anime, setAnime] = useState<AnimeDetails[]>([]);
  
useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3001/api/animes/all'
        );

        // 🔥 IMPORTANT FIX (handle both shapes safely)
        setAnime(Array.isArray(res.data) ? res.data : res.data.data || []);
      } catch (err) {
        console.error(err);
        setAnime([]);
      }
    };

    fetchAnime();
  }, []);
 const results = useMemo(() => {
  if (!query) return [];

  const searchQuery = query.toLowerCase().trim();

  return anime.filter((item) => {
    const genresArray = item.genres
      .split(",")
      .map((g) => g.trim().toLowerCase());

    return (
      item.title.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery) ||
      genresArray.some((genre) => genre.includes(searchQuery))
    );
  });
}, [query, anime]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {query && (
            <div dir="rtl" className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                نتائج البحث
              </h1>
              <p  className="text-muted-foreground">
                وجد {results.length} نتيجة لأجل &quot;{query}&quot;
              </p>
            </div>
          )}

          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-card border border-border/50 rounded-lg">
              <p className="text-lg text-muted-foreground mb-4">No results found</p>
              <p className="text-sm text-muted-foreground">
                Try searching with different keywords
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}

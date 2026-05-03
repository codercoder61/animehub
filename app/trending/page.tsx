import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimeCard from '@/components/AnimeCard';
import { mockAnimeData } from '@/lib/mockData';
import { TrendingUp } from 'lucide-react';

export default function TrendingPage() {
  const trendingAnime = [...mockAnimeData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 12);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-3 rounded-lg bg-primary/20">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Trending Now</h1>
              <p className="text-muted-foreground mt-2">
                The most popular anime right now
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingAnime.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

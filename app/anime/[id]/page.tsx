'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EpisodePlayer from '@/components/EpisodePlayer';
import { useAuth } from '@/lib/auth-context';
import { Play, Heart, Flag } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'next/navigation';

export interface Episode {
  id: string;
  animeId: number;
}

export interface AnimeDetails {
  id: string;
  title: string;
  animePoster: string;
  description: string;
  genres: string;
}

export interface Anime {
  anime: AnimeDetails;
  episodes: Episode[];
}

export default function AnimeDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const sendEmail = async () => {
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: `User reported anime with id=${id}` }),
    });
    alert('Anime reported');
  };

  const [anime, setAnime] = useState<Anime | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  const { isFavorited: isAuthFavorited, toggleFavorite, addToWatchHistory, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!id) return;

    const fetchAnime = async () => {
      const res = await axios.get(
        `https://witanime-production.up.railway.app/api/animes/${id}`
      );
      setAnime(res.data);
    };

    fetchAnime();
  }, [id]);

  useEffect(() => {
    if (anime?.episodes?.length) {
      setSelectedEpisode(anime.episodes[0]);
      setIsFavorited(isAuthFavorited(anime.anime.id));
    }
  }, [anime, isAuthFavorited]);

  useEffect(() => {
    if (selectedEpisode && anime && isAuthenticated) {
      addToWatchHistory(anime.anime.id, selectedEpisode.id, 0);
    }
  }, [selectedEpisode, anime, isAuthenticated, addToWatchHistory]);

  if (!anime) {
    return <div className="p-10 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main style={{ marginTop: '50px' }} className="flex-1">
        <div className="container mx-auto px-4">
          <div style={{ direction: 'rtl' }} className="flex flex-col md:flex-row gap-8 mb-12">
            
            {/* Poster */}
            <div>
              <img
                src={anime.anime.animePoster}
                alt={anime.anime.title}
                className="w-48 h-72 object-cover rounded-lg border-4 border-card shadow-2xl"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {anime.anime.title}
              </h1>

              <p className="text-lg text-foreground leading-relaxed max-w-2xl">
                {anime.anime.description}
              </p>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {anime.anime.genres.split(',').map((g) => (
                  <span
                    key={g}
                    className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm"
                  >
                    {g.trim()}
                  </span>
                ))}
              </div>

              {/* ✅ ONLY change kept (responsive buttons) */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => {
                    if (selectedEpisode) {
                      document.getElementById('player')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Play className="w-5 h-5" />
                  شاهد الآن
                </button>

                <button
                  onClick={() => {
                    toggleFavorite(anime.anime.id);
                    setIsFavorited(!isFavorited);
                  }}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors border ${
                    isFavorited
                      ? 'bg-accent/20 border-accent text-accent'
                      : 'border-border/50 text-foreground hover:border-primary/50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  {isFavorited ? 'مفضل' : 'أضف إلى قائمة الأنمي المفضلة'}
                </button>

                <button
                  onClick={sendEmail}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors border border-border/50 text-foreground hover:border-primary/50"
                >
                  <Flag className="w-5 h-5 fill-current" />
                  أبلغ عن عدم توفر الخوادم
                </button>
              </div>
            </div>
          </div>

          {/* Player */}
          {selectedEpisode && (
            <section id="player" className="mb-16">
              <EpisodePlayer episode={selectedEpisode} />
            </section>
          )}

          {/* Episodes */}
          <section dir="rtl" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">
              الحلقات ({anime.episodes.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {anime.episodes.map((episode, index) => (
                <button
                  key={episode.id}
                  onClick={() => {
                    document.getElementById('player')?.scrollIntoView({ behavior: 'smooth' });
                    setSelectedEpisode(episode);
                  }}
                  className={`p-4 rounded-lg border-2 ${
                    selectedEpisode?.id === episode.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border/50 bg-card hover:border-primary/50'
                  }`}
                >
                  حلقة {index + 1}
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

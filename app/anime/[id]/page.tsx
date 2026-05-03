'use client';

import { useState, useEffect, useCallback } from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EpisodePlayer from '@/components/EpisodePlayer';
import AnimeCard from '@/components/AnimeCard';
import { mockAnimeData } from '@/lib/mockData';
import { useAuth } from '@/lib/auth-context';
import { Star, Calendar, Play, Plus, Heart, Flag } from 'lucide-react';
import axios from 'axios'
import { useParams } from 'next/navigation';

interface AnimeDetailPageProps {
  params: { id: string };
}

export interface Episode {
  id: string;
  animeId: number;
}

export interface Server {
  id: string;
  serverLink: string;
}

export interface AnimeDetails{
  id: string;
  title: string;
  animePoster: string;
  description: string;
  genres: string;
}
export interface Anime {
  anime:AnimeDetails;
  episodes: Episode[];
}
export default function AnimeDetailPage() {

  const params = useParams();
  const id = params?.id as string;


  const sendEmail = async () => {
  const res = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "AnimeHub",
      email: "codercoder61@gmail.com",
      message: `User reported anime with id=${id}`,
    }),
  });
  alert("Anime reported")
};



const [anime, setAnime] = useState<Anime | null>(null);
useEffect(() => {
    if (!id) return;

    const fetchAnime = async () => {
      const res = await axios.get(
        `http://localhost:3001/api/animes/${id}`
      );

      setAnime(res.data);
    };

    fetchAnime();
  }, [id]);
const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  useEffect(() => {
  if (anime?.episodes?.length) {
    setSelectedEpisode(anime.episodes[0]);
  }
}, [anime]);


  const { isFavorited: isAuthFavorited, toggleFavorite, addToWatchHistory, isAuthenticated } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);

  // Sync with auth favorites
  useCallback(() => {
    if (anime) {
      setIsFavorited(isAuthFavorited(anime.anime.id));
    }
  }, [anime, isAuthFavorited]);

  // Track watch history when episode is selected
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

      <main style={{marginTop:'150px'}}className="flex-1">
        {/* Hero Background */}
        {/* <div className="relative h-96 md:h-[500px] overflow-hidden bg-muted">
          <img
            src={anime.coverImage}
            alt={anime.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div> */}

        <div className="container mx-auto px-4 -mt-24 relative z-10">
          {/* Anime Header */}
          <div style={{direction:'rtl'}} className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={anime.anime.animePoster}
                alt={anime.anime.title}
                className="w-48 h-72 object-cover rounded-lg border-4 border-card shadow-2xl"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {anime.anime.title}
                </h1>
              </div>

              <p dir="rtl" className="text-lg text-foreground leading-relaxed max-w-2xl">
                {anime.anime.description}
              </p>

              

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {anime.anime.genres
  .split(",")
  .map((genre) => genre.trim())
  .map((genre) => (
    <span
      key={genre}
      className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium"
    >
      {genre}
    </span>
  ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    if (selectedEpisode) {
                      document.getElementById('player')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Play className="w-5 h-5" />
                  شاهد الآن
                </button>
                <button
                  onClick={() => {
                    toggleFavorite(anime.anime.id);
                    setIsFavorited(!isFavorited);
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors border ${
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
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors border
                      border-border/50 text-foreground hover:border-primary/50
                  `}
                >
                  <Flag className={`w-5 h-5 fill-current`} />
                  أبلغ عن عدم توفر الخوادم
                </button>
              </div>
            </div>
          </div>

          {/* Player Section */}
          {selectedEpisode && (
            <section id="player" className="mb-16">
              <EpisodePlayer episode={selectedEpisode} />
            </section>
          )}

          {/* Episodes List */}
          <section dir="rtl" className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              الحلقات ({anime.episodes.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {anime.episodes.map((episode,index) => (
                <button
                  key={episode.id}
                  onClick={() => {
                    
                  }}
                  onClick={() => {if (selectedEpisode) {
                      document.getElementById('player')?.scrollIntoView({ behavior: 'smooth' });
                    } ;setSelectedEpisode(episode)}}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    selectedEpisode?.id === episode.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border/50 bg-card hover:border-primary/50'
                  }`}
                >
                  <div className="flex gap-4">
                    <div dir="rtl" className="flex-1 min-w-0">
                      <h3 dir="rtl" className="font-semibold text-foreground line-clamp-1">
                        حلقة {index+1}
                      </h3>
                     
                    </div>
                  </div>
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

'use client';

import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimeCard from '@/components/AnimeCard';
import { useAuth } from '@/lib/auth-context';
import { mockAnimeData } from '@/lib/mockData';
import { Heart, Clock, LogOut } from 'lucide-react';
import Link from 'next/link';
import {useState, useEffect} from 'react'
import axios from 'axios'
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
export default function DashboardPage() {



  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [anime, setAnime] = useState<AnimeDetails[]>([]);

  // ✅ FETCH FIXED
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await axios.get(
          'https://witanime-production.up.railway.app/api/animes/all'
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
  const { user, isAuthenticated, logout, favorites, watchHistory } = useAuth();

  if (!isAuthenticated || !user) {
    redirect('/auth');
  }

  // Get favorited anime
  const favoritedAnime = anime.filter((anime) => favorites.includes(anime.id));

  // Get recently watched anime
  const recentlyWatched = Array.from(
    new Map(
      watchHistory
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((item) => {
          const anime = mockAnimeData.find((a) => a.id === item.animeId);
          return [item.animeId, anime];
        })
    ).values()
  )
    .filter(Boolean)
    .slice(0, 6);

  const handleLogout = () => {
    logout();
    redirect('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* User Profile Header */}
          <div className="mb-12 flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-32 h-32 rounded-full border-4 border-primary"
            />
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground">{user.username}</h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>

              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <div>
                  <p className="text-2xl font-bold text-primary">{watchHistory.length}</p>
                  <p className="text-sm text-muted-foreground">الحلقات التي شاهدتها</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">{favorites.length}</p>
                  <p className="text-sm text-muted-foreground">المفضلة</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition-colors font-semibold"
              >
                <LogOut className="w-5 h-5" />
                تسجيل الخروج

              </button>
            </div>
          </div>

          {/* Favorites Section */}
          {favoritedAnime.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-lg bg-accent/20">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">المفضلة لديك</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {favoritedAnime.map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>
            </section>
          )}

          {/* Recently Watched Section */}
          {recentlyWatched.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-lg bg-primary/20">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Continue Watching</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {recentlyWatched.map((anime) => (
                  anime && <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {favorites.length === 0 && recentlyWatched.length === 0 && (
            <div dir='rtl' className="flex flex-col items-center justify-center py-20 bg-card border border-border/50 rounded-lg space-y-6">
              <div className="text-center space-y-2">
                <p className="text-xl font-semibold text-foreground">
                  البدء في استكشاف أنيمي!
                </p>
                <p className="text-muted-foreground">
أضف الأنمي إلى مفضلاتك أو ابدأ بمشاهدته
                </p>
              </div>
              <Link
                href="/anime"
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors"
              >
تصفح الأنمي
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

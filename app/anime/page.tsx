'use client';

import { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimeCard from '@/components/AnimeCard';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const ITEMS_PER_PAGE = 12;

export interface AnimeDetails {
  id: string;
  title: string;
  animePoster: string;
  description: string;
  genres: string;
}

export default function AnimeListPage() {
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

  // ✅ FILTER SAFE
  const filteredAnime = useMemo(() => {
    let result = anime;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();

      result = result.filter((a) =>
        a.title.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [anime, searchQuery]);

  // ✅ PAGINATION SAFE
  const totalPages = Math.ceil(filteredAnime.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedAnime = filteredAnime.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">

          {/* SEARCH */}
          <div dir="rtl"  className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
              <input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="بحث عن الانمي..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-card border"
              />
            </div>
          </div>

          {/* RESULTS */}
          {filteredAnime.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No anime found
            </p>
          ) : (
            <>
              <div dir="rtl"  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedAnime.map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft />
                  </button>

                  <span>
                    {currentPage} / {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

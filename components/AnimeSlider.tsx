'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Anime } from '@/lib/mockData';

interface AnimeSliderProps {
  animes: Anime[];
}

export default function AnimeSlider({ animes }: AnimeSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % animes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [animes.length]);

  const current = animes[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + animes.length) % animes.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % animes.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div dir="rtl" className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-xl bg-muted group">
      {/* Slides */}
      <div className="absolute inset-0">
        {animes.map((anime, index) => (
          <div
            key={anime.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={anime.coverImage}
              alt={anime.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 z-10">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg text-balance">
            {current.title}
          </h1>
          
          <p dir="rtl" className="text-lg md:text-xl text-gray-200 line-clamp-3">
            {current.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {current.genres.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 bg-primary/80 text-primary-foreground rounded-full text-sm font-medium"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">
              {current.totalEpisodes} حلقة
            </span>
          </div>

          <Link
            href={`/anime/${current.id}`}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            <Play className="w-5 h-5" />
           شاهد الآن
          </Link>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-primary/80 hover:bg-primary text-white transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-primary/80 hover:bg-primary text-white transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {animes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary w-8'
                : 'bg-white/40 hover:bg-white/60 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      
    </div>
  );
}

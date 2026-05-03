'use client';

import React, { createContext, useContext, useEffect, useState,useCallback } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

interface WatchHistory {
  animeId: string;
  episodeId: string;
  timestamp: number;
  progress: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  watchHistory: WatchHistory[];
  favorites: string[];
  login: (username: string, email: string) => void;
  logout: () => void;
  addToWatchHistory: (animeId: string, episodeId: string, progress: number) => void;
  toggleFavorite: (animeId: string) => void;
  isFavorited: (animeId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [watchHistory, setWatchHistory] = useState<WatchHistory[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('animeHub_user');
      const savedHistory = localStorage.getItem('animeHub_watchHistory');
      const savedFavorites = localStorage.getItem('animeHub_favorites');

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedHistory) setWatchHistory(JSON.parse(savedHistory));
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    } catch (error) {
      console.error('Failed to load auth data:', error);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isHydrated) return;
    if (user) {
      localStorage.setItem('animeHub_user', JSON.stringify(user));
    }
  }, [user, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem('animeHub_watchHistory', JSON.stringify(watchHistory));
  }, [watchHistory, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem('animeHub_favorites', JSON.stringify(favorites));
  }, [favorites, isHydrated]);

  const login = (username: string, email: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    setWatchHistory([]);
    setFavorites([]);
    localStorage.removeItem('animeHub_user');
    localStorage.removeItem('animeHub_watchHistory');
    localStorage.removeItem('animeHub_favorites');
  };

  const addToWatchHistory = useCallback((animeId: string, episodeId: string, progress: number) => {
  setWatchHistory((prev) => {
    const existing = prev.find(
      (h) => h.animeId === animeId && h.episodeId === episodeId
    );

    if (existing) {
      return prev.map((h) =>
        h.animeId === animeId && h.episodeId === episodeId
          ? { ...h, timestamp: Date.now(), progress }
          : h
      );
    }

    return [...prev, { animeId, episodeId, timestamp: Date.now(), progress }];
  });
}, []);

  const toggleFavorite = (animeId: string) => {
    setFavorites((prev) =>
      prev.includes(animeId) ? prev.filter((id) => id !== animeId) : [...prev, animeId]
    );
  };

  const isFavorited = (animeId: string) => favorites.includes(animeId);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        watchHistory,
        favorites,
        login,
        logout,
        addToWatchHistory,
        toggleFavorite,
        isFavorited,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
